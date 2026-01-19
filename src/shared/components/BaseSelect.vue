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
  size: 'md',
  disabled: false,
  required: false,
  placeholder: '',
})

const model = defineModel<SelectValue | ''>({ default: '' })

const selectClasses = computed(() => ['base-select', `base-select--${props.size}`])
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
</style>
