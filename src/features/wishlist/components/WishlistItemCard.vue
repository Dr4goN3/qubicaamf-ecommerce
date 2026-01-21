<template>
  <article class="wishlist-item-card">
    <div class="wishlist-item-card__media">
      <img class="wishlist-item-card__image" :src="props.image" :alt="props.title" loading="lazy" />
    </div>

    <div class="wishlist-item-card__content">
      <div class="wishlist-item-card__top">
        <h3 class="wishlist-item-card__title">{{ props.title }}</h3>
        <BaseTooltip :text="t('wishlist.item.remove')" position="top" :disabled="!isCompact">
          <BaseButton
            class="wishlist-item-card__remove"
            variant="secondary"
            size="sm"
            :aria-label="t('wishlist.item.remove')"
            @click="$emit('remove')"
          >
            <BaseIcon name="fav" :size="18" color="var(--warning)" aria-hidden="true" />
            <span class="wishlist-item-card__remove-text">{{
              t('wishlist.item.removeShort')
            }}</span>
          </BaseButton>
        </BaseTooltip>
      </div>

      <dl class="wishlist-item-card__prices">
        <div class="wishlist-item-card__price">
          <dt class="wishlist-item-card__label">{{ t('wishlist.item.price') }}</dt>
          <dd class="wishlist-item-card__value">{{ props.price }}</dd>
        </div>
      </dl>

      <p v-if="props.description" class="wishlist-item-card__description">
        {{ props.description }}
      </p>
    </div>
  </article>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { useMediaQuery } from '@vueuse/core'
import BaseButton from '@/shared/components/BaseButton.vue'
import BaseIcon from '@/shared/components/BaseIcon.vue'
import BaseTooltip from '@/shared/components/BaseTooltip.vue'

const props = defineProps<{
  title: string
  image: string
  price: string
  description?: string
}>()

defineEmits<{
  (e: 'remove'): void
}>()

const isCompact = useMediaQuery('(max-width: 768px)')
const { t } = useI18n()
</script>

<style scoped lang="scss">
@use '@/assets/styles/breakpoints' as *;

.wishlist-item-card {
  display: grid;
  grid-template-columns: 120px 1fr;
  gap: var(--space-4);
  padding: var(--space-3);
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  box-shadow: var(--shadow-sm);

  &__media {
    width: 120px;
    height: 120px;
    border-radius: var(--radius-sm);
    background: var(--surface-2);
    border: 1px solid var(--border);
    display: grid;
    place-items: center;
    padding: var(--space-2);
    overflow: hidden;
  }

  &__image {
    width: calc(100% - var(--space-4));
    height: calc(100% - var(--space-4));
    object-fit: contain;
    display: block;
  }

  &__content {
    display: flex;
    flex-direction: column;
    gap: var(--space-3);
    min-width: 0;
  }

  &__top {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: var(--space-3);
  }

  &__title {
    margin: 0;
    font-size: var(--text-base);
    font-weight: var(--font-semibold);
    color: var(--text);
    line-height: var(--leading-normal);
  }

  &__remove {
    flex: 0 0 auto;
    display: inline-flex;
    align-items: center;
    gap: var(--space-2);
    padding: var(--space-2);
    line-height: 1;

    :deep(svg) {
      fill: currentColor;
      stroke: currentColor;
    }
  }

  &__remove-text {
    font-weight: var(--font-semibold);
    font-size: var(--text-sm);
    color: var(--text);
    white-space: nowrap;
  }

  &__prices {
    margin: 0;
  }

  &__price {
    display: flex;
    flex-direction: column;
    gap: var(--space-1);
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
  }

  &__description {
    margin: 0;
    color: var(--text-muted);
    font-size: var(--text-sm);
    line-height: var(--leading-normal);
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
    }
  }

  @media (max-width: $breakpoint-tablet) {
    &__remove-text {
      display: none;
    }
  }
}
</style>
