# Team Selection — Screen Design Spec

> **GDD Reference:** Section 3.2
> **Route:** `/team-selection`
> **Status:** Design Complete

---

## 1. Screen Layout (ASCII Wireframe)

```
┌──────────────────────────────────┐
│  ←  SELECT YOUR TEAMS           │  ← Header with back arrow
├──────────────────────────────────┤
│  🔍 Search teams...             │  ← Search bar
├──────────────────────────────────┤
│ [All] [PL] [LaLiga] [SerA] [Bu] │  ← League tabs (horizontal scroll)
├──────────────────────────────────┤
│                                  │
│  ┌────┐  ┌────┐  ┌────┐         │
│  │ MC │  │ AR │  │ CH │         │  ← Team grid (3 columns)
│  │    │  │    │  │    │         │
│  │Man │  │Ars │  │Che │         │
│  └────┘  └────┘  └────┘         │
│  ┌────┐  ┌────┐  ┌────┐         │
│  │ LI │  │ TO │  │ NE │         │
│  │    │  │    │  │    │         │
│  │Liv │  │Tot │  │New │         │
│  └────┘  └────┘  └────┘         │
│  ...                             │
│                                  │
├──────────────────────────────────┤
│  ┌──────┐   VS   ┌──────┐      │  ← Selection bar (fixed bottom)
│  │ HOME │        │ AWAY │      │
│  │ ---- │        │ ---- │      │
│  └──────┘        └──────┘      │
│       [ CONTINUE → ]            │  ← Disabled until both selected
└──────────────────────────────────┘
```

---

## 2. Component Hierarchy

```
TeamSelectionScreen
├── SafeAreaView (flex: 1, bg: background)
│   ├── Header
│   │   ├── BackButton (← icon)
│   │   └── HeaderTitle ("SELECT YOUR TEAMS")
│   │
│   ├── SearchBar
│   │   ├── SearchIcon (🔍)
│   │   └── TextInput (placeholder: "Search teams...")
│   │
│   ├── LeagueFilterBar (horizontal ScrollView)
│   │   ├── LeaguePill ("All Leagues") [active by default]
│   │   ├── LeaguePill ("Premier League")
│   │   ├── LeaguePill ("La Liga")
│   │   ├── LeaguePill ("Serie A")
│   │   ├── LeaguePill ("Bundesliga")
│   │   └── LeaguePill ("Süper Lig")
│   │
│   ├── TeamGrid (FlatList, numColumns: 3)
│   │   └── TeamCard (repeated)
│   │       ├── TeamBadge (initials circle)
│   │       ├── TeamName
│   │       └── SelectionOverlay (checkmark, conditional)
│   │
│   └── SelectionBar (fixed bottom)
│       ├── SlotRow
│       │   ├── TeamSlot ("HOME")
│       │   ├── VSDivider ("VS")
│       │   └── TeamSlot ("AWAY")
│       └── ContinueButton
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
| `borderBottomWidth`| `1`                                |
| `borderBottomColor`| `#2d6a4f` (Colors.border)          |

#### BackButton

| Property     | Value                              |
|--------------|------------------------------------|
| Size         | `44 × 44` (touch target)           |
| Icon         | `←` chevron, `24 × 24`            |
| Icon color   | `#A8DABC` (Colors.textSecondary)   |
| Pressed      | color → `#FFFFFF`, scale `0.95`    |

**Navigation:** `router.back()`

#### HeaderTitle

| Property     | Value                              |
|--------------|------------------------------------|
| Font size    | `20` (Typography.heading3)         |
| Font weight  | `600`                              |
| Color        | `#FFFFFF` (Colors.textPrimary)     |
| `marginLeft` | `Spacing.sm (8)`                   |

**i18n:**

| Key                        | EN                | TR               | DE                 | FR                   |
|----------------------------|-------------------|------------------|--------------------|----------------------|
| `teamSelection.title`      | SELECT YOUR TEAMS | TAKIMLARI SEÇ   | TEAMS AUSWÄHLEN    | SÉLECTIONNER ÉQUIPES |

---

### 3.2 SearchBar

| Property           | Value                              |
|--------------------|------------------------------------|
| `height`           | `44`                               |
| `marginHorizontal` | `Spacing.md (16)`                 |
| `marginVertical`   | `Spacing.sm (8)`                  |
| `backgroundColor`  | `#1a472a` (Colors.surface)         |
| `borderRadius`     | `10`                               |
| `flexDirection`    | `row`                              |
| `alignItems`       | `center`                           |
| `paddingHorizontal`| `Spacing.sm (8)`                   |

#### SearchIcon

| Property     | Value                              |
|--------------|------------------------------------|
| Size         | `20 × 20`                          |
| Color        | `#6B9080` (Colors.textMuted)       |
| `marginRight`| `Spacing.sm (8)`                   |

#### TextInput

| Property       | Value                              |
|----------------|------------------------------------|
| `flex`         | `1`                                |
| Font size      | `16` (Typography.body)             |
| Color          | `#FFFFFF` (Colors.textPrimary)     |
| Placeholder    | i18n: `teamSelection.searchPlaceholder` |
| PlaceholderColor | `#6B9080` (Colors.textMuted)     |
| `returnKeyType`| `"search"`                         |
| `autoCorrect`  | `false`                            |

**i18n:**

| Key                                | EN             | TR              | DE              | FR                 |
|------------------------------------|----------------|-----------------|-----------------|--------------------|
| `teamSelection.searchPlaceholder`  | Search teams…  | Takım ara…      | Teams suchen…   | Rechercher…        |

**Behavior:**
- Filters team grid in real-time as user types
- Debounce: 200ms
- Clear button (✕) appears when text is non-empty
- Empty search = show all teams in selected league

---

### 3.3 LeagueFilterBar

| Property           | Value                              |
|--------------------|------------------------------------|
| `height`           | `48`                               |
| `paddingHorizontal`| `Spacing.md (16)`                  |
| Scroll             | Horizontal `ScrollView`            |
| `showsHorizontalScrollIndicator` | `false`            |
| `contentContainerStyle.gap` | `Spacing.sm (8)`        |
| `alignItems`       | `center`                           |

#### LeaguePill

| Property           | Value                              |
|--------------------|------------------------------------|
| `height`           | `34`                               |
| `paddingHorizontal`| `Spacing.md (16)`                  |
| `borderRadius`     | `17` (fully rounded)               |
| `alignItems`       | `center`                           |
| `justifyContent`   | `center`                           |
| Min touch target   | `44` height (achieved with vertical hitSlop) |

**States:**

| State    | Background   | Text color | Border          |
|----------|-------------|------------|-----------------|
| Default  | `transparent`| `#A8DABC`  | `1px #2d6a4f`  |
| Active   | `#7dcea0`   | `#0d2818`  | none            |
| Pressed  | `#52b788`   | `#0d2818`  | none            |

**Text:**

| Property    | Value                              |
|-------------|------------------------------------|
| Font size   | `14` (Typography.caption)          |
| Font weight | `600`                              |

**i18n:**

| Key                           | EN              | TR              | DE              | FR              |
|-------------------------------|-----------------|-----------------|-----------------|-----------------|
| `leagues.all`                 | All Leagues     | Tüm Ligler      | Alle Ligen      | Toutes Ligues   |
| `leagues.premierLeague`       | Premier League  | Premier Lig      | Premier League  | Premier League  |
| `leagues.laLiga`              | La Liga         | La Liga          | La Liga         | La Liga         |
| `leagues.serieA`              | Serie A         | Serie A          | Serie A         | Serie A         |
| `leagues.bundesliga`          | Bundesliga      | Bundesliga       | Bundesliga      | Bundesliga      |
| `leagues.superLig`            | Süper Lig       | Süper Lig        | Süper Lig       | Süper Lig       |

---

### 3.4 TeamGrid

| Property        | Value                              |
|-----------------|------------------------------------|
| Component       | `FlatList`                         |
| `numColumns`    | `3`                                |
| `contentContainerStyle.padding` | `Spacing.md (16)` |
| `columnWrapperStyle.gap` | `Spacing.sm (8)`        |
| `contentContainerStyle.gap` | `Spacing.sm (8)`    |
| `flex`          | `1`                                |
| `keyExtractor`  | `team.id`                          |

**Empty State** (no search results):

| Property     | Value                              |
|--------------|------------------------------------|
| Icon         | Search icon, `48 × 48`, muted     |
| Text         | i18n: `teamSelection.noResults`    |
| Font size    | `16` (Typography.body)             |
| Color        | `#6B9080` (Colors.textMuted)       |

| Key                            | EN               | TR                  | DE                    | FR                    |
|--------------------------------|------------------|---------------------|-----------------------|-----------------------|
| `teamSelection.noResults`      | No teams found   | Takım bulunamadı    | Keine Teams gefunden  | Aucune équipe trouvée |

---

### 3.5 TeamCard

| Property           | Value                              |
|--------------------|------------------------------------|
| `flex`             | `1` (within 3-column grid)         |
| `aspectRatio`      | `0.85` (taller than wide)          |
| `backgroundColor`  | `#1a472a` (Colors.surface)         |
| `borderRadius`     | `12`                               |
| `alignItems`       | `center`                           |
| `justifyContent`   | `center`                           |
| `padding`          | `Spacing.sm (8)`                   |
| Min touch target   | Entire card is tappable (> 44pt)   |

#### TeamBadge (Initials Circle)

| Property        | Value                              |
|-----------------|------------------------------------|
| Size            | `64 × 64`                          |
| `borderRadius`  | `32` (circle)                      |
| `backgroundColor`| Team primary color (from data) or `#2d6a4f` fallback |
| `alignItems`    | `center`                           |
| `justifyContent`| `center`                           |
| `marginBottom`  | `Spacing.sm (8)`                   |

**Initials Text:**

| Property     | Value                              |
|--------------|------------------------------------|
| Text         | First 2 letters of team `shortName`, uppercase |
| Font size    | `24` (Typography.heading2)         |
| Font weight  | `700`                              |
| Color        | `#FFFFFF`                          |

#### TeamName

| Property     | Value                              |
|--------------|------------------------------------|
| Text         | `team.shortName`                   |
| Font size    | `12` (Typography.small)            |
| Font weight  | `400`                              |
| Color        | `#A8DABC` (Colors.textSecondary)   |
| `textAlign`  | `center`                           |
| `numberOfLines`| `1`                              |

#### Selection States

| State             | Border                          | Overlay                         |
|-------------------|---------------------------------|---------------------------------|
| Unselected        | none                            | none                            |
| Selected as Home  | `2px solid #FFC72C` (gold)      | `✓` checkmark top-right, bg `#FFC72C` |
| Selected as Away  | `2px solid #E63946` (red)       | `✓` checkmark top-right, bg `#E63946` |
| Pressed           | none                            | `rgba(125,206,160,0.1)` overlay |
| Same-team blocked | N/A (already selected, tap deselects) | —                          |

**Checkmark Badge (overlay, top-right):**

| Property        | Value                              |
|-----------------|------------------------------------|
| Size            | `22 × 22`                          |
| `borderRadius`  | `11` (circle)                      |
| Position        | `absolute, top: -4, right: -4`     |
| `backgroundColor`| `#FFC72C` (home) or `#E63946` (away) |
| Icon            | `✓` white, `14 × 14`              |

**Press animation:**
```typescript
scale: withTiming(0.95, { duration: 80 })
```

---

### 3.6 SelectionBar (Fixed Bottom)

| Property           | Value                              |
|--------------------|------------------------------------|
| Position           | Fixed at bottom (outside ScrollView) |
| `backgroundColor`  | `#1a472a` (Colors.surface)         |
| `borderTopWidth`   | `1`                                |
| `borderTopColor`   | `#2d6a4f` (Colors.border)          |
| `paddingHorizontal`| `Spacing.md (16)`                  |
| `paddingVertical`  | `Spacing.md (16)`                  |
| `paddingBottom`    | `Spacing.lg (24)` + safe area      |

#### SlotRow

| Property           | Value                              |
|--------------------|------------------------------------|
| `flexDirection`    | `row`                              |
| `alignItems`       | `center`                           |
| `justifyContent`   | `space-around`                     |
| `marginBottom`     | `Spacing.md (16)`                  |

#### TeamSlot

| Property           | Value                              |
|--------------------|------------------------------------|
| Size               | `72 × 72`                          |
| `borderRadius`     | `12`                               |
| `alignItems`       | `center`                           |
| `justifyContent`   | `center`                           |

**Empty State:**

| Property           | Value                              |
|--------------------|------------------------------------|
| `borderWidth`      | `2`                                |
| `borderStyle`      | `dashed`                           |
| `borderColor`      | `#2d6a4f` (Colors.border)          |
| Label              | "HOME" or "AWAY"                   |
| Label font size    | `12` (Typography.small)            |
| Label color        | `#6B9080` (Colors.textMuted)       |

**Filled State:**

| Property           | Value                              |
|--------------------|------------------------------------|
| `backgroundColor`  | `#2d6a4f` (Colors.surfaceLight)    |
| `borderWidth`      | `2`                                |
| `borderColor`      | `#FFC72C` (home) or `#E63946` (away) |
| Content            | TeamBadge (40×40) + shortName below |
| Name font size     | `10` (smaller than Typography.small) |
| Name color         | `#FFFFFF`                          |
| Deselect button    | `✕` icon, top-right, `20 × 20`, color: `#E63946` |

**i18n:**

| Key                        | EN    | TR      | DE       | FR          |
|----------------------------|-------|---------|----------|-------------|
| `teamSelection.home`       | HOME  | EV SAHİBİ | HEIM   | DOMICILE    |
| `teamSelection.away`       | AWAY  | DEPLASMAN  | AUSWÄRTS | EXTÉRIEUR |

#### VSDivider

| Property     | Value                              |
|--------------|------------------------------------|
| Text         | `"VS"`                             |
| Font size    | `24` (Typography.heading2)         |
| Font weight  | `700`                              |
| Color        | `#6B9080` (Colors.textMuted)       |

#### ContinueButton

| Property             | Value                               |
|----------------------|-------------------------------------|
| `width`              | `100%`                              |
| `height`             | `52`                                |
| `borderRadius`       | `12`                                |
| `alignItems`         | `center`                            |
| `justifyContent`     | `center`                            |

**States:**

| State    | Background | Text color | Text                |
|----------|-----------|------------|---------------------|
| Disabled (0 or 1 selected) | `#4a4a4a` | `#6B9080` | "SELECT BOTH TEAMS" |
| Enabled (both selected)    | `#7dcea0` | `#0d2818` | "CONTINUE"          |
| Pressed  | `#52b788` | `#0d2818`  | "CONTINUE"          |

**Text:**

| Property     | Value                              |
|--------------|------------------------------------|
| Font size    | `16` (Typography.bodyBold)         |
| Font weight  | `600`                              |
| Letter spacing | `1.5`                            |
| Text transform | `uppercase`                      |

**i18n:**

| Key                              | EN               | TR                 | DE                   | FR                     |
|----------------------------------|------------------|--------------------|----------------------|------------------------|
| `teamSelection.continue`         | CONTINUE         | DEVAM ET           | WEITER               | CONTINUER              |
| `teamSelection.selectBothTeams`  | SELECT BOTH TEAMS| İKİ TAKIM SEÇ     | BEIDE TEAMS WÄHLEN   | SÉLECTIONNER LES DEUX  |

**Navigation:** `router.push('/game-mode-selection')`

---

## 4. Selection Flow Logic

### Step-by-step:

1. **Initial state:** Both slots empty, grid shows "All Leagues", Continue disabled
2. **First tap on team:** → fills HOME slot (gold border `#FFC72C`), card shows gold selection
3. **Second tap on different team:** → fills AWAY slot (red border `#E63946`), Continue becomes active
4. **Tap on already-selected team:** → deselects it, clears that slot, Continue disables if < 2
5. **Tap ✕ on filled slot:** → deselects that team, card returns to normal
6. **Same team guard:** Cannot select same team for both slots (no-op if attempted)

### State Management (zustand matchStore):

```typescript
interface MatchStore {
  homeTeam: Team | null;
  awayTeam: Team | null;
  setHomeTeam: (team: Team | null) => void;
  setAwayTeam: (team: Team | null) => void;
  clearSelections: () => void;
}
```

---

## 5. Full Layout Spec (StyleSheet)

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
    borderBottomWidth: 1,
    borderBottomColor: '#2d6a4f',
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
  searchBar: {
    height: 44,
    marginHorizontal: 16,
    marginVertical: 8,
    backgroundColor: '#1a472a',
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
  },
  searchIcon: {
    width: 20,
    height: 20,
    marginRight: 8,
    tintColor: '#6B9080',
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#FFFFFF',
  },
  leagueBar: {
    height: 48,
    paddingHorizontal: 16,
  },
  leagueBarContent: {
    alignItems: 'center',
    gap: 8,
  },
  leaguePill: {
    height: 34,
    paddingHorizontal: 16,
    borderRadius: 17,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#2d6a4f',
  },
  leaguePillActive: {
    backgroundColor: '#7dcea0',
    borderColor: '#7dcea0',
  },
  leaguePillText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#A8DABC',
  },
  leaguePillTextActive: {
    color: '#0d2818',
  },
  teamGrid: {
    flex: 1,
  },
  teamGridContent: {
    padding: 16,
    gap: 8,
  },
  teamGridColumnWrapper: {
    gap: 8,
  },
  teamCard: {
    flex: 1,
    aspectRatio: 0.85,
    backgroundColor: '#1a472a',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 8,
  },
  teamCardSelectedHome: {
    borderWidth: 2,
    borderColor: '#FFC72C',
  },
  teamCardSelectedAway: {
    borderWidth: 2,
    borderColor: '#E63946',
  },
  teamBadge: {
    width: 64,
    height: 64,
    borderRadius: 32,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  teamBadgeInitials: {
    fontSize: 24,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  teamName: {
    fontSize: 12,
    fontWeight: '400',
    color: '#A8DABC',
    textAlign: 'center',
  },
  checkmarkBadge: {
    position: 'absolute',
    top: -4,
    right: -4,
    width: 22,
    height: 22,
    borderRadius: 11,
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectionBar: {
    backgroundColor: '#1a472a',
    borderTopWidth: 1,
    borderTopColor: '#2d6a4f',
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 24, // + safe area inset
  },
  slotRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    marginBottom: 16,
  },
  teamSlot: {
    width: 72,
    height: 72,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  teamSlotEmpty: {
    borderWidth: 2,
    borderStyle: 'dashed',
    borderColor: '#2d6a4f',
  },
  teamSlotFilled: {
    backgroundColor: '#2d6a4f',
    borderWidth: 2,
  },
  teamSlotFilledHome: {
    borderColor: '#FFC72C',
  },
  teamSlotFilledAway: {
    borderColor: '#E63946',
  },
  slotLabel: {
    fontSize: 12,
    fontWeight: '400',
    color: '#6B9080',
  },
  vsText: {
    fontSize: 24,
    fontWeight: '700',
    color: '#6B9080',
  },
  continueButton: {
    width: '100%',
    height: 52,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  continueButtonEnabled: {
    backgroundColor: '#7dcea0',
  },
  continueButtonDisabled: {
    backgroundColor: '#4a4a4a',
  },
  continueButtonText: {
    fontSize: 16,
    fontWeight: '600',
    letterSpacing: 1.5,
    textTransform: 'uppercase',
  },
  continueButtonTextEnabled: {
    color: '#0d2818',
  },
  continueButtonTextDisabled: {
    color: '#6B9080',
  },
});
```

---

## 6. Animations

### 6.1 Team Card Selection

```typescript
// Scale pop on selection
const scale = useSharedValue(1);
const onSelect = () => {
  scale.value = withSequence(
    withTiming(1.05, { duration: 100 }),
    withTiming(1.0, { duration: 150 })
  );
};
```

### 6.2 Selection Bar Slot Fill

```typescript
// Slide up + fade in when team fills a slot
const translateY = useSharedValue(10);
const opacity = useSharedValue(0);

useEffect(() => {
  if (team) {
    translateY.value = withTiming(0, { duration: 200 });
    opacity.value = withTiming(1, { duration: 200 });
  } else {
    translateY.value = 10;
    opacity.value = 0;
  }
}, [team]);
```

### 6.3 Continue Button Enable

```typescript
// Fade transition when button enables/disables
const bgOpacity = useSharedValue(0);
useEffect(() => {
  bgOpacity.value = withTiming(bothSelected ? 1 : 0, { duration: 250 });
}, [bothSelected]);
```

### 6.4 Screen Entry

```typescript
// Team grid items stagger in
const entering = FadeInDown.delay(index * 30).duration(300);
```

---

## 7. State Variations

### 7.1 Initial State (0 selected)
- Both slots show dashed empty state with "HOME" / "AWAY" labels
- Continue button: disabled, text "SELECT BOTH TEAMS"
- All team cards: unselected

### 7.2 One Team Selected (Home)
- Home slot: filled with team badge + name, gold border
- Away slot: still empty with dashed border
- Continue button: still disabled, text "SELECT BOTH TEAMS"
- Selected team card: gold border + checkmark

### 7.3 Both Teams Selected
- Both slots filled with respective team info
- Continue button: enabled, text "CONTINUE", green background
- Two team cards highlighted (gold + red respectively)

### 7.4 Search Active
- Search bar shows typed text + clear (✕) button
- Team grid filters to matching results
- League pills remain interactive (filters stack: league + search)

### 7.5 No Results
- Team grid replaced with centered empty state
- Search icon (muted) + "No teams found" text
- League pills + search bar still interactive

### 7.6 Loading
- Not applicable for MVP (data is bundled CSV, parsed on app start)
- Future: skeleton cards in grid while data loads

---

## 8. Navigation

| Action               | Target                   | Transition              |
|----------------------|--------------------------|-------------------------|
| Tap ← (back)        | Main Menu (`/`)          | Pop (slide left)        |
| Tap "CONTINUE"       | `/game-mode-selection`   | Push (slide from right) |
| Hardware back        | Main Menu (`/`)          | Pop (slide left)        |

---

## 9. i18n Key Summary

| Key                                | EN                | TR                 | DE                   | FR                     |
|------------------------------------|-------------------|--------------------|----------------------|------------------------|
| `teamSelection.title`              | SELECT YOUR TEAMS | TAKIMLARI SEÇ     | TEAMS AUSWÄHLEN      | SÉLECTIONNER ÉQUIPES   |
| `teamSelection.searchPlaceholder`  | Search teams…     | Takım ara…         | Teams suchen…        | Rechercher…            |
| `teamSelection.home`               | HOME              | EV SAHİBİ          | HEIM                 | DOMICILE               |
| `teamSelection.away`               | AWAY              | DEPLASMAN          | AUSWÄRTS             | EXTÉRIEUR              |
| `teamSelection.continue`           | CONTINUE          | DEVAM ET           | WEITER               | CONTINUER              |
| `teamSelection.selectBothTeams`    | SELECT BOTH TEAMS | İKİ TAKIM SEÇ     | BEIDE TEAMS WÄHLEN   | SÉLECTIONNER LES DEUX  |
| `teamSelection.noResults`          | No teams found    | Takım bulunamadı   | Keine Teams gefunden | Aucune équipe trouvée  |
| `leagues.all`                      | All Leagues       | Tüm Ligler         | Alle Ligen           | Toutes Ligues          |
| `leagues.premierLeague`            | Premier League    | Premier Lig         | Premier League       | Premier League         |
| `leagues.laLiga`                   | La Liga           | La Liga             | La Liga              | La Liga                |
| `leagues.serieA`                   | Serie A           | Serie A             | Serie A              | Serie A                |
| `leagues.bundesliga`               | Bundesliga        | Bundesliga          | Bundesliga           | Bundesliga             |
| `leagues.superLig`                 | Süper Lig         | Süper Lig           | Süper Lig            | Süper Lig              |

---

## 10. Responsive Notes

### Phone (default, < 768px width)
- 3-column grid
- Team badge: 64×64
- Selection bar: fixed bottom, full width

### Tablet (>= 768px width)
- 4-column grid (`numColumns: 4`)
- Max content width: `600px` wrapper
- Team badge: can remain 64×64 (cards will be larger)
- Selection bar: same layout, centered within max width

---

## 11. Accessibility

| Element          | Role       | Label (i18n key)              | Hint                              |
|------------------|------------|-------------------------------|-----------------------------------|
| Back button      | `button`   | `common.back`                 | Go back to main menu              |
| Search bar       | `search`   | `teamSelection.searchPlaceholder` | Filter teams by name         |
| League pill      | `button`   | League name key               | Filter by league                  |
| Team card        | `button`   | `{team.name}`                 | Select as home/away team          |
| Team slot (home) | `button`   | `teamSelection.home`          | Selected home team / tap to clear |
| Team slot (away) | `button`   | `teamSelection.away`          | Selected away team / tap to clear |
| Continue button  | `button`   | `teamSelection.continue`      | Proceed to game mode selection    |
