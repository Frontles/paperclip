using System.Collections;
using UnityEngine;
using ProjectF.Player;
using ProjectF.Physics;

namespace ProjectF.Match
{
    /// <summary>
    /// Handles fouls resulting from mistimed tackles.
    /// On foul: pauses match, places ball at foul position for free kick, awards kick to fouled team.
    /// Listens to GameEvents.OnFoul raised by PlayerController.ExecuteTackle().
    /// </summary>
    public class FoulSystem : MonoBehaviour
    {
        [Tooltip("Ball controller.")]
        [SerializeField] private BallController _ball;

        [Tooltip("Seconds the match is paused before free kick can be taken.")]
        [SerializeField] private float _freekickSetupTime = 2f;

        [Tooltip("Minimum distance (m) defending players must stand from the ball during a free kick.")]
        [SerializeField] private float _wallDistance = 3f;

        private MatchServer _server;

        // ── Unity lifecycle ───────────────────────────────────────────────────────

        private void Awake()
        {
            _server = FindAnyObjectByType<MatchServer>();
        }

        private void OnEnable()
        {
            GameEvents.OnFoul += HandleFoul;
        }

        private void OnDisable()
        {
            GameEvents.OnFoul -= HandleFoul;
        }

        // ── Event handler ─────────────────────────────────────────────────────────

        private void HandleFoul(PlayerEventData data)
        {
            StartCoroutine(FreekickSequence(data));
        }

        // ── Coroutine ─────────────────────────────────────────────────────────────

        private IEnumerator FreekickSequence(PlayerEventData foulData)
        {
            if (_server != null) _server.PauseMatch();

#if UNITY_EDITOR
            Debug.Log($"[FoulSystem] Foul by team {foulData.TeamIndex} player {foulData.PlayerId} at {foulData.Position}");
#endif

            // Place ball at foul location
            if (_ball != null)
                _ball.ResetToCentre(foulData.Position);

            // Push defending players back
            PushDefendersBack(foulData.Position, foulData.TeamIndex);

            yield return new WaitForSeconds(_freekickSetupTime);

            // Award possession to the fouled team (opposite of foul team)
            int fouledTeam = foulData.TeamIndex == 0 ? 1 : 0;
            GrantFreekickPossession(foulData.Position, fouledTeam);

            if (_server != null) _server.ResumeMatch();
        }

        // ── Helpers ───────────────────────────────────────────────────────────────

        private void PushDefendersBack(Vector3 ballPos, int foulingTeam)
        {
            PlayerController[] players = FindObjectsByType<PlayerController>();
            foreach (PlayerController p in players)
            {
                if (p.TeamIndex != foulingTeam) continue;
                Vector3 dir = (p.transform.position - ballPos).normalized;
                float dist  = Vector3.Distance(p.transform.position, ballPos);
                if (dist < _wallDistance)
                {
                    p.transform.position = ballPos + dir * _wallDistance;
                }
            }
        }

        private void GrantFreekickPossession(Vector3 ballPos, int fouledTeam)
        {
            PlayerController[] players = FindObjectsByType<PlayerController>();
            PlayerController nearest   = null;
            float best = float.MaxValue;

            foreach (PlayerController p in players)
            {
                if (p.TeamIndex != fouledTeam) continue;
                float d = Vector3.Distance(p.transform.position, ballPos);
                if (d < best) { best = d; nearest = p; }
            }

            if (nearest != null && _ball != null)
                _ball.GrantPossession(nearest.gameObject);
        }
    }
}
