const merge = require('webpack-merge');
const base=require('./webpack.base');
module.exports=merge(base,{
	devtool:'eval-source-map',
	devServer:{
		compress: true,
		port: 9000
	},
	mode:"development"
})
