<template>
  <div class="base-toggle" :class="{ 'is-disabled': props.disabled }">
    <span v-if="props.leftLabel || $slots.left" class="base-toggle__side">
      <slot name="left">{{ props.leftLabel }}</slot>
    </span>

    <button
      type="button"
      class="base-toggle__switch"
      :class="{ 'is-on': model }"
      role="switch"
      :aria-checked="model"
      :aria-label="props.ariaLabel"
      :disabled="props.disabled"
      @click="toggle"
    >
      <span class="base-toggle__thumb" aria-hidden="true" />
    </button>

    <span v-if="props.rightLabel || $slots.right" class="base-toggle__side">
      <slot name="right">{{ props.rightLabel }}</slot>
    </span>
  </div>
</template>

<script setup lang="ts">
import type { ToggleProps } from '@/shared/types/ui-kit/toggle'

const props = withDefaults(defineProps<ToggleProps>(), {
  disabled: false,
  leftLabel: '',
  rightLabel: '',
  ariaLabel: '',
})

const model = defineModel<boolean>({ default: false })

function toggle() {
  if (props.disabled) return
  model.value = !model.value
}
</script>

<style scoped lang="scss">
@use '@/assets/styles/mixins' as *;

.base-toggle {
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);

  &.is-disabled {
    opacity: 0.6;
  }
}

.base-toggle__side {
  display: inline-flex;
  align-items: center;
  color: var(--text);
  font-size: var(--text-sm);
  gap: var(--space-1);
}

.base-toggle__switch {
  @include shape-base;
  @include interactive;

  width: 44px;
  height: 24px;
  padding: 2px;

  display: inline-flex;
  align-items: center;

  border-color: var(--border);
  background: var(--surface-2);

  &[disabled] {
    @include disabled;
  }

  &.is-on {
    background: var(--success);
    border-color: var(--success);
  }
}

.base-toggle__thumb {
  width: 18px;
  height: 18px;
  border-radius: var(--radius-full);
  background: var(--surface);
  box-shadow: var(--shadow-sm);
  transition: transform var(--transition-fast);
  transform: translateX(0);
}

.base-toggle__switch.is-on .base-toggle__thumb {
  background: var(--success-contrast);
  transform: translateX(20px);
}
</style>
