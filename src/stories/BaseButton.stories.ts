import type { Meta, StoryObj } from '@storybook/vue3'
import BaseButton from '@/shared/components/BaseButton.vue'

const meta = {
  title: 'Components/BaseButton',
  component: BaseButton,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'danger']
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg']
    },
    disabled: {
      control: 'boolean'
    }
  },
  args: {
    variant: 'primary',
    size: 'md',
    disabled: false
  }
} satisfies Meta<typeof BaseButton>

export default meta
type Story = StoryObj<typeof meta>

export const Interactive: Story = {
  render: (args) => ({
    components: { BaseButton },
    setup() {
      return { args }
    },
    template: '<BaseButton v-bind="args">Button Text</BaseButton>'
  })
}

export const AllVariants: Story = {
  render: () => ({
    components: { BaseButton },
    template: `
      <div style="display: flex; flex-wrap: wrap; gap: 1rem; align-items: center;">
        <BaseButton variant="primary">Primary</BaseButton>
        <BaseButton variant="secondary">Secondary</BaseButton>
        <BaseButton variant="danger">Danger</BaseButton>
        <BaseButton size="sm">Small</BaseButton>
        <BaseButton size="lg">Large</BaseButton>
        <BaseButton disabled>Disabled</BaseButton>
        <BaseButton variant="secondary" disabled>Disabled</BaseButton>
      </div>
    `
  })
}
