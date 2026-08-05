import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, useContext, useEffect, useState } from "react";

type FavoritesContextType = {
  favorites: any[];
  toggleFavorite: (character: any) => void;
  isFavorite: (id: number) => boolean;
};

const FavoritesContext = createContext<FavoritesContextType | undefined>(
  undefined,
);

export const FavoritesProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [favorites, setFavorites] = useState<any[]>([]);

  useEffect(() => {
    const loadFavorites = async () => {
      try {
        const storedFavs = await AsyncStorage.getItem("@favorites");
        if (storedFavs) {
          setFavorites(JSON.parse(storedFavs));
        }
      } catch (error) {
        console.error("Favoriler yüklenirken hata:", error);
      }
    };
    loadFavorites();
  }, []);

  const toggleFavorite = async (character: any) => {
    try {
      let updatedFavs;
      const exists = favorites.some((fav) => fav.id === character.id);

      if (exists) {
        updatedFavs = favorites.filter((fav) => fav.id !== character.id);
      } else {
        updatedFavs = [...favorites, character];
      }

      setFavorites(updatedFavs);
      await AsyncStorage.setItem("@favorites", JSON.stringify(updatedFavs));
    } catch (error) {
      console.error("Favori kaydedilirken hata:", error);
    }
  };

  const isFavorite = (id: number) => {
    return favorites.some((fav) => fav.id === id);
  };

  return (
    <FavoritesContext.Provider
      value={{ favorites, toggleFavorite, isFavorite }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (!context)
    throw new Error("useFavorites, FavoritesProvider içinde kullanılmalıdır.");
  return context;
};
