import React, { useMemo } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { useMatchStore } from '@/stores/matchStore';
import { useI18n } from '@/hooks/useI18n';
import { Colors } from '@/constants/colors';
import type { MatchEvent, Player } from '@/types/index';
import { playersByTeam } from '@/services/playerDataService';
import { MotmCard } from '@/components/summary/MotmCard';

// ─── MOTM Computation ────────────────────────────────────────

interface MotmData {
  player: Player;
  goals: number;
}

function computeMotm(
  events: MatchEvent[],
  homeTeamName: string | null,
  awayTeamName: string | null,
): MotmData | null {
  if (!homeTeamName || !awayTeamName) return null;

  const homePlayers = playersByTeam.get(homeTeamName) ?? [];
  const awayPlayers = playersByTeam.get(awayTeamName) ?? [];
  const allPlayers = [...homePlayers, ...awayPlayers];
  if (allPlayers.length === 0) return null;

  const goalEvents = events.filter((e) => e.type === 'goal');

  // No goals: best overall from either team
  if (goalEvents.length === 0) {
    const best = allPlayers.reduce((a, b) => (b.stats.overall > a.stats.overall ? b : a));
    return { player: best, goals: 0 };
  }

  // Count goals per playerId
  const goalCount = new Map<number, number>();
  for (const ev of goalEvents) {
    goalCount.set(ev.playerId, (goalCount.get(ev.playerId) ?? 0) + 1);
  }

  // Most goals, tie-break by overall
  let best: Player | null = null;
  let bestGoals = 0;
  for (const [playerId, goals] of goalCount) {
    const player = allPlayers.find((p) => p.id === playerId);
    if (!player) continue;
    if (
      goals > bestGoals ||
      (goals === bestGoals && best !== null && player.stats.overall > best.stats.overall)
    ) {
      best = player;
      bestGoals = goals;
    }
  }

  if (!best) {
    const topOverall = allPlayers.reduce((a, b) => (b.stats.overall > a.stats.overall ? b : a));
    return { player: topOverall, goals: 0 };
  }

  return { player: best, goals: bestGoals };
}

// ─── Team Badge ──────────────────────────────────────────────

interface TeamBadgeProps {
  name: string;
}

function TeamBadge({ name }: TeamBadgeProps) {
  return (
    <View style={styles.teamBadge}>
      <Text style={styles.teamBadgeText}>{name.slice(0, 3).toUpperCase()}</Text>
    </View>
  );
}

// ─── Result Badge ─────────────────────────────────────────────

interface ResultBadgeProps {
  homeWins: boolean;
  isDraw: boolean;
}

function ResultBadge({ homeWins, isDraw }: ResultBadgeProps) {
  const label = isDraw ? 'DRAW' : homeWins ? 'WIN' : 'WIN';
  const badgeStyle = isDraw ? styles.resultBadgeDraw : styles.resultBadgeWin;
  return (
    <View style={[styles.resultBadge, badgeStyle]}>
      <Text style={styles.resultBadgeText}>{label}</Text>
    </View>
  );
}

// ─── Event Row ───────────────────────────────────────────────

interface EventRowProps {
  event: MatchEvent;
  isHome: boolean;
}

function EventRow({ event, isHome }: EventRowProps) {
  const icon = event.type === 'goal' ? '⚽' : '🟥';
  const dotColor = isHome ? Colors.homeColor : Colors.awayColor;
  return (
    <View style={styles.eventRow}>
      <Text style={styles.eventIcon}>{icon}</Text>
      <Text style={styles.eventMinute}>{event.minute}'</Text>
      <Text style={styles.eventPlayer} numberOfLines={1}>
        {event.playerName}
      </Text>
      <View style={[styles.eventDot, { backgroundColor: dotColor }]} />
    </View>
  );
}

// ─── Screen ──────────────────────────────────────────────────

export default function PostMatchScreen() {
  const router = useRouter();
  const { t } = useI18n();
  const homeTeam = useMatchStore((s) => s.homeTeam);
  const awayTeam = useMatchStore((s) => s.awayTeam);
  const homeScore = useMatchStore((s) => s.homeScore);
  const awayScore = useMatchStore((s) => s.awayScore);
  const events = useMatchStore((s) => s.events);
  const clearMatch = useMatchStore((s) => s.clearMatch);
  const clearTeams = useMatchStore((s) => s.clearTeams);

  const motm = useMemo(
    () => computeMotm(events, homeTeam?.name ?? null, awayTeam?.name ?? null),
    [events, homeTeam, awayTeam],
  );

  const homeWins = homeScore > awayScore;
  const awayWins = awayScore > homeScore;
  const isDraw = homeScore === awayScore;

  const handleRematch = () => {
    clearMatch();
    router.replace('/game/plinko');
  };

  const handleChangeTeams = () => {
    clearTeams();
    clearMatch();
    router.replace('/team-select');
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        {/* Score Section */}
        <Text style={styles.sectionLabel}>{t('summary.matchResult')}</Text>
        <View style={styles.scoreRow}>
          <View style={[styles.teamSide, homeWins && styles.teamSideWinner]}>
            <TeamBadge name={homeTeam?.name ?? '???'} />
            <Text style={styles.teamName} numberOfLines={2}>
              {homeTeam?.name ?? '???'}
            </Text>
          </View>
          <View style={styles.scoreCenter}>
            <Text style={styles.scoreHome}>{homeScore}</Text>
            <Text style={styles.scoreDash}> – </Text>
            <Text style={styles.scoreAway}>{awayScore}</Text>
          </View>
          <View style={[styles.teamSide, awayWins && styles.teamSideWinner]}>
            <TeamBadge name={awayTeam?.name ?? '???'} />
            <Text style={styles.teamName} numberOfLines={2}>
              {awayTeam?.name ?? '???'}
            </Text>
          </View>
        </View>

        {/* Result Badge */}
        <View style={styles.resultBadgeRow}>
          <ResultBadge homeWins={homeWins} isDraw={isDraw} />
        </View>

        {/* Events Timeline */}
        <Text style={styles.sectionLabel}>{t('summary.matchEvents')}</Text>
        {events.length > 0 ? (
          <View style={styles.eventsContainer}>
            {events.map((ev) => (
              <EventRow key={ev.id} event={ev} isHome={ev.teamName === homeTeam?.name} />
            ))}
          </View>
        ) : (
          <View style={styles.eventsEmpty}>
            <Text style={styles.eventsEmptyText}>{t('summary.noEvents')}</Text>
          </View>
        )}

        {/* MOTM */}
        {motm && (
          <>
            <Text style={styles.sectionLabel}>{t('summary.motm')}</Text>
            <MotmCard player={motm.player} goals={motm.goals} t={t} />
          </>
        )}

        {/* Action Buttons */}
        <View style={styles.actions}>
          <TouchableOpacity style={styles.btnPrimary} onPress={handleRematch} activeOpacity={0.85}>
            <Text style={styles.btnPrimaryText}>{t('summary.rematch')}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.btnSecondary}
            onPress={handleChangeTeams}
            activeOpacity={0.85}
          >
            <Text style={styles.btnSecondaryText}>{t('summary.changeTeams')}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.btnSecondary}
            onPress={() => router.replace('/')}
            activeOpacity={0.85}
          >
            <Text style={styles.btnSecondaryText}>{t('summary.home')}</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

// ─── Styles ──────────────────────────────────────────────────

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  scroll: {
    paddingHorizontal: 20,
    paddingTop: 24,
    paddingBottom: 40,
    gap: 12,
  },
  sectionLabel: {
    color: Colors.textSecondary,
    fontSize: 12,
    fontWeight: '600',
    letterSpacing: 2,
    textTransform: 'uppercase',
    textAlign: 'center',
    marginTop: 8,
    marginBottom: 4,
  },

  // Score
  scoreRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surface,
    borderRadius: 12,
    padding: 16,
  },
  teamSide: {
    flex: 1,
    alignItems: 'center',
    gap: 8,
    padding: 8,
    borderRadius: 8,
  },
  teamSideWinner: {
    backgroundColor: Colors.surfaceLight,
  },
  teamBadge: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: Colors.background,
    borderWidth: 2,
    borderColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  teamBadgeText: {
    color: Colors.textPrimary,
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 1,
  },
  teamName: {
    color: Colors.textPrimary,
    fontSize: 12,
    fontWeight: '600',
    textAlign: 'center',
  },
  scoreCenter: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
  },
  scoreHome: {
    color: Colors.textPrimary,
    fontSize: 44,
    fontWeight: '900',
  },
  scoreAway: {
    color: Colors.textPrimary,
    fontSize: 44,
    fontWeight: '900',
  },
  scoreDash: {
    color: Colors.textMuted,
    fontSize: 32,
    fontWeight: '300',
  },

  // Result Badge
  resultBadgeRow: {
    alignItems: 'center',
    marginTop: -4,
  },
  resultBadge: {
    paddingHorizontal: 20,
    paddingVertical: 6,
    borderRadius: 20,
  },
  resultBadgeWin: {
    backgroundColor: Colors.primary,
  },
  resultBadgeDraw: {
    backgroundColor: Colors.textSecondary,
  },
  resultBadgeText: {
    color: Colors.background,
    fontSize: 13,
    fontWeight: '800',
    letterSpacing: 2,
  },

  // Events
  eventsContainer: {
    backgroundColor: Colors.surface,
    borderRadius: 12,
    overflow: 'hidden',
  },
  eventsEmpty: {
    backgroundColor: Colors.surface,
    borderRadius: 12,
    paddingVertical: 24,
    alignItems: 'center',
  },
  eventsEmptyText: {
    color: Colors.textMuted,
    fontSize: 14,
    fontWeight: '500',
  },
  eventRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
    gap: 10,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: Colors.border,
  },
  eventIcon: {
    fontSize: 16,
    width: 22,
  },
  eventMinute: {
    color: Colors.textMuted,
    fontSize: 12,
    fontWeight: '600',
    width: 32,
  },
  eventPlayer: {
    flex: 1,
    color: Colors.textPrimary,
    fontSize: 14,
  },
  eventDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },

  // Actions
  actions: {
    marginTop: 16,
    gap: 10,
  },
  btnPrimary: {
    backgroundColor: Colors.primary,
    borderRadius: 10,
    paddingVertical: 14,
    alignItems: 'center',
  },
  btnPrimaryText: {
    color: Colors.background,
    fontSize: 15,
    fontWeight: '700',
    letterSpacing: 1,
  },
  btnSecondary: {
    backgroundColor: 'transparent',
    borderRadius: 10,
    paddingVertical: 14,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.border,
  },
  btnSecondaryText: {
    color: Colors.textSecondary,
    fontSize: 15,
    fontWeight: '600',
    letterSpacing: 1,
  },
});
