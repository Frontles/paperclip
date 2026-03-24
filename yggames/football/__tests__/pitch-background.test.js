/**
 * YGGAA-49 — Test: Verify football pitch background on Plinko screen
 * Tester: verifies PitchBackground implementation against design spec (YGGAA-47).
 *
 * Design spec source: YGGAA-47 / document: design-spec
 * Implementation:     src/components/game/PitchBackground.tsx
 */

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const SRC = path.join(ROOT, 'src/components/game/PitchBackground.tsx');
const source = fs.readFileSync(SRC, 'utf8');

// ── Helpers ──────────────────────────────────────────────────────────────────

/** Returns true if the source file contains all the given substrings. */
function sourceHas(...patterns) {
  return patterns.every((p) => source.includes(p));
}

// ── 1. Design-token color ─────────────────────────────────────────────────────

describe('PitchBackground — marking color (design spec §4)', () => {
  test('Colors is imported from design tokens', () => {
    // Component must use the shared color token, not a hardcoded value
    expect(source).toMatch(/import.*Colors.*from/);
  });

  test('marking color is Colors.primary (#7dcea0) per design spec', () => {
    // Design spec §4: "All pitch markings use Colors.primary (#7dcea0)"
    // BUG: implementation hardcodes '#4a9e6e' instead of using Colors.primary
    expect(source).toContain('Colors.primary');
    // Also verify the wrong color is NOT present
    expect(source).not.toContain('#4a9e6e');
  });

  test('Colors.primary token value is #7dcea0', () => {
    const { Colors } = require('@/constants/colors');
    expect(Colors.primary).toBe('#7dcea0');
  });
});

// ── 2. Opacity ────────────────────────────────────────────────────────────────

describe('PitchBackground — opacity (design spec §4)', () => {
  test('marking opacity is within spec range 0.12–0.18', () => {
    // Design spec §4: "12-18% opacity, behind everything"
    const match = source.match(/MARKING_OPACITY\s*=\s*([\d.]+)/);
    expect(match).not.toBeNull();
    const opacity = parseFloat(match[1]);
    expect(opacity).toBeGreaterThanOrEqual(0.12);
    expect(opacity).toBeLessThanOrEqual(0.18);
  });

  test('line width is 1.5 per spec', () => {
    // Design spec §5.1 halfway line: height 1.5
    expect(source).toMatch(/LINE_WIDTH\s*=\s*1\.5/);
  });
});

// ── 3. Root container ─────────────────────────────────────────────────────────

describe('PitchBackground — root container (design spec §3)', () => {
  test('root view uses pointerEvents="none" so touches pass through', () => {
    // Design spec §3.1: must not intercept any touch events
    expect(source).toContain('pointerEvents="none"');
  });

  test('root view uses absoluteFillObject to cover full canvas', () => {
    // Design spec §3.1: component fills the entire GameCanvas
    expect(source).toContain('absoluteFillObject');
  });
});

// ── 4. Required pitch markings ────────────────────────────────────────────────

describe('PitchBackground — required pitch markings (design spec §5)', () => {
  test('renders halfway line (§5.1)', () => {
    expect(source).toMatch(/halfwayLine/);
  });

  test('renders center circle with clip container (§5.2)', () => {
    // Design spec §5.2: bottom half of center circle, clipped
    expect(source).toMatch(/centerCircle/);
    expect(source).toContain('overflow: \'hidden\'');
  });

  test('renders penalty area (§5.4)', () => {
    expect(source).toMatch(/penaltyArea/);
  });

  test('renders goal area / 6-yard box (§5.5)', () => {
    expect(source).toMatch(/goalArea/);
  });

  test('renders left touchline / sideline (§5.3)', () => {
    // Design spec §5.3: vertical lines on both sides of the pitch canvas
    // BUG: touchlines are missing from the implementation
    const hasTouchline = source.includes('touchlineLeft') ||
                         source.includes('touchline_left') ||
                         source.includes('touchLeft') ||
                         (source.includes('touchline') && source.includes('Left'));
    expect(hasTouchline).toBe(true);
  });

  test('renders right touchline / sideline (§5.3)', () => {
    // Design spec §5.3: vertical lines on both sides of the pitch canvas
    // BUG: touchlines are missing from the implementation
    const hasTouchline = source.includes('touchlineRight') ||
                         source.includes('touchline_right') ||
                         source.includes('touchRight') ||
                         (source.includes('touchline') && source.includes('Right'));
    expect(hasTouchline).toBe(true);
  });

  test('renders penalty arc (§5.6)', () => {
    // Design spec §5.6: small arc above penalty area top edge, clipped
    // BUG: penalty arc is missing from the implementation
    const hasPenaltyArc = source.includes('penaltyArc') ||
                          source.includes('penalty_arc') ||
                          source.includes('PenaltyArc');
    expect(hasPenaltyArc).toBe(true);
  });

  test('renders penalty spot (§5.7)', () => {
    // Design spec §5.7: small dot representing the penalty spot
    // BUG: penalty spot is missing from the implementation
    const hasPenaltySpot = source.includes('penaltySpot') ||
                           source.includes('penalty_spot') ||
                           source.includes('PenaltySpot');
    expect(hasPenaltySpot).toBe(true);
  });
});

// ── 5. Overlay safety ─────────────────────────────────────────────────────────

describe('PitchBackground — gameplay visibility (design spec §7)', () => {
  test('does not use a solid background fill (would block pegs/balls)', () => {
    // Background fill must be transparent — markings are borders/lines only
    // Penalty area may have a very subtle rgba fill but never a solid opaque color
    expect(source).not.toMatch(/backgroundColor:\s*['"][^'"]*(#[0-9a-fA-F]{6})['"].*penaltyArea/s);
  });

  test('component has no gameplay logic (state, physics, timers)', () => {
    // Visual-only component must not import game stores or hooks
    expect(source).not.toContain('useMatchStore');
    expect(source).not.toContain('usePlinkoEngine');
    expect(source).not.toContain('setTimeout');
    expect(source).not.toContain('setInterval');
  });
});
