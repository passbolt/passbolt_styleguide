const path = require("path");
const uuidRegex = "[a-fA-F0-9]{8}-[a-fA-F0-9]{4}-[0-5][a-fA-F0-9]{3}-[089aAbB][a-fA-F0-9]{3}-[a-fA-F0-9]{12}";

/**
 * Demo entries used while testing with webpack-dev-server (add the argument --env.demo=true to the command)
 * @type {object}
 */
const demoEntry = {
  "api-account-recovery": path.resolve(__dirname, "./demo/api-app/entry/ApiAccountRecovery.entry.js"), // The account recovery application served by the API
  "api-app": path.resolve(__dirname, "./demo/api-app/entry/ApiApp.entry.js"), // The passbolt application served by the API,
  "api-recover": path.resolve(__dirname, "./demo/api-app/entry/ApiRecover.entry.js"), // The recover application served by the API
  "api-setup": path.resolve(__dirname, "./demo/api-app/entry/ApiSetup.entry.js"), // The setup application served by the API
  "api-triage": path.resolve(__dirname, "./demo/api-app/entry/ApiTriage.entry.js"), // The triage application served by the API
};

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
      {test: /\.json$/, loader: 'json-loader'}
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
    static: {
      directory: path.join(__dirname, "demo/api-app/public/"),
    },
    port: 3000,
    devMiddleware: {
      publicPath: "http://localhost:3000/dist/",
    },
    historyApiFallback: {
      rewrites: [
        {from: /^\/app\/administration|^\/app\/settings\/mfa/, to: "/api-app.html"},
        {from: /^\/app/, to: "/api-ext-app.html"},
        {from: new RegExp(`^\/setup\/install\/${uuidRegex}\/${uuidRegex}`), to: "/api-setup.html"},
        {from: new RegExp(`^\/setup\/recover\/${uuidRegex}\/${uuidRegex}`), to: "/api-recover.html"},
        {from: new RegExp(`^\/account-recovery\/requests\/${uuidRegex}\/${uuidRegex}`), to: "/api-account-recovery.html"},
        {from: /^\/auth\/login/, to: "/api-login.html"},
        {from: /^\/setup|^\/recover|^\/auth|^\/users\/recover$/, to: "/api-triage.html"},
        {from: /^\/$/, to: "/default.html"},
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
