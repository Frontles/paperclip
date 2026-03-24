import { View, Text, StyleSheet } from 'react-native';
import { Image } from 'expo-image';
import type { Player } from '@/types/index';
import { Colors } from '@/constants/colors';
import type { TranslationKey } from '@/hooks/useI18n';

export interface MotmCardProps {
  player: Player;
  goals: number;
  t: (key: TranslationKey) => string;
}

export function MotmCard({ player, goals, t }: MotmCardProps) {
  return (
    <View style={styles.motmCard}>
      <Image
        source={{ uri: player.cardImageUrl }}
        style={styles.motmCardImage}
        contentFit="contain"
        transition={300}
      />
      <Text style={styles.motmName} numberOfLines={1}>
        {player.name}
      </Text>
      <View style={styles.motmMeta}>
        <Text style={styles.motmPosition}>{player.positionGroup}</Text>
        <Text style={styles.motmMetaDivider}>·</Text>
        <Text style={styles.motmTeam} numberOfLines={1}>
          {player.team}
        </Text>
      </View>
      {goals > 0 && (
        <Text style={styles.motmGoals}>
          {'⚽'.repeat(Math.min(goals, 5))} {goals}{' '}
          {goals === 1 ? t('summary.goal') : t('summary.goals')}
        </Text>
      )}
      <View style={styles.motmStats}>
        <View style={styles.motmStat}>
          <Text style={styles.motmStatValue}>{player.stats.overall}</Text>
          <Text style={styles.motmStatLabel}>OVR</Text>
        </View>
        <View style={styles.motmStatDivider} />
        <View style={styles.motmStat}>
          <Text style={styles.motmStatValue}>{player.stats.finishing}</Text>
          <Text style={styles.motmStatLabel}>FIN</Text>
        </View>
        <View style={styles.motmStatDivider} />
        <View style={styles.motmStat}>
          <Text style={styles.motmStatValue}>{player.stats.pace}</Text>
          <Text style={styles.motmStatLabel}>PAC</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  motmCard: {
    backgroundColor: Colors.surface,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: Colors.goalGold,
    alignItems: 'center',
    padding: 20,
    gap: 8,
  },
  motmCardImage: {
    width: 120,
    height: 160,
    borderRadius: 6,
  },
  motmMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  motmPosition: {
    color: Colors.goalGold,
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 1,
  },
  motmMetaDivider: {
    color: Colors.textMuted,
    fontSize: 12,
  },
  motmTeam: {
    color: Colors.textSecondary,
    fontSize: 12,
    fontWeight: '500',
    flexShrink: 1,
  },
  motmName: {
    color: Colors.textPrimary,
    fontSize: 18,
    fontWeight: '700',
    textAlign: 'center',
  },
  motmGoals: {
    color: Colors.goalGold,
    fontSize: 14,
    fontWeight: '600',
  },
  motmStats: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
    backgroundColor: Colors.background,
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 10,
    gap: 12,
  },
  motmStat: {
    alignItems: 'center',
  },
  motmStatValue: {
    color: Colors.goalGold,
    fontSize: 20,
    fontWeight: '900',
  },
  motmStatLabel: {
    color: Colors.textMuted,
    fontSize: 10,
    fontWeight: '600',
    letterSpacing: 1,
  },
  motmStatDivider: {
    width: 1,
    height: 32,
    backgroundColor: Colors.border,
  },
});
