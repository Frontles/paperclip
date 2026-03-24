using UnityEngine;

namespace ProjectF.Match
{
    public enum MatchPhase { PreMatch, FirstHalf, HalfTime, SecondHalf, PostMatch }

    /// <summary>
    /// Pure data snapshot of authoritative match state.
    /// Owned by MatchServer; read by MatchManager (client/rendering layer).
    /// No MonoBehaviour dependencies — safe to serialize or send over network.
    /// </summary>
    public class MatchState
    {
        public MatchPhase Phase        { get; set; } = MatchPhase.PreMatch;
        public float      TimeElapsed  { get; set; } // seconds within current half
        public int[]      Goals        { get; }      = new int[2];  // Goals[teamIndex]
        public int        CurrentHalf  { get; set; } = 1;           // 1 or 2
        public bool       IsPaused     { get; set; }
        public string     BallHolderPlayerId { get; set; } = string.Empty;
        public Vector3    BallPosition { get; set; }
    }
}
