import { API } from '@/core/services/constants/api.constants'
import { http } from './http'
import type { Cart } from '@/shared/types/cart'

export async function getCarts(): Promise<Cart[]> {
  const { data } = await http.get<Cart[]>(API.ENDPOINTS.CARTS)
  return data
}

export async function getCartById(id: number): Promise<Cart> {
  const { data } = await http.get<Cart>(`${API.ENDPOINTS.CARTS}/${id}`)
  return data
}

export async function addCart(cart: Cart): Promise<Cart> {
  const { data } = await http.post<Cart>(API.ENDPOINTS.CARTS, cart)
  return data
}

export async function updateCart(id: number, cart: Cart): Promise<Cart> {
  const { data } = await http.put<Cart>(`${API.ENDPOINTS.CARTS}/${id}`, cart)
  return data
}

export async function deleteCart(id: number): Promise<Cart> {
  const { data } = await http.delete<Cart>(`${API.ENDPOINTS.CARTS}/${id}`)
  return data
}
