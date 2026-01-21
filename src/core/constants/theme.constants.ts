export const THEME = {
  Light: 'light',
  Dark: 'dark'
} as const

export type Theme = (typeof THEME)[keyof typeof THEME]
