$(function() {
	var loginState = $("#loginState").val();
	if (loginState != null && loginState !== "nologin" && loginState !== "null") {
		$("#login_status").html(loginState);
	} else {
		$("#login_status").html("欢迎登录!");
	}
});

function changevcode() {
	var img = document.getElementById("img_vcode");
	img.src = "/image?flag=" + Math.random();
}

function validateLogin() {
	var u_regExp = /^[a-zA-Z]{1}[a-zA-Z0-9_]{4,19}$/;// 验证用户名格式正则
	var p_regExp = /^[a-zA-Z0-9_]{5,20}$/;// 验证密码格式正则
	var v_regExp = /^[0-9]{4}$/;// 验证码格式
	if (!u_regExp.test($("#username").val())) {
		$("#login_status").html("账号或者密码错误!");
		$("#username").focus();
		return false;
	} else if (!p_regExp.test($("#password").val())) {
		$("#login_status").html("账号或者密码错误!");
		$("#username").focus();
		return false;
	} else if (!v_regExp.test($("#vcode").val())) {
		$("#login_status").html("验证码错误!");
		$("#vcode").val("").focus();
		return false;
	}
	$("#logining").show();
	return true;
}

$(function() {
	$("#test").click(function() {
		$("#logining").hide();
		// alert("123");
	});
});