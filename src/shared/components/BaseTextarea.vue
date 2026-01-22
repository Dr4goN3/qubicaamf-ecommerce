<template>
  <textarea
    :disabled="disabled"
    :required="required"
    :readonly="readonly"
    :placeholder="placeholder"
    :rows="rows"
    :class="textareaClasses"
    v-model="model"
  />
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { TextareaProps } from '@/shared/types/ui-kit/textarea'

const props = withDefaults(defineProps<TextareaProps>(), {
  size: 'md',
  disabled: false,
  required: false,
  readonly: false,
  placeholder: '',
  rows: 4
})

const model = defineModel<string>({ default: '' })

const textareaClasses = computed(() => ['base-textarea', `base-textarea--${props.size}`])
</script>

<style scoped lang="scss">
@use '@/assets/styles/mixins' as *;

.base-textarea {
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
  resize: vertical;
  min-height: 80px;

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
