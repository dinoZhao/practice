const merge = require('webpack-merge');
const base=require('./webpack.base');
const path = require('path');
module.exports=merge(base,{
	devtool:'eval-source-map',
	devServer:{
		compress: true,
		port: 9000
	},
	mode:"development",
	output:{
		path:path.join(__dirname,"..",'dist'),
		filename:'index.js',
		publicPath: '/',
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
