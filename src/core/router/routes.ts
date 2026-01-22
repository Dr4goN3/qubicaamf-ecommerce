import type { RouteRecordRaw } from 'vue-router'
import { RouteName } from './route-names'

export const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: RouteName.Home,
    component: () => import('@/features/home/views/HomeView.vue')
  },
  {
    path: '/product/:id',
    name: RouteName.Product,
    component: () => import('@/features/product/views/ProductView.vue'),
    props: (route) => ({ id: String(route.params.id) })
  },
  {
    path: '/cart',
    name: RouteName.Cart,
    component: () => import('@/features/cart/views/CartView.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/wishlist',
    name: RouteName.Wishlist,
    component: () => import('@/features/wishlist/views/WishlistView.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: { name: RouteName.Home }
  }
]
