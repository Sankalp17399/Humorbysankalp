import * as React from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2, Sparkles, Heart, Share2, Check } from "lucide-react";
import { getJoke, Joke } from "@/lib/joke-api";
import { showSuccess, showError } from "@/utils/toast";
import { useFavorites } from "@/hooks/use-favorites";
import { cn } from "@/lib/utils";

const JokeCard: React.FC = () => {
  const [copied, setCopied] = React.useState(false);

  const { data: joke, isLoading, isFetching, error, refetch } = useQuery<Joke, Error>({
    queryKey: ["joke", "random"],
    queryFn: () => getJoke("random"),
    staleTime: Infinity,
    refetchOnWindowFocus: false,
  });

  const { isFavorite, toggleFavorite } = useFavorites();
  
  const handleFetchNewJoke = () => {
    refetch();
  };

  const handleShare = async () => {
    if (!joke) return;
    const text = `${joke.setup}\n\n${joke.punchline}`;
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      showSuccess("Copied to clipboard");
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      showError("Failed to copy");
    }
  };

  const currentJokeIsFavorite = joke ? isFavorite(joke.id) : false;

  return (
    <div className="w-full max-w-2xl py-8 animate-in fade-in zoom-in-95 duration-1000">
      <Card className="relative border border-white/10 bg-white/[0.01] backdrop-blur-[60px] shadow-2xl rounded-[3rem] overflow-hidden group">
        {/* Subtle Ambient Glow */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-50" />
        
        <CardHeader className="relative flex flex-row items-center justify-between p-12 pb-0 z-10">
          <div className="flex items-center space-x-3 text-white/20 text-[10px] font-black uppercase tracking-[0.4em]">
            <Sparkles className="h-4 w-4" />
            <span>Archive Entry</span>
          </div>
          <div className="flex items-center space-x-3">
            <button 
              onClick={handleShare}
              className="p-3.5 rounded-2xl bg-white/5 text-white/30 hover:text-white hover:bg-white/10 transition-all active:scale-90"
            >
              {copied ? <Check className="h-4 w-4 text-green-400" /> : <Share2 className="h-4 w-4" />}
            </button>
            {joke && (
              <button 
                onClick={(e) => { e.stopPropagation(); toggleFavorite(joke); }}
                className="p-3.5 rounded-2xl bg-white/5 transition-all active:scale-90"
              >
                <Heart 
                  className={cn(
                    "h-4 w-4 transition-all duration-700",
                    currentJokeIsFavorite 
                      ? "fill-primary text-primary drop-shadow-[0_0_10px_rgba(180,160,255,0.6)]" 
                      : "text-white/20 hover:text-white/50"
                  )} 
                />
              </button>
            )}
          </div>
        </CardHeader>
        
        <CardContent className="relative min-h-[380px] flex flex-col justify-center px-16 py-10 z-10">
          {isLoading || isFetching ? (
            <div className="space-y-8 animate-pulse">
              <div className="h-8 w-3/4 bg-white/5 rounded-full" />
              <div className="h-14 w-full bg-white/5 rounded-2xl" />
            </div>
          ) : error ? (
            <p className="text-center text-white/20 font-medium tracking-widest uppercase text-xs">Transmission Interrupted</p>
          ) : joke ? (
            <div className="space-y-16">
              <h2 className="text-3xl sm:text-4xl font-semibold leading-[1.3] tracking-tight text-white/95">
                {joke.setup}
              </h2>
              <div className="animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-200">
                <p className="text-5xl sm:text-6xl font-black bg-clip-text text-transparent bg-gradient-to-r from-white via-primary to-white/40 leading-[1.1] tracking-tighter">
                  {joke.punchline}
                </p>
              </div>
            </div>
          ) : null}
        </CardContent>

        <CardFooter className="relative p-12 pt-0 z-10">
          <Button 
            onClick={handleFetchNewJoke} 
            disabled={isFetching}
            className="w-full h-20 rounded-[2rem] bg-white text-black hover:bg-white/90 font-black text-sm uppercase tracking-[0.2em] transition-all active:scale-[0.98] disabled:opacity-20 shadow-2xl"
          >
            {isFetching ? (
              <Loader2 className="h-6 w-6 animate-spin" />
            ) : (
              "Discover New"
            )}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default JokeCard;