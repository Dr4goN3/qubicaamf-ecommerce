<template>
  <main class="cart-view">
    <PageHeading :title="t('cart.title')" :subtitle="subtitle" />

    <p v-if="!cards.length" class="cart-view__empty">
      {{ t('cart.empty') }}
    </p>

    <div v-else class="cart-view__layout">
      <aside class="cart-view__order-summary" :aria-label="t('cart.summary.title')">
        <div class="cart-view__order-summary-card">
          <h2 class="cart-view__order-summary-title">{{ t('cart.summary.title') }}</h2>
          <dl class="cart-view__order-summary-list">
            <div class="cart-view__order-summary-row">
              <dt class="cart-view__order-summary-label">{{ t('cart.summary.items') }}</dt>
              <dd class="cart-view__order-summary-value">{{ count }}</dd>
            </div>
            <div class="cart-view__order-summary-row">
              <dt class="cart-view__order-summary-label">{{ t('cart.summary.total') }}</dt>
              <dd class="cart-view__order-summary-value">{{ totalLabel }}</dd>
            </div>
          </dl>
        </div>
      </aside>

      <section class="cart-view__items" :aria-label="t('cart.title')">
        <ul class="cart-view__list">
          <li v-for="item in cards" :key="item.product.id" class="cart-view__list-item">
            <CartItemCard
              :title="item.product.title"
              :image="item.product.image"
              :unitPrice="item.unitPriceLabel"
              :lineTotal="item.lineTotalLabel"
              :quantity="item.quantity"
              @increase="cartStore.addOneItem(item.product)"
              @decrease="cartStore.removeOneItem(item.product.id)"
              @remove="openConfirmRemoveItemsDialog(item.product.id, item.product.title, item.quantity)"
            />
          </li>
        </ul>
      </section>
    </div>

    <BaseDialog v-model="isConfirmRemoveItemsDialogOpen" :aria-label="confirmRemoveItemsDialogTitle">
      <template #title>{{ confirmRemoveItemsDialogTitle }}</template>

      <p class="cart-view__confirm-text">
        {{ t('cart.removeConfirm.body', { title: removeItemsTitle, count: removeItemsCount }) }}
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
import { useCartStore } from '@/stores/cart.store'
import { createPriceFormatter } from '@/shared/utils/formatters'
import { type Language, LANGUAGE } from '@/core/constants/language.constants'
import PageHeading from '@/shared/components/PageHeading.vue'
import CartItemCard from '@/features/cart/components/CartItemCard.vue'
import BaseDialog from '@/shared/components/BaseDialog.vue'
import BaseButton from '@/shared/components/BaseButton.vue'
import type { ProductId } from '@/shared/types/product'

const cartStore = useCartStore()
const { list, count, totalPrice } = storeToRefs(cartStore)

const { locale, t } = useI18n()

const formatter = computed(() => {
  const language = (locale.value as Language) ?? LANGUAGE.Italian
  return createPriceFormatter(language)
})

const subtitle = computed(() => t('cart.subtitleDescription'))

const totalLabel = computed(() => formatter.value.format(totalPrice.value))

const cards = computed(() =>
  list.value.map((item) => ({
    product: item.product,
    quantity: item.quantity,
    unitPriceLabel: formatter.value.format(item.product.price),
    lineTotalLabel: formatter.value.format(item.product.price * item.quantity),
  }))
)

const isConfirmRemoveItemsDialogOpen = ref(false)
const removeItemsId = ref<ProductId | null>(null)
const removeItemsTitle = ref('')
const removeItemsCount = ref(1)

const confirmRemoveItemsDialogTitle = computed(() =>
  t('cart.removeConfirm.title', { count: removeItemsCount.value })
)

function openConfirmRemoveItemsDialog(productId: ProductId, title: string, quantity: number) {
  removeItemsId.value = productId
  removeItemsTitle.value = title
  removeItemsCount.value = Math.max(1, quantity)
  isConfirmRemoveItemsDialogOpen.value = true
}

function confirmRemoveItems() {
  if (removeItemsId.value !== null) {
    cartStore.removeAllItems(removeItemsId.value)
  }
  removeItemsId.value = null
  removeItemsTitle.value = ''
  removeItemsCount.value = 1
  isConfirmRemoveItemsDialogOpen.value = false
}
</script>

<style scoped lang="scss">
@use '@/assets/styles/breakpoints' as *;

.cart-view {
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

    &__order-summary-value {
      margin-left: 0;
    }
  }

}
</style>
