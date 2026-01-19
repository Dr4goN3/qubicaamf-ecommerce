import type { Product } from './product'

export type ProductId = number

export interface Cart {
  id: ProductId
  userId: number
  products: Product[]
}

export interface CartProduct extends Product {
  quantity: number
}

export interface CartWithQuantity extends Cart {
  products: CartProduct[]
}
