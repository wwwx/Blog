/**
 * Created by think on 2017/2/25.
 */
$(document).ready(function(){

    var uri = document.location.href;
    var baseurl = uri.slice(0, uri.indexOf('index'));

    $.get(baseurl+'include/header.html', function(data){
        $('#header_all').html(data);
    })

    $.get(baseurl+'include/footer.html', function(data){
        $('#footer').html(data)
    })

    var urls = localStorage.getItem('url');
    if (urls == null)
    {
        $.get(baseurl+'home.html', function(data){
            $('#main').html(data);
        })
    }
    else
    {
        $.get(urls, function(data){
            $('#content').html(data);
        })
    }


    $('body').bind('DOMNodeInserted', function(event){
        var winH = $(window).height();
        var header_H = $('.header').outerHeight();
        var footer_H = $('.footer').outerHeight();
        $('.allWrap').css({'min-height':winH, 'padding-top':header_H, 'padding-bottom':footer_H});
    })

})





