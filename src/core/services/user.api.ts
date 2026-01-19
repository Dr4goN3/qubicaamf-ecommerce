import { http } from './http'
import { API } from '@/core/services/constants/api.constants'
import type { User } from '@/shared/types/user'

export async function getUsers(): Promise<User[]> {
  const { data } = await http.get<User[]>(API.ENDPOINTS.USERS)
  return data
}

export async function getUserById(id: number): Promise<User> {
  const { data } = await http.get<User>(`${API.ENDPOINTS.USERS}/${id}`)
  return data
}

export async function addUser(user: User): Promise<User> {
  const { data } = await http.post<User>(API.ENDPOINTS.USERS, user)
  return data
}

export async function updateUser(id: number, user: User): Promise<User> {
  const { data } = await http.put<User>(`${API.ENDPOINTS.USERS}/${id}`, user)
  return data
}

export async function deleteUser(id: number): Promise<User> {
  const { data } = await http.delete<User>(`${API.ENDPOINTS.USERS}/${id}`)
  return data
}
