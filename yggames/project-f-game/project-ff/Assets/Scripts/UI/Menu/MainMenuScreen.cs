using UnityEngine;
using UnityEngine.UI;
using TMPro;
using ProjectF.Economy;

namespace ProjectF.UI
{
    /// <summary>
    /// Main menu screen. GDD Section 6.2.
    /// Shows account level bar, currency display, and navigation to Play / Squad / Packs / Profile / Settings.
    /// </summary>
    public class MainMenuScreen : BaseScreen
    {
        [Header("Account")]
        [SerializeField] private TextMeshProUGUI _levelText;
        [SerializeField] private Slider          _xpBar;
        [SerializeField] private TextMeshProUGUI _coinsText;
        [SerializeField] private TextMeshProUGUI _gemsText;

        [Header("Navigation Buttons")]
        [SerializeField] private Button _playButton;
        [SerializeField] private Button _squadButton;
        [SerializeField] private Button _packsButton;
        [SerializeField] private Button _profileButton;
        [SerializeField] private Button _settingsButton;

        // Navigation events — consumed by a SceneManager or ScreenRouter
        public System.Action OnPlayRequested;
        public System.Action OnSquadRequested;
        public System.Action OnPacksRequested;
        public System.Action OnProfileRequested;
        public System.Action OnSettingsRequested;

        // ── Unity lifecycle ───────────────────────────────────────────────────────

        protected override void Awake()
        {
            base.Awake();
            _playButton?.onClick.AddListener(    () => OnPlayRequested?.Invoke());
            _squadButton?.onClick.AddListener(   () => OnSquadRequested?.Invoke());
            _packsButton?.onClick.AddListener(   () => OnPacksRequested?.Invoke());
            _profileButton?.onClick.AddListener( () => OnProfileRequested?.Invoke());
            _settingsButton?.onClick.AddListener(() => OnSettingsRequested?.Invoke());
        }

        private void OnEnable()
        {
            if (EconomyManager.Instance != null)
            {
                EconomyManager.Instance.Currency.OnCurrencyChanged += RefreshCurrency;
                EconomyManager.Instance.XP.OnXPChanged             += RefreshXP;
                EconomyManager.Instance.XP.OnLevelUp               += RefreshLevel;
                RefreshAll();
            }
        }

        private void OnDisable()
        {
            if (EconomyManager.Instance != null)
            {
                EconomyManager.Instance.Currency.OnCurrencyChanged -= RefreshCurrency;
                EconomyManager.Instance.XP.OnXPChanged             -= RefreshXP;
                EconomyManager.Instance.XP.OnLevelUp               -= RefreshLevel;
            }
        }

        // ── Refresh ───────────────────────────────────────────────────────────────

        private void RefreshAll()
        {
            var ec = EconomyManager.Instance;
            if (ec == null) return;
            RefreshCurrency(ec.Currency.Coins, ec.Currency.Gems);
            RefreshXP(ec.XP.CurrentXP, ec.XP.XPToNextLevel);
            if (_levelText != null) _levelText.text = $"LVL {ec.XP.CurrentLevel}";
        }

        private void RefreshCurrency(int coins, int gems)
        {
            if (_coinsText != null) _coinsText.text = coins.ToString("N0");
            if (_gemsText  != null) _gemsText.text  = gems.ToString("N0");
        }

        private void RefreshXP(int currentXP, int xpToNext)
        {
            if (_xpBar != null && xpToNext > 0)
                _xpBar.value = (float)currentXP / xpToNext;
        }

        private void RefreshLevel(int level, Progression.LevelReward _)
        {
            if (_levelText != null) _levelText.text = $"LVL {level}";
        }
    }
}
