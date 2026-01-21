<template>
  <main class="home-view__content">
    <p v-if="isProductsLoading" class="home-view__status">{{ t('home.products.loading') }}</p>
    <p v-else-if="productsError" class="home-view__status">{{ productsError }}</p>

    <BaseTable
      v-else
      :columns="columns"
      :data="tableData"
      row-key="id"
      clickable
      @rowClick="onProductRowClick"
    >
      <template #cell-image="{ row }">
        <img
          class="home-view__product-image"
          :src="(row as unknown as Product).image"
          :alt="(row as unknown as Product).title"
          loading="lazy"
        />
      </template>

      <template #cell-price="{ row }">
        <span class="home-view__price">{{ formatPrice((row as unknown as Product).price) }}</span>
      </template>
    </BaseTable>
  </main>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRoute, useRouter } from 'vue-router'
import BaseTable from '@/shared/components/BaseTable.vue'
import type { TableColumn, TableRow } from '@/shared/types/ui-kit/table'
import { RouteName } from '@/core/router/route-names'
import type { Product } from '@/shared/types/product'
import { getProducts, getProductsByCategory } from '@/core/services/products.api'
import { createPriceFormatter } from '@/shared/utils/formatters'
import { LANGUAGE, type Language } from '@/core/constants/language.constants'

const route = useRoute()
const router = useRouter()
const { locale, t } = useI18n()

const products = ref<Product[]>([])
const isProductsLoading = ref(false)
const productsError = ref<string | null>(null)

const tableData = computed(() => products.value as unknown as TableRow[])

const selectedCategory = computed(() =>
  typeof route.query.category === 'string' ? route.query.category : null
)

const priceFormatter = computed(() => {
  const language = (locale.value as Language) ?? LANGUAGE.Italian
  return createPriceFormatter(language)
})

const columns = computed<TableColumn[]>(() => [
  { key: 'image', label: '' },
  { key: 'title', label: t('home.products.columns.product') },
  {
    key: 'price',
    label: t('home.products.columns.price'),
  },
])

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

function onProductRowClick(row: TableRow) {
  const product = row as unknown as Product
  router.push({ name: RouteName.Product, params: { id: String(product.id) } })
}

function formatPrice(value: number) {
  return priceFormatter.value.format(value)
}

watch(selectedCategory, (category) => loadProducts(category), { immediate: true })
</script>

<style scoped lang="scss">
.home-view {
  &__content {
    display: flex;
    flex-direction: column;
    gap: var(--space-4);
  }

  &__status {
    color: var(--text-muted);
  }

  &__product-image {
    width: 52px;
    height: 52px;
    object-fit: contain;
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: var(--radius-sm);
    padding: var(--space-1);
  }

  &__price {
    display: block;
    text-align: right;
  }
}
</style>
