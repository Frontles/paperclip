import { useEffect } from 'react';
import { Platform, StatusBar } from 'react-native';
import { Stack } from 'expo-router';
import * as NavigationBar from 'expo-navigation-bar';

export default function GameLayout() {
  useEffect(() => {
    if (Platform.OS === 'android') {
      // Tam immersive mod — navigasyon barı tamamen gizlenir
      NavigationBar.setVisibilityAsync('hidden');
      NavigationBar.setBehaviorAsync('overlay-swipe');
      NavigationBar.setBackgroundColorAsync('transparent');
      StatusBar.setTranslucent(true);
      StatusBar.setBackgroundColor('transparent');
    }
    return () => {
      if (Platform.OS === 'android') {
        NavigationBar.setVisibilityAsync('visible');
        NavigationBar.setBehaviorAsync('inset-touch');
      }
    };
  }, []);

  return <Stack screenOptions={{ headerShown: false }} />;
}
