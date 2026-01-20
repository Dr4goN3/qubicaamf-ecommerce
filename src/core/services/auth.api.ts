import { API } from './constants/api.constants'
import { http } from './http'
import type { UserCredentials, LoginResponse } from '@/shared/types/auth'

/**
 * POST /auth/login
 * Authenticates a user and returns a token.
 *
 * @param credentials - The user's login credentials.
 * @returns A promise that resolves to the login response containing the token.
 */
export async function login(credentials: UserCredentials): Promise<LoginResponse> {
  const { data } = await http.post<LoginResponse>(API.ENDPOINTS.AUTH_LOGIN, credentials)
  return data
}
