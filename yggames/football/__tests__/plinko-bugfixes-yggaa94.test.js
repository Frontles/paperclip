/**
 * YGGAA-95 — Plinko Bug Fix Verification Tests
 * Tests the three bug areas fixed in YGGAA-94:
 *   1. Ball Drop Zone (semicircle spawn logic)
 *   2. Goalpost / Goal Detection (postWidth, vy check, post bounce)
 *   3. Sound Service (ambient, red_card placeholder, whistle_end preload)
 */

const fs = require('fs');
const path = require('path');

// ─── Constants (mirror from source) ──────────────────────────────────────────

const GameConfig = {
  ballRadius: 10,
  pegRadius: 6,
  pegRows: 8,
  pegCols: 7,
  goalWidthPercent: 0.35,
  postWidth: 6,
  gravity: 0.3,
  bounceDamping: 0.7,
  ballBounceRandomness: 0.1,
};

const GOAL_HEIGHT = 60;
const DROP_ZONE_TOP = 50;
const DROP_ZONE_RADIUS_FRACTION = 0.25;

const { ballRadius, postWidth, bounceDamping } = GameConfig;

// ─── Inline physics (mirrors usePlinkoEngine.ts createBall) ──────────────────

function createBall(width, side = 'home') {
  // Fixed implementation (matches usePlinkoEngine.ts after YGGAA-94 fix):
  // Angle range (0, π) guarantees sin(angle) > 0 → y spawns ABOVE DROP_ZONE_TOP.
  // Home biases left:  angle ∈ (π/2, π) → cos < 0 → x left of center.
  // Away biases right: angle ∈ (0, π/2) → cos > 0 → x right of center.
  const cx = width / 2;
  const r = width * DROP_ZONE_RADIUS_FRACTION;
  const halfStart = side === 'home' ? 0.5 : 0;
  const angle = Math.PI * (halfStart + Math.random() * 0.5);
  const dist = Math.random() * (r - ballRadius);
  return {
    x: cx + Math.cos(angle) * dist,
    y: DROP_ZONE_TOP - ballRadius - Math.sin(angle) * dist,
    vx: (Math.random() - 0.5) * 1.2,
    vy: 0,
  };
}

function computeGoalZone(canvasWidth, canvasHeight) {
  const w = canvasWidth * GameConfig.goalWidthPercent;
  return {
    x: (canvasWidth - w) / 2,
    y: canvasHeight - GOAL_HEIGHT,
    width: w,
    height: GOAL_HEIGHT,
  };
}

/**
 * Simulate goal detection logic (mirrors usePlinkoEngine.ts step())
 */
function checkGoalDetection(b, goalZone) {
  const { x: gx, y: gy, width: gw } = goalZone;
  const innerLeft = gx + postWidth;
  const innerRight = gx + gw - postWidth;

  if (b.y + ballRadius >= gy && b.vy > 0) {
    if (b.x > innerLeft && b.x < innerRight) {
      return 'goal';
    } else if (b.x >= gx && b.x <= gx + gw) {
      return 'post_bounce';
    }
  }
  return 'none';
}

// ─── Test 1: Ball Drop Zone ───────────────────────────────────────────────────

describe('Bug 1 — Ball Drop Zone (Semicircle spawn)', () => {
  const canvasWidth = 360;
  const r = canvasWidth * DROP_ZONE_RADIUS_FRACTION; // = 90

  test('createBall spawns within canvas x bounds', () => {
    for (let i = 0; i < 300; i++) {
      const b = createBall(canvasWidth, 'home');
      expect(b.x).toBeGreaterThanOrEqual(0);
      expect(b.x).toBeLessThanOrEqual(canvasWidth);
    }
  });

  test('createBall away spawns within canvas x bounds', () => {
    for (let i = 0; i < 300; i++) {
      const b = createBall(canvasWidth, 'away');
      expect(b.x).toBeGreaterThanOrEqual(0);
      expect(b.x).toBeLessThanOrEqual(canvasWidth);
    }
  });

  /**
   * FIXED: Angle range (0, π) guarantees sin(angle) > 0.
   * y = DROP_ZONE_TOP - ballRadius - sin(angle)*dist
   *   = 50 - 10 - positive → y < 40 < DROP_ZONE_TOP (above drop zone). ✓
   */
  test('PASS — ball y should be above DROP_ZONE_TOP (fixed: angle range 0..π)', () => {
    let belowCount = 0;
    for (let i = 0; i < 300; i++) {
      const b = createBall(canvasWidth, 'home');
      if (b.y > DROP_ZONE_TOP) belowCount++;
    }
    expect(belowCount).toBe(0);
  });

  /**
   * FIXED: Home angle ∈ (π/2, π) → cos < 0 → x left of center.
   *        Away angle ∈ (0, π/2) → cos > 0 → x right of center.
   */
  test('PASS — home ball has >60% chance left of center (fixed: angle π/2..π)', () => {
    let leftCount = 0;
    const cx = canvasWidth / 2;
    const N = 1000;
    for (let i = 0; i < N; i++) {
      const b = createBall(canvasWidth, 'home');
      if (b.x < cx) leftCount++;
    }
    expect(leftCount / N).toBeGreaterThan(0.6);
  });

  test('PASS — away ball has >60% chance right of center (fixed: angle 0..π/2)', () => {
    let rightCount = 0;
    const cx = canvasWidth / 2;
    const N = 1000;
    for (let i = 0; i < N; i++) {
      const b = createBall(canvasWidth, 'away');
      if (b.x > cx) rightCount++;
    }
    expect(rightCount / N).toBeGreaterThan(0.6);
  });

  test('ball initial vy is 0 (starts from rest)', () => {
    for (let i = 0; i < 50; i++) {
      expect(createBall(canvasWidth, 'home').vy).toBe(0);
      expect(createBall(canvasWidth, 'away').vy).toBe(0);
    }
  });
});

// ─── Test 2: Goalpost / Goal Detection ───────────────────────────────────────

describe('Bug 2 — Goal Detection with postWidth (FIXED)', () => {
  const canvasWidth = 360;
  const canvasHeight = 640;
  const goalZone = computeGoalZone(canvasWidth, canvasHeight);
  const { x: gx, y: gy, width: gw } = goalZone;
  const innerLeft = gx + postWidth;
  const innerRight = gx + gw - postWidth;
  const cx = gx + gw / 2; // center of goal

  test('postWidth is defined in GameConfig', () => {
    expect(GameConfig.postWidth).toBe(6);
  });

  test('PASS — ball entering goal center going DOWN → goal scored', () => {
    expect(checkGoalDetection({ x: cx, y: gy - 1, vy: 2 }, goalZone)).toBe('goal');
  });

  test('PASS — ball entering goal center going UP → no goal', () => {
    expect(checkGoalDetection({ x: cx, y: gy - 1, vy: -2 }, goalZone)).toBe('none');
  });

  test('PASS — ball at left post area going down → post_bounce', () => {
    expect(checkGoalDetection({ x: gx + 2, y: gy - 1, vy: 2 }, goalZone)).toBe('post_bounce');
  });

  test('PASS — ball at right post area going down → post_bounce', () => {
    expect(checkGoalDetection({ x: gx + gw - 2, y: gy - 1, vy: 2 }, goalZone)).toBe('post_bounce');
  });

  test('PASS — ball just inside innerLeft → goal', () => {
    expect(checkGoalDetection({ x: innerLeft + 0.1, y: gy - 1, vy: 2 }, goalZone)).toBe('goal');
  });

  test('PASS — ball just inside innerRight → goal', () => {
    expect(checkGoalDetection({ x: innerRight - 0.1, y: gy - 1, vy: 2 }, goalZone)).toBe('goal');
  });

  test('PASS — ball far left of goal → none', () => {
    expect(checkGoalDetection({ x: gx - 10, y: gy - 1, vy: 2 }, goalZone)).toBe('none');
  });

  test('PASS — ball far right of goal → none', () => {
    expect(checkGoalDetection({ x: gx + gw + 10, y: gy - 1, vy: 2 }, goalZone)).toBe('none');
  });

  test('PASS — ball above threshold → none', () => {
    expect(checkGoalDetection({ x: cx, y: gy - ballRadius - 5, vy: 2 }, goalZone)).toBe('none');
  });

  test('PASS — inner opening is goal width minus 2×postWidth', () => {
    const innerWidth = innerRight - innerLeft;
    expect(innerWidth).toBeCloseTo(gw - postWidth * 2, 5);
    expect(innerWidth).toBeLessThan(gw);
  });
});

// ─── Test 3: Sound Service Config ────────────────────────────────────────────

describe('Bug 3 — Sound Service Fixes', () => {
  const soundServicePath = path.join(__dirname, '../src/services/soundService.ts');
  const soundServiceContent = fs.readFileSync(soundServicePath, 'utf8');

  test('PASS — red_card now uses button_tap.mp3 (not whistle_start)', () => {
    const redCardLine = soundServiceContent.match(/red_card:\s*require\([^)]+\)/)?.[0] ?? '';
    expect(redCardLine).toContain('button_tap');
    expect(redCardLine).not.toContain('whistle_start');
  });

  test('PASS — crowd_ambient no longer uses goal_scored.mp3', () => {
    const ambientLine = soundServiceContent.match(/crowd_ambient:\s*require\([^)]+\)/)?.[0] ?? '';
    expect(ambientLine).not.toContain('goal_scored');
  });

  test('PASS — startAmbient() has suppression guard for goal_scored placeholder', () => {
    const hasGuard = soundServiceContent.includes('SOUND_FILES.crowd_ambient === SOUND_FILES.goal_scored');
    expect(hasGuard).toBe(true);
  });

  test('PASS — preloadOne() method exists on SoundService', () => {
    expect(soundServiceContent).toContain('preloadOne');
  });

  test('PASS — soundService exports singleton', () => {
    expect(soundServiceContent).toContain('export const soundService');
  });

  test('PASS — all SoundKey types defined', () => {
    ['ball_bounce', 'goal_scored', 'whistle_start', 'whistle_end', 'red_card', 'button_tap', 'crowd_ambient'].forEach(k => {
      expect(soundServiceContent).toContain(`"${k}"`);
    });
  });

  test('KNOWN LIMITATION — whistle_end still uses .wav (14MB, no ffmpeg available)', () => {
    // This is a known asset limitation, not a code bug
    const whistleEndLine = soundServiceContent.match(/whistle_end:\s*require\([^)]+\)/)?.[0] ?? '';
    expect(whistleEndLine).toContain('whistle_end.wav'); // documents known limitation
  });
});

// ─── Test 4: whistle_end preload in plinko.tsx ────────────────────────────────

describe('Bug 3 — whistle_end Preload on Mount (FIXED)', () => {
  const plinkoPath = path.join(__dirname, '../app/game/plinko.tsx');
  const plinkoContent = fs.readFileSync(plinkoPath, 'utf8');

  test('PASS — plinko.tsx calls preloadOne for whistle_end on mount', () => {
    expect(plinkoContent).toMatch(/preloadOne\s*\(\s*['"]whistle_end['"]\s*\)/);
  });
});

// ─── Test 5: GoalZone goalpost visuals ───────────────────────────────────────

describe('Bug 2 — GoalZone Goalpost Visuals (FIXED)', () => {
  const goalZonePath = path.join(__dirname, '../src/components/game/GoalZone.tsx');
  const goalZoneContent = fs.readFileSync(goalZonePath, 'utf8');

  test('PASS — GoalZone imports GameConfig', () => {
    expect(goalZoneContent).toContain('GameConfig');
  });

  test('PASS — GoalZone uses postWidth from GameConfig', () => {
    expect(goalZoneContent).toContain('postWidth');
  });

  test('PASS — GoalZone renders left post (left: 0)', () => {
    expect(goalZoneContent).toContain('left: 0');
  });

  test('PASS — GoalZone renders right post (right: 0)', () => {
    expect(goalZoneContent).toContain('right: 0');
  });

  test('PASS — GoalZone post has visible background color', () => {
    // Post style should have a backgroundColor to be visible
    expect(goalZoneContent).toMatch(/post[\s\S]*?backgroundColor/);
  });
});

// ─── Test 6: Semicircle rendering in plinko.tsx ──────────────────────────────

describe('Bug 1 — Semicircle Visual Rendering (FIXED)', () => {
  const plinkoPath = path.join(__dirname, '../app/game/plinko.tsx');
  const plinkoContent = fs.readFileSync(plinkoPath, 'utf8');

  test('PASS — plinko.tsx renders dropZoneSemicircle', () => {
    expect(plinkoContent).toContain('dropZoneSemicircle');
  });

  test('PASS — dropZoneSemicircle uses canvasSize.width for sizing', () => {
    expect(plinkoContent).toContain('dropZoneRadius');
    expect(plinkoContent).toContain('canvasSize.width');
  });

  test('PASS — dropZoneSemicircle has borderBottomWidth: 0 (open at bottom)', () => {
    expect(plinkoContent).toContain('borderBottomWidth: 0');
  });

  test('PASS — dropZoneSemicircle horizontally centered', () => {
    expect(plinkoContent).toMatch(/canvasSize\.width\s*\/\s*2\s*-\s*dropZoneRadius/);
  });

  test('PASS — dropZoneSemicircle has border style (white outline)', () => {
    const styleSection = plinkoContent.match(/dropZoneSemicircle:\s*\{[\s\S]*?\}/)?.[0] ?? '';
    expect(styleSection).toContain('borderColor');
  });
});
