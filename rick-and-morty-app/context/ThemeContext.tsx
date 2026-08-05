import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, useContext, useEffect, useState } from "react";

type ThemeContextType = {
  isDarkMode: boolean;
  toggleTheme: () => void;
  theme: {
    background: string;
    cardBg: string;
    text: string;
    textMuted: string;
    border: string;
  };
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const lightTheme = {
  background: "#f4f4f8",
  cardBg: "#ffffff",
  text: "#222222",
  textMuted: "#666666",
  border: "#eeeeee",
};

const darkTheme = {
  background: "#121212", 
  cardBg: "#1e1e1e", 
  text: "#ffffff",
  textMuted: "#aaaaaa",
  border: "#333333",
};

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const loadTheme = async () => {
      try {
        const savedTheme = await AsyncStorage.getItem("@theme");
        if (savedTheme) {
          setIsDarkMode(savedTheme === "dark");
        }
      } catch (error) {
        console.error("Tema yüklenirken hata:", error);
      }
    };
    loadTheme();
  }, []);

  const toggleTheme = async () => {
    try {
      const nextMode = !isDarkMode;
      setIsDarkMode(nextMode);
      await AsyncStorage.setItem("@theme", nextMode ? "dark" : "light");
    } catch (error) {
      console.error("Tema kaydedilirken hata:", error);
    }
  };

  const theme = isDarkMode ? darkTheme : lightTheme;

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme, theme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context)
    throw new Error("useTheme, ThemeProvider içinde kullanılmalıdır.");
  return context;
};
