
var fs = require('fs');
var spawn = require('child_process').spawn;

var VLC = null;
var currentVideo = null;

var VIDEO_FOLDER = '/home/arthur/Videos'

var VID_LIST = {
	'looper': 'Looper 2012.avi',
	'moonrise_kingdom': 'Moonrise.Kingdom.2012.LiMiTED.BRRip.XVID.AbSurdiTy.avi',
	'safety_not_guarenteed': 'sparks-sng-xvid.avi'
}

var VID_NAME = {
	'looper': 'Looper',
	'moonrise_kingdom': 'Moonrise Kingdom',
	'safety_not_guarenteed': 'Safety Not Guaranteed'
}

var VIDS = [
{
	'_id': 'ttss',
	'filename': "Tinker Tailor Soldier Spy 2011 R5 DVDRip XviD AC3-26K.avi",
	'name': 'Tinker Taylor Soldier Spy'
},
{
	'_id': 'sng',
	'filename': "sparks-sng-xvid.avi",
	'name': 'Safety Not Guaranteed'
},
{
	'_id': 'sw5',
	'filename': "V-The.Empire.Strikes.Back[1980]DvDrip-aXXo.avi",
	'name': 'Star Wars Ep.5 - The Empire Strikes Back'
},
{
	'_id': 'looper',
	'filename': 'Looper 2012.avi',
	'name': 'Looper'
},
{
	'_id': 'irons',
	'filename': "Iros.Sky.2012.XviD.700MB.avi",
	'name': 'Iron Sky'
},
{
	'_id': 'brave',
	'filename': "Brave.2012.R5.DVDRip.XViD.LiNE-UNiQUE.avi",
	'name': 'Brave'
},
{
	'_id': 'moonk',
	'filename':"Moonrise.Kingdom.2012.LiMiTED.BRRip.XVID.AbSurdiTy.avi",
	'name':'Moonrise Kingdom'	
}];
// "twiz-crazystupidlove-b.avi",
// "sparks-sng-xvid.avi",
// "South.Park.S16E06.REPACK.HDTV.x264-ASAP.mp4",
// "Its.Always.Sunny.in.Philadelphia.S08E02.HDTV.x264-2HD.mp4",
// "V-The.Empire.Strikes.Back[1980]DvDrip-aXXo.avi",
// "Looper 2012.avi",
// "IV-A.New.Hope[1977]DvDrip-aXXo.avi",
// "Breaking.Bad.S05E04.Fifty-One.HDTV.x264-FQM.mp4",
// "South.Park.S16E05.HDTV.x264-2HD.mp4",
// "Iros.Sky.2012.XviD.700MB.avi",
// "twiz-crazystupidlove-a.avi",
// "SAMPLE.avi",
// "Brave.2012.R5.DVDRip.XViD.LiNE-UNiQUE.avi",
// "Moonrise.Kingdom.2012.LiMiTED.BRRip.XVID.AbSurdiTy.avi",
// "deprived-mib3-xvid-cd1.avi",
// "The.Artist.2011.720p.BRRip.x264.AAC-ViSiON.mp4",
// "VI-Return.Of.The.Jedi[1983]DvDrip-aXXo.avi",
// "South.Park.S16E07.HDTV.x264-COMPULSiON.mp4",
// "Waterloo.avi",
// "South.Park.S16E02.HDTV.x264-ASAP.mp4",
// "Batman The Dark Knight [2008]-720p-BRrip-x264-KurdishAngel.mp4",
// "batman.begins-phrax.mp4",
// "Its.Always.Sunny.in.Philadelphia.S08E01.HDTV.x264-EVOLVE.mp4",
// "Breaking.Bad.S05E02.Madrigal.HDTV.x264-FQM.mp4",
// "South.Park.S16E03.HDTV.x264-2HD.mp4",
// "The.Dictator.2012.UNRATED.BDRip.XviD-AMIABLE.avi",
// "Breaking.Bad.S05E01.Live.Free.or.Die.HDTV.x264-FQM.mp4",
// "II-Attack.Of.The.Clones[2002]DvDrip-aXXo.avi",
// "deprived-rubysparks-xvid-cd2.avi",
// "South.Park.S16E01.HDTV.XviD-2HD.avi",
// "South.Park.S16E04.HDTV.x264-2HD.mp4",
// "I-The.Phantom.Menace[1999]DvDrip-aXXo.avi",
// "deprived-rubysparks-xvid-cd1.avi",
// "deprived-mib3-xvid-cd2.avi",
// "Its.Always.Sunny.in.Philadelphia.S08E03.HDTV.x264-KILLERS.mp4",
// "III-Revenge.Of.The.Sith[2005]DvDrip-aXXo.avi",
// "psig-tasm.2012.retail.dvdrip.xvid.avi"



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