export type ProductId = number

export interface Product {
  id: ProductId
  title: string
  price: number
  description: string
  category: string
  image: string
}
