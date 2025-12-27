import * as React from "react";
import { Link } from "react-router-dom";
import { Sparkles, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useFavorites } from "@/hooks/use-favorites";

const Header: React.FC = () => {
  const { favorites } = useFavorites();
  const favoriteCount = favorites.length;

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/5 bg-black/20 backdrop-blur-xl">
      <div className="container flex h-16 items-center justify-between px-6">
        <Link to="/" className="flex items-center space-x-2 group">
          <div className="p-2 rounded-xl bg-primary/10 border border-primary/20 transition-all duration-500 group-hover:bg-primary/20">
            <Sparkles className="h-5 w-5 text-primary" />
          </div>
          <span className="font-bold tracking-tight text-xl bg-clip-text text-transparent bg-gradient-to-r from-white to-white/60">
            Humor
          </span>
        </Link>
        <nav className="flex items-center space-x-4">
          <Link to="/" className="text-sm font-medium text-muted-foreground hover:text-white transition-colors">
            Discover
          </Link>
          <Link to="/favorites" className="relative group flex items-center space-x-2 text-sm font-medium text-muted-foreground hover:text-white transition-colors">
            <span>Favorites</span>
            <Heart className="h-4 w-4 text-primary transition-transform duration-300 group-hover:scale-110" />
            {favoriteCount > 0 && (
              <span className="absolute -top-1 -right-2 h-4 w-4 flex items-center justify-center bg-primary text-[10px] font-bold text-black rounded-full">
                {favoriteCount}
              </span>
            )}
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;