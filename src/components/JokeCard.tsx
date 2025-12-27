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
    // We set staleTime to infinity so react-query doesn't refetch automatically, 
    // allowing the user to control when a new joke is fetched via the button.
    staleTime: Infinity, 
    refetchOnWindowFocus: false,
  });

  const { isFavorite, toggleFavorite } = useFavorites();
  
  const handleFetchNewJoke = async () => {
    // refetch returns a promise that resolves with the query result object
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

  // Determine if we are loading for the very first time (no joke data yet)
  const initialLoading = isLoading && !joke;
  const currentJokeIsFavorite = joke ? isFavorite(joke.id) : false;

  return (
    <Card className="w-full max-w-lg mx-auto shadow-xl border-t-4 border-primary transition-all duration-300 hover:shadow-2xl">
      <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-4">
        <CardTitle className="text-3xl font-extrabold tracking-tight pt-1">
          Joke Generator
        </CardTitle>
        <div className="flex items-center space-x-2">
          {joke && (
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={handleToggleFavorite}
              aria-label={currentJokeIsFavorite ? "Remove from favorites" : "Add to favorites"}
            >
              <Heart 
                className={cn(
                  "h-6 w-6 transition-colors",
                  currentJokeIsFavorite ? "fill-red-500 text-red-500" : "text-muted-foreground hover:text-red-500 hover:fill-red-500/50"
                )} 
              />
            </Button>
          )}
          <Smile className="h-8 w-8 text-primary" />
        </div>
      </CardHeader>
      <CardContent className="min-h-[150px] flex flex-col justify-center">
        {initialLoading ? (
          <div className="flex flex-col items-center justify-center h-full p-8">
            <Loader2 className="h-10 w-10 animate-spin text-primary mb-4" />
            <p className="text-lg text-muted-foreground">Preparing the punchline...</p>
          </div>
        ) : error ? (
          <div className="text-center p-4">
            <p className="text-red-500 font-medium">
              Error: {error.message}. Please try again.
            </p>
          </div>
        ) : joke ? (
          <div className="space-y-6 p-4">
            <p className="text-xl font-medium text-gray-700 dark:text-gray-300 leading-relaxed">
              {joke.setup}
            </p>
            <div className="border-l-4 border-primary pl-4 pt-2">
                <p className="text-2xl font-bold text-foreground">
                  {joke.punchline}
                </p>
            </div>
          </div>
        ) : (
          <div className="text-center p-4">
            <p className="text-lg text-muted-foreground">
              Click the button below to load your first joke!
            </p>
          </div>
        )}
      </CardContent>
      <CardFooter className="pt-4">
        <Button 
          onClick={handleFetchNewJoke} 
          className="w-full text-lg py-6 transition-transform duration-200 hover:scale-[1.01]"
          disabled={isFetching}
        >
          {isFetching ? (
            <>
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              Loading...
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