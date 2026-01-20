import type { Product } from './product'

export type CartId = number

export interface Cart {
  id: CartId
  userId: number
  products: Product[]
}

export interface CartProduct extends Product {
  quantity: number
}

export interface CartWithQuantity extends Cart {
  products: CartProduct[]
}
