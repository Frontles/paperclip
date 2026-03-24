# Project F — Competitive & Progression System Design Document

**Document Code:** GDD-04
**Version:** 1.0
**Date:** March 17, 2026
**Author:** Game Designer Agent, YG Games
**Status:** Draft
**Based On:** [GDD-00 Competitor Analysis](docs/00-competitor-analysis-en.md) | [GDD-01 Core Game Design](core-game-design-en.md) | [GDD-03 Game Economy](game-economy-monetization-en.md)

---

## Table of Contents

1. [ELO/MMR System](#1-elommr-system)
2. [Season Structure](#2-season-structure)
3. [Ranked Mode](#3-ranked-mode)
4. [Casual Mode](#4-casual-mode)
5. [Reward Structure](#5-reward-structure)
6. [New Player Balancing](#6-new-player-balancing)
7. [P2W Avoidance Mechanics](#7-p2w-avoidance-mechanics)
8. [Leaderboards](#8-leaderboards)
9. [P2W Balance & Sustainability Evaluation](#9-p2w-balance--sustainability-evaluation)

---

## 1. ELO/MMR System

### 1.1 Design Philosophy

MMR must reflect **player skill, not card power.** A skilled player with Normal cards should have a higher MMR than an unskilled player with Super cards. Matchmaking then uses BOTH MMR and team power to create fair matches.

**Two-Axis Matching:**
```
         HIGH SKILL
              │
              │  ┌───────────────┐
              │  │ Skilled F2P   │ ← Faces other skilled players
              │  │ MMR: 2200     │    with similar power teams
              │  │ Power: 72     │
              │  └───────────────┘
              │
              │  ┌───────────────┐
              │  │ Skilled Whale │ ← Faces other skilled players
              │  │ MMR: 2300     │    with similar power teams
              │  │ Power: 90     │
              │  └───────────────┘
              │
         LOW SKILL
              │
              │  ┌───────────────┐
              │  │ Casual F2P    │ ← Faces other casuals
              │  │ MMR: 1100     │    with similar power teams
              │  │ Power: 65     │
              │  └───────────────┘
```

### 1.2 Rating Algorithm

**Base Formula (Modified Elo):**

```
New Rating = Old Rating + K × (Actual - Expected)

Where:
  K = K-factor (varies by context, see below)
  Actual = 1.0 (win), 0.5 (draw), 0.0 (loss)
  Expected = 1 / (1 + 10^((OpponentMMR - YourMMR) / 400))
```

**K-Factor Table:**

| Context | K-Factor | Rationale |
|---------|---------|-----------|
| **Placement matches (first 10)** | 50 | High volatility for quick calibration |
| **Under 30 ranked matches** | 40 | Still calibrating |
| **Bronze-Silver (0-1499)** | 32 | Standard movement for lower tiers |
| **Gold-Platinum (1500-2499)** | 24 | Slower movement at higher tiers |
| **Diamond (2500+)** | 16 | Very stable at elite level |
| **After 15+ game losing streak** | K × 0.7 | Dampened loss to prevent despair spiral |
| **After 10+ game winning streak** | K × 1.3 | Accelerated gain to find true ceiling |

### 1.3 Starting MMR & Placement

| Parameter | Value |
|-----------|-------|
| **New Account Starting MMR** | 1000 (hidden during placement) |
| **Placement Matches** | 10 matches per season |
| **Placement Volatility** | K = 50 (rapid calibration) |
| **Post-Placement Display** | After 10 games, rank and MMR displayed |
| **Seasonal Soft Reset** | MMR compressed toward 1200: NewMMR = 1200 + (OldMMR - 1200) × 0.6 |

**Soft Reset Example:**
- Player at 2500 → Resets to 1200 + (2500-1200) × 0.6 = **1980**
- Player at 800 → Resets to 1200 + (800-1200) × 0.6 = **960**
- Player at 1200 → Stays at **1200** (median unaffected)

### 1.4 Rating Decay

| Rule | Detail |
|------|--------|
| **No decay below Gold** | Bronze/Silver players never lose MMR from inactivity |
| **Gold+ decay** | -10 MMR per week of no ranked matches |
| **Maximum decay** | 4 weeks (max -40 MMR), then frozen |
| **Decay floor** | Cannot decay below tier floor (Gold = 1500, Platinum = 2000, Diamond = 2500) |
| **Decay notification** | Push notification after 5 days of inactivity |

### 1.5 MMR Visibility

| Element | Visibility |
|---------|-----------|
| **Your MMR** | Visible after placement (exact number + rank badge) |
| **Opponent MMR** | Hidden during matchmaking, shown post-match |
| **Team Power** | Visible to you; hidden from opponent during match (shown post-match) |
| **Win probability** | Never shown (prevents toxicity and queue dodging) |
| **MMR history** | Graph showing MMR over time available in profile |

---

## 2. Season Structure

### 2.1 Tier System

| Tier | MMR Range | Badge | Promotion Reward | Population Target |
|------|-----------|-------|-----------------|-------------------|
| **Bronze** | 0-999 | Bronze shield | 500 Coins + 1 Standard Pack | 25% of players |
| **Silver** | 1000-1499 | Silver shield | 1,000 Coins + 1 Standard Pack | 30% of players |
| **Gold** | 1500-1999 | Gold shield | 2,000 Coins + 1 Premium Pack + 50 Gems | 25% of players |
| **Platinum** | 2000-2499 | Platinum shield | 3,000 Coins + 2 Premium Packs + 100 Gems | 15% of players |
| **Diamond** | 2500+ | Diamond shield (animated) | 5,000 Coins + 1 Elite Pack + 200 Gems | 5% of players |

### 2.2 Division System (Within Tiers)

Each tier is divided into **5 divisions** (Division V → Division I):

| Division | MMR Offset | Stars Required to Promote |
|----------|-----------|--------------------------|
| V (entry) | +0-99 | 3 stars (3 net wins) |
| IV | +100-199 | 3 stars |
| III | +200-299 | 4 stars |
| II | +300-399 | 4 stars |
| I (top) | +400-499 | 5 stars (tier promotion) |

**Star System:**
- Win = +1 star
- Loss = -1 star (but never below 0 stars in current division)
- Draw = 0 stars
- Win streak bonus: 3+ wins in a row = +2 stars per win

### 2.3 Promotion & Relegation

| Mechanic | Detail |
|----------|--------|
| **Tier Promotion** | Earn required stars in Division I → Promotion match (best of 3) |
| **Promotion Shield** | After promoting, you cannot demote for 5 matches (grace period) |
| **Tier Floor** | Once a tier is reached, you cannot drop below it within a season |
| **Division Demotion** | Losing at 0 stars in any division → drop to previous division at 2 stars |
| **Season Reset** | All tiers/divisions reset; MMR soft-resets to placement zone |

### 2.4 Season Duration & Timeline

| Phase | Duration | Content |
|-------|----------|---------|
| **Pre-Season** | 3 days | Season Pass preview, new cosmetics reveal, patch notes |
| **Placement Phase** | Week 1-2 | 10 placement matches, higher K-factor |
| **Main Season** | Week 3-10 | Core competitive play, weekly challenges, events |
| **End-Season Push** | Week 11-12 | 2× star progress weekends, final tournament, last-chance rewards |
| **Season Close** | Last day | Final standings locked, rewards calculated |
| **Maintenance** | 2-4 hours | Reset, reward distribution, new season setup |

---

## 3. Ranked Mode

### 3.1 Entry Requirements

| Requirement | Detail | Purpose |
|-------------|--------|---------|
| **Account Level 5+** | ~2-3 hours of play | Prevents brand-new accounts from entering ranked |
| **6 Player Cards + Manager + Team** | Full squad required | Ensures minimum preparation |
| **Training Ground Completion** | Basic tutorial done | Ensures control familiarity |
| **5 Casual Matches Played** | Quick Match experience | Ensures basic match experience |

### 3.2 Matchmaking Algorithm

**Priority Order:**

1. **MMR Range:** Find opponents within ±150 MMR
2. **Team Power Range:** Within ±15% team OVR
3. **Region:** Same region preferred (latency)
4. **Queue Time Expansion:** After 15 sec → ±250 MMR, ±20% power. After 30 sec → ±400 MMR, ±30% power. After 60 sec → any available.

**Matchmaking Constraints:**

| Constraint | Rule |
|-----------|------|
| **Rematch cooldown** | Cannot face same opponent within 30 minutes |
| **Streak protection** | After 3 consecutive losses, next match prioritizes ±100 MMR (tighter) |
| **New player protection** | First 20 ranked matches: only face players with <50 ranked matches |
| **Region priority** | Same-country > same-continent > global |
| **Power gap override** | If power difference >25%, match is cancelled and re-queued even if MMR matches |

### 3.3 Ranked Rewards

**Per-Match Rewards:**

| Outcome | Coins | XP | Stars |
|---------|-------|-----|-------|
| Win | 100 | 50 | +1 (or +2 on streak) |
| Draw | 50 | 30 | 0 |
| Loss | 40 | 20 | -1 |
| Win vs. higher MMR (+200) | 150 | 75 | +1 |
| Perfect win (3-0 or more) | 150 | 75 | +1 |

**Season Milestone Rewards:**

| Milestone | Reward |
|-----------|--------|
| 10 Ranked Wins | 500 Coins + 1 Nomination Token |
| 25 Ranked Wins | 1 Premium Pack + 30 Gems |
| 50 Ranked Wins | 2 Premium Packs + 1 Nomination Token + Exclusive Emote |
| 100 Ranked Wins | 1 Elite Pack + 100 Gems + Exclusive Card Border |
| First time reaching Gold | 1 Premium Pack + "Gold Achiever" Title |
| First time reaching Platinum | 2 Premium Packs + "Platinum Warrior" Title |
| First time reaching Diamond | 1 Elite Pack + "Diamond Legend" Title + Animated Profile Banner |

---

## 4. Casual Mode

### 4.1 Quick Match

| Parameter | Detail |
|-----------|--------|
| **Entry** | Account Level 3+ |
| **Matchmaking** | Team power based only (no MMR component) |
| **Duration** | Standard match (~4 min) |
| **Stakes** | No rank impact, no star changes |
| **Rewards** | 50 Coins (win), 20 Coins (loss), 25 XP per match |
| **Purpose** | Warm up, practice new formations, try rented cards, stress-free play |

### 4.2 Friendly Match

| Parameter | Detail |
|-----------|--------|
| **Entry** | Account Level 2+, must invite specific friend |
| **Matchmaking** | Direct invite (no random matching) |
| **Custom Rules** | Selectable: No abilities, Fixed tier (all Normal), Weather, Time limit |
| **Stakes** | None — pure social play |
| **Rewards** | 10 Coins, 10 XP (participation, not outcome) |
| **Purpose** | Social play, fun with friends, settle debates |

### 4.3 Challenge Mode (PvE)

| Parameter | Detail |
|-----------|--------|
| **Entry** | Account Level 4+ |
| **Opponent** | AI teams with themed modifiers |
| **Rotation** | 3 new challenges per week |
| **Difficulty** | Easy / Medium / Hard (scaling AI + restrictions) |
| **Rewards** | Coins, XP, Abilities, Card Packs (by difficulty) |
| **Purpose** | Offline-friendly PvE, skill training, alternative progression |

---

## 5. Reward Structure

### 5.1 Daily Rewards

| Reward | Requirement | Value |
|--------|------------|-------|
| **Login Bonus** | Log in | 50-200 Coins (escalating 7-day cycle: 50→75→100→125→150→175→200) |
| **First Win** | Win 1 match (any mode) | 100 Coins + 25 XP bonus |
| **Daily Quest 1** | "Play 3 matches" | 75 Coins |
| **Daily Quest 2** | "Score 5 goals" | 75 Coins |
| **Daily Quest 3** | "Win 1 ranked match" | 75 Coins + 15 Gems |

### 5.2 Weekly Rewards

| Reward | Requirement | Value |
|--------|------------|-------|
| **Weekly Quest** | "Win 10 matches" | 500 Coins + 1 Standard Pack |
| **Weekly Challenge** | Complete weekly PvE challenge (Hard) | 200 Coins + 15 Gems + 2 Nomination Tokens |
| **Tournament Entry** | Enter weekly tournament | Free entry + rewards based on placement |
| **League Match** | Play scheduled league match | 100 Coins + League Points |

### 5.3 Season-End Rewards

Detailed in GDD-03 §3.3. Summary:

| Tier | Base Pack | Coins | Gems | Exclusive |
|------|-----------|-------|------|-----------|
| Bronze | 1 Starter | 500 | 0 | Bronze badge |
| Silver | 1 Standard | 1,000 | 25 | Silver badge |
| Gold | 1 Premium | 2,000 | 50 | Gold badge + Title |
| Platinum | 2 Premium | 3,000 | 100 | Platinum badge + Title + Card Border |
| Diamond | 1 Elite | 5,000 | 200 | Diamond badge + Title + Animated Border + Profile Banner |

Plus playtime bonus packs and loyalty multiplier (see GDD-03 §3.3).

### 5.4 Achievement System

**Achievement Categories:**

| Category | Examples | Total Achievements |
|----------|---------|-------------------|
| **Match** | "Win 100 matches," "Score 500 goals," "Keep 50 clean sheets" | 30 |
| **Card** | "Collect 100 unique cards," "Max level a Super card," "Complete album page" | 25 |
| **Ability** | "Use each ability once," "Counter 10 abilities," "Collect all Gold abilities" | 20 |
| **Ranked** | "Reach Gold," "Win 10 promotion matches," "Hold Diamond for full season" | 15 |
| **Social** | "Trade 50 cards," "Win 10 league matches," "Complete 5 co-op Boss Matches" | 15 |
| **Challenge** | "Complete 100 challenges," "Win 10 Hard challenges in a row" | 10 |
| **Mastery** | "Use all formations," "Win with every formation," "Score from every position" | 10 |
| **Total** | | **125** |

Each achievement grants 5-50 Gems based on difficulty, creating a significant F2P Gem source (~2,000+ total Gems across all achievements).

---

## 6. New Player Balancing

### 6.1 New Player Journey

```
WEEK 1: ONBOARDING
┌─────────────────────────────────────────────────────┐
│ Day 1: Training Ground (tutorial, learn controls)    │
│ Day 2: First Quick Match (vs. AI or very new players)│
│ Day 3: Card Workshop intro (customize first card)    │
│ Day 4-5: More Quick Matches, unlock formations       │
│ Day 6-7: Ranked unlock at Level 5                    │
│ Reward: Starter Pack (6 Special + 1 Rare guaranteed) │
└─────────────────────────────────────────────────────┘

WEEK 2-3: EXPLORATION
┌─────────────────────────────────────────────────────┐
│ First ranked placement matches (protected pool)      │
│ Challenge Mode unlocks at Level 4                    │
│ First card merging experience                        │
│ Join a League (Level 8+)                             │
│ First weekly tournament entry (Level 10+)            │
└─────────────────────────────────────────────────────┘

WEEK 4+: COMPETITIVE
┌─────────────────────────────────────────────────────┐
│ Full ranked matchmaking (exits new player pool)      │
│ All modes accessible                                 │
│ Trading unlocks at Level 10                          │
│ Building toward first Expert/Super card              │
└─────────────────────────────────────────────────────┘
```

### 6.2 New Player Protection Mechanics

| Protection | Detail | Duration |
|-----------|--------|----------|
| **Starter Pack** | 6 Special cards + 1 guaranteed Rare + 1 Normal Manager + 1 basic Team Card | Account creation |
| **Protected Matchmaking** | Only face players with <50 ranked matches | First 20 ranked matches |
| **Reduced Loss** | -0.5 stars instead of -1 star on ranked loss | First 30 ranked matches |
| **Accelerated XP** | 2× account XP for faster unlocks | Until Level 10 |
| **Guaranteed Daily Pack** | 1 free Standard Pack per day | First 7 days |
| **Bot Matches** | If no suitable opponent found in 20 sec, face AI bot (marked as bot) | First 10 matches only |
| **Ability Tutorial** | Free Bronze ability given at Level 3 with tutorial | One-time |

### 6.3 Catch-Up Mechanics (Mid-Season Joiners)

| Mechanic | Detail |
|----------|--------|
| **Catch-Up Pack** | If joining mid-season, receive a "Catch-Up Pack" with cards scaled to the season's average card tier |
| **Accelerated Placement** | K-factor of 60 (instead of 50) for mid-season joiners to find true rank faster |
| **Event Participation** | Events give proportional rewards regardless of when you joined |
| **Seasonal Reset** | Every 3 months is a natural entry point where everyone rebuilds |

---

## 7. P2W Avoidance Mechanics

### 7.1 Team Power Matchmaking (Primary Defense)

The single most important anti-P2W mechanic. Detailed algorithm:

```
Matchmaking Score = (MMR Weight × MMR) + (Power Weight × TeamPower)

Where:
  MMR Weight = 0.65 (skill matters more)
  Power Weight = 0.35 (team power matters but less)

  Acceptable match: |Your Score - Opponent Score| < Threshold

  Threshold starts at 100, expands by 50 every 15 seconds
  Max threshold: 400 (after 60 seconds)
```

**Effect:** A whale (MMR 1800, Power 92) is matched against another player with similar combined score — likely another whale (MMR 1750, Power 93) or a highly skilled player with moderate team (MMR 2100, Power 78).

### 7.2 Power Caps in Competitive Events

| Event Type | Power Rule |
|-----------|-----------|
| **Ranked Mode** | No cap — power matchmaking handles balance |
| **Weekly Tournament** | Random modifier each week may include "All Normal" or "Max Rare" restrictions |
| **Seasonal Championship** | No cap, but requires Gold+ rank (skill threshold) |
| **League Mode** | Division-based, so similar teams face each other naturally |
| **Challenge Mode** | Some challenges require specific tier restrictions ("Win with Normal cards only") |

### 7.3 Structural Anti-P2W Design

| Mechanic | How It Prevents P2W |
|----------|---------------------|
| **Team Power Matchmaking** | Whales face equally strong teams, not stomp F2P |
| **No Legendary Tier** | Power ceiling is reachable by F2P within a season |
| **Seasonal Reset** | Permanent whale advantage impossible; max 3-month advantage |
| **Nomination System** | F2P can target specific cards (no pure gacha dependency) |
| **Ability Parity** | All abilities earnable F2P; tier affects speed, not power cap |
| **Chemistry System** | Rewards squad building intelligence, not raw spending |
| **Published Odds** | Players make informed decisions about spending |
| **Spending Caps** | Soft limits prevent extreme whale accumulation |

---

## 8. Leaderboards

### 8.1 Leaderboard Types

| Leaderboard | Ranking By | Scope | Reset |
|-------------|-----------|-------|-------|
| **Global MMR** | MMR rating | Worldwide | Seasonal |
| **Regional MMR** | MMR rating | By country/region | Seasonal |
| **Friends** | MMR rating | Friend list only | Seasonal |
| **League** | League points | Within league | Seasonal |
| **Tournament** | Tournament wins | Season cumulative | Seasonal |
| **Collection** | Album completion % | Global | Persistent (carries over) |
| **Win Streak** | Consecutive wins | Global | Resets when streak breaks |
| **Weekly Stars** | Stars earned this week | Global | Weekly reset |

### 8.2 Leaderboard Rewards

**Season-End Leaderboard Rewards (Top Players):**

| Position | Global MMR Reward | Regional MMR Reward |
|---------|------------------|-------------------|
| #1 | 1,000 Gems + Exclusive Animated Title + #1 Profile Frame | 500 Gems + Regional Champion Title |
| #2-3 | 500 Gems + Top 3 Title | 250 Gems + Regional Top 3 Title |
| #4-10 | 300 Gems + Top 10 Title | 150 Gems + Regional Top 10 Title |
| #11-50 | 150 Gems + Top 50 Badge | 75 Gems + Regional Top 50 Badge |
| #51-100 | 100 Gems + Top 100 Badge | 50 Gems |
| Top 1% | 50 Gems + Elite Badge | 25 Gems |

### 8.3 Anti-Manipulation

| Measure | Detail |
|---------|--------|
| **Win trading detection** | Pattern analysis for repeated matches between same players with alternating wins |
| **Account sharing detection** | Unusual login pattern analysis (different devices, locations in short timespan) |
| **MMR boosting detection** | Flagged when a low-ranked account suddenly gains 500+ MMR in a short period |
| **Consequence** | Season rewards revoked + 1-season ranked ban + leaderboard removal |

---

## 9. P2W Balance & Sustainability Evaluation

### 9.1 System P2W Scorecard

| System | P2W Risk | Mitigation | Risk Level |
|--------|----------|------------|------------|
| **MMR System** | Could reflect spending instead of skill | Two-axis matching (MMR + power separately), soft reset compression | ✅ Low |
| **Tier Promotions** | Whales promote faster | Floor protection prevents demotion; promotions still require winning | ✅ Low |
| **Season Rewards** | Better rank = better rewards | Rewards are proportional, not exponential; playtime also counts | ✅ Low |
| **Matchmaking** | Power gap in matches | ±15% power range, power gap override at 25% | ✅ Low |
| **Leaderboard Rewards** | Top positions dominated by whales | Whales face whales, so top positions require SKILL + investment | ⚠️ Medium |
| **New Player Protection** | Pay-to-skip protection period | Protection is time-based and match-count based, not purchasable | ✅ Low |

### 9.2 Sustainability Assessment

| Factor | Rating | Detail |
|--------|--------|--------|
| **Competitive Integrity** | 9/10 | Two-axis matchmaking + power gap override ensures fair matches |
| **New Player Experience** | 9/10 | Comprehensive protection + catch-up mechanics + seasonal entry points |
| **Rank Meaningfulness** | 8/10 | MMR reflects skill; star system provides visible progress |
| **Reward Fairness** | 9/10 | Playtime matters alongside rank; achievements are a major F2P Gem source |
| **Long-Term Motivation** | 8/10 | Season resets + leaderboards + achievements + collection = multiple goal layers |
| **Anti-Cheat Foundation** | 8/10 | Detection systems for win trading, boosting, account sharing |
| **Overall** | **8.5/10** | |

---

## Appendix: Competitor Cross-Reference

| GDD Decision | Competitor Learning | Source |
|-------------|-------------------|--------|
| Two-axis matchmaking (MMR + Power) | Goley ignored team power entirely | GDD-00 §2.5 |
| New player protection pool | Goley had no catch-up mechanics | GDD-00 §2.6 |
| Seasonal soft reset (not hard) | FIFA Mobile hard resets drove churn | GDD-00 §3.6 |
| Tier floor protection | Prevents frustration from rank oscillation | Industry best practice |
| Published MMR | eFootball transparency builds trust | GDD-00 §5.5 |
| Achievement-based Gem source | DLS proves F2P can thrive with non-IAP sources | GDD-00 §8.4 |
| Anti-cheat from day one | eFootball null results damaged community | GDD-00 §5.8 |

---

*This document defines the Competitive & Progression systems for Project F. Read alongside GDD-01 (Core Design) and GDD-03 (Economy) for the full competitive experience design.*

*Document prepared by: Game Designer Agent, YG Games*
*Date: March 17, 2026*
