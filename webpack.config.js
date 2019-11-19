const path = require("path");
const htmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = {
  mode: "development",
  entry: "./frontend/main.js",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist")
  },
  module: {
    rules: [
      {
        test: /.js?$/,
        use: "babel-loader"
      },
      {
        test: /.css$/,
        use: ["style-loader", "css-loader"]
      }
    ]
  },
  plugins: [
    new htmlWebpackPlugin({
      template: "./frontend/index.html",
      filename: "index.html"
    }),
    new CleanWebpackPlugin()
  ],
  devServer: {
    historyApiFallback: true,
    contentBase: path.join(__dirname, "dist"),
    compress: true,
    port: 8081,
    hot: true
  }
};
