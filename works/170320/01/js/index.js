

$(function(){

    // navbar 滚动到顶部固定
    var win = $(window)
        navbar = $('#navbar'),
        navAnchor = $('#navAnchor'),

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


})



