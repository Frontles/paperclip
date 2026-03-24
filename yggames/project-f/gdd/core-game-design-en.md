# Project F — Core Game Design Document

**Document Code:** GDD-01
**Version:** 1.0
**Date:** March 17, 2026
**Author:** Game Designer Agent, YG Games
**Status:** Draft
**Based On:** [GDD-00 Competitor Analysis](docs/00-competitor-analysis-en.md)

---

## Table of Contents

1. [Game Concept](#1-game-concept)
2. [6v6 Mechanics](#2-6v6-mechanics)
3. [Game Loop](#3-game-loop)
4. [Game Modes](#4-game-modes)
5. [Camera Angles](#5-camera-angles)
6. [Target Audience](#6-target-audience)
7. [Controls](#7-controls)
8. [P2W Balance & Sustainability Evaluation](#8-p2w-balance--sustainability-evaluation)

---

## 1. Game Concept

### 1.1 High-Level Vision

**Project F** is a **6v6 real-time mobile football game** that blends the charm and nostalgia of Goley's chibi art style with modern competitive gameplay depth. Players build squads through a card-based system, compete in fast-paced ranked matches, and express themselves through deep customization — all while maintaining a strict **skill > wallet** philosophy.

> **One-line pitch:** "Goley reborn — charming, competitive, and fair."

### 1.2 Unique Selling Points

| # | USP | Why It Matters |
|---|-----|----------------|
| 1 | **6v6 Format** | Faster matches (~4 min), more touches per player, mobile-optimized. No dead time watching AI run across a full 11v11 pitch. |
| 2 | **Chibi Art Style with Modern Polish** | Goley proved this style creates emotional connection. We combine nostalgia with modern shaders, animations, and particle effects. |
| 3 | **Skill > Wallet (Always)** | Our monetization targets the DLS/eFootball "mild-to-moderate" zone. Spending accelerates, skill determines. No card tier will ever make a player unbeatable. |
| 4 | **Card Personality System** | Players name their cards, choose faces from presets, write bios. Cards feel like YOUR creations, not just collected assets. |
| 5 | **Special Abilities (Anime-Inspired)** | Inspired by GGO Football anime — earned through gameplay, visually spectacular, but counterplayable. |
| 6 | **Seasonal Reset with Protection** | Cards reset at season end, but rewards scale with MMR/playtime. Veterans restart with better packs. No permanent advantage hoarding (Goley's late-joiner problem) AND no punishment of loyal players (FIFA Mobile's churn driver). |
| 7 | **Card Trading & Renting** | Player-to-player economy. Rent a star card for a tournament, trade duplicates for value. Every card has worth. |
| 8 | **Turkish-First, Global-Ready** | Authentic Turkish commentary and localization as a launch differentiator (Goley's most beloved feature), with full English and expandable language support. |

### 1.3 What Sets Project F Apart

**vs. Goley:** We learn from every mistake. No uncapped power creep, no predatory gacha without odds, no destructive upgrades, no matchmaking that ignores team power. We keep what made Goley magical — the art, the celebrations, the community feel — and strip away everything that killed it.

**vs. FIFA Mobile/FC Mobile:** We reject OVR-driven gameplay where wallet determines victory. Our 6v6 format is purpose-built for mobile rather than a scaled-down console port. No annual resets, no $100 pack bundles.

**vs. eFootball:** We match their "skill matters" philosophy but deliver it in a faster, more accessible format. Our UI/UX will be polished from day one (eFootball's 2022 launch disaster proves first impressions are everything). Our chibi style is distinctive — we don't compete on realism.

**vs. DLS:** We add real-time PvP depth, social systems, and a card personality system that DLS lacks. Our 6v6 format offers a unique tactical identity vs. DLS's traditional 11v11.

### 1.4 Art Style & Visual Identity

**Style:** Chibi/stylized 3D characters with exaggerated proportions (large heads, compact bodies) inspired by Goley's aesthetic.

**Modern Enhancements:**
- PBR (Physically Based Rendering) materials for pitch, stadiums, and weather effects
- Dynamic cloth simulation on kits
- Expressive facial animations (joy, frustration, determination) despite chibi proportions
- Particle effects for special abilities, goals, and celebrations
- Day/night cycle and weather variations (rain, snow, sunset matches)

**Reference Images:**
- Goley's original chibi characters: [Goley Screenshot Gallery](https://oyunkayit.com/goley.html)
- Goley's 3D football gameplay: [Joygame Goley Blog](https://www.joygame.com/goley/blog/)
- Chibi art style in modern games: [The Adorable Revolution – Chibi Art in Games](https://medium.com/@purplebubblestudio/the-adorable-revolution-chibi-art-styles-in-video-games-777bb93d0a1a)

### 1.5 Core Fantasy

The player fantasy is: **"I built this team from nothing. These are MY players with MY names and MY faces. I trained them, I earned their abilities, and I outplayed everyone to climb the ranks."**

This fantasy is destroyed by P2W (someone else just bought a better team) and by full resets (everything I built is gone). Our design protects this fantasy at all costs.

---

## 2. 6v6 Mechanics

### 2.1 Why 6v6?

| Reason | Detail |
|--------|--------|
| **Mobile Session Length** | 6v6 matches complete in ~4 minutes (two 2-minute halves). 11v11 requires 6-10 minutes — too long for mobile sessions. |
| **Player Agency** | With 6 players per side, every player matters. No "dead weight" positions where AI runs aimlessly. Every touch is impactful. |
| **Tactical Depth** | Fewer players = clearer tactical decisions. Formations, positioning, and role assignments feel deliberate. |
| **Network Performance** | 12 total players = less data to sync = better performance on mobile networks. Reduced latency, fewer desyncs. |
| **Onboarding** | New players can learn 6 positions much faster than 11. Lower barrier to entry. |

### 2.2 Field Dimensions

| Parameter | Value | Rationale |
|-----------|-------|-----------|
| **Field Size** | 60m × 40m (scaled) | Based on FIFA 6v6 small-sided game recommendations. Proportionally smaller than 11v11 (105m × 68m). |
| **Goal Size** | 4m × 2m (scaled) | Smaller than standard (7.32m × 2.44m) to match player count and field scale. |
| **Penalty Area** | 12m × 8m (scaled) | Proportional to field; ensures goalkeepers have a meaningful zone. |
| **Center Circle** | 6m radius | For kickoff positioning. |
| **Corner Arc** | 1m radius | Standard proportional corner area. |

> **Visual Note:** The field fits entirely on a mobile screen in most camera angles without scrolling, enabling instant tactical awareness.

### 2.3 Player Roles & Positions

**6v6 uses 5 outfield players + 1 goalkeeper:**

| Position | Abbreviation | Role Description |
|----------|-------------|-----------------|
| **Goalkeeper (GK)** | GK | Last line of defense. Controls penalty area. AI-assisted with manual intervention for diving/punching. |
| **Defender (DEF)** | DF | Central defensive anchor. Tackles, blocks, intercepts. Must balance between pressing and holding position. |
| **Left Wing (LW)** | LW | Wide attacker on the left. Provides width, crosses, and cut-inside dribbles. Speed-oriented. |
| **Right Wing (RW)** | RW | Wide attacker on the right. Mirror of LW. Cross-specialist or inverted winger options. |
| **Midfielder (MID)** | MF | Central playmaker. Links defense to attack. Passing, vision, and stamina are key. The engine of the team. |
| **Striker (ST)** | ST | Primary goal threat. Positioning, finishing, and movement off the ball. |

### 2.4 Formations

Players choose from preset formations that distribute their 5 outfield players:

| Formation | Layout | Playstyle |
|-----------|--------|-----------|
| **1-2-2** | 1 DEF, 2 MID, 2 FWD | Balanced — the default. Equal presence in all thirds. |
| **2-1-2** | 2 DEF, 1 MID, 2 FWD | Defensive — park the bus with counter-attack outlets. |
| **1-1-3** | 1 DEF, 1 MID, 3 FWD | Ultra-attacking — overwhelming offensive pressure, vulnerable at the back. |
| **2-2-1** | 2 DEF, 2 MID, 1 FWD | Possession — midfield control with a lone striker. |
| **1-3-1** | 1 DEF, 3 MID, 1 FWD | Midfield overload — dominate the center, depends on midfielder quality. |
| **3-0-2** | 3 DEF, 0 MID, 2 FWD | Ultra-defensive — maximum defense, direct long balls to strikers. |

> **Design Note:** Formations unlock progressively (start with 1-2-2, earn others through matches played). This creates a discovery arc and reduces cognitive overload for new players.

### 2.5 Match Duration & Flow

| Phase | Duration | Details |
|-------|----------|---------|
| **Pre-Match** | 15 sec | Formation select, quick tactics, team preview. |
| **First Half** | 2:00 min | Real-time gameplay. Clock stops on goals and set pieces. |
| **Halftime** | 10 sec | Formation/tactics adjustment. No substitutions (6v6 has no bench — all cards are on the field). |
| **Second Half** | 2:00 min | Real-time gameplay continues. |
| **Overtime** (ranked only) | 1:00 min | Golden goal if tied. |
| **Penalty Shootout** (if still tied) | Until decided | Best of 3, then sudden death. |
| **Post-Match** | 15 sec | Celebration, rewards screen, card XP distribution. |
| **Total Session** | ~4-5 min | Within the mobile sweet spot. |

### 2.6 Stamina System

- Each player has a **stamina bar** that depletes during sprinting, tackling, and using special abilities.
- Stamina regenerates slowly when walking or standing still.
- **No energy system for match access.** Players can play as many matches as they want (Commandment: "No energy systems. Let players play.").
- Stamina is per-match only — no between-match stamina gating.

### 2.7 Special Abilities (Anime-Inspired)

Inspired by [GGO Football anime](https://en.wikipedia.org/wiki/AI_Football_GGO) and [Galactik Football](https://en.wikipedia.org/wiki/Galactik_Football), each player card can equip **one special ability** that activates when a charge bar fills through gameplay actions.

**Ability Design Principles:**
- **Earned, Not Bought:** Abilities unlock through card leveling and gameplay milestones, never through premium-only purchases.
- **Visually Spectacular:** Each ability has a unique animation with particle effects (fire trails, lightning auras, ice fields).
- **Counterplayable:** Every ability has a defensive counter. No ability guarantees a goal or a save.
- **Stamina Cost:** Using an ability drains significant stamina, creating tactical trade-offs.

**Example Abilities:**

| Ability | Type | Effect | Counter |
|---------|------|--------|---------|
| **Roaring Flame Strike** | Offensive | Powerful shot with fire trail, +30% shot power | GK with "Iron Wall" or "Reflex Surge" can save it |
| **Phantom Dribble** | Offensive | Brief invincibility during dribble (1.5 sec), leaves afterimage | "Anchor Tackle" defenders can still intercept |
| **Ice Field** | Defensive | Slows all opponents in a 5m radius for 3 sec | Players with "Heat Aura" passive are immune |
| **Lightning Pass** | Playmaking | Uncatchable ground pass that cuts through defenders | Only works as a ground pass; can be intercepted at the receiver |
| **Iron Wall** | Goalkeeper | GK becomes immovable for 2 sec, blocks any shot in the zone | Chip shots can go over; doesn't cover entire goal |
| **Shadow Sprint** | Movement | 3-sec burst of 2x speed with shadow trail | Drains 50% stamina; vulnerable after use |

> **P2W Check:** All abilities are obtainable through gameplay. Higher-tier cards may unlock abilities faster, but free players access the same ability pool. Ability power does NOT scale with card rarity — a "Roaring Flame Strike" on a Rare card is identical to one on a Super card.

---

## 3. Game Loop

### 3.1 Core Loop

```
┌─────────────────────────────────────────────────┐
│                  CORE LOOP                      │
│                                                 │
│   PLAY ──→ EARN ──→ BUILD ──→ COMPETE           │
│     │         │        │          │              │
│   Matches   Coins    Cards     Ranked           │
│   Events    XP       Merge     Climb            │
│   Quests    Packs    Train     Rewards           │
│     │         │        │          │              │
│     └─────────┴────────┴──────────┘              │
│              ↕ (repeats)                         │
└─────────────────────────────────────────────────┘
```

### 3.2 Loop Phases

**PLAY (Action Phase)**
- Play matches in various modes (ranked, casual, tournament)
- Complete daily/weekly/seasonal quests
- Participate in limited-time events

**EARN (Reward Phase)**
- **Coins** (free currency) — earned from every match, quest, and event
- **XP** — distributed to all cards that played in the match
- **Card Packs** — earned through rank milestones, event completion, daily rewards
- **Gems** (premium currency) — scarce free sources: achievements, seasonal milestones, competitive rewards

**BUILD (Progression Phase)**
- **Card Leveling:** XP from matches levels up cards, improving stats
- **Card Merging:** Combine two cards of the same tier for a chance at the same or higher tier (with failure protection — see §3.4)
- **Card Customization:** Name your card, choose a face preset, write a short bio
- **Ability Training:** Unlock and assign special abilities
- **Formation & Tactics:** Experiment with different setups

**COMPETE (Aspiration Phase)**
- Climb the ELO/MMR ranked ladder
- Compete in weekly tournaments for exclusive rewards
- Chase seasonal goals for end-of-season reset packs
- Build reputation on leaderboards

### 3.3 Session Design

| Session Type | Duration | Frequency | Content |
|-------------|----------|-----------|---------|
| **Quick Session** | 5-10 min | Multiple/day | 1-2 ranked matches + collect daily rewards |
| **Standard Session** | 15-30 min | 1-2/day | 3-5 matches + card management + quest progress |
| **Deep Session** | 30-60 min | 2-3/week | Tournament play + card merging + trading + ability training |
| **Event Session** | Varies | During events | Event-specific matches + special rewards |

> **Mobile-First Design:** The quick session is the primary design target. Every screen loads in <2 seconds. No session requires more than one hand for extended periods. Matchmaking targets <15 seconds.

### 3.4 Card Merging (Failure Protection)

Learning from Goley's destructive upgrade system:

| Goley's Mistake | Project F's Solution |
|----------------|---------------------|
| Failed upgrades destroyed invested cards | **Failure never destroys cards.** Failed merge returns original cards. |
| No pity system | **Pity counter:** After 3 consecutive failures at the same tier, next merge is guaranteed. |
| Unpublished odds | **Published odds:** Merge success rates displayed before confirmation. |
| No value preservation | **Merge XP Transfer:** Failed merges grant "Merge XP" that accumulates toward guaranteed upgrade. |

**Merge Odds (Published):**

| From → To | Success Rate | Pity Threshold |
|-----------|-------------|----------------|
| Normal → Special | 80% | 2 failures |
| Special → Rare | 60% | 3 failures |
| Rare → Expert | 40% | 4 failures |
| Expert → Super | 25% | 5 failures |

> **No Legendary Tier.** We cap at Super. This is an explicit design decision based on Goley's Commandment #1: "NEVER introduce a card tier that makes all previous tiers obsolete." A well-built Expert team must be competitive against a Super team when piloted with superior skill.

### 3.5 Seasonal Reset Design

**Season Duration:** 3 months (4 seasons per year, aligned with real football calendar)

**What Resets:**
- All player cards return to the pool
- Ranked MMR soft-resets (compressed toward median, not zeroed)
- Leaderboards reset

**What Carries Over:**
- Account level and achievements
- Cosmetics (kits, celebrations, stadium decorations)
- Card face presets and custom names (can be re-applied to new cards)
- Currency balances (Coins and Gems)
- Unlocked formations and tactics

**Season-End Reward Packs:**

| MMR Bracket | Pack Quality | Bonus Packs for Playtime |
|-------------|-------------|-------------------------|
| Bronze (0-999) | 1× Starter Pack (Normal-Special) | +1 per 50 matches played |
| Silver (1000-1499) | 1× Standard Pack (Special-Rare) | +1 per 40 matches played |
| Gold (1500-1999) | 1× Premium Pack (Rare-Expert) | +1 per 30 matches played |
| Platinum (2000-2499) | 2× Premium Pack (Rare-Expert) | +1 per 25 matches played |
| Diamond (2500+) | 1× Elite Pack (Expert-Super) | +1 per 20 matches played |

> **Why Reset?** The reset solves Goley's "permanent advantage" problem (veterans accumulate insurmountable power) and FIFA Mobile's "no reset, no spending" stagnation. By rewarding playtime AND rank with better restart packs, both competitive and casual players feel valued. Cosmetics that carry over give players lasting progression without power creep.

---

## 4. Game Modes

### 4.1 Mode Overview

| Mode | Type | Duration | Unlock | Description |
|------|------|----------|--------|-------------|
| **Training Ground** | PvE | 3-5 min | Level 1 | Tutorial and practice against AI. Learn controls, formations, abilities. |
| **Friendly Match** | PvP (Social) | ~4 min | Level 2 | Play against friends with no stakes. Custom rules (no abilities, fixed tiers, etc.). |
| **Quick Match** | PvP (Casual) | ~4 min | Level 3 | Casual matchmaking. No rank impact. Good for warming up or trying new formations. |
| **Ranked Match** | PvP (Competitive) | ~5 min | Level 5 | ELO/MMR-based matchmaking. The primary competitive mode. |
| **Tournament** | PvP (Competitive) | Varies | Level 10 | Weekly/seasonal bracketed tournaments with escalating rewards. |
| **League Mode** | PvP (Persistent) | Season-long | Level 8 | Join a league, play scheduled matches, climb division standings. |
| **Challenge Mode** | PvE | ~3 min | Level 4 | Themed challenges (score 3 goals in 1 minute, win with only defenders, etc.). |
| **Boss Match** | PvE (Event) | ~5 min | Event | Fight AI-controlled "boss teams" with boosted stats and unique abilities. Co-op optional. |

### 4.2 Ranked Match — Deep Dive

**ELO/MMR System:**

| Component | Detail |
|-----------|--------|
| **Starting MMR** | 1000 (all new players) |
| **MMR Gain/Loss** | Based on opponent MMR difference. Beat a higher-rated player = more points. |
| **Placement Matches** | First 10 matches of each season are placement (higher volatility). |
| **Decay** | No decay below Gold. Platinum+ loses 10 MMR/week of inactivity (max 4 weeks, then frozen). |
| **Floor Protection** | You cannot drop below a tier floor once reached in a season (e.g., once Gold, never below 1500). |

**Matchmaking Rules:**

| Rule | Detail | Why |
|------|--------|-----|
| **MMR Range** | ±150 MMR (expands to ±250 after 30 sec, ±400 after 60 sec) | Balance speed vs. quality |
| **Team Power Factor** | Match within ±15% team OVR whenever possible | **Goley Commandment #3:** Never match free players against whale teams |
| **Region Priority** | Same-region first, then cross-region | Minimize latency |
| **Rematch Cooldown** | Cannot face the same opponent twice in 30 min | Prevent harassment/sniping |

> **P2W Check:** The team power factor in matchmaking is our primary structural defense against P2W. Even if a player assembles a team 20% stronger through spending, they will face similarly strong teams — not stomp free players.

### 4.3 Tournament Mode

**Weekly Tournament (Friday–Sunday):**
- Entry: Free (1 entry) or 50 Gems (additional entry)
- Format: Single-elimination bracket (8 or 16 players)
- Rewards: Coins, card packs, exclusive cosmetics
- Special rule: Random modifier each week (e.g., "No abilities," "All Normal cards," "Rainy weather")

**Seasonal Championship (Last week of season):**
- Entry: Must be Gold+ rank
- Format: Swiss-system (5 rounds), top 8 advance to single-elimination finals
- Rewards: Elite packs, exclusive season cosmetics, leaderboard titles
- Broadcast: Top matches viewable by spectators in-app

### 4.4 League Mode

- Players join or create a League (8-20 members)
- Each league plays a round-robin season over the real-world season (3 months)
- League standings determine division promotion/relegation
- League rewards distributed to all members based on contribution
- **Social glue:** League chat, shared achievements, team emblems

### 4.5 Challenge Mode

Weekly rotating challenges with unique rule modifiers:

| Challenge Type | Example | Reward |
|---------------|---------|--------|
| **Skill Challenge** | Score 5 goals in 3 minutes against AI | Coins + XP |
| **Restriction Challenge** | Win with only Normal-tier cards | Card Pack |
| **Endurance Challenge** | Win 3 consecutive matches without conceding | Premium Currency |
| **Creative Challenge** | Score using only headers | Cosmetic Reward |
| **Boss Challenge** | Defeat AI boss team with unique ability combos | Ability Unlock Token |

### 4.6 Boss Match (Event Mode)

- Special PvE events where players face AI "boss teams" — teams with exaggerated abilities and stats.
- **Solo or Co-op (2 players controlling one team).**
- Boss teams have unique visual themes (e.g., "Fire Legion" — all fire abilities, "Ice Fortress" — defense-heavy with ice fields).
- Event-exclusive cosmetic rewards (kits, celebrations, stadium effects).
- Designed to unite the community against a common challenge rather than pit players against each other.

> **Commandment #9:** "ALWAYS diversify content beyond card packs." Boss Matches give PvE players and cooperative groups meaningful content that isn't just "buy more packs."

---

## 5. Camera Angles

### 5.1 Design Philosophy

Project F offers adjustable camera angles to suit different playstyles, screen sizes, and player preferences. The 6v6 format on a smaller field means most angles can show the entire pitch, reducing the "hidden player" problem of 11v11 games.

### 5.2 Available Camera Angles

| Camera | Description | Best For | Default |
|--------|-------------|----------|---------|
| **Broadcast** | Side-on view mimicking TV football. Camera follows the ball horizontally from a fixed elevated position. Classic football viewing experience. | Players who want a familiar TV-like experience. Best for reading the width of the field. | **Yes (Default)** |
| **Tele Broadcast** | Tighter version of Broadcast. Camera is closer and follows the play with subtle zoom adjustments. More immersive. | Competitive players who want to see player details and animations up close. | No |
| **Tactical** | High overhead angle showing most/all of the pitch. Inspired by FC 26's tactical camera. Ideal for formation awareness. | Tactical players focused on positioning and passing lanes. | No |
| **Dynamic** | Camera follows behind the player with the ball, shifting perspective when possession changes. Third-person feel. | Players who want immersion and to feel "in the action." | No |
| **Keeper View** | Fixed behind your goal, looking down the pitch. Great for defensive awareness. | Defensive-minded players; also great for enjoying goal celebrations. | No |
| **Free Camera** | Player-adjustable angle using pinch-zoom and drag. Set your own view before the match starts. | Experienced players who want full control. | No |

**Reference:** Camera angle systems in mobile football games — [FC 26 Camera Guide](https://fifauteam.com/fc-26-camera/) | [FC Mobile Best Camera Angles](https://www.sportsdunia.com/esports/ea-fc-25-best-camera-angles)

### 5.3 Camera Settings

| Setting | Range | Default |
|---------|-------|---------|
| **Zoom** | 1x – 3x | 1.5x |
| **Height** | Low / Medium / High | Medium |
| **Follow Speed** | Slow / Normal / Fast | Normal |
| **Auto-Zoom on Set Pieces** | On / Off | On |
| **Goal Replay Camera** | Cinematic / Broadcast / Off | Cinematic |

### 5.4 Mobile Optimization

- Camera auto-adjusts to screen aspect ratio (16:9, 18:9, 20:9, tablet)
- Portrait mode support for Quick Match only (rotated camera + simplified controls)
- Split-screen spectator mode for tablet users watching tournament matches
- Goal replay uses cinematic camera with slow-motion by default (can be skipped with a tap)

---

## 6. Target Audience

### 6.1 Primary Demographics

| Segment | Detail |
|---------|--------|
| **Age** | 16-35 (core: 18-28) |
| **Gender** | Male-primary (75-80%), with deliberate design choices to be welcoming to all |
| **Primary Market** | Turkey (launch market, leveraging Goley nostalgia and Turkish commentary) |
| **Secondary Markets** | MENA region, Southeast Asia, Brazil, wider Europe |
| **Device** | Mid-range Android smartphones (primary), iOS (secondary) |
| **Income** | F2P-majority with ~5% converting to payers (industry standard). Target: minnows ($5-15/month) over whales. |

### 6.2 Player Personas

#### Persona 1: "Nostalgia Emre" (Goley Veteran)
- **Age:** 22-30
- **Background:** Played Goley in 2013-2016, still watches YouTube compilations
- **Wants:** The Goley magic without the P2W death spiral
- **Fears:** "This will become Goley 2.0 and die the same way"
- **Key Feature:** Card personality system, Turkish commentary, chibi art, fair matchmaking
- **Monetization:** Willing to spend $10-20/month if the game feels fair

#### Persona 2: "Competitive Kerem"
- **Age:** 18-25
- **Background:** Plays FC Mobile and/or eFootball, frustrated by P2W
- **Wants:** A mobile football game where skill actually matters
- **Fears:** Encountering whales who auto-win
- **Key Feature:** Ranked system, team power matchmaking, tournament mode, abilities
- **Monetization:** Spends on cosmetics and Season Pass if competitive integrity is protected

#### Persona 3: "Casual Ayşe"
- **Age:** 16-22
- **Background:** Plays mobile games casually (2-3 sessions/day, 5-10 min each)
- **Wants:** Quick fun sessions with charming characters
- **Fears:** Being overwhelmed by complex systems
- **Key Feature:** Quick Match, card customization, chibi celebrations, Challenge Mode
- **Monetization:** Occasional small purchases ($1-5), watches rewarded ads

#### Persona 4: "Social Mehmet"
- **Age:** 20-30
- **Background:** Plays games primarily to hang out with friends
- **Wants:** A game to play together with his friend group
- **Fears:** Solo-only content, no social features
- **Key Feature:** Friendly Matches, League Mode, Co-op Boss Matches, card trading/renting
- **Monetization:** Spends when friends do (social spending pressure — organic, not manufactured)

### 6.3 Market Positioning

```
                    CASUAL ◄──────────────────► COMPETITIVE
                         │                      │
              Score!     │    PROJECT F          │  eFootball
              Match      │    ●                  │
                         │                      │
                         │         DLS           │
            CHIBI/       │                      │        REALISTIC
            STYLIZED     │                      │
                         │                      │
              Goley      │                      │  FC Mobile
              (dead)     │                      │
                         │                      │
```

**Project F sits at the intersection of:** Stylized art + Competitive depth + Fair monetization. No current game occupies this space.

### 6.4 Device & Performance Targets

| Tier | Device Example | Target FPS | Quality |
|------|---------------|-----------|---------|
| **Low** | Samsung Galaxy A14, Redmi 12 | 30 FPS | Low textures, no shadows, reduced particles |
| **Mid** | Samsung Galaxy A54, Poco X5 | 60 FPS | Medium textures, basic shadows, standard particles |
| **High** | Samsung Galaxy S24, iPhone 15 | 60 FPS | High textures, full shadows, full particle effects |

> **Commandment #10 (Goley Lesson):** Low-spec device accessibility matters, especially in Turkey. The game MUST run at 30 FPS on devices costing $150 or less.

---

## 7. Controls

### 7.1 Design Philosophy

Controls must feel **responsive, intuitive, and customizable.** Mobile football games live and die by their controls — DLS's simple 3-button system is a benchmark, while eFootball's complexity rewards mastery. We target the middle: **easy to pick up, deep to master.**

**Reference:** [Virtual Joystick Design Guide](https://coherent-labs.com/blog/uitutorials/virtual-joystick/) | [Microsoft Touch Controls Designer Guide](https://learn.microsoft.com/en-us/gaming/gdk/docs/features/common/game-streaming/building-touch-layouts/game-streaming-tak-designers-guide) | [DLS 2026 Controls](https://gamingonphone.com/guides/dream-league-soccer-beginners-guide-and-tips/)

### 7.2 Control Layout

**Default Layout (Landscape):**

```
┌─────────────────────────────────────────────────────┐
│  [Pause]                              [Score] [Time]│
│                                                     │
│                                                     │
│                                                     │
│                                                     │
│                                                     │
│     ┌───┐                              [Special]    │
│     │ J │ ←── Virtual Joystick                      │
│     │   │     (Left thumb)        [Shoot]  [Skill]  │
│     └───┘                              [Pass]       │
│                                                     │
└─────────────────────────────────────────────────────┘

J = Virtual Joystick (movement)
Pass = Short pass (tap) / Through ball (swipe forward)
Shoot = Shot (tap) / Lob (swipe up) / Finesse (swipe curve)
Skill = Skill move (tap) / Sprint (hold)
Special = Special ability (available when charged)
```

### 7.3 Offensive Controls (With Ball)

| Input | Action | Modifier |
|-------|--------|----------|
| **Pass (Tap)** | Short pass to nearest teammate in facing direction | Double-tap = one-two pass |
| **Pass (Swipe Forward)** | Through ball in swipe direction | Swipe length = pass power |
| **Pass (Swipe Left/Right)** | Cross (lofted pass to far side) | Swipe arc = cross curve |
| **Shoot (Tap)** | Standard power shot | Hold longer = more power (power bar fills) |
| **Shoot (Swipe Up)** | Chip/lob shot over keeper | Swipe height = lob arc |
| **Shoot (Swipe Curve)** | Finesse shot (curved) | Swipe direction = curve direction |
| **Skill (Tap)** | Context-sensitive skill move (step-over, roulette, etc.) | Depends on player's skill stat |
| **Skill (Hold)** | Sprint | Drains stamina while held |
| **Special (Tap)** | Activate special ability | Only available when charge bar is full |

### 7.4 Defensive Controls (Without Ball)

| Input | Action | Modifier |
|-------|--------|----------|
| **Pass → Tackle (Tap)** | Standing tackle | Timing-dependent: too early = foul risk |
| **Pass → Tackle (Hold)** | Contain/jockey (auto-follow attacker) | Safe defensive option, no foul risk |
| **Shoot → Press (Tap)** | Aggressive press / Slide tackle | High risk, high reward. Can cause fouls. |
| **Skill → Switch (Tap)** | Switch to nearest player to ball | Double-tap = switch to specific player |
| **Special (Tap)** | Activate defensive special ability | Only when charged |
| **Joystick** | Move selected player | Same as offense |

### 7.5 Goalkeeper Controls (Manual Override)

When the ball enters the penalty area and a shot is imminent:
- **Swipe in any direction:** Dive to that side
- **Tap:** Punch/parry (for aerial balls)
- **Hold:** Spread (stand tall, cover maximum area)
- GK can also use special abilities when available

> **Default:** GK is AI-controlled with manual override available. Players can toggle "Full Manual GK" in settings.

### 7.6 Gesture Shortcuts

| Gesture | Action | Context |
|---------|--------|---------|
| **Two-finger tap** | Quick tactics toggle (attacking/balanced/defensive) | Anytime during match |
| **Swipe down from top** | Quick formation switch (pre-set alternatives) | Anytime during match |
| **Tap on player** | Direct player run (AI teammate runs to tapped position) | When you don't control that player |
| **Pinch** | Camera zoom (if Free Camera enabled) | Camera set to Free |

### 7.7 Control Customization

| Option | Settings |
|--------|----------|
| **Button Size** | Small / Medium / Large (default: Medium) |
| **Button Opacity** | 25% / 50% / 75% / 100% (default: 75%) |
| **Joystick Mode** | Fixed (stays in place) / Floating (appears where thumb touches) |
| **Joystick Size** | Small / Medium / Large |
| **Button Position** | Drag to reposition any button |
| **Sensitivity** | Joystick sensitivity slider (1-10, default: 5) |
| **Vibration** | On / Off (haptic feedback on actions) |
| **Auto-Sprint** | On / Off (automatically sprint when joystick fully tilted) |

### 7.8 Accessibility Options

| Option | Detail |
|--------|--------|
| **One-Hand Mode** | Simplified layout with auto-pass and larger buttons on one side |
| **Color-Blind Mode** | Adjusted team colors and indicators |
| **Aim Assist** | Pass and shot direction assist (mild by default, adjustable) |
| **Tutorial Overlays** | Context-sensitive button hints (toggle on/off) |
| **Text Size** | Small / Medium / Large for all UI text |

---

## 8. P2W Balance & Sustainability Evaluation

### 8.1 P2W Scorecard

Every system in this GDD has been evaluated for P2W impact:

| System | P2W Risk | Mitigation | Risk Level |
|--------|----------|------------|------------|
| **Card Tiers** | Higher tiers = stronger stats | Cap at Super (no Legendary). Max stat gap between Normal and Super: +35%, not +300% like Goley. | ⚠️ Medium |
| **Card Merging** | Paying players merge faster | Failure protection + pity counter + published odds. Time advantage, not power advantage. | ✅ Low |
| **Special Abilities** | Could be premium-gated | All abilities earnable through gameplay. No ability locked behind payment. | ✅ Low |
| **Matchmaking** | Whales crush F2P | Team power factor in matchmaking. Whales face whales. | ✅ Low |
| **Seasonal Reset** | Pay for better restart packs | Reset packs based on MMR AND playtime. You can't buy a Diamond pack — you must earn Diamond rank. | ✅ Low |
| **Trading/Renting** | Real-money trading market | Trade uses in-game currency only. Rent fees capped. No real-money marketplace. | ⚠️ Medium |
| **Tournaments** | Premium re-entry advantage | Free entry always available. Extra entries cost Gems (earnable F2P). Tournament rewards are cosmetics, not power. | ✅ Low |
| **Formations** | Premium formation unlocks | Formations unlock through matches played, not purchases. | ✅ Low |

### 8.2 The Skill:Wallet Ratio Target

```
Project F Target:

  SKILL ████████████████████████████░░░░ WALLET
        ├───────── 70% ──────────┤ 30% ┤

Comparable to DLS (70:30) and eFootball (65:35).
Far from Goley's fatal 10:90 or Top Eleven's 30:70.
```

**What "30% wallet" means in practice:**
- Paying players get cards faster (not better)
- Paying players access cosmetics free players don't
- Paying players get convenience (extra tournament entries, instant queue)
- Paying players **NEVER** get abilities, formations, or matchmaking advantages that free players cannot eventually access

### 8.3 Sustainability Assessment

| Factor | Design Decision | Sustainability Impact |
|--------|----------------|----------------------|
| **Power Creep** | Capped at Super tier. New cards are sidegrades, not strict upgrades. | Prevents Goley's death spiral |
| **Seasonal Resets** | Cards reset, cosmetics carry. Reward packs based on performance. | Prevents permanent advantage AND progress abandonment |
| **Matchmaking** | Power-weighted + MMR-based | Prevents free player exodus |
| **Content Variety** | 8 game modes, weekly challenges, boss events, leagues | Prevents "just more packs" stagnation |
| **Social Systems** | Leagues, trading, co-op, friendly matches | Social bonds improve D30+ retention |
| **Anti-Cheat** | Priority from day one (Commandment #7) | Prevents community poisoning |
| **Catch-Up Mechanics** | New player packs + seasonal reset level the field | Keeps new player funnel open |
| **Turkish Market** | Turkish commentary + localization + cultural relevance | Captures underserved market with emotional connection |

### 8.4 Revenue Model Summary

| Revenue Stream | P2W Impact | % of Target Revenue |
|---------------|-----------|-------------------|
| **Season Pass** (Free + Premium tier) | Acceleration only | 35% |
| **Cosmetics** (Kits, celebrations, stadium, card skins) | Zero P2W | 30% |
| **Gems** (Premium currency for convenience) | Mild acceleration | 20% |
| **Rewarded Ads** (Voluntary, 30-sec for coins) | Zero P2W | 15% |

> **No loot boxes with hidden odds.** All pack odds are published. All purchases show exact contents or exact probabilities before confirmation. This future-proofs against loot box regulation (Belgium, South Korea precedents — see Competitor Analysis §4.3).

### 8.5 Long-Term Vision (Will This Keep Players for Years?)

| Year | Focus | Key Milestone |
|------|-------|--------------|
| **Year 1** | Core experience + Turkish market launch | 1M downloads, 200K MAU, community established |
| **Year 2** | Global expansion + esports foundation | MENA/SEA launch, first official tournament circuit |
| **Year 3** | Platform maturity + community content | Player-created tournaments, league system expansion, possible PC port |
| **Year 4+** | Sustainable live service | Seasonal content cadence, community-driven events, potential licensed partnerships |

**The ultimate sustainability test:** "Would a player who started in Year 1 recommend this game to a friend in Year 3?"

If we follow the Ten Commandments from the Competitor Analysis, the answer is yes.

---

## Appendix A: Competitor Analysis Cross-Reference

| GDD Decision | Competitor Learning | Source |
|-------------|-------------------|--------|
| No Legendary tier | Goley's Legendary cards killed the game | GDD-00 §2.5 |
| Published merge/pack odds | Goley's unpublished odds were predatory | GDD-00 §2.4 |
| Team power matchmaking | Goley matched whales vs. F2P | GDD-00 §2.5 |
| Failure-protected merging | Goley destroyed cards on failed upgrades | GDD-00 §2.3 |
| Seasonal reset with rewards | eFootball's no-reset + FIFA Mobile's pivot validated | GDD-00 §3.6, §5.6 |
| Skill > Wallet (70:30) | DLS/eFootball zone is most sustainable | GDD-00 §10.3 |
| No energy system | Score! Match's energy system limits F2P play | GDD-00 §6.4 |
| Turkish commentary | Goley's most beloved feature | GDD-00 §2.7 |
| Launch quality priority | eFootball 2022 proved first impressions are permanent | GDD-00 §5.8 |
| Anti-cheat from day one | eFootball's null results, Goley's exploits | GDD-00 §5.8, §2.5 |

---

*This document serves as the core game design foundation for Project F. All subsequent GDDs (Card System, Monetization, UI/UX, etc.) should reference and build upon the decisions made here.*

*Document prepared by: Game Designer Agent, YG Games*
*Date: March 17, 2026*
