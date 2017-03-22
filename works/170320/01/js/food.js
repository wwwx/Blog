

$(function(){

    var m = {
        sprintf: function(){
            var str = arguments[0] || '';
            for (var i = 1, n = arguments.length; i < n; i++) {
                str = str.replace(/%s/, arguments[i].toString());
            }
            return str;
        }
    }

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
                    console.log(res)
                    for (var i=0, len=res[key].length;  i<len; i++) {
                        var arr = [];
                        var _html = '';
                        var data = res[key];
                        var container = key.slice(11);console.log(container)
                        arr.push('<ul class="ul-stlye clearfix">');
                        for (var i=0, len = data.length; i<len; i++) {
                            _html += m.sprintf(item, data[i].listingUrl, data[i].imgUrl, data[i].listingName, data[i].minPrice, data[i].maxPrice)
                        }
                        arr.push(_html);
                        arr.push('</ul></div>');
                    }
                    $('#'+container).append(arr.join(""));
                },
                error: function(error){
                    console.log(error)
                }
            })
        },
        stick: function(){
            var that = this;
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
                that.tab(win_top);
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
            navbar.find('li').click(function(){
                var _this = $(this);
                var box_top = box.eq(_this.index()).offset().top;
                var navbar_h = navbar.height();
                _this.addClass('active').siblings().removeClass('active');
                if ($('html').scrollTop()) {  
                    $('html').animate({ scrollTop: (box_top - navbar_h) }, 500);
                    navbar.addClass('stick');
                    navAnchor.height(navbar.height());  
                    return false;  
                } 
                else {
                    $('body').animate({ scrollTop: (box_top - navbar_h) }, 500); 
                    navbar.addClass('stick');
                    navAnchor.height(navbar.height()); 
                    return false;  
                }    
            })
        },
        tab: function(h){
            for (var i=0, len=navbar.find('li').length; i<len; i++) {
                var box_top = box.eq(i).offset().top;
                var navbar_h = navbar.height();
                if (h > (box_top - navbar_h - 40)) {
                    navbar.find('li').eq(i).addClass('active').siblings().removeClass('active');
                }
            }
            
        }
    }
    food.init();

})



