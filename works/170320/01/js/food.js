

$(function(){

// 全局调用方法methods
    var m = {
        // 格式化字符串
        sprintf: function(){
            var str = arguments[0] || '';
            for (var i=1, n=arguments.length; i<n; i++) {
                str = str.replace(/%s/, arguments[i].toString());
            }
            return str;
        }
    }

// 
    var item = '<li><a href="%s">\
                    <div class="pic"><img src="%s" /><span>322*322</span></div>\
                    <p class="desc">%s</p>\
                    <p class="price clearfix">\
                        <span><small>￥</small>%s</span>\
                        <span class="fr">市场价:<del>￥%s</del></span>\
                    </p>\
                    <p class="buy"><span class="btn-buy">立即购买 > </span></p>\
                </a></li>';

    var win = $(window),
        navbar = $('#navbar'),
        navAnchor = $('#navAnchor'),
        box = $('.box');


// 
    var food = {
        init: function(){
            var keys = ['event_zcms_mysy', 'event_zcms_xxls', 'event_zcms_sxsg', 'event_zcms_bkzq'];
            for (var i in keys) {
                this.getList(keys[i]);
            }

            this.stick();
            this.nav(); 
            this.navScroll();
        },
        getList: function(key){
            var url = "//search.ule.com/api/recommend?jsoncallback=?&restype=2001";
            var data = {moduleKeys: key, times: new Date().getTime()};
            $.ajax({
                type: 'POST',
                url: url,
                cache: false,
                data: data,
                dataType: 'jsonp',
                success: function(res) {
                    for (var i=0, len=res[key].length;  i<len; i++) {
                        var _item = '';
                        var data = res[key];
                        var container = key.slice(11);
                        for (var i=0, len = data.length; i<len; i++) {
                            _item += m.sprintf(item, data[i].listingUrl, data[i].imgUrl, data[i].listingName, data[i].minPrice, data[i].maxPrice)
                        }
                    }
                    $('#'+container).append('<ul class="ul-stlye clearfix">'+ _item +'</ul></div>');
                },
                error: function(error){
                    console.log(error)
                }
            })
        },
        stick: function(){
            // navbar 滚动到顶部固定
            document.addEventListener('touchmove', function(event) {
                var win_top = win.scrollTop();
                var navAnchor_top = navAnchor.offset().top;
                if (win_top >= navAnchor_top) {
                    navbar.addClass('stick');
                    navAnchor.height(navbar.height());
                }
                else {
                    navbar.removeClass('stick');
                    navAnchor.height(0);
                }
            });
            win.scroll(function(event) {
                var win_top = win.scrollTop();
                var navAnchor_top = navAnchor.offset().top;
                if (win_top >= navAnchor_top) {
                    navbar.addClass('stick');
                    navAnchor.height(navbar.height());
                }
                else {
                    navbar.removeClass('stick');
                    navAnchor.height(0);
                }
            })
        },
        nav: function(){
            var that = this;
            navbar.find('li').click(function(){
                var _this = $(this);
                var box_top = box.eq(_this.index()).offset().top;
                var navbar_h = navbar.height();
                _this.addClass('active').siblings().removeClass('active');
                if ($('html').scrollTop()) {  
                    $('html').scrollTop(box_top - navbar_h); 
                } 
                else {
                    $('body').scrollTop(box_top - navbar_h);
                }    
                navbar.addClass('stick');
                navAnchor.height(navbar.height()); 
                return false;  
            });
            win.scroll(function(){
                var win_top = win.scrollTop();
                that.selectNav(win_top);
            })
        },
        navScroll:function(){
            var myscroll;
            function loaded(){
                setTimeout(function(){
                    myScroll = new IScroll('#navbar', { scrollX: true, scrollY: true, mouseWheel: true, click: true });
                }, 100);
            }
            window.addEventListener("load", loaded, false);
        },
        selectNav: function(winTop){
            var winH = win.height();
            var navLi = navbar.find('li');
            navLi.each(function(index){
                if (index < navLi.length) {
                    var id = $(this).attr("data-id");
                    if( winH/2 + winTop >= $('#' + id).offset().top ){
                        navLi.removeClass("active");
                        $(this).addClass("active");
                    }
                }
            });      
        }
    }

    food.init();

})



