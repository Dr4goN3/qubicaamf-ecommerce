import axios from 'axios'
import { useUserStore } from '@/stores/user.store'
import { useUiStore } from '@/stores/ui.store'
import { API } from './constants/api.constants'

export const http = axios.create({
  baseURL: API.BASE_URL,
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
  },
})

http.interceptors.request.use((config) => {
  try {
    useUiStore().startLoading()
    const userStore = useUserStore()
    const token = userStore.token

    if (token) {
      config.headers = config.headers ?? {}
      config.headers.Authorization = `Bearer ${token}`
    }
  } catch {
    // 
  }

  return config
})

http.interceptors.response.use(
  (response) => {
    stopUiLoadingSafely()
    return response
  },
  (error) => {
    stopUiLoadingSafely()
    return Promise.reject(error)
  }
)

function stopUiLoadingSafely() {
  try {
    useUiStore().stopLoading()
  } catch {
    //
  }
}
