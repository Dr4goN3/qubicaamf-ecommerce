<template>
  <Teleport to="body">
    <div
      v-if="isOpen"
      class="base-dialog__backdrop"
      @click="handleBackdropClick"
    >
      <div
        ref="dialogRef"
        class="base-dialog"
        role="dialog"
        aria-modal="true"
        :aria-label="props.ariaLabel"
        :style="dialogStyle"
        tabindex="-1"
        @click.stop
        @keydown.esc="handleEsc"
      >
        <header class="base-dialog__header">
          <div v-if="$slots.title" class="base-dialog__title">
            <slot name="title" />
          </div>

          <BaseButton
            class="base-dialog__close"
            variant="secondary"
            size="sm"
            aria-label="Close dialog"
            @click="closeDialog"
          >
            ×
          </BaseButton>
        </header>

        <section class="base-dialog__body">
          <slot />
        </section>

        <footer v-if="$slots.footer" class="base-dialog__footer">
          <slot name="footer" />
        </footer>
      </div>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, ref, watch } from 'vue'
import BaseButton from '@/shared/components/BaseButton.vue'
import type { DialogProps, DialogSize } from '@/shared/types/ui-kit/dialog'

const isOpen = defineModel<boolean>({ default: false })

const props = withDefaults(defineProps<DialogProps>(), {
  ariaLabel: 'Dialog',
  closeOnBackdrop: true,
  closeOnEsc: true,
})

const dialogRef = ref<HTMLElement | null>(null)
const previousBodyOverflow = ref<string | null>(null)

/* Helper to convert size prop to CSS value */
const toCssSize = (value?: DialogSize) => (typeof value === 'number' ? `${value}px` : value)

const dialogStyle = computed(() => ({
  width: toCssSize(props.width),
  height: toCssSize(props.height),
}))

function closeDialog() {
  isOpen.value = false
}

function handleBackdropClick() {
  if (props.closeOnBackdrop) {
    closeDialog()
  }
}

function handleEsc() {
  if (!props.closeOnEsc) return
  closeDialog()
}

watch(
  () => isOpen.value,
  async (isOpen) => {
    if (isOpen) {
      previousBodyOverflow.value = document.body.style.overflow // Save current overflow
      document.body.style.overflow = 'hidden' // Prevent background scrolling
      await nextTick() // Wait for the dialog to be rendered
      dialogRef.value?.focus() // Focus the dialog for accessibility
      return
    }

    if (previousBodyOverflow.value !== null) { // Restore previous overflow
      document.body.style.overflow = previousBodyOverflow.value
      previousBodyOverflow.value = null
    }
  }
)

/**
 * Restore body overflow style on component unmount
 */
onBeforeUnmount(() => {
  if (previousBodyOverflow.value !== null) {
    document.body.style.overflow = previousBodyOverflow.value
  }
})
</script>

<style scoped lang="scss">
@use '@/assets/styles/mixins' as *;
@use '@/assets/styles/breakpoints' as *;

.base-dialog__backdrop {
  position: fixed;
  inset: 0;
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: var(--space-6);
  background: rgba(15, 23, 42, 0.6);
}

.base-dialog {
  width: auto;
  height: auto;
  max-width: min(640px, 100%);
  max-height: min(90vh, 100%);
  display: flex;
  flex-direction: column;
  background: var(--surface);
  color: var(--text);
  border: 1px solid var(--border);
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-lg);

  &:focus-visible {
    @include focus-ring;
  }
}

.base-dialog__header {
  padding: var(--space-4) var(--space-5);
  border-bottom: 1px solid var(--border);
  flex: 0 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-4);
}

.base-dialog__title {
  min-width: 0;
  font-weight: var(--font-semibold);
}

.base-dialog__close {
  width: 36px;
  height: 36px;
  flex: 0 0 auto;
  padding: 0;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 22px;
  line-height: 1;
}

.base-dialog__body {
  padding: var(--space-4) var(--space-5);
  flex: 1 1 auto;
  min-height: 0;
  overflow: auto;
}

.base-dialog__footer {
  padding: var(--space-3) var(--space-5);
  border-top: 1px solid var(--border);
  flex: 0 0 auto;
  display: flex;
  justify-content: flex-end;
  gap: var(--space-3);
}

@media (max-width: $breakpoint-mobile) {
  .base-dialog__backdrop {
    padding: 0;
  }

  .base-dialog {
    width: 100%;
    height: 100%;
    max-width: 100%;
    max-height: 100%;
    border-radius: 0;
  }
}

</style>
