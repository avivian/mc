require.config({
	baseUrl: '/static/js',
	paths: {
		'backbone' 					:  	'external/backbone',
		'underscore'				:  	'external/underscore',
		'underscore.string'         :   'external/underscore.string',
		'jquery' 					: 	'external/jquery',
		'jquery.ui' 				:   'external/jquery.ui',
		'touch-punch'				: 	'external/jquery.ui.touch-punch.min',
		'handlebars_main'           :   'external/handlebars',
		'handlebars'                :   'external/handlebars.object_helpers',
		'router'  					: 	'router',
		'templateManager'			: 	'template_manager'
	},
	shim: {
		'underscore'        :   { exports: '_' },
		'underscore.string' :   { deps: ['underscore']},
		'handlebars_main'   :   { exports: 'Handlebars' },
		'handlebars'        :   { deps: ['handlebars_main'], exports: 'Handlebars' },
		'backbone'          :   { deps: ['underscore', 'jquery'], exports: 'Backbone' }
	}	
});

require(['router',
		 'handlebars',
		 'templateManager'],
function(Router, Handlebars, templateManager){

	var router = new Router();

	var out = templateManager.initialize([
		'/static/html/templates/base.html']);

	$.when(out).then(function(){
		Backbone.history.start({pushState: false, root:'/'});
	});
	return this;
});
