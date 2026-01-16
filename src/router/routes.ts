import type { RouteRecordRaw } from 'vue-router'

export const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/features/home/views/HomeView.vue'),
  },
  {
    path: '/product/:id',
    name: 'product',
    component: () => import('@/features/product/views/ProductView.vue'),
    props: true,
  },
  {
    path: '/cart',
    name: 'cart',
    component: () => import('@/features/cart/views/CartView.vue'),
    meta: { requiresAuth: true },
  },
  {
    path: '/wishlist',
    name: 'wishlist',
    component: () => import('@/features/wishlist/views/WishlistView.vue'),
    meta: { requiresAuth: true },
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/',
  },
]
