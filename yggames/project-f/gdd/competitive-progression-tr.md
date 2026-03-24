# Project F — Rekabetçi & İlerleme Sistemi Tasarım Dokümanı

**Doküman Kodu:** GDD-04
**Versiyon:** 1.0
**Tarih:** 17 Mart 2026
**Yazar:** Game Designer Agent, YG Games
**Durum:** Taslak
**Dayanak:** [GDD-00 Rakip Analizi](docs/00-competitor-analysis-en.md) | [GDD-01 Temel Oyun Tasarımı](core-game-design-tr.md) | [GDD-03 Oyun Ekonomisi](game-economy-monetization-tr.md)

---

## İçindekiler

1. [ELO/MMR Sistemi](#1-elommr-sistemi)
2. [Sezon Yapısı](#2-sezon-yapısı)
3. [Dereceli Mod](#3-dereceli-mod)
4. [Rahat Mod](#4-rahat-mod)
5. [Ödül Yapısı](#5-ödül-yapısı)
6. [Yeni Oyuncu Dengeleme](#6-yeni-oyuncu-dengeleme)
7. [P2W Kaçınma Mekanikleri](#7-p2w-kaçınma-mekanikleri)
8. [Sıralama Tabloları](#8-sıralama-tabloları)
9. [P2W Dengesi & Sürdürülebilirlik Değerlendirmesi](#9-p2w-dengesi--sürdürülebilirlik-değerlendirmesi)

---

## 1. ELO/MMR Sistemi

### 1.1 Tasarım Felsefesi

MMR **kart gücünü değil, oyuncu yeteneğini** yansıtmalıdır. Normal kartlarla yetenekli bir oyuncu, Süper kartlarla yeteneksiz bir oyuncudan daha yüksek MMR'ye sahip olmalıdır. Eşleştirme daha sonra adil maçlar yaratmak için HEM MMR HEM takım gücü kullanır.

**İki Eksenli Eşleştirme:**
```
         YÜKSEK YETENEK
              │
              │  ┌──────────────────┐
              │  │ Yetenekli F2P    │ ← Benzer güçteki diğer yetenekli
              │  │ MMR: 2200        │    oyuncularla karşılaşır
              │  │ Güç: 72          │
              │  └──────────────────┘
              │
              │  ┌──────────────────┐
              │  │ Yetenekli Balina │ ← Benzer güçteki diğer yetenekli
              │  │ MMR: 2300        │    oyuncularla karşılaşır
              │  │ Güç: 90          │
              │  └──────────────────┘
              │
         DÜŞÜK YETENEK
              │
              │  ┌──────────────────┐
              │  │ Rahat F2P        │ ← Diğer rahat oyuncularla
              │  │ MMR: 1100        │    karşılaşır
              │  │ Güç: 65          │
              │  └──────────────────┘
```

### 1.2 Derecelendirme Algoritması

**Temel Formül (Modifiye Elo):**

```
Yeni Derece = Eski Derece + K × (Gerçek - Beklenen)

Nerede:
  K = K-faktörü (bağlama göre değişir, aşağıya bakın)
  Gerçek = 1,0 (galibiyet), 0,5 (beraberlik), 0,0 (mağlubiyet)
  Beklenen = 1 / (1 + 10^((RakipMMR - SizinMMR) / 400))
```

**K-Faktörü Tablosu:**

| Bağlam | K-Faktörü | Gerekçe |
|--------|----------|---------|
| **Yerleştirme maçları (ilk 10)** | 50 | Hızlı kalibrasyon için yüksek oynaklık |
| **30'dan az dereceli maç** | 40 | Hâlâ kalibrasyon |
| **Bronz-Gümüş (0-1499)** | 32 | Alt kademeler için standart hareket |
| **Altın-Platin (1500-2499)** | 24 | Yüksek kademelerde daha yavaş hareket |
| **Elmas (2500+)** | 16 | Elit seviyede çok stabil |
| **15+ maç kaybetme serisi sonrası** | K × 0,7 | Umutsuzluk sarmalını önlemek için sönümlenmiş kayıp |
| **10+ maç kazanma serisi sonrası** | K × 1,3 | Gerçek tavanı bulmak için hızlandırılmış kazanç |

### 1.3 Başlangıç MMR & Yerleştirme

| Parametre | Değer |
|-----------|-------|
| **Yeni Hesap Başlangıç MMR** | 1000 (yerleştirme sırasında gizli) |
| **Yerleştirme Maçları** | Sezon başına 10 maç |
| **Yerleştirme Oynaklığı** | K = 50 (hızlı kalibrasyon) |
| **Yerleştirme Sonrası Gösterim** | 10 maçtan sonra derece ve MMR gösterilir |
| **Sezonluk Yumuşak Sıfırlama** | MMR 1200'e doğru sıkıştırılır: YeniMMR = 1200 + (EskiMMR - 1200) × 0,6 |

**Yumuşak Sıfırlama Örneği:**
- 2500'deki oyuncu → 1200 + (2500-1200) × 0,6 = **1980**'e sıfırlanır
- 800'deki oyuncu → 1200 + (800-1200) × 0,6 = **960**'a sıfırlanır
- 1200'deki oyuncu → **1200**'de kalır (medyan etkilenmez)

### 1.4 Derece Düşüşü

| Kural | Detay |
|-------|-------|
| **Altın altında düşüş yok** | Bronz/Gümüş oyuncular inaktiviteden asla MMR kaybetmez |
| **Altın+ düşüş** | Dereceli maç oynamadan haftada -10 MMR |
| **Maksimum düşüş** | 4 hafta (maks -40 MMR), sonra dondurulur |
| **Düşüş tabanı** | Kademe tabanının altına düşemez (Altın = 1500, Platin = 2000, Elmas = 2500) |
| **Düşüş bildirimi** | 5 gün inaktiviteden sonra push bildirimi |

### 1.5 MMR Görünürlüğü

| Öğe | Görünürlük |
|-----|-----------|
| **Sizin MMR'niz** | Yerleştirmeden sonra görünür (tam sayı + derece rozeti) |
| **Rakip MMR** | Eşleştirme sırasında gizli, maç sonrası gösterilir |
| **Takım Gücü** | Size görünür; maç sırasında rakipten gizli (maç sonrası gösterilir) |
| **Kazanma olasılığı** | Asla gösterilmez (toksikliği ve kuyruk kaçınmasını önler) |
| **MMR geçmişi** | Profilde zaman içinde MMR'yi gösteren grafik mevcut |

---

## 2. Sezon Yapısı

### 2.1 Kademe Sistemi

| Kademe | MMR Aralığı | Rozet | Yükselme Ödülü | Nüfus Hedefi |
|--------|------------|-------|----------------|--------------|
| **Bronz** | 0-999 | Bronz kalkan | 500 Altın + 1 Standart Paket | Oyuncuların %25'i |
| **Gümüş** | 1000-1499 | Gümüş kalkan | 1.000 Altın + 1 Standart Paket | %30 |
| **Altın** | 1500-1999 | Altın kalkan | 2.000 Altın + 1 Premium Paket + 50 Elmas | %25 |
| **Platin** | 2000-2499 | Platin kalkan | 3.000 Altın + 2 Premium Paket + 100 Elmas | %15 |
| **Elmas** | 2500+ | Elmas kalkan (animasyonlu) | 5.000 Altın + 1 Elit Paket + 200 Elmas | %5 |

### 2.2 Bölüm Sistemi (Kademeler İçinde)

Her kademe **5 bölüme** ayrılır (Bölüm V → Bölüm I):

| Bölüm | MMR Ofseti | Yükselmek İçin Gereken Yıldızlar |
|-------|-----------|----------------------------------|
| V (giriş) | +0-99 | 3 yıldız (3 net galibiyet) |
| IV | +100-199 | 3 yıldız |
| III | +200-299 | 4 yıldız |
| II | +300-399 | 4 yıldız |
| I (zirve) | +400-499 | 5 yıldız (kademe yükselme) |

**Yıldız Sistemi:**
- Galibiyet = +1 yıldız
- Mağlubiyet = -1 yıldız (ama mevcut bölümde asla 0 yıldızın altına düşmez)
- Beraberlik = 0 yıldız
- Galibiyet serisi bonusu: Arka arkaya 3+ galibiyet = galibiyet başına +2 yıldız

### 2.3 Yükselme & Düşme

| Mekanik | Detay |
|---------|-------|
| **Kademe Yükselmesi** | Bölüm I'de gereken yıldızları kazan → Yükselme maçı (3'ün en iyisi) |
| **Yükselme Kalkanı** | Yükseldikten sonra 5 maç düşemezsiniz (tolerans süresi) |
| **Kademe Tabanı** | Bir kademeye ulaşıldığında, sezon içinde altına düşülemez |
| **Bölüm Düşmesi** | Herhangi bölümde 0 yıldızda kaybetme → önceki bölüme 2 yıldızla düşme |
| **Sezon Sıfırlama** | Tüm kademeler/bölümler sıfırlanır; MMR yerleştirme bölgesine yumuşak sıfırlanır |

### 2.4 Sezon Süresi & Zaman Çizelgesi

| Aşama | Süre | İçerik |
|-------|------|--------|
| **Ön Sezon** | 3 gün | Sezon Pası önizlemesi, yeni kozmetik tanıtımı, yama notları |
| **Yerleştirme Aşaması** | 1-2. Hafta | 10 yerleştirme maçı, yüksek K-faktörü |
| **Ana Sezon** | 3-10. Hafta | Çekirdek rekabetçi oyun, haftalık meydan okumalar, etkinlikler |
| **Sezon Sonu Atağı** | 11-12. Hafta | 2× yıldız ilerlemesi hafta sonları, final turnuvası, son şans ödülleri |
| **Sezon Kapanışı** | Son gün | Final sıralamaları kilitlenir, ödüller hesaplanır |
| **Bakım** | 2-4 saat | Sıfırlama, ödül dağıtımı, yeni sezon kurulumu |

---

## 3. Dereceli Mod

### 3.1 Giriş Gereksinimleri

| Gereksinim | Detay | Amaç |
|-----------|-------|------|
| **Hesap Seviyesi 5+** | ~2-3 saat oynama | Yepyeni hesapların dereceli moda girmesini önler |
| **6 Oyuncu Kartı + Menajer + Takım** | Tam kadro gerekli | Minimum hazırlığı sağlar |
| **Antrenman Sahası Tamamlama** | Temel eğitim tamamlanmış | Kontrol aşinalığını sağlar |
| **5 Rahat Maç Oynama** | Hızlı Maç deneyimi | Temel maç deneyimini sağlar |

### 3.2 Eşleştirme Algoritması

**Öncelik Sırası:**

1. **MMR Aralığı:** ±150 MMR içinde rakip bul
2. **Takım Gücü Aralığı:** ±%15 takım GNL içinde
3. **Bölge:** Aynı bölge tercih edilir (gecikme)
4. **Kuyruk Süresi Genişleme:** 15 sn sonra → ±250 MMR, ±%20 güç. 30 sn sonra → ±400 MMR, ±%30 güç. 60 sn sonra → mevcut herhangi.

**Eşleştirme Kısıtlamaları:**

| Kısıtlama | Kural |
|-----------|-------|
| **Yeniden eşleşme bekleme** | 30 dakika içinde aynı rakiple karşılaşılamaz |
| **Seri koruması** | 3 ardışık kaybetmeden sonra, sonraki maç ±100 MMR önceliklendirir (daha sıkı) |
| **Yeni oyuncu koruması** | İlk 20 dereceli maç: sadece <50 dereceli maçı olan oyuncularla karşılaş |
| **Bölge önceliği** | Aynı ülke > aynı kıta > global |
| **Güç farkı geçersiz kılma** | Güç farkı >%25 ise, MMR eşleşse bile maç iptal edilir ve yeniden kuyruğa alınır |

### 3.3 Dereceli Ödüller

**Maç Başına Ödüller:**

| Sonuç | Altın | XP | Yıldızlar |
|-------|-------|-----|-----------|
| Galibiyet | 100 | 50 | +1 (seride +2) |
| Beraberlik | 50 | 30 | 0 |
| Mağlubiyet | 40 | 20 | -1 |
| Daha yüksek MMR'ye karşı galibiyet (+200) | 150 | 75 | +1 |
| Mükemmel galibiyet (3-0 veya daha fazla) | 150 | 75 | +1 |

**Sezon Kilometre Taşı Ödülleri:**

| Kilometre Taşı | Ödül |
|----------------|------|
| 10 Dereceli Galibiyet | 500 Altın + 1 Aday Gösterme Jetonu |
| 25 Dereceli Galibiyet | 1 Premium Paket + 30 Elmas |
| 50 Dereceli Galibiyet | 2 Premium Paket + 1 Aday Gösterme Jetonu + Özel İfade |
| 100 Dereceli Galibiyet | 1 Elit Paket + 100 Elmas + Özel Kart Kenarlığı |
| İlk kez Altın'a ulaşma | 1 Premium Paket + "Altın Başarıcı" Unvanı |
| İlk kez Platin'e ulaşma | 2 Premium Paket + "Platin Savaşçı" Unvanı |
| İlk kez Elmas'a ulaşma | 1 Elit Paket + "Elmas Efsanesi" Unvanı + Animasyonlu Profil Afişi |

---

## 4. Rahat Mod

### 4.1 Hızlı Maç

| Parametre | Detay |
|-----------|-------|
| **Giriş** | Hesap Seviyesi 3+ |
| **Eşleştirme** | Sadece takım gücü tabanlı (MMR bileşeni yok) |
| **Süre** | Standart maç (~4 dk) |
| **Risk** | Derece etkisi yok, yıldız değişikliği yok |
| **Ödüller** | 50 Altın (galibiyet), 20 Altın (mağlubiyet), maç başına 25 XP |
| **Amaç** | Isınma, yeni dizilişleri dene, kiralanan kartları dene, stressiz oynama |

### 4.2 Arkadaşlık Maçı

| Parametre | Detay |
|-----------|-------|
| **Giriş** | Hesap Seviyesi 2+, belirli arkadaşı davet etmeli |
| **Eşleştirme** | Direkt davet (rastgele eşleştirme yok) |
| **Özel Kurallar** | Seçilebilir: Yetenek yok, Sabit katman (hepsi Normal), Hava durumu, Süre limiti |
| **Risk** | Hiçbiri — saf sosyal oynama |
| **Ödüller** | 10 Altın, 10 XP (katılım, sonuç değil) |

### 4.3 Meydan Okuma Modu (PvE)

| Parametre | Detay |
|-----------|-------|
| **Giriş** | Hesap Seviyesi 4+ |
| **Rakip** | Temalı değiştiricilerle YZ takımlar |
| **Rotasyon** | Haftada 3 yeni meydan okuma |
| **Zorluk** | Kolay / Orta / Zor (ölçeklenen YZ + kısıtlamalar) |
| **Ödüller** | Altın, XP, Yetenekler, Kart Paketleri (zorluğa göre) |
| **Amaç** | Çevrimdışı dostu PvE, beceri eğitimi, alternatif ilerleme |

---

## 5. Ödül Yapısı

### 5.1 Günlük Ödüller

| Ödül | Gereksinim | Değer |
|------|-----------|-------|
| **Giriş Bonusu** | Giriş yap | 50-200 Altın (artan 7 günlük döngü: 50→75→100→125→150→175→200) |
| **İlk Galibiyet** | 1 maç kazan (herhangi mod) | 100 Altın + 25 XP bonusu |
| **Günlük Görev 1** | "3 maç oyna" | 75 Altın |
| **Günlük Görev 2** | "5 gol at" | 75 Altın |
| **Günlük Görev 3** | "1 dereceli maç kazan" | 75 Altın + 15 Elmas |

### 5.2 Haftalık Ödüller

| Ödül | Gereksinim | Değer |
|------|-----------|-------|
| **Haftalık Görev** | "10 maç kazan" | 500 Altın + 1 Standart Paket |
| **Haftalık Meydan Okuma** | Haftalık PvE meydan okumasını tamamla (Zor) | 200 Altın + 15 Elmas + 2 Aday Gösterme Jetonu |
| **Turnuva Girişi** | Haftalık turnuvaya gir | Ücretsiz giriş + yerleşime dayalı ödüller |
| **Lig Maçı** | Planlanan lig maçını oyna | 100 Altın + Lig Puanları |

### 5.3 Başarım Sistemi

**Başarım Kategorileri:**

| Kategori | Örnekler | Toplam |
|----------|---------|--------|
| **Maç** | "100 maç kazan," "500 gol at," "50 gol yeme" | 30 |
| **Kart** | "100 benzersiz kart topla," "Süper kartı maks seviyeye çıkar" | 25 |
| **Yetenek** | "Her yeteneği bir kez kullan," "10 yeteneği karşıla" | 20 |
| **Dereceli** | "Altın'a ulaş," "10 yükselme maçı kazan" | 15 |
| **Sosyal** | "50 kart takas et," "10 lig maçı kazan" | 15 |
| **Meydan Okuma** | "100 meydan okuma tamamla" | 10 |
| **Ustalık** | "Tüm dizilişleri kullan," "Her pozisyondan gol at" | 10 |
| **Toplam** | | **125** |

Her başarım zorluğa göre 5-50 Elmas verir, önemli bir F2P Elmas kaynağı oluşturur (~2.000+ toplam Elmas).

---

## 6. Yeni Oyuncu Dengeleme

### 6.1 Yeni Oyuncu Yolculuğu

```
1. HAFTA: BAŞLANGIÇ
┌─────────────────────────────────────────────────────┐
│ Gün 1: Antrenman Sahası (eğitim, kontrolleri öğren) │
│ Gün 2: İlk Hızlı Maç (YZ veya çok yeni oyunculara)│
│ Gün 3: Kart Atölyesi tanıtımı (ilk kartı kişisel.) │
│ Gün 4-5: Daha fazla Hızlı Maç, dizilişleri aç      │
│ Gün 6-7: Seviye 5'te Dereceli açılır                │
│ Ödül: Başlangıç Paketi (6 Özel + 1 Nadir garantili)│
└─────────────────────────────────────────────────────┘

2-3. HAFTA: KEŞİF
┌─────────────────────────────────────────────────────┐
│ İlk dereceli yerleştirme maçları (korumalı havuz)   │
│ Meydan Okuma Modu Seviye 4'te açılır                │
│ İlk kart birleştirme deneyimi                        │
│ Bir Lige katıl (Seviye 8+)                           │
│ İlk haftalık turnuva girişi (Seviye 10+)            │
└─────────────────────────────────────────────────────┘

4.+ HAFTA: REKABETÇİ
┌─────────────────────────────────────────────────────┐
│ Tam dereceli eşleştirme (yeni oyuncu havuzundan çık)│
│ Tüm modlar erişilebilir                             │
│ Takas Seviye 10'da açılır                            │
│ İlk Uzman/Süper karta doğru inşa etme               │
└─────────────────────────────────────────────────────┘
```

### 6.2 Yeni Oyuncu Koruma Mekanikleri

| Koruma | Detay | Süre |
|--------|-------|------|
| **Başlangıç Paketi** | 6 Özel kart + 1 garantili Nadir + 1 Normal Menajer + 1 temel Takım Kartı | Hesap oluşturma |
| **Korumalı Eşleştirme** | Sadece <50 dereceli maçı olan oyuncularla karşılaş | İlk 20 dereceli maç |
| **Azaltılmış Kayıp** | Dereceli kaybetmede -1 yıldız yerine -0,5 yıldız | İlk 30 dereceli maç |
| **Hızlandırılmış XP** | Daha hızlı açmalar için 2× hesap XP'si | Seviye 10'a kadar |
| **Garantili Günlük Paket** | Günde 1 ücretsiz Standart Paket | İlk 7 gün |
| **Bot Maçları** | 20 sn'de uygun rakip bulunamazsa, YZ botla karşılaş (bot olarak işaretli) | Sadece ilk 10 maç |
| **Yetenek Eğitimi** | Seviye 3'te eğitimle ücretsiz Bronz yetenek verilir | Tek seferlik |

### 6.3 Yakalama Mekanikleri (Sezon Ortası Katılımcılar)

| Mekanik | Detay |
|---------|-------|
| **Yakalama Paketi** | Sezon ortasında katılıyorsanız, sezonun ortalama kart katmanına ölçeklenmiş kartlarla "Yakalama Paketi" alın |
| **Hızlandırılmış Yerleştirme** | Sezon ortası katılımcılar için gerçek dereceyi daha hızlı bulmak üzere K-faktörü 60 (50 yerine) |
| **Etkinlik Katılımı** | Etkinlikler ne zaman katıldığınızdan bağımsız olarak orantılı ödüller verir |
| **Sezon Sıfırlaması** | Her 3 ay herkesin yeniden kurduğu doğal bir giriş noktasıdır |

---

## 7. P2W Kaçınma Mekanikleri

### 7.1 Takım Gücü Eşleştirmesi (Birincil Savunma)

En önemli P2W karşıtı mekanik. Detaylı algoritma:

```
Eşleştirme Puanı = (MMR Ağırlığı × MMR) + (Güç Ağırlığı × TakımGücü)

Nerede:
  MMR Ağırlığı = 0,65 (yetenek daha çok önemli)
  Güç Ağırlığı = 0,35 (takım gücü önemli ama daha az)

  Kabul edilebilir maç: |Sizin Puan - Rakip Puan| < Eşik

  Eşik 100'den başlar, her 15 saniyede 50 genişler
  Maks eşik: 400 (60 saniye sonra)
```

**Etki:** Bir balina (MMR 1800, Güç 92) benzer kombine puana sahip başka bir oyuncuyla eşleştirilir — muhtemelen başka bir balina (MMR 1750, Güç 93) veya orta düzey takımla çok yetenekli bir oyuncu (MMR 2100, Güç 78).

### 7.2 Rekabetçi Etkinliklerde Güç Tavanları

| Etkinlik Türü | Güç Kuralı |
|--------------|-----------|
| **Dereceli Mod** | Tavan yok — güç eşleştirmesi dengeyi sağlar |
| **Haftalık Turnuva** | Her hafta rastgele değiştirici "Hepsi Normal" veya "Maks Nadir" kısıtlamaları içerebilir |
| **Sezonluk Şampiyonluk** | Tavan yok ama Altın+ derece gerektirir (yetenek eşiği) |
| **Lig Modu** | Bölüm tabanlı, benzer takımlar doğal olarak karşılaşır |
| **Meydan Okuma Modu** | Bazı meydan okumalar belirli katman kısıtlamaları gerektirir |

### 7.3 Yapısal P2W Karşıtı Tasarım

| Mekanik | P2W'yi Nasıl Önler |
|---------|---------------------|
| **Takım Gücü Eşleştirmesi** | Balinalar eşit güçte takımlarla karşılaşır, F2P'yi ezmez |
| **Efsane Katmanı Yok** | Güç tavanı F2P tarafından bir sezon içinde ulaşılabilir |
| **Sezon Sıfırlaması** | Kalıcı balina avantajı imkansız; maks 3 aylık avantaj |
| **Aday Gösterme Sistemi** | F2P belirli kartları hedefleyebilir (saf gacha bağımlılığı yok) |
| **Yetenek Eşitliği** | Tüm yetenekler F2P kazanılabilir; katman hızı etkiler, güç tavanını değil |
| **Kimya Sistemi** | Kadro kurma zekasını ödüllendirir, ham harcamayı değil |
| **Yayınlanan İhtimaller** | Oyuncular harcama konusunda bilinçli kararlar verir |
| **Harcama Tavanları** | Yumuşak limitler aşırı balina birikimini önler |

---

## 8. Sıralama Tabloları

### 8.1 Sıralama Tablosu Türleri

| Tablo | Sıralama Kriteri | Kapsam | Sıfırlama |
|-------|-----------------|--------|-----------|
| **Global MMR** | MMR puanı | Dünya çapında | Sezonluk |
| **Bölgesel MMR** | MMR puanı | Ülke/bölge bazında | Sezonluk |
| **Arkadaşlar** | MMR puanı | Sadece arkadaş listesi | Sezonluk |
| **Lig** | Lig puanları | Lig içinde | Sezonluk |
| **Turnuva** | Turnuva galibiyetleri | Sezon kümülatif | Sezonluk |
| **Koleksiyon** | Albüm tamamlama %'si | Global | Kalıcı (aktarılır) |
| **Galibiyet Serisi** | Ardışık galibiyetler | Global | Seri kırıldığında sıfırlanır |
| **Haftalık Yıldızlar** | Bu hafta kazanılan yıldızlar | Global | Haftalık sıfırlama |

### 8.2 Sıralama Tablosu Ödülleri

**Sezon Sonu Sıralama Tablosu Ödülleri (En İyi Oyuncular):**

| Pozisyon | Global MMR Ödülü | Bölgesel MMR Ödülü |
|---------|------------------|-------------------|
| #1 | 1.000 Elmas + Özel Animasyonlu Unvan + #1 Profil Çerçevesi | 500 Elmas + Bölgesel Şampiyon Unvanı |
| #2-3 | 500 Elmas + İlk 3 Unvanı | 250 Elmas + Bölgesel İlk 3 Unvanı |
| #4-10 | 300 Elmas + İlk 10 Unvanı | 150 Elmas + Bölgesel İlk 10 Unvanı |
| #11-50 | 150 Elmas + İlk 50 Rozeti | 75 Elmas + Bölgesel İlk 50 Rozeti |
| #51-100 | 100 Elmas + İlk 100 Rozeti | 50 Elmas |
| İlk %1 | 50 Elmas + Elit Rozet | 25 Elmas |

### 8.3 Manipülasyon Önleme

| Önlem | Detay |
|-------|-------|
| **Galibiyet takası tespiti** | Aynı oyuncular arasında dönüşümlü galibiyetlerle tekrarlayan maçlar için desen analizi |
| **Hesap paylaşımı tespiti** | Kısa sürede farklı cihazlar, konumlar gibi olağandışı giriş deseni analizi |
| **MMR yükseltme tespiti** | Düşük sıralı hesabın kısa sürede aniden 500+ MMR kazanması işaretlenir |
| **Sonuç** | Sezon ödülleri iptal + 1 sezon dereceli yasağı + sıralama tablosundan çıkarma |

---

## 9. P2W Dengesi & Sürdürülebilirlik Değerlendirmesi

### 9.1 Sistem P2W Skor Kartı

| Sistem | P2W Riski | Azaltma | Risk Seviyesi |
|--------|----------|---------|---------------|
| **MMR Sistemi** | Yetenek yerine harcamayı yansıtabilir | İki eksenli eşleştirme (MMR + güç ayrı), yumuşak sıfırlama sıkıştırması | ✅ Düşük |
| **Kademe Yükselmeleri** | Balinalar daha hızlı yükselir | Taban koruması düşmeyi önler; yükselmeler hâlâ kazanmayı gerektirir | ✅ Düşük |
| **Sezon Ödülleri** | Daha iyi derece = daha iyi ödüller | Ödüller orantılı, üstel değil; oynama süresi de sayılır | ✅ Düşük |
| **Eşleştirme** | Maçlarda güç farkı | ±%15 güç aralığı, %25'te güç farkı geçersiz kılma | ✅ Düşük |
| **Sıralama Tablosu Ödülleri** | Üst pozisyonlar balinalar tarafından domine edilir | Balinalar balinalarla karşılaşır, üst pozisyonlar YETENEK + yatırım gerektirir | ⚠️ Orta |
| **Yeni Oyuncu Koruması** | Koruma süresini atlama için ödeme | Koruma zaman ve maç sayısı tabanlı, satın alınamaz | ✅ Düşük |

### 9.2 Sürdürülebilirlik Değerlendirmesi

| Faktör | Puan | Detay |
|--------|------|-------|
| **Rekabetçi Bütünlük** | 9/10 | İki eksenli eşleştirme + güç farkı geçersiz kılma adil maçlar sağlar |
| **Yeni Oyuncu Deneyimi** | 9/10 | Kapsamlı koruma + yakalama mekanikleri + sezonluk giriş noktaları |
| **Derece Anlamlılığı** | 8/10 | MMR yeteneği yansıtır; yıldız sistemi görünür ilerleme sağlar |
| **Ödül Adaleti** | 9/10 | Oynama süresi dereceyle birlikte önemli; başarımlar önemli F2P Elmas kaynağı |
| **Uzun Vadeli Motivasyon** | 8/10 | Sezon sıfırlamaları + sıralama tabloları + başarımlar + koleksiyon = çoklu hedef katmanları |
| **Hile Önleme Temeli** | 8/10 | Galibiyet takası, yükseltme, hesap paylaşımı için tespit sistemleri |
| **Genel** | **8,5/10** | |

---

## Ek: Rakip Çapraz Referansı

| GDD Kararı | Rakip Dersi | Kaynak |
|-----------|-------------|--------|
| İki eksenli eşleştirme (MMR + Güç) | Goley takım gücünü tamamen görmezden geldi | GDD-00 §2.5 |
| Yeni oyuncu koruma havuzu | Goley'de yakalama mekanikleri yoktu | GDD-00 §2.6 |
| Sezonluk yumuşak sıfırlama (sert değil) | FIFA Mobile sert sıfırlamaları oyuncu kaybettirdi | GDD-00 §3.6 |
| Kademe taban koruması | Derece salınımından hayal kırıklığını önler | Sektör en iyi uygulaması |
| Yayınlanan MMR | eFootball şeffaflığı güven oluşturur | GDD-00 §5.5 |
| Başarım tabanlı Elmas kaynağı | DLS F2P'nin IAP dışı kaynaklarla gelişebildiğini kanıtlar | GDD-00 §8.4 |
| İlk günden hile önleme | eFootball null sonuçları topluluğa zarar verdi | GDD-00 §5.8 |

---

*Bu doküman Project F için Rekabetçi & İlerleme sistemlerini tanımlar. Tam rekabetçi deneyim tasarımı için GDD-01 (Temel Tasarım) ve GDD-03 (Ekonomi) ile birlikte okunmalıdır.*

*Dokümanı hazırlayan: Game Designer Agent, YG Games*
*Tarih: 17 Mart 2026*
