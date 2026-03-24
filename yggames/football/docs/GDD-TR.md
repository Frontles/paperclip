# YG Football — Oyun Tasarım Dokümanı (GDD Türkçe)

> **Bu doküman GDD.md'nin Türkçe çevirisidir. AI ajanlarına İngilizce versiyon (GDD.md) gönderilir. Bu dosya senin referansın içindir.**

---

## 1. Proje Özeti

| Alan | Değer |
|---|---|
| **Uygulama Adı** | YG Football |
| **Platform** | iOS & Android (React Native + Expo) |
| **Tür** | Casual futbol mini oyunları |
| **MVP Modu** | Plinko |
| **Diller** | Türkçe, İngilizce, Almanca, Fransızca |
| **Ağ** | Tamamen offline (gömülü CSV verisi) |
| **Para kazanma** | Yok (v1'de) |

### 1.1 Konsept

Gerçek dünya takım ve oyuncu verileriyle (isimler, istatistikler, kart görselleri) iki takım seçip farklı mini oyun modlarında yarıştığın futbol temalı bir oyun koleksiyonu. Tüm veriler gömülü EA FC 26 CSV dosyasından gelir (`docs/eafc26-men.csv` — 16.228 oyuncu). Harici API çağrısı gerekmez. MVP sadece **Plinko modu** ile çıkacak.

### 1.2 Teknoloji Yığını

| Teknoloji | Sürüm | Amaç |
|---|---|---|
| React Native | 0.83.2 | Ana framework |
| Expo SDK | 55 | Derleme ve araçlar |
| TypeScript | 5.9.2 (strict) | Programlama dili |
| expo-router | 55.0.5 | Dosya tabanlı sayfa yönlendirme |
| zustand | 5.x | Durum yönetimi (state management) |
| react-native-reanimated | 4.2.1 | Animasyonlar ve fizik |
| react-native-gesture-handler | 2.30.0 | Dokunma girişi |
| expo-image | 55.0.6 | Optimize resim yükleme |
| expo-av | — | Ses efektleri (kurulması gerekiyor) |

### 1.3 Proje Klasör Yapısı

```
src/
├── screens/           # Ekran implementasyonları
├── components/
│   ├── common/        # Tekrar kullanılabilir UI (butonlar, kartlar, rozetler)
│   └── game/          # Oyuna özel (top, çivi, kale, skor tahtası)
├── hooks/             # Özel hook'lar (useGameEngine, useMatchSimulation, useSound)
├── services/          # API çağrıları (footballApi.ts)
├── stores/            # Zustand store'ları (matchStore, settingsStore)
├── types/             # TypeScript arayüzleri
├── constants/         # Renkler, boyutlar, oyun ayarları
├── i18n/              # Çoklu dil dosyaları
│   ├── tr.json        # Türkçe
│   ├── en.json        # İngilizce
│   ├── de.json        # Almanca
│   └── fr.json        # Fransızca
├── utils/             # Yardımcı fonksiyonlar
└── assets/
    └── sounds/        # Ses efekti dosyaları (.mp3/.wav)
```

---

## 2. Ekran Akışı

```
Ana Menü → Takım Seçimi → Oyun Modu Seçimi → Plinko Oyunu → Maç Sonu Özeti
                                                                    │
                                                     ┌──────────────┼──────────────┐
                                                  "Rövanş"    "Takım Değiştir"  "Ana Menü"
                                                     │              │                │
                                                Plinko Oyunu   Takım Seçimi     Ana Menü
```

### 2.1 Ekranlar

| # | Ekran | Yol (Route) | Açıklama |
|---|---|---|---|
| 1 | Ana Menü | `/` | Uygulama girişi, "Maça Başla" butonu, ayarlar |
| 2 | Takım Seçimi | `/team-select` | 2 takım seç (Ev sahibi & Deplasman) |
| 3 | Oyun Modu Seçimi | `/mode-select` | Oyun modu seç (Plinko = aktif, diğerleri = Yakında) |
| 4 | Plinko Oyunu | `/game/plinko` | Asıl oyun ekranı |
| 5 | Maç Sonu Özeti | `/match-summary` | Skorlar, olaylar, oyuncu kartları |
| 6 | Ayarlar | `/settings` | Dil seçimi, ses açma/kapama |

---

## 3. Ekran Detayları

### 3.1 Ana Menü

**Yerleşim:**
- Üst: Uygulama logosu / "YG FOOTBALL" başlığı
- Orta: Büyük "MAÇA BAŞLA" butonu (ana aksiyon)
- Alt: "AYARLAR" butonu (ikincil)
- En alt: "YG Games" imzası, versiyon numarası

**Etkileşimler:**
- "MAÇA BAŞLA" → Takım Seçimi ekranına gider
- "AYARLAR" → Ayarlar ekranına gider (dil, ses)

**Animasyonlar:**
- Hafif futbol topu dönme veya zıplama (dekoratif)
- Buton basma animasyonu (basınca %95 küçülme)

---

### 3.2 Takım Seçimi

**Yerleşim:**
- Üst: Lig filtresi çubuğu (yatay kaydırmalı, hap şeklinde butonlar)
  - Seçenekler: Tüm Ligler, Premier Lig, La Liga, Serie A, Bundesliga, Süper Lig
- Orta: Takım ızgarası (3 sütun, kaydırılabilir liste)
  - Her hücre: takım logosu (64x64) + altında kısa ad
  - Seçili takım: vurgulu kenarlık + tik işareti
- Alt (sabit): Seçim çubuğu
  - Sol slot: "Ev Sahibi" — boş hali = kesikli kenarlık + "Seç" yazısı
  - Sağ slot: "Deplasman" — boş hali = kesikli kenarlık + "Seç" yazısı
  - Dolu hali: takım logosu + ad + X butonu (seçimi kaldır)
  - "DEVAM" butonu (iki takım da seçilmeden pasif)

**Mantık:**
- İlk dokunuş → Ev Sahibi slotunu doldurur
- İkinci dokunuş → Deplasman slotunu doldurur
- Aynı takım iki kez seçilemez
- Seçili takıma dokunmak seçimi kaldırır
- Lig filtresi ızgarayı günceller

**Durum:** Seçimler zustand `matchStore`'da saklanır

---

### 3.3 Oyun Modu Seçimi

**Yerleşim:**
- Başlık: Takım A logosu + "VS" + Takım B logosu (matchStore'dan okunur)
- Mod kartları (dikey liste):
  - **Plinko** — Aktif, dokunulabilir
    - İkon: 🎱 veya çivilerden düşen futbol topu
    - Başlık: "PLINKO"
    - Açıklama: "Topları çivilerden geçir ve gol at!"
  - **Yakında** kartları (Arena, vb.) — Gri, kilit ikonu, dokunulamaz

**Etkileşimler:**
- Plinko'ya dokun → `/game/plinko` ekranına git
- Yakında kartları kilit gösterir, aksiyon yok

---

### 3.4 Plinko Oyun Ekranı

> **Bu çekirdek oyun. Dikkatlice oku.**

#### 3.4.1 Yerleşim

```
┌─────────────────────────────────┐
│  [Takım A Logo] 0 - 0 [Takım B Logo]  │  ← Skor Çubuğu
│           ⏱ 45:00                │  ← Maç Sayacı (maç-dakikası)
├─────────────────────────────────┤
│     ●A          ●B              │  ← Bırakma Bölgesi (2 top, takım renkleri)
│                                 │
│   ○  ○  ○  ○  ○  ○  ○          │  ← Çivi Izgarası
│    ○  ○  ○  ○  ○  ○            │
│   ○  ○  ○  ○  ○  ○  ○          │
│    ○  ○  ○  ○  ○  ○            │
│   ○  ○  ○  ○  ○  ○  ○          │
│    ○  ○  ○  ○  ○  ○            │
│   ○  ○  ○  ○  ○  ○  ○          │
│    ○  ○  ○  ○  ○  ○            │
│                                 │
│  ╔═══════════════════════════╗  │  ← Tek Kale (alt ortada)
│  ║         ⚽ GOL            ║  │
│  ╚═══════════════════════════╝  │
│                                 │
│  ─ OLAY BİLDİRİMİ ──────────   │  ← Popup: "⚽ 23' Gol!" / "🟥 45' Kırmızı Kart!"
└─────────────────────────────────┘
```

#### 3.4.2 Oyun Mekaniği

**Toplar:**
- Ekranda aynı anda tam olarak **2 top** bulunur
- Top A = Takım A ana rengi
- Top B = Takım B ana rengi
- İki top **aynı anda** yukarıdan düşer
- Düşme pozisyonu: bırakma bölgesinde rastgele X, aynı Y (üst)
- Toplar yerçekiminden etkilenir ve çivilerden sekerler

**Çiviler:**
- Üçgen/baklava dilimi düzeninde dizilmiş sabit dairesel engeller
- Toplar çivilere çarpıp gerçekçi şekilde yön değiştirir
- Çivi rengi: nötr/metalik (takım renginde değil)

**Kale:**
- Ekranın alt ortasında **tek bir kale**
- Kale genişliği: ekran genişliğinin ~%30-40'ı
- HERHANGİ bir top kaleye girerse → o topun takımı +1 gol atar
- İki top da gol atabilir (ikisi de kaleye girebilir)

**Top Yenileme:**
- Top ekrandan çıkarsa (kaleyi kaçırırsa, sınır dışına giderse) → **aynı X pozisyonundan** yukarıda yeniden doğar ve tekrar düşer
- Top gol atarsa → o da yukarıda yeniden doğar
- Maç sayacı bitene kadar toplar düşmeye devam eder
- **Sınırsız top** (sürekli yeniden doğma), ama aynı anda sadece 2 tane ekranda

**Fizik:**
- Yerçekimi: sabit aşağı yönlü ivme
- Çivi çarpışması: hafif rastgelelikle esnek sekme (öngörülemezlik için)
- Top-top çarpışması: etkin (birbirlerini itebilirler)
- Oyuncu kontrolü yok — toplar otomatik düşer, fizik sonucu belirler

#### 3.4.3 Maç Sayacı

| Parametre | Değer |
|---|---|
| **Toplam maç süresi** | 90 gerçek saniye |
| **Gösterim formatı** | Maç-dakikası (0' → 90') — 90 gerçek saniyeye eşlenir (1 gerçek sn = 1 maç-dk) |
| **Uzatma süresi** | 90' sonrası rastgele 1-5 ekstra saniye, "90+1", "90+2" vb. gösterilir |
| **Devre arası** | Yok (kesintisiz oyun) |

**Sayaç akışı:**
1. Maç başlar → sayaç 0'dan 90'a sayar
2. 90' olunca: rastgele uzatma süresi üretilir (1-5 saniye)
3. Sayaç uzatmada "90+1'", "90+2'" vb. gösterir
4. Süre bitince düdük sesi çalar
5. Tüm toplar yerinde donar
6. 1 saniyelik bekleme → Maç Sonu Özeti ekranına geçiş

#### 3.4.4 Maç Olayları

Oyun sırasında oluşan olaylar, Maç Sonu Özeti'nde gösterilir:

**Gol Olayı:**
- Tetiklenme: bir top kaleye girdiğinde
- Kaydedilen veri: `{ tür: 'gol', dakika: mevcutMaçDakikası, takımId, oyuncuId }`
- **Oyuncu ataması:** Takımın mevcut kadrosundan ağırlıklı rastgele seçim
  - Ağırlık = oyuncunun `bitiricilik` (finishing) istatistiği
  - Forvetler > Orta sahalar > Defanslar > Kaleciler (neredeyse hiç)
- Arayüz: Bildirim "⚽ GOL! [dakika]' [Oyuncu Adı]" (2 saniye)
- Ses: Gol sevinci ses efekti

**Kırmızı Kart Olayı:**
- Tetiklenme: rastgele şans, her 15 maç-dakikasında (15', 30', 45', 60', 75') ~%5 olasılık kontrolü
- **Kırmızı kart tamamen görsel/kozmetik** — oyunu ETKİLEMEZ (toplar değişmez)
- Kaydedilen veri: `{ tür: 'kırmızı_kart', dakika: mevcutMaçDakikası, takımId, oyuncuId }`
- Oyuncu seçimi: takım kadrosundan rastgele (zaten kart görmüş oyuncular hariç)
- Arayüz: Bildirim "🟥 KIRMIZI KART! [dakika]' [Oyuncu Adı]" (2 saniye)
- Ses: Keskin düdük sesi
- Maç sonu: olaylar zaman çizelgesinde gösterilir, oyuncu ihraç edilmiş olarak işaretlenir

#### 3.4.5 Skor Çubuğu (Üst)

- Takım A logosu (sol) — Skor — Takım B logosu (sağ)
- Gol atıldığında skor animasyonlu büyür (kısa scale up)
- Maç sayacı skorların altında ortalanmış

#### 3.4.6 Olay Bildirimleri (Toast)

- Ekranın alt kısmında, kalenin üstünde görünür
- 2 saniye sonra otomatik kaybolur
- Gol bildirimi: yeşil/aksan arka plan, ⚽ ikonu
- Kırmızı kart bildirimi: kırmızı arka plan, 🟥 ikonu
- Olaylar yakın zamanda olursa üst üste yığılır

---

### 3.5 Maç Sonu Özeti

**Yerleşim:**
```
┌─────────────────────────────────┐
│          MAÇ SONUCU             │
│                                 │
│  [Takım A Logo]  3 - 1  [Takım B Logo]  │  ← Final Skoru (büyük)
│   Takım A Adı        Takım B Adı │
│                                 │
├─────────────────────────────────┤
│          MAÇ OLAYLARI           │
│                                 │
│  ⚽ 12'  Haaland (Takım A)      │  ← Gol olayları
│  ⚽ 23'  Salah (Takım A)        │
│  🟥 34'  Ramos (Takım B)       │  ← Kırmızı kart olayı
│  ⚽ 56'  Mbappé (Takım B)      │
│  ⚽ 78'  Haaland (Takım A)     │
│                                 │
├─────────────────────────────────┤
│         MAÇIN YILDIZI           │
│  ┌─────────────────────────┐    │
│  │  [Oyuncu Fotoğrafı]     │    │
│  │  Erling Haaland          │    │
│  │  ⚽⚽ 2 Gol              │    │
│  │  GNL 91 | BİT 95 | HIZ 89│   │  ← EA FC tarzı istatistikler
│  └─────────────────────────┘    │
│                                 │
├─────────────────────────────────┤
│  [RÖVANŞ]  [TAKIM DEĞİŞTİR]  [ANA MENÜ]  │  ← Aksiyon Butonları
└─────────────────────────────────┘
```

#### 3.5.1 Skor Gösterimi

- Kazanan takım tarafı: hafif parıltı veya vurgu
- Beraberlik: iki taraf da nötr
- Büyük skor rakamları, takım renkleriyle

#### 3.5.2 Maç Olayları Zaman Çizelgesi

- Tüm olayların kronolojik listesi (goller + kırmızı kartlar)
- Her olay: ikon + dakika + oyuncu adı + takım göstergesi (renk noktası veya logo)
- Çok olay varsa kaydırılabilir

#### 3.5.3 Maçın Yıldızı (MOTM) Kartı

- **EA FC tarzı oyuncu kartı** — bu önemli bir görsel özellik
- Maçta en çok gol atan oyuncu
- Beraberlik durumunda: `genel` (overall) istatistiği daha yüksek olan kazanır
- Gol yoksa (0-0): her iki takımdan en yüksek `genel` istatistikli oyuncu
- Kartta gösterilenler:
  - Oyuncu adı
  - Bu maçta attığı goller
  - CSV'den gelen önemli istatistikler: GNL (genel/overall), BİT (bitiricilik/finishing), HIZ (hız/pace)
  - Takım logosu rozeti
  - Kart arka planı: altın/özel gradyan

#### 3.5.4 Aksiyon Butonları

| Buton | Aksiyon |
|---|---|
| **Rövanş** | Aynı takımlar, aynı mod → Plinko'yu yeniden başlat |
| **Takım Değiştir** | Takım Seçimi ekranına git (önceki seçimleri temizle) |
| **Ana Menü** | Ana Menü'ye git |

---

## 4. Futbol Verisi — Gömülü CSV

### 4.1 Veri Kaynağı

Tüm oyuncu ve takım verisi **uygulamayla birlikte gelen EA FC 26 CSV dosyasından** gelir — harici API çağrısı gerekmez.

| Alan | Değer |
|---|---|
| **Dosya** | `docs/eafc26-men.csv` (uygulamayla paketlenir) |
| **Toplam oyuncu** | 16.228 |
| **Veri** | İsimler, takımlar, ligler, pozisyonlar, tüm EA FC istatistikleri, kart görseli URL'leri |

### 4.2 CSV Sütun Eşleştirmesi

| CSV Sütunu | Kullanım |
|---|---|
| `ID` | Benzersiz oyuncu kimliği |
| `Name` | Görüntülenecek isim |
| `Team` | Takım adı (oyuncuları takımlara gruplamak için) |
| `League` | Lig adı (lig filtresi için) |
| `Position` | Ham pozisyon (ST, RM, CB, GK vb.) → FWD/MID/DEF/GK'ya eşlenir |
| `OVR` | Genel güç (1-99) — MOTM kartında gösterilir |
| `Finishing` | Bitiricilik (1-99) — **gol olasılığı ağırlığı için kullanılır** |
| `PAC` | Hız (1-99) — MOTM kartında gösterilir |
| `SHO` | Şut (1-99) — MOTM kartında gösterilir |
| `PAS` | Pas (1-99) |
| `DRI` | Dribling (1-99) |
| `DEF` | Defans (1-99) |
| `PHY` | Fizik (1-99) |
| `Nation` | Oyuncu milliyeti |
| `Age` | Oyuncu yaşı |
| `card` | **EA FC kart görseli URL'i** (.webp) — MOTM kartında kullanılır |

### 4.3 CSV'deki Lig İsimleri

CSV'nin `League` sütunundaki birebir lig isimleri:

| Görüntülenen Ad | CSV'deki Değer |
|---|---|
| Premier Lig | `Premier League` |
| La Liga | `LALIGA EA SPORTS` |
| Serie A | `Serie A Enilive` |
| Bundesliga | `Bundesliga` |
| Süper Lig | `Trendyol Süper Lig` |
| Ligue 1 | `Ligue 1 McDonald's` |

> CSV'de daha fazla lig var. MVP için bu 6 lig ile başla, sonra genişlet.

### 4.4 Pozisyon Eşleştirmesi

CSV'de detaylı pozisyonlar var. Oyun mantığı için 4 gruba eşle:

| CSV Pozisyonları | Oyun Grubu | Türkçe |
|---|---|---|
| GK | GK | Kaleci |
| CB, LB, RB, LWB, RWB | DEF | Defans |
| CM, CDM, CAM, LM, RM | MID | Orta Saha |
| ST, CF, LW, RW, LF, RF | FWD | Forvet |

### 4.5 Veri Akışı

```
Uygulama Başlangıcı
  → Gömülü CSV'yi ayrıştır (veya önceden JSON'a dönüştürülmüş veri)
  → Bellekte indeksler oluştur: ligHaritası, takımHaritası, takımaBağlıOyuncular
  → Kullanıma hazır (sıfır ağ, sıfır gecikme)
```

**Uygulama seçenekleri:**
1. **Çalışma zamanında CSV ayrıştır** — hafif CSV ayrıştırıcı kullan (ör: `papaparse`)
2. **Derleme zamanında JSON'a dönüştür** — CSV'den `src/data/players.json` oluştur (performans için önerilir)

### 4.6 Takım Görsel Kimliği (MVP)

MVP'de takımların **ayrı renkleri veya logoları yok**. Bunun yerine:

**Takım Renkleri:**
- Ev sahibi takım her zaman **sarı** (`#FFC72C`) ile gösterilir
- Deplasman takımı her zaman **kırmızı** (`#E63946`) ile gösterilir
- Bu sabit renkler şuralarda kullanılır: Plinko'da top renkleri, skor çubuğu göstergeleri, takım rozetleri, seçim arayüzü

**Takım Rozetleri (logosuz):**
- Takım adının baş harfleri renkli daire içinde gösterilir
- Ev sahibi: sarı daire içinde baş harfler (ör: "LIV")
- Deplasman: kırmızı daire içinde baş harfler (ör: "RMA")
- Baş harf üretimi: takım adının ilk 3 karakteri, büyük harf

```typescript
const TEAM_DISPLAY = {
  homeColor: '#FFC72C',  // Sarı
  awayColor: '#E63946',  // Kırmızı
  getInitials: (teamName: string) => teamName.substring(0, 3).toUpperCase(),
};
```

> **Gelecek iyileştirme:** Takım başına gerçek renkler ve logo dosyaları eklenebilir.

### 4.8 Oyuncu-Gol Atama Algoritması

```
Takım X gol attığında:
1. CSV verisinden Takım X'in tam kadrosunu al
2. Bu maçta kırmızı kart görmüş oyuncuları çıkar
3. Ağırlıkları hesapla:
   - Her oyuncu için: ağırlık = Finishing_istatistiği × pozisyon_çarpanı
   - Pozisyon çarpanları: FWD (Forvet) = 3.0, MID (Orta saha) = 1.5, DEF (Defans) = 0.5, GK (Kaleci) = 0.05
4. Ağırlıklı rastgele seçim → seçilen oyuncu gol atmış sayılır
5. Seçilen oyuncunun adı ve ID'siyle MatchEvent kaydı oluştur
```

### 4.9 MOTM Kart Görseli

CSV'deki `card` sütunu her oyuncunun EA FC kart görselinin doğrudan URL'ini içerir:
```
https://ratings-images-prod.pulse.ea.com/FC26/components/items/{oyuncuId}_en.webp
```

Bu URL, Maç Sonu Özeti'ndeki MOTM kartında `expo-image` ile optimize şekilde yüklenir (placeholder/yedek görsel ile birlikte).

---

## 5. Çoklu Dil Desteği (i18n)

### 5.1 Desteklenen Diller

| Kod | Dil | Durum |
|---|---|---|
| `tr` | Türkçe | Birincil |
| `en` | İngilizce (English) | Birincil |
| `de` | Almanca (Deutsch) | İkincil |
| `fr` | Fransızca (Français) | İkincil |

### 5.2 Uygulama

- Hafif bir i18n çözümü kullan (özel hook veya `i18next` + `react-i18next`)
- Dil dosyaları `src/i18n/{dil_kodu}.json` içinde
- İlk açılışta cihaz dilini algıla, Ayarlar'dan elle değiştirme imkanı sun
- Tercih AsyncStorage'da saklanır

### 5.3 Çevrilecek Metinler (Örnekler)

| Anahtar | Türkçe | İngilizce | Almanca | Fransızca |
|---|---|---|---|---|
| menu.startMatch | Maça Başla | Start Match | Spiel starten | Commencer le match |
| menu.settings | Ayarlar | Settings | Einstellungen | Paramètres |
| teamSelect.homeTeam | Ev Sahibi | Home Team | Heimteam | Équipe domicile |
| teamSelect.awayTeam | Deplasman | Away Team | Auswärtsteam | Équipe extérieure |
| teamSelect.continue | Devam | Continue | Weiter | Continuer |
| game.goal | GOL! | GOAL! | TOR! | BUT! |
| game.redCard | KIRMIZI KART! | RED CARD! | ROTE KARTE! | CARTON ROUGE! |
| game.extraTime | Uzatma | Extra Time | Nachspielzeit | Temps additionnel |
| summary.matchResult | Maç Sonucu | Match Result | Spielergebnis | Résultat du match |
| summary.matchEvents | Maç Olayları | Match Events | Spielereignisse | Événements du match |
| summary.motm | Maçın Yıldızı | Man of the Match | Spieler des Spiels | Homme du match |
| summary.rematch | Rövanş | Rematch | Rückspiel | Revanche |
| summary.changeTeams | Takım Değiştir | Change Teams | Teams ändern | Changer d'équipes |
| summary.home | Ana Menü | Home | Startseite | Accueil |

---

## 6. Ses Efektleri

### 6.1 Ses Listesi

| Ses | Tetiklenme | Dosya |
|---|---|---|
| `whistle_start.mp3` | Maç başlangıcı | Kısa düdük |
| `whistle_end.mp3` | Maç sonu (bitiş düdüğü) | Uzun düdük |
| `goal.mp3` | Top kaleye girdiğinde | Tribün tezahüratı + korna |
| `ball_bounce.mp3` | Top çiviye çarptığında | Kısa tık/sekme sesi (sessiz, hafif) |
| `red_card.mp3` | Kırmızı kart olayı | Keskin düdük |
| `button_tap.mp3` | Herhangi bir butona basma | Hafif tıklama |

### 6.2 Uygulama

- Ses oynatma için `expo-av` kullan
- Tüm sesleri uygulama açılışında önceden yükle
- Ayarlar'da ses açma/kapama (AsyncStorage'da saklanır)
- Top sekme sesi: en fazla 100ms'de 1 kez çal (spam önleme)

---

## 7. Tasarım Tokenleri

### 7.1 Renkler

| Değişken | Hex | Kullanım |
|---|---|---|
| background | `#0d2818` | Koyu yeşil (saha) — arka plan |
| surface | `#1a472a` | Açık yeşil — kartlar |
| surfaceLight | `#2d6a4f` | Hover/aktif durumlar |
| primary | `#7dcea0` | Ana aksan — butonlar, vurgular |
| primaryDark | `#52b788` | Basılı durum |
| goalGold | `#FFD700` | Gol kutlaması |
| redCard | `#E63946` | Kırmızı kart |
| textPrimary | `#FFFFFF` | Ana metin |
| textSecondary | `#A8DABC` | İkincil metin |
| textMuted | `#6B9080` | Soluk metin |
| border | `#2d6a4f` | Kenarlık |
| disabled | `#4a4a4a` | Pasif durum |
| overlay | `rgba(0,0,0,0.6)` | Katman |

### 7.2 Aralıklar (8pt Izgara)

| Token | Değer (piksel) |
|---|---|
| xs | 4 |
| sm | 8 |
| md | 16 |
| lg | 24 |
| xl | 32 |
| xxl | 48 |

### 7.3 Tipografi

| Stil | Boyut | Ağırlık | Kullanım |
|---|---|---|---|
| scoreDisplay | 48px | 900 (Black) | Skor rakamları |
| heading1 | 32px | 700 (Bold) | Ana başlıklar |
| heading2 | 24px | 700 (Bold) | Alt başlıklar |
| heading3 | 20px | 600 (SemiBold) | Bölüm başlıkları |
| body | 16px | 400 (Normal) | Normal metin |
| bodyBold | 16px | 600 (SemiBold) | Kalın metin |
| caption | 14px | 400 (Normal) | Açıklamalar |
| small | 12px | 400 (Normal) | Küçük metin |
| timer | 28px | 700 + monospace | Maç sayacı |

### 7.4 Oyun Boyutları

| Parametre | Değer | Açıklama |
|---|---|---|
| matchDurationSeconds | 90 | Maç süresi (gerçek saniye) |
| extraTimeMinSeconds | 1 | Minimum uzatma (saniye) |
| extraTimeMaxSeconds | 5 | Maksimum uzatma (saniye) |
| ballCount | 2 | Aynı anda ekrandaki top sayısı |
| ballRadius | 10 | Top yarıçapı (piksel) |
| pegRadius | 6 | Çivi yarıçapı (piksel) |
| pegRows | 8 | Çivi satır sayısı |
| pegCols | 7 | Tek satırdaki çivi sayısı (çift satır = 6) |
| goalWidthPercent | 0.35 | Kale genişliği (ekran genişliğinin %35'i) |
| gravity | 0.3 | Yerçekimi ivmesi (kare başına) |
| bounceDamping | 0.7 | Sekmede korunan enerji (0-1) |
| ballBounceRandomness | 0.1 | Çiviye çarpmada rastgele açı varyansı |
| redCardCheckMinutes | [15, 30, 45, 60, 75] | Kırmızı kart kontrol dakikaları |
| redCardProbability | 0.05 | Her kontrol noktasında %5 olasılık |
| toastDurationMs | 2000 | Bildirim süresi (milisaniye) |

**Pozisyon Ağırlıkları (gol ataması için):**

| Pozisyon | Çarpan | Açıklama |
|---|---|---|
| FWD (Forvet) | 3.0 | En yüksek gol olasılığı |
| MID (Orta Saha) | 1.5 | Orta seviye |
| DEF (Defans) | 0.5 | Düşük olasılık |
| GK (Kaleci) | 0.05 | Neredeyse hiç |

---

## 8. Durum Yönetimi (Zustand)

### 8.1 Maç Store'u (matchStore)

| Alan | Tip | Açıklama |
|---|---|---|
| homeTeam | Team veya null | Ev sahibi takım |
| awayTeam | Team veya null | Deplasman takımı |
| setHomeTeam | fonksiyon | Ev sahibi ayarla |
| setAwayTeam | fonksiyon | Deplasman ayarla |
| clearTeams | fonksiyon | Seçimleri temizle |
| selectedMode | 'plinko' veya null | Seçilen oyun modu |
| setSelectedMode | fonksiyon | Mod ayarla |
| homeScore | number | Ev sahibi skoru |
| awayScore | number | Deplasman skoru |
| addGoal | fonksiyon | Gol ekle (takımId ile) |
| events | MatchEvent[] | Maç olayları listesi |
| addEvent | fonksiyon | Olay ekle |
| clearMatch | fonksiyon | Maçı sıfırla |
| currentMinute | number | Mevcut maç dakikası |
| isExtraTime | boolean | Uzatmada mıyız? |
| extraTimeAmount | number | Uzatma süresi (saniye) |

### 8.2 Ayarlar Store'u (settingsStore)

| Alan | Tip | Açıklama |
|---|---|---|
| language | 'tr' / 'en' / 'de' / 'fr' | Seçili dil |
| soundEnabled | boolean | Ses açık mı? |
| setLanguage | fonksiyon | Dil değiştir |
| toggleSound | fonksiyon | Sesi aç/kapat |

---

## 9. Gelecek Oyun Modları (MVP Sonrası)

Bu modlar MVP kapsamında **DEĞİLDİR** ama planlanmaktadır:

| Mod | Konsept | Öncelik |
|---|---|---|
| **Arena** | Dairesel arena, toplar içeride zıplar, dönen kale | Sıradaki |
| **Stat Showdown** | İki oyuncu kartını karşılaştır, yüksek olanı tahmin et | Gelecek |
| **Card Clash** | Top Trumps tarzı kart oyunu | Gelecek |
| **Guess the Footballer** | Wordle tarzı futbolcu tahmin oyunu | Gelecek |
| **Penalty Arena** | Hareketle penaltı at | Gelecek |
| **Free Kick Curve** | Parmakla kavis çiz, duvarın üzerinden frikik at | Gelecek |

---

## 10. Yapım Sırası (Önerilen)

```
Faz 1: Temel Altyapı
  → CSV veri ayrıştırıcı / önceden JSON'a dönüştürülmüş veri katmanı
  → 6 MVP ligi için takım renkleri ayar dosyası
  → Çoklu dil (i18n) kurulumu
  → Ses sistemi kurulumu
  → Zustand store'ları (matchStore, settingsStore)
  → Eksik bağımlılıklar (expo-av, i18n kütüphanesi, papaparse veya CSV önceden dönüştürme)

Faz 2: Ekranlar (sadece UI, oyun mantığı yok)
  → Ana Menü
  → Ayarlar (dil + ses)
  → Takım Seçimi
  → Oyun Modu Seçimi
  → Maç Sonu Özeti (sahte veriyle)

Faz 3: Oyun Motoru
  → Plinko fiziği (yerçekimi, çiviler, çarpışma, gol algılama)
  → Top doğma ve yeniden doğma mantığı
  → Maç sayacı (90sn + uzatma)
  → Olay sistemi (goller, kırmızı kartlar)
  → Oyuncu-gol atama algoritması

Faz 4: Cilalama
  → Ses efektleri entegrasyonu
  → Animasyonlar (skor güncelleme, bildirimler, geçişler)
  → MOTM kartı tasarımı
  → Uç durumlar (edge cases) ve test

Faz 5: Test
  → Fizik birim testleri
  → Maç simülasyonu istatistiksel testleri
  → Tam akış entegrasyon testleri
  → Çoklu dil doğrulaması
```

---

## Ek A: CSV Veri Referansı

### Dosya Konumu
`docs/eafc26-men.csv` — projeyle birlikte paketlenir, 16.228 satır.

### Tüm CSV Sütunları (59 adet)
```
ID, Rank, Name, GENDER, OVR, PAC, SHO, PAS, DRI, DEF, PHY,
Acceleration, Sprint Speed, Positioning, Finishing, Shot Power,
Long Shots, Volleys, Penalties, Vision, Crossing, Free Kick Accuracy,
Short Passing, Long Passing, Curve, Dribbling, Agility, Balance,
Reactions, Ball Control, Composure, Interceptions, Heading Accuracy,
Def Awareness, Standing Tackle, Sliding Tackle, Jumping, Stamina,
Strength, Aggression, Position, Weak foot, Skill moves, Preferred foot,
Height, Weight, Alternative positions, Age, Nation, League, Team,
play style, url, GK Diving, GK Handling, GK Kicking, GK Positioning,
GK Reflexes, card
```

### Uygulama Tarafından Kullanılan Sütunlar
| Sütun | İndeks | Kullanım |
|---|---|---|
| ID | 0 | Benzersiz oyuncu kimliği |
| Name | 2 | Görüntülenen ad |
| OVR | 4 | Genel güç → MOTM kartı |
| PAC | 5 | Hız → MOTM kartı |
| SHO | 6 | Şut → MOTM kartı |
| Finishing | 14 | **Gol olasılığı ağırlığı** |
| Position | 40 | Pozisyon gruplama (FWD/MID/DEF/GK) |
| Nation | 48 | Oyuncu milliyeti |
| League | 49 | Lig filtresi |
| Team | 50 | Takım gruplama |
| Age | 47 | Oyuncu bilgisi |
| card | 58 | EA FC kart görseli URL'i (.webp) |

### Örnek Satır
```
209331,1,Mohamed Salah,M,91,89,88,86,90,45,76,...,RM,...,Egypt,Premier League,Liverpool,...,https://ratings-images-prod.pulse.ea.com/FC26/components/items/209331_en.webp
```

---

## Ek B: Terimler Sözlüğü

| Terim | Tanım |
|---|---|
| **Plinko** | Topların çivi tahtasından düştüğü oyun modu |
| **Çivi (Peg)** | Topların sektiği sabit dairesel engel |
| **MOTM** | Maçın Yıldızı (Man of the Match) — en iyi performans |
| **Bitiricilik (Finishing)** | Gol atma olasılığını belirleyen oyuncu istatistiği |
| **Uzatma (Extra Time)** | 90' sonrası eklenen rastgele 1-5 ekstra saniye |
| **Maç-dakikası** | Oyun içi zaman birimi (1 gerçek saniye = 1 maç-dakikası) |
| **Bildirim (Toast)** | Oyun olayları için kısa açılır bildirim |
| **EA FC tarzı** | EA Sports FC oyuncu kartlarından ilham alan görsel stil |
