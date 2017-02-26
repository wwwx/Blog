/**
 * Created by think on 2017/2/25.
 */
$(document).ready(function(){

    var href = document.location.href;
    var rootUri = href.substr(0, href.indexOf('index'));
    console.log(rootUri);
    $.get(rootUri+'include/header.html', function(data){
        $('#header_all').html(data);
    })

    $.get(rootUri+'include/footer.html', function(data){
        $('#footer').html(data)
    })

    var urls = localStorage.getItem('url');
    if (urls == null)
    {
        $.get(rootUri+'home.html', function(data){
            $('#main').html(data);
        })
    }
    else
    {
        $.get(urls, function(data){
            $('#main').html(data);
            document.scrollTop = 0;
        })
    }


    $('body').bind('DOMNodeInserted', function(event){
        var winH = $(window).height();
        var header_H = $('.header').outerHeight();
        var footer_H = $('.footer').outerHeight();
        $('.allWrap').css({'min-height':winH, 'padding-top':header_H, 'padding-bottom':footer_H});
    })

})





