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

export default function EpisodesScreen() {
  const { theme } = useTheme(); // Temamızı çektik
  const [episodes, setEpisodes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEpisodes = async () => {
      try {
        const response = await fetch("https://rickandmortyapi.com/api/episode");
        const data = await response.json();
        setEpisodes(data.results);
      } catch (error) {
        console.error("Bölümler çekilirken hata:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchEpisodes();
  }, []);

  const renderEpisodeCard = ({ item }: { item: any }) => (
    <View
      style={[
        styles.card,
        { backgroundColor: theme.cardBg, borderColor: theme.border },
      ]}
    >
      <Text style={[styles.episodeCode, { color: "#00ff00" }]}>
        {item.episode}
      </Text>
      <Text style={[styles.name, { color: theme.text }]}>{item.name}</Text>
      <Text style={[styles.airDate, { color: theme.textMuted }]}>
        Yayın Tarihi: {item.air_date}
      </Text>
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
          Bölümler
        </Text>
      </View>
      <FlatList
        data={episodes}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderEpisodeCard}
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
  episodeCode: { fontSize: 14, fontWeight: "bold", marginBottom: 4 },
  name: { fontSize: 18, fontWeight: "bold" },
  airDate: { fontSize: 14, marginTop: 6 },
});
