const hidePopup = function(popup) {

	$(popup).animate({
		opacity: 0
	}, 400, function() {
		$(popup).hide()
	})

}

const openPopup = function(popup) {
	$(popup).addClass('open')
	$(popup).show().animate({
		opacity: 1
	}, 200)
}

const previewPopup = function(popup) {
	$(popup).show().animate({
		opacity: 0.25
	}, 200)
}


$(document).ready(function() {
	$('.work-list .item').on('mouseenter', function() {
		$(this).addClass('active');
		previewPopup($(this).attr('data-popup'))
	});

	$('.work-list .item').on('mouseleave', function() {

		$(this).removeClass('active');
		if (!$($(this).attr('data-popup')).hasClass('open')) {
			hidePopup($(this).attr('data-popup'))
		}
	});

	$('.work-list .item').click(function() {

		openPopup($(this).attr('data-popup'))
		$(this).removeClass('active');


	});

	$('.work_popup .close-btn').click(function() {
		hidePopup($(this).parent())
		$($(this).parent()).removeClass('open')
	});


	//ScrollMagic

	var controller = new ScrollMagic.Controller();

	// define movement of panels
	var wipeAnimation = new TimelineMax()
		// animate to second panel
		
		
		.to("#slideContainer", 1, {
			x: "-25%"
		}) // move in to first panel
		.to("#slideContainer", 0.5, {
			z: 0
		}) // move back to origin in 3D space
		// animate to third panel
		
		.to("#slideContainer", 1, {
			x: "-50%"
		})
		.to("#slideContainer", 0.5, {
			z: 0
		})
		// animate to forth panel
	
		.to("#slideContainer", 1, {
			x: "-75%"
		})
		.to("#slideContainer", 0.5, {
			z: 0
		});

	// create scene to pin and link animation
	new ScrollMagic.Scene({
			triggerElement: "#pinContainer",
			triggerHook: "onLeave",
			duration: "400%"
		})
		.setPin("#pinContainer")
		.setTween(wipeAnimation)
		.addIndicators() // add indicators (requires plugin)
		.addTo(controller);

});