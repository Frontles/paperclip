using UnityEngine;

namespace ProjectF.Config
{
    [CreateAssetMenu(menuName = "ProjectF/Config/EconomyConfig", fileName = "EconomyConfig")]
    public class EconomyConfig : ScriptableObject
    {
        [Header("Match Rewards — Coins")]
        [Tooltip("Coins awarded per win.")]
        public int coinsPerWin = 100;
        [Tooltip("Coins awarded per loss.")]
        public int coinsPerLoss = 40;
        [Tooltip("Coins awarded per draw.")]
        public int coinsDraw = 60;

        [Header("Match Rewards — XP")]
        [Tooltip("XP awarded per win.")]
        public int xpPerWin = 150;
        [Tooltip("XP awarded per loss.")]
        public int xpPerLoss = 50;
        [Tooltip("XP per goal scored (individual).")]
        public int xpPerGoal = 25;

        [Header("Pack Prices — Coins")]
        [Tooltip("Price of a Basic Pack in coins.")]
        public int basicPackPrice = 500;
        [Tooltip("Price of a Premium Pack in coins.")]
        public int premiumPackPrice = 1500;

        [Header("Pack Prices — Gems")]
        [Tooltip("Price of a Premium Pack in gems.")]
        public int premiumPackPriceGems = 100;
        [Tooltip("Price of a Legendary Pack in gems.")]
        public int legendaryPackPriceGems = 300;

        [Header("Pity System")]
        [Tooltip("Guaranteed Rare card at this many packs without one.")]
        public int pityRare = 5;
        [Tooltip("Guaranteed Epic card at this many packs without one.")]
        public int pityEpic = 20;
        [Tooltip("Guaranteed Legendary card at this many packs without one.")]
        public int pityLegendary = 50;

        [Header("Drop Rates — Basic Pack (0–1)")]
        public float basicCommonRate = 0.70f;
        public float basicRareRate = 0.25f;
        public float basicEpicRate = 0.05f;
        public float basicLegendaryRate = 0.00f;

        [Header("Drop Rates — Premium Pack (0–1)")]
        public float premiumCommonRate = 0.40f;
        public float premiumRareRate = 0.40f;
        public float premiumEpicRate = 0.15f;
        public float premiumLegendaryRate = 0.05f;
    }
}
