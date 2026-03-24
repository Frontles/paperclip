import { Modal, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors } from '@/constants/colors';

interface QuitModalProps {
  visible: boolean;
  onResume: () => void;
  onQuit: () => void;
}

export function QuitModal({ visible, onResume, onQuit }: QuitModalProps) {
  return (
    <Modal transparent visible={visible} animationType="fade" statusBarTranslucent>
      <View style={styles.overlay}>
        <View style={styles.card}>
          <View style={styles.iconContainer}>
            <Text style={styles.icon}>⏸️</Text>
          </View>

          <Text style={styles.title}>Match Paused</Text>
          <Text style={styles.subtitle}>Do you want to end the match?</Text>

          <View style={styles.actions}>
            <TouchableOpacity onPress={onResume} activeOpacity={0.8} style={styles.resumeBtn}>
              <LinearGradient
                colors={[Colors.primary, Colors.primaryDark]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.resumeBtnGradient}
              >
                <Text style={styles.resumeBtnText}>Resume</Text>
              </LinearGradient>
            </TouchableOpacity>

            <TouchableOpacity onPress={onQuit} activeOpacity={0.8} style={styles.quitBtn}>
              <Text style={styles.quitBtnText}>End Match</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.7)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    backgroundColor: '#142b1e',
    borderRadius: 20,
    padding: 32,
    width: 300,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(125,206,160,0.15)',
  },
  iconContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: 'rgba(125,206,160,0.1)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  icon: {
    fontSize: 28,
  },
  title: {
    color: Colors.textPrimary,
    fontSize: 22,
    fontWeight: '800',
    letterSpacing: 0.5,
    marginBottom: 6,
  },
  subtitle: {
    color: Colors.textMuted,
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 24,
    lineHeight: 20,
  },
  actions: {
    width: '100%',
    gap: 10,
  },
  resumeBtn: {
    borderRadius: 14,
    overflow: 'hidden',
    elevation: 4,
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  resumeBtnGradient: {
    paddingVertical: 15,
    alignItems: 'center',
    borderRadius: 14,
  },
  resumeBtnText: {
    color: '#0d2818',
    fontSize: 16,
    fontWeight: '800',
    letterSpacing: 1,
  },
  quitBtn: {
    paddingVertical: 14,
    alignItems: 'center',
    borderRadius: 14,
    borderWidth: 1.5,
    borderColor: 'rgba(230,57,70,0.4)',
    backgroundColor: 'rgba(230,57,70,0.08)',
  },
  quitBtnText: {
    color: '#E63946',
    fontSize: 15,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
});
