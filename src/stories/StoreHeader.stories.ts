import type { Meta, StoryObj } from '@storybook/vue3'
import { setup } from '@storybook/vue3'
import { createMemoryHistory, createRouter } from 'vue-router'

import StoreHeader from '@/core/components/StoreHeader.vue'
import type { HeaderCategoryLink } from '@/core/types/header'

const router = createRouter({
  history: createMemoryHistory(),
  routes: [
    { path: '/', component: { template: '<div />' } },
    { path: '/categories/:slug', component: { template: '<div />' } },
    { path: '/:pathMatch(.*)*', component: { template: '<div />' } }
  ]
})

setup((app) => {
  app.use(router)
})

const categories: HeaderCategoryLink[] = [
  { label: 'New', to: '/categories/new' },
  { label: 'Popular', to: '/categories/popular' },
  { label: 'Accessories', to: '/categories/accessories' }
]

const meta = {
  title: 'Core/StoreHeader',
  component: StoreHeader,
  tags: ['autodocs'],
  argTypes: {
    storeName: { control: 'text' },
    logoSrc: { control: 'text' },
    isAuthenticated: { control: 'boolean' },
    cartCount: { control: 'number' },
    wishlistCount: { control: 'number' }
  },
  args: {
    storeName: 'QubicaAMF Store',
    logoSrc: '',
    isAuthenticated: false,
    cartCount: 0,
    wishlistCount: 0
  }
} satisfies Meta<typeof StoreHeader>

export default meta
type Story = StoryObj<typeof meta>

export const LoggedOut: Story = {
  render: (args) => ({
    components: { StoreHeader },
    setup() {
      return { args, categories }
    },
    template: '<StoreHeader v-bind="args" :categories="categories" />'
  })
}

export const LoggedIn: Story = {
  args: {
    isAuthenticated: true,
    cartCount: 3,
    wishlistCount: 2
  },
  render: (args) => ({
    components: { StoreHeader },
    setup() {
      return { args, categories }
    },
    template: '<StoreHeader v-bind="args" :categories="categories" />'
  })
}
