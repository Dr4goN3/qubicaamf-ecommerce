import type { Meta, StoryObj } from '@storybook/vue3'
import BaseTooltip from '@/shared/components/BaseTooltip.vue'
import BaseButton from '@/shared/components/BaseButton.vue'

const meta = {
  title: 'Components/BaseTooltip',
  component: BaseTooltip,
  tags: ['autodocs'],
  argTypes: {
    text: { control: 'text' },
    position: {
      control: 'select',
      options: ['top', 'right', 'bottom', 'left']
    },
    disabled: { control: 'boolean' }
  },
  args: {
    text: 'Tooltip text',
    position: 'top',
    disabled: false
  }
} satisfies Meta<typeof BaseTooltip>

export default meta
type Story = StoryObj<typeof meta>

export const Interactive: Story = {
  render: (args) => ({
    components: { BaseTooltip, BaseButton },
    setup() {
      return { args }
    },
    template: `
      <div style="padding: 48px; display: flex; justify-content: center;">
        <BaseTooltip v-bind="args">
          <BaseButton variant="secondary">Hover me</BaseButton>
        </BaseTooltip>
      </div>
    `
  })
}
