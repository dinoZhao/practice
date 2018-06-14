var glob = require("glob")
 
// options is optional
glob("*/**/*.js",  function (er, files) {
	console.log(files)
  // files is an array of filenames.
  // If the `nonull` option is set, and nothing
  // was found, then files is ["**/*.js"]
  // er is an error object or null.
})


// https://www.cnblogs.com/xinxingyu/p/5736244.html
// * 匹配该路径段中0个或多个任意字符:
// ** : 和 * 一样,可以匹配任何内容,但**不仅匹配路径中的某一段,而且可以匹配 'a/b/c' 这样带有'/'的内容,所以,它还可以匹配子文件夹下的文件. 


//*.js
//[ 'chalk.js',
//'globs.js',
//'ora.js',
//'pack.js',
//'path.js',
//'process.js',
//'rimraf.js' ]

//*/*.js
//[ 'node_modules/asn1.js',
//'node_modules/big.js',
//'node_modules/bn.js',
//'node_modules/des.js',
//'node_modules/hash.js',
//'node_modules/md5.js',
//'node_modules/sha.js' ]

//**/*.js
//npm文件下所有文件

//*/**/*.js
//同上