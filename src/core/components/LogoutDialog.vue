<template>
  <BaseDialog v-model="isOpen" :aria-label="t('auth.logoutConfirmTitle')">
    <template #title>{{ t('auth.logoutConfirmTitle') }}</template>

    <p class="logout-dialog__text">{{ t('auth.logoutConfirmBody') }}</p>

    <template #footer>
      <BaseButton variant="secondary" @click="isOpen = false">
        {{ t('common.cancel') }}
      </BaseButton>
      <BaseButton variant="success" @click="emit('confirm')">
        {{ t('common.confirm') }}
      </BaseButton>
    </template>
  </BaseDialog>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import BaseDialog from '@/shared/components/BaseDialog.vue'
import BaseButton from '@/shared/components/BaseButton.vue'

const emit = defineEmits<{
  confirm: []
}>()

const isOpen = defineModel<boolean>({ default: false })
const { t } = useI18n()
</script>

<style scoped lang="scss">
.logout-dialog {
  &__text {
    color: var(--text);
  }
}
</style>
