import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useTheme } from "../../context/ThemeContext";

export default function LocationsScreen() {
  const { theme, isDarkMode } = useTheme();
  const [locations, setLocations] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const response = await fetch(
          "https://rickandmortyapi.com/api/location",
        );
        const data = await response.json();
        setLocations(data.results);
      } catch (error) {
        console.error("Lokasyonlar çekilirken hata:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchLocations();
  }, []);

  const renderLocationCard = ({ item }: { item: any }) => (
    <View
      style={[
        styles.card,
        { backgroundColor: theme.cardBg, borderColor: theme.border },
      ]}
    >
      <Text
        style={[styles.name, { color: isDarkMode ? "#00ff00" : theme.text }]}
      >
        {item.name}
      </Text>

      <View style={styles.badgeRow}>
        <View style={[styles.badge, { backgroundColor: theme.background }]}>
          <Text style={[styles.badgeText, { color: theme.text }]}>
            Tür: {item.type}
          </Text>
        </View>
        <View style={[styles.badge, { backgroundColor: theme.background }]}>
          <Text style={[styles.badgeText, { color: theme.text }]}>
            Boyut: {item.dimension}
          </Text>
        </View>
      </View>
    </View>
  );

  if (loading) {
    return (
      <View style={[styles.center, { backgroundColor: theme.background }]}>
        <ActivityIndicator size="large" color="#00ff00" />
      </View>
    );
  }

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: theme.background }]}
    >
      <View style={styles.headerRow}>
        <Text style={[styles.headerTitle, { color: theme.text }]}>
          Lokasyonlar
        </Text>
      </View>
      <FlatList
        data={locations}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderLocationCard}
        contentContainerStyle={styles.listContainer}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
  headerRow: { paddingHorizontal: 20, paddingVertical: 15 },
  headerTitle: { fontSize: 24, fontWeight: "bold" },
  listContainer: { padding: 16 },
  card: {
    borderRadius: 12,
    marginBottom: 16,
    padding: 16,
    borderWidth: 1,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  name: { fontSize: 18, fontWeight: "bold", marginBottom: 10 },
  badgeRow: { flexDirection: "row", flexWrap: "wrap", gap: 8 },
  badge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
    borderWidth: 0.5,
    borderColor: "rgba(0,0,0,0.1)",
  },
  badgeText: { fontSize: 12, fontWeight: "500" },
});
