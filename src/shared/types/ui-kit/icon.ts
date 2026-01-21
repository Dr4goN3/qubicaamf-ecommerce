export type IconName =
  | 'cart'
  | 'fav'
  | 'login'
  | 'logout'
  | 'light'
  | 'dark'
  | 'settings'
  | 'bowling'
export type IconSize = string | number

export interface IconProps {
  name: IconName
  size?: IconSize
  color?: string
  ariaLabel?: string
  decorative?: boolean
}
