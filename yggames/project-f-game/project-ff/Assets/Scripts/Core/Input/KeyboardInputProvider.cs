using UnityEngine;
using UnityEngine.InputSystem;

namespace ProjectF.Input
{
    /// <summary>
    /// Keyboard input provider for PC and Unity Editor testing.
    /// Arrow keys = movement | Q = switch | E = sprint | S = short pass/pressing
    /// W = through pass/GK rush | A = cross | D = shoot/tackle | Space = ability
    /// </summary>
    public class KeyboardInputProvider : IInputProvider
    {
        public Vector2 Movement
        {
            get
            {
                var kb = Keyboard.current;
                if (kb == null) return Vector2.zero;
                float x = 0f, y = 0f;
                if (kb.leftArrowKey.isPressed)  x -= 1f;
                if (kb.rightArrowKey.isPressed) x += 1f;
                if (kb.downArrowKey.isPressed)  y -= 1f;
                if (kb.upArrowKey.isPressed)    y += 1f;
                return new Vector2(x, y).normalized;
            }
        }

        // S key: short pass when attacking
        public bool ShortPass => Keyboard.current?.sKey.wasPressedThisFrame ?? false;

        // W key: through/long pass when attacking
        public bool LongPass => Keyboard.current?.wKey.wasPressedThisFrame ?? false;

        // A key: cross
        public bool Cross => Keyboard.current?.aKey.wasPressedThisFrame ?? false;

        // D key held: charging shot
        public bool ShootHeld => Keyboard.current?.dKey.isPressed ?? false;

        // D key released: fires shot
        public bool ShootReleased => Keyboard.current?.dKey.wasReleasedThisFrame ?? false;

        // E key held: sprint
        public bool Sprint => Keyboard.current?.eKey.isPressed ?? false;

        // D key pressed (single frame) when defending: tackle
        public bool Tackle => Keyboard.current?.dKey.wasPressedThisFrame ?? false;

        // S key held when defending: pressing
        public bool Press => Keyboard.current?.sKey.isPressed ?? false;

        // Q key: switch player
        public bool SwitchPlayer => Keyboard.current?.qKey.wasPressedThisFrame ?? false;

        // Space: ability
        public bool Ability => Keyboard.current?.spaceKey.wasPressedThisFrame ?? false;

        // W key: goalkeeper rush toward ball
        public bool GoalkeeperRush => Keyboard.current?.wKey.wasPressedThisFrame ?? false;
    }
}
