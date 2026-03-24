import { View } from "react-native";
import { GameConfig } from "@/constants/gameConfig";
import { Colors } from "@/constants/colors";

const { ballRadius, dropZoneTop, dropZoneRadiusFraction, dropZoneGapBalls } = GameConfig;
const STROKE = 3;

interface Props {
  canvasWidth: number;
}

export function DropZoneArc({ canvasWidth }: Props) {
  const r = canvasWidth * dropZoneRadiusFraction;
  const d = r * 2;
  const cx = canvasWidth / 2;
  const gapWidth = dropZoneGapBalls * ballRadius * 2;

  return (
    <View
      pointerEvents="none"
      style={{
        position: "absolute",
        left: cx - r,
        top: dropZoneTop - r,
        width: d,
        height: d,
      }}
    >
      {/* Full circle */}
      <View
        style={{
          width: d,
          height: d,
          borderRadius: r,
          borderWidth: STROKE,
          borderColor: "rgba(255,255,255,0.7)",
        }}
      />
      {/* Green rectangle to mask the bottom gap */}
      <View
        style={{
          position: "absolute",
          bottom: -STROKE,
          left: (d - gapWidth) / 2,
          width: gapWidth,
          height: r * 0.35,
          backgroundColor: Colors.pitchLight,
        }}
      />
    </View>
  );
}
