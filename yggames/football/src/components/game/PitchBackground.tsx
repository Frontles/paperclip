import { StyleSheet, View } from "react-native";
import { Colors } from "@/constants/colors";

// Gerçek FIFA yarı saha oranları (105x68m, yarı=52.5x68m)
// Genişlikler: canvas width = 68m
// Yükseklikler: canvas height (boundary alanı) = 52.5m

const MARKING_COLOR = Colors.primary;
const MARKING_OPACITY = 0.28;
const LINE = 2;
const GOAL_HEIGHT = 40;
const STRIPE_COUNT = 10;

// Ceza sahası: 40.32m geniş → side margin 20.35%
const PEN_SIDE = "20.35%";
// Ceza sahası derinlik — ekran oranına uyarlanmış
const PEN_H = "18%";

// Kale alanı: 18.32m geniş → side margin 36.5%
const GOAL_AREA_SIDE = "36.5%";
// Kale alanı derinlik — ekran oranına uyarlanmış
const GOAL_AREA_H = "6%";

// Penaltı noktası — ekran oranına uyarlanmış
const PEN_SPOT_BOTTOM = "12%";

// Penaltı yayı: 9.15m yarıçap, penaltı noktası merkezli
// Genişlik: 18.3/68 = 26.9%
const PEN_ARC_W = "26.9%";
const PEN_ARC_LEFT = "36.55%";
// Yayın ceza sahası üstünden görünen kısmı
const PEN_ARC_H = "3.5%";

function GrassStripes() {
  const stripes = [];
  for (let i = 0; i < STRIPE_COUNT; i++) {
    stripes.push(
      <View
        key={i}
        style={{
          flex: 1,
          backgroundColor: i % 2 === 0 ? Colors.pitchLight : Colors.pitchDark,
        }}
      />
    );
  }
  return <View style={styles.stripes}>{stripes}</View>;
}

export function PitchBackground() {
  return (
    <View style={styles.root} pointerEvents="none">
      <GrassStripes />

      {/* Saha çizgileri — yarı saydam */}
      <View style={styles.markings} pointerEvents="none">
        <View style={styles.boundary} />
        <View style={styles.halfwayLine} />

        <View style={styles.centerSpot} />

        {/* Ceza sahası */}
        <View style={styles.penaltyArea} />

        {/* Penaltı yayı (ceza sahası içinde) */}
        <View style={styles.penaltyArcClip}>
          <View style={styles.penaltyArc} />
        </View>

        {/* Kale alanı */}
        <View style={styles.goalArea} />

        {/* Penaltı noktası */}
        <View style={styles.penaltySpot} />

        {/* Kale (saha dışında) */}
        <View style={styles.goal} />

        {/* Korner bayrakları */}
        <View style={[styles.cornerArc, styles.cornerBL]} />
        <View style={[styles.cornerArc, styles.cornerBR]} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { ...StyleSheet.absoluteFillObject },

  stripes: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: GOAL_HEIGHT,
    flexDirection: "column",
  },

  markings: {
    ...StyleSheet.absoluteFillObject,
    opacity: MARKING_OPACITY,
  },

  // Saha sınırı — kale alanının üstünde biter
  boundary: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: GOAL_HEIGHT,
    borderWidth: LINE,
    borderColor: MARKING_COLOR,
    backgroundColor: "transparent",
  },

  // Orta saha çizgisi
  halfwayLine: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: LINE,
    backgroundColor: MARKING_COLOR,
  },

  // Orta nokta
  centerSpot: {
    position: "absolute",
    top: -3,
    left: "50%",
    marginLeft: -3,
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: MARKING_COLOR,
  },

  // Ceza sahası: %59.3 genişlik, %31.4 derinlik
  penaltyArea: {
    position: "absolute",
    bottom: GOAL_HEIGHT,
    left: PEN_SIDE,
    right: PEN_SIDE,
    height: PEN_H,
    borderWidth: LINE,
    borderBottomWidth: 0,
    borderColor: MARKING_COLOR,
    backgroundColor: "transparent",
  },

  // Penaltı yayı — ceza sahası içinde, üst kenarında
  penaltyArcClip: {
    position: "absolute",
    bottom: PEN_H,
    marginBottom: GOAL_HEIGHT - LINE,
    left: PEN_ARC_LEFT,
    width: PEN_ARC_W,
    height: PEN_ARC_H,
    overflow: "hidden",
    transform: [{ rotate: "180deg" }],
  },
  penaltyArc: {
    width: "100%",
    aspectRatio: 1,
    borderRadius: 9999,
    borderWidth: LINE,
    borderColor: MARKING_COLOR,
    backgroundColor: "transparent",
    position: "absolute",
    bottom: 0,
  },

  // Kale alanı: %26.9 genişlik, %10.5 derinlik
  goalArea: {
    position: "absolute",
    bottom: GOAL_HEIGHT,
    left: GOAL_AREA_SIDE,
    right: GOAL_AREA_SIDE,
    height: GOAL_AREA_H,
    borderWidth: LINE,
    borderBottomWidth: 0,
    borderColor: MARKING_COLOR,
    backgroundColor: "transparent",
  },

  // Penaltı noktası: kale çizgisinden %21 yukarıda
  penaltySpot: {
    position: "absolute",
    bottom: PEN_SPOT_BOTTOM,
    marginBottom: GOAL_HEIGHT,
    left: "50%",
    marginLeft: -3,
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: MARKING_COLOR,
  },

  // Kale — saha dışında, GoalZone ile eşleşir (sadece ince çerçeve, asıl kale GoalZone'da)
  goal: {
    position: "absolute",
    bottom: 0,
    left: "33.5%",
    right: "33.5%",
    height: GOAL_HEIGHT,
    borderWidth: 0,
    backgroundColor: "transparent",
  },

  // Korner bayrakları
  cornerArc: {
    position: "absolute",
    width: 16,
    height: 16,
    borderWidth: LINE,
    borderColor: MARKING_COLOR,
    backgroundColor: "transparent",
    borderRadius: 9999,
  },
  cornerBL: { bottom: GOAL_HEIGHT - 8, left: -8 },
  cornerBR: { bottom: GOAL_HEIGHT - 8, right: -8 },
});
