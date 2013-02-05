define([
	'models/video', 
	'backbone', 
	'underscore'], 
function(video){
	var videos = {
		model: video,
		url: '/api/video/list',
	};
	return Backbone.Collection.extend(videos);
});
