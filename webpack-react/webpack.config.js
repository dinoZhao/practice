var HtmlWebpackPlugin = require('html-webpack-plugin')
var ExtractTextPlugin=require('extract-text-webpack-plugin')
module.exports = {
	entry: {
		polyfill: "babel-polyfill",
		index: './src/index.js'
	},
	output: {
		path: __dirname + "/dist",
		filename: '[name].js'
	},
	plugins: [
		new HtmlWebpackPlugin(
			{
				template: 'src/index.html'
			}
		),
		new ExtractTextPlugin({
    filename: "style.css",
})
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
	}
}