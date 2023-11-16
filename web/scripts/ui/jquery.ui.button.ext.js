$(function(){
	/*
	 * ******************************************************************************************************************
	 * 自定义样式按钮 
	 * ******************************************************************************************************************
	 */
	var _buttons_options = ["icon", "hideText"];
	jQuery.fn.cssbutton = function(cssOut,cssHover) {
		var dSettings = {};
		for(i=0; i<_buttons_options.length; i++){
			var aValue = $(this).attr(_buttons_options[i]);
			if(aValue){
				if(aValue.toLowerCase() === 'true') aValue = true;
				else if(aValue.toLowerCase() === 'false') aValue = false;
				dSettings[_buttons_options[i]] = aValue;
			}
		}
		if(dSettings.icon)dSettings.icons={primary:dSettings.icon};
		delete dSettings.icon;
		if(dSettings.hideText)dSettings.text = false;
		if (this.parent().is(".toolbar-inner")) {//在样式“toolbar-inner”下的所有button都加上固定样式
			if ((typeof cssOut)=='undefined' || (typeof cssOut)=='string'){
				cssOut = cssOut||'btn';
				cssHover = cssHover||'btn_hover';
				rendeBtn($(this));
			}else{
				return $(this).button($.extend(true, dSettings, cssOut));
			}
		}
		else{
			if ((typeof cssOut) == 'string' && (typeof cssHover) == 'string') {//设置了样式的，直接使用设置的样式
				rendeBtn($(this));
			}
			else {
				return $(this).button($.extend(true, dSettings, cssOut));
			}
		}
		function rendeBtn(o){
			o.button(dSettings);
			o.addClass(cssOut);
			o.mouseover(function(){$(this).addClass(cssHover);});
			o.mouseout(function(){$(this).removeClass(cssHover);});
		}
		return $(this);
	};
});
