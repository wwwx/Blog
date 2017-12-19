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

	// 滑动效果
	$.fn.scrollTo =function(options){
        var defaults = {
            toT : 0,    //滚动目标位置
            durTime : 200,  //过渡动画时间
            delay : 30,     //定时器时间
            callback:null   //回调函数
        };
        var opts = $.extend(defaults,options),
            timer = null,
            _this = this,
            curTop = _this.scrollTop(),//滚动条当前的位置
            subTop = opts.toT - curTop,    //滚动条目标位置和当前位置的差值
            index = 0,
            dur = Math.round(opts.durTime / opts.delay),
            smoothScroll = function(t){
                index++;
                var per = Math.round(subTop/dur);
                if(index >= dur){
                    _this.scrollTop(t);
                    window.clearInterval(timer);
                    if(opts.callback && typeof opts.callback == 'function'){
                        opts.callback();
                    }
                    return;
                }else{
                    _this.scrollTop(curTop + index*per);
                }
            };
        timer = window.setInterval(function(){
            smoothScroll(opts.toT);
        }, opts.delay);
        return _this;
    };

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


		var windowHeight = $(window).height();
		var windowWidth = $(window).width();

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
				$(this).html(opts.tpl.html_nav_wrap).find('ul').html(navItems).find('li').eq(0).addClass(opts.navItemHover);
				$('.' + options.containerClass).html(moduleItems);


				// 
				// console.log($(this))
				navHeight = $('#navBar ul li').height(); 
				navItemWidth = $('#navBar ul li').width();

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
					topMargin = navHeight;
				}


				$('#navBar ul').css({
					'width': navItemWidth * navItemSize + 1,
					'transition-property': '-webkit-transform', 
					'transition-duration': '600ms',
					'transition-timing-function': 'cubic-bezier(0.1, 0.57, 0.1, 1)', 
					'transform': 'translate(0px, 0px) translateZ(0px)'
				});
				// 导航绑定点击事件
				$('.' + navItemClass).bind('touchstart, click', function(){
					var index = $(this).index();
					var moduleTop1 = $('#' + module[index]).offset().top;
					$('body').scrollTo({
						toT: moduleTop1 - topMargin
					});

					// var navItemOffsetX = $(this).offset().left;
					var l = $('#navBar ul li').width();
					var c = document.getElementById('navBar').getElementsByTagName('ul')[0].getBoundingClientRect();
					var x = c.left - l;
					// if (index >=2 && index <= (navItemSize-2)) {
					// 	$('#navBar ul').css({
					// 		'transform': 'translate('+ x +'px)'
					// 	});
					// }
				});
			}

			vartop = $(this).offset().top; 
		}

		$(document).on('touchmove', '#navBar', function(evt){
			evt = evt || window.event;
			console.log(evt.touches[0].pageX)
		});



		// 滚动时导航对应按钮选中
		$(window).on('scroll', function(){

			varscroll = $(window).scrollTop();
			if (navItemSize > 0) {
				for (var i=0; i< navItemSize; i++) {
					moduleTop[i] = $('#' + module[i]).offset().top;
					moduleUpScroll = moduleTop[i] - windowHeight*.3;

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

			if (varscroll > vartop) {
				$('#navBar').addClass('stick');
				$('#navAnchor').height(navHeight);
			} else {
				$('#navBar').removeClass('stick');
				$('#navAnchor').height(0);
			}

			lastScrollTop = varscroll;
		})

	})

})