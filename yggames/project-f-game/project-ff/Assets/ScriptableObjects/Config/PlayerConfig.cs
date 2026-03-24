using UnityEngine;

namespace ProjectF.Config
{
    public enum PlayerTier { Common, Rare, Epic, Legendary }

    [CreateAssetMenu(menuName = "ProjectF/Config/PlayerConfig", fileName = "PlayerConfig")]
    public class PlayerConfig : ScriptableObject
    {
        [Header("Stat Ranges per Tier")]
        public TierStatRange common;
        public TierStatRange rare;
        public TierStatRange epic;
        public TierStatRange legendary;

        public TierStatRange GetRange(PlayerTier tier) => tier switch
        {
            PlayerTier.Common    => common,
            PlayerTier.Rare      => rare,
            PlayerTier.Epic      => epic,
            PlayerTier.Legendary => legendary,
            _                    => common
        };
    }

    [System.Serializable]
    public struct TierStatRange
    {
        [Tooltip("Minimum speed stat.")]
        public float speedMin;
        [Tooltip("Maximum speed stat.")]
        public float speedMax;

        [Tooltip("Minimum shooting stat.")]
        public float shootingMin;
        [Tooltip("Maximum shooting stat.")]
        public float shootingMax;

        [Tooltip("Minimum passing stat.")]
        public float passingMin;
        [Tooltip("Maximum passing stat.")]
        public float passingMax;

        [Tooltip("Minimum defense stat.")]
        public float defenseMin;
        [Tooltip("Maximum defense stat.")]
        public float defenseMax;

        [Tooltip("Minimum stamina stat.")]
        public float staminaMin;
        [Tooltip("Maximum stamina stat.")]
        public float staminaMax;
    }
}
