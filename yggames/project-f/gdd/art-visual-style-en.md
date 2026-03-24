# GDD-05: Art & Visual Style

**Document Code:** GDD-05
**Version:** 1.0
**Date:** March 17, 2026
**Author:** Game Designer Agent, YG Games
**Status:** Draft
**Related Documents:** [GDD-00: Competitor Analysis](docs/00-competitor-analysis-en.md) | [GDD-01: Core Game Design](core-game-design-en.md) | [GDD-02: Card Collection System](card-collection-system-en.md)

---

## Table of Contents

1. [Art Direction](#1-art-direction)
2. [Character Design](#2-character-design)
3. [UI Visual Style](#3-ui-visual-style)
4. [Card Frame Design](#4-card-frame-design)
5. [Stadium & Environment Design](#5-stadium--environment-design)
6. [Animation Standards](#6-animation-standards)
7. [Visual Effects (VFX)](#7-visual-effects-vfx)
8. [Lighting & Atmosphere](#8-lighting--atmosphere)
9. [Technical Art Standards](#9-technical-art-standards)
10. [Reference Board](#10-reference-board)
11. [P2W & Sustainability Evaluation](#11-pw--sustainability-evaluation)

---

## 1. Art Direction

### 1.1 Vision Statement

> **"Goley's charm, reimagined with modern quality — a football world you want to live in."**

Project F's visual identity fuses the beloved chibi aesthetic that made Goley unforgettable with contemporary rendering techniques and mobile-optimized quality. We build a world that is instantly recognizable, emotionally engaging, and technically performant on mid-range smartphones.

### 1.2 Core Pillars

| Pillar | Description |
|--------|-------------|
| **Charming & Expressive** | Characters exude personality through exaggerated proportions, large expressive eyes, and distinct silhouettes. Every player feels alive. |
| **Readable & Mobile-First** | Every visual element must be clear on a 5.5" screen at 720p. Silhouettes over detail. Contrast over subtlety. |
| **Competitive Yet Fun** | The tone balances competitive intensity with playful charm. Matches feel high-stakes but never stressful or dark. |
| **Distinct & Ownable** | No one should mistake Project F for another game. Our chibi football identity is our brand moat. |
| **Performant & Inclusive** | Target 60 FPS on mid-range devices (Snapdragon 6-series / Dimensity 7000). Beauty through art direction, not polygon count. |

### 1.3 Tone Spectrum

```
Realistic -------|-----------|-----------|-----------|--- Cartoon
                  FIFA/eFootball       DLS          Project F    Score! Match
                  (Photorealism)    (Semi-real)    (Chibi 3D)    (2D casual)
```

Project F sits firmly in the **Stylized 3D** zone — more detailed than Score! Match's flat 2D, more charming than DLS's semi-realism, and entirely distinct from FIFA's photorealistic approach.

### 1.4 Color Philosophy

**Primary Palette:**

| Color | Hex | Usage |
|-------|-----|-------|
| **Project F Green** | `#2ECC71` | Pitch, positive actions, currency (Coins) |
| **Champion Gold** | `#F1C40F` | Premium elements, achievements, Gem currency |
| **Deep Navy** | `#1A1A2E` | Backgrounds, headers, depth |
| **Pure White** | `#FFFFFF` | Text, card backgrounds, clean surfaces |
| **Action Red** | `#E74C3C` | Alerts, defeats, time pressure |

**Accent Palette (Rarity Tiers):**

| Tier | Primary Color | Secondary | Frame Style |
|------|--------------|-----------|-------------|
| **Normal (N)** | `#95A5A6` Silver-Gray | `#BDC3C7` | Simple matte border |
| **Rare (R)** | `#3498DB` Royal Blue | `#2980B9` | Subtle metallic sheen |
| **Epic (E)** | `#9B59B6` Royal Purple | `#8E44AD` | Animated glow border |
| **Super (S)** | `#F39C12` Amber Gold | `#E67E22` | Pulsing energy frame |
| **Legend (L)** | `#E74C3C` Deep Red | `#C0392B` | Holographic shimmer (seasonal only) |

> **Note:** Legend tier only appears as seasonal rewards, never purchasable. See [GDD-02](card-collection-system-en.md) for tier details.

### 1.5 Lessons from Competitors

| Competitor | Visual Strength | Visual Weakness | Our Takeaway |
|-----------|----------------|-----------------|-------------|
| **Goley** | Charming chibi style, memorable celebrations | Dated textures, low-poly environments | Keep the charm, upgrade the quality |
| **FC Mobile** | High-fidelity player likenesses | Too realistic for mobile — uncanny valley on small screens | Stylized > realistic on mobile |
| **eFootball** | Best-in-class animations, PBR rendering | Massive file sizes (5+ GB), ugly UI at launch | Quality animations ≠ bloat; UI matters from day one |
| **DLS** | Clean semi-realistic style, good readability | Generic, lacks distinctive identity | Own our identity — chibi IS our brand |
| **Score! Match** | Strong 2D card art, clean UI | Simplistic in-match visuals, feels cheap | Card art quality + match visuals both matter |

**Reference:**
- Goley's visual charm analysis: [GDD-00, Section 2](docs/00-competitor-analysis-en.md)
- FC Mobile's visual critique: [GDD-00, Section 3](docs/00-competitor-analysis-en.md)

---

## 2. Character Design

### 2.1 Proportions & Body Model

**Base Proportions:** 2.5-head chibi ratio (head = 40% of total height)

| Body Part | Proportion | Notes |
|-----------|-----------|-------|
| **Head** | 40% of height | Oversized, round, expressive |
| **Torso** | 25% of height | Compact, athletic build |
| **Legs** | 25% of height | Stubby but dynamic |
| **Arms** | 10% of height | Short, gesture-friendly |
| **Hands** | Mitten-style | 4 fingers (3 + thumb), simplified |
| **Feet** | Oversized boots | Emphasize kicking, football identity |

**Key Design Rules:**
- **No noses** — following Goley tradition, characters have noseless faces for maximum cuteness
- **Large eyes** — 30% of face width, highly expressive with visible iris color
- **Minimal ears** — small or hidden by hairstyle
- **Round silhouettes** — avoid sharp angles; everything curves
- **Gender parity** — both male and female body models with equal expressiveness

### 2.2 Face Customization System

Players select from **100+ face presets** when creating cards (see [GDD-02, Section 3.2](card-collection-system-en.md)).

**Face Components:**

| Component | Variants | Customization |
|-----------|----------|---------------|
| **Eye Shape** | 20 styles | Round, narrow, fierce, cheerful, cool |
| **Eye Color** | 12 colors | Natural + fantasy (amber, violet, crimson) |
| **Eyebrows** | 15 styles | Thick, thin, angled, round, scar-through |
| **Mouth** | 10 default expressions | Smile, serious, smirk, determined |
| **Hair** | 30 styles | Short, long, mohawk, braids, bald, afro, etc. |
| **Hair Color** | 16 colors | Natural tones + fantasy (blue, pink, silver) |
| **Skin Tone** | 10 tones | Full spectrum of natural skin tones |
| **Facial Marks** | 8 options | Scar, face paint, freckles, bandage |
| **Accessories** | 12 options | Headband, glasses, mask, earring |

**Reference Images:**
- Face customization in chibi games: [Chibi Character Customization Examples](https://www.pinterest.com/cliford79/chibi-characters/)
- Chibi face expression guides: [How to Draw Chibi Characters](https://tips.clip-studio.com/en-us/articles/4828)

### 2.3 Kit & Equipment Visuals

**Kit System:**

| Element | Detail |
|---------|--------|
| **Jersey** | Team-colored, customizable patterns (stripes, gradients, solid) |
| **Shorts** | Matching team colors, complementary patterns |
| **Socks** | 3 height options (ankle, mid, knee) |
| **Boots** | 8 base styles × multiple colors (cosmetic item) |
| **Gloves** | Goalkeeper only, 4 styles |
| **Captain Armband** | Auto-shown on team captain |

**Kit Rendering:**
- Dynamic cloth simulation for jersey movement during runs and celebrations
- Sweat/dirt accumulation over match duration (subtle, performance-friendly)
- Name and number on back (player-chosen name from card creation)

**Cosmetic Items (Non-P2W):**

| Category | Examples | Source |
|----------|----------|--------|
| **Boot Skins** | Flame boots, Galaxy boots, Classic leather | Season Pass, Shop |
| **Celebration Gear** | Cape, smoke bombs, confetti cannons | Achievement, Shop |
| **Goal Effects** | Fireworks, northern lights, pixel explosion | Season Pass tiers |
| **Trail Effects** | Speed lines, fire trail, ice trail | Rank rewards |

> **P2W Rule:** All cosmetics are purely visual. No cosmetic item provides any stat benefit whatsoever. This is a non-negotiable design principle per [GDD-03](game-economy-monetization-en.md).

### 2.4 Player Position Visual Identity

Each position archetype has a distinct visual silhouette to aid readability on the small mobile screen:

| Position | Silhouette Cue | Visual Identifier |
|----------|---------------|-------------------|
| **Goalkeeper (GK)** | Wider stance, gloves prominent | Different jersey color, cap option |
| **Defender (DF)** | Balanced, slightly bulkier | Shin guards visible, solid stance |
| **Midfielder (MF)** | Lean, balanced | Neutral build, captain armband eligible |
| **Forward (FW)** | Dynamic lean, sprint-ready | Slimmer build, speed-line associations |

### 2.5 Manager & Staff Cards — Visual Design

Manager cards appear in squad management, not on-field:

| Element | Design |
|---------|--------|
| **Pose** | Half-body portrait, arms crossed or tactical gesture |
| **Attire** | Suit, tracksuit, or national team gear |
| **Expression** | Stern, thoughtful, or celebratory |
| **Background** | Tactical board, sideline, or press conference |

---

## 3. UI Visual Style

### 3.1 Design System Overview

**UI Philosophy:** Clean, card-based, mobile-native

| Principle | Implementation |
|-----------|---------------|
| **Thumb-Friendly** | All interactive elements ≥ 48dp, positioned in thumb-reachable zones |
| **Information Hierarchy** | Maximum 3 levels of visual hierarchy per screen |
| **Consistent Corners** | 12dp border radius on cards, 8dp on buttons, 16dp on modals |
| **Depth System** | 4 elevation levels (flat, raised, floating, overlay) |
| **Dark Mode First** | Deep Navy (`#1A1A2E`) background reduces eye strain and saves OLED battery |

### 3.2 Typography

| Usage | Font Style | Size (sp) | Weight |
|-------|-----------|-----------|--------|
| **Screen Title** | Display Sans | 28-32 | Bold |
| **Section Header** | Display Sans | 20-24 | Semi-Bold |
| **Body Text** | UI Sans | 14-16 | Regular |
| **Card Stats** | Mono/Tabular | 12-14 | Medium |
| **Button Label** | UI Sans | 16-18 | Bold |
| **Badge/Tag** | UI Sans | 10-12 | Bold |

**Font Selection Criteria:**
- Must support Latin, Cyrillic, Arabic, and CJK character sets for localization
- Tabular numerals for stat displays (each digit occupies equal width)
- Clear legibility at 12sp on 720p screens

### 3.3 Icon Design

**Icon Grid:** 24×24dp base with 2dp padding

| Style Rule | Detail |
|------------|--------|
| **Line Weight** | 2dp consistent stroke |
| **Fill Style** | Outlined by default, filled when selected/active |
| **Corner Radius** | Matching 2dp radius on rounded shapes |
| **Color** | Single-tone (white on dark, navy on light) |
| **Custom Icons** | Football-themed variations (ball, boot, goal, card) |

**Icon Categories:**

| Category | Count | Examples |
|----------|-------|----------|
| **Navigation** | 8 | Home, Squad, Shop, Match, Social, Leaderboard, Settings, Profile |
| **Action** | 12 | Play, Merge, Trade, Open Pack, Equip, Sell, Upgrade |
| **Status** | 8 | Win, Loss, Draw, Streak, New, Timer, Lock, Notification |
| **Card/Item** | 10 | Player, Manager, Team, Pack, Gem, Coin, Token, Boost, Kit, Badge |

### 3.4 Navigation Structure

**Bottom Navigation Bar (5 tabs):**

```
┌─────────────────────────────────────────────┐
│  [⚽ Play]  [📋 Squad]  [🏪 Shop]  [🏆 Rank]  [👤 Me]  │
└─────────────────────────────────────────────┘
```

| Tab | Screen | Key Elements |
|-----|--------|-------------|
| **Play** | Mode selection | Quick Match, Ranked, Challenge, Event tiles |
| **Squad** | Team management | Card grid, formation view, chemistry display |
| **Shop** | Store & packs | Pack carousel, daily deals, gem store |
| **Rank** | Competitive hub | Current rank, leaderboard, season progress |
| **Me** | Profile & social | Stats, achievements, friends, settings |

**Design Rules:**
- Active tab uses filled icon + Project F Green accent
- Inactive tabs use outlined icons in muted white
- Notification badges: red dot (count ≤ 9), red number badge (count > 9)
- Tab bar height: 56dp, always visible except during matches

### 3.5 Screen Layout Templates

**Template A: List View (Squad, Leaderboard)**
```
┌──────────────────────────┐
│ ← Title           [🔍] [⚙]│
├──────────────────────────┤
│ [Filter Chips]           │
├──────────────────────────┤
│ ┌──────────────────────┐ │
│ │ Card Thumbnail │ Info │ │
│ └──────────────────────┘ │
│ ┌──────────────────────┐ │
│ │ Card Thumbnail │ Info │ │
│ └──────────────────────┘ │
│           ...            │
├──────────────────────────┤
│ [Nav Bar]                │
└──────────────────────────┘
```

**Template B: Hero View (Card Detail, Pack Opening)**
```
┌──────────────────────────┐
│ ← Back           [Share] │
├──────────────────────────┤
│                          │
│    ┌──────────────┐      │
│    │              │      │
│    │   CARD ART   │      │
│    │   (Hero)     │      │
│    │              │      │
│    └──────────────┘      │
│                          │
│  Name ★★★★☆   Tier: E   │
│  ATK: 78  DEF: 65  SPD: 82│
├──────────────────────────┤
│  [Equip]  [Merge]  [Trade]│
├──────────────────────────┤
│ [Nav Bar]                │
└──────────────────────────┘
```

**Template C: Match HUD (In-Game)**
```
┌──────────────────────────┐
│ Team A  2 - 1  Team B    │
│ ⏱ 03:42    [Pause]      │
├──────────────────────────┤
│                          │
│       MATCH VIEW         │
│     (3D Gameplay)        │
│                          │
├──────────────────────────┤
│ [Joystick]    [A][B][C]  │
│              [Sprint][SA]│
└──────────────────────────┘
```

**Reference:**
- Sports App UI Best Practices: [Togwe UI Guide](https://www.togwe.com/blog/sports-app-ui-design/)
- Football UI Design Gallery: [Dribbble Football UI](https://dribbble.com/tags/football-ui)
- Game UI Database: [gameuidatabase.com](https://www.gameuidatabase.com/)

---

## 4. Card Frame Design

### 4.1 Design Philosophy

Cards are the core collectible — they must feel **valuable, distinctive, and satisfying to collect**. Each rarity tier has a visually escalating frame treatment that immediately communicates value without reading text.

### 4.2 Card Anatomy

```
┌─────────────────────────┐
│ [Rarity Border]         │
│ ┌─────────────────────┐ │
│ │                     │ │
│ │   CHARACTER ART     │ │
│ │   (Portrait)        │ │
│ │                     │ │
│ └─────────────────────┘ │
│ ┌─────────────────────┐ │
│ │ NAME      ★★★★☆    │ │
│ │ Position    Tier    │ │
│ ├─────────────────────┤ │
│ │ ATK│DEF│SPD│SHT│PAS│ │
│ │ 78 │ 65│ 82│ 75│ 70│ │
│ ├─────────────────────┤ │
│ │ Special Ability Icon│ │
│ │ Chemistry: ⚗️ 3/5   │ │
│ └─────────────────────┘ │
│ [Rarity Border]         │
└─────────────────────────┘
```

**Card Dimensions:** 2:3 aspect ratio (portrait orientation, 300×450dp at full view)
**Thumbnail:** 1:1 square crop showing face + tier badge (64×64dp in lists)

### 4.3 Rarity Tier Frame Treatments

| Tier | Frame Material | Animation | Sound | Card Back |
|------|---------------|-----------|-------|-----------|
| **Normal** | Matte gray aluminum | None (static) | Soft click | Plain gray with logo |
| **Rare** | Brushed blue steel | Subtle pulse on hover | Crisp snap | Blue gradient with crest |
| **Epic** | Polished purple chrome | Slow outer glow rotation | Harmonic chime | Purple nebula pattern |
| **Super** | Liquid gold alloy | Energy flow along edges | Power surge tone | Gold foil with embossed logo |
| **Legend** | Holographic red crystal | Full holographic shimmer + particle emission | Epic orchestral sting | Animated flame pattern |

**Frame Width by Tier:**
- Normal: 3dp solid
- Rare: 4dp with inner bevel
- Epic: 5dp with glow bleed (2dp overflow)
- Super: 6dp with energy animation
- Legend: 8dp with holographic + particle overflow

### 4.4 Card Art Style

**Portrait Rules:**
- Characters shown from mid-chest up in 3/4 angle
- Dynamic pose reflecting position (GK: diving, FW: shooting, etc.)
- Background color/pattern matches rarity tier
- Facial expression matches card personality (determined at creation)
- Kit clearly visible with team colors

**Art Pipeline:**
1. 3D character model → posed in engine
2. Render portrait with rarity-appropriate lighting
3. Apply post-processing (color grade per tier)
4. Composite with frame template
5. Add stat overlays and badges

**Special Treatments:**
- **Nominated Cards:** Animated sparkle overlay (see [GDD-02, Section 6](card-collection-system-en.md))
- **Chemistry-Boosted:** Green glow aura when chemistry > 75%
- **New Card:** "NEW" ribbon badge (auto-removes after 24h)
- **Tradeable Status:** Small trade icon in corner (green = tradeable, gray = locked)

### 4.5 Pack Visual Design

| Pack Type | Visual Theme | Opening Animation |
|-----------|-------------|-------------------|
| **Basic Pack** | Brown kraft paper wrapping | Tear open, cards slide out |
| **Premium Pack** | Metallic silver box with ribbon | Box opens, light beam reveals cards |
| **Themed Pack** | Event-themed container (e.g., World Cup trophy shape) | Thematic reveal (confetti, fireworks) |
| **Season End Pack** | Gold chest with MMR tier emblem | Chest unlocks, cards float up with tier glow |
| **Nomination Pack** | Crystal orb with swirling energy | Orb shatters, card materializes from energy |

**Reference:**
- FUT Card Evolution (frame design history): [FutGraphics Card History](https://futgraphics.com/articles/the-evolution-of-fut-cards-a-visual-history-from-fifa-09-to-ea-fc-24)
- TCG Frame Design Inspiration: [TCG Frames & Elements on Pinterest](https://www.pinterest.com/studiomagicfox/tcg-frames-elements/)
- Gacha Card Design Patterns: [Gacha Designs on Dribbble](https://dribbble.com/tags/gacha)

---

## 5. Stadium & Environment Design

### 5.1 Stadium Design Philosophy

Stadiums in Project F are **characters, not just backdrops.** Each stadium has personality, atmosphere, and visual storytelling that enhances the match experience without distracting from gameplay.

### 5.2 Stadium Tiers

| Tier | Name | Capacity Feel | Unlocked At | Visual Quality |
|------|------|--------------|-------------|---------------|
| **1** | Street Pitch | 0 (open field) | Default | Basic environment, chain-link fences |
| **2** | Local Ground | ~500 | Bronze II | Small bleachers, club banners |
| **3** | District Arena | ~5,000 | Silver III | Covered stands, LED scoreboard |
| **4** | City Stadium | ~25,000 | Gold III | Full stadium, tifo displays, tunnels |
| **5** | National Arena | ~60,000 | Diamond I | Premium stadium, pyrotechnics, broadcast cameras |
| **6** | Legend Coliseum | ~100,000 | Season Champion | Fantasy stadium with floating elements, holographic displays |

### 5.3 Stadium Visual Components

**Pitch:**

| Element | Detail |
|---------|--------|
| **Grass** | Stylized (not photorealistic), stripe-mowed pattern, color shifts with weather |
| **Lines** | Clean white, slightly thick for mobile readability |
| **Goals** | Metallic net with subtle sway animation |
| **Center Circle** | Project F logo embedded subtly |
| **Penalty Area** | Slightly different grass shade for visual boundary |

**Surroundings:**

| Component | Tier 1-2 | Tier 3-4 | Tier 5-6 |
|-----------|----------|----------|----------|
| **Crowd** | None / sparse 2D sprites | Animated 3D crowd blocks | Fully animated crowd with chants |
| **Stands** | Open air / basic bleachers | Roofed sections | Full roof, VIP boxes, press areas |
| **Lighting** | Natural daylight only | Basic floodlights | Advanced lighting rigs, spotlights |
| **Scenery** | Trees, buildings backdrop | City skyline | Iconic architecture, fireworks |
| **Effects** | None | Smoke from crowd | Pyro, confetti, laser shows |

### 5.4 Field Conditions

| Condition | Visual Treatment | Gameplay Effect |
|-----------|-----------------|----------------|
| **Perfect** | Bright green, clean lines | No modifier |
| **Wet (Rain)** | Dark green, puddle reflections, splash particles | Slight speed reduction |
| **Snowy** | White overlay, snowflakes, breath vapor | Reduced traction visual cue |
| **Muddy** | Brown patches, boot marks accumulate | Players get progressively dirty |
| **Night** | Dark atmosphere, floodlight pools, player shadows | Enhanced VFX visibility |

### 5.5 Stadium Customization (Cosmetic)

| Element | Options | Source |
|---------|---------|--------|
| **Banner/Tifo** | Upload team logo, choose pre-made designs | Club creation feature |
| **Pitch Pattern** | 5 mow patterns (stripes, diamonds, checkerboard) | Season Pass / Achievement |
| **Goal Net Color** | 6 colors (white, blue, red, gold, black, rainbow) | Shop cosmetic |
| **Firework Style** | 4 styles per goal scored | Rank reward |
| **Crowd Chant** | 3 audio themes (local, European, South American) | Achievement unlock |

> **P2W Rule:** Stadium cosmetics have zero gameplay impact. Visual only.

**Reference:**
- Stylized 3D Stadium Model: [Sketchfab Stylized Football Stadium](https://sketchfab.com/3d-models/stylized-football-character-plus-stadium-bba5a86f64b74eeea23f3c23cd94e473)
- Cartoony Stadium Design: [Sketchfab Cartoony Stadium](https://sketchfab.com/3d-models/cartoony-football-stadium-d5f86cece43c49ea8ed94890c32cd317)

---

## 6. Animation Standards

### 6.1 Animation Philosophy

> **"Every animation must serve gameplay clarity, emotional expression, or spectacle. If it does none of these, cut it."**

Animations in Project F must be:
1. **Readable** — Player intent is clear from animation start frames
2. **Snappy** — No floaty or sluggish feel; responsive to input
3. **Expressive** — Characters have personality even in idle states
4. **Performant** — No animation should cause frame drops on target devices

### 6.2 Locomotion Animations

| State | Animation | Frames | Notes |
|-------|-----------|--------|-------|
| **Idle** | Bouncing on toes, looking around | Loop 60f | Position-specific variants |
| **Walk** | Casual stroll with ball control | Loop 24f | Used in menus and pre-match |
| **Jog** | Light run, standard movement | Loop 18f | Default in-match movement |
| **Sprint** | Full run, arms pumping, lean forward | Loop 14f | Stamina-consuming |
| **Sprint + Ball** | Dribbling at speed | Loop 16f | Ball locked to foot bones |
| **Tired Jog** | Heavy breathing, hunched, slow arms | Loop 22f | Stamina < 20% |
| **Turn** | Quick pivot animation | 8f blend | 8-direction system |

### 6.3 Football Action Animations

| Action | Animation | Duration | Priority |
|--------|-----------|----------|----------|
| **Short Pass** | Quick side-foot stroke | 10f | High |
| **Long Pass** | Full leg swing, body lean | 16f | High |
| **Through Ball** | Weighted inside-foot push | 14f | High |
| **Shot** | Power strike with follow-through | 18f | Critical |
| **Volley** | Mid-air strike | 20f | Critical |
| **Header** | Jump + head connection | 22f | Critical |
| **Tackle** | Slide or standing tackle | 16f | High |
| **Block** | Arms-up stance | 8f | Medium |
| **GK Save** | Dive left/right/up/down | 24f | Critical |
| **GK Punch** | Fist-clear from crosses | 18f | High |
| **Trap/Receive** | Chest/foot ball control | 12f | Medium |

### 6.4 Special Ability Animations

Inspired by GGO Football anime (see [GDD-02, Section 5](card-collection-system-en.md)):

| Ability Tier | Animation Style | Duration | Camera |
|-------------|----------------|----------|--------|
| **Tier 1 (Common)** | Enhanced version of base move + glow effect | 1.0s | Normal |
| **Tier 2 (Rare)** | Unique animation + elemental VFX | 1.5s | Slight zoom |
| **Tier 3 (Epic)** | Cinematic animation + full-screen VFX | 2.0s | Dynamic cut-scene camera |

**Example Special Ability Animations:**

| Ability | Animation Description |
|---------|----------------------|
| **Roaring Flame Strike** | Player's foot ignites, fire trail follows the ball, explosion on impact |
| **Vacuum Zero Shot** | Air distortion around player, ball compresses then launches with sonic boom |
| **Samba Banana Strike** | Rhythmic dance steps, ball curves with rainbow trail |
| **Lava Block** | Defender stomps ground, magma wall rises briefly |
| **Flash Step** | Player blurs into speed lines, reappears past defender |

**Reference:**
- GGO Football anime abilities: [GGO Football Wikipedia](https://en.wikipedia.org/wiki/AI_Football_GGO)
- GGO Football overview: [IMDB GGO Football](https://www.imdb.com/title/tt12571272/)

### 6.5 Goal Celebration Animations

> Goley's #1 remembered feature: celebrations so good that even conceding felt fun. We must match and exceed this.

**Celebration System:**

| Type | Trigger | Duration | Camera |
|------|---------|----------|--------|
| **Default** | Any goal | 3s | Follow player |
| **Custom Preset** | Player selects from unlocked set | 4s | Cinematic angle |
| **Team Celebration** | All teammates join | 5s | Wide cinematic |
| **Milestone** | Hat-trick, last-second winner | 6s | Multi-angle replay |

**Celebration Library (60+ at launch):**

| Category | Examples | Count |
|----------|----------|-------|
| **Classic** | Knee slide, arms wide, fist pump | 10 |
| **Dance** | Moonwalk, robot, breakdance, salsa | 12 |
| **Theatrical** | Cape reveal, mask on, phone call | 10 |
| **Cultural** | Haka, capoeira, dabke, bhangra | 8 |
| **Funny** | Dizzy spin, slip-and-fall, confused look | 10 |
| **Team** | Choreographed group dances, human pyramid | 10 |

**Unlock Sources (100% Cosmetic):**
- 15 default celebrations free for all
- 20 via Season Pass progression
- 15 via achievements/rank rewards
- 10 via cosmetic shop (Gems)

### 6.6 UI & Menu Animations

| Element | Animation | Duration | Easing |
|---------|-----------|----------|--------|
| **Screen Transition** | Slide left/right + fade | 300ms | Ease-out cubic |
| **Card Flip** | 3D flip on Y-axis | 400ms | Ease-in-out |
| **Button Press** | Scale down 95% + slight darken | 100ms | Linear |
| **Modal Open** | Slide up from bottom + backdrop fade | 350ms | Spring |
| **Notification** | Slide down from top + bounce | 500ms | Spring |
| **Progress Bar Fill** | Smooth fill with glow | Variable | Ease-out |
| **Star Award** | Burst entrance + sparkle | 600ms | Spring + overshoot |
| **Pack Opening** | Full-screen cinematic sequence | 3-8s | Choreographed |

---

## 7. Visual Effects (VFX)

### 7.1 VFX Budget Philosophy

> **Rule:** Every VFX has a mobile performance budget. Spectacular effects mean nothing if they cause frame drops.

| VFX Category | Max Particles | Max Draw Calls | Max Texture Size |
|-------------|--------------|----------------|-----------------|
| **Ambient** (rain, dust) | 200 | 2 | 256×256 |
| **Action** (passes, shots) | 50 | 1 | 128×128 |
| **Special Ability** | 300 | 4 | 512×512 |
| **Goal Celebration** | 500 | 4 | 512×512 |
| **UI Effects** | 100 | 2 | 256×256 |

### 7.2 In-Match VFX

| Effect | Description | Trigger |
|--------|------------|---------|
| **Ball Trail** | Subtle white streak behind moving ball | Always on |
| **Power Shot Trail** | Thick energy trail matching shot power | Shot power > 70% |
| **Curve Trail** | Visible arc path for curving shots/passes | Curve technique activated |
| **Impact Burst** | Small burst on ball-to-player contact | Every contact |
| **Net Ripple** | Goal net deformation + ripple VFX | Goal scored |
| **Slide Dust** | Dirt/grass particle spray | Slide tackle |
| **Sprint Lines** | Speed lines behind sprinting player | Sprint active |
| **Stamina Warning** | Sweat droplets, heavy breath puffs | Stamina < 30% |
| **Rain Splashes** | Small splash on ball bounce/player steps | Rainy weather |
| **Snow Puffs** | Small snow displacement | Snowy weather |

### 7.3 Special Ability VFX

**Element System:** Each special ability belongs to an elemental category with consistent VFX language:

| Element | Color | Particle Shape | Example Ability |
|---------|-------|---------------|-----------------|
| **Fire** | Orange-Red | Flame wisps, embers | Roaring Flame Strike |
| **Ice** | Cyan-Blue | Crystalline shards, frost | Glacier Block |
| **Lightning** | Yellow-White | Electric arcs, sparks | Thunder Shot |
| **Wind** | Green-Teal | Swirling leaves, air currents | Cyclone Dribble |
| **Shadow** | Purple-Dark | Dark mist, afterimages | Phantom Pass |

**VFX Escalation by Ability Tier:**

| Tier | Screen Coverage | Duration | Additional |
|------|----------------|----------|-----------|
| **Tier 1** | Local (around player) | 0.5s | Glow + 20 particles |
| **Tier 2** | Path (player → target) | 1.0s | Trail + 100 particles + screen edge glow |
| **Tier 3** | Full screen | 1.5s | Cinematic + 300 particles + screen shake + flash |

### 7.4 Goal VFX

| Goal Type | VFX Treatment |
|-----------|--------------|
| **Normal Goal** | Net ripple + small confetti burst |
| **Power Goal** | Net explosion effect + camera shake + shockwave |
| **Special Ability Goal** | Element-themed explosion + slow-motion replay + crowd roar VFX |
| **Last-Second Winner** | Full stadium flash + fireworks + dramatic zoom |
| **Hat-Trick Goal** | Triple crown VFX + golden confetti + spotlight |

### 7.5 UI VFX

| Effect | Usage |
|--------|-------|
| **Card Glow** | Animated glow on card borders by rarity |
| **Shimmer** | Holographic shimmer on Super/Legend cards |
| **Sparkle Trail** | Mouse/touch follow during pack opening |
| **Burst** | Reward reveal, rank-up, achievement pop |
| **Confetti** | Season end rewards, pack legendary reveal |
| **Energy Swirl** | Card merge in progress |
| **Level Up Beam** | Vertical light beam on level/rank up |

**Reference:**
- Game VFX Best Practices: [Pixune VFX Guide](https://pixune.com/blog/visual-effects-in-games/)
- Ultimate VFX Guide: [Pixune Ultimate VFX Guide](https://pixune.com/blog/the-ultimate-guide-to-game-vfx/)
- Mobile VFX Optimization: [Real Time VFX Forum - Mobile](https://realtimevfx.com/t/mobile-games-vfx/2567)

---

## 8. Lighting & Atmosphere

### 8.1 Time of Day System

| Time | Sky Color | Light Direction | Light Temp | Mood |
|------|-----------|----------------|-----------|------|
| **Morning** | Soft blue-orange gradient | Low east (15°) | 5500K warm | Fresh, energetic |
| **Midday** | Bright blue, white clouds | Overhead (75°) | 6500K neutral | Intense, competitive |
| **Golden Hour** | Orange-pink gradient | Low west (20°) | 4000K warm | Dramatic, cinematic |
| **Evening** | Deep blue-purple | Artificial (floodlights) | 5000K mixed | Electric, atmospheric |
| **Night** | Dark navy, star field | Full artificial | 4500K warm spots | Dramatic, premium |

### 8.2 Weather Lighting Modifiers

| Weather | Light Modifier | Additional |
|---------|---------------|-----------|
| **Clear** | Base lighting as above | Sun shadows, lens flare |
| **Cloudy** | -20% intensity, diffused shadows | Soft ambient occlusion |
| **Rain** | -30% intensity, wet reflections | Specular highlights on puddles |
| **Snow** | +10% intensity (reflection), blue tint | Snow particle haze |
| **Fog** | -40% intensity, short view distance | Volumetric fog planes |

### 8.3 Stadium Lighting Rigs

| Stadium Tier | Lighting Setup |
|-------------|---------------|
| **Tier 1-2** | Single directional light (sun) + basic ambient |
| **Tier 3** | Sun + 4 floodlight point lights |
| **Tier 4** | Sun + 8 floodlights + spot effects |
| **Tier 5-6** | Dynamic lighting rig: 12+ lights, spotlight tracking, LED board emissive |

### 8.4 Mood Presets

| Preset | When Used | Feel |
|--------|-----------|------|
| **Friendly** | Casual/Quick Match | Bright, cheerful, saturated |
| **Competitive** | Ranked Match | Slightly desaturated, sharp shadows |
| **Dramatic** | Tournament Finals, Last-minute goal | High contrast, dramatic shadows, vignette |
| **Celebratory** | Victory screen, Rank Up | Golden light, warm tones, lens flares |
| **Tense** | Overtime, Penalty Shootout | Desaturated with red accents, tight lighting |

---

## 9. Technical Art Standards

### 9.1 Performance Targets

| Spec | Target Device | Requirement |
|------|--------------|-------------|
| **Min** | 3GB RAM, Snapdragon 4-series (2022) | 30 FPS, Low settings |
| **Mid** | 4GB RAM, Snapdragon 6-series (2023) | 60 FPS, Medium settings |
| **High** | 6GB RAM, Snapdragon 8-series (2024) | 60 FPS, High settings |
| **iOS Min** | iPhone 8 / A11 Bionic | 30 FPS, Medium settings |
| **iOS High** | iPhone 13+ / A15+ | 60 FPS, High settings |

### 9.2 Asset Budgets

**Character Models:**

| Quality | Polygons | Texture | Bones | LODs |
|---------|----------|---------|-------|------|
| **Low** | 1,500 tris | 512×512 | 30 | LOD0 only |
| **Medium** | 3,000 tris | 1024×1024 | 45 | LOD0 + LOD1 |
| **High** | 5,000 tris | 2048×2048 | 60 | LOD0 + LOD1 + LOD2 |

**Stadium Models:**

| Quality | Polygons | Textures | Draw Calls |
|---------|----------|----------|------------|
| **Low** | 30K tris total | 4× 512×512 atlases | ≤ 25 |
| **Medium** | 60K tris total | 4× 1024×1024 atlases | ≤ 40 |
| **High** | 100K tris total | 4× 2048×2048 atlases | ≤ 60 |

**Per-Frame Budget:**

| Component | Low | Medium | High |
|-----------|-----|--------|------|
| **Characters (12)** | 18K tris | 36K tris | 60K tris |
| **Ball** | 200 tris | 500 tris | 1K tris |
| **Stadium** | 30K tris | 60K tris | 100K tris |
| **VFX** | 5K tris | 10K tris | 20K tris |
| **UI Overlay** | 2K tris | 2K tris | 2K tris |
| **TOTAL** | ~55K tris | ~109K tris | ~183K tris |

### 9.3 Texture Standards

| Type | Format | Compression |
|------|--------|-------------|
| **Diffuse/Albedo** | PNG → ASTC 4×4 (mobile) | Lossy okay |
| **Normal Map** | PNG → ASTC 6×6 | Quality priority |
| **UI Elements** | PNG (with alpha) → ASTC 4×4 | Lossless alpha |
| **Icons** | SVG → rasterized per DPI | Vector source |
| **Card Art** | PNG → ASTC 4×4 | Quality priority |
| **VFX Sprites** | PNG sprite sheet → ASTC 4×4 | Lossy okay |

### 9.4 Shader Guidelines

| Shader Type | Complexity | Usage |
|------------|-----------|-------|
| **Character Shader** | Medium | Toon-lit with rim light, 2-band cel shading |
| **Pitch Shader** | Low | Tiled grass with stripe pattern, wet modifier |
| **Sky Shader** | Low | Gradient + procedural clouds |
| **Card Frame Shader** | Medium-High | Metallic + holographic + animated (UI only) |
| **VFX Shader** | Low-Medium | Additive/alpha blend particles |
| **UI Shader** | Low | Standard sprite + dissolve/glow effects |

**Shader Rules:**
- Max 4 texture samples per shader pass
- No real-time reflections (use cubemaps/probes)
- Cel-shading with 2 bands (light/shadow) + optional rim
- Avoid full-screen post-processing on Low quality

### 9.5 Quality Settings Breakdown

| Feature | Low | Medium | High |
|---------|-----|--------|------|
| **Character LOD** | LOD0 only | LOD0 + LOD1 | Full LOD chain |
| **Shadow Quality** | No shadows | Blob shadows | Soft real-time shadows |
| **VFX Density** | 50% particle count | 75% | 100% |
| **Crowd** | 2D sprites | Low-poly 3D | Animated 3D |
| **Post-Processing** | None | Bloom only | Bloom + vignette + color grade |
| **Anti-Aliasing** | None | FXAA | MSAA 2× |
| **Cloth Sim** | Static kit | Simplified | Full dynamic |
| **Weather Effects** | Minimal | Standard | Full (puddles, snow accumulation) |

### 9.6 App Size Budget

| Component | Target Size |
|-----------|-------------|
| **Initial Download** | ≤ 150 MB |
| **Full Install** | ≤ 800 MB |
| **Per-Stadium Pack** | ~15-25 MB (downloaded on demand) |
| **Seasonal Content** | ~50 MB per season update |

**Size Optimization Strategies:**
- On-demand asset downloading for stadiums beyond Tier 1-2
- Shared skeleton/animation rig across all player characters
- Texture atlasing for UI and card elements
- Audio compression with quality tiers

---

## 10. Reference Board

### 10.1 Character & Art Style References

| Reference | URL | Relevance |
|-----------|-----|-----------|
| Goley Screenshot Gallery | [oyunkayit.com/goley.html](https://oyunkayit.com/goley.html) | Primary chibi football reference |
| Goley Blog (Joygame) | [joygame.com/goley/blog](https://www.joygame.com/goley/blog/) | Official Goley visual assets |
| Goley Screenshots (Gezginler) | [gezginler.net/oyunlar/ekran-goruntuleri/goley.html](https://www.gezginler.net/oyunlar/ekran-goruntuleri/goley.html) | Additional Goley visual reference |
| Chibi Art in Games (Medium) | [medium.com — Adorable Revolution](https://medium.com/@purplebubblestudio/the-adorable-revolution-chibi-art-styles-in-video-games-777bb93d0a1a) | Chibi art style analysis for games |
| 3D Chibi Character Pack | [sketchfab.com — HoaTo](https://sketchfab.com/3d-models/3d-chibi-character-pack-for-mobile-games-7709dd940dc7451a82e8f33af854b565) | 3D chibi character proportion reference |
| Chibi Character Guide | [clipstudio.net — Chibi Guide](https://www.clipstudio.net/how-to-draw/archives/155423) | Chibi proportion and expression techniques |
| Chibi Stylized Girl (Sketchfab) | [sketchfab.com — GoE](https://sketchfab.com/3d-models/chibi-stylized-girl-character-rig-game-ready-a916574bb7004449ae60d430e0b6892e) | Rigged chibi character reference |

### 10.2 UI & Card Design References

| Reference | URL | Relevance |
|-----------|-----|-----------|
| Football UI (Dribbble) | [dribbble.com/tags/football-ui](https://dribbble.com/tags/football-ui) | Football app UI inspiration |
| Football UI (Behance) | [behance.net — Football UI](https://www.behance.net/search/projects/football%20ui) | Professional football UI projects |
| Game UI Database | [gameuidatabase.com](https://www.gameuidatabase.com/) | 55,000+ game UI screenshots |
| Sports App UI Guide | [togwe.com — Sports UI](https://www.togwe.com/blog/sports-app-ui-design/) | Sports app UI best practices |
| FUT Card Evolution | [futgraphics.com](https://futgraphics.com/articles/the-evolution-of-fut-cards-a-visual-history-from-fifa-09-to-ea-fc-24) | Card frame design evolution reference |
| TCG Frames (Pinterest) | [pinterest.com — TCG Frames](https://www.pinterest.com/studiomagicfox/tcg-frames-elements/) | Trading card frame design patterns |
| Gacha Design (Dribbble) | [dribbble.com/tags/gacha](https://dribbble.com/tags/gacha) | Gacha card design inspiration |
| Mobile UI Best Practices 2026 | [uidesignz.com](https://uidesignz.com/blogs/mobile-ui-design-best-practices) | Current mobile UI trends |
| Mobile Game UI Examples | [pixune.com — Mobile Game UI](https://pixune.com/blog/best-examples-mobile-game-ui-design/) | Best-in-class mobile game UI |

### 10.3 Stadium & Environment References

| Reference | URL | Relevance |
|-----------|-----|-----------|
| Stylized Football Stadium | [sketchfab.com — TankStorm](https://sketchfab.com/3d-models/stylized-football-character-plus-stadium-bba5a86f64b74eeea23f3c23cd94e473) | Stylized 3D stadium reference |
| Cartoony Stadium | [sketchfab.com — Blooming](https://sketchfab.com/3d-models/cartoony-football-stadium-d5f86cece43c49ea8ed94890c32cd317) | Cartoon stadium art style |
| Stadium Collection (Sketchfab) | [sketchfab.com — StudioLab](https://sketchfab.com/studiolab.dev/collections/stadiums-and-arenas-a68d9a95b615427189f50c51ee4fc9ff) | Stadium variety reference |

### 10.4 Animation & VFX References

| Reference | URL | Relevance |
|-----------|-----|-----------|
| GGO Football (Wikipedia) | [en.wikipedia.org — AI Football GGO](https://en.wikipedia.org/wiki/AI_Football_GGO) | Special ability animation inspiration |
| GGO Football (IMDB) | [imdb.com — GGO Football](https://www.imdb.com/title/tt12571272/) | GGO animation style overview |
| Game VFX Guide | [pixune.com — VFX Guide](https://pixune.com/blog/visual-effects-in-games/) | VFX best practices for games |
| Ultimate VFX Guide | [pixune.com — Ultimate VFX](https://pixune.com/blog/the-ultimate-guide-to-game-vfx/) | Comprehensive VFX production guide |
| Mobile VFX Discussion | [realtimevfx.com — Mobile](https://realtimevfx.com/t/mobile-games-vfx/2567) | Mobile-specific VFX optimization |

---

## 11. P2W & Sustainability Evaluation

### 11.1 Art & Visual P2W Risk Assessment

| Visual Element | P2W Risk | Mitigation |
|---------------|----------|-----------|
| **Card Frame Rarity** | Low | Visual hierarchy by tier is standard and expected. No gameplay advantage from visuals. |
| **Special Ability VFX** | Medium | Higher-tier abilities have flashier VFX — could create "pay for cool" perception. Mitigated by making Tier 1 abilities competitively viable and visually satisfying. |
| **Stadium Tiers** | Low | Tied to rank progression, not purchases. Higher stadiums are earned, not bought. |
| **Celebrations** | None | 100% cosmetic. 15 free defaults ensure every player has fun celebrations. |
| **Boot/Trail Skins** | None | Pure cosmetic. No stat association. |
| **Kit Design** | None | Team customization is free for all players. |

### 11.2 Cosmetic Monetization Sustainability

| Metric | Assessment |
|--------|-----------|
| **Cosmetic Depth** | 9/10 — 9 cosmetic categories (boots, celebrations, goal effects, trails, banners, pitch patterns, net colors, fireworks, chants) provide deep personalization |
| **Earn vs. Buy Balance** | 8/10 — ~60% of cosmetics earnable through gameplay, ~40% premium |
| **FOMO Management** | 7/10 — Seasonal cosmetics rotate back after 2 seasons. No permanent exclusivity pressure. |
| **Cultural Sensitivity** | 9/10 — Diverse celebration options (bhangra, capoeira, haka, dabke) celebrate global football culture |
| **Identity Ownership** | 9/10 — Custom card names + face presets + kit design creates strong personal attachment |

### 11.3 Visual Clarity & Fair Play

| Concern | Our Solution |
|---------|-------------|
| **VFX obscuring gameplay** | All gameplay-critical VFX are brief (< 2s). Option to reduce VFX intensity in settings. |
| **Flashy abilities distracting opponents** | VFX are client-side rendered identically for both players. No visual advantage. |
| **Pay-for-intimidation** | No visual cue distinguishes paid cosmetics from earned ones. No "whale badge." |
| **Information asymmetry** | All card stats visible to opponents in pre-match lobby. No hidden information from visuals. |

### 11.4 Sustainability Scorecard

| Category | Score | Reasoning |
|----------|-------|-----------|
| **Visual Identity Longevity** | 9/10 | Chibi style is timeless and scalable. Goley is remembered fondly 8+ years later precisely for its visual identity. |
| **Content Pipeline Scalability** | 8/10 | Shared skeleton + modular kit system means new content = new textures/meshes on existing rigs. Fast to produce. |
| **Cosmetic Revenue Potential** | 9/10 | 9 cosmetic categories × seasonal rotation = infinite non-P2W revenue stream. |
| **Performance Accessibility** | 8/10 | 3-tier quality settings ensure even 2022 mid-range devices can play. No player excluded by visuals. |
| **Art Style Differentiation** | 9/10 | No direct competitor uses chibi football. This is our brand moat. |
| **Overall Art Sustainability** | **8.6/10** | Strong visual foundation for 5+ year live service game. |

### 11.5 What Goley Did Right (Keep)

| Visual Element | Why It Worked |
|---------------|---------------|
| **Chibi characters** | Instantly lovable, memorable, shareable — players formed emotional bonds |
| **Goal celebrations** | Created viral moments; even losing was entertaining |
| **Noseless faces** | Distinctive design choice that became iconic |
| **Colorful, energetic palette** | Matched the fun, accessible tone of gameplay |

### 11.6 What Goley Did Wrong (Avoid)

| Visual Element | Problem | Our Solution |
|---------------|---------|-------------|
| **Dated textures** | Low-res textures aged poorly | PBR materials with LOD system |
| **Bland environments** | Stadiums felt generic and static | 6-tier stadium progression with weather/time systems |
| **Limited customization** | Players couldn't express identity | 100+ face presets, kit creator, 9 cosmetic categories |
| **No visual progression** | Stadiums/visuals didn't reflect player growth | Stadium tiers tied to rank, evolving visual rewards |

---

## Appendix A: Art Production Pipeline

### A.1 Character Creation Workflow

```
1. Concept Art (2D sketch, 3 poses)
   ↓
2. 3D Modeling (base mesh → sculpt → retopology)
   ↓
3. UV Mapping + Texturing (PBR: diffuse, normal, roughness)
   ↓
4. Rigging (shared skeleton, 30-60 bones)
   ↓
5. Animation (motion library + position-specific sets)
   ↓
6. LOD Generation (auto + manual cleanup)
   ↓
7. Integration (engine import, shader assignment, physics setup)
   ↓
8. QA (visual review on 3 device tiers + performance profiling)
```

### A.2 Card Art Pipeline

```
1. Character pose selection (per position archetype)
   ↓
2. In-engine portrait render (rarity-specific lighting)
   ↓
3. Post-processing (tier color grade)
   ↓
4. Frame composite (automated per rarity tier)
   ↓
5. Stat overlay generation (automated from data)
   ↓
6. Animation layering (glow, shimmer, particles for Epic+)
   ↓
7. Thumbnail generation (64×64 auto-crop)
```

### A.3 Stadium Creation Workflow

```
1. Concept Art (2D layout + mood board)
   ↓
2. Blockout (graybox in engine)
   ↓
3. Pitch modeling (shared template + tier-specific surroundings)
   ↓
4. Environment art (stands, scenery, crowd zones)
   ↓
5. Lighting setup (per time-of-day + weather presets)
   ↓
6. LOD + Optimization (draw call budget validation)
   ↓
7. Asset streaming setup (on-demand download for Tier 3+)
   ↓
8. QA (all weather × time combos × 3 quality settings)
```

---

## Appendix B: Asset Naming Conventions

| Asset Type | Pattern | Example |
|-----------|---------|---------|
| **Character Model** | `chr_{position}_{variant}_lod{n}` | `chr_fw_male01_lod0` |
| **Character Texture** | `chr_{position}_{variant}_{map}` | `chr_fw_male01_diffuse` |
| **Kit Texture** | `kit_{team}_{variant}` | `kit_redlions_home` |
| **Stadium Model** | `std_tier{n}_{name}` | `std_tier3_district_arena` |
| **Stadium Texture** | `std_tier{n}_{name}_{map}` | `std_tier3_district_arena_diffuse` |
| **VFX Prefab** | `vfx_{category}_{name}` | `vfx_ability_roaring_flame` |
| **UI Icon** | `ico_{category}_{name}_{state}` | `ico_nav_squad_active` |
| **Card Frame** | `card_frame_{tier}_{state}` | `card_frame_epic_idle` |
| **Animation Clip** | `anim_{category}_{name}` | `anim_celeb_moonwalk` |
| **Audio** | `sfx_{category}_{name}` | `sfx_goal_crowd_roar` |

---

*This document defines the complete visual identity for Project F. Every art asset, animation, and VFX must conform to these standards. Deviations require Game Designer approval with documented reasoning.*

*Next Document: [GDD-06: UI/UX Design](ui-ux-design-en.md)*
