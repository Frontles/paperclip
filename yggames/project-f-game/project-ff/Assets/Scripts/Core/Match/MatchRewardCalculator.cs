using UnityEngine;
using ProjectF.Config;

namespace ProjectF.Match
{
    /// <summary>
    /// Calculates XP and coin rewards at the end of a match.
    /// Values are read from EconomyConfig — no magic numbers.
    /// Raises rewards through an event so the Economy system can apply them.
    /// </summary>
    public class MatchRewardCalculator : MonoBehaviour
    {
        [Tooltip("Economy config with coin/XP reward values.")]
        [SerializeField] private EconomyConfig _economyConfig;

        [Tooltip("Match stats tracker to read goals scored by the player's team.")]
        [SerializeField] private MatchStatsTracker _statsTracker;

        public static event System.Action<MatchRewards> OnRewardsCalculated;

        // ── Unity lifecycle ───────────────────────────────────────────────────────

        private void OnEnable()
        {
            GameEvents.OnMatchEnded += HandleMatchEnded;
        }

        private void OnDisable()
        {
            GameEvents.OnMatchEnded -= HandleMatchEnded;
        }

        // ── Handler ───────────────────────────────────────────────────────────────

        private void HandleMatchEnded(MatchResult result)
        {
            if (_economyConfig == null)
            {
#if UNITY_EDITOR
                Debug.LogWarning("[MatchRewardCalculator] EconomyConfig not assigned.");
#endif
                return;
            }

            // Human player is always team 0
            bool   won      = result.WinnerTeam == 0;
            bool   draw     = result.WinnerTeam == -1;
            int    xp       = won ? _economyConfig.xpPerWin : draw ? (_economyConfig.xpPerWin + _economyConfig.xpPerLoss) / 2 : _economyConfig.xpPerLoss;
            int    coins    = won ? _economyConfig.coinsPerWin : draw ? _economyConfig.coinsDraw : _economyConfig.coinsPerLoss;

            // Bonus XP per goal (capped at 3 per GDD)
            int playerGoals = CountPlayerGoals();
            int goalBonus   = Mathf.Min(playerGoals, 3) * _economyConfig.xpPerGoal;
            xp += goalBonus;

            string mvpId = _statsTracker != null ? _statsTracker.GetMVPPlayerId() : string.Empty;

            var rewards = new MatchRewards(xp, coins, won, draw, goalBonus, mvpId);
            OnRewardsCalculated?.Invoke(rewards);

#if UNITY_EDITOR
            Debug.Log($"[MatchRewardCalculator] Rewards — XP:{xp} Coins:{coins} MVP:{mvpId}");
#endif
        }

        private int CountPlayerGoals()
        {
            if (_statsTracker == null) return 0;
            int total = 0;
            foreach (var kv in _statsTracker.Stats)
                total += kv.Value.Goals;
            return total;
        }
    }

    /// <summary>Reward payload passed via OnRewardsCalculated event.</summary>
    public readonly struct MatchRewards
    {
        public readonly int    XP;
        public readonly int    Coins;
        public readonly bool   Won;
        public readonly bool   Draw;
        public readonly int    GoalBonusXP;
        public readonly string MVPPlayerId;

        public MatchRewards(int xp, int coins, bool won, bool draw, int goalBonusXP, string mvpPlayerId)
        {
            XP          = xp;
            Coins       = coins;
            Won         = won;
            Draw        = draw;
            GoalBonusXP = goalBonusXP;
            MVPPlayerId = mvpPlayerId;
        }
    }
}
