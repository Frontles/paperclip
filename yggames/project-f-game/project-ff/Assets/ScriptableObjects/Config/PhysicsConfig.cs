using UnityEngine;

namespace ProjectF.Config
{
    [CreateAssetMenu(menuName = "ProjectF/Config/PhysicsConfig", fileName = "PhysicsConfig")]
    public class PhysicsConfig : ScriptableObject
    {
        [Header("Ball")]
        [Tooltip("Ball linear drag (rolling friction).")]
        public float ballLinearDrag = 0.8f;

        [Tooltip("Ball angular drag.")]
        public float ballAngularDrag = 1f;

        [Tooltip("Bounciness (physics material combine).")]
        [Range(0f, 1f)] public float ballBounciness = 0.5f;

        [Tooltip("Ball gravity scale (1 = normal Unity gravity).")]
        public float ballGravityScale = 1f;

        [Header("Passing")]
        [Tooltip("Maximum spread angle (degrees) for a 0-accuracy short pass.")]
        public float shortPassMaxSpread = 15f;

        [Tooltip("Maximum spread angle (degrees) for a 0-accuracy long pass.")]
        public float longPassMaxSpread = 20f;

        [Header("Shooting")]
        [Tooltip("Min shot speed (uncharged, m/s).")]
        public float shotSpeedMin = 10f;

        [Tooltip("Max shot speed (fully charged, m/s).")]
        public float shotSpeedMax = 28f;

        [Tooltip("Max charge time in seconds before shot is at full power.")]
        public float maxChargeSeconds = 1.5f;

        [Header("Tackling")]
        [Tooltip("Max distance (m) at which a tackle can be attempted.")]
        public float tackleRange = 1.5f;

        [Tooltip("Deflect impulse speed on successful tackle (m/s).")]
        public float tackleDeflectSpeed = 5f;
    }
}
