import { Stack } from "expo-router";
import { FavoritesProvider } from "../context/FavoritesContext";
import { ThemeProvider } from "../context/ThemeContext";

export default function RootLayout() {
  return (
    <ThemeProvider>
      <FavoritesProvider>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />

          <Stack.Screen
            name="character/[id]"
            options={{
              title: "Character Details",
              headerBackTitle: "Back",
              headerBackVisible: true,
            }}
          />
        </Stack>
      </FavoritesProvider>
    </ThemeProvider>
  );
}
