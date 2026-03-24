using System;
using UnityEngine;

namespace ProjectF.Match
{
    /// <summary>
    /// Central static event bus for match-level game events.
    /// Systems subscribe/unsubscribe independently — no direct references required.
    /// </summary>
    public static class GameEvents
    {
        // ── Match flow ──────────────────────────────────────────────────────────
        public static event Action OnMatchStarted;
        public static event Action OnHalfTime;
        public static event Action<MatchResult> OnMatchEnded;
        public static event Action OnKickOff;

        // ── Goals ────────────────────────────────────────────────────────────────
        public static event Action<GoalData> OnGoalScored;

        // ── Ball ─────────────────────────────────────────────────────────────────
        public static event Action<GameObject> OnBallPossessionChanged;
        public static event Action OnBallOutOfBounds;

        // ── Players ──────────────────────────────────────────────────────────────
        public static event Action<PlayerEventData> OnPlayerSwitched;
        public static event Action<PlayerEventData> OnTackle;
        public static event Action<PlayerEventData> OnFoul;
        public static event Action<PlayerEventData> OnAbilityActivated;

        // ── Raise helpers ────────────────────────────────────────────────────────
        public static void RaiseMatchStarted()                        => OnMatchStarted?.Invoke();
        public static void RaiseHalfTime()                            => OnHalfTime?.Invoke();
        public static void RaiseMatchEnded(MatchResult result)        => OnMatchEnded?.Invoke(result);
        public static void RaiseKickOff()                             => OnKickOff?.Invoke();
        public static void RaiseGoalScored(GoalData data)             => OnGoalScored?.Invoke(data);
        public static void RaiseBallPossessionChanged(GameObject p)   => OnBallPossessionChanged?.Invoke(p);
        public static void RaiseBallOutOfBounds()                     => OnBallOutOfBounds?.Invoke();
        public static void RaisePlayerSwitched(PlayerEventData data)  => OnPlayerSwitched?.Invoke(data);
        public static void RaiseTackle(PlayerEventData data)          => OnTackle?.Invoke(data);
        public static void RaiseFoul(PlayerEventData data)            => OnFoul?.Invoke(data);
        public static void RaiseAbilityActivated(PlayerEventData d)   => OnAbilityActivated?.Invoke(d);

        /// <summary>Unsubscribe all listeners — call on scene unload to prevent leaks.</summary>
        public static void ClearAll()
        {
            OnMatchStarted          = null;
            OnHalfTime              = null;
            OnMatchEnded            = null;
            OnKickOff               = null;
            OnGoalScored            = null;
            OnBallPossessionChanged = null;
            OnBallOutOfBounds       = null;
            OnPlayerSwitched        = null;
            OnTackle                = null;
            OnFoul                  = null;
            OnAbilityActivated      = null;
        }
    }

    // ── Event payload structs ───────────────────────────────────────────────────

    public readonly struct GoalData
    {
        public readonly int ScoringTeam;
        public readonly string ScoringPlayerId;
        public readonly float MatchTimeSeconds;

        public GoalData(int scoringTeam, string scoringPlayerId, float matchTimeSeconds)
        {
            ScoringTeam       = scoringTeam;
            ScoringPlayerId   = scoringPlayerId;
            MatchTimeSeconds  = matchTimeSeconds;
        }
    }

    public readonly struct PlayerEventData
    {
        public readonly string PlayerId;
        public readonly int    TeamIndex;
        public readonly Vector3 Position;

        public PlayerEventData(string playerId, int teamIndex, Vector3 position)
        {
            PlayerId  = playerId;
            TeamIndex = teamIndex;
            Position  = position;
        }
    }

    public readonly struct MatchResult
    {
        public readonly int Team0Goals;
        public readonly int Team1Goals;
        public readonly int WinnerTeam; // -1 = draw

        public MatchResult(int team0Goals, int team1Goals)
        {
            Team0Goals = team0Goals;
            Team1Goals = team1Goals;
            WinnerTeam = team0Goals > team1Goals ? 0 : team1Goals > team0Goals ? 1 : -1;
        }
    }
}
