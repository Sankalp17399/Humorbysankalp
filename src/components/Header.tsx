import * as React from "react";
import { NavLink, Link } from "react-router-dom";
import { Sparkles, Heart } from "lucide-react";
import { cn } from "@/lib/utils";
import { useFavorites } from "@/hooks/use-favorites";

const Header: React.FC = () => {
  const { favorites } = useFavorites();
  const favoriteCount = favorites.length;

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/5 bg-black/40 backdrop-blur-2xl">
      <div className="container flex h-20 items-center justify-between px-8">
        <Link to="/" className="flex items-center space-x-3 group">
          <div className="p-2.5 rounded-2xl bg-primary/10 border border-primary/20 transition-all duration-500 group-hover:bg-primary/20 group-hover:scale-105">
            <Sparkles className="h-5 w-5 text-primary" />
          </div>
          <span className="font-bold tracking-tighter text-2xl text-white">
            Humor
          </span>
        </Link>
        
        <nav className="flex items-center space-x-8">
          <NavLink 
            to="/" 
            className={({ isActive }) => cn(
              "relative text-sm font-bold uppercase tracking-[0.2em] transition-all duration-300",
              isActive ? "text-white" : "text-white/30 hover:text-white/60"
            )}
          >
            {({ isActive }) => (
              <>
                Discover
                {isActive && (
                  <span className="absolute -bottom-2 left-0 w-full h-0.5 bg-primary rounded-full shadow-[0_0_10px_rgba(180,160,255,0.8)]" />
                )}
              </>
            )}
          </NavLink>

          <NavLink 
            to="/favorites" 
            className={({ isActive }) => cn(
              "relative flex items-center space-x-2 text-sm font-bold uppercase tracking-[0.2em] transition-all duration-300",
              isActive ? "text-white" : "text-white/30 hover:text-white/60"
            )}
          >
            {({ isActive }) => (
              <>
                <span>Favorites</span>
                <Heart className={cn("h-4 w-4 transition-transform", isActive ? "text-primary scale-110" : "text-white/20")} />
                {favoriteCount > 0 && (
                  <span className="absolute -top-2 -right-4 h-4 w-4 flex items-center justify-center bg-primary text-[10px] font-black text-black rounded-full shadow-lg">
                    {favoriteCount}
                  </span>
                )}
                {isActive && (
                  <span className="absolute -bottom-2 left-0 w-full h-0.5 bg-primary rounded-full shadow-[0_0_10px_rgba(180,160,255,0.8)]" />
                )}
              </>
            )}
          </NavLink>
        </nav>
      </div>
    </header>
  );
};

export default Header;