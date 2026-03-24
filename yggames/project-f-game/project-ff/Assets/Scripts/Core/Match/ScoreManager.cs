using UnityEngine;

namespace ProjectF.Match
{
    /// <summary>
    /// Tracks and exposes goal scores. Listens to GoalScored events from MatchServer.
    /// </summary>
    public class ScoreManager : MonoBehaviour
    {
        public int Team0Goals { get; private set; }
        public int Team1Goals { get; private set; }

        private void OnEnable()
        {
            GameEvents.OnGoalScored  += OnGoalScored;
            GameEvents.OnMatchStarted += ResetScores;
        }

        private void OnDisable()
        {
            GameEvents.OnGoalScored   -= OnGoalScored;
            GameEvents.OnMatchStarted -= ResetScores;
        }

        private void ResetScores()
        {
            Team0Goals = 0;
            Team1Goals = 0;
        }

        private void OnGoalScored(GoalData data)
        {
            if (data.ScoringTeam == 0) Team0Goals++;
            else                       Team1Goals++;
        }
    }
}
