import type { Meta, StoryObj } from '@storybook/vue3'
import { ref } from 'vue'
import LogoutDialog from '@/core/components/LogoutDialog.vue'
import BaseButton from '@/shared/components/BaseButton.vue'

const meta = {
  title: 'Core/LogoutDialog',
  component: LogoutDialog,
  tags: ['autodocs']
} satisfies Meta<typeof LogoutDialog>

export default meta
type Story = StoryObj<typeof meta>

export const Interactive: Story = {
  render: () => ({
    components: { LogoutDialog, BaseButton },
    setup() {
      const isOpen = ref(false)
      const confirmed = ref(false)

      function onConfirm() {
        confirmed.value = true
        isOpen.value = false
      }

      return { isOpen, confirmed, onConfirm }
    },
    template: `
      <div style="padding: 24px;">
        <BaseButton variant="danger" @click="isOpen = true">Open logout</BaseButton>
        <LogoutDialog v-model="isOpen" @confirm="onConfirm" />

        <p v-if="confirmed" style="margin-top: 16px;">Confirmed!</p>
      </div>
    `
  })
}
