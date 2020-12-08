const path = require("path");

/**
 * Demo entries used while testing with webpack-dev-server (add the argument --env.demo=true to the command)
 * @type {object}
 */
const demoEntry = {
  "api-app": path.resolve(__dirname, "./demo/api-app/entry/ApiApp.entry.js"), // The passbolt application served by the API
};

const config = {
  entry: {
    "api-app": path.resolve(__dirname, "./src/react-extension/ApiApp.entry.js"), // The passbolt application served by the API
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
  devServer: {
    contentBase: path.join(__dirname, "demo/api-app/public/"),
    port: 3000,
    publicPath: "http://localhost:3000/dist/",
    historyApiFallback: {
      rewrites: [
        {from: /^\/$|^\/app/, to: "/api-app.html"},
        {from: /^\/setup\/install/, to: "/api-setup.html"},
      ]
    }
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
