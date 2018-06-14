const merge = require('webpack-merge')

var obj1={a:2,b:4}
var obj2={v:3,x:4}
console.log(merge(obj1,obj2))

//类似于Object.assign,但是Object.assign是浅复制,本模块是只能复制
