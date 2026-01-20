import { defineStore } from 'pinia'
import { computed } from 'vue'
import { useLocalStorage } from '@vueuse/core'
import { STORAGE_KEYS } from '@/core/constants/storage-keys.constants'
import type { Product, ProductId } from '@/shared/types/product'
import type { WishlistMap } from '@/shared/types/wishlist'

export const useWishlistStore = defineStore('wishlist', () => {
  const items = useLocalStorage<WishlistMap>(STORAGE_KEYS.WISHLIST, {} as WishlistMap)

  const list = computed(() => Object.values(items.value))
  const count = computed(() => Object.keys(items.value).length)

  function has(productId: ProductId) {
    return Boolean(items.value[productId])
  }

  function add(product: Product) {
    items.value[product.id] = product
  }

  function remove(productId: ProductId) {
    if (items.value[productId]) delete items.value[productId]
  }

  function toggle(product: Product) {
    if (items.value[product.id]) delete items.value[product.id]
    else items.value[product.id] = product
  }

  function clear() {
    items.value = {} as WishlistMap
  }

  return { items, list, count, has, add, remove, toggle, clear }
})
