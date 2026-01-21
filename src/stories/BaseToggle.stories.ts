import type { Meta, StoryObj } from '@storybook/vue3'
import { ref } from 'vue'
import BaseToggle from '@/shared/components/BaseToggle.vue'

const meta = {
  title: 'Components/BaseToggle',
  component: BaseToggle,
  tags: ['autodocs'],
  argTypes: {
    disabled: { control: 'boolean' },
    leftLabel: { control: 'text' },
    rightLabel: { control: 'text' },
    ariaLabel: { control: 'text' }
  },
  args: {
    disabled: false,
    leftLabel: 'Off',
    rightLabel: 'On',
    ariaLabel: 'Toggle'
  }
} satisfies Meta<typeof BaseToggle>

export default meta
type Story = StoryObj<typeof meta>

export const Interactive: Story = {
  render: (args) => ({
    components: { BaseToggle },
    setup() {
      const value = ref(false)
      return { args, value }
    },
    template: `
      <div style="display: flex; flex-direction: column; gap: 12px;">
        <BaseToggle v-bind="args" v-model="value" />
        <div style="color: var(--text-muted); font-size: 14px;">
          Value: {{ value }}
        </div>
      </div>
    `
  })
}
