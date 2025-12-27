"use client";

import * as React from "react";
import { useFavorites } from "@/hooks/use-favorites";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Heart, Trash2, Sparkles } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

const Favorites: React.FC = () => {
  const { favorites, toggleFavorite } = useFavorites();
  const isMobile = useIsMobile();

  return (
    <div className="w-full max-w-7xl mx-auto space-y-12 sm:space-y-24 py-8 sm:py-16 px-4 sm:px-0 animate-in fade-in duration-700">
      <div className="text-center space-y-4 sm:space-y-6">
        <div className="flex items-center justify-center space-x-3 text-primary/40 text-[9px] sm:text-[10px] font-black uppercase tracking-[0.4em] sm:tracking-[0.6em]">
          <Sparkles className="h-3 w-3 sm:h-4 sm:w-4" />
          <span>Holographic Archive</span>
        </div>
        <h1 className="text-4xl sm:text-8xl font-black tracking-tighter text-white">Archive.</h1>
        <p className="text-white/20 text-sm sm:text-xl font-medium tracking-tight">Your curated moments of discovery.</p>
      </div>

      {favorites.length === 0 ? (
        <div className="flex flex-col items-center justify-center p-20 sm:p-40 border border-white/5 bg-white/[0.01] rounded-[2rem] sm:rounded-[4rem] backdrop-blur-3xl">
          <Heart className="h-10 w-10 sm:h-16 sm:w-16 text-white/5 mb-6 sm:mb-8" />
          <p className="text-white/10 font-bold uppercase tracking-[0.2em] text-[9px] sm:text-[10px]">Registry Empty</p>
        </div>
      ) : (
        <div className="grid gap-6 sm:gap-10 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {favorites.map((joke, index) => (
            <Card 
              key={joke.id} 
              style={{ animationDelay: `${index * 80}ms` }}
              className="animate-in fade-in slide-in-from-bottom-8 duration-700 fill-mode-both border border-white/10 bg-white/[0.02] backdrop-blur-2xl rounded-2xl sm:rounded-[2.5rem] overflow-hidden group hover:border-white/20 transition-all"
            >
              <CardHeader className="flex flex-row items-center justify-between p-6 sm:p-10 pb-4">
                <span className="text-[8px] sm:text-[9px] font-black uppercase tracking-[0.2em] text-white/10">ID_#{joke.id}</span>
                <button 
                  onClick={() => toggleFavorite(joke)}
                  className="p-2.5 rounded-xl bg-white/0 hover:bg-white/5 text-white/10 hover:text-destructive transition-all"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </CardHeader>
              <CardContent className="p-6 sm:p-10 pt-0 space-y-6 sm:space-y-10">
                <p className="text-lg sm:text-2xl font-semibold text-white/80 leading-snug tracking-tight">
                  {joke.setup}
                </p>
                <p className="text-2xl sm:text-3xl font-black text-primary tracking-tighter">
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