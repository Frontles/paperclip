using UnityEngine;
using UnityEngine.UI;
using TMPro;
using ProjectF.Cards;
using ProjectF.Squad;

namespace ProjectF.UI
{
    /// <summary>
    /// Squad building screen. GDD Section 6.6.
    /// Shows 3 formation slots (FW/MF/GK), team power, and opens card picker on slot tap.
    /// </summary>
    public class SquadScreen : BaseScreen
    {
        [Header("Slot displays")]
        [SerializeField] private Button          _fwSlotButton;
        [SerializeField] private Button          _mfSlotButton;
        [SerializeField] private Button          _gkSlotButton;

        [SerializeField] private TextMeshProUGUI _fwNameText;
        [SerializeField] private TextMeshProUGUI _mfNameText;
        [SerializeField] private TextMeshProUGUI _gkNameText;

        [SerializeField] private TextMeshProUGUI _teamPowerText;

        [Header("Navigation")]
        [SerializeField] private Button _saveButton;
        [SerializeField] private Button _backButton;

        public System.Action<CardRole> OnSlotTapped; // open card picker for role
        public System.Action           OnSaveRequested;
        public System.Action           OnBackRequested;

        private SquadManager _squad;

        // ── Unity lifecycle ───────────────────────────────────────────────────────

        protected override void Awake()
        {
            base.Awake();
            _fwSlotButton?.onClick.AddListener(() => OnSlotTapped?.Invoke(CardRole.Forward));
            _mfSlotButton?.onClick.AddListener(() => OnSlotTapped?.Invoke(CardRole.Midfielder));
            _gkSlotButton?.onClick.AddListener(() => OnSlotTapped?.Invoke(CardRole.Goalkeeper));
            _saveButton?.onClick.AddListener(() => OnSaveRequested?.Invoke());
            _backButton?.onClick.AddListener(() => OnBackRequested?.Invoke());
        }

        public void Inject(SquadManager squad)
        {
            _squad = squad;
            squad.OnSquadChanged += RefreshDisplay;
        }

        public override void Show()
        {
            base.Show();
            RefreshDisplay();
        }

        // ── Refresh ───────────────────────────────────────────────────────────────

        private void RefreshDisplay()
        {
            if (_squad == null) return;

            SetSlotText(_fwNameText, _squad.GetCardInSlot(CardRole.Forward));
            SetSlotText(_mfNameText, _squad.GetCardInSlot(CardRole.Midfielder));
            SetSlotText(_gkNameText, _squad.GetCardInSlot(CardRole.Goalkeeper));

            if (_teamPowerText != null)
                _teamPowerText.text = $"Güç: {_squad.TeamPower:F1}";
        }

        private static void SetSlotText(TextMeshProUGUI label, CardData card)
        {
            if (label == null) return;
            label.text = card != null ? card.PlayerName : "— Boş —";
        }
    }
}
