import * as React from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2, Sparkles, Heart, Share2, Check, BarChart2 } from "lucide-react";
import { getJoke, Joke, JokeCategory } from "@/lib/joke-api";
import { showSuccess, showError } from "@/utils/toast";
import { useFavorites } from "@/hooks/use-favorites";
import { cn } from "@/lib/utils";

const JokeCard: React.FC = () => {
  const [category, setCategory] = React.useState<JokeCategory>("random");
  const [copied, setCopied] = React.useState(false);
  const [sessionCount, setSessionCount] = React.useState(0);

  const { data: joke, isLoading, isFetching, error, refetch } = useQuery<Joke, Error>({
    queryKey: ["joke", category],
    queryFn: () => getJoke(category),
    staleTime: Infinity,
    refetchOnWindowFocus: false,
  });

  const { isFavorite, toggleFavorite } = useFavorites();
  
  const handleFetchNewJoke = async () => {
    const { isSuccess } = await refetch();
    if (isSuccess) setSessionCount(prev => prev + 1);
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
    <div className="w-full max-w-2xl space-y-12 animate-in fade-in zoom-in-95 duration-1000">
      {/* Session Insights */}
      <div className="flex justify-center">
        <div className="flex items-center space-x-6 px-6 py-2 rounded-full border border-white/5 bg-white/[0.02] backdrop-blur-md">
           <div className="flex items-center space-x-2">
            <BarChart2 className="h-3.5 w-3.5 text-primary/60" />
            <span className="text-[10px] font-bold uppercase tracking-widest text-white/40">Session Insight</span>
          </div>
          <div className="h-3 w-px bg-white/10" />
          <span className="text-[10px] font-bold uppercase tracking-widest text-primary">{sessionCount} Moments Found</span>
        </div>
      </div>

      <Card className="relative border border-white/10 bg-white/[0.01] backdrop-blur-[40px] shadow-[0_0_100px_rgba(0,0,0,0.5)] rounded-[3rem] overflow-hidden group">
        {/* Glow Follow Effect Simulation */}
        <div className="absolute -inset-24 bg-primary/10 blur-[100px] opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
        
        <CardHeader className="relative flex flex-row items-center justify-between p-12 pb-0 z-10">
          <div className="flex items-center space-x-3 text-white/40 text-[10px] font-black uppercase tracking-[0.3em]">
            <Sparkles className="h-4 w-4" />
            <span>Discover Humour</span>
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
                      ? "fill-primary text-primary drop-shadow-[0_0_8px_rgba(180,160,255,0.5)]" 
                      : "text-white/20 hover:text-white/50"
                  )} 
                />
              </button>
            )}
          </div>
        </CardHeader>
        
        <CardContent className="relative min-h-[340px] flex flex-col justify-center px-14 py-10 z-10">
          {isLoading || isFetching ? (
            <div className="space-y-6">
              <div className="h-8 w-3/4 bg-white/5 rounded-full shimmer" />
              <div className="h-12 w-full bg-white/5 rounded-2xl shimmer" />
            </div>
          ) : error ? (
            <p className="text-center text-white/20 text-sm font-medium tracking-tight italic">Deep space silence...</p>
          ) : joke ? (
            <div className="space-y-14">
              <h2 className="text-3xl sm:text-4xl font-semibold leading-[1.3] tracking-tight text-white/95">
                {joke.setup}
              </h2>
              <div className="animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-200">
                <p className="text-5xl sm:text-6xl font-black bg-clip-text text-transparent bg-gradient-to-r from-white via-primary to-white/30 leading-[1.1] tracking-tighter">
                  {joke.punchline}
                </p>
              </div>
            </div>
          ) : null}
        </CardContent>

        <CardFooter className="relative p-12 pt-0 z-10">
          <div className="w-full flex flex-col space-y-8">
            <Button 
              onClick={handleFetchNewJoke} 
              disabled={isFetching}
              className="w-full h-20 rounded-[2rem] bg-white text-black hover:bg-white/90 font-black text-sm uppercase tracking-[0.2em] transition-all active:scale-[0.97] disabled:opacity-20 shadow-[0_20px_40px_rgba(0,0,0,0.4)]"
            >
              {isFetching ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : (
                "Next Moment"
              )}
            </Button>

            {/* Sub-navigation for categories */}
            <div className="flex flex-wrap justify-center gap-3">
              {categories.map((cat) => (
                <button
                  key={cat.value}
                  onClick={() => setCategory(cat.value)}
                  className={cn(
                    "px-5 py-2.5 rounded-full text-[9px] font-black uppercase tracking-widest transition-all duration-500",
                    category === cat.value
                      ? "bg-primary text-black"
                      : "bg-white/5 text-white/30 hover:text-white/60 hover:bg-white/10"
                  )}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default JokeCard;