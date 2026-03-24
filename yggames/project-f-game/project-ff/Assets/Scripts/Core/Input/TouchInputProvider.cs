using UnityEngine;

namespace ProjectF.Input
{
    /// <summary>
    /// Touch input provider for mobile.
    /// Driven by the TouchInputUI component (virtual joystick + buttons).
    /// The UI layer calls the Set* methods; game logic reads from this provider.
    /// </summary>
    public class TouchInputProvider : IInputProvider
    {
        private Vector2 _movement;
        private bool _shortPass;
        private bool _longPass;
        private bool _cross;
        private bool _shootHeld;
        private bool _shootReleased;
        private bool _sprint;
        private bool _tackle;
        private bool _press;
        private bool _switchPlayer;
        private bool _ability;
        private bool _goalkeeperRush;

        // --- Read (game logic side) ---
        public Vector2 Movement       => _movement;
        public bool ShortPass         => _shortPass;
        public bool LongPass          => _longPass;
        public bool Cross             => _cross;
        public bool ShootHeld         => _shootHeld;
        public bool ShootReleased     => _shootReleased;
        public bool Sprint            => _sprint;
        public bool Tackle            => _tackle;
        public bool Press             => _press;
        public bool SwitchPlayer      => _switchPlayer;
        public bool Ability           => _ability;
        public bool GoalkeeperRush    => _goalkeeperRush;

        // --- Write (UI side) ---
        public void SetMovement(Vector2 v)      => _movement = v;
        public void SetShortPass(bool v)        => _shortPass = v;
        public void SetLongPass(bool v)         => _longPass = v;
        public void SetCross(bool v)            => _cross = v;
        public void SetShootHeld(bool v)        => _shootHeld = v;
        public void SetShootReleased(bool v)    => _shootReleased = v;
        public void SetSprint(bool v)           => _sprint = v;
        public void SetTackle(bool v)           => _tackle = v;
        public void SetPress(bool v)            => _press = v;
        public void SetSwitchPlayer(bool v)     => _switchPlayer = v;
        public void SetAbility(bool v)          => _ability = v;
        public void SetGoalkeeperRush(bool v)   => _goalkeeperRush = v;

        /// <summary>
        /// Must be called at the end of each frame to clear single-frame inputs.
        /// </summary>
        public void ResetFrameInputs()
        {
            _shortPass      = false;
            _longPass       = false;
            _cross          = false;
            _shootReleased  = false;
            _tackle         = false;
            _switchPlayer   = false;
            _ability        = false;
            _goalkeeperRush = false;
        }
    }
}
