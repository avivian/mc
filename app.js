var express = require('express'),
	fs = require('fs'),
	http = require('http');

var app = express();

app.use(express.bodyParser());
app.use('/static', express.static(__dirname + '/static'));

app.get('/', function (req, res){
	fs.readFile(__dirname + '/static/html/index.html', 'utf8', function(err, text){
		if(err)
			res.send({message: 'Unable to load html', errors: err});
		else
			res.send(text);
	});
});


require('./rest/video').setup(app);
require('./rest/device').setup(app);


http.createServer(app).listen(8000, '192.168.0.11');
console.log("Serving on 192.168.0.11:8000")