import cartSvg from '@/assets/icons/cart.svg?raw'
import favSvg from '@/assets/icons/fav.svg?raw'
import loginSvg from '@/assets/icons/login.svg?raw'
import logoutSvg from '@/assets/icons/logout.svg?raw'
import type { IconName } from '@/shared/types/ui-kit/icon'

export const ICON_SVGS: Record<IconName, string> = {
  cart: cartSvg,
  fav: favSvg,
  login: loginSvg,
  logout: logoutSvg,
}

