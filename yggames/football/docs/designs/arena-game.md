# Arena Game Screen — Screen Design Spec

> **GDD Reference:** Section 9 (Arena concept), Section 7 (Design tokens), Section 3.4 (Plinko patterns)
> **Route:** `/game/arena`
> **Status:** Design Complete

---

## 1. Screen Layout (ASCII Wireframe)

```
┌──────────────────────────────────┐
│  [MC] 0 - 0 [AR]                │  <- Score Bar (reused from Plinko)
│         ⏱ 45:00                  │  <- Match Timer (reused)
├──────────────────────────────────┤
│                                  │
│            ╭─────╮               │  <- Goal segment (rotates)
│         ╱     ┃┃    ╲            │     ┃┃ = goal opening
│       ╱    ●a    ●b   ╲         │
│      │  ●b    ●a   ●a  │        │  <- Circular arena with
│      │    ●b    ●a      │        │     team-colored balls
│      │  ●a   ●b    ●b  │        │     (5 per team)
│       ╲    ●a   ●b    ╱         │
│         ╲            ╱           │
│           ╰────────╯             │
│                                  │
│  ┌──────────────────────────┐    │
│  │ HOME GOAL  ←→  AWAY GOAL│    │  <- Ownership indicator bar
│  └──────────────────────────┘    │
│                                  │
│  ┌───────────────────────────┐   │
│  │  ⚽ 23' Goal! Haaland     │   │  <- Event Toast (overlay)
│  └───────────────────────────┘   │
└──────────────────────────────────┘
```

---

## 2. Screen Zones

The game screen is divided into vertical zones within a full-screen container:

| Zone                  | Height              | Purpose                              |
|-----------------------|---------------------|--------------------------------------|
| Score Bar             | `88px` fixed        | Score + timer display (reused)       |
| Arena Area            | `~70%` of play area | Circular physics arena               |
| Ownership Indicator   | `36px` fixed        | Shows current goal team ownership    |
| Toast Area            | Overlay             | Event notifications                  |

**Play Area** = screen height - score bar height - safe area insets.

---

## 3. Component Hierarchy

```
ArenaGameScreen
├── View (flex: 1, bg: background)
│   ├── ScoreBar (REUSED from Plinko — no changes)
│   │   ├── TeamBadge (Home)
│   │   ├── ScoreDisplay ("0 - 0")
│   │   ├── TeamBadge (Away)
│   │   └── TimerDisplay ("45:00")
│   │
│   ├── ArenaCanvas (flex: 1, contains physics)
│   │   ├── ArenaBoundary (circular border)
│   │   │   └── ArenaGlow (inner glow effect)
│   │   │
│   │   ├── GoalSegment (rotating, on circle perimeter)
│   │   │   ├── GoalOpening (gap in circle)
│   │   │   ├── GoalFrame (visual bracket around opening)
│   │   │   └── GoalOwnershipPulse (color pulse ring)
│   │   │
│   │   ├── BallGroup (Team A — 5 balls)
│   │   │   └── Ball (repeated × 5, animated)
│   │   │
│   │   └── BallGroup (Team B — 5 balls)
│   │       └── Ball (repeated × 5, animated)
│   │
│   ├── OwnershipBar (fixed below arena)
│   │   ├── OwnershipLabel (team name)
│   │   ├── OwnershipTimer (countdown to switch)
│   │   └── OwnershipColorStrip (animated color transition)
│   │
│   └── EventToast (overlay, absolute positioned — REUSED from Plinko)
│       ├── ToastIcon (⚽ or 🟥)
│       └── ToastText ("23' Goal! Haaland")
```

---

## 4. Component Specifications

### 4.1 ScoreBar (Reused)

Identical to Plinko ScoreBar. See `docs/designs/plinko-game.md` Section 4.1.

No modifications needed — same component, same props.

---

### 4.2 ArenaCanvas

| Property           | Value                              |
|--------------------|------------------------------------|
| `flex`             | `1`                                |
| `backgroundColor`  | `#0d2818` (Colors.background)     |
| `overflow`         | `hidden`                           |
| `alignItems`       | `center`                           |
| `justifyContent`   | `center`                           |

> The ArenaCanvas centers the circular arena. All ball/goal positions are calculated relative to the arena center point.

---

### 4.3 Arena Boundary (Circle)

| Property             | Value                                |
|----------------------|--------------------------------------|
| Shape                | Circle                               |
| Diameter             | `min(screenWidth, playAreaHeight) - 48px` (24px margin each side) |
| `borderWidth`        | `2.5`                                |
| `borderColor`        | `#2d6a4f` (Colors.border)            |
| `backgroundColor`    | `rgba(26,71,42,0.3)` (subtle surface fill) |
| `borderRadius`       | `diameter / 2` (perfect circle)      |
| Position             | Centered in ArenaCanvas              |

**Inner glow effect:**

```typescript
// Subtle radial glow from center
const ArenaGlow = () => (
  <RadialGradient
    colors={['rgba(125,206,160,0.06)', 'rgba(125,206,160,0.02)', 'transparent']}
    stops={[0, 0.5, 1]}
    center={{ x: 0.5, y: 0.5 }}
    style={{ ...StyleSheet.absoluteFillObject, borderRadius: diameter / 2 }}
  />
);
```

**Pitch lines (decorative):**
- Center circle: `40%` of arena diameter, `1px` stroke, `rgba(125,206,160,0.1)`
- Center dot: `4px` radius, same color
- These are purely decorative — no gameplay effect

---

### 4.4 Goal Segment (Rotating)

The goal is a **gap/opening** on the arena circle's perimeter, with visual brackets framing it.

| Property             | Value                                |
|----------------------|--------------------------------------|
| Opening arc length   | `45deg` of the circle (12.5% of perimeter) |
| Visual width         | Approx. `~20%` of circle circumference visually |
| Rotation speed       | `360deg / 12s` = `30deg/s` (one full rotation every 12 seconds) |
| Rotation direction   | Clockwise                            |

#### GoalFrame (Visual Brackets)

| Property             | Value                                |
|----------------------|--------------------------------------|
| Shape                | Two short arc segments flanking the opening |
| `strokeWidth`        | `4`                                  |
| Color (Home owns)    | `#FFC72C` (homeColor)                |
| Color (Away owns)    | `#E63946` (awayColor)                |
| Bracket inner glow   | `shadowColor: ownership color, shadowRadius: 8, shadowOpacity: 0.6` |

#### Goal Opening

| Property             | Value                                |
|----------------------|--------------------------------------|
| Visual               | Gap in the circle border where the GoalFrame brackets are |
| Detection zone       | Arc segment — ball center crosses circle radius at this angular range |
| Inner net visual     | 3 radial lines extending outward from opening, `1px`, `rgba(255,255,255,0.15)` |

**Goal Rotation Animation:**

```typescript
const goalAngle = useSharedValue(0);

// Continuous clockwise rotation
useEffect(() => {
  goalAngle.value = withRepeat(
    withTiming(360, { duration: 12000, easing: Easing.linear }),
    -1, // infinite
    false // no reverse
  );
}, []);

const goalStyle = useAnimatedStyle(() => ({
  transform: [{ rotate: `${goalAngle.value}deg` }],
}));
```

---

### 4.5 Goal Ownership System

The goal alternates team ownership every **5 seconds**.

| Property             | Value                                |
|----------------------|--------------------------------------|
| Switch interval      | `5000ms` (5 seconds)                 |
| Transition duration  | `600ms` (smooth color crossfade)     |
| Home ownership color | `#FFC72C` (homeColor)                |
| Away ownership color | `#E63946` (awayColor)                |

**Scoring Rule:** When a ball enters the goal, it scores **+1 for the team that currently owns the goal**. The goal acts as that team's "net" — balls going in count against the defending team.

- Goal owned by Home (yellow) → any ball entering = **+1 Away**
- Goal owned by Away (red) → any ball entering = **+1 Home**

**Ownership Transition Animation:**

```typescript
const ownershipColor = useSharedValue('#FFC72C'); // starts with Home

const switchOwnership = (toHome: boolean) => {
  ownershipColor.value = withTiming(
    toHome ? '#FFC72C' : '#E63946',
    { duration: 600, easing: Easing.inOut(Easing.ease) }
  );
};
```

**Pre-switch warning (last 1 second before switch):**

```typescript
// Goal frame pulses faster to signal upcoming switch
const pulseOpacity = useSharedValue(1);
const startWarningPulse = () => {
  pulseOpacity.value = withRepeat(
    withSequence(
      withTiming(0.4, { duration: 150 }),
      withTiming(1, { duration: 150 })
    ),
    3, // 3 pulses in ~900ms
    true
  );
};
```

---

### 4.6 Ownership Indicator Bar

Fixed bar below the arena showing current goal ownership status.

| Property             | Value                                |
|----------------------|--------------------------------------|
| `height`             | `36`                                 |
| `backgroundColor`    | `#1a472a` (Colors.surface)           |
| `flexDirection`      | `row`                                |
| `alignItems`         | `center`                             |
| `justifyContent`     | `center`                             |
| `paddingHorizontal`  | `Spacing.md (16)`                    |
| `gap`                | `Spacing.sm (8)`                     |
| `marginHorizontal`   | `Spacing.lg (24)`                    |
| `borderRadius`       | `18` (pill shape)                    |

**Contents:**

| Element              | Style                                |
|----------------------|--------------------------------------|
| Ownership dot        | `10 x 10`, circle, ownership color   |
| Team name label      | `14px`, weight `600`, `#FFFFFF`      |
| "GOAL" text          | `12px`, weight `400`, `#A8DABC`      |
| Switch countdown     | `12px`, monospace, `#A8DABC`, format: `"3s"` |

**Color strip animation:** A thin `2px` line at the bottom of the bar that fills/transitions between home and away colors on each switch.

---

### 4.7 Balls

| Property             | Value                                |
|----------------------|--------------------------------------|
| Count per team       | `5` (10 total on screen)             |
| Radius               | `8px` (slightly smaller than Plinko's 10px to avoid crowding) |
| Shape                | Circle                               |
| Home ball color      | `#FFC72C` (homeColor)                |
| Away ball color      | `#E63946` (awayColor)                |
| Shadow (iOS)         | `shadowColor: ball color, shadowOffset: {0, 1}, shadowOpacity: 0.5, shadowRadius: 3` |
| Shadow (Android)     | `elevation: 2`                       |
| Inner highlight      | Radial gradient: lighter center (20% brighter), darker edge |

**Ball identifiers:** Each ball has a subtle `6px` numeral (`1-5`) in white at center, weight `700`, opacity `0.7`. This helps distinguish individual balls during gameplay.

**Spawn positions:**
- Balls spawn from the **center** of the arena at match start
- Home balls: spawn in a cluster slightly left of center (`x: center - 15px`)
- Away balls: spawn in a cluster slightly right of center (`x: center + 15px`)
- Initial velocity: random outward direction, small magnitude (creates natural spread)

**Physics:**

| Parameter            | Value                                |
|----------------------|--------------------------------------|
| Gravity              | `0` (no gravity — top-down arena view) |
| Initial speed        | `2.0` (pixels per frame)             |
| Max speed            | `5.0` (cap to prevent untrackable movement) |
| Min speed            | `1.0` (balls never stop — maintain minimum velocity) |
| Wall bounce damping  | `0.85` (energy retained on arena wall bounce) |
| Ball-ball collision  | Enabled, elastic collision           |
| Ball-ball damping    | `0.9` (slight energy loss)           |
| Bounce randomness    | `0.05` (small angle variance on wall hit) |
| Friction             | `0.998` per frame (very slight deceleration) |

> **Key difference from Plinko:** Arena has NO gravity. Balls move freely in 2D, bouncing off the circular boundary like a billiards/air hockey hybrid. This top-down perspective is what makes Arena feel distinct.

---

### 4.8 Ball-Wall Collision (Circle Boundary)

```typescript
// Reflect ball velocity off circular boundary
const reflectOffCircle = (ball: Ball, arenaCenter: Point, arenaRadius: number) => {
  const dx = ball.x - arenaCenter.x;
  const dy = ball.y - arenaCenter.y;
  const dist = Math.sqrt(dx * dx + dy * dy);

  if (dist + ball.radius >= arenaRadius) {
    // Normal vector pointing inward
    const nx = -dx / dist;
    const ny = -dy / dist;

    // Reflect velocity
    const dot = ball.vx * nx + ball.vy * ny;
    ball.vx = (ball.vx - 2 * dot * nx) * WALL_BOUNCE_DAMPING;
    ball.vy = (ball.vy - 2 * dot * ny) * WALL_BOUNCE_DAMPING;

    // Push ball inside boundary
    ball.x = arenaCenter.x + (arenaRadius - ball.radius - 1) * (-nx);
    ball.y = arenaCenter.y + (arenaRadius - ball.radius - 1) * (-ny);

    // Add slight randomness
    const randomAngle = (Math.random() - 0.5) * BOUNCE_RANDOMNESS;
    const cos = Math.cos(randomAngle);
    const sin = Math.sin(randomAngle);
    const newVx = ball.vx * cos - ball.vy * sin;
    const newVy = ball.vx * sin + ball.vy * cos;
    ball.vx = newVx;
    ball.vy = newVy;
  }
};
```

---

### 4.9 Goal Detection

```typescript
// Check if ball has exited through the goal opening
const checkGoalEntry = (
  ball: Ball,
  arenaCenter: Point,
  arenaRadius: number,
  goalAngleDeg: number, // current rotation angle of goal center
  goalArcHalfDeg: number // half of goal arc (22.5deg for 45deg total)
) => {
  const dx = ball.x - arenaCenter.x;
  const dy = ball.y - arenaCenter.y;
  const dist = Math.sqrt(dx * dx + dy * dy);

  // Ball must be at/beyond the arena boundary
  if (dist + ball.radius < arenaRadius - 2) return false;

  // Calculate ball's angle relative to center
  let ballAngle = Math.atan2(dy, dx) * (180 / Math.PI);
  if (ballAngle < 0) ballAngle += 360;

  // Check if ball angle is within goal arc
  const angleDiff = ((ballAngle - goalAngleDeg + 540) % 360) - 180;
  return Math.abs(angleDiff) <= goalArcHalfDeg;
};
```

When a ball exits through the goal:
1. Score event fires (for the team opposing the goal owner)
2. Ball disappears with a brief flash
3. Ball respawns at arena center after `800ms` delay
4. Respawn velocity: random direction, standard initial speed

---

### 4.10 Red Card — Ball Removal

In Arena mode, red cards have **gameplay impact** (unlike Plinko where they are cosmetic).

**Red card = one ball from the affected team permanently disappears.**

| Property             | Value                                |
|----------------------|--------------------------------------|
| Trigger              | Random ~5% chance at 15', 30', 45', 60', 75' |
| Effect               | One ball from affected team is removed |
| Minimum balls        | Each team keeps at least `1` ball (red card skipped if at minimum) |
| Player assignment    | Random from team roster (excl. already red-carded) |

**Ball Removal Animation:**

```typescript
const removeBall = (ballIndex: number) => {
  // 1. Ball freezes in place (velocity = 0)
  // 2. Red flash overlay on the ball
  ballColor.value = withTiming('#E63946', { duration: 150 });

  // 3. Scale up + fade out
  ballScale.value = withSequence(
    withTiming(1.8, { duration: 300, easing: Easing.out(Easing.cubic) }),
    withTiming(0, { duration: 200 })
  );
  ballOpacity.value = withDelay(300, withTiming(0, { duration: 200 }));

  // 4. Red card icon floats up from ball position
  // Small "🟥" emoji rises 40px and fades over 600ms
};
```

**Visual feedback:** When a ball is removed, a brief red shockwave ring expands from the ball's last position:

```typescript
const shockwaveScale = useSharedValue(0);
const shockwaveOpacity = useSharedValue(0.6);

const triggerShockwave = () => {
  shockwaveScale.value = withTiming(3, { duration: 400, easing: Easing.out(Easing.cubic) });
  shockwaveOpacity.value = withTiming(0, { duration: 400 });
};
// Ring: borderWidth: 2, borderColor: '#E63946', borderRadius: 999
```

---

### 4.11 Event Toast (Reused)

Identical to Plinko EventToast. See `docs/designs/plinko-game.md` Section 4.7.

**Additional Arena-specific toast:**

| Event              | Icon | Border Color | Text Format                           |
|--------------------|------|--------------|---------------------------------------|
| Goal               | ⚽   | `#FFD700`    | `"{min}' Goal! {player}"`             |
| Red Card           | 🟥   | `#E63946`    | `"{min}' Red Card! {player} - Ball removed!"` |
| Ownership Switch   | 🔄   | Current team color | `"{teamName}'s Goal"` (brief, 1.5s) |

**Ownership switch toast:** A smaller, more subtle toast that appears at each goal ownership change. Shorter duration (`1500ms`) and slightly transparent (`opacity: 0.8`) to not distract from gameplay.

```typescript
const ownershipToastStyle = {
  ...eventToastBase,
  backgroundColor: 'rgba(0,0,0,0.7)',
  padding: 12, // smaller than event toasts
};
```

---

### 4.12 Match Timer (Reused)

Identical to Plinko TimerDisplay. See `docs/designs/plinko-game.md` Section 7.

Same 90-second real-time match + 1-5 seconds extra time.

---

## 5. Full Layout Spec (StyleSheet)

```typescript
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0d2818', // Colors.background
  },

  // Score Bar — reused from Plinko (import shared component)
  // See plinko-game.md Section 5

  // Arena Canvas
  arenaCanvas: {
    flex: 1,
    backgroundColor: '#0d2818',
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
  },

  // Arena Boundary
  arenaBoundary: {
    // width/height set dynamically: min(screenWidth, playAreaHeight) - 48
    borderWidth: 2.5,
    borderColor: '#2d6a4f', // Colors.border
    backgroundColor: 'rgba(26,71,42,0.3)',
    // borderRadius set dynamically: diameter / 2
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },

  // Decorative pitch lines
  centerCircle: {
    position: 'absolute',
    // width/height: 40% of arena diameter
    borderWidth: 1,
    borderColor: 'rgba(125,206,160,0.1)',
    // borderRadius: 50%
  },
  centerDot: {
    position: 'absolute',
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'rgba(125,206,160,0.1)',
  },

  // Goal Segment (container — rotates)
  goalSegmentContainer: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    // transform: [{ rotate }] — animated
  },

  // Goal Frame Bracket
  goalFrame: {
    position: 'absolute',
    // positioned at edge of circle at goal angle
    // Color changes based on ownership
  },

  // Ownership Indicator Bar
  ownershipBar: {
    height: 36,
    backgroundColor: '#1a472a', // Colors.surface
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
    gap: 8,
    marginHorizontal: 24,
    borderRadius: 18,
  },
  ownershipDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    // backgroundColor: animated ownership color
  },
  ownershipTeamName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  ownershipGoalText: {
    fontSize: 12,
    fontWeight: '400',
    color: '#A8DABC', // Colors.textSecondary
  },
  ownershipCountdown: {
    fontSize: 12,
    fontWeight: '700',
    fontFamily: 'monospace',
    color: '#A8DABC',
  },

  // Ball
  ball: {
    position: 'absolute',
    width: 16, // ballRadius * 2 (8px radius)
    height: 16,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.5,
    shadowRadius: 3,
    elevation: 2,
  },
  ballHome: {
    backgroundColor: '#FFC72C', // homeColor
    shadowColor: '#FFC72C',
  },
  ballAway: {
    backgroundColor: '#E63946', // awayColor
    shadowColor: '#E63946',
  },
  ballNumber: {
    fontSize: 6,
    fontWeight: '700',
    color: '#FFFFFF',
    opacity: 0.7,
  },

  // Red Card Shockwave
  shockwave: {
    position: 'absolute',
    width: 16,
    height: 16,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#E63946',
    // scale and opacity animated
  },

  // Event Toast — reused from Plinko (import shared component)
  // See plinko-game.md Section 5

  // Ownership Switch Toast (smaller variant)
  ownershipToast: {
    position: 'absolute',
    bottom: 80,
    left: 48,
    right: 48,
    backgroundColor: 'rgba(0,0,0,0.7)',
    borderRadius: 12,
    borderLeftWidth: 4,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    gap: 8,
    zIndex: 15, // below event toasts (zIndex: 20)
  },
});
```

---

## 6. Arena Game Config

```typescript
const ArenaConfig = {
  // Match (shared with Plinko)
  matchDurationSeconds: 90,
  extraTimeMinSeconds: 1,
  extraTimeMaxSeconds: 5,

  // Arena
  ballsPerTeam: 5,
  ballRadius: 8,
  arenaMargin: 24,              // px margin from screen edge to arena circle

  // Goal
  goalArcDegrees: 45,           // goal opening = 45deg of circle
  goalRotationDurationMs: 12000, // full rotation every 12 seconds
  goalRotationDirection: 'clockwise',

  // Ownership
  ownershipSwitchIntervalMs: 5000,  // switch every 5 seconds
  ownershipTransitionMs: 600,       // color transition duration
  ownershipWarningMs: 1000,         // pulse warning 1s before switch

  // Ball Physics
  gravity: 0,                   // no gravity (top-down view)
  initialBallSpeed: 2.0,
  maxBallSpeed: 5.0,
  minBallSpeed: 1.0,
  wallBounceDamping: 0.85,
  ballBallDamping: 0.9,
  bounceRandomness: 0.05,
  friction: 0.998,

  // Ball Respawn
  respawnDelayMs: 800,
  respawnFromCenter: true,

  // Red Card
  redCardCheckMinutes: [15, 30, 45, 60, 75],
  redCardProbability: 0.05,
  minBallsPerTeam: 1,           // can't go below 1 ball

  // Events
  redCardBallRemoval: true,     // Arena: red cards remove balls
  toastDurationMs: 2000,
  ownershipToastDurationMs: 1500,

  // Position Multipliers (shared with Plinko)
  positionWeights: {
    FWD: 3.0,
    MID: 1.5,
    DEF: 0.5,
    GK: 0.05,
  },
};
```

---

## 7. Game State Timeline

| Phase                | Timer        | Visual State                                   |
|----------------------|--------------|-------------------------------------------------|
| Match Start          | `0'`         | Balls spawn at center, burst outward            |
| Normal Play          | `1'-89'`     | Balls bouncing, goal rotating, ownership cycling |
| Ownership Switch     | Every 5s     | Goal color transitions, brief toast             |
| Red Card             | Check points | Ball removal animation + shockwave              |
| Extra Time Start     | `90'`        | Timer turns red and pulses                      |
| Extra Time End       | `90+N'`      | Whistle, all balls freeze                       |
| Post-Match Pause     | --           | 1s freeze, navigate to Post-Match Summary       |

---

## 8. State Variations

### 8.1 Match Start (Kickoff)

- All 10 balls spawn at arena center in a tight cluster
- Brief `500ms` countdown overlay: "3... 2... 1..."
- Balls burst outward in random directions simultaneously
- Goal begins rotating from top (0deg)
- Ownership starts with Home team

### 8.2 Normal Play

- Balls bouncing inside arena boundary
- Goal continuously rotating clockwise
- Ownership indicator showing current team + countdown
- Score bar updating on goals
- Toasts appearing for events

### 8.3 Goal Scored

1. Ball exits through goal opening
2. Ball disappears with gold flash at exit point
3. Score increments for team opposing goal owner
4. Score bar: gold flash animation (reused from Plinko)
5. Goal frame: brief bright flash of scoring team's color
6. Toast: "⚽ mm' Goal! PlayerName"
7. Ball respawns at center after 800ms

### 8.4 Red Card (Ball Removal)

1. Random ball from affected team freezes
2. Ball flashes red, scales up 1.8x, fades out
3. Red shockwave ring expands from ball position
4. Toast: "🟥 mm' Red Card! PlayerName - Ball removed!"
5. Team plays with one fewer ball for rest of match
6. If team already at 1 ball: red card still recorded for player but no ball removed

### 8.5 Ownership Switch

1. Warning: goal frame pulses 3 times in last 1s
2. Goal frame color transitions (600ms crossfade)
3. Ownership bar updates: dot color, team name, countdown resets to 5s
4. Brief ownership toast appears (1.5s, subtle)

### 8.6 Extra Time

- Timer text turns `#E63946` and pulses (reused from Plinko)
- Timer format: `"90+N'"`
- Gameplay continues normally
- No ownership switch pause

### 8.7 Match End (Freeze)

- Timer stops
- All balls freeze in current position (velocity = 0)
- Goal rotation stops
- Subtle dim overlay fades in: `rgba(0,0,0,0.3)` over 500ms
- 1-second pause, then navigate to Post-Match Summary

### 8.8 Error State

- Not applicable (no network; all computed locally)

---

## 9. Navigation

| Action             | Target                   | Transition              |
|--------------------|--------------------------|-------------------------|
| Match ends         | `/match-summary`         | Push (auto, after 1s)   |
| Hardware back      | Show "Quit Match?" modal | --                      |

### Quit Match Confirmation Modal

Identical to Plinko quit modal. See `docs/designs/plinko-game.md` Section 9.

---

## 10. i18n Key Summary

| Key                          | EN                              | TR                                  | DE                                   | FR                                    |
|------------------------------|---------------------------------|--------------------------------------|--------------------------------------|---------------------------------------|
| `arena.goal`                 | GOAL                            | GOL                                 | TOR                                  | BUT                                   |
| `arena.goalToast`            | {min}' Goal! {player}           | {min}' Gol! {player}                | {min}' Tor! {player}                 | {min}' But! {player}                  |
| `arena.redCardToast`         | {min}' Red Card! {player} - Ball removed! | {min}' Kirmizi Kart! {player} - Top kaldirildi! | {min}' Rote Karte! {player} - Ball entfernt! | {min}' Carton Rouge! {player} - Balle retiree! |
| `arena.ownershipSwitch`      | {team}'s Goal                   | {team} Kalesi                        | {team}s Tor                          | But de {team}                         |
| `arena.ownershipCountdown`   | {seconds}s                      | {seconds}s                           | {seconds}s                           | {seconds}s                            |
| `game.quitTitle`             | Quit Match?                     | Mactan Cik?                          | Spiel beenden?                       | Quitter le match ?                    |
| `game.quitDescription`       | Your progress will be lost.     | Ilerlemeniz kaybolacak.              | Ihr Fortschritt geht verloren.       | Votre progression sera perdue.        |
| `game.quit`                  | QUIT                            | CIK                                 | BEENDEN                              | QUITTER                               |
| `game.continue`              | CONTINUE                        | DEVAM ET                             | WEITER                               | CONTINUER                             |

---

## 11. Responsive Behavior

### Phone (default, < 768px width)

- Arena diameter: `min(screenWidth, playAreaHeight) - 48px`
- Full-screen layout, arena centered
- Ball radius: `8px`
- Goal arc: `45deg`
- Ownership bar: full width minus 48px margins

### Tablet (>= 768px width)

- Max arena container width: `480px`, centered horizontally
- Arena diameter: `480 - 48 = 432px`
- Black bars on sides outside arena container
- Score bar stretches full width, content centered within 480px
- Ball and goal sizes remain the same (physics tuned for these sizes)

### Small phones (< 360px width)

- Arena diameter may shrink — reduce `arenaMargin` to `16px`
- Ball radius stays `8px` (minimum for touch visibility)
- Ownership bar text scales: `12px` font instead of `14px`

---

## 12. Performance Notes

- **Rendering:** Use `react-native-reanimated` worklet-based animations for ball physics (UI thread)
- **Arena boundary:** Render once as a static `View` with border radius (not animated)
- **Goal rotation:** Single animated `View` container wrapping goal elements — only `transform.rotate` updates
- **Ball positions:** Updated via `useAnimatedStyle` driven by shared values (no React re-renders)
- **Collision detection:** Run in worklet — circle boundary check is O(1) per ball, ball-ball is O(n^2) but n=10 is trivial
- **Ownership timer:** `setInterval` in JS thread, ownership state synced to UI via shared value
- **Frame target:** 60 FPS — physics loop at ~16ms intervals

---

## 13. Accessibility

| Element              | Role     | Label                              | Notes                                |
|----------------------|----------|------------------------------------|--------------------------------------|
| Score bar            | `text`   | `"{home} {score} {away}"`          | Live region for score updates        |
| Timer                | `timer`  | `"Match minute {min}"`             | Live region                          |
| Ownership bar        | `text`   | `"{team}'s goal, {seconds} seconds remaining"` | Live region, updates on switch |
| Event toast          | `alert`  | Toast text content                 | `accessibilityLiveRegion: "assertive"` |
| Arena canvas         | `image`  | `"Arena game in progress"`         | Non-interactive (physics sim)        |
| Quit modal           | `alert`  | `game.quitTitle`                   | Focus trap when visible              |

---

## 14. Shared Components (Reuse from Plinko)

These components are identical between Plinko and Arena and should be extracted to `src/components/game/shared/`:

| Component        | Source File                    | Props Interface     |
|------------------|-------------------------------|---------------------|
| `ScoreBar`       | `components/game/ScoreBar`    | `{ homeTeam, awayTeam, homeScore, awayScore, currentMinute, isExtraTime }` |
| `TimerDisplay`   | `components/game/TimerDisplay`| `{ currentMinute, isExtraTime, extraTimeAmount }` |
| `TeamBadge`      | `components/game/TeamBadge`   | `{ teamName, color, size }` |
| `EventToast`     | `components/game/EventToast`  | `{ event: MatchEvent, variant: 'goal' \| 'redCard' }` |
| `QuitMatchModal` | `components/game/QuitMatchModal` | `{ visible, onQuit, onContinue }` |
