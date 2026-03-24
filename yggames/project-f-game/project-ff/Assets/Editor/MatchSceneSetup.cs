using UnityEngine;
using UnityEditor;
using UnityEditor.SceneManagement;
using UnityEngine.SceneManagement;

/// <summary>
/// One-click match scene setup. Unity Editor menu: ProjectF > Setup Match Scene
/// Creates all GameObjects, components, materials, configs, and wires references.
/// </summary>
public static class MatchSceneSetup
{
    [MenuItem("ProjectF/Setup Match Scene")]
    public static void SetupScene()
    {
        // Create a new scene
        var scene = EditorSceneManager.NewScene(NewSceneSetup.DefaultGameObjects, NewSceneMode.Single);
        scene.name = "MatchScene";

        // Remove default directional light (we'll add our own)
        var existingLight = GameObject.Find("Directional Light");
        if (existingLight != null) Object.DestroyImmediate(existingLight);

        // ── LIGHTING ─────────────────────────────────────────────────────────
        var lightGO = new GameObject("Sun");
        var light = lightGO.AddComponent<Light>();
        light.type = LightType.Directional;
        light.color = new Color(1f, 0.97f, 0.9f);
        light.intensity = 1.2f;
        light.shadows = LightShadows.Soft;
        lightGO.transform.rotation = Quaternion.Euler(50f, -30f, 0f);

        // ── MATERIALS ────────────────────────────────────────────────────────
        var grassMat = CreateMaterial("Grass", new Color(0.2f, 0.6f, 0.15f));
        var lineMat = CreateMaterial("Line", Color.white);
        var goalpostMat = CreateMaterial("Goalpost", new Color(0.9f, 0.9f, 0.9f));
        var homeMat = CreateMaterial("HomeTeam", new Color(0.2f, 0.4f, 0.9f));
        var awayMat = CreateMaterial("AwayTeam", new Color(0.9f, 0.2f, 0.2f));
        var gkHomeMat = CreateMaterial("GK_Home", new Color(0.9f, 0.9f, 0.2f));
        var gkAwayMat = CreateMaterial("GK_Away", new Color(0.2f, 0.9f, 0.2f));
        var ballMat = CreateMaterial("Ball", Color.white);

        // ── MATCH CONFIG SO ──────────────────────────────────────────────────
        var matchConfig = ScriptableObject.CreateInstance<ProjectF.Config.MatchConfig>();
        matchConfig.teamSize = 3;
        matchConfig.fieldWidth = 40f;
        matchConfig.fieldHeight = 25f;
        matchConfig.halfDuration = 120f;
        matchConfig.halftimeBreak = 10f;
        matchConfig.maxAbilityUsesPerPlayer = 2;
        matchConfig.ballGravityScale = 1f;
        matchConfig.ballLinearDrag = 0.5f;
        matchConfig.sprintMultiplier = 1.3f;
        matchConfig.staminaDrainRate = 15f;
        matchConfig.staminaRecoveryRate = 5f;
        matchConfig.maxStamina = 100f;

        EnsureFolder("Assets/ScriptableObjects/Config");
        AssetDatabase.CreateAsset(matchConfig, "Assets/ScriptableObjects/Config/MatchConfig_Default.asset");

        // ── AI DIFFICULTY CONFIG ─────────────────────────────────────────────
        ProjectF.Config.AIDifficultyConfig aiConfig = null;
        var aiConfigGuids = AssetDatabase.FindAssets("t:AIDifficultyConfig");
        if (aiConfigGuids.Length > 0)
        {
            aiConfig = AssetDatabase.LoadAssetAtPath<ProjectF.Config.AIDifficultyConfig>(
                AssetDatabase.GUIDToAssetPath(aiConfigGuids[0]));
        }

        // ── ABILITY DATA SOs ─────────────────────────────────────────────────
        EnsureFolder("Assets/ScriptableObjects/Abilities");

        var powerShot = ScriptableObject.CreateInstance<ProjectF.Ability.AbilityData>();
        powerShot.AbilityId = "power_shot";
        powerShot.AbilityName = "Power Shot";
        powerShot.Description = "Increases shot power and accuracy by 50%";
        powerShot.Category = ProjectF.Ability.AbilityCategory.Offensive;
        powerShot.Element = ProjectF.Ability.AbilityElement.Fire;
        powerShot.Cooldown = 15f;
        powerShot.Duration = 0f;
        powerShot.ShotMultiplier = 1.5f;
        powerShot.DefenseMultiplier = 1f;
        powerShot.PhysicalMultiplier = 1f;
        powerShot.PassiveChargeTime = 30f;
        powerShot.MaxUsesPerMatch = 2;
        AssetDatabase.CreateAsset(powerShot, "Assets/ScriptableObjects/Abilities/PowerShot.asset");

        var ironWall = ScriptableObject.CreateInstance<ProjectF.Ability.AbilityData>();
        ironWall.AbilityId = "iron_wall";
        ironWall.AbilityName = "Iron Wall";
        ironWall.Description = "Increases DEF and PHY by 40% for 3 seconds";
        ironWall.Category = ProjectF.Ability.AbilityCategory.Defensive;
        ironWall.Element = ProjectF.Ability.AbilityElement.Ice;
        ironWall.Cooldown = 15f;
        ironWall.Duration = 3f;
        ironWall.ShotMultiplier = 1f;
        ironWall.DefenseMultiplier = 1.4f;
        ironWall.PhysicalMultiplier = 1.4f;
        ironWall.TackleSuccessOverride = 0.8f;
        ironWall.PassiveChargeTime = 30f;
        ironWall.MaxUsesPerMatch = 2;
        AssetDatabase.CreateAsset(ironWall, "Assets/ScriptableObjects/Abilities/IronWall.asset");

        // ── GROUND COLLIDER (prevents players from falling) ────────────────
        var groundGO = GameObject.CreatePrimitive(PrimitiveType.Cube);
        groundGO.name = "Ground";
        groundGO.transform.position = new Vector3(0f, -0.5f, 0f);
        groundGO.transform.localScale = new Vector3(60f, 1f, 40f);
        groundGO.GetComponent<Renderer>().sharedMaterial = grassMat;
        // BoxCollider is auto-added by CreatePrimitive — keeps players on surface

        // ── FIELD ────────────────────────────────────────────────────────────
        var fieldGO = new GameObject("Field");
        var fieldBuilder = fieldGO.AddComponent<ProjectF.Physics.FieldBuilder>();
        SetPrivateField(fieldBuilder, "_config", matchConfig);
        SetPrivateField(fieldBuilder, "_grassMaterial", grassMat);
        SetPrivateField(fieldBuilder, "_lineMaterial", lineMat);
        SetPrivateField(fieldBuilder, "_goalpostMaterial", goalpostMat);

        // ── BALL ─────────────────────────────────────────────────────────────
        var ballGO = GameObject.CreatePrimitive(PrimitiveType.Sphere);
        ballGO.name = "Ball";
        ballGO.transform.position = new Vector3(0f, 0.3f, 0f);
        ballGO.transform.localScale = Vector3.one * 0.4f;
        ballGO.GetComponent<Renderer>().sharedMaterial = ballMat;
        ballGO.layer = LayerMask.NameToLayer("Default");

        var ballRb = ballGO.GetComponent<Rigidbody>();
        if (ballRb == null) ballRb = ballGO.AddComponent<Rigidbody>();
        ballRb.mass = 0.4f;
        ballRb.linearDamping = 0.5f;
        ballRb.angularDamping = 0.5f;
        ballRb.interpolation = RigidbodyInterpolation.Interpolate;

        var ballCtrl = ballGO.AddComponent<ProjectF.Physics.BallController>();
        SetPrivateField(ballCtrl, "_config", matchConfig);
        ballGO.tag = "Ball";

        // ── GOAL TRIGGERS ────────────────────────────────────────────────────
        // Home goal (left side, x = -20) — home team (0) defends this
        var goalTrigLeft = new GameObject("GoalTrigger_Home");
        goalTrigLeft.transform.position = new Vector3(-21f, 0.5f, 0f);
        var gtLeft = goalTrigLeft.AddComponent<ProjectF.Match.GoalTrigger>();
        gtLeft.DefendingTeam = 0;
        gtLeft.DetectionRadius = 3f;

        // Away goal (right side, x = +20) — away team (1) defends this
        var goalTrigRight = new GameObject("GoalTrigger_Away");
        goalTrigRight.transform.position = new Vector3(21f, 0.5f, 0f);
        var gtRight = goalTrigRight.AddComponent<ProjectF.Match.GoalTrigger>();
        gtRight.DefendingTeam = 1;
        gtRight.DetectionRadius = 3f;

        // ── SPAWN POINTS ─────────────────────────────────────────────────────
        var spawnsGO = new GameObject("SpawnPoints");
        var centreSpot = CreateEmptyChild(spawnsGO, "CentreSpot", Vector3.zero);

        // Home team spawn (left side)
        var homeSpawn0 = CreateEmptyChild(spawnsGO, "Home_FW", new Vector3(-5f, 0f, 0f));
        var homeSpawn1 = CreateEmptyChild(spawnsGO, "Home_MF", new Vector3(-12f, 0f, 0f));
        var homeSpawn2 = CreateEmptyChild(spawnsGO, "Home_GK", new Vector3(-18f, 0f, 0f));

        // Away team spawn (right side)
        var awaySpawn0 = CreateEmptyChild(spawnsGO, "Away_FW", new Vector3(5f, 0f, 0f));
        var awaySpawn1 = CreateEmptyChild(spawnsGO, "Away_MF", new Vector3(12f, 0f, 0f));
        var awaySpawn2 = CreateEmptyChild(spawnsGO, "Away_GK", new Vector3(18f, 0f, 0f));

        // ── TEAM 0 (HOME - Human) ───────────────────────────────────────────
        var team0GO = new GameObject("Team_Home");
        var team0Ctrl = team0GO.AddComponent<ProjectF.Player.TeamController>();

        var homeFW = CreatePlayer("Home_FW", new Vector3(-5f, 0.5f, 0f), 0,
            ProjectF.Player.PlayerRole.Forward, homeMat, matchConfig, ballCtrl, powerShot);
        homeFW.transform.SetParent(team0GO.transform);

        var homeMF = CreatePlayer("Home_MF", new Vector3(-12f, 0.5f, 0f), 0,
            ProjectF.Player.PlayerRole.Midfielder, homeMat, matchConfig, ballCtrl, ironWall);
        homeMF.transform.SetParent(team0GO.transform);

        var homeGK = CreatePlayer("Home_GK", new Vector3(-18f, 0.5f, 0f), 0,
            ProjectF.Player.PlayerRole.Goalkeeper, gkHomeMat, matchConfig, ballCtrl, null);
        homeGK.AddComponent<ProjectF.Player.GoalkeeperController>();
        homeGK.transform.SetParent(team0GO.transform);

        // Wire TeamController
        team0Ctrl.IsHumanTeam = true;
        team0Ctrl.TeamIndex = 0;
        var homePlayers = new System.Collections.Generic.List<ProjectF.Player.PlayerController> {
            homeFW.GetComponent<ProjectF.Player.PlayerController>(),
            homeMF.GetComponent<ProjectF.Player.PlayerController>(),
            homeGK.GetComponent<ProjectF.Player.PlayerController>()
        };
        SetPrivateField(team0Ctrl, "_players", homePlayers);

        // ── TEAM 1 (AWAY - AI) ──────────────────────────────────────────────
        var team1GO = new GameObject("Team_Away");
        var team1Ctrl = team1GO.AddComponent<ProjectF.Player.TeamController>();

        var awayFW = CreatePlayer("Away_FW", new Vector3(5f, 0.5f, 0f), 1,
            ProjectF.Player.PlayerRole.Forward, awayMat, matchConfig, ballCtrl, powerShot);
        var aiFW = awayFW.AddComponent<ProjectF.AI.AIController>();
        if (aiConfig != null) SetPrivateField(aiFW, "_difficultyConfig", aiConfig);
        awayFW.transform.SetParent(team1GO.transform);

        var awayMF = CreatePlayer("Away_MF", new Vector3(12f, 0.5f, 0f), 1,
            ProjectF.Player.PlayerRole.Midfielder, awayMat, matchConfig, ballCtrl, ironWall);
        var aiMF = awayMF.AddComponent<ProjectF.AI.AIController>();
        if (aiConfig != null) SetPrivateField(aiMF, "_difficultyConfig", aiConfig);
        awayMF.transform.SetParent(team1GO.transform);

        var awayGK = CreatePlayer("Away_GK", new Vector3(18f, 0.5f, 0f), 1,
            ProjectF.Player.PlayerRole.Goalkeeper, gkAwayMat, matchConfig, ballCtrl, null);
        awayGK.AddComponent<ProjectF.Player.GoalkeeperController>();
        var awayGKAI = awayGK.AddComponent<ProjectF.AI.AIGoalkeeperController>();
        SetPrivateField(awayGKAI, "_goalCenter", new Vector3(19f, 0f, 0f));
        awayGK.transform.SetParent(team1GO.transform);

        team1Ctrl.IsHumanTeam = false;
        team1Ctrl.TeamIndex = 1;
        var awayPlayers = new System.Collections.Generic.List<ProjectF.Player.PlayerController> {
            awayFW.GetComponent<ProjectF.Player.PlayerController>(),
            awayMF.GetComponent<ProjectF.Player.PlayerController>(),
            awayGK.GetComponent<ProjectF.Player.PlayerController>()
        };
        SetPrivateField(team1Ctrl, "_players", awayPlayers);

        // ── MATCH SYSTEM ─────────────────────────────────────────────────────
        var matchSysGO = new GameObject("MatchSystem");

        var matchServer = matchSysGO.AddComponent<ProjectF.Match.MatchServer>();
        SetPrivateField(matchServer, "_config", matchConfig);

        matchSysGO.AddComponent<ProjectF.Match.MatchManager>();
        matchSysGO.AddComponent<ProjectF.Match.ScoreManager>();

        var foulSys = matchSysGO.AddComponent<ProjectF.Match.FoulSystem>();
        SetPrivateField(foulSys, "_ball", ballCtrl);

        var kickoff = matchSysGO.AddComponent<ProjectF.Match.KickoffManager>();
        SetPrivateField(kickoff, "_ball", ballCtrl);
        SetPrivateField(kickoff, "_centreSpot", centreSpot.transform);
        SetPrivateField(kickoff, "_team0SpawnPoints", new Transform[] {
            homeSpawn0.transform, homeSpawn1.transform, homeSpawn2.transform });
        SetPrivateField(kickoff, "_team1SpawnPoints", new Transform[] {
            awaySpawn0.transform, awaySpawn1.transform, awaySpawn2.transform });

        // ── AUDIO ────────────────────────────────────────────────────────────
        var audioGO = new GameObject("AudioManager");
        audioGO.AddComponent<ProjectF.Utils.AudioManager>();

        // ── ECONOMY ──────────────────────────────────────────────────────────
        var economyGO = new GameObject("EconomyManager");
        economyGO.AddComponent<ProjectF.Economy.EconomyManager>();

        // ── CAMERA ───────────────────────────────────────────────────────────
        var mainCam = Camera.main;
        if (mainCam != null)
        {
            mainCam.transform.position = new Vector3(0f, 25f, -18f);
            mainCam.transform.rotation = Quaternion.Euler(55f, 0f, 0f);
            mainCam.orthographic = false;
            mainCam.fieldOfView = 45f;
            mainCam.farClipPlane = 100f;
        }

        // ── UI CANVAS ────────────────────────────────────────────────────────
        var canvasGO = new GameObject("MatchHUD_Canvas");
        var canvas = canvasGO.AddComponent<Canvas>();
        canvas.renderMode = RenderMode.ScreenSpaceOverlay;
        canvasGO.AddComponent<UnityEngine.UI.CanvasScaler>();
        canvasGO.AddComponent<UnityEngine.UI.GraphicRaycaster>();
        canvasGO.AddComponent<CanvasGroup>();

        // Score text
        CreateUIText(canvasGO.transform, "ScoreText", new Vector2(0, 1), new Vector2(0.5f, 1f),
            new Vector2(0, -10), "0 - 0", 32);

        // Timer text
        CreateUIText(canvasGO.transform, "TimerText", new Vector2(1, 1), new Vector2(1f, 1f),
            new Vector2(-80, -10), "2:00", 24);

        // Half text
        CreateUIText(canvasGO.transform, "HalfText", new Vector2(1, 1), new Vector2(1f, 1f),
            new Vector2(-80, -40), "1st Half", 16);

        // ── SAVE ─────────────────────────────────────────────────────────────
        EditorSceneManager.MarkSceneDirty(scene);
        EnsureFolder("Assets/Scenes");
        EditorSceneManager.SaveScene(scene, "Assets/Scenes/MatchScene.unity");

        AssetDatabase.SaveAssets();
        AssetDatabase.Refresh();

        Debug.Log("<color=green>[ProjectF] Match Scene setup complete! Press Play to start.</color>");
    }

    // ── Helpers ──────────────────────────────────────────────────────────────

    static GameObject CreatePlayer(string name, Vector3 pos, int teamIndex,
        ProjectF.Player.PlayerRole role, Material mat,
        ProjectF.Config.MatchConfig config, ProjectF.Physics.BallController ball,
        ProjectF.Ability.AbilityData ability)
    {
        var go = GameObject.CreatePrimitive(PrimitiveType.Capsule);
        go.name = name;
        go.transform.position = pos;
        go.GetComponent<Renderer>().sharedMaterial = mat;

        var rb = go.GetComponent<Rigidbody>();
        if (rb == null) rb = go.AddComponent<Rigidbody>();
        rb.mass = 80f;
        rb.constraints = RigidbodyConstraints.FreezeRotation;
        rb.interpolation = RigidbodyInterpolation.Interpolate;

        var pc = go.AddComponent<ProjectF.Player.PlayerController>();
        SetPrivateField(pc, "_config", config);
        SetPrivateField(pc, "_ball", ball);
        pc.TeamIndex = teamIndex;
        pc.Role = role;

        var abilitySys = go.AddComponent<ProjectF.Ability.AbilitySystem>();
        SetPrivateField(abilitySys, "_matchConfig", config);
        if (ability != null)
            SetPrivateField(abilitySys, "_abilityData", ability);

        return go;
    }

    static GameObject CreateEmptyChild(GameObject parent, string name, Vector3 localPos)
    {
        var go = new GameObject(name);
        go.transform.SetParent(parent.transform);
        go.transform.localPosition = localPos;
        return go;
    }

    static Material CreateMaterial(string name, Color color)
    {
        EnsureFolder("Assets/Materials");
        var mat = new Material(Shader.Find("Universal Render Pipeline/Lit"));
        if (mat.shader == null || mat.shader.name == "Hidden/InternalErrorShader")
            mat = new Material(Shader.Find("Standard"));
        mat.color = color;
        mat.name = name;
        AssetDatabase.CreateAsset(mat, $"Assets/Materials/{name}.asset");
        return mat;
    }

    static void CreateUIText(Transform parent, string name, Vector2 anchorMin, Vector2 anchorMax,
        Vector2 offset, string defaultText, int fontSize)
    {
        var go = new GameObject(name);
        go.transform.SetParent(parent);
        var rt = go.AddComponent<RectTransform>();
        rt.anchorMin = anchorMin;
        rt.anchorMax = anchorMax;
        rt.anchoredPosition = offset;
        rt.sizeDelta = new Vector2(200, 50);

        var text = go.AddComponent<UnityEngine.UI.Text>();
        text.text = defaultText;
        text.fontSize = fontSize;
        text.color = Color.white;
        text.alignment = TextAnchor.MiddleCenter;
        text.font = Resources.GetBuiltinResource<Font>("LegacyRuntime.ttf");
    }

    static void SetPrivateField(object target, string fieldName, object value)
    {
        var type = target.GetType();
        while (type != null)
        {
            var field = type.GetField(fieldName,
                System.Reflection.BindingFlags.Instance |
                System.Reflection.BindingFlags.NonPublic |
                System.Reflection.BindingFlags.Public);
            if (field != null)
            {
                field.SetValue(target, value);
                return;
            }
            type = type.BaseType;
        }
        Debug.LogWarning($"[MatchSceneSetup] Field '{fieldName}' not found on {target.GetType().Name}");
    }

    static void EnsureFolder(string path)
    {
        var parts = path.Split('/');
        string current = parts[0];
        for (int i = 1; i < parts.Length; i++)
        {
            string next = current + "/" + parts[i];
            if (!AssetDatabase.IsValidFolder(next))
                AssetDatabase.CreateFolder(current, parts[i]);
            current = next;
        }
    }
}
