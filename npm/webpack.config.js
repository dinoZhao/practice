var HtmlWebpackPlugin=require('html-webpack-plugin')
var webpack=require('webpack')
const CleanWebpackPlugin = require('clean-webpack-plugin')
module.exports = {
  entry: {
  	index:'./source/index.js',
    other:'./source/other.js'
  },
   output: {
    path: __dirname +"/dist",
    filename: '[name].js',
    publicPath: '',
  },
     plugins: [
    new HtmlWebpackPlugin({
    	filename: 'test.html',
      template: './source/index.html'
    }),
     new CleanWebpackPlugin('dist')
   
  ],
   module: {
    rules: [
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          	 {
            loader: 'file-loader',
            options: {
            	publicPath: '',
            	name:'assets/[hash:8].[name].[ext]'
            }
          }
          
        ]
      }
    ]
  },
  optimization: {
        splitChunks: {
chunks: "all",
    minSize: 30000,
    minChunks: 1,
    maxAsyncRequests: 5,
    maxInitialRequests: 3,
    name: true,
    cacheGroups: {
        default: {
            minChunks: 2,
            priority: -20,
            reuseExistingChunk: true,
        },
        vendors: {
            test: /[\\/]node_modules[\\/]/,
            priority: -10
        }
    }
        }
    },
};