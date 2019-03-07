# ymm

> ymm

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

src/api: 后端接口服务
src/config: 常用参数（正则。。。）
src/static: 静态文件（一般为第三方包）
src/assets: 媒体文件
src/util: 常用工具
src/components: 通用组件
src/modules: 页面模块（最后编译出来的页面通常需要.vue(组件) & .html(页面模板) & .js(入口)）

说明：
1、一般对于第三方包的引入最好优先采用cdn的方式引入
2、api的接口服务通过路径关键字来归类以提高复用率
3、通过rem来实现适配（16px = .32rem）
4、提交忽略issue（通过修改.git/info/exclude
5、开发书册详见：http://ymmsit.verify.fc18.com.cn/cloudmm/issue/handbook.html

