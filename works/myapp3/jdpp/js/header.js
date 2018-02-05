/* JEND.page.header */
var fTimeout = 0;
var isjcArea = false;
(function($) {
    if (!$ || !window.JEND)
        return;
    // ----------------------------
    JEND.define('JEND.page.header', {
        data: {
            url: {
                // 保留，有多个页面的JS中用到了这个接口定义
                ansycUrl: document.location.protocol + '//my.' + JEND.server.uleUrl + '/usr/getIndexCookies.do?jsonCallBack=?'
            }
        },
        setCookie: function() {
            this.data.cookie = {
                id: JEND.cookie.get('mall_cookie') || '',
                name: JEND.cookie.get('loginname') ? decodeURI(JEND.cookie.get("loginname")).replace(/\++/g, ' ') : '',
                items: JEND.cookie.get('postmybrowseditem') || '',
                account: JEND.cookie.get('mailOrMobileName') || '',
                birthday: JEND.cookie.get('dob') || ''
            };
            //部分页面中的数据处理还需要使用原来的命名数据 f2e
            JEND.namespace('f2e.GUI.commHeader');
            f2e.GUI.commHeader.data = JEND.page.header.data;
        },
        // refreshUserInfo在jend.login.js中用到，用于登录后刷新内容
        refreshUserInfo: function(userData) {
            if (userData) {
                if (JEND.page.header.data.cookie.id != userData.mall_cookie) {
                    this.user.initUserInfo(userData);
                }
            } else {
                this.setCookie();
                this.user.init();
            }
        },
        // 加入购物车中用到
        initUserData: function() {
            this.cart.update('slide');
        },
        initUserCart: function() {
            this.cart.update('slide');
        },
        // 保留方法
        checkUsrRole: function(usrRole, val) {
            if (usrRole && val) {
                var arr = usrRole.split(',');
                for (var i = 0, max = arr.length; i < max; i++) {
                    if (arr[i] == val) {
                        return true;
                    }
                }
            }
            return false;
        },
        init: function () {
            var m = this;
            $.get("head.html", {}, function (data) {
                $("body").prepend(data);
                $.get("footer.html", {}, function (data) {
                    $("body").append(data);
                    m.init_();
                });
            });
        },
        init_: function () {
            var headElm = $('#header[data-url]'),
                footElm = $('#footer[data-url]');
            if (JEND.cookie.get('ysy_from') == 2) {
                $('.head-top').hide();
                $('.li-ju').before('<li class="li-dg" name="home" srcid="no"><a class="nav-home" href="//dg.ule.com/?uspm=1.1.1_V2014.121.dg.1" target="_blank" data-uspm-id="1.1.1_V2014.121.home.1">代购专区<img style="position:absolute;margin-top:-13px;margin-left:-6px;display:inline;  z-index: 2222;" src="//i0.ulecdn.com/ule/common/css/images/ico_new.png"></a></li>');
                var $nav = $(".head-nav .layout");
                var $navLi = $(".head-nav .layout .navlinks li:visible");
                if ($navLi.length > 9) {
                    var boxWidth = $nav.width();
                    var totalWidth = $navLi.length * 100;
                    if (totalWidth > boxWidth)
                        $nav.css('width', totalWidth);
                }
                $('.nav-ju').html('聚热销');
            }
            if (headElm.length + footElm.length > 0) {
                if (headElm.length > 0) {
                    headElm.load(headElm.attr('data-url'), function () {
                        JEND.page.header._init();
                    });
                }
                if (footElm.length > 0) {
                    footElm.load(footElm.attr('data-url'));
                }
            } else {
                this._init();
            }
        },
        _init: function() {
            this.container = $('.header');
            //
            this.isSimpHead = this.container.hasClass('header-simp'); // 是否简头
            this.isMiniHead = this.container.hasClass('header-mini'); // 是否mini
            this.isProvHead = this.container.hasClass('header-province'); // 是否省馆头          
            this.isStoreHead = this.container.hasClass('header-store'); // 是否店铺头
            this.isCheckHead = this.container.hasClass('header-checkout'); // 是否支付头
            this.isJicaiHead = this.container.hasClass('header-jicai'); // 是否集采头
            this.isPifaHead = this.container.hasClass('header-fxpf') || this.container.hasClass('header-henanpf') || this.container.hasClass('header-fenxiao'); // 是否批发头
            // 
            if (this.isPifaHead) {
                // 批发页面单独初始化
                this.user.initPifa({
                    fenxiao: this.container.hasClass('header-fxpf') || this.container.hasClass('header-fenxiao'),
                    cunyou: this.container.hasClass('header-henanpf')
                });
                this.logo.init();
                this.search.init();
                this.cart.init();
            } else {
                // 非批发页面初始化
                this.user.init();
                this.menu.init();
                this.logo.init();
                this.search.init();
                this.cart.init();
            }
            this.content.init();
        },
        user: {
            apis: {
                toLogin: 'https://my.' + JEND.server.uleUrl + '/usr/ssllogin.do?backurl=' + encodeURIComponent(location.href),
                toRegister: 'https://my.' + JEND.server.uleUrl + '/usr/sslregister.do',
                toLogout: '//my.' + JEND.server.uleUrl + '/usr/logout.do'
            },
            tmpl: {
                welcome: '<a title="{0}" href="//my.' + JEND.server.uleUrl + '/myid/mev2.do" target="_blank" class="blue">{1}</a> 您好<span class="txt-welcome">，欢迎来到竞拍网</span>！',
                logout: '<a data-uspm="u3" href="{toLogout}" class="blue">退出</a>',
                login: ['<a data-uspm="u1" href="{toLogin}" class="blue">[请登录]</a>', '<a data-uspm="u2" href="{toRegister}" class="blue">[免费注册]</a>'].join(' ')
            },
            init: function() {
                if (JEND.login.checkUserStatus()) {
                    this.loadUserData();
                } else {
                    this.initUserInfo();
                }
                this.initQQCaibei();
            },
            loadUserData: function() {
                var that = this;
                JEND.login.getUser(function(data) {
                    if (data) {
                        that.initUserInfo(data);
                        that.userType = that.checkUserType(data);
                    } else {
                        that.initUserInfo();
                    }
                });
            },
            initUserInfo: function(data) {
                this.container = JEND.page.header.container.find('ul.userinfo:visible');
                if (this.container.length === 0)
                    return;
                var username, userstyle;
                if (typeof(data) == 'object') {
                    /* update data.cookie */
                    JEND.page.header.data.cookie.name = data.loginname.replace(/\++/g, " ");
                    JEND.page.header.data.cookie.items = unescape(data.postmybrowseditem);
                    JEND.page.header.data.cookie.id = data.mall_cookie;
                    JEND.page.header.data.cookie.groupId = data.groupId;
                    JEND.page.header.data.cookie.birthday = data.dob;
                    /* update #user html */
                    username = data.loginname;
                    this.container.find('.welcome').html(this.tmpl.welcome.format(username, username.subByte(24, '…')));
                    this.container.find('.login').html(this.tmpl.logout.substitute(this.apis));
                } else if (typeof(data) == 'string') {
                    username = data;
                    this.container.find('.welcome').html(this.tmpl.welcome.format(username, username.subByte(24, '…')));
                    this.container.find('.login').html(this.tmpl.logout.substitute(this.apis));
                } else {
                    username = JEND.page.header.data.cookie.name || '';
                    this.container.find('.welcome').html(this.tmpl.welcome.format(username, username.subByte(24, '…')));
                    this.container.find(".login").html(this.tmpl.login.substitute(this.apis));
                }
            },
            checkUserType: function(user) {
                var checkUsrRole = function(user, role) {
                    return JEND.page.header.checkUsrRole(user.usrRole, role);
                };
                var userTypes = [];
                if (user.groupId && user.groupId == '71') {
                    userTypes.add('cunyou');
                }
                if (checkUsrRole(user, '1')) {
                    userTypes.add('vip');
                }
                if (checkUsrRole(user, '3')) {
                    userTypes.add('jicai');
                }
                if (checkUsrRole(user, '5')) {
                    userTypes.add('fenxiao');
                }
                return userTypes;
            },
            // 集采页面附加判断处理
            initJiCai: function() {
                $('.now_area').bindJendUI('ElementHover', {
                    hoverClass: 'now_area_hover'
                });
                var area_id = "";
                var serchUrl = '//search.' + JEND.server.uleUrl + '/jcSearch.do';
                var indexUrl = '//www.' + JEND.server.uleUrl + '/groupBuy.html';

                function getUrlString(urlString) {
                    var brandId = '',
                        begPrice = '',
                        endPrice = '',
                        keywords = '',
                        encodeKeyWords = '';
                    if (urlString.getQueryValue('brandId') !== '') {
                        brandId = '&brandId=' + urlString.getQueryValue('brandId');
                    }
                    if (urlString.getQueryValue('begPrice') !== '') {
                        begPrice = '&begPrice=' + urlString.getQueryValue('begPrice');
                    }
                    if (urlString.getQueryValue('endPrice') !== '') {
                        endPrice = '&endPrice=' + urlString.getQueryValue('endPrice');
                    }
                    if (urlString.getQueryValue('keywords') !== '') {
                        keywords = '&keywords=' + urlString.getQueryValue('keywords');
                    }
                    if (urlString.getQueryValue('encodeKeyWords') !== '') {
                        encodeKeyWords = '&encodeKeyWords=' + urlString.getQueryValue('encodeKeyWords');
                    }
                    return brandId + begPrice + endPrice + keywords + encodeKeyWords;
                }

                var href = window.location.href;
                if (JEND.cookie.get("jicai_area") && JEND.cookie.get("jicai_area") != '0') {
                    area_id = JEND.cookie.get("jicai_area");
                    $('.now_area .now_area_text').html($('#now_area_li_' + area_id).text());
                    $('#tuan_menu a,.brandListContent a').each(function() {
                        var href = $(this).attr('href');
                        var clsId = href.getQueryValue('clsId');
                        var urlString = getUrlString(href);
                        href = href.split('?')[0];
                        href = href.split('?')[0] + '?clsId=' + clsId + '&dcCity=' + area_id + urlString;
                        $(this).attr('href', href);
                    });
                    href = window.location.href;
                    if (href.split('?')[0] == serchUrl) {
                        var clsId = href.getQueryValue('clsId');
                        var href_area = href.getQueryValue('dcCity');
                        if (href_area === "") {
                            var urlString = getUrlString(href);
                            href = href.split('?')[0] + '?clsId=' + clsId + '&dcCity=' + area_id + urlString;
                            window.location.href = href;
                        }
                    }
                    if (href.split('?')[0] == indexUrl || href.split('#')[0] == indexUrl) {
                        JEND.page.jicaiPage.setJiCaiCategory(area_id);
                    }
                    if ($('#jicai_dcCity').length === 0) {
                        $('.header-jicai .head-search form').append('<input id="jicai_dcCity" type="hidden" name="dcCity" value="' + area_id + '"  />');
                    } else {
                        $('#jicai_dcCity').val(area_id);
                    }
                } else {
                    $('#jicai_dcCity').remove();
                    if (href.split('?')[0] == indexUrl || href.split('#')[0] == indexUrl) {
                        JEND.page.jicaiPage.setJiCaiCategory('0');
                    }
                }
                $('.now_area .now_area_list a').click(function() {
                    var area_id = $(this).attr('ind');
                    if (area_id === '') {
                        area_id = '0';
                        $('#jicai_dcCity').remove();
                    } else {
                        if ($('#jicai_dcCity').length === 0) {
                            $('.header-jicai .head-search form').append('<input id="jicai_dcCity" type="hidden" name="dcCity" value="' + area_id + '"  />');
                        } else {
                            $('#jicai_dcCity').val(area_id);
                        }
                    }
                    JEND.cookie.set("jicai_area", area_id, "600000", "/", "ule.com");
                    $('.now_area .now_area_text').html($(this).text());
                    $('#tuan_menu a,.brandListContent a').each(function() {
                        var href = $(this).attr('href');
                        var clsId = href.getQueryValue('clsId');
                        var urlString = getUrlString(href);
                        href = href.split('?')[0];
                        if (area_id != '0') {
                            href = href + '?clsId=' + clsId + '&dcCity=' + area_id + urlString;
                        } else {
                            href = href + '?clsId=' + clsId + urlString;
                        }
                        $(this).attr('href', href);
                    });
                    var href = window.location.href;
                    if (href.split('?')[0] == serchUrl) {
                        var clsId = href.getQueryValue('clsId');
                        var href_area = href.getQueryValue('dcCity');
                        if (href_area != area_id) {
                            var urlString = getUrlString(href);
                            href = href.split('?')[0];
                            if (area_id != '0') {
                                href = href + '?clsId=' + clsId + '&dcCity=' + area_id + urlString;
                            } else {
                                href = href + '?clsId=' + clsId + urlString;
                            }
                            window.location.href = href;
                        }
                    }
                    if (href.split('?')[0] == indexUrl || href.split('#')[0] == indexUrl) {
                        JEND.page.jicaiPage.setJiCaiCategory(area_id);
                    }
                    $('.now_area').removeClass('now_area_hover');
                    return false;
                });
            },
            // 批发页面初始化
            initPifa: function(pageType) {
                var that = this;
                var serviceUrls = {
                    login: '//my.' + JEND.server.uleUrl + '/usr/dgLogin.do?backurl=',
                    jicai: '//www.' + JEND.server.uleUrl + '/groupBuy.html',
                    fenxiao: '//zone.' + JEND.server.uleUrl + '/pifa/fxViewSingle.do',
                    cunyou: '//zone.' + JEND.server.uleUrl + '/zoneweb/viewZone.do'
                };
                this.container = JEND.page.header.container.find('.simp ul');
                // 针对集采专区的用户类型判断
                var loginname = JEND.page.header.data.cookie.name || '';
                if (document.location.protocol == 'https:') {
                    this.container.find('li.welcome span').html(loginname);
                } else {
                    var needJump = true;
                    if (window._ule_authority_judge && _ule_authority_judge == 'IGNORE') {
                        needJump = false;
                    }
                    if (JEND.login.checkUserStatus()) {
                        this.container.find('li.welcome span').html(loginname);
                        if (document.location.host.startWith('item') || document.location.host.startWith('cart') || document.location.host.startWith('checkout')) {
                            // 由于几种情况都是有了分销的头，所以不做跳转
                            needJump = false;
                        }
                        JEND.login.getUser(function(user) {
                            var userType = that.checkUserType(user);
                            if (userType.indexOf('cunyou') >= 0) {
                                if (needJump && pageType.fenxiao && userType.indexOf('fenxiao') < 0) {
                                    JEND.page.refresh(serviceUrls.cunyou);
                                }
                            } else if (userType.indexOf('fenxiao') >= 0) {
                                if (needJump && pageType.cunyou && userType.indexOf('cunyou') < 0) {
                                    window.open(serviceUrls.fenxiao);
                                }
                            } else if (userType.indexOf('jicai') >= 0) {
                                if (needJump) {
                                    JEND.page.refresh(serviceUrls.jicai);
                                }
                            } else {
                                JEND.page.dialog.pop({
                                    title: '温馨提示',
                                    width: 450,
                                    height: 160,
                                    url: '//www.ule.com/event/2012/1210/group.html',
                                    closeFunction: function() {
                                        document.location.href = '//www.' + JEND.server.uleUrl;
                                    }
                                });
                            }
                        });
                    } else if (needJump) {
                        var url = serviceUrls.login + encodeURIComponent(document.location.href);
                        JEND.page.refresh(url);
                    }
                }
            },
            initQQCaibei: function() {
                var ule_qq_msg = JEND.cookie.get('ule_qq_msg') ? decodeURI(JEND.cookie.get("ule_qq_msg")).replace(/\++/g, ' ') : '';
                if (ule_qq_msg != '') {
                    ule_qq_msg = unescape(ule_qq_msg).split('|');
                    $('body').prepend('<div id="qqcaibei"></div>');
                    $('#qqcaibei').append('<div class="fl">{1}</div><div class="fr">{0} <a href="{3}" class="blue ml5">我的彩贝积分</a></div>'.format(ule_qq_msg));
                }
            }
        },
        menu: {
            init: function() {
                this.toplink.init();
                this.menulink.init();
            },
            toplink: {
                init: function() {
                    this.topElm = JEND.page.header.container.find('ul.userinfo:visible');
                    if (this.topElm.length > 0) {
                        this.initDroplist();
                        this.initCategory();
                        this.initLinkExecute();
                        this.sppf();
                        if ($('.head-top .lihome').length == 0) {
                            // 增加竞拍首页链接
                            this.topElm.before('<ul class="fl" data-uspm="111"><li class="lihome"><a data-uspm="home" href="//www.ule.com/" target="_blank">竞拍首页</a></li></ul>');
                        }
                    }
                },
                initDroplist: function() {
                    // 我的竞拍 hover显示
                    this.topElm.find('li.dropdown').bindJendUI('ElementHover', {
                        hoverClass: 'dropdown-hover'
                    });
                    
                },
                initCategory: function() {
                    // 全部商品分类 hover显示
                    var liCateElm = this.topElm.find('li.licate:visible'),
                        allCateElm = $('#allCategory');
                    if (liCateElm.length > 0 && allCateElm.length > 0) {
                        allCateElm.bind('SlideDown', function() {
                            var ele = this;
                            if (ele.upTimer) {
                                clearInterval(ele.upTimer);
                                ele.upTimer = null;
                            } else if (ele.upStatus) {
                                ele.upStatus = false;
                                $(ele).stop().removeAttr('style').show();
                                return;
                            }
                            if (ele.downStatus || ele.showStatus || ele.downTimer)
                                return;
                            ele.downTimer = setTimeout(function() {
                                ele.downTimer = null;
                                if (!ele.downStatus)
                                    return;
                                ele.showStatus = true;
                                liCateElm.addClass('licate-hover');
                                $(ele).slideDown(function() {
                                    ele.downStatus = false;
                                });
                            }, 200);
                            ele.downStatus = true;
                        }).bind('SlideUp', function() {
                            var ele = this;
                            ele.downStatus = false;
                            if (ele.upStatus || !ele.showStatus || ele.upTimer)
                                return;
                            ele.upTimer = setTimeout(function() {
                                ele.upTimer = null;
                                ele.upStatus = true;
                                $(ele).slideUp(function() {
                                    ele.upStatus = false;
                                    ele.showStatus = false;
                                    liCateElm.removeClass('licate-hover');
                                });
                            }, 200);
                        });
                        liCateElm.hover(function() {
                            allCateElm.trigger('SlideDown');
                        }, function() {
                            allCateElm.trigger('SlideUp');
                        });
                        allCateElm.hover(function() {
                            allCateElm.trigger('SlideDown');
                        }, function() {
                            allCateElm.trigger('SlideUp');
                        });
                    }
                },
                initLinkExecute: function() {
                    $('.head-top .jicaipifa .pifa-dg').click(function() {
                        var loginUrl = '//my.' + JEND.server.uleUrl + '/usr/dgLogin.do?backurl=';
                        var url = this.href;
                        if (JEND.login.checkUserStatus()) {
                            var userType = JEND.page.header.user.userType || [];
                            if (userType.indexOf('cunyou') >= 0) {
                                window.open(url);
                            } else {
                                JEND.page.dialog.pop({
                                    title: '温馨提示',
                                    width: 450,
                                    height: 160,
                                    url: '//www.ule.com/dg/user_tip.html'
                                });
                            }
                        } else {
                            window.open(loginUrl + encodeURIComponent(url));
                        }
                        return false;
                    });
                    $('.head-top .jicaipifa .pifa-fx').click(function() {
                        var loginUrl = 'https://my.' + JEND.server.uleUrl + '/usr/ssllogin.do?backurl=';
                        var url = this.href;
                        if (JEND.login.checkUserStatus()) {
                            var userType = JEND.page.header.user.userType || [];
                            if (userType.indexOf('fenxiao') >= 0) {
                                window.open(url);
                            } else {
                                JEND.page.dialog.pop({
                                    title: '温馨提示',
                                    width: 450,
                                    height: 160,
                                    url: '//www.ule.com/event/2012/1210/group.html'
                                });
                            }
                        } else {
                            window.open(loginUrl + encodeURIComponent(url));
                        }
                        return false;
                    });
                },
                sppf: function() {
                    if (document.location.protocol == 'https:') {
                        var par = $('.userinfo .jicaipifa li')
                        par.each(function(i, e) {
                            if ($(e).text().trimAll() == '商品批发') $(e).remove()
                        })
                    }
                }
            },
            menulink: {
                init: function() {
                    this.navElm = JEND.page.header.container.find('ul.navlinks:visible');
                    if (this.navElm.length > 0) {
                        this.initDroplist();
                        this.initMenuStatus();
                        this.initSpecialTip();
                    }
                },
                initDroplist: function() {
                    // 隐藏海外馆的下拉
                    this.navElm.find('li[name=board]').removeClass('dropdown').find('i').remove();
                    // 给dropmenu绑定hover事件
                    this.navElm.find('li.dropdown').hover(function() {
                        $(this).addClass('dropdown-hover');
                        if ($.browser.isIE6) {
                            $(this).find('.navcon').bindJendUI('HideOverElements', 'select,object');
                        }
                    }, function() {
                        $(this).removeClass('dropdown-hover');
                        if ($.browser.isIE6) {
                            $(this).find('.navcon').bindJendUI('ShowOverElements', 'select,object');
                        }
                    });
                    // 添加下拉菜单
                    var dropMenus = {
                        'board': [{
                                title: '新西兰馆',
                                link: '//www.ule.com.hk/nz/index.html',
                                uspm: 'nz'
                            },
                            {
                                title: '丹麦馆',
                                link: '//www.ule.com.hk/danish/index.html',
                                uspm: 'dn'
                            },
                            {
                                title: '台湾名品馆',
                                link: '//www.ule.com.hk/tw/index.html',
                                uspm: 'tw'
                            },
                            {
                                title: '澳洲馆',
                                link: '//www.ule.com.hk/au/index.html',
                                uspm: 'au'
                            },
                            {
                                title: '韩国馆',
                                link: '//www.ule.com.hk/korea/index.html',
                                uspm: 'korea'
                            },
                            {
                                title: '俄罗斯馆',
                                link: '//www.ule.com.hk/russia/index.html',
                                uspm: 'russia'
                            }
                        ],
                        'coupon': [{
                                title: '兑奖换礼',
                                subtitle: '专为端午卡、手拉手奖品、奶粉卡等设立的专供兑换的频道。在这里兑换的商品总会有一款是您的最爱。',
                                img: '//i3.ulecdn.com/ule/header/images/dc1.jpg',
                                link: '//www.' + JEND.server.uleUrl + '/jihe.html',
                                uspm: 'dc1'
                            },
                            {
                                title: '竞拍卡',
                                subtitle: '竞拍网专属购物卡，一卡通用完全打破域地域限制。是节日礼品，商务馈赠，企业福利的最好选择。',
                                img: '//i3.ulecdn.com/ule/header/images/dc2.jpg',
                                link: '//www.' + JEND.server.uleUrl + '/ulecard.html',
                                uspm: 'dc2'
                            },
                            {
                                title: '优惠券',
                                subtitle: '竞拍优惠券大合集,让您省钱、省心、省力。别犹豫了，赶快领券，释放你买买买的洪荒之力吧。',
                                img: '//i3.ulecdn.com/ule/header/images/dc3.jpg',
                                link: '//www.' + JEND.server.uleUrl + '/event/2016/0307/index.html',
                                uspm: 'dc3'
                            }
                        ],
                        'mobile': [{
                                title: '竞拍网',
                                subtitle: '专业一站式B2C手机购物软件，海量商品，覆盖城乡，专享优惠，一手掌握，100%正品承诺。',
                                img: '//i3.ulecdn.com/ule/header/images/mb1.jpg',
                                link: '//mobile.' + JEND.server.uleUrl + '/uleAndroid.jsp',
                                uspm: 'mb1'
                            },
                            {
                                title: '邮生活',
                                subtitle: '移动生活，你是专家！ </br>充值缴费面面俱到，做全能大管家 </br>机票酒店天马行空，做任性旅行家 </br>网购淘货一手掌握，做品质生活家',
                                img: '//i3.ulecdn.com/ule/header/images/mb2.jpg?t=1111',
                                link: '//mobile.' + JEND.server.uleUrl + '/lifeAndroid.jsp',
                                uspm: 'mb2'
                            },
                            {
                                title: '竞拍金融',
                                subtitle: '让借钱从此变得简单、方便、不伤感情！ 免面签，免指纹，手机点几下，躺着就把钱借了！分期12个月，还款无压力。',
                                img: '//i3.ulecdn.com/ule/header/images/mb3.jpg?v=150702',
                                link: '//www.ule.com/event/2015/0601/yld.html',
                                uspm: 'mb3'
                            }
                        ]
                    };
                    this.navElm.find('li.dropdown').each(function() {
                        var item = $(this).attr('name') || '',
                            i, menus, menuNum, menuElm;
                        if (item && dropMenus[item]) {
                            menus = dropMenus[item];
                            menuNum = menus.length;
                            menuElm = $('<div class="navcon navcon-{0}"><div class="navcon-frame"><ul></ul></div></div>'.format(item));
                            for (i = 0; i < menuNum; i++) {
                                menus[i].item = item;
                                if (item == "board") {
                                    menuElm.find('ul').append('<li class="{uspm}"><a data-uspm="{uspm}" href="{link}" srcid="Homepage_nav_{item}_{uspm}" target="_blank">{title}</a></li>'.substitute(menus[i]));
                                } else {
                                    menuElm.find('ul').append('<li class="{uspm}"><a data-uspm="{uspm}" href="{link}" srcid="Homepage_nav_{item}_{uspm}" target="_blank"><img src="{img}" /><label><strong>{title}</strong><span>{subtitle}</span></label></a></li>'.substitute(menus[i]));
                                }
                            }
                            $(this).append(menuElm);
                            if (item == 'coupon' || item == 'mobile') {
                                $(this).find('a.nav-' + item).removeAttr('href');
                            }
                        }
                    });
                },
                initMenuStatus: function() {
                    // 更新菜单的on状态
                    var pathname = window._ule_pathname || document.location.href.getPathName();
                    this.navElm.children().each(function() {
                        var _path = ($(this).children('a').attr('href') || '').getPathName();
                        if (pathname == _path) {
                            $(this).addClass('on').siblings('.on').removeClass('on');
                        }
                    });
                },
                initSpecialTip: function() {
                    if ($('.head-nav .nav-ju').length > 0) {
                        $('.head-nav .nav-ju').append('<img style="position:absolute;margin-top:-13px;margin-left:-6px;display:inline;" src="//i0.ulecdn.com/ule/common/css/images/ico_new.png" />');
                    }
                }
            }
        },
        logo: {
            init: function() {
                this.initLogoEnvo();
                this.initLogoEvent();
            },
            // 给beta/dev环境增加logo和提示语
            initLogoEnvo: function() {
                var envo = JEND.server.uleUrl.replace('.ule.com', '');
                if (envo != 'ule.com' && envo != '') {
                    $('.header .head-logo').addClass('logo-' + envo);
                    $('.header:first').prepend('<div class="head-note"><strong>竞拍' + envo.toUpperCase() + '测试环境，请不要在当前环境下购买下单</strong><span class="sep10">|</span><a href="//www.ule.com" style="font-size:12px;">返回竞拍正式站点</a></div>');
                }
            },
            // 加载logo右侧广告
            initLogoEvent: function() {
                var tmpl = '<a class="logo-event" href="{link}" target="_blank" title="{title}"><img src="{imgUrl}" /></a>';
                if (document.location.protocol == '' && !JEND.page.header.isProvHead) {
                    JEND.load(JEND.page.header.search.apis.hotKeyword, function() {
                        var logoevents = JEND.page.home.data.logoevents,
                            newevents = [],
                            item, nowTime = new Date().format('yyyy-mm-dd hh:nn');
                        for (var i = 0; i < logoevents.length; i++) {
                            item = logoevents[i];
                            if (!((item.startTime && item.startTime > nowTime) || (item.endTime && item.endTime <= nowTime))) {
                                newevents.push(item);
                            }
                        }
                        if (newevents.length > 0) {
                            newevents[0].link = newevents[0].link.trim() + ((newevents[0].link.indexOf('?') > 0) ? '&' : '?') + 'srcid=logo_event';
                            $('.head-logo').append(tmpl.substitute(newevents[0]));
                            $('.head-main').addClass('head-main-hasevent');
                        }
                    });
                }
            }
        },
        search: {
            hint: '请输入商品名、品牌等进行搜索，如"童鞋、飞利浦"',
            apis: {
                hotKeyword: '//i0.ulecdn.com/m/dataservice/headdata.js?t=' + new Date().format('yyyymmddhhnn').left(11)
            },
            tmpl: {
                label: '',
                title: '<font color="{highLight}">{title}</font>',
                item: '<a href="{link}" target="_blank">{title}</a> '
            },
            init: function() {
                this.container = JEND.page.header.container.find('.head-search:visible');
                if (this.container.length > 0) {
                    this.bindEvent();
                    this.loadHotkey();
                    this.setSearchDefault();
                }
            },
            bindEvent: function() {
                var that = this;
                var formElm = this.container.find('form');
                var inputElm = this.container.find('input.txt-keyword');
                this.apis.searchUrl = formElm.attr('action');
                if (window.ule_keyword) {
                    inputElm.val(ule_keyword);
                } else if (document.location.href.getQueryValue('keywords') !== "") {
                    inputElm.val(decodeURI(document.location.href.getQueryValue('keywords')).replace(/\+/g, " "));
                }
                if (!JEND.page.header.isCheckHead) {
                    inputElm.bindJendUI('suggest', {
                        ajaxType: 'jsonp',
                        url: '//search.' + JEND.server.uleUrl + '/api/suggest.action?callback=?&query=',
                        listElm: this.container.find('ul.search-suggest')
                    }, 'suggest');
                }
                this.container.find('button').click(function() {
                    var _kw = inputElm.val().trim();
                    if (_kw == that.hint && !that._keyword)
                        return false;
                    if ($(this).attr('data-url')) {
                        formElm.attr('action', $(this).attr('data-url'));
                    } else {
                        formElm.attr('action', that.apis.searchUrl);
                    }
                });
                formElm.submit(function() {
                    var _kw = inputElm.val().trim();
                    if ((_kw === '' || _kw == that.hint) && !that._keyword)
                        return false;
                    var hdUspm = $(this).find('input[name=uspm]');
                    var hdSrcId = $(this).find('input[name=srcid]');

                    if (_kw == that.hint && that._keyword) {
                        _kw = that._keyword || "";
                        inputElm.val(_kw);
                        var _action = formElm.attr("action");
                        that._keywordlink && formElm.attr("action", that._keywordlink);

                        var _ole_uspm_id = hdUspm.attr('data-uspm-id') || '';
                        var _uspm_id = _ole_uspm_id.split(".");
                        _uspm_id.splice(3, 1, "100988");
                        _uspm_id = _uspm_id.join(".");
                        hdUspm.attr('data-uspm-id', _uspm_id);
                        try {
                            JEND.page.uspm.postTrack(_uspm_id.format(_kw), "click", "");
                        } catch (e) {}
                        setTimeout(function() {
                            inputElm.val(that.hint);
                            hdUspm.attr('data-uspm-id', _ole_uspm_id);
                            that._keywordlink && formElm.attr("action", _action);
                        }, 300);
                    }

                    if (hdUspm.length > 0) {
                        var uspm_id = hdUspm.attr('data-uspm-id') || '';
                        hdUspm.val(uspm_id.format(_kw));
                    }
                    if (hdSrcId.length > 0) {
                        hdSrcId.val('searchkeywords_' + _kw);
                    }
                    return true;
                });
                if (document.location.href.getDomain().split('.')[0] == 'search') {
                    formElm.attr('target', '_self');
                }
            },
            setInputHint: function(_hintKeep) {
                var that = this;
                var inputElm = this.container.find('input.txt-keyword');
                inputElm.bindJendUI('InputHint', {
                    hintKeep: _hintKeep,
                    hint: that.hint,
                    hintColor: '#999999',
                    required: true
                });
            },
            setSearchDefault: function() {
                // srcid = 24_channel_home  // 一级
                // srcid = cateNav_12_62&   // 二级
                // rootCateId='22';         // VI 一级分类ID

                var that = this;
                var inp = that.container.find('input.txt-keyword');
                var _val = (inp.val() || "").trim();

                function random(min, max) {
                    return Math.floor(min + Math.random() * (max - min));
                };
                var srcid = location.href.getQueryValue('srcid') || "";
                var _cid = "-1",
                    cid = "undefined" != typeof rootCateId ? rootCateId : "";
                if ((srcid && (srcid.startWith("cateNav") || srcid.endWith("channel_home"))) || cid) {
                    _cid = cid ? cid : (function() {
                        var _arr = srcid.split("_");
                        return srcid.endWith("channel_home") ? _arr[0] : _arr[1];
                    })();
                }
                if (_cid == "") _cid = "-1";
                JEND.load(this.apis.hotKeyword, function() {
                    var zhjRun = function() {
                        var data = JEND.page.home.data.searchkeysval || [];
                        if (data.length < 1) {
                            return false;
                        }
                        // 查找全局的-1,和当前一级分类的
                        var _public = null,
                            _local = null;
                        $.each(data, function() {
                            var cid = this.cid || "";
                            if ("-1" == cid) {
                                _public = this;
                            }
                            if (_cid == cid) {
                                _local = this;
                            }
                        });
                        // 如果没有找到一级分类,就设置全局的
                        if (!_public && !_local) {
                            return false;
                        }
                        if (_public && _local) {
                            _local.value = _local.value || _public.value;
                        }
                        if (_public && !_local) {
                            _local = _public;
                        }

                        function _run() {
                            var list = (this.value || "").split("|");
                            if (list[list.length - 1] == "") {
                                list.pop();
                            }
                            var cid = this.cid || "";
                            var key = (this.firstlink ? this.firstvalue : "") || list[random(0, list.length)];
                            if (!key) { return false; }
                            that._keywordlink = this.firstvalue ? (this.firstlink || "") : "";
                            that.hint = that._keyword = key;
                            return true;
                        }

                        return _run.call(_local);
                    };
                    var _hintKeep = zhjRun();
                    that.setInputHint(_hintKeep);

                });
            },
            // update by iceyang 20170313
            loadHotkey: function() {
                var that = this,
                    hotkeyElm = this.container.find('.search-hotkeys:visible'),
                    keyword = $.trim(this.container.find('input.txt-keyword').val()),
                    cid = (typeof rootCateId != 'undefined' ? rootCateId : '');   
                    
                if (hotkeyElm.length > 0 && hotkeyElm.text() == '') {
                    if (cid !='' || (keyword !='' && keyword != this.hint)) {
                        $.getJSON('//search.' + JEND.server.uleUrl + '/api/keywordRecommend.action?callback=?', {
                            keyword: keyword,
                            limit: 10,
                            categoryId: cid
                        }, function(data) {
                            if (data && data.resultList) {
                                hotkeyElm.html('<span>相关搜索：</span> ');
                                $.each(data.resultList, function(i, item) {
                                    item.link = item.link.replace(/http:/,'');
                                    hotkeyElm.append(that.tmpl.item.substitute(item));
                                });
                                hotkeyElm.attr('srcid', 'recommendKeywords_{d3}');
                                hotkeyElm.bindJendUI('updateLinkSrcId');
                            }
                        });
                    } else {
                        JEND.load(this.apis.hotKeyword, function() {
                            var data = JEND.page.home.data.searchkeys;
                            if (data && data.length > 0) {
                                hotkeyElm.html(that.tmpl.label);
                                $.each(data, function(i, item) {
                                    if (item.ownLink != 'y') {
                                        item.link = that.apis.searchUrl + '?keywords=' + encodeURIComponent(item.title);
                                    }
                                    if (item.highLight) {
                                        item.title = that.tmpl.title.substitute(item);
                                    }
                                    hotkeyElm.append(that.tmpl.item.substitute(item));
                                });
                                hotkeyElm.attr('srcid', 'recommendKeywords_{d3}');
                                hotkeyElm.bindJendUI('updateLinkSrcId');
                            }
                        });
                    }
                }
            }
        },
        cart: {
            /* cartType: 0:普通购物车 1:办公用品 2:巴黎春天 3:集团采购 */
            apis: {
                toCart: '//cart.' + JEND.server.uleUrl + '/viewPostCart.do',
                getCart: document.location.protocol + '//cart.' + JEND.server.uleUrl + '/cartAdditionTrack.do'
            },
            tmpl: {
                norecord: '<li class="list-empty">您购物车里还没有任何宝贝，快来挑选吧</li>',
                cartitem: ['<li{firstClass}>', '<a class="shopcart-pic" href="javascript:void(0);" title="{t}"><img src="{i}" alt="{t}" title="{t}" /></a>', '<div class="shopcart-item">', '<p class="shopcart-name" title="{t}">{t}</p>', '<p class="shopcart-attr">', '{idStr}{colorStr}{styleStr}', '单价:<em>¥{p}</em><br/>', '数量:<em>{n}</em>', '</p>', '</div>', '</li>'].join(''),
                itemup: '<li class="list-up disabled" onclick="JEND.page.header.cart.scrollUp();"></li>',
                itemdown: '<li class="list-down" onclick="JEND.page.header.cart.scrollDown();"></li>',
                cartsum: ['<li class="list-preview">', '<div class="foot clear">', '<span class="fl">共<strong>{count}</strong>件商品</span>', '<span class="fr">总金额：<strong>¥{price}</strong></span>', '</div>', '<a href="#" title="去购物车结算" class="go2cart" onclick="JEND.page.header.cart.gotoCart(\'new\',this);return false;">去购物车结算</a>', '</li>'].join('')
            },
            init: function() {
                this.cartType = 0;
                /* 办公用品，早期采购 */
                if (window.isjcArea) {
                    this.cartType = 1;
                }
                /* 20121210集团采购QJ */
                if (JEND.page.header.isJicaiHead) {
                    this.cartType = 4;
                    this.apis.toCart = '//cart.' + JEND.server.uleUrl + '/viewGroupPostCart.do';
                } else if (JEND.page.header.isPifaHead) {
                    this.cartType = 3;
                    this.apis.toCart = '//cart.' + JEND.server.uleUrl + '/viewGroupPostCart.do';
                }
                if ($('.header').hasClass("direction-jicai")) {
                    this.cartType = 5;
                    this.apis.toCart = '//cart.' + JEND.server.uleUrl + '/viewGroupPostCart.do';
                }
                this.cartTypeTwo = false;
                // false常规 true巴黎春天(对应cartType=2)
                /* 20121116巴黎春天 */
                if (window.storeId == 5337 && document.location.href.indexOf("item") > 0) {
                    this.cartTypeTwo = true;
                }
                this.checkTypeTwo = false;
                // 是否检查巴黎春天的购物车
                if (this.cartType == 3) {
                    this.checkTypeTwo = false;
                }
                /* DOM init */
                this.container = JEND.page.header.container.find('.head-shopcart:visible');
                if (JEND.page.header.isStoreHead) {
                    this.container = $('.storehead').find('.head-shopcart:visible');
                }
                if (this.container.length > 0) {
                    this.countElm = this.container.find('.shopcart-num');
                    this.listElm = this.container.find('.shopcart-list');
                    this.bindEvent();
                    this.update();
                } else if (JEND.page.header.isStoreHead) {
                    this.container = JEND.page.header.container.find('.userinfo .shopcart');
                    this.countElm = this.container.find('.shopcart-num');
                    this.bindEvent();
                    this.update();
                }
            },
            bindEvent: function() {
                var that = this;
                this.container.find('.shopcart-sum').click(function() {
                    that.gotoCart('newwin', this);
                    return false;
                });
                if (this.listElm) {
                    this.container.hover(function() {
                        that.slideDown();
                    }, function() {
                        that.slideUp();
                    });
                    // 全站浮动购物车
                    var need_scroll = /search.ule.com|search.dev.ule.com|search.beta.ule.com|item.ule.com/i.test(location.host);
                    if (window.isPrize == '1') {
                        need_scroll = false;
                        // 明信片兑奖商品迷你购物车不滚动
                    }
                    if (need_scroll) {
                        this.float();
                    }
                }
            },
            float: function() {
                if (!this.listElm)
                    return;
                if (this.floatBinded)
                    return;
                this.floatBinded = true;
                var shopcart = this.container,
                    st_top = shopcart.offset().top;

                function scrollShopcart() {
                    var t = $(window).scrollTop();
                    if ((t + 5) > st_top) {
                        shopcart.addClass('head-shopcart-fixed');
                        if ($.browser.isIE6) {
                            shopcart.css('top', 100 + t);
                        }
                    } else {
                        shopcart.removeClass('head-shopcart-fixed');
                        if ($.browser.isIE6) {
                            shopcart.css('top', 0);
                        }
                    }
                }


                $(window).scroll(scrollShopcart);
                scrollShopcart();
            },
            viewcount: 1,
            defaultview: 2,
            show: function(p, p2) {
                this.scrollIndex = 1;
                if (!p || p[1] === 0) {
                    if (this.listElm) {
                        this.listElm.html(this.tmpl.norecord);
                    }
                    this.countElm.html('0').removeClass('shopcart-num2');
                    return;
                }
                var sumData = {
                    count: p[1],
                    price: 0,
                    total: 0
                };
                var i, max, item;
                if (p2 && p2[1] > 0) {
                    sumData.count += p2[1];
                    for (i = 0, max = p2[2].length; i < max; i++) {
                        item = p2[2][i];
                        sumData.price += parseFloat(item.p * item.n);
                        sumData.total += parseInt(item.n, 10);
                    }
                }
                if (sumData.count > 999)
                    sumData.count = '999+';
                // 更新商品数量显示
                this.countElm.html(sumData.count).addClass('shopcart-num2');
                // 更新头部购物车商品列表显示
                if (this.listElm) {
                    this.listElm.html('');
                    if (p[2].length > this.defaultview && this.viewcount > this.defaultview) {
                        this.listElm.append(this.tmpl.itemup);
                    }
                    for (i = 0, max = p[2].length; i < max; i++) {
                        item = p[2][i];
                        sumData.price += parseFloat(item.p * item.n);
                        sumData.total += parseInt(item.n, 10);
                        if (i < this.viewcount) {
                            if (i === 0) {
                                item.firstClass = ' class="first clearfix"';
                            } else if (i >= this.defaultview) {
                                item.firstClass = ' class="clearfix" style="display:none;"';
                            } else {
                                item.firstClass = ' class="clearfix"';
                            }
                            item.i = item.i.replace(/\.jpg$/, '.jpg').replace('http:','').replace('ule.com','ulecdn.com');                                             
                            if(item.i.indexOf('360buyimg')>0){
                                item.i = item.i.replace("n0", "n4")
                            }else if(item.i.indexOf('suning')>0){
                                item.i = item.i.replace("_800x800_m_m.jpg", "_100x100.jpg").replace("_800x800_m_m.JPG", "_100x100.JPG")
                            }else if(item.i.indexOf('feiniu')>0){
                                item.i = item.i.replace("_400x400_m_m.jpg", "_160x160.jpg").replace("_400x400_m_m.JPG", "_160x160.JPG")
                            }                                                
                            if (item.id)
                                item.idStr = '商品号: <span class="c666">' + item.id.padLeft(8, '0') + '</span><br/>';
                            if (item.c)
                                item.colorStr = '颜色:<em>' + item.c + '</em><br/>';
                            if (item.s)
                                item.styleStr = '规格:<em>' + item.s + '</em><br/>';
                            this.listElm.append(this.tmpl.cartitem.substitute(item));
                        }
                    }
                    if (p[2].length > this.defaultview && this.viewcount > this.defaultview) {
                        this.listElm.append(this.tmpl.itemdown);
                    }
                    sumData.price = sumData.price.toFixed(2);
                    this.listElm.append(this.tmpl.cartsum.substitute(sumData));
                    if (this.slideAfterUpdate) {
                        this.slideAfterUpdate = false;
                        this.slideDown();
                        this.slideUp();
                    }
                }
            },
            scrollIndex: 1,
            scrollUp: function() {
                var btnUp = this.listElm.find('.list-up'),
                    btnDown = this.listElm.find('.list-down'),
                    theElm = this.listElm.children().eq(this.scrollIndex),
                    that = this;
                if (btnUp.hasClass('disabled'))
                    return;
                btnUp.addClass('disabled');
                theElm.next().slideUp();
                theElm.prev().slideDown(function() {
                    that.scrollIndex--;
                    btnDown.removeClass('disabled');
                    if (that.scrollIndex > 1) {
                        btnUp.removeClass('disabled');
                    }
                });

            },
            scrollDown: function() {
                var btnUp = this.listElm.find('.list-up'),
                    btnDown = this.listElm.find('.list-down'),
                    theElm = this.listElm.children().eq(this.scrollIndex + 1),
                    maxcount = this.listElm.children().length - 3,
                    that = this;
                if (btnDown.hasClass('disabled'))
                    return;
                btnDown.addClass('disabled');
                theElm.prev().slideUp();
                theElm.next().slideDown(function() {
                    that.scrollIndex++;
                    btnUp.removeClass('disabled');
                    if (that.scrollIndex < maxcount - 1) {
                        btnDown.removeClass('disabled');
                    }
                });
            },
            update: function(type) {
                if (this.container.length === 0)
                    return;
                if (type == 'slide') {
                    this.slideAfterUpdate = true;
                }
                var that = this;
                $.getDSS(this.apis.getCart, {
                    cartType: this.cartType,
                    _: new Date().getTime()
                }, function(p) {
                    if (that.checkTypeTwo) {
                        // 读取巴黎春天相关购物车信息
                        $.getDSS(that.apis.getCart, {
                            cartType: 2,
                            _: new Date().getTime()
                        }, function(p2) {
                            if (p) {
                                if (p2) {
                                    if (that.cartTypeTwo && p2[1] > 0) {
                                        that.show(p2, p);
                                    } else {
                                        that.show(p, p2);
                                    }
                                } else {
                                    that.show(p);
                                }
                            } else {
                                that.show(p2);
                            }
                        });
                    } else {
                        that.show(p);
                    }
                });
            },
            slideDown: function() {
                var that = this;
                this.clearTimer();
                this.container.addClass('head-shopcart-hover');
                this.listElm.slideDown();
                this.listElm.bindJendUI('OuterClickEvent', function() {
                    that.slideUpNow();
                });
            },
            slideUp: function() {
                if (this.timer)
                    return;
                var that = this;
                this.timer = setTimeout(function() {
                    that.listElm.slideUp(function() {
                        that.timer = null;
                        that.container.removeClass('head-shopcart-hover');
                    });
                }, 5000);
            },
            slideUpNow: function() {
                this.clearTimer();
                var that = this;
                this.listElm.slideUp(function() {
                    that.container.removeClass('head-shopcart-hover');
                });
            },
            clearTimer: function() {
                if (this.timer) {
                    window.clearTimeout(this.timer);
                    this.timer = false;
                }
            },
            gotoCart: function(target, source) {
                var cartUrl = this.apis.toCart + '?cartType=' + this.cartType + '&_' + new Date().getTime();
                var uspm_id = '';
                if (source) {
                    uspm_id = $(source).attr('data-uspm-id') || '';
                }
                if (uspm_id !== '') {
                    cartUrl = this.apis.toCart + '?cartType=' + this.cartType + '&uspm=' + uspm_id + '&_' + new Date().getTime();
                }
                if (target) {
                    window.open(cartUrl);
                } else {
                    document.location.href = cartUrl;
                }
            },
            // popCart(url);
            // popCart(url, count);
            // popCart({listingId, lid, itemCount, callback});
            popCart: function(data, count) {
                if (typeof(data) == 'string') {
                    var url = data;
                    data = {
                        listingId: url.getFileName().sliceBefore('-'),
                        lid: url.getQueryValue('srcid')
                    };
                    if (count)
                        data.itemCount = count;
                }
                JEND.page.showLoading({
                    title: '加入购物车',
                    loadingText: '提交数据中……'
                });
                JEND.load('mod-popcart', function() {
                    JEND.page.module.popcart.show(data);
                });
            },
            addToCart: function(data) {
                JEND.page.showLoading({
                    title: '加入购物车',
                    loadingText: '提交数据中……'
                });
                JEND.load('mod-popcart', function() {
                    JEND.page.module.popcart.addToCart(data);
                });
            }
        },
        content: {
            init: function() {
                this.updateLinkSourceId();
                this.initAddToCartButton();
                this.initUtility();
            },
            updateLinkSourceId: function() {
                $('.e-loadsrcid').bindJendUI('updateLinkSrcId');
            },
            initAddToCartButton: function() {
                $('.e-popcart').click(function() {
                    var data = $(this).attrJSON();
                    if (!data.listingId) {
                        var url = $(this).attr('href');
                        data.listingId = url.getFileName().sliceBefore('-');
                        data.lid = url.getQueryValue('srcid');
                    } else if (data.countElm) {
                        data.itemCount = $(data.countElm).val() || 1;
                        delete data.countElm;
                    }
                    if (!data.lid) {
                        data.lid = 'e_popcart_' + ($('.e-popcart').index(this) + 1);
                    }
                    if ($(this).attr('data-uspm-id')) {
                        data.uspm = $(this).attr('data-uspm-id');
                    }
                    JEND.page.header.cart.popCart(data);
                    return false;
                });
                if ($('.e-popcart').length > 0) {
                    // 5秒后预加载相关js
                    setTimeout(function() {
                        JEND.load('util.dialog');
                        JEND.load('mod-popcart');
                    }, 5000);
                }
            },
            initUtility: function() {
                var pageurl = document.location.href,
                    modurl = (pageurl.getQueryValue('_attach_module_') || '').decodeURI();
                if (modurl === '')
                    return;
                for (var i = 0, _modarr = modurl.split(','), _len = _modarr.length; i < _len; i++) {
                    JEND.load(JEND.loader.serviceBase + _modarr[i]);
                }
            }
        }
    }, function() {
        JEND.load.add('mod-popcart', {
            js: 'ule/module/popcart/popcart_v2.js?v=201708',
            css: 'ule/module/popcart/popcart.css'
        });
        JEND.page.header.setCookie();
        //手机绑定（安全模块）
        if (!JEND.cookie.get('mobile_safe')) {
            //我的竞拍首页，订单管理，我的钱包，安全设置
            var paths = ["/myid/me.do", "/myorder/", "/myaccount/eWallet/", "/usr/profile/"];

            function checkPath() {
                var location = window.location.href;
                var flag = false;
                if (location.indexOf("ssllogin.do") != -1) {
                    return flag;
                }
                for (var i = 0; i < paths.length; i++) {
                    if (location.indexOf(paths[i]) != -1) {
                        flag = true;
                        break;
                    }
                }
                return flag;
            }
            JEND.load.add('mod-safe', {
                js: 'ule/module/safe/mobile-safe.js',
                css: 'ule/module/safe/mobile-safe.css'
            });

            if (checkPath()) {
                JEND.load("mod-safe", function() {})
            }
        }
        $(document).ready(function() {
            JEND.page.header.init();

            //手机绑定（安全模块）
            setTimeout(function() {
                var $loginOut = $(".userinfo .login .blue");
                if ($loginOut.length) {
                    $loginOut.bind("click", function() {
                        JEND.cookie.set('mobile_safe', false, { domain: JEND.server.uleUrl });
                    })
                }
            }, 500);

            // 处理srcid一级菜单
            $(".head-nav .navlinks li a").bind("click", function() {
                var that = $(this),
                    href = that.attr("href"),
                    srcid = that.attr("srcid");
                if (href && srcid) {
                    if (href.indexOf("?") != -1) {
                        that.attr("href", (href + "&srcid=" + srcid));
                    } else {
                        that.attr("href", (href + "?srcid=" + srcid));
                    }
                    that.removeAttr("srcid");
                };
            });
        });
    });

    /*活动通栏广告位--*/
    JEND.define("JEND.iTopline", {
        init: function() {
            var m = this;
            m.getCurrentTime(function() {
                var now = m.getNow().getTime();
                //              if (now > 1447257600000  ) {//12
                //                  return;
                //              }
                m.loadData(function() {
                    m._createHtml();
                });
            });
        },
        opts: {
            "limit": 5,
            "restype": "2002",
            "sectionKeys": "top_tonglan_banner_2015"
        },
        loadData: function(callback) {
            var m = this;
            $.ajax({
                url: "//search.ule.com/api/recommend",
                data: m.opts,
                dataType: 'jsonp',
                jsonp: "jsoncallback",
                success: function(data) {
                    m.data = data || {};
                    callback && callback();
                },
                error: function(o) {
                    callback && callback();
                }
            });
        },
        _createHtml: function() {
            var m = this,
                htmlTem = m.htmlTem.html1;
            m.$Box = $(".head-top");
            if ($(".head-topline").length > 0) {
                return;
            }
            var lnum = 0,
                now = m.getNow().getTime();
            var html = [],
                data = m.data[m.opts.sectionKeys] || [];

            for (var i = 0, len = data.length; i < len; i++) {
                if (lnum > 0) {
                    break;
                }
                var o = data[i];
                var xxx = (JEND.json.parse(o.customAttribute) || {});
                o.bgcolor = xxx.bgcolor;
                o.startTime = xxx.startTime;
                o.endTime = xxx.endTime;
                if (!o.startTime && !o.endTime) {
                    continue;
                }
                if (o.startTime.parseDate().getTime() > now) {
                    continue;
                }
                if (o.endTime.parseDate().getTime() < now) {
                    continue;
                }

                lnum++;
                o.lnum = lnum;
                o.imgUrl = o.imgUrl.replace(/http:/,'');
        o.link = o.link.replace(/http:/,'');
                html.push(htmlTem.substitute(o));
            }
            if (!html.length) {
                return;
            }
            m.$Box.length && (m.$Box).after(html.join(''));
        },
        htmlTem: function() {
            var arr1 = [];
            arr1.push('<div class="head-topline e-loadsrcid" data-uspm="101196" srcid="index_topline">');
            arr1.push(' <a class="i{lnum}" data-uspm="tline" href="{link}" target="_blank" title="{title}" style="background-image:url({imgUrl});background-color:{bgcolor};"></a>');
            arr1.push('</div>');
            return {
                html1: arr1.join(" ")
            };
        }(),
        url: '//pub.ule.com/clock/datetime?type=2&callback=?',
        _daTime: 0,
        getCurrentTime: function(callback) {
            var m = this;
            $.getJSON(m.url, {}, function(time) {
                m._daTime = time.time - (new Date()).getTime();
                callback && callback();
            });
        },
        getNow: function() {
            return new Date(((new Date()).getTime() + this._daTime));
        }
    }, function() {
        var list = ["meizhuang.ule.com", "nvzhuang.ule.com", "jiaju.ule.com",
            "qicheyongpin.ule.com", "meishi.ule.com", "nanzhuang.ule.com",
            "chuwei.ule.com", "shuma.ule.com", "jinkoushipin.ule.com",
            "xiangbao.ule.com", "diannao.ule.com", "jiadian.ule.com",
            "baojianpin.ule.com", "outdoor.ule.com", "muying.ule.com",
            "ju.ule.com", "search.ule.com", "item.ule.com"
        ];
        var hostname = location.hostname,
            isHas = false;
        for (var i = 0; i < list.length; i++) {
            if (hostname.indexOf(list[i]) != -1) {
                isHas = true;
                break;
            }
        }
        if (isHas && hostname.indexOf("item.ule.com") != -1) {
            JEND.iTopline.opts.sectionKeys = "top_detail_tonglan_banner_2015";
        }
        isHas && JEND.iTopline.init();
    });



    // ----------------------------
    JEND.namespace('JEND.ui');
    // 商品分类显示
    JEND.ui.ProductCategory = function(elm) {
        var dt = elm.find('dt');
        var dd = elm.find('dd');
        dt.mouseover(function() {
            dd.hide();
            dt.removeClass('hover');
            dt.find('b').removeClass('hover');
            if ($(this).hasClass('nohover') || $(this).next('dd').length == 0) {
                return;
            }
            $(this).find('b').addClass('hover');
            $(this).addClass('hover');
            var subList = $(this).next('dd');
            subList.show();
            subList.bindJendUI('HideOverElements', 'select');
            if (!this.hasSetHeight) {
                this.hasSetHeight = true;
                var th = $(this).outerHeight();
                var dh = subList.outerHeight();
                var dl = parseInt(subList.position().left, 10);
                var tt = $(this).offset().top - elm.offset().top;
                if (tt + th > dh) {
                    subList.css('margin-top', tt + th - dh - 1);
                }
                if (dl > 208) {
                    subList.css('margin-left', 208 - dl);
                }
            }
        });
        elm.mouseleave(function() {
            dd.bindJendUI('ShowOverElements', 'select');
            dt.find("b").removeClass("hover");
            dt.removeClass("hover");
            dd.hide();
        });
    };

    var category = {
        init: function() {
            var that = this;
            this.cateElm = $('#category:visible');
            if (this.cateElm.length > 0) {
                setTimeout(function() {
                    // 加载分类数据
                    that.loadData();
                }, 2000);
            }
            this.cateElm.hover(function() {
                    $(this).addClass("mod-category-show");
                }, function() {
                    $(this).removeClass("mod-category-show");
                })
                // 处理菜单srcid
            this.handleSrcid(".cate-bd a");
        },
        loadData: function() {
            var that = this;
            var categoryUrl = this.cateElm.attr('data-cateurl') + '?' + new Date().format('yyyymmddhh');
            var categorySeq = this.cateElm.attr('data-cateseq');
            if (categoryUrl && categorySeq) {
                JEND.load(categoryUrl, function() {
                    if (categorySeq !== '') {
                        JEND.page.home.data.cateview = categorySeq.parseJSON();
                    }
                    that.initCateMenu();
                    that.bindEvent();
                });
            }
        },
        getURL: function(data) {
            var __URL = data.l;
            if (!__URL && data.s) {
                __URL = '//store.ule.com/store/' + data.s + '.htm';
            } else if (!__URL) {
                __URL = '//search.ule.com/search.do?keywords=' + data.t;
            }
            return __URL;
        },
        initCateMenu: function() {
            var m = this,
                countn = 1,
                __tem = m.htmlTem;
            var __menuArr = JEND.page.home.data.cateview;
            var __dataArr = JEND.page.home.data.categories;
            var __dataIndex = JEND.page.home.data.catesequ;
            var $dts = $('#category .cate-bd dt');
            $dts.eq(0).addClass('first');
            $.each(__menuArr, function(i, __cateID) {
                var __arr = [],
                    __adArr = [],
                    __braArr = [],
                    __len = 0;
                var createHTML = function(topcate) {
                    var __index = __dataIndex.indexOf(topcate);
                    if (__dataArr[__index] == -1) return;
                    $.each(__dataArr[__index].s || [], function() {
                        var __data = this,
                            __html = [];
                        __data.cName = __cateID;
                        __data.number = countn++;
                        // 针对手机通讯，临时用关键词替换一下3级分类。 (by jiangxy, 150515)
                        if (__data.i == '2404') {
                            __data.s = [
                                { h: 0, i: "2404c1", n: "苹果", l: "shuma.ule.com/2404-shoujitongxun--8631-PINGGUO------0-1" },
                                { h: 0, i: "2404c2", n: "小米", l: "shuma.ule.com/2404-shoujitongxun--5465-xiaomi------0-1" },
                                { h: 0, i: "2404c3", n: "华为", l: "shuma.ule.com/2404-shoujitongxun--2697-HUAWEI------0-1" },
                                { h: 0, i: "2404c4", n: "三星", l: "shuma.ule.com/2404-shoujitongxun--16504-sanxingSAMSUNG------0-1" },
                                { h: 0, i: "2404c5", n: "魅族", l: "shuma.ule.com/2404-shoujitongxun--37970-MEIZU------0-1" },
                                { h: 0, i: "2404c6", n: "酷派大神", l: "shuma.ule.com/2404-shoujitongxun-%E5%A4%A7%E7%A5%9E--------0-1" },
                                { h: 0, i: "2404c7", n: "iPhone6", l: "shuma.ule.com/2404-shoujitongxun-iphone6--------0-1" },
                                { h: 0, i: "2404c8", n: "4G手机", l: "shuma.ule.com/2404-shoujitongxun-4g--------0-1" },
                                { h: 0, i: "2404c9", n: "双卡双待", l: "shuma.ule.com/2404-shoujitongxun-%E5%8F%8C%E5%8D%A1%E5%8F%8C%E5%BE%85--------0-1" },
                                { h: 0, i: "2404c10", n: "老人机", l: "shuma.ule.com/2404-shoujitongxun-%E8%80%81%E4%BA%BA--------0-1" }
                            ];
                        }
                        $.each(__data.s || [], function() {
                            this.cName = __cateID;
                            this.number = countn++;
                            __html.push(__tem.html5.substitute(this));
                        });
                        __arr.push(__tem.html2.format(__tem.html4.substitute(__data), __html.join('')));
                    });
                    $.each(__dataArr[__index].as || [], function() {
                        var data = {},
                            n = this;
                        data.l = m.getURL(n);
                        data.uspm = n.uspm;
                        data.i = n.i;
                        data.w = '102';
                        data.h = '48';
                        if (++__len > 8) {
                            return;
                        }
                        __adArr.push(__tem.html3.substitute(data));
                    });
                    $.each(__dataArr[__index].ab || [], function() {
                        var data = {},
                            n = this;
                        data.l = m.getURL(n);
                        data.uspm = n.uspm;
                        data.i = n.i;
                        data.w = '260';
                        data.h = '118';
                        data.c = 'cate-ad-item-last';
                        __adArr.push(__tem.html3.substitute(data));
                    });

                    var temData = null;
                    $.each(__dataArr[__index].bs || [], function() {
                        var data = {},
                            n = this;
                        data.l = m.getURL(n);
                        data.uspm = n.uspm;
                        data.i = n.i;
                        data.w = '102';
                        data.h = '48';
                        if (temData) {
                            __braArr.push(__tem.html6.format("", temData + __tem.html7.substitute(data)));
                            temData = null;
                            return;
                        }
                        temData = __tem.html7.substitute(data);
                    });
                    if (temData) {
                        __braArr.push(__tem.html6.format("", temData));
                    }

                    $.each(__dataArr[__index].bb || [], function() {
                        var data = {},
                            n = this;
                        data.l = m.getURL(n);
                        data.uspm = n.uspm;
                        data.i = n.i;
                        data.w = '260';
                        data.h = '118';
                        __braArr.push(__tem.html6.format("cate-brand-item-last", __tem.html7.substitute(data)));
                    });
                    countn = 1;
                }
                createHTML(__cateID);
                if (__cateID == '28032585') {
                    createHTML('28031902');
                } else if (__cateID == '28032887') {
                    createHTML('28033276'); // 用新的单独创建一个类目--配饰
                } else if (__cateID == '28032196') {
                    //createHTML('28032271');
                    createHTML('28033326'); // 用新的单独创建一个类目--鞋靴
                } else if (__cateID == '28032883') {
                    createHTML('28032429');
                }

                if ($dts.eq(i).next('dd').length === 0) {
                    var $dd = $(__tem.html1);
                    var $catesub = $('.cate-sub', $dd);
                    var $catead = $('.cate-ad', $dd);
                    var $catelist2 = $('.cate-list2', $dd);
                    var $catehead = $(".cate-head", $dd);
                    $catesub.html(__arr.join(''));
                    if (__cateID == '28033011') {
                        $dd.addClass('only-cate-sub');
                        if (__adArr.length) {
                            $catead.html(__adArr.join(''));
                            $dd.addClass('only-cate-hasad');
                        }
                    } else {
                        $catead.html(__adArr.join(''));
                    }
                    if (__braArr.length) {
                        $catelist2.html(__braArr.join(''));
                    } else {
                        $catehead.hide();
                    }

                    if (__cateID == '28033011') {
                        var __str = '<div class="bottomAd">';
                        __str += '<a class="iBtn iBtn1" target="_blank" href="//trip.ule.com/index.html?uspm=1.1.1_C2014.121.trip.1&srcid=Homepage_nav_007">旅行 &gt;</a>';
                        __str += '<a class="iBtn iBtn2" target="_blank" href="//life.ule.com/?uspm=1.1.1_C2014.121.life.1&srcid=Homepage_nav_006">生活缴费 &gt;</a>';
                        __str += '</div>';
                        $dd.find('.cate-body .cate-sub').append(__str);
                    }
                    $dts.eq(i).after($dd);
                }
            });
        },
        htmlTem: function() {
            var arr1 = [],
                arr2 = [],
                arr3 = [],
                arr4 = [],
                arr5 = [],
                arr6 = [],
                arr7 = [];

            arr1.push('<dd data-uspm="100014" class="rightMenu">');
            arr1.push(' <div class="cate-head">');
            arr1.push('     <div class="cate-tab cate-tab1 cate-curr" index="0">分类</div>');
            arr1.push('     <div class="cate-tab cate-tab2" index="1">品牌</div>');
            arr1.push('     <div class="clear"></div>');
            arr1.push(' </div>');
            arr1.push(' <div class="cate-body">');
            arr1.push('     <div class="cate-list cate-list1 cate-curr">');
            arr1.push('         <div class="cate-sub"></div>');
            arr1.push('         <div class="cate-ad"></div>');
            arr1.push('         <div class="clear"></div>');
            arr1.push('     </div>');
            arr1.push('     <div class="cate-list cate-list2"></div>');
            arr1.push('     <a class="catePage" title="查看其他分类"></a>');
            arr1.push(' </div>');
            arr1.push('</dd>');

            arr2.push('<div class="cate-sub-dl">');
            arr2.push('   <div class="sub-list-dt">{0}</div>');
            arr2.push('   <div class="sub-list-dd">{1}</div>');
            arr2.push('</div>');

            arr3.push('<a href="{l}" data-uspm="{uspm}" target="_blank" class="cate-ad-item {c}">');
            arr3.push('   <img srcReal="{i}" width="{w}" height="{h}" src="//i0.ulecdn.com/i/event/2015/0831/1px.gif"> ');
            arr3.push('</a>');

            arr4.push('<a data-uspm="{i}" href="//{l}.html" srcid="cateNav_{cName}_{number}" target="_blank">{n}</a>');
            arr5.push('<a{cssText} data-uspm="{i}" href="//{l}.html" srcid="cateNav_{cName}_{number}" target="_blank">{n}</a>');
            arr6.push('<div class="cate-brand-item {0}">{1}</div>');
            arr7.push('<a href="{l}" data-uspm="{uspm}" target="_blank"><img srcReal="{i}" width="{w}" height="{h}" src="//i0.ulecdn.com/i/event/2015/0831/1px.gif"></a>');
            return {
                html1: arr1.join(''),
                html2: arr2.join(''),
                html3: arr3.join(''),
                html4: arr4.join(''),
                html5: arr5.join(''),
                html6: arr6.join(''),
                html7: arr7.join('')
            };
        }(),
        bindEvent: function() {
            var that = this;
            this.cateElm.find('.cate-bd').bindJendUI('ProductCategory');

            var $catebd = $('#category .cate-bd');
            $('dt', $catebd).hover(function() {
                $("img[srcReal]", $(this).next('dd')).each(function() {
                    var o = $(this);
                    o.attr('src', o.attr('srcReal'));
                    o.removeAttr('srcReal');
                });
            });
            $(".rightMenu").each(function() {
                var currCSS = 'cate-curr',
                    __index = 0;
                var $catehead = $(".cate-head", this);
                var $catebody = $(".cate-body", this);
                var $catetab = $(".cate-tab", $catehead);
                var $catesub = $(".cate-sub", $catebody);
                var $catead = $(".cate-ad", $catebody);
                var $catelist = $(".cate-list", $catebody);
                var $catelist2 = $(".cate-list2", $catebody);
                var $catebranditem = $(".cate-brand-item", $catebody);
                var $catesubdl = $(".cate-sub-dl", $catesub);
                var $btnScroll = $(".catePage", this);
                $catesubdl.eq($catesubdl.length - 1).addClass('cate-sub-dl-end');

                $catetab.hover(function() {
                    __index = $(this).attr('index');
                    $catetab.removeClass(currCSS).eq(__index).addClass(currCSS);
                    $catelist.removeClass(currCSS).eq(__index).addClass(currCSS);
                    setScroll();
                });
                var btnCss = 'catePage-down',
                    scrollFun = function() {};
                var __t = 0,
                    setScroll = function() {
                        $btnScroll.hide().removeClass(btnCss);
                        var headH = $catehead.is(":visible") ? $catehead.height() : 0;
                        var dfHeight = $catebd.height() - headH - 1;

                        if (__index == 0) {
                            $catesub.css({ "marginTop": 0 });
                            var subH = ($catesub[0] || {}).offsetHeight || 0; // 分类高
                            var adH = ($catead[0] || {}).offsetHeight || 0; // 广告高
                            var dfSubH = 0,
                                temH = 0;
                            adH = subH > dfHeight * 2 ? ((subH - 2 * dfHeight) / 2 + adH) : adH;
                            $.each($catesubdl, function(i) {
                                temH += (this.offsetHeight || 0);
                                if (dfSubH >= dfHeight && dfSubH >= adH) return;
                                dfSubH = temH;
                            });
                            if (subH < adH || Math.max(subH, adH) < dfHeight) {
                                $catebody.height(Math.max(dfHeight, adH));
                            } else {
                                var ___max = Math.max(dfHeight, dfSubH);
                                $catebody.height(___max);
                                if (Math.abs(subH - ___max) <= 10) {
                                    $catebody.height(Math.max(subH, dfHeight));
                                    return;
                                };
                                $btnScroll.show();
                                scrollFun = function() {
                                    if (!$btnScroll.hasClass(btnCss)) {
                                        __t = -(subH - ___max);
                                        $btnScroll.addClass(btnCss);
                                    } else {
                                        __t = 0;
                                        $btnScroll.removeClass(btnCss);
                                    }
                                    $catesub.stop().animate({ "marginTop": __t }, 400);
                                };
                            }
                        } else if (__index == 1) {
                            $catelist2.css({ "marginTop": 0 });
                            var itemH = ($catelist2[0] || {}).offsetHeight || 0; // 广告高
                            var dfItemH = 0,
                                temH = 0;
                            $.each($catebranditem, function(i) {
                                temH = (this.offsetTop || 0) + (this.offsetHeight || 0);
                                if (dfItemH >= dfHeight) return;
                                dfItemH = temH;
                            });
                            if (itemH < dfHeight) {
                                $catebody.height(dfHeight);
                            } else {
                                var ___max = Math.max(dfHeight, dfItemH);
                                $catebody.height(___max);
                                if (Math.abs(itemH - ___max) <= 10) {
                                    $catebody.height(Math.max(dfHeight, itemH));
                                    return;
                                };
                                $btnScroll.show();
                                scrollFun = function() {
                                    if (!$btnScroll.hasClass(btnCss)) {
                                        __t = -(itemH - ___max);
                                        $btnScroll.addClass(btnCss);
                                    } else {
                                        __t = 0;
                                        $btnScroll.removeClass(btnCss);
                                    }
                                    $catelist2.stop().animate({ "marginTop": __t }, 400);
                                };
                            }

                        }
                    };
                $btnScroll.click(function() {
                    scrollFun();
                });

                var cbs = $catebd[0].style,
                    catebdArr = {
                        display: cbs.display,
                        visibility: cbs.visibility
                    },
                    tbs = this.style,
                    tArr = {
                        display: cbs.display,
                        visibility: cbs.visibility
                    };
                $catebd.css({ display: 'block', visibility: 'hidden' });
                $(this).css({ display: 'block', visibility: 'hidden' });
                setScroll();
                $catebd.css(catebdArr);
                $(this).css(tArr);
            });
            // 处理菜单srcid
            this.handleSrcid(".subcate-list a");
        },
        handleSrcid: function(str) {
            $(str).bind("click", function() {
                var that = $(this),
                    href = that.attr("href"),
                    srcid = that.attr("srcid");
                if (href && srcid) {
                    that.attr("href", (href + "&srcid=" + srcid));
                    that.removeAttr("srcid");
                }
            });
        }
    }

    $(document).ready(function() {
        category.init();
    });
    // ----------------------------
    JEND.debug('header.js', '初始化成功');
})(jQuery);