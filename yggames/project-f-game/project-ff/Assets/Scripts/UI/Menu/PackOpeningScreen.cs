using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;
using TMPro;
using ProjectF.Cards;
using ProjectF.Economy;

namespace ProjectF.UI
{
    /// <summary>
    /// Pack opening screen. GDD Section 6.5.
    /// Shows pack tap animation, reveals cards one by one with rarity effects, displays result.
    /// </summary>
    public class PackOpeningScreen : BaseScreen
    {
        [Header("Pack Buttons")]
        [SerializeField] private Button _standardPackButton;
        [SerializeField] private Button _premiumPackButton;
        [SerializeField] private TextMeshProUGUI _standardPackCostText;
        [SerializeField] private TextMeshProUGUI _premiumPackCostText;

        [Header("Card reveal")]
        [SerializeField] private Transform        _cardRevealRoot;
        [SerializeField] private GameObject       _cardRevealPrefab; // card UI prefab
        [SerializeField] private float            _revealDelay = 0.6f;

        [Header("Pity Display")]
        [SerializeField] private TextMeshProUGUI _standardPityText;
        [SerializeField] private TextMeshProUGUI _premiumPityText;

        [Header("Navigation")]
        [SerializeField] private Button _backButton;
        [SerializeField] private Button _openAgainButton;

        public System.Action OnBackRequested;

        private PackSystem _packSystem;

        // ── Unity lifecycle ───────────────────────────────────────────────────────

        protected override void Awake()
        {
            base.Awake();
            _standardPackButton?.onClick.AddListener(() => StartCoroutine(OpenPack(PackType.Standard)));
            _premiumPackButton?.onClick.AddListener(()  => StartCoroutine(OpenPack(PackType.Premium)));
            _backButton?.onClick.AddListener(()          => OnBackRequested?.Invoke());
            _openAgainButton?.onClick.AddListener(()     => ClearReveal());
        }

        public void Inject(PackSystem packSystem)
        {
            _packSystem = packSystem;
            packSystem.OnPackOpened += _ => { }; // subscription (results via coroutine)
        }

        public override void Show()
        {
            base.Show();
            ClearReveal();
        }

        // ── Pack opening flow ─────────────────────────────────────────────────────

        private IEnumerator OpenPack(PackType type)
        {
            if (_packSystem == null) yield break;
            if (!_packSystem.CanAfford(type))
            {
#if UNITY_EDITOR
                Debug.Log("[PackOpeningScreen] Not enough currency.");
#endif
                yield break;
            }

            ClearReveal();
            List<CardData> cards = _packSystem.OpenPack(type);

            foreach (CardData card in cards)
            {
                yield return new WaitForSeconds(_revealDelay);
                RevealCard(card);
            }
        }

        private void RevealCard(CardData card)
        {
            if (_cardRevealPrefab == null || _cardRevealRoot == null) return;

            GameObject go = Instantiate(_cardRevealPrefab, _cardRevealRoot);

            // Set card name
            var nameText = go.GetComponentInChildren<TextMeshProUGUI>();
            if (nameText != null)
                nameText.text = $"{card.PlayerName}\n{card.Tier} {card.Role}\n{card.TotalStats} OVR";

            // Rarity color
            var image = go.GetComponent<Image>();
            if (image != null)
            {
                image.color = card.Tier switch
                {
                    CardTier.Normal => Color.gray,
                    CardTier.Rare   => new Color(0.3f, 0.6f, 1f),
                    CardTier.Expert => new Color(0.6f, 0.1f, 0.9f),
                    _               => Color.white
                };
            }
        }

        private void ClearReveal()
        {
            if (_cardRevealRoot == null) return;
            foreach (Transform child in _cardRevealRoot)
                Destroy(child.gameObject);
        }
    }
}
