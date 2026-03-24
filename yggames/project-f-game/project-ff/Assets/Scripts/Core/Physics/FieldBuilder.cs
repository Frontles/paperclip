using UnityEngine;
using ProjectF.Config;

namespace ProjectF.Physics
{
    /// <summary>
    /// Procedurally builds the football field from MatchConfig at runtime.
    /// Place this component on the Field root GameObject.
    /// Generates: pitch plane, centre line, centre circle, penalty areas, goal posts.
    /// All dimensions are driven by MatchConfig.fieldWidth / fieldHeight — no hardcoded values.
    /// </summary>
    [RequireComponent(typeof(Transform))]
    public class FieldBuilder : MonoBehaviour
    {
        [Header("Config")]
        [Tooltip("Match configuration that defines field dimensions.")]
        [SerializeField] private MatchConfig _config;

        [Header("Materials")]
        [Tooltip("Grass / pitch surface material.")]
        [SerializeField] private Material _grassMaterial;
        [Tooltip("Line marking material (white).")]
        [SerializeField] private Material _lineMaterial;
        [Tooltip("Goalpost material.")]
        [SerializeField] private Material _goalpostMaterial;

        [Header("Goal dimensions (metres)")]
        [Tooltip("Width of each goal.")]
        [SerializeField] private float _goalWidth = 6f;
        [Tooltip("Height of each goal.")]
        [SerializeField] private float _goalHeight = 2.4f;
        [Tooltip("Depth of the goal net frame.")]
        [SerializeField] private float _goalDepth = 1f;

        [Header("Penalty area dimensions (metres)")]
        [SerializeField] private float _penaltyAreaWidth = 12f;
        [SerializeField] private float _penaltyAreaDepth = 6f;

        [Header("Line thickness (metres)")]
        [SerializeField] private float _lineThickness = 0.1f;
        [SerializeField] private float _lineHeight    = 0.01f; // sits just above pitch

        // ── Unity lifecycle ───────────────────────────────────────────────────────

        private void Awake()
        {
            BuildField();
        }

        // ── Public ────────────────────────────────────────────────────────────────

        /// <summary>Rebuild the field — call after changing config at runtime.</summary>
        [ContextMenu("Rebuild Field")]
        public void BuildField()
        {
            // Destroy old children
            foreach (Transform child in transform)
                Destroy(child.gameObject);

            float w = _config != null ? _config.fieldWidth  : 40f;
            float h = _config != null ? _config.fieldHeight : 25f;

            BuildPitch(w, h);
            BuildOutlineLines(w, h);
            BuildCentreLine(h);
            BuildCentreCircle();
            BuildPenaltyAreas(w, h);
            BuildGoal(-w * 0.5f,  1); // home goal (left side)
            BuildGoal( w * 0.5f, -1); // away goal (right side)
        }

        // ── Field components ──────────────────────────────────────────────────────

        private void BuildPitch(float w, float h)
        {
            GameObject pitch = GameObject.CreatePrimitive(PrimitiveType.Plane);
            pitch.name = "Pitch";
            pitch.transform.SetParent(transform);
            pitch.transform.localPosition = Vector3.zero;
            // Plane primitive is 10x10 units — scale to match field size
            pitch.transform.localScale = new Vector3(w * 0.1f, 1f, h * 0.1f);

            if (_grassMaterial != null)
                pitch.GetComponent<Renderer>().sharedMaterial = _grassMaterial;

            // Remove the default collider and add a flat box collider instead
            Destroy(pitch.GetComponent<MeshCollider>());
            BoxCollider bc = pitch.AddComponent<BoxCollider>();
            bc.size   = new Vector3(1f, 0.02f, 1f);
            bc.center = new Vector3(0f, -0.01f, 0f);
        }

        private void BuildOutlineLines(float w, float h)
        {
            float halfW = w * 0.5f;
            float halfH = h * 0.5f;
            float t     = _lineThickness;

            // Top touchline
            CreateBox("Line_Top",    new Vector3(0, _lineHeight, halfH),  new Vector3(w + t, _lineHeight, t));
            // Bottom touchline
            CreateBox("Line_Bottom", new Vector3(0, _lineHeight, -halfH), new Vector3(w + t, _lineHeight, t));
            // Left goal line
            CreateBox("Line_Left",   new Vector3(-halfW, _lineHeight, 0), new Vector3(t, _lineHeight, h));
            // Right goal line
            CreateBox("Line_Right",  new Vector3( halfW, _lineHeight, 0), new Vector3(t, _lineHeight, h));
        }

        private void BuildCentreLine(float h)
        {
            CreateBox("Line_Centre", new Vector3(0, _lineHeight, 0), new Vector3(_lineThickness, _lineHeight, h));
        }

        private void BuildCentreCircle()
        {
            // Approximate circle with a thin cylinder
            GameObject circle = GameObject.CreatePrimitive(PrimitiveType.Cylinder);
            circle.name = "CentreCircle";
            circle.transform.SetParent(transform);
            circle.transform.localPosition = new Vector3(0f, _lineHeight, 0f);
            float radius = 4f; // standard 3v3 centre circle
            circle.transform.localScale = new Vector3(radius * 2f, 0.005f, radius * 2f);
            Destroy(circle.GetComponent<CapsuleCollider>());

            if (_lineMaterial != null)
                circle.GetComponent<Renderer>().sharedMaterial = _lineMaterial;
        }

        private void BuildPenaltyAreas(float w, float h)
        {
            float halfW = w * 0.5f;
            float pw    = _penaltyAreaWidth;
            float pd    = _penaltyAreaDepth;
            float t     = _lineThickness;

            // Left penalty area (home team defends)
            float leftX = -halfW + pd * 0.5f;
            CreateBox("PenArea_Left_Top",    new Vector3(leftX, _lineHeight,  pw * 0.5f), new Vector3(pd, _lineHeight, t));
            CreateBox("PenArea_Left_Bottom", new Vector3(leftX, _lineHeight, -pw * 0.5f), new Vector3(pd, _lineHeight, t));
            CreateBox("PenArea_Left_Side",   new Vector3(-halfW + pd, _lineHeight, 0),    new Vector3(t,  _lineHeight, pw));

            // Right penalty area (away team defends)
            float rightX = halfW - pd * 0.5f;
            CreateBox("PenArea_Right_Top",    new Vector3(rightX, _lineHeight,  pw * 0.5f), new Vector3(pd, _lineHeight, t));
            CreateBox("PenArea_Right_Bottom", new Vector3(rightX, _lineHeight, -pw * 0.5f), new Vector3(pd, _lineHeight, t));
            CreateBox("PenArea_Right_Side",   new Vector3( halfW - pd, _lineHeight, 0),     new Vector3(t,  _lineHeight, pw));
        }

        /// <param name="xPos">X position of the goal line centre.</param>
        /// <param name="dir">+1 for home (left), -1 for away (right). Goal opens toward positive-X side when dir=+1.</param>
        private void BuildGoal(float xPos, int dir)
        {
            string side = dir > 0 ? "Home" : "Away";
            GameObject root = new($"Goal_{side}");
            root.transform.SetParent(transform);
            root.transform.localPosition = Vector3.zero;

            float gw   = _goalWidth;
            float gh   = _goalHeight;
            float gd   = _goalDepth;
            float post = 0.1f; // post radius

            // Left post
            CreateGoalPost($"{side}_PostLeft",  root.transform,
                new Vector3(xPos, gh * 0.5f,  gw * 0.5f),
                new Vector3(post, gh, post));

            // Right post
            CreateGoalPost($"{side}_PostRight", root.transform,
                new Vector3(xPos, gh * 0.5f, -gw * 0.5f),
                new Vector3(post, gh, post));

            // Crossbar
            CreateGoalPost($"{side}_Crossbar",  root.transform,
                new Vector3(xPos, gh, 0f),
                new Vector3(post, post, gw));

            // Back post (depth frame)
            float backX = xPos + dir * gd;
            CreateGoalPost($"{side}_BackPost",  root.transform,
                new Vector3(backX, gh * 0.5f, 0f),
                new Vector3(post, gh, gw));
        }

        // ── Helpers ───────────────────────────────────────────────────────────────

        private GameObject CreateBox(string name, Vector3 localPos, Vector3 size)
        {
            GameObject go = GameObject.CreatePrimitive(PrimitiveType.Cube);
            go.name = name;
            go.transform.SetParent(transform);
            go.transform.localPosition = localPos;
            go.transform.localScale    = size;
            Destroy(go.GetComponent<BoxCollider>());

            if (_lineMaterial != null)
                go.GetComponent<Renderer>().sharedMaterial = _lineMaterial;

            return go;
        }

        private void CreateGoalPost(string name, Transform parent, Vector3 localPos, Vector3 size)
        {
            GameObject go = GameObject.CreatePrimitive(PrimitiveType.Cube);
            go.name = name;
            go.transform.SetParent(parent);
            go.transform.localPosition = localPos;
            go.transform.localScale    = size;

            if (_goalpostMaterial != null)
                go.GetComponent<Renderer>().sharedMaterial = _goalpostMaterial;
        }
    }
}
