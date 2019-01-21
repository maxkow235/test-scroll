$(document).ready(function() {
	var scrollers = []
	var iScrollServices
	var iScrollPartners

	$('.project-popup').each(function() {

		myScroll = new IScroll(`#${$(this).attr('id')} .scroll-wrap`, {
			scrollX: true,
			scrollY: false,
			mouseWheel: true,
			click: true,
			probeType: 3,
			disablePointer: true, // important to disable the pointer events that causes the issues
			disableTouch: false,
			disableMouse: false
		});
		scrollers.push(myScroll)

	})


	scrollers.forEach(function(item) {
		item.refresh()
	})
	$('#fullpage').fullpage({
		//options here
		scrollHorizontally: true,
		slidesNavigation: false,
		scrollHorizontallyKey: 'YWx2YXJvdHJpZ28uY29tX01mU2MyTnliMnhzU0c5eWFYcHZiblJoYkd4NVNRcg==',
		menu: ".fullpage-nav",
		scrollOverflow: true,
		scrollOverflowOptions: {
			probeType: 2
		},
		fitToSection: false,

		anchors: ['page1', 'page2', 'page3', 'page4', 'page5', 'page6'],
		afterLoad: function(origin, destination, direction) {
			if ($('.section.services').find('.fp-scrollable')[0]) {
				iScrollServices = $('.section.services').find('.fp-scrollable')[0].fp_iscrollInstance

			}
			var submenuScroll;
	refreshCloseEvent(scrollers)

			$('.submenu .submenu_scroll').each(function() {
				let linksWidth = 0
				$(this).find('a[data-scrollanchor]').each(function() {
					linksWidth += $(this).width() + 80
				})
				$(this).find('.menu_scroller').width(linksWidth)
				submenuScroll = new IScroll(`.${$(this)[0].className}`, {
					scrollX: true,
					scrollY: false,
					mouseWheel: true,
					probeType: 2,
					click: true,
					disablePointer: true,
					disableTouch: false,
					disableMouse: false
				});

				$('.submenu a[data-scrollanchor]').click(function() {
					iScrollServices.scrollToElement($(this).attr("data-scrollanchor"))
					$('a[data-scrollanchor]').removeClass('active')

					$(this).addClass('active')
					submenuScroll.scrollToElement(this)
				})

			})


			let offsetDiff = $('.section.services').find('.fp-scrollable').offset().top
			$('.snap').each(function() {
				if (($(this).offset().top - offsetDiff) <= 0) {
					$('a[data-scrollanchor]').removeClass('active')
					submenuScroll.scrollToElement(`a[data-scrollanchor="#${$(this).attr("id")}"]`)
					$(`a[data-scrollanchor="#${$(this).attr("id")}"]`).addClass('active')
				}
			})

			iScrollServices.on('scrollEnd', function() {

				$('.snap').each(function() {

					if (($(this).offset().top - offsetDiff) <= 0) {
						$('a[data-scrollanchor]').removeClass('active')

						$(`a[data-scrollanchor="#${$(this).attr("id")}"]`).addClass('active')
						submenuScroll.scrollToElement(`a[data-scrollanchor="#${$(this).attr("id")}"]`)
					}
				})
			})



			let darkSections = ['page3', 'page4', 'page5']
			if (darkSections.indexOf(destination.anchor) !== -1) {
				$('body').addClass('dark_theme')
			} else {
				$('body').removeClass('dark_theme')
			}
		},
		afterSlideLoad: function(anchorLink, index, slideAnchor, slideIndex) {
		//refreshCloseEvent(scrollers)
			
		}
	});





	$(window).resize(function() {
		refreshCloseEvent(scrollers)
	})

	$(document).mouseleave(function(e) {
		refreshCloseEvent(scrollers)
		const cursor = $('#cursor');
		cursor.hide()

	});

	$(document).mouseenter(function(e) {
		refreshCloseEvent(scrollers)
		const cursor = $('#cursor');
		cursor.show()

	});

	$('a.project-link').mouseenter(function() {
		$(this).addClass('scaled')

		

		

		$($(this).attr('href')).show().animate({
			opacity: 0.25
		}, 400)

	})

	$('a.project-link').mouseleave(function() {
		$(this).removeClass('scaled')

		if (!$($(this).attr('href')).hasClass('open'))
			$($(this).attr('href')).animate({
				opacity: 0
			}, 400, function() {
				$(this).hide()
			})

	})


	$('a.project-link').click(function(e) {


		$('.languages').hide()
		$('.logo').addClass('dark')
		$('#cursor').addClass('dark')
		$('.menu_toggle').addClass('noclick');
		$('.page_header').addClass('popup_open')
		$('nav').removeClass('open')
		
		e.preventDefault()
		
		
		$(this).removeClass('scaled')

		$($(this).attr('href')).addClass('open')
		$($(this).attr('href')).show().animate({
			opacity: 1
		}, 400,function() {
			refreshCloseEvent(scrollers)
		})

		$.fn.fullpage.setAllowScrolling(false);
		$.fn.fullpage.setKeyboardScrolling(false);
	})



	$('.menu_toggle').click(function() {
		$(this).toggleClass('is-active')
		$('nav.split').toggleClass('open')
	})

	$('li[data-menuanchor] a').click(function() {
		$('.menu_toggle').toggleClass('is-active')
		$('nav.split').removeClass('open')
	})

})


function refreshCloseEvent(arr) {
	arr.forEach(function(item) {

		item.refresh()
		var totalWidth = 0;

		$(`.${item.scroller.className}`).children().each(function() {
			totalWidth = totalWidth + $(this).width();
		});
		item.scroller.style.minWidth = totalWidth + 160 + "px";
		item.scroller.style.width = totalWidth + 160 + "px";

	})

	$('.project-popup .scroll-wrap').children('.close-btn').remove()
	$('.project-popup .scroll-wrap').prepend('<button class="close-btn"></button>')
	$('.project-popup .scroll-wrap .close-btn').click(function() {


		$('.languages').show()
		$('.page_header').removeClass('popup_open')
		$('body').removeClass('dark')

		$('.logo').removeClass('dark')
		$('.menu_toggle').removeClass('is-active')
		$('#cursor').removeClass('dark')
		$($(this).parent().parent()).removeClass('open').animate({
			opacity: 0
		}, 400, function() {
			$(this).hide()
			$('.menu_toggle').removeClass('noclick');
		})
		$.fn.fullpage.setAllowScrolling(true);
		$.fn.fullpage.setKeyboardScrolling(true);
	})
}