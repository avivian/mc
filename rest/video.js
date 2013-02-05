
var fs = require('fs');
var spawn = require('child_process').spawn;

var VLC = null;
var currentVideo = null;

var VIDEO_FOLDER = '/home/arthur/Videos'

var VID_LIST = {
}

var VID_NAME = {
}

var VIDS = [
]

exports.setup = function (expressApp) {
	
	expressApp.get('/api/video/list', function(req, res){
		fs.readdir(VIDEO_FOLDER, function(err, files){
			if (err)
				res.send({message: "Error reading video files", errors: err});
			else{
				var result = [];
				for (var i = 0; i < files.length; i++){
					result.push({_id: i, name: files[i]})
				}
				VIDS = files; 
				res.send(result);
			}
		});
	});

	expressApp.get('/api/video/flist', function(req, res){
		var result = [];
		for (var vid in VID_NAME){
			result.push({'name': VID_NAME[vid], 'id': vid});
		}
		res.send(VIDS);
	});

	expressApp.get('/api/video/playback', function(req, res){
		
		var setCurrentVideo = function(filename){
			
			var currentVideo = {};

			var ffmpeg = spawn('ffmpeg', ['-i', filename]);

			ffmpeg.stdout.on('data', function(data){
				currentVideo.filename = filename;
				currentVideo.data = data;
				console.log('data', data);
				return currentVideo;
			});

		}

		var vid = req.query.v;
		var file = req.query.f;
		console.log(vid, VIDS[vid]);
		VLC.stdin.write('add '+VIDEO_FOLDER +'/'+VIDS[vid] + '\r\n');
		currentVideo = setCurrentVideo(VIDS[vid]);
		console.log("currentVideo", currentVideo);
		// var totem = spawn('totem', ['--replace', VIDEO_FOLDER + '/' + VIDS[vid]]);
		res.send("Totem Playback Started");
	});

	expressApp.get('/api/video/pause', function(req, res){
		// var totem = spawn('totem', ['--pause']);
		VLC.stdin.write('pause\f\n');
		res.send('pause');
	});

	expressApp.get('/api/video/fullscreen', function(req, res){
		VLC.stdin.write('f\r\n');
		res.send('VLC fullscreen toggle');
	});

	expressApp.get('/api/video/play', function(req, res){
		// var totem = spawn('totem', ['--play']);
		console.log("VLC", VLC);
		VLC.stdin.write('play\r\n');
		res.send('play');
	});

	expressApp.get('/api/video/seek', function(req, res){
		console.log("currentVideo", currentVideo);
		var offset = req.query.offset;
		console.log("offset=", offset);
		var ffmpeg = spawn('ffmpeg', ['-i', 'rc']);
		ffmpeg.stdout.on('data', function(data){
			console.log("data=", data);
		});
		VLC.stdin.write('seek '+offset+'\r\n');
		res.send('VLC Seek');
	});

	expressApp.get('/api/video/skipfwd', function(req, res){
		res.send('Totem seek-fwd');
	});

	expressApp.get('/api/video/skipback', function(req, res){
		res.send('Totem seek-fwd');
	});

	expressApp.get('/api/video/launch', function(req, res){
	 	VLC = spawn('vlc', ['-I', 'rc'], {stdio: ['pipe', 'pipe', 'pipe']});
		res.send('VLC Launched');
		VLC.stdout.pipe(process.stdout);
	});

	expressApp.get('/api/video/exit', function(req, res){
		var totem = spawn('totem', ['--quit']);
		res.send('Totem Quit');
	});

	expressApp.get('/api/video/snapshot', function(req, res){
		VLC.stdin.write('snapshot\r\n');
		res.send('Snapshot');
	});

}
