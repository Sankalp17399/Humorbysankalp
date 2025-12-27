import * as React from "react";
import { NavLink, Link } from "react-router-dom";
import { Sparkles, Heart, Zap } from "lucide-react";
import { cn } from "@/lib/utils";
import { useFavorites } from "@/hooks/use-favorites";

const Header: React.FC = () => {
  const { favorites } = useFavorites();
  const favoriteCount = favorites.length;

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/5 bg-black/40 backdrop-blur-3xl">
      <div className="container flex h-24 items-center justify-between px-10">
        <div className="flex items-center space-x-12">
          <Link to="/" className="flex items-center space-x-4 group">
            <div className="p-3 rounded-[1.25rem] bg-primary/10 border border-primary/20 transition-all duration-700 group-hover:bg-primary/20 group-hover:scale-110 group-hover:rotate-12 shadow-[0_0_20px_rgba(180,160,255,0.2)]">
              <Sparkles className="h-6 w-6 text-primary" />
            </div>
            <div className="flex flex-col">
              <span className="font-black tracking-tighter text-2xl text-white leading-none">
                Humor
              </span>
              <div className="flex items-center space-x-2 mt-1">
                <div className="h-1 w-1 bg-green-500 rounded-full animate-pulse" />
                <span className="text-[8px] font-black uppercase tracking-[0.2em] text-white/20">System Live</span>
              </div>
            </div>
          </Link>
          
          <nav className="hidden md:flex items-center space-x-10">
            <NavLink 
              to="/" 
              className={({ isActive }) => cn(
                "relative text-[10px] font-black uppercase tracking-[0.3em] transition-all duration-500",
                isActive ? "text-white" : "text-white/20 hover:text-white/40"
              )}
            >
              {({ isActive }) => (
                <>
                  <span className="flex items-center space-x-2">
                    <Zap className={cn("h-3 w-3 transition-colors", isActive ? "text-primary" : "text-transparent")} />
                    <span>Discover</span>
                  </span>
                  {isActive && (
                    <span className="absolute -bottom-3 left-0 w-full h-[3px] bg-primary rounded-full shadow-[0_0_15px_rgba(180,160,255,1)]" />
                  )}
                </>
              )}
            </NavLink>

            <NavLink 
              to="/favorites" 
              className={({ isActive }) => cn(
                "relative flex items-center space-x-2 text-[10px] font-black uppercase tracking-[0.3em] transition-all duration-500",
                isActive ? "text-white" : "text-white/20 hover:text-white/40"
              )}
            >
              {({ isActive }) => (
                <>
                  <span className="flex items-center space-x-2">
                    <Heart className={cn("h-3 w-3 transition-colors", isActive ? "text-primary" : "text-transparent")} />
                    <span>Archive</span>
                  </span>
                  {favoriteCount > 0 && (
                    <span className="h-4 px-1.5 flex items-center justify-center bg-primary text-[8px] font-black text-black rounded-full ml-2">
                      {favoriteCount}
                    </span>
                  )}
                  {isActive && (
                    <span className="absolute -bottom-3 left-0 w-full h-[3px] bg-primary rounded-full shadow-[0_0_15px_rgba(180,160,255,1)]" />
                  )}
                </>
              )}
            </NavLink>
          </nav>
        </div>

        <div className="flex items-center space-x-4">
           <div className="px-4 py-2 rounded-full bg-white/5 border border-white/10 hidden sm:block">
            <span className="text-[8px] font-black uppercase tracking-[0.3em] text-white/30">Node_ID: 8821-X</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;