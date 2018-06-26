var HtmlWebpackPlugin=require('html-webpack-plugin')
module.exports={
	entry:{
		polyfill:"babel-polyfill",
		index:'./src/index.js'
	},
	output:{
		path:__dirname+"/dist",
		filename:'[name].js'
	},
	     plugins: [
    new HtmlWebpackPlugin(),
  ],
module: {
    rules: [
        {
            test: /\.js$/,
            exclude: /node_modules/,
           use: {
        loader: 'babel-loader',
        options: {
//        presets: ['env'],
        }
      }
        }
   ]
}
}
