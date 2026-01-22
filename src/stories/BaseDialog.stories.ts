import type { Meta, StoryObj } from '@storybook/vue3'
import { ref } from 'vue'
import BaseDialog from '@/shared/components/BaseDialog.vue'
import BaseButton from '@/shared/components/BaseButton.vue'

const meta = {
  title: 'Components/BaseDialog',
  component: BaseDialog,
  tags: ['autodocs'],
  argTypes: {
    width: { control: 'text' },
    height: { control: 'text' },
    ariaLabel: { control: 'text' },
    closeOnBackdrop: { control: 'boolean' },
    closeOnEsc: { control: 'boolean' }
  },
  args: {
    ariaLabel: 'Dialog',
    closeOnBackdrop: true,
    closeOnEsc: true
  }
} satisfies Meta<typeof BaseDialog>

export default meta
type Story = StoryObj<typeof meta>

export const Interactive: Story = {
  render: (args) => ({
    components: { BaseDialog, BaseButton },
    setup() {
      const isOpen = ref(false)
      return { args, isOpen }
    },
    template: `
      <div style="padding: 24px;">
        <BaseButton @click="isOpen = true">Open dialog</BaseButton>

        <BaseDialog v-model="isOpen" v-bind="args">
          <template #title>
            Title
          </template>

          <p>
            Test Body
          </p>

          <template #footer>
            <BaseButton variant="secondary" @click="isOpen = false">Cancel</BaseButton>
            <BaseButton @click="isOpen = false">Confirm</BaseButton>
          </template>
        </BaseDialog>
      </div>
    `
  })
}

export const FixedSize: Story = {
  args: {
    width: 480,
    height: 280
  },
  render: (args) => ({
    components: { BaseDialog, BaseButton },
    setup() {
      const isOpen = ref(true)
      return { args, isOpen }
    },
    template: `
      <div style="padding: 24px;">
        <BaseDialog v-model="isOpen" v-bind="args">
          <template #title>
            Fixed size
          </template>

          <p>
            Test body
          </p>

          <template #footer>
            <BaseButton variant="secondary" @click="isOpen = false">Close</BaseButton>
          </template>
        </BaseDialog>
      </div>
    `
  })
}
