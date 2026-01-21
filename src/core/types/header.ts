export interface HeaderCategoryLink {
  label: string
  to: string
  category?: string | null
}

export interface HeaderProps {
  storeName: string
  logoSrc?: string
  categories?: HeaderCategoryLink[]
  isAuthenticated?: boolean
  cartCount?: number
  wishlistCount?: number
  isCartActive?: boolean
  isWishlistActive?: boolean
}
