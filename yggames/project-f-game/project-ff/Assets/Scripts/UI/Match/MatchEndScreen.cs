using UnityEngine;
using UnityEngine.UI;
using TMPro;
using ProjectF.Match;

namespace ProjectF.UI
{
    /// <summary>
    /// Post-match results screen. GDD Section 6.4.
    /// Shows final score, result (win/draw/loss), MVP player, rewards, and navigation buttons.
    /// </summary>
    public class MatchEndScreen : BaseScreen
    {
        [Header("Result")]
        [SerializeField] private TextMeshProUGUI _resultText;   // "KAZANDIN!" / "BERABERE" / "KAYBETTIN"
        [SerializeField] private TextMeshProUGUI _scoreText;    // "3 - 1"
        [SerializeField] private TextMeshProUGUI _mvpNameText;

        [Header("Rewards")]
        [SerializeField] private TextMeshProUGUI _coinsText;
        [SerializeField] private TextMeshProUGUI _xpText;

        [Header("Navigation")]
        [SerializeField] private Button _rematchButton;
        [SerializeField] private Button _mainMenuButton;

        // Events for navigation
        public System.Action OnRematchRequested;
        public System.Action OnMainMenuRequested;

        // ── Unity lifecycle ───────────────────────────────────────────────────────

        protected override void Awake()
        {
            base.Awake();
            _rematchButton?.onClick.AddListener(() => OnRematchRequested?.Invoke());
            _mainMenuButton?.onClick.AddListener(() => OnMainMenuRequested?.Invoke());
        }

        private void OnEnable()
        {
            GameEvents.OnMatchEnded += HandleMatchEnded;
            MatchRewardCalculator.OnRewardsCalculated += HandleRewards;
        }

        private void OnDisable()
        {
            GameEvents.OnMatchEnded -= HandleMatchEnded;
            MatchRewardCalculator.OnRewardsCalculated -= HandleRewards;
        }

        // ── Handlers ─────────────────────────────────────────────────────────────

        private void HandleMatchEnded(MatchResult result)
        {
            if (_scoreText != null)
                _scoreText.text = $"{result.Team0Goals} - {result.Team1Goals}";

            if (_resultText != null)
                _resultText.text = result.WinnerTeam == 0 ? "KAZANDIN!"
                    : result.WinnerTeam == -1 ? "BERABERE"
                    : "KAYBETTIN";

            Show();
        }

        private void HandleRewards(MatchRewards rewards)
        {
            if (_coinsText != null) _coinsText.text = $"💰 {rewards.Coins} coin";
            if (_xpText    != null) _xpText.text    = $"⭐ {rewards.XP} XP";
            if (_mvpNameText != null && !string.IsNullOrEmpty(rewards.MVPPlayerId))
                _mvpNameText.text = $"MVP: {rewards.MVPPlayerId}";
        }
    }
}
