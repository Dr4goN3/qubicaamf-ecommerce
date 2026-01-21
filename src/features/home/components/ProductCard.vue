<template>
  <article class="product-card">
    <button
      class="product-card__button"
      type="button"
      :aria-label="props.ariaLabel ?? props.title"
      @click="$emit('click')"
    >
      <div class="product-card__media">
        <img class="product-card__image" :src="props.image" :alt="props.title" loading="lazy" />
      </div>

      <div class="product-card__content">
        <h3 class="product-card__title">{{ props.title }}</h3>
        <p class="product-card__price">{{ props.price }}</p>
      </div>
    </button>
  </article>
</template>

<script setup lang="ts">
const props = defineProps<{
  title: string
  image: string
  price: string
  ariaLabel?: string
}>()

defineEmits<{
  (e: 'click'): void
}>()
</script>

<style scoped lang="scss">
@use '@/assets/styles/mixins' as *;
@use '@/assets/styles/breakpoints' as *;

.product-card {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  box-shadow: var(--shadow-sm);
  overflow: hidden;
  height: 100%;
  position: relative;
  transition: transform var(--transition-fast), box-shadow var(--transition-fast);

  &:hover {
    transform: scale(1.02);
    box-shadow: var(--shadow-md);
    z-index: 1;
  }

  &__button {
    @include interactive;

    width: 100%;
    height: 100%;
    display: grid;
    grid-template-rows: 160px auto;
    min-height: 260px;
    padding: 0;
    border: 0;
    background: transparent;
    color: inherit;
    text-align: left;
  }

  &__media {
    background: var(--surface-2);
    display: grid;
    place-items: center;
    padding: var(--space-3);
    overflow: hidden;
  }

  &__image {
    width: 100%;
    height: 100%;
    object-fit: contain;
    display: block;
  }

  &__content {
    display: flex;
    flex-direction: column;
    gap: var(--space-2);
    padding: var(--space-3);
    flex: 1 1 auto;
    min-height: 0;
  }

  &__title {
    margin: 0;
    font-size: var(--text-base);
    font-weight: var(--font-semibold);
    color: var(--text);
    line-height: var(--leading-normal);
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  &__price {
    margin: 0;
    margin-top: auto;
    font-weight: var(--font-semibold);
    color: var(--text);
    text-align: right;
    align-self: flex-end;
  }

  @media (max-width: $breakpoint-mobile) {
    &__button {
      grid-template-rows: 260px auto;
    }

    &__media {
      padding: var(--space-1);
    }
  }
}
</style>
