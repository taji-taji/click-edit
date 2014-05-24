(function($) {

	$.fn.ce = function(options) {

        var defaults={
            defColor:"#ff6699",
            defPadding:5
        }

        var setting = $.extend(defaults, options);
        
        return this.append('<input type="text" value="">');

	}

})(jQuery);
