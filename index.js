var express = require('express');
var app = express();
var querystring = require('querystring');
var http = require("https");
var path = require('path');
var att ='';

app.set('port', (process.env.PORT || 5000))
app.use(express.static('etc'));

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/hello.html'));
});

app.get('/editor', function (req,res) {
    var data = querystring.stringify({
        client_id: "30c3384edb45c8ebe81e",
        redirect_uri: "http://markdown-ed.herokuapp.com/editor",
        client_secret: "4bd2ddb09d6de7cd8cb324482d2970238d6c241b",
        code: req.query.code
    });

    var options = {
      "method": "POST",
      "hostname": "github.com",
      "port": null,
      "path": "/login/oauth/access_token",
      "headers": {}
    };

    var request = http.request(options, function (response) {
      var chunks = [];
      response.on("data", function (chunk) {
        chunks.push(chunk);
      });

      response.on("end", function () {
        var body = Buffer.concat(chunks);
        var s = body.toString();
        var x = s.substr(s.indexOf("=")+1);
        att = encodeURIComponent(x.substr(0,x.indexOf("&")));
        res.redirect('/md.html?access_token='+att);
      });
    });
    request.write(data);
    request.end();
});

app.listen(app.get('port'), function() {
    console.log('running on port', app.get('port'))
})