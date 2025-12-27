import * as React from "react";
import { useFavorites } from "@/hooks/use-favorites";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Heart, Trash2, Sparkles } from "lucide-react";

const Favorites: React.FC = () => {
  const { favorites, toggleFavorite } = useFavorites();

  return (
    <div className="max-w-7xl mx-auto space-y-24 py-16 animate-in fade-in duration-1000">
      <div className="text-center space-y-6">
        <div className="flex items-center justify-center space-x-3 text-primary/40 text-[10px] font-black uppercase tracking-[0.6em]">
          <Sparkles className="h-4 w-4" />
          <span>Curated Gallery</span>
        </div>
        <h1 className="text-7xl sm:text-8xl font-black tracking-tighter text-white">Archive.</h1>
        <p className="text-white/20 text-xl font-medium tracking-tight">A collection of your selected moments.</p>
      </div>

      {favorites.length === 0 ? (
        <div className="flex flex-col items-center justify-center p-40 border border-white/5 bg-white/[0.01] rounded-[4rem] backdrop-blur-3xl transition-all hover:bg-white/[0.02]">
          <Heart className="h-16 w-16 text-white/5 mb-8" />
          <p className="text-white/10 font-bold uppercase tracking-[0.3em] text-[10px]">No entries saved</p>
        </div>
      ) : (
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
          {favorites.map((joke, index) => (
            <Card 
              key={joke.id} 
              style={{ animationDelay: `${index * 100}ms` }}
              className="animate-in fade-in slide-in-from-bottom-12 duration-1000 fill-mode-both border border-white/10 bg-white/[0.02] backdrop-blur-3xl rounded-[2.5rem] overflow-hidden group hover:border-white/20 transition-all"
            >
              <CardHeader className="flex flex-row items-center justify-between p-10 pb-4">
                <span className="text-[9px] font-black uppercase tracking-[0.3em] text-white/10">ID #{joke.id}</span>
                <button 
                  onClick={() => toggleFavorite(joke)}
                  className="p-3 rounded-2xl bg-white/0 hover:bg-white/5 text-white/10 hover:text-destructive transition-all"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </CardHeader>
              <CardContent className="p-10 pt-0 space-y-10">
                <p className="text-2xl font-semibold text-white/80 leading-snug tracking-tight">
                  {joke.setup}
                </p>
                <p className="text-3xl font-black text-primary tracking-tighter">
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