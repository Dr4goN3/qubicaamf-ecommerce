import type { Product, ProductId } from './product'

export type WishlistItem = Product

export type WishlistMap = Record<ProductId, WishlistItem>
