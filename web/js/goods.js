var tableHtml = "";
var bgColor = "#FFF";
var paramString = "paramString";
var ids = "";// id字符串
var idsArr;// id数组
var hasCheckAll = false;
var currPage = 1;// 当前第几页
var pageCount = 0;

var selectCount = 0;// 选中数

$(function() {
	initData();
	function initData() {
		hasCheckAll = false;
		tableHtml = "";
		$.ajax({
			type : "post",
			url : templateRoot + 'goods/Goods_pagelist.action',
			data : {
				"currPage" : currPage
			},
			dataType : "json",
			cache : false,
			success : function(data, textStatus) {
				var obj = data.data;
				displayData(obj);
				setPageInfo(obj);
				if (obj.data.length == 0) {
					if (currPage > 1) {
						currPage--;
						initData();
					}
				}
			}
		});
	}

	$("#productionDate").datetime({
		dateFmt : 'yyyy-MM-dd',
		skin : 'ext'
	});

	// 用表格形式展示列表
	function displayData(data) {
		tableHtml += "<tr style='background-color: #DCF1FC;height:22px;color:#065A93;font-size:14px;font-weight:bold;cursor:none;'>";
		tableHtml += "<td style='text-align: center; width:25px;'>-</td>";
		tableHtml += "<td style='text-align: center; width:25px;'><input type='checkbox' onclick='checkAll();' id='checkAll'/></td>";
//		tableHtml += "<td style='text-align: center; width:auto;'>ID</td>";
		tableHtml += "<td style='text-align: center; width:auto;'>名称</td>";
		tableHtml += "<td style='text-align: center; width:auto;'>编码</td>";
		tableHtml += "<td style='text-align: center; width:auto;'>类型</td>";
		tableHtml += "<td style='text-align: center; width:auto;'>规格</td>";
		tableHtml += "<td style='text-align: center; width:auto;;'>计量单位</td>";
		tableHtml += "<td style='text-align: center; width:auto;'>单价</td>";
		tableHtml += "<td style='text-align: center; width:auto;;'>生产日期</td>";
		tableHtml += "<td style='text-align: center; width:auto;'>保质期(月)</td>";

		$.each(data.data, function(i, item) {
			if (i % 2 == 0) {
				bgColor = "#FFF";
			} else {
				bgColor = "#EEE";
			}
			tableHtml += "<tr style='background-color: " + bgColor + ";height:22px;' ondblclick='showDetailDialog(\"" + item.id + "\");'>";
			tableHtml += "<td style='text-align: center;'>" + (i + 1) + "</td>";
			tableHtml += "<td style='text-align: center;'><input name='ids' type='checkbox' class='checkItem' id='check-'" + i + " value='" + item.id + "'/></td>";
//			tableHtml += "<td style='text-align: center;'>" + item.id + "</td>";
			tableHtml += "<td style='text-align: center;'>" + item.name + "</td>";
			tableHtml += "<td style='text-align: center;'>" + item.code + "</td>";
			tableHtml += "<td style='text-align: center;'>" + item.type + "</td>";
			tableHtml += "<td style='text-align: center;'>" + item.specification + "</td>";
			tableHtml += "<td style='text-align: center;'>" + item.unit + "</td>";
			tableHtml += "<td style='text-align: center;'>" + item.price + "</td>";
			tableHtml += "<td style='text-align: center;'>" + item.productionDate + "</td>";
			tableHtml += "<td style='text-align: center;'>" + item.shelfLife + "</td>";
		});
		$("#goodsTable").html(tableHtml);
	}

	// 按钮绑定事件
	$("#addB").click(function() {
		addDialog();
	});

	$("#editB").click(function() {
		getCheckedItem();
		if (idsArr.length != 1) {
			hAlert("请选择一条记录!");
			return false;
		} else {
			updateDialog(idsArr[0]);
		}
	});

	$("#deleteB").click(function() {
		getCheckedItem();
		if (idsArr.length < 1) {
			hAlert("请选择要删除的记录!");
			return false;
		}
		hConfirm('您确定要删除所选记录吗？', null, function(r) {
			if (!r)
				return false;
			$.ajax({
				type : "post",
				url : templateRoot + 'goods/Goods_deleteByIds.action',
				data : {
					"relationId" : idsArr
				},
				dataType : "json",
				cache : false,
				success : function(data, textStatus) {
					hAlert(data.msg);
					initData();
				}
			});
		});
	});

	$("#refreshB").click(function() {
		initData();
	});

	$("#testB").click(function() {
		$.ajax({
			type : "post",
			url : templateRoot + 'goods/Goods_goodsTest.action',
			dataType : "json",
			cache : false,
			success : function(data, textStatus) {
				hAlert(data.msg);
			}
		});
	});

	// 新建弹出窗口
	$("#addDialog").dialog({
		width : 500,
		height : 300,
		buttons : { // 为对话框添加按钮
			"保存" : function() {
				save();
			},
			"重置" : function() {
				$("#goodsForm").clearForm();
			},
			"取消" : function() {
				$("#addDialog").dialog("close");
			}
		},
		open : function() {
		},
		close : function() {
			$("#goodsForm").clearForm();
		}
	});

	// 弹出新建窗口
	function addDialog() {
		$("#goodsForm").clearForm();
		$("#addDialog").dialog("option", "title", "新建商品").dialog("open");
		openInput();
	}

	// 弹出修改窗口
	function updateDialog(id) {
		$("#addDialog").dialog("option", "title", "修改商品信息").dialog("open");
		openInput();
		$.ajax({
			type : "post",
			url : templateRoot + 'goods/Goods_getById.action',
			data : {
				"relationId" : id
			},
			dataType : "json",
			cache : false,
			success : function(data, textStatus) {
				if (data.code==0) {
					setForm(data.data);
				} else {
					hAlert("加载数据失败");
				}
			}
		});
	}

	// 获取被选中对象
	function getCheckedItem() {
		var j = 0;
		idsArr = new Array();// id数组
		$.each($(".checkItem"), function(i, item) {
			if ($(this).attr("checked")) {
				// alert($(this).val());
				idsArr[j] = $(this).val();
				j++;
			}
		});
	}

	// 展示详细信息窗口
	$.fn.showDetail = function(id) {
		$("#addDialog").dialog("option", "title", "查看商品信息").dialog("open");
		disableInput();
		$.ajax({
			type : "post",
			url : templateRoot + 'goods/Goods_getById.action',
			data : {
				"relationId" : id
			},
			dataType : "json",
			cache : false,
			success : function(data, textStatus) {
				if (data.code==0) {
					setForm(data.data);
				} else {
					hAlert("加载数据失败");
				}
			}
		});
	}

	// 为表单填值
	function setForm(data) {
		$("#id").val(data.id);
		$("#name").val(data.name);
		$("#code").val(data.code);
		$("#type").val(data.type);
		$("#unit").val(data.unit);
		$("#price").val(data.price);
		$("#productionDate").val(data.productionDate);
		$("#shelfLife").val(data.shelfLife);
		$("#note").val(data.note);
		$("#specification").val(data.specification);
	}

	// 禁用输入并隐藏按钮
	function disableInput() {
		$("input[type=text]").attr("readonly", "readonly");
		$("input[type=password]").attr("disabled", "disabled");
		$(".Wdate").attr("disabled", "disabled");
		$("select").attr("disabled", "disabled");
		$(".ui-dialog-buttonpane button").slice(0, 2).hide();
		$("textarea").attr("readonly", "readonly");
	}

	// 启用输入并显示按钮
	function openInput() {
		$("input[type=text]").removeAttr("readonly");
		$("textarea").removeAttr("readonly");
		$("input[type=password]").removeAttr("disabled");
		$("select").removeAttr("disabled");
		$(".ui-dialog-buttonpane button").slice(0, 2).show();
	}

	// 验证表单
	function validateForm() {
		var errorMsg = $("#errorMsg");
		var msg = "false";
		errorMsg.html("");
		if (!$("#name").val()) {
			$("#name").focus();
			errorMsg.html("请输入商品名称");
		} else if (!$("#code").val()) {
			$("#code").focus();
			errorMsg.html("请输入商品编码");
		} else if (!$("#type").val()) {
			$("#type").focus();
			errorMsg.html("请输入商品类型");
		} else if (!$("#specification").val()) {
			$("#specification").focus();
			errorMsg.html("请输入商品规格");
		} else if (!$("#unit").val()) {
			$("#unit").focus();
			errorMsg.html("请输入计量单位");
		} else if (!$("#price").val()) {
			$("#price").focus();
			errorMsg.html("请输入商品单价");
		} else if (!$("#productionDate").val()) {
			$("#productionDate").focus();
			errorMsg.html("请选择生产日期");
		} else if (!$("#shelfLife").val()) {
			$("#shelfLife").focus();
			errorMsg.html("请输入保质期");
		} else if (!$("#note").val()) {
			$("#note").focus();
			errorMsg.html("请输入备注信息");
		} else {
			msg = "true";
		}
		return msg;
	}

	function save() {
		var state = validateForm();
		if (state === "false") {
			return false;
		} else {
			paramString = $("#name").val() + ",";
			paramString += $("#code").val() + ",";
			paramString += $("#type").val() + ",";
			paramString += $("#specification").val() + ",";
			paramString += $("#unit").val() + ",";
			paramString += $("#price").val() + ",";
			paramString += $("#productionDate").val() + ",";
			paramString += $("#shelfLife").val() + ",";
			paramString += $("#note").val() + ",";
			paramString += $("#id").val();

			$.ajax({
				type : "post",
				url : templateRoot + 'goods/Goods_save.action',
				data : {
					"paramString" : paramString
				},
				dataType : "json",
				cache : false,
				success : function(data, textStatus) {
					hAlert(data.msg);
					$("#addDialog").dialog("close");
					initData();
				}
			});
		}
	}
	
	// ---------------- 分页操作 ----------------
	$("#first").bind("click", function() {
		currPage = 1;
		initData();
	});
	$("#pre").bind("click", function() {
		if (currPage == 1) {
			hAlert("没有更多了!");
			return false;
		}
		currPage--;
		initData();
	});
	$("#next").bind("click", function() {
		if (currPage == pageCount) {
			hAlert("没有更多了!");
			return false;
		}
		currPage++;
		initData();
	});
	$("#last").bind("click", function() {
		currPage = pageCount;
		initData();
	});
	$("#go").bind("click", function() {
		currPage = $("#page_select").val();
		initData();
	});

	// 设置分页信息
	function setPageInfo(obj) {
		$("#resultCount").html(obj.resultCount + "");
		$("#currentPage").html(obj.currentPage + "");
		$("#pageCount").html(obj.pageCount + "");
		pageCount = obj.pageCount;
		var selectHtml = "";
		for (i = 1; i <= pageCount; i++) {
			selectHtml += "<option value='" + i + "'>" + i + "</option>";
		}
		$("#page_select").html(selectHtml);
		$("#page_select").val(currPage);
	}
});

// 全选-全不选
function checkAll() {
	if (hasCheckAll) {
		$(".checkItem").removeAttr("checked");
		hasCheckAll = false;
	} else {
		$(".checkItem").attr("checked", "checked");
		hasCheckAll = true;
	}
}

function showDetailDialog(itemId) {
	$().showDetail(itemId);
}