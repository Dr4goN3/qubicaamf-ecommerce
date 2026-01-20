export const LANGUAGE = {
  Italian: 'it',
  English: 'en',
} as const

export type Language = (typeof LANGUAGE)[keyof typeof LANGUAGE]

