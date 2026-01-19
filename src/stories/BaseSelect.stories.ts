import type { Meta, StoryObj } from '@storybook/vue3'
import { ref } from 'vue'
import BaseSelect from '@/shared/components/BaseSelect.vue'

const meta = {
  title: 'Components/BaseSelect',
  component: BaseSelect,
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    disabled: {
      control: 'boolean',
    },
    required: {
      control: 'boolean',
    },
    placeholder: {
      control: 'text',
    },
  },
  args: {
    size: 'md',
    disabled: false,
    required: false,
    placeholder: 'Select an option',
    options: [
      { label: 'test 1', value: 'value test 1' },
      { label: 'test 2', value: 'value test 2' },
      { label: "test 3", value: "value test 3" },
    ],
  },
} satisfies Meta<typeof BaseSelect>

export default meta
type Story = StoryObj<typeof meta>

export const Interactive: Story = {
  render: (args) => ({
    components: { BaseSelect },
    setup() {
      const value = ref('')
      return { args, value }
    },
    template: `
      <div style="max-width: 400px;">
        <BaseSelect v-bind="args" v-model="value" />
      </div>
    `,
  }),
}