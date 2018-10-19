App({
    onLaunch: function() {},
    onShow: function() {},
    onHide: function() {
      console.log(getCurrentPages());
      // wx.navigateTo({
      //   url: "../../../zh_tcwq/pages/index/Liar"
      // });
    },
    onError: function(e) {
        // console.log(e);
    },
    setNavigationBarColor: function(o) {
        var e = this.globalData.color;
        console.log(e, o), e && wx.setNavigationBarColor({
            frontColor: "#ffffff",
            backgroundColor: e
        }), o.setData({
            color: e
        });
        var t = this;
        e || t.util.request({
            url: "entry/wxapp/System",
            success: function(e) {
                console.log(e), getApp().xtxx = e.data, t.globalData.color = e.data.color, t.setNavigationBarColor(o);
            }
        });
    },
    getUser: function(a) {
        var s = this;
        wx.login({
            success: function(e) {
                console.log('app.js getUser',e);
                var o = e.code;
                wx.setStorageSync("code", o), wx.getUserInfo({
                    success: function(e) {
                        console.log(e), wx.setStorageSync("user_info", e.userInfo);
                        var t = e.userInfo.nickName, n = e.userInfo.avatarUrl;
                        s.util.request({
                            url: "entry/wxapp/openid",
                            cachetime: "0",
                            data: {
                                code: o
                            },
                            success: function(e) {
                                console.log(e), wx.setStorageSync("key", e.data.session_key), wx.setStorageSync("openid", e.data.openid);
                                var o = e.data.openid;
                                s.util.request({
                                    url: "entry/wxapp/Login",
                                    cachetime: "0",
                                    data: {
                                        openid: o,
                                        img: n,
                                        name: t
                                    },
                                    success: function(e) {
                                        console.log(e), wx.setStorageSync("users", e.data), wx.setStorageSync("uniacid", e.data.uniacid), 
                                        a(e.data);
                                    }
                                });
                            }
                        });
                    },
                    fail: function(e) {
                        wx.getSetting({
                            success: function(e) {
                                0 == e.authSetting["scope.userInfo"] && wx.openSetting({
                                    success: function(e) {
                                        e.authSetting["scope.userInfo"], s.getUser(a);
                                    }
                                });
                            }
                        });
                    }
                });
            }
        });
    },
    getUserInfo: function(o) {
        var t = this, e = this.globalData.userInfo;
        console.log(e), e ? "function" == typeof o && o(e) : wx.login({
            success: function(e) {
                wx.showLoading({
                    title: "正在登录",
                    mask: !0
                }), console.log(e.code), t.util.request({
                    url: "entry/wxapp/Openid",
                    cachetime: "0",
                    data: {
                        code: e.code
                    },
                    header: {
                        "content-type": "application/json"
                    },
                    dataType: "json",
                    success: function(e) {
                        console.log("openid信息", e.data), getApp().getOpenId = e.data.openid, getApp().getSK = e.data.session_key, 
                        t.util.request({
                            url: "entry/wxapp/login",
                            cachetime: "0",
                            data: {
                                openid: e.data.openid
                            },
                            header: {
                                "content-type": "application/json"
                            },
                            dataType: "json",
                            success: function(e) {
                                console.log("用户信息", e), getApp().getuniacid = e.data.uniacid, wx.setStorageSync("users", e.data), 
                                t.globalData.userInfo = e.data, "function" == typeof o && o(t.globalData.userInfo);
                            }
                        });
                    },
                    fail: function(e) {},
                    complete: function(e) {}
                });
            }
        });
    },
    ormatDate: function(e) {
        var o = new Date(1e3 * e);
        return o.getFullYear() + "-" + t(o.getMonth() + 1, 2) + "-" + t(o.getDate(), 2) + " " + t(o.getHours(), 2) + ":" + t(o.getMinutes(), 2) + ":" + t(o.getSeconds(), 2);
        function t(e, o) {
            for (var t = "" + e, n = t.length, a = "", s = o; s-- > n; ) a += "0";
            return a + t;
        }
    },
    ab: function(e) {},
    util: require("we7/resource/js/util.js"),
    siteInfo: require("siteinfo.js"),
    tabBar: {
        color: "#123",
        selectedColor: "#1ba9ba",
        borderStyle: "#1ba9ba",
        backgroundColor: "#fff",
        list: [ {
            pagePath: "/we7/pages/index/index",
            iconPath: "/we7/resource/icon/home.png",
            selectedIconPath: "/we7/resource/icon/homeselect.png",
            text: "首页"
        }, {
            pagePath: "/we7/pages/user/index/index",
            iconPath: "/we7/resource/icon/user.png",
            selectedIconPath: "/we7/resource/icon/userselect.png",
            text: "微擎我的"
        } ]
    },
    globalData: {
        userInfo: null,
        store_id_href:''
    }
});