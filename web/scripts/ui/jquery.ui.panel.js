/*
 * ******************************************************************************************************************
 * 面板 Panel
 * ******************************************************************************************************************
 */
$(function(){
	jQuery.fn.panel = function(options) {
		var command;
		if(typeof options === 'string') command=options;
		var arr = arguments;
		switch(command){
		case 'collapse':
			$(this).attr("oh", $(this).height());
			$(this).attr("collapsed", true)
			$(this).children(".ui-panel-body").hide();
			$(this).children(".toolbar").hide();
			$(this).height(arr[1]);
			$(this).parent().resize();
			break;
		case 'expand':
			var h = $(this).attr("oh");
			$(this).attr("collapsed", false)
			$(this).children(".ui-panel-body").show();
			$(this).children(".toolbar").show();
			$(this).height(h);
			$(this).parent().resize();
			break;
		default:
			var cHeight = 0;
			$(this).addClass("ui-widget");
			if(!$(this).is('.ui-panel')) $(this).addClass("ui-panel");
			if(options.width)$(this).width(options.width);
			if(options.height)$(this).height(options.height);
			if(options.collapsible == true || options.collapsible == 'true'){
				$(this).first(".title_level*").find(".collapsible").show();
			}
			if($(this).children(".buttons").size()>0){
				$(this).children(".buttons").before("<h1/>") 
			}
			//if(options.width || options.height) return $(this);
			
			$(this).children().not(".ui-panel-body").each(function(){
				cHeight += $(this).outerHeight();
			})
			$(this).children(".ui-panel-body").resizeTo({heightOff:(-cHeight-3)});
		}
		return $(this);
	};
});

/**
 * 数据标签
 * 以hidden和div结合，展现数据
 * options
 * 		width
 * 		maxHeight
 */
$(function(){
	jQuery.fn.datalabel = function(options){
		options = $.extend({},options)
		var $this = $(this);
		$this.addClass("ui-widget");
		if(!$this.is("textarea")) alert("datalabel must based on textarea");
		if(!$this.is(".datalabel")) $this.addClass("datalabel");
		this[0].readOnly = true;
		function autoSize(){
			var widthExt = $this.outerWidth()-$this.width();
			$this.width(options.width||($this.parent().innerWidth()-widthExt));
			var height = $this[0].scrollHeight;
			var maxHeight = options?options.maxHeight:0;
			if(maxHeight>0 && height>maxHeight){
				height = maxHeight;
				$this.css("overflow-y", "auto")
			}else{
				$this.css("overflow-y", "hidden")
			}
			$this.height(height);
			setTimeout(autoSize, 100);
		}
		autoSize();
		return $(this);
	}
});

