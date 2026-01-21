<template>
<header
  class="store-header"
  role="banner"
>
  <div class="store-header__top">

    <!-- Brand Logo and Name -->
    <div class="store-header__brand">
      <RouterLink to="/" class="store-header__home">
        <div v-if="logoSrc" class="store-header__logo">
          <img :src="logoSrc" :alt="`${storeName} logo`" />
        </div>
        <div v-else class="store-header__logo store-header__logo--placeholder">
          <BaseIcon name="bowling" :size="22" aria-hidden="true" />
        </div>
        <span class="store-header__name">{{ storeName }}</span>
      </RouterLink>
    </div>

	    <div class="store-header__actions" aria-label="Azioni rapide">
	      <slot name="actions">
          <!-- Wishlist  -->
	        <BaseTooltip
            v-if="isAuthenticated"
            :text="t('header.wishlist')"
            position="bottom"
            :disabled="!isCompactActions"
          >
	          <BaseButton
              variant="secondary"
              :aria-label="t('header.wishlist')"
              @click="emit('wishlistClick')"
              class="store-header__action-button"
              :class="{ 'is-active': isWishlistActive }"
            >
	            <BaseIcon
                name="fav"
                :size="18"
                :key="wishlistAnimationKey"
                class="store-header__icon is-wishlist-pop"
                aria-hidden="true"
              />
              <span class="store-header__action-text">{{ t('header.wishlist') }}</span>
	            <BaseBadge
	              v-if="wishlistCount"
	              :count="wishlistCount"
	              :key="wishlistAnimationKey"
	              class="store-header__badge is-pulse"
	              aria-hidden="true"
	            />
	          </BaseButton>
	        </BaseTooltip>

          <!-- Cart  -->
	        <BaseTooltip v-if="isAuthenticated" :text="t('header.cart')" position="bottom" :disabled="!isCompactActions">
	          <BaseButton
              variant="secondary"
              :aria-label="t('header.cart')"
              @click="emit('cartClick')"
              class="store-header__action-button"
              :class="{ 'is-active': isCartActive }"
            >
	            <BaseIcon
                name="cart"
                :size="18"
                :key="cartAnimationKey"
                class="store-header__icon is-cart-shake"
                aria-hidden="true"
              />
              <span class="store-header__action-text">{{ t('header.cart') }}</span>
	            <BaseBadge
	              v-if="cartCount"
	              :count="cartCount"
	              :key="cartAnimationKey"
	              class="store-header__badge is-pulse"
	              aria-hidden="true"
	            />
	          </BaseButton>
	        </BaseTooltip>

            <!-- Auth Controls: Login/Logout and Settings -->
           <div class="store-header__auth-controls">
            <HeaderSettingsMenu v-model:language="language" :theme="theme" @themeChange="onThemeChange" />
            <BaseTooltip
              :text="isAuthenticated ? t('header.logout') : t('header.login')"
              position="bottom"
              :disabled="!isCompactActions"
            >
              <BaseButton
                :variant="isAuthenticated ? 'danger' : 'success'"
                :aria-label="isAuthenticated ? t('header.logout') : t('header.login')"
                @click="emit('authClick')"
              >
                <BaseIcon
                  :name="isAuthenticated ? 'logout' : 'login'"
                  :size="18"
                  class="store-header__icon"
                  aria-hidden="true"
                />
                <span class="store-header__action-text">
                  {{ isAuthenticated ? t('header.logout') : t('header.login') }}
                </span>
              </BaseButton>
            </BaseTooltip>
	        </div>
          
	      </slot>
	    </div>
	  </div>

  <div
    v-if="$slots.categories || categories.length"
    class="divider store-header__divider"
    aria-hidden="true"
  />

  <!--Categories Navigation-->
  <nav
    v-if="$slots.categories || categories.length"
    class="store-header__nav"
    aria-label="Categorie principali"
  >
    <slot name="categories">
      <ul class="store-header__nav-list">
        <li v-for="category in categories" :key="category.to">
          <RouterLink
            :to="category.to"
            class="store-header__nav-link"
            :class="{ 'is-active': isCategoryActive(category) }"
            :aria-current="isCategoryActive(category) ? 'page' : undefined"
          >
            {{ category.label }}
          </RouterLink>
        </li>
      </ul>
    </slot>
  </nav>
</header>
</template>

<script setup lang="ts">
import { ref, toRefs, watch } from 'vue'
import { useMediaQuery } from '@vueuse/core'
import { RouterLink, useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'
import type { HeaderCategoryLink, HeaderProps } from '@/core/types/header'
import { LANGUAGE, type Language } from '@/core/constants/language.constants'
import { THEME, type Theme } from '@/core/constants/theme.constants'
import HeaderSettingsMenu from '@/core/components/HeaderSettingsMenu.vue'
import BaseButton from '@/shared/components/BaseButton.vue'
import BaseBadge from '@/shared/components/BaseBadge.vue'
import BaseIcon from '@/shared/components/BaseIcon.vue'
import BaseTooltip from '@/shared/components/BaseTooltip.vue'

const { t } = useI18n()

const props = withDefaults(defineProps<HeaderProps>(), {
  categories: () => [],
  isAuthenticated: false,
  cartCount: 0,
  wishlistCount: 0,
  isCartActive: false,
  isWishlistActive: false,
})

const { storeName, logoSrc, categories, isAuthenticated, cartCount, wishlistCount, isCartActive, isWishlistActive } = toRefs(props)

const language = defineModel<Language>('language', { default: LANGUAGE.Italian })
const theme = defineModel<Theme>('theme', { default: THEME.Light })

const isCompactActions = useMediaQuery('(max-width: 768px)')

const emit = defineEmits<{
  authClick: []
  cartClick: []
  wishlistClick: []
}>()

const cartAnimationKey = ref(0)
const wishlistAnimationKey = ref(0)

function onThemeChange(nextTheme: Theme) {
  theme.value = nextTheme
}

const route = useRoute()

/**
 * Highlight the active category link based on the current route
 * @param categoryLink 
 */
function isCategoryActive(categoryLink: HeaderCategoryLink) {
  if (route.path === '/' && categoryLink.category !== undefined) {
    const currentCategory = typeof route.query.category === 'string' ? route.query.category : null
    return (categoryLink.category ?? null) === currentCategory
  }

  return route.path === categoryLink.to
}

watch(cartCount, (next, prev) => {
  if (next === prev) return
  cartAnimationKey.value += 1
})

watch(wishlistCount, (next, prev) => {
  if (next === prev) return
  wishlistAnimationKey.value += 1
})
</script>

<style scoped lang="scss">
@use '@/assets/styles/breakpoints' as *;

.store-header {
  position: sticky;
  top: 0;
  z-index: 10;
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
  padding: var(--space-4) var(--space-5);
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-sm);

  &__top {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: var(--space-4);
    flex-wrap: wrap;
  }

  &__brand {
    display: flex;
    align-items: center;
    gap: var(--space-4);
    min-width: 0;
    flex: 1 1 auto;
  }

  &__home {
    display: inline-flex;
    align-items: center;
    gap: var(--space-3);
    color: inherit;
    text-decoration: none;
    font-weight: var(--font-semibold);
    min-width: 0;
  }

  &__logo {
    width: 40px;
    height: 40px;
    min-width: 40px;
    min-height: 40px;
    flex: 0 0 40px;
    aspect-ratio: 1 / 1;
    border-radius: var(--radius-sm);
    overflow: hidden;
    background: var(--surface-2);
    display: grid;
    place-items: center;
    font-weight: var(--font-bold);
    color: var(--primary);
    border: 1px solid var(--border);
    box-shadow: var(--shadow-sm);

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    &--placeholder {
      letter-spacing: 1px;
    }
  }

  &__name {
    font-size: var(--text-lg);
    white-space: nowrap;
    min-width: 0;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  &__nav {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  &__nav-list {
    display: flex;
    align-items: center;
    gap: 0;
    flex-wrap: wrap;
    justify-content: center;
    list-style: none;
    padding: 0;
    margin: 0;

    > li {
      display: inline-flex;
      align-items: center;
    }

    > li + li {
      margin-left: var(--space-3);
      padding-left: var(--space-3);
      border-left: 1px solid var(--border);
    }
  }

  &__nav-link {
    color: var(--text-muted);
    text-decoration: none;
    font-weight: var(--font-medium);
    padding: var(--space-1) var(--space-2);
    border-radius: var(--radius-sm);
    transition: background var(--transition-fast), color var(--transition-fast);

    &:hover {
      background: var(--surface-2);
      color: var(--text);
    }

    &.is-active {
      background: var(--surface-2);
      color: var(--text);
    }
  }

  &__actions {
    display: inline-flex;
    align-items: center;
    gap: var(--space-2);
    flex-wrap: wrap;
    justify-content: flex-end;
    flex: 1 1 auto;
  }

  &__badge {
    margin-left: var(--space-1);

    &.is-pulse {
      animation: ui-pulse 280ms ease;
      transform-origin: center;
    }
  }

  &__icon {
    margin-right: var(--space-2);

    &.is-wishlist-pop {
      animation: ui-pop 260ms ease;
      transform-origin: center;
    }

    &.is-cart-shake {
      animation: ui-shake-x 320ms ease;
    }
  }

  &__action-button {
    &.base-button--secondary {
      &.is-active {
        background: var(--surface-2);
        border-color: var(--border-hover);
      }
    }
  }

  &__action-text {
    font-weight: var(--font-semibold);
    font-size: var(--text-sm);
    line-height: 1;
  }

  &__auth-controls {
    display: inline-flex;
    align-items: center;
    gap: var(--space-2);
  }

  &__divider {
    opacity: 0.9;
  }
}

@media (max-width: $breakpoint-tablet) {
  .store-header {
    &__action-text {
      display: none;
    }

    &__icon {
      margin-right: 0;
    }
  }
}

@media (max-width: $breakpoint-mobile) {
  .store-header {
    position: relative;
    flex-direction: column;
    align-items: center;

    &__brand {
      width: 100%;
      justify-content: start;
      gap: var(--space-3);
    }

    &__nav {
      width: 100%;
    }

    &__actions {
      width: 100%;
      justify-content: center;
      flex-wrap: wrap;
      gap: var(--space-2);
    }

    &__name {
      white-space: normal;
      overflow: visible;
      text-overflow: clip;
      overflow-wrap: anywhere;
    }
  }
}
</style>
