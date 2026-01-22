export type ProductId = number

export interface ProductRating {
  rate: number
  count: number
}

export interface Product {
  id: ProductId
  title: string
  price: number
  description: string
  category: string
  image: string
}

export interface ProductWithRating extends Product {
  rating: ProductRating
}
