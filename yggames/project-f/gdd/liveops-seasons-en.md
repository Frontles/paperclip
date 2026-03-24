# GDD-08: LiveOps & Seasons

**Document Code:** GDD-08
**Version:** 1.0
**Date:** March 17, 2026
**Author:** Game Designer Agent, YG Games
**Status:** Draft
**Related Documents:** [GDD-00: Competitor Analysis](docs/00-competitor-analysis-en.md) | [GDD-01: Core Game Design](core-game-design-en.md) | [GDD-02: Card Collection System](card-collection-system-en.md) | [GDD-03: Game Economy & Monetization](game-economy-monetization-en.md) | [GDD-04: Competitive & Progression](competitive-progression-en.md) | [GDD-07: Special Abilities & GGO System](special-abilities-ggo-en.md)

---

## Table of Contents

1. [LiveOps Philosophy](#1-liveops-philosophy)
2. [Season Cycle](#2-season-cycle)
3. [End-of-Season Reset & Renewal](#3-end-of-season-reset--renewal)
4. [Events System](#4-events-system)
5. [Retention Mechanics](#5-retention-mechanics)
6. [Community Management](#6-community-management)
7. [Content Calendar Template](#7-content-calendar-template)
8. [Long-Term Sustainability Plan](#8-long-term-sustainability-plan)
9. [Operational Requirements](#9-operational-requirements)
10. [P2W & Sustainability Evaluation](#10-pw--sustainability-evaluation)

---

## 1. LiveOps Philosophy

### 1.1 Core Principles

| Principle | Description |
|-----------|-------------|
| **Retention > Acquisition** | Design for players who stay, not just new downloads. A player retained is worth 5× a player acquired. |
| **Reset = Renewal, Not Punishment** | Seasonal resets must feel like exciting new possibilities, never lost investment. |
| **Promise Only What You Can Deliver** | A small team must scope LiveOps to sustainable cadence. Under-promise, over-deliver. |
| **Evolution, Not Revolution** | Build on what players love. Never replace working systems entirely. Iterate. |
| **Respect Player Time** | Every hour invested earns tangible progress. Time-gating should create anticipation, not frustration. |
| **Transparency** | Patch notes, drop rates, upcoming changes — always communicate openly. |

### 1.2 Competitor LiveOps Lessons

| Competitor | LiveOps Approach | Result | Our Lesson |
|-----------|-----------------|--------|-----------|
| **Goley** | Minimal LiveOps, reactive patches | Slow content drought → player exodus | Consistent cadence, proactive content |
| **FIFA Mobile** | Annual full reset (2017-2023), reversed in 2024 | Reset backlash → finally abolished resets | Soft reset with protection, never full wipe |
| **FC Mobile** | Heavy event rotation, Battle Pass | High revenue but P2W fatigue | Events reward gameplay, not wallet |
| **eFootball** | No resets ever, slow content updates | Good retention but engagement dips between updates | Regular small updates > rare big ones |
| **DLS** | Minimal LiveOps, static seasons | Loyal but unexcited player base | Seasons add excitement without disruption |

**Reference:**
- FIFA Mobile Reset Reversal: [EA FC Mobile No Reset Announcement](https://www.facebook.com/EASFCMobile/posts/there-will-be-no-season-reset-in-2025-continue-to-build-your-team-in-fcmobile-wi/1025404543094886/)
- LiveOps 2026 Trends: [PocketGamer LiveOps Trends](https://www.pocketgamer.biz/2026-live-ops-trends-templatisation-personalisation-and-ai/)

---

## 2. Season Cycle

### 2.1 Season Duration & Phases

**Season Length:** 90 days (3 months)
**Seasons Per Year:** 4

| Phase | Duration | Dates (Example Y1) | Purpose |
|-------|----------|-------------------|---------|
| **Pre-Season** | 7 days | Days 1-7 | Hype, patch notes, new cards/abilities revealed |
| **Early Season** | 28 days | Days 8-35 | Ranked placement, new content discovery, initial climbing |
| **Mid-Season** | 28 days | Days 36-63 | Mid-season event, balance patch, competitive peak |
| **Late Season** | 21 days | Days 64-84 | Final push for ranks, season rewards preview, end-game events |
| **Off-Season** | 6 days | Days 85-90 | Season end rewards, transition period, maintenance, preparation |

### 2.2 Season Naming & Theming

Each season has a unique theme that influences:
- Event aesthetics and narratives
- Cosmetic item themes (celebrations, trails, stadium items)
- New card art variants
- Background music and UI accents

**Example Season Themes:**

| Season | Theme | Visual Mood | Special Content |
|--------|-------|-------------|-----------------|
| **Y1 S1** | "Kickoff" | Fresh green, dawn colors | Launch content, tutorial completion events |
| **Y1 S2** | "Summer Heat" | Hot orange, beach vibes | Beach stadiums, summer kit cosmetics |
| **Y1 S3** | "Champions Rise" | Royal gold, stadium lights | Tournament event, champion celebrations |
| **Y1 S4** | "Winter Storm" | Ice blue, snow effects | Snow pitch, winter themed abilities VFX |

### 2.3 What Carries Over Between Seasons

| Element | Carries Over? | Notes |
|---------|-------------|-------|
| **Account Level** | ✅ Yes | Permanent |
| **Coins (currency)** | ✅ Yes | Full carryover |
| **Gems (premium)** | ✅ Yes | Full carryover |
| **Abilities** | ✅ Yes | Permanently unlocked |
| **Cosmetics** | ✅ Yes | All owned cosmetics persist |
| **Achievements** | ✅ Yes | Permanent |
| **Friends/Club** | ✅ Yes | Social connections persist |
| **Player Cards** | ⚠️ Partial | See Reset system (Section 3) |
| **MMR/Rank** | ⚠️ Soft Reset | See Reset formula (Section 3) |
| **Season Pass** | ❌ New | Fresh pass each season |
| **Event Progress** | ❌ Resets | Events are per-season |
| **Daily/Weekly Missions** | ❌ Resets | Fresh each period |

---

## 3. End-of-Season Reset & Renewal

### 3.1 Reset Philosophy

> **"Seasons should feel like a new chapter of an ongoing story, not a book that gets burned."**

We take the middle path between FIFA Mobile's controversial full reset (which they eventually abandoned) and eFootball's no-reset stagnation. Our soft reset system protects investment while creating fresh competitive cycles.

### 3.2 Card Reset Flow (4 Phases)

**Phase 1: Pre-Announcement (Day 75)**
- Banner: "Season ending in 15 days!"
- Season rewards preview based on current rank
- "Collection snapshot" saved for transition calculation

**Phase 2: Season End Calculation (Day 90)**
- All cards evaluated for protection
- Reward packs generated based on final MMR/rank
- Loyalty multiplier applied

**Phase 3: Transition (Off-Season Day 1-3)**
- Protected cards remain in collection (see Protection Rules below)
- Unprotected cards converted to "Legacy Coins" (special currency)
- Season End Reward Packs delivered to inbox
- New season starter pack delivered

**Phase 4: New Season Launch (Off-Season Day 4-6)**
- Fresh ranked placements begin
- New Season Pass activates
- New cards and events go live
- Legacy Coins spendable in Legacy Shop

### 3.3 Card Protection Rules

| Card Attribute | Protection Rule |
|---------------|----------------|
| **Normal tier** | NOT protected (converted to Legacy Coins) |
| **Rare tier** | 50% of Rare cards protected (player chooses which) |
| **Epic tier** | 100% protected |
| **Super tier** | 100% protected |
| **Legend tier** | Converts to Super (Legend is seasonal-only per [GDD-02](card-collection-system-en.md)) |
| **"Favorite" tagged** | Always protected regardless of tier (up to 6 favorites) |
| **Active Squad** | Always protected (all 6 cards + manager + team card) |
| **Custom-named cards** | Priority protection (players invested identity) |

**Net Effect:** Players keep their core squad + Epic+ cards. Normal cards rotate out, creating demand for new packs without devastating collections.

### 3.4 Season End Reward Packs

Based on final ranked tier (per [GDD-04](competitive-progression-en.md)):

| Final Rank | Reward Pack Contents | Bonus |
|-----------|---------------------|-------|
| **Bronze** | 5 cards (3N, 2R) + 2,000 Coins | — |
| **Silver** | 8 cards (3N, 3R, 2E) + 5,000 Coins | +1 Ability Pack |
| **Gold** | 10 cards (2N, 4R, 3E, 1S) + 10,000 Coins | +1 Ability Pack + 1 Cosmetic |
| **Platinum** | 12 cards (4R, 5E, 2S, 1 choice) + 20,000 Coins | +2 Ability Packs + Season Title |
| **Diamond** | 15 cards (5R, 6E, 3S, 1 choice) + 50,000 Coins + 💎 200 | +3 Ability Packs + Exclusive Cosmetic |

**Loyalty Multiplier:** +10% bonus cards per consecutive season played (max +50% at Season 6+)

### 3.5 Legacy Coin System

Cards that aren't protected convert to Legacy Coins:

| Card Tier | Legacy Coin Value |
|-----------|------------------|
| Normal | 10 LC |
| Rare | 50 LC |
| Epic | 200 LC |
| Super | 500 LC |

**Legacy Shop Items:**

| Item | Cost | Purpose |
|------|------|---------|
| Random Rare Card | 100 LC | Rebuild collection |
| Random Epic Card | 400 LC | Targeted rebuilding |
| Ability Pack | 300 LC | Expand ability collection |
| Cosmetic Pack | 200 LC | Cosmetic items |
| Legacy Card Frame | 500 LC | Exclusive "veteran" visual |
| Legacy Title | 1,000 LC | "Season X Veteran" title |

### 3.6 Communication Strategy

| Timing | Communication | Channel |
|--------|--------------|---------|
| **30 days before** | Season ending teaser, new season theme reveal | In-game banner, social media |
| **14 days before** | Detailed reset FAQ, protection rules reminder | In-game news, push notification |
| **7 days before** | "Tag your favorites!" reminder, rank push encouragement | In-game tooltip, push notification |
| **3 days before** | Final reward preview based on current standing | In-game modal |
| **Season end** | "Thank you for Season X!" summary with personal stats | In-game cinematic |
| **New season launch** | Welcome message, what's new guide, starter pack | In-game FTUE-lite flow |

---

## 4. Events System

### 4.1 Event Framework

Events operate on three concurrent timescales:

| Timescale | Type | Duration | Frequency | Team Effort |
|-----------|------|----------|-----------|-------------|
| **Short-term** | Daily Challenges, Flash Events | 1-3 days | Continuous (always active) | Low (templated) |
| **Mid-term** | Weekly Tournaments, Themed Events | 7-14 days | 2-3 per month | Medium |
| **Long-term** | Season Events, World Events | 30-60 days | 1-2 per season | High |

### 4.2 Event Types

**A. Daily Challenges (Always Active)**

| Challenge | Reward | Reset |
|-----------|--------|-------|
| "Play 3 matches" | 🪙 300 Coins | Daily |
| "Score 5 goals" | 🪙 200 Coins + ⭐ 50 XP | Daily |
| "Win 1 ranked match" | 💎 10 Gems | Daily |
| "Use a special ability" | ⭐ 100 XP | Daily |
| "Complete all daily challenges" | 📦 Basic Pack | Daily |

**B. Weekly Tournaments**

| Format | Description | Duration | Entry | Rewards |
|--------|-------------|----------|-------|---------|
| **Weekend Cup** | 8-player single elimination bracket | Fri-Sun | Free (1 entry) | Top 3 get packs + coins |
| **Power Play** | Best of 3, all teams equalized to power 1000 | Sat-Sun | Free | Tests pure skill — cosmetic rewards |
| **Ability Showdown** | Theme: only 1 specific ability element allowed | Rotating | Free | Element-themed cosmetics |

**C. Themed Events (Mid-Term)**

| Event Type | Description | Duration | Example |
|-----------|-------------|----------|---------|
| **League Event** | Mimic real-world league format | 10-14 days | "Champions League" style knockout |
| **Challenge Path** | Linear progression of AI challenges | 7 days | "Road to Glory" — beat 10 teams with escalating difficulty |
| **Collection Event** | Earn special tokens through play, exchange for themed rewards | 14 days | "World Cup Stars" — collect flag tokens for national team cards |
| **Community Goal** | Server-wide collective target | 7-14 days | "Score 1,000,000 goals as a community for universal reward" |

**D. Season Events (Long-Term)**

| Event | Description | Duration | Unique Reward |
|-------|-------------|----------|---------------|
| **Season Championship** | Top 128 players compete in bracketed tournament | Last 2 weeks of season | Exclusive celebration + card frame |
| **Season Story** | Narrative-driven challenges unlocking over the season | Full season | Story-themed cosmetics + abilities VFX |

### 4.3 Event Reward Principles

| Principle | Implementation |
|-----------|---------------|
| **Participation ≠ Grind** | All events completable with 30-60 min/day of play |
| **No P2W Events** | Event rewards are cosmetics, packs, coins — never exclusive power cards |
| **Catch-Up Friendly** | Mid-season joiners can still earn 60%+ of event rewards |
| **No FOMO** | Major cosmetics return after 2 seasons; nothing permanently exclusive except titles |
| **Fair Entry** | 90% of events are free entry; premium events offer cosmetic-only advantages |

---

## 5. Retention Mechanics

### 5.1 Daily Engagement Loop

```
Login → Daily Gift → Check Missions → Play 2-3 Matches
→ Complete Daily Challenges → Claim Rewards → Check Free Pack Timer
→ Browse Daily Deals → Logout
```

**Target Daily Session:** 20-30 minutes
**Target Sessions/Day:** 2-3 (morning, commute, evening)

### 5.2 Login & Streak System

**Daily Login Calendar (30-day cycle, repeating):**

| Day | Reward |
|-----|--------|
| 1 | 🪙 200 Coins |
| 2 | ⭐ 100 XP |
| 3 | 📦 Basic Pack |
| 4 | 🪙 300 Coins |
| 5 | 💎 5 Gems |
| 6 | ⭐ 150 XP |
| 7 | 📦 Premium Pack Fragment (1/3) |
| 14 | 📦 Premium Pack Fragment (2/3) |
| 21 | 📦 Premium Pack Fragment (3/3) → Complete Premium Pack |
| 28 | 💎 30 Gems + 🪙 5,000 Coins |
| 30 | 📦 Epic Guaranteed Pack |

**Streak Multiplier:**
- 3-day streak: +10% coin rewards from matches
- 7-day streak: +20% coin rewards + 💎 5 Gems bonus
- 14-day streak: +30% coin rewards + ability charge speed +5% (in-match)
- 30-day streak: +50% coin rewards + exclusive "Dedicated" monthly cosmetic

**Streak Protection:**
- Miss 1 day: streak paused (not reset) for 24 hours
- Miss 2+ days: streak resets
- "Streak Shield" item (earned monthly from Season Pass): prevents 1 streak reset

### 5.3 Comeback Mechanics

For players who return after absence:

| Absence Duration | Comeback Package | Purpose |
|-----------------|-----------------|---------|
| **3-7 days** | 📦 Welcome Back Pack (3 Rare cards) + double daily rewards for 3 days | Mild incentive to return |
| **7-30 days** | 📦 Comeback Pack (5 cards, 1 Epic guaranteed) + 50% XP boost for 7 days | Catch-up assistance |
| **30-90 days** | 📦 Major Comeback Pack (8 cards, 2 Epic) + fresh MMR placement + 💎 50 Gems | Major catch-up, feels like "fresh start" |
| **90+ days** | Full new-player-like onboarding + enhanced starter pack + "Veteran Return" title | Re-onboard without losing account |

### 5.4 Social Retention Hooks

| Hook | Mechanic | Retention Impact |
|------|----------|-----------------|
| **Daily Friend Match** | 1 free friendly match/day with bonus rewards | Maintains social connections |
| **Club Contributions** | Weekly club goals with shared rewards | Group accountability |
| **Gifting** | Send 1 free gift/day to a friend (small coins/XP) | Daily social touchpoint |
| **Rivalry System** | Repeat opponents become "rivals" — rematch notifications | Creates personal stakes |
| **Spectator Mode** | Watch friends' ranked matches live | Engagement without playing |

### 5.5 Progression Cadence

| Milestone | Expected Timeframe | Reward |
|-----------|-------------------|--------|
| **First Ranked Win** | Day 1-2 | Achievement + pack |
| **Bronze Tier** | Week 1 | Celebration unlock |
| **Silver Tier** | Week 2-3 | Stadium tier 3 |
| **Full Squad (6 Epic+ cards)** | Month 1-2 | Collection milestone reward |
| **Gold Tier** | Month 1-2 | Stadium tier 4 + season reward preview |
| **Complete Ability Set** | Month 3-6 | "Ability Master" title |
| **Platinum/Diamond** | Season end | Top-tier season rewards |

---

## 6. Community Management

### 6.1 Communication Channels

| Channel | Frequency | Content |
|---------|-----------|---------|
| **In-Game News** | 2-3×/week | Patch notes, event announcements, maintenance notices |
| **Social Media (Twitter/X, Instagram)** | Daily | Community highlights, dev updates, memes, polls |
| **Discord** | Always active | Bug reports, feedback, community events, dev AMAs |
| **YouTube** | Bi-weekly | Dev diaries, balance change explanations, season previews |
| **Blog/Website** | Monthly | Deep dives, roadmap updates, community spotlights |

### 6.2 Patch Communication

| Patch Type | Notice Period | Communication |
|-----------|---------------|-------------|
| **Hotfix** | Immediate | In-game toast + social media |
| **Balance Patch** | 3 days | Detailed patch notes with reasoning |
| **Content Update** | 7 days | Preview post + in-game countdown |
| **Season Update** | 14 days | Full preview campaign, social media buildup |

**Patch Note Format:**
```
## Patch X.Y.Z — [Date]

### Balance Changes
- [Ability Name]: [Change description]. **Why:** [Reasoning from data]

### Bug Fixes
- Fixed [issue] that caused [problem]

### New Content
- [New item/event/feature description]

### Known Issues
- [Acknowledged issues being worked on]
```

### 6.3 Feedback Loops

| Loop | Mechanism | Response Time |
|------|-----------|--------------|
| **Bug Reports** | In-game report button + Discord #bugs | Acknowledge within 24h |
| **Balance Feedback** | Monthly community survey + Discord #feedback | Address in next balance patch |
| **Feature Requests** | Quarterly roadmap vote (top 5 community requests) | Roadmap update within 30 days |
| **Satisfaction** | In-game NPS survey after every 20 matches | Quarterly analysis |

### 6.4 Community Events

| Event | Frequency | Description |
|-------|-----------|-------------|
| **Dev AMA** | Monthly | Live Q&A on Discord with game designers |
| **Community Tournament** | Bi-monthly | Player-organized (dev-supported) tournaments with in-game prizes |
| **Creator Spotlight** | Weekly | Feature community content creators |
| **Design Challenge** | Quarterly | Community votes on next cosmetic/celebration theme |

---

## 7. Content Calendar Template

### 7.1 Sample 3-Month Season Plan

**Season: "Champions Rise" (Y1 S3)**

#### Month 1 (Days 1-30)

| Week | Events | Content Updates | Communication |
|------|--------|----------------|---------------|
| **Week 1** | Season Launch, Placement Matches | New Season Pass, 2 new abilities, 4 new celebrations | Season trailer, patch notes, social media blitz |
| **Week 2** | "Road to Glory" Challenge Path | Daily challenges active | Mid-week tip: formation strategies |
| **Week 3** | Weekend Cup #1, Collection Event start | Balance Patch 1 (data from week 1-2) | Patch notes, balance rationale blog |
| **Week 4** | Weekend Cup #2, Flash Event | Community Goal: "1M Goals" | Community Goal tracker, social media countdown |

#### Month 2 (Days 31-60)

| Week | Events | Content Updates | Communication |
|------|--------|----------------|---------------|
| **Week 5** | Mid-Season Event launch (League Event) | 2 new cosmetics in shop | Mid-season review blog, stats infographic |
| **Week 6** | League Event continues, Weekend Cup #3 | Season Pass mid-point rewards | Dev AMA, balance feedback survey |
| **Week 7** | League Event finals, Ability Showdown | Balance Patch 2 | Patch notes, tournament results |
| **Week 8** | Community Tournament, Flash Event | New daily deal rotation | Community tournament stream |

#### Month 3 (Days 61-90)

| Week | Events | Content Updates | Communication |
|------|--------|----------------|---------------|
| **Week 9** | Season Championship qualifiers start | "Final Push" bonus XP event | "Push for your rank!" campaign |
| **Week 10** | Season Championship bracket, Collection Event | Next season teaser | Next season reveal trailer |
| **Week 11** | Season Championship finals, Last chance rank push | Season rewards preview | Detailed reset FAQ, protection guide |
| **Week 12** | Off-Season transition | Season End Rewards delivered, new season prep | "Thank you" message, stats recap, new season countdown |

### 7.2 Weekly Cadence Template

| Day | Activity |
|-----|----------|
| **Monday** | New weekly challenges activate, weekly tournament results |
| **Tuesday** | Content update day (if scheduled), patch deployment |
| **Wednesday** | Mid-week event or flash challenge |
| **Thursday** | Social media community highlight, dev tip |
| **Friday** | Weekend event launches (Weekend Cup, special events) |
| **Saturday-Sunday** | Weekend events active, community engagement peak |

### 7.3 Production Requirements Per Season

| Content Type | Quantity | Team Effort |
|-------------|----------|-------------|
| **New Abilities** | 2-4 | Design: 2 weeks, Art: 2 weeks, QA: 1 week |
| **New Celebrations** | 4-6 | Art: 3 weeks, Animation: 2 weeks |
| **New Cosmetics** | 8-12 items | Art: 2 weeks per batch |
| **Events** | 8-12 events | Design: 1 week per event (templated) |
| **Balance Patches** | 2-3 | Design: 3 days, QA: 2 days |
| **Season Pass Content** | 50 tiers | Design: 1 week, Art: 2 weeks |
| **Communications** | ~30 posts/month | Community manager: ongoing |

---

## 8. Long-Term Sustainability Plan

### 8.1 Year 1: Foundation

| Quarter | Focus | Key Milestones |
|---------|-------|---------------|
| **Q1 (Launch)** | Stable launch, FTUE optimization, core loop polish | 100K downloads, 40% D7 retention |
| **Q2** | First full season cycle, event system proven | Season 2 transition smooth, 30% D30 retention |
| **Q3** | Club system launch, social features expansion | Active clubs, friend referral system |
| **Q4** | First annual event (Anniversary), competitive scene | Community tournament infrastructure, 20% D90 retention |

### 8.2 Year 2: Growth

| Quarter | Focus | Key Features |
|---------|-------|-------------|
| **Q1** | Custom match modes (2v2, 3v3 variants) | New match formats using same 6v6 engine |
| **Q2** | Regional championships, localization expansion | Esports-lite, 5+ language support |
| **Q3** | Card trading 2.0 (enhanced market features) | Auction system, card collections bonuses |
| **Q4** | Stadium builder (custom stadium creation) | Player-created stadiums, shared community |

### 8.3 Year 3+: Maturity

| Quarter | Focus | Vision |
|---------|-------|--------|
| **Y3 Q1** | Cross-platform expansion | Tablet-optimized UI, potential PC client |
| **Y3 Q2** | Advanced spectator/esports tools | Broadcast mode, tournament organizer tools |
| **Y3 Q3** | Community-created content | Custom celebration creator, kit designer |
| **Y3 Q4** | Franchise expansion | Project F brand → merchandise, community IPs |

### 8.4 Meta Evolution Strategy

| Season | Meta Focus | How |
|--------|-----------|-----|
| **S1-S2** | Foundational meta — players learn abilities | Balanced starting set, gentle balance nudges |
| **S3-S4** | Expanding meta — new abilities shift strategies | 4-8 new abilities, counter-play evolution |
| **S5-S8** | Maturing meta — depth through combinations | Ability synergy discoveries, formation meta shifts |
| **S9+** | Rotating meta — seasonal ability emphasis | "Ability spotlight" events, temporary boosts to underused abilities |

### 8.5 Feature Pipeline Priority

| Priority | Feature | Target Season |
|----------|---------|--------------|
| **Must** | Season cycle, events, Season Pass, daily loop | S1 (Launch) |
| **Must** | Balance patches, community channels | S1 (Launch) |
| **Should** | Club system, enhanced social | S2 |
| **Should** | Community tournaments, spectator mode | S3 |
| **Could** | Custom match modes, stadium builder | S4-S6 |
| **Could** | Cross-platform, esports tools | S8+ |

---

## 9. Operational Requirements

### 9.1 Team Requirements

| Role | Count | Responsibility |
|------|-------|---------------|
| **LiveOps Manager** | 1 | Season planning, event scheduling, KPI tracking |
| **Game Designer** | 1-2 | Balance, new abilities, event design |
| **Content Artist** | 1-2 | Cosmetics, card art, UI assets |
| **Animator** | 1 | Celebrations, ability VFX |
| **Community Manager** | 1 | Social media, Discord, feedback collection |
| **QA** | 1-2 | Patch testing, event validation |
| **Backend Engineer** | 1 | Server events, data pipeline, matchmaking |
| **TOTAL** | 7-10 | Sustainable for indie/small studio |

### 9.2 Key Performance Indicators (KPIs)

| KPI | Target Y1 | Measurement |
|-----|-----------|-------------|
| **D1 Retention** | 50% | % of installers who play Day 2 |
| **D7 Retention** | 30% | % of D1 players who return Day 7 |
| **D30 Retention** | 15% | % of D1 players who return Day 30 |
| **Daily Active Users (DAU)** | 50K by Y1 end | Unique daily players |
| **Monthly Active Users (MAU)** | 200K by Y1 end | Unique monthly players |
| **DAU/MAU Ratio** | ≥ 25% | "Stickiness" — healthy is 20-30% |
| **Average Session Length** | 15-25 min | Time per session |
| **Sessions Per Day** | 2-3 | Daily engagement depth |
| **ARPDAU** | $0.05-0.15 | Revenue per daily active user |
| **Season Completion Rate** | ≥ 60% reach tier 25+ | Season Pass engagement |
| **Event Participation** | ≥ 70% of DAU | Event relevance |
| **NPS Score** | ≥ 30 | Player satisfaction |

### 9.3 Downtime & Maintenance

| Type | Frequency | Duration | Notice |
|------|-----------|----------|--------|
| **Rolling Update** | Weekly | 0 downtime | In-game banner |
| **Scheduled Maintenance** | Bi-weekly | 1-2 hours (off-peak) | 48h notice |
| **Season Transition** | Quarterly | 4-6 hours | 7 day notice |
| **Emergency Maintenance** | As needed | Varies | Immediate notification |

---

## 10. P2W & Sustainability Evaluation

### 10.1 LiveOps P2W Risk Assessment

| Element | Risk | Mitigation |
|---------|------|-----------|
| **Season Pass** | LOW | Free track provides competitive value; premium is 60% cosmetic |
| **Event rewards** | NONE | Events give packs/cosmetics, never exclusive power advantages |
| **Reset compensation** | LOW | Reset protects invested cards (Epic+ always safe); no pay-to-protect |
| **Comeback packs** | NONE | Given to ALL returning players equally |
| **Daily deals** | LOW | Mostly coin-priced; gem deals are never must-have |
| **Streak rewards** | NONE | Purely additive bonuses for engagement |
| **Time-limited content** | LOW | Cosmetics return after 2 seasons; no permanent exclusivity |

### 10.2 Sustainability Scorecard

| Factor | Score | Reasoning |
|--------|-------|-----------|
| **Content Cadence Realism** | 9/10 | Templated events, 7-10 person team, achievable production schedule |
| **Retention Depth** | 9/10 | Daily/weekly/monthly/seasonal loops create multiple engagement layers |
| **Reset Fairness** | 8/10 | Soft reset protects investment while creating fresh competition |
| **Revenue Sustainability** | 8/10 | Season Pass + cosmetics + packs provide diversified revenue streams |
| **Community Health** | 9/10 | Transparent communication, feedback loops, community events |
| **Team Burnout Prevention** | 8/10 | Realistic scope, templated events, no crunch-dependent schedule |
| **Long-term Vision** | 9/10 | 3-year roadmap with gradual expansion, not feature bloat |
| **Overall LiveOps Sustainability** | **8.7/10** | Well-scoped LiveOps designed for a small team's sustainable operation |

### 10.3 The "Would You Come Back?" Test

> After every design decision, ask: "If I were a player who spent 3 months building a team, would this make me want to come back next season?"

**Our answers:**
- Season reset protects my best cards ✅
- I get rewarded for my rank with great packs ✅
- My abilities and cosmetics carry over ✅
- New season brings exciting new content ✅
- My friends and club are still there ✅
- I can catch up if I fell behind ✅
- The game respects my time and money ✅

---

## Appendix A: Event Template Library

### A.1 Challenge Path Template

```
Event: [Name]
Duration: 7 days
Stages: 10
Difficulty: Escalating (Easy → Hard)
Entry: Free

Stage 1: Beat Team (Power 600) → 🪙 200 Coins
Stage 2: Beat Team (Power 700) → ⭐ 100 XP
Stage 3: Beat Team (Power 800) → 📦 Basic Pack
...
Stage 10: Beat Team (Power 1200) → 📦 Epic Pack + Exclusive Cosmetic
```

### A.2 Collection Event Template

```
Event: [Name]
Duration: 14 days
Token: [Themed Token Name]
Earn Rate: ~50 tokens/day through normal play

Shop:
- Themed Rare Card: 100 tokens
- Themed Epic Card: 500 tokens
- Exclusive Celebration: 300 tokens
- Cosmetic Bundle: 400 tokens
```

### A.3 Community Goal Template

```
Event: [Name]
Duration: 7 days
Goal: [Community-wide metric] (e.g., 1,000,000 goals scored)
Tracking: Real-time counter visible in-game

Milestones:
- 25%: 🪙 1,000 Coins for all participants
- 50%: 📦 Basic Pack for all
- 75%: 💎 10 Gems for all
- 100%: 📦 Epic Pack + Exclusive Title for all
```

---

*This document defines the complete LiveOps & Seasons system for Project F. All seasonal operations, events, and retention mechanics must follow these specifications. This is the final GDD in the Project F design series.*

*Complete GDD Index:*
- *[GDD-00: Competitor Analysis](docs/00-competitor-analysis-en.md)*
- *[GDD-01: Core Game Design](core-game-design-en.md)*
- *[GDD-02: Card Collection System](card-collection-system-en.md)*
- *[GDD-03: Game Economy & Monetization](game-economy-monetization-en.md)*
- *[GDD-04: Competitive & Progression](competitive-progression-en.md)*
- *[GDD-05: Art & Visual Style](art-visual-style-en.md)*
- *[GDD-06: UI/UX Design](ui-ux-design-en.md)*
- *[GDD-07: Special Abilities & GGO System](special-abilities-ggo-en.md)*
- *[GDD-08: LiveOps & Seasons](liveops-seasons-en.md)*
