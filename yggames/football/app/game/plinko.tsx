import { useCallback, useEffect, useRef, useState } from "react";
import {
  Animated,
  LayoutChangeEvent,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useSound } from "@/hooks/useSound";
import { getMatchBadge } from "@/utils/getMatchBadge";
import { getCompetitionColors } from "@/constants/competitionMeta";
import { soundService } from "@/services/soundService";
import { useRouter } from "expo-router";
import { GameConfig } from "@/constants/gameConfig";
import { Colors } from "@/constants/colors";
import { useMatchStore } from "@/stores/matchStore";
import { usePlinkoEngine } from "@/hooks/usePlinkoEngine";
import { useMatchTimer } from "@/hooks/useMatchTimer";
import { useMatchEvents } from "@/hooks/useMatchEvents";
import { Ball } from "@/components/game/Ball";
import { GoalZone } from "@/components/game/GoalZone";
import { EventToastStack } from "@/components/game/EventToast";
import { ScoreBoard } from "@/components/game/ScoreBoard";
import { PitchBackground } from "@/components/game/PitchBackground";
import { DropZoneArc } from "@/components/game/DropZoneArc";
import { QuitModal } from "@/components/game/QuitModal";

// ─── Screen ───────────────────────────────────────────────────

export default function PlinkoGameScreen() {
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

  const homeName = homeTeam?.name ?? "Home";
  const awayName = awayTeam?.name ?? "Away";
  const homeColor = homeTeam?.primaryColor ?? Colors.homeColor;
  const awayColor = awayTeam?.primaryColor ?? Colors.awayColor;
  // Top rengi olarak secondaryColor kullan — badge (primaryColor) ile kontrast oluşsun
  const homeBallColor = homeTeam?.secondaryColor ?? homeColor;
  const awayBallColor = awayTeam?.secondaryColor ?? awayColor;
  const homeBadge = homeTeam?.badge ?? null;
  const awayBadge = awayTeam?.badge ?? null;
  const homeShort = homeTeam?.teamShort ?? null;
  const awayShort = awayTeam?.teamShort ?? null;
  const homePlayers = homeTeam?.players ?? [];
  const awayPlayers = awayTeam?.players ?? [];

  // Score pulse animations
  const homePulse = useRef(new Animated.Value(1)).current;
  const awayPulse = useRef(new Animated.Value(1)).current;

  // Goal celebration flash
  const goalFlash = useRef(new Animated.Value(0)).current;

  const triggerGoalFlash = useCallback(() => {
    goalFlash.setValue(0.5);
    Animated.timing(goalFlash, {
      toValue: 0,
      duration: 600,
      useNativeDriver: true,
    }).start();
  }, [goalFlash]);

  // Preload whistle_end to avoid playback delay at match end
  useEffect(() => {
    soundService.preloadOne("whistle_end");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Whistle on match start + crowd ambient
  useEffect(() => {
    play("whistle_start");
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
        Animated.timing(homePulse, {
          toValue: 1.4,
          duration: 120,
          useNativeDriver: true,
        }),
        Animated.spring(homePulse, { toValue: 1, useNativeDriver: true }),
      ]).start();
    }
  }, [homeScore, homePulse]);

  useEffect(() => {
    if (awayScore > prevAwayScore.current) {
      prevAwayScore.current = awayScore;
      Animated.sequence([
        Animated.timing(awayPulse, {
          toValue: 1.4,
          duration: 120,
          useNativeDriver: true,
        }),
        Animated.spring(awayPulse, { toValue: 1, useNativeDriver: true }),
      ]).start();
    }
  }, [awayScore, awayPulse]);

  const handleRedCardSound = useCallback(() => play("red_card"), [play]);
  const handleYellowCardSound = useCallback(() => play("red_card"), [play]);

  // Match events
  const {
    toasts,
    handleGoal: handleGoalEvent,
    handleRedCardCheck,
    handleYellowCardCheck,
  } = useMatchEvents({
    homeTeamName: homeName,
    awayTeamName: awayName,
    homePlayers,
    awayPlayers,
    onEventRecorded: addEvent,
    onRedCard: handleRedCardSound,
    onYellowCard: handleYellowCardSound,
  });

  // Match timer
  const handleMatchEnd = useCallback(() => {
    setIsRunning(false);
    play("whistle_end");
    soundService.stopAmbient();
    setTimeout(() => {
      router.replace("/post-match");
    }, 1000);
  }, [router, play]);

  const { timerLabel, isExtraTime, extraMinute, matchMinute, phase } =
    useMatchTimer({
      isRunning,
      onRedCardCheck: handleRedCardCheck,
      onYellowCardCheck: handleYellowCardCheck,
      onMatchEnd: handleMatchEnd,
      isDraw: aggregateEnabled
        ? (homeAggregate + homeScore) === (awayAggregate + awayScore)
        : homeScore === awayScore,
    });

  // Devre arası / uzatma intro sırasında oyunu durdur
  const isPaused =
    phase === "half_time" ||
    phase === "extra_intro" ||
    phase === "extra_half_time";
  const gameRunning = isRunning && !isPaused;

  // Sync timer state to store
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
      play("goal_scored");
      triggerGoalFlash();
    },
    [addGoal, handleGoalEvent, matchMinute, play, triggerGoalFlash],
  );

  const handleQuitPress = useCallback(() => {
    play("button_tap");
    setIsRunning(false);
    setShowQuit(true);
  }, [play]);

  const handleResume = useCallback(() => {
    play("button_tap");
    setShowQuit(false);
    setIsRunning(true);
  }, [play]);

  const handleQuitConfirm = useCallback(() => {
    play("button_tap");
    setShowQuit(false);
    router.replace("/post-match");
  }, [router, play]);

  const handleBallBounce = useCallback(() => {
    play("ball_bounce");
  }, [play]);

  const { balls, pegs, goalZone, resetBalls } = usePlinkoEngine({
    canvasWidth: canvasSize.width,
    canvasHeight: canvasSize.height,
    homeColor: homeBallColor,
    awayColor: awayBallColor,
    homeTeamName: homeName,
    awayTeamName: awayName,
    homeBadge,
    awayBadge,
    onGoal: handleGoal,
    onBallBounce: handleBallBounce,
    isRunning: gameRunning,
  });

  // Devre arası başladığında topları resetle
  useEffect(() => {
    if (isPaused) resetBalls();
  }, [isPaused, resetBalls]);

  const pegDiameter = GameConfig.pegRadius * 2;

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle="light-content"
        backgroundColor={Colors.surface}
        translucent
      />
      <SafeAreaView style={styles.safeTop} edges={["top"]} />

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
      <View style={styles.canvasWrapper}>
        <View style={styles.canvas} onLayout={handleLayout}>
          <PitchBackground />

          {/* Drop zone arc — SVG circle open at bottom */}
          {canvasSize.width > 0 && (
            <DropZoneArc canvasWidth={canvasSize.width} />
          )}

          {pegs.map((peg, idx) => (
            <View
              key={idx}
              style={[
                styles.peg,
                {
                  left: peg.x - GameConfig.pegRadius,
                  top: peg.y - GameConfig.pegRadius,
                  width: pegDiameter,
                  height: pegDiameter,
                  borderRadius: GameConfig.pegRadius,
                },
              ]}
            />
          ))}

          {goalZone.width > 0 && <GoalZone bounds={goalZone} />}

          {balls.map((ball, idx) => (
            <Ball
              key={idx}
              x={ball.x}
              y={ball.y}
              color={ball.color}
              badge={ball.badge}
            />
          ))}

          <EventToastStack toasts={toasts} goalBg={getCompetitionColors(competitionType).surfaceLight} goalBorder={getCompetitionColors(competitionType).accent} />

          {/* Devre arası / Uzatmalar overlay */}
          {isPaused && (
            <View style={styles.phaseOverlay}>
              <Text style={styles.phaseText}>{timerLabel}</Text>
            </View>
          )}
        </View>
      </View>

      {/* Goal celebration flash */}
      <Animated.View
        style={[styles.goalFlash, { opacity: goalFlash }]}
        pointerEvents="none"
      />

      <QuitModal
        visible={showQuit}
        onResume={handleResume}
        onQuit={handleQuitConfirm}
      />
    </View>
  );
}

// ─── Styles ───────────────────────────────────────────────────

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  safeTop: {
    backgroundColor: Colors.surface,
  },

  // Canvas
  canvasWrapper: {
    flex: 1,
    alignItems: "center",
    backgroundColor: Colors.background,
  },
  canvas: {
    flex: 1,
    width: "100%",
    maxWidth: 400,
    backgroundColor: Colors.background,
    overflow: "hidden",
  },

  // Peg
  peg: {
    position: "absolute",
    backgroundColor: Colors.surfaceLight,
    borderWidth: 1.5,
    borderColor: "rgba(125,206,160,0.5)",
  },

  // Phase overlay (devre arası, uzatmalar)
  phaseOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.7)",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 40,
  },
  phaseText: {
    color: Colors.textPrimary,
    fontSize: 28,
    fontWeight: "800",
    letterSpacing: 2,
  },

  // Goal flash overlay
  goalFlash: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: Colors.goalGold,
    zIndex: 50,
    pointerEvents: "none",
  },
});
