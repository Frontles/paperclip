using UnityEngine;

namespace ProjectF.Ability
{
    public enum AbilityCategory { Offensive, Defensive }
    public enum AbilityElement  { Fire, Ice, Lightning, Wind, Shadow }

    /// <summary>
    /// ScriptableObject definition for one special ability.
    /// MVP has 2 abilities: Power Shot (Fire/Offensive) and Iron Wall (Ice/Defensive).
    /// </summary>
    [CreateAssetMenu(menuName = "ProjectF/Abilities/AbilityData", fileName = "AbilityData_New")]
    public class AbilityData : ScriptableObject
    {
        [Header("Identity")]
        public string AbilityId;
        public string AbilityName;
        [TextArea] public string Description;

        [Header("Classification")]
        public AbilityCategory Category;
        public AbilityElement  Element;

        [Header("Timing")]
        [Tooltip("Cooldown in seconds after activation.")]
        public float Cooldown = 15f;

        [Tooltip("Duration of the ability effect in seconds. 0 = instant.")]
        public float Duration = 0f;

        [Header("Charge")]
        [Tooltip("Seconds of passive charge accumulation to fill the bar.")]
        public float PassiveChargeTime = 30f;

        [Tooltip("Maximum ability uses per player per match (GDD: 2).")]
        public int MaxUsesPerMatch = 2;

        [Header("Stat Modifiers (multipliers — 1.0 = no change)")]
        [Tooltip("Shooting stat multiplier while active.")]
        public float ShotMultiplier    = 1f;

        [Tooltip("Defense stat multiplier while active.")]
        public float DefenseMultiplier = 1f;

        [Tooltip("Physical stat multiplier while active.")]
        public float PhysicalMultiplier = 1f;

        [Tooltip("Tackle success rate override while active (0 = no override).")]
        [Range(0f, 1f)] public float TackleSuccessOverride = 0f;

        [Header("Visual")]
        [Tooltip("Particle effect prefab spawned on the player when ability is active.")]
        public GameObject ActivationVFX;

        [Tooltip("Icon displayed on the ability button.")]
        public Sprite Icon;
    }
}
