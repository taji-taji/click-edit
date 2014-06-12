(function($) {

	$.fn.ce = function( options ) {

		// default
		var defaults = {
			width: 100 // 'fit' or a numerical value. 'fit' -> fit the target width
		}

		var setting = $.extend( defaults, options );

		var count = 0;

		$('body').append('<div class="ce-overlay"></div>');
		var $overlay = $('.ce-overlay');
		$overlay.height($('html, body').height());

		return this.each(function() {
	
			$('body').append('<input class="ce-input" id="ce-'+count+'">');

			var $this = $(this);
			var $editBox = $('#ce-'+count);

			var editOffset = $this.offset();
			var editTop = editOffset.top;
			var editLeft = editOffset.left;

			$this.attr('data-ce', count);
		
			$editBox.hide();

			if (setting['width'] == 'fit') {
				$editBox.width( $this.width() );
			} else {
				$editBox.width( setting['width'] );
			};

			$editBox.addClass('ce');
			$editBox.val($this.text());
			$editBox.css({
				'position': 'absolute',
				'top': editTop + 'px',
				'left': editLeft + 'px'
			});

			$this.on('dblclick', function() {
				$(this).css('opacity', 0);
				$editBox.show();

				$overlay.css({
					'zIndex': 999
				});
				$editBox.css({
					'zIndex': 1000
				});

			});

			$editBox.on('keyup', function() {
				$('[data-ce="' + $(this).attr('id').replace('ce-', '') + '"]').text($(this).val());
			});

			$overlay.on('click', function(event) {
				$editBox
					.hide()
					.css({
						'zIndex': 0
					});

				$this.css('opacity', 1);

				$overlay.css({
					'zIndex': -1
				});
			});

			count++;

		});

	}

})(jQuery);
