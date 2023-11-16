;(function($){
	$.ajaxSettings.traditional = true;
})(jQuery);
/*
 * 扩展Jquery错误机制，统一处理错误
 */
;(function($){
	var errorMessages = {
			"400" : "请求无效",
			"401.1" : "未授权：登录失败",
			"401.2" : "未授权：服务器配置问题导致登录失败",
			"401.3" : "ACL 禁止访问资源",
			"401.4" : "未授权：授权被筛选器拒绝",
			"401.5" : "未授权：ISAPI 或 CGI 授权失败",
			"403" : "禁止访问",
			"403" : "对 Internet 服务管理器 (HTML) 的访问仅限于 Localhost",
			"403.1" : "禁止访问：禁止可执行访问",
			"403.2" : "禁止访问：禁止读访问",
			"403.3" : "禁止访问：禁止写访问",
			"403.4" : "禁止访问：要求 SSL",
			"403.5" : "禁止访问：要求 SSL 128",
			"403.6" : "禁止访问：IP 地址被拒绝",
			"403.7" : "禁止访问：要求客户证书",
			"403.8" : "禁止访问：禁止站点访问",
			"403.9" : "禁止访问：连接的用户过多",
			"403.10" : "禁止访问：配置无效",
			"403.11" : "禁止访问：密码更改",
			"403.12" : "禁止访问：映射器拒绝访问",
			"403.13" : "禁止访问：客户证书已被吊销",
			"403.15" : "禁止访问：客户访问许可过多",
			"403.16" : "禁止访问：客户证书不可信或者无效",
			"403.17" : "禁止访问：客户证书已经到期或者尚未生效",
			"404.1" : "无法找到 Web 站点",
			"404" : "无法找到文件",
			"405" : "资源被禁止",
			"406" : "无法接受",
			"407" : "要求代理身份验证",
			"410" : "永远不可用",
			"412" : "先决条件失败",
			"414" : "请求 的 URI 太长",
			"500" : "内部服务器错误",
			"500.100" : "内部服务器错误",
			"500.11" : "服务器关闭",
			"500.12" : "应用程序重新启动",
			"500.13" : "服务器太忙",
			"500.14" : "应用程序无效",
			"500.15" : "不允许请求 global.asa",
			"501" : "未实现",
			"502" : "网关错误"
	};
    var $_ajax=$.ajax;  
     $.ajax=function(s){
    	 s = $.extend({
    		 dataType : "json",
             cache : false, 
             type : "POST"
    	 }, s);
        var old=s.error;  
        var errHeader=s.errorHeader||"Error-Json";  
         s.error=function(xhr,statusText,err){  
        	 var statusCode = xhr.status;
        	 switch(statusCode){
        	 case 200:
        		 if(statusText == 'parsererror'){
        			 alert("返回数据格式转换错误！");
        		 }else{
        			 alert("数据已返回，但出现未知错误！");
        		 }
        		 break;
        	 case 500:
        		 try{
        			 var o = eval("("+xhr.responseText+")");
        			 if(o.success !== undefined){
        				 alert(o.message||errorMessages[statusCode]);
        				 break;
        			 }
        		 }catch(e){alert(e.message)};
        	 default :
        		 alert("网络访问错误：" +　(errorMessages[statusCode]) || '与服务器通讯失败');
        	 }
        	 if(typeof old == "function"){
        		 old.call(this, xhr,statusText,err);
        	 }
         };
         var oldsucc = s.success;
         s.success = function(data, textStatus, jqXHR){
        	 if(typeof oldsucc == "function"){
        		 oldsucc.call(this, data, textStatus, jqXHR);
        	 }
         }
         if(s.url.indexOf("?") > 0){
        	 s.url += '&requestMode=ajax'
         }else {
        	 s.url += '?requestMode=ajax'
         }
         $_ajax(s);  
     }  
  
})(jQuery);

//resize事件扩展，解决firefox下div无法捕捉resize事件的问题
;(function($,window,undefined){
  '$:nomunge'; 
  var elems = $([]),
    jq_resize = $.resize = $.extend( $.resize, {} ),
    timeout_id,
    str_setTimeout = 'setTimeout',
    str_resize = 'resize',
    str_data = str_resize + '-special-event',
    str_delay = 'delay',
    str_throttle = 'throttleWindow';
    jq_resize[ str_delay ] = 250;
    jq_resize[ str_throttle ] = false;
  $.event.special[ str_resize ] = {
    setup: function() {
      if ( !jq_resize[ str_throttle ] && this[ str_setTimeout ] ) { return false; }
      var elem = $(this);
      elems = elems.add( elem );
      $.data( this, str_data, { w: elem.width(), h: elem.height() } );
      if ( elems.length === 1 ) {
        loopy();
      }
    },
    teardown: function() {
      if ( !jq_resize[ str_throttle ] && this[ str_setTimeout ] ) { return false; }
      var elem = $(this);
      elems = elems.not( elem );
      elem.removeData( str_data );
      if ( !elems.length ) {
        clearTimeout( timeout_id );
      }
    },
    add: function( handleObj ) {
      if ( !jq_resize[ str_throttle ] && this[ str_setTimeout ] ) { return false; }
      var old_handler;
      function new_handler( e, w, h ) {
        var elem = $(this),
          data = $.data( this, str_data );
        data.w = w !== undefined ? w : elem.width();
        data.h = h !== undefined ? h : elem.height();
        old_handler.apply( this, arguments );
      };
      if ( $.isFunction( handleObj ) ) {
        old_handler = handleObj;
        return new_handler;
      } else {
        old_handler = handleObj.handler;
        handleObj.handler = new_handler;
      }
    }
  };
  function loopy() {
    timeout_id = window[ str_setTimeout ](function(){
      elems.each(function(){
    	  if($(this).is(":hidden")) return;
        var elem = $(this),
          width = elem.width(),
          height = elem.height(),
          data = $.data( this, str_data );
        if (data && ( width !== data.w || height !== data.h ) ){
          elem.trigger( str_resize, [ data.w = width, data.h = height ] );
        }
      });
      loopy();
    }, jq_resize[ str_delay ] );
  };
})(jQuery,this);

;(function($){
	/**
	 * 当满足条件时执行函数
	 * @param scope		函数执行作用域
	 * @param _callee	被执行的方法
	 * @param _untilFuc	返回执行的条件
	 * 例：
	 * $.untilCall(this, function(){
	 * 		alert(a);
	 * }, function(){
	 * 		return a!=null;
	 * })
	 */
	$.untilCall = function(scope, _callee, _untilFuc){
		var t;
		function fuc(){
			var fn = _untilFuc.call(scope);
			if(!fn){
				t = setTimeout(fuc,5);
			}else{
				_callee.call(scope);
				clearTimeout(t);
			}
		}
		t = setTimeout(fuc,5);
	};
	
	$.extend($.fn, {
		//自适应
		/**
		 * 自适应大小
		 * options = {
		 * 		heightOnly 	: 只适应高度,
		 *		widthOnly 	: 只适应宽度,
		 *		heightOff 	: 高度减少值,
		 *		widthOff 	: 宽度减少值
		 *		target		：适应目标
		 * }
		 */
		resizeTo : function(s){
			var sizer, $this = $(this), option={
				heightOnly : false,
				widthOnly : false,
				heightOff : 0,
				widthOff : 0
			};
			if(typeof s == 'string'){
				sizer = $(s);
			}else{
				if(!s){
					sizer = $this.parent();
				}else{
					if(!s.target) s.target = $this.parent();
					sizer = $(s.target);
					$.extend(option, s);
				}
			}
			var ex_width = $this.width() - $this.outerWidth();
			var ex_height = $this.height() - $this.outerHeight();
			function _resize(){
				if(!option.heightOnly)$this.width(sizer.width() + ex_width + option.widthOff);
				if(!option.widthOnly)$this.height((sizer.is('body')?document.documentElement.clientHeight:sizer.height()) + ex_height + option.heightOff);
			}
			_resize();
			$(sizer).bind('resize', _resize);
		}
	});
})(jQuery);