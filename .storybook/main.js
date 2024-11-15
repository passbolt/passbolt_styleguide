module.exports = {
  "stories": [
    "./stories/**/*.stories.mdx",
    "./stories/**/*.stories.@(js|jsx|ts|tsx)",
    "../src/**/*.stories.mdx",
    "../src/**/*.stories.@(js|jsx|ts|tsx)"
  ],
  "addons": [
    { name: "@storybook/addon-links" },
    {
      name: "@storybook/addon-essentials",
      options: {
        backgrounds: false
      }
    }
  ],
  "core": {
    "builder": "webpack5",
    "disableTelemetry": true,
  },
  "staticDirs": ['../src', {from: '../src', to: '/webAccessibleResources' }],
  "env": (config) => ({
    ...config,
    ORIGIN_URL: 'https://passbolt.github.io/passbolt_styleguide',
  }),
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
        use: ["@svgr/webpack"],
      },
    );

    // Modify the file loader rule to ignore *.svg, since we have it handled now.
    fileLoaderRule.exclude = /\.svg$/i;

    return config;
  },
}
