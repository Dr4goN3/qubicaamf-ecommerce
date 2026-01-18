import type { StorybookConfig } from '@storybook/vue3-vite';

const config: StorybookConfig = {
  "stories": [
    "../src/**/*.mdx",
    "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"
  ],
  "addons": [
    "@chromatic-com/storybook",
    "@storybook/addon-vitest",
    "@storybook/addon-a11y",
    "@storybook/addon-docs"
  ],
  "framework": "@storybook/vue3-vite",
  async viteFinal(config) {
    const flattened: unknown[] = []
    const stack = [...(config.plugins ?? [])] as unknown[]

    while (stack.length) {
      const item = stack.shift()
      if (!item) continue
      if (Array.isArray(item)) {
        stack.unshift(...item)
        continue
      }
      flattened.push(item)
    }

    config.plugins = flattened.filter((plugin) => {
      if (!plugin || typeof plugin !== 'object' || !('name' in plugin)) return true
      const name = (plugin as { name?: unknown }).name
      return name !== 'vite-plugin-vue-devtools' && name !== 'vite-plugin-inspect'
    }) as typeof config.plugins

    return config
  },
};
export default config;
