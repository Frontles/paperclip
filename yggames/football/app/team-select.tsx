import React, { useState, useMemo, useCallback } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import Svg, { Rect, Defs, ClipPath, Path } from 'react-native-svg';
import { Colors } from '@/constants/colors';
import { useMatchStore } from '@/stores/matchStore';
import { useI18n } from '@/hooks/useI18n';
import { getTeamsByLeague, getAllLeagues } from '@/services/playerDataService';
import { LEAGUE_DISPLAY_NAMES } from '@/types/index';
import type { Team } from '@/types/index';
import leagueMetaData from '@/constants/leagueMeta.json';
import { COMPETITIONS, COMPETITION_META, type CompetitionType } from '@/constants/competitionMeta';

const leagueMeta = leagueMetaData as Record<string, { badge: string; logo: string; name: string }>;

// ─── Helpers ─────────────────────────────────────────────────

function computeStats(team: Team) {
  const players = team.players;
  if (!players.length) return { atk: 0, mid: 0, def: 0 };
  const fwd = players.filter(p => p.positionGroup === 'FWD');
  const mid = players.filter(p => p.positionGroup === 'MID');
  const def = players.filter(p => p.positionGroup === 'DEF' || p.positionGroup === 'GK');
  const avg = (arr: typeof players, key: 'shooting' | 'passing' | 'defending') =>
    arr.length ? Math.round(arr.reduce((s, p) => s + p.stats[key], 0) / arr.length) : 0;
  return {
    atk: avg(fwd.length ? fwd : players, 'shooting'),
    mid: avg(mid.length ? mid : players, 'passing'),
    def: avg(def.length ? def : players, 'defending'),
  };
}

function teamOverall(team: Team): number {
  if (!team.players.length) return 0;
  return Math.round(team.players.reduce((s, p) => s + p.stats.overall, 0) / team.players.length);
}

function starCount(overall: number): number {
  if (overall >= 85) return 5;
  if (overall >= 82) return 4.5;
  if (overall >= 79) return 4;
  if (overall >= 76) return 3.5;
  if (overall >= 73) return 3;
  if (overall >= 70) return 2.5;
  if (overall >= 67) return 2;
  return 1.5;
}

// ─── Arrow Button ────────────────────────────────────────────

function ArrowBtn({ direction, onPress, size = 'md' }: { direction: 'left' | 'right'; onPress: () => void; size?: 'sm' | 'md' }) {
  const dim = size === 'sm' ? 28 : 34;
  const iconSize = size === 'sm' ? 12 : 16;
  return (
    <TouchableOpacity
      onPress={onPress}
      hitSlop={12}
      activeOpacity={0.6}
      style={[styles.arrowBtn, { width: dim, height: dim, borderRadius: dim / 2 }]}
    >
      <Svg width={iconSize} height={iconSize} viewBox="0 0 24 24">
        <Path
          d={direction === 'left' ? 'M15 18l-6-6 6-6' : 'M9 6l6 6-6 6'}
          stroke="rgba(125,206,160,0.8)"
          strokeWidth={3}
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
      </Svg>
    </TouchableOpacity>
  );
}

// ─── Star Rating ─────────────────────────────────────────────

const STAR_PATH = 'M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 21 12 17.27 5.82 21 7 14.14 2 9.27l6.91-1.01L12 2z';
const STAR_SIZE = 16;

function StarRating({ rating }: { rating: number }) {
  const stars = [];
  for (let i = 0; i < 5; i++) {
    const fill = Math.min(1, Math.max(0, rating - i));
    stars.push(
      <Svg key={i} width={STAR_SIZE} height={STAR_SIZE} viewBox="0 0 24 24">
        <Path d={STAR_PATH} fill="rgba(255,255,255,0.12)" />
        {fill > 0 && (
          <>
            <Defs>
              <ClipPath id={`clip-${i}`}>
                <Rect x="0" y="0" width={24 * fill} height="24" />
              </ClipPath>
            </Defs>
            <Path d={STAR_PATH} fill="#FFD700" clipPath={`url(#clip-${i})`} />
          </>
        )}
      </Svg>
    );
  }
  return <View style={{ flexDirection: 'row', gap: 2 }}>{stars}</View>;
}

// ─── Team Panel ──────────────────────────────────────────────

interface TeamPanelProps {
  side: 'home' | 'away';
  sideLabel: string;
  leagues: ReturnType<typeof getAllLeagues>;
  leagueIndex: number;
  teamIndex: number;
  onLeagueChange: (delta: number) => void;
  onTeamChange: (delta: number) => void;
}

function TeamPanel({ side, sideLabel, leagues, leagueIndex, teamIndex, onLeagueChange, onTeamChange }: TeamPanelProps) {
  const league = leagues[leagueIndex];
  const displayName = LEAGUE_DISPLAY_NAMES[league.name] ?? league.name;
  const teams = useMemo(() => getTeamsByLeague(displayName), [displayName]);
  const team = teams[teamIndex % teams.length] as Team | undefined;
  const meta = leagueMeta[league.name];

  if (!team) return null;

  const stats = computeStats(team);
  const overall = teamOverall(team);
  const rating = starCount(overall);
  const isHome = side === 'home';

  return (
    <View style={styles.panel}>
      <LinearGradient
        colors={isHome ? ['rgba(20,60,35,0.8)', 'rgba(12,40,22,0.6)'] : ['rgba(25,50,40,0.8)', 'rgba(15,35,25,0.6)']}
        style={[StyleSheet.absoluteFill, { borderRadius: 14 }]}
      />

      {/* Side label */}
      <View style={[styles.sideBadge, { backgroundColor: isHome ? 'rgba(255,199,44,0.12)' : 'rgba(230,57,70,0.12)' }]}>
        <Text style={[styles.sideLabelText, { color: isHome ? '#FFC72C' : '#E63946' }]}>{sideLabel}</Text>
      </View>

      {/* Team name */}
      <Text style={styles.teamNameLarge} numberOfLines={1}>{team.name}</Text>

      {/* Team badge with arrows */}
      <View style={styles.badgeRow}>
        <ArrowBtn direction="left" onPress={() => onTeamChange(-1)} />
        {team.badge ? (
          <Image source={{ uri: team.badge }} style={styles.badgeLarge} resizeMode="contain" />
        ) : (
          <View style={[styles.badgeFallback, { backgroundColor: team.primaryColor }]}>
            <Text style={styles.badgeFallbackText}>
              {team.teamShort || team.name.substring(0, 3).toUpperCase()}
            </Text>
          </View>
        )}
        <ArrowBtn direction="right" onPress={() => onTeamChange(1)} />
      </View>

      {/* Stars */}
      <StarRating rating={rating} />

      {/* Stats */}
      <View style={styles.statsRow}>
        <View style={styles.statItem}>
          <Text style={styles.statLabel}>ATK</Text>
          <Text style={styles.statValue}>{stats.atk}</Text>
        </View>
        <View style={styles.statDivider} />
        <View style={styles.statItem}>
          <Text style={styles.statLabel}>MID</Text>
          <Text style={styles.statValue}>{stats.mid}</Text>
        </View>
        <View style={styles.statDivider} />
        <View style={styles.statItem}>
          <Text style={styles.statLabel}>DEF</Text>
          <Text style={styles.statValue}>{stats.def}</Text>
        </View>
      </View>

      {/* League selector */}
      <View style={styles.leagueSection}>
        <View style={styles.leagueSelector}>
          <ArrowBtn direction="left" onPress={() => onLeagueChange(-1)} size="sm" />
          {meta?.badge ? (
            <Image source={{ uri: meta.badge }} style={styles.leagueBadge} resizeMode="contain" />
          ) : (
            <Text style={styles.leagueNameFallback} numberOfLines={1}>{displayName}</Text>
          )}
          <ArrowBtn direction="right" onPress={() => onLeagueChange(1)} size="sm" />
        </View>
      </View>
    </View>
  );
}

// ─── Screen ──────────────────────────────────────────────────

export default function TeamSelectScreen() {
  const router = useRouter();
  const { t } = useI18n();
  const { setHomeTeam, setAwayTeam, setCompetitionType } = useMatchStore();

  const allLeagues = useMemo(() => getAllLeagues(), []);

  const [homeLeagueIdx, setHomeLeagueIdx] = useState(0);
  const [homeTeamIdx, setHomeTeamIdx] = useState(0);
  const [awayLeagueIdx, setAwayLeagueIdx] = useState(0);
  const [awayTeamIdx, setAwayTeamIdx] = useState(0);
  const [compIdx, setCompIdx] = useState(0);

  const getTeam = useCallback((leagueIdx: number, teamIdx: number) => {
    const league = allLeagues[leagueIdx];
    const displayName = LEAGUE_DISPLAY_NAMES[league.name] ?? league.name;
    const teams = getTeamsByLeague(displayName);
    return teams[teamIdx % teams.length];
  }, [allLeagues]);

  const wrap = (val: number, len: number) => ((val % len) + len) % len;

  const handleHomeLeague = useCallback((d: number) => {
    setHomeLeagueIdx(prev => wrap(prev + d, allLeagues.length));
    setHomeTeamIdx(0);
  }, [allLeagues.length]);

  const handleAwayLeague = useCallback((d: number) => {
    setAwayLeagueIdx(prev => wrap(prev + d, allLeagues.length));
    setAwayTeamIdx(0);
  }, [allLeagues.length]);

  const handleHomeTeam = useCallback((d: number) => {
    const league = allLeagues[homeLeagueIdx];
    const displayName = LEAGUE_DISPLAY_NAMES[league.name] ?? league.name;
    const count = getTeamsByLeague(displayName).length;
    setHomeTeamIdx(prev => wrap(prev + d, count));
  }, [allLeagues, homeLeagueIdx]);

  const handleAwayTeam = useCallback((d: number) => {
    const league = allLeagues[awayLeagueIdx];
    const displayName = LEAGUE_DISPLAY_NAMES[league.name] ?? league.name;
    const count = getTeamsByLeague(displayName).length;
    setAwayTeamIdx(prev => wrap(prev + d, count));
  }, [allLeagues, awayLeagueIdx]);

  const handleCompChange = useCallback((d: number) => {
    setCompIdx(prev => ((prev + d) % COMPETITIONS.length + COMPETITIONS.length) % COMPETITIONS.length);
  }, []);

  const handleConfirm = useCallback(() => {
    const home = getTeam(homeLeagueIdx, homeTeamIdx);
    const away = getTeam(awayLeagueIdx, awayTeamIdx);
    if (home && away) {
      setHomeTeam(home);
      setAwayTeam(away);
      setCompetitionType(COMPETITIONS[compIdx]);
      router.push('/pre-match');
    }
  }, [homeLeagueIdx, homeTeamIdx, awayLeagueIdx, awayTeamIdx, getTeam, setHomeTeam, setAwayTeam, setCompetitionType, compIdx, router]);

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient colors={['#081a10', '#0f2a1a', '#0a1f14']} style={StyleSheet.absoluteFill} />

      {/* Top bar */}
      <View style={styles.topBar}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn} activeOpacity={0.7}>
          <Svg width={18} height={18} viewBox="0 0 24 24">
            <Path d="M15 18l-6-6 6-6" stroke={Colors.primary} strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" fill="none" />
          </Svg>
        </TouchableOpacity>
        <Text style={styles.titleText}>{t('teamSelection.title')}</Text>
        <View style={{ width: 40 }} />
      </View>

      {/* Competition selector */}
      <View style={styles.compRow}>
        <ArrowBtn direction="left" onPress={() => handleCompChange(-1)} size="sm" />
        {(() => {
          const comp = COMPETITIONS[compIdx];
          const meta = COMPETITION_META[comp];
          const badge = meta.badge;
          return badge ? (
            <Image source={{ uri: badge }} style={styles.compBadge} resizeMode="contain" />
          ) : (
            <Text style={styles.compName}>{t(meta.nameKey as any)}</Text>
          );
        })()}
        <ArrowBtn direction="right" onPress={() => handleCompChange(1)} size="sm" />
      </View>

      {/* Two panels */}
      <View style={styles.panelsRow}>
        <TeamPanel
          side="home"
          sideLabel={t('teamSelection.home')}
          leagues={allLeagues}
          leagueIndex={homeLeagueIdx}
          teamIndex={homeTeamIdx}
          onLeagueChange={handleHomeLeague}
          onTeamChange={handleHomeTeam}
        />

        <View style={styles.vsCenter}>
          <View style={styles.vsCircle}>
            <Text style={styles.vsText}>{t('teamSelection.vs')}</Text>
          </View>
        </View>

        <TeamPanel
          side="away"
          sideLabel={t('teamSelection.away')}
          leagues={allLeagues}
          leagueIndex={awayLeagueIdx}
          teamIndex={awayTeamIdx}
          onLeagueChange={handleAwayLeague}
          onTeamChange={handleAwayTeam}
        />
      </View>

      {/* Confirm button */}
      <View style={styles.bottomBar}>
        <TouchableOpacity onPress={handleConfirm} activeOpacity={0.8} style={styles.confirmBtn}>
          <LinearGradient
            colors={[Colors.primary, Colors.primaryDark]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.confirmGradient}
          >
            <Text style={styles.confirmText}>{t('teamSelection.continue')}</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

// ─── Styles ──────────────────────────────────────────────────

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  // Competition selector
  compRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    paddingVertical: 4,
  },
  compBadge: {
    width: 120,
    height: 40,
  },
  compName: {
    color: Colors.textSecondary,
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 1,
    width: 120,
    textAlign: 'center',
  },

  // Top bar
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  backBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(125,206,160,0.1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleText: {
    fontSize: 14,
    fontWeight: '800',
    color: Colors.textPrimary,
    letterSpacing: 3,
  },

  // Panels
  panelsRow: {
    flex: 1,
    flexDirection: 'row',
    paddingHorizontal: 6,
    alignItems: 'center',
  },

  // VS
  vsCenter: {
    width: 36,
    alignItems: 'center',
    justifyContent: 'center',
  },
  vsCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(125,206,160,0.06)',
    borderWidth: 1,
    borderColor: 'rgba(125,206,160,0.15)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  vsText: {
    fontSize: 11,
    fontWeight: '900',
    color: Colors.primary,
    letterSpacing: 1,
  },

  // Arrow button
  arrowBtn: {
    backgroundColor: 'rgba(125,206,160,0.08)',
    borderWidth: 1,
    borderColor: 'rgba(125,206,160,0.15)',
    alignItems: 'center',
    justifyContent: 'center',
  },

  // Panel
  panel: {
    flex: 1,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: 'rgba(45,106,79,0.2)',
    paddingVertical: 12,
    paddingHorizontal: 6,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 20,
    overflow: 'hidden',
  },
  sideBadge: {
    paddingHorizontal: 12,
    paddingVertical: 3,
    borderRadius: 8,
  },
  sideLabelText: {
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 2,
  },

  // Team
  teamNameLarge: {
    fontSize: 12,
    fontWeight: '800',
    color: Colors.textPrimary,
    textAlign: 'center',
    letterSpacing: 0.3,
  },
  badgeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
  },
  badgeLarge: {
    width: 82,
    height: 82,
  },
  badgeFallback: {
    width: 82,
    height: 82,
    borderRadius: 41,
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeFallbackText: {
    fontSize: 22,
    fontWeight: '900',
    color: '#FFF',
    textShadowColor: '#000',
    textShadowRadius: 6,
    textShadowOffset: { width: 0, height: 0 },
  },

  // Stats
  statsRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statItem: {
    alignItems: 'center',
    paddingHorizontal: 8,
  },
  statDivider: {
    width: 1,
    height: 24,
    backgroundColor: 'rgba(255,255,255,0.06)',
  },
  statLabel: {
    fontSize: 9,
    fontWeight: '700',
    color: Colors.textMuted,
    letterSpacing: 1,
    marginBottom: 1,
  },
  statValue: {
    fontSize: 18,
    fontWeight: '900',
    color: Colors.textPrimary,
  },

  // League section
  leagueSection: {
    width: '100%',
    borderTopWidth: 1,
    borderTopColor: 'rgba(45,106,79,0.12)',
    paddingTop: 10,
    paddingBottom: 4,
  },
  leagueSelector: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
  },
  leagueBadge: {
    width: 100,
    height: 46,
  },
  leagueNameFallback: {
    fontSize: 10,
    fontWeight: '600',
    color: Colors.textSecondary,
    maxWidth: 90,
    textAlign: 'center',
  },

  // Bottom
  bottomBar: {
    paddingHorizontal: 14,
    paddingBottom: 14,
    paddingTop: 8,
  },
  confirmBtn: {
    borderRadius: 14,
    overflow: 'hidden',
    elevation: 8,
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.35,
    shadowRadius: 12,
  },
  confirmGradient: {
    paddingVertical: 16,
    alignItems: 'center',
  },
  confirmText: {
    fontSize: 16,
    fontWeight: '900',
    color: '#0d2818',
    letterSpacing: 3,
  },
});
