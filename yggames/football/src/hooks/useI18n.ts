import { useCallback } from 'react';
import { NativeModules, Platform } from 'react-native';
import { useSettingsStore } from '@/stores/settingsStore';
import en from '@/i18n/en.json';
import tr from '@/i18n/tr.json';
import de from '@/i18n/de.json';
import fr from '@/i18n/fr.json';

type Language = 'tr' | 'en' | 'de' | 'fr';
export type TranslationKey = keyof typeof en;

const translations: Record<Language, Record<string, string>> = { en, tr, de, fr };

const SUPPORTED: Language[] = ['tr', 'en', 'de', 'fr'];

export function getDeviceLanguage(): Language {
  let rawLocale = 'tr';
  try {
    if (Platform.OS === 'ios') {
      const settings = NativeModules.SettingsManager?.settings;
      rawLocale = settings?.AppleLocale ?? settings?.AppleLanguages?.[0] ?? 'tr';
    } else {
      rawLocale = NativeModules.I18nManager?.localeIdentifier ?? 'tr';
    }
  } catch {
    rawLocale = 'tr';
  }
  const code = rawLocale.slice(0, 2).toLowerCase() as Language;
  return SUPPORTED.includes(code) ? code : 'tr';
}

export function useI18n() {
  const language = useSettingsStore((s) => s.language);
  const setLanguage = useSettingsStore((s) => s.setLanguage);

  const t = useCallback(
    (key: TranslationKey): string => {
      return translations[language][key] ?? translations.en[key] ?? key;
    },
    [language],
  );

  return { t, language, setLanguage };
}
