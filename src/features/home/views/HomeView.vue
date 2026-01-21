<template>
  <main class="home-view">
    <PageHeading :title="t('home.catalog.title')" :subtitle="subtitle" />

    <p v-if="isProductsLoading" class="home-view__status">{{ t('home.products.loading') }}</p>
    <p v-else-if="productsError" class="home-view__status">{{ productsError }}</p>

    <div v-else class="home-view__grid">
      <ProductCard
        v-for="product in products"
        :key="product.id"
        :title="product.title"
        :image="product.image"
        :price="formatPrice(product.price)"
        @click="onProductClick(product)"
      />
    </div>
  </main>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRoute, useRouter } from 'vue-router'
import { RouteName } from '@/core/router/route-names'
import type { Product } from '@/shared/types/product'
import { getProducts, getProductsByCategory } from '@/core/services/products.api'
import { createPriceFormatter } from '@/shared/utils/formatters'
import { LANGUAGE, type Language } from '@/core/constants/language.constants'
import ProductCard from '@/features/home/components/ProductCard.vue'
import PageHeading from '@/shared/components/PageHeading.vue'

const route = useRoute()
const router = useRouter()
const { locale, t } = useI18n()

const products = ref<Product[]>([])
const isProductsLoading = ref(false)
const productsError = ref<string | null>(null)

const subtitle = computed(() => t('home.catalog.subtitle'))

const selectedCategory = computed(() =>
  typeof route.query.category === 'string' ? route.query.category : null
)

const priceFormatter = computed(() => {
  const language = (locale.value as Language) ?? LANGUAGE.Italian
  return createPriceFormatter(language)
})

async function loadProducts(category: string | null) {
  isProductsLoading.value = true
  productsError.value = null

  try {
    products.value = category ? await getProductsByCategory(category) : await getProducts()
  } catch {
    products.value = []
    productsError.value = t('home.products.loadError')
  } finally {
    isProductsLoading.value = false
  }
}

function onProductClick(product: Product) {
  router.push({ name: RouteName.Product, params: { id: String(product.id) } })
}

function formatPrice(value: number) {
  return priceFormatter.value.format(value)
}

watch(selectedCategory, (category) => loadProducts(category), { immediate: true })
</script>

<style scoped lang="scss">
.home-view {
  display: flex;
  flex-direction: column;
  gap: var(--space-4);

  &__status {
    color: var(--text-muted);
  }

  &__grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
    gap: var(--space-4);
  }
}
</style>
