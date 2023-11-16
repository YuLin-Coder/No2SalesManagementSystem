function showTime() {
	var d = new Date();
	var year = d.getFullYear();
	var month = d.getMonth() + 1;
	var day = d.getDate();
	var h = d.getHours();
	var min = d.getMinutes();
	var scd = d.getSeconds();
	var week = d.getDay();
	year = checkTime(year);
	month = checkTime(month);
	day = checkTime(day);
	h = checkTime(h);
	min = checkTime(min);
	scd = checkTime(scd);
	week = changeWeek(week);
	document.getElementById("showTime").innerHTML = year + "年" + month + "月" + day + "日 " + h + ":" + min + ":" + scd + " " + week;
	t = setTimeout("showTime()", 500);
}
function checkTime(i) {
	if (i < 10) {
		i = "0" + i;
	}
	return i;
}
function changeWeek(w) {
	if (w == 0) {
		w = "星期天";
	} else if (w == 1) {
		w = "星期一";
	} else if (w == 2) {
		w = "星期二";
	} else if (w == 3) {
		w = "星期三";
	} else if (w == 4) {
		w = "星期四";
	} else if (w == 5) {
		w = "星期五";
	} else if (w == 6) {
		w = "星期六";
	}
	return w;
}