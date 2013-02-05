define(function(require){

	var	$ = require("jquery"),
		Handlebars = require("handlebars");

	var instance = null;
	function templateManager (_templatePaths) {
		if (instance !== null){
			throw new Error("Cannot instantiate more than one MySingleton, use MySingleton.getInstance()");
		}
		$.when(this.initialize(_templatePaths)).then(function(){
			return;
		});
	}

	templateManager.prototype = {

		templateCache : {},

		initialize : function (templatePaths){
			var that = this;			

			if (typeof templatePaths === "undefined") templatePaths = [];
			var deferredArr = $.map(templatePaths, function( templatePath, i){
				return $.ajax({
					timeout: 60000,
					url: templatePath,
					success : function(source){
						$(source).filter('script').each(function(){
							that.templateCache[$(this).data('id')] = Handlebars.compile(this.innerHTML);
						});
					}
				});
			});
			
			return $.when.apply(null, deferredArr);
		},

		_renderHTML : function(templateId, data){
			if (typeof data === "undefined") data = {};
			if (templateId in this.templateCache){
				return this.templateCache[templateId](data);
			}else{
				throw new Error("templateManager: " + templateId + " not in templateCache");
			}
		},

		renderTemplate : function(templateId, data, el){
			$(el).html(this._renderHTML(templateId, data));

		},

		getHTML : function(templateId, data){
			return this._renderHTML(templateId, data)
		},

		appendTemplate : function(templateId, data, el){
			$(el).append(this._renderHTML(templateId, data));
		}

	}
	
	templateManager.getInstance = function(){
		if (instance === null){
			instance = new templateManager();
		}
		return instance;
	};

	return templateManager.getInstance();
});