import type { Router } from 'vue-router'
import { useUserStore } from '@/stores/user.store'
import { RouteName } from './route-names'

export function registerAuthGuard(router: Router) {
  router.beforeEach((to) => {
    const userStore = useUserStore()
    const requiresAuth = Boolean(to.meta.requiresAuth)

    if (requiresAuth && !userStore.isAuthenticated) {
      return {
        name: RouteName.Home,
        query: { redirectTo: to.fullPath },
      }
    }

    return true
  })
}
