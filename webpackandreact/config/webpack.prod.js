const merge = require('webpack-merge');
const base=require('./webpack.base');
var CleanWebpackPlugin = require('clean-webpack-plugin')
module.exports=merge(base,{
	plugins:[
    new CleanWebpackPlugin(['../dist'],{allowExternal:true}),
	
	],
	mode:'production'
})
