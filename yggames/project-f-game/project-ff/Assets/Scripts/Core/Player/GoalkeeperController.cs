using UnityEngine;
using ProjectF.Physics;
using ProjectF.Input;

namespace ProjectF.Player
{
    /// <summary>
    /// Goalkeeper behaviour — auto-positions on the goal line based on ball position.
    /// When GoalkeeperRush input is received (W key / touch button), GK moves toward the ball.
    /// Attach alongside PlayerController; runs its own logic for the GK role.
    /// </summary>
    [RequireComponent(typeof(PlayerController))]
    public class GoalkeeperController : MonoBehaviour
    {
        [Tooltip("Centre of own goal (world space).")]
        [SerializeField] private Vector3 _goalCenter = new(-19f, 0f, 0f);

        [Tooltip("Half-width of goal mouth the GK covers (Y axis = field width axis).")]
        [SerializeField] private float _goalHalfWidth = 3.5f;

        [Tooltip("How fast GK repositions automatically.")]
        [SerializeField] private float _repositionSpeed = 4f;

        [Tooltip("How fast GK rushes toward ball when triggered.")]
        [SerializeField] private float _rushSpeed = 6f;

        [Tooltip("Distance from ball at which rush stops and GK holds position.")]
        [SerializeField] private float _rushStopRadius = 1.5f;

        private PlayerController _pc;
        private BallController _ball;
        private Rigidbody _rb;
        private bool _isRushing;

        /// <summary>True when the human player has taken direct manual control of the goalkeeper.</summary>
        public bool IsManuallyControlled { get; set; }

        // ── Unity lifecycle ───────────────────────────────────────────────────

        private void Awake()
        {
            _pc = GetComponent<PlayerController>();
            _rb = GetComponent<Rigidbody>();
            _ball = FindAnyObjectByType<BallController>();

            // Align goal center with team
            if (_pc.TeamIndex == 0)
                _goalCenter = new Vector3(-19f, 0f, 0f);
            else
                _goalCenter = new Vector3(19f, 0f, 0f);
        }

        private void Update()
        {
            if (_ball == null) return;

            IInputProvider input = _pc.Input;
            if (input != null && input.GoalkeeperRush && !_isRushing)
                _isRushing = true;

            // Stop rushing when close enough
            if (_isRushing)
            {
                float dist = Vector3.Distance(transform.position, _ball.transform.position);
                if (dist <= _rushStopRadius)
                    _isRushing = false;
            }
        }

        private void FixedUpdate()
        {
            if (_ball == null) return;

            if (_isRushing)
                RushTowardBall();
            else
                AutoReposition();
        }

        // ── Private ───────────────────────────────────────────────────────────

        private void AutoReposition()
        {
            // Move laterally along the goal line to block the shooting angle
            Vector3 ballPos = _ball.transform.position;
            // Project ball position onto the goal line (Z axis)
            float targetZ = Mathf.Clamp(ballPos.z, -_goalHalfWidth, _goalHalfWidth);
            // Stay a little in front of the goal
            float targetX = _goalCenter.x + (_pc.TeamIndex == 0 ? 1.5f : -1.5f);
            Vector3 target = new(targetX, 0f, targetZ);

            Vector3 dir = (target - transform.position);
            if (dir.sqrMagnitude > 0.01f)
            {
                dir = dir.normalized;
                _rb.linearVelocity = new Vector3(dir.x * _repositionSpeed, _rb.linearVelocity.y, dir.z * _repositionSpeed);
            }
            else
            {
                _rb.linearVelocity = new Vector3(0f, _rb.linearVelocity.y, 0f);
            }
        }

        private void RushTowardBall()
        {
            Vector3 dir = (_ball.transform.position - transform.position).normalized;
            _rb.linearVelocity = new Vector3(dir.x * _rushSpeed, _rb.linearVelocity.y, dir.z * _rushSpeed);
        }
    }
}
