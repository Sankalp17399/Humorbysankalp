import * as React from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2, Smile, Heart } from "lucide-react";
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
      showError("Failed to fetch a new joke. Please check your network connection.");
    } else {
      showSuccess("Here's a fresh one!");
    }
  };

  const handleToggleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (joke) {
      toggleFavorite(joke);
    }
  };

  const initialLoading = isLoading && !joke;
  const currentJokeIsFavorite = joke ? isFavorite(joke.id) : false;

  return (
    <Card className="w-full max-w-lg mx-auto shadow-2xl dark:shadow-primary/30 border-t-8 border-primary transition-all duration-500 hover:shadow-primary/50 dark:hover:shadow-primary/70 rounded-xl overflow-hidden">
      <CardHeader className="flex flex-row items-start justify-between space-y-0 p-6 bg-primary/10 dark:bg-primary/20">
        <CardTitle className="text-3xl font-extrabold tracking-tight text-primary flex items-center">
          <Smile className="h-8 w-8 mr-3 text-primary animate-pop" />
          Joke Generator
        </CardTitle>
        <div className="flex items-center space-x-2">
          {joke && (
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={handleToggleFavorite}
              aria-label={currentJokeIsFavorite ? "Remove from favorites" : "Add to favorites"}
              className="hover:bg-transparent"
            >
              <Heart 
                className={cn(
                  "h-7 w-7 transition-all duration-300",
                  currentJokeIsFavorite 
                    ? "fill-red-500 text-red-500 animate-heart-beat" 
                    : "text-muted-foreground hover:text-red-500 hover:fill-red-500/50"
                )} 
              />
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent className="min-h-[200px] flex flex-col justify-center p-8">
        {initialLoading ? (
          <div className="flex flex-col items-center justify-center h-full p-8">
            <Loader2 className="h-12 w-12 animate-spin text-primary mb-4" />
            <p className="text-xl text-muted-foreground font-semibold">Preparing the punchline...</p>
          </div>
        ) : error ? (
          <div className="text-center p-4">
            <p className="text-red-500 font-bold text-lg">
              Connection Error: {error.message}.
            </p>
            <p className="text-sm text-muted-foreground mt-2">
              Please try fetching a new joke.
            </p>
          </div>
        ) : joke ? (
          <div className="space-y-8">
            <p className="text-2xl font-medium text-foreground leading-relaxed italic">
              "{joke.setup}"
            </p>
            <div className="border-l-4 border-accent pl-6 pt-2 bg-accent/10 p-4 rounded-r-lg shadow-inner">
                <p className="text-3xl font-extrabold text-primary animate-pop">
                  {joke.punchline}
                </p>
            </div>
          </div>
        ) : (
          <div className="text-center p-4">
            <p className="text-xl text-muted-foreground font-semibold">
              Ready for a laugh?
            </p>
            <p className="text-md text-muted-foreground mt-2">
              Click the button below to load your first joke!
            </p>
          </div>
        )}
      </CardContent>
      <CardFooter className="p-6 pt-0">
        <Button 
          onClick={handleFetchNewJoke} 
          className="w-full text-xl py-7 font-bold shadow-lg shadow-primary/30 transition-all duration-300 hover:scale-[1.02] hover:shadow-primary/50"
          disabled={isFetching}
        >
          {isFetching ? (
            <>
              <Loader2 className="mr-2 h-6 w-6 animate-spin" />
              Fetching Laughs...
            </>
          ) : (
            "Get a New Joke"
          )}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default JokeCard;