# GDD-07: Special Abilities & GGO System

**Document Code:** GDD-07
**Version:** 1.0
**Date:** March 17, 2026
**Author:** Game Designer Agent, YG Games
**Status:** Draft
**Related Documents:** [GDD-00: Competitor Analysis](docs/00-competitor-analysis-en.md) | [GDD-01: Core Game Design](core-game-design-en.md) | [GDD-02: Card Collection System](card-collection-system-en.md) | [GDD-03: Game Economy & Monetization](game-economy-monetization-en.md) | [GDD-05: Art & Visual Style](art-visual-style-en.md)

---

## Table of Contents

1. [System Overview](#1-system-overview)
2. [Ability Categories](#2-ability-categories)
3. [Complete Ability Catalog](#3-complete-ability-catalog)
4. [Ability Acquisition & Progression](#4-ability-acquisition--progression)
5. [In-Match Mechanics](#5-in-match-mechanics)
6. [Balance Framework](#6-balance-framework)
7. [Counter-Play System](#7-counter-play-system)
8. [Ability Customization & Loadouts](#8-ability-customization--loadouts)
9. [Visual Integration](#9-visual-integration)
10. [GGO Inspiration Deep Dive](#10-ggo-inspiration-deep-dive)
11. [P2W & Sustainability Evaluation](#11-pw--sustainability-evaluation)

---

## 1. System Overview

### 1.1 Vision

> **"Anime-inspired special abilities that make every match a highlight reel — but never replace skill with power."**

The Special Abilities system is Project F's signature differentiator. Inspired by GGO Football anime's spectacular moves, abilities add a layer of tactical depth and visual spectacle to the 6v6 football experience. Every ability has a counter. Every counter has a window. Skill always wins.

### 1.2 Core Design Rules

| Rule | Description |
|------|-------------|
| **Skill > Ability** | A well-timed normal action always beats a poorly-timed special ability |
| **Every Ability Has a Counter** | No "I win" buttons — every offensive ability can be defended against |
| **Visual Clarity** | Players always see what's coming and have time to react |
| **F2P Achievable** | Every ability earnable through gameplay within 2-4 weeks |
| **No Ability Stacking** | Only 1 ability can be active per player per activation |
| **Cooldown Parity** | Same ability = same cooldown regardless of card tier |
| **No Tier-Locked Abilities** | All abilities available at all tiers; higher tiers get slightly faster charge, never exclusive abilities |

### 1.3 System Architecture

```
Card (has 1 Ability Slot)
    └── Ability (from 26 available)
         ├── Element (Fire / Ice / Lightning / Wind / Shadow)
         ├── Category (Offensive / Defensive / Tactical / Goalkeeper)
         ├── Tier (1 / 2 / 3)
         ├── Charge Method (Momentum / Time / Event)
         └── Cooldown (15s / 25s / 40s)
```

**Per-Match Ability Economy:**
- Each of 6 players on your team has 1 equipped ability
- You control which player's ability to activate
- Charge meter fills through gameplay actions
- Once charged, ability is available until used
- After use, cooldown begins before recharge starts
- Maximum 2 ability activations per player per match (prevents spam)

---

## 2. Ability Categories

### 2.1 Category Overview

| Category | Count | Purpose | Position Affinity |
|----------|-------|---------|-------------------|
| **Offensive** | 8 | Score goals, create chances | FW, MF |
| **Defensive** | 6 | Stop attacks, recover possession | DF, GK |
| **Tactical** | 8 | Manipulate space, tempo, and positioning | MF, DF |
| **Goalkeeper** | 4 | Enhanced saves and distribution | GK only |
| **TOTAL** | **26** | — | — |

### 2.2 Element System

Every ability belongs to one of 5 elements. Elements add visual personality but do NOT create rock-paper-scissors advantages — they are purely cosmetic/thematic.

| Element | Color | VFX Theme | Feel |
|---------|-------|-----------|------|
| **Fire** | Orange-Red | Flames, embers, heat distortion | Power, intensity |
| **Ice** | Cyan-Blue | Crystals, frost, mist | Precision, control |
| **Lightning** | Yellow-White | Arcs, sparks, flash | Speed, explosiveness |
| **Wind** | Green-Teal | Leaves, air currents, swirls | Finesse, deception |
| **Shadow** | Purple-Dark | Mist, afterimages, darkness | Mystery, unpredictability |

> **Critical Rule:** Elements are cosmetic only. Fire does not beat Ice. Shadow does not beat Lightning. This prevents any P2W element-meta from forming.

### 2.3 Ability Tiers

| Tier | Charge Time | Cooldown | Max Uses/Match | VFX Scale | Activation |
|------|------------|----------|----------------|-----------|-----------|
| **Tier 1** | 30s active play | 15s | 3 | Local (around player) | Instant |
| **Tier 2** | 50s active play | 25s | 2 | Path (player → target) | 0.5s wind-up |
| **Tier 3** | 80s active play | 40s | 1 | Full screen cinematic | 1.0s wind-up |

**Tier Balance:**
- Tier 1 abilities are frequent but modest — good for consistent play
- Tier 2 abilities are impactful and strategic — turn the tide of play
- Tier 3 abilities are spectacular and rare — once-per-match moments
- Higher tiers are NOT strictly better — they're higher risk/reward with longer wind-ups that can be interrupted

---

## 3. Complete Ability Catalog

### 3.1 Offensive Abilities (8)

| # | Name | Element | Tier | Description | Counter |
|---|------|---------|------|-------------|---------|
| O1 | **Roaring Flame Strike** | Fire | 3 | Devastating power shot with fire trail. +40% shot power, +25% curve. Ball ignites on contact. | GK abilities, Lava Block, positioning |
| O2 | **Vacuum Zero Shot** | Ice | 3 | Air compresses around ball, launches with sonic boom. +35% shot speed, ignores first defender in path. | Frost Wall, GK abilities, off-target still misses |
| O3 | **Thunder Shot** | Lightning | 2 | Electrified shot with +30% power and slight auto-aim toward corners. | Positioned GK save, Storm Shield |
| O4 | **Cyclone Cross** | Wind | 2 | Curving cross with wind trail that bends unpredictably, making it harder to intercept. | Reading the wind-up animation, defensive positioning |
| O5 | **Samba Banana Strike** | Wind | 2 | Rhythmic build-up into extreme curve shot with rainbow trail. +50% curve. | GK positioning, curve is readable with experience |
| O6 | **Flash Dribble** | Lightning | 1 | Burst of speed past nearest defender. +40% speed for 2 seconds. | Anticipation tackle, team covering |
| O7 | **Phantom Pass** | Shadow | 1 | Pass creates afterimage distraction. Receiving player momentarily invisible on mini-map. | Visual tracking (ball still visible), communication |
| O8 | **Ember Volley** | Fire | 2 | Mid-air strike with fire explosion on goal. +25% power, ignores GK confidence if hit from volley. | Timing interception, don't allow cross setup |

### 3.2 Defensive Abilities (6)

| # | Name | Element | Tier | Description | Counter |
|---|------|---------|------|-------------|---------|
| D1 | **Lava Block** | Fire | 2 | Stomp creates brief magma barrier (2s) in a 5m radius. Blocks passes and dribbles through the zone. | Going around the zone, waiting 2s, lob over |
| D2 | **Frost Wall** | Ice | 2 | Creates ice wall (3m wide, 2s) that slows any player passing through by 30%. | Going around, waiting, or breaking through with Tier 3 offense |
| D3 | **Storm Shield** | Lightning | 1 | Brief electric aura (1.5s) that auto-tackles any dribbler within 3m radius. | Passing before entering range, long shots |
| D4 | **Shadow Intercept** | Shadow | 1 | Defender dashes to predicted ball path. +50% interception range for 1.5s. | Feint pass, delayed pass timing |
| D5 | **Gale Force** | Wind | 2 | Creates wind zone pushing attackers away from goal. 4m radius, 2s duration. | Using the wind to curve shots, team play |
| D6 | **Permafrost Tackle** | Ice | 1 | Enhanced slide tackle with +30% range and brief slow (1s) on tackled player. | Passing before tackle range, jumping over |

### 3.3 Tactical Abilities (8)

| # | Name | Element | Tier | Description | Counter |
|---|------|---------|------|-------------|---------|
| T1 | **Flash Step** | Lightning | 1 | Player teleports 5m in movement direction. Bypasses 1 defender. | Predicting destination, covering passing lanes |
| T2 | **Shadow Clone** | Shadow | 2 | Creates AI-controlled decoy of activating player for 3s. Decoy can "receive" passes (ball passes through). | Visual tells (clone slightly transparent), experience |
| T3 | **Wind Walk** | Wind | 1 | +25% movement speed for entire team for 3s. No ball speed bonus. | Doesn't affect ball control; only movement positioning |
| T4 | **Fire Formation** | Fire | 2 | All teammates instantly shift to an aggressive formation for 5s, then return. Forces pressing play. | Counter-attack during transition back |
| T5 | **Frozen Moment** | Ice | 3 | Slows all opponents by 20% for 3s. Your team unaffected. Mini time-distortion effect. | Short duration; plan ahead, it's telegraphed |
| T6 | **Phantom Swap** | Shadow | 1 | Instantly swap positions with nearest teammate. Confuses marking. | Awareness, communication, tracking the ball holder |
| T7 | **Tailwind Pass** | Wind | 2 | Next pass travels 50% faster and has +30% accuracy. Applied to one pass only. | Interception timing adjusted, defensive awareness |
| T8 | **Chain Lightning** | Lightning | 2 | Quick one-touch passing chain between 3 teammates with auto-aim. 2s sequence. | Intercepting any pass in the chain breaks it |

### 3.4 Goalkeeper Abilities (4)

| # | Name | Element | Tier | Description | Counter |
|---|------|---------|------|-------------|---------|
| G1 | **Inferno Guard** | Fire | 2 | GK creates fire barrier across goal (3s). Blocks any shot from outside box. Inside-box shots unaffected. | Dribble into box first, or wait 3s |
| G2 | **Glacier Reflex** | Ice | 2 | GK reaction time boosted by 50% for next 2 save attempts. Enhanced dive range. | Power shots, placement shots to corners, Tier 3 strikes |
| G3 | **Thunder Distribution** | Lightning | 1 | GK throw/kick travels 50% faster and further. Creates quick counter-attack. | Defensive awareness on receiving end |
| G4 | **Void Presence** | Shadow | 3 | GK becomes "invisible" on opponent's screen for 3s (replaced by shadow fog in goal). Strikers can't read GK position. | Memorizing GK patterns, power shots to corners |

---

## 4. Ability Acquisition & Progression

### 4.1 How Players Get Abilities

| Source | Abilities Available | Cost/Effort |
|--------|-------------------|-------------|
| **Starter Kit** | 3 Tier 1 abilities (1 Offensive, 1 Defensive, 1 Tactical) | Free at FTUE |
| **Card Drops** | Random ability attached to Epic+ cards | Pack opening |
| **Ability Packs** | Targeted ability category packs | 🪙 2,000 Coins or 💎 150 Gems |
| **Season Pass** | 2 abilities per season (Free track: T1, Premium track: T2) | Season progression |
| **Achievement Rewards** | Specific abilities for milestones | Gameplay milestones |
| **Ranked Rewards** | 1 ability per rank tier reached | Rank progression |
| **Events** | Limited-event abilities (same stats, unique VFX skin) | Event participation |
| **Trade Market** | Buy/sell abilities from other players | Player economy |

### 4.2 Ability Unlock Timeline (F2P Path)

| Timeframe | Expected Unlocks | Source |
|-----------|-----------------|--------|
| **Day 1** | 3 Tier 1 abilities | Starter kit |
| **Week 1** | +2-3 abilities | Daily play, early achievements |
| **Week 2** | +2 abilities | Season pass free track, ranked rewards |
| **Week 4** | +3-4 abilities | Accumulated coins, events, drops |
| **Month 2** | ~12-15 abilities | Mix of all sources |
| **Month 3** | ~18-20 abilities | Approaching full collection |
| **Month 6** | 26/26 (all) | Complete collection achievable |

> **F2P Guarantee:** A free player can acquire ALL 26 abilities within 6 months of dedicated play. No ability is permanently locked behind payment.

### 4.3 Ability Assignment to Cards

- Each card has **1 Ability Slot**
- Players **choose** which ability to equip on each card
- Abilities are **account-wide** — once unlocked, can be equipped on any card
- Changing ability on a card is **free and instant**
- Same ability can be equipped on multiple cards simultaneously

### 4.4 Card Tier Influence on Abilities

| Card Tier | Charge Speed Bonus | Ability Effect | Uses Per Match |
|-----------|-------------------|----------------|----------------|
| **Normal** | +0% (base) | Standard | As per Tier |
| **Rare** | +5% faster charge | Standard | As per Tier |
| **Epic** | +10% faster charge | Standard | As per Tier |
| **Super** | +15% faster charge | Standard | As per Tier |
| **Legend** | +20% faster charge | Standard | As per Tier |

> **Critical P2W Control:** Higher card tiers charge abilities slightly faster (max 20% at Legend), but the **ability effect is identical**. A Normal card's Roaring Flame Strike is just as powerful as a Legend card's. The only advantage is charging ~12 seconds earlier on a Tier 3 ability — meaningful but not game-breaking.

---

## 5. In-Match Mechanics

### 5.1 Charge System

**How Abilities Charge:**

| Charge Method | Description | Activities That Charge |
|--------------|-------------|----------------------|
| **Momentum** | Charge builds through positive play | Completed passes (+3%), shots on target (+5%), tackles won (+4%), possession time (+1%/5s) |
| **Time** | Passive charge over match time | +1% per 5 seconds of match time |
| **Event** | Burst charge from impactful events | Goal scored (+15%), assist (+10%), save (+8%), clean tackle chain (+5%) |

**Charge Formula:**
```
Total Charge Rate = Base Momentum + Time Passive + Event Burst + Card Tier Bonus
Full Charge = 100%
```

**Example — Tier 2 Ability on an Epic Card:**
- Base charge time: ~50s of active play
- With Epic card bonus (+10%): ~45s
- With good performance: could charge in ~35-40s
- With poor performance: might take 60s+

### 5.2 Activation Flow

```
1. Charge meter fills → Ability icon glows + pulse
2. Player taps SA button → Wind-up animation begins
3. Wind-up duration depends on Tier (0s / 0.5s / 1.0s)
4. During wind-up: player slows, ability can be INTERRUPTED by tackle
5. After wind-up: ability executes (unstoppable once fully activated)
6. Effect duration applies
7. Cooldown begins
8. After cooldown: recharge begins (if uses remaining)
```

### 5.3 Interruption Mechanics

| Phase | Can Be Interrupted? | How |
|-------|-------------------|-----|
| **Charging** | N/A (passive) | — |
| **Button Press** | No | Instant activation starts |
| **Wind-Up** | YES — Tier 2 & 3 only | Tackle, body check, or steal during wind-up |
| **Execution** | No | Ability proceeds once past wind-up |
| **Effect Active** | Some can be outlasted | Wait for duration to end |
| **Cooldown** | N/A | Passive timer |

**Interrupt Reward:** Successfully interrupting an opponent's ability wind-up grants +10% charge to your own ability. Risk-reward for aggressive play.

### 5.4 Multiple Ability Management

With 6 players on your team, you manage 6 abilities during a match:

```
┌─────────────────────────────────────┐
│ Active Player: MF - "Thunder" [⚡ SA]│
│                                      │
│ Team Ability Status:                 │
│ FW1: Roaring Flame   [████████░░] 82%│
│ FW2: Flash Dribble   [██████████] RDY│
│ MF1: Thunder Shot    [██████████] RDY│
│ MF2: Wind Walk       [██████░░░░] 65%│
│ DF1: Storm Shield    [████░░░░░░] 40%│
│ GK:  Glacier Reflex  [██████████] RDY│
└─────────────────────────────────────┘
```

- You can only activate the ability of the **currently controlled player**
- Switching player control lets you access their ability
- AI-controlled teammates **never** auto-activate abilities (player decision only)
- Quick-select: double-tap player portrait in HUD to switch + activate

### 5.5 Match Phase Dynamics

| Match Phase | Ability Behavior |
|------------|-----------------|
| **0:00-1:00** | No abilities available (charge period) |
| **1:00-3:00** | Tier 1 abilities start becoming available |
| **2:00-4:00** | Tier 2 abilities start becoming available |
| **3:30-4:30** | Tier 3 abilities potentially available (rare, requires high performance) |
| **Last 30 seconds** | All charge rates +25% ("Momentum Surge" for exciting finishes) |
| **Overtime** | Charge rates +50%, cooldowns -25% (high-intensity overtime) |

---

## 6. Balance Framework

### 6.1 Balance Philosophy

> **"An ability should feel like a highlight, not an expectation. The best player wins, not the best ability."**

### 6.2 Power Budget System

Every ability has a **Power Budget of 100 points** distributed across:

| Dimension | Description | Range |
|-----------|-------------|-------|
| **Impact** | How much the ability changes the game state | 10-40 |
| **Duration** | How long the effect lasts | 5-30 |
| **Range** | Area of effect or distance | 5-25 |
| **Speed** | How quickly the ability resolves | 5-25 |
| **Cooldown Recovery** | Inverse of cooldown (faster recovery = higher budget cost) | 10-30 |

**Budget Examples:**

| Ability | Impact | Duration | Range | Speed | CD Recovery | Total |
|---------|--------|----------|-------|-------|-------------|-------|
| Roaring Flame Strike | 38 | 5 | 20 | 22 | 15 | 100 |
| Storm Shield | 25 | 15 | 15 | 30 | 15 | 100 |
| Frozen Moment | 30 | 20 | 25 | 15 | 10 | 100 |
| Flash Dribble | 20 | 10 | 10 | 30 | 30 | 100 |

**Balance Rule:** No ability can exceed 100 points. If we need to buff one dimension, another must be nerfed proportionally.

### 6.3 Win Rate Monitoring

| Metric | Target | Action Threshold |
|--------|--------|-----------------|
| **Ability win rate contribution** | 50% ±5% | Nerf if any ability associated with >55% win rate in matches where it was used |
| **Ability pick rate** | < 25% per ability | If one ability exceeds 25% pick rate, it's likely too strong or has no viable alternative |
| **Ability-less win rate** | ≥ 45% | Players without abilities should win ≥ 45% of matches against ability users (proving skill > abilities) |
| **Counter success rate** | ≥ 30% | Each ability must be successfully countered ≥ 30% of the time |

### 6.4 Patch Balance Cadence

| Frequency | Scope |
|-----------|-------|
| **Weekly** | Data monitoring, hotfix for critical issues (>60% win rate ability) |
| **Bi-weekly** | Minor tuning (±5% on charge/cooldown/effect values) |
| **Monthly** | Major balance pass with community feedback integration |
| **Seasonal** | New abilities added (2-4 per season), meta shifts planned |

### 6.5 Anti-Snowball Mechanics

| Mechanic | Description |
|----------|-------------|
| **Losing Team Charge Boost** | Team that's behind gets +15% charge rate per goal deficit |
| **Comeback Surge** | When 2+ goals behind, Tier 2 cooldowns reduced by 5s |
| **Ability Cap** | Max 2 abilities per player per match prevents dominant players from spamming |
| **Shared Cooldown Group** | Can't activate 2 team abilities within 3s of each other (prevents combo-stacking) |

---

## 7. Counter-Play System

### 7.1 Counter Matrix

Every ability has defined counters. This matrix ensures no ability is uncounterable:

| Ability | Hard Counter | Soft Counter | Skill Counter |
|---------|-------------|-------------|---------------|
| **Roaring Flame Strike** | Inferno Guard (blocks), Frost Wall (slows ball) | Positioning outside shot angle | Read wind-up, tackle during it |
| **Vacuum Zero Shot** | Glacier Reflex (enhanced save) | Frost Wall (slows) | Anticipate and position GK manually |
| **Thunder Shot** | Storm Shield (auto-tackle before shot) | GK positioning | Read the auto-aim and pre-move GK |
| **Cyclone Cross** | Gale Force (push away from cross target) | Defensive marking | Read wind-up direction, intercept |
| **Flash Dribble** | Permafrost Tackle (extended range) | Shadow Intercept (predicted path) | Anticipation and covering |
| **Lava Block** | Flash Step (teleport past) | Tailwind Pass (over the zone) | Wait 2s for zone to expire |
| **Frost Wall** | Flash Dribble (speed through), Fire abilities | Wait for duration, go around | Time your approach for wall expiry |
| **Frozen Moment** | Wind Walk (speed offsets slow) | Flash Step (individual escape) | Pre-position before it activates |
| **Shadow Clone** | Storm Shield (tackles clone, reveals real) | Experience (clones are semi-transparent) | Track the ball, not the player |
| **Void Presence** | Roaring Flame Strike (power forces corner) | Shoot to memorized GK positions | Aim for corners regardless |

### 7.2 Counter Accessibility

**No Counter Should Be P2W:**
- Every ability counter is available through at least one of: positioning, timing, a Tier 1 ability, or game sense
- Free starter abilities include 1 offensive counter, 1 defensive counter, and 1 tactical counter
- Positioning and timing counters require zero abilities — just skill

### 7.3 Rock-Paper-Scissors Avoidance

We explicitly avoid creating an element-based RPS system:
- Fire does NOT beat Ice
- Lightning does NOT beat Wind
- Elements are cosmetic/thematic only
- Counters are mechanic-based (blocking beats shooting, speed beats blocking, timing beats speed)

---

## 8. Ability Customization & Loadouts

### 8.1 Loadout System

**Per-Card Configuration:**
- Each card: 1 Ability Slot (no additional slots)
- Ability choice is strategic: match your ability to the player's role

**Recommended Loadouts by Formation:**

| Formation | FW | MF | DF | GK |
|-----------|----|----|----|----|
| **2-2-1 (Balanced)** | O1/O2 (power shots) | T7/T3 (support) | D1/D3 (zone defense) | G2 (reflexes) |
| **1-2-2 (Defensive)** | O6 (speed break) | T8/T1 (transitions) | D2/D5 (wall defense) | G1 (barrier) |
| **2-1-2 (Midfield)** | O3/O5 (variety) | T5 (tempo control) | D4/D6 (interception) | G4 (mind games) |
| **3-1-1 (All-Out Attack)** | O1/O2/O8 (all offense) | T4 (formation push) | D3 (solo defense) | G2 (reflexes) |

### 8.2 Strategic Tradeoffs

| Choice | Advantage | Tradeoff |
|--------|-----------|---------|
| **All Tier 3** | Maximum spectacle/impact | Rarely activates; may never charge in short match |
| **All Tier 1** | Frequent activations, consistent value | Low individual impact |
| **Mixed Tiers** | Balanced risk/reward | Requires more management |
| **All Offensive** | Maximum goal threat | Vulnerable to opponent abilities |
| **All Defensive** | Lockdown capability | Struggles to create chances |
| **Mirror Match** | Counter opponent's exact strategy | Predictable |

### 8.3 Loadout Presets

- Players can save **3 loadout presets** (ability configurations across all 6 cards)
- Quick-swap presets in pre-match lobby
- Presets persist across sessions
- Presets include: formation + ability assignment per slot

---

## 9. Visual Integration

### 9.1 Ability Visual Language

All abilities follow the VFX standards from [GDD-05, Section 7](art-visual-style-en.md):

| Tier | Screen Coverage | Duration | Camera | Audio |
|------|----------------|----------|--------|-------|
| **Tier 1** | Local (3m radius) | 0.5s VFX | Normal gameplay camera | Subtle whoosh + element SFX |
| **Tier 2** | Path-based (player → target) | 1.0s VFX | Slight zoom | Impact sound + crowd reaction |
| **Tier 3** | Full screen cinematic | 1.5s VFX | Dynamic cut-scene camera | Orchestral sting + stadium eruption |

### 9.2 Activation Visual Sequence

```
1. CHARGE COMPLETE: SA button glows with element color + pulse
2. BUTTON PRESS: Player aura flashes element color
3. WIND-UP: Element particles gather around player
   - Tier 1: Instant (no visible wind-up)
   - Tier 2: 0.5s — particles spiral inward
   - Tier 3: 1.0s — dramatic slow-mo zoom, particles intensify
4. EXECUTION: Ability fires with full VFX
5. IMPACT: Element explosion/effect at target
6. FADE: VFX dissipates within 0.5s after effect ends
```

### 9.3 Visual Clarity Rules

| Rule | Implementation |
|------|---------------|
| **Ability Indicator** | Glowing aura around player 0.5s before activation — visible to both teams |
| **Wind-up Telegraph** | Element particles visible during wind-up — opponent can read and react |
| **Effect Boundaries** | Zone abilities (Lava Block, Frost Wall) show clear circular/wall boundaries |
| **Friendly/Enemy Colors** | Friendly abilities: blue tint overlay; Enemy abilities: red tint overlay |
| **Mini-map Markers** | Active abilities shown as element-colored pulses on mini-map |
| **VFX Reduction Option** | Settings toggle to reduce VFX intensity (accessibility per [GDD-06](ui-ux-design-en.md)) |

### 9.4 Spectator/Replay Emphasis

During replays and spectator mode:
- Ability activations get slow-motion treatment
- Camera angle optimized for ability direction
- Element VFX enhanced (particles ×2, glow ×1.5)
- Ability name text overlay appears briefly

---

## 10. GGO Inspiration Deep Dive

### 10.1 GGO Football Anime — Ability Mapping

| GGO Original | Project F Adaptation | Changes |
|-------------|---------------------|---------|
| **Roaring Flame Strike** | **Roaring Flame Strike (O1)** | Kept iconic name; balanced with counter-play and cooldown |
| **Radiant Roaring Flame Strike** | Cosmetic VFX variant of O1 | Same stats, enhanced VFX (event reward) |
| **Vacuum Zero Strike** | **Vacuum Zero Shot (O2)** | Adapted as ice-element precision shot |
| **Accelerate Dribble** | **Flash Dribble (O6)** | Simplified to speed burst; less complex than anime version |
| **Subsonic Dribble** | Covered by Flash Step (T1) | Merged with teleport mechanic for clarity |
| **Phantom Twister Strike** | Inspired **Cyclone Cross (O4)** | Wind-based curve cross variant |
| **Lobster-tail Bicycle Kick** | Inspired **Ember Volley (O8)** | Spectacular volley with fire element |
| **Samba Banana Strike** | **Samba Banana Strike (O5)** | Direct adaptation — rhythmic curve shot |
| **Power Wall** | Inspired **Frost Wall (D2)** | Defensive barrier concept |
| **Third-eye Strike** | Inspired **Void Presence (G4)** | Mind-games GK ability |
| **Monster Dribble** | Covered by combination of O6 + T1 | Split into components for balance |

### 10.2 GGO Design Principles We Adopted

| GGO Principle | Our Adaptation |
|--------------|---------------|
| **Abilities have dramatic names** | All 26 abilities have memorable, evocative names |
| **Each character has a signature move** | Players choose their signature ability per card |
| **Abilities create "hype" moments** | Tier 3 abilities get cinematic camera treatment |
| **Team abilities exist** | Tactical abilities affect entire team |
| **Abilities can be countered** | Every GGO ability had a defense — we formalize this |

### 10.3 What We Changed from GGO

| GGO Feature | Why We Changed It | Our Version |
|------------|-------------------|-------------|
| **Some abilities are "ultimate" and unblockable** | Would be P2W if attached to rare cards | Every ability has a counter |
| **Ability power varies by character** | Would create tier-locked advantages | All abilities identical effect regardless of card |
| **Combination abilities (2 players)** | Too complex for mobile; hard to coordinate | Individual abilities only (but tactical ones affect team) |
| **Abilities get "powered up" versions** | Would create upgrade pressure → P2W | Cosmetic VFX variants only |

**Reference:**
- GGO Football Wikipedia: [AI Football GGO](https://en.wikipedia.org/wiki/AI_Football_GGO)
- GGO Football IMDB: [GGO Football](https://www.imdb.com/title/tt12571272/)
- GGO Football Episode Guide: [Trakt — GGO Football](https://trakt.tv/shows/ai-football-ggo/seasons/all)

---

## 11. P2W & Sustainability Evaluation

### 11.1 P2W Risk Assessment

| Element | Risk Level | Assessment |
|---------|-----------|-----------|
| **Ability effects tied to card tier** | ❌ NONE | Effects identical across all card tiers. Only charge speed varies (max 20%). |
| **Ability availability** | LOW | All 26 achievable F2P within 6 months. 3 given free at start. |
| **Ability meta dominance** | LOW | 100-point power budget ensures parity. Monthly balance patches. Win rate monitoring. |
| **Pay for faster unlock** | LOW-MEDIUM | Whales can buy ability packs for gems to unlock faster, but no ability is exclusive to paying players. |
| **Charge speed advantage** | MEDIUM | Legend cards charge 20% faster than Normal. Mitigated by: skill-based charge (good play = fast charge regardless), 20% is ~12s on longest abilities, and charge rate difference shrinks with event-based charging. |
| **Counter-play accessibility** | ❌ NONE | All counters available through F2P abilities, positioning, or timing. No paid counter. |

### 11.2 The "No Ability Still Viable" Test

> A player with no special abilities on any card should still win ≥ 45% of matches against ability-equipped opponents of equal MMR.

**How We Ensure This:**
- Abilities are time-limited effects (max 3s duration)
- Abilities have wind-up periods exploitable by skilled players
- Normal gameplay mechanics (passing, shooting, tackling) are always available
- Ability cooldowns mean 80%+ of match time is "normal football"
- Matchmaking considers ability loadout as minor factor in power score (per [GDD-04](competitive-progression-en.md))

### 11.3 Sustainability Analysis

| Factor | Score | Reasoning |
|--------|-------|-----------|
| **Content Expansion** | 9/10 | 2-4 new abilities per season = fresh meta every 3 months without invalidating old abilities |
| **Cosmetic Revenue** | 8/10 | VFX skins for abilities (same stats, different visuals) = infinite cosmetic revenue stream |
| **Competitive Integrity** | 9/10 | Power budget system + monthly patches + counter matrix = stable competitive scene |
| **Spectacle Value** | 10/10 | Abilities create viral highlight moments → organic marketing → player acquisition |
| **Skill Expression** | 9/10 | Ability timing, selection, and counter-play add depth without replacing fundamental football skill |
| **F2P Fairness** | 8/10 | Full collection in 6 months F2P; charge speed is only paid advantage and it's capped at 20% |
| **Overall Ability Sustainability** | **8.8/10** | Strong system that adds depth and spectacle while maintaining competitive fairness |

### 11.4 Monetization Through Abilities (Non-P2W)

| Revenue Source | Description | P2W Status |
|---------------|-------------|-----------|
| **Ability Packs** | Buy packs to unlock abilities faster | Acceleration only — not exclusive |
| **VFX Skins** | Alternative visual effects for abilities (same stats) | 100% Cosmetic |
| **Activation Sounds** | Custom sound effects for ability activation | 100% Cosmetic |
| **Ability Trails** | Custom trail effects during ability execution | 100% Cosmetic |
| **Seasonal Variants** | Limited-time VFX themes (e.g., Holiday Roaring Flame = candy cane fire) | 100% Cosmetic |

---

## Appendix A: Ability Quick Reference Card

| ID | Name | Cat | Elem | Tier | Charge | CD | Uses | Key Counter |
|----|------|-----|------|------|--------|----|------|-------------|
| O1 | Roaring Flame Strike | OFF | Fire | 3 | 80s | 40s | 1 | Inferno Guard, tackle wind-up |
| O2 | Vacuum Zero Shot | OFF | Ice | 3 | 80s | 40s | 1 | Glacier Reflex, positioning |
| O3 | Thunder Shot | OFF | Light | 2 | 50s | 25s | 2 | Storm Shield, GK positioning |
| O4 | Cyclone Cross | OFF | Wind | 2 | 50s | 25s | 2 | Gale Force, intercept |
| O5 | Samba Banana Strike | OFF | Wind | 2 | 50s | 25s | 2 | GK reading curve |
| O6 | Flash Dribble | OFF | Light | 1 | 30s | 15s | 3 | Permafrost Tackle |
| O7 | Phantom Pass | OFF | Shadow | 1 | 30s | 15s | 3 | Track the ball |
| O8 | Ember Volley | OFF | Fire | 2 | 50s | 25s | 2 | Prevent cross setup |
| D1 | Lava Block | DEF | Fire | 2 | 50s | 25s | 2 | Go around / wait |
| D2 | Frost Wall | DEF | Ice | 2 | 50s | 25s | 2 | Go around / wait |
| D3 | Storm Shield | DEF | Light | 1 | 30s | 15s | 3 | Pass before range |
| D4 | Shadow Intercept | DEF | Shadow | 1 | 30s | 15s | 3 | Feint pass |
| D5 | Gale Force | DEF | Wind | 2 | 50s | 25s | 2 | Curve with wind |
| D6 | Permafrost Tackle | DEF | Ice | 1 | 30s | 15s | 3 | Jump / pass early |
| T1 | Flash Step | TAC | Light | 1 | 30s | 15s | 3 | Predict destination |
| T2 | Shadow Clone | TAC | Shadow | 2 | 50s | 25s | 2 | Track ball, not player |
| T3 | Wind Walk | TAC | Wind | 1 | 30s | 15s | 3 | Only movement speed |
| T4 | Fire Formation | TAC | Fire | 2 | 50s | 25s | 2 | Counter-attack during reset |
| T5 | Frozen Moment | TAC | Ice | 3 | 80s | 40s | 1 | Short duration, pre-position |
| T6 | Phantom Swap | TAC | Shadow | 1 | 30s | 15s | 3 | Track ball holder |
| T7 | Tailwind Pass | TAC | Wind | 2 | 50s | 25s | 2 | Adjusted interception |
| T8 | Chain Lightning | TAC | Light | 2 | 50s | 25s | 2 | Intercept any pass in chain |
| G1 | Inferno Guard | GK | Fire | 2 | 50s | 25s | 2 | Dribble into box |
| G2 | Glacier Reflex | GK | Ice | 2 | 50s | 25s | 2 | Power/placement shots |
| G3 | Thunder Distribution | GK | Light | 1 | 30s | 15s | 3 | Defensive awareness |
| G4 | Void Presence | GK | Shadow | 3 | 80s | 40s | 1 | Shoot to corners |

---

## Appendix B: Balance Tuning Variables

Every ability has these tunable parameters for live-service balancing:

| Parameter | Description | Adjustment Range |
|-----------|-------------|-----------------|
| `chargeTime` | Base time to fully charge | ±20% |
| `cooldown` | Time after use before recharge | ±30% |
| `effectDuration` | How long the effect lasts | ±25% |
| `effectMagnitude` | Strength of the effect (e.g., % speed boost) | ±15% |
| `aoeRadius` | Area of effect radius | ±20% |
| `windUpTime` | Telegraph/wind-up duration | ±50% |
| `usesPerMatch` | Maximum activations per match | ±1 |
| `interruptWindow` | How long the ability can be interrupted during wind-up | ±0.3s |

---

*This document defines the complete Special Abilities & GGO System for Project F. All abilities, balance parameters, and counter-play mechanics must follow these specifications. Balance changes require data-driven justification and Game Designer approval.*

*Next Document: [GDD-08: LiveOps & Seasons](liveops-seasons-en.md)*
