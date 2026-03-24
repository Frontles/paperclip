# Project F -- Competitor Analysis: Mobile Football Games

**Document Code:** GDD-00
**Version:** 1.0
**Date:** March 17, 2026
**Author:** Market Analyst Agent, YG Games
**Purpose:** Foundation document for all Project F Game Design Documents

---

## Table of Contents

1. [Executive Summary](#1-executive-summary)
2. [Goley -- Deep Dive (Primary Reference)](#2-goley--deep-dive)
3. [EA Sports FC Mobile (FIFA Mobile)](#3-ea-sports-fc-mobile)
4. [FIFA Ultimate Team (Console/PC Reference)](#4-fifa-ultimate-team)
5. [eFootball Mobile](#5-efootball-mobile)
6. [Score! Match](#6-score-match)
7. [Top Eleven](#7-top-eleven)
8. [Dream League Soccer](#8-dream-league-soccer)
9. [Other Notable Competitors](#9-other-notable-competitors)
10. [Comparative Analysis](#10-comparative-analysis)
11. [Lessons & Recommendations for Project F](#11-lessons--recommendations-for-project-f)
12. [Sources](#12-sources)

---

## 1. Executive Summary

This report analyzes 7+ mobile football games to inform Project F's game design. The analysis covers gameplay, monetization, P2W balance, player retention, and sustainability for each competitor.

### Key Findings

1. **P2W is the #1 killer of mobile football games.** Goley died from it. Top Eleven is hemorrhaging trust because of it. Even FIFA Mobile had to reverse its annual reset model after years of churn.

2. **The P2W spectrum is wide:** FM Mobile (none) < Retro Goal (minimal) < DLS (mild) < eFootball (moderate) < Score! Match (moderate) < FC Mobile (heavy) < Top Eleven (heavy). Games with milder P2W consistently earn higher ratings and better retention.

3. **Skill-based gameplay + fair monetization = sustainability.** DLS (4.0 rating, 20M MAU) and eFootball (best mobile gameplay) prove that respecting player skill keeps communities alive.

4. **No seasonal resets is now industry standard.** FIFA Mobile's 2025 no-reset pivot validated what eFootball always practiced. Resets punish investment and drive churn.

5. **Goley's failure is our most valuable lesson.** The root cause chain (P2W escalation -> cheating -> Legendary cards -> free player exodus -> panic giveaways -> revenue collapse -> shutdown) is a blueprint of what NOT to do.

6. **Revenue potential is massive.** FC Mobile generates $172M+/year. Ultimate Team across EA titles generates $1.6B/year. The mobile football market is proven and growing.

### P2W Balance Recommendation for Project F

Target the **DLS/eFootball zone**: mild-to-moderate monetization where spending accelerates progression but skill determines outcomes. Never let paying players become unbeatable by free players.

---

## 2. Goley -- Deep Dive

> **Goley is our primary cautionary tale. Every design decision in Project F should be tested against Goley's mistakes.**

### 2.1 Overview

| Attribute | Detail |
|-----------|--------|
| **Developer** | Netmarble (South Korea) |
| **Publisher** | Joygame (Turkey, Netmarble EMEA subsidiary) |
| **Platforms** | PC (primary), Mobile ("Football Strike"), Facebook |
| **Active Period** | November 2013 -- August 17, 2018 |
| **Genre** | 3D MMO Football Card Game |
| **Art Style** | Chibi characters (noseless, stylized) |
| **Commentary** | Sabri Ugan (beloved Turkish commentator) |
| **Player Base** | Significant in Turkey; no exact MAU figures available |

### 2.2 Core Gameplay

- **3D Real-Time Matches** with arcade-style controls
- **Licensed players** from European leagues (2005-2012 era)
- Players chose a real team and gained access to all players from that team (2005-2012)
- Special moves: Scissor Kicks, Marseille Turns, Flip-Flaps, Step-Overs
- Manager-level control over Formation, Offense, and Defense strategy

**Game Modes:**
1. Training Camp (Hazirlik Kampi)
2. Single League (Tekli Lig)
3. Friendship Mode (Dostluk Modu)
4. Ranked Matches (Rutbe Maclari)
5. Leader Mode (Lider Modu) -- added later
6. Champions League
7. Training (Antrenman)

**Standout Feature:** Unique goal celebration animations per player -- so entertaining that even conceding goals was enjoyable.

### 2.3 Card/Player System

**Four Card Categories:**
1. **Football Player Cards** (Futbolcu Kartlari) -- core player cards
2. **Technical Staff Cards** (Teknik Ekip Kartlari) -- coaches/managers boosting performance
3. **Equipment Cards** (Ekipman Kartlari) -- gear enhancing abilities
4. **Emblems** (Amblemler) -- offensive, defensive, power, speed, technique, mind abilities

**Card Tiers (5 original + 1 late addition):**

| Tier | Turkish | English | Added |
|------|---------|---------|-------|
| 1 | Normal | Normal | Launch |
| 2 | Ozel | Special | Launch |
| 3 | Ender | Rare | Launch |
| 4 | Uzman | Expert | Launch |
| 5 | Super | Super | Launch |
| 6 | Efsane/Efsanevi | **Legendary** | **Late addition -- THE game-killing tier** |

**Upgrade System:**
- Combination system: combine lower-value cards to create better players
- Year-matching requirement for upgrades
- Probability-based: upgrades NOT guaranteed
- Failed upgrades destroyed invested cards -- a double-punishment mechanic
- Collection system: completing full sets yielded rewards

### 2.4 Monetization

**Premium Currency:** JoyPara (JP) -- shared across all Joygame titles

| Package | Price (TL) |
|---------|-----------|
| 5,000 JP | 5.85 TL |
| 10,000 JP | 11.35 TL |
| 20,000 JP | 22.45 TL |

**Card Pack Pricing (JoyPara):**

| Pack Type | 1x | 5x | 10x |
|-----------|-----|-----|------|
| Advanced Lucky Card Pack | 1,500 JP | 6,000 JP | 9,400 JP |
| Super Position Pack | 3,400 JP | 13,600 JP | 23,800 JP |
| Expert Combine Card Pack | 2,400 JP | 8,900 JP | 15,900 JP |

**VIP System:** Monthly rewards based on spending thresholds -- a "spend more to earn more" feedback loop.

**Critical Issue:** No published pack odds. Players reported spending thousands of JoyPara without receiving desired cards.

### 2.5 P2W Analysis -- THE CRITICAL SECTION

#### The P2W Escalation Timeline

```
2013-2014  [||||------]  Mild P2W -- Cosmetic + minor advantages
2015       [||||||----]  Moderate P2W -- Power gap noticeable
2016       [||||||||--]  Heavy P2W -- Legendary cards introduced
2017       [||||||||||]  Maximum P2W -- Unplayable for free players
2018       [XXXXXXXXXX]  Collapse -- Free card giveaways destroy economy
```

#### Phase 1: Balanced F2P (2013-2014)
- Game launched as genuinely free-to-play
- Marketing: "the first MMO football game which can be played 100% free"
- Card tiers (Normal through Super) achievable through gameplay
- Paying players had advantages but the gap was manageable
- **Player sentiment: Positive, growing community**

#### Phase 2: Monetization Escalation (2015-2016)
- More powerful card packs at higher prices
- Super-tier cards increasingly difficult to obtain F2P
- Power gap widened significantly
- New pack types with better stats released regularly, devaluing older cards
- Equipment and emblems created additional stat layers favoring spenders
- **Player sentiment: Growing complaints, but still playable**

#### Phase 3: Legendary Cards -- THE BREAKING POINT (2016-2017)
- **CRITICAL MISTAKE:** Introduction of "Efsane/Efsanevi" (Legendary) tier
- Legendary cards FAR more powerful than existing Super-tier
- Available primarily through expensive premium packs (Pele, Cantona packs)
- Created an **insurmountable gap** between paying and free players
- **Community consensus: "Efsane kartlar oyunu mahvetti" (Legendary cards ruined the game)**
- Free players could not compete at all in ranked modes
- **Player sentiment: Mass exodus begins**

#### Phase 4: Desperation & Collapse (2017-2018)
- Joygame attempted to retain players by **distributing powerful cards for free**
- This created a NEW problem: veteran paying players felt cheated (their purchases devalued)
- Revenue plummeted -- players no longer needed to pay
- New players found themselves hopelessly outmatched regardless of spending
- **Player sentiment: Anger, abandonment, complaints on Sikayetvar**

#### The Six P2W Mechanics That Killed Goley

1. **Card Tier Power Creep** -- Each new tier made the previous obsolete. Legendary cards had stats so high a full Legendary team was untouchable by a Super team. No balancing mechanism existed.

2. **Unpublished Pack Odds (Predatory Gacha)** -- High prices + low odds + essential cards = predatory monetization. Players had no way to assess value before purchasing.

3. **Matchmaking Failure** -- Ranked matchmaking did not account for team power level. Free players with Normal/Special teams matched against whales with Legendary teams. No separate brackets.

4. **Card Economy Inflation** -- Regular release of new, more powerful cards. Cards purchased months earlier became worthless. No trade system or value-preserving recycling.

5. **Destructive Upgrade System** -- Failed upgrades destroyed invested cards with no compensation. Players lost both their investment AND the cards consumed.

6. **VIP Spending Loop + Equipment Stacking** -- VIP rewards incentivized monthly spending thresholds. Equipment/Emblem stat bonuses created hidden multiplicative P2W layers.

#### The Root Cause Chain of Death

```
High card prices
  -> Players resort to cheating/exploits
    -> Developers fail to fix cheating
      -> Developers release MORE powerful (Legendary) cards
        -> Free players can't compete at all
          -> Free player exodus
            -> Developers give away powerful cards to retain players
              -> Revenue collapses + paying players feel cheated
                -> Paying player exodus
                  -> No revenue to maintain servers
                    -> TL/USD depreciation makes costs unsustainable
                      -> Korean servers close first
                        -> Turkish servers close
                          -> GAME OVER (August 17, 2018)
```

### 2.6 Season/Reset Mechanics

- **No seasonal resets** -- accumulated advantages were permanent
- New players joining in 2016-2017 faced 3+ years of card advantage from veterans
- **No catch-up mechanics** for new players
- Leader Mode had weekly ranking with rewards, but team power still determined outcomes
- The lack of resets contributed to the insurmountable gap between old and new players

### 2.7 Strengths -- What Goley Did Right

1. **Turkish Localization with Sabri Ugan** -- Authentic commentary creating genuine market differentiation
2. **Charming Chibi Art Style** -- Distinctive, endearing characters vs. realistic FIFA/PES
3. **Entertaining Goal Celebrations** -- Even conceding goals was fun
4. **Low System Requirements** -- Accessible on most Turkish computers
5. **F2P Accessibility (Initially)** -- Genuinely playable without paying at launch
6. **Deep Card Collection** -- 4 categories x 5 tiers with meaningful team-building
7. **Multiple Game Modes** -- Casual to competitive options
8. **Social Infrastructure** -- Friends, clubs, community forums
9. **Market Timing** -- Captured underserved Turkish market

### 2.8 Sustainability Score: 2/10

**Four Fatal Factors:**
1. **Economic:** TL depreciation against USD made server costs untenable
2. **Design:** Legendary card tier created irreparable balance gap
3. **Technical:** Inability to combat cheating and exploits
4. **Strategic:** Panic free card distribution destroyed both revenue AND balance

### 2.9 Spiritual Successor: ISG

A community project called **International Soccer Game (ISG)** was announced as a Goley spiritual successor, explicitly promising "no P2W." This proves the core concept remains viable if monetization is handled correctly.

---

## 3. EA Sports FC Mobile

### 3.1 Overview

| Attribute | Detail |
|-----------|--------|
| **Developer** | EA Mobile / EA Canada |
| **Publishers** | EA Sports (worldwide), Tencent (China), Nexon (Korea), Garena (Vietnam) |
| **Platforms** | iOS, Android |
| **Launch** | October 1, 2016 |
| **Rebranded** | "FIFA Mobile" -> "EA Sports FC Mobile" (September 2023) |
| **Current** | FC Mobile 26 (launched September 25, 2025) |
| **Content** | 19,000+ players, 690 teams, 35 leagues |
| **Rating** | ~4.2 stars (Google Play, ~134K reviews) |
| **Peak MAU** | 113M monthly active users (January 2018) |
| **Peak DAU** | 78M during 2022 World Cup |
| **Revenue** | $172M+ in 2024 (EA's top mobile title) |
| **EA Mobile Total** | $1.1B (15% of EA's FY2025 revenue) |

### 3.2 Core Gameplay

**Three Game Modes (Division Rivals):**

| Mode | Type | Duration | Key Feature |
|------|------|----------|-------------|
| **VS Attack (VSA)** | Asynchronous PvP | ~2-3 min | Only play offensive phases; OVR affects chance difficulty |
| **Head to Head (H2H)** | Real-time 11v11 PvP | ~6-8 min | Full manual control; double event tokens |
| **Manager Mode** | Tactical AFK | Varies | AI plays your strategy; scripting concerns at 15-20 stars |

**FC Mobile 26 Improvements:**
- Smarter defender AI, rebalanced long balls
- Improved lofted through passes, cross accuracy
- Reduced auto-fouls, seven new formations
- Pre/post match cutscenes, faster dribbling

### 3.3 Card/Player System

- **OVR System:** Base OVR + Rank = Team OVR. Directly impacts VSA matchmaking.
- **Training:** Melt players into others for stat boosts (up to Level 30). No coin cost.
- **Rank Up:** Position-specific items, +1 OVR per rank, max 5 ranks.
- **Chemistry:** Club/League/Nationality links boost performance. Encourages themed squads.

**Card Types:** Base, Event (TOTY, TOTS, UCL), ICONs (legends), Heroes, TOTW, Promotional

**Power Creep Pattern:**
- Early season: 75-85 OVR base cards
- End of season: 100+ OVR event cards
- Cards purchased in January obsolete by June
- Constant pressure to acquire new cards

### 3.4 Monetization

| Channel | Details |
|---------|---------|
| **FC Points** | $0.39 (40 pts) to $99.99 (12,000 pts); banned in Belgium |
| **Star Pass** | Free tier + Premium ($11.59/month) + Bundle ($23.19/month) |
| **Event Passes** | TOTY, TOTS, UCL event-specific purchases |
| **Pack Odds** | Disclosed in broad ranges (e.g., "88+ OVR: <5%"); criticized for lacking granularity |

### 3.5 P2W Analysis

**Assessment: Heavy P2W (Pay-to-Accelerate with Significant Competitive Impact)**

- **Early season gap:** P2W players have 10-15+ OVR advantage
- **Mid season:** Gap narrows as F2P catch up through events
- **Late season:** Gap widens again with new premium events
- **$50-100/month spenders:** Consistent 5-10 OVR edge
- **Whales:** 15-20+ OVR advantage, making VSA nearly unwinnable for F2P

**Mitigating factors:** F2P can compete with consistent daily play. Academic research confirms time played matters more than money spent. But spending significantly impacts rankings.

### 3.6 Season/Reset Mechanics -- The Pivotal Change

**2016-2024: Annual Full Reset**
- All cards, coins, progress wiped every September/October
- "Legacy" players given as compensation (typically low-rated, quickly obsolete)
- **The #1 churn driver** and most controversial feature

**2025: No Reset (Historic Change)**
- EA announced no season reset for the first time
- FC Mobile 26 was a seamless continuation
- Players retained all cards, currencies, progress
- **Community reaction: Overwhelmingly positive**
- Validates eFootball's no-reset model as superior for retention

### 3.7 Strengths

1. **Unrivaled licensing:** 19,000+ players, 690 teams, 35 leagues, UCL, Europa League
2. **Exceptional event cadence:** New event every 1-3 weeks tied to real football calendar
3. **Three game modes:** VSA (quick), H2H (core), Manager (casual) -- serves all player types
4. **Growing revenue:** Record bookings, 20%+ YoY DAU growth
5. **MLS + Apple TV integration:** Live games streamed inside the app

### 3.8 Weaknesses

1. **Annual resets (2016-2024):** 8 years of progress wipes alienated millions
2. **Scripting/DDA perception:** EA's DDA patent fuels suspicion; deeply erodes trust
3. **Power creep treadmill:** Relentless OVR inflation makes cards obsolete in months
4. **Technical issues:** 30fps lock, lag spikes, login failures, missing rewards
5. **Pack odds opacity:** Broad ranges hide true probabilities
6. **Monetization pressure:** Constant pop-up offers, FOMO-driven limited bundles

### 3.9 Sustainability Score: 7/10

Strong commercial position with growing revenue, but structural tension between monetization (power creep, FOMO) and retention (respecting player investment). The no-reset pivot was critical.

---

## 4. FIFA Ultimate Team (Console/PC Reference)

### 4.1 Key Metrics
- Revenue: ~$1.6-1.7B annually; $7B+ lifetime
- 75% of EA's live services revenue
- Existed since FIFA 09 (2008)

### 4.2 Relevant Mechanics for Project F

| Feature | How It Works | Relevance |
|---------|-------------|-----------|
| **Transfer Market** | Real-time player auction house | Enables F2P to "trade their way up"; creates player economy |
| **SBCs** | Submit squads meeting requirements for rewards | Card sink managing inflation; engagement beyond matches |
| **Chemistry** | Club/league/nation bonuses + Cornerstones | Incentivizes diverse, themed squads |
| **Evolutions** | Personalized upgrade paths | Player agency over progression; reduces pack dependency |
| **Pack System** | Randomized player packs (coins or FC Points) | Intermittent reinforcement; major content/streaming driver |

### 4.3 Regulatory Landscape
- **Belgium (2018):** Banned FC Points (loot boxes = gambling)
- **Netherlands:** Initially classified as gambling, later overturned
- **South Korea (2024):** Forced pack disabling; EA disabled UT packs entirely
- **UK:** Recommends more transparency but doesn't classify as gambling
- **Academic research:** Loot box use more related to gambling addiction than video game addiction

**Lesson for Project F:** Design monetization that can survive loot box regulation. Deterministic acquisition paths (like eFootball's Nominating Contracts) are future-proof.

---

## 5. eFootball Mobile

### 5.1 Overview

| Attribute | Detail |
|-----------|--------|
| **Developer** | Konami Digital Entertainment |
| **Engine** | Unreal Engine 4 |
| **Platforms** | Android, iOS, Windows, PS4/5, Xbox, Switch 2 (Summer 2026) |
| **Evolution** | PES -> PES Mobile (2017) -> eFootball (2021) -> eFootball Mobile (June 2022) |
| **Metacritic** | 3.7/10 user score (console); mobile sentiment slightly more favorable |
| **Play Store** | 3.5-4.0 stars |
| **Key Markets** | Japan, South Korea, Southeast Asia, South America, Europe |

### 5.2 Core Gameplay

- **Simulation-focused** with physics-based ball mechanics -- the best on mobile
- **Console parity** via UE4 (unique selling point -- no other mobile game offers this)
- **Cross-platform play** added April 2025 (mobile vs. console/PC)
- **Smart Assist** for accessibility without dumbing down the experience
- **Controller support** on mobile

**Game Modes:** Authentic Team, Dream Team (primary), Events, Campaign Hub, Line Objectives, Master League (DLC)

### 5.3 Card/Player System

**Six Card Tiers:** Epic > Legendary > Trending > Highlight > Featured > Standard

**Deep Player Development:**
1. Level Training (XP from Training Programs + match play)
2. Progression Points (auto or manual stat allocation -- RPG-like)
3. Skill Training (add up to 5 additional skills)
4. Position Training (expand position proficiency)
5. Player Fusion (transfer XP/skills between cards -- prevents waste)

**Acquisition Methods:** Chance Deal (gacha), Nominating Contract (choose specific player), Selection Contract, Standard Player List, Standard Player Tickets (free)

### 5.4 Monetization

**Three-Currency System:**

| Currency | Source | Use |
|----------|--------|-----|
| **eFootball Coins** | Purchase or earn in-game | Player signings, Special Player Lists |
| **GP (Game Points)** | Earned by playing | Player/manager signings, basic items |
| **eFootball Points** | In-game + loyalty campaigns | Player signings, item exchange |

**Key Mechanisms:** Coin Packs (IAP), Special Player Lists (weekly gacha), Breakthrough Pass (season pass), Nominating Contracts (deterministic acquisition)

### 5.5 P2W Analysis

**Assessment: Moderate P2W with Strong Skill Emphasis ("Pay-to-Accelerate")**

**P2W factors:** Epic/Legendary cards have higher stats; paying gets top players faster; featured player FOMO rotation.

**Skill factors:** High skill ceiling means skilled F2P can beat whales; generous F2P economy (competitive 92+ teams possible without spending); no hard paywalls; rating-based matchmaking separates whales.

**vs. FIFA Mobile:** eFootball is LESS P2W. No full resets, F2P accumulation over time, skill matters more.

**Verdict:** The gap between F2P and paid is real but narrower than FIFA Mobile. Skill remains the primary differentiator.

### 5.6 Season/Reset Mechanics

**No Full Reset (Key Differentiator)**
- Players, levels, skills, progression ALL carry over between seasons
- New seasons update stats, introduce new cards, but existing squads remain
- Contract system creates ongoing GP drain (manageable for active players)
- **FIFA Mobile 23 eventually copied this approach** -- validating eFootball's model

### 5.7 Strengths

1. **Best gameplay on mobile** -- physics, movement, ball control feel authentic
2. **Console parity** -- same engine as console/PC (unique)
3. **No seasonal resets** -- respects player investment
4. **Deep player development** -- RPG-like progression with manual stat allocation
5. **Nominating Contracts** -- deterministic acquisition reducing gacha frustration
6. **F2P viability** -- genuinely competitive teams without spending
7. **FIFAe World Cup 2026 partnership** -- esports credibility
8. **Controller support on mobile**

### 5.8 Weaknesses

1. **eFootball 2022 Launch Disaster** -- worst Steam rating ever; Metacritic lowest-rated 2021. Brand never fully recovered.
2. **Null Results / Cheating** -- #1 ongoing complaint. Opponents disconnect to void losses. Anti-cheat insufficient.
3. **UI/UX** -- Consistently described as "cumbersome." Menus slow and unintuitive.
4. **Licensing Gaps** -- Fewer leagues than EA; generic team names in some cases.
5. **Slow Improvement Cadence** -- Annual updates feel like patches, not evolution.
6. **Master League Paywall** -- Paid DLC in a F2P game.

### 5.9 Sustainability Score: 6/10

Best gameplay and no-reset model are strong foundations. But 2022 launch damage, cheating problems, and poor UI/UX limit growth. Konami's commitment (30th anniversary, FIFAe, Switch 2) is positive, but pace of improvement frustrates the community.

**Core Paradox:** eFootball has the best football gameplay on any platform, yet underperforms in reviews, revenue, and satisfaction due to everything surrounding that gameplay.

---

## 6. Score! Match

### 6.1 Overview

| Attribute | Detail |
|-----------|--------|
| **Developer** | First Touch Games Ltd. |
| **Platforms** | iOS, Android |
| **Launch** | March 7, 2018 |
| **Downloads** | 100M+ |
| **Rating** | 3.7/5 (Google Play, 1.19M reviews) |

### 6.2 Core Gameplay
- Real-time PvP with swipe-based controls
- Players draw passing lanes, execute tackles, time shots
- AI handles off-ball movement; player intervenes at key moments
- Fast matches (2-3 minutes) -- ideal for mobile
- Arena progression system through tiers

### 6.3 Card/Player System
- 16+ player types: Speedster, Commander, Engine, Architect, Hammer, etc.
- Super Players (Gold and Silver classes) from Arena 3+
- Duplicate cards for leveling up
- Multiple formations unlockable through progression

### 6.4 Monetization
- F2P with ads + IAP
- Energy system gates play sessions
- Randomized card packs with displayed drop rates
- Rewarded ads for bonus rewards

### 6.5 P2W Analysis

**Assessment: Moderate P2W**
- Spending accelerates card collection significantly
- Community reports suspected dynamic difficulty adjustment (DDA) -- game "cheats" when you win too much
- Speedster long-pass strategy has ~90% success rate (balance issue)
- F2P can progress with patience but competitive ceiling exists

### 6.6 Strengths & Weaknesses

| Strengths | Weaknesses |
|-----------|------------|
| Fast, accessible matches (2-3 min) | Suspected DDA destroys trust |
| Unique swipe + tactical hybrid | Energy system limits F2P play |
| Deep player type system | Rigid meta (Speedster dominates) |
| Real-time PvP tension | Grind wall at higher arenas |
| Strong visual quality | 3.7 rating reflects accumulated frustration |

### 6.7 Sustainability Score: 5/10

Solid core gameplay but DDA suspicion and energy system create trust/retention issues.

---

## 7. Top Eleven

### 7.1 Overview

| Attribute | Detail |
|-----------|--------|
| **Developer** | Nordeus (Belgrade, Serbia) |
| **Owner** | Take-Two Interactive (acquired for $378M, Feb 2021) |
| **Platforms** | iOS, Android, WebGL, Microsoft Store |
| **Launch** | May 2010 (Facebook); 2011 (mobile) |
| **Registered Users** | 300M+ |
| **Revenue** | ~$75M/year |
| **Age** | 15+ years of continuous operation |

### 7.2 Core Gameplay
- Football club management simulation
- Tactics, formation, training, match-day decisions
- Real-time match simulation
- Seasons against other real managers
- 2026 additions: Campus (club building), Fan Loyalty system

### 7.3 Monetization

**Premium Currency: Tokens**
- Used for: auctions, player purchases, trainers, facility construction, rest packs
- F2P earning: ~1 token/day via TV Rights, plus negotiations, association rewards, ads
- Purchasable with real money

**Additional:** Rest Packs, Special Sponsors, Monthly Cards (subscription-style), ad-driven events

### 7.4 P2W Analysis

**Assessment: Heavily P2W (with vocal community backlash)**

- Forum threads titled **"The worst pay to win game ever"** (58+ replies, 30+ likes)
- Players placed against teams **40-60% stronger** -- non-spenders can never realistically win titles
- Reviews state algorithms are "set against players unless willing to pay GBP 20/month"
- **Pay-to-maintain model:** Rest/health system means squads degrade without spending
- Token-gated auctions ensure spenders always outbid F2P
- 2025-2026 trend: "All events now geared towards watching ads or paying for premium sponsors"

### 7.5 Strengths & Weaknesses

| Strengths | Weaknesses |
|-----------|------------|
| 15+ years of operation, 300M+ users | Aggressive, escalating monetization |
| Deep management simulation | P2W is severe and well-documented |
| Strong social features (associations) | "Pay-to-maintain" rest system is punitive |
| Multi-platform availability | Ad-driven events replacing skill-based content |
| Backed by Take-Two resources | Player trust eroding (2024-2026) |

### 7.6 Sustainability Score: 5/10

Revenue sustained by whale concentration, but F2P player base eroding. Long-term viability depends on whether Take-Two reverses the monetization escalation trend.

---

## 8. Dream League Soccer

### 8.1 Overview

| Attribute | Detail |
|-----------|--------|
| **Developer** | First Touch Games Ltd. |
| **Publisher** | SEGA |
| **Platforms** | iOS, Android |
| **Current** | Dream League Soccer 2026 |
| **Downloads** | 100M+ |
| **Rating** | 4.0/5 (13.6M reviews) |
| **MAU** | 20M+ monthly active users |
| **Licensing** | FIFPRO (4,000+ real players) |

### 8.2 Core Gameplay
- Full 3D football simulation with touchscreen controls
- Motion-captured animations from real athletes
- Career mode: build a club from scratch through divisions
- **Offline play** -- major differentiator
- Clans system (2026 addition) for social engagement
- Dream Stars 26: enhanced card system

### 8.3 Monetization

**Dual Currency:**

| Currency | Availability | Use |
|----------|-------------|-----|
| **Coins** | Abundant (matches, Season Pass, ads) | Player signing, day-to-day operations |
| **Gems/Diamonds** | Scarce (20-day login cycle, limited free sources) | Premium players (90+), facility upgrades |

Season Pass with free + premium tiers. Rewarded video ads (30-40 coins per ad).

### 8.4 P2W Analysis

**Assessment: Mildly P2W -- The Gold Standard for Fair Mobile Football**

- Core gameplay is **skill-based** -- touchscreen mechanics and tactics determine outcomes more than squad quality
- Gems create a gap: 90+ rated players effectively premium-locked
- But offline career mode is entirely unaffected by P2W
- Online multiplayer: skill still trumps squad quality
- **9.2/10 review rating** suggests monetization isn't severely damaging experience
- Community advises: spend gems on facilities, not agents (player packs)

### 8.5 Strengths & Weaknesses

| Strengths | Weaknesses |
|-----------|------------|
| Best-in-class mobile football gameplay | Player switching delays (0.5-2 sec) |
| Deep career mode with long-term progression | AI/goalkeeper inconsistencies |
| **Offline play support** | Can be demanding on low-end devices |
| Stunning 3D graphics (rated 9.5/10) | Career mode can become repetitive |
| Relatively fair F2P model | Gems create some gap for top players |
| 20M+ MAU -- strong market position | Annual edition releases require re-engagement |
| FIFPRO licensing (4,000+ players) | Controls not as polished as console |
| Clan system adding social hooks | |

### 8.6 Sustainability Score: 8/10

The most sustainable model among analyzed competitors. Skill-based gameplay + fair F2P + offline support + social features = highest ratings and strongest retention. DLS proves that respecting players works commercially (20M MAU, SEGA publishing deal).

---

## 9. Other Notable Competitors

### 9.1 Total Football
- **Launch:** November 3, 2025
- **Downloads:** 10M+ within weeks; 4.3 rating
- **Notable:** 4,000+ licensed players (Ronaldo, Messi, Haaland); rapid growth signals strong market demand for new entrants

### 9.2 Football Manager Mobile (FM26)
- **Developer:** Sports Interactive (via Netflix)
- **Monetization:** Netflix subscription (NO IAP, NO P2W)
- **Deepest management simulation on mobile** but recent criticism for FM26 quality
- Demonstrates that zero-P2W models can exist in football gaming

### 9.3 UFL (United Football League)
- **Launch:** January 2025 (mobile)
- **Positioning:** "Fair-to-play" alternative to EA FC
- **Notable:** Explicitly markets against P2W -- showing market appetite for fair competition

### 9.4 Soccer Stars (Miniclip)
- 4.56/5 rating (2.2M ratings)
- Table-top/bottle-cap style turn-based soccer
- Moderate P2W with matchmaking concerns
- Different genre but demonstrates casual football game appeal

### 9.5 Retro Goal (New Star Games)
- 16-bit retro arcade soccer
- Minimal P2W ($0.99 paywall after 10 matches)
- Nostalgic charm, offline support
- Proves simple execution can succeed

### 9.6 Football League 2026
- 40,000+ players (men & women), 1,500 clubs, 150 national teams
- Strong licensing breadth including Manchester City, AS Monaco

---

## 10. Comparative Analysis

### 10.1 P2W Spectrum

| Rank | Game | P2W Level | Impact |
|------|------|-----------|--------|
| 1 | FM Mobile | None | Zero IAP (Netflix model) |
| 2 | Retro Goal | Minimal | $0.99 one-time, no competitive P2W |
| 3 | **DLS 2026** | **Mild** | **Skill dominates; gems accelerate** |
| 4 | eFootball | Moderate | Pay-to-accelerate; high skill ceiling |
| 5 | Score! Match | Moderate | Card upgrades + suspected DDA |
| 6 | EA FC Mobile | Heavy | OVR-driven; P2W players 5-20+ OVR ahead |
| 7 | Top Eleven | Heavy | Token economy dominates competitive play |
| 8 | **Goley** | **Fatal** | **P2W killed the game** |

### 10.2 Monetization Model Comparison

| Game | Model | Premium Currency | Reset | Annual Revenue |
|------|-------|-----------------|-------|----------------|
| EA FC Mobile | IAP-heavy | FC Points | No (since 2025) | $172M+ |
| eFootball | IAP-moderate | eFootball Coins + GP + Points | No (never) | Not disclosed |
| Top Eleven | IAP + Ads | Tokens | Seasonal leagues | ~$75M |
| DLS 2026 | IAP + Ads | Gems | Annual editions | Not disclosed |
| Score! Match | IAP + Ads | Gems | Arena-based | Not disclosed |
| Goley | IAP | JoyPara | Never (permanent advantage) | Collapsed |

### 10.3 Skill vs. Wallet Impact

| Game | Skill : Wallet Ratio | Notes |
|------|----------------------|-------|
| DLS 2026 | 70:30 | Skill dominates; wallet accelerates |
| eFootball | 65:35 | Simulation depth rewards skill |
| Score! Match | 60:40 | Swipe execution matters but cards help |
| EA FC Mobile | 45:55 | OVR differential directly impacts chances |
| Top Eleven | 30:70 | Token economy determines squad quality |
| Goley (late) | 10:90 | Legendary cards made skill irrelevant |

### 10.4 Retention Drivers Comparison

| Driver | Best Example | Worst Example |
|--------|-------------|---------------|
| Fair F2P model | DLS (4.0 rating, 20M MAU) | Top Eleven (heavy P2W churn) |
| Skill-based gameplay | eFootball (console parity) | Goley (P2W override skill) |
| No seasonal resets | eFootball (always had it) | FIFA Mobile pre-2025 (annual wipes) |
| Offline play | DLS (career mode offline) | Score! Match (requires internet) |
| Content cadence | FC Mobile (event every 1-3 weeks) | Goley (only new card packs) |
| Social features | Top Eleven (associations) | Goley (basic friends only) |
| Anti-cheat | FC Mobile (reasonable) | eFootball (null results rampant) |

### 10.5 Industry Benchmarks (2025-2026)

| Metric | Value |
|--------|-------|
| Mobile game D1 retention (top games) | 40-50% |
| Sports games D1 retention | 32.6% (highest genre) |
| Sports games D30 retention | 7.1% (lowest churn genre) |
| Android D1 churn | 72.4% |
| iOS D1 churn | 64.2% |
| Games uninstalled within 30 days | 95% |
| Total mobile IAP revenue (2025) | $81.75B |
| F2P share of mobile revenue | 97% |
| Players accounting for 50%+ revenue | Top 2% (whales) |

---

## 11. Lessons & Recommendations for Project F

### 11.1 The Ten Commandments (from Competitor Failures)

1. **NEVER introduce a card tier that makes all previous tiers obsolete** without a transition plan. (Goley's Legendary cards)

2. **NEVER reset player progress.** The industry has spoken -- FIFA Mobile reversed course after 8 years of churn. eFootball proved no-reset works. Resets punish your most loyal players.

3. **ALWAYS match by team power AND skill rating**, not just rank. Free players must never face whale teams they can't possibly beat. (Goley's #1 UX failure)

4. **ALWAYS publish pack odds** with granular detail. Regulatory pressure is mounting (Belgium, South Korea). Future-proof your monetization by being transparent from day one.

5. **NEVER devalue what players paid for.** If you give away what people bought, you lose both revenue AND trust simultaneously. (Goley's Phase 4 death spiral)

6. **ALWAYS provide catch-up mechanics** for new players. Without them, your game becomes hostile to newcomers and growth stops. (Goley's late-joiner problem)

7. **ALWAYS fight cheating immediately.** Delayed anti-cheat compounds damage exponentially. (eFootball's null result problem; Goley's exploit tolerance)

8. **NEVER let P2W cross the "unbeatable" line.** Spending should accelerate, not guarantee victory. Skill must always matter. (DLS/eFootball model vs. Goley/Top Eleven model)

9. **ALWAYS diversify content beyond card packs.** New cards alone are not enough -- you need game modes, events, social features, narrative progression. (Goley's content stagnation)

10. **ALWAYS invest in UI/UX and technical quality.** Even the best gameplay fails if menus are cumbersome, servers are unstable, or the game launches broken. (eFootball 2022 launch disaster)

### 11.2 Monetization Sweet Spot

**Target the DLS/eFootball zone:**

```
[None] ---- [Mild] ---- [Moderate] ---- [Heavy] ---- [Fatal]
  FM          DLS        eFootball        FC Mobile     Goley
              ^^^^^^^^^^^^^^^^^
              PROJECT F TARGET ZONE
```

**Recommended Model:**
- **Dual currency:** Abundant free currency (earned through play) + scarce premium currency (gems/coins)
- **Season Pass:** Free tier with meaningful rewards + Premium tier (~$10/month) with acceleration
- **Deterministic acquisition:** Offer ways to get specific players without pure gacha (like eFootball's Nominating Contracts)
- **Cosmetic monetization:** Kits, celebrations, stadiums, effects -- infinite revenue potential with zero P2W impact
- **Rewarded ads:** Voluntary, 30-60 second ads for free currency (62% of mobile ad revenue, 45-60% engagement)
- **No energy systems.** Let players play as much as they want.

### 11.3 Card Economy Design

**From Goley's Mistakes:**
- Implement **soft power ceilings** -- no card should be 10x more powerful than the tier below
- Create **card recycling** that preserves value (like eFootball's Player Fusion)
- Design **upgrade systems with failure protection** -- never destroy invested cards on failure
- Build a **trade/exchange market** giving all cards a value floor
- Plan for **controlled inflation** -- new cards should be sidegrades/specializations, not strict upgrades

**From FIFA Mobile/FUT:**
- **Chemistry system** encouraging themed squads over random all-star teams
- **SBC-like card sinks** to manage economy inflation
- **Evolution/progression paths** giving players agency over card development

### 11.4 Retention Architecture

**From Best Practices:**
1. **Offline play support** (DLS) -- don't lose players to bad connectivity
2. **Career/progression mode** (DLS) -- long-term goals beyond competitive PvP
3. **Quick match option** (Score! Match / VSA) -- 2-3 min matches for mobile sessions
4. **Social systems** (Top Eleven associations / DLS clans) -- social bonds improve D30+ retention
5. **Real-world football tie-ins** (FC Mobile Football Centre) -- connect to live football calendar
6. **No seasonal resets** -- ever
7. **Catch-up mechanics** -- new players must have a viable path to competitiveness
8. **Anti-cheat from day one** -- don't let cheating poison the experience

### 11.5 Turkish Market Specifics (from Goley)

- **Turkish commentary** was Goley's most beloved feature -- invest in authentic Turkish localization
- **Turkish Lira volatility** is a real business risk -- price IAP in stable currency or implement dynamic pricing
- **Low-spec device accessibility** matters in Turkey -- optimize for mid-range hardware
- **Community engagement** through Turkish-language forums, social media, and support is critical
- The ISG project proves demand for a Goley successor exists -- there is an underserved Turkish audience waiting

### 11.6 Launch Quality (from eFootball)

eFootball 2022 proves that **first impressions in F2P are nearly impossible to overcome:**
- Launch with polished, content-rich experience
- Prioritize UI/UX alongside gameplay
- Ensure server stability before launch
- Never launch a "minimum viable product" in F2P -- the market won't give you a second chance
- Great core mechanics are necessary but NOT sufficient for success

---

## 12. Sources

### Goley
- [Onedio - What happened to Goley?](https://onedio.com/haber/zamaninda-fifa-ve-pes-serilerine-kafa-tutan-goley-e-ne-oldu-1027699)
- [Goley Wiki - Card Development](https://goley.fandom.com/wiki/Kart_Geli%C5%9Ftirme)
- [Sikayetvar - Goley Complaints](https://www.sikayetvar.com/joygame/goley)
- [Technopat - Why no Goley updates?](https://www.technopat.net/sosyal/konu/joygame-neden-goleye-guencelleme-getirmedi.2169329/)
- [Goley Global Wiki](https://goleyglobal.fandom.com/wiki/About_Goley)
- [ISG Spiritual Successor](https://www.technopat.net/sosyal/konu/yeni-futbol-oyunu-international-soccer-game-isg.2128395/)

### EA Sports FC Mobile / FUT
- [EA Sports FC Mobile Official](https://www.ea.com/en/games/ea-sports-fc/fc-mobile)
- [EA FC Mobile Pack Probabilities](https://www.ea.com/games/ea-sports-fc/fc-mobile/news/mobile-pack-probabilities)
- [EA FY26 Q1 Results](https://www.ea.com/news/electronic-arts-reports-q1-fy26-results)
- [Reddit r/FUTMobile](https://www.reddit.com/r/FUTMobile/)
- [Variety - EA Record Sales](https://variety.com/2024/gaming/news/ea-sports-fc-electronic-arts-earnings-1235890705/)
- [FIFA Infinity - Economics of UT](https://www.fifa-infinity.com/ea-sports-fc/the-economics-of-ultimate-team-understanding-ea-sports-profit-engine/)
- [ScienceDirect - Loot Boxes Study](https://www.sciencedirect.com/science/article/pii/S2772503022000214)

### eFootball
- [eFootball Wikipedia](https://en.wikipedia.org/wiki/EFootball)
- [Konami eFootball Official](https://www.konami.com/efootball/)
- [eFootball Metacritic](https://www.metacritic.com/game/efootball-2024/)
- [Reddit r/pesmobile](https://www.reddit.com/r/pesmobile/)
- [eFHUB Guides](https://efhub.gg/)

### Score! Match / Top Eleven / DLS
- [Score! Match Google Play](https://play.google.com/store/apps/details?id=com.firsttouchgames.smp)
- [Top Eleven Wikipedia](https://en.wikipedia.org/wiki/Top_Eleven)
- [Top Eleven P2W Forum Thread](https://forum.top-eleven.com/)
- [DLS 2026 Google Play](https://play.google.com/store/apps/details?id=com.firsttouchgames.dls7)
- [PocketTactics - Best Football Games 2026](https://www.pockettactics.com/)

### Industry Data
- Mobile game retention benchmarks (2025-2026 industry reports)
- Total mobile IAP revenue data
- Genre-specific retention statistics

---

*This document serves as the foundation for all Project F Game Design Documents. Every GDD section should reference this analysis when making design decisions about monetization, card systems, matchmaking, and player progression.*

*Document prepared by: Market Analyst Agent, YG Games*
*Date: March 17, 2026*
