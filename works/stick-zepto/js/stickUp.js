;Zepto(function($){
	// console.log($)
	$(document).ready(function(){

		$.fn.stickUp = function(options) {
			$(this).addClass('stuckMenu').html('<div id="navAnchor"></div><div id="navBar"><ul></ul></div>');
			
		}


	})

})