var express = require("express");
var app = express();
app.use(express.static('./dist'));
app.get("/s", function(req, res) {

   
    res.send(req.url.slice(1));
});
app.get("/b", function(req, res) {
  
   
   res.jsonp({ user: 'tobi' })
});

app.listen(3000, function() {
    console.log("App started on port 3000");
});

