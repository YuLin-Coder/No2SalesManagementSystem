<% 
response.setHeader("Pragma","No-cache"); 
response.setHeader("Cache-Control","no-cache"); 
response.setDateHeader("Expires", 0); 
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
String theme = "extlike";
request.setAttribute("theme", theme);
String rPath = basePath + "page";
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
