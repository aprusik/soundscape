// webpack.config.prod.js

const webpack = require('webpack')
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const BabiliPlugin = require('babili-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
// const ElectronPackager = require("webpack-electron-packager");

// Any directories you will be adding code/files into, need to be added to this array so webpack will pick them up
const defaultInclude = path.resolve(__dirname, 'src')

module.exports = {
  module: {
    rules: [
      {
        test: /\.scss$/, // loader SASS
        use: [ 
          MiniCssExtractPlugin.loader, 
          'css-loader', 
          { loader: 'sass-loader',
            options: {
              includePaths: ['./node_modules']
            }
          }],
        include: defaultInclude
      },
      {
        test: /\.jsx?$/, // loader for react
        use: [{ loader: 'babel-loader' }],
        include: defaultInclude
      },
      {
        test: /\.(jpe?g|png|gif)$/, // loader for images
        use: [{ loader: 'file-loader?name=img/[name]__[hash:base64:5].[ext]' }],
        include: defaultInclude
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2)$/, // loader for custom fonts
        use: [{ loader: 'file-loader?name=font/[name]__[hash:base64:5].[ext]' }],
        include: defaultInclude
      },
      {
        test: /\.(mp3|wav)$/,
        use: [{ loader: 'file-loader?name=audio/[name]__[hash:base64:5].[ext]' }],
        include: defaultInclude
      }
    ]
  },
  target: 'electron-renderer',
  plugins: [
    new HtmlWebpackPlugin({
      template: 'src/public/index.html'
    }),
    new MiniCssExtractPlugin({ filename: 'bundle.css' }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    }),
    new BabiliPlugin(),
    // new ElectronPackager({
    //   dir: "./",
    //   out: "./build",
    //   arch: "x64",
    //   platform: "win32",
    // })
  ],
  stats: {
    colors: true,
    children: false,
    chunks: false,
    modules: false
  }
}