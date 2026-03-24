import { View, Text, StyleSheet, Switch, TouchableOpacity, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { Colors } from '@/constants/colors';
import { useSettingsStore } from '@/stores/settingsStore';

const DURATION_OPTIONS = [30, 45, 60, 75, 90, 105, 120] as const;

function formatDuration(s: number) {
  const m = Math.floor(s / 60);
  const sec = s % 60;
  if (m === 0) return `${sec}sn`;
  if (sec === 0) return `${m}dk`;
  return `${m}dk ${sec}sn`;
}

export default function SettingsScreen() {
  const router = useRouter();
  const {
    soundEnabled, toggleSound,
    matchDuration, setMatchDuration,
    extraTimeEnabled, setExtraTimeEnabled,
  } = useSettingsStore();

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
        <Text style={styles.backText}>← Geri</Text>
      </TouchableOpacity>

      <Text style={styles.title}>Ayarlar</Text>

      {/* Ses */}
      <View style={styles.row}>
        <Text style={styles.label}>Ses</Text>
        <Switch
          value={soundEnabled}
          onValueChange={toggleSound}
          trackColor={{ false: Colors.border, true: Colors.primaryDark }}
          thumbColor={soundEnabled ? Colors.primary : '#ccc'}
        />
      </View>

      {/* Uzatmalar */}
      <View style={styles.row}>
        <Text style={styles.label}>Uzatmalar</Text>
        <Switch
          value={extraTimeEnabled}
          onValueChange={setExtraTimeEnabled}
          trackColor={{ false: Colors.border, true: Colors.primaryDark }}
          thumbColor={extraTimeEnabled ? Colors.primary : '#ccc'}
        />
      </View>

      {/* Maç Hızı */}
      <View style={styles.section}>
        <Text style={styles.label}>Maç Süresi (Gerçek Zaman)</Text>
        <View style={styles.optionsGrid}>
          {DURATION_OPTIONS.map((d) => (
            <TouchableOpacity
              key={d}
              style={[styles.optionBtn, matchDuration === d && styles.optionBtnActive]}
              onPress={() => setMatchDuration(d)}
              activeOpacity={0.7}
            >
              <Text style={[styles.optionText, matchDuration === d && styles.optionTextActive]}>
                {formatDuration(d)}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  content: { padding: 24, paddingTop: 60 },

  backBtn: { marginBottom: 20 },
  backText: { color: Colors.textSecondary, fontSize: 16 },

  title: {
    fontSize: 28, fontWeight: '800', color: Colors.textPrimary, marginBottom: 32,
  },

  row: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    backgroundColor: Colors.surface, borderRadius: 12, padding: 16, marginBottom: 12,
    borderWidth: 1, borderColor: Colors.border,
  },

  section: {
    backgroundColor: Colors.surface, borderRadius: 12, padding: 16, marginBottom: 12,
    borderWidth: 1, borderColor: Colors.border,
  },

  label: { color: Colors.textPrimary, fontSize: 16, fontWeight: '600' },

  optionsGrid: {
    flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginTop: 12,
  },

  optionBtn: {
    paddingHorizontal: 16, paddingVertical: 10, borderRadius: 8,
    borderWidth: 1, borderColor: Colors.border, backgroundColor: Colors.background,
  },
  optionBtnActive: {
    backgroundColor: Colors.primary, borderColor: Colors.primary,
  },
  optionText: { color: Colors.textSecondary, fontSize: 14, fontWeight: '600' },
  optionTextActive: { color: Colors.background },
});
