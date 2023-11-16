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
			url : templateRoot + 'account/Account_pagelist.action',
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

	// 用表格形式展示列表
	function displayData(data) {
		tableHtml += "<tr style='background-color: #DCF1FC;height:22px;color:#065A93;font-size:14px;font-weight:bold;cursor:none;'>";
		tableHtml += "<td style='text-align: center; width:25px;'>-</td>";
		tableHtml += "<td style='text-align: center; width:25px;'><input type='checkbox' onclick='checkAll();' id='checkAll'/></td>";
		tableHtml += "<td style='text-align: center; width:95px;'>登录账号</td>";
		tableHtml += "<td style='text-align: center; width:95px;'>真实姓名</td>";
		tableHtml += "<td style='text-align: center; width:50px;'>性别</td>";
		tableHtml += "<td style='text-align: center; width:50px;'>年龄</td>";
		tableHtml += "<td style='text-align: center; width:140px;'>身份证号</td>";
		tableHtml += "<td style='text-align: center; width:95px;;'>联系电话</td>";
		tableHtml += "<td style='text-align: center; width:200px;'>联系地址</td>";
		tableHtml += "<td style='text-align: center; width:95px;;'>角色级别</td>";
		tableHtml += "<td style='text-align: center; width:140px;'>创建日期</td>";
		tableHtml += "<td style='text-align: center; width:50px;;'>状态</td></tr>";

		$.each(data.data, function(i, item) {
			if (i % 2 == 0) {
				bgColor = "#FFF";
			} else {
				bgColor = "#EEE";
			}
			tableHtml += "<tr style='background-color: " + bgColor + ";height:22px;' ondblclick='showDetailDialog(\"" + item.id + "\");'>";
			tableHtml += "<td style='text-align: center;'>" + (i + 1) + "</td>";
			tableHtml += "<td style='text-align: center;'><input name='ids' type='checkbox' class='checkItem' id='check-'" + i + " value='" + item.id + "'/></td>";
			tableHtml += "<td style='text-align: center;'>" + item.userName + "</td>";
			tableHtml += "<td style='text-align: center;'>" + item.realName + "</td>";
			tableHtml += "<td style='text-align: center;'>" + item.sex + "</td>";
			tableHtml += "<td style='text-align: center;'>" + item.age + "</td>";
			tableHtml += "<td style='text-align: center;'>" + item.idCard + "</td>";
			tableHtml += "<td style='text-align: center;'>" + item.linkPhone + "</td>";
			tableHtml += "<td style='text-align: left;'>" + item.address + "</td>";
			tableHtml += "<td style='text-align: center;'>" + item.roleLevel + "</td>";
			tableHtml += "<td style='text-align: center;'>" + item.regDate + "</td>";
			tableHtml += "<td style='text-align: center;'>" + item.state + "</td></tr>";
		});
		$("#accountTable").html(tableHtml);
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
        if (idsArr.length > 1) {
            hAlert("只能选择一条要删除的记录!");
            return false;
        }
		hConfirm('您确定要删除所选记录吗？', null, function(r) {
			if (!r)
				return false;
			$.ajax({
				type : "post",
				url : templateRoot + 'account/Account_deleteByIds.action',
				data : {
					"relationId" : idsArr[0]
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
			url : templateRoot + 'account/Account_accountTest.action',
			dataType : "json",
			cache : false,
			success : function(data, textStatus) {
				hAlert(data.message);
			}
		});
	});

	// 新建弹出窗口
	$("#addDialog").dialog({
		width : 500,
		height : 280,
		buttons : { // 为对话框添加按钮
			"保存" : function() {
				save();
			},
			"重置" : function() {
				$("#accountForm").clearForm();
			},
			"取消" : function() {
				$("#addDialog").dialog("close");
			}
		},
		open : function() {
		},
		close : function() {
			$("#accountForm").clearForm();
		}
	});

	// 弹出新建窗口
	function addDialog() {
		$("#accountForm").clearForm();
		$("#addDialog").dialog("option", "title", "新建用户").dialog("open");
		openInput();
	}

	// 弹出修改窗口
	function updateDialog(id) {
		$("#addDialog").dialog("option", "title", "修改用户信息").dialog("open");
		openInput();
		$.ajax({
			type : "post",
			url : templateRoot + 'account/Account_getById.action',
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
		$("#addDialog").dialog("option", "title", "查看用户信息").dialog("open");
		disableInput();
		$.ajax({
			type : "post",
			url : templateRoot + 'account/Account_getById.action',
			data : {
				"relationId" : id
			},
			dataType : "json",
			cache : false,
			success : function(data, textStatus) {
				if (data.success) {
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
		$("#userName").val(data.userName);
		$("#realName").val(data.realName);
		$("#sex").val(data.sex);
		$("#age").val(data.age);
		$("#idCard").val(data.idCard);
		$("#linkPhone").val(data.linkPhone);
		$("#address").val(data.address);
		$("#roleLevel").val(data.roleLevel);
		$("#state").val(data.state);
	}

	// 禁用输入并隐藏按钮
	function disableInput() {
		$("input[type=text]").attr("readonly", "readonly");
		$("input[type=password]").attr("disabled", "disabled");
		$("select").attr("disabled", "disabled");
		$(".ui-dialog-buttonpane button").slice(0, 2).hide();
	}

	// 启用输入并显示按钮
	function openInput() {
		$("input[type=text]").removeAttr("readonly");
		$("input[type=password]").removeAttr("disabled");
		$("select").removeAttr("disabled");
		$(".ui-dialog-buttonpane button").slice(0, 2).show();
	}

	// 验证表单
	function validateForm() {
		var errorMsg = $("#errorMsg");
		var msg = "true";
		errorMsg.html("");
		var pwd1 = $("#pwd1").val();
		var pwd2 = $("#pwd2").val();
		alert(pwd1 + "-" + pwd2);
		if (pwd1 !== pwd2) {
			msg = "false";
			errorMsg.html("两次输入的密码不一致！");
			return msg;
		} else if (pwd1.length < 5) {
			msg = "false";
			errorMsg.html("密码长度必须大于等于5位！");
			return msg;
		}
		$.each($("#formTable input"), function(i, item) {
			if (!$(this).val()) {
				msg = "false";
				errorMsg.html("请将表单输入完整。");
				return msg;
			}
		});
		$.each($("#formTable select"), function(i, item) {
			if ($(this).val() == "-1") {
				msg = "false";
				errorMsg.html("请将表单输入完整。");
				return msg;
			}
		});
		return msg;
	}

	function save() {
		var state = validateForm();
		if (state === "false") {
			return false;
		} else {
			paramString = $("#userName").val() + ",";
			paramString += $("#pwd1").val() + ",";
			paramString += $("#pwd2").val() + ",";
			paramString += $("#realName").val() + ",";
			paramString += $("#sex").val() + ",";
			paramString += $("#age").val() + ",";
			paramString += $("#idCard").val() + ",";
			paramString += $("#linkPhone").val() + ",";
			paramString += $("#address").val() + ",";
			paramString += $("#roleLevel").val() + ",";
			paramString += $("#state").val() + ",";
			paramString += $("#id").val();

			$.ajax({
				type : "post",
				url : templateRoot + 'account/Account_save.action',
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