#if UNITY_EDITOR
using System.IO;
using UnityEditor;
using UnityEngine;

namespace ProjectF.Cards
{
    /// <summary>
    /// Editor utility — generates all 30 MVP card assets in one click.
    /// Run via Tools → Project F → Generate MVP Cards.
    /// All 30 cards have unique stat distributions within GDD-defined tier ranges.
    /// </summary>
    public static class CardDataFactory
    {
        private const string OutputFolder = "Assets/ScriptableObjects/Cards";

        [MenuItem("Tools/Project F/Generate MVP Cards")]
        public static void GenerateMVPCards()
        {
            if (!Directory.Exists(OutputFolder))
                Directory.CreateDirectory(OutputFolder);

            // ─── NORMAL TIER (stats 40–60) ───────────────────────────────────────
            // 5 FW
            CreateCard("FW_NRM_01", "Kento Ryu",   CardRole.Forward,    CardTier.Normal, CardElement.Fire,      55, 58, 44, 52, 40, 48);
            CreateCard("FW_NRM_02", "Luca Bianchi", CardRole.Forward,    CardTier.Normal, CardElement.Wind,      50, 55, 48, 50, 42, 52);
            CreateCard("FW_NRM_03", "Dae-Ho Kim",   CardRole.Forward,    CardTier.Normal, CardElement.Lightning, 58, 50, 46, 54, 41, 45);
            CreateCard("FW_NRM_04", "Miko Hana",    CardRole.Forward,    CardTier.Normal, CardElement.Ice,       52, 60, 42, 48, 40, 50);
            CreateCard("FW_NRM_05", "Rafael Cruz",  CardRole.Forward,    CardTier.Normal, CardElement.Shadow,    56, 53, 50, 55, 40, 44);

            // 5 MF
            CreateCard("MF_NRM_01", "Yuki Tanaka",  CardRole.Midfielder, CardTier.Normal, CardElement.Wind,      46, 44, 58, 50, 46, 48);
            CreateCard("MF_NRM_02", "Erik Larsen",  CardRole.Midfielder, CardTier.Normal, CardElement.Ice,       48, 46, 55, 52, 48, 50);
            CreateCard("MF_NRM_03", "Sami Yilmaz",  CardRole.Midfielder, CardTier.Normal, CardElement.Fire,      50, 50, 60, 48, 44, 46);
            CreateCard("MF_NRM_04", "Jin Park",     CardRole.Midfielder, CardTier.Normal, CardElement.Lightning, 44, 42, 56, 54, 50, 52);
            CreateCard("MF_NRM_05", "Ryo Mori",     CardRole.Midfielder, CardTier.Normal, CardElement.Shadow,    52, 48, 53, 56, 42, 44);

            // 2 GK
            CreateCard("GK_NRM_01", "Pedro Santos", CardRole.Goalkeeper, CardTier.Normal, CardElement.Wind,      45, 42, 44, 40, 56, 55);
            CreateCard("GK_NRM_02", "Lars Erikson", CardRole.Goalkeeper, CardTier.Normal, CardElement.Ice,       48, 44, 46, 42, 55, 58);

            // ─── RARE TIER (stats 65–82) ─────────────────────────────────────────
            // 4 FW
            CreateCard("FW_RAR_01", "Shin Jiro",    CardRole.Forward,    CardTier.Rare,   CardElement.Fire,      78, 80, 66, 75, 65, 70);
            CreateCard("FW_RAR_02", "Marco Vitale", CardRole.Forward,    CardTier.Rare,   CardElement.Shadow,    75, 78, 68, 78, 65, 68);
            CreateCard("FW_RAR_03", "Aya Storm",    CardRole.Forward,    CardTier.Rare,   CardElement.Lightning, 80, 75, 65, 72, 66, 72);
            CreateCard("FW_RAR_04", "Carlos Vega",  CardRole.Forward,    CardTier.Rare,   CardElement.Wind,      76, 82, 67, 70, 65, 65);

            // 4 MF
            CreateCard("MF_RAR_01", "Haru Kaze",    CardRole.Midfielder, CardTier.Rare,   CardElement.Wind,      68, 66, 80, 72, 70, 68);
            CreateCard("MF_RAR_02", "Ivan Petrov",  CardRole.Midfielder, CardTier.Rare,   CardElement.Ice,       70, 68, 78, 75, 72, 72);
            CreateCard("MF_RAR_03", "Nora Lind",    CardRole.Midfielder, CardTier.Rare,   CardElement.Lightning, 72, 70, 82, 68, 65, 65);
            CreateCard("MF_RAR_04", "Kai Thunder",  CardRole.Midfielder, CardTier.Rare,   CardElement.Fire,      74, 72, 76, 80, 66, 70);

            // 2 GK
            CreateCard("GK_RAR_01", "Tomo Hoshi",   CardRole.Goalkeeper, CardTier.Rare,   CardElement.Ice,       72, 65, 68, 65, 80, 78);
            CreateCard("GK_RAR_02", "Dom Reyes",    CardRole.Goalkeeper, CardTier.Rare,   CardElement.Shadow,    70, 67, 70, 66, 78, 80);

            // ─── EXPERT TIER (stats 75–90) ───────────────────────────────────────
            // 3 FW
            CreateCard("FW_EXP_01", "Ryuu Blaze",   CardRole.Forward,    CardTier.Expert, CardElement.Fire,      88, 90, 76, 86, 75, 82);
            CreateCard("FW_EXP_02", "Sofia Vento",  CardRole.Forward,    CardTier.Expert, CardElement.Wind,      90, 85, 78, 88, 76, 78);
            CreateCard("FW_EXP_03", "Jin Shadow",   CardRole.Forward,    CardTier.Expert, CardElement.Shadow,    86, 88, 80, 84, 75, 80);

            // 3 MF
            CreateCard("MF_EXP_01", "Yoru Seraph",  CardRole.Midfielder, CardTier.Expert, CardElement.Lightning, 80, 78, 90, 84, 80, 78);
            CreateCard("MF_EXP_02", "Aria Frost",   CardRole.Midfielder, CardTier.Expert, CardElement.Ice,       78, 76, 88, 86, 82, 82);
            CreateCard("MF_EXP_03", "Ren Fenix",    CardRole.Midfielder, CardTier.Expert, CardElement.Fire,      82, 80, 86, 88, 78, 80);

            // 2 GK
            CreateCard("GK_EXP_01", "Kage Hito",    CardRole.Goalkeeper, CardTier.Expert, CardElement.Shadow,    84, 78, 80, 76, 90, 88);
            CreateCard("GK_EXP_02", "Val Strom",    CardRole.Goalkeeper, CardTier.Expert, CardElement.Ice,       82, 76, 78, 75, 88, 90);

            AssetDatabase.SaveAssets();
            AssetDatabase.Refresh();

            Debug.Log("[CardDataFactory] 30 MVP card assets generated in " + OutputFolder);
        }

        private static void CreateCard(string id, string playerName, CardRole role, CardTier tier,
            CardElement element, int pac, int sho, int pas, int dri, int def, int phy)
        {
            string path = $"{OutputFolder}/{id}.asset";

            // Skip if already exists
            if (File.Exists(Path.Combine(Application.dataPath.Replace("Assets", ""), path)))
                return;

            var card         = ScriptableObject.CreateInstance<CardData>();
            card.CardId      = id;
            card.PlayerName  = playerName;
            card.Role        = role;
            card.Tier        = tier;
            card.Element     = element;
            card.PAC         = pac;
            card.SHO         = sho;
            card.PAS         = pas;
            card.DRI         = dri;
            card.DEF         = def;
            card.PHY         = phy;

            AssetDatabase.CreateAsset(card, path);
        }
    }
}
#endif
