/**
 * Phase 1 Foundation Verification — YGGAA-17
 * Tests: Data Layer · i18n · Sound · State Stores · Constants
 */

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const readJson = (p) => JSON.parse(fs.readFileSync(path.join(ROOT, p), 'utf8'));

// ─── 1. DATA LAYER ────────────────────────────────────────────────────────────

describe('Data Layer — players.json', () => {
  let players;
  beforeAll(() => { players = readJson('src/data/players.json'); });

  test('parses without errors and is a non-empty array', () => {
    expect(Array.isArray(players)).toBe(true);
    expect(players.length).toBeGreaterThan(0);
  });

  test('contains only the 6 MVP leagues (GDD 4.3)', () => {
    const MVP_LEAGUES = new Set([
      'Premier League', 'LALIGA EA SPORTS', 'Serie A Enilive',
      'Bundesliga', 'Trendyol Süper Lig', "Ligue 1 McDonald's",
    ]);
    const foundLeagues = new Set(players.map((p) => p.league));
    for (const league of foundLeagues) {
      expect(MVP_LEAGUES.has(league)).toBe(true);
    }
    expect(foundLeagues.size).toBe(6);
  });

  test('every player has required fields with correct types (GDD 4.6)', () => {
    const sample = players.slice(0, 100); // check first 100 for speed
    for (const p of sample) {
      expect(typeof p.id).toBe('number');
      expect(typeof p.name).toBe('string');
      expect(p.name.length).toBeGreaterThan(0);
      expect(typeof p.team).toBe('string');
      expect(typeof p.league).toBe('string');
      expect(typeof p.position).toBe('string');
      expect(typeof p.nation).toBe('string');
      expect(typeof p.age).toBe('number');
      expect(typeof p.cardImageUrl).toBe('string');
      expect(p.stats).toBeDefined();
      expect(typeof p.stats.overall).toBe('number');
      expect(typeof p.stats.finishing).toBe('number');
      expect(typeof p.stats.pace).toBe('number');
    }
  });

  test('stats are in valid range 0–99', () => {
    const sample = players.slice(0, 200);
    for (const p of sample) {
      expect(p.stats.overall).toBeGreaterThanOrEqual(0);
      expect(p.stats.overall).toBeLessThanOrEqual(99);
      expect(p.stats.finishing).toBeGreaterThanOrEqual(0);
      expect(p.stats.finishing).toBeLessThanOrEqual(99);
    }
  });

  test('cardImageUrl follows EA FC URL format', () => {
    const sample = players.filter((p) => p.cardImageUrl).slice(0, 20);
    for (const p of sample) {
      expect(p.cardImageUrl).toMatch(/ratings-images-prod\.pulse\.ea\.com/);
    }
  });

  test('all player IDs are unique', () => {
    const ids = players.map((p) => p.id);
    const uniqueIds = new Set(ids);
    expect(uniqueIds.size).toBe(ids.length);
  });
});

// ─── 2. PLAYER-GOAL ASSIGNMENT ALGORITHM (GDD 4.9) ───────────────────────────

describe('pickGoalScorer — weighted random (GDD 4.9)', () => {
  // Inline the algorithm to test pure logic
  const POSITION_WEIGHT = { FWD: 3.0, MID: 1.5, DEF: 0.5, GK: 0.05 };

  function pickGoalScorer(players) {
    if (players.length === 0) throw new Error('Cannot pick scorer from empty squad');
    const weights = players.map((p) => {
      const posWeight = POSITION_WEIGHT[p.positionGroup];
      const finishingFactor = p.stats.finishing > 0 ? p.stats.finishing / 100 : 0.1;
      return posWeight * finishingFactor;
    });
    const total = weights.reduce((sum, w) => sum + w, 0);
    let rand = Math.random() * total;
    for (let i = 0; i < players.length; i++) {
      rand -= weights[i];
      if (rand <= 0) return players[i];
    }
    return players[players.length - 1];
  }

  const makePlayers = (overrides) =>
    overrides.map((o, i) => ({
      id: i + 1, name: `Player${i}`, positionGroup: o.pos,
      stats: { finishing: o.fin, overall: 80 },
    }));

  test('throws on empty squad', () => {
    expect(() => pickGoalScorer([])).toThrow('Cannot pick scorer from empty squad');
  });

  test('always returns a player from the squad', () => {
    const squad = makePlayers([
      { pos: 'FWD', fin: 90 }, { pos: 'MID', fin: 70 }, { pos: 'DEF', fin: 40 },
    ]);
    for (let i = 0; i < 50; i++) {
      const scorer = pickGoalScorer(squad);
      expect(squad).toContain(scorer);
    }
  });

  test('FWD selected far more often than GK (statistical, 1000 runs)', () => {
    const squad = makePlayers([
      { pos: 'FWD', fin: 85 }, { pos: 'GK', fin: 10 },
    ]);
    let fwdCount = 0;
    for (let i = 0; i < 1000; i++) {
      if (pickGoalScorer(squad).positionGroup === 'FWD') fwdCount++;
    }
    // FWD weight: 3.0 × 0.85 = 2.55; GK weight: 0.05 × 0.10 = 0.005
    // Expected FWD: ~99.8%. Threshold: ≥ 95%
    expect(fwdCount).toBeGreaterThanOrEqual(950);
  });

  test('position multipliers match GDD 4.9 (FWD 3.0, MID 1.5, DEF 0.5, GK 0.05)', () => {
    expect(POSITION_WEIGHT.FWD).toBe(3.0);
    expect(POSITION_WEIGHT.MID).toBe(1.5);
    expect(POSITION_WEIGHT.DEF).toBe(0.5);
    expect(POSITION_WEIGHT.GK).toBe(0.05);
  });

  test('handles single-player squad', () => {
    const squad = makePlayers([{ pos: 'FWD', fin: 80 }]);
    expect(pickGoalScorer(squad)).toBe(squad[0]);
  });

  test('player with zero finishing gets fallback weight 0.1', () => {
    const squad = makePlayers([{ pos: 'FWD', fin: 0 }]);
    // Should not throw, returns the only player
    expect(pickGoalScorer(squad)).toBe(squad[0]);
  });
});

// ─── 3. MOTM ALGORITHM ────────────────────────────────────────────────────────

describe('pickManOfTheMatch (GDD 3.5.3)', () => {
  function pickManOfTheMatch(teamPlayers, goalScorerIds) {
    if (teamPlayers.length === 0) throw new Error('Cannot pick MOTM from empty squad');
    const scorers = teamPlayers.filter((p) => goalScorerIds.includes(p.id));
    const pool = scorers.length > 0 ? scorers : teamPlayers;
    return pool.reduce((best, p) => (p.stats.overall > best.stats.overall ? p : best));
  }

  const squad = [
    { id: 1, name: 'Salah',   stats: { overall: 91 } },
    { id: 2, name: 'Haaland', stats: { overall: 93 } },
    { id: 3, name: 'Jones',   stats: { overall: 72 } },
  ];

  test('picks highest-overall scorer when goals exist', () => {
    const motm = pickManOfTheMatch(squad, [1, 3]);
    expect(motm.name).toBe('Salah'); // Salah (91) > Jones (72)
  });

  test('picks highest-overall from entire squad when no goals (0-0)', () => {
    const motm = pickManOfTheMatch(squad, []);
    expect(motm.name).toBe('Haaland'); // 93 = highest overall
  });

  test('throws on empty squad', () => {
    expect(() => pickManOfTheMatch([], [])).toThrow();
  });

  test('single scorer wins MOTM regardless of overall', () => {
    const motm = pickManOfTheMatch(squad, [3]); // Jones is sole scorer
    expect(motm.name).toBe('Jones');
  });
});

// ─── 4. i18n — KEY CONSISTENCY ────────────────────────────────────────────────

describe('i18n — all 4 languages (GDD 5)', () => {
  let en, tr, de, fr;
  beforeAll(() => {
    en = readJson('src/i18n/en.json');
    tr = readJson('src/i18n/tr.json');
    de = readJson('src/i18n/de.json');
    fr = readJson('src/i18n/fr.json');
  });

  test('all 4 language files load without errors', () => {
    expect(en).toBeDefined();
    expect(tr).toBeDefined();
    expect(de).toBeDefined();
    expect(fr).toBeDefined();
  });

  test('TR has identical keys to EN (no missing, no extra)', () => {
    const enKeys = Object.keys(en).sort();
    const trKeys = Object.keys(tr).sort();
    expect(trKeys).toEqual(enKeys);
  });

  test('DE has identical keys to EN', () => {
    expect(Object.keys(de).sort()).toEqual(Object.keys(en).sort());
  });

  test('FR has identical keys to EN', () => {
    expect(Object.keys(fr).sort()).toEqual(Object.keys(en).sort());
  });

  test('all values are non-empty strings', () => {
    for (const [lang, file] of [['en', en], ['tr', tr], ['de', de], ['fr', fr]]) {
      for (const [key, val] of Object.entries(file)) {
        expect(typeof val).toBe('string');
        expect(val.length).toBeGreaterThan(0);
      }
    }
  });

  test('GDD 5.3 required keys all present', () => {
    const required = [
      'menu.startMatch', 'menu.settings',
      'teamSelect.homeTeam', 'teamSelect.awayTeam', 'teamSelect.continue',
      'game.goal', 'game.redCard', 'game.extraTime',
      'summary.matchResult', 'summary.matchEvents', 'summary.motm',
      'summary.rematch', 'summary.changeTeams', 'summary.home',
    ];
    for (const key of required) {
      expect(en[key]).toBeDefined();
      expect(tr[key]).toBeDefined();
      expect(de[key]).toBeDefined();
      expect(fr[key]).toBeDefined();
    }
  });

  test('languages translate differently (not identical to EN)', () => {
    // TR should differ from EN for at least some keys
    const differs = Object.keys(en).filter((k) => tr[k] !== en[k]);
    expect(differs.length).toBeGreaterThan(10);
  });
});

// ─── 5. CONSTANTS (GDD 7) ─────────────────────────────────────────────────────

describe('Design Tokens — Colors (GDD 7.1)', () => {
  let Colors;
  beforeAll(() => { ({ Colors } = require('../src/constants/colors')); });

  test('exports Colors object', () => { expect(Colors).toBeDefined(); });
  test('homeColor is #FFC72C (yellow)', () => { expect(Colors.homeColor).toBe('#FFC72C'); });
  test('awayColor is #E63946 (red)', () => { expect(Colors.awayColor).toBe('#E63946'); });
  test('background is dark green', () => { expect(Colors.background).toBe('#0d2818'); });
  test('goalGold is #FFD700', () => { expect(Colors.goalGold).toBe('#FFD700'); });
  test('redCard color is #E63946', () => { expect(Colors.redCard).toBe('#E63946'); });
});

describe('Design Tokens — GameConfig (GDD 7.4)', () => {
  let GameConfig;
  beforeAll(() => { ({ GameConfig } = require('../src/constants/gameConfig')); });

  test('matchDurationSeconds is 90', () => { expect(GameConfig.matchDurationSeconds).toBe(90); });
  test('extraTimeMin is 1, max is 5', () => {
    expect(GameConfig.extraTimeMinSeconds).toBe(1);
    expect(GameConfig.extraTimeMaxSeconds).toBe(5);
  });
  test('ballCount is 2', () => { expect(GameConfig.ballCount).toBe(2); });
  test('redCardCheckMinutes are [15,30,45,60,75]', () => {
    expect(GameConfig.redCardCheckMinutes).toEqual([15, 30, 45, 60, 75]);
  });
  test('redCardProbability is 0.05 (5%)', () => {
    expect(GameConfig.redCardProbability).toBe(0.05);
  });
  test('positionWeights match GDD 4.9', () => {
    expect(GameConfig.positionWeights.FWD).toBe(3.0);
    expect(GameConfig.positionWeights.MID).toBe(1.5);
    expect(GameConfig.positionWeights.DEF).toBe(0.5);
    expect(GameConfig.positionWeights.GK).toBe(0.05);
  });
  test('goalWidthPercent is 0.35 (35%)', () => {
    expect(GameConfig.goalWidthPercent).toBe(0.35);
  });
  test('toastDurationMs is 2000', () => { expect(GameConfig.toastDurationMs).toBe(2000); });
});

describe('Design Tokens — Spacing & Typography (GDD 7.2–7.3)', () => {
  let Spacing, Typography;
  beforeAll(() => {
    ({ Spacing } = require('../src/constants/spacing'));
    ({ Typography } = require('../src/constants/typography'));
  });

  test('Spacing uses 8pt grid', () => {
    expect(Spacing.sm).toBe(8);
    expect(Spacing.md).toBe(16);
    expect(Spacing.lg).toBe(24);
  });

  test('Typography scoreDisplay is 48px bold', () => {
    expect(Typography.scoreDisplay.fontSize).toBe(48);
    expect(Typography.scoreDisplay.fontWeight).toBe('900');
  });
});

// ─── 6. TYPES — POSITION_MAP & LEAGUE_DISPLAY_NAMES ──────────────────────────

describe('Types — POSITION_MAP and LEAGUE_DISPLAY_NAMES (GDD 4.4)', () => {
  let POSITION_MAP, LEAGUE_DISPLAY_NAMES, TEAM_DISPLAY;
  beforeAll(() => {
    ({ POSITION_MAP, LEAGUE_DISPLAY_NAMES, TEAM_DISPLAY } = require('../src/types/index'));
  });

  test('POSITION_MAP covers all GDD positions', () => {
    const gddPositions = ['GK','CB','LB','RB','LWB','RWB','CM','CDM','CAM','LM','RM','ST','CF','LW','RW','LF','RF'];
    for (const pos of gddPositions) {
      expect(POSITION_MAP[pos]).toBeDefined();
    }
  });

  test('POSITION_MAP groups are correct', () => {
    expect(POSITION_MAP.ST).toBe('FWD');
    expect(POSITION_MAP.CM).toBe('MID');
    expect(POSITION_MAP.CB).toBe('DEF');
    expect(POSITION_MAP.GK).toBe('GK');
  });

  test('LEAGUE_DISPLAY_NAMES has all 6 MVP leagues', () => {
    expect(LEAGUE_DISPLAY_NAMES['Premier League']).toBe('Premier League');
    expect(LEAGUE_DISPLAY_NAMES['LALIGA EA SPORTS']).toBe('La Liga');
    expect(LEAGUE_DISPLAY_NAMES['Serie A Enilive']).toBe('Serie A');
    expect(LEAGUE_DISPLAY_NAMES['Bundesliga']).toBe('Bundesliga');
    expect(LEAGUE_DISPLAY_NAMES['Trendyol Süper Lig']).toBe('Süper Lig');
    expect(LEAGUE_DISPLAY_NAMES["Ligue 1 McDonald's"]).toBe('Ligue 1');
  });

  test('TEAM_DISPLAY homeColor and awayColor match GDD 4.7', () => {
    expect(TEAM_DISPLAY.homeColor).toBe('#FFC72C');
    expect(TEAM_DISPLAY.awayColor).toBe('#E63946');
  });

  test('TEAM_DISPLAY.getInitials returns first 3 chars uppercase', () => {
    expect(TEAM_DISPLAY.getInitials('Liverpool')).toBe('LIV');
    expect(TEAM_DISPLAY.getInitials('Real Madrid')).toBe('REA');
    expect(TEAM_DISPLAY.getInitials('FC Barcelona')).toBe('FC ');
  });
});

// ─── 7. SOUND THROTTLE LOGIC ─────────────────────────────────────────────────

describe('Sound — ball bounce throttle (GDD 6.2)', () => {
  // Test throttle logic in isolation
  const THROTTLE_MS = 100;

  function makeThrottle() {
    let last = 0;
    return function shouldPlay(now) {
      if (now - last < THROTTLE_MS) return false;
      last = now;
      return true;
    };
  }

  test('first call always plays', () => {
    const t = makeThrottle();
    expect(t(1000)).toBe(true);
  });

  test('call within 100ms is throttled', () => {
    const t = makeThrottle();
    t(1000);
    expect(t(1050)).toBe(false);
  });

  test('call after 100ms plays', () => {
    const t = makeThrottle();
    t(1000);
    expect(t(1101)).toBe(true);
  });

  test('call at exactly 100ms boundary plays (uses strict <, not <=)', () => {
    const t = makeThrottle();
    t(1000);
    // 1100 - 1000 = 100, and condition is (100 < 100) = false, so plays
    expect(t(1100)).toBe(true);
  });
});

// ─── 8. MATCH STORE ───────────────────────────────────────────────────────────

describe('matchStore — Zustand (GDD 8.1)', () => {
  let useMatchStore;
  beforeAll(() => {
    ({ useMatchStore } = require('../src/stores/matchStore'));
  });

  function getStore() {
    return useMatchStore.getState();
  }

  beforeEach(() => {
    // Reset store before each test
    useMatchStore.setState({
      homeTeam: null, awayTeam: null, selectedMode: null,
      homeScore: 0, awayScore: 0, events: [],
      currentMinute: 0, isExtraTime: false, extraTimeAmount: 0,
    });
  });

  const mockTeam = (name) => ({ name, league: 'Premier League', players: [], primaryColor: '#fff', secondaryColor: '#000' });

  test('initial state: teams null, scores 0, events empty', () => {
    const s = getStore();
    expect(s.homeTeam).toBeNull();
    expect(s.awayTeam).toBeNull();
    expect(s.homeScore).toBe(0);
    expect(s.awayScore).toBe(0);
    expect(s.events).toHaveLength(0);
  });

  test('setHomeTeam and setAwayTeam store teams', () => {
    const { setHomeTeam, setAwayTeam } = getStore();
    const home = mockTeam('Liverpool');
    const away = mockTeam('Arsenal');
    setHomeTeam(home);
    setAwayTeam(away);
    expect(getStore().homeTeam?.name).toBe('Liverpool');
    expect(getStore().awayTeam?.name).toBe('Arsenal');
  });

  test('addGoal increments homeScore for home team name', () => {
    const { setHomeTeam, setAwayTeam, addGoal } = getStore();
    setHomeTeam(mockTeam('Liverpool'));
    setAwayTeam(mockTeam('Arsenal'));
    addGoal('Liverpool');
    addGoal('Liverpool');
    addGoal('Arsenal');
    expect(getStore().homeScore).toBe(2);
    expect(getStore().awayScore).toBe(1);
  });

  test('addGoal ignores unknown team name', () => {
    const { setHomeTeam, setAwayTeam, addGoal } = getStore();
    setHomeTeam(mockTeam('Liverpool'));
    setAwayTeam(mockTeam('Arsenal'));
    addGoal('Chelsea'); // unknown
    expect(getStore().homeScore).toBe(0);
    expect(getStore().awayScore).toBe(0);
  });

  test('addEvent appends to events array', () => {
    const { addEvent } = getStore();
    addEvent({ id: '1', type: 'goal', minute: 23, teamName: 'Liverpool', playerId: 100, playerName: 'Salah' });
    addEvent({ id: '2', type: 'red_card', minute: 45, teamName: 'Arsenal', playerId: 200, playerName: 'Ramos' });
    expect(getStore().events).toHaveLength(2);
    expect(getStore().events[0].type).toBe('goal');
    expect(getStore().events[1].type).toBe('red_card');
  });

  test('setCurrentMinute updates timer', () => {
    getStore().setCurrentMinute(45);
    expect(getStore().currentMinute).toBe(45);
  });

  test('setExtraTime sets isExtraTime and amount', () => {
    getStore().setExtraTime(true, 3);
    expect(getStore().isExtraTime).toBe(true);
    expect(getStore().extraTimeAmount).toBe(3);
  });

  test('setSelectedMode accepts "plinko" and "arena" (Arena now implemented)', () => {
    getStore().setSelectedMode('plinko');
    expect(getStore().selectedMode).toBe('plinko');
    getStore().setSelectedMode('arena');
    expect(getStore().selectedMode).toBe('arena');
  });

  test('clearMatch resets score, events, timer, mode but NOT teams', () => {
    const { setHomeTeam, setAwayTeam, addGoal, addEvent, clearMatch } = getStore();
    const home = mockTeam('Liverpool');
    setHomeTeam(home);
    setAwayTeam(mockTeam('Arsenal'));
    addGoal('Liverpool');
    addEvent({ id: '1', type: 'goal', minute: 10, teamName: 'Liverpool', playerId: 1, playerName: 'X' });
    getStore().setCurrentMinute(67);
    getStore().setExtraTime(true, 2);
    getStore().setSelectedMode('plinko');

    clearMatch();

    const s = getStore();
    expect(s.homeScore).toBe(0);
    expect(s.awayScore).toBe(0);
    expect(s.events).toHaveLength(0);
    expect(s.currentMinute).toBe(0);
    expect(s.isExtraTime).toBe(false);
    expect(s.extraTimeAmount).toBe(0);
    expect(s.selectedMode).toBeNull();
    // Teams should NOT be cleared by clearMatch
    expect(s.homeTeam?.name).toBe('Liverpool');
  });

  test('clearTeams removes team selections', () => {
    const { setHomeTeam, setAwayTeam, clearTeams } = getStore();
    setHomeTeam(mockTeam('Liverpool'));
    setAwayTeam(mockTeam('Arsenal'));
    clearTeams();
    expect(getStore().homeTeam).toBeNull();
    expect(getStore().awayTeam).toBeNull();
  });
});

// ─── 9. SETTINGS STORE ────────────────────────────────────────────────────────

describe('settingsStore — Zustand persist (GDD 8.2)', () => {
  let useSettingsStore;
  beforeAll(() => {
    ({ useSettingsStore } = require('../src/stores/settingsStore'));
  });

  function getStore() { return useSettingsStore.getState(); }

  beforeEach(() => {
    useSettingsStore.setState({ language: 'tr', soundEnabled: true, localeDetected: false });
  });

  test('initial language is Turkish (tr)', () => {
    expect(getStore().language).toBe('tr');
  });

  test('initial soundEnabled is true', () => {
    expect(getStore().soundEnabled).toBe(true);
  });

  test('setLanguage updates language', () => {
    getStore().setLanguage('en');
    expect(getStore().language).toBe('en');
    getStore().setLanguage('de');
    expect(getStore().language).toBe('de');
    getStore().setLanguage('fr');
    expect(getStore().language).toBe('fr');
  });

  test('toggleSound flips soundEnabled', () => {
    expect(getStore().soundEnabled).toBe(true);
    getStore().toggleSound();
    expect(getStore().soundEnabled).toBe(false);
    getStore().toggleSound();
    expect(getStore().soundEnabled).toBe(true);
  });

  test('markLocaleDetected sets localeDetected to true', () => {
    expect(getStore().localeDetected).toBe(false);
    getStore().markLocaleDetected();
    expect(getStore().localeDetected).toBe(true);
  });
});

// ─── 10. PROJECT STRUCTURE ────────────────────────────────────────────────────

describe('Project Structure (GDD 1.3)', () => {
  const exists = (p) => fs.existsSync(path.join(ROOT, p));

  test('src/types/index.ts exists', () => { expect(exists('src/types/index.ts')).toBe(true); });
  test('src/stores/matchStore.ts exists', () => { expect(exists('src/stores/matchStore.ts')).toBe(true); });
  test('src/stores/settingsStore.ts exists', () => { expect(exists('src/stores/settingsStore.ts')).toBe(true); });
  test('src/services/playerDataService.ts exists', () => { expect(exists('src/services/playerDataService.ts')).toBe(true); });
  test('src/services/soundService.ts exists', () => { expect(exists('src/services/soundService.ts')).toBe(true); });
  test('src/hooks/useI18n.ts exists', () => { expect(exists('src/hooks/useI18n.ts')).toBe(true); });
  test('src/hooks/useSound.ts exists', () => { expect(exists('src/hooks/useSound.ts')).toBe(true); });
  test('src/i18n/en.json exists', () => { expect(exists('src/i18n/en.json')).toBe(true); });
  test('src/i18n/tr.json exists', () => { expect(exists('src/i18n/tr.json')).toBe(true); });
  test('src/i18n/de.json exists', () => { expect(exists('src/i18n/de.json')).toBe(true); });
  test('src/i18n/fr.json exists', () => { expect(exists('src/i18n/fr.json')).toBe(true); });
  test('src/data/players.json exists', () => { expect(exists('src/data/players.json')).toBe(true); });
  test('src/constants/colors.ts exists', () => { expect(exists('src/constants/colors.ts')).toBe(true); });
  test('src/constants/gameConfig.ts exists', () => { expect(exists('src/constants/gameConfig.ts')).toBe(true); });
  test('app/_layout.tsx exists (expo-router entry)', () => { expect(exists('app/_layout.tsx')).toBe(true); });
  test('app/index.tsx (main menu) exists', () => { expect(exists('app/index.tsx')).toBe(true); });
  test('app/team-select.tsx exists', () => { expect(exists('app/team-select.tsx')).toBe(true); });
  test('app/settings.tsx exists', () => { expect(exists('app/settings.tsx')).toBe(true); });
  test('scripts/csv-to-json.mjs exists', () => { expect(exists('scripts/csv-to-json.mjs')).toBe(true); });
});
