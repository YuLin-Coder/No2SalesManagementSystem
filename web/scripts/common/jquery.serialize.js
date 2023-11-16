
(function($){
    $.fn.serializeObject = function(){
        var obj = {};
        $.each(this.serializeArray(), function(i, o){
            var n = o.name, v = (o.value);
            obj[n] = obj[n] === undefined ? v : $.isArray(obj[n]) ? obj[n].concat(v) : [obj[n], v];
        });
        return obj;
    };
    $.fn.serializeEncodeObject = function(){
        var obj = {};
        $.each(this.serializeArray(), function(i, o){
            var n = o.name, v = (o.value);
			v = v.replace(/[\n]/g, "\\n");
			v = v.replace(/[\r]/g, "");
			v = encodeURIComponent(v);
            obj[n] = obj[n] === undefined ? v : $.isArray(obj[n]) ? obj[n].concat(v) : [obj[n], v];
        });
        return obj;
    };
    
    function setValues(obj, data){
        if (!data) {return;}
        var inputArr = obj.find("INPUT");
        var textareaArr = obj.find("TEXTAREA");
        var selectArr = obj.find("SELECT");
		//循环给文本框赋值
        if (inputArr.length > 0) {
            $.each(inputArr, function(a){
                if (inputArr[a]) {
                    var varid = inputArr[a].id;
                    $(inputArr[a]).val(data[varid]);
                }
            })
        }
        //循环给textarea赋值
        if (textareaArr.length > 0) {
            $.each(textareaArr, function(a){
                if (textareaArr[a]) {
                    var varid = textareaArr[a].id;
                    $(textareaArr[a]).val(data[varid]);
                }
            })
        }
		//循环给select框赋值
		if (selectArr.length > 0) {
            $.each(selectArr, function(a){
                if (selectArr[a]) {
                    var varid = selectArr[a].id;
                    $(selectArr[a]).val(data[varid]);
                }
            })
        }
        
    }
    
    $.fn.loadValues = function(data){
        setValues(this, data);
    };
	
	$.fn.cleanValues = function(){
		var inputArr = this.find("INPUT");
        var textareaArr = this.find("TEXTAREA");
        var selectArr = this.find("SELECT");
		if(inputArr.length > 0){
			inputArr.val("");
		}
		if(textareaArr.length > 0){
			textareaArr.val("");
		}
		if(selectArr.length > 0){
			selectArr.val("");
		}
	}
	
	$.fn.mybutton = function(cssOut,cssHover) {
	$(this).addClass(cssOut);
	$(this).mouseover(function(){$(this).removeClass(cssOut);$(this).addClass(cssHover);});
	$(this).mouseout(function(){$(this).removeClass(cssHover);$(this).addClass(cssOut);});
	return $(this);
};
    
})(jQuery);



