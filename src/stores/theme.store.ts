import { defineStore } from 'pinia'
import { useLocalStorage } from '@vueuse/core'
import { computed, watchEffect } from 'vue'
import { STORAGE_KEYS } from '@/core/constants/storage-keys.constants'
import { THEME, type Theme } from '@/core/constants/theme.constants'

export const useThemeStore = defineStore('theme', () => {
  const theme = useLocalStorage<Theme>(STORAGE_KEYS.THEME, THEME.Light)

  const isDark = computed(() => theme.value === THEME.Dark)

  function toggle() {
    theme.value = isDark.value ? THEME.Light : THEME.Dark
  }

  watchEffect(() => {
    document.documentElement.dataset.theme = theme.value
  })

  return { theme, isDark, toggle }
})
