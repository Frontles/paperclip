using UnityEngine;

namespace ProjectF.Config
{
    public enum AIDifficulty { Easy, Normal, Hard }

    /// <summary>
    /// Tuning parameters for one AI difficulty level.
    /// All values are read by AIController — never hardcoded.
    /// </summary>
    [CreateAssetMenu(menuName = "ProjectF/Config/AIDifficultyConfig", fileName = "AIDifficultyConfig_Normal")]
    public class AIDifficultyConfig : ScriptableObject
    {
        [Header("Identity")]
        public AIDifficulty Difficulty = AIDifficulty.Normal;

        [Header("Accuracy (0–1)")]
        [Tooltip("Probability of a successful pass (GDD: Easy=0.6, Normal=0.75, Hard=0.85).")]
        [Range(0f, 1f)] public float PassAccuracy = 0.75f;

        [Tooltip("Probability of a shot on target (GDD: Easy=0.4, Normal=0.55, Hard=0.70).")]
        [Range(0f, 1f)] public float ShotAccuracy = 0.55f;

        [Tooltip("Probability of a successful tackle (GDD: Easy=late, Normal=medium, Hard=good).")]
        [Range(0f, 1f)] public float TackleSuccess = 0.50f;

        [Header("Reaction")]
        [Tooltip("Time (seconds) before the AI acts on a new state. Easy=0.5s, Normal=0.25s, Hard=0.1s.")]
        public float ReactionDelay = 0.25f;

        [Header("Positioning")]
        [Tooltip("How far ahead (towards opponent goal) the AI tries to position when attacking.")]
        public float AttackingPositionOffset = 8f;

        [Tooltip("How aggressively the AI defends — higher = closer pressing.")]
        [Range(0f, 1f)] public float DefensiveAggressiveness = 0.5f;

        [Header("Shooting")]
        [Tooltip("Distance from goal within which the AI will attempt a shot.")]
        public float ShootingRange = 14f;

        [Tooltip("Min shot charge time (seconds) before release.")]
        public float MinShotChargeTime = 0.3f;

        [Tooltip("Max shot charge time (seconds).")]
        public float MaxShotChargeTime = 0.9f;

        [Header("Passing")]
        [Tooltip("Distance within which the AI prefers a short pass over a long pass.")]
        public float ShortPassPreferenceRange = 10f;

        // ── Factory presets ───────────────────────────────────────────────────────

        /// <summary>Return a runtime config with GDD Easy values (no asset required).</summary>
        public static AIDifficultyConfig Easy()
        {
            var c = CreateInstance<AIDifficultyConfig>();
            c.Difficulty             = AIDifficulty.Easy;
            c.PassAccuracy           = 0.60f;
            c.ShotAccuracy           = 0.40f;
            c.TackleSuccess          = 0.35f;
            c.ReactionDelay          = 0.50f;
            c.AttackingPositionOffset= 6f;
            c.DefensiveAggressiveness= 0.3f;
            c.ShootingRange          = 10f;
            c.MinShotChargeTime      = 0.6f;
            c.MaxShotChargeTime      = 1.2f;
            c.ShortPassPreferenceRange= 8f;
            return c;
        }

        public static AIDifficultyConfig Normal()
        {
            var c = CreateInstance<AIDifficultyConfig>();
            c.Difficulty             = AIDifficulty.Normal;
            c.PassAccuracy           = 0.75f;
            c.ShotAccuracy           = 0.55f;
            c.TackleSuccess          = 0.50f;
            c.ReactionDelay          = 0.25f;
            c.AttackingPositionOffset= 8f;
            c.DefensiveAggressiveness= 0.5f;
            c.ShootingRange          = 14f;
            c.MinShotChargeTime      = 0.3f;
            c.MaxShotChargeTime      = 0.9f;
            c.ShortPassPreferenceRange= 10f;
            return c;
        }

        public static AIDifficultyConfig Hard()
        {
            var c = CreateInstance<AIDifficultyConfig>();
            c.Difficulty             = AIDifficulty.Hard;
            c.PassAccuracy           = 0.85f;
            c.ShotAccuracy           = 0.70f;
            c.TackleSuccess          = 0.70f;
            c.ReactionDelay          = 0.10f;
            c.AttackingPositionOffset= 10f;
            c.DefensiveAggressiveness= 0.75f;
            c.ShootingRange          = 16f;
            c.MinShotChargeTime      = 0.2f;
            c.MaxShotChargeTime      = 0.6f;
            c.ShortPassPreferenceRange= 12f;
            return c;
        }
    }
}
