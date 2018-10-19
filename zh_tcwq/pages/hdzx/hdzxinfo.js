var app = getApp(), util = require("../../utils/util.js");

Page({
    data: {
        slide: [ {
            logo: "../image/background2.png"
        }, {
            logo: "../image/fximg.png"
        } ],
        kpgg: !0,
        qddh: !1,
        hdinfo: {
            id: 2,
            money: 10
        },
        tjwz: "提交报名"
    },
    maketel: function(t) {
        var e = this.data.hdinfo.tel;
        wx.makePhoneCall({
            phoneNumber: e
        });
    },
    location: function() {
        var t = this.data.hdinfo.coordinate.split(","), e = this.data.hdinfo.address;
        console.log(t), wx.openLocation({
            latitude: parseFloat(t[0]),
            longitude: parseFloat(t[1]),
            address: e,
            name: "位置"
        });
    },
    ycgg: function() {
        this.setData({
            kpgg: !0
        });
    },
    wybm: function() {
        this.setData({
            kpgg: !1
        });
    },
    updateUserInfo: function(t) {
        console.log(t), "getUserInfo:ok" == t.detail.errMsg && (this.setData({
            hydl: !1
        }), this.getuserinfo());
    },
    getuserinfo: function() {
        var s = this;
        wx.login({
            success: function(t) {
                console.log("这是登录所需要的code"), console.log(t.code);
                var e = t.code;
                wx.setStorageSync("code", e), wx.getSetting({
                    success: function(t) {
                        console.log(t), t.authSetting["scope.userInfo"] ? wx.getUserInfo({
                            success: function(t) {
                                wx.setStorageSync("user_info", t.userInfo);
                                var n = t.userInfo.nickName, i = t.userInfo.avatarUrl;
                                s.setData({
                                    user_name: n
                                }), console.log("用户名字"), console.log(t.userInfo.nickName), console.log("用户头像"), 
                                console.log(t.userInfo.avatarUrl), app.util.request({
                                    url: "entry/wxapp/openid",
                                    cachetime: "0",
                                    data: {
                                        code: e
                                    },
                                    success: function(t) {
                                        wx.setStorageSync("key", t.data.session_key);
                                        var e = i, a = n;
                                        wx.setStorageSync("openid", t.data.openid);
                                        var o = t.data.openid;
                                        console.log("这是用户的openid"), console.log(o), app.util.request({
                                            url: "entry/wxapp/Login",
                                            cachetime: "0",
                                            data: {
                                                openid: o,
                                                img: e,
                                                name: a
                                            },
                                            success: function(t) {
                                                console.log("这是用户的登录信息"), console.log(t), wx.setStorageSync("users", t.data), wx.setStorageSync("uniacid", t.data.uniacid), 
                                                app.util.request({
                                                    url: "entry/wxapp/IsSignUp",
                                                    cachetime: "0",
                                                    data: {
                                                        user_id: t.data.id,
                                                        act_id: s.data.hdid
                                                    },
                                                    success: function(t) {
                                                        console.log(t), s.setData({
                                                            userisbm: t.data
                                                        });
                                                    }
                                                });
                                            }
                                        });
                                    }
                                });
                            }
                        }) : (console.log("未授权过"), s.setData({
                            hydl: !0
                        }));
                    }
                });
            }
        });
    },
    onLoad: function(t) {
        console.log(t);
        var e = this, a = util.formatTime(new Date()).replace(/\//g, "-").toString();
        console.log(a), this.getuserinfo(), this.setData({
            hdid: t.hdid
        }), app.util.request({
            url: "entry/wxapp/System",
            cachetime: "0",
            success: function(t) {
                console.log(t), wx.setNavigationBarColor({
                    frontColor: "#ffffff",
                    backgroundColor: t.data.color,
                    animation: {
                        duration: 0,
                        timingFunc: "easeIn"
                    }
                }), e.setData({
                    system: t.data,
                    color: t.data.color
                });
            }
        }), app.util.request({
            url: "entry/wxapp/url",
            cachetime: "0",
            success: function(t) {
                e.setData({
                    url: t.data
                });
            }
        }), app.util.request({
            url: "entry/wxapp/ActivityInfo",
            cachetime: "0",
            data: {
                id: t.hdid
            },
            success: function(t) {
                console.log(t), wx.setNavigationBarTitle({
                    title: t.data.title
                }), t.data.end_time > a ? t.data.isgq = 2 : t.data.isgq = 1, e.setData({
                    hdinfo: t.data
                });
            }
        }), app.util.request({
            url: "entry/wxapp/Llz",
            cachetime: "0",
            data: {
                cityname: wx.getStorageSync("city"),
                type: 6
            },
            success: function(t) {
                console.log(t), e.setData({
                    unitid: t.data
                });
            }
        });
    },
    formSubmit: function(t) {
        console.log("form发生了submit事件，携带数据为：", t.detail.value);
        var e = this, a = wx.getStorageSync("users").id, o = wx.getStorageSync("openid"), n = t.detail.formId, i = e.data.hdinfo.id, s = this.data.hdinfo.money, c = t.detail.value.lxr, l = t.detail.value.tel;
        console.log(a, i, s, c, l);
        var d = "", r = !0;
        "" == c ? d = "请填写联系人！" : "" == l || l.length < 11 ? d = "请填写正确联系电话！" : (r = !1, 
        e.setData({
            qddh: !0,
            tjwz: "提交中"
        }), app.util.request({
            url: "entry/wxapp/SignUp",
            cachetime: "0",
            data: {
                user_id: a,
                act_id: i,
                money: s,
                form_id: n,
                user_name: c,
                user_tel: l
            },
            success: function(t) {
                console.log(t), "人数已满" != t.data && "报名失败" != t.data ? 0 < s ? app.util.request({
                    url: "entry/wxapp/Pay3",
                    cachetime: "0",
                    data: {
                        openid: o,
                        money: s,
                        order_id: t.data
                    },
                    success: function(t) {
                        console.log(t), wx.requestPayment({
                            timeStamp: t.data.timeStamp,
                            nonceStr: t.data.nonceStr,
                            package: t.data.package,
                            signType: t.data.signType,
                            paySign: t.data.paySign,
                            success: function(t) {
                                console.log("这里是支付成功");
                            },
                            complete: function(t) {
                                console.log(t), "requestPayment:fail cancel" == t.errMsg && (wx.showToast({
                                    title: "取消支付",
                                    icon: "loading",
                                    duration: 1e3
                                }), e.setData({
                                    qddh: !1,
                                    tjwz: "提交报名"
                                })), "requestPayment:ok" == t.errMsg && (wx.showToast({
                                    title: "提交成功"
                                }), setTimeout(function() {
                                    wx.redirectTo({
                                        url: "../wdbm/wdbm"
                                    });
                                }, 1e3));
                            }
                        });
                    }
                }) : (wx.showToast({
                    title: "提交成功"
                }), setTimeout(function() {
                    wx.redirectTo({
                        url: "../wdbm/wdbm"
                    });
                }, 1e3)) : (wx.showModal({
                    title: "提示",
                    content: t.data
                }), e.setData({
                    qddh: !1,
                    tjwz: "提交报名"
                }));
            }
        })), 1 == r && wx.showModal({
            title: "提示",
            content: d
        });
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {
        var t = this.data.hdinfo.title, e = this.data.hdid;
        return console.log(t, e), {
            title: t,
            path: "/zh_tcwq/pages/hdzx/hdzxinfo?hdid=" + e,
            success: function(t) {},
            fail: function(t) {}
        };
    }
});