import type { Meta, StoryObj } from '@storybook/vue3'
import { ref } from 'vue'
import BaseInput from '@/shared/components/BaseInput.vue'

const meta = {
  title: 'Components/BaseInput',
  component: BaseInput,
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: 'select',
      options: ['text', 'email', 'password', 'number']
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg']
    },
    disabled: {
      control: 'boolean'
    },
    readonly: {
      control: 'boolean'
    },
    required: {
      control: 'boolean'
    },
    placeholder: {
      control: 'text'
    }
  },
  args: {
    type: 'text',
    size: 'md',
    disabled: false,
    readonly: false,
    required: false,
    placeholder: 'Enter text...'
  }
} satisfies Meta<typeof BaseInput>

export default meta
type Story = StoryObj<typeof meta>

export const Interactive: Story = {
  render: (args) => ({
    components: { BaseInput },
    setup() {
      const value = ref('')
      return { args, value }
    },
    template: '<BaseInput v-bind="args" v-model="value" style="max-width: 400px;" />'
  })
}

export const AllStates: Story = {
  render: () => ({
    components: { BaseInput },
    setup() {
      const text = ref('')
      const email = ref('')
      const password = ref('')
      const disabledValue = ref('Disabled')
      const readonlyValue = ref('Readonly')
      return { text, email, password, disabledValue, readonlyValue }
    },
    template: `
      <div style="display: flex; flex-direction: column; gap: 1rem; max-width: 400px;">
        <BaseInput v-model="text" placeholder="Text input" />
        <BaseInput v-model="email" type="email" placeholder="Email input" />
        <BaseInput v-model="password" type="password" placeholder="Password input" />
        <BaseInput size="sm" placeholder="Small" />
        <BaseInput size="lg" placeholder="Large" />
        <BaseInput v-model="disabledValue" disabled />
        <BaseInput v-model="readonlyValue" readonly />
      </div>
    `
  })
}
