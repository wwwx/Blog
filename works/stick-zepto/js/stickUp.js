;Zepto(function($){
	// console.log($)

	// 扩展String方法
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

	// 扩展滚动条的滑动效果
    $.fn.scrollTo =function(options){
        var opts = $.extend({
        	direction: 'left', // left为水平方向滚动 其他字符默认垂直方向滚动
        	position : 0,      // 滚动目标位置
            durTime : 200,     //过渡动画时间
            delay : 30,        //定时器时间
            callback:null      //回调函数
        }, options);

        var oThis = this;
        var timer = null;
        var curPos = opts.direction !== 'left' ? oThis.scrollTop() : oThis.scrollLeft();
        var diff =  opts.position - curPos;    
        var index = 0;
        var dur = Math.round(opts.durTime / opts.delay);
        var smoothScroll = function (t) {
            index++;
            var per = Math.round(diff/dur);
            if(index >= dur){
            	if (opts.direction !== 'left') {
                	oThis.scrollTop(t);
            	} else {
            		oThis.scrollLeft(t);
            	}
                window.clearInterval(timer);
                if(opts.callback && typeof opts.callback == 'function'){
                    opts.callback();
                }
                return;
            }else{
            	if (opts.direction !== 'left') {
                	oThis.scrollTop(curPos + index*per);
            	} else {
                	oThis.scrollLeft(curPos + index*per);
            	}
            }
        };
        timer = window.setInterval(function(){
            smoothScroll(opts.position);
        }, opts.delay);
        return oThis;
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
		var lastIndex = 0;

		var windowHeight = $(window).height();
		var windowWidth = $(window).width();

		$.fn.stickUp = function(options) {
			// $(this).css({
			// 	'position': 'relative',
			// 	'z-index': '10'
			// });
			// $(tpl.html_module_wrap).find('#navBar').css({
			// 	'max-width': '640px',
			// 	'background': 'yellow',
			// 	'white-space': 'nowrap',
			// 	'overflow-x': 'auto'
			// });


			if (options) {
				opts = $.extend({
					navList: [],
					navItemClass: navItemClass,
					navItemHover: navItemHover,
					tpl: tpl
				}, options);
				// console.log(opts.topMargin)
				navItemClass = opts.navItemClass;
				navItemHover = opts.navItemHover;
				navItemSize  = opts.navList.length;

				for (var i=0; i<navItemSize; i++) {
					module.push(opts.navList[i].dataId);
					opts.navList[i].navItemClass = navItemClass;
					navItems += opts.tpl.html_nav_li.substitute(opts.navList[i]);
					moduleItems += opts.tpl.html_module_wrap.substitute(opts.navList[i]);
				}
				// 组装导航, 各模块
				$(this).html(opts.tpl.html_nav_wrap).find('ul').html(navItems).find('li').eq(0).addClass(opts.navItemHover);
				$('.' + options.container).html(moduleItems);
				
				// $('.' + opts.navItemClass).css({
				// 	'float': 'left',
				// 	'color': '#333',
				// 	'text-align': 'center'
				// })

				// 获取导航条的高度 和 每个按钮的宽度
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

				// 导航4以内按钮内无滚动
				if (navItemSize <= 4) {
					if (navItemSize === 1) {
						// 按钮为一个时移除导航
						$(this).remove();
					} else {
						$('#navBar ul').css({ 
							'width': '100%' 
						}).find('li').css({ 
							'width': 100/navItemSize + '%' 
						});
					}
				} else {
					$('#navBar ul').css({
						'width': navItemWidth * navItemSize + 1
					});
				}

				// 导航绑定点击事件
				$('.' + navItemClass).bind('touchstart, click', function(){
					var index = $(this).index();
					var curTop = $('#' + module[index]).offset().top;
					$('body').scrollTop(curTop - topMargin);

					if (index > 1 || (index === 1 && lastIndex > 1)) {
						$('#navBar').scrollTo({
							direction: 'left',
							position: (index-1) * navItemWidth
						});
					}
					lastIndex = index;
				});
			}

			vartop = $(this).offset().top; 
			return this;
		}



		// 滚动时导航对应按钮选中
		$(window).on('scroll', function(){
			varscroll = $(window).scrollTop();
			if (navItemSize > 0) {
				var hover = function(index) {
					$('.' + navItemClass).removeClass(navItemHover);
					$('.' + navItemClass).eq(index).addClass(navItemHover);
					$('#navBar').scrollLeft((index-1) * navItemWidth)
				}
				for (var i=0; i< navItemSize; i++) {
					moduleTop[i] = $('#' + module[i]).offset().top;
					moduleUpScroll = moduleTop[i] - windowHeight*.3;

					if (varscroll > lastScrollTop && varscroll > moduleTop[i]-50 && varscroll < moduleTop[i]+50) {
						hover(i);
					} else {
						if (varscroll > moduleUpScroll) {
							hover(i);
						} else if (varscroll < 50) {	
							hover(0);
						}
					}
				}

				if (varscroll > vartop) {
					$('#navBar').css({
						'position': 'fixed', 'top': 0, 'right': 0, 'left': 0
					});
					$('#navAnchor').height(navHeight);
				} else {
					$('#navBar').css({
						'position': 'relative'
					});
					$('#navAnchor').height(0);
				}

				lastScrollTop = varscroll;
			}	
		})

	})

})