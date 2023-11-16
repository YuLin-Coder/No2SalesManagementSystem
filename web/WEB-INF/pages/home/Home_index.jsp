<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
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
	</head>

	<frameset rows="127,*,11" frameborder="no" border="0" framespacing="0">
		<frame src="/home/Home_top" name="topFrame" noresize="noresize" id="topFrame" />
		<frame src="/home/Home_center" name="mainFrame" id="mainFrame" />
		<frame src="/home/Home_down" name="bottomFrame" scrolling="No" noresize="noresize" id="bottomFrame" />
	</frameset>
	
	<noframes>
<body>
</body>
	</noframes>
</html>
