var HtmlWebpackPlugin=require('html-webpack-plugin')
var webpack=require('webpack')
module.exports = {
  entry: {
  	index:'./src/index.js',
  },
   output: {
    path: __dirname +"/dist",
    filename: '[name].js',
  },
     plugins: [
    new HtmlWebpackPlugin(),
//  new webpack.optimize.CommonsChunkPlugin({
//  	name: "commons",
//  	filename: "commons.js",}
//  )
  ]
};