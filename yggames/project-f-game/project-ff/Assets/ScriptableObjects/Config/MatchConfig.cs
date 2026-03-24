using UnityEngine;

namespace ProjectF.Config
{
    [CreateAssetMenu(menuName = "ProjectF/Config/MatchConfig", fileName = "MatchConfig")]
    public class MatchConfig : ScriptableObject
    {
        [Header("Teams")]
        [Tooltip("Number of players per team (default 3 for 3v3).")]
        public int teamSize = 3;

        [Header("Field")]
        [Tooltip("Field width in meters.")]
        public float fieldWidth = 40f;
        [Tooltip("Field height (depth) in meters.")]
        public float fieldHeight = 25f;

        [Header("Time")]
        [Tooltip("Duration of each half in seconds.")]
        public float halfDuration = 120f;
        [Tooltip("Halftime break duration in seconds.")]
        public float halftimeBreak = 10f;

        [Header("Abilities")]
        [Tooltip("Maximum number of ability uses per player per match.")]
        public int maxAbilityUsesPerPlayer = 2;

        [Header("Physics")]
        [Tooltip("Ball gravity scale multiplier.")]
        public float ballGravityScale = 1f;
        [Tooltip("Ball friction / drag when rolling.")]
        public float ballLinearDrag = 0.5f;

        [Header("Gameplay")]
        [Tooltip("Sprint speed multiplier over base speed.")]
        public float sprintMultiplier = 1.3f;
        [Tooltip("Stamina drain rate per second while sprinting. GDD: 15/s.")]
        public float staminaDrainRate = 15f;
        [Tooltip("Stamina recovery rate per second while not sprinting. GDD: 5/s.")]
        public float staminaRecoveryRate = 5f;
        [Tooltip("Maximum stamina value.")]
        public float maxStamina = 100f;
    }
}
