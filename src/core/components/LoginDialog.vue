<template>
  <BaseDialog v-model="isOpen" :aria-label="t('header.login')">
    <template #title>{{ t('header.login') }}</template>

    <form id="login-dialog-form" class="login-dialog__form" @submit.prevent="onSubmit">
      <div class="login-dialog__field">
        <label class="login-dialog__label" for="login-dialog-username">{{ t('auth.username') }}</label>
        <BaseInput
          id="login-dialog-username"
          v-model="credentials.username"
          autocomplete="username"
          required
        />
      </div>

      <div class="login-dialog__field">
        <label class="login-dialog__label" for="login-dialog-password">{{ t('auth.password') }}</label>
        <BaseInput
          id="login-dialog-password"
          v-model="credentials.password"
          type="password"
          autocomplete="current-password"
          required
        />
      </div>
    </form>

    <template #footer>
      <BaseButton variant="secondary" @click="isOpen = false">
        {{ t('common.cancel') }}
      </BaseButton>
      <BaseButton type="submit" variant="success" form="login-dialog-form">
        {{ t('auth.submit') }}
      </BaseButton>
    </template>
  </BaseDialog>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import type { UserCredentials } from '@/shared/types/auth'
import BaseDialog from '@/shared/components/BaseDialog.vue'
import BaseInput from '@/shared/components/BaseInput.vue'
import BaseButton from '@/shared/components/BaseButton.vue'

const emit = defineEmits<{
  submit: [credentials: UserCredentials]
}>()

const isOpen = defineModel<boolean>({ default: false })
const credentials = defineModel<UserCredentials>('credentials', {
  default: () => ({ username: '', password: '' }),
})

const { t } = useI18n()

function onSubmit() {
  emit('submit', { ...credentials.value })
}
</script>

<style scoped lang="scss">
.login-dialog {
  &__form {
    display: grid;
    gap: var(--space-4);
  }

  &__field {
    display: grid;
    gap: var(--space-2);
  }

  &__label {
    font-size: var(--text-sm);
    color: var(--text-muted);
  }
}
</style>
