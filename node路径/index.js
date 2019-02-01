var http = require('http')
var url = require('url')
var fs = require('fs')
var path = require('path')
http.createServer(function (req, res) {
    if (req.url == "/favicon.ico") {
        res.end()
        return
    } else {
        var pathname = url.parse(req.url).pathname
        console.log(url.parse(req.url))
        fs.readFile(path.join(__dirname, pathname), function (err, data) {
            if (err) {
                console.log(err)
                res.end()
                return
            }

            console.log(data)
        })
        res.writeHead(200, { "Content-Type": 'text/plain' })
        res.end("hello world")
    }

}).listen("8124", "127.0.0.1")
