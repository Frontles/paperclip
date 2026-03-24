using System.Collections;
using UnityEngine;
using ProjectF.Config;

namespace ProjectF.Match
{
    /// <summary>
    /// AUTHORITATIVE game logic module (server layer).
    /// Owns: physics resolution, goal detection, scoring, timer, fouls, stats.
    /// Does NOT reference cameras, UI, or rendering components.
    /// This separation allows multiplayer (Phase 3) without rewriting game logic.
    /// </summary>
    public class MatchServer : MonoBehaviour
    {
        [Tooltip("Match configuration asset.")]
        [SerializeField] private MatchConfig _config;

        public MatchState State { get; private set; } = new MatchState();

        private bool _running;

        // ── Public API ────────────────────────────────────────────────────────────

        public void StartMatch()
        {
            State = new MatchState { Phase = MatchPhase.FirstHalf };
            _running = true;
            GameEvents.RaiseMatchStarted();
            GameEvents.RaiseKickOff();
        }

        public void PauseMatch()  => State.IsPaused = true;
        public void ResumeMatch() => State.IsPaused = false;

        public void RegisterGoal(int scoringTeam, string scoringPlayerId)
        {
            if (State.Phase is not (MatchPhase.FirstHalf or MatchPhase.SecondHalf)) return;
            State.Goals[scoringTeam]++;
            GameEvents.RaiseGoalScored(new GoalData(scoringTeam, scoringPlayerId, State.TimeElapsed));
            StartCoroutine(GoalResetSequence());
        }

        private IEnumerator GoalResetSequence()
        {
            PauseMatch();
            yield return new WaitForSeconds(2f); // celebration pause
            ResumeMatch();
            GameEvents.RaiseKickOff();
        }

        // ── Unity lifecycle ───────────────────────────────────────────────────────

        private void Update()
        {
            if (!_running || State.IsPaused) return;

            switch (State.Phase)
            {
                case MatchPhase.FirstHalf:
                case MatchPhase.SecondHalf:
                    TickMatchTimer();
                    break;
            }
        }

        // ── Private ───────────────────────────────────────────────────────────────

        private void TickMatchTimer()
        {
            State.TimeElapsed += Time.deltaTime;

            if (State.TimeElapsed >= _config.halfDuration)
            {
                State.TimeElapsed = 0f;
                if (State.Phase == MatchPhase.FirstHalf)
                {
                    State.Phase = MatchPhase.HalfTime;
                    State.CurrentHalf = 2;
                    GameEvents.RaiseHalfTime();
                    StartCoroutine(HalftimeBreak());
                }
                else
                {
                    EndMatch();
                }
            }
        }

        private IEnumerator HalftimeBreak()
        {
            yield return new WaitForSeconds(_config.halftimeBreak);
            State.Phase = MatchPhase.SecondHalf;
            GameEvents.RaiseKickOff();
        }

        private void EndMatch()
        {
            _running = false;
            State.Phase = MatchPhase.PostMatch;
            GameEvents.RaiseMatchEnded(new MatchResult(State.Goals[0], State.Goals[1]));
        }
    }
}
