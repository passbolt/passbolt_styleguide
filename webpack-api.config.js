const path = require("path");

const config = {
  entry: {
    "api-account-recovery": path.resolve(__dirname, "./src/react-extension/ApiAccountRecovery.entry.js"), // The account recovery application served by the API
    "api-app": path.resolve(__dirname, "./src/react-extension/ApiApp.entry.js"), // The passbolt application served by the API
    "api-recover": path.resolve(__dirname, "./src/react-extension/ApiRecover.entry.js"), // The recover application served by the API
    "api-setup": path.resolve(__dirname, "./src/react-extension/ApiSetup.entry.js"), // The setup application served by the API
    "api-triage": path.resolve(__dirname, "./src/react-extension/ApiTriage.entry.js"), // The triage application served by the API
    "api-feedback": path.resolve(__dirname, "./src/react-extension/ApiFeedback.entry.js"), // The feedback application served by the API
  },
  mode: "production",
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules|bower_components)/,
        loader: "babel-loader",
        options: {
          presets: ["@babel/react"],
        }
      },
      {test: /\.json$/, loader: 'json-loader'},
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
                  },
                ],
              }
            }
          }
        ],
      }
    ]
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: "api-vendors",
          chunks: "all"
        },
      }
    },
  },
  resolve: {extensions: ["*", ".js", ".jsx"]},
  output: {
    path: path.resolve(__dirname, "build/js/dist/"),
    pathinfo: true,
    filename: "[name].js"
  },
};

exports.default = function (env) {
  env = env || {};
  // Enable debug mode.
  if (env.debug) {
    config.mode = "development";
    config.devtool = "inline-source-map";
  }
  return config;
};
