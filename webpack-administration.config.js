const path = require("path");
const webpack = require("webpack");

const settings = {
  entry: "./src/react-administration/index.js",
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules|bower_components)/,
        loader: "babel-loader",
        options: {presets: ["@babel/env"]}
      },
    ]
  },
  resolve: {extensions: ["*", ".js", ".jsx"]},
  output: {
    path: path.resolve(__dirname, "build/js/dist/"),
    filename: "react-administration.js"
  },
  devServer: {
    contentBase: path.join(__dirname, "demo/react-administration/public/"),
    port: 3000,
    publicPath: "http://localhost:3000/dist/",
    historyApiFallback: true,
  },
};

module.exports = function(env) {
  env = env || {};
  // Enable debug mode.
  if (env.debug) {
    settings.mode = "development";
    settings.devtool = "inline-source-map";
  }
  return settings;
};
