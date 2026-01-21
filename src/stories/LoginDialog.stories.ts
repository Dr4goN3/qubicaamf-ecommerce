import type { Meta, StoryObj } from '@storybook/vue3'
import { ref } from 'vue'
import LoginDialog from '@/core/components/LoginDialog.vue'
import BaseButton from '@/shared/components/BaseButton.vue'
import type { UserCredentials } from '@/shared/types/auth'

const meta = {
  title: 'Core/LoginDialog',
  component: LoginDialog,
  tags: ['autodocs']
} satisfies Meta<typeof LoginDialog>

export default meta
type Story = StoryObj<typeof meta>

export const Interactive: Story = {
  render: () => ({
    components: { LoginDialog, BaseButton },
    setup() {
      const isOpen = ref(false)
      const credentials = ref<UserCredentials>({ username: '', password: '' })
      const lastSubmit = ref<UserCredentials | null>(null)

      function onSubmit(value: UserCredentials) {
        lastSubmit.value = value
        isOpen.value = false
      }

      return { isOpen, credentials, lastSubmit, onSubmit }
    },
    template: `
      <div style="padding: 24px;">
        <BaseButton @click="isOpen = true">Open login</BaseButton>
        <LoginDialog v-model="isOpen" v-model:credentials="credentials" @submit="onSubmit" />

        <pre v-if="lastSubmit" style="margin-top: 16px; white-space: pre-wrap;">
{{ lastSubmit }}
        </pre>
      </div>
    `
  })
}
