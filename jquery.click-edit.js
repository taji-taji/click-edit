(function($) {

	$.fn.ce = function(options) {

		var defaults = {
			defColor: "#ff6699",
			defPadding: 5
		}

		var setting = $.extend(defaults, options);

		var count = 0;

		return this.each(function() {
			
			var edit = $(this);
			edit.data('ce', count);

			var editOffset = edit.offset();
			var editTop = editOffset.top;
			var editLeft = editOffset.left;

			$('body').append('<input id="ce-'+count+'">');
			var editBox = $('#ce-'+count);
			editBox.hide();
			editBox.addClass('ce');
			editBox.val(edit.text());
			editBox.css({
				'position': 'absolute',
				'top': editTop + 'px',
				'left': editLeft + 'px'
			})

			edit.on('dblclick', function() {
				$(this).hide();
				editBox.show();
			});

			$(document).on('click', function(event) {
				if (!$.contains($('#ce-'+count)[0], event.target)) {
					console.log($(this));
					editBox.hide();
					edit.show();
				}
			});

			count++;

		});

	}

})(jQuery);
