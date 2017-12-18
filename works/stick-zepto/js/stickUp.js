;Zepto(function($){
	// console.log($)
	$(document).ready(function(){

		$.fn.stickUp = function(options) {
			var opts;
			if (options) {
				opts = $.extend({}, options);
				console.log(opts)
			}
			$(this).addClass('stuckMenu').html('<div id="navAnchor"></div><div id="navBar"><ul></ul></div>');

		}


	})

})