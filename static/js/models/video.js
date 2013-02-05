define([
	'backbone'],
function(){
	var video = {
		id: null,
		name: null
	};
	return Backbone.Model.extend(video);
});