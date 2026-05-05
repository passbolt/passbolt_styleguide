const path = require("path");

const CopyPlugin = require("copy-webpack-plugin");
const I18nextExtractionPlugin = require("./config/webpack.i18n");
const { buildLessEntries, lessRule, lessMinimizer } = require("./config/webpack.less");

const isDevelopment = process.env.NODE_ENV === "development";

exports.default = {
  mode: isDevelopment ? "development" : "production",
  entry: () => ({
    "api-account-recovery": path.resolve(__dirname, "./src/react-extension/ApiAccountRecovery.entry.js"), // The account recovery application served by the API
    "api-app": path.resolve(__dirname, "./src/react-extension/ApiApp.entry.js"), // The passbolt application served by the API
    "api-recover": path.resolve(__dirname, "./src/react-extension/ApiRecover.entry.js"), // The recover application served by the API
    "api-setup": path.resolve(__dirname, "./src/react-extension/ApiSetup.entry.js"), // The setup application served by the API
    "api-triage": path.resolve(__dirname, "./src/react-extension/ApiTriage.entry.js"), // The triage application served by the API
    "api-feedback": path.resolve(__dirname, "./src/react-extension/ApiFeedback.entry.js"), // The feedback application served by the API
    ...buildLessEntries(),
  }),
  ...(isDevelopment && {
    devtool: "eval-cheap-module-source-map",
  }),
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules|bower_components)/,
        loader: "babel-loader",
        options: {
          presets: ["@babel/react"],
        },
      },
      lessRule,
      { test: /\.json$/, loader: "json-loader" },
      // Transform SVG as react component
      {
        test: /\.svg$/i,
        issuer: /\.[jt]sx?$/,
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
    ],
  },
  plugins: [
    new I18nextExtractionPlugin(),
    new CopyPlugin({
      patterns: [{ from: path.resolve(__dirname, "./src/locales"), to: path.resolve(__dirname, "./build/locales") }],
    }),
  ],
  optimization: {
    splitChunks: {
      cacheGroups: {
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: "api-vendors",
          chunks: "all",
        },
      },
    },
    // This is only enabled in production mode
    minimizer: ["...", lessMinimizer],
  },
  resolve: {
    extensions: [".js", ".jsx"],
  },
  output: {
    path: path.resolve(__dirname, "build/"),
    filename: "js/dist/[name].js",
  },
};
