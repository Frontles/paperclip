import { Animated, View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Colors } from '@/constants/colors';
import { TEAM_DISPLAY } from '@/types/index';
import leagueMetaData from '@/constants/leagueMeta.json';

const leagueMeta = leagueMetaData as Record<string, { badge: string; logo: string }>;

export interface ScoreBoardProps {
  homeName: string;
  awayName: string;
  homeScore: number;
  awayScore: number;
  timerLabel: string;
  homePulse: Animated.Value;
  awayPulse: Animated.Value;
  homeBadge?: string | null;
  awayBadge?: string | null;
  homeShort?: string | null;
  awayShort?: string | null;
  homeColor?: string;
  awayColor?: string;
  homeColor2?: string;
  awayColor2?: string;
  leagueName?: string;
  onQuit?: () => void;
  bgColor?: string;
  competitionBadge?: string | null;
  aggregateHome?: number;
  aggregateAway?: number;
  aggregateEnabled?: boolean;
}

export function ScoreBoard({
  homeName,
  awayName,
  homeScore,
  awayScore,
  timerLabel,
  homePulse,
  awayPulse,
  homeBadge,
  awayBadge,
  homeShort,
  awayShort,
  homeColor = Colors.homeColor,
  awayColor = Colors.awayColor,
  homeColor2 = '#000000',
  awayColor2 = '#000000',
  leagueName,
  onQuit,
  bgColor,
  competitionBadge,
  aggregateHome = 0,
  aggregateAway = 0,
  aggregateEnabled = false,
}: ScoreBoardProps) {
  const homeLabel = homeShort || TEAM_DISPLAY.getInitials(homeName);
  const awayLabel = awayShort || TEAM_DISPLAY.getInitials(awayName);
  const leagueBadge = leagueName ? leagueMeta[leagueName]?.badge : null;
  const displayBadge = competitionBadge !== undefined ? competitionBadge : leagueBadge;


  return (
    <View style={[styles.wrapper, bgColor != null && { backgroundColor: bgColor }]}>
      {/* League badge + quit button row */}
      <View style={styles.leagueRow}>
        <View style={styles.leagueRowSpacer} />
        {displayBadge ? (
          <Image source={{ uri: displayBadge }} style={styles.leagueBadge} resizeMode="contain" />
        ) : (
          <View style={styles.leagueBadge} />
        )}
        <View style={styles.leagueRowSpacer}>
          {onQuit && (
            <TouchableOpacity onPress={onQuit} activeOpacity={0.7} style={styles.quitBtn}>
              <Text style={styles.quitBtnText}>■ END</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>

      <View style={styles.scoreBar}>
        {/* Home side */}
        <View style={styles.teamSide}>
          <View style={[styles.colorHalf, { left: 0, backgroundColor: homeColor2 }]} />
          <View style={[styles.colorHalf, { right: 0, backgroundColor: homeColor }]} />
          <Text style={[styles.teamLabel, ]}>{homeLabel}</Text>
        </View>

        {/* Score center */}
        <View style={styles.scoreCenter}>
          <View style={styles.scoreRow}>
            <Animated.View style={{ transform: [{ scale: homePulse }] }}>
              <Text style={styles.scoreDigit}>{homeScore}</Text>
            </Animated.View>
            <Animated.View style={{ transform: [{ scale: awayPulse }] }}>
              <Text style={styles.scoreDigit}>{awayScore}</Text>
            </Animated.View>
          </View>
          <Text style={styles.timerText}>{timerLabel}</Text>
          {aggregateEnabled && (
            <Text style={styles.aggregateText}>AGG {aggregateHome + homeScore}-{aggregateAway + awayScore}</Text>
          )}
        </View>

        {/* Away side */}
        <View style={styles.teamSide}>
          <View style={[styles.colorHalf, { left: 0, backgroundColor: awayColor }]} />
          <View style={[styles.colorHalf, { right: 0, backgroundColor: awayColor2 }]} />
          <Text style={[styles.teamLabel, ]}>{awayLabel}</Text>
        </View>
      </View>

      {/* Large badges on sides - overlapping */}
      <View style={styles.badgeOverlayLeft} pointerEvents="none">
        {homeBadge && (
          <Image source={{ uri: homeBadge }} style={styles.badgeOverlayImg} resizeMode="contain" />
        )}
      </View>
      <View style={styles.badgeOverlayRight} pointerEvents="none">
        {awayBadge && (
          <Image source={{ uri: awayBadge }} style={styles.badgeOverlayImg} resizeMode="contain" />
        )}
      </View>
    </View>
  );
}

const SCOREBAR_H = 48;
const BADGE_SIZE = 56;

const styles = StyleSheet.create({
  wrapper: {
    paddingTop: 4,
    paddingBottom: 20,
    backgroundColor: Colors.surface,
    alignItems: 'center',
  },
  leagueRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 6,
    width: '100%',
    paddingHorizontal: 8,
  },
  leagueRowSpacer: {
    flex: 1,
    alignItems: 'flex-end',
  },
  quitBtn: {
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderRadius: 8,
    backgroundColor: 'rgba(230,57,70,0.2)',
    borderWidth: 1,
    borderColor: 'rgba(230,57,70,0.4)',
  },
  quitBtnText: {
    color: '#E63946',
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 1,
  },
  leagueBadge: {
    width: 195,
    height: 57,
  },
  scoreBar: {
    flexDirection: 'row',
    height: SCOREBAR_H,
    marginHorizontal: BADGE_SIZE * 0.45,
    borderRadius: 8,
    overflow: 'hidden',
  },
  teamSide: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  colorHalf: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    width: '50%',
  },
  teamLabel: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '900',
    letterSpacing: 1,
    zIndex: 1,
    textShadowColor: '#000000',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 12,
  },
  scoreCenter: {
    backgroundColor: '#1a1a2e',
    minWidth: 120,
    paddingHorizontal: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  scoreRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
  },
  scoreDigit: {
    color: '#FFFFFF',
    fontSize: 26,
    fontWeight: '900',
  },
  timerText: {
    color: 'rgba(255,255,255,0.6)',
    fontSize: 11,
    fontWeight: '600',
    marginTop: -2,
  },
  // Large badge overlays on left/right
  badgeOverlayLeft: {
    position: 'absolute',
    left: 0,
    bottom: 20,
    width: BADGE_SIZE,
    height: BADGE_SIZE,
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeOverlayRight: {
    position: 'absolute',
    right: 0,
    bottom: 20,
    width: BADGE_SIZE,
    height: BADGE_SIZE,
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeOverlayImg: {
    width: BADGE_SIZE,
    height: BADGE_SIZE,
  },
  aggregateText: {
    color: 'rgba(255,255,255,0.5)',
    fontSize: 9,
    fontWeight: '700',
    letterSpacing: 1,
    marginTop: -1,
  },
});
