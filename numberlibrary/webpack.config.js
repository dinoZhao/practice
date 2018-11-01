var path=require('path')
module.exports={
	entry:'./src/index.js',
	output:{
		path:path.resolve(__dirname,"dist"),
		filename:'webpack-numbers.js',
		library:"webpacknumbers",
		libraryTarget:'umd'
	},
	externals:{
		jquery:{
		commonjs: 'jquery',
        commonjs2: 'jquery',
        amd: 'jquery',
        root: '$'	
		}
	}
}
