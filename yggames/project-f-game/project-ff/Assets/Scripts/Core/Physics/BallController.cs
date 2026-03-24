using UnityEngine;
using ProjectF.Config;
using ProjectF.Match;

namespace ProjectF.Physics
{
    /// <summary>
    /// Authoritative ball controller.
    /// Manages possession, passing, shooting, and out-of-bounds detection.
    /// Requires a Rigidbody on the same GameObject.
    /// </summary>
    [RequireComponent(typeof(Rigidbody))]
    public class BallController : MonoBehaviour
    {
        [Tooltip("Match config asset.")]
        [SerializeField] private MatchConfig _config;

        [Tooltip("Layer mask for player colliders.")]
        [SerializeField] private LayerMask _playerLayer;

        private Rigidbody _rb;

        /// <summary>Player currently in possession. Null if ball is loose.</summary>
        public GameObject PossessingPlayer { get; private set; }

        public bool HasPossession => PossessingPlayer != null;

        // ── Shooting charge ────────────────────────────────────────────────────
        private float _shootChargeTime;
        private const float MaxChargeSeconds = 1.5f;

        // ── Field bounds (set by MatchServer) ─────────────────────────────────
        private Bounds _fieldBounds;

        // ── Unity lifecycle ───────────────────────────────────────────────────

        private void Awake()
        {
            _rb = GetComponent<Rigidbody>();
            ApplyPhysicsConfig();
        }

        private void OnEnable()
        {
            GameEvents.OnKickOff += HandleKickOff;
        }

        private void OnDisable()
        {
            GameEvents.OnKickOff -= HandleKickOff;
        }

        private void Update()
        {
            // Keep MatchState ball position up to date (authoritative layer)
        }

        private void FixedUpdate()
        {
            ClampToField();
        }

        private void OnCollisionEnter(Collision collision)
        {
            // Possession is granted by PlayerController proximity — not collision.
        }

        // ── Public API ────────────────────────────────────────────────────────

        /// <summary>Called each frame by the possessing player to stick ball to them.</summary>
        private Collider _collider;

        public void AttachToPlayer(Transform playerTransform, Vector3 offset)
        {
            if (!_rb.isKinematic)
            {
                _rb.linearVelocity = Vector3.zero;
                _rb.angularVelocity = Vector3.zero;
            }
            _rb.isKinematic = true;
            if (_collider == null) _collider = GetComponent<Collider>();
            if (_collider != null) _collider.enabled = false;
            transform.position = playerTransform.position + offset;
        }

        /// <summary>Grant possession to a player.</summary>
        public void GrantPossession(GameObject player)
        {
            PossessingPlayer = player;
            _rb.isKinematic = true;
            GameEvents.RaiseBallPossessionChanged(player);
        }

        /// <summary>Release ball (e.g., after pass or tackle).</summary>
        public void ReleasePossession()
        {
            PossessingPlayer = null;
            _rb.isKinematic = false;
            if (_collider == null) _collider = GetComponent<Collider>();
            if (_collider != null) _collider.enabled = true;
        }

        /// <summary>
        /// Short pass toward <paramref name="target"/> with accuracy spread based on PAS.
        /// </summary>
        public void ShortPass(Transform target, float passAccuracy)
        {
            ReleasePossession();
            Vector3 direction = (target.position - transform.position).normalized;
            direction = ApplyAccuracySpread(direction, passAccuracy, 15f);
            float speed = Mathf.Lerp(8f, 14f, passAccuracy);
            _rb.AddForce(direction * speed, ForceMode.VelocityChange);
        }

        /// <summary>
        /// Through / long pass into space.
        /// </summary>
        public void LongPass(Vector3 targetPosition, float passAccuracy)
        {
            ReleasePossession();
            Vector3 direction = (targetPosition - transform.position).normalized;
            direction = ApplyAccuracySpread(direction, passAccuracy, 20f);
            float speed = Mathf.Lerp(10f, 18f, passAccuracy);
            _rb.AddForce(direction * speed + Vector3.up * 2f, ForceMode.VelocityChange);
        }

        /// <summary>
        /// Cross from wing toward the center of the box.
        /// </summary>
        public void Cross(Vector3 centerTarget, float passAccuracy)
        {
            ReleasePossession();
            Vector3 direction = (centerTarget - transform.position).normalized;
            direction = ApplyAccuracySpread(direction, passAccuracy, 18f);
            float speed = Mathf.Lerp(12f, 20f, passAccuracy);
            _rb.AddForce(direction * speed + Vector3.up * 3f, ForceMode.VelocityChange);
        }

        /// <summary>
        /// Accumulate shot charge (call while D is held).
        /// </summary>
        public void ChargeShot(float deltaTime)
        {
            _shootChargeTime = Mathf.Min(_shootChargeTime + deltaTime, MaxChargeSeconds);
        }

        /// <summary>
        /// Release shot toward goal / direction.
        /// </summary>
        public void ReleaseShot(Vector3 direction, float shootPower)
        {
            float chargeRatio = _shootChargeTime / MaxChargeSeconds;
            _shootChargeTime = 0f;
            ReleasePossession();

            direction = direction.normalized;
            float speed = Mathf.Lerp(10f, 28f, chargeRatio) * shootPower;
            // Slight upward angle for low shots
            direction += Vector3.up * 0.1f;
            _rb.AddForce(direction * speed, ForceMode.VelocityChange);
        }

        /// <summary>
        /// Deflect ball away (tackle result).
        /// </summary>
        public void Deflect(Vector3 tackleDirection)
        {
            ReleasePossession();
            _rb.AddForce(tackleDirection.normalized * 5f, ForceMode.VelocityChange);
        }

        /// <summary>Set field bounds (called by MatchServer on match start).</summary>
        public void SetFieldBounds(Bounds bounds) => _fieldBounds = bounds;

        /// <summary>Teleport ball to a specific world position and clear all velocity (kickoff / foul reset).</summary>
        public void ResetToCentre(Vector3 position)
        {
            ReleasePossession();
            _rb.isKinematic = false;
            transform.position  = position;
            _rb.linearVelocity  = Vector3.zero;
            _rb.angularVelocity = Vector3.zero;
            _shootChargeTime    = 0f;
        }

        // ── Private ───────────────────────────────────────────────────────────

        private void ApplyPhysicsConfig()
        {
            if (_config == null) return;
            _rb.linearDamping  = _config.ballLinearDrag;
            _rb.useGravity = true;
        }

        private void ClampToField()
        {
            if (_fieldBounds.size == Vector3.zero) return;

            Vector3 pos = transform.position;
            if (!_fieldBounds.Contains(pos))
            {
                GameEvents.RaiseBallOutOfBounds();
            }
        }

        private void HandleKickOff()
        {
            ReleasePossession();
            transform.position = new Vector3(0f, 0.3f, 0f);
            _rb.linearVelocity = Vector3.zero;
            _rb.angularVelocity = Vector3.zero;
        }

        private static Vector3 ApplyAccuracySpread(Vector3 direction, float accuracy, float maxDegrees)
        {
            float spread = (1f - accuracy) * maxDegrees;
            float angle = Random.Range(-spread, spread);
            return Quaternion.Euler(0f, angle, 0f) * direction;
        }
    }
}
