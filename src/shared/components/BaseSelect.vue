<template>
  <select
    :disabled="props.disabled"
    :required="props.required"
    :class="selectClasses"
    v-model="model"
    v-bind="$attrs"
  >
    <option v-if="props.placeholder" disabled value="">
      {{ props.placeholder }}
    </option>
    <option
      v-for="option in props.options"
      :key="String(option.value)"
      :value="option.value"
      :disabled="option.disabled"
    >
      {{ option.label }}
    </option>
  </select>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { SelectProps, SelectValue } from '@/shared/types/ui-kit/select'

defineOptions({ inheritAttrs: false })

const props = withDefaults(defineProps<SelectProps>(), {
  variant: 'default',
  size: 'md',
  disabled: false,
  required: false,
  placeholder: ''
})

const model = defineModel<SelectValue | ''>({ default: '' })

const selectClasses = computed(() => [
  'base-select',
  `base-select--${props.size}`,
  `base-select--${props.variant}`
])
</script>

<style scoped lang="scss">
@use '@/assets/styles/mixins' as *;

.base-select {
  @include shape-base;
  @include input-interactions;

  display: block;
  width: 100%;
  cursor: pointer;
  border-color: var(--border);
  padding: var(--space-2) var(--space-3);
  font-size: var(--text-base);
  line-height: 1.5;
  background-color: var(--surface);
  color: var(--text);

  &[disabled] {
    @include input-disabled;
  }

  @include input-sizes;
}

.base-select--line {
  border: 0;
  border-bottom: 1px solid var(--border);
  border-radius: 0;
  background: transparent;
  padding-left: 0;
  padding-right: 0;
  color: var(--info, #0ea5e9);
  text-decoration: none;
  background-image: linear-gradient(currentColor, currentColor);
  background-repeat: no-repeat;
  background-position: 0 100%;
  background-size: 0 1px;
  transition:
    background-size var(--transition-fast),
    border-color var(--transition-fast),
    color var(--transition-fast);

  &:hover:not(:disabled) {
    border-bottom-color: transparent;
    background-size: 100% 1px;
  }

  &:focus-visible {
    @include focus-ring;
    border-bottom-color: transparent;
    background-size: 100% 1px;
  }
}
</style>
