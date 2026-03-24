using UnityEngine;
using ProjectF.Progression;
using ProjectF.Match;

namespace ProjectF.Economy
{
    /// <summary>
    /// Central economy coordinator. Wires CurrencyManager and XPManager together.
    /// Listens to match rewards and applies them automatically.
    /// Attach once in the scene (persistent across scenes).
    /// </summary>
    public class EconomyManager : MonoBehaviour
    {
        public static EconomyManager Instance { get; private set; }

        public CurrencyManager Currency { get; private set; }
        public XPManager       XP       { get; private set; }

        // ── Unity lifecycle ───────────────────────────────────────────────────────

        private void Awake()
        {
            if (Instance != null && Instance != this) { Destroy(gameObject); return; }
            Instance = this;
            DontDestroyOnLoad(gameObject);

            Currency = new CurrencyManager();
            XP       = new XPManager(Currency);
        }

        private void OnEnable()
        {
            MatchRewardCalculator.OnRewardsCalculated += HandleRewards;
        }

        private void OnDisable()
        {
            MatchRewardCalculator.OnRewardsCalculated -= HandleRewards;
        }

        // ── Handler ───────────────────────────────────────────────────────────────

        private void HandleRewards(MatchRewards rewards)
        {
            Currency.AddCoins(rewards.Coins);
            XP.AddXP(rewards.XP);

#if UNITY_EDITOR
            Debug.Log($"[EconomyManager] Received rewards — Coins:{rewards.Coins} XP:{rewards.XP} MVP:{rewards.MVPPlayerId}");
#endif
        }

        // ── Public helpers ────────────────────────────────────────────────────────

        /// <summary>Grant daily first-match bonuses. Call once per day on first match completion.</summary>
        public void GrantDailyBonus()
        {
            Currency.AddCoins(50);  // GDD: 50 coin daily bonus
            XP.AddXP(25);           // GDD: 25 XP daily bonus
        }
    }
}
