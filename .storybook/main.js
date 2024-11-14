/** @type { import('@storybook/react-webpack5').StorybookConfig } */
const config = {
  stories: [
    "./stories/**/*.mdx",
    "./stories/**/*.stories.@(js|jsx|ts|tsx)",
    "../src/**/*.mdx",
    "../src/**/*.stories.@(js|jsx|ts|tsx)"
  ],
  addons: ["@storybook/addon-links", {
    name: "@storybook/addon-essentials",
    options: {
      backgrounds: false
    }
  }, "@storybook/addon-webpack5-compiler-swc"],
  core: {
    "disableTelemetry": true
  },

  "staticDirs": ['../src', {from: '../src', to: '/webAccessibleResources' }],

  "env": (config) => ({
    ...config,
    ORIGIN_URL: 'https://passbolt.github.io/passbolt_styleguide',
  }),

  framework: {
    name: "@storybook/react-webpack5",
    options: {fastRefresh: true}
  },
}

export default config;