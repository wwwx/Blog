
$(function(){

    var higheat = {
        // 
        item: '<li class="item"><a href="%s">\
                    <div class="pic"><img src="%s"></div>\
                    <p class="desc">%s</p>\
                    <div class="buy clearfix">\
                        <div class="price fl"><i>￥</i><span class="min">%s</span><br/><del class="max">￥%s</del></div>\
                        <span class="btn-buy fr">立即<br/>购买</span>\
                    </div>\
                </a></li>'
        ,navbar : $('#navbar')
        ,navAnchor : $('#navAnchor')
        ,box : $('.box')
        //
        ,init: function(){
            var keys = ['event_shipin_bzwz', 'event_shipin_bhls', 'event_shipin_dhs', 'event_shipin_dcsg', 'event_shipin_klzj'];
            for (var i in keys) {
                this.getList(keys[i]);
            }

            this.navStick();
            this.navTap(); 
            this.navScroll();
        }
        ,getList: function(key){
            var that = this;
            var url = "//search.ule.com/api/recommend?jsoncallback=?&restype=2001";
            var data = {moduleKeys: key, times: new Date().getTime()};
            $.getJSON(url, data, function(res) {
                console.log(res)
                for (var i=0, len=res[key].length;  i<len; i++) {
                    var items = '';
                    var data = res[key];
                    var container = key.slice(13);
                    console.log(container)
                    for (var i=0, len = data.length; i<len; i++) {
                        items += that.sprintf(that.item, data[i].listingUrl, data[i].imgUrl, data[i].listingName, data[i].minPrice, data[i].maxPrice)
                    }
                }
                 $('#'+ container +' .list').append('<ul class="ul-style clearfix">'+ items +'</ul>');
            })
        }
        ,navStick: function(){ 
            // navbar 滚动到顶部固定
            var that = this;
            document.addEventListener('touchmove', function(event) {
                var win_top = $(window).scrollTop();
                var navAnchor_top = that.navAnchor.offset().top;
                if (win_top >= navAnchor_top) {
                    that.navbar.addClass('stick');
                    that.navAnchor.height(that.navbar.height());
                }
                else {
                    that.navbar.removeClass('stick');
                    that.navAnchor.height(0);
                }
            });
            $(window).scroll(function(event) {
                var win_top = $(window).scrollTop();
                var navAnchor_top = that.navAnchor.offset().top;
                if (win_top >= navAnchor_top) {
                    that.navbar.addClass('stick');
                    that.navAnchor.height(that.navbar.height());
                }
                else {
                    that.navbar.removeClass('stick');
                    that.navAnchor.height(0);
                }
            })
        }
        ,navTap: function(){
            var that = this;
            that.navbar.find('li').click(function(){
                var _this = $(this);
                var box_top = that.box.eq(_this.index()).offset().top;
                var navbar_h = that.navbar.height();
                _this.addClass('active').siblings().removeClass('active');
                if ($('html').scrollTop()) {  
                    $('html').scrollTop(box_top - navbar_h); 
                } 
                else {
                    $('body').scrollTop(box_top - navbar_h);
                }    
                that.navbar.addClass('stick');
                that.navAnchor.height(that.navbar.height()); 
                return false;  
            });
            $(window).scroll(function(){
                var win_top = $(window).scrollTop();
                that.selectNav(win_top);
            })
        }
        ,navScroll: function(){
            var myscroll;
            function loaded(){ 
                console.log('document has been load over.')
                setTimeout(function(){
                    myScroll = new IScroll('#navbar', { scrollX: true, scrollY: true, mouseWheel: true, click: true });
                },100 );
            }
            window.addEventListener("load", loaded, false);
        }
        ,selectNav: function(winTop){
            var winH = $(window).height();
            var navLi = this.navbar.find('li');
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
        // 格式化字符串
        ,sprintf: function(){
            var str = arguments[0] || '';
            for (var i=1, len=arguments.length; i<len; i++) {
                str = str.replace(/%s/, arguments[i].toString());
            }
            return str;
        }
    }

    higheat.init();

})