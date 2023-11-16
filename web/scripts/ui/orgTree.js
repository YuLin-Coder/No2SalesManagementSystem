/* 初始化orgTree */
function initOrgTree() {
	$("#orgTree").dialog({
		width : 245,
		height : 350,
		buttons : { // 为对话框添加按钮
			"发送" : function() {
				getCheckedItems();// 获取选中的对象
			},
			"取消" : function() {
				$("#orgTree").dialog("close");
			}
		}
	});
}

/**
 * 获取选中的对象
 */
function getCheckedItems() {
	// executeSend();
	var treeObj = $.fn.zTree.getZTreeObj("scmzOrgTree");
	var nodes = treeObj.getCheckedNodes(true);
	var orgList = new Array();
	var deptList = new Array();
	var personList = new Array();
	if (nodes.length <= 0) {
		hAlert("请至少选择一个选择要发送的对象");
		return;
	}
	// 遍历选中的对象
	$.each(nodes, function(i, obj) {
		if (obj.code === "org") {
			orgList.push(obj.id);
		} else if (obj.code === "dept") {
			deptList.push(obj.id);
		} else if (obj.code === "person") {
			personList.push(obj.id);
		}
	});
	// 如果用户列表不为空,则向用户发送信息
	if (personList.length > 0) {
		executeSend(personList, "person");
	} else if (deptList.length > 0) {
		executeSend(deptList, "dept");
	} else if (orgList.length > 0) {
		executeSend(orgList, "org");
	}
}

/**
 * 加载树的类型标识符
 * 
 * @param
 * orgFlag(String):所有组织[orgAll],直接下级[orgSub],所有下级[orgSubAll],直接上级[orgSup],所有上级[orgSupAll]
 * @param deptFlag(String):不显示[noDept],所有部门[allDept],仅本组织的部门[currDept]
 * @param showUser(Boolean):是否加载用户信息,[true],[false]
 * @param showCheckBox(Boolean):是否显示复选框
 * @param isDialog(Boolean):是否是弹出框
 * @param onClickCallBack(Function):单击节点时触发的回调函数
 * @param executeSendFunction(Function):单击发送时
 */
function openOrgTree(orgFlag, deptFlag, showUser, showCheckBox, isDialog, onClickCallBack, executeSendFunction) {
	// 以弹出框形式展示组织树
	if (isDialog) {
		initOrgTree();
		$("#orgTree").dialog("option", "title", "组织结构树").dialog("open");
	}
	setTree(orgFlag, deptFlag, showUser, showCheckBox, onClickCallBack);// 异步加载数据并设置Tree
}

/**
 * 异步加载数据并设置Tree
 */
function setTree(orgFlag, deptFlag, showUser, showCheckBox, onClickCallBack) {
	var setting = {
		async : {
			enable : true,
			url : templateRoot + 'mis/org/org_getTreeData.action',
			autoParam : [ "id", "name" ],
			otherParam : {
				"orgFlag" : orgFlag,
				"deptFlag" : deptFlag,
				"showUser" : showUser
			}
		},
		check : {
			enable : showCheckBox
		},
		data : {
			simpleData : {
				enable : true,
				idKey : "id",
				pIdKey : "parentId",
				rootPId : null
			}
		},
		callback : {
			onClick : onClickCallBack
		}
	};
	$.fn.zTree.init($("#scmzOrgTree"), setting);// 实例化树
}