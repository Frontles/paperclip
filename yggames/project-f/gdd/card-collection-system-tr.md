# Project F — Kart & Koleksiyon Sistemi Tasarım Dokümanı

**Doküman Kodu:** GDD-02
**Versiyon:** 1.0
**Tarih:** 17 Mart 2026
**Yazar:** Game Designer Agent, YG Games
**Durum:** Taslak
**Dayanak:** [GDD-00 Rakip Analizi](docs/00-competitor-analysis-en.md) | [GDD-01 Temel Oyun Tasarımı](core-game-design-tr.md)

---

## İçindekiler

1. [Sistem Genel Bakış](#1-sistem-genel-bakış)
2. [Kart Türleri](#2-kart-türleri)
3. [Nadirlik Sistemi](#3-nadirlik-sistemi)
4. [İsim & Yüz Kişiselleştirmesi](#4-isim--yüz-kişiselleştirmesi)
5. [Kart Birleştirme & Yükseltme Sistemi](#5-kart-birleştirme--yükseltme-sistemi)
6. [Özel Yetenekler](#6-özel-yetenekler)
7. [Koleksiyon & Albüm İlerlemesi](#7-koleksiyon--albüm-ilerlemesi)
8. [Kart Yaşam Döngüsü & Ekonomi](#8-kart-yaşam-döngüsü--ekonomi)
9. [P2W Dengesi & Sürdürülebilirlik Değerlendirmesi](#9-p2w-dengesi--sürdürülebilirlik-değerlendirmesi)

---

## 1. Sistem Genel Bakış

### 1.1 Tasarım Felsefesi

Kart & Koleksiyon Sistemi, **Project F'in ilerleme omurgasıdır.** Her maç kartlarla oynanır. Her ödül bir kart veya kartlara yönelik para birimidir. Oyuncu kimliğinin her ifadesi kart sistemi üzerinden akar.

**Üç Sütun:**

| Sütun | İlke | Tasarım Hedefi |
|-------|------|----------------|
| **Kimlik** | Kartlar sadece toplanan varlıklar değil, kişisel yaratımlardır | İsim, yüz, biyografi kişiselleştirmesi her kartı sahibine özgü kılar |
| **Adalet** | Kartlar anlamlı ama yetenek ile aşılamaz avantajlar yaratır | Süper'de kısıtlanmış, yumuşak güç tavanı, yetenek:cüzdan = 70:30 |
| **Değer** | Her kartın değeri var — "çöp kart" yok | Birleştirme, geri dönüşüm, koleksiyon bonusları ve takas tüm kartların bir amaca hizmet etmesini sağlar |

### 1.2 Temel Kararlar (GDD-01'den)

Bu kararlar Temel Oyun Tasarımı'nda belirlenmiştir ve tartışılmaz:

- **5 nadirlik katmanı** (Normal, Özel, Nadir, Uzman, Süper) — **Efsane katmanı YOK**
- **Başarısızlık korumalı birleştirme** — kartlar başarısızlıkta asla yok edilmez
- **Yayınlanan ihtimaller** — tüm düşme oranları ve birleştirme olasılıkları görünür
- **Sezon sıfırlaması** — tüm oyuncu kartları sıfırlanır; kozmetikler, para birimi ve kişiselleştirme setleri aktarılır
- **Enerji sistemi yok** — sınırsız oynama oturumları

**Referans:** Kart sistemi tasarım ilkeleri — [Gacha Sistemi Nasıl Tasarlanır](https://mobilefreetoplay.com/design-gacha-system/) | [Güçlü Gacha Tasarımı](https://www.deconstructoroffun.com/blog/2017/8/31/designing-a-strong-gacha) | [Mobil Oyunlarda Koleksiyon Sistemleri](https://www.blog.udonis.co/mobile-marketing/mobile-games/collection-systems-mobile-games)

---

## 2. Kart Türleri

### 2.1 Genel Bakış

Project F'te **üç kart kategorisi** vardır, her biri farklı bir oynanış rolüne hizmet eder:

```
┌─────────────────────────────────────────────────┐
│              KART KATEGORİLERİ                  │
│                                                 │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐      │
│  │ OYUNCU   │  │ MENAJER  │  │  TAKIM   │      │
│  │ KARTLARI │  │ KARTLARI │  │ KARTLARI │      │
│  │          │  │          │  │          │      │
│  │ Kadro    │  │ Kadro    │  │ Kadro    │      │
│  │ başına 6 │  │ başına 1 │  │ başına 1 │      │
│  │          │  │          │  │          │      │
│  │ Statlar, │  │ Pasif    │  │ Görsel   │      │
│  │ Yetenekl.│  │ Bonuslar,│  │ Kimlik,  │      │
│  │ Roller   │  │ Taktikler│  │ Kimya    │      │
│  └──────────┘  └──────────┘  └──────────┘      │
└─────────────────────────────────────────────────┘
```

### 2.2 Oyuncu Kartları

Oyuncu kartları **temel oynanış birimidir.** Her biri 6v6 sahadaki bir futbolcuyu temsil eder.

**Kart Anatomisi:**

```
┌─────────────────────────────────┐
│ [Nadirlik Kenarlık Rengi]       │
│                                 │
│  ┌─────────┐   İSİM: "Yıldız" │
│  │  YÜZ    │   POZİSYON: FV   │
│  │  SETİ   │   KATMAN: Uzman  │
│  │  #47    │   SEVİYE: 23/30  │
│  └─────────┘                    │
│                                 │
│  GNL: 82                        │
│                                 │
│  HIZ: 78  ŞUT: 85  PAS: 72     │
│  ÇLM: 80  DEF: 45  FİZ: 70    │
│                                 │
│  ⚡ YETENEK: Kızgın Alev        │
│     Vuruşu (Sv.2)              │
│                                 │
│  BİYO: "Gözleri kaleyi gören  │
│  doğuştan golcü."             │
│                                 │
│  [Kişiselleştirme Rozeti]      │
└─────────────────────────────────┘
```

**Oyuncu Kartı Statları:**

| Stat | Kısaltma | Açıklama | Etkiler |
|------|----------|----------|---------|
| **Hız** | HIZ | Hareket hızı, ivme, sprint dayanıklılığı | Tüm pozisyonlar; SK/SĞK için kritik |
| **Şut** | ŞUT | Şut gücü, isabet, falso, vole | FV için kritik; OS için faydalı |
| **Pas** | PAS | Kısa pas isabeti, ara pas ağırlığı, orta kalitesi | OS için kritik; herkes için faydalı |
| **Çalım** | ÇLM | Top kontrolü, beceri hareketleri, baskı altında yakın kontrol | Kanatlar ve FV için kritik |
| **Savunma** | DEF | Müdahale, kesme, markaj, pozisyon alma | DF için kritik; OS için faydalı |
| **Fiziksel** | FİZ | Dayanıklılık, güç, hava topu yeteneği, sakatlık direnci | Herkes için faydalı; DF/FV için kritik |

**Genel Puan (GNL) Hesaplaması:**
- GNL = Pozisyona göre ağırlıklı ortalama
- FV: ŞUT(%30) + HIZ(%25) + ÇLM(%20) + PAS(%10) + FİZ(%10) + DEF(%5)
- OS: PAS(%30) + ÇLM(%20) + FİZ(%15) + ŞUT(%15) + HIZ(%10) + DEF(%10)
- DF: DEF(%35) + FİZ(%25) + HIZ(%15) + PAS(%15) + ÇLM(%5) + ŞUT(%5)
- KL: Özel statlar kullanır (Dalış, Tutma, Pozisyon, Refleks, Vuruş, FİZ)

### 2.3 Menajer Kartları

Menajer kartları tüm kadroya **pasif taktiksel bonuslar** sağlar. Kadro başına bir menajer kartı takılır.

| Özellik | Açıklama |
|---------|----------|
| **Taktiksel Tarz** | Hücum / Dengeli / Savunma — kontrol edilmeyen oyuncuların YZ davranışını etkiler |
| **Diziliş Bonusu** | Menajerin tercih ettiği diziliş kullanıldığında tüm statlara +%3 |
| **Uzmanlık Artışı** | Tüm oyuncular için bir stat kategorisi +%5 artırılır (ör. "Pas Uzmanı" = +%5 PAS) |
| **Dayanıklılık Yönetimi** | Takım için Yavaş / Normal / Hızlı dayanıklılık toparlanma hızı |
| **Devre Arası Morali** | İkinci yarıda +%1 / +%2 / +%3 stat artışı (motivasyon konuşmasını simüle eder) |

**Menajer Kartı Nadirliği:**

| Katman | Diziliş Bonusu | Uzmanlık Artışı | Dayanıklılık | Devre Arası Morali |
|--------|---------------|-----------------|--------------|-------------------|
| Normal | +%1 | +%2 | Yavaş | +%1 |
| Özel | +%2 | +%3 | Normal | +%1 |
| Nadir | +%2 | +%4 | Normal | +%2 |
| Uzman | +%3 | +%4 | Hızlı | +%2 |
| Süper | +%3 | +%5 | Hızlı | +%3 |

> **P2W Kontrolü:** Menajer bonusları kasıtlı olarak küçük (tek statta maks +%5). Normal ve Süper menajer arasındaki fark fark edilir ama oyun belirleyici değil.

### 2.4 Takım Kartları

Takım kartları kadronun **görsel ve yapısal kimliğini** temsil eder. Kadro başına bir takım kartı takılır.

| Özellik | Açıklama |
|---------|----------|
| **Forma Tasarımı** | İç saha ve deplasman forma görünümü (renkler, desenler, sponsor alanı) |
| **Stadyum Teması** | İç saha maçları için görsel arka plan (çim tipi, tribünler, atmosfer efektleri) |
| **Takım Amblemi** | Formalarda ve maç yükleme ekranında gösterilir |
| **Kimya Tarzı** | Kimya bonuslarının nasıl hesaplandığını tanımlar (bkz. §2.5) |
| **Takım Kutlaması** | Paylaşılan takım gol kutlama animasyonu |

> **P2W Kontrolü:** Takım kartları Kimya Tarzı dışında %100 kozmetiktir. Kimya Tarzları oyun içi ilerlemeyle kazanılabilir ve rekabetçi dengeyi bozmayan küçük bonuslar sağlar.

### 2.5 Kimya Sistemi

Kimya, en yüksek puanlı kartları rastgele yığmak yerine **tematik olarak tutarlı bir kadro** kurmayı ödüllendirir.

**Kimya Bağlantıları:**

| Bağlantı Türü | Koşul | Bonus |
|---------------|-------|-------|
| **Pozisyon Bağlantısı** | İki komşu oyuncu doğal pozisyonlarında | Bağlantı başına +1 Kimya |
| **Tarz Bağlantısı** | İki komşu oyuncu aynı oyun tarzı etiketini paylaşır (ör. "Hızlı Kanat," "Yaratıcı") | Bağlantı başına +1 Kimya |
| **Menajer Bağlantısı** | Oyuncunun pozisyonu menajerin tercih ettiği diziliş slotuna uyar | Oyuncu başına +1 Kimya |
| **Takım Bağlantısı** | Oyuncu takım kartının kimya tarzına uyar | Oyuncu başına +1 Kimya |

**Kimya Seviyeleri:**

| Kimya | Seviye | Etki |
|-------|--------|------|
| 0-5 | Zayıf | Tüm statlara -%5 |
| 6-10 | Ortalama | Bonus veya ceza yok |
| 11-15 | İyi | Birincil statlara +%3 |
| 16-20 | Mükemmel | Birincil statlara +%5 |
| 21+ | Kusursuz | Birincil statlara +%7 + görsel aura efekti |

> **Tasarım Amacı:** Kimya, en iyi takımın her zaman en yüksek puanlı 6 kart olduğu "tüm yıldızlar" sorununu engeller. Oyuncular sinerji hakkında düşünmeli, kadro kurmada stratejik derinlik yaratır.

---

## 3. Nadirlik Sistemi

### 3.1 Nadirlik Katmanları

| Katman | Türkçe Ad | Kenarlık Rengi | Kart Arka Planı | Görsel Efektler |
|--------|-----------|---------------|-----------------|-----------------|
| **Normal** | Normal | Gri | Mat gri | Yok |
| **Özel** | Özel | Yeşil | Hafif parıltı | Statlarda sönük parıldama |
| **Nadir** | Nadir | Mavi | Metalik mavi | Animasyonlu kenarlık nabzı |
| **Uzman** | Uzman | Mor | Derin mor gradyan | Kart kenarlarında parçacık efektleri |
| **Süper** | Süper | Altın | Holografik efektli animasyonlu altın | Yetenek önizlemeli tam animasyonlu kart |

**Referans:** Kart nadirlik görsel sistemleri — [FUT Oyuncu Kartları](https://www.fifplay.com/encyclopedia/fut-player-cards/) | [EA Sports FC 26 Nadirlikleri](https://www.fut.gg/rarities/)

### 3.2 Nadirliğe Göre Stat Aralıkları

| Katman | Stat Aralığı (stat başına) | GNL Aralığı | Maks Toplam Statlar |
|--------|--------------------------|-------------|---------------------|
| Normal | 40-60 | 45-58 | 330 |
| Özel | 55-72 | 58-68 | 396 |
| Nadir | 65-82 | 68-78 | 456 |
| Uzman | 75-90 | 78-87 | 510 |
| Süper | 82-95 | 87-93 | 555 |

**Temel Kısıtlama — Yumuşak Güç Tavanı:**

Normal (maks 330 toplam) ile Süper (maks 555 toplam) arasındaki stat farkı yaklaşık **+%68'dir.** Bu büyük gibi görünüyor ama 6 stata dağıtılır ve kimya, yetenekler ve oyuncu becerisiyle değiştirilir.

**Goley ile Karşılaştırma:**
- Goley'in Efsane vs. Normal farkı: Anahtar statlarda **+%200-300** — ücretsiz oyuncuları çaresiz bıraktı
- Project F'in Süper vs. Normal farkı: **Toplamda +%68** — fark edilir avantaj ama yetenekli bir Normal oyuncu, zayıf yetenekli bir Süper oyuncuyu alt edebilir

**"3 Katman Rekabet Penceresi":**
Rekabet penceresinin **en az 3 katmanı** kapsaması için tasarım yapıyoruz. Kusursuz Kimyalı ve yetenekli kontrollerle Nadir katman bir takım, Ortalama Kimyalı ve vasat yetenekli bir Uzman katman takıma karşı rekabetçi olmalıdır.

### 3.3 Seviye Atlama Sistemi

Her kart maçlardan XP kazanır ve katmanı içinde seviye atlayabilir:

| Katman | Maks Seviye | Seviye Başına Stat Artışı | Maks'ta Toplam Artış |
|--------|------------|--------------------------|---------------------|
| Normal | 10 | Stat başına +1,0 | Stat başına +10 |
| Özel | 15 | Stat başına +0,8 | Stat başına +12 |
| Nadir | 20 | Stat başına +0,7 | Stat başına +14 |
| Uzman | 25 | Stat başına +0,6 | Stat başına +15 |
| Süper | 30 | Stat başına +0,5 | Stat başına +15 |

> **Tasarım Notu:** Yüksek katmanlarda seviye başına azalan getiri var. Bu, tepede güç artışını önler ve Normal bir kartı maksimuma çıkarmanın anlamlı iyileşme sağlamasını garanti eder.

### 3.4 Düşme Oranları (Yayınlanmış)

**Standart Paket:**

| Katman | Düşme Oranı |
|--------|-------------|
| Normal | %50 |
| Özel | %30 |
| Nadir | %15 |
| Uzman | %4,5 |
| Süper | %0,5 |

**Premium Paket:**

| Katman | Düşme Oranı |
|--------|-------------|
| Normal | %20 |
| Özel | %35 |
| Nadir | %30 |
| Uzman | %12 |
| Süper | %3 |

**Elit Paket (Sadece sezon sonu ödülleri):**

| Katman | Düşme Oranı |
|--------|-------------|
| Normal | %0 |
| Özel | %10 |
| Nadir | %40 |
| Uzman | %35 |
| Süper | %15 |

> **Düzenleyici Geleceğe Hazırlık:** Tüm paket ihtimalleri satın alma öncesi ve ana menüden erişilebilir özel bir "Düşme Oranları" sayfasında gösterilir. Bu, Belçika, Hollanda, Güney Kore ve yaklaşan AB loot box şeffaflık düzenlemelerine uygundur.

### 3.5 Acıma Sistemi

**Genel Acıma Sayacı (Paketler Arası):**

| Katman | Acıma Eşiği | Etki |
|--------|-------------|------|
| Nadir+ | Nadir veya üstü olmadan 20 paket | Sonraki paket Nadir+ garantili |
| Uzman+ | Uzman veya üstü olmadan 50 paket | Sonraki paket Uzman+ garantili |
| Süper | Süper olmadan 150 paket | Sonraki paket Süper garantili |

Acıma sayacı tüm paket türlerinde kalıcıdır ve yalnızca o katman veya üstü bir kart çekildiğinde sıfırlanır. Sayaç, Paket Açma ekranında oyuncuya görünür.

### 3.6 Belirleyici Elde Etme (Aday Gösterme Sistemi)

eFootball'un Aday Gösterme Sözleşmelerinden ilham alarak, Project F hedefli kart edinimi için bir **Aday Gösterme Sistemi** sunar:

**Referans:** [eFootball Aday Gösterme Sözleşmesi Sistemi](https://gamingonphone.com/guides/efootball-2026-highlight-role-changers-march-2026-nominating-contract-review/)

**Nasıl Çalışır:**
1. Haftalık "Aday Gösterme Havuzu" tüm katmanlardaki 10-15 belirli kart şablonunu içerir.
2. Oyuncular tam olarak hangi kartı istediklerini seçmek için **Aday Gösterme Jetonları** (dereceli oyun, meydan okumalar ve etkinliklerle kazanılır) harcar.
3. Aday gösterilen kart, ilgili katmanın temel statlarında oluşturulur — rastgelelik yok.

**Jeton Maliyetleri:**

| Kart Katmanı | Jeton Maliyeti |
|-------------|---------------|
| Normal | 1 Jeton |
| Özel | 3 Jeton |
| Nadir | 8 Jeton |
| Uzman | 20 Jeton |
| Süper | 50 Jeton |

**Jeton Kazanma Hızı:** Aktif oyuncular için haftada ~3-5 Jeton (günlük görevler + dereceli kilometre taşları + haftalık meydan okumalar).

> **P2W Kontrolü:** Aday Gösterme Jetonları premium para birimiyle SATINALAMAZ. Yalnızca oyun içi ilerlemeyle kazanılır. Bu, Süper katman kartların bile belirleyici F2P yoluna sahip olmasını sağlar. Adanmış bir F2P oyuncu yaklaşık her 10-17 haftada bir Süper kart aday gösterebilir.

---

## 4. İsim & Yüz Kişiselleştirmesi

### 4.1 Tasarım Felsefesi

Kart kişiselleştirmesi Project F'in **duygusal farklandırıcısıdır.** Lisanslı "Ronaldo" veya "Messi" toplamak yerine oyuncular kendi efsanelerini yaratır. Her kart isimlendirilip yüz verilebilir ve kişiselleştirilebilir — genel "Oyuncu Kartı #4827"yi "Yıldız, bana üç turnuva kazandıran Alev Forvet"e dönüştürür.

### 4.2 İsim Sistemi

**İsim Atama:**
- Her kart rastgele oluşturulmuş bir isimle gelir (kültürel çeşitliliğe sahip isim havuzundan)
- Oyuncular Kart Atölyesi'ni kullanarak **herhangi bir kartı yeniden isimlendirebilir** (ücretsiz, sınırsız yeniden isimlendirme)
- İsimler bir küfür filtresinden geçmelidir (çok dilli)
- İsim kart yüzünde, maç UI'sinde ve maç sonrası ekranlarda görünür
- Diğer oyuncular maçlarda SİZİN kart isminizi görür (kimlik ifadesinin parçası)

**Rastgele İsim Havuzu:**
- 500+ isim (Türkçe, uluslararası karışım)
- 500+ soyisim (Türkçe, uluslararası karışım)
- Birleştirme algoritması tek kadro içinde tekrarları önler
- Kültürel olarak uygun kombinasyonlar

### 4.3 Yüz Kişiselleştirmesi

**Yüz Seti Sistemi:**
- **100+ yüz seti** stil kategorilerine göre düzenlenmiş
- Her set tanımlar: saç stili, saç rengi, ten rengi, yüz hatları, sakal, aksesuarlar

**Kategoriler:**

| Kategori | Sayı | Örnekler |
|----------|------|---------|
| **Klasik** | 25 | Temiz profesyonel futbolcu görünümleri |
| **Şık** | 20 | Trend saç modelleri, aksesuarlar |
| **Sert** | 15 | İzler, yoğun ifadeler, traşlı başlar |
| **Genç** | 15 | Genç, taze yüzlü görünümler |
| **Kıdemli** | 10 | Olgun, deneyimli görünümler |
| **Benzersiz** | 15+ | Ayırt edici görünümler (mohawk, kafa bandı, maskeler, yüz boyası) |

**Kişiselleştirme Katmanları:**
1. **Temel Set:** 100+ setten birini seç (ücretsiz)
2. **Renk Ayarlamaları:** Saç rengi, ten rengi, göz rengi (ücretsiz)
3. **Aksesuarlar:** Kafa bantları, bileklikler, kramponlar, eldivenler (kozmetik ödüller / premium)
4. **İfade:** Maç sırasında varsayılan yüz ifadesi (kararlı, neşeli, azimli, sakin)

### 4.4 Kart Biyografisi

- Her kartın bir **kısa biyografi alanı** var (maks 120 karakter)
- Oluşturulduğunda rastgele şablonla otomatik oluşturulur ("Gol atmak için doğdu." / "Sessiz ama ölümcül." vb.)
- Oyuncu serbestçe düzenleyebilir (küfür filtresi uygulanır)
- Biyografi kart detay ekranında ve oyuncu profilinde görünür

### 4.5 Sezonlar Boyunca Kişiselleştirme Kalıcılığı

Sezon sıfırlaması gerçekleştiğinde:
- **İsimler ve yüz setleri "Favoriler" kütüphanesine kaydedilir** (maks 50)
- Sonraki sezonda elde edilen yeni kartlara kaydedilmiş isimler/yüzler anında atanabilir
- Bu, sıfırlama döngüleri boyunca bile oyuncu kimliğini korur
- Özel biyografiler de kütüphaneye kaydedilir

---

## 5. Kart Birleştirme & Yükseltme Sistemi

### 5.1 Sistem Genel Bakışı

Kart birleştirme **birincil dikey ilerleme yoludur.** Oyuncular kartları birleştirerek potansiyel olarak daha yüksek katman kartlar yaratır, başarısızlıkta asla kart kaybıyla cezalandırmayan korumalı bir sistem kullanır.

```
BİRLEŞTİRME AKIŞI:

  [Kart A] + [Kart B] ──→ [Birleştirme Denemesi]
  (Aynı katman gerekli)       │
                               ├─→ BAŞARI: Aynı veya daha yüksek katmanda yeni kart
                               │           (Daha yüksek katman = şanslı yükseltme!)
                               │
                               └─→ BAŞARISIZLIK: Her iki kart değişmeden geri döner
                                                + Birleştirme XP'si verilir
                                                + Acıma sayacı ilerler
```

### 5.2 Birleştirme Kuralları

| Kural | Detay |
|-------|-------|
| **Aynı Katman Gerekli** | Her iki girdi kartı aynı nadirlik katmanında olmalı |
| **Aynı Pozisyon Gerekli Değil** | Herhangi bir pozisyon herhangi bir pozisyonla birleştirilebilir |
| **Çıktı Pozisyonu** | Oyuncu hangi girdi kartının pozisyonunu çıktının miras alacağını seçer |
| **Çıktı Statları** | Çıktı katmanının temel statları + hafif rastgele varyans |
| **Kişiselleştirme** | Çıktı kartı isimsiz/yüzsüz başlar — oyuncu kişiselleştirmeli (veya otomatik oluşturmalı) |
| **Yetenek Mirası** | Girdi kartlarından birinin yeteneği varsa, çıktının miras alma şansı %50; aksi halde boş başlar |
| **Seviye Sıfırlama** | Çıktı kartı katmanının Seviye 1'inde başlar |

### 5.3 Birleştirme Başarı Oranları (Yayınlanmış)

| Birleştirme | Aynı Katman Çıktısı | Katman Atlamalı Çıktı | Acıma Eşiği |
|-------------|---------------------|----------------------|-------------|
| Normal + Normal | %80 (→ Normal) | %20 (→ Özel) | 2 başarısızlık |
| Özel + Özel | %70 (→ Özel) | %30 (→ Nadir) | 3 başarısızlık |
| Nadir + Nadir | %65 (→ Nadir) | %35 (→ Uzman) | 4 başarısızlık |
| Uzman + Uzman | %75 (→ Uzman) | %25 (→ Süper) | 5 başarısızlık |

### 5.4 Birleştirme XP Sistemi

Başarısız birleştirmeler boşa gitmez — **Birleştirme XP'si** üretir:

| Başarısız Birleştirme Katmanı | Kazanılan Birleştirme XP |
|------------------------------|-------------------------|
| Normal | 10 BXP |
| Özel | 25 BXP |
| Nadir | 60 BXP |
| Uzman | 150 BXP |

**Birleştirme XP Harcama:**

| Satın Alma | Maliyet |
|-----------|---------|
| Garantili Aynı Katman Birleştirme (Normal) | 30 BXP |
| Garantili Aynı Katman Birleştirme (Özel) | 75 BXP |
| Garantili Aynı Katman Birleştirme (Nadir) | 180 BXP |
| Garantili Aynı Katman Birleştirme (Uzman) | 450 BXP |
| Garantili Katman Atlama (herhangi katman) | Aynı katman maliyetinin 3 katı |

> **Tasarım Amacı:** Bu, her birleştirme denemesinin, başarılı veya değil, garantili ilerlemeye katkıda bulunduğu bir "israf yok" ekonomisi yaratır.

### 5.5 Kart Geri Dönüşümü

Birleştirme için gerekli olmayan kartlar kaynaklar için **geri dönüştürülebilir:**

| Kart Katmanı | Altın Değeri | XP Parçaları | Birleştirme XP |
|-------------|------------|-------------|----------------|
| Normal | 50 Altın | 10 | 5 BXP |
| Özel | 150 Altın | 30 | 12 BXP |
| Nadir | 500 Altın | 80 | 30 BXP |
| Uzman | 1.500 Altın | 200 | 75 BXP |
| Süper | 5.000 Altın | 500 | 200 BXP |

> **Goley Dersi:** Goley'de düşük katman kartlar değersiz ("çöp") oluyordu. Project F'te her kartın net bir değeri var: birleştir, altın/BXP/XP Parçaları için geri dönüştür, koleksiyona katkıda bulun veya takas et. Sıfır çöp kart.

---

## 6. Özel Yetenekler

### 6.1 Yetenek Mimarisi

Her oyuncu kartının **bir yetenek slotu** vardır. Yetenekler ayrı öğelerdir — takılabilir, çıkarılabilir ve kartlar arasında transfer edilebilir.

### 6.2 Yetenek Katmanları

Yeteneklerin kendi katman sistemi vardır (kart nadirliğinden bağımsız):

| Yetenek Katmanı | Görsel Gösterge | Şarj Hızı | Etki Gücü | Kaynak |
|-----------------|----------------|-----------|-----------|--------|
| **Bronz** | Bakır ikon | Yavaş (90 sn aktif oyun) | Temel etki | Paketler, meydan okumalar |
| **Gümüş** | Gümüş ikon | Orta (70 sn) | +%15 etki | 2 Bronz birleştir, dereceli ödüller |
| **Altın** | Altın ikon | Hızlı (50 sn) | +%30 etki | 2 Gümüş birleştir, turnuva ödülleri, etkinlikler |

> **Kritik P2W Kuralı:** Yetenek katmanları şarj hızını ve etki gücünü etkiler ama temel yetenek etkisi tüm katmanlarda aynıdır. Bronz "Kızgın Alev Vuruşu" hâlâ çalışır — sadece Altın versiyondan daha yavaş şarj olur ve biraz daha az güç artışı sağlar. Yeteneğin zamanlama ve nişanlama becerisi, katmandan çok daha önemlidir.

### 6.3 Yetenek Kategorileri

| Kategori | Sayı | Etki Türü | En İyi |
|----------|------|-----------|--------|
| **Hücum** | 8 | Şut, çalım, hareketleri güçlendir | FV, SK, SĞK |
| **Savunma** | 6 | Müdahale, blok, pozisyon almayı güçlendir | DF, KL |
| **Yaratıcılık** | 5 | Pas, vizyon, topsuz hareketi güçlendir | OS |
| **Kaleci** | 4 | Kurtarış, dalış, uzanış, pozisyon almayı güçlendir | Sadece KL |
| **Evrensel** | 3 | Dayanıklılık, hız veya bozucu efektler | Herhangi pozisyon |

**Tam Yetenek Listesi:**

**Hücum Yetenekleri:**

| # | İsim | Etki | Karşılık |
|---|------|------|---------|
| 1 | Kızgın Alev Vuruşu | Ateş izli güçlü şut, +%30 şut gücü | Kaleci yetenekleri veya pozisyon |
| 2 | Hayalet Çalım | 1,5 sn dokunulmazlık, hayalet görüntü | Çapa Müdahalesi |
| 3 | Gök Gürültüsü Vole | Havadan şutlar +%50 güç ve isabet | Sadece havadan toplarla |
| 4 | Gölge Sprinti | 3 sn 2x hız, gölge izi | %50 dayanıklılık tüketimi |
| 5 | Zehir Eğrisi | Falso şutlar 2x daha fazla eğrilir | Tahmin edilebilir eğri yönü |
| 6 | Deprem Kafa | Kafa vuruşları +%40 güç, ekran sallantısı | Sadece kafa vuruşları için |
| 7 | Serap Adımı | YZ savunmacıları şaşırtan tuzak koşu | Deneyimli oyuncular gerçek koşuyu okur |
| 8 | Kuyruklu Yıldız Koşusu | 2 sn sprint, kuyruklu yıldız izi, temasta otomatik bacak arası | Dar pencere, ağır dayanıklılık maliyeti |

**Savunma Yetenekleri:**

| # | İsim | Etki | Karşılık |
|---|------|------|---------|
| 1 | Çapa Müdahalesi | 3m menzilde kaçınılmaz müdahale | Sadece 3m'de çalışır |
| 2 | Çelik Duvar | 3 sn +%50 fiziksel, oynatılamaz vücut bloğu | Kovalayamaz, doğru pozisyonlanmalı |
| 3 | Buz Sahası | 5m yarıçapta 3 sn yavaşlatma | Sıcaklık Aurası bağışıklığı |
| 4 | Manyetik Çekim | Top 2 sn savunmacıya doğru mıknatıslanır | Sadece serbest toplarda |
| 5 | Ayna Kalkanı | Rakip yeteneğini yansıtır (iptal eder ve sizinkini şarj eder) | Sadece reaktif aktive olur |
| 6 | Kale Bölgesi | 4m alanda tüm savunmacılar 4 sn +%30 DEF | Saldırganlar dışarıdan şut atabilir |

**Yaratıcılık Yetenekleri:**

| # | İsim | Etki | Karşılık |
|---|------|------|---------|
| 1 | Yıldırım Pası | Defansları kesen yakalanamaz yer pası | Sadece yer, alıcıda kesilebilir |
| 2 | Kartal Gözü | 3 sn röntgen görüşü, tüm pozisyon ve koşuları gösterir | Rakip aktivasyondan sonra koşuları değiştirebilir |
| 3 | Zaman Bükümü Pası | Alıcıdan 0,5 sn önce ulaşan ara pas | Uzun bekleme süresi |
| 4 | Orkestra Şefi | Tüm takım arkadaşları 5 sn +%10 PAS ve +%10 HIZ | Mütevazı artış, takım uygulamasına bağlı |
| 5 | Hayalet Koşucu | Belirli takım arkadaşının YZ-mükemmel koşu yapmasını tetikle | Tek koşu, savunmacı takip edebilir |

**Kaleci Yetenekleri:**

| # | İsim | Etki | Karşılık |
|---|------|------|---------|
| 1 | Demir Duvar | 2 sn oynatılamaz kaleci, bölge şutlarını bloklar | Aşırtma şutlar üzerinden geçer |
| 2 | Refleks Dalgası | 2 sn insanüstü refleksler, menzildeki her şutu kurtarır | Dar aktivasyon penceresi |
| 3 | Graviton Tutuşu | Top 3m'den eldivenlere mıknatıslanır | Sadece şutlarda, kafa vuruşlarında değil |
| 4 | Titan Kükreyişi | 3 sn gözdağı aurası, ceza sahasındaki saldırganlara -%20 ŞUT | Yetenekleri etkilemez |

**Evrensel Yetenekler:**

| # | İsim | Etki | Karşılık |
|---|------|------|---------|
| 1 | Sıcaklık Aurası | Yavaşlatma/dondurma efektlerine bağışık + biraz daha hızlı dayanıklılık toparlanma | Hücum faydası yok |
| 2 | İkinci Nefes | Anında tam dayanıklılık yenileme | Maç başına sadece bir kez |
| 3 | Bozucu Darbe | 8m menzilde rakibin aktif yeteneğini iptal et | Sadece reaktif çalışır |

### 6.4 Yetenek Edinimi

| Kaynak | Yetenek Katmanı | Sıklık |
|--------|----------------|--------|
| **Standart Paketler** | Bronz (yaygın) | Normal çekme şansı |
| **Meydan Okuma Ödülleri** | Bronz / Gümüş | Haftalık |
| **Dereceli Kilometre Taşları** | Gümüş | Sezon kilometre taşları |
| **Turnuva Ödülleri** | Gümüş / Altın | Haftalık/sezonluk |
| **Patron Maçı Ganimetleri** | Bronz / Gümüş / Altın | Etkinlik bazlı |
| **Yetenek Birleştirme** | Gümüş (2 Bronz), Altın (2 Gümüş) | Oyuncu başlatır |
| **Aday Gösterme Sistemi** | Herhangi katman (jeton gerektirir) | Haftalık havuz |

> **P2W Kontrolü:** Altın yetenekler oyun içi ilerlemeyle kazanılabilir. Hiçbir yetenek katmanı premium satın almaların arkasına kilitli değil.

### 6.5 Yetenek Birleştirme

| Birleştirme | Sonuç | Başarı Oranı |
|-------------|-------|-------------|
| Bronz + Bronz (aynı yetenek) | Gümüş versiyon | %100 (garantili) |
| Bronz + Bronz (farklı yetenekler) | Birinin Gümüşü (oyuncunun seçimi) | %70 |
| Gümüş + Gümüş (aynı yetenek) | Altın versiyon | %100 (garantili) |
| Gümüş + Gümüş (farklı yetenekler) | Birinin Altını (oyuncunun seçimi) | %50 |

> **Yetenek yıkımı yok.** Başarısız yetenek birleştirmeleri her iki yeteneği değişmeden geri verir.

---

## 7. Koleksiyon & Albüm İlerlemesi

### 7.1 Koleksiyon Albümü

Koleksiyon Albümü, koleksiyon derinliğinin yanında genişliği de ödüllendiren bir **meta-ilerleme sistemidir.**

**Albüm Yapısı:**

| Albüm Kategorisi | Sayfalar | Tamamlama Ödülü |
|-----------------|----------|-----------------|
| **Pozisyon Ustaları** | 6 sayfa (pozisyon başına bir) | Her pozisyon için her katmandan 1 topla (30 toplam) | Özel "Pozisyon Ustası" kart kenarlığı |
| **Yetenek Ansiklopedisi** | 26 sayfa (yetenek başına bir) | Her yeteneğe en az bir kez sahip ol | Özel yetenek görsel efektleri yükseltmesi |
| **Katman Koleksiyoncusu** | 5 sayfa (katman başına bir) | Her katmandan 20 benzersiz kart topla | Katman başına Altın + Aday Gösterme Jetonları |
| **Diziliş Kütüphanesi** | 6 sayfa | Her dizilişle 10 maç kazan | Özel "Diziliş Uzmanı" unvanı aç |
| **Sezon Arşivi** | Her sezon büyür | Her sezondan en iyi takımınızı kaydeder | Oyuncu profilinde görsel kupa dolabı |

### 7.2 Koleksiyon Kilometre Taşları

| Kilometre Taşı | Ödül |
|----------------|------|
| **İlk Kart Kişiselleştirildi** | 100 Altın + Eğitim tamamlama rozeti |
| **Tam Kadro (6 kart + menajer + takım)** | 1 Standart Paket |
| **10 Benzersiz Kart** | 500 Altın |
| **25 Benzersiz Kart** | 1 Premium Paket |
| **50 Benzersiz Kart** | 1.000 Altın + 1 Aday Gösterme Jetonu |
| **100 Benzersiz Kart** | 2 Premium Paket + "Koleksiyoncu" unvanı |
| **26 Yeteneğin Tamamı Toplandı** | Altın Yetenek Seçim Kutusu (1 Altın yetenek seç) |
| **Tam Albüm Sayfası Tamamlandı** | Sayfaya özel ödül (değişken) |
| **Usta Koleksiyoncu (Albüm %100)** | Özel animasyonlu kart kenarlığı + "Usta Koleksiyoncu" unvanı |

### 7.3 Takas Sistemi

**Oyuncudan Oyuncuya Takas:**

| Kural | Detay |
|-------|-------|
| **Para Birimi** | Takaslar denge ayarlamaları olarak oyun içi Altın kullanır (gerçek para yok) |
| **Minimum Hesap Seviyesi** | Takasa erişim için Seviye 10 (bot istismarını önler) |
| **Takas Ücreti** | Transfer edilen Altın bakiyesinin %10'u sisteme gider (ekonomi batığı) |
| **Günlük Limitler** | Günde maks 5 takas (piyasa manipülasyonunu önler) |
| **Takas Önizlemesi** | Her iki oyuncu onaylamadan önce tam kart statlarını, seviyesini ve yeteneğini görür |

**Kart Kiralama:**

| Kural | Detay |
|-------|-------|
| **Kiralama Süresi** | 1, 3 veya 7 gün |
| **Kiralama Ücreti** | Kiralayan belirler (minimum 50 Altın, maksimum 5.000 Altın/gün) |
| **Kiralama Koruması** | Kiralanan kartlar birleştirilemez, geri dönüştürülemez veya takas edilemez |
| **Kiracı XP** | Kiralanan kartlarda kazanılan XP kiracının hesabına gider (karta değil) |
| **Otomatik İade** | Kart kiralama sonunda otomatik olarak sahibine döner |

> **P2W Kontrolü:** Takas ve kiralama yalnızca oyun içi para birimi kullanır. Gerçek para pazarı yok. Günlük takas limiti ve takas ücreti gerçek parayla takas yapılmasını (RMT) uygulanabilir olmaktan çıkarır.

---

## 8. Kart Yaşam Döngüsü & Ekonomi

### 8.1 Kart Giriş Noktaları

| Kaynak | Kart Türleri | Sıklık | Katman Dağılımı |
|--------|-------------|--------|-----------------|
| **Maç Ödülleri** | Oyuncu kartları | Her maç (küçük şans) | %90 Normal, %10 Özel |
| **Günlük Giriş** | Oyuncu kartları | Günlük (7. Gün = garantili) | Normal-Nadir aralığı |
| **Standart Paketler** | Oyuncu + Menajer + Yetenek | Oyun içi ilerlemeyle kazanılır | Standart düşme oranları |
| **Premium Paketler** | Oyuncu + Menajer + Yetenek | Premium para birimi veya başarımlar | Premium düşme oranları |
| **Elit Paketler** | Oyuncu + Menajer + Yetenek | Sadece sezon sonu ödülleri | Elit düşme oranları |
| **Aday Gösterme Sistemi** | Belirli hedefli kart | Haftalık (jeton kapılı) | Oyuncunun katman seçimi |
| **Etkinlik Ödülleri** | Temalı etkinlik kartları | Etkinlikler sırasında | Etkinliğe göre değişir |
| **Turnuva Ödülleri** | Oyuncu + Yetenek | Haftalık/sezonluk | Daha yüksek yerleşim için daha yüksek katmanlar |
| **Takas** | Herhangi kart türü | Oyuncu tarafından başlatılır | Takas edilen her ne ise |

### 8.2 Kart Çıkış Noktaları

| Çıkış | Etki | Amaç |
|-------|------|------|
| **Birleştirme** | 2 kart tüketilir → 1 üretilir (net -1) | Birincil kart batığı |
| **Geri Dönüşüm** | Kart yok edilir → Altın + BXP + XP Parçaları | İkincil kart batığı, kaynak üretimi |
| **Sezon Sıfırlaması** | TÜM oyuncu kartları tüm hesaplardan kaldırılır | Her 3 ayda ekonomi tam yenileme |
| **Yetenek Birleştirme** | 2 yetenek tüketilir → 1 üretilir (net -1) | Yetenek ilerleme batığı |
| **Takas Vergisi** | Takaslar üzerinde %10 Altın vergisi | Para birimi batığı |

### 8.3 Ekonomi Denge Hedefleri

| Metrik | Hedef | İzleme |
|--------|-------|--------|
| **Oyuncu Başına Ekonomideki Kartlar** | Herhangi zamanda 30-50 | Sezonluk ort. |
| **Ortalama Kadro GNL** | Sezon ortası 65-75, sezon sonu 75-85 | Haftalık takip |
| **İlk %1 Kadro GNL** | Maks 90-93 (teorik Süper maks) | Tavan uygulama |
| **Birleştirme Oranı** | Oyuncu başına haftada 3-5 birleştirme | Aktivite metriği |
| **Geri Dönüşüm Oranı** | Oyuncu başına haftada 5-10 kart | Ekonomi batığı metriği |
| **Normal:Süper Ekonomi Oranı** | Sezon başında 100:1, sezon sonunda 50:1 | Nadirlik bütünlüğü |

### 8.4 Sezon Sıfırlama Akışı

```
SEZON SONU
    │
    ▼
┌────────────────────────┐
│ Ödülleri Hesapla        │
│ - MMR dilimi paketi    │
│ - Oynama süresi bonusu │
│ - Başarım bonusları    │
└────────────┬───────────┘
             │
             ▼
┌────────────────────────┐
│ Sezonu Arşivle         │
│ - En iyi takım anlık   │
│   görüntüsü            │
│ - Sezon stat kaydı     │
│ - Başarım kaydı        │
└────────────┬───────────┘
             │
             ▼
┌────────────────────────┐
│ Tüm Oyuncu Kartlarını  │
│ Kaldır                 │
│ - Kartlar havuza döner │
│ - Menajer kartları döner│
│ - Takım kartları KALIR │
│ - Yetenekler KALIR     │
└────────────┬───────────┘
             │
             ▼
┌────────────────────────┐
│ Sıfırlama Paketlerini  │
│ Dağıt                  │
│ - Son MMR'ye dayalı    │
│ - Oynama süresi bonusu │
│ - Sadakat çarpanı      │
│   (oynanan sezonlar)   │
└────────────┬───────────┘
             │
             ▼
┌────────────────────────┐
│ Yeni Sezon Başlar      │
│ - Taze kartlar         │
│ - Kayıtlı isim/yüz    │
│   setleri mevcut       │
│ - MMR yumuşak sıfırlama│
│ - Yeni Aday Gösterme   │
│   Havuzu               │
└────────────────────────┘
```

**Sezonlar Boyunca Korunanlar:**

| Korunan | Korunmayan |
|---------|-----------|
| Hesap seviyesi, başarımlar | Oyuncu kartları (tüm katmanlar) |
| Altın, Elmas | Menajer kartları |
| Takım kartları (kozmetik) | Kart seviyeleri ve statları |
| Yetenekler (öğeler) | Birleştirme XP bakiyesi |
| İsim/Yüz favorileri | Aday Gösterme Jetonları |
| Açılmış dizilişler | MMR (yumuşak sıfırlama) |
| Koleksiyon Albümü ilerlemesi | Acıma sayaçları |
| Kozmetik satın almalar | - |

> **Neden yetenekler kalır ama kartlar kalmaz?** Yetenekler öğrenilmiş becerileri temsil eder — bilginin kalması mantıklıdır. Kartlar takım gücünü temsil eder — sıfırlamak rekabetçi ortamı taze tutar ve yine de sadık oyuncuları sıfırlama paket kalitesiyle ödüllendirir.

---

## 9. P2W Dengesi & Sürdürülebilirlik Değerlendirmesi

### 9.1 Sistem Seviyesi P2W Skor Kartı

| Sistem | P2W Vektörü | Azaltma | Risk |
|--------|-----------|---------|------|
| **Kart Katmanları** | Yüksek katman = daha güçlü statlar | Maks +%68 fark (%200+ değil), 3 katman rekabet penceresi | ⚠️ Orta |
| **Kart Birleştirme** | Premium paketler → daha fazla birleştirme malzemesi | Yayınlanan ihtimaller, acıma sistemi, başarısızlık koruması | ✅ Düşük |
| **Menajer Kartları** | Süper menajer Normal'ın +%2'sine karşı +%5 | %3 fark marjinal; tek başına menajer maç kazanmaz | ✅ Düşük |
| **Kimya** | Balina Kusursuz Kimyayı daha hızlı kurabilir | Kimya düşünceyi ödüllendirir, harcamayı değil | ✅ Düşük |
| **Yetenekler** | Altın yetenekler daha hızlı şarj olur | Maç başına tek kullanımlık yeteneğe %30 etki farkı; beceri daha çok önemli | ✅ Düşük |
| **Aday Gösterme** | Jetonlar sadece oyunla kazanılır | Premium kısayol yok. Haftalık kazanımda sert tavan. | ✅ Düşük |
| **Takas** | RMT'yi etkinleştirebilir | Sadece Altın, günlük limitler, takas vergisi, hesap seviye kapısı | ⚠️ Orta |
| **Sezon Sıfırlaması** | Daha iyi oyuncular daha iyi yeniden başlama paketleri alır | Paket kalitesi MMR + oynama süresi, harcama değil | ✅ Düşük |

### 9.2 "Ücretsiz Oyuncu Testi"

**Senaryo:** Tamamen ücretsiz bir oyuncu sezon başında katılır. 4 haftalık günlük oyundan sonra (~günde 3 maç, haftada 15 maç):

| Hafta | Beklenen Kadro | Rekabetçi Seviye |
|-------|---------------|-----------------|
| 1. Hafta | 6 Normal kart, temel menajer | Bronz/Gümüş derece |
| 2. Hafta | Normal/Özel karışımı, birleştirmeden 1-2 Nadir | Gümüş derece |
| 4. Hafta | Özel/Nadir çekirdek, şanslı birleştirmelerden/aday göstermeden 1-2 Uzman | Altın derece |
| 8. Hafta | Nadir/Uzman çekirdek, aday göstermeden olası Süper | Platin erişilebilir |
| 12. Hafta (Sezon sonu) | Uzman odaklı kadro, 1-2 Süper | Beceriyle Elmas erişilebilir |

**Temel Kavrayış:** Ücretsiz oyuncunun iyi kimyalı ve yetenekli 4. hafta Nadir/Uzman takımı, bir balinanın zayıf kimyalı ve vasat yetenekli 1. hafta Süper takımını yenebilmelidir. Bu temel denge sözüdür.

### 9.3 Sürdürülebilirlik Özeti

| Faktör | Değerlendirme |
|--------|--------------|
| **İçerik Tazeliği** | Sezon sıfırlamaları + yeni Aday Gösterme havuzları + etkinlikler = sürekli yenilenme |
| **Koleksiyon Motivasyonu** | Albüm sistemi ham gücün ötesinde hedefler sağlar |
| **Kimlik Yatırımı** | Kart kişiselleştirmesi sıfırlamalardan sağ kalan duygusal bağ yaratır |
| **Ekonomik Sağlık** | Çoklu kart batıkları + sezon sıfırlama = hiperenflasyon yok |
| **Adil Rekabet** | Takım gücü eşleştirme + 3 katman rekabet penceresi = erişilebilir |
| **Harcama Değeri** | Kozmetikler sonsuza dek kalır; kart avantajları geçici = harcama adil hissediyor |
| **Yeni Oyuncu Deneyimi** | Sezon başlangıçları eşit şartlarda doğal giriş noktaları |

---

## Ek: Rakip Çapraz Referansı

| GDD Kararı | Rakip Dersi | Kaynak |
|-----------|-------------|--------|
| Efsane katmanı yok, maks Süper | Goley'in Efsane kartları dengeyi yok etti | GDD-00 §2.5 |
| Başarısızlık korumalı birleştirme | Goley başarısızlıkta kartları yok ediyordu | GDD-00 §2.3 |
| Tüm düşme oranları yayınlanmış | Goley'in gizli ihtimalleri predatördü | GDD-00 §2.4 |
| Belirleyici Aday Gösterme Sistemi | eFootball'un Aday Gösterme Sözleşmeleri gacha hayal kırıklığını azaltır | GDD-00 §5.3 |
| Oyuncu Füzyonu esinli yetenek sistemi | eFootball'un Oyuncu Füzyonu israfı önler | GDD-00 §5.3 |
| Kimya sistemi | FUT Kimyası kadro tutarlılığını ham güce karşı teşvik eder | GDD-00 §4.2 |
| Kart geri dönüşümü/değer tabanı | Goley'de kullanımsız "çöp kartlar" vardı | GDD-00 §2.4 |
| Korumalı değerle sezon sıfırlama | eFootball sıfırlama yokluğu + FIFA Mobile 2025 dönüşü hibrit | GDD-00 §3.6, §5.6 |
| Gerçek para pazarı yok | RMT'nin oyun ekonomisini yok etmesini önler | Sektör en iyi uygulaması |
| Görünür sayaçlı acıma sistemi | Düzenleyici trend + oyuncu güveni | GDD-00 §4.3 |

---

*Bu doküman Project F için Kart & Koleksiyon Sistemini tanımlar. GDD-01 (Temel Oyun Tasarımı) ile birlikte okunmalı ve GDD-03 (Oyun Ekonomisi & Monetizasyon) için temel oluşturur.*

*Dokümanı hazırlayan: Game Designer Agent, YG Games*
*Tarih: 17 Mart 2026*
