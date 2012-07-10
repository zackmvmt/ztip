/**
 * Z-Tip Tool Tip System (jquery.ztip.js)
 *
 * HOW TO USE:
 *		- add a title value to any element(s) in the dom
 * 		- when the dom has loaded, simply apply .ztip() to the element in jquery
 *		- EXAMPLE: $('.toolTipElements').ztip();
 *
 * OPTIONAL CUSTOMIZATION:
 *		- speed [number]: how fast the tip animation is (0 for instant)
 *		- delay [number]: how long before the animation starts (0 for instant)
 *		- bgColor [string]: convenince property for changing the background color
 *		- css [object]: a key/value hash of css attributes for the main box
 *		- carrot [object]: a key/value hash of css attributes for the carrot
 *
 * CREDITS:
 * Zack Stickles
 * zack@movementstrategy.com
 */

$.fn.ztip = function(options) {
	
	// default properties of the tool tip
	var defaults = {
	
		speed: 300,
		delay: 400
		
	};
	
	// default css for the tip and the carrot
	var css = {
		'max-width': '200px',
		'padding': '10px',
		'background-color': 'rgba(0, 0, 0, 0.6)',
		'color': '#FFF',
		'font-size': '13px',
		'position': 'absolute',
		'display': 'none'
	};
	
	var carrot = {
		'width': 0,
		'height': 0,
		'border-left': '10px solid transparent',
		'border-right': '10px solid transparent',
		'border-top': '10px solid rgba(0, 0, 0, 0.6)',
		'position': 'absolute',
		'right': '10px',
		'bottom': '-10px'
	}
	
	// if the user has given us some options
	if (options != undefined) {
	
		// if they have some styles, apply them to the defaults
		if (options.css != undefined) {
			
			var css = $.extend(css, options.css);
			delete options.css;
			
		}
		
		// if they have styled the carrot, apply that to the defaults
		if (options.carrot != undefined) {
			
			var carrot = $.extend(carrot, options.carrot);
			delete options.carrot;
			
		}
		
		// if they have defigned a color, apply that to both
		if (options.bgColor != undefined) {
			
			var css = $.extend(css, {'background-color': options.bgColor});
			var carrot = $.extend(carrot, {'border-top-color': options.bgColor});
			delete options.bgColor;
			
		}
		
		// over ride the defaults with optional user specified vars
		var options = $.extend(defaults, options);
		
	}
	
	// build a tooltip object and add it to the page
	var dom = '<div class="zt_tip">';
	dom += '<div class="text"></div>';
	dom += '<div class="carrot"></div>';
	dom += '</div>';
	$('body').prepend(dom);
	
	// style the tooltip
	$('.zt_tip').css(css);
	
	// add a carrot
	$('.zt_tip .carrot').css(carrot);
	
	// for each of the elements that the plugin is targeting
	$(this).each(function() {
		
		// get and remove the title from the element
		var title = $(this).attr('title');
		this.title = "";
		
		// mouse over and out functions
		$(this).hover(function() {
		
			$('.zt_tip').children('.text').html(title);
			setTip(this);
			setTimer();
		
		}, function() {
		
			stopTimer();
			$('.zt_tip').hide();
		
		});
	
	});
	
	// start a timer to delay the fade in effect
	setTimer = function() {
		
		$.tipTime = setInterval('showTip()', defaults.delay);
		
	}
	
	// stops the running timer
	stopTimer = function() {
		
		clearInterval($.tipTime);
		
	}
	
	// position the tooltip relative to the target element
	setTip = function(el) {
	
		// get some information about the positioning of the element
		var offset = $(el).offset();
		var left = offset.left;
		var top = offset.top;
		var width = $(el).outerWidth();
		var height = $(el).outerHeight();
		
		// get some information about the tooltip
		var tipWidth = $('.zt_tip').outerWidth();
		var tipHeight = $('.zt_tip').outerHeight();
		
		// figure out the right x and y positions for the tool tip
		var tipY = (top - tipHeight - height + 5) + "px";
		var tipX = (left - (tipWidth - width)) + "px";
		
		// update the tooltip's css
		$('.zt_tip').css({'top': tipY, 'left': tipX});
		
	}
	
	// stop the timer and show the tip
	showTip = function(el) {
		
		stopTimer();
		
		$('.zt_tip').animate({
		
			'top': '+=20px',
			'opacity': 'toggle'
			
		}, defaults.speed);
		
	}
	
}