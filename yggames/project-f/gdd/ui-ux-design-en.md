# GDD-06: UI/UX Design

**Document Code:** GDD-06
**Version:** 1.0
**Date:** March 17, 2026
**Author:** Game Designer Agent, YG Games
**Status:** Draft
**Related Documents:** [GDD-00: Competitor Analysis](docs/00-competitor-analysis-en.md) | [GDD-01: Core Game Design](core-game-design-en.md) | [GDD-02: Card Collection System](card-collection-system-en.md) | [GDD-03: Game Economy & Monetization](game-economy-monetization-en.md) | [GDD-05: Art & Visual Style](art-visual-style-en.md)

---

## Table of Contents

1. [UX Philosophy](#1-ux-philosophy)
2. [Information Architecture](#2-information-architecture)
3. [Screen Flows & Navigation](#3-screen-flows--navigation)
4. [Home Screen](#4-home-screen)
5. [Match Flow UI](#5-match-flow-ui)
6. [Card Management UI](#6-card-management-ui)
7. [Shop & Pack Opening UI](#7-shop--pack-opening-ui)
8. [Competitive & Ranking UI](#8-competitive--ranking-ui)
9. [Social & Profile UI](#9-social--profile-ui)
10. [Onboarding Flow](#10-onboarding-flow)
11. [Notification System](#11-notification-system)
12. [Accessibility](#12-accessibility)
13. [Settings & Options](#13-settings--options)
14. [P2W & Sustainability Evaluation](#14-pw--sustainability-evaluation)

---

## 1. UX Philosophy

### 1.1 Core Principles

| Principle | Description | Metric |
|-----------|-------------|--------|
| **3-Tap Rule** | Any core feature reachable in ≤ 3 taps from Home | Navigation depth audit |
| **Thumb-First** | All primary actions within natural thumb arc on one-hand grip | Heat map validation |
| **No Dead Ends** | Every screen has a clear next action and a way back | Screen flow audit |
| **Progressive Disclosure** | Show only what's needed now; reveal complexity when ready | First-session completion rate |
| **Speed Over Polish** | Transitions ≤ 300ms, screen load ≤ 1s, match queue ≤ 30s | Performance benchmarks |
| **Clarity Over Beauty** | If a visual competes with comprehension, simplify the visual | Usability testing |

### 1.2 Competitor UX Lessons

| Competitor | UX Strength | UX Weakness | Our Approach |
|-----------|------------|-------------|-------------|
| **Goley** | Simple match flow, familiar controls | Cluttered menus, confusing card management | Clean navigation + guided card UI |
| **FC Mobile** | Polished transitions, smooth match flow | Overwhelming number of modes/menus, aggressive monetization UI | Fewer but deeper modes, restrained shop prompts |
| **eFootball** | Best-in-class gameplay feel | Worst-in-class UI at launch (2022), confusing navigation | UI is a first-class citizen from day one |
| **DLS** | Clean, intuitive, minimal clutter | Limited social features, basic team management | DLS simplicity + richer social layer |
| **Score! Match** | Fast match loop, streamlined experience | Lacks depth, card management is shallow | Quick match loop + deep card system |

### 1.3 Design Tokens (From GDD-05)

All UI components use the design system defined in [GDD-05, Section 3](art-visual-style-en.md):
- **Colors:** Deep Navy background, Project F Green accents, tier-coded rarity colors
- **Typography:** Display Sans (headers), UI Sans (body), Mono (stats)
- **Spacing:** 4dp base grid, 8dp standard gap, 16dp section padding
- **Corners:** 8dp buttons, 12dp cards, 16dp modals
- **Elevation:** 4 levels (flat → raised → floating → overlay)
- **Touch Targets:** Minimum 48dp × 48dp

**Reference:**
- Game UI Database: [gameuidatabase.com](https://www.gameuidatabase.com/)
- Football UI Inspiration: [Dribbble Football UI](https://dribbble.com/tags/football-ui)
- Behance Football UI: [Behance Football Game UI](https://www.behance.net/search/projects/football%20game%20UI)

---

## 2. Information Architecture

### 2.1 Global Navigation Map

```
HOME
├── Play
│   ├── Quick Match
│   ├── Ranked Match
│   │   ├── Queue
│   │   ├── Match
│   │   └── Post-Match
│   ├── Challenge Mode (PvE)
│   │   ├── Story Challenges
│   │   └── Weekly Challenges
│   ├── Friendly Match
│   │   ├── Invite Friend
│   │   └── Random Opponent
│   └── Events (Live)
│       ├── Current Event
│       └── Event Rewards
├── Squad
│   ├── Active Squad
│   │   ├── Formation Editor
│   │   ├── Player Slots
│   │   └── Chemistry View
│   ├── Collection
│   │   ├── All Cards (Filterable)
│   │   ├── Card Detail
│   │   └── Album Progress
│   ├── Card Merge
│   │   ├── Select Cards
│   │   ├── Preview Result
│   │   └── Merge Animation
│   ├── Trade Market
│   │   ├── Browse/Search
│   │   ├── My Listings
│   │   └── Trade History
│   └── Rental Hub
│       ├── Available Rentals
│       └── My Rentals
├── Shop
│   ├── Pack Store
│   │   ├── Available Packs
│   │   ├── Pack Detail/Odds
│   │   └── Pack Opening
│   ├── Season Pass
│   │   ├── Free Track
│   │   ├── Premium Track
│   │   └── Purchase
│   ├── Cosmetic Shop
│   │   ├── Featured
│   │   ├── Celebrations
│   │   ├── Boots & Trails
│   │   └── Stadium Items
│   ├── Gem Store (IAP)
│   └── Daily Deals
├── Rank
│   ├── Current Rank & Progress
│   ├── Season Rewards Preview
│   ├── Leaderboards
│   │   ├── Global
│   │   ├── Regional
│   │   ├── Friends
│   │   └── Club
│   └── Match History
└── Me
    ├── Profile
    │   ├── Stats Dashboard
    │   ├── Achievement Gallery
    │   └── Edit Profile
    ├── Friends
    │   ├── Friends List
    │   ├── Friend Requests
    │   └── Find Friends
    ├── Club
    │   ├── Club Info
    │   ├── Members
    │   └── Club Chat
    ├── Inbox
    │   ├── Rewards
    │   ├── System Messages
    │   └── Social Messages
    └── Settings
```

### 2.2 Screen Count Summary

| Section | Screens | Priority |
|---------|---------|----------|
| **Home** | 1 | Critical |
| **Play** | 12 | Critical |
| **Squad** | 14 | Critical |
| **Shop** | 10 | High |
| **Rank** | 6 | High |
| **Me** | 10 | Medium |
| **Onboarding** | 8 | Critical |
| **Settings** | 4 | Medium |
| **Modals/Overlays** | 15 | Various |
| **TOTAL** | ~80 unique screens | — |

### 2.3 User Journey: First Day

```
Install → Splash → Language Select → Name Entry
→ Tutorial Match (guided, 2 min) → First Pack Opening (3 free cards)
→ Squad Builder (place first cards) → Second Match (semi-guided)
→ Home Screen (full access) → Daily Reward Prompt
→ Explore at will
```

**Target:** Player completes first match within 90 seconds of launch. Full tutorial under 5 minutes.

---

## 3. Screen Flows & Navigation

### 3.1 Bottom Navigation Bar

**5-tab persistent navigation** (visible on all screens except in-match):

| Tab | Icon | Label | Badge Logic |
|-----|------|-------|------------|
| **Play** | ⚽ (football) | Play | Active event indicator |
| **Squad** | 📋 (clipboard) | Squad | New card count |
| **Shop** | 🏪 (store) | Shop | Free/unclaimed pack |
| **Rank** | 🏆 (trophy) | Rank | Rank change notification |
| **Me** | 👤 (person) | Me | Unread messages/rewards |

**Design Specs:**
- Height: 56dp
- Active state: Filled icon + label in Project F Green
- Inactive: Outlined icon + label in muted white (60% opacity)
- Background: Deep Navy with 1dp top border (10% white)
- Safe area padding on notched devices

### 3.2 Header Bar Pattern

Every non-match screen uses a consistent header:

```
┌──────────────────────────────────────┐
│ [←/≡]  Screen Title     [🔔][💎 520]│
└──────────────────────────────────────┘
```

| Element | Behavior |
|---------|----------|
| **Back Arrow (←)** | Appears on sub-screens; returns to parent |
| **Hamburger (≡)** | Only on Home; opens side drawer with Settings/Help/Legal |
| **Screen Title** | Centered, Display Sans 24sp Bold |
| **Notification Bell (🔔)** | Badge count for unread; taps to Inbox |
| **Gem Counter (💎)** | Always visible; shows gem balance; taps to Gem Store |

### 3.3 Modal & Dialog System

| Type | Usage | Animation | Dismissal |
|------|-------|-----------|-----------|
| **Bottom Sheet** | Filters, quick actions, confirmations | Slide up 350ms | Drag down, tap outside |
| **Center Modal** | Important decisions, warnings, rewards | Scale up + fade 300ms | Explicit button only |
| **Full-Screen Overlay** | Pack opening, card detail, celebrations | Cross-fade 400ms | Back button / X |
| **Toast** | Success/error feedback | Slide down + bounce 500ms | Auto-dismiss 3s |
| **Tooltip** | First-time hints, stat explanations | Fade in 200ms | Tap anywhere |

**Anti-Pattern Rules:**
- Never stack more than 1 modal at a time
- Never show a modal within 3 seconds of screen entry (prevent popup fatigue)
- Purchase confirmations always require 2 taps (add + confirm)
- Never auto-dismiss purchase or destruction modals

---

## 4. Home Screen

### 4.1 Layout

```
┌──────────────────────────────────────┐
│ [≡]  PROJECT F         [🔔 3][💎 520]│
├──────────────────────────────────────┤
│                                      │
│  ┌──────────────────────────────┐    │
│  │    FEATURED BANNER           │    │
│  │    (Event / Season Pass)     │    │
│  │    [  →  carousel dots  →  ] │    │
│  └──────────────────────────────┘    │
│                                      │
│  ┌──────────┐  ┌──────────┐          │
│  │ ⚽ QUICK  │  │ 🏆 RANKED │          │
│  │  MATCH   │  │  MATCH   │          │
│  └──────────┘  └──────────┘          │
│                                      │
│  ── Today's Progress ──             │
│  ┌──────────────────────────────┐    │
│  │ Daily Missions    [2/4] ▓▓░░ │    │
│  │ Season Pass       [Tier 12]  │    │
│  │ Weekly Challenge  [1/3] ▓░░  │    │
│  └──────────────────────────────┘    │
│                                      │
│  ── Quick Access ──                 │
│  [📦 Free Pack] [🎁 Daily Gift]      │
│  [📊 My Stats]  [👥 Friends Online]  │
│                                      │
├──────────────────────────────────────┤
│ [⚽Play] [📋Squad] [🏪Shop] [🏆Rank] [👤Me]│
└──────────────────────────────────────┘
```

### 4.2 Home Screen Elements

| Element | Content | Update Frequency |
|---------|---------|-----------------|
| **Featured Banner** | Auto-rotating carousel (3-5 slides): current event, season pass, new packs | Every login |
| **Quick Match Button** | Large CTA, auto-queues casual match | Always available |
| **Ranked Match Button** | Large CTA, shows current rank badge | After tutorial completion |
| **Daily Missions** | Progress bar showing completed/total | Real-time |
| **Season Pass Tracker** | Current tier with XP progress | After each match |
| **Free Pack Timer** | Countdown to next free pack (every 4 hours) | Real-time countdown |
| **Daily Gift** | Badge when unclaimed, claimed state | Resets daily at 00:00 UTC |
| **Friends Online** | Count of online friends | Real-time |

### 4.3 Home Screen Rules

- **No forced shop popups** on home screen entry (anti-P2W UX)
- Featured banner may include shop items but must also include free content
- Free Pack timer is always prominent — reminds players that patience = cards
- Maximum 5 banner slides to prevent carousel blindness
- "What's New" dot on Play tab when new event launches

---

## 5. Match Flow UI

### 5.1 Pre-Match Flow

```
[Play Button] → Mode Selection → Queue → Opponent Found
→ Team Preview → Loading → Match Start
```

**Mode Selection Screen:**

| Mode | Card Treatment | Estimated Time |
|------|---------------|---------------|
| **Quick Match** | Large primary button, green | ~5 min |
| **Ranked** | Large secondary button, gold | ~6 min |
| **Challenge** | Medium tile, content-specific art | ~3-10 min |
| **Friendly** | Medium tile, social icon | ~5 min |
| **Event** | Highlighted tile with timer | Varies |

**Queue Screen:**
```
┌──────────────────────────────────────┐
│        Finding Opponent...           │
│        ⏱ 00:12                       │
│                                      │
│    ┌────────┐      ┌────────┐       │
│    │ YOUR   │  VS  │   ?    │       │
│    │ TEAM   │      │        │       │
│    │ ★★★☆   │      │        │       │
│    └────────┘      └────────┘       │
│                                      │
│    Tip: "Use Sprint wisely —        │
│    stamina matters!"                 │
│                                      │
│           [Cancel]                   │
└──────────────────────────────────────┘
```

- Rotating tips during queue (gameplay hints, never shop ads)
- Cancel button always available
- Auto-cancel after 60 seconds with option to re-queue
- Queue time indicator with expected wait

**Team Preview Screen (5 seconds):**
```
┌──────────────────────────────────────┐
│  YOUR TEAM          OPPONENT TEAM    │
│  ┌──┐┌──┐┌──┐     ┌──┐┌──┐┌──┐    │
│  │FW││FW││MF│     │MF││FW││FW│    │
│  └──┘└──┘└──┘     └──┘└──┘└──┘    │
│  ┌──┐┌──┐         ┌──┐┌──┐        │
│  │MF││DF│         │DF││MF│        │
│  └──┘└──┘         └──┘└──┘        │
│     ┌──┐              ┌──┐         │
│     │GK│              │GK│         │
│     └──┘              └──┘         │
│                                      │
│  Team Power: 1,240   Team Power: 1,180│
│  Chemistry: 82%      Chemistry: 75%  │
│                                      │
│  Formation: 2-2-1    Formation: 2-1-2│
└──────────────────────────────────────┘
```

- Both teams' power and chemistry visible (no information hiding)
- Formation layout preview
- 5-second timer, auto-proceeds to match

### 5.2 In-Match HUD

```
┌──────────────────────────────────────┐
│ ┌─────────────────────────────────┐  │
│ │ RED 2 : 1 BLU  ⏱ 03:42  [⏸]   │  │
│ └─────────────────────────────────┘  │
│ [Mini                                │
│  Map]                                │
│                                      │
│                                      │
│           3D GAMEPLAY                │
│            VIEWPORT                  │
│                                      │
│                                      │
│                                      │
│ [Stamina Bar ▓▓▓▓▓▓░░░░]            │
│                                      │
│   ┌──────┐           ┌──┐ ┌──┐      │
│   │      │           │ B│ │ C│      │
│   │ JOY- │      ┌──┐ └──┘ └──┘      │
│   │ STICK│      │ A│    ┌────┐      │
│   │      │      └──┘    │ SA │      │
│   └──────┘              └────┘      │
│              [SPRINT]               │
└──────────────────────────────────────┘
```

**HUD Elements:**

| Element | Position | Size | Info |
|---------|----------|------|------|
| **Scoreboard** | Top center | Full width, 40dp height | Team names (abbreviated), score, match time |
| **Pause Button** | Top right (inside scoreboard) | 32dp icon | Tap to pause menu |
| **Mini-Map** | Top left, below scoreboard | 80×60dp | Player dots (team-colored), ball indicator |
| **Virtual Joystick** | Bottom left | 120dp diameter | Movement control, appears on touch |
| **Button A (Pass/Tackle)** | Bottom right cluster | 56dp | Context-sensitive: Pass (attack) / Tackle (defense) |
| **Button B (Shoot/Block)** | Bottom right cluster | 56dp | Context-sensitive: Shoot (attack) / Block (defense) |
| **Button C (Through/Switch)** | Bottom right cluster | 48dp | Through ball (attack) / Switch player (defense) |
| **Sprint Button** | Bottom center-right | 48×32dp | Hold to sprint; linked to stamina bar |
| **SA (Special Ability)** | Bottom far right | 64dp, glowing | Available when charged; shows ability icon |
| **Stamina Bar** | Above controls, left | 120×8dp | Green→Yellow→Red gradient |

**HUD Rules:**
- Opacity: Scoreboard 90%, controls 70% (increase to 100% on touch)
- Auto-hide mini-map option in Settings
- Controls are fixed position (not draggable in v1; customizable layout in future update)
- Special Ability button pulses when available, grayed when on cooldown
- Cooldown shown as radial fill on SA button

### 5.3 Pause Menu

```
┌──────────────────────────────────────┐
│            ⏸ PAUSED                  │
│                                      │
│         RED  2 : 1  BLU             │
│         ⏱ 03:42                      │
│                                      │
│    ┌──────────────────────────┐      │
│    │     [▶ Resume]          │      │
│    │     [📷 Camera]          │      │
│    │     [⚙ Settings]        │      │
│    │     [🏳 Forfeit]         │      │
│    └──────────────────────────┘      │
│                                      │
│    Camera: [Default ▼]               │
│                                      │
└──────────────────────────────────────┘
```

- Pause available only in casual/friendly modes
- Ranked: pause limited to 2× per match, 10 seconds each
- Camera angle selectable during pause (6 angles per [GDD-01](core-game-design-en.md))
- Forfeit requires confirmation dialog ("Forfeit this match? This counts as a loss.")

### 5.4 Post-Match Screen

```
┌──────────────────────────────────────┐
│           ⚽ VICTORY! ⚽              │
│                                      │
│      YOUR TEAM  3 : 1  OPPONENT      │
│                                      │
│   Goals:                             │
│   ⚽ PlayerName (12')  ⚽ OppPlayer (31')│
│   ⚽ PlayerName (28')                │
│   ⚽ PlayerName (42')                │
│                                      │
│   ┌──────────────────────────────┐   │
│   │ MOTM: PlayerName             │   │
│   │ Rating: 9.2  Goals: 2 Assists: 1│   │
│   └──────────────────────────────┘   │
│                                      │
│   Rewards Earned:                    │
│   🪙 +120 Coins  ⭐ +25 XP          │
│   🏆 +18 MMR                        │
│                                      │
│   [🔄 Play Again]  [🏠 Home]         │
└──────────────────────────────────────┘
```

**Post-Match Elements:**
- Victory/Defeat/Draw with appropriate mood (see [GDD-05, Section 8.4](art-visual-style-en.md))
- Goal scorers with timestamps
- Man of the Match highlight
- Rewards breakdown (coins, XP, MMR change, season pass progress)
- "Play Again" for quick re-queue (same mode)
- Detailed stats (expandable): possession, shots, passes, tackles
- Optional: Rate the match (thumbs up/down for matchmaking quality feedback)

---

## 6. Card Management UI

### 6.1 Collection View

```
┌──────────────────────────────────────┐
│ ← My Collection            [🔔][💎] │
├──────────────────────────────────────┤
│ [All][Player][Manager][Team] [🔽Sort]│
│ [Filter: Tier▼ Position▼ Owned▼]    │
├──────────────────────────────────────┤
│ ┌────┐ ┌────┐ ┌────┐ ┌────┐        │
│ │Card│ │Card│ │Card│ │Card│        │
│ │ 1  │ │ 2  │ │ 3  │ │ 4  │        │
│ └────┘ └────┘ └────┘ └────┘        │
│ ┌────┐ ┌────┐ ┌────┐ ┌────┐        │
│ │Card│ │Card│ │Card│ │Card│        │
│ │ 5  │ │ 6  │ │ 7  │ │ 8  │        │
│ └────┘ └────┘ └────┘ └────┘        │
│ Cards: 47/200                        │
├──────────────────────────────────────┤
│ [⚽Play] [📋Squad] [🏪Shop] [🏆Rank] [👤Me]│
└──────────────────────────────────────┘
```

**Collection Features:**

| Feature | Implementation |
|---------|---------------|
| **Grid Layout** | 4 columns, scrollable |
| **Card Thumbnail** | 64×64dp, shows face + tier border |
| **Tier Filter** | Chips: All, N, R, E, S (color-coded) |
| **Position Filter** | Chips: All, GK, DF, MF, FW |
| **Sort Options** | Power (desc), Tier (desc), Position, Name (A-Z), Newest |
| **Multi-Select** | Long-press enables multi-select for merge/sell |
| **Card Count** | Current / maximum collection size |
| **Empty Slots** | Ghost cards showing "?" for undiscovered album entries |

### 6.2 Card Detail View

```
┌──────────────────────────────────────┐
│ ← Card Detail              [Share]  │
├──────────────────────────────────────┤
│                                      │
│         ┌──────────────┐            │
│         │              │            │
│         │  FULL CARD   │            │
│         │  ARTWORK     │            │
│         │  (Animated   │            │
│         │   for E+)    │            │
│         │              │            │
│         └──────────────┘            │
│                                      │
│  "Thunder Striker"        ★★★★☆     │
│  Position: FW     Tier: Epic        │
│                                      │
│  ┌─────┬─────┬─────┬─────┬─────┐   │
│  │ ATK │ DEF │ SPD │ SHT │ PAS │   │
│  │  78 │  42 │  85 │  82 │  68 │   │
│  └─────┴─────┴─────┴─────┴─────┘   │
│  Total Power: 355                    │
│                                      │
│  Special Ability: ⚡ Thunder Shot    │
│  Chemistry: Central (MF/FW links)   │
│                                      │
│  ┌──────────────────────────────┐   │
│  │ [Equip] [Merge] [Trade] [Sell]│   │
│  └──────────────────────────────┘   │
│                                      │
│  Acquired: March 15, 2026           │
│  Source: Premium Pack               │
│  Tradeable: Yes (after 24h)        │
└──────────────────────────────────────┘
```

**Card Detail Features:**
- 3D card render with tier-appropriate animation
- Swipe left/right to browse adjacent cards
- Stat bars with color coding (red < 40, yellow 40-69, green 70+)
- Special ability with tap-to-expand description
- Action buttons contextual (Sell hidden if card is in active squad)

### 6.3 Formation Editor

```
┌──────────────────────────────────────┐
│ ← Squad Editor             [Auto]   │
├──────────────────────────────────────┤
│  Formation: [◀ 2-2-1 ▶]             │
│  Chemistry: 78% [████████░░] +12%   │
│  Team Power: 1,240                   │
├──────────────────────────────────────┤
│                                      │
│         ┌──────┐                    │
│         │  FW  │                    │
│         │ Name │                    │
│         └──────┘                    │
│    ┌──────┐  ┌──────┐              │
│    │  MF  │  │  MF  │              │
│    │ Name │  │ Name │              │
│    └──────┘  └──────┘              │
│    ┌──────┐  ┌──────┐              │
│    │  DF  │  │  DF  │              │
│    │ Name │  │ Name │              │
│    └──────┘  └──────┘              │
│         ┌──────┐                    │
│         │  GK  │                    │
│         │ Name │                    │
│         └──────┘                    │
│                                      │
│  Manager: [Coach Name] [Change]     │
│  Team Card: [Team Name] [Change]    │
├──────────────────────────────────────┤
│  ┌──────────────────────────────┐   │
│  │ [💾 Save] [⚽ Play] [↩ Reset] │   │
│  └──────────────────────────────┘   │
├──────────────────────────────────────┤
│ [⚽Play] [📋Squad] [🏪Shop] [🏆Rank] [👤Me]│
└──────────────────────────────────────┘
```

**Formation Editor Features:**

| Feature | Behavior |
|---------|----------|
| **Tap Player Slot** | Opens card selector (filtered by position) |
| **Drag Player** | Drag between slots to swap positions |
| **Formation Arrows** | Cycle through 6 formations (1-2-2, 2-1-2, 2-2-1, 1-3-1, 3-1-1, 1-1-3) |
| **Auto-Fill** | AI selects best cards by power + chemistry |
| **Chemistry Display** | Real-time update as cards are placed; links shown between compatible cards |
| **Chemistry Links** | Green lines between synergistic cards, red lines for anti-synergy |
| **Save** | Save up to 5 squad presets |
| **Play** | Quick-launch to match with current squad |

### 6.4 Card Merge Interface

```
┌──────────────────────────────────────┐
│ ← Card Merge                        │
├──────────────────────────────────────┤
│                                      │
│  ┌────┐  ┌────┐         ┌────┐     │
│  │Card│ +│Card│   →     │ ?  │     │
│  │ 1  │  │ 2  │         │    │     │
│  └────┘  └────┘         └────┘     │
│                                      │
│  Input: 2× Rare MF                  │
│  Possible Results:                   │
│  ├── 70%: Rare (same/different)     │
│  ├── 25%: Epic                      │
│  └──  5%: Epic (with ability)       │
│                                      │
│  Pity Counter: 4/5 (guaranteed      │
│  upgrade on next merge!)             │
│                                      │
│  Cost: 🪙 500 Coins                  │
│                                      │
│  ┌──────────────────────────────┐   │
│  │     [🔀 Merge Now!]          │   │
│  └──────────────────────────────┘   │
│                                      │
│  ⚠ Input cards will be consumed.    │
│  Result is always ≥ input tier.      │
└──────────────────────────────────────┘
```

**Merge UX Rules:**
- **Published odds** always visible before merge (per [GDD-03](game-economy-monetization-en.md))
- **Pity counter** prominently displayed
- **No downgrade** guarantee clearly stated
- **Confirmation dialog** before final merge ("Merge these 2 cards? This cannot be undone.")
- **Result animation:** suspense sequence (1.5s) → card reveal with tier-appropriate VFX
- **Undo period:** None (confirmed action is final, but guaranteed ≥ input tier removes regret)

---

## 7. Shop & Pack Opening UI

### 7.1 Shop Layout

```
┌──────────────────────────────────────┐
│ ← Shop                     [🔔][💎] │
├──────────────────────────────────────┤
│ [Packs] [Pass] [Cosmetics] [Gems]   │
├──────────────────────────────────────┤
│                                      │
│  ── 🔥 Daily Deals (Resets: 14:32) ──│
│  ┌────────┐ ┌────────┐ ┌────────┐  │
│  │ Deal 1 │ │ Deal 2 │ │ Deal 3 │  │
│  │ 🪙 200  │ │ 💎 50   │ │ FREE  │  │
│  └────────┘ └────────┘ └────────┘  │
│                                      │
│  ── Available Packs ──              │
│  ┌──────────────────────────────┐   │
│  │ 📦 Basic Pack        🪙 1,000│   │
│  │ Contains: 3 cards (N-R)      │   │
│  │ [View Odds] [Buy]           │   │
│  └──────────────────────────────┘   │
│  ┌──────────────────────────────┐   │
│  │ 📦 Premium Pack      💎 300  │   │
│  │ Contains: 5 cards (R+ guar.) │   │
│  │ [View Odds] [Buy]           │   │
│  └──────────────────────────────┘   │
│                                      │
│  ── Free Pack ──                    │
│  ┌──────────────────────────────┐   │
│  │ 🎁 Free Pack   ⏱ Ready!     │   │
│  │ [Open Now]                   │   │
│  └──────────────────────────────┘   │
│                                      │
├──────────────────────────────────────┤
│ [⚽Play] [📋Squad] [🏪Shop] [🏆Rank] [👤Me]│
└──────────────────────────────────────┘
```

### 7.2 Shop UX Anti-P2W Rules

| Rule | Implementation |
|------|---------------|
| **No dark patterns** | No countdown timers creating false urgency (except genuine daily deal resets) |
| **Odds always visible** | "View Odds" button on every pack; full drop table accessible pre-purchase |
| **Spending awareness** | After $50 spent in session: "You've spent $50 today" neutral banner |
| **Spending cap** | After $100 daily: 15-minute cooldown before next purchase |
| **No "best value" tags** | Never label any IAP as "best value" — let players decide |
| **Free pack prominence** | Free pack always visible at same level as paid packs |
| **No auto-redirect to shop** | Player never auto-navigated to shop; always player-initiated |
| **Clear pricing** | All items show real currency cost, not just gem cost (gem → currency conversion shown) |

### 7.3 Pack Opening Sequence

**Flow:** `Purchase → Anticipation → Reveal → Collection`

| Phase | Duration | Visual |
|-------|----------|--------|
| **Purchase Confirm** | Player tap | 2-tap confirmation (add to cart → confirm) |
| **Package Appears** | 1s | Pack type animation (slide/float into center) |
| **Anticipation Build** | 1.5s | Glow/shake intensifies, particles swirl |
| **Card Reveal** | 1s per card | Cards flip/materialize one by one |
| **Tier Reveal** | 0.5s per card | Frame lights up with tier color + VFX |
| **Collection** | 2s | All cards displayed; "NEW" badges; tap to view details |
| **Skip** | Available | Tap to skip animation; see all cards immediately |

**Critical UX Rule:** Pack opening skip is ALWAYS available. Never force players to watch animations for cards they paid for. The animation exists for joy, not friction.

### 7.4 Season Pass UI

```
┌──────────────────────────────────────┐
│ ← Season Pass: "Winter Storm"       │
│ Season ends in: 23d 14h             │
├──────────────────────────────────────┤
│ Current Level: 12 / 50              │
│ XP: ████████░░░░░░ 340/500          │
├──────────────────────────────────────┤
│                                      │
│  ←  [10][11][★12][13][14][15]  →    │
│                                      │
│  Free Track:                         │
│  ┌──────┐  Reward: 🪙 200 Coins     │
│  │ 🟢   │  Status: ✅ Claimed       │
│  └──────┘                           │
│                                      │
│  Premium Track: 🔒                   │
│  ┌──────┐  Reward: Epic Pack        │
│  │ 🟡   │  Status: 🔒 Upgrade to   │
│  └──────┘  unlock  [Upgrade 💎 800] │
│                                      │
│  Elite Track: 🔒                     │
│  ┌──────┐  Reward: Exclusive Celeb  │
│  │ 🔴   │  Status: 🔒 Premium+Elite│
│  └──────┘  [Upgrade 💎 1500]        │
│                                      │
├──────────────────────────────────────┤
│ [⚽Play] [📋Squad] [🏪Shop] [🏆Rank] [👤Me]│
└──────────────────────────────────────┘
```

**Season Pass UX:**
- Horizontal scroll through tiers with current tier highlighted
- Free track always visible — never hidden or diminished
- Premium rewards shown but clearly locked (not teasing frustration)
- "Days remaining" shown prominently for planning
- Upgrade buttons only where contextually relevant

---

## 8. Competitive & Ranking UI

### 8.1 Current Rank Display

```
┌──────────────────────────────────────┐
│ ← Competitive                        │
├──────────────────────────────────────┤
│                                      │
│      ┌──────────────────┐           │
│      │   🏆 GOLD III    │           │
│      │   ★★★☆☆          │           │
│      │   MMR: 1,420      │           │
│      │   Next: Gold II   │           │
│      │   ████████░░ 3/5★ │           │
│      └──────────────────┘           │
│                                      │
│  Season: "Winter Storm"             │
│  Ends: March 31, 2026              │
│                                      │
│  ┌──────────────────────────────┐   │
│  │ Season Rewards Preview       │   │
│  │ Gold Tier: Season Pack (3E+) │   │
│  │ [View All Rewards]          │   │
│  └──────────────────────────────┘   │
│                                      │
│  ── Recent Matches ──               │
│  ┌─ W ─┐ ┌─ W ─┐ ┌─ L ─┐ ┌─ W ─┐ │
│  │ 3-1 │ │ 2-0 │ │ 1-2 │ │ 4-0 │ │
│  └─────┘ └─────┘ └─────┘ └─────┘ │
│  Win Rate: 68%  Streak: 2W        │
│                                      │
│  [🏆 Play Ranked]                    │
│  [📊 Leaderboards]                   │
│  [📜 Full Match History]             │
│                                      │
├──────────────────────────────────────┤
│ [⚽Play] [📋Squad] [🏪Shop] [🏆Rank] [👤Me]│
└──────────────────────────────────────┘
```

### 8.2 Leaderboard UI

```
┌──────────────────────────────────────┐
│ ← Leaderboards                      │
├──────────────────────────────────────┤
│ [Global][Region][Friends][Club]      │
├──────────────────────────────────────┤
│                                      │
│  🥇 PlayerAlpha      Diamond I  4,200│
│  🥈 BetaGamer        Diamond II 3,980│
│  🥉 CharlieKick      Diamond III 3,750│
│  4. DeltaStrike      Platinum I 3,600│
│  5. EchoFootball     Platinum II 3,490│
│  ...                                 │
│  ── Your Position ──                │
│  247. YourName       Gold III   1,420│
│                                      │
│  [↑ Top 100] [≡ Around Me]          │
│                                      │
├──────────────────────────────────────┤
│ [⚽Play] [📋Squad] [🏪Shop] [🏆Rank] [👤Me]│
└──────────────────────────────────────┘
```

**Leaderboard Features:**
- 4 views: Global, Regional (auto-detected), Friends, Club
- Your position always pinned at bottom regardless of scroll
- Top 3 with medal icons and highlight styling
- "Around Me" view shows ±10 players centered on your rank
- Tap any player to view their public profile
- Anti-manipulation: hidden MMR values in leaderboard (rank only); exact MMR shown only to the player themselves

### 8.3 Rank Promotion Animation

When a player ranks up:
1. Match ends → Victory screen
2. "RANK UP!" banner slides in with fanfare
3. Old rank badge morphs into new rank badge
4. Reward list appears (rank-up rewards)
5. "Share" option for social media

Duration: 4 seconds (skippable after 2 seconds)

---

## 9. Social & Profile UI

### 9.1 Profile Screen

```
┌──────────────────────────────────────┐
│ ← My Profile              [✏ Edit]  │
├──────────────────────────────────────┤
│                                      │
│  ┌──────┐  PlayerName              │
│  │Avatar│  Level: 24               │
│  │      │  🏆 Gold III              │
│  └──────┘  Club: FC Legends        │
│                                      │
│  ── Quick Stats ──                  │
│  ┌──────┐ ┌──────┐ ┌──────┐       │
│  │Matches│ │ Win% │ │ Goals│       │
│  │  342  │ │  62% │ │ 890  │       │
│  └──────┘ └──────┘ └──────┘       │
│                                      │
│  ── Achievements ──                 │
│  ┌──┐ ┌──┐ ┌──┐ ┌──┐ ┌──┐ [→]    │
│  │🏅│ │🏅│ │🏅│ │🏅│ │🏅│        │
│  └──┘ └──┘ └──┘ └──┘ └──┘        │
│  42/125 Unlocked                    │
│                                      │
│  ── Showcase ──                     │
│  [Best Card]  [Favorite Celeb]      │
│  [Best Season Record]              │
│                                      │
├──────────────────────────────────────┤
│ [⚽Play] [📋Squad] [🏪Shop] [🏆Rank] [👤Me]│
└──────────────────────────────────────┘
```

### 9.2 Friends List

| Feature | Implementation |
|---------|---------------|
| **Friends List** | Scrollable list with online/offline status |
| **Online Indicator** | Green dot for online, gray for offline, orange for in-match |
| **Quick Actions** | Invite to match, view profile, send gift, remove |
| **Friend Request** | Via player ID or post-match suggestion |
| **Max Friends** | 100 (expandable with premium) |
| **Recent Players** | Last 20 opponents with "Add Friend" option |

### 9.3 Inbox System

```
┌──────────────────────────────────────┐
│ ← Inbox                             │
├──────────────────────────────────────┤
│ [Rewards] [System] [Social]          │
├──────────────────────────────────────┤
│                                      │
│  ┌──────────────────────────────┐   │
│  │ 🎁 Daily Login Reward        │   │
│  │    5m ago  [Claim]           │   │
│  └──────────────────────────────┘   │
│  ┌──────────────────────────────┐   │
│  │ 🏆 Season Reward: Gold III   │   │
│  │    2h ago  [Claim]           │   │
│  └──────────────────────────────┘   │
│  ┌──────────────────────────────┐   │
│  │ 📢 New Event: World Cup Mode │   │
│  │    1d ago  [View]            │   │
│  └──────────────────────────────┘   │
│                                      │
│  [Claim All Available]              │
│                                      │
├──────────────────────────────────────┤
│ [⚽Play] [📋Squad] [🏪Shop] [🏆Rank] [👤Me]│
└──────────────────────────────────────┘
```

**Inbox Rules:**
- "Claim All" button for bulk reward collection
- Messages expire after 30 days (with warning at 7 days)
- Rewards tab badges show unclaimed count
- System messages include patch notes, maintenance, and announcements
- Social tab: friend requests, trade offers, club messages

---

## 10. Onboarding Flow

### 10.1 First-Time User Experience (FTUE)

| Step | Screen | Duration | Interaction |
|------|--------|----------|-------------|
| **1** | Splash + Logo | 2s | Auto |
| **2** | Language Selection | Player choice | Tap to select |
| **3** | "Welcome to Project F" cinematic | 8s | Skippable after 3s |
| **4** | Name Your Team | 10s avg | Text input + confirm |
| **5** | Choose First Face Preset | 15s avg | Scroll + select from 12 starter presets |
| **6** | Tutorial Match — Movement | 30s | Guided: joystick movement + pass |
| **7** | Tutorial Match — Shooting | 30s | Guided: shoot at goal |
| **8** | Tutorial Match — Win First Match | 60s | Semi-guided: complete a match vs AI |
| **9** | First Pack Opening | 15s | Open 3-card starter pack |
| **10** | Build Your First Squad | 20s | Place cards in formation |
| **11** | Second Match (optional guidance) | 4 min | Full match with hint tooltips |
| **12** | Home Screen Reveal | — | Full UI available |

**Total FTUE Time:** ~7 minutes (5 min core path + 2 min optional)

### 10.2 Tutorial Design Principles

| Principle | Implementation |
|-----------|---------------|
| **Learn by Doing** | No text walls; every mechanic taught through gameplay |
| **One Concept at a Time** | Movement → Passing → Shooting → Match → Cards → Squad |
| **Quick Win** | First match always ends in player victory (AI difficulty 0) |
| **Rewarding** | Every tutorial step gives a tangible reward |
| **Skippable** | "Skip Tutorial" available after first match for experienced players |
| **Re-accessible** | Tutorial replay available from Settings > Help > Tutorial |

### 10.3 Progressive Disclosure

Features unlock gradually to prevent overwhelm:

| Feature | Unlock Condition | Tutorial Prompt |
|---------|-----------------|----------------|
| **Quick Match** | Immediately after FTUE | "Play your first real match!" |
| **Card Collection** | After first pack opened | "Check out your new cards!" |
| **Formation Editor** | After 2nd match | "Customize your formation" |
| **Ranked Mode** | After 5 matches played | "Ready for competition? Try Ranked!" |
| **Card Merge** | After owning 10+ cards | "Combine cards to get stronger ones" |
| **Trade Market** | After reaching Bronze III | "Trade with other players" |
| **Season Pass** | After 1st day | Passive unlock; info tooltip |
| **Club** | After reaching Silver V | "Join or create a club!" |
| **Cosmetic Shop** | After reaching Level 5 | Subtle nudge, not forced |

### 10.4 Contextual Hints

| Hint Type | Trigger | Display |
|-----------|---------|---------|
| **First Visit** | First time on any screen | Highlight key elements with dim overlay |
| **Feature Discovery** | New feature unlocked | Pulsing "NEW" badge + tooltip |
| **Tip of the Day** | Home screen, 1st login | Small banner below header |
| **Match Hint** | Player struggles (3 losses) | "Try changing your formation" suggestion |
| **Economy Hint** | Player has resources but doesn't use them | "You have cards ready to merge!" |

**Hint Rules:**
- Each hint shown maximum 3 times
- "Don't show again" option on all hints
- Never show hints during matches
- Hints use tooltip style, never modals

**Reference:**
- Mobile Onboarding UX: [Medium — Onboarding Strategies](https://medium.com/@amol346bhalerao/mobile-game-onboarding-top-ux-strategies-that-boost-retention-6ef266f433cb)
- Onboarding Best Practices: [Adrian Crook & Associates](https://adriancrook.com/best-practices-for-mobile-game-onboarding/)
- Onboarding Examples 2026: [plotline.so](https://www.plotline.so/blog/mobile-app-onboarding-examples)

---

## 11. Notification System

### 11.1 In-Game Notifications

| Type | Visual | Position | Auto-Dismiss |
|------|--------|----------|-------------|
| **Reward Earned** | Green toast with icon | Top center | 3 seconds |
| **Achievement Unlocked** | Gold banner with animation | Top center | 5 seconds |
| **Friend Online** | Small avatar toast | Top right | 3 seconds |
| **Trade Offer** | Blue toast with card preview | Top center | 5 seconds |
| **Match Found** | Full-width overlay | Center | Until action |
| **Season Event** | Themed banner | Top center | 5 seconds |
| **Daily Reset** | Subtle indicator | Tab badges | Persistent |

### 11.2 Push Notifications

**Categories (User-Configurable):**

| Category | Examples | Default | Max Frequency |
|----------|----------|---------|--------------|
| **Free Rewards** | "Your free pack is ready!" | ON | Every 4 hours |
| **Social** | "FriendName wants to play!" | ON | Unlimited (organic) |
| **Season/Events** | "New event: World Cup Mode starts now!" | ON | 2/day max |
| **Competitive** | "Your ranked season ends in 24 hours!" | ON | 1/day max |
| **Daily Missions** | "Complete today's missions for bonus XP" | ON | 1/day max |
| **Inactivity** | "We miss you! Your team needs you" | ON | 1/week, stops after 2 weeks |
| **Shop/Deals** | "New daily deals available!" | OFF | 1/day max |
| **Maintenance** | "Server maintenance in 2 hours" | ON (locked) | As needed |

### 11.3 Notification Design Rules

| Rule | Detail |
|------|--------|
| **Opt-in Primer** | Before iOS permission dialog, show custom screen explaining notification value |
| **Configurable** | Every category toggleable in Settings (except maintenance) |
| **Respectful Hours** | No push notifications between 22:00-08:00 local time (unless urgent maintenance) |
| **No FOMO** | Never use "limited time!" or "expiring soon!" in push copy unless genuinely true |
| **No Shop Push** | Shop notifications default OFF; only enabled if player opts in |
| **Character Limit** | ≤ 90 characters per notification (fits both iOS and Android) |
| **Deep Link** | Every notification deep-links to relevant screen (not just home) |
| **Frequency Cap** | Maximum 3 push notifications per day across all categories |

**Reference:**
- Push Notification Best Practices: [udonis.co](https://www.blog.udonis.co/mobile-marketing/mobile-games/mobile-game-push-notifications)
- Google Play Notification Guide: [Medium — Google Play](https://medium.com/googleplaydev/optimizing-notifications-in-games-5efd6ba89701)
- Notification Strategy: [GameAnalytics](https://www.gameanalytics.com/blog/create-push-notification-strategy)

---

## 12. Accessibility

### 12.1 Visual Accessibility

| Feature | Implementation |
|---------|---------------|
| **Colorblind Modes** | 3 presets: Protanopia, Deuteranopia, Tritanopia with intensity slider |
| **High Contrast** | Alternative UI theme with increased contrast ratios (WCAG AA minimum) |
| **Font Scaling** | 5 sizes: Small (12sp), Normal (14sp), Large (16sp), XL (18sp), XXL (20sp) |
| **Icon + Color** | Never rely on color alone; all color-coded info has icon/shape backup |
| **Card Tier Shapes** | Each tier has a unique border shape in addition to color (circle, diamond, star, crown, flame) |
| **Rarity Patterns** | Colorblind mode adds patterns to tier backgrounds (dots, stripes, crosshatch, waves, zigzag) |

### 12.2 Motor Accessibility

| Feature | Implementation |
|---------|---------------|
| **One-Hand Mode** | Compressed control layout fitting right or left thumb zone |
| **Control Scaling** | Joystick and button sizes adjustable (80%-150% of default) |
| **Tap Timing** | No time-critical taps outside of core gameplay (menus are untimed) |
| **Auto-Play Option** | AI assists in casual matches (reduced rewards) |
| **Simplified Controls** | 2-button mode: A (context action) + Sprint; AI handles camera/switching |

**One-Hand Mode Layout:**
```
Standard:                    One-Hand (Right):
┌──────────────────┐        ┌──────────────────┐
│                  │        │                  │
│                  │        │                  │
│                  │        │                  │
│[JOY]      [BTNS]│        │        [JOY]     │
│                  │        │      [A][B]      │
│                  │        │   [Sprint][SA]   │
└──────────────────┘        └──────────────────┘
```

### 12.3 Audio Accessibility

| Feature | Implementation |
|---------|---------------|
| **Subtitles** | All voice/commentary with subtitle option |
| **Audio Cues** | Visual alternatives for all audio cues (goal, whistle, timer) |
| **Individual Volume** | Separate sliders: Master, Music, SFX, Commentary, UI Sounds |
| **Haptic Feedback** | Vibration for goals, tackles, special abilities (toggle on/off) |
| **Mono Audio** | Merge stereo to mono option |

### 12.4 Cognitive Accessibility

| Feature | Implementation |
|---------|---------------|
| **Simple Language** | UI text at 6th-grade reading level |
| **Tutorial Replay** | Re-access any tutorial from Settings |
| **Consistent Layout** | Same navigation pattern across all screens |
| **Confirmation Dialogs** | All destructive/purchase actions require explicit confirmation |
| **Undo Where Possible** | Squad changes reversible, card equip/unequip free |

**Reference:**
- Game Accessibility Guidelines: [gameaccessibilityguidelines.com](https://gameaccessibilityguidelines.com/)
- Colorblind Mode Guide: [caniplaythat.com](https://caniplaythat.com/2020/01/29/color-blindness-accessibility-guide/)
- Accessibility in Mobile Games: [sdlccorp.com](https://sdlccorp.com/post/the-growing-importance-of-accessibility-in-mobile-games/)

---

## 13. Settings & Options

### 13.1 Settings Menu Structure

```
Settings
├── Account
│   ├── Link Account (Google/Apple/Facebook)
│   ├── Player ID (copy)
│   ├── Language
│   └── Delete Account
├── Graphics
│   ├── Quality Preset (Low/Medium/High/Auto)
│   ├── Frame Rate (30/60)
│   ├── Resolution Scale
│   └── Battery Saver Mode
├── Audio
│   ├── Master Volume
│   ├── Music Volume
│   ├── SFX Volume
│   ├── Commentary Volume
│   └── Haptic Feedback (On/Off)
├── Controls
│   ├── Joystick Size (slider)
│   ├── Button Size (slider)
│   ├── One-Hand Mode (Off/Left/Right)
│   ├── Simplified Controls (On/Off)
│   └── Sensitivity (slider)
├── Notifications
│   ├── [Toggle per category]
│   └── Quiet Hours
├── Accessibility
│   ├── Colorblind Mode (Off/Prot/Deut/Trit)
│   ├── Colorblind Intensity (slider)
│   ├── High Contrast (On/Off)
│   ├── Font Size (5 options)
│   ├── Mono Audio (On/Off)
│   └── Subtitles (On/Off)
├── Gameplay
│   ├── Camera Angle (6 presets)
│   ├── Auto-Switch Player (On/Off)
│   ├── Match Duration Display (Clock/Countdown)
│   └── Skip Celebrations (On/Off)
├── Privacy
│   ├── Show Online Status (On/Off)
│   ├── Allow Friend Requests (All/Friends-of-Friends/None)
│   ├── Profile Visibility (Public/Friends/Private)
│   └── Data & Privacy Policy
└── Help
    ├── Replay Tutorial
    ├── FAQ
    ├── Contact Support
    └── About / Version
```

### 13.2 Settings UX Rules

- Settings organized by category with collapsible sections
- Changes apply immediately (no "Save" button needed)
- "Reset to Defaults" option per section
- Graphics settings show estimated performance impact
- Battery Saver mode reduces quality + caps at 30 FPS
- Language change requires app restart (with confirmation dialog)

---

## 14. P2W & Sustainability Evaluation

### 14.1 UI/UX P2W Risk Assessment

| UI Element | P2W Risk | Mitigation |
|-----------|----------|-----------|
| **Shop placement in nav bar** | Medium | Shop is 3rd tab (not 1st or 2nd); never forces navigation there |
| **Pack opening spectacle** | Medium | Free packs get SAME animation quality as paid. No "lesser" treatment for free players. |
| **Daily deal placement** | Low | Deals visible but not intrusive; mostly coin-priced, not gem-only |
| **Spending UI** | Low | Double-tap purchases, spending awareness banners, daily cap with cooldown |
| **Season Pass UI** | Low | Free track always visible and never diminished; premium shown locked, not teased |
| **Card power display** | Low | Power visible to both players pre-match; no hidden information advantage |
| **Notification push** | Low | Shop notifications default OFF; free reward notifications prioritized |

### 14.2 UX Sustainability Analysis

| Factor | Score | Notes |
|--------|-------|-------|
| **Ease of Return** | 9/10 | Quick login → home → play in under 10 seconds. No barriers to returning. |
| **Session Flexibility** | 9/10 | Matches are 4-5 minutes. Perfect for mobile sessions. |
| **Progression Clarity** | 8/10 | Clear rank display, season progress, collection progress. Players always know where they stand. |
| **Social Stickiness** | 8/10 | Friends list, clubs, friendly matches, leaderboards create community bonds. |
| **Content Discovery** | 8/10 | Progressive disclosure prevents overwhelm while maintaining exploration joy. |
| **Frustration Management** | 9/10 | No dead-end screens, no forced shop visits, confirmations on all irreversible actions. |
| **Accessibility Reach** | 9/10 | Colorblind modes, one-hand play, font scaling, simplified controls expand addressable market. |
| **Overall UX Sustainability** | **8.6/10** | Strong UX foundation designed for long-term player satisfaction. |

### 14.3 eFootball Mistake Avoidance

> eFootball Mobile's 2022 launch was a UI/UX disaster. We learn from it:

| eFootball Mistake | Our Prevention |
|------------------|----------------|
| **Confusing menu structure** | Clear 5-tab navigation, 3-tap rule enforced |
| **Hidden features** | Progressive disclosure with clear unlock messaging |
| **Laggy UI transitions** | All transitions ≤ 300ms, pre-rendered assets |
| **Inconsistent design language** | Single design system from GDD-05 applied to every screen |
| **No onboarding** | Comprehensive FTUE teaching one concept at a time |
| **Settings buried** | Settings accessible from every screen via header hamburger |

### 14.4 Dark Pattern Checklist (What We Will NEVER Do)

| Dark Pattern | Status | Reasoning |
|-------------|--------|-----------|
| **Forced ads** | ❌ NEVER | Ads are always rewarded and opt-in only |
| **Countdown urgency** | ❌ NEVER | Except genuine daily deal resets with clear explanation |
| **"Are you sure?" on free options** | ❌ NEVER | Confirmations only on purchases/destructive actions |
| **Confusing currency display** | ❌ NEVER | Real currency always shown alongside virtual currency |
| **Auto-redirect to shop** | ❌ NEVER | Player always navigates to shop by choice |
| **"One-time offer" popups** | ❌ NEVER | All offers available in shop; no interrupt popups |
| **Lesser animation for free** | ❌ NEVER | Free packs get equal celebration as paid |
| **Hidden odds** | ❌ NEVER | Drop rates visible on every pack |
| **Buried unsubscribe** | ❌ NEVER | Notification toggles in plain Settings |
| **Progress walls** | ❌ NEVER | No feature requires payment to access |

---

## Appendix A: Screen Transition Map

### A.1 Key User Flows

**Flow 1: Quick Match (3 taps)**
```
Home → [Play Tab] → [Quick Match] → Queue → Match
```

**Flow 2: Open a Pack (3 taps)**
```
Home → [Shop Tab] → [Free Pack / Buy] → Pack Opening
```

**Flow 3: Edit Squad (2 taps)**
```
Home → [Squad Tab] → Formation Editor
```

**Flow 4: Check Rank (2 taps)**
```
Home → [Rank Tab] → Rank Display
```

**Flow 5: Merge Cards (4 taps)**
```
Home → [Squad Tab] → [Card Merge] → Select Cards → Merge
```

**Flow 6: Trade a Card (4 taps)**
```
Home → [Squad Tab] → [Trade Market] → List Card → Confirm
```

### A.2 Error State Screens

| Error | Screen Treatment |
|-------|-----------------|
| **No Internet** | Full-screen with retry button + offline training mode option |
| **Server Maintenance** | Themed maintenance screen with estimated return time |
| **Match Disconnect** | Reconnection attempt (3×) + option to forfeit gracefully |
| **Session Expired** | Smooth re-login flow (no data loss) |
| **Inventory Full** | Prompt to sell/merge cards before proceeding |
| **Insufficient Currency** | Show deficit + "How to earn" link (not just "Buy more") |

---

## Appendix B: Responsive Design Breakpoints

| Device Class | Screen Width | Adjustments |
|-------------|-------------|-------------|
| **Small Phone** | < 360dp | 3-column card grid, smaller buttons, condensed headers |
| **Standard Phone** | 360-420dp | Default layout (4-column cards) |
| **Large Phone** | 420-480dp | Default layout with extra padding |
| **Tablet** | 480dp+ | 6-column card grid, side-by-side panels where appropriate |
| **Foldable (Unfolded)** | Variable | Tablet layout when unfolded, phone when folded |

---

## Appendix C: Loading & Empty States

### C.1 Loading States

| Context | Treatment |
|---------|----------|
| **App Launch** | Logo animation → progress bar → home screen |
| **Match Loading** | Tip carousel with team comparison |
| **Screen Navigation** | Skeleton screens (gray placeholder shapes) — never spinners |
| **Data Fetch** | Content shimmer animation on card/list placeholders |

### C.2 Empty States

| Screen | Empty Message | CTA |
|--------|--------------|-----|
| **Collection (no cards)** | "Your collection is empty! Open your first pack." | [Open Free Pack] |
| **Friends (none)** | "No friends yet! Play matches to meet opponents." | [Quick Match] |
| **Match History (first time)** | "No matches played yet. Start your journey!" | [Play Now] |
| **Trade Market (no listings)** | "Nothing listed yet. Be the first!" | [List a Card] |
| **Club (not joined)** | "Join a club to compete together!" | [Find Clubs] |
| **Inbox (empty)** | "All caught up! Play to earn more rewards." | [Play Match] |

---

*This document defines the complete UI/UX system for Project F. All screen designs, interaction patterns, and navigation flows must follow these specifications. Deviations require Game Designer and UX Lead approval.*

*Next Document: [GDD-07: Special Abilities & GGO System](special-abilities-ggo-en.md)*
