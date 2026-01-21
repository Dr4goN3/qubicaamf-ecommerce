<template>
  <main class="wishlist-view">
    <PageHeading :title="t('wishlist.title')" :subtitle="subtitle" />

    <p v-if="!cards.length" class="wishlist-view__empty">
      {{ t('wishlist.empty') }}
    </p>

    <div v-else class="wishlist-view__layout">
      <aside class="wishlist-view__order-summary" :aria-label="t('wishlist.summary.title')">
        <div class="wishlist-view__order-summary-card">
          <h2 class="wishlist-view__order-summary-title">{{ t('wishlist.summary.title') }}</h2>
          <dl class="wishlist-view__order-summary-list">
            <div class="wishlist-view__order-summary-row">
              <dt class="wishlist-view__order-summary-label">{{ t('wishlist.summary.items') }}</dt>
              <dd class="wishlist-view__order-summary-value">{{ count }}</dd>
            </div>
          </dl>
        </div>
      </aside>

      <section class="wishlist-view__items" :aria-label="t('wishlist.title')">
        <ul class="wishlist-view__list">
          <li v-for="item in cards" :key="item.product.id" class="wishlist-view__list-item">
            <WishlistItemCard
              :title="item.product.title"
              :image="item.product.image"
              :price="item.priceLabel"
              :description="item.product.description"
              @remove="openConfirmRemoveItemsDialog(item.product.id, item.product.title)"
            />
          </li>
        </ul>
      </section>
    </div>

    <BaseDialog v-model="isConfirmRemoveItemsDialogOpen" :aria-label="t('wishlist.removeConfirm.title')">
      <template #title>{{ t('wishlist.removeConfirm.title') }}</template>

      <p class="wishlist-view__confirm-text">
        {{ t('wishlist.removeConfirm.body', { title: removeItemsTitle }) }}
      </p>

      <template #footer>
        <BaseButton variant="secondary" @click="isConfirmRemoveItemsDialogOpen = false">
          {{ t('common.cancel') }}
        </BaseButton>
        <BaseButton variant="danger" @click="confirmRemoveItems">
          {{ t('common.confirm') }}
        </BaseButton>
      </template>
    </BaseDialog>
  </main>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useI18n } from 'vue-i18n'
import { useWishlistStore } from '@/stores/wishlist.store'
import { createPriceFormatter } from '@/shared/utils/formatters'
import { type Language, LANGUAGE } from '@/core/constants/language.constants'
import PageHeading from '@/shared/components/PageHeading.vue'
import WishlistItemCard from '@/features/wishlist/components/WishlistItemCard.vue'
import BaseDialog from '@/shared/components/BaseDialog.vue'
import BaseButton from '@/shared/components/BaseButton.vue'
import type { ProductId } from '@/shared/types/product'

const wishlistStore = useWishlistStore()
const { list, count } = storeToRefs(wishlistStore)

const { locale, t } = useI18n()

const formatter = computed(() => {
  const language = (locale.value as Language) ?? LANGUAGE.Italian
  return createPriceFormatter(language)
})

const subtitle = computed(() => t('wishlist.subtitleDescription'))

const cards = computed(() =>
  list.value.map((product) => ({
    product,
    priceLabel: formatter.value.format(product.price),
  }))
)

const isConfirmRemoveItemsDialogOpen = ref(false)
const removeItemsId = ref<ProductId | null>(null)
const removeItemsTitle = ref('')

function openConfirmRemoveItemsDialog(productId: ProductId, title: string) {
  removeItemsId.value = productId
  removeItemsTitle.value = title
  isConfirmRemoveItemsDialogOpen.value = true
}

function confirmRemoveItems() {
  if (removeItemsId.value !== null) {
    wishlistStore.remove(removeItemsId.value)
  }
  removeItemsId.value = null
  removeItemsTitle.value = ''
  isConfirmRemoveItemsDialogOpen.value = false
}
</script>

<style scoped lang="scss">
@use '@/assets/styles/breakpoints' as *;

.wishlist-view {
  display: flex;
  flex-direction: column;
  gap: var(--space-4);

  &__empty {
    color: var(--text-muted);
  }

  &__layout {
    display: grid;
    grid-template-columns: 320px 1fr;
    gap: var(--space-6);
    align-items: start;
  }

  &__order-summary {
    min-width: 0;
  }

  &__order-summary-card {
    padding: var(--space-4);
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: var(--radius);
    box-shadow: var(--shadow-sm);
  }

  &__order-summary-title {
    margin: 0 0 var(--space-3);
    font-size: var(--text-lg);
    font-weight: var(--font-semibold);
    color: var(--text);
  }

  &__order-summary-list {
    margin: 0;
    display: grid;
    gap: var(--space-2);
  }

  &__order-summary-row {
    display: flex;
    align-items: baseline;
    justify-content: space-between;
    gap: var(--space-3);
  }

  &__order-summary-label {
    margin: 0;
    font-size: var(--text-sm);
    font-weight: var(--font-semibold);
    color: var(--text-muted);
  }

  &__order-summary-value {
    margin: 0;
    font-weight: var(--font-semibold);
    color: var(--text);
  }

  &__items {
    min-width: 0;
  }

  &__list {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    gap: var(--space-4);
  }

  &__confirm-text {
    color: var(--text);
  }

  @media (max-width: $breakpoint-tablet) {
    &__layout {
      grid-template-columns: 1fr;
      gap: var(--space-4);
    }

    &__order-summary-row {
      justify-content: flex-start;
      gap: var(--space-2);
      flex-wrap: wrap;
    }
  }
}
</style>
