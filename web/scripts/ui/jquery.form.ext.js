/**
 * @author TZQ
 */
(function($){
	$.extend($.fn, {
		/*
		 * 提交表单
		 * @options 作为ajax的配置参数
		 */
		submitForm : function(options){
			options = $.extend({}, options);
			var $this = $(this[0]);
			//1.验证表单
			if(!$this.validForm()) return false;
			
			//2.提交表单
			var attachmentIds = '';
			var attachments = $(this[0]).find(".attachment")
				.each(function(){
					var ids = $(this).uploadifyIds();
					attachmentIds += (attachmentIds&&ids)?(","+ids):ids;
			});
			options.data = options.data||{};
			$.extend(options.data,{
				uploadAttachmentIds : attachmentIds
			});
			var success = options.success;
			delete options.success;
			var failure = options.failure;
			delete options.failure;
			$this.attr("method", "POST");
			$this.ajaxSubmit($.extend({
				url : $this.attr('action'),
				dataType: "json",
				success : function(response){
					var data = response;
					if(data.success === true){
						if(success && (typeof success)==="function"){
							success.call($this, data, options);
						}
						$this.trigger("submitsuccess", [data, options]);
					}else{
						if(failure && (typeof failure)==="function"){
							failure.call($this, data, options);
						}
						$this.trigger("submitfailure", [data, options]);
					}
				}
			}, options));
			return true;
		},
		/**
		 * 验证表单
		 */
		validForm : function(){
			var valided = true;
			var attachments = $(this[0]).find(".attachment")
				.each(function(){
					var v = $(this).uploadifyComplete();
					if(!v){
						hAlert("附件上传未完成，请稍等");
					}
					valided &= v;
				});
			return valided && $(this[0]).valid();
		},
		/*
		 * Ajax加载表单
		 * @options 当options为String时，options作为ajax的URL参数，当options为Object时，options作为Ajax配置参数
		 * @data 仅当options为String时，data为作ajax的补充数据参数
		 * 
		 */
		loadForm : function(options, data){
			if(!options) return;
			var $this = $(this[0]);
			if(typeof options === 'string'){
				$.ajax({
					url : options,
					type : 'post',
					dataType: "json",
					data: data||{},
					success: function(response) {
						var d = response;
						if(d.success){
							$this.loadValues(d.data);
							$this.trigger("loadsuccess", [d, options]);
						}else{
							$this.trigger("loadfailure", [d, options]);
						}
					}
				});
			}else if(typeof options === 'object'){
				var success = options.success;
				delete options.success;
				$.ajax($.extend({
					type : 'post',
					dataType: "json",
					success: function(response) {
						var d = response;
						if(d.success){
							$this.loadValues(d.data);
							$this.trigger("loadsuccess", [d, options]);
							if(typeof success == "function"){
								success.call(this, response);
							}
						}else{
							$this.trigger("loadfailure", [d, options]);
						}
					}
				}, options));
			}
		},
		/*
		 * 加载表单数据
		 * @data 表单数据
		 * @id 主键数据
		 */
	    loadValues : function( data, id ){
	        if (!data) {return;}
	        var obj = $(this[0]);
			//循环给文本框赋值
	        var inputArr = obj.find("INPUT");
	        if (inputArr.length > 0) {
	            $.each(inputArr, function(a){
	                if (inputArr[a]) {
	                    var varid = inputArr[a].name;
	                    switch(inputArr[a].type){
	                    case "radio":
	                    	if(data[varid] == $(inputArr[a]).val())
	                    		inputArr[a].checked = true;
	                    	break;
	                    case "checkbox":
	                    	if($.isArray(data[varid])){
	                    		$.each(data[varid], function(i, d){
	                    			if(d == $(inputArr[a]).val())
	    	                    		inputArr[a].checked = true;
	                    		});
	                    	}else{
	                    		if(data[varid] == 1)
    	                    		inputArr[a].checked = true;
	                    	}
	                    	break;
	                    default:
	                    	$(inputArr[a]).val(data[varid]);
	                    }
	                }
	            })
	        }
	        //循环给textarea赋值
	        var textareaArr = obj.find("TEXTAREA");
	        if (textareaArr.length > 0) {
	            $.each(textareaArr, function(a){
	                if (textareaArr[a]) {
	                    var varid = textareaArr[a].name;
	                    $(textareaArr[a]).val(data[varid]);
	                }
	            })
	        }
			//循环给select框赋值
	        var selectArr = obj.find("SELECT");
			if (selectArr.length > 0) {
	            $.each(selectArr, function(a){
	                if (selectArr[a]) {
	                    var varid = selectArr[a].name;
	                    $(selectArr[a]).val(data[varid]+"");
	                }
	            })
	        }
	        //循环加载附件列表
			var attachments = obj.find(".attachment").each(function(){
					$(this).uploadifyRef();
			});
	    },
	    clearForm : function() {
//	    	alert($(this[0]).find(".attachment").length)
			//var attachments = $(this[0]).find(".attachment").uploadifyQueueClear();
			var $this = this;
	    	return this.each(function() {
	    		if($(".attachment", $this).length>0)
	    			$(".attachment", $this).uploadifyQueueClear();
	    		$this.validate().resetForm();
	    		$('input,select,textarea', $this).clearFields();
	    	});
	    },
	    formToObject : function(){
	        var obj = {};
	        $.each(this.formToArray(), function(i, o){
	            var n = o.name, v = o.value;
	            obj[n] = obj[n] === undefined ? v : $.isArray(obj[n]) ? obj[n].concat(v) : [obj[n], v];
	        });
	        return obj;
	    },
		initAjaxForm : function(){
			var $this = $(this[0]);
			if(!$this.is("form")) return false;
			$this.validate({});
			$this.unbind("submit");
			$this.submit(function(e){
				if (!e.isDefaultPrevented())  // if event has been canceled, don't proceed
					e.preventDefault();
				
				var $$this = $(this);
				$$this.submitForm();
				return false;
			});
		},
		clearFields : function() {
			var re = /^(?:color|date|datetime|email|month|number|password|range|search|tel|text|time|url|week|hidden)$/i;
			return this.each(function() {
				var t = this.type, tag = this.tagName.toLowerCase();
				if (re.test(t) || tag == 'textarea') {
					this.value = '';
				}
				else if (t == 'checkbox' || t == 'radio') {
					this.checked = false;
				}
				else if (tag == 'select') {
//					this.selectedIndex = -1;
					this.selectedIndex = 0;
				}
			});
		}
	});
})(jQuery);