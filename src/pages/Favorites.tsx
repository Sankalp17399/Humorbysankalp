"use client";

import * as React from "react";
import { useFavorites } from "@/hooks/use-favorites";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Heart, Trash2, Sparkles } from "lucide-react";

const Favorites: React.FC = () => {
  const { favorites, toggleFavorite } = useFavorites();

  return (
    <div className="w-full max-w-7xl mx-auto space-y-8 sm:space-y-12 py-4 sm:py-8 animate-in fade-in duration-700">
      <div className="text-center space-y-2 sm:space-y-4">
        <div className="flex items-center justify-center space-x-3 text-primary/60 text-[9px] sm:text-[10px] font-black uppercase tracking-[0.4em] sm:tracking-[0.6em]">
          <Sparkles className="h-3 w-3 sm:h-4 sm:w-4" />
          <span>Holographic Archive</span>
        </div>
        <h1 className="text-4xl sm:text-7xl font-black tracking-tighter text-white leading-none">Archive.</h1>
        <p className="text-white/60 text-xs sm:text-lg font-medium tracking-tight">Your curated moments of discovery.</p>
      </div>

      {favorites.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 sm:py-32 border border-white/10 bg-white/[0.02] rounded-[2.5rem] backdrop-blur-3xl">
          <Heart className="h-10 w-10 sm:h-16 sm:w-16 text-white/10 mb-6 sm:mb-8" />
          <p className="text-white/30 font-bold uppercase tracking-[0.3em] text-[9px] sm:text-[11px]">Registry Empty</p>
        </div>
      ) : (
        <div className="grid gap-4 sm:gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {favorites.map((joke, index) => (
            <Card 
              key={joke.id} 
              style={{ animationDelay: `${index * 50}ms` }}
              className="animate-in fade-in slide-in-from-bottom-4 duration-500 fill-mode-both border border-white/20 bg-white/[0.03] backdrop-blur-2xl rounded-2xl overflow-hidden group hover:border-primary/40 transition-all shadow-lg"
            >
              <CardHeader className="flex flex-row items-center justify-between p-6 sm:p-8 pb-2">
                <span className="text-[8px] sm:text-[9px] font-black uppercase tracking-[0.2em] text-white/40">ID_#{joke.id}</span>
                <button 
                  onClick={() => toggleFavorite(joke)}
                  className="p-2 rounded-lg bg-white/0 hover:bg-white/10 text-white/30 hover:text-red-500 transition-all"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </CardHeader>
              <CardContent className="p-6 sm:p-8 pt-0 space-y-3 sm:space-y-5">
                <p className="text-base sm:text-xl font-bold text-white leading-snug tracking-tight">
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