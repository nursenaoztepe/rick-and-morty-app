import { Tabs } from "expo-router";
import React from "react";
import { Text } from "react-native";
import { useTheme } from "../../context/ThemeContext";

export default function TabLayout() {
  const { theme, isDarkMode } = useTheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: isDarkMode ? "#00ff00" : "#222",
        tabBarInactiveTintColor: "#888",
        headerStyle: { backgroundColor: theme.cardBg },
        headerTitleStyle: { color: theme.text },
        tabBarStyle: {
          backgroundColor: theme.cardBg,
          borderTopColor: theme.border,
          // height ve padding değerlerini sildik. iOS/Android boşluğu kendi ayarlayacak.
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Karakterler",
          tabBarIcon: ({ focused }) => (
            <Text style={{ fontSize: 20 }}>{focused ? "👥" : "👤"}</Text>
          ),
        }}
      />
      <Tabs.Screen
        name="episodes"
        options={{
          title: "Bölümler",
          tabBarIcon: ({ focused }) => (
            <Text style={{ fontSize: 20 }}>{focused ? "🎬" : "📺"}</Text>
          ),
        }}
      />
      <Tabs.Screen
        name="locations"
        options={{
          title: "Lokasyonlar",
          tabBarIcon: ({ focused }) => (
            <Text style={{ fontSize: 20 }}>{focused ? "📍" : "🗺️"}</Text>
          ),
        }}
      />
      <Tabs.Screen
        name="favorites"
        options={{
          title: "Favoriler",
          tabBarIcon: ({ focused }) => (
            <Text style={{ fontSize: 20 }}>{focused ? "❤️" : "🤍"}</Text>
          ),
        }}
      />
    </Tabs>
  );
}
