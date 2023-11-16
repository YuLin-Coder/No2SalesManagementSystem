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
    <title>销售管理系统</title>
	<meta http-equiv="pragma" content="no-cache">
	<meta http-equiv="cache-control" content="no-cache">
	<meta http-equiv="expires" content="0">    
	<meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
	<meta http-equiv="description" content="This is my page">
	<link rel="shortcut icon" href="icon/icon.ico" />
	<link rel="stylesheet" type="text/css" href="css/admin_style.css">
	<script type="text/javascript" src="js/jquery-1.6.3.min.js"></script>
	
	<script type="text/javascript">
		$(function(){
			$("#refresh").click(function(){
				path = $(this).attr("alt");
				window.location.href = path + "account/Account_refreshNotice";
			});
		});
	</script>
  </head>
  
  <body style="overflow: hidden;">
	<div class="div_title">
		<div class="div_title_img"><img src="image/img/tb.gif" width="14" height="14" /></div>
		<div class="div_title_name">首页</div>
	</div>
	<div style="background-color: #FFF;height: 100%;">
		欢迎进入销售管理系统。
	</div>
  </body>
</html>
