# GDD-07: Özel Yetenekler ve GGO Sistemi

**Doküman Kodu:** GDD-07
**Versiyon:** 1.0
**Tarih:** 17 Mart 2026
**Yazar:** Oyun Tasarımcısı Ajanı, YG Games
**Durum:** Taslak
**İlgili Dokümanlar:** [GDD-00: Rakip Analizi](docs/00-competitor-analysis-en.md) | [GDD-01: Temel Oyun Tasarımı](core-game-design-tr.md) | [GDD-02: Kart Koleksiyon Sistemi](card-collection-system-tr.md) | [GDD-03: Oyun Ekonomisi ve Monetizasyon](game-economy-monetization-tr.md) | [GDD-05: Sanat ve Görsel Stil](art-visual-style-tr.md)

---

## İçindekiler

1. [Sistem Genel Bakış](#1-sistem-genel-bakış)
2. [Yetenek Kategorileri](#2-yetenek-kategorileri)
3. [Tam Yetenek Kataloğu](#3-tam-yetenek-kataloğu)
4. [Yetenek Edinme ve İlerleme](#4-yetenek-edinme-ve-ilerleme)
5. [Maç İçi Mekanikler](#5-maç-içi-mekanikler)
6. [Denge Çerçevesi](#6-denge-çerçevesi)
7. [Karşı Oyun Sistemi](#7-karşı-oyun-sistemi)
8. [Yetenek Özelleştirme ve Donanımlar](#8-yetenek-özelleştirme-ve-donanımlar)
9. [Görsel Entegrasyon](#9-görsel-entegrasyon)
10. [GGO İlham Derinlemesine İnceleme](#10-ggo-ilham-derinlemesine-inceleme)
11. [P2W ve Sürdürülebilirlik Değerlendirmesi](#11-p2w-ve-sürdürülebilirlik-değerlendirmesi)

---

## 1. Sistem Genel Bakış

### 1.1 Vizyon

> **"Her maçı bir öne çıkan anlar derlemesine dönüştüren anime ilhamlı özel yetenekler — ama asla beceriyi güçle değiştirmeyen."**

Özel Yetenekler sistemi Project F'in imza farklılaştırıcısıdır. GGO Football animesinin muhteşem hareketlerinden ilham alarak, yetenekler 6v6 futbol deneyimine taktiksel derinlik ve görsel gösteri katmanı ekler. Her yeteneğin bir karşılığı var. Her karşılığın bir penceresi var. Beceri her zaman kazanır.

### 1.2 Temel Tasarım Kuralları

| Kural | Açıklama |
|-------|----------|
| **Beceri > Yetenek** | İyi zamanlanmış normal bir eylem, kötü zamanlanmış bir özel yeteneği her zaman yener |
| **Her Yeteneğin Karşılığı Var** | "Kazandım" düğmesi yok — her hücum yeteneği savunulabilir |
| **Görsel Netlik** | Oyuncular her zaman neyin geldiğini görür ve tepki vermeye zamanları vardır |
| **F2P Erişilebilir** | Her yetenek 2-4 hafta içinde oynanışla kazanılabilir |
| **Yetenek Biriktirme Yok** | Aktivasyon başına oyuncu başına yalnızca 1 yetenek aktif olabilir |
| **Bekleme Eşitliği** | Aynı yetenek = kart kademesinden bağımsız aynı bekleme süresi |
| **Kademeye Kilitli Yetenek Yok** | Tüm yetenekler tüm kademelerde mevcut; daha yüksek kademeler biraz daha hızlı şarj, asla özel yetenekler değil |

### 1.3 Sistem Mimarisi

```
Kart (1 Yetenek Slotu var)
    └── Yetenek (26 mevcut arasından)
         ├── Element (Ateş / Buz / Şimşek / Rüzgar / Gölge)
         ├── Kategori (Hücum / Savunma / Taktik / Kaleci)
         ├── Kademe (1 / 2 / 3)
         ├── Şarj Yöntemi (Momentum / Zaman / Olay)
         └── Bekleme (15sn / 25sn / 40sn)
```

**Maç Başına Yetenek Ekonomisi:**
- Takımınızdaki 6 oyuncunun her birinin 1 kuşanılmış yeteneği var
- Hangi oyuncunun yeteneğini aktive edeceğinizi siz kontrol edersiniz
- Şarj ölçer oynanış eylemleriyle dolar
- Dolduğunda yetenek kullanılana kadar hazır
- Kullanımdan sonra yeniden şarj başlamadan önce bekleme başlar
- Maç başına oyuncu başına maksimum 2 yetenek aktivasyonu (spam önler)

---

## 2. Yetenek Kategorileri

### 2.1 Kategori Genel Bakış

| Kategori | Sayı | Amaç | Mevki Yakınlığı |
|----------|------|------|-----------------|
| **Hücum** | 8 | Gol atma, şans yaratma | FW, MF |
| **Savunma** | 6 | Saldırıları durdurma, top kazanma | DF, GK |
| **Taktik** | 8 | Alan, tempo ve pozisyon manipülasyonu | MF, DF |
| **Kaleci** | 4 | Geliştirilmiş kurtarışlar ve dağıtım | Yalnızca GK |
| **TOPLAM** | **26** | — | — |

### 2.2 Element Sistemi

Her yetenek 5 elementten birine aittir. Elementler görsel kişilik ekler ama taş-kağıt-makas avantajı YARATMAZ — tamamen kozmetik/tematiktir.

| Element | Renk | VFX Teması | His |
|---------|------|-----------|-----|
| **Ateş** | Turuncu-Kırmızı | Alevler, korlar, ısı bozulması | Güç, yoğunluk |
| **Buz** | Cam Göbeği-Mavi | Kristaller, don, sis | Hassasiyet, kontrol |
| **Şimşek** | Sarı-Beyaz | Arklar, kıvılcımlar, flaş | Hız, patlayıcılık |
| **Rüzgar** | Yeşil-Turkuaz | Yapraklar, hava akımları, girdaplar | İncelik, aldatma |
| **Gölge** | Mor-Koyu | Sis, artçı görüntüler, karanlık | Gizem, öngörülemezlik |

> **Kritik Kural:** Elementler yalnızca kozmetiktir. Ateş Buzu yenmez. Gölge Şimşeği yenmez. Bu herhangi bir P2W element-metasının oluşmasını önler.

### 2.3 Yetenek Kademeleri

| Kademe | Şarj Süresi | Bekleme | Maks Kullanım/Maç | VFX Ölçeği | Aktivasyon |
|--------|------------|---------|-------------------|-----------|-----------|
| **Kademe 1** | 30sn aktif oyun | 15sn | 3 | Yerel (oyuncu çevresi) | Anlık |
| **Kademe 2** | 50sn aktif oyun | 25sn | 2 | Yol (oyuncu → hedef) | 0.5sn hazırlık |
| **Kademe 3** | 80sn aktif oyun | 40sn | 1 | Tam ekran sinematik | 1.0sn hazırlık |

**Kademe Dengesi:**
- Kademe 1 yetenekler sık ama mütevazı — tutarlı oyun için iyi
- Kademe 2 yetenekler etkili ve stratejik — oyunun akışını değiştirir
- Kademe 3 yetenekler muhteşem ve nadir — maç başına bir kez anlar
- Daha yüksek kademeler KESİNLİKLE daha iyi DEĞİL — kesintiye uğratılabilen daha uzun hazırlıklarla daha yüksek risk/ödül

---

## 3. Tam Yetenek Kataloğu

### 3.1 Hücum Yetenekleri (8)

| # | İsim | Element | Kademe | Açıklama | Karşılık |
|---|------|---------|--------|----------|---------|
| O1 | **Kükremeli Alev Vuruşu** | Ateş | 3 | Ateş izli yıkıcı güç şutu. +%40 şut gücü, +%25 kıvrım. | Kaleci yetenekleri, Lav Bloğu, pozisyonlama |
| O2 | **Vakum Sıfır Şutu** | Buz | 3 | Topun etrafında hava sıkışır, sonik patlamayla fırlar. +%35 şut hızı, yoldaki ilk savunmacıyı yoksayar. | Buz Duvarı, Kaleci yetenekleri |
| O3 | **Gök Gürültüsü Şutu** | Şimşek | 2 | +%30 güç ve köşelere hafif otomatik nişanla elektrikli şut. | Pozisyonlu kaleci kurtarışı, Fırtına Kalkanı |
| O4 | **Siklon Ortası** | Rüzgar | 2 | Öngörülmez şekilde kıvrılan rüzgar izli orta, müdahaleyi zorlaştırır. | Hazırlık animasyonunu okuma, savunma pozisyonu |
| O5 | **Samba Muz Vuruşu** | Rüzgar | 2 | Gökkuşağı izli aşırı kıvrımlı şuta ritmik oluşum. +%50 kıvrım. | Kaleci pozisyonu, deneyimle kıvrım okunabilir |
| O6 | **Flaş Dribling** | Şimşek | 1 | En yakın savunmacıyı geçen hız patlaması. 2 saniye +%40 hız. | Önsezi müdahalesi, takım kapama |
| O7 | **Hayalet Pas** | Gölge | 1 | Pas artçı görüntü oyalama yaratır. Alan oyuncusu mini haritada anlık görünmez. | Görsel takip (top hala görünür) |
| O8 | **Kor Vole** | Ateş | 2 | Kalede ateş patlamasıyla havadan vuruş. +%25 güç, voleyden gelirse kaleci güvenini yoksayar. | Zamanlama müdahalesi, orta kurulumuna izin verme |

### 3.2 Savunma Yetenekleri (6)

| # | İsim | Element | Kademe | Açıklama | Karşılık |
|---|------|---------|--------|----------|---------|
| D1 | **Lav Bloğu** | Ateş | 2 | Basma 5m yarıçapta kısa magma bariyeri (2sn) yaratır. Bölgeden geçen pasları ve driblingleri bloklar. | Bölgenin etrafından git, 2sn bekle, üstten aş |
| D2 | **Buz Duvarı** | Buz | 2 | İçinden geçen oyuncuları %30 yavaşlatan buz duvarı (3m genişlik, 2sn). | Etrafından git, bekle, Kademe 3 hücumla kır |
| D3 | **Fırtına Kalkanı** | Şimşek | 1 | 3m yarıçapta dribling yapan herkesi otomatik müdahale eden kısa elektrik aurası (1.5sn). | Menzile girmeden pas, uzak şut |
| D4 | **Gölge Müdahale** | Gölge | 1 | Savunmacı tahmin edilen top yoluna atılır. 1.5sn boyunca +%50 müdahale menzili. | Sahte pas, gecikmeli pas zamanlaması |
| D5 | **Fırtına Gücü** | Rüzgar | 2 | Saldırganları kaleden iten rüzgar bölgesi. 4m yarıçap, 2sn süre. | Rüzgarı şut kıvrımında kullan, takım oyunu |
| D6 | **Dondurucu Müdahale** | Buz | 1 | +%30 menzil ve müdahale edilen oyuncuda kısa yavaşlama (1sn) ile geliştirilmiş kayarak müdahale. | Müdahale mesafesinden önce pas, üstten atlama |

### 3.3 Taktik Yetenekler (8)

| # | İsim | Element | Kademe | Açıklama | Karşılık |
|---|------|---------|--------|----------|---------|
| T1 | **Flaş Adım** | Şimşek | 1 | Oyuncu hareket yönünde 5m ışınlanır. 1 savunmacıyı bypass eder. | Varış noktasını tahmin et, pas hatlarını kapat |
| T2 | **Gölge Klon** | Gölge | 2 | 3sn boyunca aktive eden oyuncunun AI kontrollü yem kopyasını yaratır. Yem paslara "alır" (top geçer). | Görsel ipuçları (klon hafif şeffaf), deneyim |
| T3 | **Rüzgar Yürüyüşü** | Rüzgar | 1 | 3sn boyunca tüm takım +%25 hareket hızı. Top hızı bonusu yok. | Top kontrolünü etkilemez; yalnızca hareket |
| T4 | **Ateş Formasyonu** | Ateş | 2 | Tüm takım arkadaşları 5sn anlık agresif formasyona geçer, sonra geri döner. Baskı oyunu zorlar. | Geri geçiş sırasında kontra atak |
| T5 | **Donmuş An** | Buz | 3 | 3sn boyunca tüm rakipleri %20 yavaşlatır. Takımınız etkilenmez. Mini zaman-bozulma efekti. | Kısa süre; önceden planla, telgraflanmış |
| T6 | **Hayalet Takas** | Gölge | 1 | En yakın takım arkadaşıyla anlık pozisyon takası. Markajı karıştırır. | Farkındalık, iletişim, top taşıyanı takip |
| T7 | **Kuyruk Rüzgarı Pası** | Rüzgar | 2 | Sonraki pas %50 daha hızlı hareket eder ve +%30 isabetli. Yalnızca bir pasa uygulanır. | Ayarlanmış müdahale zamanlaması |
| T8 | **Zincir Şimşek** | Şimşek | 2 | 3 takım arkadaşı arasında otomatik nişanlı hızlı tek dokunuş pas zinciri. 2sn sekans. | Zincirdeki herhangi bir pası kesme |

### 3.4 Kaleci Yetenekleri (4)

| # | İsim | Element | Kademe | Açıklama | Karşılık |
|---|------|---------|--------|----------|---------|
| G1 | **Cehennem Muhafızı** | Ateş | 2 | Kaleci kale boyunca ateş bariyeri yaratır (3sn). Ceza alanı dışından gelen şutları bloklar. | Önce ceza alanına dribling, veya 3sn bekle |
| G2 | **Buzul Refleks** | Buz | 2 | Sonraki 2 kurtarış girişimi için kaleci reaksiyon süresi %50 artar. Geliştirilmiş dalış menzili. | Güçlü şutlar, köşelere isabetli şutlar |
| G3 | **Gök Gürültüsü Dağıtımı** | Şimşek | 1 | Kaleci atışı/vuruşu %50 daha hızlı ve daha uzağa gider. Hızlı kontra atak yaratır. | Alıcı tarafta savunma farkındalığı |
| G4 | **Boşluk Varlığı** | Gölge | 3 | Kaleci 3sn boyunca rakibin ekranında "görünmez" olur (kalede gölge sisiyle değiştirilir). Forvetler kaleci pozisyonunu okuyamaz. | Kaleci kalıplarını ezberle, köşelere güçlü şut |

---

## 4. Yetenek Edinme ve İlerleme

### 4.1 Oyuncular Yetenekleri Nasıl Elde Eder

| Kaynak | Mevcut Yetenekler | Maliyet/Çaba |
|--------|-------------------|-------------|
| **Başlangıç Kiti** | 3 Kademe 1 yetenek (1 Hücum, 1 Savunma, 1 Taktik) | İKKD'de ücretsiz |
| **Kart Düşüşleri** | Epik+ kartlara bağlı rastgele yetenek | Paket açma |
| **Yetenek Paketleri** | Hedeflenmiş yetenek kategorisi paketleri | 🪙 2.000 Altın veya 💎 150 Elmas |
| **Sezon Kartı** | Sezon başına 2 yetenek (Ücretsiz hat: K1, Premium hat: K2) | Sezon ilerlemesi |
| **Başarım Ödülleri** | Kilometre taşları için belirli yetenekler | Oynanış dönüm noktaları |
| **Dereceli Ödüller** | Ulaşılan rütbe kademesi başına 1 yetenek | Rütbe ilerlemesi |
| **Etkinlikler** | Sınırlı etkinlik yetenekleri (aynı stat, benzersiz VFX kaplaması) | Etkinlik katılımı |
| **Takas Pazarı** | Diğer oyunculardan yetenek al/sat | Oyuncu ekonomisi |

### 4.2 Yetenek Kilit Açma Zaman Çizelgesi (F2P Yolu)

| Zaman Dilimi | Beklenen Açmalar | Kaynak |
|-------------|-----------------|--------|
| **1. Gün** | 3 Kademe 1 yetenek | Başlangıç kiti |
| **1. Hafta** | +2-3 yetenek | Günlük oyun, erken başarımlar |
| **2. Hafta** | +2 yetenek | Sezon kartı ücretsiz hat, dereceli ödüller |
| **4. Hafta** | +3-4 yetenek | Biriken altın, etkinlikler, düşüşler |
| **2. Ay** | ~12-15 yetenek | Tüm kaynakların karışımı |
| **3. Ay** | ~18-20 yetenek | Tam koleksiyona yaklaşıyor |
| **6. Ay** | 26/26 (tümü) | Tam koleksiyon başarılabilir |

> **F2P Garantisi:** Ücretsiz bir oyuncu, adanmış oyunun 6 ayı içinde TÜM 26 yeteneği edinebilir. Hiçbir yetenek kalıcı olarak ödemenin arkasında kilitli değildir.

### 4.3 Kartlara Yetenek Atama

- Her kartın **1 Yetenek Slotu** var
- Oyuncular her karta hangi yeteneği kuşanacağını **seçer**
- Yetenekler **hesap genelinde** — bir kez açıldığında herhangi bir karta kuşanılabilir
- Karttaki yeteneği değiştirmek **ücretsiz ve anlık**
- Aynı yetenek aynı anda birden fazla karta kuşanılabilir

### 4.4 Kart Kademesinin Yeteneklere Etkisi

| Kart Kademesi | Şarj Hızı Bonusu | Yetenek Etkisi | Maç Başına Kullanım |
|-------------|------------------|----------------|---------------------|
| **Normal** | +%0 (taban) | Standart | Kademe gereği |
| **Nadir** | +%5 daha hızlı şarj | Standart | Kademe gereği |
| **Epik** | +%10 daha hızlı şarj | Standart | Kademe gereği |
| **Süper** | +%15 daha hızlı şarj | Standart | Kademe gereği |
| **Efsane** | +%20 daha hızlı şarj | Standart | Kademe gereği |

> **Kritik P2W Kontrolü:** Yüksek kart kademeleri yetenekleri biraz daha hızlı şarj eder (Efsane'de maks %20), ama **yetenek etkisi aynı**. Normal kartın Kükremeli Alev Vuruşu, Efsane kartınki kadar güçlü. Tek avantaj Kademe 3 yeteneğinde ~12 saniye daha erken şarj — anlamlı ama oyun bozucu değil.

---

## 5. Maç İçi Mekanikler

### 5.1 Şarj Sistemi

**Yetenekler Nasıl Şarj Olur:**

| Şarj Yöntemi | Açıklama | Şarj Eden Aktiviteler |
|-------------|----------|----------------------|
| **Momentum** | Pozitif oyunla şarj birikir | Tamamlanan paslar (+%3), isabetli şutlar (+%5), kazanılan müdahaleler (+%4), topa sahip olma (+%1/5sn) |
| **Zaman** | Maç süresi boyunca pasif şarj | Maç süresinin her 5 saniyesi başına +%1 |
| **Olay** | Etkili olaylardan patlama şarjı | Gol atılan (+%15), asist (+%10), kurtarış (+%8), temiz müdahale zinciri (+%5) |

### 5.2 Aktivasyon Akışı

```
1. Şarj ölçer dolar → Yetenek ikonu parlar + titreşir
2. Oyuncu ÖY düğmesine basar → Hazırlık animasyonu başlar
3. Hazırlık süresi Kademeye bağlı (0sn / 0.5sn / 1.0sn)
4. Hazırlık sırasında: oyuncu yavaşlar, yetenek müdahaleyle KESİNTİYE UĞRATILABİLİR
5. Hazırlık sonrası: yetenek yürütülür (tam aktive olduktan sonra durdurulamaz)
6. Etki süresi uygulanır
7. Bekleme başlar
8. Bekleme sonrası: yeniden şarj başlar (kalan kullanım varsa)
```

### 5.3 Kesinti Mekaniği

| Aşama | Kesilebilir mi? | Nasıl |
|-------|----------------|-------|
| **Şarj** | Uygulanamaz (pasif) | — |
| **Düğme Basımı** | Hayır | Anlık aktivasyon başlar |
| **Hazırlık** | EVET — Yalnızca Kademe 2 ve 3 | Hazırlık sırasında müdahale, vücut temas veya çalma |
| **Yürütme** | Hayır | Hazırlığı geçtikten sonra yetenek devam eder |
| **Etki Aktif** | Bazıları beklenebilir | Sürenin bitmesini bekle |
| **Bekleme** | Uygulanamaz | Pasif zamanlayıcı |

**Kesinti Ödülü:** Rakibin yetenek hazırlığını başarıyla kesmek kendi yeteneğinize +%10 şarj verir. Agresif oyun için risk-ödül.

### 5.4 Çoklu Yetenek Yönetimi

Takımınızdaki 6 oyuncuyla maç sırasında 6 yeteneği yönetirsiniz:
- Yalnızca **şu an kontrol ettiğiniz oyuncunun** yeteneğini aktive edebilirsiniz
- Oyuncu kontrolünü değiştirmek onların yeteneğine erişmenizi sağlar
- AI kontrollü takım arkadaşları **asla** otomatik yetenek aktive etmez (yalnızca oyuncu kararı)
- Hızlı seçim: HUD'daki oyuncu portresine çift dokunma ile değiştir + aktive et

### 5.5 Maç Evre Dinamikleri

| Maç Evresi | Yetenek Davranışı |
|-----------|-------------------|
| **0:00-1:00** | Yetenek mevcut değil (şarj dönemi) |
| **1:00-3:00** | Kademe 1 yetenekler hazır olmaya başlar |
| **2:00-4:00** | Kademe 2 yetenekler hazır olmaya başlar |
| **3:30-4:30** | Kademe 3 yetenekler potansiyel olarak hazır (nadir, yüksek performans gerektirir) |
| **Son 30 saniye** | Tüm şarj oranları +%25 (heyecanlı bitişler için "Momentum Dalgası") |
| **Uzatma** | Şarj oranları +%50, bekleme süreleri -%25 (yüksek yoğunluklu uzatma) |

---

## 6. Denge Çerçevesi

### 6.1 Denge Felsefesi

> **"Bir yetenek öne çıkan an gibi hissettirmeli, beklenti gibi değil. En iyi oyuncu kazanır, en iyi yetenek değil."**

### 6.2 Güç Bütçesi Sistemi

Her yeteneğin şu boyutlara dağıtılmış **100 puanlık Güç Bütçesi** vardır:

| Boyut | Açıklama | Aralık |
|-------|----------|--------|
| **Etki** | Yeteneğin oyun durumunu ne kadar değiştirdiği | 10-40 |
| **Süre** | Etkinin ne kadar sürdüğü | 5-30 |
| **Menzil** | Etki alanı veya mesafe | 5-25 |
| **Hız** | Yeteneğin ne kadar hızlı sonuçlandığı | 5-25 |
| **Bekleme Toparlanması** | Beklemenin tersi (daha hızlı toparlanma = daha yüksek bütçe maliyeti) | 10-30 |

**Denge Kuralı:** Hiçbir yetenek 100 puanı aşamaz. Bir boyutu güçlendirmemiz gerekirse, başka biri orantılı olarak zayıflatılmalıdır.

### 6.3 Galibiyet Oranı İzleme

| Metrik | Hedef | Eylem Eşiği |
|--------|-------|-------------|
| **Yetenek galibiyet oranı katkısı** | %50 ±%5 | Kullanıldığı maçlarda >%55 galibiyet oranıyla ilişkilendirilen yeteneği zayıflat |
| **Yetenek seçim oranı** | Yetenek başına < %25 | Bir yetenek %25 seçim oranını aşarsa, muhtemelen çok güçlü |
| **Yeteneksiz galibiyet oranı** | ≥ %45 | Yeteneksiz oyuncular, eşit MMR'deki yetenekli rakiplere karşı maçların ≥ %45'ini kazanmalı |
| **Karşılık başarı oranı** | ≥ %30 | Her yetenek zamanın ≥ %30'unda başarıyla karşılanmalı |

### 6.4 Yama Denge Temposu

| Sıklık | Kapsam |
|--------|--------|
| **Haftalık** | Veri izleme, kritik sorunlar için acil düzeltme (>%60 galibiyet oranlı yetenek) |
| **İki Haftalık** | Küçük ayarlama (şarj/bekleme/etki değerlerinde ±%5) |
| **Aylık** | Topluluk geri bildirimi entegrasyonuyla büyük denge geçişi |
| **Sezonluk** | Yeni yetenekler eklenir (sezon başına 2-4), meta kaymaları planlanır |

### 6.5 Kar Topu Önleme Mekanikleri

| Mekanik | Açıklama |
|---------|----------|
| **Kaybeden Takım Şarj Desteği** | Geride olan takım gol farkı başına +%15 şarj oranı alır |
| **Geri Dönüş Dalgası** | 2+ gol gerideyken Kademe 2 bekleme süreleri 5sn azaltılır |
| **Yetenek Sınırı** | Maç başına oyuncu başına maks 2 yetenek, dominant oyuncuların spam yapmasını önler |
| **Paylaşılan Bekleme Grubu** | 3sn içinde 2 takım yeteneği aktive edilemez (kombo biriktirmeyi önler) |

---

## 7. Karşı Oyun Sistemi

### 7.1 Karşılık Matrisi

Her yeteneğin tanımlanmış karşılıkları var. Bu matris hiçbir yeteneğin karşılıksız kalmamasını sağlar:

| Yetenek | Sert Karşılık | Yumuşak Karşılık | Beceri Karşılığı |
|---------|-------------|-------------|------------------|
| **Kükremeli Alev Vuruşu** | Cehennem Muhafızı (bloklar), Buz Duvarı (topu yavaşlatır) | Şut açısı dışında pozisyonlama | Hazırlığı oku, sırasında müdahale et |
| **Vakum Sıfır Şutu** | Buzul Refleks (geliştirilmiş kurtarış) | Buz Duvarı (yavaşlatır) | Önsezi ve kaleci manuel pozisyonlama |
| **Gök Gürültüsü Şutu** | Fırtına Kalkanı (şuttan önce otomatik müdahale) | Kaleci pozisyonu | Otomatik nişanı oku ve kaleci önceden hareket et |
| **Flaş Dribling** | Dondurucu Müdahale (genişletilmiş menzil) | Gölge Müdahale (tahmin edilen yol) | Önsezi ve kapama |
| **Donmuş An** | Rüzgar Yürüyüşü (hız yavaşlamayı dengeler) | Flaş Adım (bireysel kaçış) | Aktive olmadan önce pozisyonlan |
| **Boşluk Varlığı** | Kükremeli Alev Vuruşu (güç köşeye zorlar) | Ezberlenen kaleci pozisyonlarına şut | Nasıl olursa olsun köşeleri nişanla |

### 7.2 Karşılık Erişilebilirliği

**Hiçbir Karşılık P2W Olmamalı:**
- Her yetenek karşılığı en az biri aracılığıyla mevcut: pozisyonlama, zamanlama, Kademe 1 yetenek veya oyun zekası
- Ücretsiz başlangıç yetenekleri 1 hücum karşılığı, 1 savunma karşılığı ve 1 taktik karşılık içerir
- Pozisyonlama ve zamanlama karşılıkları sıfır yetenek gerektirir — yalnızca beceri

### 7.3 Taş-Kağıt-Makas Kaçınması

Element tabanlı bir TKM sistemi oluşturmaktan açıkça kaçınıyoruz:
- Ateş Buzu YENMEZ
- Şimşek Rüzgarı YENMEZ
- Elementler yalnızca kozmetik/tematik
- Karşılıklar mekanik tabanlı (bloklama vuruşu yener, hız bloklamayı yener, zamanlama hızı yener)

---

## 8. Yetenek Özelleştirme ve Donanımlar

### 8.1 Donanım Sistemi

**Kart Başına Yapılandırma:**
- Her kart: 1 Yetenek Slotu (ek slot yok)
- Yetenek seçimi stratejik: yeteneğinizi oyuncunun rolüne eşleştirin

**Formasyona Göre Önerilen Donanımlar:**

| Formasyon | FW | MF | DF | GK |
|-----------|----|----|----|----|
| **2-2-1 (Dengeli)** | O1/O2 (güçlü şutlar) | T7/T3 (destek) | D1/D3 (bölge savunma) | G2 (refleks) |
| **1-2-2 (Savunma)** | O6 (hız koparma) | T8/T1 (geçişler) | D2/D5 (duvar savunma) | G1 (bariyer) |
| **2-1-2 (Orta Saha)** | O3/O5 (çeşitlilik) | T5 (tempo kontrol) | D4/D6 (müdahale) | G4 (zihin oyunu) |
| **3-1-1 (Tam Hücum)** | O1/O2/O8 (tüm hücum) | T4 (formasyon itme) | D3 (tekli savunma) | G2 (refleks) |

### 8.2 Stratejik Ödünleşimler

| Seçim | Avantaj | Ödünleşim |
|-------|---------|-----------|
| **Tümü Kademe 3** | Maks gösteri/etki | Nadiren aktive olur; kısa maçta hiç şarj olmayabilir |
| **Tümü Kademe 1** | Sık aktivasyonlar, tutarlı değer | Düşük bireysel etki |
| **Karışık Kademeler** | Dengeli risk/ödül | Daha fazla yönetim gerektirir |
| **Tümü Hücum** | Maks gol tehdidi | Rakip yeteneklere karşı savunmasız |
| **Tümü Savunma** | Kilit kapama yeteneği | Şans yaratmada zorlanır |

### 8.3 Donanım Şablonları

- Oyuncular **3 donanım şablonu** kaydedebilir (tüm 6 kart genelinde yetenek yapılandırmaları)
- Maç öncesi lobide hızlı şablon değiştirme
- Şablonlar oturumlar arası kalıcı
- Şablonlar içerir: formasyon + slot başına yetenek ataması

---

## 9. Görsel Entegrasyon

### 9.1 Yetenek Görsel Dili

Tüm yetenekler [GDD-05, Bölüm 7](art-visual-style-tr.md)'deki VFX standartlarını takip eder:

| Kademe | Ekran Kapsamı | Süre | Kamera | Ses |
|--------|--------------|------|--------|-----|
| **Kademe 1** | Yerel (3m yarıçap) | 0.5sn VFX | Normal oynanış kamerası | İnce uğultu + element SFX |
| **Kademe 2** | Yol tabanlı (oyuncu → hedef) | 1.0sn VFX | Hafif yakınlaştırma | Çarpma sesi + seyirci tepkisi |
| **Kademe 3** | Tam ekran sinematik | 1.5sn VFX | Dinamik sahne kamerası | Orkestral vurgu + stadyum patlaması |

### 9.2 Görsel Netlik Kuralları

| Kural | Uygulama |
|-------|----------|
| **Yetenek Göstergesi** | Aktivasyondan 0.5sn önce oyuncu çevresinde parlayan aura — her iki takıma da görünür |
| **Hazırlık Telgrafı** | Hazırlık sırasında element parçacıkları görünür — rakip okuyabilir ve tepki verebilir |
| **Etki Sınırları** | Bölge yetenekleri (Lav Bloğu, Buz Duvarı) net dairesel/duvar sınırları gösterir |
| **Dost/Düşman Renkleri** | Dost yetenekler: mavi ton kaplama; Düşman yetenekler: kırmızı ton kaplama |
| **Mini Harita İşaretleri** | Aktif yetenekler mini haritada element renkli titreşimler olarak gösterilir |
| **VFX Azaltma Seçeneği** | VFX yoğunluğunu azaltmak için Ayarlar açma/kapama ([GDD-06](ui-ux-design-tr.md) erişilebilirlik) |

---

## 10. GGO İlham Derinlemesine İnceleme

### 10.1 GGO Football Anime — Yetenek Eşleme

| GGO Orijinali | Project F Adaptasyonu | Değişiklikler |
|--------------|---------------------|-------------|
| **Roaring Flame Strike** | **Kükremeli Alev Vuruşu (O1)** | İkonik isim korundu; karşı oyun ve bekleme ile dengelendi |
| **Radiant Roaring Flame Strike** | O1'in kozmetik VFX varyantı | Aynı stat, geliştirilmiş VFX (etkinlik ödülü) |
| **Vacuum Zero Strike** | **Vakum Sıfır Şutu (O2)** | Buz elementi hassasiyet şutu olarak uyarlandı |
| **Accelerate Dribble** | **Flaş Dribling (O6)** | Hız patlamasına sadeleştirildi |
| **Phantom Twister Strike** | **Siklon Ortası (O4)**'nı ilham etti | Rüzgar tabanlı kıvrım orta varyantı |
| **Lobster-tail Bicycle Kick** | **Kor Vole (O8)**'yi ilham etti | Ateş elementiyle muhteşem vole |
| **Samba Banana Strike** | **Samba Muz Vuruşu (O5)** | Doğrudan adaptasyon — ritmik kıvrım şutu |

### 10.2 GGO'dan Benimsediğimiz Tasarım İlkeleri

| GGO İlkesi | Adaptasyonumuz |
|-----------|---------------|
| **Yeteneklerin dramatik isimleri var** | 26 yeteneğin hepsinde akılda kalıcı, çağrıştırıcı isimler |
| **Her karakterin imza hareketi var** | Oyuncular kart başına imza yeteneğini seçer |
| **Yetenekler "heyecan" anları yaratır** | Kademe 3 yetenekler sinematik kamera işlemi alır |
| **Takım yetenekleri mevcut** | Taktik yetenekler tüm takımı etkiler |
| **Yetenekler karşılanabilir** | Her GGO yeteneğinin savunması vardı — biz bunu resmileştiriyoruz |

### 10.3 GGO'dan Değiştirdiklerimiz

| GGO Özelliği | Neden Değiştirdik | Bizim Versiyonumuz |
|-------------|-------------------|-------------------|
| **Bazı yetenekler "ulti" ve bloklanamaz** | Nadir kartlara bağlı olsaydı P2W olurdu | Her yeteneğin karşılığı var |
| **Yetenek gücü karaktere göre değişir** | Kademeye kilitli avantajlar yaratırdı | Tüm yetenekler karttan bağımsız aynı etki |
| **Kombinasyon yetenekleri (2 oyuncu)** | Mobil için çok karmaşık; koordine etmesi zor | Yalnızca bireysel yetenekler (ama taktikler takımı etkiler) |
| **Yeteneklerin "güçlendirilmiş" versiyonları var** | Yükseltme baskısı → P2W yaratırdı | Yalnızca kozmetik VFX varyantları |

---

## 11. P2W ve Sürdürülebilirlik Değerlendirmesi

### 11.1 P2W Risk Değerlendirmesi

| Öğe | Risk Seviyesi | Değerlendirme |
|-----|-------------|-------------|
| **Yetenek etkileri kart kademesine bağlı** | ❌ HİÇ | Etkiler tüm kart kademelerinde aynı. Yalnızca şarj hızı değişir (maks %20). |
| **Yetenek erişilebilirliği** | DÜŞÜK | 26'sının tamamı 6 ayda F2P erişilebilir. 3'ü başlangıçta ücretsiz verilir. |
| **Yetenek meta hakimiyeti** | DÜŞÜK | 100 puanlık güç bütçesi eşitliği sağlar. Aylık denge yamaları. Galibiyet oranı izleme. |
| **Daha hızlı kilit açma için ödeme** | DÜŞÜK-ORTA | Balinalar daha hızlı açmak için elmasla yetenek paketi alabilir, ama hiçbir yetenek ödeme yapanlara özel değil. |
| **Şarj hızı avantajı** | ORTA | Efsane kartlar Normale göre %20 daha hızlı şarj eder. Azaltıcılar: beceri tabanlı şarj, %20 en uzun yeteneklerde ~12sn, olay tabanlı şarjla fark küçülür. |
| **Karşı oyun erişilebilirliği** | ❌ HİÇ | Tüm karşılıklar F2P yetenekler, pozisyonlama veya zamanlama ile mevcut. Ücretli karşılık yok. |

### 11.2 "Yeteneksiz Hala Geçerli" Testi

> Hiçbir kartında özel yetenek olmayan bir oyuncu, eşit MMR'deki yetenekli rakiplere karşı maçların ≥ %45'ini kazanmalıdır.

**Bunu Nasıl Sağlıyoruz:**
- Yetenekler süreli efektler (maks 3sn süre)
- Yeteneklerin yetenekli oyuncuların sömürebileceği hazırlık süreleri var
- Normal oynanış mekanikleri (pas, şut, müdahale) her zaman mevcut
- Yetenek bekleme süreleri maç süresinin %80+'ının "normal futbol" olduğu anlamına gelir
- Eşleştirme yetenek donanımını güç puanında küçük faktör olarak değerlendirir ([GDD-04](competitive-progression-tr.md))

### 11.3 Sürdürülebilirlik Analizi

| Faktör | Puan | Gerekçe |
|--------|------|---------|
| **İçerik Genişleme** | 9/10 | Sezon başına 2-4 yeni yetenek = eski yetenekleri geçersiz kılmadan her 3 ayda taze meta |
| **Kozmetik Gelir** | 8/10 | Yetenekler için VFX kaplamaları (aynı stat, farklı görseller) = sonsuz kozmetik gelir akışı |
| **Rekabetçi Bütünlük** | 9/10 | Güç bütçesi sistemi + aylık yamalar + karşılık matrisi = kararlı rekabet sahne |
| **Gösteri Değeri** | 10/10 | Yetenekler viral öne çıkan anlar yaratır → organik pazarlama → oyuncu kazanımı |
| **Beceri İfadesi** | 9/10 | Yetenek zamanlaması, seçimi ve karşı oyun temel futbol becerisini değiştirmeden derinlik ekler |
| **F2P Adaleti** | 8/10 | 6 ayda F2P tam koleksiyon; şarj hızı tek ücretli avantaj ve %20 ile sınırlı |
| **Genel Yetenek Sürdürülebilirliği** | **8.8/10** | Rekabetçi adaleti korurken derinlik ve gösteri ekleyen güçlü sistem |

### 11.4 Yetenekler Üzerinden Monetizasyon (P2W Olmayan)

| Gelir Kaynağı | Açıklama | P2W Durumu |
|-------------|----------|-----------|
| **Yetenek Paketleri** | Yetenekleri daha hızlı açmak için paket al | Yalnızca hızlandırma — özel değil |
| **VFX Kaplamaları** | Yetenekler için alternatif görsel efektler (aynı stat) | %100 Kozmetik |
| **Aktivasyon Sesleri** | Yetenek aktivasyonu için özel ses efektleri | %100 Kozmetik |
| **Yetenek İzleri** | Yetenek yürütme sırasında özel iz efektleri | %100 Kozmetik |
| **Sezonluk Varyantlar** | Sınırlı süreli VFX temaları (ör. Tatil Kükremeli Alev = şeker kamışı ateş) | %100 Kozmetik |

---

## Ek A: Yetenek Hızlı Referans Kartı

| KOD | İsim | Kat | Elem | Kademe | Şarj | Bekleme | Kullanım | Ana Karşılık |
|-----|------|-----|------|--------|------|---------|----------|-------------|
| O1 | Kükremeli Alev Vuruşu | HCM | Ateş | 3 | 80sn | 40sn | 1 | Cehennem Muhafızı |
| O2 | Vakum Sıfır Şutu | HCM | Buz | 3 | 80sn | 40sn | 1 | Buzul Refleks |
| O3 | Gök Gürültüsü Şutu | HCM | Şimşek | 2 | 50sn | 25sn | 2 | Fırtına Kalkanı |
| O4 | Siklon Ortası | HCM | Rüzgar | 2 | 50sn | 25sn | 2 | Fırtına Gücü |
| O5 | Samba Muz Vuruşu | HCM | Rüzgar | 2 | 50sn | 25sn | 2 | Kaleci kıvrım okuma |
| O6 | Flaş Dribling | HCM | Şimşek | 1 | 30sn | 15sn | 3 | Dondurucu Müdahale |
| O7 | Hayalet Pas | HCM | Gölge | 1 | 30sn | 15sn | 3 | Topu takip |
| O8 | Kor Vole | HCM | Ateş | 2 | 50sn | 25sn | 2 | Orta kurulumunu önle |
| D1 | Lav Bloğu | SVN | Ateş | 2 | 50sn | 25sn | 2 | Etrafından git / bekle |
| D2 | Buz Duvarı | SVN | Buz | 2 | 50sn | 25sn | 2 | Etrafından git / bekle |
| D3 | Fırtına Kalkanı | SVN | Şimşek | 1 | 30sn | 15sn | 3 | Menzilden önce pas |
| D4 | Gölge Müdahale | SVN | Gölge | 1 | 30sn | 15sn | 3 | Sahte pas |
| D5 | Fırtına Gücü | SVN | Rüzgar | 2 | 50sn | 25sn | 2 | Rüzgarla kıvrım |
| D6 | Dondurucu Müdahale | SVN | Buz | 1 | 30sn | 15sn | 3 | Atlama / erken pas |
| T1 | Flaş Adım | TAK | Şimşek | 1 | 30sn | 15sn | 3 | Varış noktasını tahmin et |
| T2 | Gölge Klon | TAK | Gölge | 2 | 50sn | 25sn | 2 | Oyuncuyu değil topu takip |
| T3 | Rüzgar Yürüyüşü | TAK | Rüzgar | 1 | 30sn | 15sn | 3 | Yalnızca hareket hızı |
| T4 | Ateş Formasyonu | TAK | Ateş | 2 | 50sn | 25sn | 2 | Sıfırlama sırasında kontra |
| T5 | Donmuş An | TAK | Buz | 3 | 80sn | 40sn | 1 | Kısa süre, önceden pozisyonlan |
| T6 | Hayalet Takas | TAK | Gölge | 1 | 30sn | 15sn | 3 | Top taşıyanı takip |
| T7 | Kuyruk Rüzgarı Pası | TAK | Rüzgar | 2 | 50sn | 25sn | 2 | Ayarlanmış müdahale |
| T8 | Zincir Şimşek | TAK | Şimşek | 2 | 50sn | 25sn | 2 | Zincirdeki pası kes |
| G1 | Cehennem Muhafızı | KLC | Ateş | 2 | 50sn | 25sn | 2 | Ceza alanına dribling |
| G2 | Buzul Refleks | KLC | Buz | 2 | 50sn | 25sn | 2 | Güçlü/isabetli şutlar |
| G3 | Gök Gürültüsü Dağıtımı | KLC | Şimşek | 1 | 30sn | 15sn | 3 | Savunma farkındalığı |
| G4 | Boşluk Varlığı | KLC | Gölge | 3 | 80sn | 40sn | 1 | Köşelere şut |

---

## Ek B: Denge Ayar Değişkenleri

Her yetenek canlı hizmet dengelemesi için bu ayarlanabilir parametrelere sahiptir:

| Parametre | Açıklama | Ayarlama Aralığı |
|-----------|----------|-----------------|
| `sarjSuresi` | Tam şarj için temel süre | ±%20 |
| `bekleme` | Kullanımdan sonra yeniden şarjdan önceki süre | ±%30 |
| `etkiSuresi` | Etkinin ne kadar sürdüğü | ±%25 |
| `etkiBuyuklugu` | Etkinin gücü (ör. % hız artışı) | ±%15 |
| `aoeYaricap` | Etki alanı yarıçapı | ±%20 |
| `hazirlikSuresi` | Telgraf/hazırlık süresi | ±%50 |
| `macBasinaKullanim` | Maç başına maks aktivasyon | ±1 |
| `kesintiPenceresi` | Hazırlık sırasında yeteneğin ne kadar süreyle kesilebileceği | ±0.3sn |

---

*Bu doküman Project F için tam Özel Yetenekler ve GGO Sistemini tanımlar. Tüm yetenekler, denge parametreleri ve karşı oyun mekanikleri bu spesifikasyonlara uymalıdır. Denge değişiklikleri veri odaklı gerekçe ve Oyun Tasarımcısı onayı gerektirir.*

*Sonraki Doküman: [GDD-08: LiveOps ve Sezonlar](liveops-seasons-tr.md)*
