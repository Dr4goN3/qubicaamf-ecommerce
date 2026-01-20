<template>
  <label class="base-checkbox" :class="{ 'is-disabled': props.disabled }">
    <input
      type="checkbox"
      :disabled="props.disabled"
      :required="props.required"
      class="base-checkbox__input"
      v-model="model"
      v-bind="$attrs"
    />
    <span class="base-checkbox__box"></span>
    <span v-if="props.label || $slots.default" class="base-checkbox__label">
      <slot>{{ props.label }}</slot>
    </span>
  </label>
</template>

<script setup lang="ts">
import type { CheckboxProps } from '@/shared/types/ui-kit/checkbox'

defineOptions({ inheritAttrs: false })

const props = withDefaults(defineProps<CheckboxProps>(), {
  disabled: false,
  required: false
})

const model = defineModel<boolean>({ default: false })
</script>

<style scoped lang="scss">
@use '@/assets/styles/mixins' as *;

.base-checkbox {
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
  cursor: pointer;
  user-select: none;

  &.is-disabled {
    cursor: not-allowed;
    opacity: 0.6;
  }

  &:not(.is-disabled):hover .base-checkbox__box {
    border-color: var(--primary);
  }
}

.base-checkbox__input {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}

.base-checkbox__box {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
  border: 2px solid var(--border);
  border-radius: var(--radius-sm);
  background: var(--surface);
  transition: border-color var(--transition-fast), background-color var(--transition-fast);
  flex-shrink: 0;

  &::after {
    content: '';
    width: 10px;
    height: 10px;
    background: var(--primary);
    border-radius: 2px;
    transform: scale(0);
    opacity: 0;
    transition: transform var(--transition-fast), opacity var(--transition-fast);
  }
}

.base-checkbox__input:checked + .base-checkbox__box {
  border-color: var(--primary);
  background: var(--surface);

  &::after {
    transform: scale(1);
    opacity: 1;
  }
}

.base-checkbox__input:focus-visible + .base-checkbox__box {
  @include focus-ring;
  border-color: var(--primary);
}

.base-checkbox__input:disabled + .base-checkbox__box {
  background: var(--surface-2);
}

.base-checkbox__label {
  font-size: var(--text-base);
  color: var(--text);
  line-height: 1.5;
}
</style>
