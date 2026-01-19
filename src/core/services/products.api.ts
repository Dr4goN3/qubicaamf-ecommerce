import { API } from '@/core/services/constants/api.constants'
import { http } from './http'
import type { Product, ProductId } from '@/shared/types/product'

export async function getProducts(): Promise<Product[]> {
  const { data } = await http.get<Product[]>(API.ENDPOINTS.PRODUCTS)
  return data
}

export async function getProductById(id: ProductId): Promise<Product> {
  const { data } = await http.get<Product>(`${API.ENDPOINTS.PRODUCTS}/${id}`)
  return data
}

export async function addProduct(product: Product): Promise<Product> {
  const { data } = await http.post<Product>(API.ENDPOINTS.PRODUCTS, product)
  return data
}

export async function updateProduct(id: ProductId, product: Product): Promise<Product> {
  const { data } = await http.put<Product>(`${API.ENDPOINTS.PRODUCTS}/${id}`, product)
  return data
}

export async function deleteProduct(id: ProductId): Promise<Product> {
  const { data } = await http.delete<Product>(`${API.ENDPOINTS.PRODUCTS}/${id}`)
  return data
}

export async function getCategories(): Promise<string[]> {
  const { data } = await http.get<string[]>(API.ENDPOINTS.CATEGORIES)
  return data
}

export async function getProductsByCategory(categoryName: string): Promise<Product[]> {
  const { data } = await http.get<Product[]>(
    `${API.ENDPOINTS.PRODUCTS}/category/${encodeURIComponent(categoryName)}`
  )
  return data
}
