(function($) {
	FLBuilderAJAXTabs = function( settings )
	{
		this.settings 	= settings;
		this.nodeClass  = '.fl-node-' + settings.id;
		this._init();
	};
	FLBuilderAJAXTabs.prototype = {
		settings	: {},
		nodeClass   : '',
		_init: function()
		{
			var win = $(window);
			$(this.nodeClass + ' .ajax-tabs-labels .ajax-tabs-label').click($.proxy(this._labelClick, this));
			$(this.nodeClass + ' .ajax-tabs-labels .ajax-tabs-label').on('keypress', $.proxy(this._labelClick, this));
			$(this.nodeClass + ' .ajax-tabs-panels .ajax-tabs-label').click($.proxy(this._responsiveLabelClick, this));
			$(this.nodeClass + ' .ajax-tabs-panels .ajax-tabs-label').on('keypress', $.proxy(this._responsiveLabelClick, this));
			if($(this.nodeClass + ' .ajax-tabs-vertical').length > 0) {
				this._resize();
				win.off('resize' + this.nodeClass);
				win.on('resize' + this.nodeClass, $.proxy(this._resize, this));
			}
			FLBuilderLayout.preloadAudio( this.nodeClass + ' .ajax-tabs-panel-content' );
		},
		_labelClick: function(e)
		{
			var label       = $(e.target).closest('.ajax-tabs-label'),
				type		= label.data('contenttype'),
				initialTab		= label.data('initialtab'),
				target 		= label.data('url'),
				index       = label.data('index'),
				wrap        = label.closest('.ajax-tabs'),
				allIcons    = wrap.find('.ajax-tabs-panels .ajax-tabs-label .fas'),
				icon        = wrap.find('.ajax-tabs-panels .ajax-tabs-label[data-index="' + index + '"] .fas');
			// Click or keyboard (enter or space) input?
			if(!this._validClick(e)) {
				return;
			}
			// Toggle the responsive icons.
			allIcons.addClass('fa-plus');
			icon.removeClass('fa-plus');

			// Toggle the tabs.
			wrap.find('.ajax-tabs-labels:first > .ajax-tab-active').removeClass('ajax-tab-active').attr('aria-selected', 'false').attr('aria-expanded', 'false');
			wrap.find('.ajax-tabs-panels:first > .ajax-tabs-panel > .ajax-tab-active').removeClass('ajax-tab-active');
			wrap.find('.ajax-tabs-panels:first > .ajax-tabs-panel > .ajax-tabs-panel-content').attr('aria-hidden', 'true').css('display', '');
			wrap.find('.ajax-tabs-labels:first > .ajax-tabs-label[data-index="' + index + '"]').addClass('ajax-tab-active').attr('aria-selected', 'true').attr('aria-expanded', 'true');
			wrap.find('.ajax-tabs-panels:first > .ajax-tabs-panel > .ajax-tabs-panel-content[data-index="' + index + '"]').addClass('ajax-tab-active').attr('aria-hidden', 'false');
			if (type == "ajax" && !initialTab) {
				wrap.find('.ajax-tabs-panels:first > .ajax-tabs-panel > .ajax-tabs-panel-content[data-index="' + index + '"]').empty().append(
				/*$(".ajax-tabs-panel > .ajax-tab-active").empty().append(*/
					"<div id='loading'><img src='https://simonbarnett.co.za/test2/wp-content/uploads/2018/12/830-1.gif' alt='Loading' /></div>"
				);
				$.ajax({
					url: target,
					success: function (html) {
						wrap.find('.ajax-tabs-panels:first > .ajax-tabs-panel > .ajax-tabs-panel-content[data-index="' + index + '"]').empty().append(html);
						/* $(".ajax-tabs-panel > .ajax-tab-active").empty().append(html); */
					}
				});
			}

			// Gallery module support.
			FLBuilderLayout.refreshGalleries( wrap.find('.ajax-tabs-panel-content[data-index="' + index + '"]') );

			// Grid layout support (uses Masonry)
			FLBuilderLayout.refreshGridLayout( wrap.find('.ajax-tabs-panel-content[data-index="' + index + '"]') );

			// Post Carousel support (uses BxSlider)
			FLBuilderLayout.reloadSlider( wrap.find('.ajax-tabs-panel-content[data-index="' + index + '"]') );

			// WP audio shortcode support
			FLBuilderLayout.resizeAudio( wrap.find('.ajax-tabs-panel-content[data-index="' + index + '"]') );

			// Slideshow module support.
			FLBuilderLayout.resizeSlideshow();

			// Reload Google Map embed.
			FLBuilderLayout.reloadGoogleMap( wrap.find('.ajax-tabs-panel-content[data-index="' + index + '"]') );
		},

		_responsiveLabelClick: function(e)
		{
			var label           = $(e.target).closest('.ajax-tabs-label'),
				wrap            = label.closest('.ajax-tabs'),
				index           = label.data('index'),
				type			= label.data('contenttype'),
				initialTab		= label.data('initialtab'),
				target          = label.data('url'),
				content         = label.siblings('.ajax-tabs-panel-content'),
				activeContent   = wrap.find('.ajax-tabs-panel-content.ajax-tab-active'),
				activeIndex     = activeContent.data('index'),
				allIcons        = wrap.find('.ajax-tabs-panels .ajax-tabs-label > .fas'),
				icon            = label.find('.fas');

			// Click or keyboard (enter or space) input?
			if(!this._validClick(e)) {
				return;
			}

			// Should we proceed?
			if(index == activeIndex) {
				return;
			}
			if(wrap.hasClass('ajax-tabs-animation')) {
				return;
			}

			// Toggle the icons.
			allIcons.addClass('fa-plus');
			icon.removeClass('fa-plus');

			// Run the animations.
			wrap.addClass('ajax-tabs-animation');
			activeContent.slideUp('normal');
			content.slideDown('normal', function(){
				wrap.find('.ajax-tab-active').removeClass('ajax-tab-active').attr('aria-hidden', 'true');
				wrap.find('.ajax-tabs-panels:first > .ajax-tabs-panel > .ajax-tabs-panel-content').attr('aria-hidden', 'true');
				wrap.find('.ajax-tabs-label[data-index="' + index + '"]').addClass('ajax-tab-active').attr('aria-hidden', 'false');
				wrap.find('.ajax-tabs-panels:first > .ajax-tabs-panel > .ajax-tabs-panel-content[data-index="' + index + '"]').attr('aria-hidden', 'false');
				content.addClass('ajax-tab-active');
				wrap.removeClass('ajax-tabs-animation');
				if (type == "ajax" && !initialTab) {
					wrap.find('.ajax-tabs-panels:first > .ajax-tabs-panel > .ajax-tabs-panel-content[data-index="' + index + '"]').empty().append(
					/*$(".ajax-tabs-panel > .ajax-tab-active").empty().append(*/
						"<div id='loading'><img src='https://simonbarnett.co.za/test2/wp-content/uploads/2018/12/830-1.gif' alt='Loading' /></div>"
					);
					$.ajax({
						url: target,
						success: function (html) {
							wrap.find('.ajax-tabs-panels:first > .ajax-tabs-panel > .ajax-tabs-panel-content[data-index="' + index + '"]').empty().append(html);
							/* $(".ajax-tabs-panel > .ajax-tab-active").empty().append(html); */
						}
					});
				}

				// Gallery module support.
				FLBuilderLayout.refreshGalleries( content );

				// Grid layout support (uses Masonry)
				FLBuilderLayout.refreshGridLayout( content );

				// Post Carousel support (uses BxSlider)
				FLBuilderLayout.reloadSlider( content );

				// WP audio shortcode support
				FLBuilderLayout.resizeAudio( content );

				// Reload Google Map embed.
				FLBuilderLayout.reloadGoogleMap( wrap.find('.ajax-tabs-panel-content[data-index="' + index + '"]') );

				if(label.offset().top < $(window).scrollTop() + 100) {
					$('html, body').animate({ scrollTop: label.offset().top - 100 }, 500, 'swing');
				}
			});
		},

		_resize: function()
		{
			$(this.nodeClass + ' .ajax-tabs-vertical').each($.proxy(this._resizeVertical, this));
		},

		_resizeVertical: function(e)
		{
			var wrap    = $(this.nodeClass + ' .ajax-tabs-vertical'),
				labels  = wrap.find('.ajax-tabs-labels'),
				panels  = wrap.find('.ajax-tabs-panels');

			panels.css('min-height', labels.height() + 'px');
		},

		_validClick: function(e)
		{
			return (e.which == 1 || e.which == 13 || e.which == 32) ? true : false;
		}
	};

})(jQuery);
