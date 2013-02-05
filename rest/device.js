
var fs = require('fs'),
	spawn = require('child_process').spawn;

exports.setup = function(expressApp){
	
	expressApp.get('/api/device/monitor/off', function(req, res){
		var off = spawn('xset', ['dpms', 'force', 'off']);
		res.send('Monitor Off');
	});

	expressApp.get('/api/device/monitor/on', function(req, res){
		var on = spawn('xset', ['dpms', 'force', 'on']);
		res.send('Monitor On');
	});	

	expressApp.get('/api/device/sound/lower', function(req, res){
		var lower = spawn('amixer', ['-q', 'sset', '\'Master\'', '3%-']);
		res.send('Volume Lowered');
	});

	expressApp.get('/api/device/sound/higher', function(req, res){
		var higher = spawn('amixer', ['-q', 'sset', '\'Master\'', '3%+']);
		res.send('Volume Higher');
	});

	expressApp.get('/api/device/sound/set', function(req, res){
		var higher = spawn('amixer', ['-q', 'sset', '\'Master\'', req.query.level+'%']);
		res.send('Volume Higher');
	});

}