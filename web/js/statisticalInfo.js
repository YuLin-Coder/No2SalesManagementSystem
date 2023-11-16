var tableHtml = "";
var inPay = 0;
var outPay = 0;

$(function() {
	$("#rangeStart").datetime({
		dateFmt : 'yyyy-MM-dd',
		skin : 'ext'
	});
	$("#rangeEnd").datetime({
		dateFmt : 'yyyy-MM-dd',
		skin : 'ext'
	});

	initTodayData();
	function initTodayData() {
		tableHtml = "";
		$.ajax({
			type : "post",
			url : templateRoot + 'statistical/Statistical_todayInfo.action',
			dataType : "json",
			cache : false,
			success : function(data, textStatus) {
				var obj = data.data[0];
				displayInData(obj);
				displayOutData(data.data[1]);
			}
		});
	}

	// 展示今日入库信息
	function displayInData(data) {
		var inTimes = 0;
		inPay = 0;
		tableHtml = "<tr style='font-size: 20px;font-weight: bold; background-color: #DCF1FC;'>";
		tableHtml += "<td colspan='5'>入库信息</td></tr>";
		tableHtml += "<tr style='background-color: #F2F2F2;'>";
		tableHtml += "<td width='30px;'>序号</td>";
		tableHtml += "<td>名称</td>";
		tableHtml += "<td>数量</td>";
		tableHtml += "<td>单价</td>";
		tableHtml += "<td>支出</td></tr>";
		$.each(data, function(i, item) {
			inTimes++;
			var itemPay = Number(item.amount) * Number(item.price);
			inPay += itemPay;
			tableHtml += "<tr style='background-color: #FFF;'><td>" + (i + 1) + "</td>";
			tableHtml += "<td>" + item.goodsName + "</td>";
			tableHtml += "<td>" + item.amount + "</td>";
			tableHtml += "<td>" + item.price + "</td>";
			tableHtml += "<td>" + itemPay + "</td></tr>";
		});
		tableHtml += "<tr style='background-color: #FFF;'>";
		tableHtml += "<td colspan='4'>今日总支出</td>";
		tableHtml += "<td>" + inPay + "</td></tr>";
		$("#todayInTable").html(tableHtml);
		$("#tdInTimes").html(inTimes);
		$("#tdInPay").html(inPay);
	}

	// 展示今日出库信息
	function displayOutData(data) {
		var outTimes = 0;
		outPay = 0;
		tableHtml = "<tr style='font-size: 20px;font-weight: bold; background-color: #DCF1FC;'>";
		tableHtml += "<td colspan='5'>出库信息</td></tr>";
		tableHtml += "<tr style='background-color: #F2F2F2;'>";
		tableHtml += "<td width='30px;'>序号</td>";
		tableHtml += "<td>名称</td>";
		tableHtml += "<td>数量</td>";
		tableHtml += "<td>单价</td>";
		tableHtml += "<td>收入</td></tr>";
		$.each(data, function(i, item) {
			outTimes++;
			var itemPay = Number(item.amount) * Number(item.price);
			outPay += itemPay;
			tableHtml += "<tr style='background-color: #FFF;'><td>" + (i + 1) + "</td>";
			tableHtml += "<td>" + item.goodsName + "</td>";
			tableHtml += "<td>" + item.amount + "</td>";
			tableHtml += "<td>" + item.price + "</td>";
			tableHtml += "<td>" + itemPay + "</td></tr>";
		});

		tableHtml += "<tr style='background-color: #FFF;'>";
		tableHtml += "<td colspan='4'>今日总收入</td>";
		tableHtml += "<td>" + outPay + "</td></tr>";
		$("#todayOutTable").html(tableHtml);
		$("#tdOutTimes").html(outTimes);
		$("#tdOutPay").html(outPay);
		$("#tdPay").html(outPay - inPay);
	}

	// --------------------- 本月统计 ---------------------
	function displayInData2(data) {
		var inTimes = 0;
		inPay = 0;
		tableHtml = "<tr style='font-size: 20px;font-weight: bold; background-color: #DCF1FC;'>";
		tableHtml += "<td colspan='5'>入库信息</td></tr>";
		tableHtml += "<tr style='background-color: #F2F2F2;'>";
		tableHtml += "<td width='30px;'>序号</td>";
		tableHtml += "<td>名称</td>";
		tableHtml += "<td>数量</td>";
		tableHtml += "<td>单价</td>";
		tableHtml += "<td>支出</td></tr>";
		$.each(data, function(i, item) {
			inTimes++;
			var itemPay = Number(item.amount) * Number(item.price);
			inPay += itemPay;
			tableHtml += "<tr style='background-color: #FFF;'><td>" + (i + 1) + "</td>";
			tableHtml += "<td>" + item.goodsName + "</td>";
			tableHtml += "<td>" + item.amount + "</td>";
			tableHtml += "<td>" + item.price + "</td>";
			tableHtml += "<td>" + itemPay + "</td></tr>";
		});
		tableHtml += "<tr style='background-color: #FFF;'>";
		tableHtml += "<td colspan='4'>今日总支出</td>";
		tableHtml += "<td>" + inPay + "</td></tr>";
		$("#monthInTable").html(tableHtml);
		$("#tdInTimes2").html(inTimes);
		$("#tdInPay2").html(inPay);
	}

	// 展示出库信息
	function displayOutData2(data) {
		var outTimes = 0;
		outPay = 0;
		tableHtml = "<tr style='font-size: 20px;font-weight: bold; background-color: #DCF1FC;'>";
		tableHtml += "<td colspan='5'>出库信息</td></tr>";
		tableHtml += "<tr style='background-color: #F2F2F2;'>";
		tableHtml += "<td width='30px;'>序号</td>";
		tableHtml += "<td>名称</td>";
		tableHtml += "<td>数量</td>";
		tableHtml += "<td>单价</td>";
		tableHtml += "<td>收入</td></tr>";
		$.each(data, function(i, item) {
			outTimes++;
			var itemPay = Number(item.amount) * Number(item.price);
			outPay += itemPay;
			tableHtml += "<tr style='background-color: #FFF;'><td>" + (i + 1) + "</td>";
			tableHtml += "<td>" + item.goodsName + "</td>";
			tableHtml += "<td>" + item.amount + "</td>";
			tableHtml += "<td>" + item.price + "</td>";
			tableHtml += "<td>" + itemPay + "</td></tr>";
		});

		tableHtml += "<tr style='background-color: #FFF;'>";
		tableHtml += "<td colspan='4'>今日总收入</td>";
		tableHtml += "<td>" + outPay + "</td></tr>";
		$("#monthOutTable").html(tableHtml);
		$("#tdOutTimes2").html(outTimes);
		$("#tdOutPay2").html(outPay);
		$("#tdPay2").html(outPay - inPay);
	}
	
	// --------------------- 自定义统计 ---------------------
	function displayInData3(data) {
		var inTimes = 0;
		inPay = 0;
		tableHtml = "<tr style='font-size: 20px;font-weight: bold; background-color: #DCF1FC;'>";
		tableHtml += "<td colspan='5'>入库信息</td></tr>";
		tableHtml += "<tr style='background-color: #F2F2F2;'>";
		tableHtml += "<td width='30px;'>序号</td>";
		tableHtml += "<td>名称</td>";
		tableHtml += "<td>数量</td>";
		tableHtml += "<td>单价</td>";
		tableHtml += "<td>支出</td></tr>";
		$.each(data, function(i, item) {
			inTimes++;
			var itemPay = Number(item.amount) * Number(item.price);
			inPay += itemPay;
			tableHtml += "<tr style='background-color: #FFF;'><td>" + (i + 1) + "</td>";
			tableHtml += "<td>" + item.goodsName + "</td>";
			tableHtml += "<td>" + item.amount + "</td>";
			tableHtml += "<td>" + item.price + "</td>";
			tableHtml += "<td>" + itemPay + "</td></tr>";
		});
		tableHtml += "<tr style='background-color: #FFF;'>";
		tableHtml += "<td colspan='4'>今日总支出</td>";
		tableHtml += "<td>" + inPay + "</td></tr>";
		$("#rangeInTable").html(tableHtml);
		$("#tdInTimes3").html(inTimes);
		$("#tdInPay3").html(inPay);
	}

	// 展示出库信息
	function displayOutData3(data) {
		var outTimes = 0;
		outPay = 0;
		tableHtml = "<tr style='font-size: 20px;font-weight: bold; background-color: #DCF1FC;'>";
		tableHtml += "<td colspan='5'>出库信息</td></tr>";
		tableHtml += "<tr style='background-color: #F2F2F2;'>";
		tableHtml += "<td width='30px;'>序号</td>";
		tableHtml += "<td>名称</td>";
		tableHtml += "<td>数量</td>";
		tableHtml += "<td>单价</td>";
		tableHtml += "<td>收入</td></tr>";
		$.each(data, function(i, item) {
			outTimes++;
			var itemPay = Number(item.amount) * Number(item.price);
			outPay += itemPay;
			tableHtml += "<tr style='background-color: #FFF;'><td>" + (i + 1) + "</td>";
			tableHtml += "<td>" + item.goodsName + "</td>";
			tableHtml += "<td>" + item.amount + "</td>";
			tableHtml += "<td>" + item.price + "</td>";
			tableHtml += "<td>" + itemPay + "</td></tr>";
		});

		tableHtml += "<tr style='background-color: #FFF;'>";
		tableHtml += "<td colspan='4'>今日总收入</td>";
		tableHtml += "<td>" + outPay + "</td></tr>";
		$("#rangeOutTable").html(tableHtml);
		$("#tdOutTimes3").html(outTimes);
		$("#tdOutPay3").html(outPay);
		$("#tdPay3").html(outPay - inPay);
		$("#rangeTable").show(0);
	}

	/* 初始化tabs */
	$("#tabs").tabs({
		selected : 0,// 页签组第几个页签打开，序号从0开始，默认为0
		event : 'click',// 页签切换事件，默认为click事件
		cache : true
	});
	$("#tab1").click(initTodayData);
	$("#tab2").click(initMonthData);
	$("#statisticalB").click(initByParam);

	function initMonthData() {
		tableHtml = "";
		$.ajax({
			type : "post",
			url : templateRoot + 'statistical/Statistical_monthInfo.action',
			dataType : "json",
			cache : false,
			success : function(data, textStatus) {
				var obj = data.data[0];
				displayInData2(obj);
				displayOutData2(data.data[1]);
			}
		});

	}

	// 自定义统计
	function initByParam() {
		var startDate = $("#rangeStart").val();
		var endDate = $("#rangeEnd").val();
		if (!startDate && !endDate) {
			hAlert("请至少选择一个日期进行统计");
		} else {
			tableHtml = "";
			$.ajax({
				type : "post",
				url : templateRoot + 'statistical/Statistical_rangeInfo.action',
				data : {
					"startDate" : startDate,
					"endDate" : endDate
				},
				dataType : "json",
				cache : false,
				success : function(data, textStatus) {
					var obj = data.data[0];
					displayInData3(obj);
					displayOutData3(data.data[1]);
				}
			});
		}
	}
});