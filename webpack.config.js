const path = require('path');
const CleanWebpackPlugin = require("clean-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const PATHS = {
  source: path.join(__dirname, 'src'),
  build: path.join(__dirname, 'dist'),
}

const config = {
  entry: [
    PATHS.source + '/js/index.js',
    PATHS.source + '/scss/style.scss'
  ],
  output: {
    path: PATHS.build,
    filename: './js/bundle.js'
  },
  devtool: "source-map",
  mode: "development",
  module: {
    rules: [
      {
        test: /\.(sass|scss)$/,
        include: PATHS.source + '/scss',
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {}
          },
          {
            loader: "css-loader",
            options: {
              sourceMap: true,
              url: false
            }
          },
          {
            loader: "postcss-loader",
            options: {
              ident: "postcss",
              sourceMap: true,
              plugins: () => [
                require("cssnano")({
                  preset: [
                    "default",
                    {
                      discardComments: {
                        removeAll: true
                      }
                    }
                  ]
                })
              ]
            }
          },
          {
            loader: "sass-loader",
            options: {
              sourceMap: true
            }
          }
        ]
      },
      {
        test: /\.pug$/,
        include: PATHS.source + "/html",
        loader: "pug-loader",
        options: {
          pretty: true
        }
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "./css/style.bundle.css"
    }),
    new CopyWebpackPlugin([
      {
        from: "./src/fonts",
        to: "./fonts"
      }
    ]),
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: PATHS.source + "/html/index.pug"
    })
  ]
};

module.exports = (env, argv) => {
  if (argv.mode === "production") {
    config.plugins.push(new CleanWebpackPlugin("dist"));
  }
  return config;
};
