import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Import translation files
import arTranslations from './locales/ar.json';
import enTranslations from './locales/en.json';
import frTranslations from './locales/fr.json';

// Language resources
const resources = {
  ar: {
    translation: arTranslations
  },
  en: {
    translation: enTranslations
  },
  fr: {
    translation: frTranslations
  }
};

// Initialize i18next
i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'ar', // Default language (Arabic for Morocco)
    fallbackLng: 'fr', // Fallback language
    debug: import.meta.env.DEV,
    
    interpolation: {
      escapeValue: false, // React already does escaping
    },
    
    // Language detection
    detection: {
      order: ['localStorage', 'navigator', 'htmlTag'],
      caches: ['localStorage'],
    },
    
    // Namespace configuration
    ns: ['translation'],
    defaultNS: 'translation',
    
    // React i18next options
    react: {
      useSuspense: false,
    },
  });

export default i18n;
