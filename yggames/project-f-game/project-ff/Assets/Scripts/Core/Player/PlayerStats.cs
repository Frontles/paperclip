using UnityEngine;

namespace ProjectF.Player
{
    /// <summary>
    /// Runtime stats for a single player. Populated from card data at match start.
    /// All stats are 0–100. GK role reinterprets some stats (see GDD 3.4).
    /// </summary>
    [System.Serializable]
    public class PlayerStats
    {
        [Tooltip("Pace — running speed, sprint speed, acceleration.")]
        [Range(0, 100)] public float PAC = 60f;

        [Tooltip("Shooting — shot power, accuracy, finishing.")]
        [Range(0, 100)] public float SHO = 60f;

        [Tooltip("Passing — pass accuracy, distance, vision.")]
        [Range(0, 100)] public float PAS = 60f;

        [Tooltip("Dribbling — ball control, first touch.")]
        [Range(0, 100)] public float DRI = 60f;

        [Tooltip("Defense — tackle success, positioning, interception.")]
        [Range(0, 100)] public float DEF = 60f;

        [Tooltip("Physical — stamina capacity, strength, endurance.")]
        [Range(0, 100)] public float PHY = 60f;

        /// <summary>Base run speed derived from PAC (maps 40–90 → 3–7 m/s).</summary>
        public float BaseSpeed => Mathf.Lerp(3f, 7f, (PAC - 40f) / 50f);

        /// <summary>Pass accuracy as 0–1 probability (maps PAS 40–90 → 0.5–0.95).</summary>
        public float PassAccuracy => Mathf.Lerp(0.5f, 0.95f, (PAS - 40f) / 50f);

        /// <summary>Shoot power multiplier (maps SHO 40–90 → 0.6–1.0).</summary>
        public float ShootPower => Mathf.Lerp(0.6f, 1.0f, (SHO - 40f) / 50f);

        /// <summary>Tackle success probability (maps DEF 40–90 → 0.4–0.85).</summary>
        public float TackleSuccess => Mathf.Lerp(0.4f, 0.85f, (DEF - 40f) / 50f);

        /// <summary>Max stamina scale from PHY (maps PHY 40–90 → 80–120).</summary>
        public float MaxStaminaMultiplier => Mathf.Lerp(0.8f, 1.2f, (PHY - 40f) / 50f);
    }
}
