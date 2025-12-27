import * as React from "react";
import { useFavorites } from "@/hooks/use-favorites";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Heart, Trash2 } from "lucide-react";

const Favorites: React.FC = () => {
  const { favorites, toggleFavorite } = useFavorites();

  return (
    <div className="max-w-7xl mx-auto space-y-12 py-12">
      <div className="text-center space-y-2">
        <h1 className="text-5xl font-bold tracking-tight text-white">Curated Collection</h1>
        <p className="text-muted-foreground text-lg">Your hand-picked selection of favorites.</p>
      </div>

      {favorites.length === 0 ? (
        <div className="flex flex-col items-center justify-center p-20 border border-white/5 bg-white/[0.02] rounded-3xl backdrop-blur-sm">
          <Heart className="h-10 w-10 text-white/10 mb-4" />
          <p className="text-white/40 font-medium">No saved humor yet.</p>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {favorites.map((joke) => (
            <Card 
              key={joke.id} 
              className="border border-white/10 bg-white/[0.03] backdrop-blur-xl rounded-2xl overflow-hidden transition-all duration-500 hover:border-white/20"
            >
              <CardHeader className="flex flex-row items-center justify-between p-6 pb-2">
                <span className="text-[10px] font-black uppercase tracking-widest text-white/20">Entry #{joke.id}</span>
                <button 
                  onClick={() => toggleFavorite(joke)}
                  className="p-2 text-white/20 hover:text-destructive transition-colors"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </CardHeader>
              <CardContent className="p-6 pt-2 space-y-6">
                <p className="text-lg font-medium text-white/80 leading-relaxed">
                  {joke.setup}
                </p>
                <p className="text-xl font-bold text-primary">
                  {joke.punchline}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default Favorites;