<%@page import="com.storems.admin.entity.Account"%>
<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>

<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
Account account = (Account)session.getAttribute("account");
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
	<script type="text/javascript" src="js/showTime.js"></script>
	<style type="text/css">
	<!--
	body {
		margin-left: 0px;
		margin-top: 0px;
		margin-right: 0px;
		margin-bottom: 0px;
		overflow: hidden;
	}
	.STYLE1 {
		font-size: 12px;
		color: #113965;
	}
	.STYLE5 {font-size: 12px}
	.STYLE7 {font-size: 12px; color: #F3F3F3; font-family: 微软雅黑; }
	.STYLE7 a{font-size: 12px; color: #FFFFFF; }
	.STYLE8 {color:#7C8F04; color: #F81055; font-size: 14px;}
	a img {
		border:none;
	}
	a{
		text-decoration: none;
	}
	a:hover{
		text-decoration: underline;
		color: #fff;
	}
	-->
	</style>
  </head>
  
<body onload="showTime();">
<table width="100%" border="0" cellspacing="0" cellpadding="0">
  <tr>
    <td height="57" background="image/img/main_03.gif"><table width="100%" border="0" cellspacing="0" cellpadding="0">
      <tr>
        <td width="378" height="57" background="image/img/main_01_null.gif">&nbsp;</td>
        <td>&nbsp;</td>
        <td width="281" valign="bottom">
        <table width="100%" border="0" cellspacing="0" cellpadding="0">
          <tr>
            <td width="33" height="27"><img src="image/img/main_05.gif" width="33" height="27" /></td>
            <td width="248" background="image/img/main_06.gif">
            <table width="225" border="0" align="center" cellpadding="0" cellspacing="0">
              <tr>
                <td height="17"><div align="right"><a href="javascript:alert('暂不开放');" target="rightFrame"><img src="image/img/pass.gif" width="69" height="17" /></a></div></td>
                <td><div align="right"><a href="javascript:alert('暂不开放');" target="rightFrame"><img src="image/img/user.gif" width="69" height="17" /></a></div></td>
                <td><div align="right"><a href="account/Account_logout.action" target="_parent"><img src="image/img/quit.gif" alt=" " width="69" height="17" /></a></div></td>
              </tr>
            </table></td>
          </tr>
        </table></td>
      </tr>
    </table></td>
  </tr>
  <tr>
    <td height="40" background="image/img/main_10.gif">
    <table width="100%" border="0" cellspacing="0" cellpadding="0">
      <tr>
        <td width="194" height="40" background="image/img/main_07.gif">&nbsp;</td>
        <td><table width="100%" border="0" cellspacing="0" cellpadding="0">
          <tr>
            <td width="21"><a href="/home/Home_right" target="rightFrame"><img src="image/img/main_13.gif" width="19" height="14" /></a></td>
            <td width="35" class="STYLE7"><div align="center"><a href="/home/Home_right" target="rightFrame">首页</a></div></td>
            
            <td width="21" class="STYLE7"><a href="javascript:history.go(-1);"><img src="image/img/main_15.gif" width="19" height="14" /></a></td>
            <td width="35" class="STYLE7"><div align="center"><a href="javascript:history.go(-1);">后退</a></div></td>
            
            <td width="21" class="STYLE7"><a href="javascript:history.go(1);"><img src="image/img/main_17.gif" width="19" height="14" /></a></td>
            <td width="35" class="STYLE7"><div align="center"><a href="javascript:history.go(1);">前进</a></div></td>
            
            <td width="21" class="STYLE7"><a href="javascript:window.parent.location.reload();"><img src="image/img/main_19.gif" width="19" height="14" /></a></td>
            <td width="35" class="STYLE7"><div align="center"><a href="javascript:window.parent.location.reload();">刷新</a></div></td>
            
            <td width="21" class="STYLE7"><a href="http://www.zcsoft.com" target="_blank"><img src="image/img/main_21.gif" width="19" height="14" /></a></td>
            <td width="35" class="STYLE7"><div align="center"><a href="javascript:alert('暂不开放');" target="_blank">帮助</a></div></td>
            
            <td>&nbsp;</td>
          </tr>
        </table></td>
        <td width="248" background="image/img/main_11.gif"><table width="100%" border="0" cellspacing="0" cellpadding="0">
          <tr>
            <td width="16%"><span class="STYLE5"></span></td>
            <td width="75%"><div align="center">
            	<span class="STYLE7" id="showTime"></span></div></td>
            <td width="9%">&nbsp;</td>
          </tr>
        </table></td>
      </tr>
    </table></td>
  </tr>
  <tr>
    <td height="30" background="image/img/main_31.gif"><table width="100%" border="0" cellspacing="0" cellpadding="0">
      <tr>
        <td width="8" height="30"><img src="image/img/main_28.gif" width="8" height="30" /></td>
        <td width="147" background="image/img/main_29.gif">
        <table width="100%" border="0" cellspacing="0" cellpadding="0">
          <tr>
            <td width="24%">&nbsp;</td>
            <td width="43%" height="20" valign="bottom" class="STYLE1">管理菜单</td>
            <td width="33%">&nbsp;</td>
          </tr>
        </table></td>
        <td width="39"><img src="image/img/main_30.gif" width="39" height="30" /></td>
        <td><table width="100%" border="0" cellspacing="0" cellpadding="0">
          <tr>
            <td height="20" valign="bottom">
            	<span class="STYLE1" style="font-size:14px;">
            	尊敬的[ <span class="STYLE8"><%=account.getRealName() %></span> ]欢迎进入销售管理系统
            	</span>
            </td>
            <td valign="bottom" class="STYLE1"><div align="right"></div></td>
          </tr>
        </table></td>
        <td width="17"><img src="image/img/main_32.gif" width="17" height="30" /></td>
      </tr>
    </table></td>
  </tr>
</table>
</body>
</html>
