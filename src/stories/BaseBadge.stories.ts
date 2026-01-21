import type { Meta, StoryObj } from '@storybook/vue3'
import BaseBadge from '@/shared/components/BaseBadge.vue'
import { BadgeColors } from '@/shared/types/ui-kit/badge'

const meta = {
  title: 'Components/BaseBadge',
  component: BaseBadge,
  tags: ['autodocs'],
  argTypes: {
    count: { control: { type: 'number', min: 0, step: 1 } },
    color: { control: 'select', options: Object.values(BadgeColors) }
  },
  args: {
    count: 3,
    color: BadgeColors.RED
  },
  decorators: [
    () => ({
      template:
        '<div style="width: 32px; height: 32px; display: inline-flex; align-items: center; justify-content: center;"><story /></div>'
    })
  ]
} satisfies Meta<typeof BaseBadge>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
