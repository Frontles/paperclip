using System.Collections.Generic;
using UnityEngine;
using ProjectF.Economy;

namespace ProjectF.Progression
{
    /// <summary>
    /// Account level and XP system.
    /// GDD level table: 20 levels max in MVP.
    /// Level rewards: coins, gems, and standard packs at certain milestones.
    /// </summary>
    public class XPManager
    {
        private const string SaveKey = "XPManager";

        public int CurrentLevel { get; private set; } = 1;
        public int CurrentXP    { get; private set; } = 0;
        public int MaxLevel     => _levelTable.Count;

        public event System.Action<int, int>      OnXPChanged;    // currentXP, xpToNext
        public event System.Action<int, LevelReward> OnLevelUp;   // newLevel, reward

        private readonly CurrencyManager _currency;

        // GDD level table: level → xp required to reach next level
        private static readonly List<int> _levelTable = new()
        {
            100,  // 1→2
            200,  // 2→3
            350,  // 3→4
            500,  // 4→5
            700,  // 5→6
            900,  // 6→7
            1200, // 7→8
            1500, // 8→9
            2000, // 9→10
            2500, // 10→11
            3000, // 11→12
            3500, // 12→13
            4000, // 13→14
            4500, // 14→15
            5000, // 15→16
            5500, // 16→17
            6000, // 17→18
            6500, // 18→19
            7000, // 19→20
            // Level 20 is cap
        };

        // Reward at each level-up (1-indexed: index 0 = reaching level 2)
        private static readonly List<LevelReward> _rewards = new()
        {
            new LevelReward { Coins = 200 },                              // level 2
            new LevelReward { Coins = 300 },                              // level 3
            new LevelReward { StandardPacks = 1 },                        // level 4
            new LevelReward { Coins = 500 },                              // level 5
            new LevelReward { Gems = 50 },                                // level 6
            new LevelReward { Coins = 700 },                              // level 7
            new LevelReward { StandardPacks = 1 },                        // level 8
            new LevelReward { Coins = 1000 },                             // level 9
            new LevelReward { PremiumPacks = 1 },                         // level 10
            new LevelReward { Gems = 100 },                               // level 11
            new LevelReward { Coins = 1200 },                             // level 12
            new LevelReward { StandardPacks = 1 },                        // level 13
            new LevelReward { Coins = 1500 },                             // level 14
            new LevelReward { Gems = 50 },                                // level 15
            new LevelReward { StandardPacks = 1 },                        // level 16
            new LevelReward { Coins = 2000 },                             // level 17
            new LevelReward { Gems = 100 },                               // level 18
            new LevelReward { StandardPacks = 1 },                        // level 19
            new LevelReward { PremiumPacks = 1, Gems = 50 },              // level 20
        };

        public XPManager(CurrencyManager currency)
        {
            _currency = currency;
            Load();
        }

        // ── Public API ────────────────────────────────────────────────────────────

        /// <summary>XP needed to reach the next level. 0 if at max level.</summary>
        public int XPToNextLevel =>
            CurrentLevel - 1 < _levelTable.Count ? _levelTable[CurrentLevel - 1] : 0;

        public bool IsMaxLevel => CurrentLevel >= MaxLevel;

        /// <summary>Add XP and trigger level-up(s) if threshold crossed.</summary>
        public void AddXP(int amount)
        {
            if (IsMaxLevel || amount <= 0) return;
            CurrentXP += amount;
            OnXPChanged?.Invoke(CurrentXP, XPToNextLevel);

            while (!IsMaxLevel && CurrentXP >= XPToNextLevel)
            {
                CurrentXP -= XPToNextLevel;
                CurrentLevel++;
                LevelReward reward = GetRewardForLevel(CurrentLevel);
                GrantReward(reward);
                OnLevelUp?.Invoke(CurrentLevel, reward);
            }

            Save();
        }

        // ── Helpers ───────────────────────────────────────────────────────────────

        private LevelReward GetRewardForLevel(int level)
        {
            int idx = level - 2; // reaching level 2 is index 0
            return idx >= 0 && idx < _rewards.Count ? _rewards[idx] : new LevelReward();
        }

        private void GrantReward(LevelReward reward)
        {
            if (reward.Coins > 0)        _currency.AddCoins(reward.Coins);
            if (reward.Gems  > 0)        _currency.AddGems(reward.Gems);
            // Pack rewards queued for PackSystem — handled via OnLevelUp event in game layer
        }

        // ── Persistence ───────────────────────────────────────────────────────────

        private void Save()
        {
            PlayerPrefs.SetInt(SaveKey + "_Level", CurrentLevel);
            PlayerPrefs.SetInt(SaveKey + "_XP",    CurrentXP);
            PlayerPrefs.Save();
        }

        private void Load()
        {
            CurrentLevel = Mathf.Max(1, PlayerPrefs.GetInt(SaveKey + "_Level", 1));
            CurrentXP    = Mathf.Max(0, PlayerPrefs.GetInt(SaveKey + "_XP",    0));
        }
    }

    /// <summary>Reward granted on level-up.</summary>
    public class LevelReward
    {
        public int Coins         = 0;
        public int Gems          = 0;
        public int StandardPacks = 0;
        public int PremiumPacks  = 0;
    }
}
