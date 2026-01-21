<template>
  <main class="product-view">
    <p v-if="error" class="product-view__status">{{ error }}</p>

    <ProductDetails
      v-else-if="product"
      :product="product"
      :is-authenticated="isAuthenticated"
      :cart-quantity="cartQuantity"
      :is-in-wishlist="isInWishlist"
      @add-to-cart="addToCart"
      @remove-from-cart="removeFromCart"
      @toggle-wishlist="toggleWishlist"
    />
  </main>
</template>

<script setup lang="ts">
import ProductDetails from '@/features/product/components/ProductDetails.vue'
import { getProductById } from '@/core/services/products.api'
import { ref, watch } from 'vue'
import type { ProductWithRating } from '@/shared/types/product'
import { useUserStore } from '@/stores/user.store'
import { computed } from 'vue'
import { useCartStore } from '@/stores/cart.store'
import { useWishlistStore } from '@/stores/wishlist.store'

const cartStore = useCartStore()
const cartQuantity = computed(() => (product.value ? cartStore.getQuantity(product.value.id) : 0))

const wishlistStore = useWishlistStore()
const isInWishlist = computed(() => (product.value ? wishlistStore.has(product.value.id) : false))

const userStore = useUserStore()
const isAuthenticated = computed(() => userStore.isAuthenticated)

const props = defineProps<{
  id: string
}>()

const product = ref<ProductWithRating | null>(null)
const error = ref<string | null>(null)

async function load(id: string) {
  const numericId = Number(id)

  error.value = null

  try {
    product.value = await getProductById(numericId)
  } catch {
    product.value = null
    error.value = 'Failed to load product.'
  }
}

function addToCart() {
  if (!product.value) return
  cartStore.addOneItem(product.value, 1)
}

function removeFromCart() {
  if (!product.value) return
  cartStore.removeOneItem(product.value.id, 1)
}

function toggleWishlist() {
  if (!product.value) return
  wishlistStore.toggle(product.value)
}

watch(
  () => props.id,
  (id) => load(id),
  { immediate: true }
)
</script>

<style scoped lang="scss">
.product-view {
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
  
  &__status {
    color: var(--text-muted);
  }
}

</style>
