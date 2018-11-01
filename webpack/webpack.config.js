var webpackhtmlplugin=require("html-webpack-plugin")
var cleanwebpackplugin=require('clean-webpack-plugin')
var path=require("path")
var jQuery=require('jquery')
module.exports={
	entry:{
		'index':"./src/index",
	},
	output:{
		filename:"[name].js",
		path:path.resolve(__dirname,'./dist')
	},
	plugins:[
	new webpackhtmlplugin({
		template: 'src/index.html',
		filename:"index.html",
		chunks:["index"]
	}),
//	new webpackhtmlplugin({
//		filename:"test.html",
//		chunks:["test"]
//	}),
	new cleanwebpackplugin(["dist"])
	],
	mode:'development',
	devServer:{
  proxy: {
      '/practice': {target:'http://127.0.0.1:8020',
       pathRewrite: {'^/practice' : ''}
      }
   },
   noInfo: true
	}

	
		
}
