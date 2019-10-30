const path = require("path");
const config = require("./webpack.config.js");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const fs = require("fs");
const ScriptExtHtmlWebpackPlugin = require("script-ext-html-webpack-plugin");
const PreloadWebpackPlugin = require("preload-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const SpriteLoaderPlugin = require("svg-sprite-loader/plugin");
const WriteFilePlugin = require("write-file-webpack-plugin");

const { staticFolderName } = config;
const generateHtmlPlugins = templateDir => {
  let templateFiles = fs.readdirSync(path.resolve(__dirname, templateDir));
  templateFiles = templateFiles.filter(file => file.split(".")[1] === "html");
  return templateFiles.map(name => {
    return new HtmlWebpackPlugin({
      title: name,
      filename: name,
      template: `${templateDir}/${name}`
    });
  });
};
const htmlPlugins = generateHtmlPlugins("./src/markup");

module.exports = {
  mode: "development",
  entry: [`./src/markup/${staticFolderName}/styles/main.scss`, `./src/markup/${staticFolderName}/js/index.js`],
  module: {
    rules: [
      {
        test: /\.html$/,
        loader: "underscore-template-loader"
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/,
        include: path.resolve(__dirname, "src/markup/static/img/general"),
        use: [
          {
            loader: "file-loader",
            options: {
              name: "[name].[ext]",
              outputPath: `${staticFolderName}/img/general/`,
              publicPath: `/${staticFolderName}/img/general/`
            }
          }
        ]
      },
      {
        test: /\.svg$/,
        include: path.resolve(__dirname, "src/markup/static/img/svg-sprite"),
        use: [
          {
            loader: "svg-sprite-loader",
            options: {
              extract: true,
              spriteFilename: "./static/img/svg-sprite/sprite.svg",
              runtimeCompat: true
            }
          },
          "svgo-loader"
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
        from: "src/markup/static/img/general",
        to: "static/img/general"
      }
    ]),

    ...htmlPlugins,
    new SpriteLoaderPlugin({
      plainSprite: true
    })
  ],
  externals: {
    $: "jquery",
    jquery: "jQuery",
    "window.$": "jquery"
  }
};
