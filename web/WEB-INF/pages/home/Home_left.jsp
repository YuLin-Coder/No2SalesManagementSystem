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
	<script type="text/javascript" src="js/jquery.js"></script>
	<script type="text/javascript" src="js/chili-1.7.pack.js"></script>
	<script type="text/javascript" src="js/jquery.easing.js"></script>
	<script type="text/javascript" src="js/jquery.dimensions.js"></script>
	<script type="text/javascript" src="js/jquery.accordion.js"></script>
	<script language="javascript">
		jQuery().ready(function(){
			jQuery('#navigation').accordion({
				header: '.head',
				navigation1: true, 
				event: 'click',
				fillSpace: true,
				animated: 'bounceslide'
			});
		});
	</script>
	<style type="text/css">
	<!--
	body {
		margin:0px;
		padding:0px;
		font-size: 12px;
		color:#113965;
		background-color: #FFF;
	}
	#navigation {
		margin:0px;
		padding:0px;
		width:147px;
	}
	#navigation a.head {
		cursor:pointer;
		background:url(image/img/main_34.gif) no-repeat scroll;
		display:block;
		font-weight:bold;
		margin:0px;
		padding:5px 0 5px;
		text-align:center;
		font-size:12px;
		text-decoration:none;
		color: #113965;
	}
	#navigation ul {
		border-width:0px;
		margin:0px;
		padding:0px;
		text-indent:0px;
	}
	#navigation li {
		list-style:none; display:inline;
	}
	#navigation li li a {
		display:block;
		font-size:12px;
		text-decoration: none;
		text-align:center;
		padding:3px;
		color:#32566D;
		margin-bottom: 2px;
		border:solid 1px #FFF;
	}
	#navigation li li a:hover {
		font-weight:bold;		
		background:url(image/img/tab_bg.gif) repeat-x;
		border:solid 1px #adb9c2;
		color: #f33;
	}
	-->
	</style>
	
  </head>
  
  <body>
	<div  style="height:100%;">
	  <ul id="navigation">
	    <li><a class="head">仓库管理</a>
	      <ul>
	        <li><a href="goods/Goods_goodsIndex.action" target="rightFrame">商品维护</a></li>
	        <li><a href="instore/Instore_instoreIndex.action" target="rightFrame">入库信息</a></li>
	        <li><a href="outstore/Outstore_outstoreIndex.action" target="rightFrame">出库信息</a></li>
	        <li><a href="atstore/Atstore_atstoreIndex.action" target="rightFrame">在库信息</a></li>
	        <li><a href="statistical/Statistical_statisticalIndex.action" target="rightFrame">统计信息</a></li>
	      </ul>
	    </li>
	    <li><a class="head">合作伙伴</a>
	      <ul>
	      	<li><a href="partner/Partner_providerIndex.action" target="rightFrame">供货商信息</a></li>
	      	<li><a href="partner/Partner_consumerIndex.action" target="rightFrame">客户信息</a></li>
	      </ul>
	    </li>
	    <li><a class="head">系统维护</a>
	      <ul>
	      	<li><a href="account/Account_accountIndex.action" target="rightFrame">用户管理</a></li>
	      	<!-- <li><a href="/account/systemSetting" target="rightFrame">系统设置</a></li> -->
	      </ul>
	    </li>
	  </ul>
	</div>
  </body>
</html>
