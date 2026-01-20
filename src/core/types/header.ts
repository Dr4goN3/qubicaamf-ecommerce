export interface HeaderCategoryLink {
  label: string
  to: string
}

export interface HeaderProps {
  storeName: string
  logoSrc?: string
  categories?: HeaderCategoryLink[]
  isAuthenticated?: boolean
  cartCount?: number
  wishlistCount?: number
}
