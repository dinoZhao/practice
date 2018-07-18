const path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin')
const { VueLoaderPlugin } = require('vue-loader');
var webpackhtmlplugin=require("html-webpack-plugin")
var glob=require("glob")
function resolve (dir) {
  return path.join(__dirname, '..', dir)
}

//配置入口
function entries(){
	 var entryFiles = glob.sync("./src/**/*.js")
	  var map = {};
	   for (var i = 0; i < entryFiles.length; i++) {
  var filePath = entryFiles[i];
  var filename = filePath.substring(filePath.lastIndexOf('\/') + 1, filePath.lastIndexOf('.'));
  map[filename] = filePath;
 }
	 return map;
}
module.exports={
	entry:entries(),
	output:{
		path: path.resolve(__dirname, 'dist'),
        filename: '[name].js'
	},
	plugins:[
	new webpackhtmlplugin({
		    filename: 'index.html',
      template: './src/page/index/index.html',
      inject: true,
      chunks: ['index']
    }),
	 new webpackhtmlplugin({
      filename: 'login.html', //http访问路径
      template: './src/page/login/login.html', //实际文件路径
      inject: true,
      chunks: ['login']
    }),
	new VueLoaderPlugin(),
	new ExtractTextPlugin('[name].css')
	],
  	module: {
		rules: [{
				test: /\.(js|jsx)$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader',
					options: {
					   presets: ['env']
					}
				}
			},
//			{
//				test: /\.scss$/,
//				use: ExtractTextPlugin.extract({
//					fallback: 'style-loader',
//					//如果需要，可以在 sass-loader 之前将 resolve-url-loader 链接进来
//					use: ['css-loader', 'sass-loader']
//				})
//			},
//			{
//				test: /\.css$/,
//				use: [{
//        loader: "style-loader" // 将 JS 字符串生成为 style 节点
//    }, {
//        loader: "css-loader" // 将 CSS 转化成 CommonJS 模块
//    }]
//			},
		{
				test: /\.css$/,
				use: ExtractTextPlugin.extract({
					fallback: "style-loader",
					use: "css-loader"
				})
			},
			{
                test:/\.vue$/,
                loader:'vue-loader',
                
            },


		]
	},
 resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      '@': resolve('src'),
      "components":resolve('src/components')
    }
  },

}
