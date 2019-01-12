$(document).ready(function() {
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
			let darkSections = ['page4', 'page5']
			if (darkSections.indexOf(destination.anchor) !== -1) {

				$('body').addClass('dark_theme')
			} else {
				$('body').removeClass('dark_theme')
			}
		},
		afterSlideLoad: function(anchorLink, index, slideAnchor, slideIndex) {
			
			$(`.submenu a[href^="#${anchorLink.anchor}"`).removeClass('active')
			$(`.submenu a[href^="#${anchorLink.anchor}"`).eq(slideAnchor.index).addClass('active')
			


		}
	});



})