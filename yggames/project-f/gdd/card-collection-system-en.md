# Project F — Card & Collection System Design Document

**Document Code:** GDD-02
**Version:** 1.0
**Date:** March 17, 2026
**Author:** Game Designer Agent, YG Games
**Status:** Draft
**Based On:** [GDD-00 Competitor Analysis](docs/00-competitor-analysis-en.md) | [GDD-01 Core Game Design](core-game-design-en.md)

---

## Table of Contents

1. [System Overview](#1-system-overview)
2. [Card Types](#2-card-types)
3. [Rarity System](#3-rarity-system)
4. [Name & Face Customization](#4-name--face-customization)
5. [Card Merging & Upgrade System](#5-card-merging--upgrade-system)
6. [Special Abilities](#6-special-abilities)
7. [Collection & Album Progression](#7-collection--album-progression)
8. [Card Lifecycle & Economy](#8-card-lifecycle--economy)
9. [P2W Balance & Sustainability Evaluation](#9-p2w-balance--sustainability-evaluation)

---

## 1. System Overview

### 1.1 Design Philosophy

The Card & Collection System is the **backbone of Project F's progression.** Every match is played with cards. Every reward is a card or currency toward cards. Every expression of player identity flows through the card system.

**Three Pillars:**

| Pillar | Principle | Design Goal |
|--------|-----------|-------------|
| **Identity** | Cards are personal creations, not just collected assets | Name, face, bio customization makes every card unique to the owner |
| **Fairness** | Cards create meaningful but not insurmountable advantages | Capped at Super tier, soft power ceiling, skill:wallet = 70:30 |
| **Value** | Every card has worth — no "junk cards" | Merging, recycling, collection bonuses, and trading ensure all cards serve a purpose |

### 1.2 Foundation Decisions (from GDD-01)

These decisions are established in the Core Game Design and are non-negotiable:

- **5 rarity tiers** (Normal, Special, Rare, Expert, Super) — **no Legendary tier**
- **Failure-protected merging** — cards are never destroyed on failure
- **Published odds** — all drop rates and merge probabilities are visible
- **Seasonal reset** — all player cards reset; cosmetics, currency, and customization presets carry over
- **No energy system** — unlimited play sessions

**Reference:** Card system design principles — [How To Design A Gacha System](https://mobilefreetoplay.com/design-gacha-system/) | [Designing a Strong Gacha](https://www.deconstructoroffun.com/blog/2017/8/31/designing-a-strong-gacha) | [Collection Systems in Mobile Games](https://www.blog.udonis.co/mobile-marketing/mobile-games/collection-systems-mobile-games)

---

## 2. Card Types

### 2.1 Overview

Project F has **three card categories**, each serving a distinct gameplay role:

```
┌─────────────────────────────────────────────────┐
│              CARD CATEGORIES                    │
│                                                 │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐      │
│  │ PLAYER   │  │ MANAGER  │  │  TEAM    │      │
│  │ CARDS    │  │ CARDS    │  │  CARDS   │      │
│  │          │  │          │  │          │      │
│  │ 6 per    │  │ 1 per    │  │ 1 per    │      │
│  │ squad    │  │ squad    │  │ squad    │      │
│  │          │  │          │  │          │      │
│  │ Stats,   │  │ Passive  │  │ Visual   │      │
│  │ Abilities│  │ Bonuses, │  │ Identity,│      │
│  │ Roles    │  │ Tactics  │  │ Chemistry│      │
│  └──────────┘  └──────────┘  └──────────┘      │
└─────────────────────────────────────────────────┘
```

### 2.2 Player Cards

Player cards are the **core gameplay unit.** Each represents one footballer on the 6v6 pitch.

**Card Anatomy:**

```
┌─────────────────────────────────┐
│ [Rarity Border Color]           │
│                                 │
│  ┌─────────┐   NAME: "Yıldız"  │
│  │  FACE   │   POSITION: ST    │
│  │ PRESET  │   TIER: Expert    │
│  │  #47    │   LEVEL: 23/30    │
│  └─────────┘                    │
│                                 │
│  OVR: 82                        │
│                                 │
│  SPD: 78  SHT: 85  PAS: 72     │
│  DRB: 80  DEF: 45  PHY: 70     │
│                                 │
│  ⚡ ABILITY: Roaring Flame      │
│     Strike (Lv.2)               │
│                                 │
│  BIO: "Gözleri kaleyi gören    │
│  doğuştan golcü."              │
│                                 │
│  [Customization Badge]          │
└─────────────────────────────────┘
```

**Player Card Stats:**

| Stat | Abbreviation | Description | Affects |
|------|-------------|-------------|---------|
| **Speed** | SPD | Movement speed, acceleration, sprint endurance | All positions; critical for LW/RW |
| **Shooting** | SHT | Shot power, accuracy, finesse, volleys | Critical for ST; useful for MF |
| **Passing** | PAS | Short pass accuracy, through ball weight, cross quality | Critical for MF; useful for all |
| **Dribbling** | DRB | Ball control, skill moves, close control under pressure | Critical for wingers and ST |
| **Defending** | DEF | Tackling, interception, marking, positioning | Critical for DF; useful for MF |
| **Physical** | PHY | Stamina, strength, aerial ability, injury resistance | Useful for all; critical for DF/ST |

**Overall Rating (OVR) Calculation:**
- OVR = Weighted average based on position
- ST: SHT(30%) + SPD(25%) + DRB(20%) + PAS(10%) + PHY(10%) + DEF(5%)
- MF: PAS(30%) + DRB(20%) + PHY(15%) + SHT(15%) + SPD(10%) + DEF(10%)
- DF: DEF(35%) + PHY(25%) + SPD(15%) + PAS(15%) + DRB(5%) + SHT(5%)
- GK: Uses specialized stats (Diving, Handling, Positioning, Reflexes, Kicking, PHY)

**GK Specialized Stats:**

| Stat | Description |
|------|-------------|
| **Diving** | Reach and agility on dives to either side |
| **Handling** | Catching ability, parry control, fumble resistance |
| **Positioning** | Starting position for shots, cross coverage |
| **Reflexes** | Reaction speed to close-range shots |
| **Kicking** | Goal kick distance, throw accuracy, distribution |
| **Physical** | Height factor, aerial dominance, stamina |

### 2.3 Manager Cards

Manager cards provide **passive tactical bonuses** to the entire squad. One manager card is equipped per squad.

| Attribute | Description |
|-----------|-------------|
| **Tactical Style** | Offensive / Balanced / Defensive — affects AI behavior of non-controlled players |
| **Formation Bonus** | +3% to all stats when using the manager's preferred formation |
| **Specialty Boost** | One stat category boosted by +5% for all players (e.g., "Passing Specialist" = +5% PAS) |
| **Stamina Management** | Slow / Normal / Fast stamina recovery rate for the team |
| **Halftime Morale** | +1% / +2% / +3% stat boost in the second half (simulates motivational speech) |

**Manager Card Rarity:**

| Tier | Formation Bonus | Specialty Boost | Stamina | Halftime Morale |
|------|----------------|----------------|---------|-----------------|
| Normal | +1% | +2% | Slow | +1% |
| Special | +2% | +3% | Normal | +1% |
| Rare | +2% | +4% | Normal | +2% |
| Expert | +3% | +4% | Fast | +2% |
| Super | +3% | +5% | Fast | +3% |

> **P2W Check:** Manager bonuses are deliberately small (max +5% in one stat). The difference between a Normal and Super manager is noticeable but not game-deciding. A skilled player with a Normal manager can absolutely defeat a less-skilled player with a Super manager.

### 2.4 Team Cards

Team cards represent the **visual and structural identity** of the squad. One team card is equipped per squad.

| Attribute | Description |
|-----------|-------------|
| **Kit Design** | Home and away kit appearance (colors, patterns, sponsor area) |
| **Stadium Theme** | Visual backdrop for home matches (grass type, stands, atmosphere effects) |
| **Team Emblem** | Displayed on kits and match loading screen |
| **Chemistry Style** | Defines how chemistry bonuses are calculated (see §2.5) |
| **Team Celebration** | Shared team goal celebration animation |

**Team Card Sources:**
- **Starter Team Card:** Given at account creation (basic kit, default stadium)
- **Earned Team Cards:** Rewards from ranked milestones, tournament wins, seasonal events
- **Crafted Team Cards:** Assemble from kit/stadium/emblem components earned through gameplay
- **Premium Team Cards:** Cosmetic-only purchases (exclusive kits, animated stadiums, special effects)

> **P2W Check:** Team cards are 100% cosmetic except for Chemistry Style. Chemistry Styles are earnable through gameplay and provide small bonuses that don't break competitive balance.

### 2.5 Chemistry System

Chemistry rewards building a **thematically coherent squad** rather than randomly stacking the highest-rated cards.

**Chemistry Links:**

| Link Type | Condition | Bonus |
|-----------|-----------|-------|
| **Position Link** | Two adjacent players are in their natural positions | +1 Chemistry per link |
| **Style Link** | Two adjacent players share the same playstyle tag (e.g., "Speedster," "Playmaker") | +1 Chemistry per link |
| **Manager Link** | Player's position matches manager's preferred formation slot | +1 Chemistry per player |
| **Team Link** | Player matches team card's chemistry style | +1 Chemistry per player |

**Chemistry Levels:**

| Chemistry | Level | Effect |
|-----------|-------|--------|
| 0-5 | Poor | -5% to all stats |
| 6-10 | Average | No bonus or penalty |
| 11-15 | Good | +3% to primary stats |
| 16-20 | Excellent | +5% to primary stats |
| 21+ | Perfect | +7% to primary stats + visual aura effect |

**Max Chemistry:** 6 players × 3 possible links each + manager bonus = theoretical max ~24

> **Design Intent:** Chemistry prevents the "all-star" problem where the best team is always 6 of the highest-rated cards. Players must think about synergy, creating strategic depth in squad building.

---

## 3. Rarity System

### 3.1 Rarity Tiers

| Tier | Turkish Name | Border Color | Card Background | Visual Effects |
|------|-------------|-------------|-----------------|----------------|
| **Normal** | Normal | Grey | Matte grey | None |
| **Special** | Özel | Green | Subtle shimmer | Faint glow on stats |
| **Rare** | Nadir | Blue | Metallic blue | Animated border pulse |
| **Expert** | Uzman | Purple | Deep purple gradient | Particle effects on card edges |
| **Super** | Süper | Gold | Animated gold with holographic effect | Full animated card with ability preview |

**Reference:** Card rarity visual systems — [FUT Player Cards](https://www.fifplay.com/encyclopedia/fut-player-cards/) | [EA Sports FC 26 Rarities](https://www.fut.gg/rarities/)

### 3.2 Stat Ranges by Rarity

| Tier | Stat Range (per stat) | OVR Range | Max Total Stats |
|------|----------------------|-----------|-----------------|
| Normal | 40-60 | 45-58 | 330 |
| Special | 55-72 | 58-68 | 396 |
| Rare | 65-82 | 68-78 | 456 |
| Expert | 75-90 | 78-87 | 510 |
| Super | 82-95 | 87-93 | 555 |

**Key Constraint — The Soft Power Ceiling:**

The stat gap between Normal (max 330 total) and Super (max 555 total) is approximately **+68%.** This sounds large but is distributed across 6 stats and modified by chemistry, abilities, and player skill.

**Comparison to Goley:**
- Goley's Legendary vs. Normal gap: **+200-300%** in key stats — made free players helpless
- Project F's Super vs. Normal gap: **+68% total** — noticeable advantage, but a skilled Normal player can outplay a poorly-skilled Super player

**The "3-Tier Competitive Window":**
We design so that the competitive window spans **at least 3 tiers.** A Rare-tier team with Perfect Chemistry and skilled controls should be competitive against an Expert-tier team with Average Chemistry and mediocre skill. This is the core balance promise.

### 3.3 Level-Up System

Each card earns XP from matches and can be leveled up within its tier:

| Tier | Max Level | Stat Growth per Level | Total Growth at Max |
|------|-----------|----------------------|-------------------|
| Normal | 10 | +1.0 per stat | +10 per stat |
| Special | 15 | +0.8 per stat | +12 per stat |
| Rare | 20 | +0.7 per stat | +14 per stat |
| Expert | 25 | +0.6 per stat | +15 per stat |
| Super | 30 | +0.5 per stat | +15 per stat |

> **Design Note:** Higher tiers have diminishing returns per level. This prevents power creep at the top and ensures that leveling a Normal card to max provides meaningful improvement.

### 3.4 Drop Rates (Published)

**Standard Pack:**

| Tier | Drop Rate |
|------|-----------|
| Normal | 50% |
| Special | 30% |
| Rare | 15% |
| Expert | 4.5% |
| Super | 0.5% |

**Premium Pack:**

| Tier | Drop Rate |
|------|-----------|
| Normal | 20% |
| Special | 35% |
| Rare | 30% |
| Expert | 12% |
| Super | 3% |

**Elite Pack (Season-end rewards only):**

| Tier | Drop Rate |
|------|-----------|
| Normal | 0% |
| Special | 10% |
| Rare | 40% |
| Expert | 35% |
| Super | 15% |

> **Regulatory Future-Proofing:** All pack odds are displayed before purchase and on a dedicated "Drop Rates" page accessible from the main menu. This complies with Belgian, Dutch, South Korean, and upcoming EU loot box transparency regulations. See Competitor Analysis §4.3.

### 3.5 Pity System

**Global Pity Counter (Cross-Pack):**

| Tier | Pity Threshold | Effect |
|------|---------------|--------|
| Rare+ | 20 packs without Rare or higher | Next pack guaranteed Rare+ |
| Expert+ | 50 packs without Expert or higher | Next pack guaranteed Expert+ |
| Super | 150 packs without Super | Next pack guaranteed Super |

The pity counter persists across all pack types and resets only when a card of that tier or higher is pulled. Counter is visible to the player in the Pack Opening screen.

### 3.6 Deterministic Acquisition (Nominating System)

Inspired by eFootball's Nominating Contracts, Project F offers a **Nominating System** for targeted card acquisition:

**Reference:** [eFootball Nominating Contract System](https://gamingonphone.com/guides/efootball-2026-highlight-role-changers-march-2026-nominating-contract-review/)

**How It Works:**
1. A weekly "Nomination Pool" features 10-15 specific card templates across all tiers.
2. Players spend **Nomination Tokens** (earned through ranked play, challenges, and events) to select exactly which card they want.
3. The nominated card is created at its base stats for the relevant tier — no RNG.

**Token Costs:**

| Card Tier | Token Cost |
|-----------|-----------|
| Normal | 1 Token |
| Special | 3 Tokens |
| Rare | 8 Tokens |
| Expert | 20 Tokens |
| Super | 50 Tokens |

**Token Earning Rate:** ~3-5 Tokens per week for active players (daily quests + ranked milestones + weekly challenges).

> **P2W Check:** Nomination Tokens cannot be purchased with premium currency. They are exclusively gameplay-earned. This ensures that even Super-tier cards have a deterministic F2P path. A dedicated F2P player can nominate a Super card approximately every 10-17 weeks.

---

## 4. Name & Face Customization

### 4.1 Design Philosophy

Card customization is Project F's **emotional differentiator.** Instead of collecting "Ronaldo" or "Messi" (which we don't license), players create their own legends. Every card can be named, given a face, and personalized — transforming generic "Player Card #4827" into "Yıldız, the Flame Striker who won me three tournaments."

### 4.2 Name System

**Name Assignment:**
- Every card arrives with a randomly generated name (from a culturally diverse name bank)
- Players can **rename any card** using the Card Workshop (free, unlimited renames)
- Names must pass a profanity filter (multi-language)
- Name appears on the card face, in match UI, and in post-match screens
- Other players see YOUR card name in matches (part of the identity expression)

**Random Name Bank:**
- 500+ first names (Turkish, international mix)
- 500+ surnames (Turkish, international mix)
- Combination algorithm prevents duplicates within a single squad
- Culturally appropriate combinations (no mismatched cultural pairings)

### 4.3 Face Customization

**Face Preset System:**
- **100+ face presets** organized by style categories
- Each preset defines: hair style, hair color, skin tone, facial features, facial hair, accessories

**Categories:**

| Category | Count | Examples |
|----------|-------|---------|
| **Classic** | 25 | Clean-cut professional footballer looks |
| **Stylish** | 20 | Trendy hairstyles, accessories |
| **Tough** | 15 | Scars, intense expressions, shaved heads |
| **Youth** | 15 | Young, fresh-faced appearances |
| **Veteran** | 10 | Mature, experienced appearances |
| **Unique** | 15+ | Distinctive looks (mohawks, headbands, masks, facepaint) |

**Customization Layers:**
1. **Base Preset:** Choose one of 100+ presets (free)
2. **Color Adjustments:** Hair color, skin tone, eye color (free)
3. **Accessories:** Headbands, wristbands, boots, gloves (cosmetic rewards / premium)
4. **Expression:** Default facial expression during match (determined, cheerful, fierce, calm)

> **Design Note:** Face presets are chibi-style — large heads, expressive eyes, simplified features. This makes even small customization choices highly visible and recognizable on the match screen.

### 4.4 Card Biography

- Each card has a **short bio field** (max 120 characters)
- Auto-generated at creation with a randomized template ("Born to score." / "Silent but deadly." etc.)
- Player can edit freely (profanity filter applies)
- Bio is visible on the card detail screen and in player profile

### 4.5 Customization Persistence Through Seasons

When a seasonal reset occurs:
- **Names and face presets are saved to a "Favorites" library** (max 50)
- New cards obtained in the next season can be assigned saved names/faces instantly
- This preserves player identity even through reset cycles
- Custom bios are also saved to the library

---

## 5. Card Merging & Upgrade System

### 5.1 System Overview

Card merging is the **primary vertical progression path.** Players combine cards to potentially create higher-tier cards, using a protected system that never punishes failure with card loss.

```
MERGING FLOW:

  [Card A] + [Card B] ──→ [Merge Attempt]
  (Same tier required)       │
                              ├─→ SUCCESS: New card of same or higher tier
                              │              (Higher tier = lucky upgrade!)
                              │
                              └─→ FAILURE: Both cards returned unchanged
                                           + Merge XP granted
                                           + Pity counter advanced
```

### 5.2 Merge Rules

| Rule | Detail |
|------|--------|
| **Same Tier Required** | Both input cards must be the same rarity tier |
| **Same Position Not Required** | Any position can merge with any position |
| **Output Position** | Player chooses which input card's position the output inherits |
| **Output Stats** | Base stats of the output tier + slight random variance |
| **Customization** | Output card starts with no name/face — player must customize (or auto-generate) |
| **Ability Inheritance** | If either input card had an ability, output has 50% chance to inherit it; otherwise starts blank |
| **Level Reset** | Output card starts at Level 1 of its tier |

### 5.3 Merge Success Rates (Published)

| Merge | Same Tier Output | Tier-Up Output | Pity Threshold |
|-------|-----------------|----------------|----------------|
| Normal + Normal | 80% (→ Normal) | 20% (→ Special) | 2 failures |
| Special + Special | 70% (→ Special) | 30% (→ Rare) | 3 failures |
| Rare + Rare | 65% (→ Rare) | 35% (→ Expert) | 4 failures |
| Expert + Expert | 75% (→ Expert) | 25% (→ Super) | 5 failures |

**Same-Tier Output:** The resulting card has slightly randomized stats within the tier range. There's a ~30% chance of getting stats in the top quartile of the tier.

**Tier-Up Output:** The resulting card starts at the base stat range of the new tier.

### 5.4 Merge XP System

Failed merges aren't wasted — they generate **Merge XP:**

| Failed Merge Tier | Merge XP Earned |
|-------------------|----------------|
| Normal | 10 MXP |
| Special | 25 MXP |
| Rare | 60 MXP |
| Expert | 150 MXP |

**Merge XP Spending:**

| Purchase | Cost |
|----------|------|
| Guaranteed Same-Tier Merge (Normal) | 30 MXP |
| Guaranteed Same-Tier Merge (Special) | 75 MXP |
| Guaranteed Same-Tier Merge (Rare) | 180 MXP |
| Guaranteed Same-Tier Merge (Expert) | 450 MXP |
| Guaranteed Tier-Up (any tier) | 3× the same-tier cost |

> **Design Intent:** This creates a "no waste" economy where every merge attempt, successful or not, contributes toward guaranteed progress. After enough attempts, even the unluckiest player can force a tier-up.

### 5.5 Quick Merge (Batch Processing)

For convenience, players can:
- **Auto-merge duplicates:** Automatically merge pairs of same-tier cards (lowest stats first)
- **Merge queue:** Queue up to 10 merges and execute them in sequence
- **Merge preview:** See probability outcomes before confirming

### 5.6 Card Recycling

Cards that aren't needed for merging can be **recycled** for resources:

| Card Tier | Coin Value | XP Shards | Merge XP |
|-----------|-----------|-----------|----------|
| Normal | 50 Coins | 10 | 5 MXP |
| Special | 150 Coins | 30 | 12 MXP |
| Rare | 500 Coins | 80 | 30 MXP |
| Expert | 1,500 Coins | 200 | 75 MXP |
| Super | 5,000 Coins | 500 | 200 MXP |

**XP Shards** can be applied to any card to grant bonus XP (accelerating level-ups).

> **Goley Lesson:** In Goley, low-tier cards became worthless ("junk"). In Project F, every card has a clear value: merge it, recycle it for coins/MXP/XP Shards, contribute it to a collection, or trade it. Zero junk cards.

---

## 6. Special Abilities

### 6.1 Ability Architecture

Each player card has **one ability slot.** Abilities are separate items that can be equipped, unequipped, and transferred between cards.

```
ABILITY SYSTEM:

  [Card] + [Ability Item] ──→ [Equipped Card]
                                    │
                          Ability appears on card face
                          Active in matches when charged
                          Can be unequipped anytime
```

### 6.2 Ability Tiers

Abilities have their own tier system (independent of card rarity):

| Ability Tier | Visual Indicator | Charge Speed | Effect Strength | Source |
|-------------|-----------------|-------------|-----------------|--------|
| **Bronze** | Copper icon | Slow (90 sec of active play) | Base effect | Common drop from packs, challenges |
| **Silver** | Silver icon | Medium (70 sec) | +15% effect | Merge 2 Bronze abilities, ranked rewards |
| **Gold** | Gold icon | Fast (50 sec) | +30% effect | Merge 2 Silver abilities, tournament rewards, events |

> **Critical P2W Rule:** Ability tiers affect charge speed and effect strength, but the fundamental ability effect is the same at all tiers. A Bronze "Roaring Flame Strike" still works — it just charges slower and has slightly less power boost than a Gold version. The skill of timing and aiming the ability matters far more than the tier.

### 6.3 Ability Categories

| Category | Count | Effect Type | Best For |
|----------|-------|-------------|----------|
| **Offensive** | 8 | Enhance shots, dribbles, movement for attack | ST, LW, RW |
| **Defensive** | 6 | Enhance tackles, blocks, positioning for defense | DF, GK |
| **Playmaking** | 5 | Enhance passes, vision, movement off-ball | MF |
| **Goalkeeper** | 4 | Enhance saves, dives, reach, positioning | GK only |
| **Universal** | 3 | Stamina, speed, or disruption effects | Any position |

**Full Ability List:**

**Offensive Abilities:**

| # | Name | Turkish | Effect | Counter |
|---|------|---------|--------|---------|
| 1 | Roaring Flame Strike | Kızgın Alev Vuruşu | Powered shot with fire trail, +30% shot power | GK abilities or positioning |
| 2 | Phantom Dribble | Hayalet Çalım | 1.5 sec invincibility during dribble, afterimage | Anchor Tackle |
| 3 | Thunder Volley | Gök Gürültüsü Vole | Aerial shots gain +50% power and accuracy | Only works on aerial balls |
| 4 | Shadow Sprint | Gölge Sprinti | 3 sec 2x speed burst with shadow trail | 50% stamina drain |
| 5 | Venom Curve | Zehir Eğrisi | Finesse shots curve 2x more with green trail | Predictable curve direction |
| 6 | Earthquake Header | Deprem Kafa | Headers gain +40% power, screen shake effect | Only for headers |
| 7 | Mirage Step | Serap Adımı | Create a decoy run that distracts AI defenders | Experienced players read the real run |
| 8 | Comet Rush | Kuyruklu Yıldız Koşusu | 2 sec sprint leaving a comet trail, auto-nutmeg on contact | Narrow window, heavy stamina cost |

**Defensive Abilities:**

| # | Name | Turkish | Effect | Counter |
|---|------|---------|--------|---------|
| 1 | Anchor Tackle | Çapa Müdahalesi | Unmissable tackle in 3m range, roots attacker | Only works in 3m range |
| 2 | Steel Wall | Çelik Duvar | 3 sec +50% physical, immovable body block | Cannot chase, must position correctly |
| 3 | Ice Field | Buz Sahası | 5m radius slow for 3 sec, ice visual | Heat Aura immunity |
| 4 | Magnetic Pull | Manyetik Çekim | Ball magnetizes toward defender for 2 sec intercept | Only works on loose balls |
| 5 | Mirror Shield | Ayna Kalkanı | Reflects opponent ability (negates their special and charges yours) | Only activates reactively |
| 6 | Fortress Zone | Kale Bölgesi | 4m area gains +30% DEF for all defenders inside for 4 sec | Attackers can shoot from outside |

**Playmaking Abilities:**

| # | Name | Turkish | Effect | Counter |
|---|------|---------|--------|---------|
| 1 | Lightning Pass | Yıldırım Pası | Uncatchable ground pass cutting through defenders | Only ground, interceptable at receiver |
| 2 | Eagle Eye | Kartal Gözü | 3 sec x-ray vision showing all player positions and run paths | Opponent can change runs after activation |
| 3 | Time Warp Pass | Zaman Bükümü Pası | Through ball that arrives 0.5 sec before receiver, auto-perfect weight | Long cooldown |
| 4 | Conductor's Baton | Orkestra Şefi | All teammates gain +10% PAS and +10% SPD for 5 sec | Modest boost, depends on team execution |
| 5 | Ghost Runner | Hayalet Koşucu | Trigger a specific teammate to make an AI-perfect run | One run only, defender can track |

**Goalkeeper Abilities:**

| # | Name | Turkish | Effect | Counter |
|---|------|---------|--------|---------|
| 1 | Iron Wall | Demir Duvar | GK immovable for 2 sec, blocks zone shots | Chip shots go over |
| 2 | Reflex Surge | Refleks Dalgası | 2 sec superhuman reflexes, save any shot in range | Narrow activation window |
| 3 | Graviton Catch | Graviton Tutuşu | Ball magnetically pulled to gloves from 3m | Only works on shots, not headers |
| 4 | Titan Roar | Titan Kükreyişi | 3 sec intimidation aura, -20% SHT for attackers in penalty area | Doesn't affect abilities |

**Universal Abilities:**

| # | Name | Turkish | Effect | Counter |
|---|------|---------|--------|---------|
| 1 | Heat Aura | Sıcaklık Aurası | Immune to slow/freeze effects + slightly faster stamina recovery | No offensive benefit |
| 2 | Second Wind | İkinci Nefes | Instant full stamina restore | Once per match only |
| 3 | Disruption Pulse | Bozucu Darbe | Cancel opponent's active ability in 8m range | Only works reactively |

### 6.4 Ability Acquisition

| Source | Ability Tier | Frequency |
|--------|-------------|-----------|
| **Standard Packs** | Bronze (common) | Regular pull chance |
| **Challenge Mode Rewards** | Bronze / Silver | Weekly |
| **Ranked Milestones** | Silver | Season milestones |
| **Tournament Prizes** | Silver / Gold | Weekly/seasonal |
| **Boss Match Drops** | Bronze / Silver / Gold | Event-based |
| **Ability Merge** | Silver (2 Bronze), Gold (2 Silver) | Player-initiated |
| **Nomination System** | Any tier (costs tokens) | Weekly pool |

> **P2W Check:** Gold abilities are earnable through gameplay. No ability tier is locked behind premium purchases. The Nomination System allows F2P players to target specific abilities.

### 6.5 Ability Merge

| Merge | Result | Success Rate |
|-------|--------|-------------|
| Bronze + Bronze (same ability) | Silver version | 100% (guaranteed) |
| Bronze + Bronze (different abilities) | Silver of one (player's choice) | 70% |
| Silver + Silver (same ability) | Gold version | 100% (guaranteed) |
| Silver + Silver (different abilities) | Gold of one (player's choice) | 50% |

> **No ability destruction.** Failed ability merges return both abilities unchanged.

---

## 7. Collection & Album Progression

### 7.1 Collection Album

The Collection Album is a **meta-progression system** that rewards breadth of collection alongside depth.

**Album Structure:**

| Album Category | Pages | Completion Reward |
|---------------|-------|-------------------|
| **Position Masters** | 6 pages (one per position) | Collect 1 of each tier for each position (30 total) | Exclusive "Position Master" card border |
| **Ability Compendium** | 26 pages (one per ability) | Own every ability at least once | Exclusive ability visual effects upgrade |
| **Tier Collector** | 5 pages (one per tier) | Collect 20 unique cards of each tier | Coins + Nomination Tokens per tier |
| **Formation Library** | 6 pages | Win 10 matches with each formation | Unlock exclusive "Formation Expert" title |
| **Season Archive** | Grows each season | Records your best team from each season | Visual trophy case in player profile |

### 7.2 Collection Milestones

| Milestone | Reward |
|-----------|--------|
| **First Card Customized** | 100 Coins + Tutorial completion badge |
| **Full Squad (6 cards + manager + team)** | 1 Standard Pack |
| **10 Unique Cards Owned** | 500 Coins |
| **25 Unique Cards Owned** | 1 Premium Pack |
| **50 Unique Cards Owned** | 1,000 Coins + 1 Nomination Token |
| **100 Unique Cards Owned** | 2 Premium Packs + "Collector" title |
| **All 26 Abilities Collected** | Gold Ability Selection Box (choose any 1 Gold ability) |
| **Full Album Page Completed** | Page-specific reward (varies) |
| **Master Collector (Album 100%)** | Exclusive animated card border + "Master Collector" title |

### 7.3 Duplicate Value

Duplicates serve multiple purposes — they are never worthless:

| Duplicate Use | Value |
|---------------|-------|
| **Merge Fuel** | Required for merging (2 same-tier cards → higher tier chance) |
| **Recycling** | Coins + XP Shards + Merge XP |
| **Trading** | Trade with other players for cards you need |
| **Collection Count** | Counts toward "Unique Cards Owned" milestones only once (but merging count is unlimited) |

### 7.4 Trading System

**Player-to-Player Trading:**

| Rule | Detail |
|------|--------|
| **Currency** | Trades use in-game Coins as balance adjustments (no real money) |
| **Minimum Account Level** | Level 10 to access trading (prevents bot exploitation) |
| **Trade Fee** | 10% of Coin balance transferred goes to the system (economy sink) |
| **Daily Limits** | Max 5 trades per day (prevents market manipulation) |
| **Trade Preview** | Both players see full card stats, level, and ability before confirming |
| **Trade History** | Full audit trail for dispute resolution |

**Card Renting:**

| Rule | Detail |
|------|--------|
| **Rental Duration** | 1, 3, or 7 days |
| **Rental Fee** | Set by the lender (minimum 50 Coins, maximum 5,000 Coins per day) |
| **Rental Protection** | Rented cards cannot be merged, recycled, or traded |
| **Renter XP** | XP earned on rented cards goes to the renter's account (not the card) |
| **Auto-Return** | Card automatically returns to lender at rental end |

> **P2W Check:** Trading and renting use only in-game currency. There is no real-money marketplace. The daily trade limit and trade fee prevent real-money trading (RMT) from becoming viable.

---

## 8. Card Lifecycle & Economy

### 8.1 Card Entry Points (How Cards Enter the Economy)

| Source | Card Types | Frequency | Tier Distribution |
|--------|-----------|-----------|-------------------|
| **Match Rewards** | Player cards | Every match (small chance) | 90% Normal, 10% Special |
| **Daily Login** | Player cards | Daily (Day 7 = guaranteed) | Normal-Rare range |
| **Standard Packs** | Player + Manager + Ability | Earned through gameplay | Standard drop rates (§3.4) |
| **Premium Packs** | Player + Manager + Ability | Premium currency or achievements | Premium drop rates (§3.4) |
| **Elite Packs** | Player + Manager + Ability | Season-end rewards only | Elite drop rates (§3.4) |
| **Nomination System** | Specific targeted card | Weekly (token-gated) | Player's choice of tier |
| **Event Rewards** | Themed event cards | During events | Varies by event |
| **Tournament Prizes** | Player + Ability | Weekly/seasonal | Higher tiers for higher placement |
| **Trading** | Any card type | Player-initiated | Whatever is traded |
| **Challenge Rewards** | Player + Ability | Weekly rotation | Rare-Expert range |

### 8.2 Card Exit Points (How Cards Leave the Economy)

| Exit | Effect | Purpose |
|------|--------|---------|
| **Merging** | 2 cards consumed → 1 produced (net -1) | Primary card sink |
| **Recycling** | Card destroyed → Coins + MXP + XP Shards | Secondary card sink, resource generation |
| **Seasonal Reset** | ALL player cards removed from all accounts | Economy full-reset every 3 months |
| **Ability Merge** | 2 abilities consumed → 1 produced (net -1) | Ability progression sink |
| **Trade Fee** | 10% Coin tax on trades | Currency sink |

### 8.3 Economy Balance Targets

| Metric | Target | Monitoring |
|--------|--------|-----------|
| **Cards in Economy per Player** | 30-50 at any time | Seasonal avg |
| **Average Squad OVR** | 65-75 mid-season, 75-85 late-season | Weekly tracking |
| **Top 1% Squad OVR** | Max 90-93 (theoretical Super max) | Cap enforcement |
| **Merge Rate** | 3-5 merges per player per week | Activity metric |
| **Recycle Rate** | 5-10 cards per player per week | Economy sink metric |
| **Normal:Super Ratio in Economy** | 100:1 at season start, 50:1 by season end | Rarity integrity |

### 8.4 Seasonal Reset Flow

```
SEASON END
    │
    ▼
┌────────────────────────┐
│ Calculate Rewards       │
│ - MMR bracket pack     │
│ - Playtime bonus packs │
│ - Achievement bonuses  │
└────────────┬───────────┘
             │
             ▼
┌────────────────────────┐
│ Archive Season         │
│ - Best team snapshot   │
│ - Season stats record  │
│ - Achievement log      │
└────────────┬───────────┘
             │
             ▼
┌────────────────────────┐
│ Remove All Player Cards│
│ - Cards return to pool │
│ - Manager cards return │
│ - Team cards RETAINED  │
│ - Abilities RETAINED   │
└────────────┬───────────┘
             │
             ▼
┌────────────────────────┐
│ Distribute Reset Packs │
│ - Based on final MMR   │
│ - Bonus for playtime   │
│ - Loyalty multiplier   │
│   (seasons played)     │
└────────────┬───────────┘
             │
             ▼
┌────────────────────────┐
│ New Season Begins      │
│ - Fresh cards          │
│ - Saved name/face      │
│   presets available     │
│ - MMR soft reset       │
│ - New Nomination Pool  │
└────────────────────────┘
```

**What's Retained Across Seasons:**

| Retained | Not Retained |
|----------|-------------|
| Account level, achievements | Player cards (all tiers) |
| Coins, Gems | Manager cards |
| Team cards (cosmetic) | Card levels and stats |
| Abilities (items) | Merge XP balance |
| Name/Face favorites | Nomination Tokens |
| Unlocked formations | MMR (soft reset) |
| Collection Album progress | Pity counters |
| Cosmetic purchases | - |

> **Why retain abilities but not cards?** Abilities represent learned skills — it makes sense that knowledge persists. Cards represent team power — resetting them keeps the competitive landscape fresh while still rewarding loyal players through reset pack quality.

### 8.5 Inflation Control

| Mechanism | How It Works | Target |
|-----------|-------------|--------|
| **Seasonal Reset** | Removes all player/manager cards | Full economy refresh every 3 months |
| **Merge Consumption** | Each merge consumes 2 cards, produces 1 | Net -1 card per merge |
| **Recycling** | Converts excess cards to currencies | Prevents card accumulation |
| **Trade Tax** | 10% Coin fee on all trades | Currency drain |
| **Nomination Token Scarcity** | 3-5 tokens/week, Super costs 50 | Gates deterministic high-tier acquisition |
| **No Card Duplication** | Trading/renting doesn't copy cards | Fixed card supply |

---

## 9. P2W Balance & Sustainability Evaluation

### 9.1 System-Level P2W Scorecard

| System | P2W Vector | Mitigation | Risk |
|--------|-----------|------------|------|
| **Card Tiers** | Higher tier = stronger stats | +68% max gap (not 200%+), 3-tier competitive window | ⚠️ Medium |
| **Card Merging** | Premium packs → more merge fuel | Published odds, pity system, failure protection | ✅ Low |
| **Manager Cards** | Super manager = +5% stat vs Normal's +2% | 3% gap is marginal; manager alone doesn't win games | ✅ Low |
| **Chemistry** | Whale can build Perfect Chemistry faster | Chemistry rewards thought, not spending; Normal cards with Perfect Chemistry beat Super cards with Poor Chemistry | ✅ Low |
| **Abilities** | Gold abilities charge faster | Effect difference is 30% on a single-use per match ability; skill matters more | ✅ Low |
| **Nomination** | Tokens are gameplay-only | No premium shortcut. Hard cap on weekly earning. | ✅ Low |
| **Trading** | Could enable RMT | Coin-only, daily limits, trade tax, account level gate | ⚠️ Medium |
| **Season Reset** | Better players get better restart packs | Pack quality is MMR + playtime, not spending. Can't buy Diamond packs. | ✅ Low |
| **Drop Rates** | Premium packs have better odds | Published odds, pity system, deterministic Nomination path | ✅ Low |

### 9.2 The "Free Player Test"

**Scenario:** A completely free player joins at the start of a season. After 4 weeks of daily play (~3 matches/day, 15 matches/week):

| Week | Expected Squad | Competitive Level |
|------|---------------|-------------------|
| Week 1 | 6 Normal cards, basic manager | Bronze/Silver rank |
| Week 2 | Mix of Normal/Special, 1-2 Rare from merging | Silver rank |
| Week 4 | Special/Rare core, 1-2 Expert from lucky merges/nomination | Gold rank |
| Week 8 | Rare/Expert core, possible Super from nomination | Platinum viable |
| Week 12 (Season end) | Expert-focused squad, 1-2 Super | Diamond viable with skill |

**Key Insight:** A free player's week-4 Rare/Expert team with good chemistry and skill should be able to defeat a whale's week-1 Super team with poor chemistry and mediocre skill. This is the fundamental balance promise.

### 9.3 Anti-Hoarding Design

The seasonal reset prevents the accumulation problem that killed Goley:

| Goley Problem | Project F Solution |
|--------------|--------------------|
| Veterans had 3+ years of card advantage | Seasonal reset ensures max advantage is ~3 months |
| New players faced insurmountable gap | New season = everyone rebuilds (with veteran advantage in packs, not permanent power) |
| Card economy inflated over time | Full reset + fresh economy each season |
| P2W purchases accumulated indefinitely | Spending advantage resets; cosmetics persist as permanent value |

### 9.4 Sustainability Summary

| Factor | Assessment |
|--------|-----------|
| **Content Freshness** | Seasonal resets + new Nomination pools + events = constant renewal |
| **Collection Motivation** | Album system provides goals beyond raw power |
| **Identity Investment** | Card customization creates emotional attachment surviving resets |
| **Economic Health** | Multiple card sinks + seasonal reset = no hyperinflation |
| **Fair Competition** | Team power matchmaking + 3-tier competitive window = accessible |
| **Spending Value** | Cosmetics persist forever; card advantages are temporal = spending feels fair |
| **New Player Experience** | Season starts are natural entry points with level playing field |

---

## Appendix: Competitor Cross-Reference

| GDD Decision | Competitor Learning | Source |
|-------------|-------------------|--------|
| No Legendary tier, max Super | Goley's Legendary cards destroyed balance | GDD-00 §2.5 |
| Failure-protected merging | Goley destroyed cards on failure | GDD-00 §2.3 |
| Published all drop rates | Goley had predatory hidden odds | GDD-00 §2.4 |
| Deterministic Nomination System | eFootball's Nominating Contracts reduce gacha frustration | GDD-00 §5.3 |
| Player Fusion-inspired ability system | eFootball's Player Fusion prevents waste | GDD-00 §5.3 |
| Chemistry system | FUT Chemistry incentivizes squad coherence over raw power | GDD-00 §4.2 |
| Card recycling/value floor | Goley had "junk cards" with no use | GDD-00 §2.4 |
| Seasonal reset with protected value | eFootball no-reset + FIFA Mobile 2025 pivot hybrid | GDD-00 §3.6, §5.6 |
| No real-money marketplace | Prevents RMT destroying game economy | Industry best practice |
| Pity system with visible counter | Regulatory trend + player trust | GDD-00 §4.3 |

---

*This document defines the Card & Collection System for Project F. It should be read alongside GDD-01 (Core Game Design) and serves as the foundation for GDD-03 (Game Economy & Monetization).*

*Document prepared by: Game Designer Agent, YG Games*
*Date: March 17, 2026*
