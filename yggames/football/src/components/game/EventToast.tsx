import { useEffect, useRef } from 'react';
import { Animated, StyleSheet, Text, View } from 'react-native';
import { Colors } from '@/constants/colors';
import type { ToastData } from '@/hooks/useMatchEvents';

// ─── Single Toast ──────────────────────────────────────────────

interface SingleToastProps {
  toast: ToastData;
}

function SingleToast({ toast }: SingleToastProps) {
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

  const isGoal = toast.type === 'goal';

  return (
    <Animated.View
      style={[
        styles.toast,
        isGoal ? styles.toastGoal : styles.toastRedCard,
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
}

export function EventToastStack({ toasts }: EventToastStackProps) {
  if (toasts.length === 0) return null;

  return (
    <View style={styles.stack} pointerEvents="none">
      {toasts.map((t) => (
        <SingleToast key={t.id} toast={t} />
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
    backgroundColor: Colors.primaryDark,
    borderWidth: 1,
    borderColor: Colors.goalGold,
  },
  toastRedCard: {
    backgroundColor: Colors.redCard,
    borderWidth: 1,
    borderColor: '#ff6b78',
  },
  toastText: {
    color: Colors.textPrimary,
    fontSize: 14,
    fontWeight: '700',
    letterSpacing: 0.3,
  },
});
