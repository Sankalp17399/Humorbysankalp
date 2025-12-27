"use client";

import * as React from "react";
import { useFavorites } from "@/hooks/use-favorites";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Heart, Trash2, Sparkles } from "lucide-react";

const Favorites: React.FC = () => {
  const { favorites, toggleFavorite } = useFavorites();

  return (
    <div className="w-full max-w-7xl mx-auto space-y-8 sm:space-y-16 py-6 sm:py-12 px-4 sm:px-0 animate-in fade-in duration-700">
      <div className="text-center space-y-3 sm:space-y-4">
        <div className="flex items-center justify-center space-x-2 text-primary/40 text-[8px] sm:text-[10px] font-black uppercase tracking-[0.4em]">
          <Sparkles className="h-3 w-3" />
          <span>Holographic Archive</span>
        </div>
        <h1 className="text-3xl sm:text-7xl font-black tracking-tighter text-white">Archive.</h1>
        <p className="text-white/20 text-xs sm:text-lg font-medium tracking-tight">Your curated moments of discovery.</p>
      </div>

      {favorites.length === 0 ? (
        <div className="flex flex-col items-center justify-center p-16 sm:p-32 border border-white/5 bg-white/[0.01] rounded-[1.5rem] sm:rounded-[3rem] backdrop-blur-3xl">
          <Heart className="h-8 w-8 sm:h-12 sm:w-12 text-white/5 mb-4 sm:mb-6" />
          <p className="text-white/10 font-bold uppercase tracking-[0.2em] text-[8px] sm:text-[9px]">Registry Empty</p>
        </div>
      ) : (
        <div className="grid gap-4 sm:gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {favorites.map((joke, index) => (
            <Card 
              key={joke.id} 
              style={{ animationDelay: `${index * 50}ms` }}
              className="animate-in fade-in slide-in-from-bottom-4 duration-500 fill-mode-both border border-white/10 bg-white/[0.02] backdrop-blur-2xl rounded-xl sm:rounded-[1.5rem] overflow-hidden group hover:border-white/20 transition-all"
            >
              <CardHeader className="flex flex-row items-center justify-between p-5 sm:p-6 pb-2">
                <span className="text-[7px] sm:text-[8px] font-black uppercase tracking-[0.2em] text-white/10">ID_#{joke.id}</span>
                <button 
                  onClick={() => toggleFavorite(joke)}
                  className="p-1.5 rounded-lg bg-white/0 hover:bg-white/5 text-white/10 hover:text-destructive transition-all"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </button>
              </CardHeader>
              <CardContent className="p-5 sm:p-6 pt-0 space-y-3 sm:space-y-5">
                <p className="text-base sm:text-xl font-semibold text-white/80 leading-snug tracking-tight">
                  {joke.setup}
                </p>
                <p className="text-xl sm:text-2xl font-black text-primary tracking-tighter">
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