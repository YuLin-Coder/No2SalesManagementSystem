$(function(                                                                                                                                                                                                                    ){
	var _outerAttrs = ['spinner', 'selected', 'event', 'cache', 'width', 'height'];
	var _innerAttrs = ['title', 'url'];
	$.fn.initTabs = function(options){
		var $this = $(this);
		var _options = {};
		for(j=0; j<_outerAttrs.length; j++){
			var aValue = $this.attr(_outerAttrs[j]);
			if(aValue){
				if(aValue.toLowerCase() === 'true') aValue = true;
				else if(aValue.toLowerCase() === 'false') aValue = false;
				else if(!isNaN(aValue)) aValue = Number(aValue);
				_options[_outerAttrs[j]] = aValue;
			}
			$this.removeAttr(_outerAttrs[j]);
		}
		_options.tabs = [];
		$this.children("div").each(function(i){
			_options.tabs[i] = {};
			for(j=0; j<_innerAttrs.length; j++){
				var aValue = $(this).attr(_innerAttrs[j]);
				if(aValue){
					if(aValue.toLowerCase() === 'true') aValue = true;
					else if(aValue.toLowerCase() === 'false') aValue = false;
					else if(!isNaN(aValue)) aValue = Number(aValue);
					_options.tabs[i][_innerAttrs[j]] = aValue;
				}
				$(this).removeAttr(_innerAttrs[j]);
			}
		});
		options = $.extend(true, {
       		ajaxOptions : {
				dataType:"html",
				error : function() {
					hAlert("页面异步加载失败");
				}
				}
		}, _options, options);
		$this.prepend("<ul></ul>");
		$this.children("div").each(function(i){
			var attr = options.tabs[i];
			var id;
			if(!$(this).attr("id")){
				id = "ui-tabs-hm-" +i;
				$(this).attr("id", id);
			}else{
				id = $(this).attr("id");
			}
			var id = "#" + id;
			if(attr.url) {
				id = attr.url;
				$(this).remove();
			}
			$this.find("ul:first-child").append("<li><a href='"+ id + "'>" + attr.title + "</a></li>");
		});
		delete options.tabs;
		$this.tabs(options);
	}
});