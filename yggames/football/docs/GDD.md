# YG Football — Game Design Document (GDD)

> **Single source of truth for all development.** Every agent must read this document before starting any task.

---

## 1. Project Overview

| Field | Value |
|---|---|
| **App Name** | YG Football |
| **Platform** | iOS & Android (React Native + Expo) |
| **Genre** | Casual football mini-games |
| **MVP Mode** | Plinko |
| **Languages** | Turkish, English, German, French |
| **Network** | Fully offline (bundled CSV data) |
| **Monetization** | None (v1) |

### 1.1 Concept

A football-themed mini-game collection where players select two real-world teams and compete in various casual game modes. Real team/player data (names, stats, card images) come from a bundled EA FC 26 CSV dataset (`docs/eafc26-men.csv` — 16,228 players). No external API calls needed. The MVP ships with **Plinko mode only**.

### 1.2 Tech Stack

| Technology | Version | Purpose |
|---|---|---|
| React Native | 0.83.2 | Framework |
| Expo SDK | 55 | Build & tooling |
| TypeScript | 5.9.2 (strict) | Language |
| expo-router | 55.0.5 | File-based navigation |
| zustand | 5.x | State management |
| react-native-reanimated | 4.2.1 | Animations & physics |
| react-native-gesture-handler | 2.30.0 | Touch input |
| expo-image | 55.0.6 | Optimized images |
| expo-av | — | Sound effects (install needed) |

### 1.3 Project Structure

```
src/
├── screens/           # Screen implementations
├── components/
│   ├── common/        # Reusable UI (buttons, cards, badges)
│   └── game/          # Game-specific (ball, peg, goal, scoreboard)
├── hooks/             # Custom hooks (useGameEngine, useMatchSimulation, useSound)
├── services/          # API calls (footballApi.ts)
├── stores/            # Zustand stores (matchStore, settingsStore)
├── types/             # TypeScript interfaces
├── constants/         # Colors, dimensions, game config
├── i18n/              # Internationalization files
│   ├── tr.json        # Turkish
│   ├── en.json        # English
│   ├── de.json        # German
│   └── fr.json        # French
├── utils/             # Helper functions
└── assets/
    └── sounds/        # Sound effect files (.mp3/.wav)
```

---

## 2. Screen Flow

```
Main Menu → Team Selection → Game Mode Selection → Plinko Game → Post-Match Summary
                                                                       │
                                                        ┌──────────────┼──────────────┐
                                                   "Rematch"    "Change Teams"    "Main Menu"
                                                       │              │                │
                                                  Plinko Game   Team Selection     Main Menu
```

### 2.1 Screens

| # | Screen | Route | Description |
|---|---|---|---|
| 1 | Main Menu | `/` | App entry, "Start Match" button, settings |
| 2 | Team Selection | `/team-select` | Pick 2 teams (Home & Away) |
| 3 | Game Mode Selection | `/mode-select` | Choose game mode (Plinko = active, rest = Coming Soon) |
| 4 | Plinko Game | `/game/plinko` | The actual game |
| 5 | Post-Match Summary | `/match-summary` | Scores, events, player cards |
| 6 | Settings | `/settings` | Language selection, sound toggle |

---

## 3. Screen Specifications

### 3.1 Main Menu

**Layout:**
- Top: App logo / "YG FOOTBALL" title
- Center: Large "START MATCH" button (primary CTA)
- Below: "SETTINGS" button (secondary)
- Bottom: "YG Games" credit, version number

**Interactions:**
- "START MATCH" → navigates to Team Selection
- "SETTINGS" → navigates to Settings (language, sound)

**Animations:**
- Subtle football icon rotation or bounce (decorative)
- Button press scale animation (0.95 on press)

---

### 3.2 Team Selection

**Layout:**
- Top: League filter bar (horizontal scroll, pill-shaped buttons)
  - Pills: All Leagues, Premier League, La Liga, Serie A, Bundesliga, Süper Lig
- Middle: Team grid (3 columns, scrollable FlatList)
  - Each cell: team logo (64x64) + short name below
  - Selected team: highlighted border + checkmark overlay
- Bottom (fixed): Selection bar
  - Left slot: "Home Team" — empty state = dashed border + "Select" text
  - Right slot: "Away Team" — empty state = dashed border + "Select" text
  - Filled state: team logo + name + X button to deselect
  - "CONTINUE" button (disabled until both teams selected)

**Logic:**
- First tap → fills Home slot
- Second tap → fills Away slot
- Cannot select the same team twice
- Tapping a selected team deselects it
- League filter updates grid

**State:** Store selections in zustand `matchStore`

---

### 3.3 Game Mode Selection

**Layout:**
- Header: Team A logo + "VS" + Team B logo (read from matchStore)
- Mode cards (vertical list):
  - **Plinko** — Active, tappable
    - Icon: 🎱 or football falling through pins
    - Title: "PLINKO"
    - Description (i18n): "Drop balls through pegs and score goals!"
  - **Coming Soon** cards (Arena, etc.) — Greyed out, lock icon, not tappable

**Interactions:**
- Tap Plinko → navigate to `/game/plinko`
- Coming Soon cards show lock overlay, no action

---

### 3.4 Plinko Game Screen

> **This is the core game. Read carefully.**

#### 3.4.1 Layout

```
┌─────────────────────────────────┐
│  [Team A Logo] 0 - 0 [Team B Logo]  │  ← Score Bar
│           ⏱ 45:00                │  ← Match Timer (match-minutes)
├─────────────────────────────────┤
│     ●A          ●B              │  ← Drop Zone (2 balls, team colors)
│                                 │
│   ○  ○  ○  ○  ○  ○  ○          │  ← Peg Grid
│    ○  ○  ○  ○  ○  ○            │
│   ○  ○  ○  ○  ○  ○  ○          │
│    ○  ○  ○  ○  ○  ○            │
│   ○  ○  ○  ○  ○  ○  ○          │
│    ○  ○  ○  ○  ○  ○            │
│   ○  ○  ○  ○  ○  ○  ○          │
│    ○  ○  ○  ○  ○  ○            │
│                                 │
│  ╔═══════════════════════════╗  │  ← Single Goal (bottom center)
│  ║         ⚽ GOAL           ║  │
│  ╚═══════════════════════════╝  │
│                                 │
│  ─ EVENT TOAST ──────────────   │  ← Popup: "⚽ 23' Goal!" / "🟥 45' Red Card!"
└─────────────────────────────────┘
```

#### 3.4.2 Game Mechanics

**Balls:**
- Exactly **2 balls** on screen at all times
- Ball A = Team A primary color
- Ball B = Team B primary color
- Both balls drop **simultaneously** from the top
- Drop position: random X within drop zone, same Y (top)
- Balls are affected by gravity and bounce off pegs

**Pegs:**
- Static circular obstacles arranged in a triangular/diamond grid
- Balls collide with pegs and change direction realistically
- Peg color: neutral/metallic (not team-colored)

**Goal:**
- **Single goal** at the bottom center of the screen
- Goal width: ~30-40% of screen width
- When ANY ball enters the goal → that ball's team scores +1
- Both balls can score (both can enter goal)

**Ball Reset:**
- When a ball exits the screen (falls past goal area or goes out of bounds) → it respawns at the **same X position** at the top and drops again
- When a ball scores a goal → it also respawns at the top
- Balls keep dropping until the match timer ends
- **Unlimited balls** (continuous respawning), but only 2 on screen at any time

**Physics:**
- Gravity: constant downward acceleration
- Peg collision: elastic bounce with slight randomness for unpredictability
- Ball-ball collision: enabled (they can bump each other)
- No player control — balls drop automatically, physics determines outcome

#### 3.4.3 Match Timer

| Parameter | Value |
|---|---|
| **Total match time** | 90 real seconds |
| **Display format** | Match-minutes (0' → 90') mapped to 90 real seconds (1 real sec = 1 match-minute) |
| **Extra time** | Random 1-5 extra seconds added after 90', displayed as "90+1", "90+2", etc. |
| **Half-time** | No half-time break (continuous play) |

**Timer flow:**
1. Match starts → timer counts from 0' to 90'
2. At 90': generate random extra time (1-5 seconds)
3. Timer shows "90+1'", "90+2'" etc. during extra time
4. Whistle sound when time ends
5. All balls freeze in place
6. 1-second pause → navigate to Post-Match Summary

#### 3.4.4 Match Events

Events are generated during gameplay and displayed in the Post-Match Summary:

**Goal Event:**
- Triggered when: a ball enters the goal
- Recorded data: `{ type: 'goal', minute: currentMatchMinute, teamId, playerId }`
- **Player assignment:** Weighted random from team's current roster (from CSV data)
  - Weight = player's `Finishing` stat (column 15 in CSV)
  - Higher finishing = higher probability of being credited
  - Forwards weighted more than midfielders, midfielders more than defenders, goalkeepers almost never
- UI: Toast popup "⚽ GOAL! [minute]' [Player Name]" (2 seconds)
- Sound: Goal celebration sound effect

**Red Card Event:**
- Triggered when: random chance, ~5% probability checked every 15 match-minutes (at 15', 30', 45', 60', 75')
- **Red card is purely visual/cosmetic** — does NOT affect gameplay (balls don't change)
- Recorded data: `{ type: 'red_card', minute: currentMatchMinute, teamId, playerId }`
- Player selection: random from team roster (excluding already red-carded players)
- UI: Toast popup "🟥 RED CARD! [minute]' [Player Name]" (2 seconds)
- Sound: Whistle blow sound effect
- Post-match: shown in events timeline, player marked as sent off

#### 3.4.5 Score Bar (Top)

- Team A logo (left) — Score — Team B logo (right)
- Score animates (scale up briefly) when a goal is scored
- Match timer centered below scores

#### 3.4.6 Event Toasts

- Appear at bottom of screen, above the goal
- Auto-dismiss after 2 seconds
- Goal toast: green/accent background with ⚽ icon
- Red card toast: red background with 🟥 icon
- Stack if multiple events happen close together

---

### 3.5 Post-Match Summary

**Layout:**
```
┌─────────────────────────────────┐
│         MATCH RESULT            │
│                                 │
│  [Team A Logo]  3 - 1  [Team B Logo]  │  ← Final Score (large)
│   Team A Name        Team B Name │
│                                 │
├─────────────────────────────────┤
│         MATCH EVENTS            │
│                                 │
│  ⚽ 12'  Haaland (Team A)       │  ← Goal events
│  ⚽ 23'  Salah (Team A)         │
│  🟥 34'  Ramos (Team B)        │  ← Red card event
│  ⚽ 56'  Mbappé (Team B)       │
│  ⚽ 78'  Haaland (Team A)      │
│                                 │
├─────────────────────────────────┤
│         MAN OF THE MATCH        │
│  ┌─────────────────────────┐    │
│  │  [Player Photo/Avatar]  │    │
│  │  Erling Haaland         │    │
│  │  ⚽⚽ 2 Goals            │    │
│  │  OVR 91 | FIN 95 | PAC 89│   │  ← EA FC style stats
│  └─────────────────────────┘    │
│                                 │
├─────────────────────────────────┤
│  [REMATCH]  [CHANGE TEAMS]  [HOME]  │  ← Action Buttons
└─────────────────────────────────┘
```

#### 3.5.1 Score Display

- Winning team side: subtle glow or highlight
- Draw: both sides neutral
- Large score numbers with team colors

#### 3.5.2 Match Events Timeline

- Chronological list of all events (goals + red cards)
- Each event: icon + minute + player name + team indicator (color dot or logo)
- Scrollable if many events

#### 3.5.3 Man of the Match (MOTM) Card

- **EA FC style player card** — this is a key visual feature
- Player with most goals in the match
- If tied: player with higher `overall` stat wins
- If no goals (0-0): player with highest `overall` from either team
- Card shows:
  - Player name
  - Goals scored in this match
  - Key stats from API: OVR (overall), FIN (finishing), PAC (pace)
  - Team logo badge
  - Card background: gold/special gradient

#### 3.5.4 Action Buttons

| Button | Action |
|---|---|
| **Rematch** | Same teams, same mode → restart Plinko |
| **Change Teams** | Navigate to Team Selection (clear previous selections) |
| **Home** | Navigate to Main Menu |

---

## 4. Football Data — Bundled CSV

### 4.1 Data Source

All player and team data comes from a **bundled EA FC 26 CSV file** — no external API calls needed.

| Field | Value |
|---|---|
| **File** | `docs/eafc26-men.csv` (bundled with the app) |
| **Total players** | 16,228 |
| **Data** | Names, teams, leagues, positions, all EA FC stats, card image URLs |

### 4.2 CSV Column Mapping

| CSV Column | Type | GDD Usage |
|---|---|---|
| `ID` | number | Unique player identifier |
| `Name` | string | Player display name |
| `Team` | string | Team name (used to group players into teams) |
| `League` | string | League name (used for league filter) |
| `Position` | string | Raw position (ST, RM, CB, GK, etc.) → map to FWD/MID/DEF/GK |
| `OVR` | number | Overall rating (1-99) — shown on MOTM card |
| `Finishing` | number | Finishing stat (1-99) — **used for goal probability weighting** |
| `PAC` | number | Pace (1-99) — shown on MOTM card |
| `SHO` | number | Shooting (1-99) — shown on MOTM card |
| `PAS` | number | Passing (1-99) |
| `DRI` | number | Dribbling (1-99) |
| `DEF` | number | Defending (1-99) |
| `PHY` | number | Physical (1-99) |
| `Nation` | string | Player nationality |
| `Age` | number | Player age |
| `Height` | string | Player height |
| `card` | URL | **EA FC card image URL** (.webp) — used for MOTM card display |

### 4.3 League Names in CSV

These are the exact league names as they appear in the CSV `League` column:

| Display Name | CSV League Value |
|---|---|
| Premier League | `Premier League` |
| La Liga | `LALIGA EA SPORTS` |
| Serie A | `Serie A Enilive` |
| Bundesliga | `Bundesliga` |
| Süper Lig | `Trendyol Süper Lig` |
| Ligue 1 | `Ligue 1 McDonald's` |

> More leagues available in CSV. Start with these 6 for MVP, allow expanding later.

### 4.4 Position Mapping

CSV has granular positions. Map them to 4 groups for game logic:

```typescript
const POSITION_MAP: Record<string, 'GK' | 'DEF' | 'MID' | 'FWD'> = {
  // Goalkeeper
  'GK': 'GK',
  // Defenders
  'CB': 'DEF', 'LB': 'DEF', 'RB': 'DEF', 'LWB': 'DEF', 'RWB': 'DEF',
  // Midfielders
  'CM': 'MID', 'CDM': 'MID', 'CAM': 'MID', 'LM': 'MID', 'RM': 'MID',
  // Forwards
  'ST': 'FWD', 'CF': 'FWD', 'LW': 'FWD', 'RW': 'FWD', 'LF': 'FWD', 'RF': 'FWD',
};
```

### 4.5 Data Flow

```
App Start
  → Parse bundled CSV at startup (or pre-parsed JSON)
  → Build in-memory indexes: leagueMap, teamMap, playersByTeam
  → Ready to use (zero network, zero latency)
```

**Implementation options:**
1. **Parse CSV at runtime** using a lightweight CSV parser (e.g., `papaparse`)
2. **Pre-convert to JSON** at build time — generate `src/data/players.json` from CSV (recommended for performance)

### 4.6 Required TypeScript Types

```typescript
interface League {
  name: string;          // CSV: League column
  displayName: string;   // Cleaned display name (e.g., "La Liga" instead of "LALIGA EA SPORTS")
}

interface Team {
  name: string;          // CSV: Team column
  league: string;        // CSV: League column
  players: Player[];     // Grouped from CSV rows
  primaryColor: string;  // Defined in a team colors config file
  secondaryColor: string;
}

interface Player {
  id: number;            // CSV: ID
  name: string;          // CSV: Name
  team: string;          // CSV: Team
  league: string;        // CSV: League
  position: string;      // CSV: Position (raw)
  positionGroup: 'GK' | 'DEF' | 'MID' | 'FWD';  // Mapped
  nation: string;        // CSV: Nation
  age: number;           // CSV: Age
  stats: PlayerStats;
  cardImageUrl: string;  // CSV: card column — EA FC card image
}

interface PlayerStats {
  overall: number;       // CSV: OVR
  finishing: number;     // CSV: Finishing
  pace: number;          // CSV: PAC
  shooting: number;      // CSV: SHO
  passing: number;       // CSV: PAS
  dribbling: number;     // CSV: DRI
  defending: number;     // CSV: DEF
  physical: number;      // CSV: PHY
}

interface MatchEvent {
  id: string;
  type: 'goal' | 'red_card';
  minute: number;        // 1-90+
  teamName: string;
  playerId: number;
  playerName: string;
}
```

### 4.7 Team Visual Identity (MVP)

For MVP, teams do **not** have individual colors or logos. Instead:

**Team Colors:**
- Home team is always displayed in **yellow** (`#FFC72C`)
- Away team is always displayed in **red** (`#E63946`)
- These fixed colors are used for: ball colors in Plinko, score bar indicators, team badges, selection UI

**Team Badges (no logos):**
- Display team name initials inside a colored circle
- Home team: initials in yellow circle (e.g., "LIV")
- Away team: initials in red circle (e.g., "RMA")
- Generate initials: first 3 characters of team name, uppercase

```typescript
const TEAM_DISPLAY = {
  homeColor: '#FFC72C',  // Yellow
  awayColor: '#E63946',  // Red
  getInitials: (teamName: string) => teamName.substring(0, 3).toUpperCase(),
};
```

> **Future enhancement:** Add per-team real colors config and logo assets.

### 4.9 Player-Goal Assignment Algorithm

```
When a goal is scored by Team X:
1. Get Team X's full roster from CSV data
2. Exclude any red-carded players from this match
3. Calculate weights:
   - For each player: weight = Finishing_stat × position_multiplier
   - Position multipliers: FWD = 3.0, MID = 1.5, DEF = 0.5, GK = 0.05
4. Weighted random selection → selected player credited with goal
5. Record MatchEvent with selected player's name and ID
```

### 4.10 MOTM Card Display

The `card` column in CSV contains a direct URL to each player's EA FC card image:
```
https://ratings-images-prod.pulse.ea.com/FC26/components/items/{playerId}_en.webp
```

Use this URL in the Post-Match Summary MOTM card via `expo-image` for optimized loading with a placeholder/fallback.

---

## 5. Internationalization (i18n)

### 5.1 Supported Languages

| Code | Language | Status |
|---|---|---|
| `tr` | Türkçe (Turkish) | Primary |
| `en` | English | Primary |
| `de` | Deutsch (German) | Secondary |
| `fr` | Français (French) | Secondary |

### 5.2 Implementation

- Use a lightweight i18n solution (custom hook or `i18next` with `react-i18next`)
- Language files in `src/i18n/{locale}.json`
- Detect device language on first launch, allow manual override in Settings
- Store preference in AsyncStorage

### 5.3 Translatable Strings (Key Examples)

```json
{
  "menu.startMatch": "Start Match / Maça Başla / Spiel starten / Commencer le match",
  "menu.settings": "Settings / Ayarlar / Einstellungen / Paramètres",
  "teamSelect.homeTeam": "Home Team / Ev Sahibi / Heimteam / Équipe domicile",
  "teamSelect.awayTeam": "Away Team / Deplasman / Auswärtsteam / Équipe extérieure",
  "teamSelect.continue": "Continue / Devam / Weiter / Continuer",
  "game.goal": "GOAL! / GOL! / TOR! / BUT!",
  "game.redCard": "RED CARD! / KIRMIZI KART! / ROTE KARTE! / CARTON ROUGE!",
  "game.extraTime": "Extra Time / Uzatma / Nachspielzeit / Temps additionnel",
  "summary.matchResult": "Match Result / Maç Sonucu / Spielergebnis / Résultat du match",
  "summary.matchEvents": "Match Events / Maç Olayları / Spielereignisse / Événements du match",
  "summary.motm": "Man of the Match / Maçın Yıldızı / Spieler des Spiels / Homme du match",
  "summary.rematch": "Rematch / Rövanş / Rückspiel / Revanche",
  "summary.changeTeams": "Change Teams / Takım Değiştir / Teams ändern / Changer d'équipes",
  "summary.home": "Home / Ana Menü / Startseite / Accueil"
}
```

---

## 6. Sound Effects

### 6.1 Sound List

| Sound | Trigger | File |
|---|---|---|
| `whistle_start.mp3` | Match starts | Short whistle blow |
| `whistle_end.mp3` | Match ends (full time) | Long whistle blow |
| `goal.mp3` | Ball enters goal | Crowd cheer + horn |
| `ball_bounce.mp3` | Ball hits a peg | Short click/bounce (quiet, subtle) |
| `red_card.mp3` | Red card event | Sharp whistle |
| `button_tap.mp3` | Any button press | Soft click |

### 6.2 Implementation

- Use `expo-av` for audio playback
- Preload all sounds on app start
- Sound toggle in Settings (on/off, stored in AsyncStorage)
- Ball bounce sound: throttle to max 1 play per 100ms (avoid spam)

---

## 7. Design Tokens

### 7.1 Colors

```typescript
const Colors = {
  // Background
  background: '#0d2818',      // Dark green (pitch)
  surface: '#1a472a',         // Lighter green (cards)
  surfaceLight: '#2d6a4f',    // Hover/active states

  // Accent
  primary: '#7dcea0',         // Main accent (buttons, highlights)
  primaryDark: '#52b788',     // Pressed state

  // Score & Events
  goalGold: '#FFD700',        // Goal celebration
  redCard: '#E63946',         // Red card

  // Text
  textPrimary: '#FFFFFF',
  textSecondary: '#A8DABC',
  textMuted: '#6B9080',

  // UI
  border: '#2d6a4f',
  disabled: '#4a4a4a',
  overlay: 'rgba(0,0,0,0.6)',
};
```

### 7.2 Spacing (8pt Grid)

```typescript
const Spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};
```

### 7.3 Typography

```typescript
const Typography = {
  scoreDisplay: { fontSize: 48, fontWeight: '900' },
  heading1: { fontSize: 32, fontWeight: '700' },
  heading2: { fontSize: 24, fontWeight: '700' },
  heading3: { fontSize: 20, fontWeight: '600' },
  body: { fontSize: 16, fontWeight: '400' },
  bodyBold: { fontSize: 16, fontWeight: '600' },
  caption: { fontSize: 14, fontWeight: '400' },
  small: { fontSize: 12, fontWeight: '400' },
  timer: { fontSize: 28, fontWeight: '700', fontFamily: 'monospace' },
};
```

### 7.4 Game Dimensions

```typescript
const GameConfig = {
  // Match
  matchDurationSeconds: 90,
  extraTimeMinSeconds: 1,
  extraTimeMaxSeconds: 5,

  // Plinko
  ballCount: 2,
  ballRadius: 10,           // pixels
  pegRadius: 6,             // pixels
  pegRows: 8,               // number of peg rows
  pegCols: 7,               // pegs per odd row (6 per even row)
  goalWidthPercent: 0.35,   // 35% of screen width
  gravity: 0.3,             // acceleration per frame
  bounceDamping: 0.7,       // energy retained on bounce (0-1)
  ballBounceRandomness: 0.1,// random angle variance on peg hit

  // Events
  redCardCheckMinutes: [15, 30, 45, 60, 75],
  redCardProbability: 0.05, // 5% chance at each check point

  // Toasts
  toastDurationMs: 2000,

  // Position Multipliers (for goal assignment)
  positionWeights: {
    FWD: 3.0,
    MID: 1.5,
    DEF: 0.5,
    GK: 0.05,
  },
};
```

---

## 8. State Management (Zustand)

### 8.1 Match Store

```typescript
interface MatchStore {
  // Teams
  homeTeam: Team | null;
  awayTeam: Team | null;
  setHomeTeam: (team: Team) => void;
  setAwayTeam: (team: Team) => void;
  clearTeams: () => void;

  // Game Mode
  selectedMode: 'plinko' | null;
  setSelectedMode: (mode: string) => void;

  // Score
  homeScore: number;
  awayScore: number;
  addGoal: (teamId: string) => void;

  // Events
  events: MatchEvent[];
  addEvent: (event: MatchEvent) => void;
  clearMatch: () => void;

  // Timer
  currentMinute: number;
  isExtraTime: boolean;
  extraTimeAmount: number;
}
```

### 8.2 Settings Store

```typescript
interface SettingsStore {
  language: 'tr' | 'en' | 'de' | 'fr';
  soundEnabled: boolean;
  setLanguage: (lang: string) => void;
  toggleSound: () => void;
}
```

---

## 9. Future Game Modes (Post-MVP)

These modes are **not in scope for MVP** but are planned:

| Mode | Concept | Priority |
|---|---|---|
| **Arena** | Circular arena, balls bounce inside, rotating goal | Next |
| **Stat Showdown** | Compare two player cards, guess higher stat | Future |
| **Card Clash** | Top Trumps style card game | Future |
| **Guess the Footballer** | Wordle-style player guessing | Future |
| **Penalty Arena** | Gesture-based penalty kicks | Future |
| **Free Kick Curve** | Draw curve trajectory around wall | Future |

---

## 10. Build Order (Recommended)

```
Phase 1: Foundation
  → CSV data parser / pre-converted JSON data layer
  → Team colors config for all 6 MVP leagues
  → i18n setup
  → Sound system setup
  → Zustand stores (matchStore, settingsStore)
  → Missing dependencies (expo-av, i18n library, papaparse or pre-convert CSV)

Phase 2: Screens (UI only, no game logic)
  → Main Menu
  → Settings (language + sound)
  → Team Selection
  → Game Mode Selection
  → Post-Match Summary (with mock data)

Phase 3: Game Engine
  → Plinko physics (gravity, pegs, collision, goal detection)
  → Ball spawning & respawning logic
  → Match timer (90s + extra time)
  → Event system (goals, red cards)
  → Player-goal assignment algorithm

Phase 4: Polish
  → Sound effects integration
  → Animations (score update, toasts, transitions)
  → MOTM card design
  → Edge cases & testing

Phase 5: Testing
  → Physics unit tests
  → Match simulation statistical tests
  → Full flow integration tests
  → Multi-language verification
```

---

## Appendix A: CSV Data Reference

### File Location
`docs/eafc26-men.csv` — bundled with the project, 16,228 rows.

### All CSV Columns (59 total)
```
ID, Rank, Name, GENDER, OVR, PAC, SHO, PAS, DRI, DEF, PHY,
Acceleration, Sprint Speed, Positioning, Finishing, Shot Power,
Long Shots, Volleys, Penalties, Vision, Crossing, Free Kick Accuracy,
Short Passing, Long Passing, Curve, Dribbling, Agility, Balance,
Reactions, Ball Control, Composure, Interceptions, Heading Accuracy,
Def Awareness, Standing Tackle, Sliding Tackle, Jumping, Stamina,
Strength, Aggression, Position, Weak foot, Skill moves, Preferred foot,
Height, Weight, Alternative positions, Age, Nation, League, Team,
play style, url, GK Diving, GK Handling, GK Kicking, GK Positioning,
GK Reflexes, card
```

### Columns Used by the App
| Column | Index | Usage |
|---|---|---|
| ID | 0 | Unique player ID |
| Name | 2 | Display name |
| OVR | 4 | Overall rating → MOTM card |
| PAC | 5 | Pace → MOTM card |
| SHO | 6 | Shooting → MOTM card |
| Finishing | 14 | **Goal probability weight** |
| Position | 40 | Position grouping (FWD/MID/DEF/GK) |
| Nation | 48 | Player nationality |
| League | 49 | League filter |
| Team | 50 | Team grouping |
| Age | 47 | Player info |
| card | 58 | EA FC card image URL (.webp) |

### Sample Row
```
209331,1,Mohamed Salah,M,91,89,88,86,90,45,76,...,RM,...,Egypt,Premier League,Liverpool,...,https://ratings-images-prod.pulse.ea.com/FC26/components/items/209331_en.webp
```

---

## Appendix B: Glossary

| Term | Definition |
|---|---|
| **Plinko** | Game mode where balls drop through a peg board |
| **Peg** | Static circular obstacle that balls bounce off |
| **MOTM** | Man of the Match — best performer |
| **Finishing** | Player stat that determines goal-scoring probability |
| **Extra Time** | Random 1-5 additional seconds after 90' |
| **Match-minute** | In-game time unit (1 real second = 1 match-minute) |
| **Toast** | Brief popup notification for game events |
| **EA FC style** | Visual card style inspired by EA Sports FC player cards |
