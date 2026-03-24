using System.Collections.Generic;
using UnityEngine;
using ProjectF.Cards;
using ProjectF.Config;

namespace ProjectF.Economy
{
    public enum PackType { Standard, Premium }

    /// <summary>
    /// Pack opening system with drop rates and pity mechanism.
    /// GDD rates: Standard = Normal 60% / Rare 30% / Expert 10% / 500 coin
    ///            Premium  = Normal 20% / Rare 50% / Expert 30% / 300 gem
    /// Pity: 10 Standard without Rare+ → guaranteed Rare+
    ///       5  Premium  without Expert  → guaranteed Expert
    /// </summary>
    public class PackSystem
    {
        private const string SaveKey = "PackSystem";

        private readonly CardDatabase   _db;
        private readonly EconomyConfig  _config;
        private readonly CurrencyManager _currency;

        // Pity counters
        private int _standardPacksWithoutRare   = 0;
        private int _premiumPacksWithoutExpert   = 0;

        // GDD pity thresholds
        private const int StandardPityThreshold = 10;
        private const int PremiumPityThreshold  = 5;

        public event System.Action<List<CardData>> OnPackOpened;

        public PackSystem(CardDatabase db, EconomyConfig config, CurrencyManager currency)
        {
            _db       = db;
            _config   = config;
            _currency = currency;
            Load();
        }

        // ── Public API ────────────────────────────────────────────────────────────

        /// <summary>Returns the card count per pack (always 3 per GDD).</summary>
        public int CardsPerPack => 3;

        public bool CanAfford(PackType type) => type == PackType.Standard
            ? _currency.Coins >= _config.basicPackPrice
            : _currency.Gems  >= _config.premiumPackPriceGems;

        /// <summary>Open a pack. Deducts currency, returns the cards drawn.</summary>
        public List<CardData> OpenPack(PackType type)
        {
            if (!CanAfford(type))
            {
#if UNITY_EDITOR
                Debug.LogWarning($"[PackSystem] Cannot afford {type} pack.");
#endif
                return new List<CardData>();
            }

            // Deduct cost
            if (type == PackType.Standard)
                _currency.SpendCoins(_config.basicPackPrice);
            else
                _currency.SpendGems(_config.premiumPackPriceGems);

            List<CardData> result = new(CardsPerPack);
            for (int i = 0; i < CardsPerPack; i++)
                result.Add(DrawCard(type, i == 0)); // first card gets pity check

            // Update pity counters
            UpdatePity(type, result);

            Save();
            OnPackOpened?.Invoke(result);
            return result;
        }

        // ── Private ───────────────────────────────────────────────────────────────

        private CardData DrawCard(PackType type, bool applyPity)
        {
            CardTier tier;

            if (type == PackType.Standard)
            {
                bool pityForced = applyPity && _standardPacksWithoutRare >= StandardPityThreshold;
                tier = pityForced ? CardTier.Rare : RollTierStandard();
            }
            else
            {
                bool pityForced = applyPity && _premiumPacksWithoutExpert >= PremiumPityThreshold;
                tier = pityForced ? CardTier.Expert : RollTierPremium();
            }

            CardData card = _db.GetRandomByTier(tier);
            return card != null ? card : _db.GetRandom(); // fallback
        }

        private CardTier RollTierStandard()
        {
            float roll = Random.value;
            if (roll < _config.basicEpicRate)   return CardTier.Expert;
            if (roll < _config.basicEpicRate + _config.basicRareRate) return CardTier.Rare;
            return CardTier.Normal;
        }

        private CardTier RollTierPremium()
        {
            float roll = Random.value;
            if (roll < _config.premiumEpicRate) return CardTier.Expert;
            if (roll < _config.premiumEpicRate + _config.premiumRareRate) return CardTier.Rare;
            return CardTier.Normal;
        }

        private void UpdatePity(PackType type, List<CardData> result)
        {
            bool gotRarePlus   = result.Exists(c => c.Tier >= CardTier.Rare);
            bool gotExpertPlus = result.Exists(c => c.Tier >= CardTier.Expert);

            if (type == PackType.Standard)
                _standardPacksWithoutRare = gotRarePlus ? 0 : _standardPacksWithoutRare + 1;
            else
                _premiumPacksWithoutExpert = gotExpertPlus ? 0 : _premiumPacksWithoutExpert + 1;
        }

        // ── Persistence ───────────────────────────────────────────────────────────

        private void Save()
        {
            var data = new PitySaveData
            {
                stdWithoutRare = _standardPacksWithoutRare,
                prmWithoutExpert = _premiumPacksWithoutExpert
            };
            PlayerPrefs.SetString(SaveKey, JsonUtility.ToJson(data));
            PlayerPrefs.Save();
        }

        private void Load()
        {
            if (!PlayerPrefs.HasKey(SaveKey)) return;
            var data = JsonUtility.FromJson<PitySaveData>(PlayerPrefs.GetString(SaveKey));
            if (data == null) return;
            _standardPacksWithoutRare   = data.stdWithoutRare;
            _premiumPacksWithoutExpert  = data.prmWithoutExpert;
        }

        [System.Serializable]
        private class PitySaveData { public int stdWithoutRare; public int prmWithoutExpert; }
    }
}
