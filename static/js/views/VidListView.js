define([
		//Third Party
		'jquery',
		'underscore',
		'backbone',
		//Managers
		'templateManager',
		//
		'collections/videos'
		],
function($, _, Backbone, TemplateManager, VideoCollection){
	var vidListView = {
		el: '.video-list',
		events: {
			'click li.video-item': 'playbackVideo'
		},
		initialize : function(){
			this.videoCollection = new VideoCollection();
			_.bindAll(this, 'render');
			this.videoCollection.bind('reset', this.render);
			this.videoCollection.fetch();
		},
		playbackVideo: function(event){
			var vidID = $(event.currentTarget).data('id');
			console.log(vidID);
			$.ajax({
				url: '/api/video/playback',
				type: 'GET',
				data: 'v='+vidID
			});
		},
		render: function() {
			var videos = this.videoCollection.toJSON();
			console.log(videos);
			TemplateManager.renderTemplate('vid_list', {videos: videos}, this.el);
			return this;
		}
	};
	return Backbone.View.extend(vidListView);

});