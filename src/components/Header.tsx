"use client";

import * as React from "react";
import { NavLink, Link } from "react-router-dom";
import { Sparkles, Heart, Zap, Menu } from "lucide-react";
import { cn } from "@/lib/utils";
import { useFavorites } from "@/hooks/use-favorites";
import { useIsMobile } from "@/hooks/use-mobile";

const Header: React.FC = () => {
  const { favorites } = useFavorites();
  const isMobile = useIsMobile();
  const favoriteCount = favorites.length;

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/5 bg-black/60 backdrop-blur-3xl">
      <div className="container flex h-16 sm:h-24 items-center justify-between px-4 sm:px-10">
        <div className="flex items-center space-x-6 sm:space-x-12">
          <Link to="/" className="flex items-center space-x-3 sm:space-x-4 group">
            <div className="p-2 sm:p-3 rounded-xl sm:rounded-[1.25rem] bg-primary/10 border border-primary/20 transition-all duration-700 group-hover:bg-primary/20 shadow-[0_0_15px_rgba(180,160,255,0.2)]">
              <Sparkles className="h-4 w-4 sm:h-6 sm:h-6 text-primary" />
            </div>
            <div className="flex flex-col">
              <span className="font-black tracking-tighter text-lg sm:text-2xl text-white leading-none">
                Humor
              </span>
              {!isMobile && (
                <div className="flex items-center space-x-2 mt-1">
                  <div className="h-1 w-1 bg-green-500 rounded-full animate-pulse" />
                  <span className="text-[8px] font-black uppercase tracking-[0.2em] text-white/20">System Live</span>
                </div>
              )}
            </div>
          </Link>
          
          <nav className="flex items-center space-x-6 sm:space-x-10">
            <NavLink 
              to="/" 
              className={({ isActive }) => cn(
                "relative text-[9px] sm:text-[10px] font-black uppercase tracking-[0.2em] sm:tracking-[0.3em] transition-all duration-500",
                isActive ? "text-white" : "text-white/20 hover:text-white/40"
              )}
            >
              {({ isActive }) => (
                <>
                  <span className="flex items-center space-x-1.5 sm:space-x-2">
                    <Zap className={cn("h-3 w-3 transition-colors", isActive ? "text-primary" : "text-transparent")} />
                    <span>Discover</span>
                  </span>
                  {isActive && (
                    <span className="absolute -bottom-2 sm:-bottom-3 left-0 w-full h-[2px] sm:h-[3px] bg-primary rounded-full shadow-[0_0_10px_rgba(180,160,255,1)]" />
                  )}
                </>
              )}
            </NavLink>

            <NavLink 
              to="/favorites" 
              className={({ isActive }) => cn(
                "relative flex items-center space-x-1.5 sm:space-x-2 text-[9px] sm:text-[10px] font-black uppercase tracking-[0.2em] sm:tracking-[0.3em] transition-all duration-500",
                isActive ? "text-white" : "text-white/20 hover:text-white/40"
              )}
            >
              {({ isActive }) => (
                <>
                  <span className="flex items-center space-x-1.5 sm:space-x-2">
                    <Heart className={cn("h-3 w-3 transition-colors", isActive ? "text-primary" : "text-transparent")} />
                    <span>Archive</span>
                  </span>
                  {favoriteCount > 0 && (
                    <span className="h-3.5 px-1.5 flex items-center justify-center bg-primary text-[8px] font-black text-black rounded-full ml-1 sm:ml-2">
                      {favoriteCount}
                    </span>
                  )}
                  {isActive && (
                    <span className="absolute -bottom-2 sm:-bottom-3 left-0 w-full h-[2px] sm:h-[3px] bg-primary rounded-full shadow-[0_0_10px_rgba(180,160,255,1)]" />
                  )}
                </>
              )}
            </NavLink>
          </nav>
        </div>

        {!isMobile && (
          <div className="flex items-center space-x-4">
            <div className="px-4 py-2 rounded-full bg-white/5 border border-white/10">
              <span className="text-[8px] font-black uppercase tracking-[0.3em] text-white/30">Node_ID: 8821-X</span>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;