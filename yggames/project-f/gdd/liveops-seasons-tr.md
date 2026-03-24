# GDD-08: Canlı Operasyonlar & Sezonlar

**Doküman Kodu:** GDD-08
**Versiyon:** 1.0
**Tarih:** 17 Mart 2026
**Yazar:** Oyun Tasarımcısı Ajanı, YG Games
**Durum:** Taslak
**İlgili Dokümanlar:** [GDD-00: Rakip Analizi](docs/00-competitor-analysis-tr.md) | [GDD-01: Temel Oyun Tasarımı](core-game-design-tr.md) | [GDD-02: Kart Koleksiyon Sistemi](card-collection-system-tr.md) | [GDD-03: Oyun Ekonomisi & Monetizasyon](game-economy-monetization-tr.md) | [GDD-04: Rekabetçi & İlerleme](competitive-progression-tr.md) | [GDD-07: Özel Yetenekler & GGO Sistemi](special-abilities-ggo-tr.md)

---

## İçindekiler

1. [Canlı Operasyonlar Felsefesi](#1-canlı-operasyonlar-felsefesi)
2. [Sezon Döngüsü](#2-sezon-döngüsü)
3. [Sezon Sonu Sıfırlama & Yenilenme](#3-sezon-sonu-sıfırlama--yenilenme)
4. [Etkinlik Sistemi](#4-etkinlik-sistemi)
5. [Elde Tutma Mekanikleri](#5-elde-tutma-mekanikleri)
6. [Topluluk Yönetimi](#6-topluluk-yönetimi)
7. [İçerik Takvimi Şablonu](#7-içerik-takvimi-şablonu)
8. [Uzun Vadeli Sürdürülebilirlik Planı](#8-uzun-vadeli-sürdürülebilirlik-planı)
9. [Operasyonel Gereksinimler](#9-operasyonel-gereksinimler)
10. [P2W & Sürdürülebilirlik Değerlendirmesi](#10-p2w--sürdürülebilirlik-değerlendirmesi)

---

## 1. Canlı Operasyonlar Felsefesi

### 1.1 Temel İlkeler

| İlke | Açıklama |
|------|----------|
| **Elde Tutma > Kazanım** | Kalan oyuncular için tasarla, sadece yeni indirmeler için değil. Elde tutulan bir oyuncu, kazanılan bir oyuncunun 5 katı değerindedir. |
| **Sıfırlama = Yenilenme, Ceza Değil** | Sezonluk sıfırlamalar heyecan verici yeni olanaklar gibi hissettirmeli, asla kaybedilmiş yatırım gibi değil. |
| **Sadece Yapabileceklerini Vaat Et** | Küçük bir ekip, LiveOps'u sürdürülebilir tempoya göre planlamalıdır. Az vaat et, çok teslim et. |
| **Devrim Değil, Evrim** | Oyuncuların sevdiği şeyler üzerine inşa et. Çalışan sistemleri asla tamamen değiştirme. İyileştir. |
| **Oyuncu Zamanına Saygı** | Yatırılan her saat somut ilerleme kazandırır. Zaman kısıtlaması beklenti yaratmalı, hayal kırıklığı değil. |
| **Şeffaflık** | Yama notları, düşme oranları, yaklaşan değişiklikler — her zaman açıkça iletişim kur. |

### 1.2 Rakip LiveOps Dersleri

| Rakip | LiveOps Yaklaşımı | Sonuç | Bizim Dersimiz |
|-------|-------------------|-------|----------------|
| **Goley** | Minimal LiveOps, reaktif yamalar | Yavaş içerik kıtlığı → oyuncu göçü | Tutarlı tempo, proaktif içerik |
| **FIFA Mobile** | Yıllık tam sıfırlama (2017-2023), 2024'te geri dönüldü | Sıfırlama tepkisi → sonunda sıfırlamalar kaldırıldı | Korumalı yumuşak sıfırlama, asla tam silme |
| **FC Mobile** | Yoğun etkinlik rotasyonu, Battle Pass | Yüksek gelir ama P2W yorgunluğu | Etkinlikler oynanışı ödüllendirmeli, cüzdanı değil |
| **eFootball** | Hiç sıfırlama yok, yavaş içerik güncellemeleri | İyi elde tutma ama güncellemeler arasında etkileşim düşüşleri | Düzenli küçük güncellemeler > nadir büyük güncellemeler |
| **DLS** | Minimal LiveOps, statik sezonlar | Sadık ama heyecansız oyuncu tabanı | Sezonlar rahatsız etmeden heyecan katmalı |

**Referans:**
- FIFA Mobile Sıfırlama Geri Dönüşü: [EA FC Mobile Sıfırlama Yok Duyurusu](https://www.facebook.com/EASFCMobile/posts/there-will-be-no-season-reset-in-2025-continue-to-build-your-team-in-fcmobile-wi/1025404543094886/)
- LiveOps 2026 Trendleri: [PocketGamer LiveOps Trendleri](https://www.pocketgamer.biz/2026-live-ops-trends-templatisation-personalisation-and-ai/)

---

## 2. Sezon Döngüsü

### 2.1 Sezon Süresi & Aşamalar

**Sezon Uzunluğu:** 90 gün (3 ay)
**Yıllık Sezon Sayısı:** 4

| Aşama | Süre | Tarihler (Örnek Y1) | Amaç |
|-------|------|---------------------|------|
| **Ön Sezon** | 7 gün | Gün 1-7 | Heyecan, yama notları, yeni kartlar/yetenekler açıklanması |
| **Erken Sezon** | 28 gün | Gün 8-35 | Dereceli yerleştirme, yeni içerik keşfi, ilk tırmanma |
| **Orta Sezon** | 28 gün | Gün 36-63 | Orta sezon etkinliği, denge yaması, rekabetçi zirve |
| **Geç Sezon** | 21 gün | Gün 64-84 | Sıralama için son hamle, sezon ödülleri önizlemesi, son etkinlikler |
| **Sezon Arası** | 6 gün | Gün 85-90 | Sezon sonu ödülleri, geçiş dönemi, bakım, hazırlık |

### 2.2 Sezon İsimlendirme & Teması

Her sezonun aşağıdakileri etkileyen benzersiz bir teması vardır:
- Etkinlik estetiği ve anlatıları
- Kozmetik öğe temaları (kutlamalar, izler, stadyum öğeleri)
- Yeni kart sanatı varyantları
- Arka plan müziği ve UI aksanları

**Örnek Sezon Temaları:**

| Sezon | Tema | Görsel Atmosfer | Özel İçerik |
|-------|------|-----------------|-------------|
| **Y1 S1** | "Başlangıç Vuruşu" | Taze yeşil, şafak renkleri | Lansman içeriği, eğitim tamamlama etkinlikleri |
| **Y1 S2** | "Yaz Sıcağı" | Sıcak turuncu, plaj havası | Plaj stadyumları, yaz forması kozmetikleri |
| **Y1 S3** | "Şampiyonların Yükselişi" | Kraliyet altını, stadyum ışıkları | Turnuva etkinliği, şampiyon kutlamaları |
| **Y1 S4** | "Kış Fırtınası" | Buz mavisi, kar efektleri | Karlı saha, kış temalı yetenek VFX'leri |

### 2.3 Sezonlar Arası Aktarılan Öğeler

| Öğe | Aktarılıyor mu? | Notlar |
|-----|-----------------|--------|
| **Hesap Seviyesi** | ✅ Evet | Kalıcı |
| **Altın (para birimi)** | ✅ Evet | Tam aktarım |
| **Elmas (premium)** | ✅ Evet | Tam aktarım |
| **Yetenekler** | ✅ Evet | Kalıcı olarak açılır |
| **Kozmetikler** | ✅ Evet | Sahip olunan tüm kozmetikler kalır |
| **Başarımlar** | ✅ Evet | Kalıcı |
| **Arkadaşlar/Kulüp** | ✅ Evet | Sosyal bağlantılar kalır |
| **Oyuncu Kartları** | ⚠️ Kısmi | Sıfırlama sistemine bakın (Bölüm 3) |
| **MMR/Sıralama** | ⚠️ Yumuşak Sıfırlama | Sıfırlama formülüne bakın (Bölüm 3) |
| **Sezon Bileti** | ❌ Yeni | Her sezon yeni bilet |
| **Etkinlik İlerlemesi** | ❌ Sıfırlanır | Etkinlikler sezonluk |
| **Günlük/Haftalık Görevler** | ❌ Sıfırlanır | Her dönem yenilenir |

---

## 3. Sezon Sonu Sıfırlama & Yenilenme

### 3.1 Sıfırlama Felsefesi

> **"Sezonlar devam eden bir hikayenin yeni bölümü gibi hissettirmeli, yakılan bir kitap gibi değil."**

FIFA Mobile'ın tartışmalı tam sıfırlaması (sonunda vazgeçtiler) ile eFootball'un sıfırlama yapmama durağanlığı arasındaki orta yolu tutuyoruz. Yumuşak sıfırlama sistemimiz yatırımı korurken taze rekabetçi döngüler yaratır.

### 3.2 Kart Sıfırlama Akışı (4 Aşama)

**Aşama 1: Ön Duyuru (Gün 75)**
- Banner: "Sezon 15 gün içinde bitiyor!"
- Mevcut sıralamaya göre sezon ödülleri önizlemesi
- Geçiş hesaplaması için "Koleksiyon anlık görüntüsü" kaydedilir

**Aşama 2: Sezon Sonu Hesaplaması (Gün 90)**
- Tüm kartlar koruma için değerlendirilir
- Son MMR/sıralamaya göre ödül paketleri oluşturulur
- Sadakat çarpanı uygulanır

**Aşama 3: Geçiş (Sezon Arası Gün 1-3)**
- Korunan kartlar koleksiyonda kalır (aşağıdaki Koruma Kurallarına bakın)
- Korunmayan kartlar "Miras Jeton"larına dönüştürülür (özel para birimi)
- Sezon Sonu Ödül Paketleri gelen kutusuna teslim edilir
- Yeni sezon başlangıç paketi teslim edilir

**Aşama 4: Yeni Sezon Başlangıcı (Sezon Arası Gün 4-6)**
- Yeni dereceli yerleştirmeler başlar
- Yeni Sezon Bileti aktifleşir
- Yeni kartlar ve etkinlikler yayınlanır
- Miras Jetonlar Miras Dükkanı'nda harcanabilir

### 3.3 Kart Koruma Kuralları

| Kart Özelliği | Koruma Kuralı |
|---------------|---------------|
| **Normal seviye** | Korunmaz (Miras Jetonlara dönüştürülür) |
| **Nadir seviye** | Nadir kartların %50'si korunur (oyuncu hangilerini seçer) |
| **Epik seviye** | %100 korunur |
| **Süper seviye** | %100 korunur |
| **Efsane seviye** | Süper'e dönüştürülür (Efsane sezonluk, [GDD-02](card-collection-system-tr.md)'ye göre) |
| **"Favori" etiketli** | Seviyeye bakılmaksızın her zaman korunur (en fazla 6 favori) |
| **Aktif Kadro** | Her zaman korunur (6 kart + menajer + takım kartı) |
| **Özel isimli kartlar** | Öncelikli koruma (oyuncular kimlik yatırımı yapmıştır) |

**Net Etki:** Oyuncular çekirdek kadrolarını + Epik ve üstü kartlarını tutar. Normal kartlar rotasyona girer, koleksiyonları tahrip etmeden yeni paketlere talep yaratır.

### 3.4 Sezon Sonu Ödül Paketleri

Son dereceli seviyeye göre ([GDD-04](competitive-progression-tr.md)'e göre):

| Son Sıralama | Ödül Paketi İçeriği | Bonus |
|-------------|---------------------|-------|
| **Bronz** | 5 kart (3N, 2R) + 2.000 Altın | — |
| **Gümüş** | 8 kart (3N, 3R, 2E) + 5.000 Altın | +1 Yetenek Paketi |
| **Altın** | 10 kart (2N, 4R, 3E, 1S) + 10.000 Altın | +1 Yetenek Paketi + 1 Kozmetik |
| **Platin** | 12 kart (4R, 5E, 2S, 1 seçim) + 20.000 Altın | +2 Yetenek Paketi + Sezon Ünvanı |
| **Elmas** | 15 kart (5R, 6E, 3S, 1 seçim) + 50.000 Altın + 💎 200 | +3 Yetenek Paketi + Özel Kozmetik |

**Sadakat Çarpanı:** Ardışık oynanan her sezon için +%10 bonus kart (Sezon 6+'da maksimum +%50)

### 3.5 Miras Jeton Sistemi

Korunmayan kartlar Miras Jetonlara dönüştürülür:

| Kart Seviyesi | Miras Jeton Değeri |
|---------------|-------------------|
| Normal | 10 MJ |
| Nadir | 50 MJ |
| Epik | 200 MJ |
| Süper | 500 MJ |

**Miras Dükkanı Öğeleri:**

| Öğe | Maliyet | Amaç |
|-----|---------|------|
| Rastgele Nadir Kart | 100 MJ | Koleksiyonu yeniden oluşturma |
| Rastgele Epik Kart | 400 MJ | Hedefli yeniden oluşturma |
| Yetenek Paketi | 300 MJ | Yetenek koleksiyonunu genişletme |
| Kozmetik Paketi | 200 MJ | Kozmetik öğeler |
| Miras Kart Çerçevesi | 500 MJ | Özel "veteran" görseli |
| Miras Ünvanı | 1.000 MJ | "Sezon X Veteranı" ünvanı |

### 3.6 İletişim Stratejisi

| Zamanlama | İletişim | Kanal |
|-----------|----------|-------|
| **30 gün önce** | Sezon bitiş teaser'ı, yeni sezon tema açıklaması | Oyun içi banner, sosyal medya |
| **14 gün önce** | Detaylı sıfırlama SSS, koruma kuralları hatırlatması | Oyun içi haber, push bildirim |
| **7 gün önce** | "Favorilerini etiketle!" hatırlatması, sıralama hamle teşviki | Oyun içi ipucu, push bildirim |
| **3 gün önce** | Mevcut duruma göre son ödül önizlemesi | Oyun içi modal |
| **Sezon sonu** | "Sezon X için teşekkürler!" kişisel istatistiklerle özet | Oyun içi sinematik |
| **Yeni sezon başlangıcı** | Hoş geldin mesajı, yenilikler rehberi, başlangıç paketi | Oyun içi mini-FTUE akışı |

---

## 4. Etkinlik Sistemi

### 4.1 Etkinlik Çerçevesi

Etkinlikler üç eşzamanlı zaman ölçeğinde çalışır:

| Zaman Ölçeği | Tür | Süre | Sıklık | Ekip Çabası |
|--------------|-----|------|--------|-------------|
| **Kısa vadeli** | Günlük Görevler, Anlık Etkinlikler | 1-3 gün | Sürekli (her zaman aktif) | Düşük (şablonlu) |
| **Orta vadeli** | Haftalık Turnuvalar, Temalı Etkinlikler | 7-14 gün | Ayda 2-3 | Orta |
| **Uzun vadeli** | Sezon Etkinlikleri, Dünya Etkinlikleri | 30-60 gün | Sezon başına 1-2 | Yüksek |

### 4.2 Etkinlik Türleri

**A. Günlük Görevler (Her Zaman Aktif)**

| Görev | Ödül | Yenilenme |
|-------|------|-----------|
| "3 maç oyna" | 🪙 300 Altın | Günlük |
| "5 gol at" | 🪙 200 Altın + ⭐ 50 XP | Günlük |
| "1 dereceli maç kazan" | 💎 10 Elmas | Günlük |
| "Özel yetenek kullan" | ⭐ 100 XP | Günlük |
| "Tüm günlük görevleri tamamla" | 📦 Temel Paket | Günlük |

**B. Haftalık Turnuvalar**

| Format | Açıklama | Süre | Giriş | Ödüller |
|--------|----------|------|-------|---------|
| **Hafta Sonu Kupası** | 8 oyunculu tek eleme kupası | Cuma-Pazar | Ücretsiz (1 giriş) | İlk 3 paket + altın alır |
| **Güç Maçı** | 3'ün en iyisi, tüm takımlar 1000 güce eşitlenir | Cumartesi-Pazar | Ücretsiz | Saf beceriyi test eder — kozmetik ödüller |
| **Yetenek Gösterisi** | Tema: sadece 1 belirli yetenek elementine izin verilir | Rotasyonlu | Ücretsiz | Element temalı kozmetikler |

**C. Temalı Etkinlikler (Orta Vadeli)**

| Etkinlik Türü | Açıklama | Süre | Örnek |
|--------------|----------|------|-------|
| **Lig Etkinliği** | Gerçek dünya lig formatını taklit eder | 10-14 gün | "Şampiyonlar Ligi" tarzı eleme |
| **Meydan Okuma Yolu** | Yapay zeka meydan okumalarının doğrusal ilerlemesi | 7 gün | "Zafer Yolu" — artan zorlukta 10 takımı yen |
| **Koleksiyon Etkinliği** | Oyunla özel jetonlar kazanın, temalı ödüllerle takas edin | 14 gün | "Dünya Kupası Yıldızları" — milli takım kartları için bayrak jetonları toplayın |
| **Topluluk Hedefi** | Sunucu genelinde kolektif hedef | 7-14 gün | "Topluluk olarak 1.000.000 gol atın, evrensel ödül kazanın" |

**D. Sezon Etkinlikleri (Uzun Vadeli)**

| Etkinlik | Açıklama | Süre | Benzersiz Ödül |
|----------|----------|------|----------------|
| **Sezon Şampiyonası** | En iyi 128 oyuncu eşleşmeli turnuvada yarışır | Sezonun son 2 haftası | Özel kutlama + kart çerçevesi |
| **Sezon Hikayesi** | Sezon boyunca açılan anlatı güdümlü meydan okumalar | Tam sezon | Hikaye temalı kozmetikler + yetenek VFX'leri |

### 4.3 Etkinlik Ödül İlkeleri

| İlke | Uygulama |
|------|----------|
| **Katılım ≠ Kasma** | Tüm etkinlikler günde 30-60 dakika oyunla tamamlanabilir |
| **P2W Etkinlik Yok** | Etkinlik ödülleri kozmetik, paket, altın — asla özel güç kartları değil |
| **Yetişme Dostu** | Orta sezonda katılanlar etkinlik ödüllerinin %60+'ını hâlâ kazanabilir |
| **FOMO Yok** | Büyük kozmetikler 2 sezon sonra geri gelir; ünvanlar dışında kalıcı özel bir şey yok |
| **Adil Giriş** | Etkinliklerin %90'ı ücretsiz giriş; premium etkinlikler yalnızca kozmetik avantajlar sunar |

---

## 5. Elde Tutma Mekanikleri

### 5.1 Günlük Etkileşim Döngüsü

```
Giriş → Günlük Hediye → Görevleri Kontrol Et → 2-3 Maç Oyna
→ Günlük Görevleri Tamamla → Ödülleri Topla → Ücretsiz Paket Zamanlayıcısını Kontrol Et
→ Günlük Fırsatlara Göz At → Çıkış
```

**Hedef Günlük Oturum:** 20-30 dakika
**Hedef Oturum/Gün:** 2-3 (sabah, yolculuk, akşam)

### 5.2 Giriş & Seri Sistemi

**Günlük Giriş Takvimi (30 günlük döngü, tekrarlayan):**

| Gün | Ödül |
|-----|------|
| 1 | 🪙 200 Altın |
| 2 | ⭐ 100 XP |
| 3 | 📦 Temel Paket |
| 4 | 🪙 300 Altın |
| 5 | 💎 5 Elmas |
| 6 | ⭐ 150 XP |
| 7 | 📦 Premium Paket Parçası (1/3) |
| 14 | 📦 Premium Paket Parçası (2/3) |
| 21 | 📦 Premium Paket Parçası (3/3) → Tamamlanmış Premium Paket |
| 28 | 💎 30 Elmas + 🪙 5.000 Altın |
| 30 | 📦 Garantili Epik Paket |

**Seri Çarpanı:**
- 3 günlük seri: Maçlardan +%10 altın ödülü
- 7 günlük seri: +%20 altın ödülü + 💎 5 Elmas bonusu
- 14 günlük seri: +%30 altın ödülü + yetenek şarj hızı +%5 (maç içi)
- 30 günlük seri: +%50 altın ödülü + özel "Adanmış" aylık kozmetik

**Seri Koruması:**
- 1 gün kaçır: seri duraklatılır (sıfırlanmaz) 24 saat boyunca
- 2+ gün kaçır: seri sıfırlanır
- "Seri Kalkanı" öğesi (Sezon Bileti'nden aylık kazanılır): 1 seri sıfırlamasını önler

### 5.3 Geri Dönüş Mekanikleri

Aradan sonra dönen oyuncular için:

| Yokluk Süresi | Geri Dönüş Paketi | Amaç |
|---------------|-------------------|------|
| **3-7 gün** | 📦 Hoş Geldin Paketi (3 Nadir kart) + 3 gün boyunca çift günlük ödül | Geri dönüş için hafif teşvik |
| **7-30 gün** | 📦 Geri Dönüş Paketi (5 kart, 1 Garantili Epik) + 7 gün boyunca %50 XP artışı | Yetişme yardımı |
| **30-90 gün** | 📦 Büyük Geri Dönüş Paketi (8 kart, 2 Epik) + yeni MMR yerleştirmesi + 💎 50 Elmas | Büyük yetişme, "temiz başlangıç" hissi |
| **90+ gün** | Tam yeni oyuncu benzeri tanıtım + güçlendirilmiş başlangıç paketi + "Veteran Dönüşü" ünvanı | Hesabı kaybetmeden yeniden tanıtım |

### 5.4 Sosyal Elde Tutma Kancaları

| Kanca | Mekanik | Elde Tutma Etkisi |
|-------|---------|-------------------|
| **Günlük Arkadaş Maçı** | Günde 1 ücretsiz arkadaş maçı bonus ödüllerle | Sosyal bağlantıları sürdürür |
| **Kulüp Katkıları** | Paylaşımlı ödüllerle haftalık kulüp hedefleri | Grup sorumluluğu |
| **Hediye Verme** | Günde 1 arkadaşa ücretsiz hediye gönder (küçük altın/XP) | Günlük sosyal temas noktası |
| **Rekabet Sistemi** | Tekrarlayan rakipler "ezeli rakip" olur — rövanş bildirimleri | Kişisel bahisler yaratır |
| **Seyirci Modu** | Arkadaşların dereceli maçlarını canlı izle | Oynamadan etkileşim |

### 5.5 İlerleme Temposu

| Kilometre Taşı | Beklenen Zaman | Ödül |
|----------------|----------------|------|
| **İlk Dereceli Galibiyet** | Gün 1-2 | Başarım + paket |
| **Bronz Seviye** | Hafta 1 | Kutlama kilidi açılır |
| **Gümüş Seviye** | Hafta 2-3 | Stadyum seviye 3 |
| **Tam Kadro (6 Epik+ kart)** | Ay 1-2 | Koleksiyon kilometre taşı ödülü |
| **Altın Seviye** | Ay 1-2 | Stadyum seviye 4 + sezon ödül önizlemesi |
| **Tam Yetenek Seti** | Ay 3-6 | "Yetenek Ustası" ünvanı |
| **Platin/Elmas** | Sezon sonu | Üst düzey sezon ödülleri |

---

## 6. Topluluk Yönetimi

### 6.1 İletişim Kanalları

| Kanal | Sıklık | İçerik |
|-------|--------|--------|
| **Oyun İçi Haber** | Haftada 2-3 kez | Yama notları, etkinlik duyuruları, bakım bildirimleri |
| **Sosyal Medya (Twitter/X, Instagram)** | Günlük | Topluluk öne çıkanları, geliştirici güncellemeleri, memler, anketler |
| **Discord** | Her zaman aktif | Hata raporları, geri bildirim, topluluk etkinlikleri, geliştirici Soru-Cevap |
| **YouTube** | İki haftada bir | Geliştirici günlükleri, denge değişikliği açıklamaları, sezon önizlemeleri |
| **Blog/Web Sitesi** | Aylık | Derinlemesine incelemeler, yol haritası güncellemeleri, topluluk vitrini |

### 6.2 Yama İletişimi

| Yama Türü | Bildirim Süresi | İletişim |
|-----------|-----------------|----------|
| **Acil Düzeltme** | Anında | Oyun içi bildirim + sosyal medya |
| **Denge Yaması** | 3 gün | Gerekçeli detaylı yama notları |
| **İçerik Güncellemesi** | 7 gün | Önizleme yayını + oyun içi geri sayım |
| **Sezon Güncellemesi** | 14 gün | Tam önizleme kampanyası, sosyal medya oluşturma |

**Yama Notu Formatı:**
```
## Yama X.Y.Z — [Tarih]

### Denge Değişiklikleri
- [Yetenek Adı]: [Değişiklik açıklaması]. **Neden:** [Veriden gerekçe]

### Hata Düzeltmeleri
- [Soruna] neden olan [problem] düzeltildi

### Yeni İçerik
- [Yeni öğe/etkinlik/özellik açıklaması]

### Bilinen Sorunlar
- [Üzerinde çalışılan kabul edilmiş sorunlar]
```

### 6.3 Geri Bildirim Döngüleri

| Döngü | Mekanizma | Yanıt Süresi |
|-------|-----------|-------------|
| **Hata Raporları** | Oyun içi rapor düğmesi + Discord #hatalar | 24 saat içinde onay |
| **Denge Geri Bildirimi** | Aylık topluluk anketi + Discord #geribildirim | Sonraki denge yamasında ele al |
| **Özellik İstekleri** | Üç aylık yol haritası oylaması (en iyi 5 topluluk isteği) | 30 gün içinde yol haritası güncellemesi |
| **Memnuniyet** | Her 20 maçtan sonra oyun içi NPS anketi | Üç aylık analiz |

### 6.4 Topluluk Etkinlikleri

| Etkinlik | Sıklık | Açıklama |
|----------|--------|----------|
| **Geliştirici Soru-Cevap** | Aylık | Discord'da oyun tasarımcılarıyla canlı S-C |
| **Topluluk Turnuvası** | İki ayda bir | Oyuncu organizasyonlu (geliştirici destekli) turnuvalar, oyun içi ödüllerle |
| **İçerik Üretici Vitrini** | Haftalık | Topluluk içerik üreticilerini öne çıkarma |
| **Tasarım Yarışması** | Üç ayda bir | Topluluk sonraki kozmetik/kutlama temasına oy verir |

---

## 7. İçerik Takvimi Şablonu

### 7.1 Örnek 3 Aylık Sezon Planı

**Sezon: "Şampiyonların Yükselişi" (Y1 S3)**

#### Ay 1 (Gün 1-30)

| Hafta | Etkinlikler | İçerik Güncellemeleri | İletişim |
|-------|------------|----------------------|----------|
| **Hafta 1** | Sezon Başlangıcı, Yerleştirme Maçları | Yeni Sezon Bileti, 2 yeni yetenek, 4 yeni kutlama | Sezon fragmanı, yama notları, sosyal medya kampanyası |
| **Hafta 2** | "Zafer Yolu" Meydan Okuma Yolu | Günlük görevler aktif | Hafta ortası ipucu: formasyon stratejileri |
| **Hafta 3** | Hafta Sonu Kupası #1, Koleksiyon Etkinliği başlangıcı | Denge Yaması 1 (hafta 1-2 verileri) | Yama notları, denge gerekçe blogu |
| **Hafta 4** | Hafta Sonu Kupası #2, Anlık Etkinlik | Topluluk Hedefi: "1M Gol" | Topluluk Hedefi takipçisi, sosyal medya geri sayımı |

#### Ay 2 (Gün 31-60)

| Hafta | Etkinlikler | İçerik Güncellemeleri | İletişim |
|-------|------------|----------------------|----------|
| **Hafta 5** | Orta Sezon Etkinliği başlangıcı (Lig Etkinliği) | Dükkanında 2 yeni kozmetik | Orta sezon değerlendirme blogu, istatistik infografiği |
| **Hafta 6** | Lig Etkinliği devam, Hafta Sonu Kupası #3 | Sezon Bileti orta nokta ödülleri | Geliştirici S-C, denge geri bildirim anketi |
| **Hafta 7** | Lig Etkinliği finalleri, Yetenek Gösterisi | Denge Yaması 2 | Yama notları, turnuva sonuçları |
| **Hafta 8** | Topluluk Turnuvası, Anlık Etkinlik | Yeni günlük fırsat rotasyonu | Topluluk turnuvası yayını |

#### Ay 3 (Gün 61-90)

| Hafta | Etkinlikler | İçerik Güncellemeleri | İletişim |
|-------|------------|----------------------|----------|
| **Hafta 9** | Sezon Şampiyonası eleme başlangıcı | "Son Hamle" bonus XP etkinliği | "Sıralamanı zorla!" kampanyası |
| **Hafta 10** | Sezon Şampiyonası kupası, Koleksiyon Etkinliği | Sonraki sezon teaser'ı | Sonraki sezon açıklama fragmanı |
| **Hafta 11** | Sezon Şampiyonası finalleri, Son şans sıralama hamlesi | Sezon ödülleri önizlemesi | Detaylı sıfırlama SSS, koruma rehberi |
| **Hafta 12** | Sezon Arası geçişi | Sezon Sonu Ödülleri teslim, yeni sezon hazırlığı | "Teşekkürler" mesajı, istatistik özeti, yeni sezon geri sayımı |

### 7.2 Haftalık Tempo Şablonu

| Gün | Aktivite |
|-----|----------|
| **Pazartesi** | Yeni haftalık görevler aktifleşir, haftalık turnuva sonuçları |
| **Salı** | İçerik güncelleme günü (planlanmışsa), yama dağıtımı |
| **Çarşamba** | Hafta ortası etkinlik veya anlık meydan okuma |
| **Perşembe** | Sosyal medya topluluk öne çıkanı, geliştirici ipucu |
| **Cuma** | Hafta sonu etkinlikleri başlar (Hafta Sonu Kupası, özel etkinlikler) |
| **Cumartesi-Pazar** | Hafta sonu etkinlikleri aktif, topluluk etkileşim zirvesi |

### 7.3 Sezon Başına Üretim Gereksinimleri

| İçerik Türü | Miktar | Ekip Çabası |
|-------------|--------|-------------|
| **Yeni Yetenekler** | 2-4 | Tasarım: 2 hafta, Sanat: 2 hafta, KG: 1 hafta |
| **Yeni Kutlamalar** | 4-6 | Sanat: 3 hafta, Animasyon: 2 hafta |
| **Yeni Kozmetikler** | 8-12 öğe | Sanat: parti başına 2 hafta |
| **Etkinlikler** | 8-12 etkinlik | Tasarım: etkinlik başına 1 hafta (şablonlu) |
| **Denge Yamaları** | 2-3 | Tasarım: 3 gün, KG: 2 gün |
| **Sezon Bileti İçeriği** | 50 katman | Tasarım: 1 hafta, Sanat: 2 hafta |
| **İletişimler** | Ayda ~30 paylaşım | Topluluk yöneticisi: sürekli |

---

## 8. Uzun Vadeli Sürdürülebilirlik Planı

### 8.1 Yıl 1: Temel

| Çeyrek | Odak | Önemli Kilometre Taşları |
|--------|------|--------------------------|
| **Ç1 (Lansman)** | Kararlı lansman, FTUE optimizasyonu, çekirdek döngü cilası | 100K indirme, %40 G7 elde tutma |
| **Ç2** | İlk tam sezon döngüsü, etkinlik sistemi kanıtlanmış | Sezon 2 geçişi sorunsuz, %30 G30 elde tutma |
| **Ç3** | Kulüp sistemi lansmanı, sosyal özellikler genişlemesi | Aktif kulüpler, arkadaş yönlendirme sistemi |
| **Ç4** | İlk yıllık etkinlik (Yıl Dönümü), rekabetçi sahne | Topluluk turnuva altyapısı, %20 G90 elde tutma |

### 8.2 Yıl 2: Büyüme

| Çeyrek | Odak | Önemli Özellikler |
|--------|------|--------------------|
| **Ç1** | Özel maç modları (2v2, 3v3 varyantları) | Aynı 6v6 motorunu kullanan yeni maç formatları |
| **Ç2** | Bölgesel şampiyonalar, yerelleştirme genişlemesi | E-spor-lite, 5+ dil desteği |
| **Ç3** | Kart takas 2.0 (geliştirilmiş pazar özellikleri) | Açık artırma sistemi, kart koleksiyon bonusları |
| **Ç4** | Stadyum oluşturucu (özel stadyum yaratma) | Oyuncu tarafından oluşturulan stadyumlar, paylaşımlı topluluk |

### 8.3 Yıl 3+: Olgunluk

| Çeyrek | Odak | Vizyon |
|--------|------|--------|
| **Y3 Ç1** | Çapraz platform genişleme | Tablete optimize UI, potansiyel PC istemcisi |
| **Y3 Ç2** | Gelişmiş seyirci/e-spor araçları | Yayın modu, turnuva organizatör araçları |
| **Y3 Ç3** | Topluluk tarafından oluşturulan içerik | Özel kutlama oluşturucu, forma tasarımcısı |
| **Y3 Ç4** | Franchise genişlemesi | Project F markası → ürünler, topluluk IP'leri |

### 8.4 Meta Evrim Stratejisi

| Sezon | Meta Odağı | Nasıl |
|-------|-----------|-------|
| **S1-S2** | Temel meta — oyuncular yetenekleri öğrenir | Dengeli başlangıç seti, nazik denge ayarları |
| **S3-S4** | Genişleyen meta — yeni yetenekler stratejileri değiştirir | 4-8 yeni yetenek, karşı-oyun evrimi |
| **S5-S8** | Olgunlaşan meta — kombinasyonlarla derinlik | Yetenek sinerji keşifleri, formasyon meta değişimleri |
| **S9+** | Dönen meta — sezonluk yetenek vurgusu | "Yetenek vitrini" etkinlikleri, az kullanılan yeteneklere geçici güçlendirmeler |

### 8.5 Özellik Hattı Önceliği

| Öncelik | Özellik | Hedef Sezon |
|---------|---------|-------------|
| **Zorunlu** | Sezon döngüsü, etkinlikler, Sezon Bileti, günlük döngü | S1 (Lansman) |
| **Zorunlu** | Denge yamaları, topluluk kanalları | S1 (Lansman) |
| **Olmalı** | Kulüp sistemi, geliştirilmiş sosyal | S2 |
| **Olmalı** | Topluluk turnuvaları, seyirci modu | S3 |
| **Olabilir** | Özel maç modları, stadyum oluşturucu | S4-S6 |
| **Olabilir** | Çapraz platform, e-spor araçları | S8+ |

---

## 9. Operasyonel Gereksinimler

### 9.1 Ekip Gereksinimleri

| Rol | Sayı | Sorumluluk |
|-----|------|------------|
| **LiveOps Yöneticisi** | 1 | Sezon planlaması, etkinlik çizelgeleme, KPI takibi |
| **Oyun Tasarımcısı** | 1-2 | Denge, yeni yetenekler, etkinlik tasarımı |
| **İçerik Sanatçısı** | 1-2 | Kozmetikler, kart sanatı, UI varlıkları |
| **Animatör** | 1 | Kutlamalar, yetenek VFX'leri |
| **Topluluk Yöneticisi** | 1 | Sosyal medya, Discord, geri bildirim toplama |
| **KG (Kalite Güvence)** | 1-2 | Yama testi, etkinlik doğrulama |
| **Backend Mühendisi** | 1 | Sunucu etkinlikleri, veri hattı, eşleştirme |
| **TOPLAM** | 7-10 | Bağımsız/küçük stüdyo için sürdürülebilir |

### 9.2 Anahtar Performans Göstergeleri (KPI'lar)

| KPI | Hedef Y1 | Ölçüm |
|-----|----------|-------|
| **G1 Elde Tutma** | %50 | Kuranların Gün 2'de oynama yüzdesi |
| **G7 Elde Tutma** | %30 | G1 oyuncularının Gün 7'de dönme yüzdesi |
| **G30 Elde Tutma** | %15 | G1 oyuncularının Gün 30'da dönme yüzdesi |
| **Günlük Aktif Kullanıcı (GAK)** | Y1 sonu itibarıyla 50K | Benzersiz günlük oyuncular |
| **Aylık Aktif Kullanıcı (AAK)** | Y1 sonu itibarıyla 200K | Benzersiz aylık oyuncular |
| **GAK/AAK Oranı** | ≥ %25 | "Yapışkanlık" — sağlıklı oran %20-30 |
| **Ortalama Oturum Süresi** | 15-25 dk | Oturum başına süre |
| **Günlük Oturum Sayısı** | 2-3 | Günlük etkileşim derinliği |
| **OKBGAK** | $0,05-0,15 | Günlük aktif kullanıcı başına gelir |
| **Sezon Tamamlama Oranı** | ≥ %60 seviye 25+'a ulaşır | Sezon Bileti etkileşimi |
| **Etkinlik Katılımı** | GAK'ın ≥ %70'i | Etkinlik ilgisi |
| **NPS Puanı** | ≥ 30 | Oyuncu memnuniyeti |

### 9.3 Kesinti & Bakım

| Tür | Sıklık | Süre | Bildirim |
|-----|--------|------|----------|
| **Dönen Güncelleme** | Haftalık | 0 kesinti | Oyun içi banner |
| **Planlı Bakım** | İki haftada bir | 1-2 saat (yoğun olmayan saatler) | 48 saat öncesinden |
| **Sezon Geçişi** | Üç ayda bir | 4-6 saat | 7 gün öncesinden |
| **Acil Bakım** | Gerektiğinde | Değişken | Anlık bildirim |

---

## 10. P2W & Sürdürülebilirlik Değerlendirmesi

### 10.1 LiveOps P2W Risk Değerlendirmesi

| Öğe | Risk | Azaltma |
|-----|------|---------|
| **Sezon Bileti** | DÜŞÜK | Ücretsiz hat rekabetçi değer sağlar; premium %60 kozmetik |
| **Etkinlik ödülleri** | YOK | Etkinlikler paket/kozmetik verir, asla özel güç avantajları değil |
| **Sıfırlama telafisi** | DÜŞÜK | Sıfırlama yatırılmış kartları korur (Epik+ her zaman güvende); ödeme ile koruma yok |
| **Geri dönüş paketleri** | YOK | TÜM dönen oyunculara eşit verilir |
| **Günlük fırsatlar** | DÜŞÜK | Çoğunlukla altınla fiyatlandırılmış; elmas fırsatları asla zorunlu değil |
| **Seri ödülleri** | YOK | Etkileşim için tamamen ek bonuslar |
| **Zamanlı içerik** | DÜŞÜK | Kozmetikler 2 sezon sonra geri gelir; kalıcı özellik yok |

### 10.2 Sürdürülebilirlik Puan Kartı

| Faktör | Puan | Gerekçe |
|--------|------|---------|
| **İçerik Temposu Gerçekçiliği** | 9/10 | Şablonlu etkinlikler, 7-10 kişilik ekip, ulaşılabilir üretim programı |
| **Elde Tutma Derinliği** | 9/10 | Günlük/haftalık/aylık/sezonluk döngüler birden fazla etkileşim katmanı oluşturur |
| **Sıfırlama Adaleti** | 8/10 | Yumuşak sıfırlama yatırımı korurken taze rekabet yaratır |
| **Gelir Sürdürülebilirliği** | 8/10 | Sezon Bileti + kozmetikler + paketler çeşitlendirilmiş gelir akışları sağlar |
| **Topluluk Sağlığı** | 9/10 | Şeffaf iletişim, geri bildirim döngüleri, topluluk etkinlikleri |
| **Ekip Tükenmişliği Önleme** | 8/10 | Gerçekçi kapsam, şablonlu etkinlikler, crunch-bağımlı olmayan program |
| **Uzun Vadeli Vizyon** | 9/10 | Kademeli genişlemeyle 3 yıllık yol haritası, özellik şişkinliği değil |
| **Genel LiveOps Sürdürülebilirliği** | **8.7/10** | Küçük bir ekibin sürdürülebilir operasyonu için tasarlanmış iyi kapsamlı LiveOps |

### 10.3 "Geri Döner misin?" Testi

> Her tasarım kararından sonra sor: "3 ay boyunca takım kuran bir oyuncu olsam, bu beni gelecek sezon geri gelmek istemememe neden olur mu?"

**Cevaplarımız:**
- Sezon sıfırlaması en iyi kartlarımı koruyor ✅
- Sıralamam için harika paketlerle ödüllendiriliyorum ✅
- Yeteneklerim ve kozmetiklerim aktarılıyor ✅
- Yeni sezon heyecan verici yeni içerik getiriyor ✅
- Arkadaşlarım ve kulübüm hâlâ orada ✅
- Geride kalırsam yetişebilirim ✅
- Oyun zamanıma ve paramama saygı gösteriyor ✅

---

## Ek A: Etkinlik Şablon Kütüphanesi

### A.1 Meydan Okuma Yolu Şablonu

```
Etkinlik: [İsim]
Süre: 7 gün
Aşamalar: 10
Zorluk: Artan (Kolay → Zor)
Giriş: Ücretsiz

Aşama 1: Takımı Yen (Güç 600) → 🪙 200 Altın
Aşama 2: Takımı Yen (Güç 700) → ⭐ 100 XP
Aşama 3: Takımı Yen (Güç 800) → 📦 Temel Paket
...
Aşama 10: Takımı Yen (Güç 1200) → 📦 Epik Paket + Özel Kozmetik
```

### A.2 Koleksiyon Etkinliği Şablonu

```
Etkinlik: [İsim]
Süre: 14 gün
Jeton: [Temalı Jeton Adı]
Kazanma Hızı: Normal oyunla günde ~50 jeton

Dükkan:
- Temalı Nadir Kart: 100 jeton
- Temalı Epik Kart: 500 jeton
- Özel Kutlama: 300 jeton
- Kozmetik Paketi: 400 jeton
```

### A.3 Topluluk Hedefi Şablonu

```
Etkinlik: [İsim]
Süre: 7 gün
Hedef: [Topluluk geneli metrik] (ör. 1.000.000 gol atılması)
Takip: Oyun içi görülebilir gerçek zamanlı sayaç

Kilometre Taşları:
- %25: 🪙 1.000 Altın tüm katılımcılara
- %50: 📦 Temel Paket herkese
- %75: 💎 10 Elmas herkese
- %100: 📦 Epik Paket + Özel Ünvan herkese
```

---

*Bu doküman Project F için tam Canlı Operasyonlar & Sezonlar sistemini tanımlar. Tüm sezonluk operasyonlar, etkinlikler ve elde tutma mekanikleri bu spesifikasyonları takip etmelidir. Bu, Project F tasarım serisindeki son GDD'dir.*

*Tam GDD Dizini:*
- *[GDD-00: Rakip Analizi](docs/00-competitor-analysis-tr.md)*
- *[GDD-01: Temel Oyun Tasarımı](core-game-design-tr.md)*
- *[GDD-02: Kart Koleksiyon Sistemi](card-collection-system-tr.md)*
- *[GDD-03: Oyun Ekonomisi & Monetizasyon](game-economy-monetization-tr.md)*
- *[GDD-04: Rekabetçi & İlerleme](competitive-progression-tr.md)*
- *[GDD-05: Sanat & Görsel Stil](art-visual-style-tr.md)*
- *[GDD-06: UI/UX Tasarımı](ui-ux-design-tr.md)*
- *[GDD-07: Özel Yetenekler & GGO Sistemi](special-abilities-ggo-tr.md)*
- *[GDD-08: Canlı Operasyonlar & Sezonlar](liveops-seasons-tr.md)*
