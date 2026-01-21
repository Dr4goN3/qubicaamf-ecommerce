<template>
  <article class="cart-item-card">
    <div class="cart-item-card__media">
      <img class="cart-item-card__image" :src="props.image" :alt="props.title" loading="lazy" />
    </div>

    <div class="cart-item-card__content">
      <h3 class="cart-item-card__title">{{ props.title }}</h3>

      <dl class="cart-item-card__prices-wrapper">
        <div class="cart-item-card__price">
          <dt class="cart-item-card__label">{{ t('cart.item.price') }}</dt>
          <dd class="cart-item-card__value">{{ props.unitPrice }}</dd>
        </div>
        <div class="cart-item-card__price">
          <dt class="cart-item-card__label">{{ t('cart.item.total') }}</dt>
          <dd class="cart-item-card__value">{{ props.lineTotal }}</dd>
        </div>
      </dl>

      <div class="divider cart-item-card__divider" aria-hidden="true" />

      <div class="cart-item-card__actions">
        <div class="cart-item-card__quantity">
          <span class="cart-item-card__label">{{ t('cart.item.quantity') }}</span>
          <div class="cart-item-card__quantity-controls" role="group" :aria-label="t('cart.item.quantity')">
            <BaseTooltip :text="t('cart.item.decrease')" position="top">
              <BaseButton
                class="cart-item-card__qty-button"
                variant="secondary"
                size="sm"
                :aria-label="t('cart.item.decrease')"
                @click="$emit('decrease')"
              >
                −
              </BaseButton>
            </BaseTooltip>
            <span class="cart-item-card__qty-value" aria-live="polite">{{ props.quantity }}</span>
            <BaseTooltip :text="t('cart.item.increase')" position="top">
              <BaseButton
                class="cart-item-card__qty-button"
                variant="secondary"
                size="sm"
                :aria-label="t('cart.item.increase')"
                @click="$emit('increase')"
              >
                +
              </BaseButton>
            </BaseTooltip>
          </div>
        </div>

        <BaseButton variant="danger" size="sm" @click="$emit('remove')">
          {{ t('cart.item.remove') }}
        </BaseButton>
      </div>
    </div>
  </article>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import BaseButton from '@/shared/components/BaseButton.vue'
import BaseTooltip from '@/shared/components/BaseTooltip.vue'

const props = defineProps<{
  title: string
  image: string
  unitPrice: string
  lineTotal: string
  quantity: number
}>()

defineEmits<{
  (e: 'increase'): void
  (e: 'decrease'): void
  (e: 'remove'): void
}>()

const { t } = useI18n()
</script>

<style scoped lang="scss">
@use '@/assets/styles/breakpoints' as *;

.cart-item-card {
  display: grid;
  grid-template-columns: 120px 1fr;
  gap: var(--space-16);
  padding: var(--space-3);
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  box-shadow: var(--shadow-sm);

  &__media {
    width: 120px;
    height: 120px;
    border-radius: var(--radius-md);
    background: var(--surface-2);
    border: 1px solid var(--border);
    display: grid;
    place-items: center;
    padding: var(--space-2);
    overflow: hidden;
  }

  &__image {
    display: block;
    width: calc(100% - var(--space-4));
    height: calc(100% - var(--space-4));
    object-fit: contain;
  }

  &__content {
    display: flex;
    flex-direction: column;
    gap: var(--space-3);
    min-width: 0;
  }

  &__title {
    margin: 0;
    font-size: var(--text-base);
    font-weight: var(--font-semibold);
    color: var(--text);
    line-height: var(--leading-normal);
  }

  &__prices-wrapper {
    display: flex;
    flex-wrap: wrap;
    column-gap: var(--space-20);
    row-gap: var(--space-2);
    margin: 0;
  }

  &__price {
    display: flex;
    flex-direction: column;
    gap: var(--space-1);
    min-width: 0;
    max-width: 100%;
  }

  &__label {
    margin: 0;
    font-size: var(--text-sm);
    font-weight: var(--font-semibold);
    color: var(--text-muted);
  }

  &__value {
    margin: 0;
    font-weight: var(--font-semibold);
    color: var(--text);
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  &__divider {
    margin-top: var(--space-1);
  }

  &__actions {
    margin-top: var(--space-2);
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    gap: var(--space-3);
    flex-wrap: wrap;
  }

  &__quantity {
    display: inline-flex;
    align-items: center;
    gap: var(--space-2);
    flex-wrap: wrap;
  }

  &__quantity-controls {
    display: inline-flex;
    align-items: center;
    gap: var(--space-2);
    flex: 0 0 auto;
    white-space: nowrap;
  }

  &__qty-button {
    min-width: 36px;
    justify-content: center;
    padding-inline: var(--space-2);
  }

  &__qty-value {
    min-width: 2ch;
    text-align: center;
    font-weight: var(--font-semibold);
    color: var(--text);
  }

  @media (max-width: $breakpoint-tablet) {
    gap: var(--space-4);

    &__media {
      width: 120px;
      height: 120px;
    }

    &__prices-wrapper {
      column-gap: var(--space-4);
    }
  }

  @media (max-width: $breakpoint-mobile) {
    grid-template-columns: 1fr;

    &__media {
      width: 100%;
      height: auto;
      padding: var(--space-3);
    }

    &__image {
      width: 100%;
      height: auto;
      max-width: 220px;
      max-height: 220px;
      margin: 0 auto;
      object-fit: contain;
    }

    &__prices-wrapper {
      column-gap: var(--space-4);
    }

    &__quantity > .cart-item-card__label {
      flex: 1 1 100%;
    }
  }
}
</style>
