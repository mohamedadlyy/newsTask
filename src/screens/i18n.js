import ReactNative, { I18nManager } from 'react-native';
import I18n from 'react-native-i18n';
// Import all locales
import en from './locale/en.json'
import ar from './locale/ar.json'
import AsyncStorage from "@react-native-community/async-storage";

// Should the app fallback to English if user locale doesn't exists
I18n.fallbacks = true;

// Define the supported translations
I18n.translations = {
  en,
  ar
};

AsyncStorage.getItem('lan').then((res) => {
  let currentLocale = res;
  let isRTL = currentLocale.indexOf('he') === 0 || currentLocale.indexOf('ar') === 0;
  ReactNative.I18nManager.forceRTL(isRTL);
  console.warn(isRTL)
  I18n.start = I18nManager.isRTL ? 'right' : 'left';
  I18n.end = I18nManager.isRTL ? 'left' : 'right';
  I18n.locale = res

}) 
export function strings(name, params = {}) {
  return I18n.t(name, params);
};

export default I18n;