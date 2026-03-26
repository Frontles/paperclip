export const GameConfig = {
  // Match
  matchDurationSeconds: 90,
  extraTimeMinSeconds: 1,
  extraTimeMaxSeconds: 5,

  // Plinko
  ballCount: 2,
  ballRadius: 18,
  pegRadius: 7,
  pegRows: 7,
  pegCols: 7,
  goalWidthPercent: 0.33,
  dropZoneTop: 77,
  dropZoneRadiusFraction: 0.2,
  dropZoneGapBalls: 1.5, // opening width in ball diameters
  postWidth: 4,
  gravity: 0.18,
  bounceDamping: 0.55,
  ballBounceRandomness: 0.15,

  // Events
  redCardCheckMinutes: [15, 30, 45, 60, 75] as number[],
  redCardProbability: 0.05,
  yellowCardCheckMinutes: [10, 20, 30, 40, 50, 60, 70, 80] as number[],
  yellowCardProbability: 0.12,
  yellowCardRepeatWeight: 0.5, // sarı kartlı oyuncunun tekrar seçilme ağırlığı (yarıya düşer)

  // Toasts
  toastDurationMs: 2000,

  // Position Multipliers (for goal assignment)
  positionWeights: {
    FWD: 3.0,
    MID: 1.5,
    DEF: 0.5,
    GK: 0.05,
  },
} as const;
