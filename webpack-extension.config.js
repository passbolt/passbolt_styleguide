const path = require("path");
const webpack = require("webpack");

module.exports = {
  entry: {
    setup: "./demo/react-extension/public/js/authentication-setup.js",
    index: "./demo/react-extension/public/js/index.js"
  },
  mode: "development",
  devtool: "inline-source-map",
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules|bower_components)/,
        loader: "babel-loader",
        options: { presets: ["@babel/env"] }
      },
      // {
      //   test: /\.css$/,
      //   use: ["style-loader", "css-loader"]
      // }
    ]
  },
  resolve: { extensions: ["*", ".js", ".jsx"] },
  output: {
    path: path.resolve(__dirname, "demo/react-extension/dist/"),
    publicPath: "/dist/",
    filename: "[name].bundle.js"
  },
  devServer: {
    contentBase: path.join(__dirname, "demo/react-extension/public/"),
    port: 3001,
    publicPath: "http://localhost:3001/dist/",
    historyApiFallback: true,
  },
};
