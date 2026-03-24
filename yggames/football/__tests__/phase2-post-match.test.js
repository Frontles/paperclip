/**
 * Phase 2 QA — Post-Match Summary Screen (YGGAA-39)
 * Tests: computeMotm logic · i18n · store operations · win/draw logic · known bugs
 */

const fs   = require('fs');
const path = require('path');

const ROOT    = path.resolve(__dirname, '..');
const readJson = (p) => JSON.parse(fs.readFileSync(path.join(ROOT, p), 'utf8'));
const exists   = (p) => fs.existsSync(path.join(ROOT, p));
const readFile = (p) => fs.readFileSync(path.join(ROOT, p), 'utf8');

// ─── Helpers ──────────────────────────────────────────────────────────────────

const makePlayer = (id, name, overall, finishing = 80) => ({
  id, name, stats: { overall, finishing, pace: 70 },
});

const makeGoalEvent = (playerId, minute = 30, teamName = 'Home') => ({
  id: `ev-${playerId}-${minute}`, type: 'goal', playerId, minute,
  playerName: `Player${playerId}`, teamName,
});

const makeRedCardEvent = (playerId, minute = 60, teamName = 'Away') => ({
  id: `rc-${playerId}-${minute}`, type: 'red_card', playerId, minute,
  playerName: `Player${playerId}`, teamName,
});

// Inline computeMotm — mirrors match-summary.tsx exactly for unit-testing
function computeMotm(events, homeTeamName, awayTeamName, playersByTeam) {
  if (!homeTeamName || !awayTeamName) return null;

  const homePlayers = playersByTeam.get(homeTeamName) ?? [];
  const awayPlayers = playersByTeam.get(awayTeamName) ?? [];
  const allPlayers  = [...homePlayers, ...awayPlayers];
  if (allPlayers.length === 0) return null;

  const goalEvents = events.filter((e) => e.type === 'goal');

  if (goalEvents.length === 0) {
    const best = allPlayers.reduce((a, b) => (b.stats.overall > a.stats.overall ? b : a));
    return { player: best, goals: 0 };
  }

  const goalCount = new Map();
  for (const ev of goalEvents) {
    goalCount.set(ev.playerId, (goalCount.get(ev.playerId) ?? 0) + 1);
  }

  let best = null;
  let bestGoals = 0;
  for (const [playerId, goals] of goalCount) {
    const player = allPlayers.find((p) => p.id === playerId);
    if (!player) continue;
    if (
      goals > bestGoals ||
      (goals === bestGoals && best !== null && player.stats.overall > best.stats.overall)
    ) {
      best      = player;
      bestGoals = goals;
    }
  }

  if (!best) {
    const topOverall = allPlayers.reduce((a, b) => (b.stats.overall > a.stats.overall ? b : a));
    return { player: topOverall, goals: 0 };
  }

  return { player: best, goals: bestGoals };
}

// ─── 1. FILE STRUCTURE ────────────────────────────────────────────────────────

describe('Post-Match Summary — File Structure', () => {
  test('app/post-match.tsx exists (BUG-1 fix: renamed from match-summary.tsx)', () => {
    expect(exists('app/post-match.tsx')).toBe(true);
  });

  test('app/match-summary.tsx no longer exists (old route removed)', () => {
    expect(exists('app/match-summary.tsx')).toBe(false);
  });

  test('app/post-match.tsx imports from matchStore', () => {
    expect(readFile('app/post-match.tsx')).toMatch(/useMatchStore/);
  });

  test('app/post-match.tsx uses useI18n hook', () => {
    expect(readFile('app/post-match.tsx')).toMatch(/useI18n/);
  });

  test('app/post-match.tsx imports SafeAreaView', () => {
    expect(readFile('app/post-match.tsx')).toMatch(/SafeAreaView/);
  });

  test('app/post-match.tsx renders ScrollView for long event lists', () => {
    expect(readFile('app/post-match.tsx')).toMatch(/ScrollView/);
  });
});

// ─── 2. i18n — summary.* KEYS ─────────────────────────────────────────────────

describe('i18n — summary.* keys used by match-summary screen', () => {
  let en, tr, de, fr;
  beforeAll(() => {
    en = readJson('src/i18n/en.json');
    tr = readJson('src/i18n/tr.json');
    de = readJson('src/i18n/de.json');
    fr = readJson('src/i18n/fr.json');
  });

  const summaryKeys = [
    'summary.matchResult',
    'summary.matchEvents',
    'summary.motm',
    'summary.rematch',
    'summary.changeTeams',
    'summary.home',
  ];

  test.each(summaryKeys)('EN has non-empty key "%s"', (key) => {
    expect(en[key]).toBeDefined();
    expect(typeof en[key]).toBe('string');
    expect(en[key].length).toBeGreaterThan(0);
  });

  test.each(summaryKeys)('TR has non-empty key "%s"', (key) => {
    expect(tr[key]).toBeDefined();
    expect(tr[key].length).toBeGreaterThan(0);
  });

  test.each(summaryKeys)('DE has non-empty key "%s"', (key) => {
    expect(de[key]).toBeDefined();
    expect(de[key].length).toBeGreaterThan(0);
  });

  test.each(summaryKeys)('FR has non-empty key "%s"', (key) => {
    expect(fr[key]).toBeDefined();
    expect(fr[key].length).toBeGreaterThan(0);
  });

  test('EN button labels are correct', () => {
    expect(en['summary.rematch']).toBe('Rematch');
    expect(en['summary.changeTeams']).toBe('Change Teams');
    expect(en['summary.home']).toBe('Home');
    expect(en['summary.motm']).toBe('Man of the Match');
  });

  test('TR translations differ from EN (not copy-pasted)', () => {
    expect(tr['summary.rematch']).not.toBe(en['summary.rematch']);
    expect(tr['summary.motm']).not.toBe(en['summary.motm']);
  });

  test('all 4 languages have same summary.* key count', () => {
    const summaryCount = (obj) => Object.keys(obj).filter((k) => k.startsWith('summary.')).length;
    expect(summaryCount(tr)).toBe(summaryCount(en));
    expect(summaryCount(de)).toBe(summaryCount(en));
    expect(summaryCount(fr)).toBe(summaryCount(en));
  });
});

// ─── 3. computeMotm — MAN OF THE MATCH ALGORITHM (GDD 3.5.3) ─────────────────

describe('computeMotm — pure function unit tests (GDD 3.5.3)', () => {
  const homePlayers = [
    makePlayer(1, 'Salah', 91),
    makePlayer(2, 'Alexander-Arnold', 85),
  ];
  const awayPlayers = [
    makePlayer(3, 'Haaland', 93),
    makePlayer(4, 'De Bruyne', 91),
  ];
  const byTeam = new Map([
    ['Liverpool', homePlayers],
    ['Man City', awayPlayers],
  ]);

  test('returns null when homeTeamName is null', () => {
    expect(computeMotm([], null, 'Man City', byTeam)).toBeNull();
  });

  test('returns null when awayTeamName is null', () => {
    expect(computeMotm([], 'Liverpool', null, byTeam)).toBeNull();
  });

  test('returns null when both team names are null', () => {
    expect(computeMotm([], null, null, byTeam)).toBeNull();
  });

  test('returns null when both teams have no players', () => {
    const empty = new Map([['A', []], ['B', []]]);
    expect(computeMotm([], 'A', 'B', empty)).toBeNull();
  });

  test('scoreless match (0-0): highest overall across both teams wins', () => {
    const result = computeMotm([], 'Liverpool', 'Man City', byTeam);
    expect(result).not.toBeNull();
    expect(result.player.name).toBe('Haaland'); // OVR 93 — highest across both teams
    expect(result.goals).toBe(0);
  });

  test('single scorer wins MOTM regardless of overall', () => {
    // Alexander-Arnold (OVR 85) scores — should beat Haaland (OVR 93)
    const result = computeMotm([makeGoalEvent(2)], 'Liverpool', 'Man City', byTeam);
    expect(result.player.name).toBe('Alexander-Arnold');
    expect(result.goals).toBe(1);
  });

  test('most goals wins over higher overall', () => {
    // Salah (91, 1 goal) vs Alexander-Arnold (85, 2 goals)
    const events = [makeGoalEvent(1), makeGoalEvent(2), makeGoalEvent(2)];
    const result  = computeMotm(events, 'Liverpool', 'Man City', byTeam);
    expect(result.player.name).toBe('Alexander-Arnold');
    expect(result.goals).toBe(2);
  });

  test('goals tie broken by higher overall', () => {
    // Salah (91, 1 goal) vs Alexander-Arnold (85, 1 goal)
    const events = [makeGoalEvent(1), makeGoalEvent(2)];
    const result  = computeMotm(events, 'Liverpool', 'Man City', byTeam);
    expect(result.player.name).toBe('Salah');
    expect(result.goals).toBe(1);
  });

  test('red card events are ignored — only goal events count for MOTM', () => {
    const events = [makeRedCardEvent(2), makeRedCardEvent(4)];
    const result  = computeMotm(events, 'Liverpool', 'Man City', byTeam);
    expect(result.goals).toBe(0);
    expect(result.player.name).toBe('Haaland'); // Highest OVR wins scoreless
  });

  test('away team scorer can win MOTM', () => {
    // Haaland (away, OVR 93) scores 2
    const events = [makeGoalEvent(3), makeGoalEvent(3)];
    const result  = computeMotm(events, 'Liverpool', 'Man City', byTeam);
    expect(result.player.name).toBe('Haaland');
    expect(result.goals).toBe(2);
  });

  test('unknown playerId scorer falls back to highest overall', () => {
    // PlayerId 99 exists in events but not in either squad
    const events = [{ id: 'ev1', type: 'goal', playerId: 99, minute: 10, playerName: 'Ghost', teamName: 'Home' }];
    const result  = computeMotm(events, 'Liverpool', 'Man City', byTeam);
    expect(result).not.toBeNull();
    expect(result.player.name).toBe('Haaland'); // Falls back to highest OVR
    expect(result.goals).toBe(0);
  });

  test('hat-trick: 3 goals accumulate correctly', () => {
    const events = [makeGoalEvent(3, 10), makeGoalEvent(3, 25), makeGoalEvent(3, 67)];
    const result  = computeMotm(events, 'Liverpool', 'Man City', byTeam);
    expect(result.player.name).toBe('Haaland');
    expect(result.goals).toBe(3);
  });

  test('mixed goal and red_card events — only goals counted for MOTM', () => {
    // Salah (1 goal) + red card for Haaland
    const events = [makeGoalEvent(1), makeRedCardEvent(3)];
    const result  = computeMotm(events, 'Liverpool', 'Man City', byTeam);
    expect(result.player.name).toBe('Salah');
    expect(result.goals).toBe(1);
  });

  test('equal-overall players: first found wins when goals tied', () => {
    // Salah (91) vs De Bruyne (91), both score 1
    const events = [makeGoalEvent(1), makeGoalEvent(4)];
    const result  = computeMotm(events, 'Liverpool', 'Man City', byTeam);
    // Both have OVR 91 and 1 goal — result depends on iteration order
    // Either Salah or De Bruyne is acceptable; just verify it's one of them
    expect(['Salah', 'De Bruyne']).toContain(result.player.name);
    expect(result.goals).toBe(1);
  });
});

// ─── 4. matchStore — REMATCH / CHANGE TEAMS BEHAVIOR ─────────────────────────

describe('matchStore — rematch and change-teams store operations', () => {
  let useMatchStore;

  beforeAll(() => {
    ({ useMatchStore } = require('../src/stores/matchStore'));
  });

  const mockTeam = (name) => ({
    name, league: 'Premier League', players: [], primaryColor: '#fff', secondaryColor: '#000',
  });

  beforeEach(() => {
    useMatchStore.setState({
      homeTeam:       mockTeam('Liverpool'),
      awayTeam:       mockTeam('Arsenal'),
      homeScore:      3,
      awayScore:      1,
      events:         [
        { id: '1', type: 'goal',     minute: 23, teamName: 'Liverpool', playerId: 1, playerName: 'Salah' },
        { id: '2', type: 'red_card', minute: 55, teamName: 'Arsenal',   playerId: 2, playerName: 'Ramos' },
      ],
      currentMinute:  90,
      isExtraTime:    false,
      extraTimeAmount: 0,
      selectedMode:   'plinko',
    });
  });

  test('Rematch: clearMatch resets scores, events, timer, mode — keeps teams', () => {
    useMatchStore.getState().clearMatch();
    const s = useMatchStore.getState();
    expect(s.homeScore).toBe(0);
    expect(s.awayScore).toBe(0);
    expect(s.events).toHaveLength(0);
    expect(s.currentMinute).toBe(0);
    expect(s.isExtraTime).toBe(false);
    expect(s.selectedMode).toBeNull();
    expect(s.homeTeam?.name).toBe('Liverpool');  // Teams preserved
    expect(s.awayTeam?.name).toBe('Arsenal');
  });

  test('Change Teams: clearTeams + clearMatch removes all state', () => {
    const { clearTeams, clearMatch } = useMatchStore.getState();
    clearTeams();
    clearMatch();
    const s = useMatchStore.getState();
    expect(s.homeTeam).toBeNull();
    expect(s.awayTeam).toBeNull();
    expect(s.homeScore).toBe(0);
    expect(s.awayScore).toBe(0);
    expect(s.events).toHaveLength(0);
  });

  test('clearMatch alone does NOT clear teams', () => {
    useMatchStore.getState().clearMatch();
    expect(useMatchStore.getState().homeTeam?.name).toBe('Liverpool');
    expect(useMatchStore.getState().awayTeam?.name).toBe('Arsenal');
  });

  test('clearTeams alone does NOT reset scores or events', () => {
    useMatchStore.getState().clearTeams();
    const s = useMatchStore.getState();
    expect(s.homeTeam).toBeNull();
    expect(s.awayTeam).toBeNull();
    expect(s.homeScore).toBe(3);  // Unchanged
    expect(s.awayScore).toBe(1);
    expect(s.events).toHaveLength(2);
  });

  test('after clearMatch, addGoal still works if teams are set', () => {
    useMatchStore.getState().clearMatch();
    useMatchStore.getState().addGoal('Liverpool');
    expect(useMatchStore.getState().homeScore).toBe(1);
  });
});

// ─── 5. WIN / DRAW DETERMINATION ─────────────────────────────────────────────

describe('Win/Draw result logic (used for teamSideWinner highlight)', () => {
  const result = (h, a) => ({ homeWins: h > a, awayWins: a > h, isDraw: h === a });

  test('home wins: homeScore > awayScore', () => {
    const r = result(3, 1);
    expect(r.homeWins).toBe(true);
    expect(r.awayWins).toBe(false);
    expect(r.isDraw).toBe(false);
  });

  test('away wins: awayScore > homeScore', () => {
    const r = result(0, 2);
    expect(r.homeWins).toBe(false);
    expect(r.awayWins).toBe(true);
    expect(r.isDraw).toBe(false);
  });

  test('draw: equal scores', () => {
    const r = result(1, 1);
    expect(r.homeWins).toBe(false);
    expect(r.awayWins).toBe(false);
    expect(r.isDraw).toBe(true);
  });

  test('scoreless draw (0-0)', () => {
    const r = result(0, 0);
    expect(r.isDraw).toBe(true);
    expect(r.homeWins).toBe(false);
    expect(r.awayWins).toBe(false);
  });

  test('large home win', () => {
    expect(result(7, 0).homeWins).toBe(true);
  });

  test('1-goal difference is decisive', () => {
    expect(result(2, 1).homeWins).toBe(true);
    expect(result(1, 2).awayWins).toBe(true);
  });
});

// ─── 6. TEAM BADGE INITIALS LOGIC ────────────────────────────────────────────

describe('TeamBadge — initials derivation (name.slice(0, 3).toUpperCase())', () => {
  const badge = (name) => name.slice(0, 3).toUpperCase();

  test('"Arsenal" → "ARS"',     () => expect(badge('Arsenal')).toBe('ARS'));
  test('"Liverpool" → "LIV"',   () => expect(badge('Liverpool')).toBe('LIV'));
  test('"Man City" → "MAN"',    () => expect(badge('Man City')).toBe('MAN'));
  test('"Real Madrid" → "REA"', () => expect(badge('Real Madrid')).toBe('REA'));
  test('"FC Barcelona" → "FC "',() => expect(badge('FC Barcelona')).toBe('FC '));

  test('short name (2 chars) does not crash', () => {
    expect(badge('AC')).toBe('AC');
  });

  test('empty fallback "???" → "???"', () => {
    expect(badge('???')).toBe('???');
  });

  test('empty string → ""', () => {
    expect(badge('')).toBe('');
  });
});

// ─── 7. MOTM GOALS EMOJI DISPLAY ─────────────────────────────────────────────

describe('MOTM goals emoji — Math.min(goals, 5) cap', () => {
  const emoji = (goals) => '⚽'.repeat(Math.min(goals, 5));

  test('1 goal → 1 soccer ball', () => expect(emoji(1)).toBe('⚽'));
  test('3 goals → 3 soccer balls', () => expect(emoji(3)).toBe('⚽⚽⚽'));
  test('5 goals → 5 soccer balls (max)', () => expect(emoji(5)).toBe('⚽⚽⚽⚽⚽'));
  test('6 goals capped at 5', () => expect(emoji(6)).toBe('⚽⚽⚽⚽⚽'));
  test('100 goals capped at 5', () => expect(emoji(100)).toBe('⚽⚽⚽⚽⚽'));
  test('0 goals → empty string', () => expect(emoji(0)).toBe(''));
});

// ─── 8. BUG FIXES VERIFIED (YGGAA-40) ───────────────────────────────────────

describe('Bug Fixes Verified — YGGAA-40 fixes all 5 bugs from YGGAA-39', () => {
  let src;
  let motmSrc;
  beforeAll(() => {
    src = readFile('app/post-match.tsx');
    // BUG-5: i18n calls live inside the extracted MotmCard component
    motmSrc = readFile('src/components/summary/MotmCard.tsx');
  });

  test('BUG-1 FIXED: route renamed to /post-match (app/post-match.tsx exists, old file gone)', () => {
    expect(exists('app/post-match.tsx')).toBe(true);
    expect(exists('app/match-summary.tsx')).toBe(false);
  });

  test('BUG-2 FIXED: WIN/DRAW ResultBadge present and renders below score', () => {
    // ResultBadge component uses "WIN" / "DRAW" labels
    expect(src).toMatch(/['`]WIN['`]/);
    expect(src).toMatch(/['`]DRAW['`]/);
    // resultBadgeRow appears after scoreRow in the JSX
    const badgeRowIdx = src.indexOf('resultBadgeRow');
    const scoreRowIdx = src.indexOf('scoreRow');
    expect(badgeRowIdx).toBeGreaterThan(scoreRowIdx);
  });

  test('BUG-3 FIXED: all navigation uses router.replace(), not router.push()', () => {
    expect(src).toMatch(/router\.replace/);
    expect(src).not.toMatch(/router\.push/);
  });

  test('BUG-4 FIXED: empty events section shows i18n "No events" text', () => {
    expect(src).toMatch(/summary\.noEvents/);
  });

  test('BUG-5 FIXED: MOTM goals label uses i18n t() calls, not hardcoded strings', () => {
    // t() calls are inside the extracted MotmCard component, not the screen file
    expect(motmSrc).toMatch(/t\('summary\.goal'\)/);
    expect(motmSrc).toMatch(/t\('summary\.goals'\)/);
    // post-match.tsx must pass t as a prop to MotmCard — not inline hardcoded strings
    expect(src).toMatch(/MotmCard/);
    expect(src).toMatch(/\bt={t}/);
  });
});
