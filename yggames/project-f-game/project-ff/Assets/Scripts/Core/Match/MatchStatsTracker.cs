using System.Collections.Generic;
using UnityEngine;

namespace ProjectF.Match
{
    /// <summary>
    /// Tracks per-player stats during a match: goals and assists.
    /// Used for end-of-match MVP selection and reward calculation.
    /// </summary>
    public class MatchStatsTracker : MonoBehaviour
    {
        // playerId → stats
        private readonly Dictionary<string, PlayerMatchStats> _stats = new();

        private string _lastAssistPlayerId = string.Empty;

        // ── Unity lifecycle ───────────────────────────────────────────────────────

        private void OnEnable()
        {
            GameEvents.OnMatchStarted        += Reset;
            GameEvents.OnGoalScored          += HandleGoalScored;
            GameEvents.OnBallPossessionChanged += HandlePossessionChanged;
        }

        private void OnDisable()
        {
            GameEvents.OnMatchStarted          -= Reset;
            GameEvents.OnGoalScored            -= HandleGoalScored;
            GameEvents.OnBallPossessionChanged -= HandlePossessionChanged;
        }

        // ── Public API ────────────────────────────────────────────────────────────

        /// <summary>Returns all collected stats. Read-only snapshot.</summary>
        public IReadOnlyDictionary<string, PlayerMatchStats> Stats => _stats;

        /// <summary>Returns the player id with the most goals (ties broken by assists).</summary>
        public string GetMVPPlayerId()
        {
            string mvp    = string.Empty;
            int bestGoals = -1;
            int bestAst   = -1;

            foreach (var kv in _stats)
            {
                if (kv.Value.Goals > bestGoals ||
                    (kv.Value.Goals == bestGoals && kv.Value.Assists > bestAst))
                {
                    bestGoals = kv.Value.Goals;
                    bestAst   = kv.Value.Assists;
                    mvp       = kv.Key;
                }
            }

            return mvp;
        }

        // ── Event handlers ────────────────────────────────────────────────────────

        private void Reset()
        {
            _stats.Clear();
            _lastAssistPlayerId = string.Empty;
        }

        private void HandleGoalScored(GoalData data)
        {
            if (!string.IsNullOrEmpty(data.ScoringPlayerId))
                GetOrCreate(data.ScoringPlayerId).Goals++;

            // Credit assist to the last player who passed to the scorer
            if (!string.IsNullOrEmpty(_lastAssistPlayerId) &&
                _lastAssistPlayerId != data.ScoringPlayerId)
            {
                GetOrCreate(_lastAssistPlayerId).Assists++;
            }

            _lastAssistPlayerId = string.Empty;
        }

        private void HandlePossessionChanged(GameObject newHolder)
        {
            if (newHolder == null) return;
            var pc = newHolder.GetComponent<Player.PlayerController>();
            if (pc != null)
                _lastAssistPlayerId = pc.PlayerId;
        }

        // ── Helpers ───────────────────────────────────────────────────────────────

        private PlayerMatchStats GetOrCreate(string playerId)
        {
            if (!_stats.TryGetValue(playerId, out var s))
            {
                s = new PlayerMatchStats(playerId);
                _stats[playerId] = s;
            }
            return s;
        }
    }

    /// <summary>Per-player stats for one match.</summary>
    public class PlayerMatchStats
    {
        public string PlayerId { get; }
        public int    Goals    { get; set; }
        public int    Assists  { get; set; }

        public PlayerMatchStats(string playerId) => PlayerId = playerId;
    }
}
