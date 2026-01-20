<template>
  <span
    class="base-tooltip"
    :class="`base-tooltip--${props.position}`"
    @mouseenter="show = true"
    @mouseleave="show = false"
    @focusin="show = true"
    @focusout="show = false"
  >
    <slot />

    <Transition name="base-tooltip-fade">
      <span v-if="show && !props.disabled" class="base-tooltip__content" role="tooltip">
        {{ props.text }}
      </span>
    </Transition>
  </span>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { TooltipProps } from '@/shared/types/ui-kit/tooltip'

const props = withDefaults(defineProps<TooltipProps>(), {
  position: 'top',
  disabled: false,
})

const show = ref(false)
</script>

<style scoped lang="scss">
.base-tooltip {
  position: relative;
  display: inline-flex;
  align-items: center;
}

.base-tooltip__content {
  position: absolute;
  z-index: 1000;
  padding: var(--space-1) var(--space-2);
  border-radius: var(--radius-sm);
  background: var(--text);
  color: var(--bg);
  font-size: var(--text-sm);
  line-height: 1.2;
  white-space: nowrap;
  pointer-events: none;
  box-shadow: var(--shadow-sm);
}

.base-tooltip--top .base-tooltip__content {
  bottom: 100%;
  left: 50%;
  transform: translate(-50%, calc(-1 * var(--space-2)));
}

.base-tooltip--right .base-tooltip__content {
  left: 100%;
  top: 50%;
  transform: translate(var(--space-2), -50%);
}

.base-tooltip--bottom .base-tooltip__content {
  top: 100%;
  left: 50%;
  transform: translate(-50%, var(--space-2));
}

.base-tooltip--left .base-tooltip__content {
  right: 100%;
  top: 50%;
  transform: translate(calc(-1 * var(--space-2)), -50%);
}

.base-tooltip-fade-enter-active,
.base-tooltip-fade-leave-active {
  transition: opacity 140ms ease, transform 140ms ease;
}

.base-tooltip-fade-enter-from,
.base-tooltip-fade-leave-to {
  opacity: 0;
}

.base-tooltip-fade-enter-to,
.base-tooltip-fade-leave-from {
  opacity: 1;
}
</style>

