<template>
  <Teleport to="body">
    <div v-if="isOpen" class="base-loader" role="status" :aria-label="props.ariaLabel">
      <img class="base-loader__spinner" :src="loaderSrc" alt="" aria-hidden="true" />
      <span class="base-loader__label">{{ props.ariaLabel }}</span>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import loaderSrc from '@/assets/icons/bowling-2-loader-com.svg'

const isOpen = defineModel<boolean>({ default: false })

const props = withDefaults(
  defineProps<{
    ariaLabel?: string
  }>(),
  {
    ariaLabel: 'Loading'
  }
)
</script>

<style scoped lang="scss">
@use '@/assets/styles/mixins' as *;

@keyframes loader-spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.base-loader {
  position: fixed;
  inset: 0;
  z-index: 1000;
  display: grid;
  place-items: center;
  background: rgba(15, 23, 42, 0.25);
  backdrop-filter: blur(6px);
  -webkit-backdrop-filter: blur(6px);

  &__spinner {
    width: 64px;
    height: 64px;
    animation: loader-spin 900ms linear infinite;
    filter: brightness(0) invert(1);
  }

  &__label {
    @include sr-only;
  }
}

@media (prefers-reduced-motion: reduce) {
  .base-loader {
    &__spinner {
      animation-duration: 3000ms;
    }
  }
}
</style>
