# Plinko Game Screen — Screen Design Spec

> **GDD Reference:** Section 3.4 (3.4.1–3.4.6), Section 7.4
> **Route:** `/game/plinko`
> **Status:** Design Complete

---

## 1. Screen Layout (ASCII Wireframe)

```
┌──────────────────────────────────┐
│  [MC] 0 - 0 [AR]                │  ← Score Bar (fixed top)
│         ⏱ 45:00                  │  ← Match Timer
├──────────────────────────────────┤
│                                  │
│     ●A              ●B           │  ← Drop Zone (2 balls)
│                                  │
│   ○  ○  ○  ○  ○  ○  ○           │  ← Peg Row 1 (7 pegs)
│    ○  ○  ○  ○  ○  ○             │  ← Peg Row 2 (6 pegs)
│   ○  ○  ○  ○  ○  ○  ○           │  ← Peg Row 3 (7 pegs)
│    ○  ○  ○  ○  ○  ○             │  ← Peg Row 4 (6 pegs)
│   ○  ○  ○  ○  ○  ○  ○           │  ← Peg Row 5 (7 pegs)
│    ○  ○  ○  ○  ○  ○             │  ← Peg Row 6 (6 pegs)
│   ○  ○  ○  ○  ○  ○  ○           │  ← Peg Row 7 (7 pegs)
│    ○  ○  ○  ○  ○  ○             │  ← Peg Row 8 (6 pegs)
│                                  │
│  ╔═══════════════════════╗       │
│  ║        ⚽ GOAL        ║       │  ← Goal Zone (35% width)
│  ╚═══════════════════════╝       │
│                                  │
│  ┌───────────────────────────┐   │
│  │  ⚽ 23' Goal! Haaland     │   │  ← Event Toast (overlay)
│  └───────────────────────────┘   │
└──────────────────────────────────┘
```

---

## 2. Screen Zones

The game screen is divided into 4 vertical zones within a full-screen container:

| Zone          | Height                 | Purpose                    |
|---------------|------------------------|----------------------------|
| Score Bar     | `88px` fixed           | Score + timer display      |
| Drop Zone     | `~8%` of play area     | Ball spawn position        |
| Peg Grid      | `~72%` of play area    | Physics simulation area    |
| Goal Zone     | `~20%` of play area    | Scoring target at bottom   |

**Play Area** = screen height − score bar height − safe area insets.

---

## 3. Component Hierarchy

```
PlinkoGameScreen
├── View (flex: 1, bg: background)
│   ├── ScoreBar (fixed top)
│   │   ├── TeamBadge (Home)
│   │   ├── ScoreDisplay ("0 - 0")
│   │   ├── TeamBadge (Away)
│   │   └── TimerDisplay ("45:00")
│   │
│   ├── GameCanvas (flex: 1, contains physics)
│   │   ├── DropZone
│   │   │   ├── Ball (Team A — animated)
│   │   │   └── Ball (Team B — animated)
│   │   │
│   │   ├── PegGrid
│   │   │   └── Peg (repeated, 8 rows × 6-7 cols)
│   │   │
│   │   └── GoalZone
│   │       ├── GoalFrame (border visual)
│   │       └── GoalLabel ("GOAL")
│   │
│   └── EventToast (overlay, absolute positioned)
│       ├── ToastIcon (⚽ or 🟥)
│       └── ToastText ("23' Goal! Haaland")
```

---

## 4. Component Specifications

### 4.1 ScoreBar

| Property           | Value                              |
|--------------------|------------------------------------|
| `height`           | `88`                               |
| `backgroundColor`  | `#1a472a` (Colors.surface)         |
| `paddingTop`       | Safe area top inset                |
| `paddingHorizontal`| `Spacing.md (16)`                  |
| `borderBottomWidth`| `1`                                |
| `borderBottomColor`| `#2d6a4f` (Colors.border)          |
| `zIndex`           | `10`                               |

**Inner layout (2 rows):**

#### Row 1: Teams + Score

| Property           | Value                              |
|--------------------|------------------------------------|
| `flexDirection`    | `row`                              |
| `alignItems`       | `center`                           |
| `justifyContent`   | `space-between`                    |
| `paddingHorizontal`| `Spacing.sm (8)`                   |

#### TeamBadge (Score Bar variant)

| Property        | Value                              |
|-----------------|------------------------------------|
| `flexDirection` | `row`                              |
| `alignItems`    | `center`                           |
| `gap`           | `Spacing.sm (8)`                   |

**Badge Circle:**

| Property        | Value                              |
|-----------------|------------------------------------|
| Size            | `32 × 32`                          |
| `borderRadius`  | `16` (circle)                      |
| `backgroundColor`| Team color or `#2d6a4f` fallback  |
| Border          | `1.5px` — `#FFC72C` (home), `#E63946` (away) |

**Initials:** `14px`, weight `700`, `#FFFFFF`

**Team Short Name:** `12px` (Typography.small), `#A8DABC`, `numberOfLines: 1`

#### ScoreDisplay (center)

| Property     | Value                              |
|--------------|------------------------------------|
| Font size    | `32` (Typography.heading1)         |
| Font weight  | `700`                              |
| Color        | `#FFFFFF` (Colors.textPrimary)     |
| Format       | `"{homeScore} - {awayScore}"`      |
| `minWidth`   | `80` (prevents layout shift)       |
| `textAlign`  | `center`                           |

**Score Change Animation:**
```typescript
// Flash gold on goal
const flashColor = useSharedValue('#FFFFFF');
const onGoal = () => {
  flashColor.value = '#FFD700'; // goalGold
  flashColor.value = withDelay(100, withTiming('#FFFFFF', { duration: 600 }));
};
```

#### Row 2: Timer

| Property        | Value                              |
|-----------------|------------------------------------|
| `alignItems`    | `center`                           |
| `marginTop`     | `Spacing.xs (4)`                   |

#### TimerDisplay

| Property     | Value                              |
|--------------|------------------------------------|
| Font size    | `28` (Typography.timer)            |
| Font weight  | `700`                              |
| Font family  | `monospace`                        |
| Color        | `#A8DABC` (Colors.textSecondary)   |
| Format       | `"mm'"` (e.g., `"45'"`, `"90+2'"`) |

**Extra Time Style:** When timer reaches 90'+, color changes to `#E63946` (Colors.redCard) to signal urgency.

---

### 4.2 GameCanvas

| Property     | Value                              |
|--------------|------------------------------------|
| `flex`       | `1`                                |
| `backgroundColor`| `#0d2818` (Colors.background)  |
| `overflow`   | `hidden`                           |

> The GameCanvas is the physics simulation area. All ball/peg positions are calculated relative to this container.

---

### 4.3 Drop Zone

| Property     | Value                              |
|--------------|------------------------------------|
| Height       | `~8%` of GameCanvas height         |
| Position     | Top of GameCanvas                  |
| Purpose      | Balls spawn here and drop into pegs |

**Ball spawn positions:**
- Ball A (Home): `x = 30%` of canvas width
- Ball B (Away): `x = 70%` of canvas width
- Both at `y = 0` (top of drop zone)

Balls respawn at these positions after each goal or when leaving bounds.

---

### 4.4 Ball

| Property        | Value                              |
|-----------------|------------------------------------|
| Radius          | `10px` (GameConfig.ballRadius)     |
| Shape           | Circle                             |
| Ball A color    | Home team primary color (from data) |
| Ball B color    | Away team primary color (from data) |
| Fallback colors | `#FFC72C` (home), `#E63946` (away) |
| Shadow (iOS)    | `shadowColor: ball color, shadowOffset: {0, 2}, shadowOpacity: 0.4, shadowRadius: 4` |
| Shadow (Android)| `elevation: 3`                     |

**Visual enhancements:**
- Subtle radial gradient: lighter center, darker edge (gives 3D sphere feel)
- Team initial letter in center: `8px`, weight `700`, `#FFFFFF` (optional, may be too small)
- Trail effect: 3 ghost circles at 30%, 15%, 5% opacity behind ball during fast movement

**Physics (from GDD 7.4):**

| Parameter          | Value                              |
|--------------------|------------------------------------|
| Gravity            | `0.3` (acceleration per frame)     |
| Bounce damping     | `0.7` (energy retained on bounce)  |
| Bounce randomness  | `0.1` (random angle variance)      |
| Ball count         | `2` (always 2 balls active)        |

---

### 4.5 Peg Grid

| Property        | Value                              |
|-----------------|------------------------------------|
| Rows            | `8` (GameConfig.pegRows)           |
| Odd rows (1,3,5,7)| `7` pegs (GameConfig.pegCols)    |
| Even rows (2,4,6,8)| `6` pegs                         |
| Pattern         | Staggered/offset (honeycomb)       |
| Vertical span   | `~72%` of GameCanvas               |

#### Peg Spacing Calculation

```typescript
const canvasWidth = screenWidth;
const canvasHeight = gameCanvasHeight;

const pegAreaTop = canvasHeight * 0.08;     // below drop zone
const pegAreaBottom = canvasHeight * 0.80;   // above goal zone
const pegAreaHeight = pegAreaBottom - pegAreaTop;

const horizontalSpacing = canvasWidth / (pegCols + 1);  // 7+1 = 8 divisions
const verticalSpacing = pegAreaHeight / (pegRows + 1);   // 8+1 = 9 divisions

// Odd row pegs: x = horizontalSpacing * (col + 1)
// Even row pegs: x = horizontalSpacing * (col + 1) + horizontalSpacing/2
// All pegs: y = pegAreaTop + verticalSpacing * (row + 1)
```

#### Peg Visual

| Property        | Value                              |
|-----------------|------------------------------------|
| Radius          | `6px` (GameConfig.pegRadius)       |
| Shape           | Circle                             |
| Color (default) | `#2d6a4f` (Colors.surfaceLight)    |
| Color (hit)     | `#7dcea0` (Colors.primary) — flash on ball contact |
| Border          | `1px solid rgba(125,206,160,0.3)`  |

**Hit Animation (on ball contact):**
```typescript
// Peg briefly lights up when ball bounces off it
const pegScale = useSharedValue(1);
const pegColor = useSharedValue('#2d6a4f');

const onHit = () => {
  pegScale.value = withSequence(
    withTiming(1.3, { duration: 60 }),
    withTiming(1.0, { duration: 150 })
  );
  pegColor.value = '#7dcea0';
  pegColor.value = withDelay(60, withTiming('#2d6a4f', { duration: 300 }));
};
```

---

### 4.6 Goal Zone

| Property           | Value                               |
|--------------------|-------------------------------------|
| Position           | Bottom center of GameCanvas         |
| Width              | `35%` of screen width (GameConfig.goalWidthPercent) |
| Height             | `~12%` of GameCanvas                |
| `alignSelf`        | `center`                            |

#### GoalFrame

| Property           | Value                               |
|--------------------|-------------------------------------|
| `borderWidth`      | `2`                                 |
| `borderColor`      | `#7dcea0` (Colors.primary)          |
| `borderTopWidth`   | `0` (open top for balls to enter)   |
| `borderRadius`     | `0 0 8 8` (bottom corners only)     |
| `backgroundColor`  | `rgba(125,206,160,0.08)`            |

#### GoalLabel

| Property     | Value                              |
|--------------|------------------------------------|
| Text         | `"GOAL"` (i18n)                    |
| Font size    | `14` (Typography.caption)          |
| Font weight  | `600`                              |
| Color        | `#7dcea0` (Colors.primary) at 50% opacity |
| `textAlign`  | `center`                           |
| Position     | Centered inside goal frame         |

**Goal Scored Animation:**
```typescript
// Goal frame flashes gold on score
const goalBorderColor = useSharedValue('#7dcea0');
const goalBg = useSharedValue('rgba(125,206,160,0.08)');

const onGoalScored = () => {
  goalBorderColor.value = '#FFD700';
  goalBg.value = 'rgba(255,215,0,0.15)';
  goalBorderColor.value = withDelay(200, withTiming('#7dcea0', { duration: 800 }));
  goalBg.value = withDelay(200, withTiming('rgba(125,206,160,0.08)', { duration: 800 }));
};
```

**i18n:**

| Key              | EN   | TR   | DE   | FR   |
|------------------|------|------|------|------|
| `game.goal`      | GOAL | GOL  | TOR  | BUT  |

---

### 4.7 Event Toast (Overlay)

| Property           | Value                               |
|--------------------|-------------------------------------|
| Position           | `absolute`, `bottom: 80`, `left: 16`, `right: 16` |
| `backgroundColor`  | `rgba(0,0,0,0.85)` (dark overlay)   |
| `borderRadius`     | `12`                                |
| `borderLeftWidth`  | `4`                                 |
| `flexDirection`    | `row`                               |
| `alignItems`       | `center`                            |
| `padding`          | `Spacing.md (16)`                   |
| `gap`              | `Spacing.sm (8)`                    |
| `zIndex`           | `20`                                |
| Duration           | `2000ms` (GameConfig.toastDurationMs) |

**Border left color by event type:**

| Event    | Border color          |
|----------|-----------------------|
| Goal     | `#FFD700` (goalGold)  |
| Red Card | `#E63946` (redCard)   |

#### ToastIcon

| Property     | Value                              |
|--------------|------------------------------------|
| Font size    | `24`                               |
| Goal icon    | `⚽`                               |
| Red card icon| `🟥`                               |

#### ToastText

| Property     | Value                              |
|--------------|------------------------------------|
| Font size    | `16` (Typography.bodyBold)         |
| Font weight  | `600`                              |
| Color        | `#FFFFFF`                          |
| Format (goal)| `"mm' Goal! PlayerName"`           |
| Format (red card)| `"mm' Red Card! PlayerName"`   |

**i18n:**

| Key                   | EN                    | TR                    | DE                     | FR                      |
|-----------------------|-----------------------|-----------------------|------------------------|-------------------------|
| `game.goalToast`      | {min}' Goal! {player} | {min}' Gol! {player}  | {min}' Tor! {player}   | {min}' But! {player}    |
| `game.redCardToast`   | {min}' Red Card! {player} | {min}' Kırmızı Kart! {player} | {min}' Rote Karte! {player} | {min}' Carton Rouge! {player} |

**Toast Animation:**
```typescript
// Slide in from bottom + fade
const entering = SlideInDown.duration(300).easing(Easing.out(Easing.cubic));
const exiting = FadeOut.delay(1700).duration(300);
```

**Queue behavior:** If multiple events fire rapidly, toasts stack (max 2 visible) with the newest at bottom.

---

## 5. Full Layout Spec (StyleSheet)

```typescript
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0d2818',
  },
  // Score Bar
  scoreBar: {
    height: 88,
    backgroundColor: '#1a472a',
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#2d6a4f',
    zIndex: 10,
  },
  scoreBarRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 8,
  },
  teamBadgeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  teamBadgeSmall: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1.5,
  },
  teamBadgeSmallHome: {
    borderColor: '#FFC72C',
  },
  teamBadgeSmallAway: {
    borderColor: '#E63946',
  },
  teamBadgeInitials: {
    fontSize: 14,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  teamShortName: {
    fontSize: 12,
    fontWeight: '400',
    color: '#A8DABC',
  },
  scoreDisplay: {
    fontSize: 32,
    fontWeight: '700',
    color: '#FFFFFF',
    minWidth: 80,
    textAlign: 'center',
  },
  timerRow: {
    alignItems: 'center',
    marginTop: 4,
  },
  timerText: {
    fontSize: 28,
    fontWeight: '700',
    fontFamily: 'monospace',
    color: '#A8DABC',
  },
  timerTextExtraTime: {
    color: '#E63946',
  },
  // Game Canvas
  gameCanvas: {
    flex: 1,
    backgroundColor: '#0d2818',
    overflow: 'hidden',
  },
  // Ball
  ball: {
    position: 'absolute',
    width: 20, // ballRadius * 2
    height: 20,
    borderRadius: 10,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.4,
    shadowRadius: 4,
    elevation: 3,
  },
  // Peg
  peg: {
    position: 'absolute',
    width: 12, // pegRadius * 2
    height: 12,
    borderRadius: 6,
    backgroundColor: '#2d6a4f',
    borderWidth: 1,
    borderColor: 'rgba(125,206,160,0.3)',
  },
  // Goal Zone
  goalZone: {
    position: 'absolute',
    bottom: 0,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  goalFrame: {
    borderWidth: 2,
    borderTopWidth: 0,
    borderColor: '#7dcea0',
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
    backgroundColor: 'rgba(125,206,160,0.08)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  goalLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: 'rgba(125,206,160,0.5)',
    textAlign: 'center',
  },
  // Event Toast
  eventToast: {
    position: 'absolute',
    bottom: 80,
    left: 16,
    right: 16,
    backgroundColor: 'rgba(0,0,0,0.85)',
    borderRadius: 12,
    borderLeftWidth: 4,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    gap: 8,
    zIndex: 20,
  },
  eventToastGoal: {
    borderLeftColor: '#FFD700',
  },
  eventToastRedCard: {
    borderLeftColor: '#E63946',
  },
  toastIcon: {
    fontSize: 24,
  },
  toastText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
    flex: 1,
  },
});
```

---

## 6. Game State Timeline

| Phase              | Timer        | Visual State                           |
|--------------------|--------------|----------------------------------------|
| Match Start        | `0'`         | Balls spawn at drop zone, start falling |
| Normal Play        | `1'–89'`     | Balls bouncing, goals/events triggering |
| Extra Time Start   | `90'`        | Timer turns red, "90+1'" format begins |
| Extra Time End     | `90+N'`      | Whistle sound, all balls freeze         |
| Post-Match Pause   | —            | 1s freeze, then navigate to Post-Match |

---

## 7. Match Timer Behavior

| Parameter          | Value                              |
|--------------------|------------------------------------|
| Total real time    | `90 seconds`                       |
| Display mapping    | 1 real second = 1 match minute     |
| Display format     | `"mm'"` (e.g., `"45'"`)           |
| Extra time         | Random 1–5 extra seconds           |
| Extra time format  | `"90+N'"` (e.g., `"90+2'"`)       |
| End trigger        | Timer reaches extra time limit     |

**Timer color states:**

| Time Range   | Color                          |
|-------------|--------------------------------|
| `0'–89'`    | `#A8DABC` (textSecondary)      |
| `90'+`      | `#E63946` (redCard) — pulsing  |

**Extra time pulse animation:**
```typescript
const opacity = useSharedValue(1);
useEffect(() => {
  if (isExtraTime) {
    opacity.value = withRepeat(
      withSequence(
        withTiming(0.5, { duration: 500 }),
        withTiming(1, { duration: 500 })
      ), -1, true
    );
  }
}, [isExtraTime]);
```

---

## 8. State Variations

### 8.1 Match In Progress (Default)
- Score bar showing current score + timer counting
- 2 balls bouncing through pegs
- Toasts appearing on events
- Goal zone active

### 8.2 Goal Scored
- Ball enters goal → goal frame flashes gold
- Score increments with gold flash animation
- Toast slides in: "⚽ mm' Goal! PlayerName"
- Ball respawns at drop zone after 500ms delay

### 8.3 Red Card Event
- Toast slides in: "🟥 mm' Red Card! PlayerName"
- No visual change to game field (ball count stays 2)
- Player removed from team's available goal scorers

### 8.4 Extra Time
- Timer text turns red and pulses
- Timer format changes to "90+N'"
- All gameplay continues normally

### 8.5 Match End (Freeze)
- Timer stops
- All balls freeze in current position (velocity = 0)
- Optional: subtle dim overlay fades in over game canvas
- 1-second pause, then auto-navigate to Post-Match Summary

### 8.6 Error
- Not applicable (no network; all computed locally)

---

## 9. Navigation

| Action             | Target                   | Transition              |
|--------------------|--------------------------|-------------------------|
| Match ends         | `/post-match`            | Push (auto, after 1s)   |
| Hardware back      | Show "Quit Match?" modal | —                       |

### Quit Match Confirmation Modal

| Property           | Value                              |
|--------------------|------------------------------------|
| `backgroundColor`  | `rgba(0,0,0,0.6)` (Colors.overlay) |
| Modal card bg      | `#1a472a` (Colors.surface)         |
| `borderRadius`     | `16`                               |
| `padding`          | `Spacing.lg (24)`                  |

**Content:**
- Title: "Quit Match?" (heading3, white)
- Description: "Your progress will be lost." (body, textSecondary)
- Buttons: "QUIT" (destructive, red border) + "CONTINUE" (primary, green fill)

**i18n:**

| Key                     | EN                         | TR                           | DE                           | FR                            |
|-------------------------|----------------------------|------------------------------|------------------------------|-------------------------------|
| `game.quitTitle`        | Quit Match?                | Maçtan Çık?                  | Spiel beenden?               | Quitter le match ?            |
| `game.quitDescription`  | Your progress will be lost.| İlerlemeniz kaybolacak.      | Ihr Fortschritt geht verloren.| Votre progression sera perdue.|
| `game.quit`             | QUIT                       | ÇIK                         | BEENDEN                      | QUITTER                       |
| `game.continue`         | CONTINUE                   | DEVAM ET                     | WEITER                       | CONTINUER                     |

---

## 10. i18n Key Summary

| Key                      | EN                          | TR                            | DE                             | FR                              |
|--------------------------|-----------------------------|-------------------------------|--------------------------------|---------------------------------|
| `game.goal`              | GOAL                        | GOL                           | TOR                            | BUT                             |
| `game.goalToast`         | {min}' Goal! {player}       | {min}' Gol! {player}          | {min}' Tor! {player}           | {min}' But! {player}            |
| `game.redCardToast`      | {min}' Red Card! {player}   | {min}' Kırmızı Kart! {player} | {min}' Rote Karte! {player}   | {min}' Carton Rouge! {player}   |
| `game.quitTitle`         | Quit Match?                 | Maçtan Çık?                   | Spiel beenden?                 | Quitter le match ?              |
| `game.quitDescription`   | Your progress will be lost. | İlerlemeniz kaybolacak.       | Ihr Fortschritt geht verloren. | Votre progression sera perdue.  |
| `game.quit`              | QUIT                        | ÇIK                          | BEENDEN                        | QUITTER                         |
| `game.continue`          | CONTINUE                    | DEVAM ET                      | WEITER                         | CONTINUER                       |

---

## 11. Responsive Notes

### Phone (default, < 768px width)
- Full-screen game — no margins
- Peg spacing calculated dynamically from screen dimensions
- Goal width: 35% of screen width
- Score bar uses compact layout (32×32 badges)

### Tablet (>= 768px width)
- Max game canvas width: `480px`, centered horizontally
- Black bars on sides outside game area
- Peg and ball sizes can remain the same (physics tuned for these sizes)
- Score bar stretches full width but content stays centered within `480px`

---

## 12. Performance Notes

- **Rendering:** Use `react-native-reanimated` worklet-based animations for ball physics (runs on UI thread)
- **Peg grid:** Render pegs once as static `View` elements (not animated)
- **Ball positions:** Updated via `useAnimatedStyle` driven by shared values (no React re-renders)
- **Event toasts:** Use `Animated.View` with `entering`/`exiting` layout animations
- **Frame target:** 60 FPS — physics loop at ~16ms intervals

---

## 13. Accessibility

| Element         | Role     | Label                        | Notes                         |
|-----------------|----------|------------------------------|-------------------------------|
| Score bar       | `text`   | `"{home} {score} {away}"`    | Live region for score updates |
| Timer           | `timer`  | `"Match minute {min}"`       | Live region                   |
| Event toast     | `alert`  | Toast text content           | `accessibilityLiveRegion: "assertive"` |
| Game canvas     | `image`  | `"Plinko game in progress"`  | Non-interactive (physics sim) |
| Quit modal      | `alert`  | `game.quitTitle`             | Focus trap when visible       |
