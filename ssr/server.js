const Vue = require('vue')
const server = require('express')()
const createApp = require('./app')
const createRenderer= require('vue-server-renderer').createRenderer
const context = {
  title: 'hello',
  meta: `
    <meta ...>
    <meta ...>
  `
}
server.get('*', (req, res) => {
	
	const param = { url: req.url }
  const app = createApp(param)
  const renderer = createRenderer({
  template: require('fs').readFileSync('./index.html', 'utf-8')
})

renderer.renderToString(app,context, (err, html) => {
  console.log(html) // html 将是注入应用程序内容的完整页面
 res.end(html)
})


})

server.listen(8080)