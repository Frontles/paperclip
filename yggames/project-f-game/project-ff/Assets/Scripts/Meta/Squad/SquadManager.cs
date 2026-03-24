using System.Collections.Generic;
using UnityEngine;
using ProjectF.Cards;

namespace ProjectF.Squad
{
    /// <summary>
    /// Manages the player's active 3-player squad (1 FW, 1 MF, 1 GK per GDD MVP formation: 1-1-1).
    /// Validates squad legality, calculates team power, and persists to PlayerPrefs.
    /// </summary>
    public class SquadManager
    {
        private const string SaveKey = "SquadManager";

        // Slot index: 0=FW, 1=MF, 2=GK
        private readonly string[] _slotCardIds = new string[3];
        private readonly CardDatabase _db;

        public event System.Action OnSquadChanged;

        public SquadManager(CardDatabase db)
        {
            _db = db;
            Load();
        }

        // ── Public API ────────────────────────────────────────────────────────────

        public string GetSlot(CardRole role) => _slotCardIds[SlotIndex(role)];

        public CardData GetCardInSlot(CardRole role)
        {
            string id = GetSlot(role);
            return string.IsNullOrEmpty(id) ? null : _db.GetById(id);
        }

        /// <summary>Assign a card to the appropriate slot. Rejects wrong-role cards.</summary>
        public bool AssignCard(CardData card)
        {
            if (card == null) return false;
            _slotCardIds[SlotIndex(card.Role)] = card.CardId;
            Save();
            OnSquadChanged?.Invoke();
            return true;
        }

        /// <summary>Clear a slot.</summary>
        public void ClearSlot(CardRole role)
        {
            _slotCardIds[SlotIndex(role)] = string.Empty;
            Save();
            OnSquadChanged?.Invoke();
        }

        /// <summary>True when all 3 slots are filled.</summary>
        public bool IsComplete => System.Array.TrueForAll(_slotCardIds, s => !string.IsNullOrEmpty(s));

        /// <summary>
        /// Team power = average of all stats across the 3 cards.
        /// GDD formula: TeamPower = (total stat sum) / (num stats)
        /// </summary>
        public float TeamPower
        {
            get
            {
                float total = 0;
                int count   = 0;
                foreach (CardRole role in System.Enum.GetValues(typeof(CardRole)))
                {
                    var card = GetCardInSlot(role);
                    if (card != null) { total += card.AverageStat; count++; }
                }
                return count > 0 ? total / count : 0f;
            }
        }

        /// <summary>All 3 active CardData objects (nulls for empty slots).</summary>
        public IEnumerable<CardData> ActiveCards
        {
            get
            {
                foreach (CardRole role in System.Enum.GetValues(typeof(CardRole)))
                    yield return GetCardInSlot(role);
            }
        }

        // ── Persistence ───────────────────────────────────────────────────────────

        private void Save()
        {
            var data = new SquadSaveData
            {
                fwCardId = _slotCardIds[0],
                mfCardId = _slotCardIds[1],
                gkCardId = _slotCardIds[2]
            };
            PlayerPrefs.SetString(SaveKey, JsonUtility.ToJson(data));
            PlayerPrefs.Save();
        }

        private void Load()
        {
            _slotCardIds[0] = _slotCardIds[1] = _slotCardIds[2] = string.Empty;
            if (!PlayerPrefs.HasKey(SaveKey)) return;
            var data = JsonUtility.FromJson<SquadSaveData>(PlayerPrefs.GetString(SaveKey));
            if (data == null) return;
            _slotCardIds[0] = data.fwCardId ?? string.Empty;
            _slotCardIds[1] = data.mfCardId ?? string.Empty;
            _slotCardIds[2] = data.gkCardId ?? string.Empty;
        }

        private static int SlotIndex(CardRole role) => role switch
        {
            CardRole.Forward    => 0,
            CardRole.Midfielder => 1,
            CardRole.Goalkeeper => 2,
            _                   => 0
        };

        [System.Serializable]
        private class SquadSaveData { public string fwCardId; public string mfCardId; public string gkCardId; }
    }
}
