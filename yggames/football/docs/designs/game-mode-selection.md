# Game Mode Selection — Screen Design Spec

> **GDD Reference:** Section 3.3
> **Route:** `/game-mode-selection`
> **Status:** Design Complete

---

## 1. Screen Layout (ASCII Wireframe)

```
┌──────────────────────────────────┐
│  ←        CHOOSE MODE           │  ← Header with back arrow
├──────────────────────────────────┤
│                                  │
│     ┌──────┐  VS  ┌──────┐     │  ← VS Header
│     │  MC  │      │  AR  │     │
│     │ Man  │      │ Ars  │     │
│     └──────┘      └──────┘     │
│                                  │
├──────────────────────────────────┤
│                                  │
│  ┌────────────────────────────┐  │
│  │  🎱  PLINKO               │  │  ← Active mode card
│  │  Drop balls through pegs  │  │
│  │  and score goals!         │  │
│  │                    ▶      │  │
│  └────────────────────────────┘  │
│                                  │
│  ┌────────────────────────────┐  │
│  │  🔒  ARENA                │  │  ← Coming soon (disabled)
│  │  Coming Soon              │  │
│  └────────────────────────────┘  │
│                                  │
│  ┌────────────────────────────┐  │
│  │  🔒  PENALTY SHOOTOUT     │  │  ← Coming soon (disabled)
│  │  Coming Soon              │  │
│  └────────────────────────────┘  │
│                                  │
└──────────────────────────────────┘
```

---

## 2. Component Hierarchy

```
GameModeSelectionScreen
├── SafeAreaView (flex: 1, bg: background)
│   ├── Header
│   │   ├── BackButton (← icon)
│   │   └── HeaderTitle ("CHOOSE MODE")
│   │
│   ├── VSHeader
│   │   ├── TeamBadge (Home — from matchStore)
│   │   ├── VSText ("VS")
│   │   └── TeamBadge (Away — from matchStore)
│   │
│   └── ModeList (ScrollView)
│       ├── ModeCard ("Plinko") [active]
│       │   ├── ModeIcon
│       │   ├── ModeInfo
│       │   │   ├── ModeTitle
│       │   │   └── ModeDescription
│       │   └── PlayArrow (▶)
│       │
│       ├── ModeCard ("Arena") [disabled]
│       │   ├── LockIcon (🔒)
│       │   ├── ModeInfo
│       │   │   ├── ModeTitle
│       │   │   └── ComingSoonLabel
│       │   └── LockOverlay
│       │
│       └── ModeCard ("Penalty Shootout") [disabled]
│           ├── LockIcon (🔒)
│           ├── ModeInfo
│           │   ├── ModeTitle
│           │   └── ComingSoonLabel
│           └── LockOverlay
```

---

## 3. Component Specifications

### 3.1 Header

| Property           | Value                              |
|--------------------|------------------------------------|
| `height`           | `56`                               |
| `flexDirection`    | `row`                              |
| `alignItems`       | `center`                           |
| `paddingHorizontal`| `Spacing.md (16)`                  |
| `backgroundColor`  | `#0d2818` (Colors.background)      |

#### BackButton

| Property     | Value                              |
|--------------|------------------------------------|
| Size         | `44 × 44` (touch target)           |
| Icon         | `←` chevron, `24 × 24`            |
| Icon color   | `#A8DABC` (Colors.textSecondary)   |
| Pressed      | color → `#FFFFFF`, scale `0.95`    |

**Navigation:** `router.back()` → Team Selection

#### HeaderTitle

| Property     | Value                              |
|--------------|------------------------------------|
| Font size    | `20` (Typography.heading3)         |
| Font weight  | `600`                              |
| Color        | `#FFFFFF` (Colors.textPrimary)     |
| `marginLeft` | `Spacing.sm (8)`                   |

**i18n:**

| Key                        | EN          | TR           | DE            | FR              |
|----------------------------|-------------|--------------|---------------|-----------------|
| `gameModes.title`          | CHOOSE MODE | MOD SEÇ      | MODUS WÄHLEN  | CHOISIR LE MODE |

---

### 3.2 VSHeader

| Property           | Value                              |
|--------------------|------------------------------------|
| `flexDirection`    | `row`                              |
| `alignItems`       | `center`                           |
| `justifyContent`   | `center`                           |
| `paddingVertical`  | `Spacing.lg (24)`                  |
| `paddingHorizontal`| `Spacing.xl (32)`                  |
| `backgroundColor`  | `#1a472a` (Colors.surface)         |
| `borderBottomWidth`| `1`                                |
| `borderBottomColor`| `#2d6a4f` (Colors.border)          |
| `gap`              | `Spacing.lg (24)`                  |

#### TeamBadge (in VSHeader)

| Property        | Value                              |
|-----------------|------------------------------------|
| `alignItems`    | `center`                           |
| `gap`           | `Spacing.sm (8)`                   |

**Badge Circle:**

| Property        | Value                              |
|-----------------|------------------------------------|
| Size            | `56 × 56`                          |
| `borderRadius`  | `28` (circle)                      |
| `backgroundColor`| Team primary color or fallback `#2d6a4f` |
| `borderWidth`   | `2`                                |
| `borderColor`   | `#FFC72C` (home) or `#E63946` (away) |

**Initials:**

| Property     | Value                              |
|--------------|------------------------------------|
| Font size    | `20` (Typography.heading3)         |
| Font weight  | `700`                              |
| Color        | `#FFFFFF`                          |

**Team Name:**

| Property     | Value                              |
|--------------|------------------------------------|
| Font size    | `14` (Typography.caption)          |
| Font weight  | `400`                              |
| Color        | `#A8DABC` (Colors.textSecondary)   |
| `numberOfLines`| `1`                              |

#### VSText

| Property     | Value                              |
|--------------|------------------------------------|
| Font size    | `32` (Typography.heading1)         |
| Font weight  | `700`                              |
| Color        | `#6B9080` (Colors.textMuted)       |

---

### 3.3 ModeList

| Property           | Value                              |
|--------------------|------------------------------------|
| Component          | `ScrollView`                       |
| `flex`             | `1`                                |
| `contentContainerStyle.padding` | `Spacing.md (16)` |
| `contentContainerStyle.gap` | `Spacing.md (16)`    |

---

### 3.4 ModeCard — Active (Plinko)

| Property             | Value                               |
|----------------------|-------------------------------------|
| `flexDirection`      | `row`                               |
| `alignItems`         | `center`                            |
| `backgroundColor`    | `#1a472a` (Colors.surface)          |
| `borderRadius`       | `16`                                |
| `borderWidth`        | `1.5`                               |
| `borderColor`        | `#7dcea0` (Colors.primary)          |
| `padding`            | `Spacing.md (16)`                   |
| `minHeight`          | `96`                                |
| Shadow (iOS)         | `shadowColor: #7dcea0, shadowOffset: {0, 2}, shadowOpacity: 0.15, shadowRadius: 8` |
| Shadow (Android)     | `elevation: 3`                      |

#### ModeIcon (Active)

| Property     | Value                              |
|--------------|------------------------------------|
| Size         | `48 × 48`                          |
| Container    | `56 × 56`, `borderRadius: 14`, bg `rgba(125,206,160,0.15)` |
| Color / tint | `#7dcea0` (Colors.primary)         |
| `marginRight`| `Spacing.md (16)`                  |
| Asset        | Football/plinko icon (bundled SVG) |

#### ModeInfo

| Property     | Value                              |
|--------------|------------------------------------|
| `flex`       | `1`                                |
| `gap`        | `Spacing.xs (4)`                   |

**ModeTitle:**

| Property     | Value                              |
|--------------|------------------------------------|
| Font size    | `20` (Typography.heading3)         |
| Font weight  | `600`                              |
| Color        | `#FFFFFF` (Colors.textPrimary)     |

**ModeDescription:**

| Property     | Value                              |
|--------------|------------------------------------|
| Font size    | `14` (Typography.caption)          |
| Font weight  | `400`                              |
| Color        | `#A8DABC` (Colors.textSecondary)   |
| `numberOfLines`| `2`                              |

#### PlayArrow

| Property     | Value                              |
|--------------|------------------------------------|
| Size         | `24 × 24`                          |
| Icon         | `▶` or `chevron-right`             |
| Color        | `#7dcea0` (Colors.primary)         |
| `marginLeft` | `Spacing.sm (8)`                   |

**States:**

| State    | Border color | Background    | Scale  |
|----------|-------------|---------------|--------|
| Default  | `#7dcea0`   | `#1a472a`     | `1.0`  |
| Pressed  | `#52b788`   | `#2d6a4f`     | `0.97` |

**Press animation:**
```typescript
const scale = useSharedValue(1);
const onPressIn = () => { scale.value = withTiming(0.97, { duration: 80 }); };
const onPressOut = () => { scale.value = withTiming(1.0, { duration: 120 }); };
```

**Navigation:** `router.push('/game/plinko')`

**i18n:**

| Key                        | EN                                   | TR                                    | DE                                        | FR                                      |
|----------------------------|--------------------------------------|---------------------------------------|-------------------------------------------|-----------------------------------------|
| `gameModes.plinko`         | PLINKO                               | PLINKO                                | PLINKO                                    | PLINKO                                  |
| `gameModes.plinkoDesc`     | Drop balls through pegs and score goals! | Topları çivilerden geçir ve gol at! | Lass Bälle durch Stifte fallen und erziele Tore! | Lâchez les balles à travers les clous et marquez! |

---

### 3.5 ModeCard — Disabled (Coming Soon)

| Property             | Value                               |
|----------------------|-------------------------------------|
| `flexDirection`      | `row`                               |
| `alignItems`         | `center`                            |
| `backgroundColor`    | `rgba(26,71,42,0.5)` (surface @ 50% opacity) |
| `borderRadius`       | `16`                                |
| `borderWidth`        | `1`                                 |
| `borderColor`        | `#2d6a4f` (Colors.border)           |
| `padding`            | `Spacing.md (16)`                   |
| `minHeight`          | `80`                                |
| `opacity`            | `0.6`                               |
| Touchable            | **No** — not wrapped in Pressable   |

#### LockIcon

| Property     | Value                              |
|--------------|------------------------------------|
| Size         | `48 × 48`                          |
| Container    | `56 × 56`, `borderRadius: 14`, bg `rgba(75,75,75,0.2)` |
| Icon         | `🔒` lock, `28 × 28`              |
| Color        | `#6B9080` (Colors.textMuted)       |
| `marginRight`| `Spacing.md (16)`                  |

#### ModeTitle (Disabled)

| Property     | Value                              |
|--------------|------------------------------------|
| Font size    | `20` (Typography.heading3)         |
| Font weight  | `600`                              |
| Color        | `#6B9080` (Colors.textMuted)       |

#### ComingSoonLabel

| Property     | Value                              |
|--------------|------------------------------------|
| Font size    | `14` (Typography.caption)          |
| Font weight  | `400`                              |
| Color        | `#4a4a4a` (Colors.disabled)        |

**i18n:**

| Key                        | EN               | TR             | DE              | FR               |
|----------------------------|------------------|----------------|-----------------|------------------|
| `gameModes.arena`          | ARENA            | ARENA          | ARENA           | ARÈNE            |
| `gameModes.penaltyShootout`| PENALTY SHOOTOUT | PENALTI ATIŞI  | ELFMETERSCHIESSEN | TIRS AU BUT    |
| `gameModes.comingSoon`     | Coming Soon      | Yakında        | Demnächst       | Bientôt          |

---

## 4. Full Layout Spec (StyleSheet)

```typescript
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0d2818',
  },
  header: {
    height: 56,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  backButton: {
    width: 44,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#FFFFFF',
    marginLeft: 8,
  },
  vsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 24,
    paddingHorizontal: 32,
    backgroundColor: '#1a472a',
    borderBottomWidth: 1,
    borderBottomColor: '#2d6a4f',
    gap: 24,
  },
  teamBadgeContainer: {
    alignItems: 'center',
    gap: 8,
  },
  teamBadgeCircle: {
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
  },
  teamBadgeCircleHome: {
    borderColor: '#FFC72C',
  },
  teamBadgeCircleAway: {
    borderColor: '#E63946',
  },
  teamBadgeInitials: {
    fontSize: 20,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  teamBadgeName: {
    fontSize: 14,
    fontWeight: '400',
    color: '#A8DABC',
  },
  vsText: {
    fontSize: 32,
    fontWeight: '700',
    color: '#6B9080',
  },
  modeList: {
    flex: 1,
  },
  modeListContent: {
    padding: 16,
    gap: 16,
  },
  modeCardActive: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1a472a',
    borderRadius: 16,
    borderWidth: 1.5,
    borderColor: '#7dcea0',
    padding: 16,
    minHeight: 96,
    // iOS
    shadowColor: '#7dcea0',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    // Android
    elevation: 3,
  },
  modeCardDisabled: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(26,71,42,0.5)',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#2d6a4f',
    padding: 16,
    minHeight: 80,
    opacity: 0.6,
  },
  modeIconContainer: {
    width: 56,
    height: 56,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  modeIconContainerActive: {
    backgroundColor: 'rgba(125,206,160,0.15)',
  },
  modeIconContainerDisabled: {
    backgroundColor: 'rgba(75,75,75,0.2)',
  },
  modeInfo: {
    flex: 1,
    gap: 4,
  },
  modeTitleActive: {
    fontSize: 20,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  modeTitleDisabled: {
    fontSize: 20,
    fontWeight: '600',
    color: '#6B9080',
  },
  modeDescription: {
    fontSize: 14,
    fontWeight: '400',
    color: '#A8DABC',
  },
  comingSoonLabel: {
    fontSize: 14,
    fontWeight: '400',
    color: '#4a4a4a',
  },
  playArrow: {
    marginLeft: 8,
  },
});
```

---

## 5. Animations

### 5.1 VS Header Entry

```typescript
// Team badges slide in from sides
const homeTranslateX = useSharedValue(-40);
const awayTranslateX = useSharedValue(40);
const opacity = useSharedValue(0);

useEffect(() => {
  homeTranslateX.value = withTiming(0, { duration: 400, easing: Easing.out(Easing.cubic) });
  awayTranslateX.value = withTiming(0, { duration: 400, easing: Easing.out(Easing.cubic) });
  opacity.value = withTiming(1, { duration: 400 });
}, []);
```

### 5.2 Mode Cards Stagger In

```typescript
// Cards fade in + slide up with stagger
const entering = FadeInUp.delay(index * 100).duration(300).easing(Easing.out(Easing.cubic));
```

### 5.3 Active Card Press

```typescript
const scale = useSharedValue(1);
const onPressIn = () => { scale.value = withTiming(0.97, { duration: 80 }); };
const onPressOut = () => { scale.value = withTiming(1.0, { duration: 120 }); };
```

---

## 6. State Variations

### 6.1 Default (Happy Path)
- VS header shows both selected teams from matchStore
- Plinko card: active, tappable with green accent border
- Coming Soon cards: greyed out, lock icon, not tappable

### 6.2 No Teams in Store (Edge Case)
- Should not happen (navigation guard — redirect back to team selection)
- Defensive: show placeholder badges with "?" initials

### 6.3 Loading
- Not applicable (no async data on this screen)

### 6.4 Error
- Not applicable (static screen, no network calls)

---

## 7. Navigation

| Action               | Target                   | Transition              |
|----------------------|--------------------------|-------------------------|
| Tap ← (back)        | `/team-selection`        | Pop (slide left)        |
| Tap Plinko card      | `/game/plinko`           | Push (slide from right) |
| Tap Coming Soon card | No action                | —                       |
| Hardware back        | `/team-selection`        | Pop (slide left)        |

---

## 8. i18n Key Summary

| Key                          | EN                                     | TR                                    | DE                                          | FR                                        |
|------------------------------|----------------------------------------|---------------------------------------|---------------------------------------------|-------------------------------------------|
| `gameModes.title`            | CHOOSE MODE                            | MOD SEÇ                              | MODUS WÄHLEN                                | CHOISIR LE MODE                           |
| `gameModes.plinko`           | PLINKO                                 | PLINKO                                | PLINKO                                      | PLINKO                                    |
| `gameModes.plinkoDesc`       | Drop balls through pegs and score goals! | Topları çivilerden geçir ve gol at! | Lass Bälle durch Stifte fallen und erziele Tore! | Lâchez les balles à travers les clous et marquez! |
| `gameModes.arena`            | ARENA                                  | ARENA                                 | ARENA                                       | ARÈNE                                     |
| `gameModes.penaltyShootout`  | PENALTY SHOOTOUT                       | PENALTI ATIŞI                         | ELFMETERSCHIESSEN                           | TIRS AU BUT                               |
| `gameModes.comingSoon`       | Coming Soon                            | Yakında                               | Demnächst                                   | Bientôt                                   |

---

## 9. Responsive Notes

### Phone (default, < 768px width)
- Layout as specified above
- Mode cards: full width with `marginHorizontal: 16`

### Tablet (>= 768px width)
- Max content width: `560px` wrapper, centered
- VS header badges could scale to `64 × 64`
- Mode cards remain single-column list (not a grid — few items)

---

## 10. Accessibility

| Element            | Role       | Label (i18n key)          | Hint / State                     |
|--------------------|------------|---------------------------|----------------------------------|
| Back button        | `button`   | `common.back`             | Go back to team selection        |
| Home team badge    | `image`    | `{homeTeam.name}`         | Home team                        |
| Away team badge    | `image`    | `{awayTeam.name}`         | Away team                        |
| Plinko card        | `button`   | `gameModes.plinko`        | Start Plinko game                |
| Arena card         | `text`     | `gameModes.arena`         | `accessibilityState: { disabled: true }` |
| Penalty card       | `text`     | `gameModes.penaltyShootout` | `accessibilityState: { disabled: true }` |
