"use client";

import * as React from "react";
import { useFavorites } from "@/hooks/use-favorites";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Heart, Trash2, Sparkles } from "lucide-react";

const Favorites: React.FC = () => {
  const { favorites, toggleFavorite } = useFavorites();

  return (
    <div className="w-full max-w-7xl mx-auto space-y-10 sm:space-y-20 py-8 sm:py-16 px-4 sm:px-0 animate-in fade-in duration-700">
      <div className="text-center space-y-4 sm:space-y-6">
        <div className="flex items-center justify-center space-x-3 text-primary/60 text-[9px] sm:text-[11px] font-black uppercase tracking-[0.4em] sm:tracking-[0.6em]">
          <Sparkles className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
          <span>Holographic Archive</span>
        </div>
        <h1 className="text-4xl sm:text-8xl font-black tracking-tighter text-white">Archive.</h1>
        <p className="text-white/60 text-sm sm:text-xl font-medium tracking-tight">Your curated moments of discovery.</p>
      </div>

      {favorites.length === 0 ? (
        <div className="flex flex-col items-center justify-center p-24 sm:p-48 border border-white/10 bg-white/[0.02] rounded-[2.5rem] sm:rounded-[4rem] backdrop-blur-3xl shadow-[0_0_40px_rgba(0,0,0,0.5)]">
          <Heart className="h-12 w-12 sm:h-20 sm:w-20 text-white/10 mb-8 sm:mb-10" />
          <p className="text-white/30 font-bold uppercase tracking-[0.3em] text-[10px] sm:text-[12px]">Registry Empty</p>
        </div>
      ) : (
        <div className="grid gap-6 sm:gap-10 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {favorites.map((joke, index) => (
            <Card 
              key={joke.id} 
              style={{ animationDelay: `${index * 50}ms` }}
              className="animate-in fade-in slide-in-from-bottom-6 duration-700 fill-mode-both border border-white/20 bg-white/[0.03] backdrop-blur-2xl rounded-2xl sm:rounded-[2.5rem] overflow-hidden group hover:border-primary/40 transition-all shadow-[0_15px_40px_rgba(0,0,0,0.4)]"
            >
              <CardHeader className="flex flex-row items-center justify-between p-7 sm:p-10 pb-4">
                <span className="text-[8px] sm:text-[10px] font-black uppercase tracking-[0.3em] text-white/40">ID_#{joke.id}</span>
                <button 
                  onClick={() => toggleFavorite(joke)}
                  className="p-2.5 rounded-xl bg-white/0 hover:bg-white/10 text-white/30 hover:text-red-500 transition-all border border-transparent hover:border-red-500/20"
                >
                  <Trash2 className="h-4.5 w-4.5" />
                </button>
              </CardHeader>
              <CardContent className="p-7 sm:p-10 pt-0 space-y-4 sm:space-y-8">
                <p className="text-lg sm:text-2xl font-bold text-white leading-snug tracking-tight">
                  {joke.setup}
                </p>
                <p className="text-2xl sm:text-4xl font-black text-primary tracking-tighter drop-shadow-[0_0_10px_rgba(180,160,255,0.4)]">
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