define([
		//Third Party
		'jquery',
		'underscore',
		'backbone',
		//Managers
		'templateManager',
		//Views
		'views/VidListView',
		'views/PlaybackView'
		],
function($, _, Backbone, TemplateManager, VidListView, PlaybackView){
	var baseView = {
		el: 'body',
		initialize : function(){
			this.render();
		},
		render: function() {
			TemplateManager.renderTemplate('base', {}, this.el);
			this.vidView = new VidListView();
			this.playbackView = new PlaybackView();
			return this;
		}
	};
	return Backbone.View.extend(baseView);

});