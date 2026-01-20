import type { Meta, StoryObj } from '@storybook/vue3'
import PageHeading from '@/shared/components/PageHeading.vue'
import BaseButton from '@/shared/components/BaseButton.vue'

const meta = {
  title: 'Components/PageHeading',
  component: PageHeading,
  tags: ['autodocs'],
  argTypes: {
    title: {
      control: 'text'
    },
    subtitle: {
      control: 'text'
    },
    titleLevel: {
      control: 'select',
      options: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6']
    }
  },
  args: {
    title: 'Page Title',
    subtitle: 'Page subtitle or description',
    titleLevel: 'h1'
  }
} satisfies Meta<typeof PageHeading>

export default meta
type Story = StoryObj<typeof meta>

export const Interactive: Story = {
  render: (args) => ({
    components: { PageHeading, BaseButton },
    setup() {
      return { args }
    },
    template: `
      <PageHeading v-bind="args">
        <BaseButton>Action Button</BaseButton>
      </PageHeading>
    `
  })
}

export const Examples: Story = {
  render: () => ({
    components: { PageHeading, BaseButton },
    template: `
      <div style="display: flex; flex-direction: column; gap: 2rem;">
        <PageHeading title="Dashboard" subtitle="Welcome to your dashboard" />
        <PageHeading title="Products" subtitle="Manage your catalog">
          <BaseButton>Add Product</BaseButton>
        </PageHeading>
        <PageHeading title="Simple Title" />
      </div>
    `
  })
}
