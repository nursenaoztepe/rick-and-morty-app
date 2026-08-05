import { Stack } from "expo-router";
import { FavoritesProvider } from "../context/FavoritesContext";
import { ThemeProvider } from "../context/ThemeContext";

export default function RootLayout() {
  return (
    <ThemeProvider>
      <FavoritesProvider>
        <Stack>
          {/* Ana sekmeler grubu */}
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />

          {/* Karakter detay sayfası - TypeScript Uyumlu Versiyon */}
          <Stack.Screen
            name="character/[id]"
            options={{
              title: "Character Details",
              headerBackTitle: "Back",
              // Geri butonundaki metni gizlemenin TypeScript tarafından kabul edilen resmi yolu:
              headerBackVisible: true,
            }}
          />
        </Stack>
      </FavoritesProvider>
    </ThemeProvider>
  );
}
