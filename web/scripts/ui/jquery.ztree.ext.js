/**
 * @author chenlei
 * @Date 2011-09-17
 * @copyright
 * tree组件封装
 */
(function($){
    /**
     * 普通树
     * @param {Object} setting
     * @param {Object} nodes
     */
    $.fn.tree = function(setting, nodes){
        setting = $.extend(true, {}, setting);
        var $this = $(this);
        $this.addClass("ztree");
        var tree =  $.fn.zTree.init($this, setting, nodes);

        return tree;
    };
	
	
    /**
     * 下拉树
     * @param {Object} divId
     * @param {Object} inputId
     * @param {Object} setting
     * @param {Object} nodes
     */
    $.fn.dropDownTree = function(divId, inputId, setting, nodes){
        setting = $.extend(true, {}, setting);
        var $this = $(this);
        $this.addClass("ztree");
        $.fn.zTree.init($this, setting, nodes);
        $("#" + inputId + "").click(function(){
            showMenu(divId, inputId);
        });
        
    	function showMenu(divId, inputId){
            $('body').data('divId', divId);
            $('body').data('inputId', inputId);
            var inputObj = $("#" + inputId + "");
            $("#" + divId + "").css({
                left: inputObj[0].offsetLeft + "px",
                top: inputObj[0].offsetTop + inputObj.outerHeight() + "px"
            }).slideDown("fast");
            $(document).bind("mousedown", onBodyDown);
        }
        function hideMenu(){
            $("#" + $('body').data('divId') + "").fadeOut("fast");
            $(document).unbind("mousedown", onBodyDown);
        }
        function onBodyDown(event){
            if (!(event.target.id == $('body').data('inputId') || event.target.id == $('body').data('divId') || $(event.target).parents("#" + $('body').data('divId') + "").length > 0)) {
                hideMenu();
            }
        }
    };
    
    
    $.extend({
        /**
         * 获取初始化后的tree对象，以便调用tree对象的各种api方法
         * @param {Object} id tree的Dom容器的id
         */
        getTreeObj: function(id){
            return $.fn.zTree.getZTreeObj(id);
        }
    });
})(jQuery);
