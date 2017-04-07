const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
	entry: {
		index: './src/index.js',
		music: './src/music.js',
	},
	output: {
		filename: 'js/[name].[chunkhash].js',
		path: path.resolve(__dirname, 'dist'),
	},
	resolve: {
		modules: [
			path.resolve(__dirname, './src'),
			'node_modules',
		],
	},
	plugins: [
		new HtmlWebpackPlugin({
			filename: 'index.html',
			template: path.resolve('src/static/index.html'),
			chunks: ['vendor', 'index'],
		}),
		new HtmlWebpackPlugin({
			filename: 'music.html',
			template: path.resolve('src/static/music.html'),
			chunks: ['vendor', 'music'],
		}),
		new webpack.optimize.CommonsChunkPlugin({
			name: 'vendor',
			minChunks: module =>
        module.context && module.context.indexOf('node_modules') !== -1
      ,
		}),
	],
};
