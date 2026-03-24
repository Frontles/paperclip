# Project F — Temel Oyun Tasarım Dokümanı

**Doküman Kodu:** GDD-01
**Versiyon:** 1.0
**Tarih:** 17 Mart 2026
**Yazar:** Game Designer Agent, YG Games
**Durum:** Taslak
**Dayanak:** [GDD-00 Rakip Analizi](docs/00-competitor-analysis-en.md)

---

## İçindekiler

1. [Oyun Konsepti](#1-oyun-konsepti)
2. [6v6 Mekanikleri](#2-6v6-mekanikleri)
3. [Oyun Döngüsü](#3-oyun-döngüsü)
4. [Oyun Modları](#4-oyun-modları)
5. [Kamera Açıları](#5-kamera-açıları)
6. [Hedef Kitle](#6-hedef-kitle)
7. [Kontroller](#7-kontroller)
8. [P2W Dengesi & Sürdürülebilirlik Değerlendirmesi](#8-p2w-dengesi--sürdürülebilirlik-değerlendirmesi)

---

## 1. Oyun Konsepti

### 1.1 Üst Düzey Vizyon

**Project F**, Goley'in chibi sanat tarzının çekiciliğini ve nostaljisini modern rekabetçi oyun derinliğiyle birleştiren bir **6v6 gerçek zamanlı mobil futbol oyunudur.** Oyuncular kart tabanlı bir sistemle kadro kurar, hızlı tempolu dereceli maçlarda rekabet eder ve derin kişiselleştirme ile kendilerini ifade eder — tüm bunları katı bir **yetenek > cüzdan** felsefesiyle yapar.

> **Tek cümlelik tanım:** "Goley yeniden doğdu — sevimli, rekabetçi ve adil."

### 1.2 Benzersiz Satış Noktaları (USP)

| # | USP | Neden Önemli |
|---|-----|-------------|
| 1 | **6v6 Formatı** | Daha hızlı maçlar (~4 dk), oyuncu başına daha fazla top teması, mobil için optimize. 11v11'deki gibi yapay zekanın sahada koşmasını izleyen boş zaman yok. |
| 2 | **Modern Dokunuşlu Chibi Sanat Tarzı** | Goley bu tarzın duygusal bağ kurduğunu kanıtladı. Nostaljiyi modern shader'lar, animasyonlar ve parçacık efektleriyle birleştiriyoruz. |
| 3 | **Yetenek > Cüzdan (Her Zaman)** | Monetizasyonumuz DLS/eFootball "hafif-orta" bölgesini hedefliyor. Harcama hızlandırır, yetenek belirler. Hiçbir kart katmanı bir oyuncuyu yenilmez kılmayacak. |
| 4 | **Kart Kişilik Sistemi** | Oyuncular kartlarını isimlendirir, hazır setlerden yüz seçer, biyografi yazar. Kartlar sadece toplanan varlıklar değil, SİZİN yaratımlarınız gibi hissettiriyor. |
| 5 | **Özel Yetenekler (Anime Esinli)** | GGO Football animesinden ilham — oyun içi ilerlemeyle kazanılır, görsel olarak muhteşem ama karşılanabilir. |
| 6 | **Korumalı Sezon Sıfırlaması** | Kartlar sezon sonunda sıfırlanır, ancak ödüller MMR/oynama süresine göre ölçeklenir. Kıdemliler daha iyi paketlerle başlar. Ne Goley'in kalıcı avantaj yığma sorunu ne de FIFA Mobile'ın oyuncu kaybettiren sıfırlama problemi. |
| 7 | **Kart Takas & Kiralama** | Oyuncudan oyuncuya ekonomi. Turnuva için yıldız kart kirala, kopyaları değer karşılığı takas et. Her kartın bir değeri var. |
| 8 | **Önce Türkçe, Sonra Global** | Lansman farklandırıcısı olarak özgün Türkçe spiker ve yerelleştirme (Goley'in en sevilen özelliği), tam İngilizce ve genişletilebilir dil desteğiyle. |

### 1.3 Project F'i Farklı Kılan Ne?

**vs. Goley:** Her hatadan ders çıkarıyoruz. Sınırsız güç artışı yok, ihtimal gösterilmeyen predatör gacha yok, yıkıcı yükseltmeler yok, takım gücünü görmezden gelen eşleştirme yok. Goley'i sihirli kılan her şeyi — sanat, sevinç gösterileri, topluluk hissi — koruyoruz ve onu öldüren her şeyi çıkarıyoruz.

**vs. FIFA Mobile/FC Mobile:** Cüzdanın zaferi belirlediği OVR odaklı oynanışı reddediyoruz. 6v6 formatımız küçültülmüş bir konsol portu değil, mobil için özel olarak tasarlandı. Yıllık sıfırlama yok, 100$'lık paket yok.

**vs. eFootball:** "Yetenek önemlidir" felsefelerini karşılıyoruz ama daha hızlı, daha erişilebilir bir formatta sunuyoruz. UI/UX'imiz ilk günden cilalı olacak (eFootball'un 2022 lansman felaketi ilk izlenimlerin her şey olduğunu kanıtlıyor). Chibi tarzımız kendine özgü — realizm konusunda rekabet etmiyoruz.

**vs. DLS:** DLS'nin sahip olmadığı gerçek zamanlı PvP derinliği, sosyal sistemler ve kart kişilik sistemi ekliyoruz. 6v6 formatımız, DLS'nin geleneksel 11v11'ine karşı benzersiz bir taktiksel kimlik sunuyor.

### 1.4 Sanat Tarzı & Görsel Kimlik

**Tarz:** Goley estetiğinden ilham alan, abartılı oranlarla (büyük kafa, kompakt vücut) chibi/stilize 3D karakterler.

**Modern Geliştirmeler:**
- Saha, stadyum ve hava efektleri için PBR (Fiziksel Tabanlı Görüntüleme) materyalleri
- Forma üzerinde dinamik kumaş simülasyonu
- Chibi oranlara rağmen ifadeli yüz animasyonları (sevinç, hayal kırıklığı, kararlılık)
- Özel yetenekler, goller ve sevinçler için parçacık efektleri
- Gündüz/gece döngüsü ve hava değişimleri (yağmur, kar, gün batımı maçları)

**Referans Görseller:**
- Goley'in orijinal chibi karakterleri: [Goley Ekran Görüntüleri Galerisi](https://oyunkayit.com/goley.html)
- Goley'in 3D futbol oynanışı: [Joygame Goley Blog](https://www.joygame.com/goley/blog/)
- Modern oyunlarda chibi sanat tarzı: [Chibi Sanat Devrimi – Oyunlarda Chibi Sanat](https://medium.com/@purplebubblestudio/the-adorable-revolution-chibi-art-styles-in-video-games-777bb93d0a1a)

### 1.5 Temel Fantezi

Oyuncu fantezisi: **"Bu takımı sıfırdan kurdum. Bunlar BENİM isimlerim ve BENİM yüzlerimle BENİM oyuncularım. Onları ben yetiştirdim, yeteneklerini ben kazandım ve herkesi geçerek zirveye tırmandım."**

Bu fantezi P2W tarafından yok edilir (başkası daha iyi bir takım satın alır) ve tam sıfırlamalarla (inşa ettiğim her şey gitti). Tasarımımız bu fanteziyi her koşulda korur.

---

## 2. 6v6 Mekanikleri

### 2.1 Neden 6v6?

| Sebep | Detay |
|-------|-------|
| **Mobil Oturum Süresi** | 6v6 maçlar ~4 dakikada tamamlanır (iki 2 dakikalık devre). 11v11 ise 6-10 dakika gerektirir — mobil oturumlar için çok uzun. |
| **Oyuncu Etkisi** | Her tarafta 6 oyuncuyla herkes önemli. Yapay zekanın amaçsızca koştuğu "ölü ağırlık" pozisyonlar yok. Her top teması etkili. |
| **Taktiksel Derinlik** | Daha az oyuncu = daha net taktiksel kararlar. Dizilişler, pozisyon alma ve rol atamaları kasıtlı hissettiriyor. |
| **Ağ Performansı** | Toplam 12 oyuncu = daha az senkronize edilecek veri = mobil ağlarda daha iyi performans. Azaltılmış gecikme, daha az senkronizasyon kaybı. |
| **Başlangıç Kolaylığı** | Yeni oyuncular 6 pozisyonu 11'den çok daha hızlı öğrenebilir. Giriş engeli düşük. |

### 2.2 Saha Boyutları

| Parametre | Değer | Gerekçe |
|-----------|-------|---------|
| **Saha Boyutu** | 60m × 40m (ölçeklenmiş) | FIFA 6v6 küçük alan oyunu tavsiyelerine dayalı. 11v11'den (105m × 68m) orantılı olarak daha küçük. |
| **Kale Boyutu** | 4m × 2m (ölçeklenmiş) | Standarttan (7,32m × 2,44m) daha küçük, oyuncu sayısı ve saha ölçeğine uygun. |
| **Ceza Sahası** | 12m × 8m (ölçeklenmiş) | Sahaya orantılı; kalecilerin anlamlı bir bölgesi olmasını sağlar. |
| **Orta Daire** | 6m yarıçap | Başlangıç vuruşu konumlandırması için. |
| **Korner Yayı** | 1m yarıçap | Standart orantılı korner alanı. |

> **Görsel Not:** Saha, çoğu kamera açısında kaydırma gerektirmeden tamamen mobil ekrana sığar, böylece anında taktiksel farkındalık sağlanır.

### 2.3 Oyuncu Rolleri & Pozisyonlar

**6v6'da 5 alan oyuncusu + 1 kaleci kullanılır:**

| Pozisyon | Kısaltma | Rol Açıklaması |
|----------|----------|---------------|
| **Kaleci (GK)** | KL | Son savunma hattı. Ceza sahasını kontrol eder. Dalma/yumruklama için manuel müdahale imkanıyla yapay zeka destekli. |
| **Defans (DEF)** | DF | Merkez savunma çapası. Top kesme, blok, müdahale. Baskı ve pozisyon tutma arasında denge kurmalı. |
| **Sol Kanat (LW)** | SK | Sol tarafta geniş alan saldırganı. Genişlik sağlar, ortalar ve içeri kesme dribblinglari yapar. Hız odaklı. |
| **Sağ Kanat (RW)** | SĞK | Sağ tarafta geniş alan saldırganı. SK'nın aynası. Orta uzmanı veya ters kanat seçenekleri. |
| **Orta Saha (MID)** | OS | Merkez yaratıcı oyuncu. Savunma ile hücumu birleştirir. Pas, vizyon ve dayanıklılık anahtar. Takımın motoru. |
| **Forvet (ST)** | FV | Birincil gol tehdidi. Pozisyon alma, bitiricilik ve topsuz hareket. |

### 2.4 Dizilişler

Oyuncular 5 alan oyuncusunu dağıtan hazır dizilişlerden seçim yapar:

| Diziliş | Düzen | Oyun Tarzı |
|---------|-------|------------|
| **1-2-2** | 1 DEF, 2 OS, 2 FV | Dengeli — varsayılan. Tüm bölgelerde eşit varlık. |
| **2-1-2** | 2 DEF, 1 OS, 2 FV | Savunmacı — otobüsü park et, kontra atak çıkışlarıyla. |
| **1-1-3** | 1 DEF, 1 OS, 3 FV | Ultra hücum — ezici ofansif baskı, arkada savunmasız. |
| **2-2-1** | 2 DEF, 2 OS, 1 FV | Topa sahip olma — orta saha kontrolü, tek forvetle. |
| **1-3-1** | 1 DEF, 3 OS, 1 FV | Orta saha baskısı — merkeze hakim ol, orta saha kalitesine bağlı. |
| **3-0-2** | 3 DEF, 0 OS, 2 FV | Ultra savunma — maksimum savunma, forvetlere direkt uzun toplar. |

> **Tasarım Notu:** Dizilişler kademeli olarak açılır (1-2-2 ile başlanır, diğerleri oynanan maçlarla kazanılır). Bu bir keşif süreci yaratır ve yeni oyuncular için bilişsel yükü azaltır.

### 2.5 Maç Süresi & Akışı

| Aşama | Süre | Detaylar |
|-------|------|---------|
| **Maç Öncesi** | 15 sn | Diziliş seçimi, hızlı taktikler, takım önizlemesi. |
| **İlk Yarı** | 2:00 dk | Gerçek zamanlı oynanış. Goller ve duran toplarda saat durur. |
| **Devre Arası** | 10 sn | Diziliş/taktik ayarlaması. Oyuncu değişikliği yok (6v6'da yedek yok — tüm kartlar sahada). |
| **İkinci Yarı** | 2:00 dk | Gerçek zamanlı oynanış devam eder. |
| **Uzatma** (sadece dereceli) | 1:00 dk | Beraberlikte altın gol. |
| **Penaltı Atışları** (hâlâ berabereyse) | Karar verilene kadar | En iyi 3, sonra ani ölüm. |
| **Maç Sonu** | 15 sn | Kutlama, ödüller ekranı, kart XP dağıtımı. |
| **Toplam Oturum** | ~4-5 dk | Mobil ideal noktası içinde. |

### 2.6 Dayanıklılık Sistemi

- Her oyuncunun sprint, müdahale ve özel yetenek kullanımında azalan bir **dayanıklılık çubuğu** vardır.
- Dayanıklılık yürürken veya durunca yavaşça yenilenir.
- **Maça erişim için enerji sistemi YOK.** Oyuncular istedikleri kadar maç oynayabilir (Emir: "Enerji sistemi yok. Oyuncuları oynatsın.").
- Dayanıklılık sadece maç içidir — maçlar arasında dayanıklılık kapısı yok.

### 2.7 Özel Yetenekler (Anime Esinli)

[GGO Football anime](https://en.wikipedia.org/wiki/AI_Football_GGO) ve [Galactik Football](https://en.wikipedia.org/wiki/Galactik_Football)'dan ilham alarak, her oyuncu kartı oyun aksiyonlarıyla doldurulan bir şarj çubuğu aracılığıyla aktive edilen **bir özel yetenek** takabilir.

**Yetenek Tasarım İlkeleri:**
- **Kazanılır, Satın Alınmaz:** Yetenekler kart seviyelendirme ve oyun içi kilometre taşlarıyla açılır, asla sadece premium satın almayla değil.
- **Görsel Olarak Muhteşem:** Her yetenek parçacık efektleriyle benzersiz bir animasyona sahip (ateş izleri, şimşek auraları, buz alanları).
- **Karşılanabilir:** Her yeteneğin savunmacı bir karşılığı var. Hiçbir yetenek gol veya kurtarışı garanti etmez.
- **Dayanıklılık Maliyeti:** Yetenek kullanmak önemli miktarda dayanıklılık harcar, taktiksel denge yaratır.

**Örnek Yetenekler:**

| Yetenek | Tür | Etki | Karşılık |
|---------|-----|------|---------|
| **Kızgın Alev Vuruşu** | Hücum | Ateş izli güçlü şut, +%30 şut gücü | "Demir Duvar" veya "Refleks Dalgası" olan kaleci kurtarabilir |
| **Hayalet Çalım** | Hücum | Çalım sırasında kısa dokunulmazlık (1,5 sn), arkasında hayalet görüntü bırakır | "Çapa Müdahalesi" olan defanslar yine de kesebilir |
| **Buz Sahası** | Savunma | 5m yarıçapta tüm rakipleri 3 sn yavaşlatır | "Sıcaklık Aurası" pasifi olan oyuncular bağışık |
| **Yıldırım Pası** | Yaratıcılık | Defansları kesen yakalanamaz yer pası | Sadece yer pası olarak çalışır; alıcıda kesilebilir |
| **Demir Duvar** | Kaleci | Kaleci 2 sn boyunca yerinden oynatılamaz, bölgedeki her şutu bloklar | Aşırtma şutlar üzerinden geçebilir; tüm kaleyi kaplamaz |
| **Gölge Sprinti** | Hareket | 3 sn boyunca 2x hız patlaması, gölge izi bırakır | %50 dayanıklılık harcar; kullanım sonrası savunmasız |

> **P2W Kontrolü:** Tüm yetenekler oyun içi ilerlemeyle elde edilebilir. Yüksek katman kartlar yetenekleri daha hızlı açabilir ama ücretsiz oyuncular aynı yetenek havuzuna erişir. Yetenek gücü kart nadirliğiyle ÖLÇEKLENMEZ — Nadir karttaki "Kızgın Alev Vuruşu", Süper karttakiyle aynıdır.

---

## 3. Oyun Döngüsü

### 3.1 Temel Döngü

```
┌─────────────────────────────────────────────────┐
│                  TEMEL DÖNGÜ                    │
│                                                 │
│   OYNA ──→ KAZAN ──→ İNŞA ET ──→ REKABET ET    │
│     │         │         │           │           │
│   Maçlar   Altın      Kartlar    Dereceli       │
│   Etkinlik  XP        Birleştir  Tırman          │
│   Görevler  Paketler  Eğit       Ödüller         │
│     │         │         │           │           │
│     └─────────┴─────────┴───────────┘           │
│              ↕ (tekrarlar)                      │
└─────────────────────────────────────────────────┘
```

### 3.2 Döngü Aşamaları

**OYNA (Aksiyon Aşaması)**
- Çeşitli modlarda maç oyna (dereceli, rahat, turnuva)
- Günlük/haftalık/sezonluk görevleri tamamla
- Sınırlı süreli etkinliklere katıl

**KAZAN (Ödül Aşaması)**
- **Altın** (ücretsiz para birimi) — her maç, görev ve etkinlikten kazanılır
- **XP** — maçta oynayan tüm kartlara dağıtılır
- **Kart Paketleri** — derece kilometre taşları, etkinlik tamamlama, günlük ödüllerle kazanılır
- **Elmas** (premium para birimi) — kıt ücretsiz kaynaklar: başarımlar, sezonluk kilometre taşları, rekabetçi ödüller

**İNŞA ET (İlerleme Aşaması)**
- **Kart Seviyelendirme:** Maçlardan gelen XP kartları seviyeler, statları iyileştirir
- **Kart Birleştirme:** Aynı katmandaki iki kartı birleştir, aynı veya daha yüksek katman şansı (başarısızlık korumasıyla — bkz. §3.4)
- **Kart Kişiselleştirme:** Kartına isim ver, yüz seti seç, kısa biyografi yaz
- **Yetenek Eğitimi:** Özel yetenekleri aç ve ata
- **Diziliş & Taktik:** Farklı kurulumları dene

**REKABET ET (Hedef Aşaması)**
- ELO/MMR dereceli merdiveninde tırman
- Özel ödüller için haftalık turnuvalarda rekabet et
- Sezon sonu sıfırlama paketleri için sezonluk hedefleri kovala
- Sıralama tablolarında itibar oluştur

### 3.3 Oturum Tasarımı

| Oturum Tipi | Süre | Sıklık | İçerik |
|-------------|------|--------|--------|
| **Hızlı Oturum** | 5-10 dk | Günde birkaç | 1-2 dereceli maç + günlük ödülleri topla |
| **Standart Oturum** | 15-30 dk | Günde 1-2 | 3-5 maç + kart yönetimi + görev ilerlemesi |
| **Derin Oturum** | 30-60 dk | Haftada 2-3 | Turnuva oynama + kart birleştirme + takas + yetenek eğitimi |
| **Etkinlik Oturumu** | Değişken | Etkinlikler sırasında | Etkinliğe özel maçlar + özel ödüller |

> **Önce Mobil Tasarım:** Hızlı oturum birincil tasarım hedefidir. Her ekran <2 saniyede yüklenir. Hiçbir oturum uzun süre tek elden fazlasını gerektirmez. Eşleştirme <15 saniyeyi hedefler.

### 3.4 Kart Birleştirme (Başarısızlık Koruması)

Goley'in yıkıcı yükseltme sisteminden ders çıkararak:

| Goley'in Hatası | Project F'in Çözümü |
|----------------|---------------------|
| Başarısız yükseltmeler yatırılan kartları yok ediyordu | **Başarısızlık asla kartları yok etmez.** Başarısız birleştirme orijinal kartları geri verir. |
| Acıma sistemi yoktu | **Acıma sayacı:** Aynı katmanda 3 ardışık başarısızlıktan sonra, sonraki birleştirme garantidir. |
| Yayınlanmamış ihtimaller | **Yayınlanan ihtimaller:** Birleştirme başarı oranları onay öncesinde gösterilir. |
| Değer koruması yoktu | **Birleştirme XP Transferi:** Başarısız birleştirmeler, garantili yükseltmeye doğru biriken "Birleştirme XP'si" verir. |

**Birleştirme İhtimalleri (Yayınlanmış):**

| Nereden → Nereye | Başarı Oranı | Acıma Eşiği |
|-------------------|-------------|-------------|
| Normal → Özel | %80 | 2 başarısızlık |
| Özel → Nadir | %60 | 3 başarısızlık |
| Nadir → Uzman | %40 | 4 başarısızlık |
| Uzman → Süper | %25 | 5 başarısızlık |

> **Efsane Katmanı YOK.** Süper'de kısıtlıyoruz. Bu, Goley'in 1 Numaralı Emri'ne dayanan açık bir tasarım kararıdır: "ASLA önceki tüm katmanları geçersiz kılan bir kart katmanı ekleme." İyi kurulmuş bir Uzman takım, üstün yetenekle yönetildiğinde Süper bir takımla rekabet edebilmelidir.

### 3.5 Sezon Sıfırlama Tasarımı

**Sezon Süresi:** 3 ay (yılda 4 sezon, gerçek futbol takvimiyle uyumlu)

**Sıfırlanan:**
- Tüm oyuncu kartları havuza döner
- Dereceli MMR yumuşak sıfırlanır (sıfırlanmaz, medyana doğru sıkıştırılır)
- Sıralama tabloları sıfırlanır

**Aktarılan:**
- Hesap seviyesi ve başarımlar
- Kozmetikler (formalar, kutlamalar, stadyum süslemeleri)
- Kart yüz setleri ve özel isimler (yeni kartlara tekrar uygulanabilir)
- Para birimi bakiyeleri (Altın ve Elmas)
- Açılmış dizilişler ve taktikler

**Sezon Sonu Ödül Paketleri:**

| MMR Dilimi | Paket Kalitesi | Oynama Süresi Bonusu |
|------------|---------------|---------------------|
| Bronz (0-999) | 1× Başlangıç Paketi (Normal-Özel) | Oynanan her 50 maç için +1 |
| Gümüş (1000-1499) | 1× Standart Paket (Özel-Nadir) | Her 40 maç için +1 |
| Altın (1500-1999) | 1× Premium Paket (Nadir-Uzman) | Her 30 maç için +1 |
| Platin (2000-2499) | 2× Premium Paket (Nadir-Uzman) | Her 25 maç için +1 |
| Elmas (2500+) | 1× Elit Paket (Uzman-Süper) | Her 20 maç için +1 |

> **Neden Sıfırlama?** Sıfırlama, Goley'in "kalıcı avantaj" sorununu (kıdemliler aşılamaz güç biriktiriyor) ve FIFA Mobile'ın "sıfırlama yok, harcama yok" durgunluğunu çözer. Hem oynama süresini HEM de dereceyi daha iyi yeniden başlama paketleriyle ödüllendirerek, hem rekabetçi hem de rahat oyuncular değerli hisseder. Aktarılan kozmetikler, güç artışı olmadan oyunculara kalıcı ilerleme verir.

---

## 4. Oyun Modları

### 4.1 Mod Genel Bakış

| Mod | Tür | Süre | Açılış | Açıklama |
|-----|-----|------|--------|----------|
| **Antrenman Sahası** | PvE | 3-5 dk | Seviye 1 | Yapay zekaya karşı eğitim ve pratik. Kontrolleri, dizilişleri, yetenekleri öğren. |
| **Arkadaşlık Maçı** | PvP (Sosyal) | ~4 dk | Seviye 2 | Riskiz arkadaşlara karşı oyna. Özel kurallar (yetenek yok, sabit katmanlar, vb.). |
| **Hızlı Maç** | PvP (Rahat) | ~4 dk | Seviye 3 | Rahat eşleştirme. Derece etkisi yok. Isınma veya yeni dizilişleri denemek için iyi. |
| **Dereceli Maç** | PvP (Rekabetçi) | ~5 dk | Seviye 5 | ELO/MMR tabanlı eşleştirme. Birincil rekabetçi mod. |
| **Turnuva** | PvP (Rekabetçi) | Değişken | Seviye 10 | Yükselen ödüllerle haftalık/sezonluk parantezli turnuvalar. |
| **Lig Modu** | PvP (Kalıcı) | Sezon boyu | Seviye 8 | Bir lige katıl, planlı maçlar oyna, lig sıralamasında tırman. |
| **Meydan Okuma Modu** | PvE | ~3 dk | Seviye 4 | Temalı zorluklar (1 dakikada 3 gol at, sadece defanslarla kazan, vb.). |
| **Patron Maçı** | PvE (Etkinlik) | ~5 dk | Etkinlik | Güçlendirilmiş stat ve benzersiz yeteneklerle yapay zeka kontrollü "patron takımlarla" savaş. İş birliği opsiyonel. |

### 4.2 Dereceli Maç — Detaylı İnceleme

**ELO/MMR Sistemi:**

| Bileşen | Detay |
|---------|-------|
| **Başlangıç MMR** | 1000 (tüm yeni oyuncular) |
| **MMR Kazanç/Kayıp** | Rakip MMR farkına dayalı. Daha yüksek puanlı oyuncuyu yen = daha fazla puan. |
| **Yerleştirme Maçları** | Her sezonun ilk 10 maçı yerleştirme (yüksek oynaklık). |
| **Düşüş** | Altın altında düşüş yok. Platin+ inaktivite haftasında 10 MMR kaybeder (maks 4 hafta, sonra dondurulur). |
| **Taban Koruması** | Bir sezonda bir katman tabanına ulaştıktan sonra altına düşemezsiniz (ör. Altın olduktan sonra 1500'ün altına asla). |

**Eşleştirme Kuralları:**

| Kural | Detay | Neden |
|-------|-------|-------|
| **MMR Aralığı** | ±150 MMR (30 sn sonra ±250'ye, 60 sn sonra ±400'e genişler) | Hız vs. kalite dengesi |
| **Takım Gücü Faktörü** | Mümkün olduğunda ±%15 takım OVR içinde eşleştir | **Goley Emri #3:** Ücretsiz oyuncuları asla balina takımlarla eşleştirme |
| **Bölge Önceliği** | Önce aynı bölge, sonra bölgeler arası | Gecikmeyi minimize et |
| **Yeniden Eşleşme Bekleme** | 30 dakika içinde aynı rakiple karşılaşılamaz | Taciz/keskin nişancılığı engelle |

> **P2W Kontrolü:** Eşleştirmedeki takım gücü faktörü, P2W'ye karşı birincil yapısal savunmamızdır. Bir oyuncu harcama yoluyla %20 daha güçlü bir takım kursa bile, benzer güçteki takımlarla karşılaşır — ücretsiz oyuncuları ezmez.

### 4.3 Turnuva Modu

**Haftalık Turnuva (Cuma–Pazar):**
- Giriş: Ücretsiz (1 giriş) veya 50 Elmas (ek giriş)
- Format: Tek eleme (8 veya 16 oyuncu)
- Ödüller: Altın, kart paketleri, özel kozmetikler
- Özel kural: Her hafta rastgele değiştirici (ör. "Yetenek yok," "Tüm Normal kartlar," "Yağmurlu hava")

**Sezonluk Şampiyonluk (Sezonun son haftası):**
- Giriş: Altın+ derece olmalı
- Format: İsviçre sistemi (5 tur), ilk 8 tek eleme finallerine geçer
- Ödüller: Elit paketler, özel sezon kozmetikleri, sıralama tablosu unvanları
- Yayın: Üst maçlar uygulama içi izleyiciler tarafından izlenebilir

### 4.4 Lig Modu

- Oyuncular bir Liga katılır veya oluşturur (8-20 üye)
- Her lig gerçek dünya sezonu boyunca (3 ay) çift devreli lig oynar
- Lig sıralaması bölüm yükselme/düşmeyi belirler
- Lig ödülleri katkıya göre tüm üyelere dağıtılır
- **Sosyal tutkal:** Lig sohbeti, paylaşılan başarımlar, takım amblemleri

### 4.5 Meydan Okuma Modu

Benzersiz kural değiştiricileriyle haftalık dönen meydan okumalar:

| Meydan Okuma Tipi | Örnek | Ödül |
|-------------------|-------|------|
| **Beceri Meydan Okuması** | Yapay zekaya karşı 3 dakikada 5 gol at | Altın + XP |
| **Kısıtlama Meydan Okuması** | Sadece Normal katman kartlarla kazan | Kart Paketi |
| **Dayanıklılık Meydan Okuması** | Gol yemeden 3 ardışık maç kazan | Premium Para Birimi |
| **Yaratıcılık Meydan Okuması** | Sadece kafa vuruşlarıyla gol at | Kozmetik Ödül |
| **Patron Meydan Okuması** | Benzersiz yetenek kombinasyonlarıyla yapay zeka patron takımını yen | Yetenek Açma Jetonu |

### 4.6 Patron Maçı (Etkinlik Modu)

- Oyuncuların abartılmış yeteneklere ve statlara sahip yapay zeka "patron takımlarıyla" karşılaştığı özel PvE etkinlikleri.
- **Solo veya İş Birliği (2 oyuncu bir takımı kontrol eder).**
- Patron takımlarının benzersiz görsel temaları var (ör. "Ateş Lejyonu" — tüm ateş yetenekleri, "Buz Kalesi" — savunma ağırlıklı buz alanlarıyla).
- Etkinliğe özel kozmetik ödüller (formalar, kutlamalar, stadyum efektleri).
- Oyuncuları birbirine karşı çıkarmak yerine ortak bir zorluğa karşı birleştirmek için tasarlandı.

> **Emir #9:** "İçeriği HER ZAMAN kart paketlerinin ötesinde çeşitlendir." Patron Maçları PvE oyuncularına ve iş birlikçi gruplara sadece "daha fazla paket al" olmayan anlamlı içerik verir.

---

## 5. Kamera Açıları

### 5.1 Tasarım Felsefesi

Project F, farklı oyun tarzlarına, ekran boyutlarına ve oyuncu tercihlerine uyum sağlamak için ayarlanabilir kamera açıları sunar. Daha küçük sahada 6v6 formatı, çoğu açının tüm sahayı gösterebileceği anlamına gelir ve 11v11 oyunlarındaki "gizli oyuncu" sorununu azaltır.

### 5.2 Mevcut Kamera Açıları

| Kamera | Açıklama | En İyi Kullanım | Varsayılan |
|--------|----------|-----------------|------------|
| **Yayın** | TV futbolu taklit eden yandan görünüm. Kamera sabit yüksek pozisyondan topu yatay olarak takip eder. Klasik futbol izleme deneyimi. | Tanıdık bir TV-benzeri deneyim isteyen oyuncular. Sahanın genişliğini okumak için en iyi. | **Evet (Varsayılan)** |
| **Tele Yayın** | Yayın'ın daha sıkı versiyonu. Kamera daha yakın ve oyunu ince zoom ayarlamalarıyla takip eder. Daha sürükleyici. | Oyuncu detaylarını ve animasyonları yakından görmek isteyen rekabetçi oyuncular. | Hayır |
| **Taktiksel** | Sahanın çoğunu/tamamını gösteren yüksek üstten açı. FC 26'nın taktiksel kamerasından ilham almış. Diziliş farkındalığı için ideal. | Pozisyon alma ve pas koridorlarına odaklanan taktiksel oyuncular. | Hayır |
| **Dinamik** | Kamera topla birlikte oyuncunun arkasından takip eder, top kaybedildiğinde perspektif değişir. Üçüncü şahıs hissi. | Sürükleyicilik ve "aksiyonun içinde" olmak isteyen oyuncular. | Hayır |
| **Kaleci Görüşü** | Kalenizin arkasına sabitlenmiş, sahaya bakan. Savunma farkındalığı için harika. | Savunma odaklı oyuncular; gol kutlamalarını izlemek için de harika. | Hayır |
| **Serbest Kamera** | Sıkıştır-yakınlaştır ve sürükle ile oyuncu tarafından ayarlanabilir açı. Maç başlamadan önce kendi görüşünüzü ayarlayın. | Tam kontrol isteyen deneyimli oyuncular. | Hayır |

**Referans:** Mobil futbol oyunlarında kamera açısı sistemleri — [FC 26 Kamera Rehberi](https://fifauteam.com/fc-26-camera/) | [FC Mobile En İyi Kamera Açıları](https://www.sportsdunia.com/esports/ea-fc-25-best-camera-angles)

### 5.3 Kamera Ayarları

| Ayar | Aralık | Varsayılan |
|------|--------|------------|
| **Yakınlaştırma** | 1x – 3x | 1,5x |
| **Yükseklik** | Alçak / Orta / Yüksek | Orta |
| **Takip Hızı** | Yavaş / Normal / Hızlı | Normal |
| **Duran Toplarda Otomatik Yakınlaştırma** | Açık / Kapalı | Açık |
| **Gol Tekrarı Kamerası** | Sinematik / Yayın / Kapalı | Sinematik |

### 5.4 Mobil Optimizasyonu

- Kamera ekran en-boy oranına otomatik ayarlanır (16:9, 18:9, 20:9, tablet)
- Sadece Hızlı Maç için portre modu desteği (döndürülmüş kamera + basitleştirilmiş kontroller)
- Turnuva maçlarını izleyen tablet kullanıcıları için bölünmüş ekran seyirci modu
- Gol tekrarı varsayılan olarak ağır çekimle sinematik kamera kullanır (dokunarak atlanabilir)

---

## 6. Hedef Kitle

### 6.1 Birincil Demografik

| Segment | Detay |
|---------|-------|
| **Yaş** | 16-35 (çekirdek: 18-28) |
| **Cinsiyet** | Erkek ağırlıklı (%75-80), herkese hoş geldin diyecek bilinçli tasarım kararlarıyla |
| **Birincil Pazar** | Türkiye (lansman pazarı, Goley nostaljisi ve Türkçe spikerden yararlanarak) |
| **İkincil Pazarlar** | MENA bölgesi, Güneydoğu Asya, Brezilya, geniş Avrupa |
| **Cihaz** | Orta segment Android akıllı telefonlar (birincil), iOS (ikincil) |
| **Gelir** | Ücretsiz çoğunluk, ~%5'i ödeme yapana dönüşür (sektör standardı). Hedef: balinalar ($100+/ay) yerine küçük harcayıcılar ($5-15/ay). |

### 6.2 Oyuncu Personaları

#### Persona 1: "Nostaljik Emre" (Goley Gazisi)
- **Yaş:** 22-30
- **Arka Plan:** 2013-2016'da Goley oynadı, hâlâ YouTube derlemelerini izliyor
- **İstiyor:** P2W ölüm sarmalı olmadan Goley sihri
- **Korkusu:** "Bu Goley 2.0 olacak ve aynı şekilde ölecek"
- **Anahtar Özellik:** Kart kişilik sistemi, Türkçe spiker, chibi sanat, adil eşleştirme
- **Monetizasyon:** Oyun adil hissediyorsa ayda 10-20$ harcamaya istekli

#### Persona 2: "Rekabetçi Kerem"
- **Yaş:** 18-25
- **Arka Plan:** FC Mobile ve/veya eFootball oynuyor, P2W'den bıkmış
- **İstiyor:** Yeteneğin gerçekten önemli olduğu bir mobil futbol oyunu
- **Korkusu:** Otomatik kazanan balinalarla karşılaşmak
- **Anahtar Özellik:** Dereceli sistem, takım gücü eşleştirme, turnuva modu, yetenekler
- **Monetizasyon:** Rekabetçi bütünlük korunursa kozmetiklere ve Sezon Pasına harcar

#### Persona 3: "Rahat Ayşe"
- **Yaş:** 16-22
- **Arka Plan:** Mobil oyunları rahat oynuyor (günde 2-3 oturum, 5-10 dk)
- **İstiyor:** Sevimli karakterlerle hızlı eğlenceli oturumlar
- **Korkusu:** Karmaşık sistemler tarafından bunalmak
- **Anahtar Özellik:** Hızlı Maç, kart kişiselleştirme, chibi kutlamalar, Meydan Okuma Modu
- **Monetizasyon:** Ara sıra küçük alışverişler ($1-5), ödüllü reklamları izler

#### Persona 4: "Sosyal Mehmet"
- **Yaş:** 20-30
- **Arka Plan:** Öncelikle arkadaşlarla takılmak için oyun oynuyor
- **İstiyor:** Arkadaş grubuyla birlikte oynayacak bir oyun
- **Korkusu:** Sadece solo içerik, sosyal özellik yok
- **Anahtar Özellik:** Arkadaşlık Maçları, Lig Modu, İş Birliği Patron Maçları, kart takas/kiralama
- **Monetizasyon:** Arkadaşları harcadığında harcar (sosyal harcama baskısı — organik, üretilmemiş)

### 6.3 Pazar Konumlandırma

```
                    RAHAT ◄──────────────────► REKABETÇİ
                         │                      │
              Score!     │    PROJECT F          │  eFootball
              Match      │    ●                  │
                         │                      │
                         │         DLS           │
            CHIBI/       │                      │        GERÇEKÇİ
            STİLİZE      │                      │
                         │                      │
              Goley      │                      │  FC Mobile
              (kapandı)  │                      │
                         │                      │
```

**Project F şunların kesişim noktasında:** Stilize sanat + Rekabetçi derinlik + Adil monetizasyon. Şu anda hiçbir oyun bu alanı kaplamıyor.

### 6.4 Cihaz & Performans Hedefleri

| Kademe | Cihaz Örneği | Hedef FPS | Kalite |
|--------|-------------|-----------|--------|
| **Düşük** | Samsung Galaxy A14, Redmi 12 | 30 FPS | Düşük dokular, gölge yok, azaltılmış parçacıklar |
| **Orta** | Samsung Galaxy A54, Poco X5 | 60 FPS | Orta dokular, temel gölgeler, standart parçacıklar |
| **Yüksek** | Samsung Galaxy S24, iPhone 15 | 60 FPS | Yüksek dokular, tam gölgeler, tam parçacık efektleri |

> **Emir #10 (Goley Dersi):** Düşük özellikli cihaz erişilebilirliği önemlidir, özellikle Türkiye'de. Oyun 150$ veya daha az maliyetli cihazlarda 30 FPS'de çalışMALIDIR.

---

## 7. Kontroller

### 7.1 Tasarım Felsefesi

Kontroller **duyarlı, sezgisel ve özelleştirilebilir** olmalıdır. Mobil futbol oyunları kontrolleriyle yaşar ve ölür — DLS'nin basit 3 butonlu sistemi bir referans noktasıdır, eFootball'un karmaşıklığı ustalığı ödüllendirir. Biz ortayı hedefliyoruz: **kolay kavranır, derinlikte ustalaşılır.**

**Referans:** [Sanal Joystick Tasarım Rehberi](https://coherent-labs.com/blog/uitutorials/virtual-joystick/) | [Microsoft Dokunmatik Kontrol Tasarımcı Rehberi](https://learn.microsoft.com/en-us/gaming/gdk/docs/features/common/game-streaming/building-touch-layouts/game-streaming-tak-designers-guide) | [DLS 2026 Kontrolleri](https://gamingonphone.com/guides/dream-league-soccer-beginners-guide-and-tips/)

### 7.2 Kontrol Düzeni

**Varsayılan Düzen (Yatay):**

```
┌─────────────────────────────────────────────────────┐
│  [Duraklat]                           [Skor] [Süre] │
│                                                     │
│                                                     │
│                                                     │
│                                                     │
│                                                     │
│     ┌───┐                              [Özel]       │
│     │ J │ ←── Sanal Joystick                        │
│     │   │     (Sol baş parmak)    [Şut]    [Beceri] │
│     └───┘                              [Pas]        │
│                                                     │
└─────────────────────────────────────────────────────┘

J = Sanal Joystick (hareket)
Pas = Kısa pas (dokun) / Ara pas (ileriye kaydır)
Şut = Şut (dokun) / Aşırtma (yukarı kaydır) / Falso (eğri kaydır)
Beceri = Beceri hareketi (dokun) / Sprint (basılı tut)
Özel = Özel yetenek (şarj olduğunda mevcut)
```

### 7.3 Hücum Kontrolleri (Topla)

| Girdi | Aksiyon | Değiştirici |
|-------|---------|-------------|
| **Pas (Dokun)** | Baktığı yöndeki en yakın takım arkadaşına kısa pas | Çift dokunma = bir-iki pası |
| **Pas (İleriye Kaydır)** | Kaydırma yönünde ara pas | Kaydırma uzunluğu = pas gücü |
| **Pas (Sola/Sağa Kaydır)** | Orta (uzak tarafa havadan pas) | Kaydırma yayı = orta eğrisi |
| **Şut (Dokun)** | Standart güçlü şut | Daha uzun basılı tutma = daha fazla güç (güç çubuğu dolar) |
| **Şut (Yukarı Kaydır)** | Kalecinin üzerinden aşırtma/loblu şut | Kaydırma yüksekliği = aşırtma yayı |
| **Şut (Eğri Kaydır)** | Falso şut (eğimli) | Kaydırma yönü = eğri yönü |
| **Beceri (Dokun)** | Bağlama duyarlı beceri hareketi (makas, rulo, vb.) | Oyuncunun beceri statına bağlı |
| **Beceri (Basılı Tut)** | Sprint | Basılı tutulurken dayanıklılık harcar |
| **Özel (Dokun)** | Özel yeteneği aktive et | Sadece şarj çubuğu doluyken mevcut |

### 7.4 Savunma Kontrolleri (Topsuz)

| Girdi | Aksiyon | Değiştirici |
|-------|---------|-------------|
| **Pas → Müdahale (Dokun)** | Ayakta müdahale | Zamanlama bağımlı: çok erken = faul riski |
| **Pas → Müdahale (Basılı Tut)** | Yakın takip/cüsse (saldırganı otomatik takip) | Güvenli savunma seçeneği, faul riski yok |
| **Şut → Baskı (Dokun)** | Agresif baskı / Kayarak müdahale | Yüksek risk, yüksek ödül. Faullere neden olabilir. |
| **Beceri → Değiştir (Dokun)** | Topa en yakın oyuncuya geç | Çift dokunma = belirli oyuncuya geç |
| **Özel (Dokun)** | Savunma özel yeteneğini aktive et | Sadece şarj olduğunda |
| **Joystick** | Seçili oyuncuyu hareket ettir | Hücumla aynı |

### 7.5 Kaleci Kontrolleri (Manuel Müdahale)

Top ceza sahasına girdiğinde ve şut yakın olduğunda:
- **Herhangi bir yöne kaydır:** O tarafa dalış
- **Dokun:** Yumrukla/sektir (havadaki toplar için)
- **Basılı Tut:** Yayıl (dik dur, maksimum alan kapla)
- Kaleci de mevcut olduğunda özel yeteneklerini kullanabilir

> **Varsayılan:** Kaleci manuel müdahale imkanıyla yapay zeka kontrollüdür. Oyuncular ayarlardan "Tam Manuel Kaleci"yi açıp kapatabilir.

### 7.6 Jest Kısayolları

| Jest | Aksiyon | Bağlam |
|------|---------|--------|
| **İki parmak dokunma** | Hızlı taktik değiştirme (hücumcu/dengeli/savunmacı) | Maç sırasında her an |
| **Üstten aşağı kaydırma** | Hızlı diziliş değiştirme (önceden ayarlanan alternatifler) | Maç sırasında her an |
| **Oyuncuya dokunma** | Direkt oyuncu koşusu (YZ takım arkadaşı dokunulan noktaya koşar) | O oyuncuyu kontrol etmediğinizde |
| **Sıkıştırma** | Kamera yakınlaştırma (Serbest Kamera etkinse) | Kamera Serbest'e ayarlı |

### 7.7 Kontrol Özelleştirmesi

| Seçenek | Ayarlar |
|---------|---------|
| **Buton Boyutu** | Küçük / Orta / Büyük (varsayılan: Orta) |
| **Buton Şeffaflığı** | %25 / %50 / %75 / %100 (varsayılan: %75) |
| **Joystick Modu** | Sabit (yerinde kalır) / Yüzen (başparmağın dokunduğu yerde belirir) |
| **Joystick Boyutu** | Küçük / Orta / Büyük |
| **Buton Konumu** | Herhangi bir butonu sürükleyerek yeniden konumlandır |
| **Hassasiyet** | Joystick hassasiyet kaydırıcısı (1-10, varsayılan: 5) |
| **Titreşim** | Açık / Kapalı (aksiyonlarda dokunsal geri bildirim) |
| **Otomatik Sprint** | Açık / Kapalı (joystick tamamen itildiğinde otomatik sprint) |

### 7.8 Erişilebilirlik Seçenekleri

| Seçenek | Detay |
|---------|-------|
| **Tek El Modu** | Otomatik pas ve bir tarafta büyütülmüş butonlarla basitleştirilmiş düzen |
| **Renk Körü Modu** | Ayarlanmış takım renkleri ve göstergeler |
| **Nişan Yardımı** | Pas ve şut yön yardımı (varsayılan olarak hafif, ayarlanabilir) |
| **Eğitim Katmanları** | Bağlama duyarlı buton ipuçları (açık/kapalı) |
| **Metin Boyutu** | Küçük / Orta / Büyük tüm UI metinleri için |

---

## 8. P2W Dengesi & Sürdürülebilirlik Değerlendirmesi

### 8.1 P2W Skor Kartı

Bu GDD'deki her sistem P2W etkisi açısından değerlendirilmiştir:

| Sistem | P2W Riski | Azaltma | Risk Seviyesi |
|--------|-----------|---------|---------------|
| **Kart Katmanları** | Yüksek katmanlar = daha güçlü statlar | Süper'de kısıtla (Efsane yok). Normal ile Süper arasındaki maks stat farkı: +%35, Goley'deki gibi +%300 değil. | ⚠️ Orta |
| **Kart Birleştirme** | Ödeme yapan oyuncular daha hızlı birleştirir | Başarısızlık koruması + acıma sayacı + yayınlanan ihtimaller. Zaman avantajı, güç avantajı değil. | ✅ Düşük |
| **Özel Yetenekler** | Premium kapılı olabilir | Tüm yetenekler oyun içi ilerlemeyle kazanılabilir. Hiçbir yetenek ödemenin arkasına kilitli değil. | ✅ Düşük |
| **Eşleştirme** | Balinalar F2P'yi ezer | Eşleştirmede takım gücü faktörü. Balinalar balinalarla karşılaşır. | ✅ Düşük |
| **Sezon Sıfırlaması** | Daha iyi yeniden başlama paketleri için ödeme | Sıfırlama paketleri MMR VE oynama süresine dayalı. Elmas paket satın alamazsınız — Elmas derecesi kazanmalısınız. | ✅ Düşük |
| **Takas/Kiralama** | Gerçek parayla takas pazarı | Takas yalnızca oyun içi para birimi kullanır. Kiralama ücretleri sınırlandırılmış. Gerçek para pazarı yok. | ⚠️ Orta |
| **Turnuvalar** | Premium yeniden giriş avantajı | Ücretsiz giriş her zaman mevcut. Ek girişler Elmas (F2P kazanılabilir). Turnuva ödülleri kozmetik, güç değil. | ✅ Düşük |
| **Dizilişler** | Premium diziliş açmaları | Dizilişler oynanan maçlarla açılır, satın almayla değil. | ✅ Düşük |

### 8.2 Yetenek:Cüzdan Oranı Hedefi

```
Project F Hedefi:

  YETENEK ████████████████████████████░░░░ CÜZDAN
          ├───────── %70 ──────────┤ %30 ┤

DLS (%70:30) ve eFootball (%65:35) ile karşılaştırılabilir.
Goley'in ölümcül %10:90'ından veya Top Eleven'ın %30:70'inden uzak.
```

**"%30 cüzdan" pratikte ne anlama gelir:**
- Ödeme yapan oyuncular kartları daha hızlı alır (daha iyisini değil)
- Ödeme yapan oyuncular ücretsiz oyuncuların erişemediği kozmetiklere erişir
- Ödeme yapan oyuncular kolaylık elde eder (ekstra turnuva girişleri, anında kuyruk)
- Ödeme yapan oyuncular **ASLA** ücretsiz oyuncuların sonunda erişemeyeceği yetenekler, dizilişler veya eşleştirme avantajları elde ETMEZ

### 8.3 Sürdürülebilirlik Değerlendirmesi

| Faktör | Tasarım Kararı | Sürdürülebilirlik Etkisi |
|--------|----------------|--------------------------|
| **Güç Artışı** | Süper katmanda kısıtlandırılmış. Yeni kartlar yan-geçişlerdir, kesin yükseltmeler değil. | Goley'in ölüm sarmalını engeller |
| **Sezon Sıfırlamaları** | Kartlar sıfırlanır, kozmetikler aktarılır. Ödül paketleri performansa dayalı. | Kalıcı avantaj VE ilerleme terkini engeller |
| **Eşleştirme** | Güç ağırlıklı + MMR tabanlı | Ücretsiz oyuncu göçünü engeller |
| **İçerik Çeşitliliği** | 8 oyun modu, haftalık meydan okumalar, patron etkinlikleri, ligler | "Sadece daha fazla paket" durgunluğunu engeller |
| **Sosyal Sistemler** | Ligler, takas, iş birliği, arkadaşlık maçları | Sosyal bağlar G30+ elde tutmayı iyileştirir |
| **Hile Önleme** | İlk günden öncelik (Emir #7) | Topluluk zehirlenmesini engeller |
| **Yakalama Mekanikleri** | Yeni oyuncu paketleri + sezon sıfırlama seviyeyi eşitler | Yeni oyuncu hunisini açık tutar |
| **Türk Pazarı** | Türkçe spiker + yerelleştirme + kültürel ilgililik | Duygusal bağla yetersiz hizmet alan pazarı yakalar |

### 8.4 Gelir Modeli Özeti

| Gelir Akışı | P2W Etkisi | Hedef Gelirin %'si |
|-------------|-----------|-------------------|
| **Sezon Pası** (Ücretsiz + Premium katman) | Sadece hızlandırma | %35 |
| **Kozmetikler** (Formalar, kutlamalar, stadyum, kart kaplamaları) | Sıfır P2W | %30 |
| **Elmas** (Kolaylık için premium para birimi) | Hafif hızlandırma | %20 |
| **Ödüllü Reklamlar** (Gönüllü, altın için 30 sn) | Sıfır P2W | %15 |

> **Gizli ihtimalli loot box YOK.** Tüm paket ihtimalleri yayınlanır. Tüm satın almalar onay öncesinde kesin içeriği veya kesin olasılıkları gösterir. Bu, loot box düzenlemesine karşı geleceğe hazırlar (Belçika, Güney Kore örnekleri — bkz. Rakip Analizi §4.3).

### 8.5 Uzun Vadeli Vizyon (Bu Oyuncuları Yıllarca Tutacak mı?)

| Yıl | Odak | Ana Kilometre Taşı |
|-----|------|-------------------|
| **1. Yıl** | Çekirdek deneyim + Türk pazarı lansmanı | 1M indirme, 200K MAU, topluluk kurulmuş |
| **2. Yıl** | Global genişleme + e-spor temeli | MENA/GDA lansmanı, ilk resmi turnuva serisi |
| **3. Yıl** | Platform olgunluğu + topluluk içeriği | Oyuncu tarafından oluşturulan turnuvalar, lig sistemi genişlemesi, olası PC portu |
| **4. Yıl+** | Sürdürülebilir canlı hizmet | Sezonluk içerik temposu, topluluk odaklı etkinlikler, potansiyel lisanslı ortaklıklar |

**Nihai sürdürülebilirlik testi:** "1. Yılda başlayan bir oyuncu 3. Yılda bu oyunu arkadaşına tavsiye eder mi?"

Rakip Analizi'ndeki On Emir'e uyarsak, cevap evet.

---

## Ek A: Rakip Analizi Çapraz Referansı

| GDD Kararı | Rakip Dersi | Kaynak |
|-----------|-------------|--------|
| Efsane katmanı yok | Goley'in Efsane kartları oyunu öldürdü | GDD-00 §2.5 |
| Yayınlanan birleştirme/paket ihtimalleri | Goley'in yayınlanmamış ihtimalleri predatördü | GDD-00 §2.4 |
| Takım gücü eşleştirmesi | Goley balinaları F2P'yle eşleştirdi | GDD-00 §2.5 |
| Başarısızlık korumalı birleştirme | Goley başarısız yükseltmelerde kartları yok ediyordu | GDD-00 §2.3 |
| Ödüllü sezon sıfırlaması | eFootball'un sıfırlama yokluğu + FIFA Mobile'ın dönüşü doğruladı | GDD-00 §3.6, §5.6 |
| Yetenek > Cüzdan (%70:30) | DLS/eFootball bölgesi en sürdürülebilir | GDD-00 §10.3 |
| Enerji sistemi yok | Score! Match'in enerji sistemi F2P oynamayı sınırlıyor | GDD-00 §6.4 |
| Türkçe spiker | Goley'in en sevilen özelliği | GDD-00 §2.7 |
| Lansman kalitesi önceliği | eFootball 2022 ilk izlenimlerin kalıcı olduğunu kanıtladı | GDD-00 §5.8 |
| İlk günden hile önleme | eFootball'un null sonuçları, Goley'in exploitleri | GDD-00 §5.8, §2.5 |

---

*Bu doküman Project F için temel oyun tasarımı vakfı olarak hizmet eder. Sonraki tüm GDD'ler (Kart Sistemi, Monetizasyon, UI/UX, vb.) burada alınan kararlara referans vermeli ve bunlar üzerine inşa etmelidir.*

*Dokümanı hazırlayan: Game Designer Agent, YG Games*
*Tarih: 17 Mart 2026*
