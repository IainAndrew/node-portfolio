const webpack = require('webpack')
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const autoprefixer = require('autoprefixer')
const path = require('path');

module.exports = {
  mode: "production",
  entry: {
    main: './public/src/js/main.js'
  },
  output: {
    filename: '[name].min.js',
    path: path.resolve(__dirname, 'public/dist/js'),
    clean: true
  },
  module: {
    rules: [{
      test: /\.js$/,
      loader: 'babel-loader',
      options: {
        presets: ['env']
      }
    }, {
      test: /\.scss$/,
      use: [
        MiniCssExtractPlugin.loader,
        "css-loader",
        "postcss-loader",
        "sass-loader",
      ],
    }]
  },
  resolve: {
    alias: {
      jquery: 'jquery/src/jquery'
    }
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "../css/style.min.css",
    }),
    new webpack.LoaderOptionsPlugin({
      options: {
        postcss: [
          autoprefixer
        ]
      }
    })
  ]
};
