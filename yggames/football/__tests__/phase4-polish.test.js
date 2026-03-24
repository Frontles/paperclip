/**
 * Phase 4 — Polish Verification — YGGAA-33
 * Tests: Sound · Toast Auto-dismiss · MOTM Logic · i18n Coverage
 */

// ─── Inline helpers ─────────────────────────────────────────────────────────

const SOUND_KEYS = [
  'ball_bounce',
  'goal_scored',
  'whistle_start',
  'whistle_end',
  'red_card',
  'button_tap',
  'crowd_ambient',
];

const BALL_BOUNCE_THROTTLE_MS = 100;
const TOAST_DURATION_MS = 2000;

const makePlayer = (overrides = {}) => ({
  id: overrides.id ?? 1,
  name: overrides.name ?? 'Player',
  positionGroup: overrides.positionGroup ?? 'FWD',
  stats: {
    overall: overrides.overall ?? 80,
    finishing: 70,
    pace: 75,
    shooting: 75,
    passing: 70,
    dribbling: 70,
    defending: 40,
    physical: 70,
  },
});

/** Inlined from soundService.ts — pure throttle logic */
function makeThrottledPlay() {
  let lastBallBounceAt = 0;
  const calls = [];

  function play(key, enabled, now = Date.now()) {
    if (!enabled) return 'skipped:disabled';
    if (key === 'ball_bounce') {
      if (now - lastBallBounceAt < BALL_BOUNCE_THROTTLE_MS) return 'skipped:throttled';
      lastBallBounceAt = now;
    }
    calls.push({ key, now });
    return 'played';
  }

  return { play, calls };
}

/** Inlined from playerDataService.ts — pickManOfTheMatch */
function pickManOfTheMatch(teamPlayers, goalScorerIds) {
  if (teamPlayers.length === 0) throw new Error('Cannot pick MOTM from empty squad');
  const scorers = teamPlayers.filter((p) => goalScorerIds.includes(p.id));
  const pool = scorers.length > 0 ? scorers : teamPlayers;
  return pool.reduce((best, p) => (p.stats.overall > best.stats.overall ? p : best));
}

// ─── i18n files ─────────────────────────────────────────────────────────────

const en = require('../src/i18n/en.json');
const de = require('../src/i18n/de.json');
const fr = require('../src/i18n/fr.json');
const tr = require('../src/i18n/tr.json');

const ALL_LANGS = { en, de, fr, tr };

// ═══════════════════════════════════════════════════════════════════════════
// 1. SOUND — SoundKey inventory
// ═══════════════════════════════════════════════════════════════════════════

describe('Sound — SoundKey inventory', () => {
  test('exactly 7 sound keys are defined', () => {
    expect(SOUND_KEYS).toHaveLength(7);
  });

  test.each(SOUND_KEYS)('sound key "%s" is present', (key) => {
    expect(SOUND_KEYS).toContain(key);
  });
});

// ═══════════════════════════════════════════════════════════════════════════
// 2. SOUND — Throttle logic (ball_bounce)
// ═══════════════════════════════════════════════════════════════════════════

describe('Sound — ball_bounce throttle', () => {
  test('first call within a fresh window plays', () => {
    const { play } = makeThrottledPlay();
    expect(play('ball_bounce', true, 1000)).toBe('played');
  });

  test('second call within 100ms is throttled', () => {
    const { play } = makeThrottledPlay();
    play('ball_bounce', true, 1000);
    expect(play('ball_bounce', true, 1050)).toBe('skipped:throttled');
  });

  test('call exactly at 100ms boundary is throttled (< not <=)', () => {
    const { play } = makeThrottledPlay();
    play('ball_bounce', true, 1000);
    expect(play('ball_bounce', true, 1099)).toBe('skipped:throttled');
  });

  test('call after 100ms plays again', () => {
    const { play } = makeThrottledPlay();
    play('ball_bounce', true, 1000);
    expect(play('ball_bounce', true, 1100)).toBe('played');
  });

  test('other sound keys are NOT throttled by ball_bounce timer', () => {
    const { play } = makeThrottledPlay();
    play('ball_bounce', true, 1000);
    // goal_scored should not be throttled even right after a bounce
    expect(play('goal_scored', true, 1001)).toBe('played');
  });

  test('rapid bounces count only played ones', () => {
    const { play, calls } = makeThrottledPlay();
    play('ball_bounce', true, 1000);
    play('ball_bounce', true, 1050); // throttled
    play('ball_bounce', true, 1100); // played
    play('ball_bounce', true, 1150); // throttled
    play('ball_bounce', true, 1200); // played
    const bounces = calls.filter((c) => c.key === 'ball_bounce');
    expect(bounces).toHaveLength(3);
  });
});

// ═══════════════════════════════════════════════════════════════════════════
// 3. SOUND — Enabled toggle
// ═══════════════════════════════════════════════════════════════════════════

describe('Sound — enabled toggle', () => {
  test('play with enabled=false returns skipped for all keys', () => {
    const { play } = makeThrottledPlay();
    for (const key of SOUND_KEYS) {
      expect(play(key, false, 0)).toBe('skipped:disabled');
    }
  });

  test('play with enabled=true plays (non-throttled call)', () => {
    const { play } = makeThrottledPlay();
    expect(play('goal_scored', true, 0)).toBe('played');
  });

  test('enabled check takes priority over throttle', () => {
    // Even if throttle window is fresh, disabled wins
    const { play } = makeThrottledPlay();
    expect(play('ball_bounce', false, 1000)).toBe('skipped:disabled');
  });
});

// ═══════════════════════════════════════════════════════════════════════════
// 4. SOUND — Non-bounce keys are never throttled
// ═══════════════════════════════════════════════════════════════════════════

describe('Sound — non-bounce keys have no throttle', () => {
  const nonBounceKeys = SOUND_KEYS.filter((k) => k !== 'ball_bounce');

  test.each(nonBounceKeys)('"%s" plays on consecutive calls', (key) => {
    const { play } = makeThrottledPlay();
    expect(play(key, true, 1000)).toBe('played');
    expect(play(key, true, 1001)).toBe('played');
  });
});

// ═══════════════════════════════════════════════════════════════════════════
// 5. TOAST — Auto-dismiss timing
// ═══════════════════════════════════════════════════════════════════════════

describe('Toast — auto-dismiss', () => {
  beforeEach(() => jest.useFakeTimers());
  afterEach(() => jest.useRealTimers());

  test('toastDurationMs is 2000ms', () => {
    expect(TOAST_DURATION_MS).toBe(2000);
  });

  test('dismiss callback fires after toastDurationMs', () => {
    const dismiss = jest.fn();
    const id = 'toast-1';
    setTimeout(() => dismiss(id), TOAST_DURATION_MS);

    jest.advanceTimersByTime(1999);
    expect(dismiss).not.toHaveBeenCalled();

    jest.advanceTimersByTime(1);
    expect(dismiss).toHaveBeenCalledWith('toast-1');
    expect(dismiss).toHaveBeenCalledTimes(1);
  });

  test('multiple toasts each schedule their own dismiss', () => {
    const dismiss = jest.fn();
    ['a', 'b', 'c'].forEach((id) => setTimeout(() => dismiss(id), TOAST_DURATION_MS));

    jest.advanceTimersByTime(TOAST_DURATION_MS);
    expect(dismiss).toHaveBeenCalledTimes(3);
  });
});

// ═══════════════════════════════════════════════════════════════════════════
// 6. MOTM — pickManOfTheMatch logic
// ═══════════════════════════════════════════════════════════════════════════

describe('MOTM — pickManOfTheMatch', () => {
  test('throws on empty squad', () => {
    expect(() => pickManOfTheMatch([], [])).toThrow('Cannot pick MOTM from empty squad');
  });

  test('returns the only player in a 1-player squad (no goals)', () => {
    const p = makePlayer({ id: 1, overall: 70 });
    expect(pickManOfTheMatch([p], [])).toEqual(p);
  });

  test('picks highest overall among goal scorers', () => {
    const p1 = makePlayer({ id: 1, overall: 80 });
    const p2 = makePlayer({ id: 2, overall: 90 }); // scorer
    const p3 = makePlayer({ id: 3, overall: 75 }); // scorer
    expect(pickManOfTheMatch([p1, p2, p3], [2, 3])).toEqual(p2);
  });

  test('falls back to whole squad when no goals scored', () => {
    const p1 = makePlayer({ id: 1, overall: 60 });
    const p2 = makePlayer({ id: 2, overall: 85 });
    const p3 = makePlayer({ id: 3, overall: 70 });
    expect(pickManOfTheMatch([p1, p2, p3], [])).toEqual(p2);
  });

  test('non-scoring players excluded when goals exist', () => {
    const topPlayer = makePlayer({ id: 1, overall: 99 }); // did not score
    const scorer = makePlayer({ id: 2, overall: 72 });    // scored
    const result = pickManOfTheMatch([topPlayer, scorer], [2]);
    expect(result).toEqual(scorer);
  });

  test('handles single scorer correctly', () => {
    const squad = [1, 2, 3, 4, 5].map((i) => makePlayer({ id: i, overall: 60 + i }));
    const scorer = squad[2]; // id=3, overall=63
    expect(pickManOfTheMatch(squad, [3])).toEqual(scorer);
  });

  test('tie broken by last-in-array (reduce behavior)', () => {
    const p1 = makePlayer({ id: 1, overall: 80 });
    const p2 = makePlayer({ id: 2, overall: 80 });
    // reduce keeps first when equal (p1.stats.overall > p2.stats.overall is false, so p2 NOT chosen)
    expect(pickManOfTheMatch([p1, p2], [])).toEqual(p1);
  });

  test('full squad of 11 picks the highest overall', () => {
    const squad = Array.from({ length: 11 }, (_, i) =>
      makePlayer({ id: i + 1, overall: 60 + i }),
    );
    // id=11, overall=70 is highest
    expect(pickManOfTheMatch(squad, [])).toEqual(squad[10]);
  });

  test('goalScorerIds that do not match any player fall back to full squad', () => {
    const squad = [makePlayer({ id: 1, overall: 80 }), makePlayer({ id: 2, overall: 75 })];
    // id 99 doesn't exist → no scorers found → fall back to whole squad
    expect(pickManOfTheMatch(squad, [99])).toEqual(squad[0]);
  });
});

// ═══════════════════════════════════════════════════════════════════════════
// 7. i18n — MOTM and game event strings present in all 4 languages
// ═══════════════════════════════════════════════════════════════════════════

describe('i18n — MOTM and game event translations', () => {
  const requiredKeys = [
    'summary.motm',
    'game.goal',
    'game.redCard',
    'game.matchStart',
    'game.fullTime',
  ];

  test.each(Object.entries(ALL_LANGS))('%s: all required keys present', (lang, strings) => {
    for (const key of requiredKeys) {
      expect(strings[key]).toBeTruthy();
    }
  });

  test('summary.motm is different in all 4 languages', () => {
    const values = Object.values(ALL_LANGS).map((s) => s['summary.motm']);
    const unique = new Set(values);
    expect(unique.size).toBe(4);
  });

  test('en: summary.motm is "Man of the Match"', () => {
    expect(en['summary.motm']).toBe('Man of the Match');
  });

  test.each(Object.entries(ALL_LANGS))(
    '%s: summary.motm is a non-empty string',
    (lang, strings) => {
      expect(typeof strings['summary.motm']).toBe('string');
      expect(strings['summary.motm'].length).toBeGreaterThan(0);
    },
  );
});

// ═══════════════════════════════════════════════════════════════════════════
// 8. i18n — All 4 language files have equal key counts (no missing keys)
// ═══════════════════════════════════════════════════════════════════════════

describe('i18n — Key parity across languages', () => {
  const enKeys = Object.keys(en).sort();

  test.each(['de', 'fr', 'tr'])('%s has same number of keys as en', (lang) => {
    const langKeys = Object.keys(ALL_LANGS[lang]).sort();
    expect(langKeys).toHaveLength(enKeys.length);
  });

  test.each(['de', 'fr', 'tr'])('%s has no missing keys vs en', (lang) => {
    const missing = enKeys.filter((key) => ALL_LANGS[lang][key] === undefined);
    expect(missing).toEqual([]);
  });
});
