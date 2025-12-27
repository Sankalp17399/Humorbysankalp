import * as React from "react";
import { Link } from "react-router-dom";
import { Laugh, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useFavorites } from "@/hooks/use-favorites";

const Header: React.FC = () => {
  const { favorites } = useFavorites();
  const favoriteCount = favorites.length;

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center space-x-2">
          <Laugh className="h-6 w-6 text-primary" />
          <span className="hidden font-bold sm:inline-block text-xl">
            Dad Joke Hub
          </span>
        </Link>
        <nav className="flex items-center space-x-2">
          <Button variant="ghost" asChild>
            <Link to="/">
              Jokes
            </Link>
          </Button>
          <Button variant="ghost" asChild className="relative">
            <Link to="/favorites" className="flex items-center">
              <Heart className="h-4 w-4 mr-1 fill-red-500 text-red-500" />
              Favorites
              {favoriteCount > 0 && (
                <span className="absolute top-1 right-1 transform translate-x-1/2 -translate-y-1/2 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center p-1">
                  {favoriteCount}
                </span>
              )}
            </Link>
          </Button>
        </nav>
      </div>
      <Separator />
    </header>
  );
};

export default Header;