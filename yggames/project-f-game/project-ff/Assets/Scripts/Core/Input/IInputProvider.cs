using UnityEngine;

namespace ProjectF.Input
{
    /// <summary>
    /// Abstraction for all player input sources.
    /// Implementations: KeyboardInputProvider, TouchInputProvider, AIInputProvider, NetworkInputProvider.
    /// All game logic reads exclusively from this interface — never directly from hardware.
    /// </summary>
    public interface IInputProvider
    {
        /// <summary>Normalised movement direction, magnitude 0–1.</summary>
        Vector2 Movement { get; }

        /// <summary>Short pass button pressed this frame.</summary>
        bool ShortPass { get; }

        /// <summary>Long / through pass button pressed this frame.</summary>
        bool LongPass { get; }

        /// <summary>Cross button pressed this frame.</summary>
        bool Cross { get; }

        /// <summary>Shoot button held (power charges while held).</summary>
        bool ShootHeld { get; }

        /// <summary>Shoot button released this frame (triggers shot).</summary>
        bool ShootReleased { get; }

        /// <summary>Sprint button held.</summary>
        bool Sprint { get; }

        /// <summary>Tackle button pressed this frame.</summary>
        bool Tackle { get; }

        /// <summary>Pressing (close-down) button held.</summary>
        bool Press { get; }

        /// <summary>Switch controlled player button pressed this frame.</summary>
        bool SwitchPlayer { get; }

        /// <summary>Activate ability button pressed this frame.</summary>
        bool Ability { get; }

        /// <summary>Goalkeeper rush button pressed this frame.</summary>
        bool GoalkeeperRush { get; }
    }
}
