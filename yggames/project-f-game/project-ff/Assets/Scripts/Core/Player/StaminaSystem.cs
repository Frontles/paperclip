using UnityEngine;
using ProjectF.Config;

namespace ProjectF.Player
{
    /// <summary>
    /// Manages stamina for one player.
    /// Sprint drains stamina; resting regenerates it.
    /// When depleted: no sprinting and movement slows by 20%.
    /// GDD 3.5: max=100, drain=15/s, regen=5/s (overridden by MatchConfig).
    /// </summary>
    public class StaminaSystem
    {
        private readonly MatchConfig _config;
        private readonly float _maxStaminaMultiplier;

        public float Current   { get; private set; }
        public float Maximum   => _config.maxStamina * _maxStaminaMultiplier;
        public float Ratio     => Current / Maximum;
        public bool  Depleted  => Current <= 0f;

        public StaminaSystem(MatchConfig config, float maxStaminaMultiplier = 1f)
        {
            _config = config;
            _maxStaminaMultiplier = maxStaminaMultiplier;
            Current = Maximum;
        }

        /// <summary>
        /// Call every frame. Pass whether sprint is being held.
        /// Returns true if player is able to sprint this frame.
        /// </summary>
        public bool Tick(bool sprintHeld, float deltaTime)
        {
            if (sprintHeld && !Depleted)
            {
                Current = Mathf.Max(0f, Current - _config.staminaDrainRate * deltaTime);
                return true;
            }
            else
            {
                Current = Mathf.Min(Maximum, Current + _config.staminaRecoveryRate * deltaTime);
                return false;
            }
        }

        public void RestoreFull() => Current = Maximum;
    }
}
