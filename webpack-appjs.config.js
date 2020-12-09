const path = require("path");
const webpack = require("webpack");

module.exports = {
  entry: "./src/react-appjs/index.js",
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
    path: path.resolve(__dirname, "build/js/dist/"),
    publicPath: "/dist/",
    filename: "passbolt.react.js"
  },
  devServer: {
    contentBase: path.join(__dirname, "/demo/react-appjs/public/"),
    compress: true,
    port: 3000,
    publicPath: "http://localhost:3000/dist/",
    historyApiFallback: {
      rewrites: [
        { from: /^\/$/, to: '/index.html' }
      ]
    }
  },
};
