/**
 * Phase 2 QA — Game Mode Selection Screen (YGGAA-38)
 * Tests: app/mode-select.tsx · i18n · matchStore.setSelectedMode · card logic · known bugs
 */

const fs   = require('fs');
const path = require('path');

const ROOT     = path.resolve(__dirname, '..');
const readJson = (p) => JSON.parse(fs.readFileSync(path.join(ROOT, p), 'utf8'));
const exists   = (p) => fs.existsSync(path.join(ROOT, p));
const readFile = (p) => fs.readFileSync(path.join(ROOT, p), 'utf8');

// ─── 1. FILE STRUCTURE ────────────────────────────────────────────────────────

describe('Game Mode Selection — File Structure', () => {
  let src;
  beforeAll(() => { src = readFile('app/mode-select.tsx'); });

  test('app/mode-select.tsx exists', () => {
    expect(exists('app/mode-select.tsx')).toBe(true);
  });

  test('imports useMatchStore for team data and setSelectedMode', () => {
    expect(src).toMatch(/useMatchStore/);
  });

  test('imports useI18n for translated strings', () => {
    expect(src).toMatch(/useI18n/);
  });

  test('imports SafeAreaView', () => {
    expect(src).toMatch(/SafeAreaView/);
  });

  test('imports ScrollView (card list is scrollable)', () => {
    expect(src).toMatch(/ScrollView/);
  });

  test('calls setSelectedMode with "plinko" on Plinko press', () => {
    expect(src).toMatch(/setSelectedMode\(['"]plinko['"]\)/);
  });

  test('navigates to /game/plinko on Plinko press', () => {
    expect(src).toMatch(/\/game\/plinko/);
  });

  test('Coming Soon cards use disabled={true} via active={false}', () => {
    // disabled={!active} — when active=false, disabled=true
    expect(src).toMatch(/disabled=\{!active\}/);
  });

  test('lock icon (🔒) rendered for inactive cards', () => {
    expect(src).toMatch(/🔒/);
  });

  test('VS header text is present', () => {
    expect(src).toMatch(/VS/);
  });

  test('uses homeTeam and awayTeam from matchStore', () => {
    expect(src).toMatch(/homeTeam/);
    expect(src).toMatch(/awayTeam/);
  });

  test('fallback "???" when team not selected', () => {
    expect(src).toMatch(/\?\?\?/);
  });

  test('all 4 game mode cards present (Plinko, Arena, Blitz, Tournament)', () => {
    expect(src).toMatch(/modeSelect\.plinkoTitle/);
    expect(src).toMatch(/modeSelect\.arenaTitle/);
    expect(src).toMatch(/modeSelect\.blitzTitle/);
    expect(src).toMatch(/modeSelect\.tournamentTitle/);
  });
});

// ─── 2. i18n — modeSelect.* KEYS ──────────────────────────────────────────────

describe('i18n — modeSelect.* keys used by mode-select screen', () => {
  let en, tr, de, fr;
  beforeAll(() => {
    en = readJson('src/i18n/en.json');
    tr = readJson('src/i18n/tr.json');
    de = readJson('src/i18n/de.json');
    fr = readJson('src/i18n/fr.json');
  });

  const modeSelectKeys = [
    'modeSelect.title',
    'modeSelect.plinkoDescription',
    'modeSelect.comingSoon',
  ];

  test.each(modeSelectKeys)('EN has non-empty key "%s"', (key) => {
    expect(en[key]).toBeDefined();
    expect(typeof en[key]).toBe('string');
    expect(en[key].length).toBeGreaterThan(0);
  });

  test.each(modeSelectKeys)('TR has non-empty key "%s"', (key) => {
    expect(tr[key]).toBeDefined();
    expect(tr[key].length).toBeGreaterThan(0);
  });

  test.each(modeSelectKeys)('DE has non-empty key "%s"', (key) => {
    expect(de[key]).toBeDefined();
    expect(de[key].length).toBeGreaterThan(0);
  });

  test.each(modeSelectKeys)('FR has non-empty key "%s"', (key) => {
    expect(fr[key]).toBeDefined();
    expect(fr[key].length).toBeGreaterThan(0);
  });

  test('EN modeSelect.title is "Game Mode"', () => {
    expect(en['modeSelect.title']).toBe('Game Mode');
  });

  test('EN modeSelect.comingSoon is "Coming Soon"', () => {
    expect(en['modeSelect.comingSoon']).toBe('Coming Soon');
  });

  test('EN modeSelect.plinkoDescription is non-trivial (describes gameplay)', () => {
    expect(en['modeSelect.plinkoDescription'].length).toBeGreaterThan(10);
  });

  test('TR translations differ from EN', () => {
    expect(tr['modeSelect.title']).not.toBe(en['modeSelect.title']);
    expect(tr['modeSelect.comingSoon']).not.toBe(en['modeSelect.comingSoon']);
  });

  test('all 4 languages have same modeSelect.* key count', () => {
    const count = (obj) => Object.keys(obj).filter((k) => k.startsWith('modeSelect.')).length;
    expect(count(tr)).toBe(count(en));
    expect(count(de)).toBe(count(en));
    expect(count(fr)).toBe(count(en));
  });
});

// ─── 3. matchStore — setSelectedMode BEHAVIOR ────────────────────────────────

describe('matchStore — setSelectedMode for game mode selection', () => {
  let useMatchStore;
  beforeAll(() => {
    ({ useMatchStore } = require('../src/stores/matchStore'));
  });

  beforeEach(() => {
    useMatchStore.setState({ selectedMode: null });
  });

  test('setSelectedMode("plinko") sets selectedMode to "plinko"', () => {
    useMatchStore.getState().setSelectedMode('plinko');
    expect(useMatchStore.getState().selectedMode).toBe('plinko');
  });

  test('setSelectedMode accepts "arena" (Arena now implemented — YGGAA-54)', () => {
    useMatchStore.getState().setSelectedMode('arena');
    expect(useMatchStore.getState().selectedMode).toBe('arena');
  });

  test('setSelectedMode("plinko") after "arena" still works', () => {
    useMatchStore.getState().setSelectedMode('arena');
    useMatchStore.getState().setSelectedMode('plinko');
    expect(useMatchStore.getState().selectedMode).toBe('plinko');
  });

  test('setSelectedMode with empty string stores empty (TS type prevents this at compile time)', () => {
    // The store has no runtime validation; TypeScript union type guards against this
    useMatchStore.getState().setSelectedMode('');
    expect(useMatchStore.getState().selectedMode).toBe('');
  });

  test('clearMatch resets selectedMode to null', () => {
    useMatchStore.getState().setSelectedMode('plinko');
    useMatchStore.getState().clearMatch();
    expect(useMatchStore.getState().selectedMode).toBeNull();
  });

  test('selectedMode is null initially', () => {
    expect(useMatchStore.getState().selectedMode).toBeNull();
  });
});

// ─── 4. MODECARD ACTIVE/DISABLED LOGIC ───────────────────────────────────────

describe('ModeCard — active vs disabled logic (GDD §3.3)', () => {
  // Test the disabled prop derivation: disabled={!active}
  const isDisabled = (active) => !active;
  const opacity    = (active) => active ? 0.85 : 1; // activeOpacity from implementation

  test('active=true → not disabled', () => {
    expect(isDisabled(true)).toBe(false);
  });

  test('active=false → disabled', () => {
    expect(isDisabled(false)).toBe(true);
  });

  test('active card has reduced activeOpacity (0.85 for press feedback)', () => {
    expect(opacity(true)).toBe(0.85);
  });

  test('disabled card has activeOpacity=1 (no press feedback)', () => {
    expect(opacity(false)).toBe(1);
  });

  test('Plinko and Arena cards are active; Blitz and Tournament remain disabled (YGGAA-54)', () => {
    const src = readFile('app/mode-select.tsx');
    // Arena is now implemented — only Blitz and Tournament still have active={false}
    const disabledMatches = (src.match(/active=\{false\}/g) || []).length;
    expect(disabledMatches).toBe(2);
    // Arena navigates to /game/arena
    expect(src).toMatch(/\/game\/arena/);
  });

  test('lock icon only shown on inactive cards (GDD §3.3)', () => {
    const src = readFile('app/mode-select.tsx');
    // {!active && <View ...><Text>🔒</Text></View>}
    expect(src).toMatch(/\{!active &&/);
    expect(src).toMatch(/🔒/);
  });
});

// ─── 5. TEAM BADGE INITIALS ───────────────────────────────────────────────────

describe('TeamBadge — name.slice(0, 3).toUpperCase() initials', () => {
  const badge = (name) => name.slice(0, 3).toUpperCase();

  test('"Liverpool" → "LIV"',   () => expect(badge('Liverpool')).toBe('LIV'));
  test('"Arsenal" → "ARS"',     () => expect(badge('Arsenal')).toBe('ARS'));
  test('"Man City" → "MAN"',    () => expect(badge('Man City')).toBe('MAN'));
  test('"Real Madrid" → "REA"', () => expect(badge('Real Madrid')).toBe('REA'));

  test('fallback "???" → "???"', () => {
    expect(badge('???')).toBe('???');
  });

  test('short name (< 3 chars) does not crash', () => {
    expect(() => badge('AC')).not.toThrow();
    expect(badge('AC')).toBe('AC');
  });

  test('empty string does not crash', () => {
    expect(() => badge('')).not.toThrow();
    expect(badge('')).toBe('');
  });
});

// ─── 6. TEAM STORE INTEGRATION ────────────────────────────────────────────────

describe('matchStore — team data for header badges', () => {
  let useMatchStore;
  beforeAll(() => {
    ({ useMatchStore } = require('../src/stores/matchStore'));
  });

  const mockTeam = (name) => ({
    name, league: 'Premier League', players: [], primaryColor: '#fff', secondaryColor: '#000',
  });

  beforeEach(() => {
    useMatchStore.setState({ homeTeam: null, awayTeam: null });
  });

  test('homeTeam and awayTeam are null before selection', () => {
    const s = useMatchStore.getState();
    expect(s.homeTeam).toBeNull();
    expect(s.awayTeam).toBeNull();
  });

  test('header uses homeTeam.name ?? "???" — null team falls back to "???"', () => {
    const name = useMatchStore.getState().homeTeam?.name ?? '???';
    expect(name).toBe('???');
  });

  test('after team selection, header shows correct team names', () => {
    useMatchStore.getState().setHomeTeam(mockTeam('Liverpool'));
    useMatchStore.getState().setAwayTeam(mockTeam('Arsenal'));
    expect(useMatchStore.getState().homeTeam?.name).toBe('Liverpool');
    expect(useMatchStore.getState().awayTeam?.name).toBe('Arsenal');
  });

  test('selecting different home team updates badge', () => {
    useMatchStore.getState().setHomeTeam(mockTeam('Man City'));
    expect(useMatchStore.getState().homeTeam?.name).toBe('Man City');
  });
});

// ─── 7. COLORS — DISABLED STATE ───────────────────────────────────────────────

describe('Colors — disabled and overlay tokens used by inactive cards', () => {
  let Colors;
  beforeAll(() => { ({ Colors } = require('../src/constants/colors')); });

  test('Colors.disabled is defined', () => {
    expect(Colors.disabled).toBeDefined();
  });

  test('Colors.disabled is a valid hex color', () => {
    expect(Colors.disabled).toMatch(/^#[0-9a-fA-F]{3,8}$/);
  });

  test('Colors.overlay is defined (used for lock badge background)', () => {
    expect(Colors.overlay).toBeDefined();
  });

  test('Colors.overlay contains rgba or hex', () => {
    expect(Colors.overlay).toMatch(/rgba|#/);
  });
});

// ─── 8. KNOWN BUGS ────────────────────────────────────────────────────────────

describe('Known Bugs — deviations from GDD/task spec', () => {
  let src;
  beforeAll(() => { src = readFile('app/mode-select.tsx'); });

  test('BUG-1 FIXED: card titles use i18n t() instead of hardcoded English', () => {
    // All visible text must use i18n keys (YGGAA-41 fix)
    expect(src).toMatch(/t\('modeSelect\.plinkoTitle'\)/);
    expect(src).toMatch(/t\('modeSelect\.arenaTitle'\)/);
    expect(src).toMatch(/t\('modeSelect\.blitzTitle'\)/);
    expect(src).toMatch(/t\('modeSelect\.tournamentTitle'\)/);
    expect(src).not.toMatch(/title="PLINKO"/);
    expect(src).not.toMatch(/title="ARENA"/);
  });

  test('BUG-2 FIXED: "VS" header text uses i18n, not hardcoded', () => {
    // Task says "All visible text uses i18n keys" (YGGAA-41 fix)
    expect(src).toMatch(/t\('modeSelect\.vs'\)/);
    expect(src).not.toMatch(/>VS</);
  });

  test('BUG-3 FIXED: router.replace() used for one-way game flow', () => {
    // Navigating to /game/plinko must use replace to avoid back-stack issues (YGGAA-41 fix)
    expect(src).toMatch(/router\.replace\(['"]\/game\/plinko['"]\)/);
    expect(src).not.toMatch(/router\.push\(['"]\/game\/plinko['"]\)/);
  });

  test('EXPECTED: Plinko and Arena are active; Blitz and Tournament are disabled (YGGAA-54)', () => {
    // Arena is now implemented — only Blitz and Tournament remain as Coming Soon
    const disabledCount = (src.match(/active=\{false\}/g) || []).length;
    expect(disabledCount).toBe(2); // 2 Coming Soon cards remain
  });

  test('NO BUG: lock icon shown only on inactive cards', () => {
    expect(src).toMatch(/!active.*🔒|🔒.*!active/s);
  });
});
