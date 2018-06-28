const merge = require('webpack-merge');
const base=require('./webpack.base');
const path = require('path');
var CleanWebpackPlugin = require('clean-webpack-plugin')
module.exports=merge(base,{
	plugins:[
    new CleanWebpackPlugin(['../dist'],{allowExternal:true}),
	
	],
	mode:'production',
	output:{
		path:path.join(__dirname,"..",'dist'),
		filename:'js/index.js',
		publicPath: './',
	},
	module: {
		rules: [
			 {
        test: /\.(png|jpg|svg|gif)/,
        use:[{
loader: "file-loader",
options:{
	name:"images/[hash:8].[name].[ext]",
	publicPath: '../'
}
		}
         
        ]
      }

		]
	},
})
