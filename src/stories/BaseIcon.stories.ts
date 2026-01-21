import type { Meta } from '@storybook/vue3'
import BaseIcon from '@/shared/components/BaseIcon.vue'

const meta = {
  title: 'Components/BaseIcon',
  component: BaseIcon,
  tags: ['autodocs'],
  argTypes: {
    name: {
      control: 'select',
      options: ['bowling', 'cart', 'fav', 'login', 'logout'],
    },
    size: { control: 'number' },
    color: { control: 'color' },
    decorative: { control: 'boolean' },
    ariaLabel: { control: 'text' },
  },
  args: {
    name: 'cart',
    size: 24,
    color: 'currentColor',
    decorative: true,
    ariaLabel: '',
  },
} satisfies Meta<typeof BaseIcon>

export default meta
