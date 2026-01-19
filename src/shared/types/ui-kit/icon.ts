export type IconName = 'cart' | 'fav' | 'login' | 'logout'
export type IconSize = string | number

export interface IconProps {
  name: IconName
  size?: IconSize
  color?: string
  ariaLabel?: string
  decorative?: boolean
}
