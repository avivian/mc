define(['backbone',
		'jquery',
		'views/BaseView'],
function(
		Backbone,
		$,
		BaseView
	){
	var router = {
		routes: {
			'' : 'loadBaseView'
		},
		loadBaseView: function(){
			var baseView = new BaseView();
		}
	};
	return Backbone.Router.extend(router);
});