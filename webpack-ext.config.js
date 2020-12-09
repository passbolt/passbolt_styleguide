/*
 * Webpack config of the browser extension entry points.
 * Only used for demo purpose as the browser extension build its own artefact.
 */
const path = require("path");

/**
 * Demo entries used while testing with webpack-dev-server (add the argument --env.demo=true to the command)
 * @type {object}
 */
const demoEntry = {
  "ext-bootstrap-app":  path.resolve(__dirname, "./demo/ext-app/entry/ExtBootstrapApp.entry.js"), // The passbolt bootstrap application served by the browser extension.
  "ext-app": path.resolve(__dirname, "./demo/ext-app/entry/ExtApp.entry.js"), // The passbolt application served by the browser extension.
  "ext-bootstrap-setup": path.resolve(__dirname, "./demo/ext-app/entry/ExtBootstrapSetup.entry.js"), // The setup bootstrap application served by the browser extension.
  "ext-setup": path.resolve(__dirname, "./demo/ext-app/entry/ExtSetup.entry.js"), // The setup application served by the browser extension.
  "ext-bootstrap-recover": path.resolve(__dirname, "./demo/ext-app/entry/ExtBootstrapRecover.entry.js"), // The recover bootstrap application served by the browser extension.
  "ext-recover": path.resolve(__dirname, "./demo/ext-app/entry/ExtRecover.entry.js"), // The recover application served by the browser extension.
};

const config = {
  entry: {},
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
      }
    ]
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: "ext-vendors",
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
  devServer: {
    contentBase: path.join(__dirname, "demo/ext-app/public/"),
    port: 3001,
    publicPath: "http://localhost:3001/dist/",
    historyApiFallback: true
  },
};

exports.default = function (env) {
  env = env || {};
  // Enable debug mode.
  if (env.debug) {
    config.mode = "development";
    config.devtool = "inline-source-map";
  }
  // Override the entry points with the demo one in case of demoing.
  if (env.demo) {
    config.entry = Object.assign({}, config.entry, demoEntry);
  }
  return config;
};
