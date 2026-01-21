import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

export const useUiStore = defineStore('ui', () => {
  const pendingRequests = ref(0)

  const isLoading = computed(() => pendingRequests.value > 0)

  function startLoading() {
    pendingRequests.value += 1
  }

  function stopLoading() {
    pendingRequests.value = Math.max(0, pendingRequests.value - 1)
  }

  function resetLoading() {
    pendingRequests.value = 0
  }

  return { pendingRequests, isLoading, startLoading, stopLoading, resetLoading }
})
