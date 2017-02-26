// rem自适应
(function (doc, win) {
    var docEl = doc.documentElement,
        resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
        recalc = function () {
            var clientWidth = docEl.clientWidth;
            if (!clientWidth) return;
            if (clientWidth > 640) {
                docEl.style.fontSize = '200px';
            } else {
                docEl.style.fontSize = 100 * (clientWidth / 320) + 'px';
            }
        };
    if (!doc.addEventListener) return;
    win.addEventListener(resizeEvt, recalc, false);
    doc.addEventListener('DOMContentLoaded', recalc, false);
})(document, window);

// fastclick
if ('addEventListener' in document) {  
    document.addEventListener('DOMContentLoaded', function() {  
        FastClick.attach(document.body);  
    }, false);  
}

// 本地存储
var storage = {
    get: function (k) {
        return JSON.parse(localStorage.getItem(k));
    },
    set: function (k, v) {
        localStorage.setItem(k, JSON.stringify(v));
    },
    del: function (k) {
        localStorage.removeItem(k);
    }
}

// 定时器
var intervalCounter = null;
//
//

// 错误提示功能 下面黑色小弹出层
function toast (message) {
    clearInterval(intervalCounter);
    var alert = document.getElementById('toast');
    if (alert == null) {
        var toastHTML = '<div id="toast">' + message + '</div>';
        document.body.insertAdjacentHTML('beforeEnd', toastHTML);
    } else {
        alert.innerHTML = message;
    }

    intervalCounter = setTimeout(function(){
        var alert = document.getElementById('toast');
        document.body.removeChild(alert)
    }, 2000)

}


// 格式数据，把你要的数据插入到%s中
function sprintf () {
    var str = arguments[0] || '';
    for (var i=1; i<arguments.length; i++ ) {
        str = str.replace(/%s/, arguments[i]);
    }
    return str;
}


$(function(){
    $('.goBack').click(function(){
        history.back();
    })
})



