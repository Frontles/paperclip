using System.Collections;
using UnityEngine;
using ProjectF.Player;
using ProjectF.Physics;

namespace ProjectF.Match
{
    /// <summary>
    /// Manages kickoff sequences: opening kickoff, restart after goal, and halftime side switch.
    /// Listens to GameEvents and orchestrates player reset + ball placement.
    /// </summary>
    public class KickoffManager : MonoBehaviour
    {
        [Tooltip("Ball controller.")]
        [SerializeField] private BallController _ball;

        [Tooltip("Team 0 (home) starting positions for their 3 players.")]
        [SerializeField] private Transform[] _team0SpawnPoints = new Transform[3];

        [Tooltip("Team 1 (away) starting positions for their 3 players.")]
        [SerializeField] private Transform[] _team1SpawnPoints = new Transform[3];

        [Tooltip("Centre of field — where ball spawns on kickoff.")]
        [SerializeField] private Transform _centreSpot;

        [Tooltip("Delay in seconds between goal celebration and kickoff restart.")]
        [SerializeField] private float _postGoalDelay = 3f;

        [Tooltip("Delay in seconds between kickoff whistle and players being able to move.")]
        [SerializeField] private float _kickoffCountdownDuration = 2f;

        private MatchServer _server;
        private int _kickoffTeam; // 0 or 1 — who kicks off this half

        // ── Unity lifecycle ───────────────────────────────────────────────────────

        private void Awake()
        {
            _server = FindAnyObjectByType<MatchServer>();
        }

        private void OnEnable()
        {
            GameEvents.OnMatchStarted += HandleMatchStarted;
            GameEvents.OnKickOff      += HandleKickOff;
            GameEvents.OnGoalScored   += HandleGoalScored;
            GameEvents.OnHalfTime     += HandleHalfTime;
        }

        private void OnDisable()
        {
            GameEvents.OnMatchStarted -= HandleMatchStarted;
            GameEvents.OnKickOff      -= HandleKickOff;
            GameEvents.OnGoalScored   -= HandleGoalScored;
            GameEvents.OnHalfTime     -= HandleHalfTime;
        }

        // ── Event handlers ────────────────────────────────────────────────────────

        private void HandleMatchStarted()
        {
            // Coin toss: random team kicks off
            _kickoffTeam = Random.value > 0.5f ? 0 : 1;
            PlaceBallAtCentre();
            ResetAllPlayers();
        }

        private void HandleKickOff()
        {
            StartCoroutine(KickoffCountdown());
        }

        private void HandleGoalScored(GoalData data)
        {
            // Team conceding (not scoring) takes kickoff
            _kickoffTeam = data.ScoringTeam == 0 ? 1 : 0;
            StartCoroutine(PostGoalRestart());
        }

        private void HandleHalfTime()
        {
            // Teams switch sides; kickoff goes to the team that didn't kick off first half
            _kickoffTeam = _kickoffTeam == 0 ? 1 : 0;
            ResetAllPlayers();
            PlaceBallAtCentre();
        }

        // ── Coroutines ────────────────────────────────────────────────────────────

        private IEnumerator PostGoalRestart()
        {
            if (_server != null) _server.PauseMatch();
            yield return new WaitForSeconds(_postGoalDelay);
            PlaceBallAtCentre();
            ResetAllPlayers();
            if (_server != null) _server.ResumeMatch();
            GameEvents.RaiseKickOff();
        }

        private IEnumerator KickoffCountdown()
        {
            // Brief pause during countdown
            if (_server != null) _server.PauseMatch();
            yield return new WaitForSeconds(_kickoffCountdownDuration);
            if (_server != null) _server.ResumeMatch();
        }

        // ── Helpers ───────────────────────────────────────────────────────────────

        private void PlaceBallAtCentre()
        {
            if (_ball == null || _centreSpot == null) return;
            _ball.ResetToCentre(_centreSpot.position);
        }

        private void ResetAllPlayers()
        {
            PlayerController[] players = FindObjectsByType<PlayerController>();

            int t0Idx = 0, t1Idx = 0;

            foreach (PlayerController p in players)
            {
                if (p.TeamIndex == 0 && t0Idx < _team0SpawnPoints.Length && _team0SpawnPoints[t0Idx] != null)
                {
                    p.transform.position = _team0SpawnPoints[t0Idx].position;
                    p.transform.rotation = _team0SpawnPoints[t0Idx].rotation;
                    t0Idx++;
                }
                else if (p.TeamIndex == 1 && t1Idx < _team1SpawnPoints.Length && _team1SpawnPoints[t1Idx] != null)
                {
                    p.transform.position = _team1SpawnPoints[t1Idx].position;
                    p.transform.rotation = _team1SpawnPoints[t1Idx].rotation;
                    t1Idx++;
                }
            }
        }
    }
}
