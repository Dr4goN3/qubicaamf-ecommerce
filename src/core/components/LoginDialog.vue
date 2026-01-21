<template>
  <BaseDialog v-model="isOpen" :aria-label="t('header.login')">
    <template #title>{{ t('header.login') }}</template>

    <div class="login-dialog__demo">
      <label class="login-dialog__label" for="login-dialog-demo-user">
        {{ t('auth.demoUserLabel') }}
      </label>
      <BaseSelect
        id="login-dialog-demo-user"
        v-model="selectedUsername"
        :options="userOptions"
        :placeholder="t('auth.demoUserPlaceholder')"
        :disabled="isUsersLoading"
      />

      <p v-if="usersError" class="login-dialog__demo-error">{{ usersError }}</p>
    </div>

    <div class="divider login-dialog__divider" aria-hidden="true" />

    <form id="login-dialog-form" class="login-dialog__form" @submit.prevent="onSubmit">
      <div class="login-dialog__field">
        <label class="login-dialog__label" for="login-dialog-username">{{
          t('auth.username')
        }}</label>
        <BaseInput
          id="login-dialog-username"
          v-model="credentials.username"
          autocomplete="username"
          required
        />
      </div>

      <div class="login-dialog__field">
        <label class="login-dialog__label" for="login-dialog-password">{{
          t('auth.password')
        }}</label>
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
import { computed, ref, watch } from 'vue'
import type { UserCredentials } from '@/shared/types/auth'
import BaseDialog from '@/shared/components/BaseDialog.vue'
import BaseInput from '@/shared/components/BaseInput.vue'
import BaseButton from '@/shared/components/BaseButton.vue'
import BaseSelect from '@/shared/components/BaseSelect.vue'
import { getUsers } from '@/core/services/user.api'
import type { UserWithPassword } from '@/shared/types/user'

const emit = defineEmits<{
  submit: [credentials: UserCredentials]
}>()

const isOpen = defineModel<boolean>({ default: false })
const credentials = defineModel<UserCredentials>('credentials', {
  default: () => ({ username: '', password: '' })
})

const { t } = useI18n()

const users = ref<UserWithPassword[]>([])
const isUsersLoading = ref(false)
const usersError = ref<string | null>(null)
const selectedUsername = ref<string>('')

const userOptions = computed(() =>
  users.value.map((user) => ({
    label: user.username,
    value: user.username
  }))
)

async function loadUsers() {
  isUsersLoading.value = true
  usersError.value = null

  try {
    users.value = await getUsers()
  } catch {
    users.value = []
    usersError.value = t('auth.demoUserLoadError')
  } finally {
    isUsersLoading.value = false
  }
}

watch(
  () => isOpen.value,
  (open) => {
    if (!open) return
    if (users.value.length) return
    loadUsers()
  }
)

watch(selectedUsername, (username) => {
  if (!username) return
  const selected = users.value.find((user) => user.username === username)
  credentials.value.username = username
  if (selected?.password) {
    credentials.value.password = selected.password
  }
})

function onSubmit() {
  emit('submit', { ...credentials.value })
}
</script>

<style scoped lang="scss">
.login-dialog {
  &__demo {
    display: grid;
    gap: var(--space-2);
    margin-bottom: var(--space-3);
  }

  &__demo-error {
    margin: 0;
    color: var(--danger);
    font-size: var(--text-sm);
  }

  &__divider {
    margin-bottom: var(--space-3);
  }

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
