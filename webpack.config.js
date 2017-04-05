const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
  entry: {
    index: './js/index.js',
    music: './js/music.js',
  },
  output: {
    filename: 'js/[name].[chunkhash].js',
    path: path.resolve(__dirname, 'dist'),
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve('index.html'),
      chunks: ['vendor', 'index'],
    }),
    // new HtmlWebpackPlugin({
    //   template: path.resolve('music.html'),
    //   chunks: ['music'],
    // }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: module =>
        module.context && module.context.indexOf('node_modules') !== -1
      ,
    }),
  ],
};
