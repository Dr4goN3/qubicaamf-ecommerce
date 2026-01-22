export const RouteName = {
  Home: 'home',
  Product: 'product',
  Cart: 'cart',
  Wishlist: 'wishlist'
} as const

export type RouteName = (typeof RouteName)[keyof typeof RouteName]
