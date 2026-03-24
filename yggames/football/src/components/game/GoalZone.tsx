import { View, Text, StyleSheet } from "react-native";
import Svg, { Line, Rect } from "react-native-svg";
import { GameConfig } from "@/constants/gameConfig";
import type { GoalZoneBounds } from "@/hooks/usePlinkoEngine";

export interface GoalZoneProps {
  bounds: GoalZoneBounds;
}

const POST_COLOR = "#e0e0e0";
const POST_HIGHLIGHT = "#ffffff";
const NET_COLOR = "rgba(255,255,255,0.13)";
const CROSSBAR_HEIGHT = 4;

function GoalNet({ width, height }: { width: number; height: number }) {
  const postW = GameConfig.postWidth;
  const netLeft = postW;
  const netWidth = width - postW * 2;
  const netHeight = height - CROSSBAR_HEIGHT;

  if (netWidth <= 0 || netHeight <= 0) return null;

  const spacingX = 12;
  const spacingY = 10;

  const verticals: React.ReactNode[] = [];
  for (let x = spacingX; x < netWidth; x += spacingX) {
    verticals.push(
      <Line
        key={`v${x}`}
        x1={netLeft + x}
        y1={CROSSBAR_HEIGHT}
        x2={netLeft + x}
        y2={height}
        stroke={NET_COLOR}
        strokeWidth={1}
      />
    );
  }

  const horizontals: React.ReactNode[] = [];
  for (let y = spacingY; y < netHeight; y += spacingY) {
    horizontals.push(
      <Line
        key={`h${y}`}
        x1={netLeft}
        y1={CROSSBAR_HEIGHT + y}
        x2={netLeft + netWidth}
        y2={CROSSBAR_HEIGHT + y}
        stroke={NET_COLOR}
        strokeWidth={1}
      />
    );
  }

  return (
    <Svg
      width={width}
      height={height}
      style={StyleSheet.absoluteFill}
    >
      {/* Net background */}
      <Rect
        x={netLeft}
        y={CROSSBAR_HEIGHT}
        width={netWidth}
        height={netHeight}
        fill="rgba(0,0,0,0.15)"
      />
      {verticals}
      {horizontals}

      {/* Crossbar */}
      <Rect
        x={0}
        y={0}
        width={width}
        height={CROSSBAR_HEIGHT}
        fill={POST_COLOR}
        rx={2}
      />
      {/* Crossbar highlight */}
      <Rect
        x={0}
        y={0}
        width={width}
        height={1.5}
        fill={POST_HIGHLIGHT}
        opacity={0.6}
        rx={1}
      />
    </Svg>
  );
}

export function GoalZone({ bounds }: GoalZoneProps) {
  const postWidth = GameConfig.postWidth;
  return (
    <View
      style={[
        styles.frame,
        {
          left: bounds.x,
          top: bounds.y,
          width: bounds.width,
          height: bounds.height,
        },
      ]}
    >
      {/* Net drawn with SVG */}
      <GoalNet width={bounds.width} height={bounds.height} />

      {/* Left post */}
      <View style={[styles.post, { left: 0, width: postWidth }]}>
        <View style={[styles.postHighlight, { width: postWidth * 0.4 }]} />
      </View>
      {/* Right post */}
      <View style={[styles.post, { right: 0, width: postWidth }]}>
        <View style={[styles.postHighlight, { width: postWidth * 0.4 }]} />
      </View>

      <Text style={styles.label}>⚽ GOAL</Text>

      {/* Goal line */}
      <View style={styles.goalLine} />
    </View>
  );
}

const styles = StyleSheet.create({
  frame: {
    position: "absolute",
    borderWidth: 0,
    borderColor: "transparent",
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
    backgroundColor: "transparent",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },
  post: {
    position: "absolute",
    top: 0,
    bottom: 0,
    backgroundColor: POST_COLOR,
    borderRadius: 3,
    // Shadow for depth
    shadowColor: "#000",
    shadowOffset: { width: 2, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 4,
    zIndex: 2,
  },
  postHighlight: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    backgroundColor: POST_HIGHLIGHT,
    opacity: 0.5,
    borderTopLeftRadius: 3,
    borderBottomLeftRadius: 3,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    color: "rgba(125,206,160,0.5)",
    textAlign: "center",
    zIndex: 3,
  },
  goalLine: {
    position: "absolute",
    bottom: 0,
    left: 0,
    width: "100%",
    height: 3,
    backgroundColor: "white",
    opacity: 0.8,
    zIndex: 1,
  },
});
