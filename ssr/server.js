const Vue = require('vue')
const server = require('express')()
const createRenderer= require('vue-server-renderer').createRenderer
const context = {
  title: 'hello',
  meta: `
    <meta ...>
    <meta ...>
  `
}
server.get('*', (req, res) => {
  const app = new Vue({
    data: {
      url: req.url
    },
    template: `<div>访问的 URL 是： {{ url }}</div>`
  })
  const renderer = createRenderer({
  template: require('fs').readFileSync('./index.html', 'utf-8')
})

renderer.renderToString(app,context, (err, html) => {
  console.log(html) // html 将是注入应用程序内容的完整页面
 res.end(html)
})


})

server.listen(8080)