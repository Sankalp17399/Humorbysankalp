"use client";

import * as React from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2, Heart, Copy, Check } from "lucide-react";
import { getJoke, Joke } from "@/lib/joke-api";
import { showSuccess, showError } from "@/utils/toast";
import { useFavorites } from "@/hooks/use-favorites";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";

const JokeCard: React.FC = () => {
  const isMobile = useIsMobile();
  const [copied, setCopied] = React.useState(false);
  const [glowPosition, setGlowPosition] = React.useState({ x: 0, y: 0 });
  const cardRef = React.useRef<HTMLDivElement>(null);

  const { data: joke, isLoading, isFetching, refetch } = useQuery<Joke, Error>({
    queryKey: ["joke", "random"],
    queryFn: () => getJoke("random"),
    staleTime: Infinity,
    refetchOnWindowFocus: false,
  });

  const { isFavorite, toggleFavorite } = useFavorites();
  
  const handleFetchNewJoke = () => {
    refetch();
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isMobile || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setGlowPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  const handleCopy = async () => {
    if (!joke) return;
    const text = `${joke.setup}\n\n${joke.punchline}`;
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      showSuccess("Joke copied to clipboard!");
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      showError("Failed to copy");
    }
  };

  const currentJokeIsFavorite = joke ? isFavorite(joke.id) : false;

  return (
    <div className="w-full max-w-xl px-4 flex flex-col items-center justify-center flex-grow">
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        className="w-full relative group"
      >
        {/* Outer Glow / Shadow */}
        <div className="absolute -inset-2 bg-primary/10 blur-3xl opacity-20 rounded-[3rem] pointer-events-none" />
        
        <Card className="relative border border-white/10 bg-white/[0.02] backdrop-blur-3xl shadow-[0_0_100px_rgba(0,0,0,0.4)] rounded-[2.5rem] sm:rounded-[3.5rem] overflow-hidden transition-all duration-500">
          {/* Internal Glow Gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/[0.05] via-transparent to-transparent opacity-50 z-0 pointer-events-none" />
          
          {/* Desktop Hover Glow Tracker */}
          {!isMobile && (
            <div 
              className="pointer-events-none absolute -inset-px z-30 transition-opacity duration-500 opacity-0 group-hover:opacity-100"
              style={{
                background: `radial-gradient(400px circle at ${glowPosition.x}px ${glowPosition.y}px, rgba(255,255,255,0.08), transparent 40%)`,
              }}
            />
          )}
          
          <CardHeader className="relative flex flex-row items-center justify-between p-7 sm:p-12 pb-0 z-10">
            <div className="flex items-center space-x-3">
              <div className="h-1.5 w-1.5 bg-primary rounded-full shadow-[0_0_10px_rgba(180,160,255,1)]" />
              <span className="text-white/40 text-[9px] font-black uppercase tracking-[0.4em]">Entry_{joke?.id || "----"}</span>
            </div>
            <div className="flex items-center space-x-3">
              <button 
                onClick={handleCopy}
                className={cn(
                  "p-3 rounded-2xl bg-white/[0.05] transition-all active:scale-95 border border-white/[0.05] hover:bg-white/10",
                  copied ? "text-green-400 border-green-400/30 bg-green-400/10" : "text-white/40 hover:text-white"
                )}
                aria-label="Copy joke"
              >
                {copied ? <Check className="h-4 w-4 sm:h-5 sm:w-5" /> : <Copy className="h-4 w-4 sm:h-5 sm:w-5" />}
              </button>
              {joke && (
                <button 
                  onClick={(e) => { e.stopPropagation(); toggleFavorite(joke); }}
                  className="p-3 rounded-2xl bg-white/[0.05] transition-all active:scale-95 border border-white/[0.05] hover:bg-white/10"
                  aria-label="Toggle favorite"
                >
                  <Heart 
                    className={cn(
                      "h-4 w-4 sm:h-5 sm:w-5 transition-all duration-500",
                      currentJokeIsFavorite 
                        ? "fill-red-500 text-red-500 drop-shadow-[0_0_12px_rgba(239,68,68,0.6)]" 
                        : "text-white/40 hover:text-white"
                    )} 
                  />
                </button>
              )}
            </div>
          </CardHeader>
          
          <CardContent className="relative min-h-[180px] sm:min-h-[260px] flex flex-col justify-center px-10 sm:px-16 py-8 sm:py-10 z-10">
            {isLoading || isFetching ? (
              <div className="space-y-6">
                <div className="h-8 w-3/4 bg-white/5 rounded-full animate-pulse" />
                <div className="h-12 w-full bg-white/5 rounded-2xl animate-pulse" />
              </div>
            ) : joke ? (
              <div className="space-y-8 sm:space-y-12">
                <h2 className="text-xl sm:text-3xl font-bold leading-snug tracking-tight text-white/90">
                  {joke.setup}
                </h2>
                <div className="animate-in fade-in slide-in-from-bottom-6 duration-700">
                  <p className="text-3xl sm:text-5xl font-black bg-clip-text text-transparent bg-gradient-to-r from-white via-primary/80 to-white/80 leading-[1.1] tracking-tighter">
                    {joke.punchline}
                  </p>
                </div>
              </div>
            ) : null}
          </CardContent>

          <CardFooter className="relative p-7 sm:p-12 pt-0 z-10">
            <Button 
              onClick={handleFetchNewJoke} 
              disabled={isFetching}
              className="w-full h-16 sm:h-20 rounded-[1.5rem] bg-white text-black hover:bg-white/90 font-black text-[12px] uppercase tracking-[0.3em] transition-all active:scale-[0.98] shadow-2xl"
            >
              {isFetching ? <Loader2 className="h-6 w-6 animate-spin" /> : "Next Discovery"}
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default JokeCard;