import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import { VitePWA } from 'vite-plugin-pwa'

// https://vite.dev/config/
import path from 'node:path'
import { storybookTest } from '@storybook/addon-vitest/vitest-plugin'
import { playwright } from '@vitest/browser-playwright'
const dirname =
  typeof __dirname !== 'undefined' ? __dirname : path.dirname(fileURLToPath(import.meta.url))

const enableStorybookVitest = process.env.VITEST_STORYBOOK === 'true'

const storybookPlugins = enableStorybookVitest
  ? await storybookTest({
      configDir: path.join(dirname, '.storybook'),
    })
  : []

export default defineConfig(() => {
  const isStorybook = process.env.STORYBOOK === 'true'

  return {
    plugins: [
      vue(),
      ...(isStorybook
        ? []
        : [
            VitePWA({
              injectRegister: 'auto',
              registerType: 'autoUpdate',
              includeAssets: ['bowling.svg'],
              manifest: {
                name: 'QubicaAMF Ecommerce',
                short_name: 'Ecommerce',
                start_url: '/',
                display: 'standalone',
                background_color: '#ffffff',
                theme_color: '#ffffff',
                icons: [
                  {
                    src: 'bowling.svg',
                    sizes: 'any',
                    type: 'image/svg+xml'
                  }
                ]
              },
              workbox: {
                runtimeCaching: [
                  {
                    urlPattern: /^https:\/\/fakestoreapi\.com\/products(\/.*)?$/i,
                    handler: 'StaleWhileRevalidate',
                    options: {
                      cacheName: 'api-products',
                      expiration: {
                        maxEntries: 60,
                        maxAgeSeconds: 60 * 60 * 24 * 7
                      },
                      cacheableResponse: { statuses: [0, 200] }
                    }
                  }
                ]
              }
            }),
            vueDevTools()
          ])
    ],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },
    ...(enableStorybookVitest
      ? {
          test: {
            projects: [
              {
                extends: true as const,
                plugins: storybookPlugins,
                test: {
                  name: 'storybook',
                  browser: {
                    enabled: true,
                    headless: true,
                    provider: playwright({}),
                    instances: [
                      {
                        browser: 'chromium' as const,
                      },
                    ],
                  },
                  setupFiles: ['.storybook/vitest.setup.ts'],
                },
              },
            ],
          },
        }
      : {}),
  }
})
