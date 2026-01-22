import { defineStore } from 'pinia'
import { useLocalStorage } from '@vueuse/core'
import { computed } from 'vue'
import type { UserCredentials, LoginResponse } from '@/shared/types/auth'
import { login as loginApi } from '@/core/services/auth.api'
import { STORAGE_KEYS } from '@/core/constants/storage-keys.constants'

export const useUserStore = defineStore('user', () => {
  const token = useLocalStorage<string | null>(STORAGE_KEYS.AUTH_TOKEN, null)

  const isAuthenticated = computed(() => !!token.value)

  async function login(credentials: UserCredentials) {
    const response: LoginResponse = await loginApi(credentials)
    token.value = response.token
  }

  function logout() {
    token.value = null
  }

  return {
    token,
    isAuthenticated,
    login,
    logout
  }
})
