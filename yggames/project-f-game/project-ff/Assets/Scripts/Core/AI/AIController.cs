using UnityEngine;
using ProjectF.Player;
using ProjectF.Physics;
using ProjectF.Input;
using ProjectF.Config;

namespace ProjectF.AI
{
    /// <summary>
    /// Drives a single AI opponent player.
    /// Runs the AIStateMachine each frame and translates decisions into AIInputProvider outputs
    /// which PlayerController consumes identically to human input (IInputProvider abstraction).
    ///
    /// Attach alongside PlayerController on every AI-controlled opponent.
    /// Set PlayerController.Input to the AIInputProvider instance created here.
    /// </summary>
    [RequireComponent(typeof(PlayerController))]
    public class AIController : MonoBehaviour
    {
        [Tooltip("Difficulty tuning asset. Assign a pre-made AIDifficultyConfig or leave null to use Normal defaults.")]
        [SerializeField] private AIDifficultyConfig _difficulty;

        [Tooltip("Ball controller in the scene.")]
        [SerializeField] private BallController _ball;

        // Runtime
        private PlayerController _pc;
        private AIInputProvider  _aiInput;
        private AIStateMachine   _fsm;

        // Reaction delay timer
        private float _reactionTimer;
        private bool  _canAct;

        // Shoot charge timer
        private bool  _isChargingShot;
        private float _targetShotCharge;

        // ── Unity lifecycle ───────────────────────────────────────────────────────

        private void Awake()
        {
            _pc      = GetComponent<PlayerController>();
            _aiInput = new AIInputProvider();
            _pc.Input = _aiInput;
            _pc.IsControlled = true; // Let PlayerController Update() run (AI writes its own input)

            if (_ball == null)
                _ball = FindAnyObjectByType<BallController>();

            if (_difficulty == null)
                _difficulty = AIDifficultyConfig.Normal();

            _fsm = new AIStateMachine(_pc, _ball);
        }

        private void Update()
        {
            _aiInput.ResetFrameInputs();

            // Reaction delay — AI doesn't act instantly
            _reactionTimer -= Time.deltaTime;
            if (_reactionTimer <= 0f)
            {
                _canAct = true;
                _reactionTimer = _difficulty.ReactionDelay;
            }

            if (!_canAct) return;

            _fsm.Tick(_difficulty.ShootingRange);
            ExecuteState();
        }

        // ── State execution ───────────────────────────────────────────────────────

        private void ExecuteState()
        {
            switch (_fsm.CurrentState)
            {
                case AIState.Idle:
                    HoldPosition();
                    break;

                case AIState.ChaseBall:
                    MoveToward(_ball != null ? _ball.transform.position : transform.position);
                    break;

                case AIState.HasBall:
                    DecideWithBall();
                    break;

                case AIState.Attacking:
                    PushTowardGoal();
                    break;

                case AIState.Shooting:
                    ExecuteShot();
                    break;

                case AIState.Defending:
                    ExecuteDefense();
                    break;

                case AIState.LoseBall:
                    // Sprint briefly to try to recover
                    if (_ball != null)
                    {
                        MoveToward(_ball.transform.position);
                        _aiInput.Sprint = true;
                    }
                    break;
            }
        }

        // ── State behaviours ──────────────────────────────────────────────────────

        private void HoldPosition()
        {
            // Stay in rough formation position; slight drift toward ball
            Vector3 formationPos = GetFormationPosition();
            if (Vector3.Distance(transform.position, formationPos) > 1.5f)
                MoveToward(formationPos);
            else
                _aiInput.Movement = Vector2.zero;
        }

        private void DecideWithBall()
        {
            PlayerController teammate = FindNearestTeammate();
            float distToTeammate = teammate != null
                ? Vector3.Distance(transform.position, teammate.transform.position)
                : float.MaxValue;

            float roll = Random.value;

            if (distToTeammate <= _difficulty.ShortPassPreferenceRange && roll < _difficulty.PassAccuracy)
            {
                // Pass
                _aiInput.ShortPass = true;
            }
            else
            {
                // Dribble toward goal
                PushTowardGoal();
            }
        }

        private void PushTowardGoal()
        {
            Vector3 opponentGoal = _pc.TeamIndex == 1
                ? new Vector3(-19f, 0f, 0f)
                : new Vector3( 19f, 0f, 0f);

            MoveToward(opponentGoal);
        }

        private void ExecuteShot()
        {
            // Keep facing goal while charging
            Vector3 opponentGoal = _pc.TeamIndex == 1
                ? new Vector3(-19f, 1f, 0f)
                : new Vector3( 19f, 1f, 0f);
            MoveToward(opponentGoal);

            if (!_isChargingShot)
            {
                _isChargingShot  = true;
                _targetShotCharge = Random.Range(_difficulty.MinShotChargeTime, _difficulty.MaxShotChargeTime);
                _fsm.ResetShootCharge();
            }

            _aiInput.ShootHeld = true;
            _fsm.AccumulateShootCharge(Time.deltaTime);

            if (_fsm.ShootCharge >= _targetShotCharge)
            {
                // Apply shot accuracy — bad shots go wide
                if (Random.value <= _difficulty.ShotAccuracy)
                {
                    _aiInput.ShootReleased = true;
                }
                else
                {
                    // Inaccurate: still release but direction will be off (handled by PlayerController randomisation)
                    _aiInput.ShootReleased = true;
                }

                _aiInput.ShootHeld  = false;
                _isChargingShot     = false;
                _fsm.ResetShootCharge();
            }
        }

        private void ExecuteDefense()
        {
            if (_ball == null) return;

            GameObject ballCarrier = _ball.PossessingPlayer;
            if (ballCarrier == null)
            {
                // Chase loose ball
                MoveToward(_ball.transform.position);
                return;
            }

            float distToCarrier = Vector3.Distance(transform.position, ballCarrier.transform.position);

            if (distToCarrier > 5f)
            {
                // Too far — press
                _aiInput.Press = true;
                MoveToward(ballCarrier.transform.position);

                if (_difficulty.DefensiveAggressiveness > 0.5f)
                    _aiInput.Sprint = true;
            }
            else if (distToCarrier <= 1.5f)
            {
                // Close enough — attempt tackle based on success rate
                if (Random.value < _difficulty.TackleSuccess)
                    _aiInput.Tackle = true;
            }
            else
            {
                // Close down
                MoveToward(ballCarrier.transform.position);
            }
        }

        // ── Helpers ───────────────────────────────────────────────────────────────

        private void MoveToward(Vector3 target)
        {
            Vector3 dir = (target - transform.position);
            dir.y = 0f;
            if (dir.sqrMagnitude < 0.1f)
            {
                _aiInput.Movement = Vector2.zero;
                return;
            }
            dir.Normalize();
            _aiInput.Movement = new Vector2(dir.x, dir.z);
        }

        private Vector3 GetFormationPosition()
        {
            // Rough formation: push forward when team has ball, pull back when defending
            float attackX = _pc.TeamIndex == 1 ? -10f : 10f;
            return new Vector3(attackX, 0f, transform.position.z);
        }

        private PlayerController FindNearestTeammate()
        {
            PlayerController[] all = FindObjectsByType<PlayerController>();
            PlayerController best = null;
            float bestDist = float.MaxValue;

            foreach (PlayerController p in all)
            {
                if (p == _pc) continue;
                if (p.TeamIndex != _pc.TeamIndex) continue;
                float d = Vector3.Distance(transform.position, p.transform.position);
                if (d < bestDist) { bestDist = d; best = p; }
            }

            return best;
        }
    }
}
