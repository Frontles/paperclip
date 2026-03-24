using UnityEngine;
using ProjectF.Config;
using ProjectF.Match;

namespace ProjectF.Ability
{
    /// <summary>
    /// Manages one player's ability: charge, activation, duration, cooldown, and use counting.
    /// Attach alongside PlayerController. Set AbilityData to the card's assigned ability.
    ///
    /// MVP abilities:
    ///   Power Shot  — shot power/accuracy +50% for one shot (Fire/Offensive, 15s cooldown)
    ///   Iron Wall   — DEF/PHY +40%, tackle success 80% for 3 seconds (Ice/Defensive, 15s cooldown)
    /// </summary>
    public class AbilitySystem : MonoBehaviour
    {
        [Tooltip("The ability assigned to this player. Null = no ability slot.")]
        [SerializeField] private AbilityData _abilityData;

        [Tooltip("Match config for maxAbilityUsesPerPlayer.")]
        [SerializeField] private MatchConfig _matchConfig;

        // ── Runtime state ─────────────────────────────────────────────────────────
        public bool IsCharged   => _chargeProgress >= 1f;
        public bool IsActive    => _activeTimer > 0f;
        public bool IsOnCooldown => _cooldownTimer > 0f;
        public int  UsesRemaining { get; private set; }

        /// <summary>Charge progress 0–1. Drives UI ability bar.</summary>
        public float ChargeProgress => _chargeProgress;

        /// <summary>Active multipliers applied to this player's stats this frame.</summary>
        public float ShotMultiplier     { get; private set; } = 1f;
        public float DefenseMultiplier  { get; private set; } = 1f;
        public float PhysicalMultiplier { get; private set; } = 1f;
        public float TackleSuccessBonus { get; private set; } = 0f;

        private float _chargeProgress;
        private float _activeTimer;
        private float _cooldownTimer;

        // ── Unity lifecycle ───────────────────────────────────────────────────────

        private void Awake()
        {
            UsesRemaining = _matchConfig != null
                ? _matchConfig.maxAbilityUsesPerPlayer
                : 2; // GDD default
        }

        private void OnEnable()
        {
            GameEvents.OnMatchStarted += ResetForMatch;
            GameEvents.OnGoalScored   += OnGoalScored;
        }

        private void OnDisable()
        {
            GameEvents.OnMatchStarted -= ResetForMatch;
            GameEvents.OnGoalScored   -= OnGoalScored;
        }

        private void Update()
        {
            if (_abilityData == null) return;

            TickCharge();
            TickActive();
            TickCooldown();
        }

        // ── Public API ────────────────────────────────────────────────────────────

        /// <summary>Attempt to activate the ability. Returns true if successfully activated.</summary>
        public bool TryActivate()
        {
            if (_abilityData == null)   return false;
            if (!IsCharged)             return false;
            if (IsOnCooldown)           return false;
            if (UsesRemaining <= 0)     return false;

            Activate();
            return true;
        }

        // ── Private ───────────────────────────────────────────────────────────────

        private void Activate()
        {
            _chargeProgress = 0f;
            _activeTimer    = _abilityData.Duration > 0f ? _abilityData.Duration : 0.1f;
            _cooldownTimer  = _abilityData.Cooldown;
            UsesRemaining--;

            ApplyModifiers();

            GameEvents.RaiseAbilityActivated(new Match.PlayerEventData(
                GetComponent<Player.PlayerController>()?.PlayerId ?? string.Empty,
                GetComponent<Player.PlayerController>()?.TeamIndex ?? 0,
                transform.position));

            // Spawn VFX
            if (_abilityData.ActivationVFX != null)
            {
                var vfx = Instantiate(_abilityData.ActivationVFX, transform.position, Quaternion.identity);
                Destroy(vfx, Mathf.Max(_abilityData.Duration, 2f));
            }
        }

        private void ApplyModifiers()
        {
            ShotMultiplier     = _abilityData.ShotMultiplier;
            DefenseMultiplier  = _abilityData.DefenseMultiplier;
            PhysicalMultiplier = _abilityData.PhysicalMultiplier;
            TackleSuccessBonus = _abilityData.TackleSuccessOverride;
        }

        private void ClearModifiers()
        {
            ShotMultiplier     = 1f;
            DefenseMultiplier  = 1f;
            PhysicalMultiplier = 1f;
            TackleSuccessBonus = 0f;
        }

        private void TickCharge()
        {
            if (IsCharged || IsOnCooldown) return;
            _chargeProgress += Time.deltaTime / _abilityData.PassiveChargeTime;
            _chargeProgress  = Mathf.Clamp01(_chargeProgress);
        }

        private void TickActive()
        {
            if (!IsActive) return;
            _activeTimer -= Time.deltaTime;
            if (_activeTimer <= 0f)
            {
                _activeTimer = 0f;
                ClearModifiers();
            }
        }

        private void TickCooldown()
        {
            if (!IsOnCooldown) return;
            _cooldownTimer -= Time.deltaTime;
            if (_cooldownTimer < 0f) _cooldownTimer = 0f;
        }

        private void ResetForMatch()
        {
            _chargeProgress = 0f;
            _activeTimer    = 0f;
            _cooldownTimer  = 0f;
            ClearModifiers();
            UsesRemaining = _matchConfig != null ? _matchConfig.maxAbilityUsesPerPlayer : 2;
        }

        private void OnGoalScored(Match.GoalData _)
        {
            // GDD: goal → instant ability charge
            _chargeProgress = 1f;
        }
    }
}
