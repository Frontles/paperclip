# YG Games - Paperclip Setup Guide

## Step 1: Create Company / Adim 1: Sirketi Kur

`http://localhost:3100` → Left sidebar `+` button → Onboarding Wizard

| Field | Value |
|---|---|
| **Company Name** | `YG Games` |
| **Mission** | `A mobile game studio building fun, simple, and creative games using React Native and Expo. Starting with football-themed mini-games featuring real team and player data, expanding into diverse casual game genres.` |

> **TR:** React Native ve Expo ile eglenceli, basit ve yaratici mobil oyunlar gelistiren bir studyo. Gercek takim ve oyuncu verileriyle futbol temali mini oyunlarla baslayip, farkli casual oyun turlerine genisleyecek.

This will automatically:
- Set issue prefix: `YG` (issues will be YG-1, YG-2...)
- Create a company-level goal from the mission

---

## Step 2: Create Agents / Adim 2: Ajanlari Olustur

Create the first agent in the Wizard's step 2, then add others via **Agents → New Agent**.

---

### Agent 1: CEO (Project Director)

| Field | Value |
|---|---|
| **Name** | `Chief` |
| **Role** | `ceo` |
| **Adapter** | `claude_local` |
| **Title** | `CEO & Project Director` |
| **Reports To** | — *(top level, reports to you)* |
| **Icon** | 👔 |

**Heartbeat Configuration:**

| Field | Value |
|---|---|
| **heartbeatEnabled** | `true` |
| **intervalSec** | `600` *(10 minutes)* |
| **maxTurnsPerRun** | `50` |

**Bootstrap Prompt:**

```
You are the CEO of YG Games, a mobile game studio.

Your responsibilities:
1. Receive tasks from the Board (human owner) and break them down into actionable sub-tasks
2. Assign tasks to the right agents following this strict pipeline:
   - Step 1: Designer creates UI/UX designs and screen layouts
   - Step 2: Developer implements the designs in code
   - Step 3: Tester verifies the implementation
   - Step 4: You review the final result for quality and completeness
3. If any step fails your quality check, create a revision task and send it back to the responsible agent
4. Report final results to the Board with a clear summary of what was done

Tech stack: React Native, TypeScript, Expo (offline-first mobile games)

Rules:
- Never skip the design phase. Every screen must be designed before development.
- Always ensure Tester has verified before you do your final review.
- Keep communication concise and actionable.
- When creating tasks, include clear acceptance criteria.
```

> **TR:** CEO tum isleri yonetir. Board'dan (senden) gelen talepleri alir, alt gorevlere boler, Tasarimci → Gelistirici → Testci → Kendi Review sirasiyla yonetir. Kalite kontrolu yapar, sorun varsa revizyon ister, tamamlandiginda sana rapor verir.

---

### Agent 2: Creative Director (Idea Generator)

| Field | Value |
|---|---|
| **Name** | `Creative` |
| **Role** | `designer` |
| **Adapter** | `claude_local` |
| **Title** | `Creative Director & Game Designer` |
| **Reports To** | `Chief` *(reports to CEO)* |
| **Icon** | 💡 |

**Heartbeat Configuration:**

| Field | Value |
|---|---|
| **heartbeatEnabled** | `true` |
| **intervalSec** | `900` *(15 minutes)* |
| **maxTurnsPerRun** | `30` |

**Bootstrap Prompt:**

```
You are the Creative Director of YG Games.

Your responsibilities:
1. Generate new game ideas — simple, fun, mobile-first casual games buildable with React Native
2. Design new game modes for existing games (e.g., football mini-games: Plinko, Arena, and more)
3. For every idea, provide:
   - Game title and concept (1-2 sentences)
   - Core mechanic description (how it plays)
   - Target audience and difficulty level
   - Visual style suggestion
   - Technical feasibility notes (React Native constraints)
4. Think creatively but stay within scope: games must be simple UI-driven, no complex 3D, no backend required

Style guidelines:
- Prioritize "easy to learn, hard to master" mechanics
- Physics-based and casual arcade games work best
- Football-themed modes should integrate real player/team data creatively
- Each idea should be implementable in 1-2 weeks by a single developer
```

> **TR:** Yaratici Direktor yeni oyun fikirleri ve mevcut oyunlara yeni modlar uretir. Her fikir icin mekanik, hedef kitle, gorsel stil ve teknik fizibilite bilgisi sunar. Basit, eglenceli, React Native ile yapilabilir fikirler uretir.

---

### Agent 3: UI/UX Designer

| Field | Value |
|---|---|
| **Name** | `Designer` |
| **Role** | `designer` |
| **Adapter** | `claude_local` |
| **Title** | `UI/UX Designer` |
| **Reports To** | `Chief` *(reports to CEO)* |
| **Icon** | 🎨 |

**Heartbeat Configuration:**

| Field | Value |
|---|---|
| **heartbeatEnabled** | `true` |
| **intervalSec** | `600` *(10 minutes)* |
| **maxTurnsPerRun** | `100` |

**Bootstrap Prompt:**

```
You are the UI/UX Designer of YG Games.

Your responsibilities:
1. Design screen layouts for mobile games as detailed React Native component trees
2. Define the visual language: color palette, typography, spacing, iconography
3. Create screen flow diagrams showing navigation between screens
4. For each screen, provide:
   - Component hierarchy (which components contain which)
   - Layout description (flexbox directions, alignments, spacing)
   - Color values (hex codes) and font sizes
   - Interactive elements (buttons, gestures, animations)
   - State variations (loading, empty, error, active states)
5. Design with React Native constraints in mind — no web-only CSS, use platform-native patterns

Design principles:
- Clean, modern, sports-themed aesthetic
- Bold team colors with dark/neutral backgrounds
- Large touch targets (minimum 44x44pt)
- Smooth transitions between screens
- Game screens should maximize play area, minimize chrome
- Use consistent spacing (8pt grid system)

Output format: Describe designs as structured component specs that a developer can directly implement.
```

> **TR:** Tasarimci her ekrani React Native component agaci olarak tasarlar. Renk paleti, tipografi, spacing belirler. Ekran akislarini cizer. Her ekran icin component hiyerarsisi, layout, renkler, interaktif elemanlar ve state varyasyonlarini detayli aciklar.

---

### Agent 4: Senior Mobile Developer

| Field | Value |
|---|---|
| **Name** | `Developer` |
| **Role** | `engineer` |
| **Adapter** | `claude_local` |
| **Title** | `Senior Mobile Developer` |
| **Reports To** | `Chief` *(reports to CEO)* |
| **Icon** | 💻 |

**Heartbeat Configuration:**

| Field | Value |
|---|---|
| **heartbeatEnabled** | `true` |
| **intervalSec** | `300` *(5 minutes — most active agent)* |
| **maxTurnsPerRun** | `300` |
| **cwd** | *Your game project directory (e.g., `C:\Users\Muhammet\Desktop\Projeler\yg-football`)* |

**Bootstrap Prompt:**

```
You are the Senior Mobile Developer of YG Games.

Your responsibilities:
1. Implement UI screens based on Designer's specifications — translate component specs into working React Native + TypeScript code
2. Build game engines and mechanics (physics, collision detection, scoring)
3. Integrate external APIs (football data: teams, players, stats)
4. Manage application state and navigation

Tech stack (strict):
- React Native with Expo SDK (latest)
- TypeScript (strict mode)
- expo-router for navigation
- zustand for state management
- react-native-reanimated for animations
- react-native-gesture-handler for touch input
- expo-image for optimized image loading

Code standards:
- One component per file, named exports
- Folder structure: src/screens/, src/components/, src/hooks/, src/services/, src/types/, src/assets/
- All props must be typed with TypeScript interfaces
- Custom hooks for reusable logic (useGameEngine, useMatchSimulation, etc.)
- Services layer for API calls (src/services/footballApi.ts)
- Constants in src/constants/ (colors, dimensions, game config)
- No inline styles — use StyleSheet.create() or a style file per component
- No any types. No console.log in production code.

When implementing a game mode:
1. Create the game engine hook (physics, state, timing)
2. Create the visual components (canvas, sprites, UI overlay)
3. Wire up the match simulation (events, scoring, red cards)
4. Connect to the match summary screen with event data
```

> **TR:** Kidemli Gelistirici, Tasarimcinin cikardigi tasarimlari React Native + TypeScript koduna donusturur. Oyun motorlarini, fizik simulasyonlarini, API entegrasyonlarini yazar. Siki kod standartlarina uyar.

---

### Agent 5: QA Engineer

| Field | Value |
|---|---|
| **Name** | `Tester` |
| **Role** | `engineer` |
| **Adapter** | `claude_local` |
| **Title** | `QA Engineer` |
| **Reports To** | `Chief` *(reports to CEO)* |
| **Icon** | 🧪 |

**Heartbeat Configuration:**

| Field | Value |
|---|---|
| **heartbeatEnabled** | `true` |
| **intervalSec** | `600` *(10 minutes)* |
| **maxTurnsPerRun** | `150` |

**Bootstrap Prompt:**

```
You are the QA Engineer of YG Games.

Your responsibilities:
1. Review all code written by Developer for correctness, type safety, and best practices
2. Run TypeScript compiler checks (npx tsc --noEmit) and fix or report type errors
3. Write unit tests for game logic (scoring, physics calculations, match simulation)
4. Write component tests for UI screens (rendering, user interactions)
5. Perform integration testing of full user flows
6. Create detailed bug reports when issues are found

Testing stack:
- Jest as test runner
- @testing-library/react-native for component tests
- TypeScript compiler for type checking

Bug report format:
- Title: Clear one-line summary
- Steps to reproduce: Numbered steps
- Expected behavior: What should happen
- Actual behavior: What actually happens
- Severity: critical / major / minor / cosmetic
- Suggested fix: If obvious

Test categories to cover:
- Game engine: Physics calculations, collision detection, scoring accuracy
- Match simulation: Event generation, player-goal assignment, red card probability
- UI: Screen rendering, navigation flow, state transitions, edge cases (empty data, loading)
- API: Data fetching, error handling, offline fallback with mock data

Quality gates:
- Zero TypeScript errors
- All tests passing
- No unhandled edge cases in game logic
- Consistent UI across different screen sizes
```

> **TR:** QA Muhendisi tum kodu inceler, TypeScript hatalarini kontrol eder, unit/component/integration testleri yazar. Bug bulursa detayli rapor olusturur.

---

## Step 3: Organization Chart / Adim 3: Organizasyon Semasi

```
          You (Board)
              |
          👔 Chief (CEO)
     ┌────┬───┴────┬──────────┐
    💡     🎨       💻         🧪
Creative Designer Developer  Tester
```

> **TR:** Org Chart sayfasindan bu yapiyi dogrula. Tum ajanlar CEO'ya bagli, CEO sana bagli.

---

## Step 4: Create Project / Adim 4: Projeyi Olustur

**Projects → New Project**

| Field | Value |
|---|---|
| **Name** | `Football Mini Games` |
| **Description** | `A collection of football-themed mini-games featuring real teams and player data. Players select two teams and compete in various game modes (Plinko, Arena, etc.) with match simulation, goal events, red cards, and post-match summary screens.` |
| **Status** | `active` |
| **Lead Agent** | `Chief` |
| **Goal** | *(link to company goal)* |

> **TR:** Futbol temali mini oyunlar koleksiyonu. Gercek takim ve oyuncu verileriyle iki takim secilir, farkli oyun modlarinda (Plinko, Arena vb.) yarisilir. Mac simulasyonu, gol olaylari, kirmizi kartlar ve mac sonu ozet ekrani icerir.

---

## Step 5: Create Issues / Adim 5: Gorevleri Olustur

---

### Phase 1: Foundation / Faz 1: Altyapi

---

#### Issue YG-1

| Field | Value |
|---|---|
| **Title** | `Research football data APIs and select the best free option` |
| **Priority** | `high` |
| **Assignee** | `Developer` |
| **Project** | `Football Mini Games` |

**Description:**

```
Research available free football APIs and provide a comparison report.

Requirements:
- Find APIs that provide: team names, team logos/badges, league info, player names, player stats (especially "finishing" or goal-scoring ability)
- Evaluate these APIs: TheSportsDB, API-Football (via RapidAPI), football-data.org
- For each API, document:
  - Free tier limits (requests/day, rate limits)
  - Available data fields
  - Image/logo availability and quality
  - Authentication method
  - Response format and ease of use
- Recommend the best combination for our use case
- Provide sample API responses

Acceptance criteria:
- [ ] At least 3 APIs compared
- [ ] Sample TypeScript types defined for team and player data
- [ ] Recommendation with justification
- [ ] Fallback strategy for offline/mock data documented
```

> **TR:** Ucretsiz futbol API'lerini arastir. Takim logolari, oyuncu isimleri, istatistikler (bitiricilik vb.) cekilebiliyor mu? TheSportsDB, API-Football, football-data.org karsilastir. Oneri ve fallback stratejisi sun.

---

#### Issue YG-2

| Field | Value |
|---|---|
| **Title** | `Initialize Expo project with TypeScript and core dependencies` |
| **Priority** | `high` |
| **Assignee** | `Developer` |
| **Project** | `Football Mini Games` |

**Description:**

```
Set up the project from scratch with all required dependencies and folder structure.

Steps:
1. Create Expo project: npx create-expo-app yg-football --template blank-typescript
2. Install dependencies:
   - expo-router (navigation)
   - zustand (state management)
   - react-native-reanimated (animations)
   - react-native-gesture-handler (gestures)
   - expo-image (optimized images)
   - axios (API calls)
3. Set up folder structure:
   src/
   ├── screens/          # Screen components
   ├── components/       # Reusable UI components
   │   ├── common/       # Buttons, cards, etc.
   │   └── game/         # Game-specific components
   ├── hooks/            # Custom hooks
   ├── services/         # API services
   ├── stores/           # Zustand stores
   ├── types/            # TypeScript interfaces
   ├── constants/        # Colors, dimensions, config
   ├── utils/            # Helper functions
   └── assets/           # Images, fonts
4. Configure TypeScript strict mode in tsconfig.json
5. Create basic app entry with expo-router layout
6. Verify the app runs: npx expo start

Acceptance criteria:
- [ ] Project builds without errors
- [ ] All dependencies installed
- [ ] Folder structure created
- [ ] TypeScript strict mode enabled
- [ ] Basic navigation skeleton working
- [ ] App runs on Expo Go
```

> **TR:** Expo projesini sifirdan kur. Bagimliliklari yukle, klasor yapisini olustur, TypeScript strict mode ac, temel navigation kur, uygulamanin calistigini dogrula.

---

#### Issue YG-3

| Field | Value |
|---|---|
| **Title** | `Build football data service layer with types and mock data` |
| **Priority** | `high` |
| **Assignee** | `Developer` |
| **Project** | `Football Mini Games` |

**Description:**

```
Create the data layer that fetches and serves football data throughout the app.

Requirements:
1. Define TypeScript interfaces in src/types/football.ts:
   - League { id, name, country, logo }
   - Team { id, name, shortName, logo, leagueId, primaryColor, secondaryColor }
   - Player { id, name, position, number, teamId, stats: { finishing, pace, overall } }
   - MatchEvent { minute, type: 'goal' | 'red_card', playerId, teamId }

2. Create API service in src/services/footballApi.ts:
   - getLeagues(): Promise<League[]>
   - getTeamsByLeague(leagueId): Promise<Team[]>
   - getPlayersByTeam(teamId): Promise<Player[]>
   - Axios instance with base URL, error handling, response mapping

3. Create mock data in src/services/mockData.ts:
   - At least 5 leagues (Premier League, La Liga, Serie A, Bundesliga, Super Lig)
   - At least 5 teams per league with real names and colors
   - At least 15 players per team with realistic stats
   - This serves as offline fallback

4. Create data hook in src/hooks/useFootballData.ts:
   - Try API first, fall back to mock data on failure
   - Cache responses with zustand store
   - Loading and error states

Acceptance criteria:
- [ ] All TypeScript types defined and exported
- [ ] API service with error handling
- [ ] Comprehensive mock data (offline works fully)
- [ ] useFootballData hook with caching
- [ ] Zero TypeScript errors
```

> **TR:** Futbol veri katmanini olustur. TypeScript tipleri tanimla (League, Team, Player, MatchEvent). API servisi yaz. Offline fallback icin mock data olustur (en az 5 lig, 5'er takim, 15'er oyuncu). zustand ile cache'le.

---

### Phase 2: Design / Faz 2: Tasarim

---

#### Issue YG-4

| Field | Value |
|---|---|
| **Title** | `Design the Main Menu screen` |
| **Priority** | `high` |
| **Assignee** | `Designer` |
| **Project** | `Football Mini Games` |

**Description:**

```
Design the main menu — the first screen users see when opening the app.

Requirements:
- App logo/title area at top ("YG Football" or similar branding)
- Primary CTA button: "Start Match" (large, prominent)
- Secondary options: "Game Modes", "Settings"
- Background: Dark theme with subtle football-themed pattern or gradient
- Animated element: A football/soccer ball subtle animation (bouncing or spinning)
- Bottom: Version number, small YG Games credit

Design deliverables:
- Full component hierarchy with prop types
- Color hex values for every element
- Font sizes and weights
- Spacing values (8pt grid)
- Button states: default, pressed, disabled
- Screen layout using flexbox (justify, align, gap values)

Visual style:
- Primary color: #1A1A2E (dark navy)
- Accent color: #E94560 (vibrant red)
- Secondary accent: #16213E (deep blue)
- Text: #FFFFFF (white) and #A0A0B0 (muted)
- Buttons: Rounded (borderRadius: 16), bold text, shadow
```

> **TR:** Ana Menu ekranini tasarla. Logo, "Start Match" butonu, ayarlar. Koyu futbol temasi. Component hiyerarsisi, renkler, fontlar, spacing detayli.

---

#### Issue YG-5

| Field | Value |
|---|---|
| **Title** | `Design the Team Selection screen` |
| **Priority** | `high` |
| **Assignee** | `Designer` |
| **Project** | `Football Mini Games` |

**Description:**

```
Design the team selection screen where users pick two teams to compete.

Requirements:
- League filter bar at top (horizontal scrollable pills/tabs)
- Team grid below (3 columns, team logo + short name)
- Two selection slots at bottom: "Home Team" (left) and "Away Team" (right)
  - Empty state: dashed border placeholder "Select team"
  - Filled state: team logo + name with X to deselect
- "Continue" button (enabled only when both teams selected)
- Visual feedback: selected team highlighted in grid with checkmark overlay
- Search bar (optional, above grid) for filtering teams by name

States to design:
- No team selected
- One team selected (home)
- Both teams selected (ready to continue)
- Loading state (skeleton grid)
- Empty search results

Design deliverables:
- Component tree with all sub-components
- Grid item component spec (logo size, text truncation, selection overlay)
- Bottom selection bar spec (fixed position, blur background)
- League pill component spec (active/inactive states)
- All colors, sizes, spacing values
```

> **TR:** Takim secim ekrani. Ustte lig filtresi, ortada takim grid'i (3 sutun, logo + isim), altta 2 secim slotu (Home/Away). Iki takim secilince "Continue" aktif olur.

---

#### Issue YG-6

| Field | Value |
|---|---|
| **Title** | `Design the Game Mode Selection screen` |
| **Priority** | `high` |
| **Assignee** | `Designer` |
| **Project** | `Football Mini Games` |

**Description:**

```
Design the game mode selection screen shown after both teams are selected.

Requirements:
- Header: "vs" display with both team logos and names
- Mode cards (vertical list or 2-column grid):
  - Plinko Mode: Icon + title + short description ("Drop balls through pegs into goals")
  - Arena Mode: Icon + title + short description ("Bounce inside a circle arena")
  - More modes: "Coming Soon" locked cards with lock icon overlay
- Each card: thumbnail/icon area, title, 1-line description, play button
- Selected teams persist in header throughout

Card states:
- Available: Full color, tappable
- Coming Soon: Greyed out, lock icon, "Coming Soon" badge
- Selected/Pressed: Scale animation, border highlight

Design deliverables:
- Full component spec for ModeCard
- Header "vs" component spec
- Layout and spacing for card grid
- Lock overlay design for unavailable modes
- Transition animation suggestion to game screen
```

> **TR:** Oyun modu secim ekrani. Ustte secilen 2 takim "vs" gosterimi. Mod kartlari: Plinko, Arena (aktif) + "Coming Soon" kilitli kartlar.

---

#### Issue YG-7

| Field | Value |
|---|---|
| **Title** | `Design the Post-Match Summary screen` |
| **Priority** | `high` |
| **Assignee** | `Designer` |
| **Project** | `Football Mini Games` |

**Description:**

```
Design the post-match summary screen shown after a game ends.

Requirements:
- Top section: Final score (large) with team logos on each side
  - Winning team side subtly highlighted (glow or larger scale)
  - Draw state handled
- Match events timeline (scrollable, chronological):
  - Goal events: ⚽ [minute]' [Player Name] (team color indicator)
  - Red card events: 🟥 [minute]' [Player Name] (team color indicator)
  - Events grouped by half if applicable (1st half / 2nd half divider)
- Stats section (optional expandable):
  - Goals, Red Cards, Possession %, Shots count
- MVP Player highlight (top scorer or best performer)
- Bottom action buttons:
  - "Rematch" (same teams, same mode)
  - "Change Teams" (back to team selection)
  - "Main Menu" (back to home)
- Subtle confetti or celebration animation for the winning team

Design deliverables:
- Score header component spec
- Event timeline item component (goal variant, red card variant)
- Stats comparison bar component
- MVP card component
- Button group layout
- All colors, typography, spacing
```

> **TR:** Mac sonu ozet ekrani. Ustte buyuk skor + takim logolari. Ortada dakika bazli olay timeline'i (goller, kirmizi kartlar). MVP oyuncu karti. Altta "Rematch", "Change Teams", "Main Menu" butonlari.

---

#### Issue YG-8

| Field | Value |
|---|---|
| **Title** | `Design the Plinko game screen` |
| **Priority** | `medium` |
| **Assignee** | `Designer` |
| **Project** | `Football Mini Games` |

**Description:**

```
Design the Plinko game mode screen.

Game concept: Balls drop from the top through a Plinko peg board. At the bottom, there are goal zones for each team. When a ball lands in a team's goal zone, that team scores.

Layout:
- Top bar: Score display (Team A [logo] score - score [logo] Team B), match timer
- Drop zone: Top area where balls are released (alternating team colors)
- Peg board: Grid of circular pegs (dots) that balls bounce off
- Goal zones: Bottom divided into colored sections — left team's goal, neutral zones, right team's goal
- Event toast: Brief popup when goal scored ("⚽ GOAL! 23' Haaland")
- Red card popup: Random event overlay ("🟥 Red Card! 45' Player Name removed")

Visual elements:
- Balls colored in team primary colors
- Pegs: Metallic/neutral color with subtle shadow
- Goal zones: Team colors with goal net pattern
- Background: Stadium-themed gradient
- Score update: Number scale animation on goal

Design deliverables:
- Game area component spec (peg layout grid dimensions)
- Ball component (size, team color mapping)
- Score bar component
- Event toast component (goal and red card variants)
- Goal zone component with team colors
- Timer display component
```

> **TR:** Plinko oyun ekrani. Toplar yukaridan duser, civilere carparak asagiya iner. Altta takim kale bolgeleri var. Gol oldugunda skor artar, toast bildirim cikar. Kirmizi kart rastgele popup olarak gelir.

---

#### Issue YG-9

| Field | Value |
|---|---|
| **Title** | `Design the Arena game screen` |
| **Priority** | `medium` |
| **Assignee** | `Designer` |
| **Project** | `Football Mini Games` |

**Description:**

```
Design the circular Arena game mode screen.

Game concept: A circular arena where team balls bounce around. The circle boundary bounces balls inward. A goal attached to the circle rotates around the perimeter. When a ball enters the goal, that team scores.

Layout:
- Top bar: Score display + match timer (same style as Plinko)
- Center: Large circular arena (fills most of the screen)
  - Circle border: Glowing ring (team-neutral color)
  - Team balls: Multiple small balls in team colors bouncing inside
  - Rotating goal: A gap/opening in the circle that rotates, colored alternately for each team
  - Goal indicator: Visual cue showing which team's goal it currently is
- Event toast: Same as Plinko (goal scored, red card)
- Red card effect: One ball from the affected team disappears (team loses a "player")

Visual elements:
- Arena circle: Neon glow border on dark background
- Balls: Team colored with trail effect (motion blur)
- Goal opening: Highlighted with pulsing animation
- Collision effect: Small particle burst when balls hit the wall
- Background: Dark with subtle radial gradient from arena center

Design deliverables:
- Arena circle component spec (radius relative to screen width)
- Ball component (size, trail effect, team color)
- Rotating goal component (size, rotation speed, color alternation)
- Collision particle effect spec
- Score bar (reused from Plinko with same component)
- Event toast (reused from Plinko)
```

> **TR:** Arena oyun ekrani. Cember seklinde arena, icinde takim toplari zipliyor. Cemberin cevresinde donen bir kale var. Top kaleye girince gol olur. Kirmizi kart gelince takimdan bir top (oyuncu) kaybolur.

---

### Phase 3: Development / Faz 3: Gelistirme

*(Create these issues now with status `backlog`, move to `todo` after Phase 2 completes)*

---

#### Issue YG-10

| Field | Value |
|---|---|
| **Title** | `Implement Main Menu and navigation skeleton` |
| **Priority** | `high` |
| **Assignee** | `Developer` |
| **Project** | `Football Mini Games` |
| **Status** | `backlog` |

**Description:**

```
Implement the Main Menu screen based on Designer's spec (see YG-4).

Requirements:
- Set up expo-router navigation with all screen routes:
  - / (index) — Main Menu
  - /team-select — Team Selection
  - /mode-select — Mode Selection
  - /game/plinko — Plinko Game
  - /game/arena — Arena Game
  - /match-summary — Post-Match Summary
- Implement Main Menu screen with all visual elements from design spec
- Include basic screen transitions (fade or slide)
- App icon and splash screen placeholder

Acceptance criteria:
- [ ] All routes defined and navigable
- [ ] Main Menu matches design spec
- [ ] Navigation transitions smooth
- [ ] No TypeScript errors
```

> **TR:** Ana Menu ekranini ve navigation iskeletini kodla. expo-router ile tum sayfa route'larini tanimla.

---

#### Issue YG-11

| Field | Value |
|---|---|
| **Title** | `Implement Team Selection screen with league filter and dual team picking` |
| **Priority** | `high` |
| **Assignee** | `Developer` |
| **Project** | `Football Mini Games` |
| **Status** | `backlog` |

**Description:**

```
Implement Team Selection screen based on Designer's spec (see YG-5).

Requirements:
- Fetch teams via useFootballData hook
- Render horizontal league filter pills
- Team grid with logos (3 columns, FlatList for performance)
- Bottom dual-selection bar: Home Team (left) + Away Team (right)
- Store selected teams in zustand match store
- Validate both teams selected before enabling Continue button
- Prevent selecting the same team twice
- Search/filter functionality (optional)

Acceptance criteria:
- [ ] League filter works correctly
- [ ] Teams display with logos from API/mock data
- [ ] Dual selection works (home + away)
- [ ] Same team can't be selected twice
- [ ] Continue button only enabled when both selected
- [ ] Selected teams stored in zustand for next screens
```

> **TR:** Takim secim ekranini kodla. API/mock'tan takim verisi cek, lig filtresi, grid gorunumu, cift takim secimi, zustand'a kaydet.

---

#### Issue YG-12

| Field | Value |
|---|---|
| **Title** | `Implement Game Mode Selection screen` |
| **Priority** | `medium` |
| **Assignee** | `Developer` |
| **Project** | `Football Mini Games` |
| **Status** | `backlog` |

**Description:**

```
Implement Game Mode Selection based on Designer's spec (see YG-6).

Requirements:
- Show selected teams in VS header (read from zustand)
- Render mode cards: Plinko (active), Arena (active), rest (Coming Soon locked)
- Navigate to /game/[mode] on selection
- "Coming Soon" cards are not tappable, show lock overlay
- Smooth card press animation (scale down on press)

Acceptance criteria:
- [ ] VS header shows correct teams
- [ ] Active modes navigable
- [ ] Locked modes show "Coming Soon"
- [ ] Navigation passes selected mode to game screen
```

> **TR:** Oyun modu secim ekranini kodla. VS header'da takimlari goster, aktif/kilitli mod kartlarini render et.

---

#### Issue YG-13

| Field | Value |
|---|---|
| **Title** | `Build Plinko game engine with physics, scoring, and match events` |
| **Priority** | `high` |
| **Assignee** | `Developer` |
| **Project** | `Football Mini Games` |
| **Status** | `backlog` |

**Description:**

```
Build the complete Plinko game mode.

Requirements:
1. Physics engine (custom or react-native-reanimated based):
   - Ball spawning at random x-positions at top
   - Gravity simulation (balls fall down)
   - Peg collision (balls bounce off circular pegs realistically)
   - Goal zone detection at bottom

2. Game logic:
   - Alternating team ball drops
   - Score tracking per team
   - Match timer (90 "match minutes" mapped to ~60 real seconds)
   - Goal event recording (minute, team, random player from team weighted by finishing stat)

3. Random events:
   - Red card: ~5% chance per 15 match-minutes, removes one ball from affected team
   - Record red card event (minute, player)

4. Match flow:
   - Start → balls drop continuously → timer counts → whistle → navigate to match summary
   - Pass all match events to summary screen via zustand or navigation params

Acceptance criteria:
- [ ] Balls drop and bounce realistically off pegs
- [ ] Goals detected when balls enter goal zones
- [ ] Score updates with animation
- [ ] Event toasts appear for goals and red cards
- [ ] Timer runs 90 match-minutes
- [ ] All events collected for post-match summary
- [ ] Player assignment weighted by finishing stat
```

> **TR:** Plinko oyun motorunu olustur. Fizik (yercekimi, civi carpismasi), skor takibi, 90 dakikalik mac simulasyonu, gol olaylari (bitiricilik oranina gore oyuncu atamasi), rastgele kirmizi kartlar.

---

#### Issue YG-14

| Field | Value |
|---|---|
| **Title** | `Build Arena game engine with circular physics and rotating goal` |
| **Priority** | `high` |
| **Assignee** | `Developer` |
| **Project** | `Football Mini Games` |
| **Status** | `backlog` |

**Description:**

```
Build the complete Arena game mode.

Requirements:
1. Circular physics:
   - Balls confined inside a circle (bounce off inner wall)
   - Realistic collision between balls (elastic)
   - Circle boundary reflection physics
   - Damping to prevent infinite speed

2. Rotating goal:
   - A gap/opening in the circle wall that rotates at constant speed
   - Goal alternates ownership: first 5 seconds = Team A's goal, next 5 = Team B's, etc.
   - Visual indicator of current goal owner (team color)
   - Ball entering goal = score for opposing team

3. Game logic (same as Plinko):
   - 90 match-minutes mapped to ~60 real seconds
   - Goal events with player assignment (weighted by finishing)
   - Red card: ~5% chance per 15 min, one ball of affected team disappears
   - All events collected for match summary

4. Visual effects:
   - Ball trail effect (last 3-5 positions with opacity fade)
   - Wall bounce particle effect
   - Goal celebration flash

Acceptance criteria:
- [ ] Balls bounce inside circle realistically
- [ ] Rotating goal works with team alternation
- [ ] Scoring and event system works
- [ ] Red cards remove balls visually
- [ ] Smooth 60fps performance
- [ ] Events passed to match summary
```

> **TR:** Arena oyun motorunu olustur. Cember ici fizik (duvar ziplaması, top-top carpmasi), donen kale (sahiplik donusumlu), gol/kirmizi kart olaylari.

---

#### Issue YG-15

| Field | Value |
|---|---|
| **Title** | `Build match simulation engine and post-match summary screen` |
| **Priority** | `high` |
| **Assignee** | `Developer` |
| **Project** | `Football Mini Games` |
| **Status** | `backlog` |

**Description:**

```
Build the shared match simulation logic and post-match summary screen.

Match simulation (src/hooks/useMatchSimulation.ts):
- Shared between all game modes
- Accepts: two teams with full player rosters
- Generates: minute-by-minute match events
- Player-goal assignment: weighted random based on player finishing stat
  - Higher finishing = higher probability of being credited with goal
  - Goalkeepers rarely score (very low weight)
  - Forwards > Midfielders > Defenders for goal credit
- Red card player selection: random from team roster
- Track removed players (red-carded players can't score after)

Post-match summary screen (src/screens/MatchSummary.tsx):
- Based on Designer's spec (see YG-7)
- Receives match events from game screen
- Displays: final score, chronological event timeline, MVP
- MVP calculation: most goals scored, or if tied, player with most events
- Action buttons: Rematch, Change Teams, Main Menu

Acceptance criteria:
- [ ] Player-goal assignment respects finishing stat distribution
- [ ] Red-carded players excluded from future events
- [ ] Timeline displays all events chronologically with correct minute
- [ ] MVP correctly calculated
- [ ] All three navigation buttons work
- [ ] Handles edge cases: 0-0 draw, all events are red cards
```

> **TR:** Paylasilan mac simulasyon motoru ve mac sonu ekrani. Gol atan oyuncu secimi bitiricilik oranina gore agirlikli rastgele. Kirmizi kart alan oyuncu artik gol atamaz. MVP hesaplanir.

---

### Phase 4: Testing / Faz 4: Test

---

#### Issue YG-16

| Field | Value |
|---|---|
| **Title** | `Test football data service, API integration, and offline fallback` |
| **Priority** | `medium` |
| **Assignee** | `Tester` |
| **Project** | `Football Mini Games` |
| **Status** | `backlog` |

**Description:**

```
Write tests for src/services/footballApi.ts and src/hooks/useFootballData.ts.

Test cases:
- API calls return correct data types matching TypeScript interfaces
- Error handling works (network failure, invalid response)
- Offline fallback serves complete mock data
- Zustand cache prevents unnecessary re-fetches
- Mock data has minimum required entries (5 leagues, 5 teams/league, 15 players/team)
- All player stats are within valid ranges (0-100)

Run: npx tsc --noEmit to ensure zero type errors across all service files.

Acceptance criteria:
- [ ] All test cases passing
- [ ] Zero TypeScript errors
- [ ] Coverage report generated
```

> **TR:** Futbol veri servisi testleri. API cagrilari, hata yonetimi, offline fallback, zustand cache dogrulamasi.

---

#### Issue YG-17

| Field | Value |
|---|---|
| **Title** | `Test game engines: Plinko physics, Arena physics, and match simulation` |
| **Priority** | `medium` |
| **Assignee** | `Tester` |
| **Project** | `Football Mini Games` |
| **Status** | `backlog` |

**Description:**

```
Test all game logic and physics systems.

Test cases:
- Plinko: Ball-peg collision produces realistic bounce angles
- Plinko: Balls eventually reach goal zones (no stuck balls)
- Arena: Circle boundary reflection keeps balls inside
- Arena: Ball-ball collision is elastic and conserves momentum
- Arena: Rotating goal correctly alternates team ownership
- Match simulation: Goal events generated with correct minute values (1-90)
- Match simulation: Player-goal assignment distribution matches finishing stats (run 1000 simulations)
- Match simulation: Red card probability is ~5% per 15 minutes (statistical test)
- Match simulation: Red-carded players never credited with goals after removal
- Match simulation: MVP calculation handles ties and edge cases

Run statistical tests where appropriate (chi-squared for distribution tests).

Acceptance criteria:
- [ ] All physics tests passing
- [ ] Statistical distribution tests within acceptable range
- [ ] Edge cases covered (0-0 draw, many red cards, all balls removed)
- [ ] Zero TypeScript errors
```

> **TR:** Oyun motoru testleri. Plinko fizik, Arena fizik, mac simulasyonu istatistiksel dogrulama (1000 simulasyon uzerinden dagılım testi).

---

#### Issue YG-18

| Field | Value |
|---|---|
| **Title** | `Test UI screens, navigation flow, and full integration` |
| **Priority** | `high` |
| **Assignee** | `Tester` |
| **Project** | `Football Mini Games` |
| **Status** | `backlog` |

**Description:**

```
Test the complete user flow end-to-end.

Test flows:
1. Main Menu → Team Selection → select 2 teams → Mode Selection → Plinko → Match Summary → Main Menu
2. Main Menu → Team Selection → select 2 teams → Mode Selection → Arena → Match Summary → Rematch
3. Main Menu → Team Selection → select 2 teams → Mode Selection → Arena → Match Summary → Change Teams
4. Edge cases: back button at every screen, rapid taps, same team selected twice (should prevent)

UI tests:
- All screens render without crashes
- Loading states display correctly
- Empty states handled (no teams found, no leagues)
- Button disabled states work correctly
- Selected teams persist across Team Selection → Mode Selection → Game → Summary
- Match events display correctly in summary timeline

Run full TypeScript check: npx tsc --noEmit

Acceptance criteria:
- [ ] All navigation flows work correctly
- [ ] No crashes or unhandled errors
- [ ] State persists correctly across screens
- [ ] Edge cases handled gracefully
- [ ] Full TypeScript check passes
```

> **TR:** Tam UI ve entegrasyon testi. Tum ekran akislari, state tutarliligi, edge case'ler, TypeScript kontrolu.

---

## Step 6: Budget Settings / Adim 6: Butce Ayarlari

**Company Settings:**

| Field | Value |
|---|---|
| **Company Budget** | `2000` *(cents = $20/month)* |

**Per-Agent Budgets** *(Agent Detail → Configuration):*

| Agent | Budget (cents) | Reason |
|---|---|---|
| Chief | `400` ($4) | Management tasks, low token usage |
| Creative | `200` ($2) | Idea generation only |
| Designer | `400` ($4) | Design specs |
| Developer | `700` ($7) | Most active agent, writes code |
| Tester | `300` ($3) | Testing and reports |

> **TR:** Pro abonelikle basladiginda bu limitler dogrudan devreye girmez. API key'e gecersen koruma saglar. Yine de ayarla, aliskanlik olsun.

---

## Step 7: Approval Settings / Adim 7: Onay Ayarlari

**Company Settings:**

| Field | Value |
|---|---|
| **requireBoardApprovalForNewAgents** | `true` |

> **TR:** Bir ajan kendi basina yeni ajan olusturmaya kalkarsa senin onayin gerekir.

---

## Step 8: Launch Checklist / Adim 8: Baslatma Kontrol Listesi

```
[ ] pnpm dev is running, localhost:3100 is accessible
[ ] YG Games company created with mission goal
[ ] 5 agents created: Chief, Creative, Designer, Developer, Tester
[ ] Org chart verified (all agents report to Chief)
[ ] API keys generated for each agent
[ ] Heartbeats enabled for all agents
[ ] Football Mini Games project created (status: active)
[ ] Phase 1 issues created (YG-1, YG-2, YG-3) with status: todo
[ ] Phase 2-4 issues created with status: backlog
[ ] Company budget set to $20/month
[ ] Agent budgets configured
[ ] requireBoardApprovalForNewAgents = true
```

---

## Workflow Summary / Is Akisi Ozeti

```
You → Create issue for Chief (CEO)
        │
        ▼
👔 Chief: Analyzes task, breaks it down
        │
        ├─→ 🎨 Designer: Creates UI/UX spec
        │        ✅ Design ready
        │
        ├─→ 💻 Developer: Implements code
        │        ✅ Code ready
        │
        ├─→ 🧪 Tester: Writes and runs tests
        │        ✅ Tests pass / ❌ Bug report
        │
        ▼
👔 Chief: Reviews final result
        ├─ Approved → Reports to you ✅
        └─ Needs work → Creates revision issue 🔄
```

---

## Football API Reference / Futbol API Referansi

| API | Free Tier | Data |
|---|---|---|
| **TheSportsDB** | Unlimited (Patreon supporters) | Team logos, player names, leagues |
| **API-Football** (RapidAPI) | 100 requests/day | Detailed stats, finishing ratings |
| **football-data.org** | 10 requests/min | Leagues, teams, players |

> **TR:** Baslangic icin TheSportsDB (ucretsiz, logo ve oyuncu verileri) + API-Football (istatistikler) kombinasyonu mantikli.
