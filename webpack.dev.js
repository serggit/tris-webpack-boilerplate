const path = require("path");
const config = require("./webpack.config.js");
const merge = require("webpack-merge");
const common = require("./webpack.common.js");
const { staticFolderName } = config;

module.exports = merge(common, {
  mode: "development",
  devtool: "inline-source-map",
  module: {
    rules: [
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "static/css/[name].css"
            }
          },
          {
            loader: "extract-loader"
          },
          {
            loader: "css-loader"
          },
          {
            loader: "postcss-loader"
          },
          {
            loader: "sass-loader"
          }
        ]
      }
    ]
  },
  output: {
    filename: "static/js/[name].js",
    path: path.resolve(__dirname, `dist`)
  }
});
