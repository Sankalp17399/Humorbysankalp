import * as React from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2, Sparkles, Heart, Share2, Check } from "lucide-react";
import { getJoke, Joke, JokeCategory } from "@/lib/joke-api";
import { showSuccess, showError } from "@/utils/toast";
import { useFavorites } from "@/hooks/use-favorites";
import { cn } from "@/lib/utils";

const JokeCard: React.FC = () => {
  const [category, setCategory] = React.useState<JokeCategory>("random");
  const [copied, setCopied] = React.useState(false);

  const { data: joke, isLoading, isFetching, error, refetch } = useQuery<Joke, Error>({
    queryKey: ["joke", category],
    queryFn: () => getJoke(category),
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

  const categories: { label: string; value: JokeCategory }[] = [
    { label: "Random", value: "random" },
    { label: "Programming", value: "programming" },
    { label: "General", value: "general" },
    { label: "Knock-knock", value: "knock-knock" },
  ];

  return (
    <div className="w-full max-w-2xl space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-1000">
      {/* Category Tabs */}
      <div className="flex flex-wrap justify-center gap-2">
        {categories.map((cat) => (
          <button
            key={cat.value}
            onClick={() => setCategory(cat.value)}
            className={cn(
              "px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest transition-all duration-300 border",
              category === cat.value
                ? "bg-white/10 border-white/20 text-white"
                : "bg-transparent border-transparent text-white/40 hover:text-white/60 hover:border-white/5"
            )}
          >
            {cat.label}
          </button>
        ))}
      </div>

      <Card className="relative border border-white/5 bg-white/[0.02] backdrop-blur-3xl shadow-none rounded-[2.5rem] overflow-hidden group">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
        
        <CardHeader className="flex flex-row items-center justify-between p-10 pb-0 z-10">
          <div className="flex items-center space-x-3 text-primary/40 text-[10px] font-black uppercase tracking-[0.2em]">
            <Sparkles className="h-4 w-4" />
            <span>Discover Humor</span>
          </div>
          <div className="flex items-center space-x-2">
            <button 
              onClick={handleShare}
              className="p-3 rounded-2xl bg-white/5 text-white/40 hover:text-white hover:bg-white/10 transition-all active:scale-90"
            >
              {copied ? <Check className="h-4 w-4 text-green-400" /> : <Share2 className="h-4 w-4" />}
            </button>
            {joke && (
              <button 
                onClick={(e) => { e.stopPropagation(); toggleFavorite(joke); }}
                className="p-3 rounded-2xl bg-white/5 transition-all active:scale-90 group/heart"
              >
                <Heart 
                  className={cn(
                    "h-4 w-4 transition-all duration-500",
                    currentJokeIsFavorite 
                      ? "fill-primary text-primary scale-110" 
                      : "text-white/20 group-hover/heart:text-white/40"
                  )} 
                />
              </button>
            )}
          </div>
        </CardHeader>
        
        <CardContent className="min-h-[300px] flex flex-col justify-center px-12 py-8 z-10">
          {isLoading || isFetching ? (
            <div className="flex flex-col items-center space-y-4 animate-pulse">
              <div className="h-2 w-24 bg-white/5 rounded-full" />
              <div className="h-8 w-full max-w-xs bg-white/5 rounded-2xl" />
            </div>
          ) : error ? (
            <p className="text-center text-white/20 italic">The humor seems to be offline.</p>
          ) : joke ? (
            <div className="space-y-12">
              <h2 className="text-2xl sm:text-3xl font-medium leading-[1.4] tracking-tight text-white/90">
                {joke.setup}
              </h2>
              <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 delay-300">
                <p className="text-4xl sm:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-white/40 leading-[1.2]">
                  {joke.punchline}
                </p>
              </div>
            </div>
          ) : null}
        </CardContent>

        <CardFooter className="p-10 pt-0 z-10">
          <Button 
            onClick={handleFetchNewJoke} 
            disabled={isFetching}
            className="w-full h-16 rounded-[1.5rem] bg-white text-black hover:bg-white/90 font-black text-sm uppercase tracking-widest transition-all active:scale-[0.98] disabled:opacity-20 shadow-[0_0_40px_rgba(255,255,255,0.1)]"
          >
            {isFetching ? (
              <Loader2 className="h-5 w-5 animate-spin" />
            ) : (
              "Next Entry"
            )}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default JokeCard;