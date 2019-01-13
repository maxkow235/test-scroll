$(document).ready(function() {
	var scrollers = []
	var iScrollServices
	$('.project-popup').each(function() {
		console.log(`#${$(this).attr('id')} .scroll-wrap`)
		myScroll = new IScroll(`#${$(this).attr('id')} .scroll-wrap`, {
			scrollX: true,
			scrollY: false,
			mouseWheel: true,
			disablePointer: true, // important to disable the pointer events that causes the issues
			disableTouch: false,
			disableMouse: false
		});
		scrollers.push(myScroll)

	})



	$('#fullpage').fullpage({
		//options here
		scrollHorizontally: true,
		slidesNavigation: false,
		scrollHorizontallyKey: 'YWx2YXJvdHJpZ28uY29tX01mU2MyTnliMnhzU0c5eWFYcHZiblJoYkd4NVNRcg==',
		menu: ".fullpage-nav",
		scrollOverflow: true,

		fitToSection: false,

		anchors: ['page1', 'page2', 'page3', 'page4', 'page5', 'page6'],
		afterLoad: function(origin, destination, direction) {
			iScrollServices = $('.section.services').find('.fp-scrollable')[0].fp_iscrollInstance
			let offsetDiff = $('.section.services').find('.fp-scrollable').offset().top
			$('.snap').each(function() {
				if (($(this).offset().top - offsetDiff) <= 0) {
					$('a[data-scrollanchor]').removeClass('active')
					$(`a[data-scrollanchor="#${$(this).attr("id")}"]`).addClass('active')
				}
			})


			iScrollServices.on('scrollEnd', function() {

				$('.snap').each(function() {
					if (($(this).offset().top - offsetDiff) <= 0) {
						$('a[data-scrollanchor]').removeClass('active')
						$(`a[data-scrollanchor="#${$(this).attr("id")}"]`).addClass('active')
					}
				})


			})


			//refreshCloseEvent(scrollers)

			let darkSections = ['page3', 'page4', 'page5']
			if (darkSections.indexOf(destination.anchor) !== -1) {

				$('body').addClass('dark_theme')
			} else {
				$('body').removeClass('dark_theme')
			}
		},
		afterSlideLoad: function(anchorLink, index, slideAnchor, slideIndex) {

			refreshCloseEvent(scrollers)



		}
	});

	$('.submenu a[data-scrollanchor]').click(function() {
		iScrollServices.scrollToElement($(this).attr("data-scrollanchor"))


	})

	$(document).mousemove(function(e) {

		const cursor = $('#cursor');
		const target = $(event.target);

		// update position of cursor
		cursor.css('left', e.clientX - 10).css('top', e.clientY - 10);

		const isLinkTag = target.is('a, .project-link, .project-link *');
		const isHovered = cursor.hasClass('hoveredCursor');

		// toggle the cursor class if necessary 
		if (isLinkTag && !isHovered) {

			cursor.addClass('hoveredCursor');

		} else if (!isLinkTag && isHovered) {

			cursor.removeClass('hoveredCursor');

		}

	});

	$(window).resize(function() {

		refreshCloseEvent(scrollers)
	})

	$(document).mouseleave(function(e) {

		const cursor = $('#cursor');
		cursor.hide()

	});

	$(document).mouseenter(function(e) {

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
		$('.logo').addClass('dark')
		$('#cursor').addClass('dark')
		$('.page_header').addClass('popup_open')
		$('nav').removeClass('open')
		refreshCloseEvent(scrollers)
		e.preventDefault()

		$(this).removeClass('scaled')
		$($(this).attr('href')).addClass('open')
		$($(this).attr('href')).show().animate({
			opacity: 1
		}, 400)

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
		console.log(item)
		item.refresh()
		var totalWidth = 0;

		$(`.${item.scroller.className}`).children().each(function() {
			totalWidth = totalWidth + $(this).width();
		});
		item.scroller.style.width = totalWidth + 320 + "px";

	})

	$('.project-popup .scroll-wrap').children('.close-btn').remove()
	$('.project-popup .scroll-wrap').prepend('<button class="close-btn">x</button>')
	$('.project-popup .scroll-wrap .close-btn').click(function() {
		$('.page_header').removeClass('popup_open')
		$('.logo').removeClass('dark')
		$('#cursor').removeClass('dark')
		$($(this).parent().parent()).removeClass('open').animate({
			opacity: 0
		}, 400, function() {
			$(this).hide()
		})
		$.fn.fullpage.setAllowScrolling(true);
		$.fn.fullpage.setKeyboardScrolling(true);
	})
}