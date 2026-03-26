import { useCallback, useEffect, useRef, useState } from 'react';
import {
  Animated,
  LayoutChangeEvent,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { useSound } from '@/hooks/useSound';
import { soundService } from '@/services/soundService';
import { getMatchBadge } from '@/utils/getMatchBadge';
import { getCompetitionColors } from '@/constants/competitionMeta';
import { Colors } from '@/constants/colors';
import { useMatchStore } from '@/stores/matchStore';
import { useArenaEngine } from '@/hooks/useArenaEngine';
import { useMatchTimer } from '@/hooks/useMatchTimer';
import { useMatchEvents } from '@/hooks/useMatchEvents';
import { EventToastStack } from '@/components/game/EventToast';
import { ScoreBoard } from '@/components/game/ScoreBoard';
import { QuitModal } from '@/components/game/QuitModal';

// ─── Constants ─────────────────────────────────────────────────

const BALL_RADIUS = 8;
const OWNERSHIP_SWITCH_MS = 5000;

// ─── Screen ────────────────────────────────────────────────────

export default function ArenaGameScreen() {
  const router = useRouter();
  const { play } = useSound();

  const homeTeam = useMatchStore((s) => s.homeTeam);
  const awayTeam = useMatchStore((s) => s.awayTeam);
  const homeScore = useMatchStore((s) => s.homeScore);
  const awayScore = useMatchStore((s) => s.awayScore);
  const addGoal = useMatchStore((s) => s.addGoal);
  const addEvent = useMatchStore((s) => s.addEvent);
  const setCurrentMinute = useMatchStore((s) => s.setCurrentMinute);
  const setExtraTime = useMatchStore((s) => s.setExtraTime);
  const competitionType = useMatchStore((s) => s.competitionType);
  const aggregateEnabled = useMatchStore((s) => s.aggregateEnabled);
  const homeAggregate = useMatchStore((s) => s.homeAggregate);
  const awayAggregate = useMatchStore((s) => s.awayAggregate);

  const [canvasSize, setCanvasSize] = useState({ width: 0, height: 0 });
  const [isRunning, setIsRunning] = useState(true);
  const [showQuit, setShowQuit] = useState(false);

  // Goal ownership: home starts as owner
  const [isHomeOwnership, setIsHomeOwnership] = useState(true);
  const [ownershipCountdown, setOwnershipCountdown] = useState(5);

  const homeName = homeTeam?.name ?? 'Home';
  const awayName = awayTeam?.name ?? 'Away';
  const homeColor = homeTeam?.primaryColor ?? Colors.homeColor;
  const awayColor = awayTeam?.primaryColor ?? Colors.awayColor;
  const homeBadge = homeTeam?.badge ?? null;
  const awayBadge = awayTeam?.badge ?? null;
  const homeShort = homeTeam?.teamShort ?? null;
  const awayShort = awayTeam?.teamShort ?? null;
  const homePlayers = homeTeam?.players ?? [];
  const awayPlayers = awayTeam?.players ?? [];

  const ownerColor = isHomeOwnership ? homeColor : awayColor;
  const ownerName = isHomeOwnership ? homeName : awayName;

  // Score pulse animations
  const homePulse = useRef(new Animated.Value(1)).current;
  const awayPulse = useRef(new Animated.Value(1)).current;
  const goalFlash = useRef(new Animated.Value(0)).current;

  const triggerGoalFlash = useCallback(() => {
    goalFlash.setValue(0.5);
    Animated.timing(goalFlash, { toValue: 0, duration: 600, useNativeDriver: true }).start();
  }, [goalFlash]);

  // Whistle on match start
  useEffect(() => {
    play('whistle_start');
    soundService.startAmbient(true);
    return () => {
      soundService.stopAmbient();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const prevHomeScore = useRef(homeScore);
  const prevAwayScore = useRef(awayScore);

  useEffect(() => {
    if (homeScore > prevHomeScore.current) {
      prevHomeScore.current = homeScore;
      Animated.sequence([
        Animated.timing(homePulse, { toValue: 1.4, duration: 120, useNativeDriver: true }),
        Animated.spring(homePulse, { toValue: 1, useNativeDriver: true }),
      ]).start();
    }
  }, [homeScore, homePulse]);

  useEffect(() => {
    if (awayScore > prevAwayScore.current) {
      prevAwayScore.current = awayScore;
      Animated.sequence([
        Animated.timing(awayPulse, { toValue: 1.4, duration: 120, useNativeDriver: true }),
        Animated.spring(awayPulse, { toValue: 1, useNativeDriver: true }),
      ]).start();
    }
  }, [awayScore, awayPulse]);

  // Ownership switch timer
  useEffect(() => {
    if (!isRunning) return;

    const switchId = setInterval(() => {
      setIsHomeOwnership((prev) => !prev);
      setOwnershipCountdown(5);
    }, OWNERSHIP_SWITCH_MS);

    const countdownId = setInterval(() => {
      setOwnershipCountdown((prev) => (prev <= 1 ? 5 : prev - 1));
    }, 1000);

    return () => {
      clearInterval(switchId);
      clearInterval(countdownId);
    };
  }, [isRunning]);

  const handleRedCardSound = useCallback(() => play('red_card'), [play]);

  const { toasts, handleGoal: handleGoalEvent, handleRedCardCheck, handleYellowCardCheck, removeBallForRedCard } =
    useArenaEvents({
      homeTeamName: homeName,
      awayTeamName: awayName,
      homePlayers,
      awayPlayers,
      onEventRecorded: addEvent,
      onRedCard: handleRedCardSound,
    });

  // Match timer
  const handleMatchEnd = useCallback(() => {
    setIsRunning(false);
    play('whistle_end');
    soundService.stopAmbient();
    setTimeout(() => {
      router.replace('/post-match');
    }, 1000);
  }, [router, play]);

  const { timerLabel, isExtraTime, extraMinute, matchMinute } = useMatchTimer({
    isRunning,
    onRedCardCheck: handleRedCardCheck,
    onYellowCardCheck: handleYellowCardCheck,
    onMatchEnd: handleMatchEnd,
  });

  useEffect(() => {
    setCurrentMinute(matchMinute);
  }, [matchMinute, setCurrentMinute]);

  useEffect(() => {
    setExtraTime(isExtraTime, extraMinute);
  }, [isExtraTime, extraMinute, setExtraTime]);

  const handleLayout = useCallback((e: LayoutChangeEvent) => {
    const { width, height } = e.nativeEvent.layout;
    setCanvasSize({ width, height });
  }, []);

  const handleGoal = useCallback(
    (teamName: string) => {
      addGoal(teamName);
      handleGoalEvent(teamName, matchMinute);
      play('goal_scored');
      triggerGoalFlash();
    },
    [addGoal, handleGoalEvent, matchMinute, play, triggerGoalFlash],
  );

  const { balls, arenaRadius, arenaCx, arenaCy, goalAngleDeg, removeBall } = useArenaEngine({
    canvasWidth: canvasSize.width,
    canvasHeight: canvasSize.height,
    homeColor,
    awayColor,
    homeTeamName: homeName,
    awayTeamName: awayName,
    onGoal: handleGoal,
    isRunning,
    isHomeOwnership,
  });

  // Wire red card → ball removal
  useEffect(() => {
    removeBallForRedCard.current = removeBall;
  }, [removeBall, removeBallForRedCard]);

  const handleQuitPress = useCallback(() => {
    play('button_tap');
    setIsRunning(false);
    setShowQuit(true);
  }, [play]);

  const handleResume = useCallback(() => {
    play('button_tap');
    setShowQuit(false);
    setIsRunning(true);
  }, [play]);

  const handleQuitConfirm = useCallback(() => {
    play('button_tap');
    setShowQuit(false);
    router.replace('/post-match');
  }, [router, play]);

  // Derived arena geometry
  const arenaLeft = arenaCx - arenaRadius;
  const arenaTop = arenaCy - arenaRadius;
  const arenaDiameter = arenaRadius * 2;

  // Goal bracket width: chord of 45° arc = 2r * sin(22.5°)
  const goalBarWidth = 2 * arenaRadius * Math.sin((22.5 * Math.PI) / 180);
  const goalBarLeft = (arenaDiameter - goalBarWidth) / 2;

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={Colors.surface} translucent />
      <SafeAreaView style={{ backgroundColor: Colors.surface }} edges={['top']} />

      <ScoreBoard
        homeName={homeName}
        awayName={awayName}
        homeScore={homeScore}
        awayScore={awayScore}
        timerLabel={timerLabel}
        homePulse={homePulse}
        awayPulse={awayPulse}
        homeBadge={homeBadge}
        awayBadge={awayBadge}
        homeShort={homeShort}
        awayShort={awayShort}
        homeColor={homeColor}
        awayColor={awayColor}
        homeColor2={homeTeam?.secondaryColor}
        awayColor2={awayTeam?.secondaryColor}
        leagueName={homeTeam?.league}
        competitionBadge={getMatchBadge(competitionType, homeTeam?.league, awayTeam?.league)}
        bgColor={getCompetitionColors(competitionType).surface}
        aggregateEnabled={aggregateEnabled}
        aggregateHome={homeAggregate}
        aggregateAway={awayAggregate}
        onQuit={handleQuitPress}
      />


      {/* Game Canvas */}
      <View style={styles.canvas} onLayout={handleLayout}>
        {arenaRadius > 0 && (
          <>
            {/* Arena boundary circle */}
            <View
              style={[
                styles.arenaBoundary,
                {
                  left: arenaLeft,
                  top: arenaTop,
                  width: arenaDiameter,
                  height: arenaDiameter,
                  borderRadius: arenaRadius,
                },
              ]}
            >
              {/* Decorative center circle */}
              <View
                style={[
                  styles.centerCircle,
                  {
                    width: arenaDiameter * 0.4,
                    height: arenaDiameter * 0.4,
                    borderRadius: arenaDiameter * 0.2,
                    marginLeft: arenaDiameter * 0.3,
                    marginTop: arenaDiameter * 0.3,
                  },
                ]}
              />
              {/* Decorative center dot */}
              <View style={styles.centerDot} />
            </View>

            {/* Rotating goal indicator container */}
            <View
              style={[
                styles.goalContainer,
                {
                  left: arenaLeft,
                  top: arenaTop,
                  width: arenaDiameter,
                  height: arenaDiameter,
                  transform: [{ rotate: `${goalAngleDeg}deg` }],
                },
              ]}
            >
              {/* Goal bar at 12 o'clock of the rotating container */}
              <View
                style={[
                  styles.goalBar,
                  {
                    width: goalBarWidth,
                    left: goalBarLeft,
                    borderColor: ownerColor,
                  },
                ]}
              />
            </View>
          </>
        )}

        {/* Balls */}
        {balls.map((ball, idx) =>
          ball.active ? (
            <View
              key={idx}
              style={[
                styles.ball,
                {
                  left: ball.x - BALL_RADIUS,
                  top: ball.y - BALL_RADIUS,
                  backgroundColor: ball.color,
                  shadowColor: ball.color,
                },
              ]}
            >
              <Text style={styles.ballNumber}>{ball.teamIndex + 1}</Text>
            </View>
          ) : null,
        )}

        {/* Event Toasts */}
        <EventToastStack toasts={toasts} goalBg={getCompetitionColors(competitionType).surfaceLight} goalBorder={getCompetitionColors(competitionType).accent} />
      </View>

      {/* Ownership Bar */}
      {arenaRadius > 0 && (
        <View style={styles.ownershipBarWrapper}>
          <View style={styles.ownershipBar}>
            <View style={[styles.ownershipDot, { backgroundColor: ownerColor }]} />
            <Text style={styles.ownershipTeamName}>{ownerName.substring(0, 12)}</Text>
            <Text style={styles.ownershipGoalText}>GOAL</Text>
            <Text style={styles.ownershipCountdown}>{ownershipCountdown}s</Text>
          </View>
        </View>
      )}

      {/* Goal celebration flash */}
      <Animated.View
        style={[styles.goalFlash, { opacity: goalFlash }]}
        pointerEvents="none"
      />

      <QuitModal visible={showQuit} onResume={handleResume} onQuit={handleQuitConfirm} />
    </View>
  );
}

// ─── Arena-specific event wrapper ─────────────────────────────
// Wraps useMatchEvents and exposes a ref for injecting removeBall from engine

function useArenaEvents(
  opts: Parameters<typeof useMatchEvents>[0] & { onRedCard?: () => void },
) {
  const removeBallForRedCard = useRef<((isHome: boolean) => void) | null>(null);

  const result = useMatchEvents({
    ...opts,
    onRedCardWithTeam: useCallback((isHome: boolean) => {
      removeBallForRedCard.current?.(isHome);
    }, []),
  });

  return { ...result, removeBallForRedCard };
}

// ─── Styles ────────────────────────────────────────────────────

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },

  canvas: {
    flex: 1,
    backgroundColor: Colors.background,
    overflow: 'hidden',
  },

  // Arena boundary circle
  arenaBoundary: {
    position: 'absolute',
    borderWidth: 2.5,
    borderColor: Colors.surfaceLight,
    backgroundColor: 'rgba(26,71,42,0.3)',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },

  // Decorative pitch lines
  centerCircle: {
    position: 'absolute',
    borderWidth: 1,
    borderColor: 'rgba(125,206,160,0.1)',
  },
  centerDot: {
    position: 'absolute',
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'rgba(125,206,160,0.1)',
  },

  // Rotating goal container (no background, just a positioning anchor)
  goalContainer: {
    position: 'absolute',
  },

  // Goal bar — sits at top of rotating container (12 o'clock)
  goalBar: {
    position: 'absolute',
    top: -2,
    height: 5,
    borderRadius: 2,
    borderWidth: 2,
    borderColor: Colors.homeColor,
    backgroundColor: 'transparent',
  },

  // Ball
  ball: {
    position: 'absolute',
    width: BALL_RADIUS * 2,
    height: BALL_RADIUS * 2,
    borderRadius: BALL_RADIUS,
    alignItems: 'center',
    justifyContent: 'center',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.5,
    shadowRadius: 3,
    elevation: 2,
  },
  ballNumber: {
    fontSize: 6,
    fontWeight: '700',
    color: '#FFFFFF',
    opacity: 0.7,
  },

  // Ownership bar
  ownershipBarWrapper: {
    paddingHorizontal: 24,
    paddingBottom: 12,
    paddingTop: 8,
  },
  ownershipBar: {
    height: 36,
    backgroundColor: Colors.surface,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
    gap: 8,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  ownershipDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  ownershipTeamName: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.textPrimary,
  },
  ownershipGoalText: {
    fontSize: 12,
    fontWeight: '400',
    color: Colors.textSecondary,
  },
  ownershipCountdown: {
    fontSize: 12,
    fontWeight: '700',
    color: Colors.textSecondary,
    minWidth: 20,
  },

  // Goal celebration flash
  goalFlash: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: Colors.goalGold,
    zIndex: 50,
    pointerEvents: 'none',
  },

});
