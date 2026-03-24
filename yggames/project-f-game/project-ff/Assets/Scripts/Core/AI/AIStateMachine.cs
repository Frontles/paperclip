using UnityEngine;
using ProjectF.Player;
using ProjectF.Physics;

namespace ProjectF.AI
{
    /// <summary>
    /// AI state machine for a single outfield opponent player.
    /// States from GDD Section 3.6:
    ///   IDLE → CHASE_BALL → HAS_BALL → ATTACKING → SHOOTING
    ///                     ↓                         ↓
    ///                 DEFENDING ← LOSE_BALL ← TACKLED
    /// </summary>
    public enum AIState
    {
        Idle,
        ChaseBall,
        HasBall,
        Attacking,
        Shooting,
        Defending,
        LoseBall,
    }

    public class AIStateMachine
    {
        public AIState CurrentState { get; private set; } = AIState.Idle;

        private readonly PlayerController _player;
        private readonly BallController   _ball;

        // Shoot charge accumulator
        public float ShootCharge { get; private set; }

        public AIStateMachine(PlayerController player, BallController ball)
        {
            _player = player;
            _ball   = ball;
        }

        // ── Public ────────────────────────────────────────────────────────────────

        /// <summary>Evaluate and transition state based on current game situation.</summary>
        public void Tick(float shootingRange)
        {
            bool teamHasBall = TeamHasBall();
            bool iHaveBall   = _player.HasBall;
            bool enemyHasBall= EnemyHasBall();

            switch (CurrentState)
            {
                case AIState.Idle:
                    if (iHaveBall)        TransitionTo(AIState.HasBall);
                    else if (enemyHasBall) TransitionTo(AIState.Defending);
                    else                   TransitionTo(AIState.ChaseBall);
                    break;

                case AIState.ChaseBall:
                    if (iHaveBall)                          TransitionTo(AIState.HasBall);
                    else if (enemyHasBall)                  TransitionTo(AIState.Defending);
                    else if (_ball == null || _ball.HasPossession) TransitionTo(AIState.Idle);
                    break;

                case AIState.HasBall:
                    if (!iHaveBall)       TransitionTo(AIState.LoseBall);
                    else if (IsInShootingRange(shootingRange)) TransitionTo(AIState.Shooting);
                    else                   TransitionTo(AIState.Attacking);
                    break;

                case AIState.Attacking:
                    if (!iHaveBall)       TransitionTo(AIState.LoseBall);
                    else if (IsInShootingRange(shootingRange)) TransitionTo(AIState.Shooting);
                    break;

                case AIState.Shooting:
                    if (!iHaveBall)       TransitionTo(AIState.LoseBall);
                    // stays in shooting until shot fires (handled by AIController)
                    break;

                case AIState.Defending:
                    if (iHaveBall)        TransitionTo(AIState.HasBall);
                    else if (!enemyHasBall && !teamHasBall) TransitionTo(AIState.ChaseBall);
                    else if (teamHasBall)  TransitionTo(AIState.Idle);
                    break;

                case AIState.LoseBall:
                    if (iHaveBall)        TransitionTo(AIState.HasBall);
                    else if (enemyHasBall) TransitionTo(AIState.Defending);
                    else                   TransitionTo(AIState.ChaseBall);
                    break;
            }
        }

        public void AccumulateShootCharge(float delta) => ShootCharge += delta;
        public void ResetShootCharge()                  => ShootCharge = 0f;

        // ── Private ───────────────────────────────────────────────────────────────

        private void TransitionTo(AIState next)
        {
            if (next == CurrentState) return;
#if UNITY_EDITOR
            Debug.Log($"[AI:{_player.name}] {CurrentState} → {next}");
#endif
            CurrentState = next;
        }

        private bool TeamHasBall()
        {
            if (_ball == null || !_ball.HasPossession) return false;
            var holder = _ball.PossessingPlayer?.GetComponent<PlayerController>();
            return holder != null && holder.TeamIndex == _player.TeamIndex;
        }

        private bool EnemyHasBall()
        {
            if (_ball == null || !_ball.HasPossession) return false;
            var holder = _ball.PossessingPlayer?.GetComponent<PlayerController>();
            return holder != null && holder.TeamIndex != _player.TeamIndex;
        }

        private bool IsInShootingRange(float range)
        {
            if (_ball == null) return false;
            // AI team 1 shoots toward negative X goal; team 0 shoots toward positive X
            Vector3 opponentGoal = _player.TeamIndex == 1
                ? new Vector3(-19f, 0f, 0f)
                : new Vector3( 19f, 0f, 0f);
            return Vector3.Distance(_player.transform.position, opponentGoal) <= range;
        }
    }
}
