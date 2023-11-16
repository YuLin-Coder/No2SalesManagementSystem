<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
  <head>
    <base href="<%=basePath%>">
    <title>销售管理系统 Version 1.0</title>
	<meta http-equiv="pragma" content="no-cache">
	<meta http-equiv="cache-control" content="no-cache">
	<meta http-equiv="expires" content="0">
	<meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
	<meta http-equiv="description" content="This is my page">
	<link rel="shortcut icon" href="icon/icon.ico" />
	<link href="css/login.css" rel="stylesheet" type="text/css" />
	<link href="css/style_input.css" rel="stylesheet" type="text/css" />
	<script type="text/javascript" src="js/jquery.js"></script>
	<script type="text/javascript" src="js/validateLogin.js"></script>
  </head>
  
  <body>
  	<input type="hidden" id="loginState" value="<%=session.getAttribute("msg") %>" />
	<div id="login">
		<div id="top">
			<div id="top_left">
				<img src="image/img/login_03.gif" />
			</div>
			<div id="top_center"></div>
		</div>
		
		<div id="center">
			<div id="center_left"></div>
			
			<div class="center_middle">
				<div class="center_middle_loading" id="logining">
					<div class="center_middle_loading_msg">
						<img src="image/img/loading.gif" />
						登录中,请稍后...
					</div>
				</div>
			
				<form action="account/Account_login.action" method="post" onsubmit="return validateLogin();">
					<div class="input_row">
						<div class="input_row_left">账 号</div>
						<div class="input_row_rigth">
							<input type="text" id="username" name="userName" class="input_account" maxlength="20" value="" />
						</div>
					</div>
					<div class="input_row">
						<div class="input_row_left">密 码</div>
						<div class="input_row_rigth">
							<input type="password" id="password" name="password" class="input_account" maxlength="20" />
						</div>
					</div>
					
					<div class="input_row">
						<div class="input_row_left">验证码</div>
						<div class="input_vcode_left">
							<input type="text" name="vcode" id="vcode" class="input_vcode" maxlength="5" />
						</div>
						<div class="input_vcode_rigth">
							<a href="javascript:changevcode();"><img id="img_vcode" alt="验证码" src="/image" title="看不清,请点击" /></a>
						</div>
					</div>
					
					<div class="input_row">
						<div class="input_row_left">&nbsp;</div>
						<div class="input_row_rigth">
							<input type="submit" value="" class="bt_login" />
							<!--
							<input type="checkbox" id="rememberUser" name="rememberUser"/><label for="rememberUser">记住我的账号</label>
							-->
						</div>
					</div>
				</form>

				<div class="input_row_status" id="login_status">欢迎登录!</div>
			</div>
			
			<div id="center_right"></div>
		</div>
		
		<div id="down">
			<div id="down_left">
				<div id="inf">
				<span class="inf_text">版本信息</span>
				<span class="copyright">销售管理系统</span>
				</div>
			</div>
			<div id="down_center"></div>
		</div>
	</div>
  </body>
</html>
