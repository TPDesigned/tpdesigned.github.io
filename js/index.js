function createSliderPagination($obj) {
	var wrapper = $('<ul class="slider-pagination"></ul>').insertAfter($obj.parent().siblings('.slider-navigation'));
	$obj.each(function (index) {
		var dotWrapper = (index == 0) ? $('<li class="selected"></li>') : $('<li></li>'),
			dot = $('<a href="#0"></a>').appendTo(dotWrapper);
		dotWrapper.appendTo(wrapper);
		dot.text(index + 1);
	});
	// return wrapper.children('li');
}

function nextSlide($obj, $n) {
	var visibleSlide = $obj.find('.slide-selected'),
		navigationDot = $obj.find('.selected');
	if (typeof $n === 'undefined') $n = visibleSlide.index() + 1;
	visibleSlide.removeClass('slide-selected');
	$obj.find('.slider li').eq($n).addClass('slide-selected').prevAll().addClass('move-left');
	navigationDot.removeClass('selected');
	$obj.find('.slider-pagination li').eq($n).addClass('selected');
	updateNavigation($obj, $obj.find('.slider li').eq($n));
}

function prevSlide($obj, $n) {
	var visibleSlide = $obj.find('.slide-selected'),
		navigationDot = $obj.find('.selected');
	if (typeof $n === 'undefined') $n = visibleSlide.index() - 1;
	visibleSlide.removeClass('slide-selected');
	$obj.find('.slider li').eq($n).addClass('slide-selected').removeClass('move-left').nextAll().removeClass('move-left');
	navigationDot.removeClass('selected');
	$obj.find('.slider-pagination li').eq($n).addClass('selected');
	updateNavigation($obj, $obj.find('.slider li').eq($n));
}

function updateNavigation($obj, $active) {
	$obj.find('.prev').toggleClass('inactive', $active.is(':first-child'));
	$obj.find('.next').toggleClass('inactive', $active.is(':last-child'));
}

function enableSwipe() {
	if (!$('html').hasClass('lt-ie9')) {
		var mq = window.getComputedStyle(document.querySelector('.slider'), '::before').getPropertyValue('content').replace(/"/g, "").replace(/'/g, "");
		return (mq == 'mobile' || $('.single-item').hasClass('slider-active'));
	}
}

$(function () {
	/* IE 10 for Windows Phone 8 fix for Bootstrap */
	// Copyright 2014-2015 Twitter, Inc.
	// Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
	if (navigator.userAgent.match(/IEMobile\/10\.0/)) {
		var msViewportStyle = document.createElement('style');
		msViewportStyle.appendChild(document.createTextNode('@-ms-viewport{width:auto!important}'));
		document.querySelector('head').appendChild(msViewportStyle);
	}

	// Auto-display content based on scrolling
	$(window).scroll(function () {
		$('.noopacity').each(function (i) {

			var bottom_of_object = $(this).offset().top + $(this).outerHeight();
			var bottom_of_window = $(window).scrollTop() + $(window).height() + 100;

			if (bottom_of_window > bottom_of_object) {
				$(this).animate({'opacity' : '1'}, 700);
			}
		});
	});

	$('.header').stickyNavbar({
		mobile: true
	});

	//itemInfoWrapper = $('.single-item');

	var itemInfoWrapper = '.single-item',
		slides = $('.slider li'),
		slidesWrapper = $('.slider');
	// create slider pagination
	$('.slider').each(function () {
		if ($(this).children().length !== 1) {
			createSliderPagination($(this).children('li'));
		} else {
			$(this).parent().find('.slider-navigation li a').addClass('inactive');
		}
	});
		//sliderPagination = createSliderPagination(slides);

	$('.slider').on('click', function (event) {
		//enlarge slider images
		if (!$(this).parents('.single-item').hasClass('slider-active') && $(event.target).is('.slider')) {
			$(this).parents('.single-item').addClass('slider-active').one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function () {
				var topY = $(this).offset().top - 72;
				$('body,html').animate({'scrollTop': topY}, 200);
			});
		}
	});
	$('.close').on('click', function () {
		//shrink slider images
		prevSlide($(this).parents('.slider-wrapper'), 0);
		$(this).parents('.single-item').removeClass('slider-active');
	});

	//update visible slide
	$('.next').on('click', function () {
		nextSlide($(this).parents('.slider-wrapper'));
	});

	$('.prev').on('click', function () {
		prevSlide($(this).parents('.slider-wrapper'));
	});

	$('.slider').on('swipeleft', function () {
		var bool = enableSwipe();
		if (!$(this).find('.slide-selected').is(':last-child') && bool) { nextSlide($(this).parents('.slider-wrapper')); }
	});

	$('.slider').on('swiperight', function () {
		var bool = enableSwipe();
		if (!$(this).find('.slide-selected').is(':first-child') && bool) { prevSlide($(this).parents('.slider-wrapper')); }
	});

	$('.slider-pagination a').on('click', function () {
		var selectedDot = $(this).parent();
		if (!selectedDot.hasClass('selected')) {
			var selectedPosition = selectedDot.index(),
				activePosition = selectedDot.siblings('.selected').index();
			if (activePosition < selectedPosition) {
				nextSlide($(this).parents('.slider-wrapper'), selectedPosition);
			} else {
				prevSlide($(this).parents('.slider-wrapper'), selectedPosition);
			}
		}
	});
});
