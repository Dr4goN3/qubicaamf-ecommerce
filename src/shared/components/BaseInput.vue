<template>
  <input
    :type="type"
    :disabled="disabled"
    :required="required"
    :readonly="readonly"
    :placeholder="placeholder"
    :class="inputClasses"
    v-model="model"
  />
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { InputProps } from '@/shared/types/ui-kit/input'

const props = withDefaults(defineProps<InputProps>(), {
  type: 'text',
  size: 'md',
  disabled: false,
  required: false,
  readonly: false,
  placeholder: ''
})

const model = defineModel<string>({ default: '' })

const inputClasses = computed(() => ['base-input', `base-input--${props.size}`])
</script>

<style scoped lang="scss">
@use '@/assets/styles/mixins' as *;

.base-input {
  @include shape-base;
  @include input-interactions;
  display: block;
  width: 100%;
  border-color: var(--border);
  padding: var(--space-2) var(--space-3);
  font-size: var(--text-base);
  line-height: 1.5;
  background: var(--surface);
  color: var(--text);

  &::placeholder {
    color: var(--text-muted);
  }

  &[disabled] {
    @include input-disabled;
  }

  &[readonly] {
    cursor: default;
    background: var(--surface-2);
  }

  @include input-sizes;
}
</style>
