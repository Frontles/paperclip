using UnityEngine;
using ProjectF.Input;
using ProjectF.Config;
using ProjectF.Match;
using ProjectF.Physics;

namespace ProjectF.Player
{
    public enum PlayerRole { Forward, Midfielder, Goalkeeper }

    /// <summary>
    /// Main player controller — reads IInputProvider and drives movement, passing, shooting, tackling.
    /// Attach to every on-field character. Set IsControlled to switch between human and AI input.
    /// </summary>
    [RequireComponent(typeof(Rigidbody))]
    public class PlayerController : MonoBehaviour
    {
        // ── Inspector ────────────────────────────────────────────────────────────
        [Tooltip("Team index: 0 = home, 1 = away.")]
        [SerializeField] public int TeamIndex;

        [Tooltip("Role of this player.")]
        [SerializeField] public PlayerRole Role;

        [Tooltip("Unique identifier (e.g. card id).")]
        [SerializeField] public string PlayerId;

        [Tooltip("Match config asset.")]
        [SerializeField] private MatchConfig _config;

        [Tooltip("Ball controller in the scene.")]
        [SerializeField] private BallController _ball;

        [Tooltip("Offset from player position where ball is held.")]
        [SerializeField] private Vector3 _ballHoldOffset = new(0f, 0.2f, 0.7f);

        [Tooltip("Distance within which ball is automatically collected.")]
        [SerializeField] private float _pickupRadius = 1.8f;

        // ── Runtime state ─────────────────────────────────────────────────────
        public PlayerStats Stats { get; private set; } = new();
        public StaminaSystem Stamina { get; private set; }
        public IInputProvider Input { get; set; }

        /// <summary>Whether this player is the one currently controlled by the human.</summary>
        public bool IsControlled { get; set; }

        public bool HasBall => _ball != null && _ball.PossessingPlayer == gameObject;

        // Cooldown after releasing ball (prevents instant re-pickup)
        private float _pickupCooldown;
        private const float PickupCooldownTime = 0.5f;

        private Rigidbody _rb;

        // shoot charge state
        private bool _wasShootHeld;

        // tackle cooldown
        private float _tackleCooldown;
        private const float TackleCooldownTime = 1f;

        // ── Unity lifecycle ───────────────────────────────────────────────────

        private void Awake()
        {
            _rb = GetComponent<Rigidbody>();
            _rb.constraints = RigidbodyConstraints.FreezeRotation;

            // Auto-find ball if not assigned
            if (_ball == null)
                _ball = FindAnyObjectByType<ProjectF.Physics.BallController>();

            // Auto-find config if not assigned
            if (_config == null)
            {
                var server = FindAnyObjectByType<MatchServer>();
                if (server != null)
                    _config = server.GetType().GetField("_config",
                        System.Reflection.BindingFlags.NonPublic | System.Reflection.BindingFlags.Instance)
                        ?.GetValue(server) as MatchConfig;
            }

            Stamina = new StaminaSystem(_config, Stats.MaxStaminaMultiplier);
        }

        // ── Indicator ────────────────────────────────────────────────────────
        private GameObject _indicator;

        private void Start()
        {
            // Create overhead indicator arrow
            _indicator = GameObject.CreatePrimitive(PrimitiveType.Cube);
            _indicator.name = "Indicator";
            _indicator.transform.SetParent(transform);
            _indicator.transform.localPosition = new Vector3(0f, 1.5f, 0f);
            _indicator.transform.localScale = new Vector3(0.3f, 0.3f, 0.3f);
            Object.Destroy(_indicator.GetComponent<Collider>());
            var mat = new Material(Shader.Find("Universal Render Pipeline/Lit"));
            if (mat.shader == null || mat.shader.name == "Hidden/InternalErrorShader")
                mat = new Material(Shader.Find("Standard"));
            mat.color = Color.yellow;
            _indicator.GetComponent<Renderer>().material = mat;
            _indicator.SetActive(false);
        }

        private void Update()
        {
            // Update indicator visibility
            if (_indicator != null)
                _indicator.SetActive(IsControlled);

            // Tick cooldowns
            if (_tackleCooldown > 0f) _tackleCooldown -= Time.deltaTime;

            // Ball pickup for ALL players (not just controlled)
            HandleBallPickup();

            if (Input == null) return;
            if (!IsControlled) return;

            if (HasBall)
            {
                // Move ball with player
                _ball.AttachToPlayer(transform, transform.TransformDirection(_ballHoldOffset));
                HandleAttackingInput();
            }
            else
            {
                HandleDefendingInput();
            }
        }

        private void FixedUpdate()
        {
            if (Input == null) return;
            if (!IsControlled) return;

            MovePlayer();
        }

        // ── Public API ────────────────────────────────────────────────────────

        /// <summary>Initialise stats from a data source (card system).</summary>
        public void InitStats(PlayerStats stats)
        {
            Stats = stats;
            Stamina = new StaminaSystem(_config, stats.MaxStaminaMultiplier);
        }

        // ── Movement ─────────────────────────────────────────────────────────

        private void MovePlayer()
        {
            Vector2 raw = Input.Movement;
            if (raw.sqrMagnitude < 0.01f)
            {
                _rb.linearVelocity = new Vector3(0f, _rb.linearVelocity.y, 0f);
                return;
            }

            bool canSprint = Stamina.Tick(Input.Sprint, Time.fixedDeltaTime);
            float speed = Stats.BaseSpeed;

            if (canSprint && Input.Sprint)
                speed *= _config.sprintMultiplier;
            else if (Stamina.Depleted)
                speed *= 0.8f; // GDD: 20% slow when stamina depleted

            Vector3 moveDir = new Vector3(raw.x, 0f, raw.y).normalized;
            _rb.linearVelocity = new Vector3(moveDir.x * speed, _rb.linearVelocity.y, moveDir.z * speed);

            // Face movement direction
            if (moveDir != Vector3.zero)
                transform.forward = Vector3.Lerp(transform.forward, moveDir, Time.fixedDeltaTime * 12f);
        }

        // ── Ball pickup ───────────────────────────────────────────────────────

        private void HandleBallPickup()
        {
            if (_ball == null) return;

            // Cooldown after pass/shot — prevent instant re-pickup
            if (_pickupCooldown > 0f)
            {
                _pickupCooldown -= Time.deltaTime;
                return;
            }

            // If ball is possessed by anyone, skip
            if (_ball.HasPossession) return;

            float dist = Vector3.Distance(transform.position, _ball.transform.position);
            if (dist <= _pickupRadius)
                _ball.GrantPossession(gameObject);
        }

        // ── Attacking input ───────────────────────────────────────────────────

        private void HandleAttackingInput()
        {
            // Short pass (S key — single press)
            if (Input.ShortPass)
            {
                ExecuteShortPass();
                _pickupCooldown = PickupCooldownTime;
                return;
            }

            // Long / through pass (W key — single press)
            if (Input.LongPass)
            {
                ExecuteLongPass();
                _pickupCooldown = PickupCooldownTime;
                return;
            }

            // Cross (A key — single press)
            if (Input.Cross)
            {
                ExecuteCross();
                _pickupCooldown = PickupCooldownTime;
                return;
            }

            // Shoot: hold D to charge, release to fire
            if (Input.ShootHeld)
            {
                _ball.ChargeShot(Time.deltaTime);
                _wasShootHeld = true;
            }
            else if (_wasShootHeld)
            {
                // D was released this frame
                ExecuteShot();
                _wasShootHeld = false;
                _pickupCooldown = PickupCooldownTime;
            }
        }

        // ── Defending input ───────────────────────────────────────────────────

        private void HandleDefendingInput()
        {
            // Pressing: move toward ball carrier
            if (Input.Press && _ball != null && _ball.PossessingPlayer != null)
            {
                Vector3 dir = (_ball.PossessingPlayer.transform.position - transform.position).normalized;
                _rb.linearVelocity = new Vector3(dir.x * Stats.BaseSpeed, _rb.linearVelocity.y, dir.z * Stats.BaseSpeed);
            }

            // Tackle
            if (Input.Tackle)
                ExecuteTackle();
        }

        // ── Pass / shoot / tackle actions ─────────────────────────────────────

        private void ExecuteShortPass()
        {
            PlayerController nearest = FindNearestTeammate();
            Debug.Log($"[PASS] ShortPass by {name}, nearest: {(nearest != null ? nearest.name : "NULL")}");
            if (nearest == null) return;
            _ball.ShortPass(nearest.transform, Stats.PassAccuracy);
        }

        private void ExecuteLongPass()
        {
            // Pass into space ahead of nearest teammate
            PlayerController nearest = FindNearestTeammate();
            if (nearest == null) return;
            Vector3 targetSpace = nearest.transform.position + nearest.transform.forward * 5f;
            _ball.LongPass(targetSpace, Stats.PassAccuracy);
        }

        private void ExecuteCross()
        {
            // Cross toward the penalty area center (approximate)
            Vector3 goalCenter = TeamIndex == 0 ? new Vector3(19f, 0f, 0f) : new Vector3(-19f, 0f, 0f);
            _ball.Cross(goalCenter, Stats.PassAccuracy);
        }

        private void ExecuteShot()
        {
            Vector3 goalCenter = TeamIndex == 0 ? new Vector3(19f, 1f, 0f) : new Vector3(-19f, 1f, 0f);
            Vector3 direction = (goalCenter - transform.position).normalized;
            Debug.Log($"[SHOT] {name} shooting! Charge: {_wasShootHeld}, Power: {Stats.ShootPower}, Dir: {direction}");
            _ball.ReleaseShot(direction, Stats.ShootPower);
        }

        private void ExecuteTackle()
        {
            if (_tackleCooldown > 0f) return;
            if (_ball == null || _ball.PossessingPlayer == null) return;
            float dist = Vector3.Distance(transform.position, _ball.PossessingPlayer.transform.position);
            if (dist > 1.5f) return; // too far to tackle
            _tackleCooldown = TackleCooldownTime;

            float roll = Random.value;
            PlayerController ballHolder = _ball.PossessingPlayer.GetComponent<PlayerController>();

            // Foul risk: if we tackle too early (simplified: random based on DEF)
            if (roll < Stats.TackleSuccess)
            {
                // Successful tackle
                _ball.Deflect(transform.forward);
                GameEvents.RaiseTackle(new PlayerEventData(PlayerId, TeamIndex, transform.position));
            }
            else
            {
                // Foul
                GameEvents.RaiseFoul(new PlayerEventData(PlayerId, TeamIndex, transform.position));
            }
        }

        // ── Helpers ───────────────────────────────────────────────────────────

        private PlayerController FindNearestTeammate()
        {
            PlayerController[] all = FindObjectsByType<PlayerController>();
            PlayerController best = null;
            float bestDist = float.MaxValue;

            foreach (PlayerController p in all)
            {
                if (p == this) continue;
                if (p.TeamIndex != TeamIndex) continue;
                float d = Vector3.Distance(transform.position, p.transform.position);
                if (d < bestDist) { bestDist = d; best = p; }
            }

            return best;
        }
    }
}
