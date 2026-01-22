export type TextareaSize = 'sm' | 'md' | 'lg'

export interface TextareaProps {
  size?: TextareaSize
  disabled?: boolean
  placeholder?: string
  required?: boolean
  readonly?: boolean
  rows?: number
}
