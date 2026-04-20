import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import en from './locales/en.json';
import fr from './locales/fr.json';
import ar from './locales/ar.json';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en },
      fr: { translation: fr },
      ar: { translation: ar },
    },
    fallbackLng: 'en',
    supportedLngs: ['en', 'fr', 'ar'],
    interpolation: { escapeValue: false },
    detection: {
      order: ['localStorage', 'navigator'],
      lookupLocalStorage: 'bv_lang',
      caches: ['localStorage'],
    },
  });

export const applyDir = (lng: string) => {
  const dir = lng === 'ar' ? 'rtl' : 'ltr';
  document.documentElement.lang = lng;
  document.documentElement.dir = dir;
};

i18n.on('languageChanged', applyDir);
applyDir(i18n.language || 'en');

export default i18n;
