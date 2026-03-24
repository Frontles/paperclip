using UnityEngine;
using ProjectF.Input;

namespace ProjectF.Network
{
    /// <summary>
    /// PHASE 3 PLACEHOLDER — Network input provider.
    /// In Phase 3, this receives authoritative input snapshots from the dedicated server
    /// and replays them for remote player entities via client-side prediction + reconciliation.
    ///
    /// For Phase 1 (local) this is unused. Do not remove — it is part of the
    /// authoritative input abstraction that makes multiplayer possible without
    /// rewriting game logic.
    /// </summary>
    public class NetworkInputProvider : IInputProvider
    {
        // Snapshot received from server tick
        private InputSnapshot _snapshot;

        /// <summary>Apply a received input snapshot from the server.</summary>
        public void ApplySnapshot(InputSnapshot snapshot) => _snapshot = snapshot;

        // ── IInputProvider ────────────────────────────────────────────────────────

        public Vector2 Movement        => _snapshot.Movement;
        public bool    ShortPass       => _snapshot.ShortPass;
        public bool    LongPass        => _snapshot.LongPass;
        public bool    Cross           => _snapshot.Cross;
        public bool    ShootHeld       => _snapshot.ShootHeld;
        public bool    ShootReleased   => _snapshot.ShootReleased;
        public bool    Sprint          => _snapshot.Sprint;
        public bool    Tackle          => _snapshot.Tackle;
        public bool    Press           => _snapshot.Press;
        public bool    SwitchPlayer    => _snapshot.SwitchPlayer;
        public bool    Ability         => _snapshot.Ability;
        public bool    GoalkeeperRush  => _snapshot.GoalkeeperRush;
    }

    /// <summary>
    /// Serialisable input snapshot — sent over network at server tick rate (30 Hz).
    /// </summary>
    [System.Serializable]
    public struct InputSnapshot
    {
        public Vector2 Movement;
        public bool    ShortPass;
        public bool    LongPass;
        public bool    Cross;
        public bool    ShootHeld;
        public bool    ShootReleased;
        public bool    Sprint;
        public bool    Tackle;
        public bool    Press;
        public bool    SwitchPlayer;
        public bool    Ability;
        public bool    GoalkeeperRush;
        public uint    TickId; // for reconciliation ordering
    }
}
