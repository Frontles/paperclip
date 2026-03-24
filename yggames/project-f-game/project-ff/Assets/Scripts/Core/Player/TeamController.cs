using System.Collections.Generic;
using UnityEngine;
using ProjectF.Input;
using ProjectF.Match;

namespace ProjectF.Player
{
    /// <summary>
    /// Manages a single team — player switching, input routing, and initial formation setup.
    /// One TeamController per team (0 = home, 1 = away).
    /// </summary>
    public class TeamController : MonoBehaviour
    {
        [Tooltip("Team index (0 = home, 1 = away).")]
        [SerializeField] public int TeamIndex;

        [Tooltip("All players in this team (assigned in Inspector or built at runtime).")]
        [SerializeField] private List<PlayerController> _players = new();

        [Tooltip("True if this team is controlled by a human (false = full AI team).")]
        [SerializeField] public bool IsHumanTeam = true;

        private IInputProvider _humanInput;
        private int _controlledIndex;

        // ── Unity lifecycle ───────────────────────────────────────────────────

        private void Awake()
        {
            if (IsHumanTeam)
            {
                // Default to keyboard for PC/editor; swap to TouchInputProvider on mobile
                _humanInput = new KeyboardInputProvider();
            }
        }

        private void OnEnable()
        {
            GameEvents.OnKickOff += HandleKickOff;
        }

        private void OnDisable()
        {
            GameEvents.OnKickOff -= HandleKickOff;
        }

        private void Update()
        {
            if (!IsHumanTeam) return;
            if (_humanInput == null) return;
            if (_humanInput.SwitchPlayer) SwitchToNextPlayer();
            RouteInput();
        }

        // ── Public API ────────────────────────────────────────────────────────

        public PlayerController ActivePlayer =>
            _players.Count > 0 ? _players[_controlledIndex] : null;

        /// <summary>Register players after they are instantiated at runtime.</summary>
        public void RegisterPlayers(List<PlayerController> players)
        {
            _players = players;
            SetupInputRouting();
        }

        /// <summary>Switch controlled player to the one closest to the ball.</summary>
        public void SwitchToClosestToBall(Vector3 ballPosition)
        {
            float best = float.MaxValue;
            int bestIdx = _controlledIndex;

            for (int i = 0; i < _players.Count; i++)
            {
                if (_players[i].Role == PlayerRole.Goalkeeper) continue;
                float d = Vector3.Distance(_players[i].transform.position, ballPosition);
                if (d < best) { best = d; bestIdx = i; }
            }

            SetControlledPlayer(bestIdx);
        }

        // ── Private ───────────────────────────────────────────────────────────

        private void HandleKickOff()
        {
            SetControlledPlayer(0);
        }

        private void SwitchToNextPlayer()
        {
            int next = (_controlledIndex + 1) % _players.Count;
            SetControlledPlayer(next);
        }

        private void SetControlledPlayer(int index)
        {
            if (_players == null || _players.Count == 0) return;
            _controlledIndex = Mathf.Clamp(index, 0, _players.Count - 1);
            SetupInputRouting();

            if (_players[_controlledIndex] != null)
                GameEvents.RaisePlayerSwitched(new PlayerEventData(
                    _players[_controlledIndex].PlayerId,
                    TeamIndex,
                    _players[_controlledIndex].transform.position));
        }

        private void SetupInputRouting()
        {
            for (int i = 0; i < _players.Count; i++)
            {
                if (!IsHumanTeam)
                {
                    // AI team — AIController handles input, don't override
                    _players[i].IsControlled = true;
                    continue;
                }

                bool isActive = i == _controlledIndex;
                _players[i].IsControlled = isActive;
                if (isActive)
                    _players[i].Input = _humanInput;
                // Non-active human team players: leave their input as-is (TeammateAI will handle)
            }
        }

        private void RouteInput()
        {
            // Human input is polled directly by PlayerController each frame.
            // Nothing extra needed here.
        }
    }
}
