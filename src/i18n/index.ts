import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import { en } from './translations/en'
import { pl } from './translations/pl'

i18n.use(initReactI18next).init({
  resources: {
    en: { translation: en },
    pl: { translation: pl },
  },
  lng: 'pl',
  fallbackLng: 'en',
  interpolation: { escapeValue: false },
})

export default i18n
