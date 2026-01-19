<template>
  <button
    :type="props.type"
    :disabled="props.disabled"
    :class="buttonClasses"
  >
    <slot />
  </button>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { ButtonProps } from '@/shared/types/ui-kit/button'

const props = withDefaults(defineProps<ButtonProps>(), {
  type: 'button',
  variant: 'primary',
  size: 'md',
  disabled: false
})

const buttonClasses = computed(() => [
  'base-button',
  `base-button--${props.variant}`,
  `base-button--${props.size}`,
  { 'is-disabled': props.disabled }
])
</script>

<style scoped lang="scss">
@use '@/assets/styles/mixins' as *;

.base-button {
  @include shape-base;
  @include interactive;
  @include input-sizes;

  display: inline-flex;
  align-items: center;
  justify-content: center;

  padding: var(--space-2) var(--space-3);
  font-weight: var(--font-semibold);
  font-size: var(--text-base);
  line-height: 1;

  background: var(--primary);
  color: var(--primary-contrast);

  &[disabled] {
    @include disabled;
  }
}

.base-button--secondary {
  background: transparent;
  border-color: var(--border);
  color: var(--text);

  &:hover:not(:disabled) {
    background: var(--surface-2);
  }
  
}

.base-button--danger {
  background: var(--danger);
  color: var(--danger-contrast, #fff);
}
</style>
