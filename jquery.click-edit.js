(function($) {

	$.fn.ce = function( options ) {

		// default
		var defaults = {
			type: 'input', // 'input' or 'textarea'
			width: 100, // 'fit' or a numerical value. 'fit' -> fit the target width
			height: 'auto', // 'auto' or 'fit' or a numerical value.
			editButton: false,
			editText: 'Edit',
			finishButton: false,
			finishText: 'OK',
			cancelButton: false,
			cancelText: 'Cancel'
		}

		var setting = $.extend( defaults, options );

		var count = $('[data-ce]').size();

		// set overlay
		$('body').append('<div class="ce-overlay"></div>');
		var $overlay = $('.ce-overlay');
		$overlay.height($('html, body').height());

		return this.each(function() {

			var editArea;

			if (setting['type'] == 'input') {

				editArea = '<input type="text" class="ce-edit-box">';

			} else if (setting['type'] == 'textarea') {

				editArea = '<textarea class="ce-edit-box"></textarea>';

			}
	
			// set edit area
			$('body').append('<div id="ce-'+count+'">' + editArea + '<input type="hidden" class="ce-edit-trigger"></div>');

			var $this = $(this);
			var $editBox = $('#ce-'+count);
			var $editInput = $editBox.find('.ce-edit-box');
			var $editTrigger = $editBox.find('.ce-edit-trigger');
			var fitWidth = false; // widthをfitさせるか

			$this.attr('data-ce', count);
		
			$editBox.hide();

			$editInput.addClass('ce');
			setVal($editInput, $this.text());

			// setting - width
			if (setting['width'] == 'fit') {

				$editInput.width( $this.width() );
				fitWidth = true;

			} else {

				$editInput.width( setting['width'] );

			}

			// setting - height
			if (setting['height'] == 'fit') {

				$editInput.height( $this.height() );

			} else {

				$editInput.height( setting['height'] );

			}

			// setting - editButton
			if (setting['editButton']) {

				editText = setting['editText'];

				$this.after('<button class="ce-edit-button ce-edit-button-' + count + '">' + editText + '</button>');
				$('.ce-edit-button-' + count).on('click', function() {
					$(this).hide();
					start($this, $editBox, $overlay, fitWidth);
				});

			} else {

				$this.on('dblclick', function() {
					start($this, $editBox, $overlay, fitWidth);
				});

			}

			// setting - finishButton
			if (setting['finishButton']) {

				finishText = setting['finishText'];
				$editBox.append('<button class="ce-edit-button ce-finish-button-' + count + '">' + finishText + '</button>');
				$('.ce-finish-button-' + count).on('click', function() {
					$editTrigger.change();
				});

			} else {

				$overlay.on('click', function() {
					$editTrigger.change();
				});

			}

			// setting - cancelButton
			if (setting['cancelButton']) {

				cancelText = setting['cancelText'];
				$editBox.append('<button class="ce-edit-button ce-cancel-button-' + count + '">' + cancelText + '</button>');
				$('.ce-cancel-button-' + count).on('click', function() {
					finish ($this, $editBox, $overlay);
					setVal($editInput, $this.text());

				});

			} else {

				$overlay.on('click', function() {
					$editTrigger.change();
				});

			}

			$editTrigger.on('change', function() {
				valChange($editBox.attr('id').replace('ce-', ''), $editInput.val());
				finish($this, $editBox, $overlay);
			});

			count++;

		});


	}

	function setVal ( target, text ) {

		target.val(text);

	}

	function start ( target, editBox, overlay, fit ) {

		var editOffset = target.offset();
		var editTop = editOffset.top;
		var editLeft = editOffset.left;
		var w = target.width();

		target.css('opacity', 0);

		overlay.css({
			'zIndex': 999
		});
		editBox
		.show()
		.css({
			'position': 'absolute',
			'top': editTop + 'px',
			'left': editLeft + 'px',
			'zIndex': 1000
		});

		if (fit) {
			editBox.find('.ce-edit-box').width(w);
		}

	}

	function valChange ( id, val ) {

		$('[data-ce="' + id + '"]').html(nl2br(val));

	}

	function finish ( target, editBox, overlay ) {

		editBox
			.hide()
			.css({
				'zIndex': 0
			});

		$('.ce-edit-button').show();

		target.css('opacity', 1);

		overlay.css({
			'zIndex': -1
		});

	}

	function nl2br (str) {

		return str.replace(/[\n\r]/g, "<br />");

	}

})(jQuery);
