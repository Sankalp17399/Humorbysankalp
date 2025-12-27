import * as React from "react";
import { Joke } from "@/lib/joke-api";
import { showSuccess } from "@/utils/toast";

const STORAGE_KEY = "favoriteJokes";

export function useFavorites() {
  const [favorites, setFavorites] = React.useState<Joke[]>(() => {
    if (typeof window !== "undefined") {
      try {
        const stored = localStorage.getItem(STORAGE_KEY);
        return stored ? JSON.parse(stored) : [];
      } catch (e) {
        console.error("Could not parse favorites from localStorage", e);
        return [];
      }
    }
    return [];
  });

  React.useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
    } catch (e) {
      console.error("Could not save favorites to localStorage", e);
    }
  }, [favorites]);

  const isFavorite = (jokeId: number) => {
    return favorites.some(joke => joke.id === jokeId);
  };

  const toggleFavorite = (joke: Joke) => {
    if (isFavorite(joke.id)) {
      // Remove
      setFavorites(prev => prev.filter(f => f.id !== joke.id));
      showSuccess("Joke removed from favorites.");
    } else {
      // Add
      setFavorites(prev => [joke, ...prev]);
      showSuccess("Joke added to favorites!");
    }
  };

  return {
    favorites,
    isFavorite,
    toggleFavorite,
  };
}