using UnityEngine;

namespace ProjectF.Match
{
    /// <summary>
    /// CLIENT layer — orchestrates rendering, UI, camera, and audio responses to
    /// authoritative MatchServer state. Does NOT contain game logic.
    /// Subscribe to GameEvents raised by MatchServer to react to state changes.
    /// </summary>
    public class MatchManager : MonoBehaviour
    {
        [Tooltip("Reference to the authoritative match server.")]
        [SerializeField] private MatchServer _server;

        // ── Unity lifecycle ───────────────────────────────────────────────────────

        private void Awake()
        {
            if (_server == null)
                _server = GetComponent<MatchServer>();
        }

        private void OnEnable()
        {
            GameEvents.OnMatchStarted   += HandleMatchStarted;
            GameEvents.OnHalfTime       += HandleHalfTime;
            GameEvents.OnMatchEnded     += HandleMatchEnded;
            GameEvents.OnGoalScored     += HandleGoalScored;
        }

        private void OnDisable()
        {
            GameEvents.OnMatchStarted   -= HandleMatchStarted;
            GameEvents.OnHalfTime       -= HandleHalfTime;
            GameEvents.OnMatchEnded     -= HandleMatchEnded;
            GameEvents.OnGoalScored     -= HandleGoalScored;
        }

        private void Start()
        {
            _server.StartMatch();
        }

        // ── Event handlers (client reactions) ────────────────────────────────────

        private void HandleMatchStarted()
        {
#if UNITY_EDITOR
            Debug.Log("[MatchManager] Match started.");
#endif
        }

        private void HandleHalfTime()
        {
#if UNITY_EDITOR
            Debug.Log("[MatchManager] Half time.");
#endif
            // TODO: show halftime UI overlay
        }

        private void HandleMatchEnded(MatchResult result)
        {
#if UNITY_EDITOR
            Debug.Log($"[MatchManager] Match ended. {result.Team0Goals} — {result.Team1Goals}");
#endif
            // TODO: show match end screen
        }

        private void HandleGoalScored(GoalData data)
        {
#if UNITY_EDITOR
            Debug.Log($"[MatchManager] Goal! Team {data.ScoringTeam} scored at {data.MatchTimeSeconds:F1}s");
#endif
            // TODO: trigger goal celebration, replay camera, score update UI
        }
    }
}
