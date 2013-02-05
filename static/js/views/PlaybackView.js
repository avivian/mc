define([
		//Third Party
		'jquery',
		'jquery.ui',
		'touch-punch',
		'underscore',
		'backbone',
		//Managers
		'templateManager'],
function($, JQueryUI, touchPunch, _, Backbone, TemplateManager){
	var playbackView = {
		el: '.playback',
		events:{
			'click button.launch': 'launchButton',
			'click img.pause': 'pauseButton',
			'click .play': 'playButton',
			'click img.fwd': 'fwdButton',
			'click img.back': 'backButton',
			'click img.stop': 'exitButton',
			'click button.fullscreen': 'fullscreenButton',
			'click button.snapshot': 'snapshotButton'
		},
		initialize : function(){
			this.render();
		},

		snapshotButton: function(){
			$.ajax({
				url: '/api/video/snapshot'
			});
			console.log("snapshot")
		},

		fullscreenButton: function(){
			$.ajax({
				url: '/api/video/fullscreen'
			});
			console.log("fullscreen");
		},

		launchButton: function(){
			$.ajax({
				url: '/api/video/launch',
				type: 'GET'
			});
			console.log("Launch");
		},
		fwdButton: function(){
			$.ajax({
				url: '/api/video/skipfwd',
			});
		},
		backButton: function(){
			$.ajax({	
				url: '/api/video/skipback',
			});
		},
		pauseButton: function(){
			$.ajax({
				url: '/api/video/pause'
			});
		},

		playButton: function(){
			console.log("play");
			$.ajax({
				url: '/api/video/play',
				type: 'GET'
			});
		},

		exitButton: function(){
			$.ajax({
				url: '/api/video/exit',
				type: 'GET'
			})
			console.log("Exit");
		},

		sliderChange: function(e, ui){
			var offset = $('#slider').slider('value');
			console.log("Slider Change");
			console.log("touchPunch", touchPunch);
			console.log("jui", JQueryUI);
			$.ajax({
				url: '/api/video/seek',
				type: 'GET',
				data: 'offset='+offset
			});

		},

		render: function() {
			TemplateManager.renderTemplate('playback_buttons', {}, this.el);
			$('#slider').slider({'orientation': 'horizontal',
								 'max': 100,
								 'change': this.sliderChange,
								 'slide': this.sliderChange});

			return this;
		}
	};
	return Backbone.View.extend(playbackView);

});