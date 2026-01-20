import '@/assets/styles/global.scss'
import { setup } from '@storybook/vue3'

import { i18n } from '@/core/i18n/i18n'

setup((app) => {
  app.use(i18n)
})

const preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },

    a11y: {
      test: 'todo',
    },
  },
}

export default preview
