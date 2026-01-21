import { createRouter, createWebHistory } from 'vue-router'
import { routes } from './routes'
import { registerAuthGuard } from './auth-guard'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior: () => ({ top: 0 }),
})

registerAuthGuard(router)

export default router
