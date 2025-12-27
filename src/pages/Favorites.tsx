import * as React from "react";
import { useFavorites } from "@/hooks/use-favorites";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Heart, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";

const Favorites: React.FC = () => {
  const { favorites, toggleFavorite } = useFavorites();

  return (
    <div className="space-y-10 py-8">
      <h1 className="text-5xl font-extrabold tracking-tighter text-center bg-clip-text text-transparent bg-gradient-to-r from-red-500 to-pink-600">
        <Heart className="inline h-10 w-10 mr-3 fill-red-500 text-red-500 animate-heart-beat" />
        Your Favorite Jokes
      </h1>

      {favorites.length === 0 ? (
        <div className="text-center p-12 border-4 border-dashed border-muted-foreground/30 rounded-xl max-w-xl mx-auto bg-secondary/20 shadow-inner">
          <p className="text-2xl font-semibold text-muted-foreground">
            No favorites yet!
          </p>
          <p className="text-md text-muted-foreground mt-3">
            Head back to the Jokes page and start collecting your best laughs.
          </p>
        </div>
      ) : (
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {favorites.map((joke) => (
            <Card 
              key={joke.id} 
              className="flex flex-col justify-between shadow-lg hover:shadow-xl transition-all duration-300 border-l-4 border-red-500 dark:border-red-400"
            >
              <CardHeader className="pb-2 flex flex-row items-center justify-between bg-secondary/30 dark:bg-secondary/50 p-4">
                <CardTitle className="text-base font-bold text-foreground/70">
                  Joke #{joke.id}
                </CardTitle>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={() => toggleFavorite(joke)}
                  aria-label="Remove joke"
                  className="text-destructive hover:bg-destructive/10 transition-transform hover:scale-110"
                >
                  <Trash2 className="h-5 w-5" />
                </Button>
              </CardHeader>
              <CardContent className="space-y-4 p-4 flex-grow">
                <p className="text-lg font-medium text-foreground leading-relaxed">
                  {joke.setup}
                </p>
                <div className="border-l-2 border-primary pl-3 pt-1">
                    <p className="text-xl font-bold text-primary">
                      {joke.punchline}
                    </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default Favorites;