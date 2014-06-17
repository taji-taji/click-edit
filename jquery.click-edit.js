/*
 * jQuery Click Edit
 *
 * @author  : Yutaka Tajika
 *
 */

;
(function($) {

	'use strict';

	var methods = {

		init : function( options ) {

			return this.each(function() {
				
				this.self = $(this);

				var data = this.self.data('ce');
				var count = $('.ce').size();

				if (!data) {

					this.self.data('ce', {
						target: this.self,
						count: count
					});

					this.self.addClass('ce');

					this.opt = $.extend(true, {}, $.fn.ce.defaults, options);

					methods._createEditField.call(this);

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

					count++;

				}

			});

		},

		_bindDblClick: function() {

			this.self.on('dblclick.ce', function(event) {
				methods._show.call(this);
			});

		},

		_bindOverLayClick: function() {

			var that = this;

			that.overlay.on('click.ce', function() {
				methods.finish.call(that);
				methods._changeVal.call(that, that.editInput.val());
			});

		},

		_cancel: function(val) {

			methods.finish.call(this);
			methods._setVal.call(this, val);

		},

		_changeVal: function(changed) {

			var that = this;

			var before = that.self.text();

			if (that.opt.beforeChangeVal !== undefined) {
				that.opt.beforeChangeVal(before, changed);
			}

			that.self.html(nl2br(changed));

			if (that.opt.afterChangeVal !== undefined) {
				that.opt.afterChangeVal(that.self, before, changed);
			}

		},

		_createCancelButton: function() {

			var that = this;

			var cancelText = that.opt.cancelText;
			var count = that.self.data('ce').count;
			that.editField.append('<button class="ce-button ce-cancel-button ce-cancel-button-' + count + '">' + cancelText + '</button>');
			that.cancelButton = $('.ce-cancel-button-' + count);
			that.cancelButton.on('click', function() {
				methods._cancel.call(that, that.editInput.val());
			});

			if (that.opt.cancelButtonClass) {
				that.cancelButton.addClass(that.opt.cancelButtonClass);
			}

			that.self.data('ce').cancelButton = that.cancelButton;

		},

		_createEditButton: function() {

			var that = this;

			var editText = that.opt.editText;
			var count = that.self.data('ce').count;
			that.self.after('<button class="ce-button ce-edit-button ce-edit-button-' + count + '">' + editText + '</button>');
			that.editButton = $('.ce-edit-button-' + count);
			that.editButton.on('click', function() {
				$(this).hide();
				methods._show.call(that);
			});

			if (that.opt.editButtonClass) {
				that.editButton.addClass(that.opt.editButtonClass);
			}

			that.self.data('ce').editButton = that.editButton;

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
			$('body').append('<div id="ce-'+count+'">' + input + '</div>');

			this.editField = $('#ce-'+count);
			this.editInput = this.editField.find('.ce-edit-box');
			this.editField.hide();

			methods._createOverLay.call(this);

			this.self.data('ce').editField = this.editField;

		},

		_createFinishButton: function() {

			var that = this;

			var finishText = that.opt.finishText;
			var count = that.self.data('ce').count;
			that.editField.append('<button class="ce-button ce-finish-button ce-finish-button-' + count + '">' + finishText + '</button>');
			that.finishButton = $('.ce-finish-button-' + count);
			that.finishButton.on('click.ce', function() {
				methods.finish.call(that);
				methods._changeVal.call(that, that.editInput.val());
			});

			if (that.opt.finishButtonClass) {
				that.finishButton.addClass(that.opt.finishButtonClass);
			}

			that.self.data('ce').finishButton = that.finishButton;

		},

		_createOverLay: function() {

			var that = this;

			var overlaySize = $('.ce-overlay').size();
			$('body').append('<div class="ce-overlay ce-overlay-' + overlaySize + '"></div>');
			that.overlay = $('.ce-overlay-' + overlaySize);

			that.self.data('ce').overlay = that.overlay;

		},

		_setHeight: function() {

			// this.opt - height
			if (this.opt.height == 'fit') {

				this.editInput.height( this.self.height() );

			} else {

				this.editInput.height( this.opt.height );

			}

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

		_show: function() {

			var editOffset = this.self.offset();
			var editTop = editOffset.top;
			var editLeft = editOffset.left;

			this.self.css('opacity', 0);

			this.overlay
				.css({
					'zIndex': 999
				})
				.show()
				.height($('html, body').height());

			this.editField
				.show()
				.css({
					'position': 'absolute',
					'top': editTop + 'px',
					'left': editLeft + 'px',
					'zIndex': 1000
				});

			methods._setVal.call(this, br2nl(this.self.html()));
			methods._setWidth.call(this);
			methods._setHeight.call(this);

			this.opt.afterShow(this.self, this.editInput, this.editInput.val());

		},

		cancel: function() {

			this.each(function() {

				methods._cancel.call(this);

			});

		},

		destroy: function() {

			return this.each(function() {

				var $this = $(this);
				var data = $this.data('ce');

				$(window).off('.ce');
				data.finishButton.remove();
				data.cancelButton.remove();
				data.overlay.remove();
				data.editButton.remove();
				data.editField.remove();
				$this.removeData('ce');

			});

		},

		finish: function() {

			this.editField
				.hide()
				.css({
					'zIndex': 0
				});

			$('.ce-edit-button').show();

			this.self.css('opacity', 1);

			this.overlay.hide();
			this.overlay.css({
				'zIndex': -1,
			});

		},

		show: function() {

			this.each(function() {

				methods._show.call(this);

			});

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
		afterChangeVal     : function() {},
		afterShow          : function() {},
		beforeChangeVal    : function() {},
		cancelButton       : false,
		cancelButtonClass  : null,
		cancelText         : 'Cancel',
		editButton         : false,
		editButtonClass    : null,
		editText           : 'Edit',
		finishButton       : false,
		finishButtonClass  : null,
		finishText         : 'OK',
		height             : 'fit', // 'auto' or 'fit' or a numerical value.
		type               : 'input', // 'input' or 'textarea'
		width              : 100 // 'fit' or a numerical value. 'fit' -> fit the target width
	};

	function nl2br (str) {

		return str.replace(/[\n\r]/g, "<br />");

	}

	function br2nl (str) {

		return str.replace(/<br\s*\/?>/mg,"\n");

	}

})(jQuery);
