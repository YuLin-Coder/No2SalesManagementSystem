<%@ page language="java" pageEncoding="UTF-8"%>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html>
<head>
<title>harmony_wisdom</title>
    <%
        response.setHeader("Pragma","No-cache");
        response.setHeader("Cache-Control","no-cache");
        response.setDateHeader("Expires", 0);
        String path = request.getContextPath();
        String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
        String theme = "extlike";
        request.setAttribute("theme", theme);
        String rPath = basePath ;
        request.setAttribute("rPath", rPath);
    %>
    <link rel="stylesheet" type="text/css" href="${rPath}/themes/${theme}/jquery-ui/jquery.ui.base.css"/>
    <link rel="stylesheet" type="text/css" href="${rPath}/themes/${theme}/jquery-ui/jquery.ui.theme.css"/>
    <link rel="stylesheet" type="text/css" href="${rPath}/themes/${theme}/jquery-ui/ui.jqgrid.css"/>
    <link rel="stylesheet" type="text/css" href="${rPath}/themes/${theme}/jquery-ui/layout-default.css"/>
    <link rel="stylesheet" type="text/css" href="${rPath}/themes/common/alert/jquery.alerts.css"/>
    <link rel="stylesheet" type="text/css" href="${rPath}/themes/common/ztree/zTreeStyle.css"/>
    <link rel="stylesheet" type="text/css" href="${rPath}/themes/common/uploadify/uploadify.css"/>
    <link rel="stylesheet" type="text/css" href="${rPath}/themes/${theme}/main.css"/>
    <link rel="stylesheet" type="text/css" href="${rPath}/themes/common/tip-red/tip-red.css"/>

    <script type="text/javascript" src="${rPath}/scripts/jquery-1.6.4.js"></script>
    <script type="text/javascript" src="${rPath}/scripts/common/jquery.metadata.js"></script>
    <script type="text/javascript" src="${rPath}/scripts/common/jquery.tojsonstring.js"></script>
    <script type="text/javascript" src="${rPath}/scripts/common/swfobject.js"></script>
    <script type="text/javascript" src="${rPath}/scripts/ui/jquery-ui-1.8.16.custom.min.js"></script>
    <script type="text/javascript" src="${rPath}/scripts/ui/jquery.ztree.core-3.0.js"></script>
    <script type="text/javascript" src="${rPath}/scripts/ui/jquery.ztree.excheck-3.0.js"></script>
    <script type="text/javascript" src="${rPath}/scripts/ui/jquery.ztree.exedit-3.0.js"></script>
    <script type="text/javascript" src="${rPath}/scripts/ui/jquery.ztree.ext.js"></script>
    <script type="text/javascript" src="${rPath}/scripts/ui/WdatePicker.js"></script>
    <script type="text/javascript" src="${rPath}/scripts/ui/jquery.layout_1.3.0.js"></script>
    <script type="text/javascript" src="${rPath}/scripts/ui/i18n/jqgrid.locale-cn.js"></script>
    <script type="text/javascript" src="${rPath}/scripts/ui/jquery.jqGrid.src.js"></script>
    <script type="text/javascript" src="${rPath}/scripts/ui/jquery.jqGrid.ext.js"></script>
    <script type="text/javascript" src="${rPath}/scripts/ui/jquery.uploadify.v2.1.4.js"></script>
    <script type="text/javascript" src="${rPath}/scripts/ui/jquery.validate.js"></script>
    <script type="text/javascript" src="${rPath}/scripts/ui/jquery.validate.ext.js"></script>
    <script type="text/javascript" src="${rPath}/scripts/ui/i18n/jquery.validate.messages_cn.js"></script>
    <script type="text/javascript" src="${rPath}/scripts/ui/jquery.form.js"></script>
    <script type="text/javascript" src="${rPath}/scripts/ui/jquery.form.ext.js"></script>
    <script type="text/javascript" src="${rPath}/scripts/ui/jquery.datetime.js"></script>
    <script type="text/javascript" src="${rPath}/scripts/ui/jquery.alerts.js"></script>
    <script type="text/javascript" src="${rPath}/scripts/ui/jquery.overides.js"></script>
    <script type="text/javascript" src="${rPath}/scripts/ui/jquery.ui.button.ext.js"></script>
    <script type="text/javascript" src="${rPath}/scripts/ui/jquery.ui.panel.js"></script>
    <script type="text/javascript" src="${rPath}/scripts/ui/jquery.ui.tabs.ext.js"></script>
    <script type="text/javascript" src="${rPath}/scripts/ui/jquery.poshytip.js"></script>
    <script type="text/javascript" src="${rPath}/scripts/ui/jquery.harmony.ui.convert.js"></script>
    <script type="text/javascript">
        var templateRoot = '<%= basePath %>';
    </script>
<script src="${pageContext.request.contextPath}/js/statisticalInfo.js"></script>
<link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath}/css/statisticalInfo.css"/>
<link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath}/css/admin_style.css">
</head>
<body>
	<div class="div_title">
		<div class="div_title_img"><img src="/ssm_storedb/image/img/tb.gif" width="14" height="14" /></div>
		<div class="div_title_name">当前操作：统计信息</div>
	</div>
	<!-- <div class="toolbar">
		<button id="testB">测试</button>
	</div> -->
	<div id="tabs">
		<ul>
			<LI><A href="#tabs-1" id="tab1">今日盘点</A></LI>
			<LI><A href="#tabs-2" id="tab2">本月盘点</A></LI>
			<LI><A href="#tabs-3" id="tab3">自主盘点</A></LI>
		</ul>
		<div id="tabs-1" style="height: 390px;margin: 0;padding: 0;">

            <div style="padding-top: 3px;">
                <div>
                    <table id="todayInTable" border="0" width="49%" style="text-align: center; background-color: #287EC7;color: #113965; float: left;" cellpadding="1" cellspacing="2"></table>
                    <table id="todayOutTable" border="0" width="49%" style="text-align: center; background-color: #287EC7;color: #113965;float: right;" cellpadding="1" cellspacing="2"></table>

                    <div style="width: 100%;float: left;height: 10px;"></div>
                    <table border="0" width="100%" style="text-align: center; background-color: #287EC7;color: #113965; float: left;" cellpadding="1" cellspacing="2">
                        <tr style="font-size: 20px;font-weight: bold; background-color: #DCF1FC;">
                            <td colspan="5">今日盘点</td>
                        </tr>
                        <tr style="font-size: 16px;font-weight: bold; background-color: #F2F2F2;">
                            <td rowspan="2">入库</td>
                            <td>入库(次)</td>
                            <td>支出(元)</td>
                        </tr>
                        <tr style="font-size: 14px;font-weight: bold; background-color: #FFF;color: green;">
                            <td id="tdInTimes">0</td>
                            <td id="tdInPay">0</td>
                        </tr>
                        <tr style="font-size: 16px;font-weight: bold; background-color: #F2F2F2;">
                            <td rowspan="2">出库</td>
                            <td>出库(次)</td>
                            <td>收入(元)</td>
                        </tr>
                        <tr style="font-size: 14px;font-weight: bold; background-color: #FFF;color: red;">
                            <td id="tdOutTimes">0</td>
                            <td id="tdOutPay">0</td>
                        </tr>
                        <tr style="font-size: 16px;font-weight: bold; background-color: #FFF;color: blue;">
                            <td colspan="2">今日盈亏(元)</td>
                            <td id="tdPay">0</td>
                        </tr>
                    </table>
                </div>
            </div>
		</div>
		<div id="tabs-2" style="height: 390px;margin: 0;padding: 0;">

            <div style="padding-top: 3px;">
                <div>
                    <table id="monthInTable" border="0" width="49%" style="text-align: center; background-color: #287EC7;color: #113965; float: left;" cellpadding="1" cellspacing="2"></table>
                    <table id="monthOutTable" border="0" width="49%" style="text-align: center; background-color: #287EC7;color: #113965;float: right;" cellpadding="1" cellspacing="2"></table>

                    <div style="width: 100%;float: left;height: 10px;"></div>
                    <table border="0" width="100%" style="text-align: center; background-color: #287EC7;color: #113965; float: left;" cellpadding="1" cellspacing="2">
                        <tr style="font-size: 20px;font-weight: bold; background-color: #DCF1FC;">
                            <td colspan="5">本月盘点</td>
                        </tr>
                        <tr style="font-size: 16px;font-weight: bold; background-color: #F2F2F2;">
                            <td rowspan="2">入库</td>
                            <td>入库(次)</td>
                            <td>支出(元)</td>
                        </tr>
                        <tr style="font-size: 14px;font-weight: bold; background-color: #FFF;color: green;">
                            <td id="tdInTimes2">0</td>
                            <td id="tdInPay2">0</td>
                        </tr>
                        <tr style="font-size: 16px;font-weight: bold; background-color: #F2F2F2;">
                            <td rowspan="2">出库</td>
                            <td>出库(次)</td>
                            <td>收入(元)</td>
                        </tr>
                        <tr style="font-size: 14px;font-weight: bold; background-color: #FFF;color: red;">
                            <td id="tdOutTimes2">0</td>
                            <td id="tdOutPay2">0</td>
                        </tr>
                        <tr style="font-size: 16px;font-weight: bold; background-color: #FFF;color: blue;">
                            <td colspan="2">本月盈亏(元)</td>
                            <td id="tdPay2">0</td>
                        </tr>
                    </table>
                </div>
            </div>
		</div>
		<div id="tabs-3" style="height: 390px;margin: 0;padding: 0;">

            <div style="padding-top: 3px;">
                <div>
                    <div class="toolbar">
                        <table border="0" style="float: left;color: #FFF;">
                            <tr>
                                <td>开始日期:</td>
                                <td><input type="text" id="rangeStart" name="" readonly="readonly"/></td>
                                <td>&nbsp;&nbsp;</td>
                                <td>结束日期:</td>
                                <td><input type="text" id="rangeEnd" name="" readonly="readonly"/></td>
                                <td>&nbsp;&nbsp;&nbsp;&nbsp;</td>
                            </tr>
                        </table>
                        <button id="statisticalB" style="float: left;">统计</button>
                    </div>
                    <table id="rangeInTable" border="0" width="49%" style="text-align: center; background-color: #287EC7;color: #113965; float: left;" cellpadding="1" cellspacing="2"></table>
                    <table id="rangeOutTable" border="0" width="49%" style="text-align: center; background-color: #287EC7;color: #113965;float: right;" cellpadding="1" cellspacing="2"></table>
                    <div style="width: 100%;float: left;height: 10px;"></div>
                    <table id="rangeTable" border="0" width="100%" style="text-align: center; background-color: #287EC7;color: #113965; float: left;display: none;" cellpadding="1" cellspacing="2">
                        <tr style="font-size: 20px;font-weight: bold; background-color: #DCF1FC;">
                            <td colspan="5">自定义盘点</td>
                        </tr>
                        <tr style="font-size: 16px;font-weight: bold; background-color: #F2F2F2;">
                            <td rowspan="2">入库</td>
                            <td>入库(次)</td>
                            <td>支出(元)</td>
                        </tr>
                        <tr style="font-size: 14px;font-weight: bold; background-color: #FFF;color: green;">
                            <td id="tdInTimes3">0</td>
                            <td id="tdInPay3">0</td>
                        </tr>
                        <tr style="font-size: 16px;font-weight: bold; background-color: #F2F2F2;">
                            <td rowspan="2">出库</td>
                            <td>出库(次)</td>
                            <td>收入(元)</td>
                        </tr>
                        <tr style="font-size: 14px;font-weight: bold; background-color: #FFF;color: red;">
                            <td id="tdOutTimes3">0</td>
                            <td id="tdOutPay3">0</td>
                        </tr>
                        <tr style="font-size: 16px;font-weight: bold; background-color: #FFF;color: blue;">
                            <td colspan="2">盈亏(元)</td>
                            <td id="tdPay3">0</td>
                        </tr>
                    </table>
                </div>
            </div>
		</div>
	</div>
	<table cellpadding="1" cellspacing="1"></table>
</body>
</html>
