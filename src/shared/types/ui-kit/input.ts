export type InputSize = 'sm' | 'md' | 'lg'
export type InputType = 'text' | 'email' | 'password' | 'number' | 'search' | 'tel' | 'url'

export interface InputProps {
  type?: InputType
  size?: InputSize
  disabled?: boolean
  placeholder?: string
  required?: boolean
  readonly?: boolean
}
