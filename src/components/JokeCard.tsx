import * as React from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2, Sparkles, Heart } from "lucide-react";
import { getRandomJoke, Joke } from "@/lib/joke-api";
import { showSuccess, showError } from "@/utils/toast";
import { useFavorites } from "@/hooks/use-favorites";
import { cn } from "@/lib/utils";

const JOKE_QUERY_KEY = ["randomJoke"];

const JokeCard: React.FC = () => {
  const { data: joke, isLoading, isFetching, error, refetch } = useQuery<Joke, Error>({
    queryKey: JOKE_QUERY_KEY,
    queryFn: getRandomJoke,
    staleTime: Infinity, 
    refetchOnWindowFocus: false,
  });

  const { isFavorite, toggleFavorite } = useFavorites();
  
  const handleFetchNewJoke = async () => {
    const result = await refetch();
    if (result.isError) {
      showError("Connection lost. Try again.");
    }
  };

  const handleToggleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (joke) toggleFavorite(joke);
  };

  const initialLoading = isLoading && !joke;
  const currentJokeIsFavorite = joke ? isFavorite(joke.id) : false;

  return (
    <Card className="w-full max-w-xl mx-auto border border-white/10 bg-white/[0.03] backdrop-blur-2xl shadow-none rounded-3xl overflow-hidden transition-all duration-700 hover:border-white/20">
      <CardHeader className="flex flex-row items-center justify-between p-8 pb-0">
        <div className="flex items-center space-x-2 text-primary/60 text-xs font-bold uppercase tracking-widest">
          <Sparkles className="h-3 w-3" />
          <span>Random Humor</span>
        </div>
        {joke && (
          <button 
            onClick={handleToggleFavorite}
            className="p-2 rounded-full hover:bg-white/5 transition-colors"
          >
            <Heart 
              className={cn(
                "h-5 w-5 transition-all duration-500",
                currentJokeIsFavorite 
                  ? "fill-primary text-primary" 
                  : "text-white/20 hover:text-white/40"
              )} 
            />
          </button>
        )}
      </CardHeader>
      
      <CardContent className="min-h-[260px] flex flex-col justify-center px-10 py-6">
        {initialLoading ? (
          <div className="flex items-center space-x-3 text-white/20">
            <Loader2 className="h-5 w-5 animate-spin" />
            <span className="text-sm font-medium tracking-tight">Curating your next laugh...</span>
          </div>
        ) : error ? (
          <p className="text-sm text-destructive/80 font-medium">Failed to fetch content. Check your connection.</p>
        ) : joke ? (
          <div className="space-y-10">
            <h2 className="text-2xl font-semibold leading-snug tracking-tight text-white/90">
              {joke.setup}
            </h2>
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-1000">
              <p className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-br from-primary via-primary/80 to-white/40">
                {joke.punchline}
              </p>
            </div>
          </div>
        ) : null}
      </CardContent>

      <CardFooter className="p-8 pt-0">
        <Button 
          onClick={handleFetchNewJoke} 
          disabled={isFetching}
          className="w-full h-14 rounded-2xl bg-white text-black hover:bg-white/90 font-bold transition-all active:scale-95 disabled:opacity-50"
        >
          {isFetching ? "Syncing..." : "Refresh Humor"}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default JokeCard;