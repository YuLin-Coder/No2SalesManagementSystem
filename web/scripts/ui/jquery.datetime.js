(function($){
    $.fn.datetime = function(options){
        if (!this.length) 
            return this;
        options = $.extend(true, {
            width: '100px',
            height: '20px'
        }, options);
        var $this = $(this);
        $this.click(function(){
			$dp.hide();
            WdatePicker({dateFmt:options.dateFmt,skin:options.skin});
        }).addClass("Wdate");
    }
})(jQuery);

