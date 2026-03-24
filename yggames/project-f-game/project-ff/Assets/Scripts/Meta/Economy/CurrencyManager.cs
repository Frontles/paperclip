using UnityEngine;

namespace ProjectF.Economy
{
    /// <summary>
    /// Manages Coins (soft currency) and Gems (hard currency).
    /// Persisted via PlayerPrefs. Events fired on any change.
    /// </summary>
    public class CurrencyManager
    {
        private const string CoinsKey = "Currency_Coins";
        private const string GemsKey  = "Currency_Gems";

        public int Coins { get; private set; }
        public int Gems  { get; private set; }

        public event System.Action<int, int> OnCurrencyChanged; // coins, gems

        public CurrencyManager()
        {
            Load();
        }

        // ── Coins ─────────────────────────────────────────────────────────────────

        public void AddCoins(int amount)
        {
            if (amount <= 0) return;
            Coins += amount;
            Save();
        }

        /// <summary>Returns true if successful, false if insufficient coins.</summary>
        public bool SpendCoins(int amount)
        {
            if (amount <= 0 || Coins < amount) return false;
            Coins -= amount;
            Save();
            return true;
        }

        // ── Gems ──────────────────────────────────────────────────────────────────

        public void AddGems(int amount)
        {
            if (amount <= 0) return;
            Gems += amount;
            Save();
        }

        /// <summary>Returns true if successful, false if insufficient gems.</summary>
        public bool SpendGems(int amount)
        {
            if (amount <= 0 || Gems < amount) return false;
            Gems -= amount;
            Save();
            return true;
        }

        // ── Persistence ───────────────────────────────────────────────────────────

        private void Save()
        {
            PlayerPrefs.SetInt(CoinsKey, Coins);
            PlayerPrefs.SetInt(GemsKey,  Gems);
            PlayerPrefs.Save();
            OnCurrencyChanged?.Invoke(Coins, Gems);
        }

        private void Load()
        {
            Coins = PlayerPrefs.GetInt(CoinsKey, 0);
            Gems  = PlayerPrefs.GetInt(GemsKey,  300); // GDD: 300 gem starter gift
        }
    }
}
