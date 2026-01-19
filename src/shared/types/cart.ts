import type { Product } from './product'

export type ProductId = number

export interface Cart {
  id: ProductId
  userId: number
  products: Product[]
}
