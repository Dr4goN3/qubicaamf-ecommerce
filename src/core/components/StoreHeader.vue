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
          QS
        </div>
        <span class="store-header__name">{{ storeName }}</span>
      </RouterLink>
    </div>

	    <div class="store-header__actions" aria-label="Azioni rapide">
	      <slot name="actions">
          <!-- Wishlist  -->
	        <BaseTooltip v-if="isAuthenticated" :text="t('header.wishlist')" position="bottom">
	          <BaseButton variant="secondary" :aria-label="t('header.wishlist')">
	            <BaseIcon name="fav" :size="18" class="store-header__icon" aria-hidden="true" />
	            <BaseBadge
	              v-if="wishlistCount"
	              :count="wishlistCount"
	              class="store-header__badge"
	              aria-hidden="true"
	            />
	          </BaseButton>
	        </BaseTooltip>

          <!-- Cart  -->
	        <BaseTooltip v-if="isAuthenticated" :text="t('header.cart')" position="bottom">
	          <BaseButton variant="secondary" :aria-label="t('header.cart')">
	            <BaseIcon name="cart" :size="18" class="store-header__icon" aria-hidden="true" />
	            <BaseBadge
	              v-if="cartCount"
	              :count="cartCount"
	              class="store-header__badge"
	              aria-hidden="true"
	            />
	          </BaseButton>
	        </BaseTooltip>

            <!-- Auth Controls: Login/Logout and Settings -->
           <div class="store-header__auth-controls">
            <HeaderSettingsMenu v-model:language="language" v-model:theme="theme" />
	          <BaseTooltip :text="isAuthenticated ? t('header.logout') : t('header.login')" position="bottom">
	            <BaseButton
	              :variant="isAuthenticated ? 'danger' : 'success'"
	              :aria-label="isAuthenticated ? t('header.logout') : t('header.login')"
	            >
	              <BaseIcon
	                :name="isAuthenticated ? 'logout' : 'login'"
	                :size="18"
	                class="store-header__icon"
	                aria-hidden="true"
	              />
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
          <RouterLink :to="category.to" class="store-header__nav-link">
            {{ category.label }}
          </RouterLink>
        </li>
      </ul>
    </slot>
  </nav>
</header>
</template>

<script setup lang="ts">
import { toRefs } from 'vue'
import { RouterLink } from 'vue-router'
import { useI18n } from 'vue-i18n'
import type { HeaderProps } from '@/core/types/header'
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
})

const { storeName, logoSrc, categories, isAuthenticated, cartCount, wishlistCount } = toRefs(props)

const language = defineModel<Language>('language', { default: LANGUAGE.Italian })
const theme = defineModel<Theme>('theme', { default: THEME.Light })
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
}

.store-header__top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-4);
  flex-wrap: wrap;
}

.store-header__brand {
  display: flex;
  align-items: center;
  gap: var(--space-4);
  min-width: 0;
  flex: 1 1 auto;
}

.store-header__home {
  display: inline-flex;
  align-items: center;
  gap: var(--space-3);
  color: inherit;
  text-decoration: none;
  font-weight: var(--font-semibold);
}

.store-header__logo {
  width: 40px;
  height: 40px;
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

.store-header__name {
  font-size: var(--text-lg);
  white-space: nowrap;
}

.store-header__nav {
  display: flex;
  align-items: center;
  justify-content: center;
}

.store-header__nav-list {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  flex-wrap: wrap;
  justify-content: center;
  list-style: none;
  padding: 0;
  margin: 0;
}

.store-header__nav-link {
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
}

.store-header__actions {
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
  flex-wrap: wrap;
  justify-content: flex-end;
  flex: 1 1 auto;
}

.store-header__badge {
  margin-left: var(--space-1);
}

.store-header__icon {
  margin-right: 0;
}

.store-header__auth-controls {
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
}

.store-header__divider {
  opacity: 0.9;
}

@media (max-width: $breakpoint-mobile) {
  .store-header {
    flex-direction: column;
    align-items: center;
  }

  .store-header__brand {
    width: 100%;
    justify-content: start;
    gap: var(--space-3);
  }

  .store-header__nav {
    width: 100%;
  }

  .store-header__actions {
    width: 100%;
    justify-content: center;
    flex-wrap: wrap;
    gap: var(--space-2);
  }
}
</style>
