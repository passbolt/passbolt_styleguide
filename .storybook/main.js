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
  webpackFinal: async (config) => {
    const fileLoaderRule = config.module?.rules?.find((rule) => {
      if (rule instanceof Object && "test" in rule) {
        return rule.test?.toString().includes("svg");
      }
    });

    config.module?.rules?.push(
      // Reapply the existing rule, but only for svg imports ending in ?url
      {
        ...fileLoaderRule,
        test: /\.svg$/i,
        resourceQuery: /url/, // *.svg?url
      },
      // Convert all other *.svg imports to React components
      {
        test: /\.svg$/i,
        issuer: fileLoaderRule.issuer,
        resourceQuery: { not: [/url/] }, // exclude if *.svg?url
        use: [
          {
            loader: "@svgr/webpack",
              options: {
                svgoConfig: {
                  plugins: [
                    {
                      name: 'preset-default',
                      params: {
                        overrides: {
                          removeViewBox: false,
                          cleanupIds: false,
                          removeTitle: false,
                          removeDesc: false,
                        },
                      },
                    },
                    {
                      name: 'prefixIds',
                      params: {
                        prefixIds: false,
                        prefixClassNames: false
                      },
                    }
                  ],
                }
              }
          }
        ],
      },
    );

    // Modify the file loader rule to ignore *.svg, since we have it handled now.
    fileLoaderRule.exclude = /\.svg$/i;

    return config;
  },
}

export default config;