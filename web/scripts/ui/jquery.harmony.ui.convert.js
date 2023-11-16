$(function(){
	var Converter = {
		/*
		 * ******************************************************************************************************************
		 * 总体控制--页面组件生成
		 * ******************************************************************************************************************
		 */
		convertUI : function(context, which){
			if(which&&which.length>0){//单个执行
				Converter[which].call(this, context);
			}else{
				for(which in Converter){//逐个执行
					var f = Converter[which];
					if("convertUI" != which && typeof f == "function"){
						f.call(this, context);
					}
				}
			}
		}
	}
	$.convertUI = Converter.convertUI;
	$.extend(Converter, {
	/*
	 * ******************************************************************************************************************
	 * 工具栏扩展
	 * ******************************************************************************************************************
	 */
		"toolbar":	function (context){
			$(".toolbar", context).each(function(i, toolbar){
				$(toolbar).wrapInner("<div class='toolbar-inner'></div>");
				$(toolbar).wrapInner("<div class='toolbar-inner-wrap'></div>");
				$(toolbar).find("button").each(function(i, button){
					$(button).cssbutton();
				});
				$(toolbar).append("<div class='toolbar-scrollleft'>" +
						"<div class='ui-icon ui-icon-carat-1-w'></div>" +
						"</div>");
				$(toolbar).append("<div class='toolbar-scrollright'>" +
						"<div class='ui-icon ui-icon-carat-1-e'></div>" +
						"</div>");
				$(toolbar).find(".toolbar-scrollleft, .toolbar-scrollright")
					.mouseover(function(e, d){
						$(this).addClass("toolbar-scrollover");
					}).mouseout(function(e, d){
						$(this).removeClass("toolbar-scrollover");
				}).hide();
				function resize(){
					var realWidth = 100;
					$(toolbar).find(".toolbar-inner").children().each(function(){
						realWidth+=$(this).outerWidth()+2;
					});
					$(toolbar).find(".toolbar-inner").width(realWidth);
					var width = $(toolbar).find(".toolbar-inner-wrap").width();
					if(realWidth-width<100){
						$(toolbar).find(".toolbar-scrollleft, .toolbar-scrollright").hide();
						return;
					}
					var distance = 10;
					var time;
					$(toolbar).find(".toolbar-scrollleft, .toolbar-scrollright")
					.show()
					.mousedown(function(){
						var $this = $(this);
						clearTimeout(time);
						var move = function(){
							var scroll = $(toolbar).find(".toolbar-inner-wrap")
							var left = scroll.scrollLeft();
							if($this.is(".toolbar-scrollright")){
								if((realWidth-width) - left<= distance) return;
								scroll.scrollLeft(left+distance);
							}else if($this.is(".toolbar-scrollleft")){
								if(0 == left) return;
								scroll.scrollLeft(left-distance);
							}
							time = setTimeout(move, 10);
						}
						move();
					})
					.mouseup(function(){
						clearTimeout(time);
					});
				}
				resize();
				$(toolbar).resize(resize);
			});
		},

	/*
	 * ******************************************************************************************************************
	 * 导航栏
	 * ******************************************************************************************************************
	 */
		"navbar":	function (context){
			$(".navbar", context).each(function(i, navbar){
				var icon = $(navbar).attr("icon");
				$(navbar).prepend("<span class='navbar-icon navbar-default-icon " + icon + "'></span>");
				$(navbar).append("<div class='messages'></div>");
				$(navbar).append("<div class='deco_left'></div>");
			});
		},
		/*
		 * ******************************************************************************************************************
		 * 标题栏
		 * ******************************************************************************************************************
		 */
		"title":	function (context){
			$("div[class*=title_level]", context).each(function(i, title){
				$(title).wrapInner("<span></span>");
				$(title).addClass("ui-widget");
				$(title).addClass("title");
				var icon = $(title).attr("icon");
				if(icon) 
					$(title).prepend("<span class='ui-icon " + icon + "'></span>");
				$(title).append("<button class='collapsible'></button>");
				$(title).find(".collapsible").button({
					icons:{primary:"ui-icon ui-icon-circle-minus"},text:false
				}).click(function(){
					var target = $(title).parent();
					if(target.is(".ui-panel")){
						if(target.attr("collapsed")==true || target.attr("collapsed") == 'true'){
							target.panel("expand");
							$(this).button('option',
								'icons',
								{primary:"ui-icon ui-icon-circle-minus"}
							);
						}else{
							target.panel("collapse", $(title).outerHeight());
							$(this).button('option',
									'icons',
									{primary:"ui-icon ui-icon-circle-plus"}
							);
						}
					}
				}).hide();
			});
		},
		/*
		 * ******************************************************************************************************************
		 * 面板扩展
		 * ******************************************************************************************************************
		 */
		"panel"		:function(context){
			$(".panel", context).each(function(i, panel){
				var width = $(panel).attr("width");
				var height = $(panel).attr("height");
				
				var collapsible = $(panel).attr("collapsible");
				if((!$(panel)[0].style.height || $(panel)[0].style.height==0) && (!height || height==0 || !width || width==0)){
					$(panel).resizeTo();
				}
				$(panel).panel({width:width,height:height,collapsible:collapsible});
			});
		},
		
		/*
		 * ******************************************************************************************************************
		 * Tab面板扩展
		 * ******************************************************************************************************************
		 */
		"tabs":		function (context){
			$(".tab-panel", context).each(function(i, panel){
				$(this).prepend("<ul/>");
				var prefix = "Tab_"
				$(this).children("div").each(function(_i){
					var title = $(this).attr("title");
					var id = $(this).attr("id");
					var url = $(this).attr("url");
					if(!title) title = prefix + _i;
					if(!id){
						id = prefix + new Date().getTime() + _i;
						$(this).attr("id", id);
					}
					var a = $("<a/>");
					a.html(title);
					if(url) a.attr("href", url)
					else a.attr("href", "#" + id);
					var li = $("<li/>").append(a);
					$(this).siblings("ul").append(li);
				});
				var options = {ajaxOptions:{dataType:"html"}, cache:true,
						load:function(a, b){}//convertUI here??
				};
				var width = $(panel).attr("width");
				var height = $(panel).attr("height");
				var selected = $(panel).attr("selected")||0;
				options.selected = selected;
				$(this).tabs(options);
				if((!$(panel)[0].style.height || $(panel)[0].style.height==0) && (!height || !width)){
					$(panel).resizeTo();
				}else{
					$(this).width(width);
					$(this).height(height);
				}
				$(this).children(".ui-tabs-panel").resizeTo({heightOff:-$(this).children("ul").outerHeight()});
			});
		},
		/*
		 * ******************************************************************************************************************
		 * 布局
		 * ******************************************************************************************************************
		 */
		"layout":	function (context){
			$(".layout, .borderlayout", context).each(function(i, layout){
				var lSettings = {};
				var ifNoRegion = true;
				$(layout).children("div[region]").each(function(k, region){
					ifNoRegion = false;
					var dSettings = {size : 100,resizable:false, closable:false, slidable:false, spacing_open:0,spacing_closed:6,initClosed:false,initHidden:false};
					for(j=0; j<_layoutAttrs.length; j++){
						var aValue = $(region).attr(_layoutAttrs[j]);
						if(aValue){
							if(aValue.toLowerCase() === 'true') aValue = true;
							else if(aValue.toLowerCase() === 'false') aValue = false;
							else if(!isNaN(aValue)) aValue = Number(aValue);
							dSettings[_layoutAttrs[j]] = aValue;
						}
					}
					if((dSettings.resizable == true || dSettings.closable == true)
							&& dSettings.spacing_open == 0){
						dSettings.spacing_open = 6;
					}
					var r = dSettings.region;
					lSettings[r] = dSettings;
					switch(r){
					case 'north':
						$(this).addClass("ui-layout-north");
						break;
					case 'west':
						$(this).addClass("ui-layout-west");
						break;
					case 'south':
						$(this).addClass("ui-layout-south");
						break;
					case 'east':
						$(this).addClass("ui-layout-east");
						break;
					case 'center':
						$(this).addClass("ui-layout-center");
						lSettings[r] = {};
						break;
					}
				});
				if(!ifNoRegion){
					if(!$(layout)[0].style.height || $(layout)[0].style.height==0 || $(layout).height()==0 || $(layout).width()==0){
						$(layout).resizeTo();
					}
					_layouts[i] = {id:$(layout).attr("id"),layout:$(layout).layout(lSettings)};
				}
			});
		},
		/*
		 * ******************************************************************************************************************
		 * 附件
		 * ******************************************************************************************************************
		 */
		"attachment":	function (context){
			$("div[class=attachment]", context).each(function(i, attachment){
				var dSettings = {};
				for(i=0; i<_attachmentAttrs.length; i++){
					var aValue = $(attachment).attr(_attachmentAttrs[i]);
					if(aValue){
						if(aValue.toLowerCase() === 'true') aValue = true;
						else if(aValue.toLowerCase() === 'false') aValue = false;
						dSettings[_attachmentAttrs[i]] = aValue;
					}
				}
				$(attachment).uploadify(dSettings);
			});
		},
		/*
		 * ******************************************************************************************************************
		 * 表单
		 * ******************************************************************************************************************
		 */
		"form":		function (context){
//			$(".formarea td", context).each(function(){
//				if($(this).children().length == 0){
//					$(this).wrapInner("<label></label>");
//				}
//			});
//			$(".formarea input,.formarea textarea,.formarea select", context).each(function(){
//				$(this).wrap("<div class='iniputvalue'></div>")
//			});
			$("form[type=ajax]", context).each(function(){
				$(this).initAjaxForm();
			});
		},
		
		/*
		 * ******************************************************************************************************************
		 * 数据标签
		 * ******************************************************************************************************************
		 */
		"datalabel":	function (context){
			$("textarea.datalabel", context).each(function(){
				$(this).datalabel({
					width:$(this).attr("width")||undefined,
					maxHeight:$(this).attr("maxHeight")||0
				});
			});
		},
		
		/*
		 * ******************************************************************************************************************
		 * 数字输入
		 * ******************************************************************************************************************
		 */
		"numeric":	function (context){
			$("input.number", context).each(function(){
				$(this).numeric({
					decimal:($(this).attr("width")||"").toLowerCase()==='false'?false:".",
					negative:($(this).attr("negative")||"").toLowerCase() === 'false'?false:true
				});
			});
		},
		
		"dialog":	function(context){
			$(".dialog", context).each(function(){
				var buttons = [];
				$(this).find(".buttons > button").each(function(){
					var b = {};
					b.text = $(this).html();
					b.id = $(this).attr("id");
					buttons.push(b);
				});
				$(this).children(".buttons").remove();
				var dSettings = {"width":400,"height":300,"modal":true,"resizable":true,"draggable":true};
				for(j=0; j<_dialogAttrs.length; j++){
					var aValue = $(this).attr(_dialogAttrs[j]);
					if(aValue){
						if(aValue.toLowerCase() === 'true') aValue = true;
						else if(aValue.toLowerCase() === 'false') aValue = false;
						else if(!isNaN(aValue)) aValue = Number(aValue);
						dSettings[_dialogAttrs[j]] = aValue;
					}
				}
				dSettings.buttons = buttons;
				$(this).dialog(dSettings);
			});
		},
		/*
		 * ******************************************************************************************************************
		 * 按钮区域
		 * ******************************************************************************************************************
		 */
		"buttons":	function (context){
			$(".buttons button", context).each(function(i, button){
				$(button).cssbutton();
			});
		}
	});

	
	
	
	
	//在导航栏中的提示信息
	var fadetime;
	/**
	 * 导航栏上的消息显示
	 * @param message	要提示的信息
	 * @param success	标识是成功消息还是失败消息（可选，默认为成功消息）
	 */
	 function showMessage(msg, message, success){
		msg.empty();
		msg.append(message);
		msg.removeClass();
		msg.addClass("messages");
		if(success === false){
			msg.addClass("error");
		}else{
			msg.addClass("success");
		}
		msg.effect( "shake", {direction:"up", distance:2, times:6}, 50, function(){
			if(fadetime)
				clearTimeout(fadetime);
			fadetime = setTimeout(function() {
				msg.fadeOut();
			}, 10000 );
		});
	};
	$.showMessage = function(message, success){
		var msg = $(".navbar").find(".messages");
		showMessage($(msg), message, success)
	}
	$.fn.showMessage = function(message, success){
		var msg = $(this).find(".messages");
		showMessage($(msg), message, success)
	}
	
	function navText(nav, text){
		nav.find("h2").html(text);
	}
	$.navText = $.fn.navText = function(text){
		var nav;
		if(this == $) nav = $(".navbar");
		else if($(this).is(".navbar")) nav = $(this);
		navText(nav, text);
	}
		
	var _layoutAttrs = ["region","applyDefaultStyles","scrollToBookmarkOnLoad","showOverflowOnHover","closable","resizable","slidable","size","minSize","maxSize","spacing_open","spacing_closed","initClosed","initHidden","onshow","onshow_start","onshow_end","onhide","onhide_start","onhide_end","onopen","onopen_start","onopen_end","onclose","onclose_start","onclose_end","onresize","onresize_start","onresize_end"];
	var _layouts = [];
	
	/*
	 * 静态方法，获取当前页面的layout
	 * @v layout的ID或index
	 */
	$.layouts = function(v){
		if(typeof v === 'number'){
			return _layouts[v].layout;
		}else{
			for(i=0; i<_layouts.length; i++){
				var l = _layouts[i];
				if(l.id === v){
					return l.layout;
				}
			}
		}
		return null;
	}
	
	var _attachmentAttrs = ["idfield","deleteUrl","updateUrl","downUrl","listUrl","script","cancelImg","buttonImg","queueSizeLimit","fileExt","width","height","auto","multi","readOnly","sizeLimit","attachmentType"];
	
	var _dialogAttrs = ["width","height","title","title_icon","modal","resizable","draggable"];
/*	$.convertUI = function(context){
		convert_layout(context);
		convert_tabs(context);
		convert_panel(context);
		convert_form(context);
		convert_navbar(context);
		convert_toolbar(context);
		convert_title(context);
		convert_buttons(context);
		convert_attachment(context);
		convert_datalabel(context);
		convert_numeric(context);
	}*/
	$.convertUI();
});