import type { Product, ProductId, ProductWithRating } from './product'

export type CartId = number

export interface Cart {
  id: CartId
  userId: number
  products: Product[]
}

export interface CartItem {
  product: ProductWithRating
  quantity: number
}

export type CartMap = Record<ProductId, CartItem>

export interface CartProduct extends Product {
  quantity: number
}

export interface CartWithQuantity extends Cart {
  products: CartProduct[]
}
