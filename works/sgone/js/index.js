/**
 * Created by think on 2017/2/25.
 */
$(document).ready(function(){

    var href = document.location.href;
    var rootUri = href.substr(0, href.indexOf('index'));
    console.log(rootUri);
    $.get(rootUri+'include/nav.html', function(data){
        $('#nav').html(data)
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
        })
    }


    $('body').bind('DOMNodeInserted', function(event){
        var winH = $(window).height();
        var header_H = $('.header').outerHeight();
        var footer_H = $('.footer').outerHeight();
        $('.allWrap').css({'min-height':winH, 'padding-top':header_H, 'padding-bottom':footer_H});
    })

})





