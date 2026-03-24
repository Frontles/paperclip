using UnityEngine;

namespace ProjectF.Input
{
    /// <summary>
    /// AI-driven input provider. Placeholder — movement and actions are set
    /// each frame by AIController after the AI state machine resolves decisions.
    /// </summary>
    public class AIInputProvider : IInputProvider
    {
        public Vector2 Movement    { get; set; }
        public bool ShortPass      { get; set; }
        public bool LongPass       { get; set; }
        public bool Cross          { get; set; }
        public bool ShootHeld      { get; set; }
        public bool ShootReleased  { get; set; }
        public bool Sprint         { get; set; }
        public bool Tackle         { get; set; }
        public bool Press          { get; set; }
        public bool SwitchPlayer   { get; set; }
        public bool Ability        { get; set; }
        public bool GoalkeeperRush { get; set; }

        /// <summary>
        /// Clear single-frame inputs. Call at start of each AI update tick.
        /// </summary>
        public void ResetFrameInputs()
        {
            ShortPass      = false;
            LongPass       = false;
            Cross          = false;
            ShootReleased  = false;
            Tackle         = false;
            SwitchPlayer   = false;
            Ability        = false;
            GoalkeeperRush = false;
        }
    }
}
