<template>
  <section class="product-details">
    <PageHeading :title="props.product.title" :subtitle="props.product.category">
      <BaseButton
        v-if="props.isAuthenticated"
        class="product-details__wishlist-button"
        :class="{ 'is-active': props.isInWishlist }"
        variant="secondary"
        size="sm"
        :aria-label="wishlistLabel"
        @click="$emit('toggle-wishlist')"
      >
        <BaseIcon name="fav" :size="18" color="var(--warning)" aria-hidden="true" />
        <span class="product-details__wishlist-text">{{ wishlistLabel }}</span>
      </BaseButton>
    </PageHeading>

    <div class="product-details__grid">
      <div class="product-details__media">
        <img
          class="product-details__image"
          :src="props.product.image"
          :alt="props.product.title"
          loading="lazy"
        />
      </div>

      <div class="product-details__info-wrapper">
        <div class="product-details__content">
          <div class="product-details__meta">
            <div class="product-details__price">
              <span class="product-details__price-label">{{ t('product.priceLabel') }}</span>
              <span class="product-details__price-value">{{ priceLabel }}</span>
            </div>

            <div
              v-if="props.isAuthenticated && props.cartQuantity > 0"
              class="product-details__cart-indicator"
            >
              <BaseIcon name="cart" :size="16" aria-hidden="true" />
              <span class="product-details__cart-indicator-text">{{ cartQuantityLabel }}</span>
            </div>
          </div>

          <div class="product-details__description">
            <span class="product-details__description-label">{{ t('product.descriptionLabel') }}</span>
            <p class="product-details__description-text">{{ props.product.description }}</p>
          </div>
          <p class="product-details__rating">
            <span class="product-details__rating-label">{{ t('product.ratingLabel') }}</span>
            {{ ratingLabel }}
          </p>
        </div>
  
        <div v-if="props.isAuthenticated" class="product-details__actions">
          <BaseButton
            v-if="props.cartQuantity > 0"
            variant="secondary"
            @click="$emit('remove-from-cart')"
          >
            {{ t('product.removeFromCart') }}
          </BaseButton>
          <BaseButton variant="success" @click="$emit('add-to-cart')">
            {{ t('product.addToCart') }}
          </BaseButton>
        </div>
      </div>
      
    </div>
  </section>
</template>
<script setup lang="ts">
import PageHeading from '@/shared/components/PageHeading.vue'
import BaseButton from '@/shared/components/BaseButton.vue'
import BaseIcon from '@/shared/components/BaseIcon.vue'
import type { ProductWithRating } from '@/shared/types/product'
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { createPriceFormatter } from '@/shared/utils/formatters'
import { type Language, LANGUAGE } from '@/core/constants/language.constants'

const props = withDefaults(
  defineProps<{
    product: ProductWithRating
    isAuthenticated?: boolean
    cartQuantity?: number
    isInWishlist?: boolean
  }>(),
  {
    isAuthenticated: false,
    cartQuantity: 0,
    isInWishlist: false,
  }
)

const { locale, t } = useI18n()

const priceLabel = computed(() => {
  const language = (locale.value as Language) ?? LANGUAGE.Italian
  return createPriceFormatter(language).format(props.product.price)
})

const ratingLabel = computed(() => `${props.product.rating.rate} (${props.product.rating.count})`)

const wishlistLabel = computed(() =>
  props.isInWishlist ? t('product.wishlist.saved') : t('product.wishlist.add')
)

const cartQuantityLabel = computed(() => t('product.cart.quantityLabel', { count: props.cartQuantity }))

defineEmits<{
  (e: 'add-to-cart'): void
  (e: 'remove-from-cart'): void
  (e: 'toggle-wishlist'): void
}>()

</script>
<style scoped lang="scss">
.product-details {
  &__wishlist-button {
    flex: 0 0 auto;
    padding: var(--space-2);
    line-height: 1;
    color: var(--warning);
    gap: var(--space-2);

    .product-details__wishlist-text {
      font-weight: var(--font-semibold);
      color: var(--text);
      font-size: var(--text-sm);
    }

    :deep(svg) {
      fill: none;
    }

    &.is-active {
      :deep(svg) {
        fill: currentColor;
      }
    }
  }

  &__grid {
    display: grid;
    grid-template-columns: 280px 1fr;
    gap: var(--space-6);
    align-items: start;
  }

  &__info-wrapper {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100%;

    .product-details__content {
      .product-details__meta {
        display: grid;
        grid-template-columns: 1fr auto;
        align-items: center;
        gap: var(--space-3);
        min-height: 2.5rem;
      }

      .product-details__price {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        gap: var(--space-1);
        margin: 0;
      }

      .product-details__price-label {
        color: var(--text-muted);
        font-size: var(--text-sm);
        font-weight: var(--font-semibold);
      }

      .product-details__price-value {
        font-weight: var(--font-semibold);
        font-size: var(--text-xl);
      }

      .product-details__cart-indicator {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        gap: var(--space-2);
        padding: var(--space-2) var(--space-3);
        border: 1px solid var(--border);
        border-radius: var(--radius-full);
        background: var(--surface-2);
        font-weight: var(--font-semibold);
        color: var(--text);
        white-space: nowrap;
      }

      .product-details__cart-indicator-text {
        font-size: var(--text-sm);
      }

      .product-details__description {
        margin-top: var(--space-3);
        display: flex;
        flex-direction: column;
        gap: var(--space-1);
      }

      .product-details__description-label {
        color: var(--text-muted);
        font-size: var(--text-sm);
        font-weight: var(--font-semibold);
      }

      .product-details__description-text {
        margin: 0;
        color: var(--text);
      }

      .product-details__rating {
        margin-top: var(--space-3);
        color: var(--text-muted);
      }

      .product-details__rating-label {
        color: var(--text);
        font-weight: var(--font-semibold);
        margin-right: var(--space-1);
      }
    }

    .product-details__actions {
      display: flex;
      justify-content: flex-end;
      align-items: flex-end;
      gap: var(--space-3);
      margin-top: var(--space-5);
    }
  }

  &__media {
    border: 1px solid var(--border);
    border-radius: var(--radius-md);
    background: var(--surface);
    padding: var(--space-4);
    margin: auto;

    .product-details__image {
      max-width: 256px;
      width: 100%;
      height: auto;
      object-fit: contain;
    }
  }
}

@media (max-width: 768px) {
  .product-details {
    &__grid {
      grid-template-columns: 1fr;
    }
  }
}
</style>
