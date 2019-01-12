$(document).ready(function() {
	var myScroll = new IScroll('.project-popup', {
		scrollX: true,
		scrollY: false,
		mouseWheel: true,
		disablePointer: true, // important to disable the pointer events that causes the issues
disableTouch: false, // false if you want the slider to be usable with touch devices
disableMouse: false // false if you want the slider to be usable with a mouse (desktop)
	});
	$('.project-popup').append('<button class="close-btn">Close </button>')
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
			myScroll.refresh();
			let darkSections = ['page3', 'page4', 'page5']
			if (darkSections.indexOf(destination.anchor) !== -1) {

				$('body').addClass('dark_theme')
			} else {
				$('body').removeClass('dark_theme')
			}
		},
		afterSlideLoad: function(anchorLink, index, slideAnchor, slideIndex) {
			myScroll.refresh();
			$(`.submenu a[href^="#${anchorLink.anchor}"`).removeClass('active')
			$(`.submenu a[href^="#${anchorLink.anchor}"`).eq(slideAnchor.index).addClass('active')



		}
	});
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
		e.preventDefault()
		$(this).removeClass('scaled')
		$($(this).attr('href')).addClass('open')
		$($(this).attr('href')).show().animate({
			opacity: 1
		}, 400)

		$.fn.fullpage.setAllowScrolling(false);
		$.fn.fullpage.setKeyboardScrolling(false);
	})
	$('.project-popup .close-btn').click(function() {
		$($(this).parent()).removeClass('open').animate({
			opacity: 0
		}, 400, function() {
			$(this).hide()
		})
		$.fn.fullpage.setAllowScrolling(true);
		$.fn.fullpage.setKeyboardScrolling(true);
	})


})