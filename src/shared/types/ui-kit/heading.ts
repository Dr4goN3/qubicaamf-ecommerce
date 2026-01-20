export type HeadingLevel = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'

export interface HeadingProps {
  title: string
  subtitle?: string
  titleLevel?: HeadingLevel
  subtitleLevel?: HeadingLevel
}
