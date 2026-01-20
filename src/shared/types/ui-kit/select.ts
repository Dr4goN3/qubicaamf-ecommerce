export type SelectSize = 'sm' | 'md' | 'lg'
export type SelectValue = string | number
export type SelectVariant = 'default' | 'line'

export interface SelectOption {
  label: string
  value: SelectValue
  disabled?: boolean
}

export interface SelectProps {
  options: SelectOption[]
  variant?: SelectVariant
  size?: SelectSize
  disabled?: boolean
  required?: boolean
  placeholder?: string
}
