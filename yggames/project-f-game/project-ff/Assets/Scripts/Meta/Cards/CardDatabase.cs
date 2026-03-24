using System.Collections.Generic;
using System.Linq;
using UnityEngine;

namespace ProjectF.Cards
{
    /// <summary>
    /// Central registry of all 30 MVP cards.
    /// Supports filtering by tier, role, and element.
    /// Assign all CardData assets in the Inspector.
    /// </summary>
    [CreateAssetMenu(menuName = "ProjectF/Cards/CardDatabase", fileName = "CardDatabase")]
    public class CardDatabase : ScriptableObject
    {
        [Tooltip("All cards in the game. Drag CardData assets here.")]
        public List<CardData> AllCards = new();

        // ── Lookup ────────────────────────────────────────────────────────────────

        public CardData GetById(string cardId) =>
            AllCards.Find(c => c.CardId == cardId);

        public List<CardData> GetByTier(CardTier tier) =>
            AllCards.Where(c => c.Tier == tier).ToList();

        public List<CardData> GetByRole(CardRole role) =>
            AllCards.Where(c => c.Role == role).ToList();

        public List<CardData> GetByTierAndRole(CardTier tier, CardRole role) =>
            AllCards.Where(c => c.Tier == tier && c.Role == role).ToList();

        public List<CardData> GetByElement(CardElement element) =>
            AllCards.Where(c => c.Element == element).ToList();

        /// <summary>Return a random card weighted by drop rates (see EconomyConfig for rates).</summary>
        public CardData GetRandom() =>
            AllCards.Count > 0 ? AllCards[Random.Range(0, AllCards.Count)] : null;

        /// <summary>Return a random card matching the given tier.</summary>
        public CardData GetRandomByTier(CardTier tier)
        {
            var pool = GetByTier(tier);
            return pool.Count > 0 ? pool[Random.Range(0, pool.Count)] : null;
        }

#if UNITY_EDITOR
        [ContextMenu("Validate Card Count")]
        private void ValidateCardCount()
        {
            Debug.Log($"[CardDatabase] Total cards: {AllCards.Count}");
            foreach (CardTier t in System.Enum.GetValues(typeof(CardTier)))
                foreach (CardRole r in System.Enum.GetValues(typeof(CardRole)))
                    Debug.Log($"  {t} {r}: {GetByTierAndRole(t, r).Count}");
        }
#endif
    }
}
