import { createI18n } from 'vue-i18n'

import en from '@/assets/lang/en.json'
import it from '@/assets/lang/it.json'

export const i18n = createI18n({
  legacy: false,
  globalInjection: true,
  locale: 'it',
  fallbackLocale: 'en',
  messages: {
    en,
    it
  }
})
