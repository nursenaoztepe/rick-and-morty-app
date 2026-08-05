import { useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useFavorites } from "../../context/FavoritesContext";
import { useTheme } from "../../context/ThemeContext";

export default function CharacterDetailScreen() {
  const { id } = useLocalSearchParams();
  const { toggleFavorite, isFavorite } = useFavorites();
  const { theme } = useTheme();

  const [character, setCharacter] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCharacterDetail = async () => {
      try {
        const response = await fetch(
          `https://rickandmortyapi.com/api/character/${id}`,
        );
        const data = await response.json();
        setCharacter(data);
      } catch (error) {
        console.error("Detay çekilirken hata oluştu:", error);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchCharacterDetail();
    }
  }, [id]);

  if (loading) {
    return (
      <View style={[styles.center, { backgroundColor: theme.background }]}>
        <ActivityIndicator size="large" color="#00ff00" />
        <Text style={[styles.loadingText, { color: theme.textMuted }]}>
          Karakter Bilgileri Yükleniyor...
        </Text>
      </View>
    );
  }

  if (!character) {
    return (
      <View style={[styles.center, { backgroundColor: theme.background }]}>
        <Text style={styles.errorText}>Karakter bulunamadı.</Text>
      </View>
    );
  }

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: theme.background }]}
      contentContainerStyle={styles.content}
    >
      <Image source={{ uri: character.image }} style={styles.image} />

      <View style={styles.header}>
        <View style={styles.nameRow}>
          <Text style={[styles.name, { color: theme.text }]}>
            {character.name}
          </Text>

          <TouchableOpacity
            onPress={() => toggleFavorite(character)}
            activeOpacity={0.7}
            style={styles.heartButton}
          >
            <Text
              style={{
                fontSize: 28,
                color: isFavorite(character.id) ? "#F44336" : "#ccc",
              }}
            >
              {isFavorite(character.id) ? "❤️" : "🤍"}
            </Text>
          </TouchableOpacity>
        </View>

        <View style={[styles.statusBadge, { backgroundColor: theme.cardBg }]}>
          <View
            style={[
              styles.statusDot,
              {
                backgroundColor:
                  character.status === "Alive"
                    ? "#4CAF50"
                    : character.status === "Dead"
                      ? "#F44336"
                      : "#9E9E9E",
              },
            ]}
          />
          <Text style={[styles.statusText, { color: theme.text }]}>
            {character.status} - {character.species}
          </Text>
        </View>
      </View>

      <View style={[styles.infoBox, { backgroundColor: theme.cardBg }]}>
        <Text style={[styles.infoLabel, { color: theme.textMuted }]}>
          Cinsiyet:
        </Text>
        <Text style={[styles.infoValue, { color: theme.text }]}>
          {character.gender}
        </Text>
      </View>

      <View style={[styles.infoBox, { backgroundColor: theme.cardBg }]}>
        <Text style={[styles.infoLabel, { color: theme.textMuted }]}>
          Köken (Origin):
        </Text>
        <Text style={[styles.infoValue, { color: theme.text }]}>
          {character.origin?.name}
        </Text>
      </View>

      <View style={[styles.infoBox, { backgroundColor: theme.cardBg }]}>
        <Text style={[styles.infoLabel, { color: theme.textMuted }]}>
          Son Görüldüğü Yer:
        </Text>
        <Text style={[styles.infoValue, { color: theme.text }]}>
          {character.location?.name}
        </Text>
      </View>

      <View style={[styles.infoBox, { backgroundColor: theme.cardBg }]}>
        <Text style={[styles.infoLabel, { color: theme.textMuted }]}>
          Oynadığı Bölüm Sayısı:
        </Text>
        <Text style={[styles.infoValue, { color: theme.text }]}>
          {character.episode?.length} Bölüm
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: 20,
    alignItems: "center",
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    marginTop: 10,
  },
  errorText: {
    fontSize: 18,
    color: "#F44336",
  },
  image: {
    width: 250,
    height: 250,
    borderRadius: 125,
    borderWidth: 4,
    borderColor: "white",
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 10,
    marginBottom: 24,
  },
  header: {
    alignItems: "center",
    marginBottom: 30,
  },
  nameRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  name: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
  },
  heartButton: {
    marginLeft: 12,
  },
  statusBadge: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 12,
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 20,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  statusDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginRight: 8,
  },
  statusText: {
    fontSize: 16,
    fontWeight: "500",
  },
  infoBox: {
    width: "100%",
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 1,
  },
  infoLabel: {
    fontSize: 15,
    fontWeight: "600",
  },
  infoValue: {
    fontSize: 15,
    fontWeight: "bold",
    flexShrink: 1,
    textAlign: "right",
    marginLeft: 10,
  },
});
