;
(function($) {
	$.extend($.fn, {
		/*
		 * 初始化列表
		 */
		initGrid : function(options) {
			alert("initGrid-1");
			var $this = $(this[0]);
			var pager = '#' + $this.attr("id") + '-pagernav';
			options = $.extend({}, {
				mtype : 'post',
				datatype : "json",// 服务器返回的数据类型，常用的是xml和json两种
				rownumbers : true, // 显示序号
				// prmNames: {page:"start",rows:"limit", sort: "sort",order:
				// "dir"},
				rowNum : Constant.jQgrid.rowNum, // 默认的每页显示记录条数
				rowList : Constant.jQgrid.rowList,// 可供用户选择的每页显示记录条数。
				multiselect : true, // 是否显示复选框
				viewrecords : true,// 定义是否在导航条上显示总的记录数
				sortorder : "desc", // 默认的排序规则
				altRows : true,
				altclass : "altRows",
				shrinkToFit : false,
				pagerbar : true,
				pager : pager,// 导航条对应的Div标签的ID,注意一定是DIV，不是Table
				jsonReader : {
					root : 'list',// JSON数据根属性
					total : 'totalPage', // 总页数属性
					page : 'page', // 页码
					records : 'totalSize', // 总记录数
					repeatitems : false
				}
			}, options);
			if (options.autoLoad === false) {// 是否自动加载数据
				alert("initGrid-2");
				var datatype = options.datatype;
				options.datatype = 'local';
				setTimeout(function() {
					$this.jqGrid("setGridParam", {
						datatype : datatype
					});
				}, 200);
			}
			if (options.cols && options.cols.length > 0) {// 列属性转换
				var cols = options.cols;
				var colNames = [], colModel = [];
				var id, sort;
				for ( var i = 0; i < cols.length; i++) {
					var model = cols[i];
					if (!id && model.id === true) {// 是否为ID列
						id = model.name;
						delete model.id;
					}
					if (!sort && model.defaultsort === true) {// 是否默认排序列表
						sort = model.index || model.name;
						delete model.defaultsort;
					}
					colNames[i] = model.header || model.name;// 列头
					delete model.header;
					if (!model.width) {
						model.width = colNames[i].length * 14 + 20;
					}
					colModel[i] = model;
				}
				id = id || cols[0].name;
				options.jsonReader.id = options.jsonReader.id || id;
				options.sortname = options.sortname || sort;
				options.colNames = colNames;
				options.colModel = colModel;
			}
			if (options.pagerbar === true)
				$this.after("<div id=\"" + pager.substring(1) + "\"></div>");
			else {
				options.rowNum = 99999999;
			}
			var autoWidth = !options.width;
			var autoHeight = !options.height;
			// 自适应

			if (autoWidth || autoHeight) {
				var sizer = options.resizeTo ? $(options.resizeTo) : $this.parent();
				function getRHeight() {
					var leftHeight = 0;
					sizer.children().each(function() {
						if ($(this).attr('id') != ($('#gbox_' + $this.attr('id')) ? 'gbox_' + $this.attr('id') : $this.attr('id'))) {
							leftHeight += $(this).outerHeight();
						}
					});
					return leftHeight;
				}
				if (autoWidth)
					options.width = sizer.width() - 2;
				if (autoHeight)
					options.height = (sizer.height() || (sizer.is('body') ? document.documentElement.clientHeight : 100)) - (options.pagerbar ? 52 : 25) - getRHeight();
				function _resize() {
					if (autoWidth)
						$this.setGridWidth($(this).width() - 2);
					if (autoHeight)
						$this.setGridHeight(($(this).height() || ($(this).is('body') ? document.documentElement.clientHeight : 100)) - (options.pagerbar ? 52 : 25) - getRHeight());
				}
				$(sizer).bind('resize', _resize);
			}

			$this = $this.jqGrid(options);
			if (options.pagerbar === true) {
				$this.jqGrid('navGrid', pager, {
					edit : false,
					add : false,
					del : false,
					search : false
				});
			}
		},
		searchGrid : function(params) {
			objParams = params;
			// 获得当前postData选项的值
			var postData = $(this[0]).jqGrid("getGridParam", "postData");
			// 将查询参数融入postData选项对象
			$.extend(postData, params);
			$(this[0]).jqGrid("setGridParam", {
				search : true
			}).trigger("reloadGrid", [ {
				page : 1
			} ]); // 重新载入Grid表格
		},
		getSelectedRows : function() {
			var $this = $(this[0]);
			var selIds = $this.jqGrid('getGridParam', 'selarrrow');
			var selRows = [];
			$.each(selIds, function(i) {
				selRows[i] = $this.jqGrid("getRowData", this);
			});
			return selRows;
		},
		getSelectedIds : function() {
			return $(this[0]).jqGrid('getGridParam', 'selarrrow');
		},
		reloadGrid : function() {
			return $(this[0]).searchGrid({});
		},
		ifGridSelected : function() {
			return $(this[0]).jqGrid('getGridParam', 'selarrrow').length > 0;
		},
		ifGridSelectedOne : function() {
			return $(this[0]).jqGrid('getGridParam', 'selarrrow').length === 1;
		}
	});
})(jQuery);