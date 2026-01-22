import type { Meta, StoryObj } from '@storybook/vue3'
import BaseTable from '@/shared/components/BaseTable.vue'

const meta = {
  title: 'Components/BaseTable',
  component: BaseTable,
  tags: ['autodocs'],
  argTypes: {
    clickable: {
      control: 'boolean'
    }
  },
  args: {
    clickable: true
  }
} satisfies Meta<typeof BaseTable>

export default meta
type Story = StoryObj<typeof meta>

const sampleData = [
  { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'User' },
  { id: 3, name: 'Bob Johnson', email: 'bob@example.com', role: 'Editor' }
]

const columns = [
  { key: 'id', label: 'ID' },
  { key: 'name', label: 'Name' },
  { key: 'email', label: 'Email' },
  { key: 'role', label: 'Role' }
]

export const Interactive: Story = {
  args: {
    columns,
    data: sampleData,
    rowKey: 'id'
  },
  render: (args) => ({
    components: { BaseTable },
    setup() {
      const handleRowClick = (row: Record<string, unknown>) => {
        alert(`Clicked: ${row.name}`)
      }
      return { args, handleRowClick }
    },
    template: '<BaseTable v-bind="args" @row-click="handleRowClick" />'
  })
}

export const Example: Story = {
  args: {
    columns,
    data: sampleData,
    clickable: false,
    rowKey: 'id'
  }
}
