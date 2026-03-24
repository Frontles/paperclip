using UnityEngine;

namespace ProjectF.Player
{
    /// <summary>
    /// Swap-ready visual component. Changing the player model = changing modelPrefab reference only.
    /// All animations use Humanoid rig so any Humanoid model works with the same Animator Controller.
    /// </summary>
    public class CharacterVisual : MonoBehaviour
    {
        [Tooltip("The visual model prefab for this character. Replace this to swap the model — no code changes required.")]
        [SerializeField] private GameObject _modelPrefab;

        [Tooltip("Animator Controller applied to the spawned model.")]
        [SerializeField] private RuntimeAnimatorController _animatorController;

        private GameObject _modelInstance;
        private Animator _animator;

        // ── Animator parameter hashes ─────────────────────────────────────────────
        private static readonly int SpeedHash     = Animator.StringToHash("Speed");
        private static readonly int HasBallHash   = Animator.StringToHash("HasBall");
        private static readonly int ShootHash     = Animator.StringToHash("Shoot");
        private static readonly int TackleHash    = Animator.StringToHash("Tackle");
        private static readonly int AbilityHash   = Animator.StringToHash("Ability");
        private static readonly int GoalHash      = Animator.StringToHash("Goal");

        // ── Unity lifecycle ───────────────────────────────────────────────────────

        private void Awake()
        {
            SpawnModel();
        }

        // ── Public API ────────────────────────────────────────────────────────────

        /// <summary>Hot-swap the visual model at runtime. Respawns the instance with the new prefab.</summary>
        public void SetModel(GameObject newPrefab)
        {
            _modelPrefab = newPrefab;
            SpawnModel();
        }

        public void SetSpeed(float speed)          => _animator?.SetFloat(SpeedHash, speed);
        public void SetHasBall(bool hasBall)       => _animator?.SetBool(HasBallHash, hasBall);
        public void TriggerShoot()                  => _animator?.SetTrigger(ShootHash);
        public void TriggerTackle()                 => _animator?.SetTrigger(TackleHash);
        public void TriggerAbility()                => _animator?.SetTrigger(AbilityHash);
        public void TriggerGoalCelebration()        => _animator?.SetTrigger(GoalHash);

        // ── Private ───────────────────────────────────────────────────────────────

        private void SpawnModel()
        {
            if (_modelInstance != null)
                Destroy(_modelInstance);

            if (_modelPrefab == null)
            {
#if UNITY_EDITOR
                Debug.LogWarning($"[CharacterVisual] No model prefab assigned on {gameObject.name}. Using placeholder capsule.");
#endif
                SpawnPlaceholder();
                return;
            }

            _modelInstance = Instantiate(_modelPrefab, transform);
            _modelInstance.transform.SetLocalPositionAndRotation(Vector3.zero, Quaternion.identity);

            _animator = _modelInstance.GetComponentInChildren<Animator>();
            if (_animator != null && _animatorController != null)
                _animator.runtimeAnimatorController = _animatorController;
        }

        private void SpawnPlaceholder()
        {
            _modelInstance = GameObject.CreatePrimitive(PrimitiveType.Capsule);
            _modelInstance.transform.SetParent(transform);
            _modelInstance.transform.SetLocalPositionAndRotation(new Vector3(0f, 1f, 0f), Quaternion.identity);
            _modelInstance.transform.localScale = Vector3.one;
            Destroy(_modelInstance.GetComponent<CapsuleCollider>()); // parent has its own collider
        }
    }
}
