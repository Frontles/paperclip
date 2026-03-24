# Project F — Oyun Ekonomisi & Monetizasyon Tasarım Dokümanı

**Doküman Kodu:** GDD-03
**Versiyon:** 1.0
**Tarih:** 17 Mart 2026
**Yazar:** Game Designer Agent, YG Games
**Durum:** Taslak
**Dayanak:** [GDD-00 Rakip Analizi](docs/00-competitor-analysis-en.md) | [GDD-01 Temel Oyun Tasarımı](core-game-design-tr.md) | [GDD-02 Kart & Koleksiyon Sistemi](card-collection-system-tr.md)

---

## İçindekiler

1. [P2W Denge Çerçevesi](#1-p2w-denge-çerçevesi)
2. [Para Birimi Sistemi](#2-para-birimi-sistemi)
3. [Sezon Sıfırlama Mekanizması](#3-sezon-sıfırlama-mekanizması)
4. [Paket Sistemi](#4-paket-sistemi)
5. [Takas & Kiralama Sistemi](#5-takas--kiralama-sistemi)
6. [Monetizasyon Kanalları](#6-monetizasyon-kanalları)
7. [Sürdürülebilirlik & Ekonomik Döngü Analizi](#7-sürdürülebilirlik--ekonomik-döngü-analizi)

---

## 1. P2W Denge Çerçevesi

### 1.1 Temel Kural

> **Harcama ilerlemeyi hızlandırır. Yetenek sonuçları belirler. Hiçbir para miktarı yenilmez bir takım satın alamaz.**

Bu bir öneri değil — Project F'in tüm ekonomisi için tartışılmaz tasarım yasasıdır. Her mekanik, fiyat noktası ve ödül yapısı uygulamadan önce bu kurala karşı test edilmelidir.

### 1.2 P2W Spektrumunda Konumlandırma

Rakip Analizi'ne (GDD-00 §10.1) dayalı:

```
[Yok] ━━━━ [Hafif] ━━━━ [Orta] ━━━━ [Ağır] ━━━━ [Ölümcül]
  FM          DLS        eFootball     FC Mobile    Goley
              ▲━━━━━━━━━━━▲
              PROJECT F HEDEF BÖLGESİ
              (Yetenek:Cüzdan = 70:30)
```

**Referans:** [2026 Monetizasyon en iyi uygulamaları](https://adapty.io/blog/mobile-game-monetization/) | [Mobil oyun monetizasyon modelleri](https://studiokrew.com/blog/mobile-game-monetization-models-2026/)

### 1.3 "%70:30" Pratikte Ne Anlama Gelir

| Senaryo | Sonuç |
|---------|-------|
| **Yetenekli F2P vs. Yeteneksiz balina** | F2P zamanın ~%70'inde kazanır |
| **Eşit yetenek, F2P vs. balina** | Balina zamanın ~%60'ında kazanır (küçük stat avantajı) |
| **Yetenekli F2P vs. Yetenekli balina** | Balina zamanın ~%55'inde kazanır (stat avantajı gerçek ama belirleyici değil) |
| **Herhangi F2P vs. eşleştirmedeki herhangi rakip** | Takım gücü + MMR eşleştirmesi, gerçek deneyim ~50:50 hissediyor |

Kilit kavrayış: **Eşleştirme birincil P2W savunmasıdır.** Bir balina daha güçlü bir takım kursa bile, eşit güçteki rakiplerle karşılaşır.

### 1.4 P2W Kırmızı Çizgileri — Asla Geçme

| Kırmızı Çizgi | Geçmenin Sonucu |
|---------------|----------------|
| Premium'a özel kart katmanları | Aşılamaz boşluk yaratır (Goley'in Efsane kartları) |
| Premium'a kilitli yetenekler | F2P için oynanış dezavantajı |
| Eşleştirmeyi atlama için ödeme | Rekabetçi bütünlüğü yok eder |
| Gizli veya manipüle edilmiş ihtimaller | Hukuki risk + güven yıkımı |
| Harcamadan kart bozulması | Top Eleven'ın toksik modeli |
| Gerçek para takas pazarı | RMT ekonomiyi yok eder |
| Premium diziliş/taktik açmaları | F2P için taktiksel dezavantaj |

---

## 2. Para Birimi Sistemi

### 2.1 Para Birimi Genel Bakış

Project F, kazanılan ve premium para birimleri arasında katı ayrımla **ikili para birimi sistemi** kullanır.

**Referans:** [F2P'de Oyun Ekonomisi Tasarımı](https://machinations.io/articles/game-economy-design-free-to-play-games) | [Mobil F2P'de Oyun Para Birimi Türleri](https://www.gamedeveloper.com/business/types-of-game-currencies-in-mobile-free-to-play) | [Dengeli Mobil Oyun Ekonomisi](https://www.blog.udonis.co/mobile-marketing/mobile-games/balanced-mobile-game-economy)

```
PARA BİRİMİ MİMARİSİ

┌──────────────────────────────────┐
│         ALTIN (Yumuşak)          │
│  Kazanma: Maçlar, görevler,     │
│  etkinlikler, geri dönüşüm,takas│
│  Kullanım: Birleştirme, eğitim, │
│  kart atölyesi, takas dengeleme │
│  ═══════════════════════════════ │
│  BOL — serbestçe akması için    │
│  tasarlandı.                    │
└──────────────────────────────────┘

┌──────────────────────────────────┐
│         ELMAS (Sert)             │
│  Kazanma: Başarımlar, dereceli  │
│  kilometre taşları, etkinlikler,│
│  Sezon Pası (ücretsiz katman)   │
│  Satın Alma: Gerçek para IAP    │
│  Kullanım: Premium paketler,    │
│  ekstra turnuva, kozmetikler    │
│  ═══════════════════════════════ │
│  KIT — F2P için yavaş kazanılır,│
│  temel oyun için asla gerekmez. │
└──────────────────────────────────┘

┌──────────────────────────────────┐
│  ADAY GÖSTERME JETONLARI        │
│  (Oyun İçi)                     │
│  Kazanma: Dereceli oyun,        │
│  meydan okumalar, etkinlikler   │
│  Kullanım: Belirli kart aday    │
│  gösterme (belirleyici edinim)  │
│  ═══════════════════════════════ │
│  SATIN ALINAMAZ. Tamamen        │
│  oyunla kazanılır. F2P eşitliği.│
└──────────────────────────────────┘
```

### 2.2 Altın Ekonomisi (Yumuşak Para Birimi)

**Musluklar (Altın Kaynakları):**

| Kaynak | Miktar | Sıklık | Haftalık Toplam |
|--------|--------|--------|-----------------|
| **Maç Galibiyeti** | 100 | ~10/hafta | 1.000 |
| **Maç Mağlubiyeti** | 40 | ~5/hafta | 200 |
| **Günlük Giriş** | 50-200 (7 günlük artan döngü) | Günlük | ~700 |
| **Günlük Görevler (3/gün)** | Her biri 75 | Günlük | 1.575 |
| **Haftalık Görev** | 500 | Haftalık | 500 |
| **Kart Geri Dönüşüm** | 50-5.000 (katmana göre) | Değişken | ~500 |
| **Etkinlik Ödülleri** | 200-1.000 | Etkinliklerde | ~400 |
| **Dereceli Kilometre Taşı** | 300-1.000 | Taş başına | ~300 |
| **Ödüllü Reklam** | 30/reklam (maks 5/gün) | İsteğe bağlı | 1.050 |
| **Toplam Haftalık F2P** | | | **~6.225** |

**Batıklar (Altın Harcama):**

| Batık | Maliyet | Sıklık | Haftalık Tüketim |
|-------|---------|--------|-----------------|
| **Kart Seviyelendirme** | Seviye başına 20-200 | Düzenli | ~1.500 |
| **Kart Birleştirme Ücreti** | 100-1.000 (katmana göre) | Düzenli | ~800 |
| **Takas Denge Ödemeleri** | Değişken | Ara sıra | ~500 |
| **Kart Atölyesi** | 200-2.000 | Ara sıra | ~300 |
| **Diziliş Denemesi** | Yeni diziliş denemesi başına 50 | Nadir | ~100 |
| **Hedef Haftalık Tüketim** | | | **~3.200** |

**Net Haftalık Denge:** ~3.025 Altın fazlası → birikim ve seçim hissi yaratır.

### 2.3 Elmas Ekonomisi (Sert Para Birimi)

**F2P Elmas Kaynakları:**

| Kaynak | Elmas | Sıklık | Aylık Toplam |
|--------|-------|--------|-------------|
| **Başarımlar** | Her biri 5-50 | Tek seferlik | ~100 (erken), ~20 (olgun) |
| **Sezon Pası (Ücretsiz)** | Sezon boyunca 150 | Sezonluk | 50/ay |
| **Dereceli Sezon Taşı** | 50-200 | Sezonluk | ~50/ay |
| **Haftalık Meydan Okuma** | 15 | Haftalık | 60/ay |
| **Turnuva Yerleşimi** | 10-50 | Haftalık | ~40/ay |
| **Etkinlik Taşları** | 20-100 | Etkinliklerde | ~30/ay |
| **Toplam Aylık F2P** | | | **~250** |

**Elmas Fiyatları (IAP):**

| Paket | Elmas | Fiyat (USD) | Elmas Başına | Bonus |
|-------|-------|-------------|-------------|-------|
| Başlangıç | 100 | $0,99 | $0,0099 | — |
| Standart | 550 | $4,99 | $0,0091 | +%10 |
| Değer | 1.200 | $9,99 | $0,0083 | +%20 |
| Süper Değer | 2.600 | $19,99 | $0,0077 | +%30 |
| Mega | 6.500 | $49,99 | $0,0077 | +%30 |
| Nihai | 14.000 | $99,99 | $0,0071 | +%40 |
| **İlk Satın Alma Bonusu** | İlk satın almada 2× | | | Tek seferlik |

**Elmas Batıkları:**

| Batık | Maliyet | Notlar |
|-------|---------|-------|
| **Premium Paket** | 300 Elmas | Standart'tan daha iyi ihtimaller |
| **Sezon Pası (Premium)** | 500 Elmas/sezon (~$5) | Bkz. §6.2 |
| **Sezon Pası (Nihai)** | 1.200 Elmas/sezon (~$12) | Bkz. §6.2 |
| **Ekstra Turnuva Girişi** | 50 Elmas | Turnuva başına maks 2 ekstra |
| **Kozmetik Öğeler** | 100-1.500 Elmas | Formalar, kutlamalar, stadyum |
| **Hızlı Birleştirme** | 20 Elmas | Animasyonu atla + anında sonuç |

### 2.4 Aday Gösterme Jetonu Ekonomisi

| Kaynak | Jeton | Sıklık |
|--------|-------|--------|
| **Dereceli Günlük (3 galibiyet)** | 1 | Günlük |
| **Haftalık Meydan Okuma Tamamlama** | 2 | Haftalık |
| **Sezon Dereceli Kilometre Taşı** | 1-3 | Taş başına |
| **Patron Maçı Temizleme** | 1 | Etkinlik patron başına |
| **Haftalık Toplam** | | **~5** |

> **Süper'e Kadar Süre (F2P):** ~10-17 hafta aktif oyun. Kasıtlı olarak uzun ama ulaşılabilir.

### 2.5 Para Birimi Dönüşüm Kuralları

| Kural | Detay |
|-------|-------|
| **Elmas → Altın** | 1 Elmas = 10 Altın (tek yönlü dönüşüm) |
| **Altın → Elmas** | **İZİN VERİLMEZ** (Altın enflasyonunun Elmas'ı değersizleştirmesini önler) |
| **Aday Gösterme Jetonları** | **Satın alınamaz veya satılamaz** — sadece oyunla kazanılır |
| **Birleştirme XP** | **Satın alınamaz veya satılamaz** — sadece birleştirme aktivitesiyle |
| **XP Parçaları** | Altın ile satın alınabilir (100 Altın = 5 Parça) |

---

## 3. Sezon Sıfırlama Mekanizması

### 3.1 Tasarım Felsefesi

Sezon sıfırlaması Project F'teki en kritik ekonomik mekanizmadır. Üç rekabet eden ihtiyacı dengelemelidir:

1. **Tazelik:** Güç durgunluğunu ve kalıcı balina avantajını önle (Goley'in ölümcül kusuru)
2. **Ödül:** Sadık oyuncular cezalandırılmış değil, değerli hissetmeli (FIFA Mobile'ın oyuncu kaybı sebebi)
3. **Giriş:** Yeni oyuncuların eşit şartlarda doğal katılım noktaları olmalı

### 3.2 Sezon Takvimi

| Sezon | Gerçek Dünya Uyumu | Süre | Tema |
|-------|-------------------|------|------|
| **İlkbahar** | Mart – Mayıs | 3 ay | Yeni Başlangıçlar (Lig başlangıçları) |
| **Yaz** | Haziran – Ağustos | 3 ay | Turnuva Sezonu (Kupalar, özel etkinlikler) |
| **Sonbahar** | Eylül – Kasım | 3 ay | Şampiyonlar Yükselir (Sıralama atağı) |
| **Kış** | Aralık – Şubat | 3 ay | Kış Efsaneleri (Tatil etkinlikleri) |

### 3.3 Sıfırlama Akışı — Detaylı

**Aşama 1: Ön Sıfırlama Uyarısı (1 hafta önce)**
- Tüm ekranlarda görünür geri sayım sayacı
- Statları, en iyi anları, başarımları gösteren "Sezon Özeti" ekranı
- "Favori Kartlar" istemi: kütüphaneye 50'ye kadar isim/yüz seti kaydet
- Kalan Aday Gösterme Jetonlarını kullanma hatırlatıcısı (süresi doluyor)
- Bonus ödüllü özel "Sezon Sonu" etkinliği

**Aşama 2: Sıfırlama Gecesi (Bakım Penceresi)**
- Süre: 2-4 saat
- Sunucu tarafı: tüm oyuncu kartları ve menajer kartları tüm hesaplardan kaldırılır
- Yetenekler, takım kartları, kozmetikler, para birimleri (Altın/Elmas) korunur
- MMR yumuşak sıfırlama: 1200'e (medyan) doğru sıkıştırılır, sıfırlanmaz
- Koleksiyon Albümü: "Sezon Arşivi" sayfası son durumu yakalar
- Acıma sayaçları sıfırlanır
- Birleştirme XP bakiyesi sıfırlanır
- Aday Gösterme Jetonları sona erer

**Aşama 3: Ödül Dağıtımı (Sıfırlamadan hemen sonra)**

**Sezon Sonu Ödül Paketleri (MMR dilimine göre):**

| Son MMR | Dilim | Temel Paket | Kart Aralığı |
|---------|-------|-------------|-------------|
| 0-999 | Bronz | 1× Başlangıç Paketi | 5 kart: Normal-Özel |
| 1000-1499 | Gümüş | 1× Standart Paket | 5 kart: Özel-Nadir |
| 1500-1999 | Altın | 1× Premium Paket | 5 kart: Nadir-Uzman |
| 2000-2499 | Platin | 2× Premium Paket | 10 kart: Nadir-Uzman |
| 2500+ | Elmas | 1× Elit Paket | 5 kart: Uzman-Süper |

**Oynama Süresi Bonus Paketleri:**

| Oynanan Maçlar | Bonus Standart Paketler |
|---------------|------------------------|
| 50 | +1 |
| 100 | +2 (kümülatif: +3) |
| 200 | +3 (kümülatif: +6) |
| 400+ | +5 (kümülatif: +11) |

**Sadakat Çarpanı (Tamamlanan Sezonlar):**

| Sezonlar | Çarpan | Etki |
|----------|--------|------|
| 1. sezon | 1,0× | Temel ödüller |
| 2. sezon | 1,1× | Paketlerde %10 daha fazla kart |
| 3. sezon | 1,2× | Paketlerde %20 daha fazla kart |
| 4.+ sezon | 1,3× | Paketlerde %30 daha fazla kart (tavan) |

**Aşama 4: Yeni Sezon Başlangıcı**
- Yeni öne çıkan kartlarla taze Aday Gösterme Havuzu
- Yeni Sezon Pası aktive olur
- Yeni dereceli yerleştirme maçları (10 maç, yüksek oynaklık)
- Sezon temalı etkinlikler başlar
- Yeni kozmetik koleksiyonu mevcut

### 3.4 Bu Sıfırlama Tasarımı Neden Çalışır

| Problem (Diğer Oyunlar) | Project F Çözümü |
|-------------------------|------------------|
| **Goley: Kalıcı avantaj** → Kıdemliler 3+ yıl kart birikimi | Maks avantaj 3 ay. Sıfırlama sahayı eşitler. |
| **FIFA Mobile: Cezalandırıcı sıfırlamalar** → İlerleme minimal telafilerle silindi | Hem dereceye HEM oynama süresine dayalı cömert ödül paketleri. |
| **eFootball: Sıfırlama yok = durgunluk** → Ekonomi enflasyonu, yeni oyuncular yetişemez | Her sezon taze ekonomi. Doğal katılım noktaları. |
| **Tüm oyunlar: Kimlik kaybı** → Duygusal bağ yok edildi | İsimler, yüzler, biyografiler kayıtlı. Kozmetikler kalıcı. Sadece güç sıfırlanır. |

---

## 4. Paket Sistemi

### 4.1 Paket Türleri

| Paket | Maliyet | İçerik | Garanti | Kaynak |
|-------|---------|--------|---------|--------|
| **Başlangıç Paketi** | Ücretsiz (sıfırlama ödülü) | 5 kart | Min 1 Özel | Sezon başı |
| **Standart Paket** | 1.000 Altın veya 100 Elmas | 5 kart + yetenek şansı | Min 1 Özel | Mağaza, ödüller |
| **Premium Paket** | 300 Elmas | 5 kart + 1 yetenek | Min 1 Nadir | Mağaza, taşlar |
| **Elit Paket** | Satın alınamaz | 5 kart + 1 Altın yetenek | Min 1 Uzman | Sadece sezon ödülleri |
| **Etkinlik Paketi** | Etkinlik para birimi | 3-5 temalı kart | Değişken | Etkinliklerde |
| **Menajer Paketi** | 500 Altın | 1 menajer kartı | — | Mağaza |
| **Yetenek Paketi** | 150 Elmas | 3 yetenek | Min 1 Gümüş | Mağaza |

### 4.2 Düşme Oranları (Tümü Yayınlanmış)

**Standart Paket (5 kart):**

| Katman | Kart Başına Oran | 10 Pakette Beklenen (50 kart) |
|--------|-----------------|-------------------------------|
| Normal | %50 | 25 |
| Özel | %30 | 15 |
| Nadir | %15 | 7,5 |
| Uzman | %4,5 | 2,25 |
| Süper | %0,5 | 0,25 |

**Premium Paket (5 kart):**

| Katman | Kart Başına Oran | 10 Pakette Beklenen (50 kart) |
|--------|-----------------|-------------------------------|
| Normal | %20 | 10 |
| Özel | %35 | 17,5 |
| Nadir | %30 | 15 |
| Uzman | %12 | 6 |
| Süper | %3 | 1,5 |

### 4.3 Acıma Sistemi (Paketler Arası, Görünür Sayaç)

| Garanti | Eşik | Sıfırlanma |
|---------|------|-----------|
| Nadir+ | Nadir+ olmadan 20 paket | Herhangi Nadir veya üstü çekildiğinde |
| Uzman+ | Uzman+ olmadan 50 paket | Herhangi Uzman veya üstü çekildiğinde |
| Süper | Süper olmadan 150 paket | Herhangi Süper çekildiğinde |

### 4.4 Manipülasyon Karşıtı Güvenceler

| Güvence | Detay |
|---------|-------|
| **DDA/Dinamik İhtimal Yok** | Düşme oranları sabit ve sunucu doğrulamalı. Harcama, zaman veya oyuncu davranışına göre ayarlama yok. |
| **Sunucu tarafı RNG** | Tüm rastgeleleştirme denetlenebilir tohum kayıtlarıyla sunucu tarafında gerçekleşir |
| **Oran değişikliği duyuruları** | Herhangi düşme oranı değişikliği 48 saat önceden duyurulur |
| **Üçüncü taraf denetim hazır** | Düşme oranı doğrulaması talep üzerine düzenleyicilere sağlanabilir |
| **Zaman sınırlı olasılık artışı yok** | "2× Süper oranı!" etkinlikleri KULLANILMAZ — FOMO yaratır |

---

## 5. Takas & Kiralama Sistemi

### 5.1 Takas Sistemi

**Takas Ekonomisi Kontrolleri:**

| Kontrol | Amaç | Detay |
|---------|------|-------|
| **Takas Vergisi** | Para birimi batığı | Takastaki Altın değerinin %10'u sisteme gider |
| **Günlük Limit** | Manipülasyon önleme | Hesap başına günde maks 5 takas |
| **Seviye Kapısı** | Bot önleme | Hesap Seviyesi 10+ gerekli |
| **Katman Kısıtlaması** | Denge | Sadece ±1 katman içinde takas yapılabilir |
| **Bekleme Süresi** | Flip önleme | Alınan kartlarda 24 saat takas bekleme süresi |
| **Değer Tavanı** | RMT önleme | Tek takasta maks 10.000 Altın |

### 5.2 Kiralama Sistemi

| Parametre | Detay |
|-----------|-------|
| **Kiralayabilecek** | Seviye 10+ herhangi oyuncu |
| **Kiralanabilecek** | Oyuncu kartları ve menajer kartları (yetenekler veya takım kartları değil) |
| **Süre Seçenekleri** | 1 gün, 3 gün, 7 gün |
| **Ücret Aralığı** | Gün başına 50-5.000 Altın (kiralayan belirler) |
| **Korumalar** | Kiralanan kartlar birleştirilemez, geri dönüştürülemez veya takas edilemez |
| **XP** | Kiralanan kartta kazanılan maç XP'si kiracının hesap seviyesine gider |
| **Otomatik İade** | Süre sonunda otomatik, eylem gerekmez |

---

## 6. Monetizasyon Kanalları

### 6.1 Gelir Modeli Genel Bakış

| Kanal | Hedef Gelirin %'si | P2W Etkisi |
|-------|-------------------|-----------|
| **Sezon Pası** | %35 | Sadece hızlandırma |
| **Kozmetikler** | %30 | Sıfır |
| **Elmas Satın Almaları (Paketler)** | %20 | Hafif hızlandırma |
| **Ödüllü Reklamlar** | %15 | Sıfır |

**Referans:** [Savaş Pası Tasarım Rehberi](https://www.gamemakers.com/p/understanding-battle-pass-game-design) | [Savaş/Sezon Pası Sistemlerinin Evrimi](https://www.gamigion.com/the-evolution-of-battle-pass-event-pass-and-season-pass-systems/)

### 6.2 Sezon Pası — Birincil Gelir Sürücüsü

**Üç Katman:**

| Katman | Maliyet | Hedef Oyuncu |
|--------|---------|-------------|
| **Ücretsiz** | 0$ | Tüm oyuncular — F2P etkileşimini sağlar |
| **Premium** | 500 Elmas (~$5) sezon başına | Küçük harcayıcılar — çekirdek ödeme yapan kitle |
| **Nihai** | 1.200 Elmas (~$12) sezon başına | Yunuslar — adanmış ödeme yapan oyuncular |

**Sezon Pası Ödül Yolu (30 seviye, aktif oyuncular için ~haftada 2 seviye):**

| Seviye | Ücretsiz | Premium | Nihai |
|--------|----------|---------|-------|
| 1 | 100 Altın | 200 Altın + 1 Standart Paket | 500 Altın + 1 Premium Paket |
| 5 | 1 Standart Paket | 1 Premium Paket + Forma Parçası | 1 Premium Paket + Tam Forma |
| 10 | 500 Altın + 20 Elmas | 1.000 Altın + 50 Elmas + Kutlama | Tüm Premium + Özel Kutlama |
| 15 | 1 Standart Paket + 1 Bronz Yetenek | 1 Premium Paket + 1 Gümüş Yetenek | Tüm Premium + Özel Kart Kenarlığı |
| 20 | 1.000 Altın + 30 Elmas | 2.000 Altın + 75 Elmas + Stadyum Teması | Tüm Premium + Özel Stadyum |
| 25 | 2 Standart Paket + 1 Aday Gösterme Jetonu | 2 Premium Paket + 2 Aday Gösterme Jetonu + İfade Seti | Tüm Premium + Özel İfade Seti |
| 30 | 2.000 Altın + 50 Elmas + Unvan | 5.000 Altın + 150 Elmas + Özel Unvan + Kart Kaplaması | Tüm Premium + Animasyonlu Kart Kaplaması + Profil Afişi |

**Sezon Pası Tasarım Kuralları:**
- Ücretsiz katman ödüllendirici hissetMELİ — ödeme yapmayan oyuncuları asla cezalandırma
- Premium/Nihai ödüller ağırlıklı olarak kozmetik + hızlandırma
- Özel oynanış avantajı yok (Premium'a özel yetenek, diziliş veya eşleştirme avantajı yok)
- Sezon ortasında satın alan oyuncular geriye dönük olarak tüm kazanılmış katman ödüllerini alır
- Sezon Pası yalnızca oyuncu onay verirse otomatik yenilenir (karanlık desen yok)

### 6.3 Kozmetikler — Etik Gelir Motoru

**Kozmetik Kategorileri:**

| Kategori | Fiyat Aralığı (Elmas) | Örnekler | Yayın Temposu |
|----------|----------------------|---------|---------------|
| **Formalar** | 200-800 | Takım üniformaları, özel tasarımlar | Ayda 2-3 yeni |
| **Kutlamalar** | 100-500 | Gol kutlama animasyonları | Ayda 1-2 yeni |
| **Stadyum Temaları** | 300-1.500 | İç saha maçları için görsel arka planlar | Ayda 1 yeni |
| **Kart Kenarlıkları** | 150-600 | Kartlar etrafında dekoratif çerçeveler | Ayda 2-3 yeni |
| **Kart Kaplamaları** | 200-1.000 | Alternatif kart görsel stilleri | Ayda 1-2 yeni |
| **İfadeler** | 50-200 | Maç sırasında hızlı sohbet ifadeleri | Ayda 3-5 yeni |
| **Efekt İzleri** | 300-800 | Oyuncu hareketi/şutlarında görsel izler | Ayda 1 yeni |
| **Profil Afişleri** | 100-400 | Profil sayfası süslemeleri | Ayda 2-3 yeni |

**Kozmetik Tasarım İlkeleri:**
- **Sıfır oynanış etkisi.** Kozmetikler statları, eşleştirmeyi veya rekabetçi sonuçları asla etkilemez.
- **Maçlarda görünür.** Oyuncular kozmetiklerini sadece menülerde değil, gerçek oynanış sırasında görür.
- **Kazanılabilir alternatifler.** Temel kozmetikler oyun içi ilerlemeyle mevcut.
- **Sınırlı süre baskısı yok.** Kozmetikler mağazadan çıkar ama periyodik olarak döner. FOMO minimize edilir.

### 6.4 Ödüllü Reklamlar

| Parametre | Detay |
|-----------|-------|
| **Tür** | 30 saniyelik video reklamlar |
| **Ödül** | İzleme başına 30 Altın |
| **Günlük Limit** | Günde 5 reklam (150 Altın/gün) |
| **Yerleşim** | Maç sonrası "Bonus Ödül" butonu (isteğe bağlı, asla zorunlu değil) |
| **Oyuncu Kontrolü** | Ayarlardan tamamen devre dışı bırakılabilir |
| **Aylık F2P Değeri** | ~4.500 Altın (~$4,50 eşdeğeri) |

**Reklam Tasarım Kuralları:**
- Oynanışı ASLA reklamlarla kesme
- İçeriği ASLA reklam izlemenin arkasına kapılama
- Ödeme yapan oyunculara ASLA reklam gösterme (herhangi Sezon Pası alıcısı için reklamsız)

### 6.5 Harcama Profilleri

| Oyuncu Tipi | Aylık Harcama | Ne Alırlar |
|------------|---------------|------------|
| **F2P (%70)** | $0 | Oyunla altın, ücretsiz Sezon Pası, ödüllü reklamlar |
| **Küçük Harcayıcı (%15)** | $5-15 | Premium Sezon Pası, ara sıra kozmetik |
| **Yunus (%10)** | $15-50 | Nihai Sezon Pası, kozmetikler, Premium Paketler |
| **Balina (%5)** | $50-200 | Yukarıdakilerin hepsi, daha fazla Premium Paket, kozmetik koleksiyonları |

**Aylık Harcama Tavanı (Yumuşak):**
- Ayda 100$'lık Elmas satın alımından sonra "Harcama Farkındalığı" bildirimi görünür
- Ayda 200$'dan sonra satın almalar işlenmeden önce 24 saatlik bekleme gerektirir
- Bu hem etik tasarım hem de düzenleyici geleceğe hazırlıktır

---

## 7. Sürdürülebilirlik & Ekonomik Döngü Analizi

### 7.1 Balina vs. Yunus vs. F2P Deneyimi

| Boyut | F2P | Küçük ($5-15/ay) | Yunus ($15-50/ay) | Balina ($50-200/ay) |
|-------|-----|------|---------|-------|
| **Kadro GNL (4. Hafta)** | 65-72 | 68-75 | 72-80 | 78-88 |
| **Kadro GNL (12. Hafta)** | 78-85 | 80-87 | 83-90 | 87-93 |
| **Eşleştirme** | Benzer GNL karşılaşır | Benzer GNL | Benzer GNL | Diğer balinalarla |
| **Kazanma Oranı** | ~%50 | ~%50 | ~%50 | ~%50 |
| **Kozmetikler** | Temel | Premium Pas öğeleri | Özel koleksiyon | Tam koleksiyon |
| **İlerleme Hızı** | 1× | 1,3× | 1,6× | 2× |
| **Rekabetçi Uygulanabilirlik** | Evet (beceriyle) | Evet | Evet | Evet (diğer balinaları karşı) |

> **Kritik kavrayış:** Eşleştirme ayarlandığı için kazanma oranı TÜM harcama kademeleri için yaklaşık %50'dir. Balinanın avantajı "daha fazla kazanmak" değil — "daha hızlı ilerlemek ve daha fazla kozmetiğe sahip olmak." Bu, güveni sürdüren DLS/eFootball modelidir.

### 7.2 Uzun Vadeli Etkileşim Mekanikleri

| Mekanik | Elde Tutma Hedefi | Nasıl |
|---------|------------------|-------|
| **Sezon Sıfırlaması** | G90+ | Her 3 ayda taze başlangıç oyunun bayatlamasını önler |
| **Koleksiyon Albümü** | G30-G180 | Rekabetçi sıralamanın ötesinde uzun vadeli hedefler |
| **Kart Kişiselleştirme** | Duygusal yatırım | İsimlendirilmiş, yüzlendirilmiş kartlar bağ yaratır |
| **Lig Sistemi** | Sosyal elde tutma | Sosyal bağlar #1 G30+ elde tutma sürücüsü |
| **Turnuva Devresi** | Rekabetçi elde tutma | Haftalık/sezonluk hedef hedefleri |
| **Patron Etkinlikleri** | Etkinlik elde tutma | Her 2-3 haftada iş birliği PvE içeriği |
| **Sezon Pası** | Günlük etkileşim | 30 seviye tutarlı oyun gerektirir |
| **Başarım Sistemi** | Ustalık elde tutma | Tüm oyun sistemlerinde yüzlerce başarım |

### 7.3 Enflasyon Karşıtı Tasarım

| Risk | Azaltma |
|------|---------|
| **Ekonomide çok fazla Altın** | Takas vergisi (%10), birleştirme ücretleri, sezon sıfırlaması |
| **Çok fazla kart** | Birleştirme (net -1), geri dönüşüm, sezonluk tam sıfırlama |
| **Sezon içi güç artışı** | Sezon ortasında yeni katman yok, aday göstermeler yan geçişleri döndürür |
| **Sezonlar arası güç artışı** | Tam kart sıfırlama. Yeni sezon = taze ekonomi. |
| **Elmas değer kaybı** | Elmas arzı sıkı kontrollü; kozmetik batıkları düzenli genişler |
| **RMT tehdidi** | Sadece Altın ile takas, değer tavanları, günlük limitler, harici pazar yok |

### 7.4 Etik Monetizasyon Taahhütleri

| Taahhüt | Detay |
|---------|-------|
| **Gizli ihtimalli loot box yok** | Tüm olasılıklar yayınlanır |
| **Bakım için ödeme yok** | Kartlar harcama yapmadan bozulmaz (Top Eleven'ın aksine) |
| **Yırtıcı FOMO yok** | Kozmetikler döner ama geri gelir; "şimdi ya da asla" baskısı yok |
| **Manipüle eşleştirme yok** | Takım gücü eşleştirmesi tutarlı, harcamayı artırmak için asla ayarlanmaz |
| **DDA/senaryo yok** | Maç sonuçları oyuncu aksiyonları ve statlarla belirlenir, sunucu manipülasyonu asla |
| **Harcama farkındalığı** | Ayda 100$'da bildirimler; 200$'da bekleme süresi |
| **Küçükler koruması** | IAP için ebeveyn kontrolleri; takas için yaş doğrulama |
| **Düzenleyici uyum** | Düşme oranları yayınlanmış; loot box mevzuatına hazır |

### 7.5 Sürdürülebilirlik Skor Kartı

| Faktör | Puan | Gerekçe |
|--------|------|---------|
| **Gelir Çeşitliliği** | 9/10 | Dört kanal (Pas, Kozmetik, Elmas, Reklamlar) — tek kaynak bağımlılığı yok |
| **F2P Uygulanabilirliği** | 9/10 | F2P beceriyle tüm derecelerde rekabetçi; Aday Gösterme sistemi belirleyici yol sağlar |
| **Balina Sağlığı** | 8/10 | Balinaların anlamlı harcama seçenekleri var ama oyunu "kıramaz" |
| **Yeni Oyuncu Girişi** | 9/10 | Sezon sıfırlama eşit şartlarda doğal katılım noktaları yaratır |
| **Ekonomik Stabilite** | 8/10 | Çoklu batıklar, sezon sıfırlama, enflasyon karşıtı önlemler |
| **Düzenleyici Hazırlık** | 10/10 | Yayınlanan ihtimaller, harcama tavanları, karanlık desen yok |
| **İçerik Yenileme** | 8/10 | Sezonluk temalar, etkinlikler, kozmetik hattı, Patron Maçları |
| **Genel** | **8,7/10** | Güçlü sürdürülebilir temel — analiz edilen tüm rakiplere göre önemli iyileşme |

---

## Ek: Rakip Çapraz Referansı

| GDD Kararı | Rakip Dersi | Kaynak |
|-----------|-------------|--------|
| 70:30 Yetenek:Cüzdan oranı | DLS/eFootball bölgesi en sürdürülebilir | GDD-00 §10.3 |
| Takım gücü eşleştirmesi | Goley balinaları F2P'yle eşleştirdi → göç | GDD-00 §2.5 |
| Yayınlanan düşme oranları | Goley predatör; Belçika/Kore düzenlemeleri | GDD-00 §2.4, §4.3 |
| Ödüllü sezon sıfırlaması | eFootball sıfırlama yokluğu + FIFA Mobile 2025 dönüşü | GDD-00 §3.6, §5.6 |
| Enerji sistemi yok | Score! Match enerji sistemi F2P oynamayı sınırlıyor | GDD-00 §6.4 |
| Kozmetik ağırlıklı gelir | Fortnite modeli kozmetiklerin F2P oyunları sürdürdüğünü kanıtlar | Sektör standardı |
| Harcama tavanları/farkındalık | Düzenleyici trend + etik tasarım | GDD-00 §4.3 |
| DDA/senaryolu sonuç yok | FC Mobile/Score! Match DDA şüphesi → güven erozyonu | GDD-00 §3.8, §6.5 |
| Bakım için ödeme yok | Top Eleven dinlenme sistemi → yırtıcı | GDD-00 §7.4 |
| Aday Gösterme sistemi (sadece oyunla kazanılan jetonlar) | eFootball Aday Gösterme Sözleşmeleri modeli | GDD-00 §5.3 |

---

*Bu doküman Project F için tam Oyun Ekonomisi & Monetizasyon sistemini tanımlar. En kritik GDD'dir — diğer tüm sistemlerin dayandığı ekonomik temel. Buradaki her karar Rakip Analizi'ndeki On Emir'e karşı test edilmiştir.*

*Dokümanı hazırlayan: Game Designer Agent, YG Games*
*Tarih: 17 Mart 2026*
