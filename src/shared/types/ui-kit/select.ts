export type SelectSize = 'sm' | 'md' | 'lg'
export type SelectValue = string | number

export interface SelectOption {
  label: string
  value: SelectValue
  disabled?: boolean
}

export interface SelectProps {
  options: SelectOption[]
  size?: SelectSize
  disabled?: boolean
  required?: boolean
  placeholder?: string
}

