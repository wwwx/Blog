/**
 * 原生js常用方法汇总
 * Created by wangxu on 2017/2/5.
 * 01. stopBubble()          阻止事件冒泡
 * 02. stopDefault(e)        阻止浏览器的默认行为
 * 03. sprintf()             格式数据，把你要的数据插入到%s中
 * 04. trim()                清除字符串两边的空格  
 * 05. ResetBlank()          合并多个空白为一个空白  
 * 06. GetNum()              保留数字
 * 07. GetCN()               保留中文  
 * 08. ToInt()               String转化为Number  
 * 09. GetLen()              得到字节长度  
 * 10. GetFileName()         获取文件全名  
 * 11. GetExtensionName()    获取文件扩展名 
 * 12. replaceAll()          字符串替换
 * 13. Format()              格式化字符串  
 * 14. LenWithZero()         数字补零  
 * 15. ChrW()                Unicode还原 
 * 16. unique()              数组去重
 * 17. Min2Max()             数字数组由小到大排序  
 * 18. Max2Min()             数字数组由大到小排序  
 * 19. GetMax()              获得数字数组中最大项  
 * 20. GetMin()              获得数字数组中最小项  
 * 21. GetCNDate()           获取当前时间的中文形式  
 * 22. Format()              扩展Date格式化 
 * 23. Diff()                计算时间差（年月周日时分秒）
 * 24. IsNullOrEmpty()       检查是否为空
 * 25. hasClass()            判断className
 * 26. addClass()            添加className
 * 27. removeClass()         移除className
 * 28. getQueryString()      获取指定url参数
 * 29. getParams()           获取所有url参数
 * 30. window.onload = (window.onload || function(){}).after(function(){...})  
 *                           扩展 window.onload 函数
 *
 *
 *
 */

// 捕捉错误的
window.onerror = function(message, url, lineNumber, columnNumber, errorObj){
    var error = 'Error: ' + message + ' in ' + url + ' at line ' + lineNumber;
    console.log(error);
}

//1.阻止事件冒泡,使成为捕获型事件触发机制.
function stopBubble() {
    var e=arguments.callee.caller.arguments[0]||event;
    if ( e && e.stopPropagation )
        e.stopPropagation();
    else
        window.event.cancelBubble = true;
}

//2.当按键后,不希望按键继续传递给如HTML文本框对象时,可以取消返回值.即停止默认事件默认行为.
    //阻止浏览器的默认行为
function stopDefault( e ) {
    if ( e && e.preventDefault )
        e.preventDefault();
    else
        window.event.returnValue = false;
    return false;
}

// 3.格式数据，把你要的数据插入到%s中
function sprintf() {
    var str = arguments[0] || '';
    for (var i = 1, n = arguments.length; i < n; i++) {
        str = str.replace(/%s/, arguments[i]);
    }
    return str;
}


// 4.清除字符串两边的空格  
String.prototype.trim = function() {
    return this.replace(/(^\s*)|(\s*$)/g, '');
};

// 5.合并多个空白为一个空白  
String.prototype.ResetBlank = function() {
    var regEx = /\s+/g;
    return this.replace(regEx, ' ');
};

// 6.保留数字  
String.prototype.GetNum = function() {
    var regEx = /[^\d]/g;
    return this.replace(regEx, '');
};

// 7.保留中文  
String.prototype.GetCN = function() {
    var regEx = /[^\u4e00-\u9fa5\uf900-\ufa2d]/g;
    return this.replace(regEx, '');
};

// 8.String转化为Number  
String.prototype.ToInt = function() {
    return isNaN(parseInt(this)) ? this.toString() : parseInt(this);
};

// 9.得到字节长度  
String.prototype.GetLen = function() {
    var regEx = /^[\u4e00-\u9fa5\uf900-\ufa2d]+$/;
    if (regEx.test(this)) {
        return this.length * 2;
    } else {
        var oMatches = this.match(/[\x00-\xff]/g);
        var oLength = this.length * 2 - oMatches.length;
        return oLength;
    }
};

// 10.获取文件全名  
String.prototype.GetFileName = function() {
    var regEx = /^.*\/([^\/\?]*).*$/;
    return this.replace(regEx, '$1');
};

// 11.获取文件扩展名  
String.prototype.GetExtensionName = function() {
    var regEx = /^.*\/[^\/]*(\.[^\.\?]*).*$/;
    return this.replace(regEx, '$1');
};

// 12.字符串替换 
// reallyDo 要替换掉的字符
// replaceWith 替换的字符
// ignoreCase  是否忽略大小写 true/false
String.prototype.replaceAll = function(reallyDo, replaceWith, ignoreCase) {
    if (!RegExp.prototype.isPrototypeOf(reallyDo)) {
        return this.replace(new RegExp(reallyDo, (ignoreCase ? "gi" : "g")), replaceWith);
    } else {
        return this.replace(reallyDo, replaceWith);
    }
};
// 13.格式化字符串  
String.prototype.Format = function() {
    if (arguments.length == 0) {
        return '';
    }
    if (arguments.length == 1) {
        return arguments[0];
    }
    var reg = /{(\d+)?}/g;
    var args = arguments;
    var result = arguments[0].replace(reg, function($0, $1) {
        return args[parseInt($1) + 1];
    });
    return result;
};

// 14.数字补零  
Number.prototype.LenWithZero = function(oCount) {
    var strText = this.toString();
    while (strText.length < oCount) {
        strText = '0' + strText;
    }
    return strText;
};

// 15.Unicode还原  
Number.prototype.ChrW = function() {
    return String.fromCharCode(this);
};


// 16.数组去重
Array.prototype.unique = function(){
    var result = [];
    this.forEach(function(v){
        if(result.indexOf(v) == -1){
            result.push(v);
        }
    })
    return result;
}

// 17.数字数组由小到大排序  
Array.prototype.Min2Max = function() {
    var oValue;
    for (var i = 0; i < this.length; i++) {
        for (var j = 0; j <= i; j++) {
            if (this[i] < this[j]) {
                oValue = this[i];
                this[i] = this[j];
                this[j] = oValue;
            }
        }
    }
    return this;
};

// 18.数字数组由大到小排序  
Array.prototype.Max2Min = function() {
    var oValue;
    for (var i = 0; i < this.length; i++) {
        for (var j = 0; j <= i; j++) {
            if (this[i] > this[j]) {
                oValue = this[i];
                this[i] = this[j];
                this[j] = oValue;
            }
        }
    }
    return this;
};

// 19.获得数字数组中最大项  
Array.prototype.GetMax = function() {
    var oValue = 0;
    for (var i = 0; i < this.length; i++) {
        if (this[i] > oValue) {
            oValue = this[i];
        }
    }
    return oValue;
};

// 20.获得数字数组中最小项  
Array.prototype.GetMin = function() {
    var oValue = 0;
    for (var i = 0; i < this.length; i++) {
        if (this[i] < oValue) {
            oValue = this[i];
        }
    }
    return oValue;
};

// 21.获取当前时间的中文形式  
Date.prototype.GetCNDate = function() {
    var oDateText = '';
    oDateText += this.getFullYear().LenWithZero(4) + new Number(24180).ChrW();
    oDateText += this.getMonth().LenWithZero(2) + new Number(26376).ChrW();
    oDateText += this.getDate().LenWithZero(2) + new Number(26085).ChrW();
    oDateText += this.getHours().LenWithZero(2) + new Number(26102).ChrW();
    oDateText += this.getMinutes().LenWithZero(2) + new Number(20998).ChrW();
    oDateText += this.getSeconds().LenWithZero(2) + new Number(31186).ChrW();
    oDateText += new Number(32).ChrW() + new Number(32).ChrW() + new Number(26143).ChrW() + new Number(26399).ChrW() + new String('26085199682010819977222352011620845').substr(this.getDay() * 5, 5).ToInt().ChrW();
    return oDateText;
};
// 22.扩展Date格式化  
Date.prototype.Format = function(format) {
    var o = {
        "M+": this.getMonth() + 1, //月份           
        "d+": this.getDate(), //日           
        "h+": this.getHours() % 12 == 0 ? 12 : this.getHours() % 12, //小时           
        "H+": this.getHours(), //小时           
        "m+": this.getMinutes(), //分           
        "s+": this.getSeconds(), //秒           
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度           
        "S": this.getMilliseconds() //毫秒           
    };
    var week = {
        "0": "\u65e5",
        "1": "\u4e00",
        "2": "\u4e8c",
        "3": "\u4e09",
        "4": "\u56db",
        "5": "\u4e94",
        "6": "\u516d"
    };
    if (/(y+)/.test(format)) {
        format = format.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    }
    if (/(E+)/.test(format)) {
        format = format.replace(RegExp.$1, ((RegExp.$1.length > 1) ? (RegExp.$1.length > 2 ? "\u661f\u671f" : "\u5468") : "") + week[this.getDay() + ""]);
    }
    for (var k in o) {
        if (new RegExp("(" + k + ")").test(format)) {
            format = format.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        }
    }
    return format;
}

// 23. 计算时间差（年月周日时分秒）
Date.prototype.Diff = function(interval, objDate) {
    //若参数不足或 objDate 不是日期类型則回传 undefined  
    if (arguments.length < 2 || objDate.constructor != Date) { return undefined; }
    switch (interval) {
        //计算秒差                                                          
        case 's': return parseInt((objDate - this) / 1000);
        //计算分差  
        case 'n': return parseInt((objDate - this) / 60000);
        //计算時差  
        case 'h': return parseInt((objDate - this) / 3600000);
        //计算日差  
        case 'd': return parseInt((objDate - this) / 86400000);
        //计算周差  
        case 'w': return parseInt((objDate - this) / (86400000 * 7));
        //计算月差  
        case 'm': return (objDate.getMonth() + 1) + ((objDate.getFullYear() - this.getFullYear()) * 12) - (this.getMonth() + 1);
        //计算年差  
        case 'y': return objDate.getFullYear() - this.getFullYear();
        //输入有误  
        default: return undefined;
    }
};

// 24.检测是否为空  
Object.prototype.IsNullOrEmpty = function() {
    var obj = this;
    var flag = false;
    if (obj == null || obj == undefined || typeof (obj) == 'undefined' || obj == '') {
        flag = true;
    } else if (typeof (obj) == 'string') {
        obj = obj.trim();
        if (obj == '') {//为空  
            flag = true;
        } else {//不为空  
            obj = obj.toUpperCase();
            if (obj == 'NULL' || obj == 'UNDEFINED' || obj == '{}') {
                flag = true;
            }
        }
    }
    else {
        flag = false;
    }
    return flag;
};  

// 25.原生js判断是否存在className
function hasClass( elements,cName ){
    return !!elements.className.match( new RegExp( "(\\s|^)" + cName + "(\\s|$)") ); 
    // ( \\s|^ ) 判断前面是否有空格 （\\s | $ ）判断后面是否有空格 两个感叹号为转换为布尔值 以方便做判断
}; 
// 26.原生js添加className
function addClass( elements,cName ){
    if( !hasClass( elements,cName ) ){
        elements.className += " " + cName;
    }; 
}; 
// 27.原生js移除className
function removeClass( elements,cName ){
    if( hasClass( elements,cName ) ){
        elements.className = elements.className.replace( new RegExp( "(\\s|^)" + cName + "(\\s|$)" )," " ); 
        // replace方法是替换
    };
};

// 28. 获取指定url参数
function getQueryString(name)
{
    var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
    var r = decodeURI(window.location.search).substr(1).match(reg);
    if(r!=null)return  unescape(r[2]); return null;
}
// 29. 获取所有url参数
function getParams() {
    var data = {};
    var href = decodeURIComponent(location.href);
    var paramStr = href.substring(href.indexOf("?") + 1);
    var paramArr = paramStr.split("&");
    for (var i = 0; i < paramArr.length; i++) {
        var item = paramArr[i];
        var keyVal = item.split("=");
        var val = item.slice(item.indexOf("=") + 1)
        data[keyVal[0]] = val;
    }
    return data;
}

// 30. 扩展 window.onload 函数 
Function.prototype.after = function(afterfn){
    var __self = this;
    return function(){
        var ret = __self.apply(this, arguments);
        afterfn.apply(this, arguments);
        return ret;
    }
}
// 通过动态装饰函数的方式，我们完全不用理会从前 window.onload 函数的内部实现，无论它
// 的实现优雅或是丑陋。就算我们作为维护者，拿到的是一份混淆压缩过的代码也没有关系。只要
// 它从前是个稳定运行的函数，那么以后也不会因为我们的新增需求而产生错误。新增的代码和原
// 有的代码可以井水不犯河水。
// window.onload = (window.onload || function(){}).after(function(){
//         console.log(document.getElementsByTagName('*').length);
// })

// 31. 提示信息弹框toast, 将下面的代码复制到你的html文档里, css参考common.css
var toast = (function(){
    var _toast, _timer;
    return function(msg){
        if(!msg) return;
        _toast && clearTimeout(_timer);
        if(!_toast){
            _toast = $('<div class="toast-wrap"><div class="toast"></div></div>');
            _toast.appendTo('body');
        }
        _toast.show().children('.toast').html(msg).addClass('toast-in');
        _timer = setTimeout(function(){
            if(!_toast) return;
            _toast.children('.toast').removeClass('toast-in');
            _toast.hide();
        }, 2500)
    }
}())




console.log('ok')







