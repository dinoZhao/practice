const path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin')
const { VueLoaderPlugin } = require('vue-loader');
var webpack =require("webpack")
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
      chunks: ['index',"vendor","common"]
    }),
	 new webpackhtmlplugin({
      filename: 'login.html', //http访问路径
      template: './src/page/login/login.html', //实际文件路径
      inject: true,
      chunks: ['login',"vendor","common"]
    }),
	new VueLoaderPlugin(),
	new ExtractTextPlugin('[name].css'),

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
  	devServer: {
  compress: true,
  port: 9000
},
optimization: {
        splitChunks: {
            cacheGroups:{
                // 比如你要单独把jq之类的官方库文件打包到一起，就可以使用这个缓存组，如想具体到库文件（jq）为例，就可把test写到具体目录下
                vendor: {
                    test: /node_modules/,
                    name: "vendor",
                    priority: 10,
                    enforce: true
                },
                // 这里定义的是在分离前被引用过两次的文件，将其一同打包到common.js中，最小为30K
                common: {
                    name: "common",
                    minChunks: 2,
                    minSize: 30000
                }
                
            },
            chunks:"all",
            minSize: 40000
        }
    }

}
