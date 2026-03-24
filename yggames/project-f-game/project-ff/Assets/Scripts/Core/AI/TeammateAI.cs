using UnityEngine;
using ProjectF.Player;
using ProjectF.Physics;

namespace ProjectF.AI
{
    /// <summary>
    /// Simple positional AI for uncontrolled teammates.
    /// Runs when PlayerController.IsControlled == false and the player is NOT the active GK.
    /// Behaviours:
    ///   - If team has the ball: move into open space (run ahead / support position).
    ///   - If team doesn't have the ball: hold a defensive shape relative to ball position.
    /// </summary>
    [RequireComponent(typeof(PlayerController))]
    public class TeammateAI : MonoBehaviour
    {
        [Tooltip("Home position in formation (local offset from centre).")]
        [SerializeField] private Vector3 _formationOffset;

        [Tooltip("How fast this AI moves.")]
        [SerializeField] private float _aiMoveSpeed = 4f;

        [Tooltip("Distance from formation anchor before AI repositions.")]
        [SerializeField] private float _repositionThreshold = 1f;

        private PlayerController _pc;
        private BallController _ball;
        private Rigidbody _rb;

        // ── Unity lifecycle ───────────────────────────────────────────────────

        private void Awake()
        {
            _pc = GetComponent<PlayerController>();
            _rb = GetComponent<Rigidbody>();
            _ball = FindAnyObjectByType<BallController>();
        }

        private void FixedUpdate()
        {
            // Only run when NOT directly controlled and not GK (GK has its own controller)
            if (_pc.IsControlled) return;
            if (_pc.Role == PlayerRole.Goalkeeper) return;
            if (_ball == null) return;

            Vector3 target = ComputeTargetPosition();
            MoveToward(target);
        }

        // ── Private ───────────────────────────────────────────────────────────

        private Vector3 ComputeTargetPosition()
        {
            bool teamHasBall = _ball.HasPossession &&
                               _ball.PossessingPlayer != null &&
                               _ball.PossessingPlayer.GetComponent<PlayerController>()?.TeamIndex == _pc.TeamIndex;

            Vector3 ballPos = _ball.transform.position;

            if (teamHasBall)
            {
                // Support run: offset forward (toward opponent goal) and laterally
                float attackX = _pc.TeamIndex == 0 ? 1f : -1f;
                Vector3 support = ballPos + new Vector3(attackX * 6f, 0f, _formationOffset.z);
                return support;
            }
            else
            {
                // Defensive shape: stay between ball and own goal, shifted by formation offset
                Vector3 ownGoal = _pc.TeamIndex == 0 ? new Vector3(-19f, 0f, 0f) : new Vector3(19f, 0f, 0f);
                Vector3 midpoint = Vector3.Lerp(ballPos, ownGoal, 0.4f);
                return midpoint + new Vector3(0f, 0f, _formationOffset.z);
            }
        }

        private void MoveToward(Vector3 target)
        {
            target.y = transform.position.y; // stay on ground plane
            Vector3 dir = target - transform.position;

            if (dir.sqrMagnitude < _repositionThreshold * _repositionThreshold)
            {
                _rb.linearVelocity = new Vector3(0f, _rb.linearVelocity.y, 0f);
                return;
            }

            dir = dir.normalized;
            _rb.linearVelocity = new Vector3(dir.x * _aiMoveSpeed, _rb.linearVelocity.y, dir.z * _aiMoveSpeed);

            if (dir != Vector3.zero)
                transform.forward = Vector3.Lerp(transform.forward, dir, Time.fixedDeltaTime * 8f);
        }
    }
}
