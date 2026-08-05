import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useTheme } from "../../context/ThemeContext";

export default function CharactersScreen() {
  const router = useRouter();
  const { theme, isDarkMode, toggleTheme } = useTheme();

  const [characters, setCharacters] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  // FİLTRE STATE'LERİ
  const [activeStatus, setActiveStatus] = useState("All");
  const [activeSpecies, setActiveSpecies] = useState("All");

  // SAYFALAMA STATE'LERİ
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);

  const statusOptions = [
    { id: "All", label: "All Status" },
    { id: "Alive", label: "Alive" },
    { id: "Dead", label: "Dead" },
    { id: "unknown", label: "Unknown" },
  ];

  const speciesOptions = [
    { id: "All", label: "All Species" },
    { id: "Human", label: "Human" },
    { id: "Alien", label: "Alien" },
  ];

  // KRİTİK DÜZELTME: Arama veya filtre değiştiğinde sayfalama sistemini sıfırla!
  useEffect(() => {
    const resetAndFetch = async () => {
      setLoading(true);
      try {
        // Filtre değerlerini API url'ine parametre olarak ekliyoruz (Böylece API bize doğru veriyi verecek)
        let url = `https://rickandmortyapi.com/api/character/?page=1`;
        if (searchQuery) url += `&name=${searchQuery}`;
        if (activeStatus !== "All") url += `&status=${activeStatus}`;
        if (activeSpecies !== "All") url += `&species=${activeSpecies}`;

        const response = await fetch(url);

        // Eğer API 404 döndürürse (bulunamadıysa) hata fırlatmak yerine listeyi boşalt
        if (response.status === 404) {
          setCharacters([]);
          setHasMore(false);
          return;
        }

        const data = await response.json();
        setCharacters(data.results || []);
        setPage(1);
        setHasMore(data.info?.next !== null);
      } catch (error) {
        console.error("Karakterler filtreyle çekilirken hata:", error);
      } finally {
        setLoading(false);
      }
    };

    // Kullanıcı yazı yazarken her harfte istek atmaması için çok kısa bir gecikme (Debounce taklidi)
    const delayDebounce = setTimeout(() => {
      resetAndFetch();
    }, 300);

    return () => clearTimeout(delayDebounce);
  }, [searchQuery, activeStatus, activeSpecies]);

  // DAHA FAZLA YÜKLEME FONKSİYONU
  const fetchMoreCharacters = async () => {
    if (loadingMore || !hasMore) return;

    setLoadingMore(true);
    const nextPage = page + 1;

    try {
      let url = `https://rickandmortyapi.com/api/character/?page=${nextPage}`;
      if (searchQuery) url += `&name=${searchQuery}`;
      if (activeStatus !== "All") url += `&status=${activeStatus}`;
      if (activeSpecies !== "All") url += `&species=${activeSpecies}`;

      const response = await fetch(url);

      // Gelen yanıt JSON değil de HTML hatasıysa işlemi güvenli bir şekilde kes
      if (!response.ok || response.status === 404) {
        setHasMore(false);
        setLoadingMore(false);
        return;
      }

      const data = await response.json();

      if (data.results) {
        setCharacters((prev) => [...prev, ...data.results]);
        setPage(nextPage);
        setHasMore(data.info?.next !== null);
      } else {
        setHasMore(false);
      }
    } catch (error) {
      console.error("Yeni sayfa yüklenirken hata oluştu:", error);
      setHasMore(false);
    } finally {
      setLoadingMore(false);
    }
  };

  const renderCharacterCard = ({ item }: { item: any }) => (
    <TouchableOpacity
      style={[
        styles.card,
        { backgroundColor: theme.cardBg, borderColor: theme.border },
      ]}
      activeOpacity={0.7}
      onPress={() => router.push(`/character/${item.id}` as any)}
    >
      <Image source={{ uri: item.image }} style={styles.image} />
      <View style={styles.infoContainer}>
        <Text style={[styles.name, { color: theme.text }]}>{item.name}</Text>
        <Text style={[styles.status, { color: theme.textMuted }]}>
          {item.status} - {item.species}
        </Text>
      </View>
    </TouchableOpacity>
  );

  const renderFooter = () => {
    if (!loadingMore) return null;
    return (
      <View style={{ paddingVertical: 20 }}>
        <ActivityIndicator size="small" color="#00ff00" />
      </View>
    );
  };

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
          Rick & Morty
        </Text>
        <TouchableOpacity onPress={toggleTheme} style={styles.themeButton}>
          <Text style={{ fontSize: 22 }}>{isDarkMode ? "☀️" : "🌙"}</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.searchContainer}>
        <TextInput
          style={[
            styles.searchInput,
            {
              backgroundColor: theme.cardBg,
              color: theme.text,
              borderColor: theme.border,
            },
          ]}
          placeholder="Search character..."
          placeholderTextColor={theme.textMuted}
          value={searchQuery}
          onChangeText={setSearchQuery}
        />

        {/* STATUS FİLTRESİ */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.filterRow}
        >
          {statusOptions.map((option) => (
            <TouchableOpacity
              key={`status-${option.id}`}
              style={[
                styles.filterBadge,
                { backgroundColor: theme.cardBg, borderColor: theme.border },
                activeStatus === option.id && {
                  backgroundColor: "#00ff00",
                  borderColor: "#00ff00",
                },
              ]}
              onPress={() => setActiveStatus(option.id)}
            >
              <Text
                style={[
                  styles.filterText,
                  { color: theme.text },
                  activeStatus === option.id && {
                    color: "#121212",
                    fontWeight: "bold",
                  },
                ]}
              >
                {option.label}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* SPECIES FİLTRESİ */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.filterRow}
        >
          {speciesOptions.map((option) => (
            <TouchableOpacity
              key={`species-${option.id}`}
              style={[
                styles.filterBadge,
                { backgroundColor: theme.cardBg, borderColor: theme.border },
                activeSpecies === option.id && {
                  backgroundColor: "#00ff00",
                  borderColor: "#00ff00",
                },
              ]}
              onPress={() => setActiveSpecies(option.id)}
            >
              <Text
                style={[
                  styles.filterText,
                  { color: theme.text },
                  activeSpecies === option.id && {
                    color: "#121212",
                    fontWeight: "bold",
                  },
                ]}
              >
                {option.label}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <FlatList
        data={characters} // Filtrelemeyi API seviyesine aldığımız için direkt ham datayı bağlıyoruz
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderCharacterCard}
        contentContainerStyle={styles.listContainer}
        onEndReached={fetchMoreCharacters}
        onEndReachedThreshold={0.4}
        ListFooterComponent={renderFooter}
        ListEmptyComponent={() => (
          <View style={styles.center}>
            <Text style={{ color: theme.textMuted, marginTop: 20 }}>
              No characters found.
            </Text>
          </View>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 40,
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 15,
  },
  headerTitle: { fontSize: 24, fontWeight: "bold" },
  themeButton: {
    padding: 8,
    borderRadius: 20,
    backgroundColor: "rgba(0,0,0,0.05)",
    justifyContent: "center",
    alignItems: "center",
  },
  searchContainer: { padding: 16, paddingBottom: 5 },
  searchInput: {
    height: 50,
    borderWidth: 1,
    borderRadius: 25,
    paddingHorizontal: 20,
    fontSize: 16,
    marginBottom: 12,
  },
  filterRow: { flexDirection: "row", marginBottom: 10 },
  filterBadge: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    marginRight: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  filterText: { fontSize: 14 },
  listContainer: { padding: 16, paddingTop: 5 },
  card: {
    flexDirection: "row",
    borderRadius: 12,
    marginBottom: 16,
    padding: 12,
    borderWidth: 1,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  image: { width: 80, height: 80, borderRadius: 40 },
  infoContainer: { marginLeft: 16, justifyContent: "center", flex: 1 },
  name: { fontSize: 18, fontWeight: "bold" },
  status: { fontSize: 14, marginTop: 4 },
});
