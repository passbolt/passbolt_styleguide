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
  "ext-login":  path.resolve(__dirname, "./demo/in-form-menu/entry/ExtLogin.entry.js"), // The passbolt bootstrap in form menu login application served by the demo.
  "ext-bootstrap-in-form-menu":  path.resolve(__dirname, "./demo/in-form-menu/entry/ExtInFormMenuBootstrap.entry.js"), // The passbolt bootstrap in form menu application served by the browser extension.
  "ext-in-form-menu":  path.resolve(__dirname, "./demo/in-form-menu/entry/ExtInFormMenu.entry.js"), // The passbolt in form menu application served by the browser extension.
  "ext-in-form-call-to-action":  path.resolve(__dirname, "./demo/in-form-menu/entry/ExtInFormCallToAction.entry.js"), // The passbolt in form call to action application served by the browser extension.
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
          name: "vendors",
          chunks: "all"
        },
      }
    },
  },
  resolve: {extensions: ["*", ".js", ".jsx"]},
  output: {
    path: path.resolve(__dirname, "build/js/dist/in-form-menu"),
    pathinfo: true,
    filename: "[name].js"
  },
  devServer: {
    contentBase: path.join(__dirname, "demo/in-form-menu/public/"),
    port: 3002,
    publicPath: "http://localhost:3002/dist/in-form-menu",
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
