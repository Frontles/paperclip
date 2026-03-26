import { useEffect, useRef } from 'react';
import { Animated, StyleSheet, Text, View } from 'react-native';
import { Colors } from '@/constants/colors';
import type { ToastData } from '@/hooks/useMatchEvents';

// ─── Single Toast ──────────────────────────────────────────────

interface SingleToastProps {
  toast: ToastData;
  goalBg?: string;
  goalBorder?: string;
}

function SingleToast({ toast, goalBg, goalBorder }: SingleToastProps) {
  const translateX = useRef(new Animated.Value(300)).current;
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.spring(translateX, {
        toValue: 0,
        useNativeDriver: true,
        damping: 14,
        stiffness: 180,
      }),
      Animated.timing(opacity, {
        toValue: 1,
        duration: 180,
        useNativeDriver: true,
      }),
    ]).start();
  }, [opacity, translateX]);

  const typeStyle =
    toast.type === 'goal'
      ? [styles.toastGoal, goalBg ? { backgroundColor: goalBg } : null, goalBorder ? { borderColor: goalBorder } : null]
      : toast.type === 'yellow_card'
        ? [styles.toastYellowCard]
        : [styles.toastRedCard];

  return (
    <Animated.View
      style={[
        styles.toast,
        ...typeStyle,
        { opacity, transform: [{ translateX }] },
      ]}
    >
      <Text style={styles.toastText}>{toast.label}</Text>
    </Animated.View>
  );
}

// ─── Toast Stack ──────────────────────────────────────────────

export interface EventToastStackProps {
  toasts: ToastData[];
  goalBg?: string;
  goalBorder?: string;
}

export function EventToastStack({ toasts, goalBg, goalBorder }: EventToastStackProps) {
  if (toasts.length === 0) return null;

  return (
    <View style={styles.stack} pointerEvents="none">
      {toasts.map((t) => (
        <SingleToast key={t.id} toast={t} goalBg={goalBg} goalBorder={goalBorder} />
      ))}
    </View>
  );
}

// ─── Styles ───────────────────────────────────────────────────

const styles = StyleSheet.create({
  stack: {
    position: 'absolute',
    bottom: 80,
    left: 16,
    right: 16,
    gap: 6,
    alignItems: 'center',
    zIndex: 20,
  },
  toast: {
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 10,
    minWidth: 200,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.4,
    shadowRadius: 4,
    elevation: 6,
  },
  toastGoal: {
    backgroundColor: '#1a3a28',
    borderWidth: 1,
    borderColor: Colors.goalGold,
  },
  toastRedCard: {
    backgroundColor: Colors.redCard,
    borderWidth: 1,
    borderColor: '#ff6b78',
  },
  toastYellowCard: {
    backgroundColor: '#8B8000',
    borderWidth: 1,
    borderColor: '#FFD700',
  },
  toastText: {
    color: Colors.textPrimary,
    fontSize: 14,
    fontWeight: '700',
    letterSpacing: 0.3,
  },
});
