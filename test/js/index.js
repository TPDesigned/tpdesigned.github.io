$(function () {
	/* IE 10 for Windows Phone 8 fix for Bootstrap */
	// Copyright 2014-2015 Twitter, Inc.
	// Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
	if (navigator.userAgent.match(/IEMobile\/10\.0/)) {
		var msViewportStyle = document.createElement('style');
		msViewportStyle.appendChild(document.createTextNode('@-ms-viewport{width:auto!important}'));
		document.querySelector('head').appendChild(msViewportStyle);
	}
	// Bootstrap Carousel
	$('.carousel').carousel({
		interval: 5000
	});
	$(".carousel").swiperight(function() {
		$(this).carousel('prev');
	});
	$(".carousel").swipeleft(function() {
		$(this).carousel('next');
	});

	// Open up header
	$('a.button').on('click', function(event) {
		event.preventDefault();
		$('div.button-content').stop().slideToggle({
			'duration': 500,
			start: function() {
				$('a.button').toggleClass('active');
			}
		});
	});
});
