using UnityEngine;
using ProjectF.Physics;

namespace ProjectF.Match
{
    /// <summary>
    /// Place behind each goal line. Detects ball entry via distance check (no tag required).
    /// When the ball enters the trigger zone, a goal is scored for the attacking team.
    /// </summary>
    public class GoalTrigger : MonoBehaviour
    {
        [Tooltip("Which team DEFENDS this goal. 0 = home defends left, 1 = away defends right.")]
        public int DefendingTeam;

        [Tooltip("Detection radius for the ball.")]
        public float DetectionRadius = 3f;

        private MatchServer _server;
        private BallController _ball;
        private bool _cooldown;

        private void Awake()
        {
            _server = FindAnyObjectByType<MatchServer>();
            _ball = FindAnyObjectByType<BallController>();
        }

        private void OnEnable()
        {
            GameEvents.OnKickOff += ResetCooldown;
        }

        private void OnDisable()
        {
            GameEvents.OnKickOff -= ResetCooldown;
        }

        private void Update()
        {
            if (_ball == null || _server == null || _cooldown) return;

            // Don't detect goals when ball is possessed (being carried)
            if (_ball.HasPossession) return;

            float dist = Vector3.Distance(transform.position, _ball.transform.position);
            if (dist < DetectionRadius)
            {
                _cooldown = true;
                int scoringTeam = DefendingTeam == 0 ? 1 : 0;
                _server.RegisterGoal(scoringTeam, "unknown");
                Debug.Log($"<color=green>GOAL! Team {scoringTeam} scores!</color>");
            }
        }

        private void ResetCooldown()
        {
            _cooldown = false;
        }
    }
}
