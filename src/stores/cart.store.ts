import { STORAGE_KEYS } from '@/core/constants/storage-keys.constants'
import type { CartMap } from '@/shared/types/cart'
import type { ProductId, ProductWithRating } from '@/shared/types/product'
import { useLocalStorage } from '@vueuse/core'
import { defineStore } from 'pinia'
import { computed } from 'vue'

export const useCartStore = defineStore('cart', () => {
  const items = useLocalStorage<CartMap>(STORAGE_KEYS.CART, {} as CartMap)

  const list = computed(() => Object.values(items.value))
  const count = computed(() =>
    Object.values(items.value).reduce((total, item) => total + item.quantity, 0)
  )
  const totalPrice = computed(() =>
    Object.values(items.value).reduce(
      (total, item) => total + item.product.price * item.quantity,
      0
    )
  )

  function getQuantity(productId: ProductId) {
    return items.value[productId]?.quantity ?? 0
  }

  function addOneItem(product: ProductWithRating, quantity = 1) {
    const existing = items.value[product.id]
    if (existing) {
      existing.quantity += quantity
    } else {
      items.value[product.id] = { product, quantity }
    }
  }

  function removeOneItem(productId: ProductId, quantity = 1) {
    const existing = items.value[productId]
    if (!existing) return
    existing.quantity -= quantity
    if (existing.quantity <= 0) {
      delete items.value[productId]
    }
  }

  function removeAllItems(productId: ProductId) {
    if (!items.value[productId]) return
    delete items.value[productId]
  }

  function updateQuantity(productId: ProductId, quantity: number) {
    const existing = items.value[productId]
    if (!existing) return

    if (quantity <= 0) {
      delete items.value[productId]
      return
    }

    existing.quantity = quantity
  }

  function clear() {
    items.value = {} as CartMap
  }

  return {
    items,
    list,
    count,
    totalPrice,
    getQuantity,
    addOneItem,
    removeOneItem,
    removeAllItems,
    updateQuantity,
    clear
  }
})
