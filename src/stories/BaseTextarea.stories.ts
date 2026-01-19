import type { Meta, StoryObj } from '@storybook/vue3'
import { ref } from 'vue'
import BaseTextarea from '@/shared/components/BaseTextarea.vue'

const meta = {
  title: 'Components/BaseTextarea',
  component: BaseTextarea,
  tags: ['autodocs'],
  argTypes: {
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
    },
    rows: {
      control: 'number'
    }
  },
  args: {
    size: 'md',
    disabled: false,
    readonly: false,
    required: false,
    placeholder: 'Enter text...',
    rows: 4
  }
} satisfies Meta<typeof BaseTextarea>

export default meta
type Story = StoryObj<typeof meta>

export const Interactive: Story = {
  render: (args) => ({
    components: { BaseTextarea },
    setup() {
      const value = ref('')
      return { args, value }
    },
    template: '<BaseTextarea v-bind="args" v-model="value" style="max-width: 400px;" />'
  })
}

export const AllStates: Story = {
  render: () => ({
    components: { BaseTextarea },
    setup() {
      const text = ref('')
      const disabledValue = ref('Disabled')
      const readonlyValue = ref('Readonly')
      return { text, disabledValue, readonlyValue }
    },
    template: `
      <div style="display: flex; flex-direction: column; gap: 1rem; max-width: 400px;">
        <BaseTextarea v-model="text" placeholder="Normal" :rows="3" />
        <BaseTextarea size="sm" placeholder="Small" :rows="3" />
        <BaseTextarea size="lg" placeholder="Large" :rows="3" />
        <BaseTextarea v-model="disabledValue" disabled :rows="3" />
        <BaseTextarea v-model="readonlyValue" readonly :rows="3" />
      </div>
    `
  })
}
