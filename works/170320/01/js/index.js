

$(function(){


    var win = $(window),
        navbar = $('#navbar'),
        navAnchor = $('#navAnchor'),
        box = $('.box');

    var cuisine = {
        init: function(){
            this.stick();
            this.nav();
        },
        stick: function(){
            var that = this;
            // navbar 滚动到顶部固定
            document.addEventListener('touchmove', function(event) {
                var win_top = win.scrollTop();
                var navAnchor_top = navAnchor.offset().top;
                if (win_top >= navAnchor_top) {
                    // Make the div sticky.
                    navbar.addClass('stick');
                    navAnchor.height(navbar.height());
                }
                else {
                    // Unstick the div.
                    navbar.removeClass('stick');
                    navAnchor.height(0);
                }
                that.tab(win_top);
            });
            win.scroll(function(event) {
                var win_top = win.scrollTop();
                var navAnchor_top = navAnchor.offset().top;
                if (win_top >= navAnchor_top) {
                    // Make the div sticky.
                    navbar.addClass('stick');
                    navAnchor.height(navbar.height());
                }
                else {
                    // Unstick the div.
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
    cuisine.init();

})



