

$(function(){


    var win = $(window)
        navbar = $('#navbar'),
        navAnchor = $('#navAnchor'),
        box = $('.box');

    var cuisine = {
            init: function(){
                this.stick();
                this.tab();
            },
            stick: function(){
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
                })
            },
            tab: function(){
                navbar.find('li').click(function(){
                    var _this = $(this);
                    var _top = box.eq(_this.index()).offset().top;
                    var navbar_h = navbar.height();
                    _this.addClass('active').siblings().removeClass('active');
                    if ($('html').scrollTop()) {  
                        $('html').animate({ scrollTop: (_top - navbar_h) }, 500);
                        _this.stick();  
                        return false;  
                    } 
                    else {
                        $('body').animate({ scrollTop: (_top - navbar_h) }, 500); 
                        _this.stick();  
                        return false;  
                    }    
                })
            }
    }

    cuisine.init();
    

    


})



