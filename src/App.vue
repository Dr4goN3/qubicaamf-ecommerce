<template>
  <div class="app-container">
    <div class="app-container__inner content-wrapper">
      <StoreHeader
        v-model:language="language"
        v-model:theme="theme"
        :storeName="'QubicaAMF Ecommerce'"
        :isAuthenticated="userStore.isAuthenticated"
        :categories="categories"
        :isCartActive="isCartActive"
        :isWishlistActive="isWishlistActive"
        @authClick="onAuthClick"
        @cartClick="onCartClick"
        @wishlistClick="onWishlistClick"
        :cartCount="cartCount"
        :wishlistCount="wishlistCount"
      />

      <router-view v-slot="{ Component, route: viewRoute }">
        <Transition name="view" mode="out-in">
          <component :is="Component" :key="viewRoute.fullPath" />
        </Transition>
      </router-view>
    </div>

    <LoginDialog v-model="isLoginOpen" v-model:credentials="credentials" @submit="onLoginSubmit" />
    <LogoutDialog v-model="isLogoutOpen" @confirm="onLogoutConfirm" />
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue'
import { storeToRefs } from 'pinia'
import { useI18n } from 'vue-i18n'
import { useRoute, useRouter } from 'vue-router'

import StoreHeader from '@/core/components/StoreHeader.vue'
import LoginDialog from '@/core/components/LoginDialog.vue'
import LogoutDialog from '@/core/components/LogoutDialog.vue'

import { getCategories } from '@/core/services/products.api'
import { RouteName } from '@/core/router/route-names'
import { LANGUAGE, type Language } from '@/core/constants/language.constants'

import { useUserStore } from '@/stores/user.store'
import { useCartStore } from '@/stores/cart.store'
import { useWishlistStore } from '@/stores/wishlist.store'
import { useThemeStore } from '@/stores/theme.store'

import type { HeaderCategoryLink } from '@/core/types/header'
import type { UserCredentials } from '@/shared/types/auth'

const userStore = useUserStore()
const cartStore = useCartStore()
const wishlistStore = useWishlistStore()
const themeStore = useThemeStore()
const router = useRouter()
const route = useRoute()

const { theme } = storeToRefs(themeStore)
const { count: cartCount } = storeToRefs(cartStore)
const { count: wishlistCount } = storeToRefs(wishlistStore)

const { locale, t } = useI18n()

const language = computed<Language>({
  get: () => (locale.value as Language) ?? LANGUAGE.Italian,
  set: (value) => {
    locale.value = value
  },
})

const categories = ref<HeaderCategoryLink[]>([])

const isCartActive = computed(() => route.name === RouteName.Cart)
const isWishlistActive = computed(() => route.name === RouteName.Wishlist)

const isLoginOpen = ref(false)
const isLogoutOpen = ref(false)
const credentials = ref<UserCredentials>({ username: '', password: '' })

async function loadCategories() {
  try {
    const list = await getCategories()
    categories.value = [
      { label: t('home.categories.all'), to: '/', category: null },
      ...list.map((category) => ({
        label: category,
        to: `/?category=${encodeURIComponent(category)}`,
        category,
      })),
    ]
  } catch {
    categories.value = []
  }
}

function onAuthClick() {
  if (userStore.isAuthenticated) {
    isLogoutOpen.value = true
    return
  }
  isLoginOpen.value = true
}

function onCartClick() {
  if (!userStore.isAuthenticated) {
    isLoginOpen.value = true
    return
  }

  router.push({ name: RouteName.Cart })
}

function onWishlistClick() {
  if (!userStore.isAuthenticated) {
    isLoginOpen.value = true
    return
  }

  router.push({ name: RouteName.Wishlist })
}

async function onLoginSubmit(value: UserCredentials) {
  await userStore.login(value)
  isLoginOpen.value = false
}

function onLogoutConfirm() {
  userStore.logout()
  cartStore.clear()
  wishlistStore.clear()
  isLogoutOpen.value = false
  router.push({ name: RouteName.Home })
}

onMounted(loadCategories)

watch(locale, () => {
  if (!categories.value.length) {
    loadCategories()
    return
  }

  const first = categories.value[0]
  if (!first) return
  categories.value[0] = { label: t('home.categories.all'), to: first.to, category: first.category }
})
</script>

<style lang="scss">
.app-container {
  padding-top: var(--space-6);
  padding-bottom: var(--space-6);
  min-height: 100vh;
}

.app-container__inner {
  display: flex;
  flex-direction: column;
  gap: var(--space-6);
}

.view-enter-active,
.view-leave-active {
  transition: opacity var(--transition-fast), transform var(--transition-fast);
}

.view-enter-from,
.view-leave-to {
  opacity: 0;
  transform: translateY(6px);
}

@media (prefers-reduced-motion: reduce) {
  .view-enter-active,
  .view-leave-active {
    transition: none;
  }
}
</style>
