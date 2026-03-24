using UnityEngine;
using UnityEngine.UI;
using TMPro;
using ProjectF.Match;
using ProjectF.Player;
using ProjectF.Ability;

namespace ProjectF.UI
{
    /// <summary>
    /// In-match HUD. Displays score, timer, half, stamina bars, and ability charge.
    /// Subscribes to GameEvents — never polls MatchServer directly.
    /// Layout per GDD Section 6.3.
    /// </summary>
    public class MatchHUD : BaseScreen
    {
        [Header("Score & Timer")]
        [SerializeField] private TextMeshProUGUI _scoreText;
        [SerializeField] private TextMeshProUGUI _timerText;
        [SerializeField] private TextMeshProUGUI _halfText;

        [Header("Stamina")]
        [SerializeField] private Slider _staminaBar;

        [Header("Ability")]
        [SerializeField] private Slider  _abilityChargeBar;
        [SerializeField] private Image   _abilityIcon;
        [SerializeField] private TextMeshProUGUI _abilityUsesText;

        [Header("Player Selection")]
        [SerializeField] private Button[] _playerSelectButtons; // 3 buttons (P1/P2/P3)

        [Header("References")]
        [SerializeField] private MatchServer    _server;
        [SerializeField] private PlayerController _controlledPlayer;
        [SerializeField] private AbilitySystem   _abilitySystem;

        private int _team0Goals;
        private int _team1Goals;

        // ── Unity lifecycle ───────────────────────────────────────────────────────

        private void OnEnable()
        {
            GameEvents.OnGoalScored += OnGoalScored;
            GameEvents.OnHalfTime   += OnHalfTime;
            GameEvents.OnMatchEnded += OnMatchEnded;
        }

        private void OnDisable()
        {
            GameEvents.OnGoalScored -= OnGoalScored;
            GameEvents.OnHalfTime   -= OnHalfTime;
            GameEvents.OnMatchEnded -= OnMatchEnded;
        }

        private void Update()
        {
            UpdateTimer();
            UpdateStamina();
            UpdateAbility();
        }

        // ── Update loops ─────────────────────────────────────────────────────────

        private void UpdateTimer()
        {
            if (_server == null || _timerText == null) return;
            float elapsed = _server.State.TimeElapsed;
            int   mins    = Mathf.FloorToInt(elapsed / 60f);
            int   secs    = Mathf.FloorToInt(elapsed % 60f);
            _timerText.text = $"{mins:00}:{secs:00}";
        }

        private void UpdateStamina()
        {
            if (_staminaBar == null || _controlledPlayer == null) return;
            _staminaBar.value = _controlledPlayer.Stamina.Current / 100f;
        }

        private void UpdateAbility()
        {
            if (_abilityChargeBar == null || _abilitySystem == null) return;
            _abilityChargeBar.value = _abilitySystem.ChargeProgress;
            if (_abilityUsesText != null)
                _abilityUsesText.text = _abilitySystem.UsesRemaining.ToString();
        }

        // ── Event handlers ────────────────────────────────────────────────────────

        private void OnGoalScored(GoalData data)
        {
            if (data.ScoringTeam == 0) _team0Goals++;
            else                        _team1Goals++;
            RefreshScore();
        }

        private void OnHalfTime()
        {
            if (_halfText != null) _halfText.text = "2nd";
        }

        private void OnMatchEnded(MatchResult _)
        {
            Hide();
        }

        // ── Helpers ───────────────────────────────────────────────────────────────

        private void RefreshScore()
        {
            if (_scoreText != null)
                _scoreText.text = $"{_team0Goals} - {_team1Goals}";
        }
    }
}
