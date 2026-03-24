import { View, Image, StyleSheet } from 'react-native';
import { GameConfig } from '@/constants/gameConfig';

const DIAMETER = GameConfig.ballRadius * 2;
const R = GameConfig.ballRadius;

export interface BallProps {
  x: number;
  y: number;
  color: string;
  badge?: string | null;
}

export function Ball({ x, y, color, badge }: BallProps) {
  return (
    <View
      style={[
        styles.ball,
        {
          transform: [{ translateX: x - R }, { translateY: y - R }],
          backgroundColor: color,
        },
      ]}
    >
      {badge ? (
        <Image source={{ uri: badge }} style={styles.badge} resizeMode="contain" />
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  ball: {
    position: 'absolute',
    left: 0,
    top: 0,
    width: DIAMETER,
    height: DIAMETER,
    borderRadius: DIAMETER / 2,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  badge: {
    width: DIAMETER * 0.75,
    height: DIAMETER * 0.75,
  },
});
