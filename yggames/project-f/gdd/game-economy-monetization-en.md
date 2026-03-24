# Project F — Game Economy & Monetization Design Document

**Document Code:** GDD-03
**Version:** 1.0
**Date:** March 17, 2026
**Author:** Game Designer Agent, YG Games
**Status:** Draft
**Based On:** [GDD-00 Competitor Analysis](docs/00-competitor-analysis-en.md) | [GDD-01 Core Game Design](core-game-design-en.md) | [GDD-02 Card & Collection System](card-collection-system-en.md)

---

## Table of Contents

1. [P2W Balance Framework](#1-p2w-balance-framework)
2. [Currency System](#2-currency-system)
3. [Seasonal Reset Mechanism](#3-seasonal-reset-mechanism)
4. [Pack System](#4-pack-system)
5. [Trade & Rental System](#5-trade--rental-system)
6. [Monetization Channels](#6-monetization-channels)
7. [Sustainability & Economic Loop Analysis](#7-sustainability--economic-loop-analysis)

---

## 1. P2W Balance Framework

### 1.1 The Foundational Rule

> **Spending accelerates progression. Skill determines outcomes. No amount of money can buy an unbeatable team.**

This is not a suggestion — it is the non-negotiable design law for Project F's entire economy. Every mechanic, price point, and reward structure must be tested against this rule before implementation.

### 1.2 P2W Spectrum Positioning

Based on the Competitor Analysis (GDD-00 §10.1):

```
[None] ━━━━ [Mild] ━━━━ [Moderate] ━━━━ [Heavy] ━━━━ [Fatal]
  FM          DLS        eFootball        FC Mobile     Goley
              ▲━━━━━━━━━━━▲
              PROJECT F TARGET ZONE
              (Skill:Wallet = 70:30)
```

**Reference:** [Monetization best practices 2026](https://adapty.io/blog/mobile-game-monetization/) | [Mobile game monetization models](https://studiokrew.com/blog/mobile-game-monetization-models-2026/)

### 1.3 What "70:30" Means in Practice

| Scenario | Outcome |
|----------|---------|
| **Skilled F2P vs. Unskilled whale** | F2P wins ~70% of the time |
| **Equal skill, F2P vs. whale** | Whale wins ~60% of the time (minor stat edge) |
| **Skilled F2P vs. Skilled whale** | Whale wins ~55% of the time (stat edge is real but not decisive) |
| **Any F2P vs. any opponent in matchmaking** | Matched by team power + MMR, so actual experience feels ~50:50 |

The key insight: **matchmaking is the primary P2W defense.** Even if a whale builds a stronger team, they face equally strong opponents. The stat advantage exists but is never felt as oppressive because matchmaking compensates.

### 1.4 P2W Control Mechanisms

| Mechanism | How It Controls P2W | Established In |
|-----------|-------------------|----------------|
| **Team power matchmaking** | Whales face whales, F2P faces F2P-equivalent | GDD-01 §4.2 |
| **No Legendary tier** | Max stat gap is +68%, not +300% | GDD-02 §3.2 |
| **3-tier competitive window** | Rare team with skill beats Expert team without | GDD-02 §3.2 |
| **Seasonal reset** | Advantages are temporary (3 months max) | GDD-01 §3.5 |
| **Abilities not premium-gated** | All abilities earnable through gameplay | GDD-02 §6.4 |
| **Nomination System (gameplay-only)** | Deterministic acquisition path for F2P | GDD-02 §3.6 |
| **Published odds** | No predatory hidden probabilities | GDD-02 §3.4 |
| **No energy system** | F2P can play unlimited matches | GDD-01 §2.6 |

### 1.5 The P2W Red Lines — Never Cross

| Red Line | Consequence of Crossing |
|----------|------------------------|
| Exclusive premium-only card tiers | Creates insurmountable gap (Goley's Legendary cards) |
| Abilities locked behind premium | Gameplay disadvantage for F2P |
| Pay-to-skip matchmaking | Destroys competitive integrity |
| Hidden or manipulated odds | Legal risk + trust destruction |
| Pay-to-maintain (degrading cards without spending) | Top Eleven's toxic model |
| Real-money trading marketplace | RMT destroys economy, creates black market |
| Premium formation/tactic unlocks | Tactical disadvantage for F2P |

---

## 2. Currency System

### 2.1 Currency Overview

Project F uses a **dual-currency system** with strict separation between earned and premium currencies.

**Reference:** [Game Economy Design in F2P](https://machinations.io/articles/game-economy-design-free-to-play-games) | [Types of Game Currencies in Mobile F2P](https://www.gamedeveloper.com/business/types-of-game-currencies-in-mobile-free-to-play) | [Balanced Mobile Game Economy](https://www.blog.udonis.co/mobile-marketing/mobile-games/balanced-mobile-game-economy)

```
CURRENCY ARCHITECTURE

┌──────────────────────────────────┐
│         COINS (Soft)             │
│  Earned through: Matches, quests,│
│  events, recycling, trading      │
│  Used for: Merging, training,    │
│  card workshop, trade balancing  │
│  ═══════════════════════════════ │
│  ABUNDANT — designed to flow     │
│  freely. Players should never    │
│  feel starved of Coins.         │
└──────────────────────────────────┘

┌──────────────────────────────────┐
│         GEMS (Hard)              │
│  Earned through: Achievements,   │
│  ranked milestones, events,      │
│  Season Pass (free tier)         │
│  Purchased: Real money IAP      │
│  Used for: Premium packs, extra  │
│  tournament entries, cosmetics,  │
│  Season Pass premium             │
│  ═══════════════════════════════ │
│  SCARCE — earned slowly F2P,    │
│  never required for core play.  │
└──────────────────────────────────┘

┌──────────────────────────────────┐
│   NOMINATION TOKENS (Gameplay)   │
│  Earned through: Ranked play,    │
│  challenges, events ONLY         │
│  Used for: Nominating specific   │
│  cards (deterministic acquisition)│
│  ═══════════════════════════════ │
│  CANNOT BE PURCHASED. Purely     │
│  gameplay-earned. F2P parity.   │
└──────────────────────────────────┘
```

### 2.2 Coin Economy (Soft Currency)

**Faucets (Coin Sources):**

| Source | Coins per Instance | Frequency | Weekly Total |
|--------|-------------------|-----------|-------------|
| **Match Win** | 100 | ~10/week | 1,000 |
| **Match Loss** | 40 | ~5/week | 200 |
| **Daily Login** | 50-200 (escalating 7-day cycle) | Daily | ~700 |
| **Daily Quests (3 per day)** | 75 each | Daily | 1,575 |
| **Weekly Quest** | 500 | Weekly | 500 |
| **Card Recycling** | 50-5,000 (by tier) | Variable | ~500 |
| **Event Rewards** | 200-1,000 | During events | ~400 |
| **Ranked Milestone** | 300-1,000 | Per milestone | ~300 |
| **Rewarded Ad** | 30 per ad (max 5/day) | Optional | 1,050 |
| **Total Weekly F2P Earning** | | | **~6,225** |

**Sinks (Coin Spending):**

| Sink | Cost | Frequency | Weekly Drain |
|------|------|-----------|-------------|
| **Card Leveling** | 20-200 per level (by tier) | Regular | ~1,500 |
| **Card Merging Fee** | 100-1,000 (by tier) | Regular | ~800 |
| **Trade Balance Payments** | Variable | Occasional | ~500 |
| **Card Workshop (cosmetic items)** | 200-2,000 | Occasional | ~300 |
| **Formation Trial** | 50 per new formation trial | Rare | ~100 |
| **Target Weekly Drain** | | | **~3,200** |

**Net Weekly Balance:** ~3,025 Coins surplus → creates a sense of accumulation and choice.

> **Design Rule:** Players should always feel like they're earning Coins. The surplus ensures F2P players can always afford core activities. The drains prevent hyperinflation.

### 2.3 Gem Economy (Hard Currency)

**F2P Gem Sources:**

| Source | Gems | Frequency | Monthly Total |
|--------|------|-----------|---------------|
| **Achievements** | 5-50 each | One-time | ~100 (early), ~20 (mature) |
| **Season Pass (Free Tier)** | 150 total over season | Seasonal | 50/month |
| **Ranked Season Milestone** | 50-200 | Per season | ~50/month |
| **Weekly Challenge (Perfect)** | 15 | Weekly | 60/month |
| **Tournament Placement** | 10-50 | Weekly | ~40/month |
| **Event Milestones** | 20-100 | During events | ~30/month |
| **Total Monthly F2P Earning** | | | **~250** |

**Gem Prices (IAP):**

| Package | Gems | Price (USD) | Price per Gem | Bonus |
|---------|------|-------------|--------------|-------|
| Starter | 100 | $0.99 | $0.0099 | — |
| Standard | 550 | $4.99 | $0.0091 | +10% |
| Value | 1,200 | $9.99 | $0.0083 | +20% |
| Super Value | 2,600 | $19.99 | $0.0077 | +30% |
| Mega | 6,500 | $49.99 | $0.0077 | +30% |
| Ultimate | 14,000 | $99.99 | $0.0071 | +40% |
| **First Purchase Bonus** | 2× on first ever purchase | | | One-time |

**Gem Sinks:**

| Sink | Cost | Notes |
|------|------|-------|
| **Premium Pack** | 300 Gems | Better odds than Standard |
| **Season Pass (Premium)** | 500 Gems/season (~$5) | See §6.2 |
| **Season Pass (Ultimate)** | 1,200 Gems/season (~$12) | See §6.2 |
| **Extra Tournament Entry** | 50 Gems | Max 2 extra per tournament |
| **Cosmetic Items** | 100-1,500 Gems | Kits, celebrations, stadium |
| **Quick Merge** | 20 Gems | Skip merge animation + instant result |
| **Name Change Token** | 10 Gems | For account name (card names are free) |

### 2.4 Nomination Token Economy

| Source | Tokens | Frequency |
|--------|--------|-----------|
| **Ranked Daily (3 wins)** | 1 | Daily |
| **Weekly Challenge Complete** | 2 | Weekly |
| **Season Ranked Milestone** | 1-3 | Per milestone |
| **Boss Match Clear** | 1 | Per event boss |
| **Weekly Total** | | **~5** |

| Spending | Cost |
|----------|------|
| Nominate Normal Card | 1 Token |
| Nominate Special Card | 3 Tokens |
| Nominate Rare Card | 8 Tokens |
| Nominate Expert Card | 20 Tokens |
| Nominate Super Card | 50 Tokens |

> **Time to Super (F2P):** ~10-17 weeks of active play. This is intentionally long but achievable — the goal is "rewarding dedication," not "impossible grind."

### 2.5 Currency Exchange Rules

| Rule | Detail |
|------|--------|
| **Gems → Coins** | 1 Gem = 10 Coins (one-way conversion) |
| **Coins → Gems** | **NOT ALLOWED** (prevents Coin inflation from devaluing Gems) |
| **Nomination Tokens** | **Cannot be bought or sold** — gameplay-only |
| **Merge XP** | **Cannot be bought or sold** — merge activity-only |
| **XP Shards** | Can be purchased with Coins (100 Coins = 5 Shards) |

---

## 3. Seasonal Reset Mechanism

### 3.1 Design Philosophy

The seasonal reset is the most critical economic mechanism in Project F. It must balance three competing needs:

1. **Freshness:** Prevent power stagnation and permanent whale advantage (Goley's fatal flaw)
2. **Reward:** Loyal players must feel valued, not punished (FIFA Mobile's churn driver)
3. **Entry:** New players must have natural join points with level playing field

### 3.2 Season Calendar

| Season | Real-World Alignment | Duration | Theme |
|--------|---------------------|----------|-------|
| **Spring** | March – May | 3 months | New Beginnings (League starts) |
| **Summer** | June – August | 3 months | Tournament Season (Cups, specials) |
| **Autumn** | September – November | 3 months | Champions Rise (Rankings push) |
| **Winter** | December – February | 3 months | Winter Legends (Holiday events) |

### 3.3 Reset Flow — Detailed

**Phase 1: Pre-Reset Warning (1 week before)**
- Countdown timer visible on all screens
- "Season Summary" screen showing stats, best moments, achievements
- "Favorite Cards" prompt: save up to 50 name/face presets to library
- Reminder to use remaining Nomination Tokens (they expire)
- Special "End of Season" event with bonus rewards

**Phase 2: Reset Night (Maintenance Window)**
- Duration: 2-4 hours
- Server-side: all player cards and manager cards removed from all accounts
- Abilities, team cards, cosmetics, currencies (Coins/Gems) preserved
- MMR soft reset: compressed toward 1200 (median), not zeroed
- Collection Album: "Season Archive" page captures final state
- Pity counters reset to zero
- Merge XP balance reset to zero
- Nomination Tokens expire (use them or lose them)

**Phase 3: Reward Distribution (Immediately after reset)**

**Season-End Reward Packs (by MMR bracket):**

| Final MMR | Bracket | Base Pack | Card Range |
|-----------|---------|-----------|------------|
| 0-999 | Bronze | 1× Starter Pack | 5 cards: Normal-Special |
| 1000-1499 | Silver | 1× Standard Pack | 5 cards: Special-Rare |
| 1500-1999 | Gold | 1× Premium Pack | 5 cards: Rare-Expert |
| 2000-2499 | Platinum | 2× Premium Pack | 10 cards: Rare-Expert |
| 2500+ | Diamond | 1× Elite Pack | 5 cards: Expert-Super |

**Playtime Bonus Packs:**

| Matches Played | Bonus Standard Packs |
|---------------|---------------------|
| 50 | +1 |
| 100 | +2 (cumulative: +3) |
| 200 | +3 (cumulative: +6) |
| 400+ | +5 (cumulative: +11) |

**Loyalty Multiplier (Seasons Completed):**

| Seasons | Multiplier | Effect |
|---------|-----------|--------|
| 1st season | 1.0× | Base rewards |
| 2nd season | 1.1× | 10% more cards in packs |
| 3rd season | 1.2× | 20% more cards in packs |
| 4th+ season | 1.3× | 30% more cards in packs (cap) |

**Phase 4: New Season Start**
- Fresh Nomination Pool with new featured cards
- New Season Pass activates (see §6.2)
- New ranked placement matches (10 games, higher volatility)
- Season-themed events begin
- New cosmetic collection available

### 3.4 Why This Reset Design Works

| Problem (Other Games) | Project F Solution |
|-----------------------|--------------------|
| **Goley: Permanent advantage** → Veterans had 3+ years of card accumulation | Max advantage is 3 months. Reset levels the field. |
| **FIFA Mobile: Punishing resets** → Progress wiped with minimal compensation | Generous reward packs scaled by BOTH rank AND playtime. |
| **FIFA Mobile: Whale advantage reset** → Whales just rebuy immediately | Whales face other whales via power matchmaking. Can't buy Nomination Tokens. |
| **eFootball: No reset = stagnation** → Economy inflates, new players can't catch up | Fresh economy every season. Natural join points. |
| **All games: Identity loss** → Emotional attachment destroyed | Names, faces, bios saved. Cosmetics persist. Only power resets. |

### 3.5 Mid-Season Economy Check

At week 6 (mid-season), the economy team reviews:

| Metric | Healthy Range | Action if Outside |
|--------|-------------|-------------------|
| **Average Squad OVR** | 68-75 | Adjust pack drop rates up/down |
| **Top 1% Squad OVR** | 82-88 | If too high, add competitive events with OVR caps |
| **F2P vs. Payer win rate** | 45-55% | If below 45% F2P, buff F2P sources |
| **Active trader count** | 20%+ of DAU | If low, add trade-incentive events |
| **Gem conversion rate** | 3-7% | If below 3%, review Gem value proposition |

---

## 4. Pack System

### 4.1 Pack Types

| Pack | Cost | Contents | Guaranteed | Source |
|------|------|----------|-----------|--------|
| **Starter Pack** | Free (reset reward) | 5 cards | Min 1 Special | Season start |
| **Standard Pack** | 1,000 Coins or 100 Gems | 5 cards + chance of ability | Min 1 Special | Shop, rewards |
| **Premium Pack** | 300 Gems | 5 cards + 1 ability | Min 1 Rare | Shop, milestones |
| **Elite Pack** | Not purchasable | 5 cards + 1 Gold ability | Min 1 Expert | Season rewards only |
| **Event Pack** | Event currency | 3-5 themed cards | Varies | During events |
| **Manager Pack** | 500 Coins | 1 manager card | — | Shop |
| **Ability Pack** | 150 Gems | 3 abilities | Min 1 Silver | Shop |

### 4.2 Drop Rates (All Published)

**Standard Pack (5 cards):**

| Tier | Per-Card Rate | Expected per 10 Packs (50 cards) |
|------|-------------|--------------------------------|
| Normal | 50% | 25 |
| Special | 30% | 15 |
| Rare | 15% | 7.5 |
| Expert | 4.5% | 2.25 |
| Super | 0.5% | 0.25 |

**Premium Pack (5 cards):**

| Tier | Per-Card Rate | Expected per 10 Packs (50 cards) |
|------|-------------|--------------------------------|
| Normal | 20% | 10 |
| Special | 35% | 17.5 |
| Rare | 30% | 15 |
| Expert | 12% | 6 |
| Super | 3% | 1.5 |

### 4.3 Pity System (Cross-Pack, Visible Counter)

| Guarantee | Threshold | Resets When |
|-----------|----------|-------------|
| Rare+ | 20 packs opened without Rare+ | Any Rare or higher pulled |
| Expert+ | 50 packs opened without Expert+ | Any Expert or higher pulled |
| Super | 150 packs opened without Super | Any Super pulled |

**Pity Counter Display:**
- Visible on the Pack Opening screen: "Rare guaranteed in X more packs"
- Counter carries across all pack types within a season
- Resets at seasonal reset (fresh economy)

### 4.4 Pack Opening UX

- Dramatic reveal animation with tier-specific effects (gold burst for Super, purple shimmer for Expert)
- Quick-open option: skip animations, see all cards at once
- "Share Pull" button: screenshot-ready card display for social media
- Pack history: view last 50 pack openings with full details
- Odds button: one-tap access to current drop rate table

### 4.5 Anti-Manipulation Safeguards

| Safeguard | Detail |
|-----------|--------|
| **No DDA/Dynamic Odds** | Drop rates are fixed and server-verified. No adjustment based on spending, time, or player behavior. |
| **Server-side RNG** | All randomization happens server-side with auditable seed logs |
| **Rate change announcements** | Any drop rate change announced 48 hours in advance |
| **Third-party audit ready** | Drop rate verification can be provided to regulators on request |
| **No time-limited probability boosts** | "2× Super rate!" events are NOT used — they create FOMO and train players to hoard |

---

## 5. Trade & Rental System

### 5.1 Trading System

**Established in GDD-02 §7.4, expanded here:**

**Trade Marketplace:**

| Feature | Detail |
|---------|--------|
| **Platform** | In-game Trade Board — no external marketplace |
| **Listing** | Player posts a card with desired return (card tier, position, or Coin amount) |
| **Matching** | Other players browse listings and propose counter-offers |
| **Confirmation** | Both parties review final trade details and confirm |
| **Execution** | Atomic swap — both cards/currencies transfer simultaneously |
| **History** | Full trade history for both parties |

**Trade Economy Controls:**

| Control | Purpose | Detail |
|---------|---------|--------|
| **Trade Tax** | Currency sink | 10% of Coin value in trade goes to system |
| **Daily Limit** | Anti-manipulation | Max 5 trades per day per account |
| **Level Gate** | Anti-bot | Account Level 10+ required |
| **Tier Restriction** | Balance | Can only trade within ±1 tier (Normal↔Special, Special↔Rare, etc.) |
| **Cooldown** | Anti-flip | Received cards have 24-hour trade cooldown |
| **Value Cap** | Anti-RMT | Max Coin balance in a single trade: 10,000 Coins |

### 5.2 Rental System

**Expanded from GDD-02 §7.4:**

| Parameter | Detail |
|-----------|--------|
| **Who Can Rent** | Any player Level 10+ |
| **What Can Be Rented** | Player cards and manager cards (not abilities or team cards) |
| **Duration Options** | 1 day, 3 days, 7 days |
| **Fee Range** | 50-5,000 Coins per day (set by lender) |
| **Rental Pool** | Lender lists card; system matches with renter requests |
| **Protections** | Rented cards cannot be merged, recycled, or traded |
| **XP** | Match XP on rented card goes to renter's account level (not the card) |
| **Auto-Return** | Automatic at duration end, no action needed |
| **Insurance** | If renter's account is banned, card returns immediately |

**Rental Economy Role:**
- Allows F2P to "try before you merge" — experience higher-tier cards without commitment
- Creates Coin income for card-rich players (incentivizes collection depth)
- Adds liquidity to the economy without inflating card supply
- Enables tournament preparation without permanent acquisition

### 5.3 Market Health Monitoring

| Metric | Healthy | Unhealthy | Response |
|--------|---------|-----------|----------|
| **Trade Volume** | 15-25% of DAU trading | <10% = too restricted; >40% = potential exploit | Adjust limits/fees |
| **Average Trade Value** | 500-3,000 Coins | >5,000 = whale manipulation | Review value cap |
| **Rental Utilization** | 5-15% of cards listed | <2% = not useful; >30% = replacing packs | Adjust fee range |
| **RMT Indicators** | 0% detected | Any detected | Ban + investigate |

---

## 6. Monetization Channels

### 6.1 Revenue Model Overview

| Channel | % of Target Revenue | P2W Impact |
|---------|-------------------|-----------|
| **Season Pass** | 35% | Acceleration only |
| **Cosmetics** | 30% | Zero |
| **Gem Purchases (Packs)** | 20% | Mild acceleration |
| **Rewarded Ads** | 15% | Zero |

**Reference:** [Battle Pass Design Guide](https://www.gamemakers.com/p/understanding-battle-pass-game-design) | [Evolution of Battle/Season Pass Systems](https://www.gamigion.com/the-evolution-of-battle-pass-event-pass-and-season-pass-systems/) | [Battle Passes - Deconstructor of Fun](https://www.deconstructoroffun.com/blog/2022/6/4/battle-passes-analysis)

### 6.2 Season Pass — The Primary Revenue Driver

**Three Tiers:**

| Tier | Cost | Target Player |
|------|------|---------------|
| **Free** | $0 | All players — ensures F2P engagement |
| **Premium** | 500 Gems (~$5) per season | Minnows — core paying audience |
| **Ultimate** | 1,200 Gems (~$12) per season | Dolphins — dedicated paying players |

**Season Pass Reward Track (30 levels, ~2 levels/week for active players):**

| Level | Free Tier | Premium Tier | Ultimate Tier |
|-------|-----------|-------------|---------------|
| 1 | 100 Coins | 200 Coins + 1 Standard Pack | 500 Coins + 1 Premium Pack |
| 5 | 1 Standard Pack | 1 Premium Pack + Kit Fragment | 1 Premium Pack + Full Kit |
| 10 | 500 Coins + 20 Gems | 1,000 Coins + 50 Gems + Celebration | All Premium + Exclusive Celebration |
| 15 | 1 Standard Pack + 1 Bronze Ability | 1 Premium Pack + 1 Silver Ability | All Premium + Exclusive Card Border |
| 20 | 1,000 Coins + 30 Gems | 2,000 Coins + 75 Gems + Stadium Theme | All Premium + Exclusive Stadium |
| 25 | 2 Standard Packs + 1 Nomination Token | 2 Premium Packs + 2 Nomination Tokens + Emote Set | All Premium + Exclusive Emote Set |
| 30 | 2,000 Coins + 50 Gems + Title | 5,000 Coins + 150 Gems + Exclusive Title + Card Skin | All Premium + Animated Card Skin + Profile Banner |

**Season Pass Design Rules:**
- Free tier MUST feel rewarding — never punish players for not paying
- Premium/Ultimate rewards are primarily cosmetic + acceleration (more Coins, Gems, Packs)
- No exclusive gameplay advantages (no Premium-only abilities, formations, or matchmaking perks)
- Players who purchase mid-season retroactively receive all earned tier rewards
- Season Pass auto-renews only if player opts in (no dark patterns)

### 6.3 Cosmetics — The Ethical Revenue Engine

**Cosmetic Categories:**

| Category | Price Range (Gems) | Examples | Release Cadence |
|----------|-------------------|---------|-----------------|
| **Kits** | 200-800 | Team uniforms, special edition designs | 2-3 new kits/month |
| **Celebrations** | 100-500 | Goal celebration animations | 1-2 new/month |
| **Stadium Themes** | 300-1,500 | Visual backdrops for home matches | 1 new/month |
| **Card Borders** | 150-600 | Decorative frames around cards | 2-3 new/month |
| **Card Skins** | 200-1,000 | Alternative card visual styles | 1-2 new/month |
| **Emotes** | 50-200 | Quick chat expressions during matches | 3-5 new/month |
| **Effect Trails** | 300-800 | Visual trails on player movement/shots | 1 new/month |
| **Profile Banners** | 100-400 | Profile page decorations | 2-3 new/month |
| **Boot Designs** | 150-500 | Unique boot visuals on chibi players | 1-2 new/month |

**Cosmetic Design Principles:**
- **Zero gameplay impact.** Cosmetics never affect stats, matchmaking, or competitive outcomes.
- **Visible in matches.** Players see their cosmetics during actual gameplay, not just menus.
- **Earnable alternatives.** Basic cosmetics available through gameplay; premium cosmetics are unique designs, not "better" versions.
- **No limited-time exclusivity pressure.** Cosmetics rotate out of the shop but return periodically. FOMO is minimized.
- **Player-created content (future).** Explore player-submitted kit designs with revenue sharing.

### 6.4 Gem Purchases (Pack Buying)

**Design Constraints:**
- Packs are the primary Gem sink beyond Season Pass and cosmetics
- All pack odds are published and visible before purchase
- Pity system provides guaranteed floor
- Standard Packs buyable with Coins (no Gem requirement for baseline progression)
- Premium Packs cost Gems but can also be earned through gameplay rewards

**Spending Profiles:**

| Player Type | Monthly Spend | What They Buy |
|------------|---------------|--------------|
| **F2P (70% of players)** | $0 | Coins from gameplay, free Season Pass, rewarded ads |
| **Minnow (15%)** | $5-15 | Premium Season Pass, occasional cosmetic |
| **Dolphin (10%)** | $15-50 | Ultimate Season Pass, cosmetics, Premium Packs |
| **Whale (5%)** | $50-200 | All of the above, more Premium Packs, cosmetic collections |

**Monthly Spending Cap (Soft):**
- After $100/month in Gem purchases, a "Spending Awareness" notification appears
- After $200/month, purchases require a 24-hour cooldown before processing
- This is both ethical design and regulatory future-proofing

### 6.5 Rewarded Ads

| Parameter | Detail |
|-----------|--------|
| **Type** | 30-second video ads |
| **Reward** | 30 Coins per view |
| **Daily Limit** | 5 ads per day (150 Coins/day) |
| **Placement** | Post-match "Bonus Reward" button (opt-in, never forced) |
| **Player Control** | Can be disabled entirely in Settings |
| **Monthly F2P Value** | ~4,500 Coins (~$4.50 equivalent) |

**Ad Design Rules:**
- NEVER interrupt gameplay with ads
- NEVER gate content behind ad viewing
- NEVER show ads to paying players (ad-free for any Season Pass purchaser)
- Ad rewards are a BONUS, not a replacement for gameplay rewards

### 6.6 Revenue Projections

**Based on Industry Benchmarks (2026):**

| Metric | Conservative | Target | Optimistic |
|--------|-------------|--------|-----------|
| **MAU** | 200K | 500K | 1M |
| **Payer Conversion** | 4% | 6% | 8% |
| **ARPPU** | $12/month | $18/month | $25/month |
| **Monthly Revenue** | $96K | $540K | $2M |
| **Annual Revenue** | $1.15M | $6.5M | $24M |

---

## 7. Sustainability & Economic Loop Analysis

### 7.1 Economic Flow Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                    ECONOMIC FLOW                            │
│                                                             │
│  REAL MONEY                                                 │
│      │                                                      │
│      ▼                                                      │
│  ┌──────┐    ┌──────┐    ┌──────┐    ┌──────────┐          │
│  │ GEMS │───▶│PACKS │───▶│CARDS │───▶│ GAMEPLAY │          │
│  └──────┘    └──────┘    └──────┘    └──────────┘          │
│      │                      │  ▲          │                 │
│      │                      │  │          ▼                 │
│      ▼                      │  │    ┌──────────┐           │
│  ┌──────────┐               │  └────│  COINS   │           │
│  │COSMETICS │               │       └──────────┘           │
│  │(no power)│               │            │                  │
│  └──────────┘               ▼            ▼                  │
│                         ┌──────┐   ┌──────────┐            │
│                         │MERGE │   │  RECYCLE  │            │
│                         │(-1)  │   │ (destroy) │            │
│                         └──────┘   └──────────┘            │
│                              │                              │
│                              ▼                              │
│                    ┌──────────────────┐                     │
│                    │ SEASONAL RESET   │                     │
│                    │ (full card wipe) │                     │
│                    └──────────────────┘                     │
│                              │                              │
│                              ▼                              │
│                    ┌──────────────────┐                     │
│                    │  REWARD PACKS    │                     │
│                    │ (MMR + playtime) │                     │
│                    └──────────────────┘                     │
│                              │                              │
│                              ▼                              │
│                         NEW SEASON                          │
│                        (cycle repeats)                      │
└─────────────────────────────────────────────────────────────┘
```

### 7.2 Sink-Faucet Balance by Currency

**Coins:**

| Faucets (In) | Weekly | Sinks (Out) | Weekly |
|-------------|--------|-------------|--------|
| Match rewards | 1,200 | Card leveling | 1,500 |
| Daily/Weekly quests | 2,075 | Merge fees | 800 |
| Card recycling | 500 | Trade tax | 500 |
| Event rewards | 400 | Workshop items | 300 |
| Rewarded ads | 1,050 | Formation trials | 100 |
| Ranked milestones | 300 | | |
| **Total In** | **5,525** | **Total Out** | **3,200** |
| **Net** | **+2,325/week** | | |

Healthy surplus: players accumulate slowly, maintaining purchasing power without hyperinflation. Seasonal reset of card-related expenses ensures sinks restart each season.

**Gems:**

| Faucets (In) | Monthly | Sinks (Out) | Monthly |
|-------------|---------|-------------|---------|
| Season Pass (free) | 50 | Season Pass (premium) | 500/season (~167) |
| Achievements | 20-100 | Premium Packs | 300 each |
| Ranked milestones | 50 | Cosmetics | 100-1,500 each |
| Weekly challenges | 60 | Tournament entries | 50 each |
| Events | 30 | Quick merge | 20 each |
| **Total F2P In** | **~250** | **Desired Drain** | **300-500** |

Gems are intentionally slightly deficit for F2P — this creates the conversion pressure that drives IAP revenue. However, the deficit is small enough that F2P players can still access Premium Season Pass every other season through saved Gems.

### 7.3 Whale vs. Dolphin vs. F2P Experience

| Dimension | F2P | Minnow ($5-15/mo) | Dolphin ($15-50/mo) | Whale ($50-200/mo) |
|-----------|-----|------|---------|-------|
| **Squad OVR (Week 4)** | 65-72 | 68-75 | 72-80 | 78-88 |
| **Squad OVR (Week 12)** | 78-85 | 80-87 | 83-90 | 87-93 |
| **Matchmaking** | Faces similar OVR | Faces similar OVR | Faces similar OVR | Faces other whales |
| **Win Rate** | ~50% | ~50% | ~50% | ~50% |
| **Cosmetics** | Basic | Premium Pass items | Exclusive collection | Full collection |
| **Progression Speed** | 1× | 1.3× | 1.6× | 2× |
| **Competitive Viability** | Yes (with skill) | Yes | Yes | Yes (against other whales) |

> **The critical insight:** Win rate is approximately 50% for ALL spending tiers because matchmaking adjusts. The whale's advantage is not "winning more" — it's "progressing faster and having more cosmetics." This is the DLS/eFootball model that sustains trust.

### 7.4 Long-Term Engagement Mechanics

| Mechanic | Retention Target | How |
|----------|-----------------|-----|
| **Seasonal Reset** | D90+ | Fresh start every 3 months keeps the game from going stale |
| **Collection Album** | D30-D180 | Long-term goals beyond competitive ranking |
| **Card Customization** | Emotional investment | Named, faced, bio'd cards create attachment |
| **League System** | Social retention | Social bonds are the #1 D30+ retention driver |
| **Tournament Circuit** | Competitive retention | Weekly/seasonal aspirational goals |
| **Boss Events** | Event retention | Co-op PvE content every 2-3 weeks |
| **Season Pass** | Daily engagement | 30 levels require consistent play, not binge |
| **Achievement System** | Mastery retention | Hundreds of achievements across all game systems |

### 7.5 Anti-Inflation Design

| Risk | Mitigation |
|------|-----------|
| **Too many Coins in economy** | Trade tax (10%), merge fees, seasonal reset of merge fees |
| **Too many cards** | Merge (net -1), recycling, seasonal full reset |
| **Power creep within season** | No new tiers mid-season, nominations rotate sidegrades |
| **Power creep across seasons** | Full card reset. New season = fresh economy. |
| **Gem devaluation** | Gem supply tightly controlled; cosmetic sinks expand regularly |
| **RMT threat** | Coin-only trading, value caps, daily limits, no external marketplace |

### 7.6 Ethical Monetization Commitments

| Commitment | Detail |
|-----------|--------|
| **No loot boxes with hidden odds** | All probabilities published |
| **No pay-to-maintain** | Cards don't degrade without spending (unlike Top Eleven) |
| **No predatory FOMO** | Cosmetics rotate but return; no "now or never" pressure |
| **No manipulated matchmaking** | Team power matching is consistent, never adjusted to drive spending |
| **No DDA/scripting** | Match outcomes are determined by player actions and stats, never server-side manipulation |
| **Spending awareness** | Notifications at $100/month; cooldown at $200/month |
| **Minors protection** | Parental controls for IAP; age verification for trading |
| **Regulatory compliance** | Drop rates published; prepared for loot box legislation |

### 7.7 Sustainability Scorecard

| Factor | Score | Rationale |
|--------|-------|-----------|
| **Revenue Diversity** | 9/10 | Four channels (Pass, Cosmetics, Gems, Ads) — no single-source dependency |
| **F2P Viability** | 9/10 | F2P competitive at all ranks with skill; Nomination system provides deterministic path |
| **Whale Health** | 8/10 | Whales have meaningful spending options but can't "break" the game |
| **New Player Entry** | 9/10 | Seasonal reset creates natural join points with level playing field |
| **Economic Stability** | 8/10 | Multiple sinks, seasonal reset, anti-inflation measures |
| **Regulatory Readiness** | 10/10 | Published odds, spending caps, no dark patterns |
| **Content Renewal** | 8/10 | Seasonal themes, events, cosmetic pipeline, Boss Matches |
| **Overall** | **8.7/10** | Strong sustainable foundation — significant improvement over all analyzed competitors |

---

## Appendix: Competitor Cross-Reference

| GDD Decision | Competitor Learning | Source |
|-------------|-------------------|--------|
| 70:30 Skill:Wallet ratio | DLS/eFootball zone is most sustainable | GDD-00 §10.3 |
| Team power matchmaking | Goley matched whales vs. F2P → exodus | GDD-00 §2.5 |
| Published drop rates | Goley predatory; Belgium/Korea regulations | GDD-00 §2.4, §4.3 |
| Seasonal reset with rewards | eFootball no-reset + FIFA Mobile 2025 pivot hybrid | GDD-00 §3.6, §5.6 |
| No energy system | Score! Match energy limits F2P play | GDD-00 §6.4 |
| Cosmetic-heavy revenue | Fortnite model proves cosmetics sustain F2P games | Industry standard |
| Spending caps/awareness | Regulatory trend + ethical design | GDD-00 §4.3 |
| No DDA/scripted outcomes | FC Mobile/Score! Match DDA suspicion → trust erosion | GDD-00 §3.8, §6.5 |
| No pay-to-maintain | Top Eleven rest system → predatory | GDD-00 §7.4 |
| Nomination system (gameplay-only tokens) | eFootball Nominating Contracts model | GDD-00 §5.3 |

---

*This document defines the complete Game Economy & Monetization system for Project F. It is the most critical GDD — the economic foundation on which all other systems rest. Every decision here has been tested against the Ten Commandments from the Competitor Analysis.*

*Document prepared by: Game Designer Agent, YG Games*
*Date: March 17, 2026*
