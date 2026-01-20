export type CheckboxSize = 'sm' | 'md' | 'lg'

export interface CheckboxProps {
  size?: CheckboxSize
  disabled?: boolean
  required?: boolean
  label?: string
}
