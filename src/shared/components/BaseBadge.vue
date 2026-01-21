<template>
  <span
    class="badge-wrapper"
    :style="{ backgroundColor: props.color }"
    role="status"
    aria-hidden="true"
  >
    {{ props.count }}
  </span>
</template>

<script setup lang="ts">
import { BadgeColors, type BaseBadgeProps } from '@/shared/types/ui-kit/badge'

const props = withDefaults(defineProps<BaseBadgeProps>(), {
  count: 0,
  color: BadgeColors.RED,
})
</script>

<style scoped lang="scss">
.badge-wrapper {
  display: inline-grid;
  place-items: center;
  min-width: 1rem;
  min-height: 1rem;
  padding: 4px;
  aspect-ratio: 1;
  box-sizing: border-box;
  border-radius: 50%;
  font-size: var(--text-xs);
  font-weight: var(--font-bold);
  line-height: 1;
  color: var(--primary-contrast);
  background-color: var(--danger);
  text-align: center;
  vertical-align: middle;
}
</style>
