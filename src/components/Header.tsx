import * as React from "react";
import { Link } from "react-router-dom";
import { Laugh, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useFavorites } from "@/hooks/use-favorites";
import { ThemeToggle } from "./ThemeToggle";

const Header: React.FC = () => {
  const { favorites } = useFavorites();
  const favoriteCount = favorites.length;

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 shadow-md">
      <div className="container flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center space-x-3 group">
          <Laugh className="h-7 w-7 text-primary transition-transform duration-300 group-hover:rotate-12" />
          <span className="hidden font-extrabold sm:inline-block text-2xl bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">
            Dad Joke Hub
          </span>
        </Link>
        <nav className="flex items-center space-x-1 sm:space-x-2">
          <Button variant="ghost" asChild className="text-base hover:bg-accent/50 transition-colors">
            <Link to="/">
              Jokes
            </Link>
          </Button>
          <Button variant="ghost" asChild className="relative text-base hover:bg-accent/50 transition-colors">
            <Link to="/favorites" className="flex items-center">
              <Heart className="h-4 w-4 mr-1 fill-red-500 text-red-500 transition-transform duration-300 hover:scale-110" />
              Favorites
              {favoriteCount > 0 && (
                <span className="absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center p-1 animate-pop">
                  {favoriteCount}
                </span>
              )}
            </Link>
          </Button>
          <ThemeToggle />
        </nav>
      </div>
      <Separator />
    </header>
  );
};

export default Header;