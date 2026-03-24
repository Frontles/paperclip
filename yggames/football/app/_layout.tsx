import { useEffect } from 'react';
import { Stack } from 'expo-router';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { StyleSheet } from 'react-native';
import { getDeviceLanguage } from '@/hooks/useI18n';
import { useSettingsStore } from '@/stores/settingsStore';
import { useSoundPreloader } from '@/hooks/useSound';

export default function RootLayout() {
  const { localeDetected, setLanguage, markLocaleDetected } = useSettingsStore();
  useSoundPreloader();

  useEffect(() => {
    if (!localeDetected) {
      setLanguage(getDeviceLanguage());
      markLocaleDetected();
    }
  }, []);

  return (
    <GestureHandlerRootView style={styles.container}>
      <Stack screenOptions={{ headerShown: false, animation: 'slide_from_right' }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="team-select" />
        <Stack.Screen name="mode-select" />
        <Stack.Screen name="game/plinko" />
        <Stack.Screen name="game/arena" />
        <Stack.Screen name="game/keeper-clash" />
        <Stack.Screen name="post-match" />
        <Stack.Screen name="settings" />
      </Stack>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
