<template>
  <div class="page-heading">
    <div class="page-heading__content">
      <component :is="titleLevel" class="page-heading__title">
        {{ title }}
      </component>
      <component v-if="subtitle" :is="subtitleLevel" class="page-heading__subtitle">
        {{ subtitle }}
      </component>
    </div>
    <div v-if="$slots.default" class="page-heading__action">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { HeadingProps } from '@/shared/types/ui-kit/heading'

withDefaults(defineProps<HeadingProps>(), {
  titleLevel: 'h1',
  subtitleLevel: 'h2'
})
</script>

<style scoped lang="scss">
@use '@/assets/styles/breakpoints' as *;

.page-heading {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: var(--space-4);
  margin-bottom: var(--space-6);

  @media (max-width: $breakpoint-tablet) {
    flex-direction: column;
    align-items: stretch;
  }
}

.page-heading__content {
  flex: 1;

  @media (max-width: $breakpoint-tablet) {
    width: 100%;
  }
}

.page-heading__title {
  margin: 0;
  font-size: var(--text-3xl);
  font-weight: var(--font-bold);
  color: var(--text);
  line-height: var(--leading-tight);
}

.page-heading__subtitle {
  margin: var(--space-2) 0 0;
  font-size: var(--text-lg);
  font-weight: var(--font-normal);
  color: var(--text-muted);
  line-height: var(--leading-normal);
}

.page-heading__action {
  @media (max-width: $breakpoint-tablet) {
    display: flex;
    justify-content: center;
    margin-top: var(--space-2);
    width: 100%;
  }
}
</style>
