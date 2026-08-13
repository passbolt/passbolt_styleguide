/** @type { import('@storybook/react-webpack5').StorybookConfig } */
const config = {
  stories: [
    "./stories/**/*.mdx",
    "./stories/**/*.stories.@(js|jsx|ts|tsx)",
    "../src/**/*.mdx",
    "../src/**/*.stories.@(js|jsx|ts|tsx)",
  ],

  addons: [
    "@storybook/addon-docs",
    "@storybook/addon-webpack5-compiler-swc",
  ],

  core: {
    disableTelemetry: true,
  },

  staticDirs: ["../src", { from: "../src", to: "/webAccessibleResources" }, { from: "../build/css", to: "/css" }],

  env: (config) => ({
    ...config,
    ORIGIN_URL: "https://passbolt.github.io/passbolt_styleguide",
  }),

  framework: {
    name: "@storybook/react-webpack5",
  },

  webpackFinal: async (config) => {
    // Find Storybook's built-in asset rule handling SVG files by behavior (its test regexp
    // matches ".svg"), so the lookup survives internal renames across Storybook versions.
    const fileLoaderRule = config.module?.rules?.find(
      (rule) => rule instanceof Object && rule.test instanceof RegExp && rule.test.test(".svg"),
    );
    if (!fileLoaderRule) {
      throw new Error(
        "Storybook's built-in SVG file loader rule was not found: the @svgr/webpack override in .storybook/main.js must be updated for this Storybook version.",
      );
    }

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
                    name: "preset-default",
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
                    name: "prefixIds",
                    params: {
                      prefixIds: false,
                      prefixClassNames: false,
                    },
                  },
                ],
              },
            },
          },
        ],
      },
    );

    // Modify the file loader rule to ignore *.svg, since we have it handled now.
    fileLoaderRule.exclude = /\.svg$/i;

    return config;
  },

  features: {
    backgrounds: false
  }
};

export default config;
