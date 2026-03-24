# GDD-05: Sanat ve Görsel Stil

**Doküman Kodu:** GDD-05
**Versiyon:** 1.0
**Tarih:** 17 Mart 2026
**Yazar:** Oyun Tasarımcısı Ajanı, YG Games
**Durum:** Taslak
**İlgili Dokümanlar:** [GDD-00: Rakip Analizi](docs/00-competitor-analysis-en.md) | [GDD-01: Temel Oyun Tasarımı](core-game-design-tr.md) | [GDD-02: Kart Koleksiyon Sistemi](card-collection-system-tr.md)

---

## İçindekiler

1. [Sanat Yönetimi](#1-sanat-yönetimi)
2. [Karakter Tasarımı](#2-karakter-tasarımı)
3. [Arayüz Görsel Stili](#3-arayüz-görsel-stili)
4. [Kart Çerçeve Tasarımı](#4-kart-çerçeve-tasarımı)
5. [Stadyum ve Çevre Tasarımı](#5-stadyum-ve-çevre-tasarımı)
6. [Animasyon Standartları](#6-animasyon-standartları)
7. [Görsel Efektler (VFX)](#7-görsel-efektler-vfx)
8. [Aydınlatma ve Atmosfer](#8-aydınlatma-ve-atmosfer)
9. [Teknik Sanat Standartları](#9-teknik-sanat-standartları)
10. [Referans Panosu](#10-referans-panosu)
11. [P2W ve Sürdürülebilirlik Değerlendirmesi](#11-p2w-ve-sürdürülebilirlik-değerlendirmesi)

---

## 1. Sanat Yönetimi

### 1.1 Vizyon Bildirimi

> **"Goley'in büyüsü, modern kaliteyle yeniden hayal edildi — içinde yaşamak isteyeceğiniz bir futbol dünyası."**

Project F'in görsel kimliği, Goley'i unutulmaz kılan sevimli chibi estetiğini çağdaş render teknikleri ve mobil optimizasyonlu kaliteyle birleştirir. Anında tanınabilen, duygusal olarak bağ kurulan ve orta segment akıllı telefonlarda performanslı çalışan bir dünya inşa ediyoruz.

### 1.2 Temel Direkler

| Direk | Açıklama |
|-------|----------|
| **Büyüleyici ve İfade Dolu** | Karakterler abartılı oranlar, büyük ifadeli gözler ve ayırt edici siluetlerle kişilik yayar. Her oyuncu canlı hisseder. |
| **Okunabilir ve Mobil-Öncelikli** | Her görsel öğe 5.5" ekranda 720p'de net olmalı. Detaydan önce siluet. İncelikten önce kontrast. |
| **Rekabetçi Ama Eğlenceli** | Ton, rekabet yoğunluğunu eğlenceli cazibe ile dengeler. Maçlar yüksek riskli hisseder ama asla stresli veya karanlık değil. |
| **Özgün ve Sahiplenilir** | Kimse Project F'i başka bir oyunla karıştırmamalı. Chibi futbol kimliğimiz markamızın kalesidir. |
| **Performanslı ve Kapsayıcı** | Orta segment cihazlarda (Snapdragon 6-serisi / Dimensity 7000) 60 FPS hedefi. Güzellik polygon sayısıyla değil, sanat yönetimiyle sağlanır. |

### 1.3 Ton Spektrumu

```
Gerçekçi ------|-----------|-----------|-----------|--- Çizgi Film
               FIFA/eFootball        DLS          Project F    Score! Match
               (Fotorealizm)    (Yarı-gerçek)  (Chibi 3D)    (2D gündelik)
```

Project F kesinlikle **Stilize 3D** bölgesinde yer alır — Score! Match'in düz 2D'sinden daha detaylı, DLS'nin yarı-gerçekçiliğinden daha büyüleyici ve FIFA'nın fotorealistik yaklaşımından tamamen farklı.

### 1.4 Renk Felsefesi

**Birincil Palet:**

| Renk | Hex | Kullanım |
|------|-----|----------|
| **Project F Yeşili** | `#2ECC71` | Saha, pozitif aksiyonlar, Altın para birimi |
| **Şampiyon Altını** | `#F1C40F` | Premium öğeler, başarımlar, Elmas para birimi |
| **Derin Lacivert** | `#1A1A2E` | Arka planlar, başlıklar, derinlik |
| **Saf Beyaz** | `#FFFFFF` | Yazılar, kart arka planları, temiz yüzeyler |
| **Aksiyon Kırmızısı** | `#E74C3C` | Uyarılar, yenilgiler, zaman baskısı |

**Vurgu Paleti (Nadirlik Kademeleri):**

| Kademe | Birincil Renk | İkincil | Çerçeve Stili |
|--------|--------------|---------|---------------|
| **Normal (N)** | `#95A5A6` Gümüş-Gri | `#BDC3C7` | Basit mat kenarlık |
| **Nadir (R)** | `#3498DB` Kraliyet Mavisi | `#2980B9` | Hafif metalik parlaklık |
| **Epik (E)** | `#9B59B6` Kraliyet Moru | `#8E44AD` | Animasyonlu ışıltı kenarlık |
| **Süper (S)** | `#F39C12` Kehribar Altın | `#E67E22` | Titreşen enerji çerçeve |
| **Efsane (L)** | `#E74C3C` Derin Kırmızı | `#C0392B` | Holografik parıltı (yalnızca sezonluk) |

> **Not:** Efsane kademesi yalnızca sezon ödülü olarak görünür, asla satın alınamaz. Kademe detayları için [GDD-02](card-collection-system-tr.md) belgesine bakın.

### 1.5 Rakiplerden Dersler

| Rakip | Görsel Güç | Görsel Zayıflık | Bizim Çıkarımımız |
|-------|-----------|-----------------|-------------------|
| **Goley** | Büyüleyici chibi stil, unutulmaz kutlamalar | Eskimiş dokular, düşük poligonlu çevreler | Büyüyü koru, kaliteyi yükselt |
| **FC Mobile** | Yüksek kaliteli oyuncu benzerlikleri | Mobil için fazla gerçekçi — küçük ekranlarda tekinsiz vadi | Mobilde stilize > gerçekçi |
| **eFootball** | Sınıfının en iyisi animasyonlar, PBR render | Devasa dosya boyutları (5+ GB), lansmanda çirkin arayüz | Kaliteli animasyon ≠ şişkinlik; arayüz ilk günden önemli |
| **DLS** | Temiz yarı-gerçekçi stil, iyi okunabilirlik | Genel, ayırt edici kimlikten yoksun | Kimliğimize sahip çık — chibi BİZİM markamız |
| **Score! Match** | Güçlü 2D kart sanatı, temiz arayüz | Basit maç içi görseller, ucuz hissettirir | Kart sanatı kalitesi + maç görselleri ikisi de önemli |

---

## 2. Karakter Tasarımı

### 2.1 Oranlar ve Vücut Modeli

**Temel Oranlar:** 2.5 kafa chibi oranı (kafa = toplam boyun %40'ı)

| Vücut Parçası | Oran | Notlar |
|---------------|------|--------|
| **Kafa** | Boyun %40'ı | Aşırı büyük, yuvarlak, ifade dolu |
| **Gövde** | Boyun %25'i | Kompakt, atletik yapı |
| **Bacaklar** | Boyun %25'i | Kısa ama dinamik |
| **Kollar** | Boyun %10'u | Kısa, jest dostu |
| **Eller** | Eldiven stili | 4 parmak (3 + başparmak), sadeleştirilmiş |
| **Ayaklar** | Büyük kramponlar | Tekmelemeyi, futbol kimliğini vurgular |

**Temel Tasarım Kuralları:**
- **Burun yok** — Goley geleneğini takip ederek, karakterlerin maksimum sevimlilik için burunsuz yüzleri var
- **Büyük gözler** — Yüz genişliğinin %30'u, görünür iris rengiyle son derece ifade dolu
- **Minimal kulaklar** — Küçük veya saç stiliyle gizlenmiş
- **Yuvarlak siluetler** — Keskin açılardan kaçın; her şey kıvrımlı
- **Cinsiyet eşitliği** — Eşit ifade gücüne sahip hem erkek hem kadın vücut modelleri

### 2.2 Yüz Özelleştirme Sistemi

Oyuncular kart oluştururken **100+ yüz şablonundan** seçim yapar ([GDD-02, Bölüm 3.2](card-collection-system-tr.md)).

**Yüz Bileşenleri:**

| Bileşen | Çeşit | Özelleştirme |
|---------|-------|-------------|
| **Göz Şekli** | 20 stil | Yuvarlak, dar, sert, neşeli, havalı |
| **Göz Rengi** | 12 renk | Doğal + fantazi (kehribar, menekşe, koyu kırmızı) |
| **Kaşlar** | 15 stil | Kalın, ince, açılı, yuvarlak, yara izli |
| **Ağız** | 10 varsayılan ifade | Gülümseme, ciddi, sırıtma, kararlı |
| **Saç** | 30 stil | Kısa, uzun, mohawk, örgü, kel, afro vb. |
| **Saç Rengi** | 16 renk | Doğal tonlar + fantazi (mavi, pembe, gümüş) |
| **Ten Tonu** | 10 ton | Doğal ten tonlarının tam yelpazesi |
| **Yüz İşaretleri** | 8 seçenek | Yara izi, yüz boyası, çiller, bandaj |
| **Aksesuarlar** | 12 seçenek | Kafa bandı, gözlük, maske, küpe |

### 2.3 Forma ve Ekipman Görselleri

**Forma Sistemi:**

| Öğe | Detay |
|-----|-------|
| **Forma** | Takım renkli, özelleştirilebilir desenler (çizgili, gradyan, düz) |
| **Şort** | Eşleşen takım renkleri, tamamlayıcı desenler |
| **Çoraplar** | 3 boy seçeneği (bilek, orta, diz) |
| **Kramponlar** | 8 temel stil × çoklu renkler (kozmetik öğe) |
| **Eldiven** | Sadece kaleci, 4 stil |
| **Kaptan Bandı** | Takım kaptanında otomatik gösterilir |

**Forma Render:**
- Koşu ve kutlamalarda forma hareketi için dinamik kumaş simülasyonu
- Maç boyunca ter/kir birikimi (hafif, performans dostu)
- Arkada isim ve numara (kart oluşturmada oyuncunun seçtiği isim)

**Kozmetik Öğeler (P2W Olmayan):**

| Kategori | Örnekler | Kaynak |
|----------|----------|--------|
| **Krampon Kaplamaları** | Alev krampon, Galaksi krampon, Klasik deri | Sezon Kartı, Mağaza |
| **Kutlama Ekipmanı** | Pelerin, duman bombaları, konfeti topları | Başarım, Mağaza |
| **Gol Efektleri** | Havai fişek, kuzey ışıkları, piksel patlama | Sezon Kartı kademeleri |
| **İz Efektleri** | Hız çizgileri, ateş izi, buz izi | Rütbe ödülleri |

> **P2W Kuralı:** Tüm kozmetikler tamamen görseldir. Hiçbir kozmetik öğe herhangi bir stat avantajı sağlamaz. Bu, [GDD-03](game-economy-monetization-tr.md) başına tartışılmaz bir tasarım ilkesidir.

### 2.4 Oyuncu Mevki Görsel Kimliği

Her mevki arketipinin küçük mobil ekranda okunabilirliğe yardımcı olan ayırt edici bir görsel silueti vardır:

| Mevki | Siluet İpucu | Görsel Tanımlayıcı |
|-------|-------------|-------------------|
| **Kaleci (GK)** | Daha geniş duruş, belirgin eldiven | Farklı forma rengi, şapka seçeneği |
| **Defans (DF)** | Dengeli, biraz daha iri | Görünür tekmelik, sağlam duruş |
| **Orta Saha (MF)** | Yağsız, dengeli | Nötr yapı, kaptan bandı hakkı |
| **Forvet (FW)** | Dinamik eğilim, sprint hazır | İnce yapı, hız çizgisi ilişkilendirmeleri |

### 2.5 Menajer ve Teknik Ekip Kartları — Görsel Tasarım

Menajer kartları kadro yönetiminde görünür, sahada değil:

| Öğe | Tasarım |
|-----|---------|
| **Poz** | Yarım vücut portre, kollar kavuşturulmuş veya taktik jest |
| **Kıyafet** | Takım elbise, eşofman veya milli takım giysisi |
| **İfade** | Sert, düşünceli veya kutlayıcı |
| **Arka Plan** | Taktik tahtası, kenar yolu veya basın toplantısı |

---

## 3. Arayüz Görsel Stili

### 3.1 Tasarım Sistemi Genel Bakış

**Arayüz Felsefesi:** Temiz, kart tabanlı, mobil-yerel

| İlke | Uygulama |
|------|----------|
| **Baş Parmak Dostu** | Tüm etkileşimli öğeler ≥ 48dp, baş parmağın ulaşabileceği bölgelerde konumlandırılmış |
| **Bilgi Hiyerarşisi** | Ekran başına maksimum 3 seviye görsel hiyerarşi |
| **Tutarlı Köşeler** | Kartlarda 12dp, düğmelerde 8dp, modallarda 16dp köşe yarıçapı |
| **Derinlik Sistemi** | 4 yükseklik seviyesi (düz, yükseltilmiş, yüzen, üst katman) |
| **Önce Koyu Mod** | Derin Lacivert (`#1A1A2E`) arka plan göz yorgunluğunu azaltır ve OLED pil tasarrufu sağlar |

### 3.2 Tipografi

| Kullanım | Font Stili | Boyut (sp) | Ağırlık |
|----------|-----------|-----------|---------|
| **Ekran Başlığı** | Display Sans | 28-32 | Kalın |
| **Bölüm Başlığı** | Display Sans | 20-24 | Yarı-Kalın |
| **Gövde Metni** | UI Sans | 14-16 | Normal |
| **Kart İstatistikleri** | Mono/Tabular | 12-14 | Orta |
| **Düğme Etiketi** | UI Sans | 16-18 | Kalın |
| **Rozet/Etiket** | UI Sans | 10-12 | Kalın |

**Font Seçim Kriterleri:**
- Yerelleştirme için Latin, Kiril, Arap ve CJK karakter setlerini desteklemeli
- Stat gösterimleri için tabular rakamlar (her rakam eşit genişlik kaplar)
- 720p ekranlarda 12sp'de net okunabilirlik

### 3.3 İkon Tasarımı

**İkon Izgarası:** 24×24dp taban, 2dp dolgu

| Stil Kuralı | Detay |
|-------------|-------|
| **Çizgi Kalınlığı** | 2dp tutarlı çizgi |
| **Dolgu Stili** | Varsayılan çizgisel, seçildiğinde/aktif olduğunda dolgulu |
| **Köşe Yarıçapı** | Yuvarlak şekillerde eşleşen 2dp yarıçap |
| **Renk** | Tek ton (koyu üzerinde beyaz, açık üzerinde lacivert) |
| **Özel İkonlar** | Futbol temalı varyasyonlar (top, krampon, kale, kart) |

**İkon Kategorileri:**

| Kategori | Sayı | Örnekler |
|----------|------|----------|
| **Navigasyon** | 8 | Ana Sayfa, Kadro, Mağaza, Maç, Sosyal, Sıralama, Ayarlar, Profil |
| **Aksiyon** | 12 | Oyna, Birleştir, Takas, Paket Aç, Kuşan, Sat, Yükselt |
| **Durum** | 8 | Galibiyet, Mağlubiyet, Beraberlik, Seri, Yeni, Zamanlayıcı, Kilit, Bildirim |
| **Kart/Öğe** | 10 | Oyuncu, Menajer, Takım, Paket, Elmas, Altın, Jeton, Güçlendirme, Forma, Rozet |

### 3.4 Navigasyon Yapısı

**Alt Navigasyon Çubuğu (5 sekme):**

```
┌──────────────────────────────────────────────────────┐
│  [⚽ Oyna]  [📋 Kadro]  [🏪 Mağaza]  [🏆 Sıralama]  [👤 Ben]  │
└──────────────────────────────────────────────────────┘
```

| Sekme | Ekran | Temel Öğeler |
|-------|-------|-------------|
| **Oyna** | Mod seçimi | Hızlı Maç, Dereceli, Meydan Okuma, Etkinlik karoları |
| **Kadro** | Takım yönetimi | Kart ızgarası, formasyon görünümü, kimya gösterimi |
| **Mağaza** | Mağaza ve paketler | Paket karuseli, günlük fırsatlar, elmas mağazası |
| **Sıralama** | Rekabet merkezi | Mevcut rütbe, sıralama tablosu, sezon ilerlemesi |
| **Ben** | Profil ve sosyal | İstatistikler, başarımlar, arkadaşlar, ayarlar |

**Tasarım Kuralları:**
- Aktif sekme dolgulu ikon + Project F Yeşili vurgusu kullanır
- Pasif sekmeler soluk beyazda çizgisel ikonlar kullanır
- Bildirim rozetleri: kırmızı nokta (sayı ≤ 9), kırmızı sayı rozeti (sayı > 9)
- Sekme çubuğu yüksekliği: 56dp, maçlar hariç her zaman görünür

### 3.5 Ekran Düzeni Şablonları

**Şablon A: Liste Görünümü (Kadro, Sıralama)**
```
┌──────────────────────────┐
│ ← Başlık        [🔍] [⚙] │
├──────────────────────────┤
│ [Filtre Çipleri]         │
├──────────────────────────┤
│ ┌──────────────────────┐ │
│ │ Kart Küçük Res │ Bilgi│ │
│ └──────────────────────┘ │
│ ┌──────────────────────┐ │
│ │ Kart Küçük Res │ Bilgi│ │
│ └──────────────────────┘ │
│           ...            │
├──────────────────────────┤
│ [Nav Çubuğu]             │
└──────────────────────────┘
```

**Şablon B: Kahraman Görünümü (Kart Detayı, Paket Açma)**
```
┌──────────────────────────┐
│ ← Geri           [Paylaş]│
├──────────────────────────┤
│                          │
│    ┌──────────────┐      │
│    │              │      │
│    │  KART SANATI │      │
│    │  (Kahraman)  │      │
│    │              │      │
│    └──────────────┘      │
│                          │
│  İsim ★★★★☆  Kademe: E  │
│  SLD: 78  DEF: 65  HIZ: 82│
├──────────────────────────┤
│ [Kuşan] [Birleştir][Takas]│
├──────────────────────────┤
│ [Nav Çubuğu]             │
└──────────────────────────┘
```

**Şablon C: Maç Arayüzü (Oyun İçi)**
```
┌──────────────────────────┐
│ Takım A  2 - 1  Takım B │
│ ⏱ 03:42     [Duraklat]  │
├──────────────────────────┤
│                          │
│       MAÇ GÖRÜNÜMÜ       │
│     (3D Oynanış)         │
│                          │
├──────────────────────────┤
│ [Joystick]    [A][B][C]  │
│             [Sprint][ÖY] │
└──────────────────────────┘
```

---

## 4. Kart Çerçeve Tasarımı

### 4.1 Tasarım Felsefesi

Kartlar temel koleksiyon öğeleridir — **değerli, ayırt edici ve toplamaktan keyif alınan** bir his vermeleri gerekir. Her nadirlik kademesi, metin okumadan anında değeri ileten görsel olarak yükselen bir çerçeve işleme sahiptir.

### 4.2 Kart Anatomisi

```
┌─────────────────────────┐
│ [Nadirlik Kenarlığı]     │
│ ┌─────────────────────┐ │
│ │                     │ │
│ │   KARAKTER SANATI   │ │
│ │   (Portre)          │ │
│ │                     │ │
│ └─────────────────────┘ │
│ ┌─────────────────────┐ │
│ │ İSİM      ★★★★☆    │ │
│ │ Mevki     Kademe    │ │
│ ├─────────────────────┤ │
│ │ SLD│DEF│HIZ│ŞUT│PAS │ │
│ │ 78 │ 65│ 82│ 75│ 70 │ │
│ ├─────────────────────┤ │
│ │ Özel Yetenek İkonu  │ │
│ │ Kimya: ⚗️ 3/5       │ │
│ └─────────────────────┘ │
│ [Nadirlik Kenarlığı]     │
└─────────────────────────┘
```

**Kart Boyutları:** 2:3 en-boy oranı (dikey yönlendirme, tam görünümde 300×450dp)
**Küçük Resim:** 1:1 kare kırpma, yüz + kademe rozeti gösterir (listelerde 64×64dp)

### 4.3 Nadirlik Kademesi Çerçeve İşlemeleri

| Kademe | Çerçeve Malzemesi | Animasyon | Ses | Kart Arkası |
|--------|-------------------|-----------|-----|-------------|
| **Normal** | Mat gri alüminyum | Yok (statik) | Hafif tık | Logo ile düz gri |
| **Nadir** | Fırçalanmış mavi çelik | Üzerine gelince hafif titreşim | Net çıtırtı | Amblem ile mavi gradyan |
| **Epik** | Cilalanmış mor krom | Yavaş dış ışıltı dönüşü | Harmonik çınlama | Mor nebula deseni |
| **Süper** | Sıvı altın alaşım | Kenarlarda enerji akışı | Güç dalgası tonu | Kabartma logolu altın folyo |
| **Efsane** | Holografik kırmızı kristal | Tam holografik parıltı + parçacık emisyonu | Epik orkestral vurgu | Animasyonlu alev deseni |

**Kademeye Göre Çerçeve Genişliği:**
- Normal: 3dp düz
- Nadir: 4dp iç eğimli
- Epik: 5dp ışıltı taşmasıyla (2dp taşma)
- Süper: 6dp enerji animasyonuyla
- Efsane: 8dp holografik + parçacık taşmasıyla

### 4.4 Kart Sanatı Stili

**Portre Kuralları:**
- Karakterler göğüsten yukarı 3/4 açıda gösterilir
- Mevkiyi yansıtan dinamik poz (GK: dalış, FW: şut vb.)
- Arka plan rengi/deseni nadirlik kademesiyle eşleşir
- Yüz ifadesi kart kişiliğiyle eşleşir (oluşturmada belirlenir)
- Takım renkleriyle forma net görünür

**Özel İşlemler:**
- **Nominasyon Kartları:** Animasyonlu parıltı kaplaması ([GDD-02, Bölüm 6](card-collection-system-tr.md))
- **Kimya Güçlendirilmiş:** Kimya > %75 olduğunda yeşil ışık aurası
- **Yeni Kart:** "YENİ" şerit rozeti (24 saat sonra otomatik kaldırılır)
- **Takas Durumu:** Köşede küçük takas ikonu (yeşil = takas edilebilir, gri = kilitli)

### 4.5 Paket Görsel Tasarımı

| Paket Türü | Görsel Tema | Açılış Animasyonu |
|-----------|-------------|-------------------|
| **Temel Paket** | Kahverengi kraft kağıdı ambalaj | Yırtarak aç, kartlar kayarak çıkar |
| **Premium Paket** | Kurdeleli metalik gümüş kutu | Kutu açılır, ışık huzmesi kartları ortaya çıkarır |
| **Temalı Paket** | Etkinlik temalı kap (ör. Dünya Kupası kupa şekli) | Tematik açılış (konfeti, havai fişek) |
| **Sezon Sonu Paketi** | MMR kademe amblemiyle altın sandık | Sandık açılır, kartlar kademe ışıltısıyla yükselir |
| **Nominasyon Paketi** | Dönen enerjiyle kristal küre | Küre kırılır, kart enerjiden şekillenir |

---

## 5. Stadyum ve Çevre Tasarımı

### 5.1 Stadyum Tasarım Felsefesi

Project F'te stadyumlar **sadece arka plan değil, karakterlerdir.** Her stadyumun oynanıştan dikkat dağıtmadan maç deneyimini zenginleştiren kişiliği, atmosferi ve görsel hikaye anlatımı vardır.

### 5.2 Stadyum Kademeleri

| Kademe | İsim | Kapasite Hissi | Açılma Koşulu | Görsel Kalite |
|--------|------|---------------|---------------|---------------|
| **1** | Sokak Sahası | 0 (açık alan) | Varsayılan | Temel çevre, tel örgü |
| **2** | Mahalle Sahası | ~500 | Bronz II | Küçük tribün, kulüp pankartları |
| **3** | İlçe Arena | ~5.000 | Gümüş III | Kapalı tribünler, LED skor tabelası |
| **4** | Şehir Stadyumu | ~25.000 | Altın III | Tam stadyum, tifo gösterileri, tüneller |
| **5** | Ulusal Arena | ~60.000 | Elmas I | Premium stadyum, piroteknik, yayın kameraları |
| **6** | Efsane Koloseum | ~100.000 | Sezon Şampiyonu | Yüzen öğeler, holografik ekranlarla fantazi stadyum |

### 5.3 Stadyum Görsel Bileşenleri

**Saha:**

| Öğe | Detay |
|-----|-------|
| **Çim** | Stilize (fotorealistik değil), çizgi-biçilmiş desen, hava durumuyla renk değişimi |
| **Çizgiler** | Temiz beyaz, mobil okunabilirlik için hafif kalın |
| **Kaleler** | Hafif sallanma animasyonuyla metalik ağ |
| **Orta Saha Dairesi** | Hafifçe gömülü Project F logosu |
| **Ceza Alanı** | Görsel sınır için hafif farklı çim tonu |

**Çevre:**

| Bileşen | Kademe 1-2 | Kademe 3-4 | Kademe 5-6 |
|---------|------------|------------|------------|
| **Seyirci** | Yok / seyrek 2D sprite | Animasyonlu 3D seyirci blokları | Tezahüratlı tam animasyonlu seyirci |
| **Tribünler** | Açık hava / basit oturma | Çatılı bölümler | Tam çatı, VIP locaları, basın alanı |
| **Aydınlatma** | Yalnızca doğal gün ışığı | Temel projektörler | Gelişmiş aydınlatma rigleri, spot ışıklar |
| **Manzara** | Ağaçlar, bina arka planı | Şehir silüeti | İkonik mimari, havai fişekler |
| **Efektler** | Yok | Tribünden duman | Piroteknik, konfeti, lazer gösterileri |

### 5.4 Saha Koşulları

| Koşul | Görsel İşleme | Oynanış Etkisi |
|-------|--------------|----------------|
| **Mükemmel** | Parlak yeşil, temiz çizgiler | Değiştirici yok |
| **Islak (Yağmur)** | Koyu yeşil, su birikintisi yansımaları, sıçrama parçacıkları | Hafif hız azalması görsel ipucu |
| **Karlı** | Beyaz kaplama, kar taneleri, nefes buharı | Azalmış tutuş görsel ipucu |
| **Çamurlu** | Kahverengi yamalar, krampon izleri birikir | Oyuncular giderek kirlenir |
| **Gece** | Karanlık atmosfer, projektör havuzları, oyuncu gölgeleri | Geliştirilmiş VFX görünürlüğü |

### 5.5 Stadyum Özelleştirme (Kozmetik)

| Öğe | Seçenekler | Kaynak |
|-----|-----------|--------|
| **Pankart/Tifo** | Takım logosu yükle, hazır tasarımlar seç | Kulüp oluşturma özelliği |
| **Saha Deseni** | 5 biçme deseni (çizgi, elmas, dama tahtası) | Sezon Kartı / Başarım |
| **Kale Ağı Rengi** | 6 renk (beyaz, mavi, kırmızı, altın, siyah, gökkuşağı) | Mağaza kozmetik |
| **Havai Fişek Stili** | Gol başına 4 stil | Rütbe ödülü |
| **Tribün Tezahüratı** | 3 ses teması (yerel, Avrupa, Güney Amerika) | Başarım kilidi |

> **P2W Kuralı:** Stadyum kozmetikleri sıfır oynanış etkisine sahiptir. Yalnızca görsel.

---

## 6. Animasyon Standartları

### 6.1 Animasyon Felsefesi

> **"Her animasyon oynanış netliğine, duygusal ifadeye veya gösteri sunmaya hizmet etmeli. Bunların hiçbirini yapmıyorsa, kes at."**

Project F'teki animasyonlar:
1. **Okunabilir** — Oyuncu niyeti animasyon başlangıç karelerinden net
2. **Çabuk** — Halsiz veya ağır his yok; girdiye duyarlı
3. **İfade Dolu** — Karakterler boşta bile kişilik sahibi
4. **Performanslı** — Hiçbir animasyon hedef cihazlarda kare düşüşüne neden olmamalı

### 6.2 Hareket Animasyonları

| Durum | Animasyon | Kareler | Notlar |
|-------|-----------|---------|--------|
| **Boşta** | Parmak ucunda zıplama, etrafına bakınma | Döngü 60k | Mevkiye özel varyantlar |
| **Yürüyüş** | Top kontrolüyle rahat yürüyüş | Döngü 24k | Menülerde ve maç öncesinde |
| **Koşu** | Hafif koşu, standart hareket | Döngü 18k | Varsayılan maç içi hareket |
| **Sprint** | Tam koşu, kol sallama, öne eğilme | Döngü 14k | Dayanıklılık tüketen |
| **Sprint + Top** | Hızda dribling | Döngü 16k | Top ayak kemiklerine bağlı |
| **Yorgun Koşu** | Ağır nefes, kamburlaşmış, yavaş kollar | Döngü 22k | Dayanıklılık < %20 |
| **Dönüş** | Hızlı pivot animasyonu | 8k geçiş | 8 yönlü sistem |

### 6.3 Futbol Aksiyon Animasyonları

| Aksiyon | Animasyon | Süre | Öncelik |
|---------|-----------|------|---------|
| **Kısa Pas** | Hızlı iç ayak vuruşu | 10k | Yüksek |
| **Uzun Pas** | Tam bacak salınımı, vücut eğilmesi | 16k | Yüksek |
| **Ara Pas** | Ağırlıklı iç ayak itmesi | 14k | Yüksek |
| **Şut** | Devamıyla güçlü vuruş | 18k | Kritik |
| **Vole** | Havadan vuruş | 20k | Kritik |
| **Kafa Vuruşu** | Zıplama + kafa teması | 22k | Kritik |
| **Müdahale** | Kayarak veya ayakta müdahale | 16k | Yüksek |
| **Blok** | Kollar yukarı duruş | 8k | Orta |
| **Kaleci Kurtarış** | Sol/sağ/yukarı/aşağı dalış | 24k | Kritik |
| **Kaleci Yumruk** | Ortalardan yumrukla uzaklaştırma | 18k | Yüksek |
| **Kontrol/Alış** | Göğüs/ayak top kontrolü | 12k | Orta |

### 6.4 Özel Yetenek Animasyonları

GGO Football animesinden ilham alınmıştır ([GDD-02, Bölüm 5](card-collection-system-tr.md)):

| Yetenek Kademesi | Animasyon Stili | Süre | Kamera |
|-----------------|----------------|------|--------|
| **Kademe 1 (Yaygın)** | Temel hareketin geliştirilmiş versiyonu + parıltı efekti | 1.0sn | Normal |
| **Kademe 2 (Nadir)** | Benzersiz animasyon + elemental VFX | 1.5sn | Hafif yakınlaştırma |
| **Kademe 3 (Epik)** | Sinematik animasyon + tam ekran VFX | 2.0sn | Dinamik sahne kamerası |

**Örnek Özel Yetenek Animasyonları:**

| Yetenek | Animasyon Açıklaması |
|---------|---------------------|
| **Kükremeli Alev Vuruşu** | Oyuncunun ayağı tutuşur, ateş izi topu takip eder, çarpışmada patlama |
| **Vakum Sıfır Şutu** | Oyuncu etrafında hava bozulması, top sıkışır sonra sonik patlamayla fırlar |
| **Samba Muz Vuruşu** | Ritmik dans adımları, top gökkuşağı iziyle kıvrılır |
| **Lav Bloğu** | Defans oyuncu yere basar, magma duvarı kısa süreliğine yükselir |
| **Flaş Adım** | Oyuncu hız çizgilerine dönüşür, savunmacının ötesinde yeniden belirir |

### 6.5 Gol Kutlama Animasyonları

> Goley'in 1 numaralı hatırlanan özelliği: gol yemenin bile eğlenceli olduğu kadar iyi kutlamalar. Bunu eşleştirmeli ve aşmalıyız.

**Kutlama Sistemi:**

| Tür | Tetikleyici | Süre | Kamera |
|-----|------------|------|--------|
| **Varsayılan** | Herhangi bir gol | 3sn | Oyuncuyu takip |
| **Özel Şablon** | Oyuncu açılmış setten seçer | 4sn | Sinematik açı |
| **Takım Kutlaması** | Tüm takım arkadaşları katılır | 5sn | Geniş sinematik |
| **Kilometre Taşı** | Hat-trick, son saniye golü | 6sn | Çoklu açı tekrar |

**Kutlama Kütüphanesi (Lansmanda 60+):**

| Kategori | Örnekler | Sayı |
|----------|----------|------|
| **Klasik** | Diz kayması, kollar açık, yumruk sallama | 10 |
| **Dans** | Moonwalk, robot, breakdance, salsa | 12 |
| **Teatral** | Pelerin açma, maske takma, telefon çağrısı | 10 |
| **Kültürel** | Haka, capoeira, dabke, bhangra | 8 |
| **Komik** | Baş dönmesi, kayıp düşme, şaşkın bakış | 10 |
| **Takım** | Koreografili grup dansları, insan piramidi | 10 |

**Kilit Açma Kaynakları (%100 Kozmetik):**
- 15 varsayılan kutlama herkes için ücretsiz
- 20 Sezon Kartı ilerlemesiyle
- 15 başarım/rütbe ödülleriyle
- 10 kozmetik mağazasından (Elmaslarla)

### 6.6 Arayüz ve Menü Animasyonları

| Öğe | Animasyon | Süre | Yumuşama |
|-----|-----------|------|----------|
| **Ekran Geçişi** | Sola/sağa kayma + solma | 300ms | Çıkış kübik |
| **Kart Çevirme** | Y ekseninde 3D çevirme | 400ms | Giriş-çıkış |
| **Düğme Basma** | %95'e küçültme + hafif kararma | 100ms | Doğrusal |
| **Modal Açma** | Alttan yukarı kayma + arka plan solma | 350ms | Yay |
| **Bildirim** | Üstten aşağı kayma + zıplama | 500ms | Yay |
| **İlerleme Çubuğu** | Parıltılı düzgün dolgu | Değişken | Çıkış |
| **Yıldız Ödülü** | Patlama girişi + parıltı | 600ms | Yay + aşma |
| **Paket Açma** | Tam ekran sinematik sekans | 3-8sn | Koreografili |

---

## 7. Görsel Efektler (VFX)

### 7.1 VFX Bütçe Felsefesi

> **Kural:** Her VFX'in mobil performans bütçesi vardır. Görkemli efektler kare düşüşüne neden oluyorsa hiçbir anlam ifade etmez.

| VFX Kategorisi | Maks Parçacık | Maks Draw Call | Maks Doku Boyutu |
|---------------|--------------|----------------|-----------------|
| **Ortam** (yağmur, toz) | 200 | 2 | 256×256 |
| **Aksiyon** (paslar, şutlar) | 50 | 1 | 128×128 |
| **Özel Yetenek** | 300 | 4 | 512×512 |
| **Gol Kutlaması** | 500 | 4 | 512×512 |
| **Arayüz Efektleri** | 100 | 2 | 256×256 |

### 7.2 Maç İçi VFX

| Efekt | Açıklama | Tetikleyici |
|-------|----------|-------------|
| **Top İzi** | Hareketli topun arkasında hafif beyaz çizgi | Her zaman açık |
| **Güçlü Şut İzi** | Şut gücüne eşleşen kalın enerji izi | Şut gücü > %70 |
| **Kıvrım İzi** | Kıvrılan şutlar/paslar için görünür yay yolu | Kıvrım tekniği aktif |
| **Çarpma Patlaması** | Top-oyuncu temasında küçük patlama | Her temas |
| **Ağ Dalgalanması** | Kale ağı deformasyonu + dalgalanma VFX | Gol atıldığında |
| **Kayma Tozu** | Kir/çim parçacık sıçraması | Kayarak müdahale |
| **Sprint Çizgileri** | Sprint yapan oyuncunun arkasında hız çizgileri | Sprint aktif |
| **Dayanıklılık Uyarısı** | Ter damlaları, ağır nefes pufları | Dayanıklılık < %30 |
| **Yağmur Sıçramaları** | Top sıçraması/oyuncu adımlarında küçük sıçrama | Yağmurlu hava |
| **Kar Pufları** | Küçük kar yerinden etme | Karlı hava |

### 7.3 Özel Yetenek VFX

**Element Sistemi:** Her özel yetenek tutarlı VFX diliyle bir elemental kategoriye aittir:

| Element | Renk | Parçacık Şekli | Örnek Yetenek |
|---------|------|---------------|---------------|
| **Ateş** | Turuncu-Kırmızı | Alev wisps, korlar | Kükremeli Alev Vuruşu |
| **Buz** | Cam Göbeği-Mavi | Kristal kırıkları, don | Buzul Blok |
| **Şimşek** | Sarı-Beyaz | Elektrik arkları, kıvılcımlar | Gök Gürültüsü Şutu |
| **Rüzgar** | Yeşil-Turkuaz | Dönen yapraklar, hava akımları | Siklon Dribling |
| **Gölge** | Mor-Koyu | Karanlık sis, artçı görüntüler | Hayalet Pas |

**Yetenek Kademesine Göre VFX Yükselmesi:**

| Kademe | Ekran Kapsamı | Süre | Ek |
|--------|--------------|------|-----|
| **Kademe 1** | Yerel (oyuncu çevresi) | 0.5sn | Parıltı + 20 parçacık |
| **Kademe 2** | Yol (oyuncu → hedef) | 1.0sn | İz + 100 parçacık + ekran kenarı parıltısı |
| **Kademe 3** | Tam ekran | 1.5sn | Sinematik + 300 parçacık + ekran sallama + flaş |

### 7.4 Gol VFX

| Gol Türü | VFX İşleme |
|----------|-----------|
| **Normal Gol** | Ağ dalgalanması + küçük konfeti patlaması |
| **Güçlü Gol** | Ağ patlama efekti + kamera sarsıntısı + şok dalgası |
| **Özel Yetenek Golü** | Element temalı patlama + ağır çekim tekrar + tribün kükremesi VFX |
| **Son Saniye Golü** | Tam stadyum flaşı + havai fişek + dramatik yakınlaştırma |
| **Hat-Trick Golü** | Üçlü taç VFX + altın konfeti + spot ışık |

### 7.5 Arayüz VFX

| Efekt | Kullanım |
|-------|----------|
| **Kart Parıltısı** | Nadirliğe göre kart kenarlıklarında animasyonlu parıltı |
| **Holografik** | Süper/Efsane kartlarda holografik parıltı |
| **Parıltı İzi** | Paket açma sırasında fare/dokunma takibi |
| **Patlama** | Ödül açılışı, rütbe yükselme, başarım açılışı |
| **Konfeti** | Sezon sonu ödülleri, efsanevi kart açılışı |
| **Enerji Girdabı** | Kart birleştirme sırasında |
| **Seviye Atlama Huzmesi** | Seviye/rütbe yükselmede dikey ışık huzmesi |

---

## 8. Aydınlatma ve Atmosfer

### 8.1 Günün Saati Sistemi

| Zaman | Gökyüzü Rengi | Işık Yönü | Işık Sıcaklığı | Ruh Hali |
|-------|-------------|-----------|---------------|----------|
| **Sabah** | Yumuşak mavi-turuncu gradyan | Düşük doğu (15°) | 5500K sıcak | Taze, enerjik |
| **Öğle** | Parlak mavi, beyaz bulutlar | Baş üstü (75°) | 6500K nötr | Yoğun, rekabetçi |
| **Altın Saat** | Turuncu-pembe gradyan | Düşük batı (20°) | 4000K sıcak | Dramatik, sinematik |
| **Akşam** | Derin mavi-mor | Yapay (projektörler) | 5000K karışık | Elektrikli, atmosferik |
| **Gece** | Koyu lacivert, yıldız alanı | Tam yapay | 4500K sıcak noktalar | Dramatik, premium |

### 8.2 Hava Durumu Aydınlatma Değiştiricileri

| Hava | Işık Değiştirici | Ek |
|------|-----------------|-----|
| **Açık** | Yukarıdaki gibi temel aydınlatma | Güneş gölgeleri, lens parlaması |
| **Bulutlu** | -%20 yoğunluk, dağınık gölgeler | Yumuşak ortam oklüzyon |
| **Yağmur** | -%30 yoğunluk, ıslak yansımalar | Su birikintilerinde speküler vurgular |
| **Kar** | +%10 yoğunluk (yansıma), mavi ton | Kar parçacık sisi |
| **Sis** | -%40 yoğunluk, kısa görüş mesafesi | Hacimsel sis düzlemleri |

### 8.3 Stadyum Aydınlatma Rigleri

| Stadyum Kademesi | Aydınlatma Düzeni |
|-----------------|-------------------|
| **Kademe 1-2** | Tek yönlü ışık (güneş) + temel ortam |
| **Kademe 3** | Güneş + 4 projektör nokta ışığı |
| **Kademe 4** | Güneş + 8 projektör + spot efektleri |
| **Kademe 5-6** | Dinamik aydınlatma rigi: 12+ ışık, spot takip, LED tabela emisyon |

### 8.4 Ruh Hali Şablonları

| Şablon | Ne Zaman Kullanılır | His |
|--------|-------------------|-----|
| **Dostane** | Gündelik/Hızlı Maç | Parlak, neşeli, doygun |
| **Rekabetçi** | Dereceli Maç | Hafif desatüre, keskin gölgeler |
| **Dramatik** | Turnuva Finalleri, Son dakika golü | Yüksek kontrast, dramatik gölgeler, vinyet |
| **Kutlamacı** | Galibiyet ekranı, Rütbe Yükselme | Altın ışık, sıcak tonlar, lens parlamaları |
| **Gergin** | Uzatma, Penaltı Atışları | Kırmızı vurgularla desatüre, sıkı aydınlatma |

---

## 9. Teknik Sanat Standartları

### 9.1 Performans Hedefleri

| Özellik | Hedef Cihaz | Gereksinim |
|---------|------------|------------|
| **Min** | 3GB RAM, Snapdragon 4-serisi (2022) | 30 FPS, Düşük ayarlar |
| **Orta** | 4GB RAM, Snapdragon 6-serisi (2023) | 60 FPS, Orta ayarlar |
| **Yüksek** | 6GB RAM, Snapdragon 8-serisi (2024) | 60 FPS, Yüksek ayarlar |
| **iOS Min** | iPhone 8 / A11 Bionic | 30 FPS, Orta ayarlar |
| **iOS Yüksek** | iPhone 13+ / A15+ | 60 FPS, Yüksek ayarlar |

### 9.2 Varlık Bütçeleri

**Karakter Modelleri:**

| Kalite | Poligon | Doku | Kemik | LOD |
|--------|---------|------|-------|-----|
| **Düşük** | 1.500 üçgen | 512×512 | 30 | Yalnızca LOD0 |
| **Orta** | 3.000 üçgen | 1024×1024 | 45 | LOD0 + LOD1 |
| **Yüksek** | 5.000 üçgen | 2048×2048 | 60 | LOD0 + LOD1 + LOD2 |

**Stadyum Modelleri:**

| Kalite | Poligon | Dokular | Draw Call |
|--------|---------|---------|-----------|
| **Düşük** | Toplam 30K üçgen | 4× 512×512 atlas | ≤ 25 |
| **Orta** | Toplam 60K üçgen | 4× 1024×1024 atlas | ≤ 40 |
| **Yüksek** | Toplam 100K üçgen | 4× 2048×2048 atlas | ≤ 60 |

**Kare Başına Bütçe:**

| Bileşen | Düşük | Orta | Yüksek |
|---------|-------|------|--------|
| **Karakterler (12)** | 18K üçgen | 36K üçgen | 60K üçgen |
| **Top** | 200 üçgen | 500 üçgen | 1K üçgen |
| **Stadyum** | 30K üçgen | 60K üçgen | 100K üçgen |
| **VFX** | 5K üçgen | 10K üçgen | 20K üçgen |
| **Arayüz Katmanı** | 2K üçgen | 2K üçgen | 2K üçgen |
| **TOPLAM** | ~55K üçgen | ~109K üçgen | ~183K üçgen |

### 9.3 Doku Standartları

| Tür | Format | Sıkıştırma |
|-----|--------|-----------|
| **Diffuse/Albedo** | PNG → ASTC 4×4 (mobil) | Kayıplı kabul |
| **Normal Harita** | PNG → ASTC 6×6 | Kalite öncelikli |
| **Arayüz Öğeleri** | PNG (alfa ile) → ASTC 4×4 | Kayıpsız alfa |
| **İkonlar** | SVG → DPI başına rasterize | Vektör kaynak |
| **Kart Sanatı** | PNG → ASTC 4×4 | Kalite öncelikli |
| **VFX Sprite** | PNG sprite sayfası → ASTC 4×4 | Kayıplı kabul |

### 9.4 Shader Kuralları

| Shader Türü | Karmaşıklık | Kullanım |
|------------|-----------|----------|
| **Karakter Shader** | Orta | Kenar ışıklı toon-lit, 2 bantlı cel shading |
| **Saha Shader** | Düşük | Çizgi desenli karo çim, ıslak değiştirici |
| **Gökyüzü Shader** | Düşük | Gradyan + prosedürel bulutlar |
| **Kart Çerçeve Shader** | Orta-Yüksek | Metalik + holografik + animasyonlu (yalnızca arayüz) |
| **VFX Shader** | Düşük-Orta | Eklemeli/alfa blend parçacıklar |
| **Arayüz Shader** | Düşük | Standart sprite + çözülme/parıltı efektleri |

**Shader Kuralları:**
- Shader geçişi başına maks 4 doku örnekleme
- Gerçek zamanlı yansıma yok (cubemap/prob kullanın)
- 2 bantlı cel-shading (ışık/gölge) + isteğe bağlı kenar
- Düşük kalitede tam ekran post-processing'den kaçın

### 9.5 Kalite Ayarları Dağılımı

| Özellik | Düşük | Orta | Yüksek |
|---------|-------|------|--------|
| **Karakter LOD** | Yalnızca LOD0 | LOD0 + LOD1 | Tam LOD zinciri |
| **Gölge Kalitesi** | Gölge yok | Damla gölgeler | Yumuşak gerçek zamanlı gölgeler |
| **VFX Yoğunluğu** | %50 parçacık sayısı | %75 | %100 |
| **Seyirci** | 2D sprite | Düşük poligon 3D | Animasyonlu 3D |
| **Post-Processing** | Yok | Sadece bloom | Bloom + vinyet + renk düzeltme |
| **Kenar Yumuşatma** | Yok | FXAA | MSAA 2× |
| **Kumaş Simülasyonu** | Statik forma | Sadeleştirilmiş | Tam dinamik |
| **Hava Efektleri** | Minimal | Standart | Tam (su birikintileri, kar birikimi) |

### 9.6 Uygulama Boyut Bütçesi

| Bileşen | Hedef Boyut |
|---------|-------------|
| **İlk İndirme** | ≤ 150 MB |
| **Tam Kurulum** | ≤ 800 MB |
| **Stadyum Başına Paket** | ~15-25 MB (talep üzerine indirilen) |
| **Sezonluk İçerik** | Sezon güncellemesi başına ~50 MB |

**Boyut Optimizasyon Stratejileri:**
- Kademe 1-2 ötesindeki stadyumlar için talep üzerine varlık indirme
- Tüm oyuncu karakterleri arasında paylaşılan iskelet/animasyon rigi
- Arayüz ve kart öğeleri için doku atlası
- Kalite kademeli ses sıkıştırma

---

## 10. Referans Panosu

### 10.1 Karakter ve Sanat Stili Referansları

| Referans | URL | İlgi |
|----------|-----|------|
| Goley Ekran Görüntüsü Galerisi | [oyunkayit.com/goley.html](https://oyunkayit.com/goley.html) | Birincil chibi futbol referansı |
| Goley Blog (Joygame) | [joygame.com/goley/blog](https://www.joygame.com/goley/blog/) | Resmi Goley görsel varlıkları |
| Goley Ekran Görüntüleri (Gezginler) | [gezginler.net](https://www.gezginler.net/oyunlar/ekran-goruntuleri/goley.html) | Ek Goley görsel referans |
| Oyunlarda Chibi Sanatı (Medium) | [medium.com — Sevimli Devrim](https://medium.com/@purplebubblestudio/the-adorable-revolution-chibi-art-styles-in-video-games-777bb93d0a1a) | Oyunlar için chibi sanat stili analizi |
| 3D Chibi Karakter Paketi | [sketchfab.com — HoaTo](https://sketchfab.com/3d-models/3d-chibi-character-pack-for-mobile-games-7709dd940dc7451a82e8f33af854b565) | 3D chibi karakter oran referansı |
| Chibi Karakter Rehberi | [clipstudio.net — Chibi Rehberi](https://www.clipstudio.net/how-to-draw/archives/155423) | Chibi oran ve ifade teknikleri |
| Chibi Stilize Kız (Sketchfab) | [sketchfab.com — GoE](https://sketchfab.com/3d-models/chibi-stylized-girl-character-rig-game-ready-a916574bb7004449ae60d430e0b6892e) | Riglenmiş chibi karakter referansı |

### 10.2 Arayüz ve Kart Tasarımı Referansları

| Referans | URL | İlgi |
|----------|-----|------|
| Futbol Arayüzü (Dribbble) | [dribbble.com/tags/football-ui](https://dribbble.com/tags/football-ui) | Futbol uygulaması arayüz ilhamı |
| Futbol Arayüzü (Behance) | [behance.net — Football UI](https://www.behance.net/search/projects/football%20ui) | Profesyonel futbol arayüz projeleri |
| Oyun Arayüz Veritabanı | [gameuidatabase.com](https://www.gameuidatabase.com/) | 55.000+ oyun arayüz ekran görüntüsü |
| Spor Uygulaması Arayüz Rehberi | [togwe.com — Spor Arayüz](https://www.togwe.com/blog/sports-app-ui-design/) | Spor uygulaması arayüz en iyi uygulamaları |
| FUT Kart Evrimi | [futgraphics.com](https://futgraphics.com/articles/the-evolution-of-fut-cards-a-visual-history-from-fifa-09-to-ea-fc-24) | Kart çerçeve tasarım evrimi referansı |
| TCG Çerçeveleri (Pinterest) | [pinterest.com — TCG Çerçeveleri](https://www.pinterest.com/studiomagicfox/tcg-frames-elements/) | Koleksiyon kart çerçeve tasarım kalıpları |
| Gacha Tasarımı (Dribbble) | [dribbble.com/tags/gacha](https://dribbble.com/tags/gacha) | Gacha kart tasarım ilhamı |
| Mobil Arayüz En İyi Uygulamalar 2026 | [uidesignz.com](https://uidesignz.com/blogs/mobile-ui-design-best-practices) | Güncel mobil arayüz trendleri |
| Mobil Oyun Arayüz Örnekleri | [pixune.com — Mobil Oyun Arayüz](https://pixune.com/blog/best-examples-mobile-game-ui-design/) | Sınıfının en iyisi mobil oyun arayüz |

### 10.3 Stadyum ve Çevre Referansları

| Referans | URL | İlgi |
|----------|-----|------|
| Stilize Futbol Stadyumu | [sketchfab.com — TankStorm](https://sketchfab.com/3d-models/stylized-football-character-plus-stadium-bba5a86f64b74eeea23f3c23cd94e473) | Stilize 3D stadyum referansı |
| Karikatür Stadyum | [sketchfab.com — Blooming](https://sketchfab.com/3d-models/cartoony-football-stadium-d5f86cece43c49ea8ed94890c32cd317) | Karikatür stadyum sanat stili |
| Stadyum Koleksiyonu (Sketchfab) | [sketchfab.com — StudioLab](https://sketchfab.com/studiolab.dev/collections/stadiums-and-arenas-a68d9a95b615427189f50c51ee4fc9ff) | Stadyum çeşitliliği referansı |

### 10.4 Animasyon ve VFX Referansları

| Referans | URL | İlgi |
|----------|-----|------|
| GGO Football (Wikipedia) | [en.wikipedia.org — AI Football GGO](https://en.wikipedia.org/wiki/AI_Football_GGO) | Özel yetenek animasyon ilhamı |
| GGO Football (IMDB) | [imdb.com — GGO Football](https://www.imdb.com/title/tt12571272/) | GGO animasyon stili genel bakış |
| Oyun VFX Rehberi | [pixune.com — VFX Rehberi](https://pixune.com/blog/visual-effects-in-games/) | Oyunlar için VFX en iyi uygulamaları |
| Kapsamlı VFX Rehberi | [pixune.com — Kapsamlı VFX](https://pixune.com/blog/the-ultimate-guide-to-game-vfx/) | Kapsamlı VFX üretim rehberi |
| Mobil VFX Tartışması | [realtimevfx.com — Mobil](https://realtimevfx.com/t/mobile-games-vfx/2567) | Mobil özel VFX optimizasyonu |

---

## 11. P2W ve Sürdürülebilirlik Değerlendirmesi

### 11.1 Sanat ve Görsel P2W Risk Değerlendirmesi

| Görsel Öğe | P2W Riski | Azaltma |
|-----------|----------|---------|
| **Kart Çerçeve Nadirliği** | Düşük | Kademeye göre görsel hiyerarşi standart ve beklenir. Görsellerden oynanış avantajı yok. |
| **Özel Yetenek VFX** | Orta | Yüksek kademeli yetenekler daha gösterişli VFX'e sahip — "havalı için öde" algısı yaratabilir. Kademe 1 yeteneklerin rekabetçi olarak geçerli ve görsel olarak tatmin edici olmasıyla azaltılmış. |
| **Stadyum Kademeleri** | Düşük | Rütbe ilerlemesine bağlı, satın almalara değil. Yüksek stadyumlar kazanılır, satın alınmaz. |
| **Kutlamalar** | Hiç | %100 kozmetik. 15 ücretsiz varsayılan, her oyuncunun eğlenceli kutlamalara sahip olmasını garanti eder. |
| **Krampon/İz Kaplamaları** | Hiç | Saf kozmetik. Stat ilişkisi yok. |
| **Forma Tasarımı** | Hiç | Takım özelleştirmesi tüm oyuncular için ücretsiz. |

### 11.2 Kozmetik Monetizasyon Sürdürülebilirliği

| Metrik | Değerlendirme |
|--------|-------------|
| **Kozmetik Derinliği** | 9/10 — 9 kozmetik kategorisi (kramponlar, kutlamalar, gol efektleri, izler, pankartlar, saha desenleri, ağ renkleri, havai fişekler, tezahüratlar) derin kişiselleştirme sağlar |
| **Kazan vs. Satın Al Dengesi** | 8/10 — Kozmetiklerin ~%60'ı oynanışla kazanılabilir, ~%40'ı premium |
| **FOMO Yönetimi** | 7/10 — Sezonluk kozmetikler 2 sezon sonra geri döner. Kalıcı münhasırlık baskısı yok. |
| **Kültürel Duyarlılık** | 9/10 — Çeşitli kutlama seçenekleri (bhangra, capoeira, haka, dabke) küresel futbol kültürünü kutlar |
| **Kimlik Sahipliği** | 9/10 — Özel kart isimleri + yüz şablonları + forma tasarımı güçlü kişisel bağlılık yaratır |

### 11.3 Görsel Netlik ve Adil Oyun

| Endişe | Çözümümüz |
|--------|-----------|
| **VFX'in oynanışı gizlemesi** | Tüm oynanış açısından kritik VFX kısa (< 2sn). Ayarlarda VFX yoğunluğunu azaltma seçeneği. |
| **Gösterişli yeteneklerin rakiplerin dikkatini dağıtması** | VFX her iki oyuncu için de istemci tarafında aynı şekilde render edilir. Görsel avantaj yok. |
| **Gözdağı için ödeme** | Ücretli kozmetikleri kazanılanlardan ayıran görsel ipucu yok. "Balina rozeti" yok. |
| **Bilgi asimetrisi** | Tüm kart istatistikleri maç öncesi lobide rakiplere görünür. Görsellerden gizli bilgi yok. |

### 11.4 Sürdürülebilirlik Skor Kartı

| Kategori | Puan | Gerekçe |
|----------|------|---------|
| **Görsel Kimlik Ömrü** | 9/10 | Chibi stili zamansız ve ölçeklenebilir. Goley tam olarak görsel kimliği nedeniyle 8+ yıl sonra hala sevgiyle anılıyor. |
| **İçerik Pipeline Ölçeklenebilirliği** | 8/10 | Paylaşılan iskelet + modüler forma sistemi, yeni içerik = mevcut riglerde yeni dokular/meshler demektir. Hızlı üretim. |
| **Kozmetik Gelir Potansiyeli** | 9/10 | 9 kozmetik kategorisi × sezonluk rotasyon = sonsuz P2W olmayan gelir akışı. |
| **Performans Erişilebilirliği** | 8/10 | 3 kademeli kalite ayarları 2022 orta segment cihazların bile oynayabilmesini sağlar. Görsellerden dolayı dışlanan oyuncu yok. |
| **Sanat Stili Farklılaşması** | 9/10 | Hiçbir doğrudan rakip chibi futbol kullanmıyor. Bu bizim marka kalemiz. |
| **Genel Sanat Sürdürülebilirliği** | **8.6/10** | 5+ yıllık canlı hizmet oyunu için güçlü görsel temel. |

### 11.5 Goley'in Doğru Yaptıkları (Koru)

| Görsel Öğe | Neden İşe Yaradı |
|-----------|------------------|
| **Chibi karakterler** | Anında sevilen, akılda kalan, paylaşılabilir — oyuncular duygusal bağlar kurdu |
| **Gol kutlamaları** | Viral anlar yarattı; kaybetmek bile eğlenceliydi |
| **Burunsuz yüzler** | İkonik hale gelen ayırt edici tasarım seçimi |
| **Renkli, enerjik palet** | Eğlenceli, erişilebilir oynanış tonuyla eşleşti |

### 11.6 Goley'in Yanlış Yaptıkları (Kaçın)

| Görsel Öğe | Sorun | Çözümümüz |
|-----------|-------|-----------|
| **Eskimiş dokular** | Düşük çözünürlüklü dokular kötü yaşlandı | LOD sistemiyle PBR materyaller |
| **Sıradan çevreler** | Stadyumlar genel ve statik hissetti | Hava/zaman sistemleriyle 6 kademeli stadyum ilerlemesi |
| **Sınırlı özelleştirme** | Oyuncular kimliklerini ifade edemedi | 100+ yüz şablonu, forma oluşturucu, 9 kozmetik kategorisi |
| **Görsel ilerleme yok** | Stadyumlar/görseller oyuncu büyümesini yansıtmadı | Rütbeye bağlı stadyum kademeleri, gelişen görsel ödüller |

---

## Ek A: Sanat Üretim Pipeline'ı

### A.1 Karakter Oluşturma İş Akışı

```
1. Konsept Sanat (2D çizim, 3 poz)
   ↓
2. 3D Modelleme (temel mesh → heykeltraşlık → retopoloji)
   ↓
3. UV Haritalama + Dokulama (PBR: diffuse, normal, pürüzlülük)
   ↓
4. Rigleme (paylaşılan iskelet, 30-60 kemik)
   ↓
5. Animasyon (hareket kütüphanesi + mevkiye özel setler)
   ↓
6. LOD Üretimi (otomatik + manuel temizlik)
   ↓
7. Entegrasyon (motor aktarımı, shader ataması, fizik kurulumu)
   ↓
8. QA (3 cihaz kademesinde görsel inceleme + performans profilleme)
```

### A.2 Kart Sanatı Pipeline'ı

```
1. Karakter poz seçimi (mevki arketipine göre)
   ↓
2. Motor içi portre render (nadirliğe özel aydınlatma)
   ↓
3. Post-processing (kademe renk düzeltmesi)
   ↓
4. Çerçeve bileşimi (nadirlik kademesine göre otomatik)
   ↓
5. Stat kaplaması oluşturma (veriden otomatik)
   ↓
6. Animasyon katmanlama (Epik+ için parıltı, holografik, parçacıklar)
   ↓
7. Küçük resim oluşturma (64×64 otomatik kırpma)
```

### A.3 Stadyum Oluşturma İş Akışı

```
1. Konsept Sanat (2D düzen + ruh hali panosu)
   ↓
2. Blokout (motorda gri kutu)
   ↓
3. Saha modelleme (paylaşılan şablon + kademeye özel çevre)
   ↓
4. Çevre sanatı (tribünler, manzara, seyirci alanları)
   ↓
5. Aydınlatma kurulumu (günün saati + hava şablonları başına)
   ↓
6. LOD + Optimizasyon (draw call bütçesi doğrulama)
   ↓
7. Varlık akış kurulumu (Kademe 3+ için talep üzerine indirme)
   ↓
8. QA (tüm hava × zaman kombinasyonları × 3 kalite ayarı)
```

---

## Ek B: Varlık Adlandırma Kuralları

| Varlık Türü | Desen | Örnek |
|-------------|-------|-------|
| **Karakter Modeli** | `chr_{mevki}_{varyant}_lod{n}` | `chr_fw_male01_lod0` |
| **Karakter Dokusu** | `chr_{mevki}_{varyant}_{harita}` | `chr_fw_male01_diffuse` |
| **Forma Dokusu** | `kit_{takim}_{varyant}` | `kit_kirmiziaslanlari_ic` |
| **Stadyum Modeli** | `std_kademe{n}_{isim}` | `std_kademe3_ilce_arena` |
| **Stadyum Dokusu** | `std_kademe{n}_{isim}_{harita}` | `std_kademe3_ilce_arena_diffuse` |
| **VFX Prefab** | `vfx_{kategori}_{isim}` | `vfx_yetenek_alev_vurusu` |
| **Arayüz İkonu** | `ico_{kategori}_{isim}_{durum}` | `ico_nav_kadro_aktif` |
| **Kart Çerçevesi** | `kart_cerceve_{kademe}_{durum}` | `kart_cerceve_epik_bosta` |
| **Animasyon Klibi** | `anim_{kategori}_{isim}` | `anim_kutlama_moonwalk` |
| **Ses** | `sfx_{kategori}_{isim}` | `sfx_gol_tribun_kukremesi` |

---

*Bu doküman Project F'in tam görsel kimliğini tanımlar. Her sanat varlığı, animasyon ve VFX bu standartlara uymalıdır. Sapmalar, belgelenmiş gerekçeyle Oyun Tasarımcısı onayı gerektirir.*

*Sonraki Doküman: [GDD-06: Arayüz/Kullanıcı Deneyimi Tasarımı](ui-ux-design-tr.md)*
