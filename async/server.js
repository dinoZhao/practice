var express = require("express");
var bodyParser = require('body-parser');
var app = express();
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(express.static('./dist'));
app.get("/s", function(req, res) {

   
    res.send(req.url.slice(1));
});
app.get("/b", function(req, res) {
  
   
   res.jsonp({ user: 'tobi' })
});
app.post("/b",function(req,res){
	console.log(req)
	res.json(req.body);
})
app.listen(3000, function() {
    console.log("App started on port 3000");
});

