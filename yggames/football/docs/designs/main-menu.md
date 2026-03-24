# Main Menu — Screen Design Spec

> **GDD Reference:** Section 3.1
> **Route:** `/` (index)
> **Status:** Design Complete

---

## 1. Screen Layout (ASCII Wireframe)

```
┌──────────────────────────────────┐
│            (StatusBar)           │  ← System status bar area
├──────────────────────────────────┤
│                                  │
│         ⚙ (Settings)            │  ← Top-right gear icon
│                                  │
│                                  │
│            ⚽                    │  ← Animated football icon
│       YG FOOTBALL               │  ← App title (heading1)
│                                  │
│                                  │
│                                  │
│    ┌──────────────────────┐      │
│    │     START MATCH      │      │  ← Primary CTA button
│    └──────────────────────┘      │
│                                  │
│    ┌──────────────────────┐      │
│    │      SETTINGS        │      │  ← Secondary button
│    └──────────────────────┘      │
│                                  │
│                                  │
│         YG Games                 │  ← Credit text
│          v1.0.0                  │  ← Version number
│                                  │
└──────────────────────────────────┘
```

---

## 2. Component Hierarchy

```
MainMenuScreen
├── SafeAreaView (flex: 1, bg: background)
│   ├── SettingsButton                          ← Top-right absolute
│   │   └── Pressable
│   │       └── SettingsIcon (⚙ / gear SVG)
│   │
│   ├── ContentContainer (flex: 1, center)
│   │   ├── LogoSection
│   │   │   ├── FootballIcon (animated)         ← Bouncing football
│   │   │   └── AppTitle ("YG FOOTBALL")
│   │   │
│   │   └── ButtonSection
│   │       ├── PrimaryButton ("START MATCH")
│   │       └── SecondaryButton ("SETTINGS")
│   │
│   └── FooterSection
│       ├── CreditText ("YG Games")
│       └── VersionText ("v1.0.0")
```

---

## 3. Component Specifications

### 3.1 SafeAreaView (ScreenContainer)

| Property      | Value                          |
|---------------|--------------------------------|
| `flex`        | `1`                            |
| `backgroundColor` | `#0d2818` (Colors.background) |

---

### 3.2 SettingsButton

| Property         | Value                                   |
|------------------|-----------------------------------------|
| Position         | `absolute`, `top: Spacing.md (16)`, `right: Spacing.md (16)` |
| Touch target     | `48 × 48` (minTouchTarget: 44pt met)   |
| Icon size        | `24 × 24`                               |
| Icon color       | `#A8DABC` (Colors.textSecondary)        |
| Hit slop         | `{ top: 12, bottom: 12, left: 12, right: 12 }` |

**States:**

| State    | Icon color   | Scale   |
|----------|-------------|---------|
| Default  | `#A8DABC`   | `1.0`   |
| Pressed  | `#FFFFFF`   | `0.95`  |
| Disabled | `#4a4a4a`   | `1.0`   |

**i18n:**

| Key                      | EN          | TR          | DE              | FR             |
|--------------------------|-------------|-------------|-----------------|----------------|
| `mainMenu.settings`      | Settings    | Ayarlar     | Einstellungen   | Paramètres     |

**Accessibility:**
- `accessibilityLabel`: i18n key `mainMenu.settings`
- `accessibilityRole`: `"button"`

---

### 3.3 LogoSection

| Property         | Value                          |
|------------------|--------------------------------|
| `alignItems`     | `center`                       |
| `marginBottom`   | `Spacing.xxl (48)`             |

#### 3.3.1 FootballIcon

| Property         | Value                          |
|------------------|--------------------------------|
| Size             | `80 × 80`                      |
| Source           | Bundled football asset (SVG or PNG) |
| `marginBottom`   | `Spacing.md (16)`              |
| Tint color       | `#7dcea0` (Colors.primary)     |

**Animation (react-native-reanimated):**
- Type: Continuous subtle bounce
- `translateY`: `withRepeat(withSequence(withTiming(-8, { duration: 1000 }), withTiming(0, { duration: 1000 })), -1, true)`
- Easing: `Easing.inOut(Easing.ease)`

#### 3.3.2 AppTitle

| Property         | Value                              |
|------------------|------------------------------------|
| Text             | i18n: `mainMenu.appTitle`          |
| Font size        | `32` (Typography.heading1)         |
| Font weight      | `700`                              |
| Color            | `#FFFFFF` (Colors.textPrimary)     |
| Letter spacing   | `4`                                |
| Text transform   | `uppercase`                        |
| `textAlign`      | `center`                           |

**i18n:**

| Key                   | EN            | TR            | DE            | FR            |
|-----------------------|---------------|---------------|---------------|---------------|
| `mainMenu.appTitle`   | YG FOOTBALL   | YG FOOTBALL   | YG FOOTBALL   | YG FOOTBALL   |

> Note: App title remains constant across locales.

---

### 3.4 ButtonSection

| Property         | Value                          |
|------------------|--------------------------------|
| `width`          | `100%`                         |
| `paddingHorizontal` | `Spacing.xl (32)`          |
| `gap`            | `Spacing.md (16)`              |
| `alignItems`     | `center`                       |

#### 3.4.1 PrimaryButton ("START MATCH")

| Property             | Value                               |
|----------------------|-------------------------------------|
| `width`              | `100%`                              |
| `maxWidth`           | `320`                               |
| `height`             | `56`                                |
| `backgroundColor`    | `#7dcea0` (Colors.primary)          |
| `borderRadius`       | `12`                                |
| `alignItems`         | `center`                            |
| `justifyContent`     | `center`                            |
| Shadow (iOS)         | `shadowColor: #7dcea0, shadowOffset: {0, 4}, shadowOpacity: 0.3, shadowRadius: 8` |
| Shadow (Android)     | `elevation: 6`                      |

**Text:**

| Property         | Value                              |
|------------------|------------------------------------|
| Font size        | `20` (Typography.heading3)         |
| Font weight      | `600`                              |
| Color            | `#0d2818` (Colors.background)      |
| Letter spacing   | `2`                                |
| Text transform   | `uppercase`                        |

**States:**

| State    | Background  | Text color | Scale  | Shadow           |
|----------|-------------|------------|--------|------------------|
| Default  | `#7dcea0`   | `#0d2818`  | `1.0`  | Normal           |
| Pressed  | `#52b788`   | `#0d2818`  | `0.95` | Reduced (opacity 0.15) |
| Disabled | `#4a4a4a`   | `#6B9080`  | `1.0`  | None             |

**Press animation (react-native-reanimated):**
```typescript
const scale = useSharedValue(1);
const onPressIn = () => { scale.value = withTiming(0.95, { duration: 100 }); };
const onPressOut = () => { scale.value = withTiming(1, { duration: 150 }); };
```

**i18n:**

| Key                     | EN           | TR             | DE              | FR                |
|-------------------------|--------------|----------------|-----------------|-------------------|
| `mainMenu.startMatch`   | START MATCH  | MAÇA BAŞLA     | SPIEL STARTEN   | COMMENCER MATCH   |

**Navigation:** `router.push('/team-selection')`

---

#### 3.4.2 SecondaryButton ("SETTINGS")

| Property             | Value                               |
|----------------------|-------------------------------------|
| `width`              | `100%`                              |
| `maxWidth`           | `320`                               |
| `height`             | `48`                                |
| `backgroundColor`    | `transparent`                       |
| `borderWidth`        | `1.5`                               |
| `borderColor`        | `#2d6a4f` (Colors.border)           |
| `borderRadius`       | `12`                                |
| `alignItems`         | `center`                            |
| `justifyContent`     | `center`                            |

**Text:**

| Property         | Value                              |
|------------------|------------------------------------|
| Font size        | `16` (Typography.bodyBold)         |
| Font weight      | `600`                              |
| Color            | `#A8DABC` (Colors.textSecondary)   |
| Letter spacing   | `1.5`                              |
| Text transform   | `uppercase`                        |

**States:**

| State    | Border color | Text color | Background        | Scale  |
|----------|-------------|------------|-------------------|--------|
| Default  | `#2d6a4f`   | `#A8DABC`  | `transparent`     | `1.0`  |
| Pressed  | `#52b788`   | `#FFFFFF`  | `rgba(45,106,79,0.15)` | `0.95` |
| Disabled | `#4a4a4a`   | `#6B9080`  | `transparent`     | `1.0`  |

**i18n:**

| Key                    | EN        | TR       | DE              | FR            |
|------------------------|-----------|----------|-----------------|---------------|
| `mainMenu.settings`    | SETTINGS  | AYARLAR  | EINSTELLUNGEN   | PARAMÈTRES    |

**Navigation:** `router.push('/settings')`

---

### 3.5 FooterSection

| Property         | Value                          |
|------------------|--------------------------------|
| `alignItems`     | `center`                       |
| `paddingBottom`  | `Spacing.lg (24)`              |
| `gap`            | `Spacing.xs (4)`               |

#### 3.5.1 CreditText

| Property         | Value                              |
|------------------|------------------------------------|
| Text             | `"YG Games"`                       |
| Font size        | `14` (Typography.caption)          |
| Font weight      | `400`                              |
| Color            | `#6B9080` (Colors.textMuted)       |

#### 3.5.2 VersionText

| Property         | Value                              |
|------------------|------------------------------------|
| Text             | `"v1.0.0"` (from app config)       |
| Font size        | `12` (Typography.small)            |
| Font weight      | `400`                              |
| Color            | `#6B9080` (Colors.textMuted)       |

---

## 4. Full Layout Spec (StyleSheet)

```typescript
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0d2818', // Colors.background
  },
  settingsButton: {
    position: 'absolute',
    top: 16,   // Spacing.md
    right: 16, // Spacing.md
    width: 48,
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 10,
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 32, // Spacing.xl
  },
  logoSection: {
    alignItems: 'center',
    marginBottom: 48, // Spacing.xxl
  },
  footballIcon: {
    width: 80,
    height: 80,
    marginBottom: 16, // Spacing.md
  },
  appTitle: {
    fontSize: 32,
    fontWeight: '700',
    color: '#FFFFFF',
    letterSpacing: 4,
    textTransform: 'uppercase',
    textAlign: 'center',
  },
  buttonSection: {
    width: '100%',
    alignItems: 'center',
    gap: 16, // Spacing.md
  },
  primaryButton: {
    width: '100%',
    maxWidth: 320,
    height: 56,
    backgroundColor: '#7dcea0',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    // iOS shadow
    shadowColor: '#7dcea0',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    // Android shadow
    elevation: 6,
  },
  primaryButtonText: {
    fontSize: 20,
    fontWeight: '600',
    color: '#0d2818',
    letterSpacing: 2,
    textTransform: 'uppercase',
  },
  secondaryButton: {
    width: '100%',
    maxWidth: 320,
    height: 48,
    backgroundColor: 'transparent',
    borderWidth: 1.5,
    borderColor: '#2d6a4f',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  secondaryButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#A8DABC',
    letterSpacing: 1.5,
    textTransform: 'uppercase',
  },
  footerSection: {
    alignItems: 'center',
    paddingBottom: 24, // Spacing.lg
    gap: 4,            // Spacing.xs
  },
  creditText: {
    fontSize: 14,
    fontWeight: '400',
    color: '#6B9080',
  },
  versionText: {
    fontSize: 12,
    fontWeight: '400',
    color: '#6B9080',
  },
});
```

---

## 5. Animations

### 5.1 Football Icon Bounce

```typescript
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withSequence,
  withTiming,
  Easing,
} from 'react-native-reanimated';

// In component:
const translateY = useSharedValue(0);

useEffect(() => {
  translateY.value = withRepeat(
    withSequence(
      withTiming(-8, { duration: 1000, easing: Easing.inOut(Easing.ease) }),
      withTiming(0, { duration: 1000, easing: Easing.inOut(Easing.ease) })
    ),
    -1, // infinite
    true
  );
}, []);

const animatedStyle = useAnimatedStyle(() => ({
  transform: [{ translateY: translateY.value }],
}));
```

### 5.2 Button Press Scale

```typescript
const scale = useSharedValue(1);

const onPressIn = () => {
  scale.value = withTiming(0.95, { duration: 100 });
};

const onPressOut = () => {
  scale.value = withTiming(1.0, { duration: 150 });
};

const animatedButtonStyle = useAnimatedStyle(() => ({
  transform: [{ scale: scale.value }],
}));
```

### 5.3 Screen Entry Animation

```typescript
// Fade in + slide up on mount
const opacity = useSharedValue(0);
const translateY = useSharedValue(20);

useEffect(() => {
  opacity.value = withTiming(1, { duration: 600 });
  translateY.value = withTiming(0, { duration: 600, easing: Easing.out(Easing.cubic) });
}, []);
```

---

## 6. State Variations

### 6.1 Default (Happy Path)

Standard layout as described above. All elements visible and interactive.

### 6.2 Loading

Not applicable — Main Menu is the entry screen with no async data dependencies.

### 6.3 Error

Not applicable — no network calls or data loading on this screen.

### 6.4 Settings Button Disabled

When: N/A for MVP (settings always accessible).

---

## 7. Navigation

| Action              | Target                   | Transition              |
|---------------------|--------------------------|-------------------------|
| Tap "START MATCH"   | `/team-selection`        | Push (slide from right) |
| Tap "SETTINGS"      | `/settings`              | Push (slide from right) |
| Back (hardware)     | Exit app (Android)       | System default          |

---

## 8. i18n Key Summary

| Key                    | EN            | TR             | DE              | FR                |
|------------------------|---------------|----------------|-----------------|-------------------|
| `mainMenu.appTitle`    | YG FOOTBALL   | YG FOOTBALL    | YG FOOTBALL     | YG FOOTBALL       |
| `mainMenu.startMatch`  | START MATCH   | MAÇA BAŞLA     | SPIEL STARTEN   | COMMENCER MATCH   |
| `mainMenu.settings`    | SETTINGS      | AYARLAR        | EINSTELLUNGEN   | PARAMÈTRES        |
| `mainMenu.credit`      | YG Games      | YG Games       | YG Games        | YG Games          |

---

## 9. Responsive Notes

### Phone (default, < 768px width)
- Layout as specified above
- Button `maxWidth: 320` prevents over-stretching on wider phones
- Content vertically centered

### Tablet (>= 768px width)
- Same layout, content remains centered
- Consider `maxWidth: 480` wrapper on `contentContainer` to prevent excessive stretching
- Button sizes remain the same (touch targets already adequate)
- Football icon could scale to `96 × 96`

---

## 10. Accessibility

| Element         | Role     | Label (i18n key)       | Hint                              |
|-----------------|----------|------------------------|-----------------------------------|
| START MATCH btn | `button` | `mainMenu.startMatch`  | Navigate to team selection        |
| SETTINGS btn    | `button` | `mainMenu.settings`    | Open settings                     |
| Settings icon   | `button` | `mainMenu.settings`    | Open settings                     |
| Football icon   | `image`  | `mainMenu.appTitle`    | Decorative (accessibilityElementsHidden) |
