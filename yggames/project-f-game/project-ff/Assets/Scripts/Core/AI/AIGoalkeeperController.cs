using UnityEngine;
using ProjectF.Player;
using ProjectF.Physics;
using ProjectF.Input;
using ProjectF.Config;

namespace ProjectF.AI
{
    /// <summary>
    /// AI goalkeeper behaviour — automatic positioning, shot prediction, and diving.
    /// Works as a companion to GoalkeeperController; overrides input when not manually controlled.
    ///
    /// Positioning logic:
    ///   - Track ball X position, slide along goal line to intercept.
    ///   - When ball is in shooting range of enemy: anticipate shot direction, dive.
    ///   - After save: distribute ball to nearest teammate.
    /// </summary>
    [RequireComponent(typeof(GoalkeeperController))]
    public class AIGoalkeeperController : MonoBehaviour
    {
        [Tooltip("Difficulty config — same asset used by AIController for the team.")]
        [SerializeField] private AIDifficultyConfig _difficulty;

        [Tooltip("Ball controller in the scene.")]
        [SerializeField] private BallController _ball;

        [Tooltip("Centre of the goal this GK defends (world space).")]
        [SerializeField] private Vector3 _goalCenter = new(-19f, 0f, 0f);

        [Tooltip("Half-width of the goal (GK slides within this range on Z axis).")]
        [SerializeField] private float _goalHalfWidth = 3f;

        [Tooltip("Distance from goal line GK stays at during normal play.")]
        [SerializeField] private float _standingDepth = 1f;

        [Tooltip("Distance at which GK considers the ball 'in shooting range' of the attacker.")]
        [SerializeField] private float _threatRange = 12f;

        private GoalkeeperController _gkc;
        private PlayerController     _pc;
        private AIInputProvider      _aiInput;
        private Rigidbody            _rb;

        private bool  _hasDived;
        private float _distributionTimer;

        // ── Unity lifecycle ───────────────────────────────────────────────────────

        private void Awake()
        {
            _gkc     = GetComponent<GoalkeeperController>();
            _pc      = GetComponent<PlayerController>();
            _rb      = GetComponent<Rigidbody>();
            _aiInput = new AIInputProvider();

            if (_ball == null)
                _ball = FindAnyObjectByType<BallController>();

            if (_difficulty == null)
                _difficulty = AIDifficultyConfig.Normal();
        }

        private void Update()
        {
            _aiInput.ResetFrameInputs();

            if (_gkc.IsManuallyControlled) return; // Player took over

            if (HasBall())
            {
                HandleDistribution();
                return;
            }

            _hasDived = false;

            bool ballThreat = IsBallThreat();

            if (ballThreat && !_hasDived)
                AnticipateAndDive();
            else
                TrackBall();
        }

        private void FixedUpdate()
        {
            if (_gkc.IsManuallyControlled) return;
            ApplyMovement();
        }

        // ── Behaviours ────────────────────────────────────────────────────────────

        private void TrackBall()
        {
            if (_ball == null) return;

            // Slide along goal line to align with ball's Z position
            float targetZ = Mathf.Clamp(_ball.transform.position.z, -_goalHalfWidth, _goalHalfWidth);
            float targetX = _goalCenter.x + (_pc.TeamIndex == 0 ? _standingDepth : -_standingDepth);

            Vector3 target = new(targetX, transform.position.y, targetZ);
            Vector3 dir    = target - transform.position;
            dir.y = 0f;

            _aiInput.Movement = dir.sqrMagnitude > 0.1f
                ? new Vector2(dir.normalized.x, dir.normalized.z)
                : Vector2.zero;
        }

        private void AnticipateAndDive()
        {
            if (_ball == null) return;

            // Predict where ball will cross goal line (simplified: extrapolate current ball velocity)
            Rigidbody ballRb = _ball.GetComponent<Rigidbody>();
            Vector3 predictedZ = _ball.transform.position;
            if (ballRb != null && ballRb.linearVelocity.sqrMagnitude > 0.1f)
            {
                float timeToGoal = Mathf.Abs((_goalCenter.x - _ball.transform.position.x) /
                                             (ballRb.linearVelocity.x != 0f ? ballRb.linearVelocity.x : 0.01f));
                predictedZ = _ball.transform.position + ballRb.linearVelocity * timeToGoal;
            }

            float diveZ = predictedZ.z;

            // Add inaccuracy based on difficulty (Hard GK dives more accurately)
            float maxError = Mathf.Lerp(3f, 0.5f, _difficulty.ShotAccuracy); // reuse shot accuracy as GK skill proxy
            diveZ += Random.Range(-maxError, maxError);
            diveZ  = Mathf.Clamp(diveZ, -_goalHalfWidth, _goalHalfWidth);

            // Set dive direction movement
            Vector3 diveTarget = new(_goalCenter.x, transform.position.y, diveZ);
            Vector3 dir        = (diveTarget - transform.position).normalized;
            _aiInput.Movement  = new Vector2(dir.x, dir.z);
            _aiInput.Sprint    = true;
            _hasDived = true;
        }

        private void HandleDistribution()
        {
            _distributionTimer += Time.deltaTime;
            if (_distributionTimer > 1.5f) // short delay then kick
            {
                _aiInput.LongPass      = true;
                _distributionTimer     = 0f;
            }
        }

        // ── Helpers ───────────────────────────────────────────────────────────────

        private void ApplyMovement()
        {
            Vector2 mv = _aiInput.Movement;
            if (mv.sqrMagnitude < 0.01f)
            {
                _rb.linearVelocity = new Vector3(0f, _rb.linearVelocity.y, 0f);
                return;
            }
            float speed = 5f;
            _rb.linearVelocity = new Vector3(mv.x * speed, _rb.linearVelocity.y, mv.y * speed);
        }

        private bool HasBall()
        {
            var pc = GetComponent<PlayerController>();
            return pc != null && pc.HasBall;
        }

        private bool IsBallThreat()
        {
            if (_ball == null || !_ball.HasPossession) return false;
            var holder = _ball.PossessingPlayer?.GetComponent<PlayerController>();
            if (holder == null || holder.TeamIndex == _pc.TeamIndex) return false;

            float distToGoal = Vector3.Distance(_ball.transform.position, _goalCenter);
            return distToGoal <= _threatRange;
        }
    }
}
