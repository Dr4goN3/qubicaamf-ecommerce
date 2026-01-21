import '@/assets/styles/global.scss'
import { createApp, watch } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './core/router'
import { i18n } from './core/i18n/i18n'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(i18n)

watch(
  () => i18n.global.locale.value,
  (locale) => {
    document.documentElement.lang = locale
  },
  { immediate: true }
)

app.mount('#app')
