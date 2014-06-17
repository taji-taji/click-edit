;
(function($) {

	'use strict';

	var methods = {

		init : function( options ) {

			var count = $('[data-ce]').size();

			return this.each(function() {
				
				this.self = $(this);
				this.self.attr('data-ce', count);

				this.opt = $.extend(true, {}, $.fn.ce.defaults, options);

				methods._createEditField.call(this);
				methods._binds.call(this);
			
				// this.opt - height
				if (this.opt['height'] == 'fit') {

					this.editInput.height( this.self.height() );

				} else {

					this.editInput.height( this.opt['height'] );

				}

				count++;

			});

		},

		_binds: function() {
			if (this.opt.editButton) {
				methods._createEditButton.call(this);
			} else {
				methods._bindDblClick.call(this);
				methods._bindOverLayClick.call(this);
			}
			if (this.opt.finishButton) {
				methods._createFinishButton.call(this);
			}
			if (this.opt.cancelButton) {
				methods._createCancelButton.call(this);
			}
		},

		_bindDblClick: function() {
			this.self.on('dblclick', function(event) {
				methods.start.call(this);
			});
		},

		_bindOverLayClick: function() {
			var that = this;
			that.overlay.on('click', function() {
				methods.finish.call(that);
				methods._changeVal.call(that, that.editInput.val());
			});
		},

		_changeVal: function(changed) {

			var before = this.self.text();

			this.self.html(nl2br(changed));
			this.opt.afterChangeVal(before, changed);

		},

		_createCancelButton: function() {

			var that = this;
			var cancelText = that.opt.cancelText;
			var count = that.self.data('ce');
			that.editField.append('<button class="ce-button ce-cancel-button ce-cancel-button-' + count + '">' + cancelText + '</button>');
			that.cancelButton = $('.ce-cancel-button-' + count);
			that.cancelButton.on('click', function() {
				methods.finish.call(that);
				methods._setVal.call(that, that.self.text());
			});

		},

		_createEditButton: function() {

			var that = this;
			var editText = that.opt.editText;
			var count = that.self.data('ce');
			that.self.after('<button class="ce-button ce-edit-button ce-edit-button-' + count + '">' + editText + '</button>');
			that.editButton = $('.ce-edit-button-' + count);
			that.editButton.on('click', function() {
				$(this).hide();
				methods.start.call(that);
			});

		},

		_createEditField: function() {

			var input;
			var count = $('.ce-edit-box').size();

			if (this.opt.type == 'input') {

				input = '<input type="text" class="ce-edit-box">';

			} else if (this.opt.type == 'textarea') {

				input = '<textarea class="ce-edit-box"></textarea>';

			}
	
			// set edit area
			$('body').append('<div id="ce-'+count+'">' + input + '<input type="hidden" class="ce-edit-trigger"></div>');

			this.editField = $('#ce-'+count);
			this.editInput = this.editField.find('.ce-edit-box');
			this.editTrigger = this.editField.find('.ce-edit-trigger');
			this.editField.hide();

			methods._createOverLay.call(this);

		},

		_createFinishButton: function() {

			var that = this;
			var finishText = that.opt.finishText;
			var count = that.self.data('ce');
			that.editField.append('<button class="ce-button ce-finish-button ce-finish-button-' + count + '">' + finishText + '</button>');
			that.finishButton = $('.ce-finish-button-' + count)
			that.finishButton.on('click', function() {
				methods.finish.call(that);
				methods._changeVal.call(that, that.editInput.val());
			});

		},

		_createOverLay: function() {

			var that = this;

			var overlaySize = $('.ce-overlay').size();
			$('body').append('<div class="ce-overlay ce-overlay-' + overlaySize + '"></div>');
			that.overlay = $('.ce-overlay-' + overlaySize);
			that.overlay.height($('html, body').height());

		},

		_setVal: function(val) {

			this.editInput.val(val);

		},

		_setWidth: function() {

			// this.opt - width
			if (this.opt.width == 'fit') {

				this.editInput.width( this.self.width() );

			} else {

				this.editInput.width( this.opt.width );

			}

		},

		finish: function() {

			this.editField
				.hide()
				.css({
					'zIndex': 0
				});

			$('.ce-edit-button').show();

			this.self.css('opacity', 1);

			this.overlay.css({
				'zIndex': -1
			});

		},

		start: function() {

			var editOffset = this.self.offset();
			var editTop = editOffset.top;
			var editLeft = editOffset.left;

			this.self.css('opacity', 0);

			this.overlay.css({
				'zIndex': 999
			});
			this.editField
			.show()
			.css({
				'position': 'absolute',
				'top': editTop + 'px',
				'left': editLeft + 'px',
				'zIndex': 1000
			});

			methods._setVal.call(this, this.self.text());
			methods._setWidth.call(this);

		}

	};

	$.fn.ce = function( method ) {

		if ( methods[method] ) {
			return methods[ method ].apply( this, Array.prototype.slice.call( arguments, 1 ));
		} else if ( typeof method === 'object' || ! method ) {
			return methods.init.apply( this, arguments );
		} else {
			$.error( 'Method ' +  method + ' does not exist!' );
		}

	};

	// default
	$.fn.ce.defaults = {
		type: 'input', // 'input' or 'textarea'
		width: 100, // 'fit' or a numerical value. 'fit' -> fit the target width
		height: 'fit', // 'auto' or 'fit' or a numerical value.
		editButton: false,
		editText: 'Edit',
		finishButton: false,
		finishText: 'OK',
		cancelButton: false,
		cancelText: 'Cancel',
		afterChangeVal: function() {}
	};

	function nl2br (str) {

		return str.replace(/[\n\r]/g, "<br />");

	}

})(jQuery);
