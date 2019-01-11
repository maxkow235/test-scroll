


$(document).ready(function() {
$('#fullpage').fullpage({
		//options here
		scrollHorizontally: true,
		slidesNavigation:false,
		scrollHorizontallyKey: 'YWx2YXJvdHJpZ28uY29tX01mU2MyTnliMnhzU0c5eWFYcHZiblJoYkd4NVNRcg==',
		menu:".fullpage-nav",
		scrollOverflow: true,
		anchors:['page1','page2','page3','page4','page5','page6'],
		afterLoad:function(origin,destination, direction) {
		
			if(destination.anchor == "page5") {

				$('body').addClass('dark_theme')
			} else {
				$('body').removeClass('dark_theme')
			}
		}
	});


})
	