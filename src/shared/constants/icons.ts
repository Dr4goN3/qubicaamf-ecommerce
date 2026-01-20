import cartSvg from '@/assets/icons/cart.svg?raw'
import favSvg from '@/assets/icons/fav.svg?raw'
import darkSvg from '@/assets/icons/dark.svg?raw'
import lightSvg from '@/assets/icons/light.svg?raw'
import loginSvg from '@/assets/icons/login.svg?raw'
import logoutSvg from '@/assets/icons/logout.svg?raw'
import settingsSvg from '@/assets/icons/settings.svg?raw'
import type { IconName } from '@/shared/types/ui-kit/icon'

export const ICON_SVGS: Record<IconName, string> = {
  cart: cartSvg,
  dark: darkSvg,
  fav: favSvg,
  light: lightSvg,
  login: loginSvg,
  logout: logoutSvg,
  settings: settingsSvg,
}
