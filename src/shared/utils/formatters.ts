import { LANGUAGE, type Language } from '@/core/constants/language.constants'

function toIntlLocale(language: Language): string {
  return language === LANGUAGE.Italian ? 'it-IT' : 'en-US'
}

function toCurrency(language: Language): string {
  return language === LANGUAGE.Italian ? 'EUR' : 'USD'
}

export function createPriceFormatter(language: Language): Intl.NumberFormat {
  return new Intl.NumberFormat(toIntlLocale(language), {
    style: 'currency',
    currency: toCurrency(language),
  })
}

