import * as React from "react";
import { useFavorites } from "@/hooks/use-favorites";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Heart, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";

const Favorites: React.FC = () => {
  const { favorites, toggleFavorite } = useFavorites();

  return (
    <div className="space-y-8 py-8">
      <h1 className="text-4xl font-extrabold tracking-tight text-center">
        <Heart className="inline h-8 w-8 mr-2 fill-red-500 text-red-500" />
        Your Favorite Jokes
      </h1>

      {favorites.length === 0 ? (
        <div className="text-center p-10 border border-dashed rounded-lg max-w-xl mx-auto">
          <p className="text-xl text-muted-foreground">
            You haven't favorited any jokes yet!
          </p>
          <p className="text-sm text-muted-foreground mt-2">
            Go back to the main page and click the heart icon on a joke you like.
          </p>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {favorites.map((joke) => (
            <Card key={joke.id} className="flex flex-col justify-between transition-shadow hover:shadow-lg">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-semibold text-primary flex justify-between items-center">
                  Joke #{joke.id}
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    onClick={() => toggleFavorite(joke)}
                    aria-label="Remove joke"
                  >
                    <Trash2 className="h-4 w-4 text-destructive" />
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-base text-gray-700 dark:text-gray-300 leading-relaxed">
                  {joke.setup}
                </p>
                <div className="border-l-2 border-accent pl-3">
                    <p className="text-lg font-medium text-foreground">
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