import React, { useMemo, useRef } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Image, Animated } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { useMatchStore } from '@/stores/matchStore';
import { useI18n } from '@/hooks/useI18n';
import { Colors } from '@/constants/colors';
import type { MatchEvent, Player } from '@/types/index';
import { playersByTeam } from '@/services/playerDataService';
import { ScoreBoard } from '@/components/game/ScoreBoard';
import { getMatchBadge } from '@/utils/getMatchBadge';
import { getCompetitionColors } from '@/constants/competitionMeta';
import { MotmCard } from '@/components/summary/MotmCard';

// ─── Asist hesaplama ────────────────────────────────────────
// %60 ihtimalle asist var, %40 solo gol

interface AssistResult {
  byPlayer: Map<number, number>;       // playerId → toplam asist sayısı (MOTM için)
  byEvent: Map<string, string>;        // eventId → asistçi adı (timeline için)
}

function computeAssists(
  events: MatchEvent[],
  homeTeamName: string,
  awayTeamName: string,
  homePlayers: Player[],
  awayPlayers: Player[],
): AssistResult {
  const byPlayer = new Map<number, number>();
  const byEvent = new Map<string, string>();
  let seed = events.length * 7 + 13;
  const pseudoRandom = () => {
    seed = (seed * 1103515245 + 12345) & 0x7fffffff;
    return (seed % 1000) / 1000;
  };
  for (const ev of events.filter(e => e.type === 'goal')) {
    if (pseudoRandom() > 0.6) continue;
    const teammates = ev.teamName === homeTeamName ? homePlayers : awayPlayers;
    const candidates = teammates.filter(p => p.id !== ev.playerId);
    if (candidates.length === 0) continue;
    const weights = candidates.map(p => p.stats.passing);
    const total = weights.reduce((s, w) => s + w, 0);
    let r = pseudoRandom() * total;
    let pick = candidates[0];
    for (let i = 0; i < candidates.length; i++) {
      r -= weights[i];
      if (r <= 0) { pick = candidates[i]; break; }
    }
    byPlayer.set(pick.id, (byPlayer.get(pick.id) ?? 0) + 1);
    byEvent.set(ev.id, pick.name);
  }
  return { byPlayer, byEvent };
}

// ─── MOTM — skor katkısına göre ─────────────────────────────

function computeMotm(
  events: MatchEvent[],
  homeTeamName: string | null,
  awayTeamName: string | null,
  winnerName: string | null,
  assistMap: AssistResult,
) {
  if (!homeTeamName || !awayTeamName) return null;
  const homePlayers = playersByTeam.get(homeTeamName) ?? [];
  const awayPlayers = playersByTeam.get(awayTeamName) ?? [];
  const pool = winnerName === homeTeamName ? homePlayers
    : winnerName === awayTeamName ? awayPlayers
    : [...homePlayers, ...awayPlayers];
  if (pool.length === 0) return null;

  const goalCount = new Map<number, number>();
  for (const ev of events.filter(e => e.type === 'goal')) goalCount.set(ev.playerId, (goalCount.get(ev.playerId) ?? 0) + 1);

  let best: Player | null = null;
  let bestContrib = -1, bestOvr = 0, bestG = 0, bestA = 0;
  for (const p of pool) {
    const g = goalCount.get(p.id) ?? 0;
    const a = assistMap.byPlayer.get(p.id) ?? 0;
    const contrib = g + a;
    if (contrib > bestContrib || (contrib === bestContrib && p.stats.overall > bestOvr)) {
      best = p; bestContrib = contrib; bestOvr = p.stats.overall; bestG = g; bestA = a;
    }
  }
  if (!best) {
    const top = pool.reduce((a, b) => b.stats.overall > a.stats.overall ? b : a);
    return { player: top, goals: 0, assists: 0, teamName: top.team };
  }
  return { player: best, goals: bestG, assists: bestA, teamName: best.team };
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
  const selectedMode = useMatchStore((s) => s.selectedMode);
  const competitionType = useMatchStore((s) => s.competitionType);
  const compColors = getCompetitionColors(competitionType);
  const aggregateEnabled = useMatchStore((s) => s.aggregateEnabled);
  const homeAggregate = useMatchStore((s) => s.homeAggregate);
  const awayAggregate = useMatchStore((s) => s.awayAggregate);
  const clearMatch = useMatchStore((s) => s.clearMatch);
  const clearTeams = useMatchStore((s) => s.clearTeams);

  const winnerName = homeScore > awayScore ? homeTeam?.name
    : awayScore > homeScore ? awayTeam?.name : null;

  const homeColor = homeTeam?.primaryColor ?? Colors.homeColor;
  const awayColor = awayTeam?.primaryColor ?? Colors.awayColor;
  const homeBadge = homeTeam?.badge ?? null;
  const awayBadge = awayTeam?.badge ?? null;

  // Dummy animated values (ScoreBoard expects them)
  const homePulse = useRef(new Animated.Value(1)).current;
  const awayPulse = useRef(new Animated.Value(1)).current;

  const assists = useMemo(() => {
    if (!homeTeam || !awayTeam) return { byPlayer: new Map<number, number>(), byEvent: new Map<string, string>() };
    return computeAssists(events, homeTeam.name, awayTeam.name, homeTeam.players, awayTeam.players);
  }, [events, homeTeam, awayTeam]);

  const motm = useMemo(
    () => computeMotm(events, homeTeam?.name ?? null, awayTeam?.name ?? null, winnerName ?? null, assists),
    [events, homeTeam, awayTeam, winnerName, assists],
  );

  const handleRematch = () => {
    clearMatch();
    router.replace(`/game/${selectedMode ?? 'plinko'}` as any);
  };
  const handleChangeTeams = () => {
    const mode = selectedMode;
    clearTeams();
    clearMatch();
    // Mode'u geri yükle — takım değiştirince mode seçimi atlanıyor
    if (mode) useMatchStore.getState().setSelectedMode(mode);
    router.replace('/team-select');
  };

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient colors={compColors.gradientColors} style={StyleSheet.absoluteFill} />

      {/* ScoreBoard — maç içi ile aynı */}
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
      <ScoreBoard
        homeName={homeTeam?.name ?? 'Home'}
        awayName={awayTeam?.name ?? 'Away'}
        homeScore={homeScore}
        awayScore={awayScore}
        timerLabel={t('summary.fullTime')}
        homePulse={homePulse}
        awayPulse={awayPulse}
        homeBadge={homeBadge}
        awayBadge={awayBadge}
        homeShort={homeTeam?.teamShort}
        awayShort={awayTeam?.teamShort}
        homeColor={homeColor}
        awayColor={awayColor}
        homeColor2={homeTeam?.secondaryColor}
        awayColor2={awayTeam?.secondaryColor}
        leagueName={homeTeam?.league}
        competitionBadge={getMatchBadge(competitionType, homeTeam?.league, awayTeam?.league)}
        bgColor="transparent"
        aggregateEnabled={aggregateEnabled}
        aggregateHome={homeAggregate}
        aggregateAway={awayAggregate}
      />

        {/* MOTM */}
        {motm && (
          <View style={{ paddingHorizontal: 16 }}>
          <MotmCard
            player={motm.player}
            goals={motm.goals}
            assists={motm.assists}
            teamColor={motm.teamName === homeTeam?.name ? homeColor : awayColor}
            t={t}
          />
          </View>
        )}

        {/* Match Events */}
        <Text style={styles.eventsTitle}>{t('summary.matchEvents')}</Text>
        {events.length > 0 ? (
          <View style={styles.eventsContainer}>
            {events.map((ev) => {
              const isHome = ev.teamName === homeTeam?.name;
              const isGoal = ev.type === 'goal';
              const isYellow = ev.type === 'yellow_card';
              const evIcon = isGoal ? '⚽' : isYellow ? '🟨' : '🟥';
              const badge = isHome ? homeBadge : awayBadge;
              const color = isHome ? homeColor : awayColor;
              const short = isHome
                ? (homeTeam?.teamShort || homeTeam?.name?.slice(0, 3).toUpperCase())
                : (awayTeam?.teamShort || awayTeam?.name?.slice(0, 3).toUpperCase());

              const BadgeEl = badge ? (
                <Image source={{ uri: badge }} style={styles.evBadge} resizeMode="contain" />
              ) : (
                <View style={[styles.evBadgeFb, { backgroundColor: color }]}>
                  <Text style={styles.evBadgeFbText}>{short}</Text>
                </View>
              );

              const assistName = isGoal ? assists.byEvent.get(ev.id) : undefined;

              return (
                <View key={ev.id} style={[styles.evRow, isHome ? styles.evRowHome : styles.evRowAway]}>
                  {isHome ? (
                    <>
                      {BadgeEl}
                      <Text style={styles.evMin}>{ev.minute}'</Text>
                      <View style={[styles.evContent, styles.evContentHome]}>
                        <Text style={styles.evIcon}>{evIcon}</Text>
                        <View style={styles.evTextCol}>
                          <Text style={styles.evPlayer} numberOfLines={1}>{ev.playerName}</Text>
                          {assistName && <Text style={styles.evAssist} numberOfLines={1}>👟 {assistName}</Text>}
                        </View>
                      </View>
                    </>
                  ) : (
                    <>
                      <View style={[styles.evContent, styles.evContentAway]}>
                        <View style={[styles.evTextCol, { alignItems: 'flex-end' }]}>
                          <Text style={[styles.evPlayer, { textAlign: 'right' }]} numberOfLines={1}>{ev.playerName}</Text>
                          {assistName && <Text style={[styles.evAssist, { textAlign: 'right' }]} numberOfLines={1}>👟 {assistName}</Text>}
                        </View>
                        <Text style={styles.evIcon}>{evIcon}</Text>
                      </View>
                      <Text style={styles.evMin}>{ev.minute}'</Text>
                      {BadgeEl}
                    </>
                  )}
                </View>
              );
            })}
          </View>
        ) : (
          <Text style={styles.noEvents}>{t('summary.noEvents')}</Text>
        )}

      {/* Buttons */}
      <View style={styles.buttonSection}>
        <TouchableOpacity onPress={handleRematch} activeOpacity={0.85} style={styles.btnPrimary}>
          <LinearGradient
            colors={[Colors.primary, Colors.primaryDark]}
            start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}
            style={styles.btnGrad}
          >
            <Text style={styles.btnPrimaryText}>{t('summary.rematch')}</Text>
          </LinearGradient>
        </TouchableOpacity>
        <View style={styles.btnRow}>
          <TouchableOpacity style={styles.btnSec} onPress={handleChangeTeams} activeOpacity={0.85}>
            <Text style={styles.btnSecText}>{t('summary.changeTeams')}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.btnSec} onPress={() => { clearMatch(); router.replace('/'); }} activeOpacity={0.85}>
            <Text style={styles.btnSecText}>{t('summary.home')}</Text>
          </TouchableOpacity>
        </View>
      </View>
      </ScrollView>
    </SafeAreaView>
  );
}

// ─── Styles ──────────────────────────────────────────────────

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  scrollContent: {
    paddingBottom: 40,
  },


  // Events
  eventsTitle: {
    color: Colors.textMuted,
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 2,
    paddingHorizontal: 16,
    marginTop: 12,
    marginBottom: 8,
  },
  eventsContainer: {
    gap: 6,
    paddingHorizontal: 16,
  },
  noEvents: {
    color: Colors.textMuted,
    fontSize: 13,
    textAlign: 'center',
    paddingVertical: 16,
  },

  // Event row
  evRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  evRowHome: {
    justifyContent: 'flex-end',
  },
  evRowAway: {
    justifyContent: 'flex-start',
  },
  evContent: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.1)',
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 8,
    gap: 6,
    flex: 1,
  },
  evContentHome: {
    flexDirection: 'row',
  },
  evContentAway: {
    flexDirection: 'row',
  },
  evIcon: { fontSize: 12 },
  evTextCol: {
    flex: 1,
  },
  evAssist: {
    color: Colors.textMuted,
    fontSize: 10,
    fontWeight: '600',
    marginTop: 1,
  },
  evPlayer: {
    color: Colors.textPrimary,
    fontSize: 13,
    fontWeight: '600',
    flex: 1,
  },
  evMin: {
    color: Colors.textMuted,
    fontSize: 11,
    fontWeight: '700',
    width: 28,
    textAlign: 'center',
  },
  evBadge: {
    width: 22,
    height: 22,
  },
  evBadgeFb: {
    width: 22,
    height: 22,
    borderRadius: 11,
    alignItems: 'center',
    justifyContent: 'center',
  },
  evBadgeFbText: {
    color: '#fff',
    fontSize: 7,
    fontWeight: '900',
  },

  // Buttons
  buttonSection: {
    paddingHorizontal: 16,
    paddingTop: 16,
    gap: 8,
  },
  btnPrimary: { borderRadius: 12, overflow: 'hidden' },
  btnGrad: { paddingVertical: 14, alignItems: 'center' },
  btnPrimaryText: { color: '#0d2818', fontSize: 15, fontWeight: '900', letterSpacing: 2 },
  btnRow: { flexDirection: 'row', gap: 8 },
  btnSec: {
    flex: 1,
    borderRadius: 12,
    paddingVertical: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(125,206,160,0.15)',
  },
  btnSecText: { color: Colors.textMuted, fontSize: 12, fontWeight: '700' },
});
