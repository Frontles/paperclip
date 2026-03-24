module.exports = {
  Platform: { OS: 'android' },
  NativeModules: { I18nManager: { localeIdentifier: 'en_US' } },
  StyleSheet: { create: (s) => s },
  useCallback: (fn) => fn,
  useEffect: () => {},
};
