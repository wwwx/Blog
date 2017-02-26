/**
 * Created by think on 2017/2/25.
 */
$(document).ready(function(){

    var rootUri = '/Blog/works/sgone/';

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





