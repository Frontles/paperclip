import { useCallback, useEffect, useRef, useState } from 'react';
import {
  Animated,
  LayoutChangeEvent,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import ReAnimated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import { useRouter } from 'expo-router';
import { useSound } from '@/hooks/useSound';
import { soundService } from '@/services/soundService';
import { Colors } from '@/constants/colors';
import { useMatchStore } from '@/stores/matchStore';
import { useKeeperClashEngine, CounterAttackStatus } from '@/hooks/useKeeperClashEngine';
import { useMatchTimer } from '@/hooks/useMatchTimer';
import { useMatchEvents } from '@/hooks/useMatchEvents';
import { EventToastStack } from '@/components/game/EventToast';
import { ScoreBoard } from '@/components/game/ScoreBoard';
import { QuitModal } from '@/components/game/QuitModal';

// ─── Constants ─────────────────────────────────────────────────

const KEEPER_WIDTH = 60;
const KEEPER_HEIGHT = 72;
const BALL_RADIUS = 12;
const GOAL_AREA_BG = '#0a1f12';
const POST_COLOR = '#E0E0E0';
const POST_WIDTH = 6;
const KEEPER_GLOVE_COLOR = '#7dcea0';
const SPRING_CONFIG = { damping: 20, stiffness: 300 };

// ─── Helpers ───────────────────────────────────────────────────

function computeAvgShooting(players: { stats: { shooting: number } }[]): number {
  if (!players.length) return 70;
  return players.reduce((sum, p) => sum + p.stats.shooting, 0) / players.length;
}

function computeAvgFinishing(players: { stats: { finishing: number } }[]): number {
  if (!players.length) return 70;
  return players.reduce((sum, p) => sum + p.stats.finishing, 0) / players.length;
}

// ─── Counter-attack Banner ─────────────────────────────────────

interface CounterBannerProps {
  status: CounterAttackStatus;
  homeTeamName: string;
}

function CounterBanner({ status, homeTeamName }: CounterBannerProps) {
  if (status === 'idle') return null;
  const isResult = status === 'goal' || status === 'saved';
  const label =
    status === 'active'
      ? `⚡ ${homeTeamName.toUpperCase()} COUNTER-ATTACK!`
      : status === 'goal'
        ? '⚽ COUNTER-ATTACK GOAL!'
        : '🧤 COUNTER SAVED!';
  const bgColor =
    status === 'goal' ? Colors.goalGold : status === 'saved' ? Colors.redCard : Colors.primary;

  return (
    <View style={[styles.counterBanner, { backgroundColor: bgColor }]}>
      <Text style={[styles.counterBannerText, isResult && { color: Colors.background }]}>
        {label}
      </Text>
    </View>
  );
}

// ─── Screen ────────────────────────────────────────────────────

export default function KeeperClashScreen() {
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

  const [playfieldSize, setPlayfieldSize] = useState({ width: 0, height: 0 });
  const [isRunning, setIsRunning] = useState(true);
  const [showQuit, setShowQuit] = useState(false);
  const [counterStatus, setCounterStatus] = useState<CounterAttackStatus>('idle');
  const [saveMicro, setSaveMicro] = useState(false);

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

  const awayAvgShooting = computeAvgShooting(awayPlayers);
  const homeAvgFinishing = computeAvgFinishing(homePlayers);

  // Score pulse animations
  const homePulse = useRef(new Animated.Value(1)).current;
  const awayPulse = useRef(new Animated.Value(1)).current;
  const goalFlash = useRef(new Animated.Value(0)).current;

  const triggerGoalFlash = useCallback(() => {
    goalFlash.setValue(0.5);
    Animated.timing(goalFlash, { toValue: 0, duration: 600, useNativeDriver: true }).start();
  }, [goalFlash]);

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

  // Ambient sound on mount
  useEffect(() => {
    play('whistle_start');
    soundService.startAmbient(true);
    return () => {
      soundService.stopAmbient();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ─── Keeper drag ─────────────────────────────────────────────

  const canvasWidth = playfieldSize.width;
  const canvasHeight = playfieldSize.height;
  const goalAreaHeight = canvasHeight * 0.4;
  const shotAreaHeight = canvasHeight * 0.6;

  // Goal frame geometry
  const goalFrameLeft = canvasWidth * 0.075;
  const goalFrameRight = canvasWidth * 0.925;

  // Initial keeper center X = center of goal frame
  const initialKeeperX = goalFrameLeft + (goalFrameRight - goalFrameLeft) / 2 - KEEPER_WIDTH / 2;

  const keeperAnimX = useSharedValue(initialKeeperX);
  const keeperXRef = useRef<number>(initialKeeperX);

  // Sync initial position when layout is measured
  useEffect(() => {
    if (canvasWidth <= 0) return;
    const centeredX = goalFrameLeft + (goalFrameRight - goalFrameLeft) / 2 - KEEPER_WIDTH / 2;
    keeperAnimX.value = centeredX;
    keeperXRef.current = centeredX;
  }, [canvasWidth]); // eslint-disable-line react-hooks/exhaustive-deps

  const updateKeeperRef = useCallback((x: number) => {
    keeperXRef.current = x;
  }, []);

  const panGesture = Gesture.Pan()
    .onChange((e) => {
      const minX = goalFrameLeft;
      const maxX = goalFrameRight - KEEPER_WIDTH;
      const newX = Math.max(minX, Math.min(maxX, keeperAnimX.value + e.changeX));
      keeperAnimX.value = withSpring(newX, SPRING_CONFIG);
      runOnJS(updateKeeperRef)(newX);
    });

  const keeperAnimStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: keeperAnimX.value }],
  }));

  // goalLineY in combined playfield: where shots terminate
  const goalLineY = shotAreaHeight + goalAreaHeight * 0.6;

  // ─── Match events ─────────────────────────────────────────────

  const { toasts, handleGoal: handleGoalEvent, handleRedCardCheck } = useMatchEvents({
    homeTeamName: homeName,
    awayTeamName: awayName,
    homePlayers,
    awayPlayers,
    onEventRecorded: addEvent,
  });

  // ─── Match timer ──────────────────────────────────────────────

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
    onMatchEnd: handleMatchEnd,
  });

  useEffect(() => {
    setCurrentMinute(matchMinute);
  }, [matchMinute, setCurrentMinute]);

  useEffect(() => {
    setExtraTime(isExtraTime, extraMinute);
  }, [isExtraTime, extraMinute, setExtraTime]);

  // ─── Engine callbacks ─────────────────────────────────────────

  const handleGoalConceded = useCallback(
    (minute: number) => {
      addGoal(awayName);
      handleGoalEvent(awayName, minute);
      play('goal_scored');
      triggerGoalFlash();
    },
    [addGoal, awayName, handleGoalEvent, play, triggerGoalFlash],
  );

  const handleCounterAttackGoal = useCallback(
    (minute: number) => {
      addGoal(homeName);
      handleGoalEvent(homeName, minute);
      play('goal_scored');
      triggerGoalFlash();
    },
    [addGoal, homeName, handleGoalEvent, play, triggerGoalFlash],
  );

  const handleSave = useCallback(() => {
    play('ball_bounce');
    setSaveMicro(true);
    setTimeout(() => setSaveMicro(false), 900);
  }, [play]);

  const handleCounterAttackStateChange = useCallback(
    (status: CounterAttackStatus) => {
      setCounterStatus(status);
    },
    [],
  );

  // ─── Engine ───────────────────────────────────────────────────

  const { shots } = useKeeperClashEngine({
    canvasWidth,
    canvasHeight,
    goalLineY,
    keeperXRef,
    isRunning,
    matchMinute,
    isExtraTime,
    awayAvgShooting,
    homeAvgFinishing,
    homeTeamName: homeName,
    awayTeamName: awayName,
    homePlayers,
    onGoalConceded: handleGoalConceded,
    onCounterAttackGoal: handleCounterAttackGoal,
    onSave: handleSave,
    onCounterAttackStateChange: handleCounterAttackStateChange,
  });

  // ─── Layout ───────────────────────────────────────────────────

  const handleLayout = useCallback((e: LayoutChangeEvent) => {
    const { width, height } = e.nativeEvent.layout;
    setPlayfieldSize({ width, height });
  }, []);

  // ─── Quit handlers ────────────────────────────────────────────

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

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={Colors.surface} />

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
        onQuit={handleQuitPress}
      />


      {/* Playfield */}
      <View style={styles.playfield} onLayout={handleLayout}>

        {/* Shot area */}
        <View style={styles.shotArea}>
          {/* Shot balls */}
          {shots.map((shot) => (
            <View
              key={shot.id}
              style={[
                styles.shotBall,
                { left: shot.x - BALL_RADIUS, top: shot.y - BALL_RADIUS },
              ]}
            />
          ))}
          {/* Trail dots */}
          {shots.map((shot) =>
            (shot.trail ?? []).map((point, idx) => (
              <View
                key={`${shot.id}-trail-${idx}`}
                style={[
                  styles.trailDot,
                  {
                    left: point.x - 3,
                    top: point.y - 3,
                    opacity: (idx + 1) / ((shot.trail?.length ?? 1) + 1) * 0.5,
                  },
                ]}
              />
            )),
          )}
        </View>

        {/* Goal area */}
        <View style={styles.goalArea}>
          {canvasWidth > 0 && (
            <>
              {/* Left post */}
              <View
                style={[
                  styles.goalPost,
                  { left: goalFrameLeft - POST_WIDTH / 2 },
                ]}
              />
              {/* Right post */}
              <View
                style={[
                  styles.goalPost,
                  { left: goalFrameRight - POST_WIDTH / 2 },
                ]}
              />
              {/* Crossbar */}
              <View
                style={[
                  styles.crossbar,
                  {
                    left: goalFrameLeft - POST_WIDTH / 2,
                    width: goalFrameRight - goalFrameLeft + POST_WIDTH,
                  },
                ]}
              />
              {/* Goal net lines */}
              <View
                style={[
                  styles.netArea,
                  {
                    left: goalFrameLeft,
                    width: goalFrameRight - goalFrameLeft,
                  },
                ]}
              />
            </>
          )}

          {/* Goalkeeper (draggable) */}
          {canvasWidth > 0 && (
            <GestureDetector gesture={panGesture}>
              <ReAnimated.View style={[styles.keeperWrapper, keeperAnimStyle]}>
                {/* Body */}
                <View style={[styles.keeperBody, { backgroundColor: homeColor }]}>
                  <View style={styles.keeperNumber}>
                    <Text style={styles.keeperNumberText}>1</Text>
                  </View>
                </View>
                {/* Gloves */}
                <View style={styles.keeperGloves}>
                  <View style={styles.keeperGlove} />
                  <View style={styles.keeperGlove} />
                </View>
              </ReAnimated.View>
            </GestureDetector>
          )}

          {/* Save micro-toast */}
          {saveMicro && (
            <View style={styles.saveMicro}>
              <Text style={styles.saveMicroText}>SAVE!</Text>
            </View>
          )}
        </View>

        {/* Event toasts sit over the whole playfield */}
        <EventToastStack toasts={toasts} />
      </View>

      {/* Counter-attack banner */}
      <CounterBanner status={counterStatus} homeTeamName={homeName} />

      {/* Goal flash */}
      <Animated.View
        style={[styles.goalFlash, { opacity: goalFlash }]}
        pointerEvents="none"
      />

      <QuitModal visible={showQuit} onResume={handleResume} onQuit={handleQuitConfirm} />
    </View>
  );
}

// ─── Styles ────────────────────────────────────────────────────

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  playfield: {
    flex: 1,
    overflow: 'hidden',
  },
  shotArea: {
    flex: 6,
    backgroundColor: Colors.background,
    overflow: 'hidden',
  },
  goalArea: {
    flex: 4,
    backgroundColor: GOAL_AREA_BG,
    overflow: 'hidden',
  },

  // Shot ball
  shotBall: {
    position: 'absolute',
    width: BALL_RADIUS * 2,
    height: BALL_RADIUS * 2,
    borderRadius: BALL_RADIUS,
    backgroundColor: '#FFFFFF',
    shadowColor: '#FFFFFF',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.6,
    shadowRadius: 4,
    elevation: 3,
  },
  trailDot: {
    position: 'absolute',
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#FFFFFF',
  },

  // Goal frame
  goalPost: {
    position: 'absolute',
    top: 0,
    width: POST_WIDTH,
    height: '100%',
    backgroundColor: POST_COLOR,
    borderRadius: 3,
  },
  crossbar: {
    position: 'absolute',
    top: 0,
    height: POST_WIDTH,
    backgroundColor: POST_COLOR,
    borderRadius: 3,
  },
  netArea: {
    position: 'absolute',
    top: POST_WIDTH,
    bottom: 0,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
  },

  // Keeper
  keeperWrapper: {
    position: 'absolute',
    bottom: 12,
    width: KEEPER_WIDTH,
    alignItems: 'center',
  },
  keeperGloves: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: KEEPER_WIDTH + 12,
    marginBottom: 2,
  },
  keeperGlove: {
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: KEEPER_GLOVE_COLOR,
  },
  keeperBody: {
    width: KEEPER_WIDTH,
    height: KEEPER_HEIGHT,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: 'rgba(255,255,255,0.2)',
  },
  keeperNumber: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: 'rgba(0,0,0,0.3)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  keeperNumberText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '700',
  },

  // Save micro-toast
  saveMicro: {
    position: 'absolute',
    top: 8,
    alignSelf: 'center',
    backgroundColor: Colors.primary,
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 20,
  },
  saveMicroText: {
    color: Colors.background,
    fontSize: 13,
    fontWeight: '800',
    letterSpacing: 1,
  },

  // Counter-attack banner
  counterBanner: {
    marginHorizontal: 16,
    marginBottom: 8,
    borderRadius: 10,
    paddingVertical: 10,
    alignItems: 'center',
  },
  counterBannerText: {
    color: Colors.background,
    fontSize: 14,
    fontWeight: '800',
    letterSpacing: 1,
  },

  // Goal flash
  goalFlash: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: Colors.goalGold,
    zIndex: 50,
    pointerEvents: 'none',
  },

});
