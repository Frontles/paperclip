# Post-Match Summary — Screen Design Spec

> **GDD Reference:** Section 3.5
> **Route:** `/post-match`
> **Status:** Design Complete

---

## 1. Screen Layout (ASCII Wireframe)

```
┌──────────────────────────────────┐
│          MATCH RESULT            │  ← Header
├──────────────────────────────────┤
│                                  │
│  ┌──────┐          ┌──────┐     │
│  │  MC  │  3 - 1   │  AR  │     │  ← Score Display
│  │ Man  │          │ Ars  │     │
│  └──────┘          └──────┘     │
│           WIN                    │  ← Result text
│                                  │
├──────────────────────────────────┤
│       MATCH EVENTS               │
│                                  │
│  ⚽ 12'  Haaland (Man City)     │  ← Events Timeline
│  ⚽ 23'  Salah (Arsenal)        │
│  🟥 34'  Ramos (Arsenal)       │
│  ⚽ 56'  Mbappé (Man City)     │
│  ⚽ 78'  Haaland (Man City)    │
│                                  │
├──────────────────────────────────┤
│      ★ MAN OF THE MATCH ★       │
│  ┌─────────────────────────┐     │
│  │      Erling Haaland     │     │  ← MOTM Card
│  │      ⚽⚽ 2 Goals        │     │
│  │   OVR 91 | FIN 95 | PAC 89│  │
│  └─────────────────────────┘     │
│                                  │
├──────────────────────────────────┤
│ [REMATCH] [CHANGE TEAMS] [HOME] │  ← Action Buttons
└──────────────────────────────────┘
```

---

## 2. Component Hierarchy

```
PostMatchSummaryScreen
├── SafeAreaView (flex: 1, bg: background)
│   └── ScrollView
│       ├── ScoreSection
│       │   ├── TeamColumn (Home)
│       │   │   ├── TeamBadge (56×56 initials circle)
│       │   │   └── TeamName
│       │   ├── ScoreColumn
│       │   │   ├── ScoreText ("3 - 1")
│       │   │   └── ResultBadge ("WIN" / "DRAW")
│       │   └── TeamColumn (Away)
│       │       ├── TeamBadge (56×56 initials circle)
│       │       └── TeamName
│       │
│       ├── EventsSection
│       │   ├── SectionTitle ("MATCH EVENTS")
│       │   └── EventsList (ScrollView or FlatList)
│       │       └── EventRow (repeated)
│       │           ├── EventIcon (⚽ or 🟥)
│       │           ├── EventMinute ("23'")
│       │           └── EventDescription ("PlayerName (TeamName)")
│       │
│       ├── MOTMSection
│       │   ├── SectionTitle ("MAN OF THE MATCH")
│       │   └── MOTMCard
│       │       ├── PlayerName
│       │       ├── GoalsText ("⚽⚽ 2 Goals")
│       │       ├── StatsRow
│       │       │   ├── StatBadge ("OVR 91")
│       │       │   ├── StatBadge ("FIN 95")
│       │       │   └── StatBadge ("PAC 89")
│       │       └── TeamBadge (small, corner)
│       │
│       └── ActionButtons
│           ├── ActionButton ("REMATCH")
│           ├── ActionButton ("CHANGE TEAMS")
│           └── ActionButton ("HOME")
```

---

## 3. Component Specifications

### 3.1 ScoreSection

| Property           | Value                              |
|--------------------|------------------------------------|
| `flexDirection`    | `row`                              |
| `alignItems`       | `center`                           |
| `justifyContent`   | `center`                           |
| `paddingVertical`  | `Spacing.xl (32)`                  |
| `paddingHorizontal`| `Spacing.md (16)`                  |
| `backgroundColor`  | `#1a472a` (Colors.surface)         |
| `borderBottomWidth`| `1`                                |
| `borderBottomColor`| `#2d6a4f` (Colors.border)          |

#### TeamColumn

| Property     | Value                              |
|--------------|------------------------------------|
| `alignItems` | `center`                           |
| `flex`       | `1`                                |
| `gap`        | `Spacing.sm (8)`                   |

**TeamBadge:**

| Property        | Value                              |
|-----------------|------------------------------------|
| Size            | `56 × 56`                          |
| `borderRadius`  | `28` (circle)                      |
| `backgroundColor`| Team color or `#2d6a4f` fallback  |
| Border          | `2px` — `#FFC72C` (home), `#E63946` (away) |

**Initials:** `20px`, weight `700`, `#FFFFFF`

**TeamName:**

| Property     | Value                              |
|--------------|------------------------------------|
| Font size    | `14` (Typography.caption)          |
| Font weight  | `400`                              |
| Color        | `#A8DABC` (Colors.textSecondary)   |
| `numberOfLines`| `1`                              |

#### ScoreColumn

| Property     | Value                              |
|--------------|------------------------------------|
| `alignItems` | `center`                           |
| `gap`        | `Spacing.sm (8)`                   |
| `paddingHorizontal`| `Spacing.lg (24)`             |

**ScoreText:**

| Property     | Value                              |
|--------------|------------------------------------|
| Font size    | `48` (Typography.scoreDisplay)     |
| Font weight  | `900`                              |
| Color        | `#FFFFFF` (Colors.textPrimary)     |
| Format       | `"{homeScore} - {awayScore}"`      |

**ResultBadge:**

| Property           | Value                              |
|--------------------|------------------------------------|
| `paddingHorizontal`| `Spacing.md (16)`                  |
| `paddingVertical`  | `Spacing.xs (4)`                   |
| `borderRadius`     | `8`                                |

**Result States:**

| Result  | Background          | Text color | Text    |
|---------|---------------------|------------|---------|
| Win     | `rgba(125,206,160,0.2)` | `#7dcea0` | "WIN"  |
| Draw    | `rgba(107,144,128,0.2)` | `#6B9080` | "DRAW" |

**ResultBadge Text:** `fontSize: 16`, `fontWeight: 700`, `letterSpacing: 2`

**i18n:**

| Key                    | EN    | TR        | DE              | FR        |
|------------------------|-------|-----------|-----------------|-----------|
| `postMatch.win`        | WIN   | GALİBİYET | SIEG            | VICTOIRE  |
| `postMatch.draw`       | DRAW  | BERABERE  | UNENTSCHIEDEN   | MATCH NUL |

---

### 3.2 EventsSection

| Property           | Value                              |
|--------------------|------------------------------------|
| `paddingVertical`  | `Spacing.lg (24)`                  |
| `paddingHorizontal`| `Spacing.md (16)`                  |

#### SectionTitle

| Property     | Value                              |
|--------------|------------------------------------|
| Font size    | `14` (Typography.caption)          |
| Font weight  | `600`                              |
| Color        | `#6B9080` (Colors.textMuted)       |
| Letter spacing| `2`                               |
| Text transform| `uppercase`                       |
| `marginBottom`| `Spacing.md (16)`                 |

**i18n:**

| Key                        | EN            | TR               | DE               | FR                 |
|----------------------------|---------------|------------------|------------------|--------------------|
| `postMatch.matchEvents`    | MATCH EVENTS  | MAÇ OLAYLARI     | SPIELEREIGNISSE  | ÉVÉNEMENTS DU MATCH |

#### EventRow

| Property           | Value                              |
|--------------------|------------------------------------|
| `flexDirection`    | `row`                              |
| `alignItems`       | `center`                           |
| `paddingVertical`  | `Spacing.sm (8)`                   |
| `borderBottomWidth`| `StyleSheet.hairlineWidth`         |
| `borderBottomColor`| `rgba(45,106,79,0.3)`              |
| `gap`              | `Spacing.sm (8)`                   |

**EventIcon:**

| Event type | Icon | Color                  |
|-----------|------|------------------------|
| Goal      | `⚽` | `#FFD700` (goalGold)   |
| Red Card  | `🟥` | `#E63946` (redCard)    |

| Property     | Value                              |
|--------------|------------------------------------|
| Font size    | `20`                               |

**EventMinute:**

| Property     | Value                              |
|--------------|------------------------------------|
| Font size    | `14` (Typography.caption)          |
| Font weight  | `600`                              |
| Color        | `#A8DABC` (Colors.textSecondary)   |
| `minWidth`   | `36` (for alignment)               |

**EventDescription:**

| Property     | Value                              |
|--------------|------------------------------------|
| Font size    | `16` (Typography.body)             |
| Font weight  | `400`                              |
| Color        | `#FFFFFF` (Colors.textPrimary)     |
| Format       | `"PlayerName (TeamShortName)"`     |

**Empty State (0-0 match, no events):**

| Property     | Value                              |
|--------------|------------------------------------|
| Text         | i18n: `postMatch.noEvents`         |
| Font size    | `14` (Typography.caption)          |
| Color        | `#6B9080` (Colors.textMuted)       |
| `textAlign`  | `center`                           |
| `paddingVertical`| `Spacing.lg (24)`              |

| Key                      | EN              | TR               | DE                  | FR                    |
|--------------------------|-----------------|------------------|---------------------|-----------------------|
| `postMatch.noEvents`     | No events       | Olay yok         | Keine Ereignisse    | Aucun événement       |

**Scrollable:** If > 6 events, section becomes scrollable with `maxHeight: 240`.

---

### 3.3 MOTMSection

| Property           | Value                              |
|--------------------|------------------------------------|
| `paddingVertical`  | `Spacing.lg (24)`                  |
| `paddingHorizontal`| `Spacing.md (16)`                  |
| `alignItems`       | `center`                           |

#### SectionTitle

Same style as Events SectionTitle.

**i18n:**

| Key                       | EN               | TR                  | DE                    | FR                      |
|---------------------------|------------------|---------------------|-----------------------|-------------------------|
| `postMatch.motmTitle`     | MAN OF THE MATCH | MAÇIN YILDIZI       | SPIELER DES SPIELS    | HOMME DU MATCH          |

#### MOTMCard

| Property             | Value                               |
|----------------------|-------------------------------------|
| `width`              | `100%`                              |
| `maxWidth`           | `320`                               |
| `backgroundColor`    | `#1a472a` (Colors.surface)          |
| `borderRadius`       | `16`                                |
| `borderWidth`        | `2`                                 |
| `borderColor`        | `#FFD700` (Colors.goalGold)         |
| `padding`            | `Spacing.lg (24)`                   |
| `alignItems`         | `center`                            |
| `gap`                | `Spacing.sm (8)`                    |
| Shadow (iOS)         | `shadowColor: #FFD700, shadowOffset: {0, 4}, shadowOpacity: 0.2, shadowRadius: 12` |
| Shadow (Android)     | `elevation: 4`                      |

**Gold Glow Effect:**
- Subtle gold gradient overlay at top: `LinearGradient` from `rgba(255,215,0,0.1)` to `transparent`
- Height: `60px`, position: absolute top

**PlayerName:**

| Property     | Value                              |
|--------------|------------------------------------|
| Font size    | `24` (Typography.heading2)         |
| Font weight  | `700`                              |
| Color        | `#FFFFFF` (Colors.textPrimary)     |
| `textAlign`  | `center`                           |

**GoalsText:**

| Property     | Value                              |
|--------------|------------------------------------|
| Font size    | `16` (Typography.bodyBold)         |
| Font weight  | `600`                              |
| Color        | `#FFD700` (Colors.goalGold)        |
| Format       | `"⚽×{count} {count} Goals"` or `"⚽ 1 Goal"` |

**i18n:**

| Key                       | EN          | TR         | DE         | FR         |
|---------------------------|-------------|------------|------------|------------|
| `postMatch.goals`         | {count} Goals | {count} Gol | {count} Tore | {count} Buts |
| `postMatch.goal`          | 1 Goal      | 1 Gol      | 1 Tor      | 1 But      |

#### StatsRow

| Property           | Value                              |
|--------------------|------------------------------------|
| `flexDirection`    | `row`                              |
| `gap`              | `Spacing.sm (8)`                   |
| `marginTop`        | `Spacing.sm (8)`                   |

#### StatBadge

| Property             | Value                               |
|----------------------|-------------------------------------|
| `paddingHorizontal`  | `Spacing.sm (8)`                    |
| `paddingVertical`    | `Spacing.xs (4)`                    |
| `backgroundColor`    | `#2d6a4f` (Colors.surfaceLight)     |
| `borderRadius`       | `8`                                 |

**Stat Label (e.g., "OVR"):**

| Property     | Value                              |
|--------------|------------------------------------|
| Font size    | `12` (Typography.small)            |
| Font weight  | `400`                              |
| Color        | `#6B9080` (Colors.textMuted)       |

**Stat Value (e.g., "91"):**

| Property     | Value                              |
|--------------|------------------------------------|
| Font size    | `16` (Typography.bodyBold)         |
| Font weight  | `600`                              |
| Color        | `#FFFFFF` (Colors.textPrimary)     |

**Stats displayed:** OVR (overall), FIN (finishing), PAC (pace) — from bundled CSV data.

**i18n:**

| Key                    | EN   | TR   | DE   | FR   |
|------------------------|------|------|------|------|
| `stats.ovr`            | OVR  | OVR  | GES  | GÉN  |
| `stats.fin`            | FIN  | FIN  | ABS  | FIN  |
| `stats.pac`            | PAC  | PAC  | TEM  | VIT  |

#### TeamBadge (small, on MOTM card)

| Property        | Value                              |
|-----------------|------------------------------------|
| Position        | `absolute, top: 12, right: 12`     |
| Size            | `28 × 28`                          |
| `borderRadius`  | `14` (circle)                      |
| `backgroundColor`| Player's team color                |
| Initials size   | `12px`, weight `700`, white        |

---

### 3.4 ActionButtons

| Property           | Value                              |
|--------------------|------------------------------------|
| `flexDirection`    | `row`                              |
| `gap`              | `Spacing.sm (8)`                   |
| `paddingHorizontal`| `Spacing.md (16)`                  |
| `paddingVertical`  | `Spacing.lg (24)`                  |
| `paddingBottom`    | `Spacing.xl (32)` + safe area      |

#### ActionButton (shared base)

| Property             | Value                               |
|----------------------|-------------------------------------|
| `flex`               | `1`                                 |
| `height`             | `48`                                |
| `borderRadius`       | `12`                                |
| `alignItems`         | `center`                            |
| `justifyContent`     | `center`                            |

**Text (all buttons):**

| Property     | Value                              |
|--------------|------------------------------------|
| Font size    | `14` (Typography.caption)          |
| Font weight  | `600`                              |
| Letter spacing| `0.5`                             |
| Text transform| `uppercase`                       |

#### Rematch Button

| Property        | Value                              |
|-----------------|------------------------------------|
| `backgroundColor`| `#7dcea0` (Colors.primary)        |
| Text color      | `#0d2818` (Colors.background)     |
| Pressed bg      | `#52b788` (Colors.primaryDark)    |
| Pressed scale   | `0.95`                             |

**Navigation:** Reset Plinko game state, `router.replace('/game/plinko')`

#### Change Teams Button

| Property        | Value                              |
|-----------------|------------------------------------|
| `backgroundColor`| `transparent`                     |
| `borderWidth`   | `1.5`                              |
| `borderColor`   | `#2d6a4f` (Colors.border)          |
| Text color      | `#A8DABC` (Colors.textSecondary)  |
| Pressed border  | `#52b788`                          |
| Pressed text    | `#FFFFFF`                          |
| Pressed scale   | `0.95`                             |

**Navigation:** Clear matchStore teams, `router.replace('/team-selection')`

#### Home Button

| Property        | Value                              |
|-----------------|------------------------------------|
| `backgroundColor`| `transparent`                     |
| `borderWidth`   | `1.5`                              |
| `borderColor`   | `#2d6a4f` (Colors.border)          |
| Text color      | `#A8DABC` (Colors.textSecondary)  |
| Pressed border  | `#52b788`                          |
| Pressed text    | `#FFFFFF`                          |
| Pressed scale   | `0.95`                             |

**Navigation:** Clear all stores, `router.replace('/')`

**i18n:**

| Key                        | EN           | TR             | DE                | FR                  |
|----------------------------|--------------|----------------|-------------------|---------------------|
| `postMatch.rematch`        | REMATCH      | RÖVANŞ         | RÜCKSPIEL         | REVANCHE            |
| `postMatch.changeTeams`    | CHANGE TEAMS | TAKIM DEĞİŞTİR| TEAMS WECHSELN    | CHANGER D'ÉQUIPES   |
| `postMatch.home`           | HOME         | ANA MENÜ       | STARTSEITE        | ACCUEIL             |

---

## 4. Full Layout Spec (StyleSheet)

```typescript
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0d2818',
  },
  scrollContent: {
    flexGrow: 1,
  },
  // Score Section
  scoreSection: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 32,
    paddingHorizontal: 16,
    backgroundColor: '#1a472a',
    borderBottomWidth: 1,
    borderBottomColor: '#2d6a4f',
  },
  teamColumn: {
    alignItems: 'center',
    flex: 1,
    gap: 8,
  },
  teamBadge: {
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
  },
  teamBadgeInitials: {
    fontSize: 20,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  teamName: {
    fontSize: 14,
    fontWeight: '400',
    color: '#A8DABC',
  },
  scoreColumn: {
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 24,
  },
  scoreText: {
    fontSize: 48,
    fontWeight: '900',
    color: '#FFFFFF',
  },
  resultBadge: {
    paddingHorizontal: 16,
    paddingVertical: 4,
    borderRadius: 8,
  },
  resultBadgeWin: {
    backgroundColor: 'rgba(125,206,160,0.2)',
  },
  resultBadgeDraw: {
    backgroundColor: 'rgba(107,144,128,0.2)',
  },
  resultText: {
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: 2,
  },
  resultTextWin: {
    color: '#7dcea0',
  },
  resultTextDraw: {
    color: '#6B9080',
  },
  // Events Section
  eventsSection: {
    paddingVertical: 24,
    paddingHorizontal: 16,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6B9080',
    letterSpacing: 2,
    textTransform: 'uppercase',
    marginBottom: 16,
  },
  eventRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: 'rgba(45,106,79,0.3)',
    gap: 8,
  },
  eventIcon: {
    fontSize: 20,
  },
  eventMinute: {
    fontSize: 14,
    fontWeight: '600',
    color: '#A8DABC',
    minWidth: 36,
  },
  eventDescription: {
    fontSize: 16,
    fontWeight: '400',
    color: '#FFFFFF',
    flex: 1,
  },
  // MOTM Section
  motmSection: {
    paddingVertical: 24,
    paddingHorizontal: 16,
    alignItems: 'center',
  },
  motmCard: {
    width: '100%',
    maxWidth: 320,
    backgroundColor: '#1a472a',
    borderRadius: 16,
    borderWidth: 2,
    borderColor: '#FFD700',
    padding: 24,
    alignItems: 'center',
    gap: 8,
    shadowColor: '#FFD700',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 4,
    overflow: 'hidden',
  },
  motmPlayerName: {
    fontSize: 24,
    fontWeight: '700',
    color: '#FFFFFF',
    textAlign: 'center',
  },
  motmGoals: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFD700',
  },
  statsRow: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 8,
  },
  statBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    backgroundColor: '#2d6a4f',
    borderRadius: 8,
    alignItems: 'center',
  },
  statLabel: {
    fontSize: 12,
    fontWeight: '400',
    color: '#6B9080',
  },
  statValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  motmTeamBadge: {
    position: 'absolute',
    top: 12,
    right: 12,
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  // Action Buttons
  actionButtons: {
    flexDirection: 'row',
    gap: 8,
    paddingHorizontal: 16,
    paddingVertical: 24,
    paddingBottom: 32,
  },
  actionButton: {
    flex: 1,
    height: 48,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionButtonPrimary: {
    backgroundColor: '#7dcea0',
  },
  actionButtonSecondary: {
    backgroundColor: 'transparent',
    borderWidth: 1.5,
    borderColor: '#2d6a4f',
  },
  actionButtonTextPrimary: {
    fontSize: 14,
    fontWeight: '600',
    color: '#0d2818',
    letterSpacing: 0.5,
    textTransform: 'uppercase',
  },
  actionButtonTextSecondary: {
    fontSize: 14,
    fontWeight: '600',
    color: '#A8DABC',
    letterSpacing: 0.5,
    textTransform: 'uppercase',
  },
});
```

---

## 5. Animations

### 5.1 Score Reveal

```typescript
// Score numbers count up from 0
const displayHome = useSharedValue(0);
const displayAway = useSharedValue(0);

useEffect(() => {
  displayHome.value = withTiming(homeScore, { duration: 800, easing: Easing.out(Easing.cubic) });
  displayAway.value = withDelay(200,
    withTiming(awayScore, { duration: 800, easing: Easing.out(Easing.cubic) })
  );
}, []);
```

### 5.2 Result Badge Pop-in

```typescript
const scale = useSharedValue(0);
useEffect(() => {
  scale.value = withDelay(1000, withSpring(1, { damping: 12, stiffness: 150 }));
}, []);
```

### 5.3 Events Timeline Stagger

```typescript
// Each event row fades in with stagger
const entering = FadeInLeft.delay(1200 + index * 150).duration(300);
```

### 5.4 MOTM Card Reveal

```typescript
// Gold card scales up with spring
const cardScale = useSharedValue(0.8);
const cardOpacity = useSharedValue(0);

useEffect(() => {
  const totalEventsDelay = 1200 + (eventCount * 150) + 300;
  cardScale.value = withDelay(totalEventsDelay, withSpring(1, { damping: 10, stiffness: 120 }));
  cardOpacity.value = withDelay(totalEventsDelay, withTiming(1, { duration: 400 }));
}, []);
```

### 5.5 Button Press

```typescript
const scale = useSharedValue(1);
const onPressIn = () => { scale.value = withTiming(0.95, { duration: 80 }); };
const onPressOut = () => { scale.value = withTiming(1.0, { duration: 120 }); };
```

---

## 6. State Variations

### 6.1 Default (Win, with goals)
- Full layout as described: score, result badge "WIN", events timeline, MOTM card, 3 buttons
- MOTM determined by most goals

### 6.2 Draw
- ResultBadge shows "DRAW" with muted styling
- MOTM still displayed (player with most goals, or highest OVR if 0-0)

### 6.3 Scoreless Draw (0-0)
- Score shows "0 - 0"
- Result badge: "DRAW"
- Events section: "No events" empty state (centered muted text)
- MOTM: player with highest `overall` from either team

### 6.4 Many Events (> 6)
- Events list becomes scrollable with `maxHeight: 240`
- Fade gradient at bottom hints at more content

### 6.5 Loading
- Not applicable (all data computed locally before navigation)

### 6.6 Error
- Not applicable (no network calls)

---

## 7. Navigation

| Action              | Target                   | Transition              |
|---------------------|--------------------------|-------------------------|
| Tap "REMATCH"       | `/game/plinko`           | Replace (no back stack) |
| Tap "CHANGE TEAMS"  | `/team-selection`        | Replace (clears stack)  |
| Tap "HOME"          | `/` (Main Menu)          | Replace (clears stack)  |
| Hardware back       | `/` (Main Menu)          | Replace (clears stack)  |

> Note: All navigations use `router.replace()` to prevent going "back" to a completed match.

---

## 8. i18n Key Summary

| Key                          | EN               | TR                | DE                  | FR                    |
|------------------------------|------------------|-------------------|---------------------|-----------------------|
| `postMatch.title`            | MATCH RESULT     | MAÇ SONUCU        | SPIELERGEBNIS       | RÉSULTAT DU MATCH     |
| `postMatch.win`              | WIN              | GALİBİYET         | SIEG                | VICTOIRE              |
| `postMatch.draw`             | DRAW             | BERABERE          | UNENTSCHIEDEN       | MATCH NUL             |
| `postMatch.matchEvents`      | MATCH EVENTS     | MAÇ OLAYLARI      | SPIELEREIGNISSE     | ÉVÉNEMENTS DU MATCH   |
| `postMatch.noEvents`         | No events        | Olay yok          | Keine Ereignisse    | Aucun événement       |
| `postMatch.motmTitle`        | MAN OF THE MATCH | MAÇIN YILDIZI     | SPIELER DES SPIELS  | HOMME DU MATCH        |
| `postMatch.goals`            | {count} Goals    | {count} Gol       | {count} Tore        | {count} Buts          |
| `postMatch.goal`             | 1 Goal           | 1 Gol             | 1 Tor               | 1 But                 |
| `postMatch.rematch`          | REMATCH          | RÖVANŞ            | RÜCKSPIEL           | REVANCHE              |
| `postMatch.changeTeams`      | CHANGE TEAMS     | TAKIM DEĞİŞTİR   | TEAMS WECHSELN      | CHANGER D'ÉQUIPES     |
| `postMatch.home`             | HOME             | ANA MENÜ          | STARTSEITE          | ACCUEIL               |
| `stats.ovr`                  | OVR              | OVR               | GES                 | GÉN                   |
| `stats.fin`                  | FIN              | FIN               | ABS                 | FIN                   |
| `stats.pac`                  | PAC              | PAC               | TEM                 | VIT                   |

---

## 9. Responsive Notes

### Phone (default, < 768px width)
- Layout as specified above
- 3 action buttons in a row (each `flex: 1`)
- MOTM card `maxWidth: 320`

### Tablet (>= 768px width)
- Max content width: `560px` wrapper, centered
- MOTM card can grow to `maxWidth: 400`
- Action buttons: same row layout, larger touch targets

---

## 10. Accessibility

| Element            | Role       | Label (i18n key)           | Hint                              |
|--------------------|------------|----------------------------|-----------------------------------|
| Score display      | `text`     | `"{home} {score} {away}"`  | Final match score                 |
| Result badge       | `text`     | `postMatch.win/draw`       | Match result                      |
| Event row          | `text`     | `"{icon} {minute} {desc}"` | Match event                       |
| MOTM card          | `text`     | `postMatch.motmTitle`      | Man of the Match player details   |
| Rematch button     | `button`   | `postMatch.rematch`        | Play again with same teams        |
| Change Teams button| `button`   | `postMatch.changeTeams`    | Select different teams            |
| Home button        | `button`   | `postMatch.home`           | Return to main menu               |
