/**
 * Created by Administrator on 2016/5/26.
 */

(function(){
    var mySwiper = new Swiper(".swiper-container", {
        direction:"vertical",
        onInit: function(swiper){ //Swiper2.x的初始化是onFirstInit
            swiperAnimateCache(swiper); //隐藏动画元素
            swiperAnimate(swiper); //初始化完成开始动画
        },
        onSlideChangeEnd: function(swiper){
            swiperAnimate(swiper); //每个slide切换结束时也运行当前slide动画
        }
    })
})();

(function(){
    $(".firstlock").click(function(){
        $(this).fadeOut();
        $(".leftDoor").addClass("l_on");
        $(".rightDoor").addClass("r_on");
        $(".swiper-container").addClass("con_on");
        $(".con").fadeIn(100);


        //Music player
        (function(){
            var _oMusic = $(".music");
            var _music_player = $(".music_player");
            var _iMusic = $(".iMusic")[0];
            _oMusic.show();
            _iMusic.play();
            _oMusic.click(function(){
                if(_iMusic.paused){
                    _iMusic.play();
                    _music_player.removeClass("mucic_player_off");
                    _music_player.attr("style","animation-play-state:runing");
                    $(this).attr("style", "background:url('img/music.gif') no-repeat;background-size: contain;")
                }else{
                    _iMusic.pause();
                    _music_player.addClass("mucic_player_off");
                    _music_player.attr("style","animation-play-state:paused");
                    $(this).attr("style", "background:rgba(0,0,0,0)")
                }
            })
        })();

    })
})()




