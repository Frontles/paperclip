# GDD-06: Arayüz/Kullanıcı Deneyimi (UI/UX) Tasarımı

**Doküman Kodu:** GDD-06
**Versiyon:** 1.0
**Tarih:** 17 Mart 2026
**Yazar:** Oyun Tasarımcısı Ajanı, YG Games
**Durum:** Taslak
**İlgili Dokümanlar:** [GDD-00: Rakip Analizi](docs/00-competitor-analysis-en.md) | [GDD-01: Temel Oyun Tasarımı](core-game-design-tr.md) | [GDD-02: Kart Koleksiyon Sistemi](card-collection-system-tr.md) | [GDD-03: Oyun Ekonomisi ve Monetizasyon](game-economy-monetization-tr.md) | [GDD-05: Sanat ve Görsel Stil](art-visual-style-tr.md)

---

## İçindekiler

1. [UX Felsefesi](#1-ux-felsefesi)
2. [Bilgi Mimarisi](#2-bilgi-mimarisi)
3. [Ekran Akışları ve Navigasyon](#3-ekran-akışları-ve-navigasyon)
4. [Ana Ekran](#4-ana-ekran)
5. [Maç Akışı Arayüzü](#5-maç-akışı-arayüzü)
6. [Kart Yönetimi Arayüzü](#6-kart-yönetimi-arayüzü)
7. [Mağaza ve Paket Açma Arayüzü](#7-mağaza-ve-paket-açma-arayüzü)
8. [Rekabet ve Sıralama Arayüzü](#8-rekabet-ve-sıralama-arayüzü)
9. [Sosyal ve Profil Arayüzü](#9-sosyal-ve-profil-arayüzü)
10. [Başlangıç Akışı](#10-başlangıç-akışı)
11. [Bildirim Sistemi](#11-bildirim-sistemi)
12. [Erişilebilirlik](#12-erişilebilirlik)
13. [Ayarlar ve Seçenekler](#13-ayarlar-ve-seçenekler)
14. [P2W ve Sürdürülebilirlik Değerlendirmesi](#14-p2w-ve-sürdürülebilirlik-değerlendirmesi)

---

## 1. UX Felsefesi

### 1.1 Temel İlkeler

| İlke | Açıklama | Metrik |
|------|----------|--------|
| **3 Dokunuş Kuralı** | Her temel özellik Ana Ekrandan ≤ 3 dokunuşla erişilebilir | Navigasyon derinlik denetimi |
| **Önce Başparmak** | Tüm birincil eylemler tek elle tutuşta doğal başparmak yayında | Isı haritası doğrulaması |
| **Çıkmaz Yok** | Her ekranın net bir sonraki eylemi ve geri dönüş yolu var | Ekran akışı denetimi |
| **Kademeli Açıklama** | Yalnızca şu an gerekeni göster; karmaşıklığı hazır olunca açığa çıkar | İlk oturum tamamlama oranı |
| **Ciladan Önce Hız** | Geçişler ≤ 300ms, ekran yükleme ≤ 1sn, maç kuyruğu ≤ 30sn | Performans kriterleri |
| **Güzellikten Önce Netlik** | Bir görsel anlaşılırlıkla yarışıyorsa, görseli sadeleştir | Kullanılabilirlik testi |

### 1.2 Rakip UX Dersleri

| Rakip | UX Güç | UX Zayıflık | Yaklaşımımız |
|-------|--------|-------------|-------------|
| **Goley** | Basit maç akışı, tanıdık kontroller | Karmaşık menüler, kafa karıştıran kart yönetimi | Temiz navigasyon + rehberli kart arayüzü |
| **FC Mobile** | Cilalı geçişler, düzgün maç akışı | Aşırı mod/menü, agresif monetizasyon arayüzü | Daha az ama daha derin modlar, ölçülü mağaza yönlendirmeleri |
| **eFootball** | Sınıfının en iyisi oynanış hissi | Lansmanda en kötü arayüz (2022), kafa karıştıran navigasyon | Arayüz ilk günden birinci sınıf vatandaş |
| **DLS** | Temiz, sezgisel, minimum karmaşa | Sınırlı sosyal özellikler, basit takım yönetimi | DLS sadeliği + daha zengin sosyal katman |
| **Score! Match** | Hızlı maç döngüsü, akıcı deneyim | Derinlik yok, kart yönetimi sığ | Hızlı maç döngüsü + derin kart sistemi |

### 1.3 Tasarım Tokenleri (GDD-05'ten)

Tüm arayüz bileşenleri [GDD-05, Bölüm 3](art-visual-style-tr.md)'te tanımlanan tasarım sistemini kullanır:
- **Renkler:** Derin Lacivert arka plan, Project F Yeşili vurgular, kademe kodlu nadirlik renkleri
- **Tipografi:** Display Sans (başlıklar), UI Sans (gövde), Mono (istatistikler)
- **Boşluk:** 4dp temel ızgara, 8dp standart aralık, 16dp bölüm dolgusu
- **Köşeler:** Düğmelerde 8dp, kartlarda 12dp, modallarda 16dp
- **Yükseklik:** 4 seviye (düz → yükseltilmiş → yüzen → üst katman)
- **Dokunma Hedefleri:** Minimum 48dp × 48dp

---

## 2. Bilgi Mimarisi

### 2.1 Genel Navigasyon Haritası

```
ANA SAYFA
├── Oyna
│   ├── Hızlı Maç
│   ├── Dereceli Maç
│   │   ├── Kuyruk
│   │   ├── Maç
│   │   └── Maç Sonrası
│   ├── Meydan Okuma Modu (PvE)
│   │   ├── Hikaye Meydan Okumaları
│   │   └── Haftalık Meydan Okumalar
│   ├── Dostluk Maçı
│   │   ├── Arkadaş Davet Et
│   │   └── Rastgele Rakip
│   └── Etkinlikler (Canlı)
│       ├── Mevcut Etkinlik
│       └── Etkinlik Ödülleri
├── Kadro
│   ├── Aktif Kadro
│   │   ├── Formasyon Düzenleyici
│   │   ├── Oyuncu Slotları
│   │   └── Kimya Görünümü
│   ├── Koleksiyon
│   │   ├── Tüm Kartlar (Filtrelenebilir)
│   │   ├── Kart Detayı
│   │   └── Albüm İlerlemesi
│   ├── Kart Birleştirme
│   │   ├── Kart Seç
│   │   ├── Sonuç Önizleme
│   │   └── Birleştirme Animasyonu
│   ├── Takas Pazarı
│   │   ├── Göz At/Ara
│   │   ├── İlanlarım
│   │   └── Takas Geçmişi
│   └── Kiralama Merkezi
│       ├── Mevcut Kiralamalar
│       └── Kiralamalarım
├── Mağaza
│   ├── Paket Mağazası
│   │   ├── Mevcut Paketler
│   │   ├── Paket Detay/Oranlar
│   │   └── Paket Açma
│   ├── Sezon Kartı
│   │   ├── Ücretsiz Hat
│   │   ├── Premium Hat
│   │   └── Satın Alma
│   ├── Kozmetik Mağazası
│   │   ├── Öne Çıkan
│   │   ├── Kutlamalar
│   │   ├── Kramponlar ve İzler
│   │   └── Stadyum Öğeleri
│   ├── Elmas Mağazası (Uygulama İçi Satın Alma)
│   └── Günlük Fırsatlar
├── Sıralama
│   ├── Mevcut Rütbe ve İlerleme
│   ├── Sezon Ödülleri Önizleme
│   ├── Sıralama Tabloları
│   │   ├── Global
│   │   ├── Bölgesel
│   │   ├── Arkadaşlar
│   │   └── Kulüp
│   └── Maç Geçmişi
└── Ben
    ├── Profil
    │   ├── İstatistik Panosu
    │   ├── Başarım Galerisi
    │   └── Profil Düzenle
    ├── Arkadaşlar
    │   ├── Arkadaş Listesi
    │   ├── Arkadaşlık İstekleri
    │   └── Arkadaş Bul
    ├── Kulüp
    │   ├── Kulüp Bilgisi
    │   ├── Üyeler
    │   └── Kulüp Sohbeti
    ├── Gelen Kutusu
    │   ├── Ödüller
    │   ├── Sistem Mesajları
    │   └── Sosyal Mesajlar
    └── Ayarlar
```

### 2.2 Ekran Sayısı Özeti

| Bölüm | Ekranlar | Öncelik |
|-------|----------|---------|
| **Ana Sayfa** | 1 | Kritik |
| **Oyna** | 12 | Kritik |
| **Kadro** | 14 | Kritik |
| **Mağaza** | 10 | Yüksek |
| **Sıralama** | 6 | Yüksek |
| **Ben** | 10 | Orta |
| **Başlangıç** | 8 | Kritik |
| **Ayarlar** | 4 | Orta |
| **Modaller/Katmanlar** | 15 | Çeşitli |
| **TOPLAM** | ~80 benzersiz ekran | — |

### 2.3 Kullanıcı Yolculuğu: İlk Gün

```
Kurulum → Açılış → Dil Seçimi → İsim Girişi
→ Eğitim Maçı (rehberli, 2 dk) → İlk Paket Açma (3 ücretsiz kart)
→ Kadro Oluşturucu (ilk kartları yerleştir) → İkinci Maç (yarı rehberli)
→ Ana Ekran (tam erişim) → Günlük Ödül Bildirimi
→ İstediğin gibi keşfet
```

**Hedef:** Oyuncu, lansmandan itibaren 90 saniye içinde ilk maçı tamamlar. Tam eğitim 5 dakikanın altında.

---

## 3. Ekran Akışları ve Navigasyon

### 3.1 Alt Navigasyon Çubuğu

**5 sekmeli kalıcı navigasyon** (maç içi hariç tüm ekranlarda görünür):

| Sekme | İkon | Etiket | Rozet Mantığı |
|-------|------|--------|-------------|
| **Oyna** | ⚽ (futbol topu) | Oyna | Aktif etkinlik göstergesi |
| **Kadro** | 📋 (pano) | Kadro | Yeni kart sayısı |
| **Mağaza** | 🏪 (mağaza) | Mağaza | Ücretsiz/talep edilmemiş paket |
| **Sıralama** | 🏆 (kupa) | Sıralama | Rütbe değişikliği bildirimi |
| **Ben** | 👤 (kişi) | Ben | Okunmamış mesaj/ödüller |

**Tasarım Detayları:**
- Yükseklik: 56dp
- Aktif durum: Dolgulu ikon + Project F Yeşili etiket
- Pasif: Çizgisel ikon + soluk beyaz etiket (%60 opaklık)
- Arka plan: 1dp üst kenarlık (%10 beyaz) ile Derin Lacivert
- Çentikli cihazlarda güvenli alan dolgusu

### 3.2 Başlık Çubuğu Deseni

Her maç dışı ekran tutarlı bir başlık kullanır:

```
┌──────────────────────────────────────┐
│ [←/≡]  Ekran Başlığı   [🔔][💎 520] │
└──────────────────────────────────────┘
```

| Öğe | Davranış |
|-----|----------|
| **Geri Oku (←)** | Alt ekranlarda görünür; üst ekrana döner |
| **Hamburger (≡)** | Sadece Ana Sayfada; yan çekmeceyi açar (Ayarlar/Yardım/Yasal) |
| **Ekran Başlığı** | Ortalanmış, Display Sans 24sp Kalın |
| **Bildirim Zili (🔔)** | Okunmamış için rozet sayısı; dokunma Gelen Kutusuna götürür |
| **Elmas Sayacı (💎)** | Her zaman görünür; elmas bakiyesini gösterir; dokunma Elmas Mağazasına götürür |

### 3.3 Modal ve Diyalog Sistemi

| Tür | Kullanım | Animasyon | Kapatma |
|-----|----------|-----------|---------|
| **Alt Sayfa** | Filtreler, hızlı eylemler, onaylar | 350ms yukarı kayma | Aşağı sürükle, dışına dokun |
| **Merkez Modal** | Önemli kararlar, uyarılar, ödüller | 300ms büyütme + solma | Yalnızca açık düğme |
| **Tam Ekran Katman** | Paket açma, kart detay, kutlamalar | 400ms çapraz solma | Geri düğmesi / X |
| **Bildirim Tostu** | Başarı/hata geri bildirimi | 500ms aşağı kayma + zıplama | 3sn otomatik kapanma |
| **İpucu** | İlk kez ipuçları, stat açıklamaları | 200ms belirme | Herhangi bir yere dokun |

**Anti-Desen Kuralları:**
- Asla aynı anda 1'den fazla modal üst üste koymayın
- Ekrana girişten sonraki 3 saniye içinde asla modal göstermeyin (popup yorgunluğunu önle)
- Satın alma onayları her zaman 2 dokunuş gerektirir (ekle + onayla)
- Satın alma veya yıkıcı modalleri asla otomatik kapatmayın

---

## 4. Ana Ekran

### 4.1 Düzen

```
┌──────────────────────────────────────┐
│ [≡]  PROJECT F        [🔔 3][💎 520] │
├──────────────────────────────────────┤
│                                      │
│  ┌──────────────────────────────┐    │
│  │    ÖNE ÇIKAN BANNER          │    │
│  │    (Etkinlik / Sezon Kartı)  │    │
│  │    [  →  karusel noktaları →]│    │
│  └──────────────────────────────┘    │
│                                      │
│  ┌──────────┐  ┌──────────┐          │
│  │ ⚽ HIZLI │  │ 🏆 DERECELİ│         │
│  │   MAÇ   │  │   MAÇ    │          │
│  └──────────┘  └──────────┘          │
│                                      │
│  ── Bugünün İlerlemesi ──           │
│  ┌──────────────────────────────┐    │
│  │ Günlük Görevler  [2/4] ▓▓░░ │    │
│  │ Sezon Kartı      [Kademe 12] │    │
│  │ Haftalık M.O.    [1/3] ▓░░  │    │
│  └──────────────────────────────┘    │
│                                      │
│  ── Hızlı Erişim ──                │
│  [📦 Ücretsiz Pkt] [🎁 Günlük Hediye]│
│  [📊 İstatistikler] [👥 Çevrimiçi]  │
│                                      │
├──────────────────────────────────────┤
│ [⚽Oyna][📋Kadro][🏪Mağaza][🏆Sıra][👤Ben]│
└──────────────────────────────────────┘
```

### 4.2 Ana Ekran Öğeleri

| Öğe | İçerik | Güncelleme Sıklığı |
|-----|--------|-------------------|
| **Öne Çıkan Banner** | Otomatik dönen karusel (3-5 slayt): mevcut etkinlik, sezon kartı, yeni paketler | Her girişte |
| **Hızlı Maç Düğmesi** | Büyük CTA, otomatik gündelik maç kuyruğu | Her zaman mevcut |
| **Dereceli Maç Düğmesi** | Büyük CTA, mevcut rütbe rozetini gösterir | Eğitim tamamlandıktan sonra |
| **Günlük Görevler** | Tamamlanan/toplam gösteren ilerleme çubuğu | Gerçek zamanlı |
| **Sezon Kartı Takip** | XP ilerlemesiyle mevcut kademe | Her maçtan sonra |
| **Ücretsiz Paket Zamanlayıcı** | Bir sonraki ücretsiz pakete geri sayım (her 4 saatte) | Gerçek zamanlı geri sayım |
| **Günlük Hediye** | Talep edilmemiş olduğunda rozet | Günlük 00:00 UTC'de sıfırlanır |
| **Çevrimiçi Arkadaşlar** | Çevrimiçi arkadaş sayısı | Gerçek zamanlı |

### 4.3 Ana Ekran Kuralları

- Ana ekran girişinde **zorunlu mağaza popup'ı yok** (anti-P2W UX)
- Öne çıkan banner mağaza öğeleri içerebilir ancak ücretsiz içerik de içermelidir
- Ücretsiz Paket zamanlayıcı her zaman belirgin — oyunculara sabır = kart olduğunu hatırlatır
- Karusel körlüğünü önlemek için maksimum 5 banner slaytı
- Yeni etkinlik başladığında Oyna sekmesinde "Yenilikler" noktası

---

## 5. Maç Akışı Arayüzü

### 5.1 Maç Öncesi Akış

```
[Oyna Düğmesi] → Mod Seçimi → Kuyruk → Rakip Bulundu
→ Takım Önizleme → Yükleme → Maç Başlangıcı
```

**Mod Seçim Ekranı:**

| Mod | Kart İşleme | Tahmini Süre |
|-----|-------------|-------------|
| **Hızlı Maç** | Büyük birincil düğme, yeşil | ~5 dk |
| **Dereceli** | Büyük ikincil düğme, altın | ~6 dk |
| **Meydan Okuma** | Orta karo, içeriğe özel sanat | ~3-10 dk |
| **Dostluk** | Orta karo, sosyal ikon | ~5 dk |
| **Etkinlik** | Zamanlayıcılı vurgulanan karo | Değişken |

**Kuyruk Ekranı:**
- Kuyruk sırasında dönen ipuçları (oynanış ipuçları, asla mağaza reklamı değil)
- İptal düğmesi her zaman mevcut
- 60 saniye sonra otomatik iptal, yeniden kuyruğa girme seçeneği

**Takım Önizleme Ekranı (5 saniye):**
- Her iki takımın gücü ve kimyası görünür (bilgi gizleme yok)
- Formasyon düzeni önizlemesi
- 5 saniyelik zamanlayıcı, maça otomatik geçiş

### 5.2 Maç İçi HUD

```
┌──────────────────────────────────────┐
│ ┌─────────────────────────────────┐  │
│ │ KRM 2 : 1 MAV  ⏱ 03:42  [⏸]   │  │
│ └─────────────────────────────────┘  │
│ [Mini                                │
│  Harita]                             │
│                                      │
│           3D OYNANIŞI                │
│           GÖRÜNTÜ ALANI              │
│                                      │
│                                      │
│ [Dayanıklılık ▓▓▓▓▓▓░░░░]           │
│                                      │
│   ┌──────┐           ┌──┐ ┌──┐      │
│   │      │           │ B│ │ C│      │
│   │ JOY- │      ┌──┐ └──┘ └──┘      │
│   │ STİCK│      │ A│    ┌────┐      │
│   │      │      └──┘    │ ÖY │      │
│   └──────┘              └────┘      │
│              [SPRİNT]               │
└──────────────────────────────────────┘
```

**HUD Öğeleri:**

| Öğe | Konum | Boyut | Bilgi |
|-----|-------|-------|-------|
| **Skor Tabelası** | Üst orta | Tam genişlik, 40dp yükseklik | Takım isimleri (kısaltma), skor, maç zamanı |
| **Duraklat Düğmesi** | Sağ üst (skor içinde) | 32dp ikon | Duraklat menüsü için dokunma |
| **Mini Harita** | Sol üst, skor altı | 80×60dp | Oyuncu noktaları (takım renkli), top göstergesi |
| **Sanal Joystick** | Sol alt | 120dp çap | Hareket kontrolü, dokunmada belirir |
| **Düğme A (Pas/Müdahale)** | Sağ alt küme | 56dp | Bağlama duyarlı: Pas (hücum) / Müdahale (savunma) |
| **Düğme B (Şut/Blok)** | Sağ alt küme | 56dp | Bağlama duyarlı: Şut (hücum) / Blok (savunma) |
| **Düğme C (Ara Pas/Değiştir)** | Sağ alt küme | 48dp | Ara pas (hücum) / Oyuncu değiştir (savunma) |
| **Sprint Düğmesi** | Alt orta-sağ | 48×32dp | Sprint için basılı tut; dayanıklılık çubuğuna bağlı |
| **ÖY (Özel Yetenek)** | Sağ en alt | 64dp, parlayan | Dolduğunda aktif; yetenek ikonunu gösterir |
| **Dayanıklılık Çubuğu** | Kontrollerin üstü, sol | 120×8dp | Yeşil→Sarı→Kırmızı gradyan |

**HUD Kuralları:**
- Opaklık: Skor tabelası %90, kontroller %70 (dokunmada %100'e çıkar)
- Ayarlarda mini harita otomatik gizleme seçeneği
- Kontroller sabit konumda (v1'de sürüklenemez; gelecek güncellemeyle özelleştirilebilir düzen)
- Özel Yetenek düğmesi hazır olduğunda titreşir, bekleme süresindeyken gri
- ÖY düğmesinde radyal dolgu olarak bekleme süresi gösterimi

### 5.3 Duraklat Menüsü

- Duraklat yalnızca gündelik/dostluk modlarında mevcut
- Dereceli: maç başına 2× ile sınırlı, her biri 10 saniye
- Duraklatma sırasında kamera açısı seçilebilir ([GDD-01](core-game-design-tr.md) başına 6 açı)
- Çekilme onay diyaloğu gerektirir ("Bu maçtan çekilin? Bu kayıp olarak sayılır.")

### 5.4 Maç Sonrası Ekranı

**Maç Sonrası Öğeleri:**
- Uygun ruh haliyle Galibiyet/Mağlubiyet/Beraberlik ([GDD-05, Bölüm 8.4](art-visual-style-tr.md))
- Zaman damgalı gol atan oyuncular
- Maçın Yıldızı vurgusu
- Ödül dağılımı (altın, XP, MMR değişimi, sezon kartı ilerlemesi)
- Hızlı yeniden kuyruğa girmek için "Tekrar Oyna" (aynı mod)
- Detaylı istatistikler (genişletilebilir): topa sahip olma, şutlar, paslar, müdahaleler
- İsteğe bağlı: Maçı değerlendir (eşleştirme kalitesi geri bildirimi için yukarı/aşağı)

---

## 6. Kart Yönetimi Arayüzü

### 6.1 Koleksiyon Görünümü

**Koleksiyon Özellikleri:**

| Özellik | Uygulama |
|---------|----------|
| **Izgara Düzeni** | 4 sütun, kaydırılabilir |
| **Kart Küçük Resmi** | 64×64dp, yüz + kademe kenarlığı gösterir |
| **Kademe Filtresi** | Çipler: Tümü, N, R, E, S (renk kodlu) |
| **Mevki Filtresi** | Çipler: Tümü, GK, DF, MF, FW |
| **Sıralama Seçenekleri** | Güç (azalan), Kademe (azalan), Mevki, İsim (A-Z), En Yeni |
| **Çoklu Seçim** | Uzun basma birleştirme/satma için çoklu seçimi etkinleştirir |
| **Kart Sayısı** | Mevcut / maksimum koleksiyon boyutu |
| **Boş Slotlar** | Keşfedilmemiş albüm girişleri için "?" gösteren hayalet kartlar |

### 6.2 Kart Detay Görünümü

**Kart Detay Özellikleri:**
- Kademe uygun animasyonla 3D kart render
- Bitişik kartlara göz atmak için sola/sağa kaydırma
- Renk kodlu stat çubukları (kırmızı < 40, sarı 40-69, yeşil 70+)
- Dokunarak genişletme açıklamalı özel yetenek
- Bağlamsal eylem düğmeleri (Kart aktif kadroda ise Sat gizlenir)

### 6.3 Formasyon Düzenleyici

**Formasyon Düzenleyici Özellikleri:**

| Özellik | Davranış |
|---------|----------|
| **Oyuncu Slotuna Dokun** | Kart seçici açar (mevkiye göre filtrelenen) |
| **Oyuncuyu Sürükle** | Pozisyonları takas etmek için slotlar arası sürükle |
| **Formasyon Okları** | 6 formasyon arasında geçiş (1-2-2, 2-1-2, 2-2-1, 1-3-1, 3-1-1, 1-1-3) |
| **Otomatik Doldur** | AI güç + kimya ile en iyi kartları seçer |
| **Kimya Gösterimi** | Kartlar yerleştirildikçe gerçek zamanlı güncelleme; uyumlu kartlar arası bağlantılar gösterilir |
| **Kimya Bağlantıları** | Sinerjik kartlar arası yeşil çizgiler, anti-sinerji için kırmızı çizgiler |
| **Kaydet** | 5'e kadar kadro şablonu kaydetme |
| **Oyna** | Mevcut kadroyla maça hızlı başlatma |

### 6.4 Kart Birleştirme Arayüzü

**Birleştirme UX Kuralları:**
- **Yayınlanmış oranlar** birleştirmeden önce her zaman görünür ([GDD-03](game-economy-monetization-tr.md) gereği)
- **Acıma sayacı** belirgin şekilde gösterilir
- **Düşürme yok** garantisi net belirtilir
- Nihai birleştirmeden önce **onay diyaloğu** ("Bu 2 kartı birleştir? Bu geri alınamaz.")
- **Sonuç animasyonu:** gerilim sekansı (1.5sn) → kademe uygun VFX ile kart açığa çıkma
- **Geri alma süresi:** Yok (onaylanan eylem kesindir, ancak ≥ giriş kademe garantisi pişmanlığı ortadan kaldırır)

---

## 7. Mağaza ve Paket Açma Arayüzü

### 7.1 Mağaza Düzeni

- Sekmeli navigasyon: [Paketler] [Kart] [Kozmetik] [Elmaslar]
- Günlük Fırsatlar üstte zamanlayıcıyla
- Mevcut Paketler listelenir
- Ücretsiz Paket her zaman ücretli paketlerle aynı düzeyde görünür

### 7.2 Mağaza UX Anti-P2W Kuralları

| Kural | Uygulama |
|-------|----------|
| **Karanlık desen yok** | Sahte aciliyet yaratan geri sayım yok (gerçek günlük fırsat sıfırlamaları hariç) |
| **Oranlar her zaman görünür** | Her pakette "Oranları Gör" düğmesi; satın alma öncesi tam düşme tablosu erişilebilir |
| **Harcama farkındalığı** | Oturumda 50$ harcandıktan sonra: "Bugün 50$ harcadınız" nötr banner |
| **Harcama limiti** | Günlük 100$ sonrası: bir sonraki satın almadan önce 15 dakika bekleme |
| **"En iyi değer" etiketi yok** | Hiçbir uygulama içi satın almayı "en iyi değer" olarak etiketleme — oyuncular karar versin |
| **Ücretsiz paket belirginliği** | Ücretsiz paket her zaman ücretli paketlerle aynı düzeyde görünür |
| **Mağazaya otomatik yönlendirme yok** | Oyuncu asla mağazaya otomatik yönlendirilmez; her zaman oyuncu başlatır |
| **Net fiyatlandırma** | Tüm öğeler sanal para biriminin yanı sıra gerçek para birimi maliyetini gösterir |

### 7.3 Paket Açma Sekansı

| Aşama | Süre | Görsel |
|-------|------|--------|
| **Satın Alma Onayı** | Oyuncu dokunuşu | 2 dokunuşlu onay (sepete ekle + onayla) |
| **Paket Belirir** | 1sn | Paket türü animasyonu (merkeze kayma/süzülme) |
| **Beklenti Oluşumu** | 1.5sn | Parıltı/sarsılma yoğunlaşır, parçacıklar döner |
| **Kart Açığa Çıkma** | Kart başına 1sn | Kartlar tek tek çevrilir/şekillenir |
| **Kademe Açığa Çıkma** | Kart başına 0.5sn | Çerçeve kademe rengi + VFX ile aydınlanır |
| **Koleksiyon** | 2sn | Tüm kartlar gösterilir; "YENİ" rozetleri; detay için dokun |
| **Atlama** | Mevcut | Animasyonu atlamak için dokun; tüm kartları anında gör |

**Kritik UX Kuralı:** Paket açma atlama HER ZAMAN mevcut. Oyuncuları para verdikleri kartlar için animasyon izlemeye asla zorlamayın. Animasyon keyif için vardır, sürtünme için değil.

### 7.4 Sezon Kartı Arayüzü

- Kademe arasında yatay kaydırma, mevcut kademe vurgulanmış
- Ücretsiz hat her zaman görünür — asla gizlenmiş veya küçümsenmiş değil
- Premium ödüller gösterilir ama net kilitli (hayal kırıklığı kışkırtması değil)
- Planlama için "Kalan günler" belirgin gösterilir
- Yükseltme düğmeleri yalnızca bağlamsal olarak uygun yerlerde

---

## 8. Rekabet ve Sıralama Arayüzü

### 8.1 Mevcut Rütbe Gösterimi

- Mevcut rütbe rozeti, MMR değeri ve bir sonraki rütbe hedefi
- Yıldız ilerlemesi ile rütbe yükselme/düşme
- Sezon adı ve bitiş tarihi
- Sezon ödülleri önizlemesi
- Son maç sonuçları (W/L serisi)
- Galibiyet oranı ve seri bilgisi

### 8.2 Sıralama Tablosu Arayüzü

**Sıralama Tablosu Özellikleri:**
- 4 görünüm: Global, Bölgesel (otomatik algılanan), Arkadaşlar, Kulüp
- Konumunuz kaydırmadan bağımsız olarak her zaman altta sabitlenir
- İlk 3 madalya ikonları ve vurgu stiliyle
- "Etrafımdakiler" görünümü, rütbenize göre ±10 oyuncu gösterir
- Herhangi bir oyuncuya dokunarak herkese açık profilini görme
- Anti-manipülasyon: sıralama tablosunda gizli MMR değerleri (yalnızca rütbe); kesin MMR yalnızca oyuncunun kendisine gösterilir

### 8.3 Rütbe Yükselme Animasyonu

Bir oyuncu rütbe yükseldiğinde:
1. Maç biter → Galibiyet ekranı
2. "RÜTBE YÜKSELME!" banner'ı tantanayla kayarak girer
3. Eski rütbe rozeti yeni rütbe rozetine dönüşür
4. Ödül listesi belirir (rütbe yükselme ödülleri)
5. Sosyal medya için "Paylaş" seçeneği

Süre: 4 saniye (2 saniye sonra atlanabilir)

---

## 9. Sosyal ve Profil Arayüzü

### 9.1 Profil Ekranı

- Avatar, oyuncu adı, seviye, rütbe, kulüp
- Hızlı istatistikler: Maçlar, Galibiyet %, Goller
- Başarım vitrinleri (42/125 Açılmış)
- Vitrin: En İyi Kart, Favori Kutlama, En İyi Sezon Rekoru

### 9.2 Arkadaş Listesi

| Özellik | Uygulama |
|---------|----------|
| **Arkadaş Listesi** | Çevrimiçi/çevrimdışı durumlu kaydırılabilir liste |
| **Çevrimiçi Göstergesi** | Çevrimiçi için yeşil, çevrimdışı için gri, maçta için turuncu nokta |
| **Hızlı Eylemler** | Maça davet et, profil görüntüle, hediye gönder, kaldır |
| **Arkadaşlık İsteği** | Oyuncu kimliği ile veya maç sonrası önerisi ile |
| **Maks Arkadaş** | 100 (premium ile genişletilebilir) |
| **Son Oyuncular** | "Arkadaş Ekle" seçeneğiyle son 20 rakip |

### 9.3 Gelen Kutusu Sistemi

**Gelen Kutusu Kuralları:**
- Toplu ödül toplama için "Tümünü Talep Et" düğmesi
- Mesajlar 30 gün sonra sona erer (7 günde uyarıyla)
- Ödüller sekmesi rozetleri talep edilmemiş sayısını gösterir
- Sistem mesajları yama notları, bakım ve duyuruları içerir
- Sosyal sekme: arkadaşlık istekleri, takas teklifleri, kulüp mesajları

---

## 10. Başlangıç Akışı

### 10.1 İlk Kez Kullanıcı Deneyimi (İKKD)

| Adım | Ekran | Süre | Etkileşim |
|------|-------|------|-----------|
| **1** | Açılış + Logo | 2sn | Otomatik |
| **2** | Dil Seçimi | Oyuncu seçimi | Seçmek için dokun |
| **3** | "Project F'e Hoş Geldiniz" sinematik | 8sn | 3sn sonra atlanabilir |
| **4** | Takımını Adlandır | Ort. 10sn | Metin girişi + onay |
| **5** | İlk Yüz Şablonunu Seç | Ort. 15sn | 12 başlangıç şablonundan kaydır + seç |
| **6** | Eğitim Maçı — Hareket | 30sn | Rehberli: joystick hareketi + pas |
| **7** | Eğitim Maçı — Şut | 30sn | Rehberli: kaleye şut |
| **8** | Eğitim Maçı — İlk Maçı Kazan | 60sn | Yarı rehberli: AI'ya karşı maç tamamla |
| **9** | İlk Paket Açma | 15sn | 3 kartlık başlangıç paketi aç |
| **10** | İlk Kadroyu Oluştur | 20sn | Kartları formasyona yerleştir |
| **11** | İkinci Maç (isteğe bağlı rehberlik) | 4 dk | İpucu araç ipuçlarıyla tam maç |
| **12** | Ana Ekran Açılışı | — | Tam arayüz erişilebilir |

**Toplam İKKD Süresi:** ~7 dakika (5 dk temel yol + 2 dk isteğe bağlı)

### 10.2 Eğitim Tasarım İlkeleri

| İlke | Uygulama |
|------|----------|
| **Yaparak Öğren** | Metin duvarı yok; her mekanik oynanış yoluyla öğretilir |
| **Her Seferinde Tek Kavram** | Hareket → Pas → Şut → Maç → Kartlar → Kadro |
| **Hızlı Galibiyet** | İlk maç her zaman oyuncu galibiyetiyle biter (AI zorluğu 0) |
| **Ödüllendirici** | Her eğitim adımı somut bir ödül verir |
| **Atlanabilir** | İlk maçtan sonra deneyimli oyuncular için "Eğitimi Atla" mevcut |
| **Yeniden Erişilebilir** | Ayarlar > Yardım > Eğitim'den eğitim tekrarı mevcut |

### 10.3 Kademeli Açıklama

Özellikler bunaltmayı önlemek için kademeli olarak açılır:

| Özellik | Açılma Koşulu | Eğitim Bildirimi |
|---------|--------------|-----------------|
| **Hızlı Maç** | İKKD sonrası hemen | "İlk gerçek maçını oyna!" |
| **Kart Koleksiyonu** | İlk paket açıldıktan sonra | "Yeni kartlarına göz at!" |
| **Formasyon Düzenleyici** | 2. maçtan sonra | "Formasyonunu özelleştir" |
| **Dereceli Mod** | 5 maç oynadıktan sonra | "Rekabete hazır mısın? Dereceli'yi dene!" |
| **Kart Birleştirme** | 10+ karta sahip olduktan sonra | "Daha güçlü kartlar almak için kartları birleştir" |
| **Takas Pazarı** | Bronz III'e ulaştıktan sonra | "Diğer oyuncularla takas yap" |
| **Sezon Kartı** | 1. günden sonra | Pasif kilit açma; bilgi araç ipucu |
| **Kulüp** | Gümüş V'e ulaştıktan sonra | "Bir kulübe katıl veya oluştur!" |
| **Kozmetik Mağazası** | Seviye 5'e ulaştıktan sonra | İnce dürtme, zorunlu değil |

### 10.4 Bağlamsal İpuçları

| İpucu Türü | Tetikleyici | Gösterim |
|-----------|---------|---------|
| **İlk Ziyaret** | Herhangi bir ekranda ilk kez | Soluk katmanla temel öğeleri vurgula |
| **Özellik Keşfi** | Yeni özellik açıldı | Titreşen "YENİ" rozeti + araç ipucu |
| **Günün İpucu** | Ana ekran, 1. giriş | Başlık altında küçük banner |
| **Maç İpucu** | Oyuncu zorlanıyor (3 mağlubiyet) | "Formasyonunu değiştirmeyi dene" önerisi |
| **Ekonomi İpucu** | Oyuncu kaynaklara sahip ama kullanmıyor | "Birleştirmeye hazır kartların var!" |

**İpucu Kuralları:**
- Her ipucu maksimum 3 kez gösterilir
- Tüm ipuçlarda "Bir daha gösterme" seçeneği
- Maçlar sırasında asla ipucu gösterme
- İpuçları araç ipucu stili kullanır, asla modal değil

---

## 11. Bildirim Sistemi

### 11.1 Oyun İçi Bildirimler

| Tür | Görsel | Konum | Otomatik Kapanma |
|-----|--------|-------|------------------|
| **Ödül Kazanıldı** | İkonlu yeşil tost | Üst orta | 3 saniye |
| **Başarım Açıldı** | Animasyonlu altın banner | Üst orta | 5 saniye |
| **Arkadaş Çevrimiçi** | Küçük avatar tostu | Sağ üst | 3 saniye |
| **Takas Teklifi** | Kart önizlemeli mavi tost | Üst orta | 5 saniye |
| **Maç Bulundu** | Tam genişlik katman | Merkez | Eyleme kadar |
| **Sezon Etkinliği** | Temalı banner | Üst orta | 5 saniye |
| **Günlük Sıfırlama** | İnce gösterge | Sekme rozetleri | Kalıcı |

### 11.2 Anlık Bildirimler

**Kategoriler (Kullanıcı Yapılandırılabilir):**

| Kategori | Örnekler | Varsayılan | Maks Sıklık |
|----------|----------|-----------|-------------|
| **Ücretsiz Ödüller** | "Ücretsiz paketin hazır!" | AÇIK | Her 4 saatte |
| **Sosyal** | "ArkadaşAdı oynamak istiyor!" | AÇIK | Sınırsız (organik) |
| **Sezon/Etkinlik** | "Yeni etkinlik: Dünya Kupası Modu başladı!" | AÇIK | Günde maks 2 |
| **Rekabet** | "Dereceli sezonun 24 saat içinde bitiyor!" | AÇIK | Günde maks 1 |
| **Günlük Görevler** | "Bonus XP için bugünün görevlerini tamamla" | AÇIK | Günde maks 1 |
| **İnaktiflik** | "Seni özledik! Takımın seni bekliyor" | AÇIK | Haftada 1, 2 hafta sonra durur |
| **Mağaza/Fırsatlar** | "Yeni günlük fırsatlar mevcut!" | KAPALI | Günde maks 1 |
| **Bakım** | "2 saat içinde sunucu bakımı" | AÇIK (kilitli) | Gerektiğinde |

### 11.3 Bildirim Tasarım Kuralları

| Kural | Detay |
|-------|-------|
| **Ön Onay** | iOS izin diyaloğundan önce bildirim değerini açıklayan özel ekran göster |
| **Yapılandırılabilir** | Her kategori Ayarlardan açılıp kapatılabilir (bakım hariç) |
| **Saygılı Saatler** | Yerel saat 22:00-08:00 arası anlık bildirim yok (acil bakım hariç) |
| **FOMO Yok** | Gerçekten doğru olmadıkça anlık kopyada "sınırlı süre!" veya "yakında sona eriyor!" kullanma |
| **Mağaza Bildirimi Yok** | Mağaza bildirimleri varsayılan KAPALI; yalnızca oyuncu onay verirse etkin |
| **Karakter Limiti** | Bildirim başına ≤ 90 karakter (hem iOS hem Android'e sığar) |
| **Derin Bağlantı** | Her bildirim ilgili ekrana derin bağlantı (yalnızca ana sayfaya değil) |
| **Sıklık Limiti** | Tüm kategorilerde günde maksimum 3 anlık bildirim |

---

## 12. Erişilebilirlik

### 12.1 Görsel Erişilebilirlik

| Özellik | Uygulama |
|---------|----------|
| **Renk Körlüğü Modları** | 3 şablon: Protanopi, Deuteranopi, Tritanopi yoğunluk kaydırıcısıyla |
| **Yüksek Kontrast** | Artırılmış kontrast oranlarıyla alternatif arayüz teması (WCAG AA minimum) |
| **Font Ölçekleme** | 5 boyut: Küçük (12sp), Normal (14sp), Büyük (16sp), XL (18sp), XXL (20sp) |
| **İkon + Renk** | Asla yalnızca renge güvenme; tüm renk kodlu bilginin ikon/şekil yedeği var |
| **Kart Kademe Şekilleri** | Her kademenin renge ek olarak benzersiz kenarlık şekli var (daire, elmas, yıldız, taç, alev) |
| **Nadirlik Desenleri** | Renk körlüğü modu kademe arka planlarına desen ekler (noktalar, çizgiler, çapraz tarama, dalgalar, zigzag) |

### 12.2 Motor Erişilebilirliği

| Özellik | Uygulama |
|---------|----------|
| **Tek El Modu** | Sağ veya sol başparmak bölgesine sığan sıkıştırılmış kontrol düzeni |
| **Kontrol Ölçekleme** | Joystick ve düğme boyutları ayarlanabilir (varsayılanın %80-%150'si) |
| **Dokunma Zamanlaması** | Temel oynanış dışında zamana kritik dokunuş yok (menüler zamansız) |
| **Otomatik Oynatma** | Gündelik maçlarda AI yardımı (azaltılmış ödüller) |
| **Sadeleştirilmiş Kontroller** | 2 düğme modu: A (bağlam eylemi) + Sprint; AI kamerayı/değiştirmeyi yönetir |

### 12.3 İşitsel Erişilebilirlik

| Özellik | Uygulama |
|---------|----------|
| **Altyazılar** | Altyazı seçeneğiyle tüm ses/yorumlar |
| **Sesli İpuçları** | Tüm sesli ipuçları için görsel alternatifler (gol, düdük, zamanlayıcı) |
| **Bireysel Ses** | Ayrı kaydırıcılar: Ana, Müzik, SFX, Yorumlar, Arayüz Sesleri |
| **Dokunsal Geri Bildirim** | Goller, müdahaleler, özel yetenekler için titreşim (açma/kapama) |
| **Mono Ses** | Stereoyu monoya birleştirme seçeneği |

### 12.4 Bilişsel Erişilebilirlik

| Özellik | Uygulama |
|---------|----------|
| **Basit Dil** | Arayüz metni 6. sınıf okuma seviyesinde |
| **Eğitim Tekrarı** | Ayarlardan herhangi bir eğitime yeniden erişim |
| **Tutarlı Düzen** | Tüm ekranlarda aynı navigasyon deseni |
| **Onay Diyalogları** | Tüm yıkıcı/satın alma eylemleri açık onay gerektirir |
| **Mümkün Olduğunda Geri Al** | Kadro değişiklikleri geri alınabilir, kart kuşanma/çıkarma ücretsiz |

---

## 13. Ayarlar ve Seçenekler

### 13.1 Ayarlar Menü Yapısı

```
Ayarlar
├── Hesap
│   ├── Hesap Bağla (Google/Apple/Facebook)
│   ├── Oyuncu Kimliği (kopyala)
│   ├── Dil
│   └── Hesap Sil
├── Grafikler
│   ├── Kalite Şablonu (Düşük/Orta/Yüksek/Otomatik)
│   ├── Kare Hızı (30/60)
│   ├── Çözünürlük Ölçeği
│   └── Pil Tasarrufu Modu
├── Ses
│   ├── Ana Ses
│   ├── Müzik Sesi
│   ├── SFX Sesi
│   ├── Yorumcu Sesi
│   └── Dokunsal Geri Bildirim (Açık/Kapalı)
├── Kontroller
│   ├── Joystick Boyutu (kaydırıcı)
│   ├── Düğme Boyutu (kaydırıcı)
│   ├── Tek El Modu (Kapalı/Sol/Sağ)
│   ├── Sadeleştirilmiş Kontroller (Açık/Kapalı)
│   └── Hassasiyet (kaydırıcı)
├── Bildirimler
│   ├── [Kategori başına açma/kapama]
│   └── Sessiz Saatler
├── Erişilebilirlik
│   ├── Renk Körlüğü Modu (Kapalı/Prot/Deut/Trit)
│   ├── Renk Körlüğü Yoğunluğu (kaydırıcı)
│   ├── Yüksek Kontrast (Açık/Kapalı)
│   ├── Font Boyutu (5 seçenek)
│   ├── Mono Ses (Açık/Kapalı)
│   └── Altyazılar (Açık/Kapalı)
├── Oynanış
│   ├── Kamera Açısı (6 şablon)
│   ├── Otomatik Oyuncu Değiştirme (Açık/Kapalı)
│   ├── Maç Süresi Gösterimi (Saat/Geri Sayım)
│   └── Kutlamaları Atla (Açık/Kapalı)
├── Gizlilik
│   ├── Çevrimiçi Durumu Göster (Açık/Kapalı)
│   ├── Arkadaşlık İsteklerine İzin Ver (Herkes/Arkadaşların Arkadaşları/Hiçbiri)
│   ├── Profil Görünürlüğü (Herkese Açık/Arkadaşlar/Gizli)
│   └── Veri ve Gizlilik Politikası
└── Yardım
    ├── Eğitimi Tekrarla
    ├── SSS
    ├── Destekle İletişim
    └── Hakkında / Versiyon
```

### 13.2 Ayarlar UX Kuralları

- Ayarlar daraltılabilir bölümlerle kategoriye göre düzenlenir
- Değişiklikler anında uygulanır ("Kaydet" düğmesi gerekmez)
- Bölüm başına "Varsayılanlara Sıfırla" seçeneği
- Grafik ayarları tahmini performans etkisini gösterir
- Pil Tasarrufu modu kaliteyi düşürür + 30 FPS'de sınırlar
- Dil değişikliği uygulama yeniden başlatması gerektirir (onay diyaloğuyla)

---

## 14. P2W ve Sürdürülebilirlik Değerlendirmesi

### 14.1 Arayüz/UX P2W Risk Değerlendirmesi

| Arayüz Öğesi | P2W Riski | Azaltma |
|-------------|----------|---------|
| **Nav çubuğunda mağaza yerleşimi** | Orta | Mağaza 3. sekme (1. veya 2. değil); oraya navigasyonu asla zorlamaz |
| **Paket açma gösterisi** | Orta | Ücretsiz paketler ücretlilerle AYNI animasyon kalitesi alır. Ücretsiz oyuncular için "daha az" muamele yok. |
| **Günlük fırsat yerleşimi** | Düşük | Fırsatlar görünür ama müdahaleci değil; çoğunlukla altın fiyatlı, yalnızca elmas değil |
| **Harcama arayüzü** | Düşük | Çift dokunuş satın alma, harcama farkındalık banner'ları, bekleme süreli günlük limit |
| **Sezon Kartı arayüzü** | Düşük | Ücretsiz hat her zaman görünür ve asla küçümsenmez; premium kilitli gösterilir, kışkırtıcı değil |
| **Kart güç gösterimi** | Düşük | Güç maç öncesinde her iki oyuncuya da görünür; gizli bilgi avantajı yok |
| **Bildirim itme** | Düşük | Mağaza bildirimleri varsayılan KAPALI; ücretsiz ödül bildirimleri öncelikli |

### 14.2 UX Sürdürülebilirlik Analizi

| Faktör | Puan | Notlar |
|--------|------|--------|
| **Dönüş Kolaylığı** | 9/10 | Hızlı giriş → ana sayfa → oyna 10 saniyenin altında. Geri dönüş engeli yok. |
| **Oturum Esnekliği** | 9/10 | Maçlar 4-5 dakika. Mobil oturumlar için mükemmel. |
| **İlerleme Netliği** | 8/10 | Net rütbe gösterimi, sezon ilerlemesi, koleksiyon ilerlemesi. Oyuncular her zaman nerede olduklarını bilir. |
| **Sosyal Yapışkanlık** | 8/10 | Arkadaş listesi, kulüpler, dostluk maçları, sıralama tabloları topluluk bağları yaratır. |
| **İçerik Keşfi** | 8/10 | Kademeli açıklama bunalmayı önlerken keşif sevincini korur. |
| **Hayal Kırıklığı Yönetimi** | 9/10 | Çıkmaz ekran yok, zorunlu mağaza ziyareti yok, tüm geri alınamaz eylemlerde onaylar. |
| **Erişilebilirlik Erişimi** | 9/10 | Renk körlüğü modları, tek elle oynama, font ölçekleme, sadeleştirilmiş kontroller hedeflenebilir pazarı genişletir. |
| **Genel UX Sürdürülebilirliği** | **8.6/10** | Uzun vadeli oyuncu memnuniyeti için tasarlanmış güçlü UX temeli. |

### 14.3 eFootball Hata Kaçınması

> eFootball Mobile'ın 2022 lansmanı bir arayüz/UX felaketiydi. Ondan ders alıyoruz:

| eFootball Hatası | Bizim Önlememiz |
|-----------------|----------------|
| **Kafa karıştıran menü yapısı** | Net 5 sekmeli navigasyon, 3 dokunuş kuralı zorunlu |
| **Gizli özellikler** | Net kilit açma mesajlarıyla kademeli açıklama |
| **Yavaş arayüz geçişleri** | Tüm geçişler ≤ 300ms, önceden render edilmiş varlıklar |
| **Tutarsız tasarım dili** | GDD-05'ten tek tasarım sistemi her ekrana uygulanmış |
| **Başlangıç yok** | Her seferinde tek kavram öğreten kapsamlı İKKD |
| **Gömülü ayarlar** | Başlık hamburger'i aracılığıyla her ekrandan erişilebilir ayarlar |

### 14.4 Karanlık Desen Kontrol Listesi (Asla YAPMAYACAKLARIMIZ)

| Karanlık Desen | Durum | Gerekçe |
|---------------|-------|---------|
| **Zorunlu reklamlar** | ❌ ASLA | Reklamlar her zaman ödüllü ve yalnızca onaylı |
| **Geri sayım aciliyeti** | ❌ ASLA | Net açıklamalı gerçek günlük fırsat sıfırlamaları hariç |
| **Ücretsiz seçeneklerde "Emin misiniz?"** | ❌ ASLA | Onaylar yalnızca satın almalarda/yıkıcı eylemlerde |
| **Kafa karıştıran para birimi gösterimi** | ❌ ASLA | Sanal para biriminin yanında gerçek para birimi her zaman gösterilir |
| **Mağazaya otomatik yönlendirme** | ❌ ASLA | Oyuncu her zaman kendi seçimiyle mağazaya navigasyon yapar |
| **"Tek seferlik teklif" popup'ları** | ❌ ASLA | Tüm teklifler mağazada mevcut; kesme popup'ı yok |
| **Ücretsiz için daha az animasyon** | ❌ ASLA | Ücretsiz paketler ücretliyle eşit kutlama alır |
| **Gizli oranlar** | ❌ ASLA | Düşme oranları her pakette görünür |
| **Gömülü abonelik iptali** | ❌ ASLA | Bildirim açma/kapamaları düz Ayarlarda |
| **İlerleme duvarları** | ❌ ASLA | Erişim için ödeme gerektiren özellik yok |

---

## Ek A: Ekran Geçiş Haritası

### A.1 Temel Kullanıcı Akışları

**Akış 1: Hızlı Maç (3 dokunuş)**
```
Ana Sayfa → [Oyna Sekmesi] → [Hızlı Maç] → Kuyruk → Maç
```

**Akış 2: Paket Aç (3 dokunuş)**
```
Ana Sayfa → [Mağaza Sekmesi] → [Ücretsiz Paket / Satın Al] → Paket Açma
```

**Akış 3: Kadro Düzenle (2 dokunuş)**
```
Ana Sayfa → [Kadro Sekmesi] → Formasyon Düzenleyici
```

**Akış 4: Rütbe Kontrol (2 dokunuş)**
```
Ana Sayfa → [Sıralama Sekmesi] → Rütbe Gösterimi
```

**Akış 5: Kart Birleştir (4 dokunuş)**
```
Ana Sayfa → [Kadro Sekmesi] → [Kart Birleştirme] → Kart Seç → Birleştir
```

**Akış 6: Kart Takas Et (4 dokunuş)**
```
Ana Sayfa → [Kadro Sekmesi] → [Takas Pazarı] → Kart İlan Et → Onayla
```

### A.2 Hata Durumu Ekranları

| Hata | Ekran İşleme |
|------|-------------|
| **İnternet Yok** | Yeniden dene düğmesiyle tam ekran + çevrimdışı antrenman modu seçeneği |
| **Sunucu Bakımı** | Tahmini dönüş süresiyle temalı bakım ekranı |
| **Maç Bağlantı Kesilmesi** | Yeniden bağlanma denemesi (3×) + nazikçe çekilme seçeneği |
| **Oturum Süresi Dolmuş** | Sorunsuz yeniden giriş akışı (veri kaybı yok) |
| **Envanter Dolu** | Devam etmeden önce kart satma/birleştirme istemi |
| **Yetersiz Para Birimi** | Açığı göster + "Nasıl kazanılır" bağlantısı (yalnızca "Daha fazla satın al" değil) |

---

## Ek B: Duyarlı Tasarım Kesme Noktaları

| Cihaz Sınıfı | Ekran Genişliği | Düzenlemeler |
|-------------|----------------|-------------|
| **Küçük Telefon** | < 360dp | 3 sütunlu kart ızgarası, daha küçük düğmeler, yoğun başlıklar |
| **Standart Telefon** | 360-420dp | Varsayılan düzen (4 sütun kartlar) |
| **Büyük Telefon** | 420-480dp | Ekstra dolgulu varsayılan düzen |
| **Tablet** | 480dp+ | 6 sütunlu kart ızgarası, uygun yerlerde yan yana paneller |
| **Katlanabilir (Açık)** | Değişken | Açıkken tablet düzeni, kapalıyken telefon |

---

## Ek C: Yükleme ve Boş Durumlar

### C.1 Yükleme Durumları

| Bağlam | İşleme |
|--------|--------|
| **Uygulama Başlatma** | Logo animasyonu → ilerleme çubuğu → ana ekran |
| **Maç Yükleme** | Takım karşılaştırmalı ipucu karuseli |
| **Ekran Navigasyonu** | İskelet ekranları (gri yer tutucu şekiller) — asla spinnerlar değil |
| **Veri Getirme** | Kart/liste yer tutucularında içerik parıltı animasyonu |

### C.2 Boş Durumlar

| Ekran | Boş Mesajı | CTA |
|-------|-----------|-----|
| **Koleksiyon (kart yok)** | "Koleksiyonun boş! İlk paketini aç." | [Ücretsiz Paket Aç] |
| **Arkadaşlar (yok)** | "Henüz arkadaşın yok! Rakiplerle tanışmak için maç oyna." | [Hızlı Maç] |
| **Maç Geçmişi (ilk kez)** | "Henüz maç oynanmadı. Yolculuğuna başla!" | [Şimdi Oyna] |
| **Takas Pazarı (ilan yok)** | "Henüz ilan yok. İlk sen ol!" | [Kart İlan Et] |
| **Kulüp (katılmamış)** | "Birlikte rekabet etmek için bir kulübe katıl!" | [Kulüp Bul] |
| **Gelen Kutusu (boş)** | "Her şey tamam! Daha fazla ödül kazanmak için oyna." | [Maç Oyna] |

---

*Bu doküman Project F için tam Arayüz/Kullanıcı Deneyimi sistemini tanımlar. Tüm ekran tasarımları, etkileşim kalıpları ve navigasyon akışları bu spesifikasyonlara uymalıdır. Sapmalar Oyun Tasarımcısı ve UX Lideri onayı gerektirir.*

*Sonraki Doküman: [GDD-07: Özel Yetenekler ve GGO Sistemi](special-abilities-ggo-tr.md)*
