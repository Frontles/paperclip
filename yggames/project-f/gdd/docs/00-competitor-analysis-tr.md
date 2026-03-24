# Project F -- Rakip Analizi: Mobil Futbol Oyunlari

**Dokuman Kodu:** GDD-00
**Versiyon:** 1.0
**Tarih:** 17 Mart 2026
**Hazirlayan:** Pazar Analisti, YG Games
**Amac:** Tum Project F Oyun Tasarim Dokumanlari icin temel dokuman

---

## Icindekiler

1. [Yonetici Ozeti](#1-yonetici-ozeti)
2. [Goley -- Derinlemesine Analiz (Birincil Referans)](#2-goley--derinlemesine-analiz)
3. [EA Sports FC Mobile (FIFA Mobile)](#3-ea-sports-fc-mobile)
4. [FIFA Ultimate Team (Konsol/PC Referansi)](#4-fifa-ultimate-team)
5. [eFootball Mobil](#5-efootball-mobil)
6. [Score! Match](#6-score-match)
7. [Top Eleven](#7-top-eleven)
8. [Dream League Soccer](#8-dream-league-soccer)
9. [Diger Onemli Rakipler](#9-diger-onemli-rakipler)
10. [Karsilastirmali Analiz](#10-karsilastirmali-analiz)
11. [Project F icin Dersler ve Oneriler](#11-project-f-icin-dersler-ve-oneriler)
12. [Kaynaklar](#12-kaynaklar)

---

## 1. Yonetici Ozeti

Bu rapor, Project F'nin oyun tasarimini bilgilendirmek icin 7'den fazla mobil futbol oyununu analiz etmektedir. Analiz her rakip icin oynanis, monetizasyon, P2W dengesi, oyuncu tutma ve surdurulebilirlik konularini kapsamaktadir.

### Temel Bulgular

1. **P2W, mobil futbol oyunlarinin 1 numarali katilidir.** Goley bundan oldu. Top Eleven guven kaybediyor. FIFA Mobile bile yillarca oyuncu kaybi yasadiktan sonra yillik sifirlama modelini tersine cevirmek zorunda kaldi.

2. **P2W yelpazesi genis:** FM Mobile (yok) < Retro Goal (minimal) < DLS (hafif) < eFootball (orta) < Score! Match (orta) < FC Mobile (agir) < Top Eleven (agir). Daha hafif P2W'ye sahip oyunlar surekli olarak daha yuksek puanlar ve daha iyi oyuncu tutma oranlari elde ediyor.

3. **Beceri tabanli oynanis + adil monetizasyon = surdurulebilirlik.** DLS (4.0 puan, 20M MAU) ve eFootball (en iyi mobil oynanis) oyuncu becerisine saygi gostermenin topluluklari ayakta tuttigini kanitliyor.

4. **Sezonluk sifirlama yapmamak artik endustri standardi.** FIFA Mobile'in 2025'teki sifirlamayi kaldirma karari, eFootball'un her zaman uygulami oldugunun dogruladi. Sifirlamalar yatirimi cezalandirir ve oyuncu kaybina neden olur.

5. **Goley'in basarisizligi en degerli dersimiz.** Kok neden zinciri (P2W artisi -> hile -> Efsanevi kartlar -> ucretsiz oyuncu gocu -> panik dagitimlar -> gelir cokusu -> kapanis) YAPILMAMASI gerekenlerin bir sablonudur.

6. **Gelir potansiyeli muazzam.** FC Mobile yilda 172M$+ uretir. EA genelinde Ultimate Team yilda 1.6 milyar$ uretir. Mobil futbol pazari kanitlanmis ve buyuyor.

### Project F icin P2W Dengesi Onerisi

**DLS/eFootball bolgesini hedefleyin:** Harcamanin ilerlemeyi hizlandirdigi ama becerilerin sonucu belirledigI hafif-orta arasi monetizasyon. Odemeli oyuncularin ucretsiz oyunculari yenilmez hale gelmesine asla izin vermeyin.

---

## 2. Goley -- Derinlemesine Analiz

> **Goley, birincil uyari hikagemizdir. Project F'deki her tasarim karari Goley'in hatalarina karsi test edilmelidir.**

### 2.1 Genel Bakis

| Ozellik | Detay |
|---------|-------|
| **Gelistirici** | Netmarble (Guney Kore) |
| **Yayinci** | Joygame (Turkiye, Netmarble EMEA yan kurulusu) |
| **Platformlar** | PC (birincil), Mobil ("Football Strike"), Facebook |
| **Aktif Donem** | Kasim 2013 -- 17 Agustos 2018 |
| **Tur** | 3D MMO Futbol Kart Oyunu |
| **Gorsel Stil** | Chibi karakterler (burunsuz, stilize) |
| **Spiker** | Sabri Ugan (sevilen Turk spikeri) |

### 2.2 Temel Oynanis

- **3D Gercek Zamanli Maclar** arkad tarzi kontrollerle
- **Lisansli oyuncular** Avrupa liglerinden (2005-2012 donemi)
- Ozel hareketler: Makas Vurus, Marsilya Donus, Flip-Flap, Cali Atlama
- Formation, Hucum ve Savunma stratejisi uzerine menajer seviyesinde kontrol

**Oyun Modlari:**
1. Hazirlik Kampi
2. Tekli Lig
3. Dostluk Modu
4. Rutbe Maclari
5. Lider Modu (sonradan eklendi)
6. Sampiyon Ligi
7. Antrenman

**One Cikan Ozellik:** Her oyuncuya ozel gol sevinci animasyonlari -- gol yemek bile eglenceli oluyordu.

### 2.3 Kart/Oyuncu Sistemi

**Dort Kart Kategorisi:**
1. **Futbolcu Kartlari** -- temel oyuncu kartlari
2. **Teknik Ekip Kartlari** -- performansi artiran antrenorler/menajerler
3. **Ekipman Kartlari** -- yetenekleri gelistiren techizat
4. **Amblemler** -- hucum, savunma, guc, hiz, teknik, zihin yetenekleri

**Kart Katmanlari (5 orijinal + 1 gec eklenen):**

| Katman | Turkce | Eklendigi Tarih |
|--------|--------|-----------------|
| 1 | Normal | Lansman |
| 2 | Ozel | Lansman |
| 3 | Ender | Lansman |
| 4 | Uzman | Lansman |
| 5 | Super | Lansman |
| 6 | **Efsane/Efsanevi** | **Gec eklenen -- OYUNU OLDUREN katman** |

**Yukseltme Sistemi:**
- Birlestirme sistemi: dusuk degerli kartlari birlestirerek daha iyi oyuncu olusturma
- Yukseltme icin yil esleme gereksinimi
- Olasilik tabanli: yukseltmeler garanti DEGIL
- Basarisiz yukseltmeler yatirilmis kartlari yok etti -- cift ceza mekanizmasi

### 2.4 Monetizasyon

**Premium Para Birimi:** JoyPara (JP) -- tum Joygame oyunlarinda ortak

| Paket | Fiyat (TL) |
|-------|-----------|
| 5.000 JP | 5,85 TL |
| 10.000 JP | 11,35 TL |
| 20.000 JP | 22,45 TL |

**Kritik Sorun:** Yayinlanmis paket olasaliklari YOKTU. Oyuncular binlerce JoyPara harcayip istedikleri kartlari alamadiklarini bildirdi.

### 2.5 P2W Analizi -- KRITIK BOLUM

#### P2W Tirmandirma Zaman Cizelgesi

```
2013-2014  [||||------]  Hafif P2W -- Kozmetik + kucuk avantajlar
2015       [||||||----]  Orta P2W -- Guc farki fark edilebilir
2016       [||||||||--]  Agir P2W -- Efsanevi kartlar tanitildi
2017       [||||||||||]  Maksimum P2W -- Ucretsiz oyuncular icin oynanamaz
2018       [XXXXXXXXXX]  Cokus -- Ucretsiz kart dagitimi ekonomiyi yok etti
```

#### Faz 1: Dengeli F2P (2013-2014)
- Oyun gercekten ucretsiz oynanabirdi
- Pazarlama: "100% bedava oynanabilen ilk MMO futbol oyunu"
- Normal'den Super'e kart katmanlari oynanarak elde edilebiliyordu
- **Oyuncu gorusu: Olumlu, buyuyen topluluk**

#### Faz 2: Monetizasyon Tirmanisi (2015-2016)
- Daha yuksek fiyatli daha guclu kart paketleri tanitildi
- Super katman kartlar ucretsiz elde etmek giderek zorlasti
- Yeni paket turleri eski kartlari degersizlestirdi
- **Oyuncu gorusu: Artan sikayetler ama hala oynanabilir**

#### Faz 3: Efsanevi Kartlar -- KIRILMA NOKTASI (2016-2017)
- **KRITIK HATA:** "Efsane/Efsanevi" katmani tanitildi
- Efsanevi kartlar mevcut Super katmandan COK daha guclu
- Oncelikle pahali premium paketlerden (Pele, Cantona paketleri) elde edilebiliyordu
- Odemeli ve ucretsiz oyuncular arasinda **asilamaz bir ucurum** yaratti
- **Topluluk gorusu: "Efsane kartlar oyunu mahvetti"**
- Ucretsiz oyuncular dereceli modlarda hic rekabet edemedi
- **Oyuncu gorusu: Kitlesel goc basliyor**

#### Faz 4: Umutsuzluk ve Cokus (2017-2018)
- Joygame oyunculari tutmak icin **guclu kartlari bedava dagitti**
- Bu YENI bir sorun yaratti: odeme yapan emektar oyuncular aldatilmis hissetti
- Gelir dibe vurdu -- oyuncular artik odeme yapmaya ihtiyac duymuyordu
- **Oyuncu gorusu: Ofke, terk etme, Sikayetvar'da sikayetler**

#### Goley'i Olduren Alti P2W Mekanizmasi

1. **Kart Katman Guc Kayisi** -- Her yeni katman oncekini eskitti. Efsanevi kartlar o kadar gucluydu ki tam Efsanevi bir takim, tam Super bir takima karsi dokunulmazdi.

2. **Yayinlanmamis Paket Olasaliklari (Yirtici Gacha)** -- Yuksek fiyat + dusuk olasilik + zorunlu kartlar = yirtici monetizasyon.

3. **Eslestirme Basarisizligi** -- Dereceli eslestirme takim guc seviyesini hesaba katmadi. Normal/Ozel takimli ucretsiz oyuncular, Efsanevi takimli balinalarla eslesti.

4. **Kart Ekonomisi Enflasyonu** -- Duzenli olarak yeni, daha guclu kart cikislari. Aylar once satin alinan kartlar degersizlesti. Takas sistemi veya deger koruyucu geri donusum yoktu.

5. **Yikici Yukseltme Sistemi** -- Basarisiz yukseltmeler yatirilmis kartlari hicbir tazminat olmadan yok etti.

6. **VIP Harcama Dongusu + Ekipman Istifleme** -- VIP odulleri aylik harcama esiklerini tesvik etti. Ekipman/Amblem stat bonuslari gizli carpimsal P2W katmanlari yaratti.

#### Olum Kok Neden Zinciri

```
Yuksek kart fiyatlari
  -> Oyuncular hileye/exploitlere basvurur
    -> Gelistiriciler hileyi duzeltemez
      -> Gelistiriciler DAHA guclu (Efsanevi) kartlar cikarir
        -> Ucretsiz oyuncular hic rekabet edemez
          -> Ucretsiz oyuncu gocu
            -> Gelistiriciler oyuncu tutmak icin guclu kartlari bedava dagitir
              -> Gelir coker + odeme yapanlar aldatilmis hisseder
                -> Odeme yapan oyuncu gocu
                  -> Sunuculari surmek icin gelir yok
                    -> TL/USD deger kaybi maliyetleri surdurulemez kilar
                      -> Kore sunuculari once kapanir
                        -> Turkiye sunuculari kapanir
                          -> OYUN BITTI (17 Agustos 2018)
```

### 2.6 Sezon/Sifirlama Mekanikleri

- **Sezonluk sifirlama YOKTU** -- birikimli avantajlar kaliciydi
- 2016-2017'de katilan yeni oyuncular, emektarlardan 3+ yillik kart avantajiyla karsilasti
- Yeni oyuncular icin **yakalama mekanigi YOKTU**
- Sifirlamalarin olmamasi eski ve yeni oyuncular arasindaki asilamaz ucuruma katkida bulundu

### 2.7 Guclu Yanlar -- Goley'in Dogru Yaptiklari

1. **Sabri Ugan ile Turkce Yerelestirme** -- Ingilizce futbol oyunlari denizinde gercek pazar farklilasmasi
2. **Sevimli Chibi Gorsel Stili** -- FIFA/PES'e karsi ozgun, cazip karakterler
3. **Eglenceli Gol Sevincleri** -- Gol yemek bile eglenceli hale gelen bir tasarim basarisi
4. **Dusuk Sistem Gereksinimleri** -- Turkiye'de cogu bilgisayarda calisti
5. **F2P Erisilebilirlik (Baslangicta)** -- Lansmanda gercekten odeme yapmadan oynanabilirdi
6. **Derin Kart Koleksiyonu** -- 4 kategori x 5 katman ile anlamli takim kurma
7. **Birden Fazla Oyun Modu** -- Rahat'tan rekabetciye secenekler
8. **Sosyal Altyapi** -- Arkadaslar, kulupler, topluluk forumlari
9. **Pazar Zamanlama** -- Yetersiz hizmet alan Turk pazarini yakaladi

### 2.8 Surdurulebilirlik Puani: 2/10

**Dort Olumcul Faktor:**
1. **Ekonomik:** TL'nin USD karsisinda deger kaybi sunucu maliyetlerini surdurulemez kildi
2. **Tasarim:** Efsanevi kart katmani onarilmaz denge ucurumu yaratti
3. **Teknik:** Hile ve exploitleri engelleyemediler
4. **Stratejik:** Panik kart dagitimi hem geliri HEM de dengeyi ayni anda yok etti

---

## 3. EA Sports FC Mobile

### 3.1 Genel Bakis

| Ozellik | Detay |
|---------|-------|
| **Gelistirici** | EA Mobile / EA Canada |
| **Yayincilar** | EA Sports (dunya), Tencent (Cin), Nexon (Kore), Garena (Vietnam) |
| **Platformlar** | iOS, Android |
| **Lansman** | 1 Ekim 2016 |
| **Yeniden Markala** | "FIFA Mobile" -> "EA Sports FC Mobile" (Eylul 2023) |
| **Guncel** | FC Mobile 26 (25 Eylul 2025 lansmanli) |
| **Icerik** | 19.000+ oyuncu, 690 takim, 35 lig |
| **Puan** | ~4.2 yildiz (Google Play) |
| **Gelir** | 2024'te 172M$+ (EA'nin en cok kazandiran mobil oyunu) |
| **Zirve MAU** | 113 milyon aylik aktif kullanici (Ocak 2018) |

### 3.2 Temel Oynanis

**Uc Oyun Modu (Division Rivals):**

| Mod | Tur | Sure | Temel Ozellik |
|-----|-----|------|---------------|
| **VS Attack (VSA)** | Asenkron PvP | ~2-3 dk | Sadece hucum fazi; OVR sans zorlugunu etkiler |
| **Head to Head (H2H)** | Gercek zamanli 11v11 | ~6-8 dk | Tam manuel kontrol; cift etkinlik jetonu |
| **Manager Modu** | Taktik AFK | Degisir | YZ stratejinizi oynar |

### 3.3 Kart/Oyuncu Sistemi

- **OVR Sistemi:** Taban OVR + Rank = Takim OVR. VSA eslestirmesini dogrudan etkiler.
- **Egitim:** Oyunculari diger oyunculara eritip stat artisi (30. seviyeye kadar).
- **Rank Up:** Pozisyona ozel ogeler, rank basina +1 OVR, maks 5 rank.
- **Kimya:** Kulup/Lig/Milliyet baglantilari performansi arttirir.

**Guc Kayisi Kalipsi:**
- Sezon basi: 75-85 OVR taban kartlar
- Sezon sonu: 100+ OVR etkinlik kartlari
- Ocak'ta alinan kartlar Haziran'da eskimis olur

### 3.4 P2W Analizi

**Degerlendirme: Agir P2W (Onemli Rekabetci Etkili Hizlandirma)**

- **Sezon basi araliklarinda:** P2W oyuncular 10-15+ OVR avantajina sahip
- **Ayda 50-100$ harcayanlar:** Tutarli 5-10 OVR avantaji
- **Balinalar:** 15-20+ OVR avantaji, VSA'da F2P'yi neredeyse yenilmez kilar
- F2P duzenli gunluk oyunla rekabet edebilir ama harcama siralamalarini onemli olcude etkiler

### 3.5 Sezon/Sifirlama Mekanikleri -- Donusturucu Degisim

**2016-2024: Yillik Tam Sifirlama**
- Her Eylul/Ekim'de tum kartlar, altinlar, ilerleme silindi
- "Miras" oyuncular tazminat olarak verildi (genellikle dusuk puanli, hizla eskiyen)
- **1 numarali oyuncu kaybi nedeni** ve en tartismali ozellik

**2025: Sifirlama Yok (Tarihi Degisim)**
- EA ilk kez sezon sifirlamasi yapmadigini duyurdu
- Oyuncular tum kartlarini, para birimlerini, ilerlemelerini korudu
- **Topluluk tepkisi: Ezici cogunlukla olumlu**
- eFootball'un sifirlamasiz modelini ustun olarak dogruladi

### 3.6 Guclu Yanlar

1. **Rakipsiz lisanslama:** 19.000+ oyuncu, 690 takim, 35 lig, UCL, Europa League
2. **Olaganustu etkinlik kadansi:** Gercek futbol takvimine bagli her 1-3 haftada yeni etkinlik
3. **Uc oyun modu:** VSA (hizli), H2H (cekirdek), Manager (rahat)
4. **Buyuyen gelir:** Rekor rezervasyonlar, %20+ YYY DAU buyumesi

### 3.7 Zayif Yanlar

1. **Yillik sifirlamalar (2016-2024):** 8 yil boyunca ilerleme silme milyonlari uzaklastirdi
2. **Scripting/DDA algisi:** EA'nin DDA patenti supheyi korukluyor; guveni derinlemesine asindiriyor
3. **Guc kaysi dolapicarki:** Durdurulamayan OVR enflasyonu kartlari aylar icinde eskitir
4. **Teknik sorunlar:** 30fps kilidi, gecikme ziplamalari, giris hatalari

### 3.8 Surdurulebilirlik Puani: 7/10

Buyuyen gelirle guclu ticari pozisyon, ancak monetizasyon (guc kaysi, FOMO) ile tutma (oyuncu yatirimina saygi) arasinda yapisal gerilim mevcut.

---

## 4. FIFA Ultimate Team (Konsol/PC Referansi)

### 4.1 Temel Metrikler
- Gelir: Yilda ~1.6-1.7 milyar$; toplam 7+ milyar$
- EA'nin canli hizmet gelirinin %75'i

### 4.2 Project F icin Ilgili Mekanikler

| Ozellik | Nasil Calisiyor | Ders |
|---------|----------------|------|
| **Transfer Pazari** | Gercek zamanli oyuncu muzyade sistemi | F2P'nin "takas yoluyla yukselme" imkani; oyuncu ekonomisi |
| **SBC'ler** | Gereksinimleri karsilayan kadrolari gonderip odul alma | Kart yutagi enflasyonu yonetir; maclar otesinde etkilesim |
| **Kimya** | Kulup/lig/milliyet bonuslari | Temali, tutarli kadrolar tesvik eder |
| **Evrimler** | Kisisellestirilmis yukseltme yollari | Paketle bagimliligini azaltarak oyuncu kontrolu saglar |

### 4.3 Duzenleyici Ortam
- **Belcika (2018):** FC Points yasakladi (sarkma kutusu = kumar)
- **Guney Kore (2024):** Paket olasaliklari aciklanmasi zorunlulugu; EA UT paketlerini tamamen devre disi birakti
- **Ders:** Sarkma kutusu duzenlemesinden kurtulabilecek monetizasyon tasarlayin. Belirleyici edinim yollari (eFootball'un Adaylama Sozlesmeleri gibi) gelecege daimdir.

---

## 5. eFootball Mobil

### 5.1 Genel Bakis

| Ozellik | Detay |
|---------|-------|
| **Gelistirici** | Konami Digital Entertainment |
| **Motor** | Unreal Engine 4 |
| **Platformlar** | Android, iOS, Windows, PS4/5, Xbox, Switch 2 (Yaz 2026) |
| **Evrim** | PES -> PES Mobile (2017) -> eFootball (2021) -> eFootball Mobile (Haziran 2022) |
| **Play Store** | 3.5-4.0 yildiz |

### 5.2 Temel Oynanis

- **Simulasyon odakli** fizik tabanli top mekanigiyle -- mobilde en iyisi
- **Konsol paritesi** UE4 ile (benzersiz satis noktasi -- baska hicbir mobil oyun bunu sunmuyor)
- **Coklu platform oyunu** Nisan 2025'te eklendi (mobil vs. konsol/PC)
- **Akilli Destek** deneyimi basitlestirmeden erisilebilirlik icin
- Mobilde **kumanda destegi**

### 5.3 Kart/Oyuncu Sistemi

**Alti Kart Katmani:** Epik > Efsanevi > Trend > One Cikan > Seckin > Standart

**Derin Oyuncu Gelistirme:**
1. Seviye Egitimi (XP)
2. Gelisim Puanlari (otomatik veya manuel stat dagitimi -- RPG tarzinda)
3. Beceri Egitimi (5'e kadar ek beceri ekleme)
4. Pozisyon Egitimi (pozisyon yetkinligini genisletme)
5. Oyuncu Birlestirme (kartlar arasinda XP/beceri aktarimi -- israfi onler)

**Edinim Yontemleri:** Sans Anlasma (gacha), Adaylama Sozlesmesi (belirli oyuncu sec), Secim Sozlesmesi, Standart Oyuncu Listesi, Ucretsiz Biletler

### 5.4 P2W Analizi

**Degerlendirme: Orta P2W, Guclu Beceri Vurgusu ("Hizlandirma icin Ode")**

- Epik/Efsanevi kartlar daha yuksek statlara sahip; odeme yapanlar en iyi oyunculari daha hizli elde eder
- Ama yuksek beceri tavani yetenekli F2P'nin balinaslari yenmesine izin verir
- Comert F2P ekonomisi (odeme yapmadan 92+ OVR takimlar mumkun)
- Derecelendirme tabanli eslestirme balinalarsi ayirir
- **FIFA Mobile'dan DAHA AZ P2W**

### 5.5 Sezon/Sifirlama Mekanikleri

**Tam Sifirlama Yok (Temel Farklilasmaci)**
- Oyuncular, seviyeleri, becerileri, ilerlemeleri sezonlar arasinda tasinir
- FIFA Mobile 23 sonunda bu yaklasimi kopyaladi -- eFootball'un modelini dogruladi

### 5.6 Guclu Yanlar

1. **Mobilde en iyi oynanis** -- fizik, hareket, top kontrolu otantik hissediliyor
2. **Konsol paritesi** -- konsol/PC ile ayni motor (benzersiz)
3. **Sezonluk sifirlama yok** -- oyuncu yatirimina saygi
4. **Derin oyuncu gelistirme** -- RPG benzeri ilerleme
5. **Adaylama Sozlesmeleri** -- gacha hayal kirikligini azaltan belirleyici edinim
6. **F2P yasayabilirligi** -- harcamadan gercekten rekabetci takimlar

### 5.7 Zayif Yanlar

1. **eFootball 2022 Lansman Felaketi** -- Steam tarihinin en kotu puanli oyunu; Metacritic 2021'in en dusuk puanli oyunu. Marka asla tamamen toparlanamadi.
2. **Null Sonuclar / Hile** -- 1 numarali devam eden sikayet. Rakipler kayiplari gecersiz kilmak icin baglantizi keser.
3. **UI/UX** -- Surekli "hantal" olarak tanimlanan menuler. Yavas ve sezgisel olmayan.
4. **Lisanslama Bosliklari** -- EA'dan daha az lig.
5. **Yavas Iyilestirme Hizi** -- Yillik guncellemeler evrimden cok yama gibi hissediliyor.

### 5.8 Surdurulebilirlik Puani: 6/10

En iyi oynanis ve sifirlamasiz model guclu temeller. Ama 2022 lansman hasari, hile sorunlari ve kotu UI/UX buyumeyi sinirliyor.

**Temel Paradoks:** eFootball herhangi bir platformda en iyi futbol oynnaisisna sahip, ancak oynanisi cevreleyen her sey (UI, sunucular, hile onleme, icerik derinligi) yuzunden performansi dusuk.

---

## 6. Score! Match

### 6.1 Genel Bakis

| Ozellik | Detay |
|---------|-------|
| **Gelistirici** | First Touch Games Ltd. |
| **Platformlar** | iOS, Android |
| **Lansman** | 7 Mart 2018 |
| **Indirmeler** | 100M+ |
| **Puan** | 3.7/5 (Google Play, 1.19M degerlendirme) |

### 6.2 Temel Oynanis
- Kaydirma tabanli kontrollerle gercek zamanli PvP futbol
- Hizli maclar (2-3 dakika) -- mobil icin ideal
- Arena ilerleme sistemi
- 16+ oyuncu tipi: Hizli, Komutan, Motor, Mimar, Cekic vb.

### 6.3 P2W Analizi

**Degerlendirme: Orta P2W**
- Harcama kart koleksiyonunu onemli olcude hizlandirir
- Topluluk raporlari supheli Dinamik Zorluk Ayarlamasi (DDA) -- cok kazandiginda oyun "hile yapar"
- Speedster uzun pas stratejisi ~%90 basari oranina sahip (denge sorunu)

### 6.4 Surdurulebilirlik Puani: 5/10

---

## 7. Top Eleven

### 7.1 Genel Bakis

| Ozellik | Detay |
|---------|-------|
| **Gelistirici** | Nordeus (Belgrad, Sirbistan) |
| **Sahip** | Take-Two Interactive (378M$'a satin aldi, Subat 2021) |
| **Platformlar** | iOS, Android, WebGL, Microsoft Store |
| **Lansman** | Mayis 2010 (Facebook); 2011 (mobil) |
| **Kayitli Kullanici** | 300M+ |
| **Gelir** | ~75M$/yil |

### 7.2 Temel Oynanis
- Futbol kulubu yonetim simulasyonu
- Taktik, formasyon, antrenman, mac gunu kararlari
- Gercek zamanli mac simulasyonu
- Diger gercek yoneticilere karsi sezon rekabeti
- 2026 eklemeleri: Kampus (kulup insasi), Taraftar Sadakati sistemi

### 7.3 P2W Analizi

**Degerlendirme: Agir P2W (sesli topluluk tepkisiyle)**

- Forum konulari **"Gelisiguzel en kotu pay-to-win oyun"** (58+ yanit, 30+ begeni)
- Oyuncular **%40-60 daha guclu** takimlara karsi eslestiriliyor
- Degerlendirmeler algoritmalarin "ayda 20 GBP odemeye istekli olmadikca oyunculara karsi ayarlandigi"ni belirtmektedir
- **Bakimi icin ode modeli:** Dinlenme/saglik sistemi harcama yapmadan kadrolarin bozulmasina neden olur
- Jeton-kapili muzayedeler harcama yapanlarin F2P'yi her zaman asmalarini saglar

### 7.4 Surdurulebilirlik Puani: 5/10

Gelir balina yogunlasimiyla suruyor, ancak F2P oyuncu tabani eriyor.

---

## 8. Dream League Soccer

### 8.1 Genel Bakis

| Ozellik | Detay |
|---------|-------|
| **Gelistirici** | First Touch Games Ltd. |
| **Yayinci** | SEGA |
| **Platformlar** | iOS, Android |
| **Guncel** | Dream League Soccer 2026 |
| **Indirmeler** | 100M+ |
| **Puan** | 4.0/5 (13.6M degerlendirme) |
| **MAU** | 20M+ aylik aktif kullanici |
| **Lisanslama** | FIFPRO (4.000+ gercek oyuncu) |

### 8.2 Temel Oynanis
- Dokunmatik ekran kontrolleriyle tam 3D futbol simulasyonu
- Gercek atletlerden hareket yakalama animasyonlari
- Kariyer modu: sifirdan bir kulup kurma
- **Cevrimdisi oyun** -- onemli farklilasmaci
- Klan sistemi (2026 eklemesi)

### 8.3 P2W Analizi

**Degerlendirme: Hafif P2W -- Adil Mobil Futbol icin Altin Standart**

- Temel oynanis **beceri tabanli** -- dokunmatik ekran mekanikleri ve taktikler sonuclari kadro kalitesinden daha fazla belirler
- Elmaslar bir bosluk yaratir: 90+ puanli oyuncular etkili bir sekilde premium'a kilitli
- Ama cevrimdisi kariyer modu P2W'den tamamen etkilenmez
- **9.2/10 inceleme puani** monetizasyonun deneyimi ciddi sekilde bosmadigini gosteriyor

### 8.4 Surdurulebilirlik Puani: 8/10

Analiz edilen rakipler arasinda en surdurulebilir model. Beceri tabanli oynanis + adil F2P + cevrimdisi destek + sosyal ozellikler = en yuksek puanlar ve en guclu tutma.

---

## 9. Diger Onemli Rakipler

### 9.1 Total Football
- **Lansman:** 3 Kasim 2025
- **Indirmeler:** Haftalar icinde 10M+; 4.3 puan
- 4.000+ lisansli oyuncu; hizli buyume yeni girisenler icin guclu pazar talebini gosteriyor

### 9.2 Football Manager Mobile (FM26)
- Netflix aboneligi (SIFIR P2W)
- Mobilde en derin yonetim simulasyonu
- Futbol oyunlarinda sifir-P2W modellerin var olabildigini gosteriyor

### 9.3 UFL (United Football League)
- **Lansman:** Ocak 2025 (mobil)
- P2W'ye karsi acikca pazarlaniyor -- "fair-to-play" alternatif

### 9.4 Soccer Stars (Miniclip)
- 4.56/5 puan (2.2M degerlendirme)
- Masa ustu/kapak tarzi siradal futbol
- Orta P2W

### 9.5 Retro Goal
- 16-bit retro arkad futbol
- Minimal P2W (10 mactan sonra 0.99$ siniri)
- Basit uygulamanin basarili olabildigini kanitliyor

---

## 10. Karsilastirmali Analiz

### 10.1 P2W Yelpazesi

| Siralama | Oyun | P2W Seviyesi | Etki |
|----------|------|-------------|------|
| 1 | FM Mobile | Yok | Sifir IAP (Netflix modeli) |
| 2 | Retro Goal | Minimal | 0.99$ tek seferlik |
| 3 | **DLS 2026** | **Hafif** | **Beceri baskindur; elmaslar hizlandirir** |
| 4 | eFootball | Orta | Hizlandirma icin ode; yuksek beceri tavani |
| 5 | Score! Match | Orta | Kart yukseltmeleri + supheli DDA |
| 6 | EA FC Mobile | Agir | OVR odakli; P2W 5-20+ OVR ileride |
| 7 | Top Eleven | Agir | Jeton ekonomisi rekabetci oyunu domine eder |
| 8 | **Goley** | **Olumcul** | **P2W oyunu oldurdu** |

### 10.2 Beceri vs. Cuzdan Etkisi

| Oyun | Beceri : Cuzdan Orani | Notlar |
|------|----------------------|--------|
| DLS 2026 | 70:30 | Beceri baskindur; cuzdan hizlandirir |
| eFootball | 65:35 | Simulasyon derinligi beceriyi odullendirir |
| Score! Match | 60:40 | Kaydirma yurutmesi onemli ama kartlar yardim eder |
| EA FC Mobile | 45:55 | OVR farki sansli dogrudan etkiler |
| Top Eleven | 30:70 | Jeton ekonomisi kadro kalitesini belirler |
| Goley (gec) | 10:90 | Efsanevi kartlar beceriyi anlamsiz kildi |

### 10.3 Endustri Karsilastirma Degerleri (2025-2026)

| Metrik | Deger |
|--------|-------|
| Mobil oyun D1 tutma (en iyi oyunlar) | %40-50 |
| Spor oyunlari D1 tutma | %32.6 (en yuksek tur) |
| Spor oyunlari D30 tutma | %7.1 (en dusuk kayip turu) |
| Toplam mobil IAP geliri (2025) | 81.75 milyar$ |
| F2P mobil gelir payi | %97 |
| Gelirin %50+'sini olusturan oyuncular | En ust %2 (balinalar) |

---

## 11. Project F icin Dersler ve Oneriler

### 11.1 On Emir (Rakip Basarisizliklarindan)

1. **ASLA onceki tum katmanlari eskiten bir kart katmani tanitmayin** bir gecis plani olmadan. (Goley'in Efsanevi kartlari)

2. **ASLA oyuncu ilerlemesini sifirlamayin.** Endustri konustu -- FIFA Mobile 8 yillik kaybin ardindan rota degistirdi. eFootball sifirlamayi hic yapmamanin ise yaradigini kanitladi. Sifirlamalar en sadik oyuncularinizi cezalandirir.

3. **HER ZAMAN takim gucu VE beceri reytingine gore eslestirin**, sadece ranka gore degil. Ucretsiz oyuncular asla yenemeyecekleri balina takimlariyla karsilastirilmamali. (Goley'in 1 numarali UX basarisizligi)

4. **HER ZAMAN paket olasaliklarini** ayrintili olarak yayinlayin. Duzenleyici baski artiyor (Belcika, Guney Kore). Monetizasyonunuzu basinden seffaf olarak gelecege hazir hale getirin.

5. **ASLA oyuncularin odediklerini degersizlestirmeyin.** Insanlarin satin aldigini bedava verirseniz, hem gelir HEM de guven ayni anda kaybedersiniz. (Goley'in 4. Faz olum spirali)

6. **HER ZAMAN yeni oyuncular icin yakalama mekanikleri saglayin.** Bunlar olmadan oyununuz yeni gelenlere dusmanlasiyor ve buyume duruyor. (Goley'in gec katilim sorunu)

7. **HER ZAMAN hileyle hemen mucadele edin.** Geciken hile onleme hasari katlanarak biriktiriyor. (eFootball'un null sonuc sorunu; Goley'in exploit hosgorus)

8. **ASLA P2W'nin "yenilmez" sinirina ulasimasina izin vermeyin.** Harcama hizlandirmali, zafer garanti etmemeli. Beceri her zaman onemli olmali. (DLS/eFootball modeli vs. Goley/Top Eleven modeli)

9. **HER ZAMAN kart paketlerinin otesinde icerik cesitlendirin.** Yeni kartlar tek basina yeterli degil -- oyun modlari, etkinlikler, sosyal ozellikler, anlatim ilerlemesi gerekiyor. (Goley'in icerik durgunlugu)

10. **HER ZAMAN UI/UX ve teknik kaliteye yatirim yapin.** En iyi oynanis bile menuler hantal, sunucular kararsiz veya oyun bozuk ciktiginda basarisiz olur. (eFootball 2022 lansman felaketi)

### 11.2 Monetizasyon Tatli Noktasi

**DLS/eFootball bolgesini hedefleyin:**

```
[Yok] ---- [Hafif] ---- [Orta] ---- [Agir] ---- [Olumcul]
  FM          DLS        eFootball      FC Mobile     Goley
              ^^^^^^^^^^^^^^^^^
              PROJECT F HEDEF BOLGESI
```

**Onerilen Model:**
- **Cift para birimi:** Bol miktarda ucretsiz para birimi (oyunla kazanilan) + kit premium para birimi (elmaslar/jetonlar)
- **Sezon Pasi:** Anlamli odullerle ucretsiz katman + hizlandirma icin Premium katman (~10$/ay)
- **Belirleyici edinim:** Saf gacha olmadan belirli oyunculari edinme yollari sunun (eFootball'un Adaylama Sozlesmeleri gibi)
- **Kozmetik monetizasyon:** Formalar, sevinc animasyonlari, stadyumlar, efektler -- sifir P2W etkisiyle sonsuz gelir potansiyeli
- **Odullu reklamlar:** Gonullu, 30-60 saniyelik reklamlar icin ucretsiz para birimi (%62 mobil reklam geliri, %45-60 etkilesim)
- **Enerji sistemi YOK.** Oyuncularin istedikleri kadar oynamasina izin verin.

### 11.3 Kart Ekonomisi Tasarimi

**Goley'in Hatalarindan:**
- **Yumusak guc tavanlari** uygulayin -- hicbir kart altindaki katmandan 10 kat guclu olmamali
- Degeri koruyan **kart geri donusumu** olusturun (eFootball'un Oyuncu Birlestirmesi gibi)
- **Basarisizlik korumali yukseltme sistemleri** tasarlayin -- basarisizlikta yatirilmis kartlari asla yok etmeyin
- Tum kartlara bir deger tabani veren **takas/degisim pazari** olusturun
- **Kontrollü enflasyon** planlayin -- yeni kartlar kesin yukseltmeler degil, yonsel uzmanlasmalar olmali

**FIFA Mobile/FUT'dan:**
- Rasgele yildiz takimlari yerine temali kadrolari tesvik eden **kimya sistemi**
- Ekonomi enflasyonunu yoneten **SBC benzeri kart yutuklari**
- Oyunculara kart gelistirmede kontrol saglayan **evrim/ilerleme yollari**

### 11.4 Tutma Mimarisi

**En Iyi Uygulamalardan:**
1. **Cevrimdisi oyun destegi** (DLS) -- kotu baglanti nedeniyle oyuncu kaybetmeyin
2. **Kariyer/ilerleme modu** (DLS) -- rekabetci PvP otesinde uzun vadeli hedefler
3. **Hizli mac secenegi** (Score! Match / VSA) -- mobil oturumlar icin 2-3 dk maclar
4. **Sosyal sistemler** (Top Eleven dernek / DLS klanlar) -- sosyal baglar D30+ tutmayi iyilestirir
5. **Gercek dunya futbolu baglantilari** (FC Mobile Futbol Merkezi) -- canli futbol takvimine baglanin
6. **Sezonluk sifirlama yok** -- asla
7. **Yakalama mekanikleri** -- yeni oyuncularin rekabetcilik icin gecilebilir bir yolu olmali
8. **Birinci gunden hile onleme** -- hilenin deneyimi zehirlemesine izin vermeyin

### 11.5 Turk Pazari Ozellikleri (Goley'den)

- **Turkce spiker** Goley'in en sevilen ozelligiydi -- otantik Turkce yerelestirmeye yatirim yapin
- **Turk Lirasi volatilitesi** gercek bir is riskidir -- IAP'yi kararli para biriminde fiyatlandirin veya dinamik fiyatlandirma uygulayin
- **Dusuk ozellikli cihaz erisilebilirligi** Turkiye'de onemlidir -- orta segmenthedonanima optimize edin
- Turkce forumlar, sosyal medya ve destek uzerinden **topluluk katilimi** kritiktir
- ISG projesi Goley halefine talep oldugunu kanitliyor -- beklenen, yetersiz hizmet alan bir Turk kitlesi var

### 11.6 Lansman Kalitesi (eFootball'dan)

eFootball 2022, **F2P'de ilk izlenimlerin neredeyse asmanin imkansiz oldugunu** kanitliyor:
- Cilali, zengin icerikli deneyimle lansiman yapin
- Oynanisla birlikte UI/UX'e oncelik verin
- Lansimandan once sunucu kararliligi saglayin
- F2P'de asla "asgari yasayabilir urun" lansmanlamayin -- pazar ikinci bir sans vermez
- Harika cekirdek mekanikler basari icin gerekli ama YETERLI DEGIL

---

## 12. Kaynaklar

### Goley
- [Onedio - Goley'e Ne Oldu?](https://onedio.com/haber/zamaninda-fifa-ve-pes-serilerine-kafa-tutan-goley-e-ne-oldu-1027699)
- [Goley Wiki - Kart Gelistirme](https://goley.fandom.com/wiki/Kart_Geli%C5%9Ftirme)
- [Sikayetvar - Goley Sikayetleri](https://www.sikayetvar.com/joygame/goley)
- [Technopat - Goley Neden Guncellenmedi?](https://www.technopat.net/sosyal/konu/joygame-neden-goleye-guencelleme-getirmedi.2169329/)
- [Goley Global Wiki](https://goleyglobal.fandom.com/wiki/About_Goley)
- [ISG Ruhani Halef](https://www.technopat.net/sosyal/konu/yeni-futbol-oyunu-international-soccer-game-isg.2128395/)

### EA Sports FC Mobile / FUT
- [EA Sports FC Mobile Resmi](https://www.ea.com/en/games/ea-sports-fc/fc-mobile)
- [EA FC Mobile Paket Olasaliklari](https://www.ea.com/games/ea-sports-fc/fc-mobile/news/mobile-pack-probabilities)
- [EA FY26 Q1 Sonuclari](https://www.ea.com/news/electronic-arts-reports-q1-fy26-results)
- [Reddit r/FUTMobile](https://www.reddit.com/r/FUTMobile/)
- [Variety - EA Rekor Satislar](https://variety.com/2024/gaming/news/ea-sports-fc-electronic-arts-earnings-1235890705/)

### eFootball
- [eFootball Wikipedia](https://en.wikipedia.org/wiki/EFootball)
- [Konami eFootball Resmi](https://www.konami.com/efootball/)
- [eFootball Metacritic](https://www.metacritic.com/game/efootball-2024/)
- [Reddit r/pesmobile](https://www.reddit.com/r/pesmobile/)

### Score! Match / Top Eleven / DLS
- [Score! Match Google Play](https://play.google.com/store/apps/details?id=com.firsttouchgames.smp)
- [Top Eleven Wikipedia](https://en.wikipedia.org/wiki/Top_Eleven)
- [DLS 2026 Google Play](https://play.google.com/store/apps/details?id=com.firsttouchgames.dls7)
- [PocketTactics - En Iyi Futbol Oyunlari 2026](https://www.pockettactics.com/)

### Endustri Verileri
- Mobil oyun tutma karsilastirma degerleri (2025-2026 endustri raporlari)
- Toplam mobil IAP gelir verileri
- Ture ozel tutma istatistikleri

---

*Bu dokuman tum Project F Oyun Tasarim Dokumanlari icin temel teskil etmektedir. Her GDD bolumu monetizasyon, kart sistemleri, eslestirme ve oyuncu ilerlemesi hakkinda tasarim kararlari alirken bu analize referans vermalidir.*

*Hazirlayan: Pazar Analisti, YG Games*
*Tarih: 17 Mart 2026*
