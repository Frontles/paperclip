using UnityEngine;
using UnityEngine.UI;
using TMPro;
using ProjectF.Economy;

namespace ProjectF.UI
{
    /// <summary>
    /// Player profile screen — shows account level, XP, total matches, wins, goals.
    /// GDD Section 6.1 (Profil → Hesap Seviyesi, İstatistikler).
    /// </summary>
    public class ProfileScreen : BaseScreen
    {
        [Header("Account Info")]
        [SerializeField] private TextMeshProUGUI _levelText;
        [SerializeField] private Slider          _xpBar;
        [SerializeField] private TextMeshProUGUI _xpText; // "350 / 500 XP"
        [SerializeField] private TextMeshProUGUI _coinsText;
        [SerializeField] private TextMeshProUGUI _gemsText;

        [Header("Match Stats (placeholder — wire to analytics later)")]
        [SerializeField] private TextMeshProUGUI _matchesPlayedText;
        [SerializeField] private TextMeshProUGUI _winsText;
        [SerializeField] private TextMeshProUGUI _goalsText;

        [Header("Navigation")]
        [SerializeField] private Button _backButton;
        public System.Action OnBackRequested;

        // Simple in-session stats (persistent stats for full release via server)
        private static int s_matchesPlayed;
        private static int s_wins;
        private static int s_goals;

        protected override void Awake()
        {
            base.Awake();
            _backButton?.onClick.AddListener(() => OnBackRequested?.Invoke());
        }

        public override void Show()
        {
            base.Show();
            RefreshAll();
        }

        private void RefreshAll()
        {
            var ec = EconomyManager.Instance;
            if (ec == null) return;

            if (_levelText != null) _levelText.text = $"Seviye {ec.XP.CurrentLevel}";
            if (_xpText    != null) _xpText.text    = $"{ec.XP.CurrentXP} / {ec.XP.XPToNextLevel} XP";
            if (_xpBar     != null && ec.XP.XPToNextLevel > 0)
                _xpBar.value = (float)ec.XP.CurrentXP / ec.XP.XPToNextLevel;

            if (_coinsText != null) _coinsText.text = $"💰 {ec.Currency.Coins:N0}";
            if (_gemsText  != null) _gemsText.text  = $"💎 {ec.Currency.Gems:N0}";

            if (_matchesPlayedText != null) _matchesPlayedText.text = s_matchesPlayed.ToString();
            if (_winsText          != null) _winsText.text          = s_wins.ToString();
            if (_goalsText         != null) _goalsText.text         = s_goals.ToString();
        }

        public static void RecordMatchResult(bool won, int goalsScored)
        {
            s_matchesPlayed++;
            if (won) s_wins++;
            s_goals += goalsScored;
        }
    }
}
