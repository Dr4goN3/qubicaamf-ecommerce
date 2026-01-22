<template>
  <div ref="rootRef" class="header-settings">
    <BaseTooltip :text="t('header.settings')" position="bottom" :disabled="!isCompactActions">
      <BaseButton
        class="header-settings__trigger"
        variant="secondary"
        :aria-label="t('header.settings')"
        :aria-expanded="isOpen"
        aria-controls="header-settings-panel"
        @click="toggle"
      >
        <BaseIcon name="settings" :size="18" aria-hidden="true" />
        <span class="header-settings__trigger-text">{{ t('header.settings') }}</span>
      </BaseButton>
    </BaseTooltip>

    <div v-if="isOpen" class="header-settings__backdrop" aria-hidden="true" @click="close" />

    <Transition name="header-settings-fade">
      <div
        v-if="isOpen"
        id="header-settings-panel"
        class="header-settings__panel"
        role="dialog"
        :aria-label="t('header.settings')"
      >
        <!-- Language Selection -->
        <div class="header-settings__row">
          <label class="header-settings__label" for="header-settings-language">
            {{ t('header.languageLabel') }}
          </label>
          <BaseSelect
            id="header-settings-language"
            v-model="language"
            class="header-settings__control"
            variant="line"
            size="sm"
            :aria-label="t('header.languageLabel')"
            :options="languageOptions"
          />
        </div>

        <!-- Theme Selection -->
        <div class="header-settings__row">
          <span class="header-settings__label">
            {{ t('header.themeLabel') }}
          </span>
          <BaseTooltip :text="themeTooltipText" position="left" :disabled="isMobile">
            <div class="header-settings__theme-control">
              <BaseToggle
                class="header-settings__control"
                v-model="isDark"
                :aria-label="themeTooltipText"
              >
                <template #left>
                  <BaseIcon name="light" :size="16" color="#d97706" />
                </template>
                <template #right>
                  <BaseIcon name="dark" :size="16" color="#0b1220" />
                </template>
              </BaseToggle>
              <span v-if="isMobile" class="header-settings__value">
                {{ currentThemeLabel }}
              </span>
            </div>
          </BaseTooltip>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import { useMediaQuery } from '@vueuse/core'
import { useI18n } from 'vue-i18n'
import { LANGUAGE, type Language } from '@/core/constants/language.constants'
import { THEME, type Theme } from '@/core/constants/theme.constants'
import BaseButton from '@/shared/components/BaseButton.vue'
import BaseIcon from '@/shared/components/BaseIcon.vue'
import BaseSelect from '@/shared/components/BaseSelect.vue'
import BaseToggle from '@/shared/components/BaseToggle.vue'
import BaseTooltip from '@/shared/components/BaseTooltip.vue'

const { t } = useI18n()

const language = defineModel<Language>('language', { default: LANGUAGE.Italian })

const props = withDefaults(
  defineProps<{
    theme: Theme
  }>(),
  { theme: THEME.Light }
)

const emit = defineEmits<{
  (e: 'themeChange', theme: Theme): void
}>()

const isCompactActions = useMediaQuery('(max-width: 768px)')
const isMobile = useMediaQuery('(max-width: 640px)')

const isOpen = ref(false)
const rootRef = ref<HTMLElement | null>(null)

const languageOptions = computed<{ label: string; value: Language }[]>(() => [
  { label: t('header.language.it'), value: LANGUAGE.Italian },
  { label: t('header.language.en'), value: LANGUAGE.English }
])

const currentThemeLabel = computed(() =>
  props.theme === THEME.Dark ? t('header.theme.dark') : t('header.theme.light')
)

const themeTooltipText = computed(() => {
  return `${t('header.themeLabel')}: ${currentThemeLabel.value}`
})

/**
 * Computed property to map Theme <-> boolean because BaseToggle works with boolean values.
 * Emits theme changes to the parent so it can apply the global theme.
 */
const isDark = computed({
  get: () => props.theme === THEME.Dark,
  set: (value: boolean) => {
    emit('themeChange', value ? THEME.Dark : THEME.Light)
  }
})

function close() {
  isOpen.value = false
}

function toggle() {
  isOpen.value = !isOpen.value
}

/**
 * Function to handle clicks outside the component to close the settings menu (accessibility)
 * @param event MouseEvent
 */
function onDocumentClick(event: MouseEvent) {
  if (!isOpen.value) return
  const target = event.target
  if (!(target instanceof Node)) return
  if (rootRef.value?.contains(target)) return
  close()
}

/**
 * Function to handle Escape key to close the settings menu (accessibility)
 * @param event KeyboardEvent
 */
function onDocumentKeydown(event: KeyboardEvent) {
  if (!isOpen.value) return
  if (event.key === 'Escape') close()
}

onMounted(() => {
  document.addEventListener('click', onDocumentClick, true)
  document.addEventListener('keydown', onDocumentKeydown)
})

onBeforeUnmount(() => {
  document.removeEventListener('click', onDocumentClick, true)
  document.removeEventListener('keydown', onDocumentKeydown)
})
</script>

<style scoped lang="scss">
@use '@/assets/styles/breakpoints' as *;

.header-settings {
  position: relative;
  display: inline-flex;
  align-items: center;

  &__trigger {
    gap: var(--space-2);
  }

  &__trigger-text {
    font-weight: var(--font-semibold);
    font-size: var(--text-sm);
    line-height: 1;
  }

  &__backdrop {
    display: none;
  }

  &__panel {
    position: absolute;
    top: calc(100% + var(--space-2));
    right: 0;
    min-width: 220px;
    max-width: min(320px, calc(100vw - var(--space-6)));
    padding: var(--space-3);
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: var(--radius-md);
    box-shadow: var(--shadow-md);
    z-index: 20;
  }

  &__row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: var(--space-3);
    min-width: 0;

    & + & {
      // add top margin to all rows except the first
      margin-top: var(--space-3);
    }
  }

  &__label {
    flex: 1 1 auto;
    font-size: var(--text-sm);
    color: var(--text-muted);
    white-space: nowrap;
  }

  &__control {
    flex: 0 0 auto;

    &.base-select {
      width: auto;
      max-width: 120px;
    }
  }

  &__theme-control {
    display: inline-flex;
    align-items: center;
    gap: var(--space-2);
  }

  &__value {
    font-size: var(--text-sm);
    color: var(--text-muted);
    white-space: nowrap;
  }
}

.header-settings-fade-enter-active,
.header-settings-fade-leave-active {
  transition:
    opacity var(--transition-fast),
    transform var(--transition-fast);
}

.header-settings-fade-enter-from,
.header-settings-fade-leave-to {
  opacity: 0;
  transform: translateY(-4px);
}

@media (max-width: $breakpoint-tablet) {
  .header-settings {
    &__trigger-text {
      display: none;
    }
  }
}

@media (max-width: $breakpoint-mobile) {
  .header-settings {
    &__backdrop {
      display: block;
      position: fixed;
      inset: 0;
      background: rgba(0, 0, 0, 0.35);
      z-index: 19;
    }

    &__panel {
      position: fixed;
      left: 0;
      right: 0;
      bottom: 0;
      top: auto;
      min-width: 0;
      max-width: none;
      border-bottom-left-radius: 0;
      border-bottom-right-radius: 0;
      padding-bottom: calc(var(--space-5) + env(safe-area-inset-bottom));
      max-height: min(70vh, calc(100vh - 120px));
      overflow: auto;
      z-index: 20;
    }
  }
}
</style>
