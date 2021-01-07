const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { isBundle } = require("typescript");

module.exports = {
  entry: {
    index: { import: "./src/index.tsx", dependOn: "phaser" },
    phaser: "phaser",
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        use: [
          {
            loader: "file-loader",
          },
        ],
      },
    ],
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".jsx"],
  },
  output: {
    filename: "[name].bundle.js",
    path: path.resolve(__dirname, "dist"),
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: "Crossy RPG",
      template: "./src/index.html",
    }),
  ],
  devServer: {
    contentBase: path.join(__dirname, "dist"),
    compress: true,
    port: 8000,
  },
};
