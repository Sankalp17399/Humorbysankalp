"use client";

import * as React from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2, Sparkles, Heart, Share2, Check } from "lucide-react";
import { getJoke, Joke } from "@/lib/joke-api";
import { showSuccess, showError } from "@/utils/toast";
import { useFavorites } from "@/hooks/use-favorites";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";

const JokeCard: React.FC = () => {
  const isMobile = useIsMobile();
  const [copied, setCopied] = React.useState(false);
  const cardRef = React.useRef<HTMLDivElement>(null);
  const [rotation, setRotation] = React.useState({ x: 0, y: 0 });
  const [glowPosition, setGlowPosition] = React.useState({ x: 0, y: 0 });

  const { data: joke, isLoading, isFetching, error, refetch } = useQuery<Joke, Error>({
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
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = (y - centerY) / 30;
    const rotateY = (centerX - x) / 30;
    
    setRotation({ x: rotateX, y: rotateY });
    setGlowPosition({ x, y });
  };

  const handleMouseLeave = () => {
    setRotation({ x: 0, y: 0 });
  };

  const handleShare = async () => {
    if (!joke) return;
    const text = `${joke.setup}\n\n${joke.punchline}`;
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      showSuccess("Copied to clipboard");
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      showError("Failed to copy");
    }
  };

  const currentJokeIsFavorite = joke ? isFavorite(joke.id) : false;

  return (
    <div 
      className="w-full max-w-xl px-4 py-2 sm:py-6 flex justify-center perspective-[1200px]"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div
        ref={cardRef}
        style={{
          transform: isMobile ? 'none' : `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
          transition: isFetching ? 'none' : 'transform 0.2s ease-out'
        }}
        className="w-full relative transition-transform duration-300 preserve-3d"
      >
        <Card className="relative border border-white/10 bg-white/[0.01] backdrop-blur-[40px] sm:backdrop-blur-[80px] shadow-[0_0_50px_rgba(0,0,0,0.5)] sm:shadow-[0_0_80px_rgba(0,0,0,0.8)] rounded-[1.5rem] sm:rounded-[2.5rem] overflow-hidden group">
          {!isMobile && (
            <div 
              className="pointer-events-none absolute -inset-px z-30 transition-opacity duration-500 opacity-0 group-hover:opacity-100"
              style={{
                background: `radial-gradient(350px circle at ${glowPosition.x}px ${glowPosition.y}px, rgba(255,255,255,0.06), transparent 40%)`,
              }}
            />
          )}
          
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-40 z-0" />
          
          <CardHeader className="relative flex flex-row items-center justify-between p-6 sm:p-8 pb-0 z-10">
            <div className="flex items-center space-x-2 sm:space-x-3">
              <div className="h-1.5 w-1.5 bg-primary rounded-full animate-pulse" />
              <div className="flex flex-col">
                <span className="text-white/20 text-[7px] sm:text-[9px] font-black uppercase tracking-[0.3em]">Entry_{joke?.id || "0000"}</span>
              </div>
            </div>
            <div className="flex items-center space-x-1.5 sm:space-x-2">
              <button 
                onClick={handleShare}
                className="p-2 sm:p-3 rounded-lg sm:rounded-xl bg-white/5 text-white/30 hover:text-white transition-all active:scale-90"
              >
                {copied ? <Check className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-green-400" /> : <Share2 className="h-3.5 w-3.5 sm:h-4 sm:w-4" />}
              </button>
              {joke && (
                <button 
                  onClick={(e) => { e.stopPropagation(); toggleFavorite(joke); }}
                  className="p-2 sm:p-3 rounded-lg sm:rounded-xl bg-white/5 transition-all active:scale-90"
                >
                  <Heart 
                    className={cn(
                      "h-3.5 w-3.5 sm:h-4 sm:w-4 transition-all",
                      currentJokeIsFavorite 
                        ? "fill-primary text-primary drop-shadow-[0_0_8px_rgba(180,160,255,0.6)]" 
                        : "text-white/20 hover:text-white/50"
                    )} 
                  />
                </button>
              )}
            </div>
          </CardHeader>
          
          <CardContent className="relative min-h-[180px] sm:min-h-[260px] flex flex-col justify-center px-6 sm:px-12 py-6 sm:py-8 z-10">
            {isLoading || isFetching ? (
              <div className="space-y-4 sm:space-y-6">
                <div className="h-5 sm:h-8 w-3/4 bg-white/5 rounded-full shimmer" />
                <div className="h-8 sm:h-12 w-full bg-white/5 rounded-xl shimmer" />
              </div>
            ) : joke ? (
              <div className="space-y-6 sm:space-y-10">
                <h2 className="text-lg sm:text-2xl lg:text-3xl font-semibold leading-snug tracking-tight text-white/90">
                  {joke.setup}
                </h2>
                <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                  <p className="text-2xl sm:text-4xl lg:text-5xl font-black bg-clip-text text-transparent bg-gradient-to-r from-white via-primary to-white/20 leading-tight tracking-tighter">
                    {joke.punchline}
                  </p>
                </div>
              </div>
            ) : null}
          </CardContent>

          <CardFooter className="relative p-6 sm:p-8 pt-0 z-10">
            <Button 
              onClick={handleFetchNewJoke} 
              disabled={isFetching}
              className="w-full h-12 sm:h-16 rounded-xl sm:rounded-2xl bg-white text-black hover:bg-white/90 font-black text-[10px] sm:text-xs uppercase tracking-[0.2em] transition-all active:scale-[0.97] shadow-lg"
            >
              {isFetching ? <Loader2 className="h-4 w-4 animate-spin" /> : "Discover Next"}
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default JokeCard;