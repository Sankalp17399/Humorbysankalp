import * as React from "react";
import { useFavorites } from "@/hooks/use-favorites";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Heart, Trash2, Sparkles } from "lucide-react";

const Favorites: React.FC = () => {
  const { favorites, toggleFavorite } = useFavorites();

  return (
    <div className="max-w-7xl mx-auto space-y-20 py-12 animate-in fade-in duration-1000">
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center space-x-3 text-primary/40 text-[10px] font-black uppercase tracking-[0.4em]">
          <Sparkles className="h-4 w-4" />
          <span>Private Archive</span>
        </div>
        <h1 className="text-6xl sm:text-7xl font-black tracking-tighter text-white">Curated.</h1>
        <p className="text-white/30 text-lg font-medium tracking-tight">Your personal repository of selected humor.</p>
      </div>

      {favorites.length === 0 ? (
        <div className="flex flex-col items-center justify-center p-32 border border-white/5 bg-white/[0.01] rounded-[3rem] backdrop-blur-3xl">
          <Heart className="h-12 w-12 text-white/5 mb-6" />
          <p className="text-white/20 font-bold uppercase tracking-widest text-xs">Archive Empty</p>
        </div>
      ) : (
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {favorites.map((joke, index) => (
            <Card 
              key={joke.id} 
              style={{ animationDelay: `${index * 100}ms` }}
              className="animate-in fade-in slide-in-from-bottom-12 duration-1000 fill-mode-both border border-white/10 bg-white/[0.02] backdrop-blur-3xl rounded-[2rem] overflow-hidden group hover:border-white/20 transition-all"
            >
              <CardHeader className="flex flex-row items-center justify-between p-8 pb-4">
                <span className="text-[9px] font-black uppercase tracking-[0.2em] text-white/20">ENTRY #{joke.id}</span>
                <button 
                  onClick={() => toggleFavorite(joke)}
                  className="p-2.5 rounded-xl bg-white/0 hover:bg-white/5 text-white/10 hover:text-destructive transition-all"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </CardHeader>
              <CardContent className="p-8 pt-0 space-y-8">
                <p className="text-xl font-semibold text-white/80 leading-snug tracking-tight">
                  {joke.setup}
                </p>
                <p className="text-2xl font-black text-primary tracking-tighter">
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