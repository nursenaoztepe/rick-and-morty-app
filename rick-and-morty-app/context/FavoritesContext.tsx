import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, useContext, useEffect, useState } from "react";

// Merkezi deponun içereceği verilerin tip tanımlaması
type FavoritesContextType = {
  favorites: any[];
  toggleFavorite: (character: any) => void;
  isFavorite: (id: number) => boolean;
};

// Depoyu oluşturuyoruz
const FavoritesContext = createContext<FavoritesContextType | undefined>(
  undefined,
);

// Uygulamayı saracak olan Sağlayıcı (Provider)
export const FavoritesProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [favorites, setFavorites] = useState<any[]>([]);

  // Uygulama ilk açıldığında telefonun hafızasına bak ve favorileri getir
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

  // Favorilere ekleme/çıkarma işlemi (Hem RAM'i hem telefon hafızasını günceller)
  const toggleFavorite = async (character: any) => {
    try {
      let updatedFavs;
      const exists = favorites.some((fav) => fav.id === character.id);

      if (exists) {
        // Zaten favoriyse listeden çıkar
        updatedFavs = favorites.filter((fav) => fav.id !== character.id);
      } else {
        // Favori değilse listeye ekle
        updatedFavs = [...favorites, character];
      }

      setFavorites(updatedFavs);
      await AsyncStorage.setItem("@favorites", JSON.stringify(updatedFavs));
    } catch (error) {
      console.error("Favori kaydedilirken hata:", error);
    }
  };

  // Bir karakterin favori olup olmadığını kontrol eden küçük yardımcı
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

// Diğer sayfalardan bu depoya kolayca ulaşmak için özel kanca (hook)
export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (!context)
    throw new Error("useFavorites, FavoritesProvider içinde kullanılmalıdır.");
  return context;
};
