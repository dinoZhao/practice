var HtmlWebpackPlugin = require('html-webpack-plugin')
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var webpack = require("webpack")
var CleanWebpackPlugin = require('clean-webpack-plugin')
module.exports = {
	entry: {
		polyfill: "babel-polyfill",
		index: './src/index.js'
	},
	output: {
		path: __dirname + "/dist",
		filename: '[name].js'
	},
	mode: "development",
	plugins: [
		new HtmlWebpackPlugin({
			template: 'src/index.html'
		}),
		new ExtractTextPlugin({
			filename: "style.css",
		}),
		new webpack.optimize.SplitChunksPlugin({
			chunks: "all",
			minSize: 300,
			maxAsyncRequests: 5,
			maxInitialRequests: 3,
			cacheGroups: {
				default: {
					name: "default",
					minChunks: 1,
					priority: -20,
					reuseExistingChunk: true
				},
				vendors: {
					test: /[\\/]node_modules[\\/]/,
					priority: -10,
					name:'vendors'
				}
			}
		}),
		new CleanWebpackPlugin(['dist']),
	],
	module: {
		rules: [{
				test: /\.js$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader',
					options: {
						//        presets: ['env'],
					}
				}
			},
			{
				test: /\.scss$/,
				use: ExtractTextPlugin.extract({
					fallback: 'style-loader',
					//如果需要，可以在 sass-loader 之前将 resolve-url-loader 链接进来
					use: ['css-loader', 'sass-loader']
				})
			},
			{
				test: /\.css$/,
				use: ExtractTextPlugin.extract({
					fallback: "style-loader",
					use: "css-loader"
				})
			}

		]
	},
	devtool: "eval-source-map",
	devServer: {
		compress: true,
		port: 9000
	}
}