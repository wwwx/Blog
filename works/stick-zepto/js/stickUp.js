;Zepto(function($){
	// console.log($)

	// 扩展String
	$.extend(String.prototype, {
		substitute: function(data) {
	        if (data && typeof(data) === "object") {
	            return this.replace(/\{([^{}]+)\}/g, function(match, key) {
	                var value = data[key];
	                return (value !== undefined) ? "" + value : ""
	            })
	        } else {
	            return this.toString()
	        }
	    }
	});

	// html 模板
	var tpl = {
		html_nav_li: '<li class="{navItemClass}" data-id="{dataId}">\
						<a href="javascript:;">{text}</a>\
					  </li>',
		html_nav_wrap: '<div id="navAnchor"></div>\
						<div id="navBar">\
							<ul class="clearfix"></ul>\
						</div>',
		html_module_wrap: '<div id="{dataId}">\
							<h3 class="module-title"></h3>\
						 	<div class="list">\
							 	<ul class="ul-style clearfix"></ul>\
						 	</div>\
					 	 </div>',
	};

	$(document).ready(function(){

		var opts;
		var navItemClass = 'navItem';
		var navItemHover = 'active';
		var navItemSize = 0;
		var navItems = '';
		var moduleItems = '';
		var moduleTop = [];
		var module = [];
		var topMargin = 0;
		var lastScrollTop = 0;

		$.fn.stickUp = function(options) {

			if (options) {
				opts = $.extend({}, {
					navList: [],
					shopList: [],
					navItemClass: navItemClass,
					navItemHover: navItemHover,
					tpl: tpl
				}, options);
				// console.log(opts.topMargin)
				navItemClass = opts.navItemClass;
				navItemHover = opts.navItemHover;
				navItemSize=opts.navList.length;

				for (var i=0; i<navItemSize; i++) {
					module.push(opts.navList[i].dataId);
					opts.navList[i].navItemClass = navItemClass;
					navItems += opts.tpl.html_nav_li.substitute(opts.navList[i]);
					moduleItems += opts.tpl.html_module_wrap.substitute(opts.navList[i]);
				}
				// 组装导航, 各模块
				$(this).addClass('stuckNav').html(opts.tpl.html_nav_wrap).find('ul').html(navItems).find('li').eq(0).addClass(opts.navItemHover);
				$('.' + options.containerClass).html(moduleItems);

				// 矫正topMargin为数字，number类型
				if (opts.topMargin) {
					if (isNaN(opts.topMargin) && opts.topMargin.indexOf('px')>0) {
						topMargin = Number(opts.topMargin.replace(/px/, ''));
					} else if (typeof opts.topMargin === 'number') {
						topMargin = opts.topMargin;
					} else {
						console.log('incorrect argument, ignored.')
					}
				} else {
					topMargin = $(this).height();
				}
				// 导航绑定点击事件
				$('.' + navItemClass).bind('touchstart, click', function(){
					var index = $(this).index();
					var moduleTop1 = $('#' + module[index]).offset().top;
					$('body').scrollTop(moduleTop1 - topMargin);
				});
			}

			vartop = $(this).offset().top; 
		}

		// 滚动时导航对应按钮选中
		$(window).on('scroll', function(){

			varscroll = $(window).scrollTop();
			if (navItemSize > 0) {
				for (var i=0; i< navItemSize; i++) {
					moduleTop[i] = $('#' + module[i]).offset().top;
					moduleHeight = $('#' + module[i]).height();
					moduleUpScroll = moduleTop[i] - moduleHeight*.4;

					if (varscroll > lastScrollTop && varscroll > moduleTop[i]-50 && varscroll < moduleTop[i]+50) {
						$('.' + navItemClass).removeClass(navItemHover);
						$('.' + navItemClass).eq(i).addClass(navItemHover);
					} else {
						if (varscroll > moduleUpScroll) {
							$('.' + navItemClass).removeClass(navItemHover);
						    $('.' + navItemClass).eq(i).addClass(navItemHover);
						} else if (varscroll < 50) {	
							$('.' + navItemClass).removeClass(navItemHover);
						    $('.' + navItemClass).eq(0).addClass(navItemHover);
						}
					}
				}
			}	
			lastScrollTop = varscroll;
		})

	})

})