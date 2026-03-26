import { View, Text, StyleSheet, Dimensions } from "react-native";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import type { Player } from "@/types/index";
import { Colors } from "@/constants/colors";
import type { TranslationKey } from "@/hooks/useI18n";

const CARD_W = Dimensions.get("window").width - 100;
const IMAGE_H = CARD_W * 0.8;

export interface MotmCardProps {
  player: Player;
  goals: number;
  assists: number;
  teamColor: string;
  t: (key: TranslationKey) => string;
}

export function MotmCard({
  player,
  goals,
  assists,
  teamColor,
  t,
}: MotmCardProps) {
  return (
    <View style={styles.container}>
      <LinearGradient
        colors={["#1a1a2e", "#16213e", "#0f3460"]}
        style={styles.card}
      >
        {/* Player image */}
        <Image
          source={{ uri: player.cardImageUrl }}
          style={styles.playerImage}
          contentFit="contain"
          transition={300}
        />

        {/* Player name */}
        <Text style={styles.playerName} numberOfLines={1}>
          {player.name}
        </Text>

        {/* Goals & Assists */}
        {(goals > 0 || assists > 0) && (
          <View style={styles.statsRow}>
            {goals > 0 && (
              <View style={styles.statChip}>
                <Text style={styles.statEmoji}>⚽</Text>
                <Text style={styles.statCount}>{goals}</Text>
                <Text style={styles.statLabel}>
                  {goals === 1 ? t("summary.goal") : t("summary.goals")}
                </Text>
              </View>
            )}
            {assists > 0 && (
              <View style={styles.statChip}>
                <Text style={styles.statEmoji}>👟</Text>
                <Text style={styles.statCount}>{assists}</Text>
                <Text style={styles.statLabel}>
                  {assists === 1 ? t("summary.assist") : t("summary.assists")}
                </Text>
              </View>
            )}
          </View>
        )}

        {/* MOTM badge */}
        <LinearGradient
          colors={["#FFD700", "#FFA500"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.motmBadge}
        >
          <Text style={styles.motmText}>
            ★ {t("summary.motm").toUpperCase()}
          </Text>
        </LinearGradient>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
  },
  card: {
    width: CARD_W,
    borderRadius: 14,
    alignItems: "center",
    paddingTop: 12,
    paddingBottom: 14,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.1)",
    overflow: "hidden",
  },
  playerImage: {
    width: CARD_W - 32,
    height: IMAGE_H,
  },
  playerName: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "900",
    letterSpacing: 0.5,
    marginTop: 8,
    textAlign: "center",
  },
  statsRow: {
    flexDirection: "row",
    gap: 10,
    marginTop: 8,
  },
  statChip: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.08)",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    gap: 5,
  },
  statEmoji: {
    fontSize: 12,
  },
  statCount: {
    color: "#FFD700",
    fontSize: 14,
    fontWeight: "900",
  },
  statLabel: {
    color: "rgba(255,255,255,0.5)",
    fontSize: 10,
    fontWeight: "600",
  },
  motmBadge: {
    marginTop: 10,
    paddingHorizontal: 18,
    paddingVertical: 6,
    borderRadius: 16,
  },
  motmText: {
    color: "#1a1a2e",
    fontSize: 10,
    fontWeight: "900",
    letterSpacing: 1.5,
  },
});
