import type { Meta, StoryObj } from '@storybook/vue3'
import { ref } from 'vue'
import BaseCheckbox from '@/shared/components/BaseCheckbox.vue'

const meta = {
  title: 'Components/BaseCheckbox',
  component: BaseCheckbox,
  tags: ['autodocs'],
  argTypes: {
    disabled: {
      control: 'boolean'
    },
    required: {
      control: 'boolean'
    },
    label: {
      control: 'text'
    }
  },
  args: {
    disabled: false,
    required: false,
    label: 'Checkbox label'
  }
} satisfies Meta<typeof BaseCheckbox>

export default meta
type Story = StoryObj<typeof meta>

export const Interactive: Story = {
  render: (args) => ({
    components: { BaseCheckbox },
    setup() {
      const checked = ref(false)
      return { args, checked }
    },
    template: '<BaseCheckbox v-bind="args" v-model="checked" />'
  })
}

export const AllStates: Story = {
  render: () => ({
    components: { BaseCheckbox },
    setup() {
      const checked = ref(false)
      const checkedTrue = ref(true)
      const disabledChecked = ref(false)
      const disabledCheckedTrue = ref(true)
      return { checked, checkedTrue, disabledChecked, disabledCheckedTrue }
    },
    template: `
      <div style="display: flex; flex-direction: column; gap: 1rem;">
        <BaseCheckbox v-model="checked" label="Unchecked" />
        <BaseCheckbox v-model="checkedTrue" label="Checked" />
        <BaseCheckbox v-model="disabledChecked" label="Disabled" disabled />
        <BaseCheckbox v-model="disabledCheckedTrue" label="Checked & Disabled" disabled />
      </div>
    `
  })
}
