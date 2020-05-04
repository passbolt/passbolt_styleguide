const path = require("path");
const webpack = require("webpack");

module.exports = {
  mode: 'development',
  devtool: "inline-source-map",

  entry: "./src/js/passbolt-reports.js",
  resolve: { extensions: ["*", ".js", ".jsx"] },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules|bower_components)/,
        loader: "babel-loader",
        options: { presets: ["@babel/env"] }
      },
    ]
  },
  output: {
    path: path.resolve(__dirname, "src/js/"),
    filename: "passbolt-reports.min.js",
  }
};