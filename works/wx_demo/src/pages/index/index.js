/**
 * Created with webstorm11.0.3.
 * User: WangXu/834166254@qq.com
 * Date: 2018/1/4
 * Time: 22:51
 */


Page({
    data: {
        text: 'hello world;',
        show: false,
        news: ["aaa", "bbb", "ccc"],
        footerText: "copyright 2018-01-04"
    },
    onLoad: function(options) {
        // 页面初始化 options 为页面跳转所带的参数
    },
    onReady: function() {
    	// 页面渲染完成
    },
    onShow: function() {
    	// 页面显示
    },
    onHide: function() {
    	// 页面隐藏
    },
    onUnload: function() {
    	// 页面关闭
    },
    onError: function(data) {
    	console.log(data)
    },
    btnClick: function() {

        var isShow = this.data.show;
        var clickNews = this.data.news;
        clickNews.shift();
        this.setData({
        	text: 'this is new data',
        	show: !isShow,
        	news: clickNews
        });
    }
})
