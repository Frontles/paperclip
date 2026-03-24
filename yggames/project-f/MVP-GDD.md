# Project F — MVP Game Design Document

**Versiyon:** 1.0
**Tarih:** 2026-03-20
**Durum:** Onaylandı
**Engine:** Unity 6
**Platform:** Mobil (iOS/Android) + PC (düşünülüyor)

---

## 1. Oyun Özeti

Project F, 3v3 gerçek zamanlı mobil futbol oyunudur. Anime ilhamlı özel yetenekler, beceri odaklı oynanış ve adil ekonomi ile "Goley'in modern reenkarnasyonu" olarak konumlanır.

**MVP Hedefi:** Core gameplay loop'un eğlenceli olduğunu doğrulamak ve retention mekaniklerini test etmek.

**Temel Felsefe:**
- %70 beceri, %30 kart gücü
- Pay-to-win yok
- Sınırsız oynama (enerji sistemi yok)
- Şeffaf oranlar

---

## 2. MVP Fazları

| Faz | İçerik | Hedef |
|-----|--------|-------|
| **Faz 1** | Playable Prototype | Core loop eğlenceli mi? |
| **Faz 2** | Meta Game | Oyuncu tutma mekanikleri çalışıyor mu? |
| **Faz 3** | Multiplayer | Online deneyim sorunsuz mu? |

---

## 3. Faz 1 — Playable Prototype

### 3.1. Maç Yapısı

| Parametre | Değer | Not |
|-----------|-------|-----|
| Takım boyutu | 3v3 (2 saha oyuncusu + 1 kaleci) | `teamSize` config ile yönetilir, 6v6'ya scale edilebilir |
| Maç süresi | 2x2 dakika (toplam ~5 dk) | Devre arası 10 saniye |
| Saha boyutu | 40x25m (3v3 için optimize) | `fieldSize` config ile scale edilir |
| Top fiziği | Unity Physics 2D/3D | Gerçekçi ama arcade hisli |
| Kamera | Top-down dinamik | Topu takip eder, zoom in/out maç akışına göre |

### 3.2. Oyuncu Rolleri (3v3)

| Rol | Pozisyon | Temel Görev |
|-----|----------|-------------|
| **Forward (FW)** | Hücum | Gol atma, son pas |
| **Midfielder (MF)** | Orta saha | Pas organizasyonu, her iki yönde destek |
| **Goalkeeper (GK)** | Kale | Kurtarış, top dağıtımı |

Her rol farklı stat dağılımına sahiptir. Oyuncu aktif olarak 3 karakteri de kontrol eder — seçili olmayan karakterler basit AI ile hareket eder (pozisyon alma, boş adama koşma).

### 3.3. Kontrol Sistemi

**Hücum (Toplu):**

| Aksiyon | Kontrol | Detay |
|---------|---------|-------|
| Hareket | Sol joystick (sanal) | 360 derece, hız analog |
| Pas | Tek dokunuş (sağ taraf) | En yakın takım arkadaşına otomatik yönlendirilmiş pas |
| Yönlendirilmiş pas | Swipe + bırak | Swipe yönüne pas, mesafe swipe uzunluğuna göre |
| Şut | Şut butonu basılı tut + bırak | Basılı tutma süresi = güç. Swipe = yön/curve |
| Sprint | Sprint butonu basılı tut | Stamina tüketir, hız %30 artar |
| Özel yetenek | Yetenek butonu | Charge doluysa aktif (MVP'de 1-2 yetenek) |
| Oyuncu değiştirme | Karakter ikonuna dokunma | Aktif kontrol edilen oyuncuyu değiştirir |

**Savunma (Topsuz):**

| Aksiyon | Kontrol | Detay |
|---------|---------|-------|
| Hareket | Sol joystick | Aynı |
| Tackle | Tackle butonu | Zamanlama kritik — erken/geç = faul riski |
| Pressing | Pressing butonu basılı tut | Otomatik olarak top sahibine yaklaşır |
| Oyuncu değiştirme | Karakter ikonuna dokunma | Topa en yakın oyuncuya otomatik geçiş seçeneği |

**Kaleci (Otomatik + Manuel Override):**

| Aksiyon | Kontrol | Detay |
|---------|---------|-------|
| Pozisyonlama | Otomatik | AI temel pozisyon alır |
| Manuel kontrol | Kaleci ikonuna dokunma | Tam manuel kontrol (ileri çıkma, dalış yönü) |
| Dalış | Swipe (kale modunda) | Swipe yönüne dalış |

#### Klavye Kontrolleri (PC / Test)

Geliştirme ve PC oynanışı için tam klavye desteği. Mobil kontrollerin 1:1 karşılığıdır.

**Genel:**

| Tuş | Aksiyon |
|-----|---------|
| Ok tuşları (↑↓←→) | Hareket (8 yön) |
| Q | Yakındaki diğer oyuncuya geçiş |
| E | Sprint (basılı tut) |

**Hücum (Toplu):**

| Tuş | Aksiyon | Detay |
|-----|---------|-------|
| S | Kısa pas | En yakın takım arkadaşına |
| W | Ara pas | Uzun mesafe, oyuncular arası boşluğa |
| A | Orta açma | Kanattan ortaya |
| D | Şut | Basılı tutma süresi = güç |

**Savunma (Topsuz):**

| Tuş | Aksiyon | Detay |
|-----|---------|-------|
| D | Tackle | Zamanlama kritik |
| S | Pressing | Basılı tut — top sahibine yaklaşır |

**Kaleci (Manuel kontrol aktifken):**

| Tuş | Aksiyon | Detay |
|-----|---------|-------|
| W | Topa doğru açılma | Kaleci kaleyi bırakıp topa yönelir |
| Ok tuşları | Dalış yönü | Sol/sağ dalış |

**Yetenek:**

| Tuş | Aksiyon |
|-----|---------|
| Space | Özel yetenek aktivasyonu (charge doluysa) |

> Not: Klavye ve dokunmatik kontroller aynı `IInputProvider` interface'ini kullanır. `KeyboardInputProvider` eklenerek çalışır — mobil kontrol koduna dokunulmaz. Ayarlar menüsünden tuş atamaları değiştirilebilir (post-MVP).

### 3.4. Stat Sistemi

Her oyuncu kartı 6 temel stat'a sahiptir:

| Stat | Kısaltma | Etki Alanı |
|------|----------|------------|
| **Pace** | PAC | Koşu hızı, sprint hızı, ivmelenme |
| **Shooting** | SHO | Şut gücü, isabet, finişyon |
| **Passing** | PAS | Pas isabeti, pas mesafesi, vizyon |
| **Dribbling** | DRI | Top kontrolü, çalım başarısı, ilk dokunuş |
| **Defense** | DEF | Tackle başarısı, pozisyon alma, kesme |
| **Physical** | PHY | Dayanıklılık, güç, stamina kapasitesi |

**MVP'de stat aralıkları (3 tier):**

| Tier | Stat Aralığı | Maks Toplam | Renk Kodu |
|------|-------------|-------------|-----------|
| **Normal** | 40-60 | 330 | Gri |
| **Rare** | 65-82 | 456 | Mavi |
| **Expert** | 75-90 | 510 | Mor |

> Not: Full GDD'de 5 tier var (Normal, Special, Rare, Expert, Super). MVP'de 3 tier yeterli. Special ve Super tier'ları sonra eklenir.

**Kaleci Özel Statları:**
GK rolündeki kartlar farklı stat yorumuna sahiptir:
- PAC → Refleks hızı
- SHO → Top dağıtımı
- PAS → Aynı
- DRI → Kale çıkışı
- DEF → Pozisyonlama
- PHY → Dalış mesafesi

### 3.5. Stamina Sistemi

| Parametre | Değer |
|-----------|-------|
| Maks stamina | 100 |
| Normal koşu tüketimi | 0 (pasif yenilenir) |
| Sprint tüketimi | 15/saniye |
| Yenilenme hızı | 5/saniye (sprintsiz) |
| Stamina bittiğinde | Sprint yapılamaz, hareket %20 yavaşlar |

Stamina yönetimi skill expression'ın önemli bir parçasıdır — doğru zamanda sprint yapmak maç kazandırır.

### 3.6. AI Rakip (Single Player)

MVP Faz 1'de rakip AI kontrollüdür.

**AI State Machine:**

```
IDLE → CHASE_BALL → HAS_BALL → ATTACKING → SHOOTING
                  ↓                         ↓
              DEFENDING ← LOSE_BALL ← TACKLED
```

**AI Zorluk Seviyeleri:**

| Seviye | Pas İsabeti | Şut İsabeti | Tackle Zamanlaması | Pozisyon Alma |
|--------|-------------|-------------|-------------------|---------------|
| Kolay | %60 | %40 | Geç | Zayıf |
| Normal | %75 | %55 | Orta | Orta |
| Zor | %85 | %70 | İyi | İyi |

AI, `InputProvider` interface'ini kullanır — aynı interface oyuncu ve ileride network input için de kullanılır.

### 3.7. Input Soyutlama (Mimari Kritik)

```
IInputProvider (Interface)
├── PlayerInputProvider    → Dokunmatik/gamepad input
├── AIInputProvider        → AI state machine kararları
└── NetworkInputProvider   → (Faz 3) Sunucudan gelen input
```

Tüm game logic `IInputProvider`'dan input alır. Bu sayede:
- Faz 1: AI vs Player → aynı kod
- Faz 3: Remote Player vs Player → aynı kod, sadece yeni provider

### 3.8. Authoritative Game Logic

MVP'den itibaren tüm oyun mantığı **authoritative server** mimarisinde yazılır:

```
[Game Server (Logic)]
    ├── Fizik hesaplamaları
    ├── Çarpışma tespiti
    ├── Gol tespiti
    ├── Faul/kart kararları
    ├── Stat etkileri
    └── Maç durumu (skor, süre, stamina)
         ↓
[Client (Görsel)]
    ├── Input gönderimi
    ├── State rendering
    ├── Animasyonlar
    ├── UI
    └── Client-side prediction (Faz 3)
```

**Faz 1'de:** Server ve client aynı makinede çalışır (local authoritative). Game logic ayrı bir modüldedir — network layer olmadan çalışır ama network layer eklenebilir yapıdadır.

**Faz 3'te:** Aynı game logic modülü remote sunucuya taşınır. Client sadece input gönderir, server state hesaplar ve broadcast eder.

### 3.9. Maç Akışı

```
1. MAÇA HAZIRLIK
   → Kadro seçimi (kart yerleştirme)
   → Formasyon seçimi
   → Rakip eşleşme (AI veya online)

2. MAÇ BAŞLANGICI
   → Vuruş seçimi (yazı-tura)
   → Devre başlar

3. OYUN İÇİ
   → Gerçek zamanlı 3v3 futbol
   → Gol → kutlama animasyonu → tekrar başla
   → Faul → serbest vuruş mini-game
   → Devre sonu → kısa istatistik ekranı

4. MAÇ SONU
   → Sonuç ekranı (skor, goller, asistler)
   → MVP oyuncu seçimi
   → Ödüller (XP, coin)
   → "Tekrar Oyna" / "Ana Menü" seçimi
```

### 3.10. Saha & Ortam

**MVP Sahası:**
- Tek saha: "Varsayılan Stadyum"
- Boyut: 40x25m (3v3 optimize)
- Çim dokusu, çizgi işaretleri, kale direkleri, corner bayrakları
- Basit tribün (placeholder, detay yok)
- Gündüz aydınlatması (tek zaman dilimi)
- Hava durumu yok (MVP'de)

> Config: `fieldWidth`, `fieldHeight` parametreleri ile saha boyutu dinamik ayarlanır. 6v6'ya geçişte 60x40m yapılır.

### 3.11. Placeholder Art Sistemi

MVP'de tüm karakterler **placeholder modeller** kullanır:

| Öğe | Placeholder | Final |
|-----|-------------|-------|
| Oyuncu modeli | Renkli capsule/robot | Chibi karakter |
| Animasyonlar | Temel koşu/şut/tackle | Anime-stilize |
| Top | Basit küre | Detaylı futbol topu |
| Saha | Flat plane + çizgiler | 3D stadyum |
| UI ikonları | Basit şekiller | Çizilmiş ikonlar |

**Swap-ready mimari:**
- Her karakter `CharacterVisual` component'ı taşır
- `CharacterVisual` → `modelPrefab` reference'ı ile çalışır
- Model değiştirmek = prefab reference'ı değiştirmek (kod değişikliği yok)
- Animasyonlar Animator Controller üzerinden → yeni model aynı controller'ı kullanır (Humanoid rig)

---

## 4. Faz 2 — Meta Game

### 4.1. Kart Sistemi

#### 4.1.1. Kart Tipleri

**MVP'de sadece Oyuncu Kartı:**

Her kart şu bilgilere sahiptir:
- **ID** — Benzersiz tanımlayıcı
- **İsim** — Karakter adı
- **Rol** — FW / MF / GK
- **Tier** — Normal / Rare / Expert
- **Stats** — PAC, SHO, PAS, DRI, DEF, PHY
- **Yetenek slotu** — 1 adet (boş olabilir)
- **Element** — Fire / Ice / Lightning / Wind / Shadow (MVP'de sadece görsel fark)
- **Görsel** — Model prefab reference, kart art reference

> Not: Manager Kartı ve Takım Kartı full GDD'de var, MVP'de yok.

#### 4.1.2. Kart Havuzu (MVP)

MVP'de toplam **30 kart:**

| Tier | FW | MF | GK | Toplam |
|------|----|----|-----|--------|
| Normal | 5 | 5 | 2 | 12 |
| Rare | 4 | 4 | 2 | 10 |
| Expert | 3 | 3 | 2 | 8 |
| **Toplam** | **12** | **12** | **6** | **30** |

Her kart benzersiz stat dağılımına sahiptir. Bazı kartlar belirli rollerde daha iyidir (örn: yüksek SHO'lu FW, yüksek PAS'lı MF).

#### 4.1.3. Paket Sistemi

**Standart Paket (Coin ile alınır):**
- 3 kart içerir
- Drop oranları: Normal %60, Rare %30, Expert %10
- Fiyat: 500 coin

**Premium Paket (Gem ile alınır):**
- 3 kart içerir
- Drop oranları: Normal %20, Rare %50, Expert %30
- Fiyat: 300 gem

**Pity sistemi:** 10 Standart Paket açıldığında Rare+ garanti. 5 Premium Paket açıldığında Expert garanti. Sayaç görünür.

**Duplikat kartlar:** Coin'e dönüştürülür (recycle). Normal: 50 coin, Rare: 200 coin, Expert: 500 coin.

### 4.2. Kadro Kurma

**Kadro yapısı:**
- 3 başlangıç oyuncusu (1 FW, 1 MF, 1 GK — veya 2 FW + 1 GK, 2 MF + 1 GK gibi esnek)
- Yedek yok (MVP'de)
- Formasyon: Sabit (MVP'de tek formasyon: 1-1-1)

> Not: Full GDD'deki formasyon sistemi (2-1, 1-2 vb.) ve yedek oyuncu MVP sonrasına kalır.

**Kadro gücü hesaplama:**
```
TeamPower = (Toplam stat ortalaması × 6) / 6
```
Basit ortalama. Matchmaking'de kullanılır (Faz 3).

### 4.3. Hesap Seviye Sistemi

Oyuncunun genel ilerleme hissi veren hesap seviyesi:

| Seviye | Gereken XP | Toplam XP | Seviye Ödülü |
|--------|-----------|-----------|-------------|
| 1 → 2 | 100 | 100 | 200 coin |
| 2 → 3 | 200 | 300 | 300 coin |
| 3 → 4 | 350 | 650 | Standart Paket ×1 |
| 4 → 5 | 500 | 1,150 | 500 coin |
| 5 → 6 | 700 | 1,850 | 50 gem |
| 6 → 7 | 900 | 2,750 | 700 coin |
| 7 → 8 | 1,200 | 3,950 | Standart Paket ×1 |
| 8 → 9 | 1,500 | 5,450 | 1,000 coin |
| 9 → 10 | 2,000 | 7,450 | Premium Paket ×1 |
| 10 → 11 | 2,500 | 9,950 | 100 gem |
| 11+ | +500 per level | ... | Alternating: coin / paket / gem |

**XP Kaynakları:**

| Kaynak | XP Miktarı |
|--------|-----------|
| Maç kazanma | 50 XP |
| Maç kaybetme | 20 XP |
| Beraberlik | 35 XP |
| Gol atma (maç başına maks 3) | 10 XP/gol |
| Günlük ilk maç bonusu | 25 XP |

> MVP'de max seviye **20** ile sınırlıdır. Full release'de genişletilir.

### 4.4. Özel Yetenekler (MVP'de 2 Adet)

MVP'de sadece konsepti göstermek için **2 yetenek:**

#### Yetenek 1: Power Shot (Hücum — Fire)
| Parametre | Değer |
|-----------|-------|
| Kategori | Offensive |
| Element | Fire |
| Tier | 1 (Bronze) |
| Cooldown | 15 saniye |
| Etki | Şut gücü ve isabeti %50 artar, top ateş efekti alır |
| Süre | Tek kullanım (bir şut) |
| Aktivasyon | Yetenek butonu + şut |
| Karşı hamle | Kaleci doğru yöne dalış, savunma bloğu |

#### Yetenek 2: Iron Wall (Savunma — Ice)
| Parametre | Değer |
|-----------|-------|
| Kategori | Defensive |
| Element | Ice |
| Tier | 1 (Bronze) |
| Cooldown | 15 saniye |
| Etki | 3 saniye boyunca DEF ve PHY %40 artar, tackle başarı oranı %80'e çıkar |
| Süre | 3 saniye |
| Aktivasyon | Yetenek butonu |
| Karşı hamle | Yetenekli oyuncuyu pas ile bypass etme |

**Charge sistemi (MVP basitleştirilmiş):**
- Maç başlangıcında bar boş
- 30 saniyede bir bar dolar (pasif)
- Gol atma/yeme = anında dolma
- Maç başına oyuncu başına maks 2 kullanım

> Not: Full GDD'de 26 yetenek, 5 element, 3 tier ve detaylı combo sistemi var. MVP'de sadece bu 2 yetenek.

### 4.5. Ekonomi (MVP)

#### Coin (Soft Currency)

| Kaynak | Miktar |
|--------|--------|
| Maç kazanma | 100 coin |
| Maç kaybetme | 40 coin |
| Beraberlik | 70 coin |
| Günlük ilk maç bonusu | 50 coin ekstra |
| Seviye ödülü | 200-1000 coin |
| Duplikat kart recycle | 50-500 coin |

**Harcama alanları:**
- Standart Paket: 500 coin
- (İleride: merge, eğitim, market)

#### Gem (Hard Currency)

| Kaynak | Miktar |
|--------|--------|
| Seviye ödülü (5, 10, 15, 20) | 50-100 gem |
| MVP'de başlangıç hediyesi | 300 gem |
| (İleride: başarımlar, ranked ödülleri, IAP) |  |

**Harcama alanları:**
- Premium Paket: 300 gem
- (İleride: cosmetics, battle pass, hızlı merge)

> Not: MVP'de IAP (gerçek para ile satın alma) yok. Ekonomi sadece oyun içi kazanımlarla test edilir.

---

## 5. Faz 3 — Multiplayer

### 5.1. Network Mimarisi

```
[Dedicated Server]
    ├── Game State (authoritative)
    ├── Fizik simülasyonu
    ├── Input validation
    ├── Anti-cheat
    └── State broadcast (tick-rate: 30Hz)
         ↓ ↑
[Client A]              [Client B]
├── Input gönderimi     ├── Input gönderimi
├── Client-side         ├── Client-side
│   prediction          │   prediction
├── Server              ├── Server
│   reconciliation      │   reconciliation
├── Entity              ├── Entity
│   interpolation       │   interpolation
└── Render              └── Render
```

### 5.2. Client-Side Prediction

Oyuncunun kendi karakteri için:
1. Input'u hemen uygula (prediction)
2. Aynı input'u sunucuya gönder
3. Sunucudan doğrulanmış state geldiğinde karşılaştır
4. Fark varsa düzelt (reconciliation — smooth interpolation ile, snap değil)

### 5.3. Matchmaking (MVP Basit)

| Parametre | Değer |
|-----------|-------|
| Eşleşme tipi | Random (MVP'de MMR yok) |
| Bekleme süresi | Maks 30 saniye |
| Bulunamazsa | AI rakip ile doldur |
| Bağlantı kontrolü | Ping check — 200ms+ uyarı, 500ms+ disconnect |

> Not: Full GDD'deki MMR bazlı matchmaking (65% skill / 35% power ağırlıklı), power gap override, ve tier sistemi MVP sonrasında eklenir.

### 5.4. Disconnect Handling

| Durum | Aksiyon |
|-------|---------|
| Bağlantı kopması (< 10sn) | Otomatik yeniden bağlanma, AI geçici devralır |
| Bağlantı kopması (> 10sn) | Maç devam eder, AI kalıcı olarak devralır |
| Bağlantı kopması (> 30sn) | Mağlubiyet sayılır |
| Kasıtlı çıkış | Mağlubiyet + ceza (MVP'de sadece coin cezası) |

---

## 6. UI/UX Tasarımı

### 6.1. Ekran Akışı (MVP)

```
[Splash Screen]
    ↓
[Ana Menü]
    ├── Oyna → [Maç Bulma] → [Maç] → [Maç Sonu]
    ├── Kadrom → [Kart Listesi] → [Kadro Düzenleme]
    ├── Paketler → [Paket Açma Animasyonu]
    ├── Profil → [Hesap Seviyesi, İstatistikler]
    └── Ayarlar → [Ses, Dil, Kontroller]
```

### 6.2. Ana Menü

- Oyuncunun aktif kadrosu arka planda görünür (3 karakter idle animasyonda)
- Hesap seviyesi + XP bar üst kısımda
- Coin ve Gem göstergesi sağ üstte
- Alt navigasyon: Oyna / Kadrom / Paketler / Profil / Ayarlar
- "Oyna" butonu büyük ve belirgin (ana aksiyon)

### 6.3. Maç İçi HUD

```
┌─────────────────────────────────────┐
│  [Skor]    [Süre]    [Devre]        │
│  HOME 0 - 0 AWAY     1st 1:42      │
├─────────────────────────────────────┤
│                                     │
│           [Oyun Alanı]              │
│                                     │
├─────────────────────────────────────┤
│ [Stamina Bar]                       │
│ [Joystick]     [Pas] [Şut] [Yetnek]│
│                [Sprint] [Tackle]    │
│ [Oyuncu 1] [Oyuncu 2] [Oyuncu 3]   │
└─────────────────────────────────────┘
```

- Joystick: Sol alt köşe, sanal, şeffaf
- Aksiyon butonları: Sağ alt köşe, bağlama göre değişir (toplu/topsuz)
- Oyuncu seçimi: Alt kısımda 3 ikon, dokunarak geçiş
- Yetenek butonu: Charge dolunca yanıp söner

### 6.4. Maç Sonu Ekranı

```
┌─────────────────────────────────────┐
│           MACC SONU                 │
│                                     │
│        HOME 3 - 1 AWAY             │
│          ★ KAZANDIN! ★             │
│                                     │
│  ┌─────┐ ┌─────┐ ┌─────┐          │
│  │MVP  │ │ FW  │ │ MF  │          │
│  │⭐   │ │     │ │     │          │
│  │2 gol│ │1 gol│ │1 ast│          │
│  └─────┘ └─────┘ └─────┘          │
│                                     │
│  Ödüller:                          │
│  💰 150 coin  ⭐ 50 XP             │
│                                     │
│  [Tekrar Oyna]  [Ana Menü]         │
└─────────────────────────────────────┘
```

### 6.5. Paket Açma

- Paket görselinin üstüne dokunma → açılma animasyonu
- Kartlar tek tek dönerek çıkar (rarity'e göre efekt yoğunluğu artar)
- Normal: basit parıltı
- Rare: mavi ışık patlaması
- Expert: mor şimşek efekti
- "Yeni kart!" veya "Duplikat → X coin" gösterimi
- Hızlı geçme seçeneği (animasyonu skip)

### 6.6. Kadro Düzenleme

```
┌─────────────────────────────────────┐
│  KADROM          Güç: 72.5          │
│                                     │
│        ┌─────┐                      │
│        │ FW  │                      │
│        │PAC82│                      │
│        └─────┘                      │
│    ┌─────┐                          │
│    │ MF  │                          │
│    │PAS78│                          │
│    └─────┘                          │
│        ┌─────┐                      │
│        │ GK  │                      │
│        │DEF85│                      │
│        └─────┘                      │
│                                     │
│  [Kart Listesi]  [Kaydet]           │
└─────────────────────────────────────┘
```

- Pozisyona dokunma → kart listesi açılır (o role uygun kartlar filtrelenir)
- Kart seçimi → stat karşılaştırma gösterilir
- Kadro gücü üstte dinamik güncellenir

---

## 7. Ses Tasarımı (MVP)

| Kategori | İçerik |
|----------|--------|
| **Müzik** | Ana menü tema (enerji dolu, anime vibe), Maç müziği (tempolu, döngüsel) |
| **SFX — Maç** | Top tekmeleme, pas sesi, gol sesi, ağ sesi, düdük (başla/bitir/faul) |
| **SFX — Yetenek** | Power Shot: ateş woosh, Iron Wall: buz kristali sesi |
| **SFX — UI** | Buton tıklama, paket açma, kart çevirme, seviye atlama |
| **Kalabalık** | Gol tezahüratı, ıslık (faul), genel uğultu |

> MVP'de seslerin çoğu royalty-free veya placeholder olabilir. Kendi ses tasarımı final aşamada yapılır.

---

## 8. Teknik Mimari

### 8.1. Unity Proje Yapısı

```
Assets/
├── Scripts/
│   ├── Core/                    # Game logic (authoritative)
│   │   ├── Match/               # Maç yönetimi, skor, süre
│   │   ├── Physics/             # Top fiziği, çarpışma
│   │   ├── Player/              # Oyuncu hareket, stat etkileri
│   │   ├── AI/                  # AI state machine
│   │   ├── Ability/             # Yetenek sistemi
│   │   └── Input/               # IInputProvider interface
│   ├── Meta/                    # Meta game
│   │   ├── Cards/               # Kart sistemi, envanter
│   │   ├── Economy/             # Coin, gem, paket
│   │   ├── Progression/         # Hesap seviyesi, XP
│   │   └── Squad/               # Kadro yönetimi
│   ├── UI/                      # Tüm UI ekranları
│   ├── Network/                 # (Faz 3) Network layer
│   └── Utils/                   # Config, helpers, extensions
├── Prefabs/
│   ├── Characters/              # Karakter prefab'ları (swap-ready)
│   ├── Field/                   # Saha prefab'ları
│   ├── UI/                      # UI prefab'ları
│   └── Effects/                 # VFX prefab'ları
├── ScriptableObjects/
│   ├── Cards/                   # Kart verileri (stat, tier, element)
│   ├── Abilities/               # Yetenek verileri
│   ├── Config/                  # Oyun config'leri
│   └── Economy/                 # Ekonomi dengeleme verileri
├── Animations/
│   ├── Character/               # Humanoid animasyonlar
│   └── UI/                      # UI animasyonlar
├── Audio/
│   ├── Music/
│   └── SFX/
└── Resources/
    └── Localization/            # Çoklu dil dosyaları
```

### 8.2. Config Sistemi

Tüm oyun parametreleri **ScriptableObject** tabanlı config'lerden okunur:

```csharp
[CreateAssetMenu(menuName = "Config/MatchConfig")]
public class MatchConfig : ScriptableObject
{
    public int teamSize = 3;           // 3 → 6 geçişi buradan
    public float fieldWidth = 40f;     // 3v3: 40m, 6v6: 60m
    public float fieldHeight = 25f;    // 3v3: 25m, 6v6: 40m
    public float halfDuration = 120f;  // saniye
    public float halftimeBreak = 10f;
    public int maxAbilityUsesPerPlayer = 2;
}
```

Bu config dosyaları Unity Inspector'da düzenlenebilir — kod değişikliği gerekmez.

### 8.3. Veri Saklama (MVP)

| Veri | Depolama | Not |
|------|----------|-----|
| Oyuncu profili | PlayerPrefs + JSON | MVP'de local, sonra sunucu |
| Kart envanter | JSON dosya | Kartlar, statlar, yetenekler |
| Kadro | JSON dosya | Aktif kadro kompozisyonu |
| Ayarlar | PlayerPrefs | Ses, dil, kontrol tercihleri |
| Ekonomi | JSON dosya | Coin, gem miktarları |

> Faz 3'te tüm veri sunucu tarafında saklanır (Playtolia backend?). MVP'de local yeterli.

### 8.4. Localization

- `Resources/Localization/` altında dil dosyaları
- MVP'de: Türkçe (varsayılan) + İngilizce
- Unity'nin built-in Localization paketi veya I2 Localization

---

## 9. Performans Hedefleri

| Metrik | Hedef |
|--------|-------|
| FPS (mobil) | 60 FPS sabit |
| Bellek | < 500 MB RAM |
| APK boyutu | < 150 MB (ilk indirme) |
| Yükleme süresi | < 5 saniye (maça giriş) |
| Batarya | 2+ saat kesintisiz oynama |
| Network (Faz 3) | < 100ms latency hedef |

---

## 10. MVP Başarı Metrikleri

Bu metrikler MVP'nin başarılı olup olmadığını belirler:

| Metrik | Hedef | Ölçüm |
|--------|-------|-------|
| **Core Loop Eğlence** | Test oyuncularının %70'i "tekrar oynarım" demeli | Anket |
| **Oturum Süresi** | Ortalama 15+ dakika (3+ maç) | Analytics |
| **D1 Retention** | %40+ (oyuncuların %40'ı ertesi gün döner) | Analytics |
| **D7 Retention** | %20+ | Analytics |
| **Maç Tamamlama** | %90+ (başlanan maçların %90'ı bitirilir) | Analytics |
| **Kart Sistemi Etkileşimi** | Oyuncuların %60'ı en az 5 paket açar | Analytics |
| **Teknik Stabilite** | Crash rate < %1 | Firebase/Crashlytics |

---

## 11. MVP Dışında Kalan Özellikler (Post-MVP Roadmap)

Bu özellikler MVP'de **yoktur** ve ileride eklenecektir:

| Özellik | Planlanan Versiyon |
|---------|-------------------|
| 6v6 maç modu | v1.1 |
| Special ve Super kart tier'ları | v1.1 |
| Kart birleştirme (merge) sistemi | v1.1 |
| Kart seviye sistemi (XP ile level up) | v1.1 |
| Manager kartları | v1.2 |
| Takım kartları | v1.2 |
| Kimya (chemistry) sistemi | v1.2 |
| Formasyon çeşitliliği | v1.2 |
| Kalan 24 özel yetenek | v1.2+ |
| Element combo sistemi | v1.2 |
| MMR bazlı matchmaking | v1.3 |
| Ranked sistem (tier/division) | v1.3 |
| Turnuva modu | v1.3 |
| Lig modu | v1.4 |
| Sezon sistemi (90 gün) | v1.4 |
| Battle Pass | v1.4 |
| Cosmetics (skin, kutlama, efekt) | v1.5 |
| Sosyal özellikler (arkadaş, klan) | v1.5 |
| Trading/market sistemi | v1.5 |
| Reklam sistemi (rewarded ads) | v1.5 |
| IAP (gerçek para satın alma) | v1.5 |
| Boss Match (PvE events) | v2.0 |
| Hikaye modu | v2.0 |

---

## 12. Risk Analizi

| Risk | Olasılık | Etki | Önlem |
|------|----------|------|-------|
| 3v3 yeterince eğlenceli olmayabilir | Orta | Yüksek | Erken playtesting, hızlı pivot imkanı (config-based tasarım) |
| Mobil kontroller yetersiz kalabilir | Orta | Yüksek | Birden fazla kontrol şeması testi, oyuncu geri bildirimi |
| AI çok kolay/zor olabilir | Yüksek | Orta | Zorluk seviyeleri config'den ayarlanabilir |
| Authoritative mimari karmaşıklık | Düşük | Orta | Local authoritative ile başla, network layer sonra |
| Placeholder art motivasyon düşürebilir | Orta | Düşük | Minimum seviyede görsel kalite, temiz UI |
| Ekonomi dengesi bozuk olabilir | Orta | Orta | Config-based tüm değerler, A/B test imkanı |

---

## Ek A: Terimler Sözlüğü

| Terim | Açıklama |
|-------|----------|
| **Authoritative Server** | Oyun durumunu tek doğru kaynak olarak yöneten sunucu |
| **Client-side Prediction** | Client'ın sunucu onayı beklemeden input sonucunu tahmin etmesi |
| **Reconciliation** | Sunucu state'i ile client prediction arasındaki farkın düzeltilmesi |
| **IInputProvider** | Oyuncu, AI veya network input'unu soyutlayan arayüz |
| **ScriptableObject** | Unity'de veri taşıyıcı asset tipi (kod gerektirmeden düzenlenebilir) |
| **Config-based** | Oyun parametrelerinin kod değişikliği olmadan ayarlanabilmesi |
| **Swap-ready** | Model/asset değişikliğinin sadece referans değiştirerek yapılabilmesi |
| **Pity System** | Belirli sayıda başarısız denemeden sonra garantili başarı |
| **Soft Currency** | Oyun içi kazanılan para birimi (Coin) |
| **Hard Currency** | Premium para birimi (Gem) |
| **Retention** | Oyuncuların belirli süre sonra oyuna geri dönme oranı |
| **Core Loop** | Oyuncunun tekrar tekrar yaptığı temel döngü |
