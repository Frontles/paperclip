using System.Collections.Generic;
using System.Linq;
using UnityEngine;

namespace ProjectF.Cards
{
    /// <summary>
    /// Manages the player's owned cards. Handles add, remove, duplicate counting, and recycle.
    /// Persisted to a JSON file via CardSaveData.
    /// </summary>
    public class CardInventory
    {
        private const string SaveKey = "CardInventory";

        // cardId → count owned
        private readonly Dictionary<string, int> _owned = new();

        private readonly CardDatabase _db;

        // Event fired when inventory changes
        public event System.Action OnInventoryChanged;

        public CardInventory(CardDatabase db)
        {
            _db = db;
            Load();
        }

        // ── Public API ────────────────────────────────────────────────────────────

        /// <summary>Number of copies the player owns of the given card.</summary>
        public int CountOwned(string cardId) =>
            _owned.TryGetValue(cardId, out int n) ? n : 0;

        /// <summary>All card ids the player owns at least one copy of.</summary>
        public IEnumerable<string> OwnedCardIds => _owned.Keys;

        /// <summary>All CardData objects the player owns (one entry per unique card).</summary>
        public IEnumerable<CardData> OwnedCards =>
            _owned.Keys.Select(id => _db?.GetById(id)).Where(c => c != null);

        /// <summary>Add one copy of a card. Returns true if this is a new (non-duplicate) card.</summary>
        public bool AddCard(string cardId)
        {
            bool isNew = !_owned.ContainsKey(cardId) || _owned[cardId] == 0;
            _owned.TryGetValue(cardId, out int count);
            _owned[cardId] = count + 1;
            Save();
            OnInventoryChanged?.Invoke();
            return isNew;
        }

        /// <summary>Remove one copy of a card. Returns true if successful.</summary>
        public bool RemoveCard(string cardId)
        {
            if (!_owned.TryGetValue(cardId, out int count) || count <= 0) return false;
            if (count == 1) _owned.Remove(cardId);
            else            _owned[cardId] = count - 1;
            Save();
            OnInventoryChanged?.Invoke();
            return true;
        }

        /// <summary>
        /// Recycle one duplicate copy of a card for coins.
        /// Returns coins earned, or 0 if card not owned in duplicate.
        /// </summary>
        public int RecycleDuplicate(string cardId)
        {
            if (CountOwned(cardId) < 2) return 0; // must keep at least one
            CardData card = _db?.GetById(cardId);
            if (card == null) return 0;
            RemoveCard(cardId);
            return card.RecycleValue;
        }

        /// <summary>True if the player owns any duplicate (> 1 copy) of any card.</summary>
        public bool HasDuplicates() => _owned.Any(kv => kv.Value > 1);

        // ── Persistence ───────────────────────────────────────────────────────────

        public void Save()
        {
            var saveData = new CardSaveData { entries = _owned.Select(kv => new CardEntry { id = kv.Key, count = kv.Value }).ToList() };
            string json  = JsonUtility.ToJson(saveData, true);
            PlayerPrefs.SetString(SaveKey, json);
            PlayerPrefs.Save();
        }

        private void Load()
        {
            _owned.Clear();
            if (!PlayerPrefs.HasKey(SaveKey)) return;
            string json  = PlayerPrefs.GetString(SaveKey);
            var saveData = JsonUtility.FromJson<CardSaveData>(json);
            if (saveData?.entries == null) return;
            foreach (var e in saveData.entries)
                _owned[e.id] = e.count;
        }

        // ── Serialisable DTOs ─────────────────────────────────────────────────────

        [System.Serializable] private class CardSaveData { public List<CardEntry> entries; }
        [System.Serializable] private class CardEntry     { public string id; public int count; }
    }
}
