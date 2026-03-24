import { useEffect } from 'react';
import { StyleSheet, Pressable, View, Text, ImageBackground } from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withRepeat,
  withSequence,
  withTiming,
} from 'react-native-reanimated';
import { Colors } from '@/constants/colors';
import { Spacing } from '@/constants/spacing';
import { useI18n } from '@/hooks/useI18n';
import { useSound } from '@/hooks/useSound';

export default function MainMenuScreen() {
  const router = useRouter();
  const { t } = useI18n();
  const { play } = useSound();

  const ballY = useSharedValue(0);
  const playScale = useSharedValue(1);
  const settingsScale = useSharedValue(1);

  useEffect(() => {
    ballY.value = withRepeat(
      withSequence(
        withTiming(-14, { duration: 550 }),
        withTiming(0, { duration: 550 }),
      ),
      -1,
      false,
    );
  }, [ballY]);

  const ballStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: ballY.value }],
  }));

  const playStyle = useAnimatedStyle(() => ({
    transform: [{ scale: playScale.value }],
  }));

  const settingsStyle = useAnimatedStyle(() => ({
    transform: [{ scale: settingsScale.value }],
  }));

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#0a1f14', '#122a1c', '#0d2818']}
        style={StyleSheet.absoluteFill}
      />

      <View style={styles.logoArea}>
        <Animated.Text style={[styles.ball, ballStyle]}>⚽</Animated.Text>
        <Text style={styles.title}>YG FOOTBALL</Text>
        <Text style={styles.subtitle}>ULTIMATE EDITION</Text>
      </View>

      <View style={styles.buttonArea}>
        <Pressable
          onPressIn={() => { playScale.value = withSpring(0.95); }}
          onPressOut={() => { playScale.value = withSpring(1); }}
          onPress={() => { play('button_tap'); router.push('/mode-select'); }}
        >
          <Animated.View style={[styles.primaryButton, playStyle]}>
            <LinearGradient
              colors={[Colors.primary, Colors.primaryDark]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.primaryButtonGradient}
            >
              <Text style={styles.primaryButtonText}>{t('menu.startMatch')}</Text>
            </LinearGradient>
          </Animated.View>
        </Pressable>

        <Pressable
          onPressIn={() => { settingsScale.value = withSpring(0.95); }}
          onPressOut={() => { settingsScale.value = withSpring(1); }}
          onPress={() => { play('button_tap'); router.push('/settings'); }}
        >
          <Animated.View style={[styles.secondaryButton, settingsStyle]}>
            <Text style={styles.secondaryButtonText}>{t('menu.settings')}</Text>
          </Animated.View>
        </Pressable>
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>YG Games</Text>
        <Text style={styles.versionText}>v1.0.0</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: Spacing.xxl,
    paddingHorizontal: Spacing.md,
  },
  logoArea: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  ball: {
    fontSize: 80,
    marginBottom: 8,
  },
  title: {
    fontSize: 36,
    fontWeight: '900',
    color: Colors.textPrimary,
    letterSpacing: 4,
  },
  subtitle: {
    fontSize: 12,
    fontWeight: '600',
    color: Colors.primary,
    letterSpacing: 6,
    marginTop: -2,
  },
  buttonArea: {
    width: '100%',
    alignItems: 'center',
    gap: Spacing.md,
    paddingBottom: Spacing.xl,
  },
  primaryButton: {
    borderRadius: 16,
    overflow: 'hidden',
    elevation: 8,
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 12,
  },
  primaryButtonGradient: {
    paddingHorizontal: 48,
    paddingVertical: 18,
    alignItems: 'center',
    minWidth: 240,
  },
  primaryButtonText: {
    fontSize: 18,
    fontWeight: '800',
    color: '#0d2818',
    letterSpacing: 2,
  },
  secondaryButton: {
    paddingHorizontal: Spacing.xl,
    paddingVertical: 14,
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: 'rgba(125,206,160,0.3)',
    alignItems: 'center',
    minWidth: 180,
    backgroundColor: 'rgba(125,206,160,0.06)',
  },
  secondaryButtonText: {
    fontSize: 15,
    fontWeight: '600',
    color: Colors.textSecondary,
    letterSpacing: 1,
  },
  footer: {
    alignItems: 'center',
    gap: 4,
  },
  footerText: {
    fontSize: 12,
    color: Colors.textMuted,
    letterSpacing: 2,
  },
  versionText: {
    fontSize: 10,
    color: 'rgba(107,144,128,0.5)',
  },
});
