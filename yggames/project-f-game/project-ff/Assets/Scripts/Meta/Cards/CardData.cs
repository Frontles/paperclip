using UnityEngine;

namespace ProjectF.Cards
{
    public enum CardTier    { Normal, Rare, Expert }
    public enum CardRole    { Forward, Midfielder, Goalkeeper }
    public enum CardElement { Fire, Ice, Lightning, Wind, Shadow }

    /// <summary>
    /// ScriptableObject data asset for one player card.
    /// Editing stats, tier, or ability = just edit the asset. No code changes.
    /// </summary>
    [CreateAssetMenu(menuName = "ProjectF/Cards/CardData", fileName = "Card_New")]
    public class CardData : ScriptableObject
    {
        [Header("Identity")]
        [Tooltip("Unique card identifier (e.g. FW_NORMAL_01).")]
        public string CardId;

        [Tooltip("Display name of the player.")]
        public string PlayerName;

        [Tooltip("Role this card plays on the pitch.")]
        public CardRole Role;

        [Tooltip("Rarity tier.")]
        public CardTier Tier;

        [Tooltip("Element type (MVP: cosmetic only).")]
        public CardElement Element;

        [Header("Stats (PAC/SHO/PAS/DRI/DEF/PHY)")]
        [Tooltip("Pace — run speed, sprint speed, acceleration.")]
        [Range(1, 99)] public int PAC;

        [Tooltip("Shooting — shot power, accuracy, finishing.")]
        [Range(1, 99)] public int SHO;

        [Tooltip("Passing — pass accuracy, range, vision.")]
        [Range(1, 99)] public int PAS;

        [Tooltip("Dribbling — ball control, first touch, skill.")]
        [Range(1, 99)] public int DRI;

        [Tooltip("Defense — tackle success, positioning, interception.")]
        [Range(1, 99)] public int DEF;

        [Tooltip("Physical — stamina capacity, strength, durability.")]
        [Range(1, 99)] public int PHY;

        [Header("Ability")]
        [Tooltip("Ability assigned to this card (null = no ability).")]
        public ScriptableObject AbilityData; // typed as AbilityData when Ability system is complete

        [Header("Visuals")]
        [Tooltip("3D model prefab for on-field use. Swap this to change the model.")]
        public GameObject ModelPrefab;

        [Tooltip("2D card artwork sprite.")]
        public Sprite CardArt;

        // ── Derived ───────────────────────────────────────────────────────────────

        /// <summary>Sum of all 6 stats. Used for rough squad power calculation.</summary>
        public int TotalStats => PAC + SHO + PAS + DRI + DEF + PHY;

        /// <summary>Average stat value.</summary>
        public float AverageStat => TotalStats / 6f;

        /// <summary>Coin value when recycled as a duplicate.</summary>
        public int RecycleValue => Tier switch
        {
            CardTier.Normal => 50,
            CardTier.Rare   => 200,
            CardTier.Expert => 500,
            _               => 50
        };
    }
}
