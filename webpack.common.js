const path = require("path");
const config = require("./webpack.config.js");

const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ScriptExtHtmlWebpackPlugin = require("script-ext-html-webpack-plugin");
const PreloadWebpackPlugin = require("preload-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const WriteFilePlugin = require("write-file-webpack-plugin");

const { staticFolderName } = config;

module.exports = {
  mode: "development",
  entry: [`./src/markup/${staticFolderName}/js/index.js`, `./src/markup/${staticFolderName}/styles/main.scss`],
  module: {
    rules: [
      {
        test: /\.txt$/,
        use: "raw-loader"
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "[name].[ext]",
              outputPath: `${staticFolderName}/img/`,
              publicPath: `/${staticFolderName}/img/`
            }
          }
        ]
      },
      {
        test: /\.(woff|woff2|ttf|otf)$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "[name].[ext]",
              outputPath: `fonts/`,
              publicPath: `/fonts/`
            }
          }
        ]
      },
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"]
          }
        }
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new WriteFilePlugin(),
    new CopyPlugin([
      {
        from: "src/markup/static/fonts/",
        to: "static/fonts"
      },
      {
        from: "src/markup/static/img/",
        to: "static/img"
      }
    ]),
    new HtmlWebpackPlugin({
      title: "tris-webpack-boilerplate",
      filename: "index.html",
      template: "./src/markup/pages/index.html",
      inject: "head"
    }),
    new ScriptExtHtmlWebpackPlugin({
      defaultAttribute: "defer"
    })
  ],
  externals: {
    $: "jquery",
    jquery: "jQuery",
    "window.$": "jquery"
  }
};
