# 🛸 Rick & Morty - Mobile App

React Native, Expo Router ve TypeScript kullanılarak geliştirilmiş, Rick and Morty evrenindeki karakterleri, lokasyonları ve bölümleri keşfetmenizi sağlayan modern ve performanslı mobil uygulama.

---

## 📌 Öne Çıkan Özellikler

* **🔍 Dinamik Arama ve Çapraz Filtreleme (Cross-Filtering):** Karakter adı, yaşam durumu (*Alive, Dead, Unknown*) ve türü (*Human, Alien*) üzerinden sunucu taraflı (Server-side) anlık çapraz filtreleme.
* **♾️ Sonsuz Kaydırma (Infinite Scroll / Pagination):** Performans odaklı sayfalama mimarisi (`FlatList` & `onEndReached`). Liste sonuna yaklaşıldığında sonraki sayfalar asenkron olarak yüklenir.
* **🌙 Dark / Light Tema Desteği:** `Context API` ile yönetilen, göz yormayan karanlık mod ve aydınlık mod adaptasyonu (Karanlık modda ikonik Rick & Morty yeşili `#00ff00` vurguları).
* **📱 Dinamik Sayfa Yönlendirmeleri:** `Expo Router` tabanlı dosya sistemine dayalı yönlendirme (`character/[id]`).
* **⭐ Favori Sistemi:** Karakterleri favorilere ekleme ve yönetme altyapısı (`FavoritesContext`).
* **🛠️ Sağlam Hata Yönetimi (Error Handling):** 404 HTML yanıtlarından kaynaklanan çökme (`JSON Parse Error`) durumlarını engelleyen güvenli API kontrolü ve ağ isteğini optimize eden Debounce mekanizması.

---

## 🛠️ Kullanılan Teknolojiler

| Teknoloji | Açıklama |
| :--- | :--- |
| **React Native** | Çapraz platform mobil uygulama geliştirme çatısı |
| **Expo / Expo Router** | Dosya tabanlı yönlendirme ve hızlı geliştirme ortamı |
| **TypeScript** | Tip güvenliği ve ölçeklenebilir kod mimarisi |
| **Context API** | Tema ve Favori durum yönetimi (State Management) |
| **Rick & Morty REST API** | Karakter, lokasyon ve bölüm verilerinin çekilmesi |

---

## 🚀 Projeyi Yerel Kurulumla Çalıştırma

Projeyi bilgisayarınıza klonlayıp çalıştırmak için terminalinize sırasıyla şu komutları girebilirsiniz:

```bash
git clone [https://github.com/nursenaoztepe/rick-and-morty-app.git](https://github.com/nursenaoztepe/rick-and-morty-app.git)
cd rick-and-morty-app
npm install
npx expo start
```
