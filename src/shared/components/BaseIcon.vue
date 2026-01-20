<template>
  <span
    class="base-icon"
    :style="iconStyle"
    :aria-hidden="props.decorative ? 'true' : undefined"
    :role="props.decorative ? undefined : 'img'"
    :aria-label="props.decorative ? undefined : computedLabel"
    v-html="svgHtml"
  />
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { ICON_SVGS } from '@/shared/constants/icons'
import type { IconProps, IconSize } from '@/shared/types/ui-kit/icon'

const props = withDefaults(defineProps<IconProps>(), {
  size: 20,
  decorative: true,
})

const toCssSize = (value: IconSize) => (typeof value === 'number' ? `${value}px` : value)

const computedLabel = computed(() => props.ariaLabel ?? props.name)

const iconStyle = computed(() => ({
  width: toCssSize(props.size),
  height: toCssSize(props.size),
  color: props.color ?? 'currentColor',
}))

const svgHtml = computed(() => ICON_SVGS[props.name] ?? '')
</script>

<style scoped lang="scss">
.base-icon {
  display: inline-block;
  flex: 0 0 auto;
}

.base-icon :deep(svg) {
  width: 100%;
  height: 100%;
  display: block;
}
</style>
