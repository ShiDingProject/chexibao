var app = getApp(), util = require("../../utils/util.js"), imgArray = [], siteinfo = require("../../../siteinfo.js");

Page({
    data: {
        countries: [ "代金券", "折扣券", "通用券" ],
        countryIndex: 0,
        lqcountries: [ "付费领取+分享领取", "仅限付费领取", "仅限分享领取" ],
        lqcountryIndex: 1,
        jesz: !0,
        qssz: !0,
        yhqtype: "元",
        start: "",
        timestart: "",
        timeend: "",
        issq: !0,
        is_check: "",
        zsnum: 0,
        fwxy: !0,
        images: []
    },
    lookck: function() {
        this.setData({
            fwxy: !1
        });
    },
    queren: function() {
        this.setData({
            fwxy: !0
        });
    },
    jyfxsl: function(t) {
        console.log(t.detail.value), "0" == t.detail.value && wx.showToast({
            title: "数量不能为0",
            icon: "loading"
        });
    },
    bindTypeChange: function(t) {
        console.log("picker type 发生选择改变，携带值为", t.detail.value), "0" == t.detail.value && this.setData({
            countryIndex: t.detail.value,
            yhqtype: "元"
        }), "1" == t.detail.value && this.setData({
            countryIndex: t.detail.value,
            yhqtype: "折"
        }), "2" == t.detail.value && this.setData({
            countryIndex: t.detail.value,
            yhqtype: ""
        });
    },
    bindTypeChange1: function(t) {
        console.log("picker1 type 发生选择改变，携带值为", t.detail.value), "1" == this.data.ptxx.is_fxlq ? ("0" == t.detail.value && this.setData({
            lqcountryIndex: t.detail.value,
            jesz: !0,
            qssz: !0
        }), "1" == t.detail.value && this.setData({
            lqcountryIndex: t.detail.value,
            jesz: !0,
            qssz: !1
        }), "2" == t.detail.value && this.setData({
            lqcountryIndex: t.detail.value,
            jesz: !1,
            qssz: !0
        })) : this.setData({
            lqcountryIndex: t.detail.value,
            jesz: !0,
            qssz: !1
        });
    },
    bindTimeChange: function(t) {
        console.log("picker 发生选择改变，携带值为", t.detail.value), this.setData({
            timestart: t.detail.value
        });
    },
    bindTimeChange1: function(t) {
        console.log("picker  发生选择改变，携带值为", t.detail.value), this.setData({
            timeend: t.detail.value
        });
    },
    qwkt: function() {
        wx.redirectTo({
            url: "txzl"
        });
    },
    gongg: function(t) {
        console.log(t.detail.value);
        var e = parseInt(t.detail.value.length);
        this.setData({
            zsnum: e
        });
    },
    chooseImage: function(t) {
        var e = this, i = this.data.images, a = i.length;
        console.log(i), wx.chooseImage({
            count: 3 - a,
            success: function(t) {
                i = i.concat(t.tempFilePaths), e.setData({
                    images: i
                }), console.log(i);
            }
        });
    },
    deleteImage: function(t) {
        var e = t.currentTarget.dataset.index, i = this.data.images;
        console.log(e), i.splice(e, 1), this.setData({
            images: i
        }), console.log(i);
    },
    formSubmit: function(t) {
        var e = this.data.sjid, i = this.data.images, a = wx.getStorageSync("users").id;
        console.log("form发生了submit事件，携带数据为：", t.detail.value);
        var o = this.data.countries[this.data.countryIndex], l = t.detail.value.yhje, n = t.detail.value.yhtj, s = t.detail.value.ffsl, u = this.data.timestart, c = this.data.timeend, d = t.detail.value.syxz, r = t.detail.value.lqje, f = t.detail.value.fxsl, h = t.detail.value.tyqmc;
        if (null == r && (r = ""), null == f && (f = ""), null == h && (h = ""), "通用券" == o && "" == h) return wx.showModal({
            title: "提示",
            content: "您选择的通用券类型，请填写通用券名称"
        }), !1;
        console.log(e, a, o, l, n, s, u, c, d, r, f, h, i), console.log(util.validTime(u, c));
        var g = this.data.is_couset, m = this.data.lqcountryIndex;
        if (console.log(g, m), "2" == g) ;
        if ("1" == g) {
            if ("0" == m) ;
            if ("1" == m) ;
            if ("2" == m) ;
        }
        var v = "", x = !0;
        if ("1" == g && "0" == m) {
            if ("" == r) return void wx.showModal({
                title: "提示",
                content: "请填写领券金额！"
            });
            if ("" == f) return void wx.showModal({
                title: "提示",
                content: "请填写分享数量！"
            });
            if (10 < Number(f)) return void wx.showModal({
                title: "提示",
                content: "分享数量不能大于10"
            });
        }
        if ("1" != g || "1" != m || "" != r) {
            if ("1" == g && "2" == m) {
                if ("" == f) return void wx.showModal({
                    title: "提示",
                    content: "请填写分享数量！"
                });
                if (10 < Number(f)) return void wx.showModal({
                    title: "提示",
                    content: "分享数量不能大于10"
                });
            }
            if ("" == l) v = "请填写优惠金额！"; else if ("" == s) v = "请填写发放数量！"; else if (util.validTime(u, c)) if ("" == d) v = "请填写优惠券使用说明！"; else {
                var y = function() {
                    console.log("请求接口", imgArray, imgArray.toString()), app.util.request({
                        url: "entry/wxapp/AddCoupon",
                        cachetime: "0",
                        data: {
                            store_id: e,
                            name: h,
                            number: s,
                            full: n,
                            reduce: l,
                            money: r,
                            end_time: c,
                            details: d,
                            img: imgArray.toString()
                        },
                        success: function(t) {
                            "1" == t.data && (wx.showModal({
                                title: "提示",
                                content: "提交成功"
                            }), setTimeout(function() {
                                wx.navigateBack({});
                            }, 1e3)), console.log("Assess", t.data);
                        }
                    });
                };
                x = !1;
                wx.showLoading({
                    title: "正在提交",
                    mask: !0
                }), 0 == i.length ? y() : function t(e) {
                    var i = e.i ? e.i : 0, a = e.success ? e.success : 0, o = e.fail ? e.fail : 0;
                    wx.uploadFile({
                        url: e.url,
                        filePath: e.path[i],
                        name: "upfile",
                        formData: null,
                        success: function(t) {
                            "" != t.data ? (console.log(t), a++, imgArray.push(t.data), console.log(i), console.log("图片数组", imgArray)) : wx.showToast({
                                icon: "loading",
                                title: "请重试"
                            });
                        },
                        fail: function(t) {
                            o++, console.log("fail:" + i + "fail:" + o);
                        },
                        complete: function() {
                            console.log(i), ++i == e.path.length ? (wx.hideToast(), console.log("执行完毕"), y(), 
                            console.log("成功：" + a + " 失败：" + o)) : (console.log(i), e.i = i, e.success = a, 
                            e.fail = o, t(e));
                        }
                    });
                }({
                    url: siteinfo.siteroot + "?i=" + siteinfo.uniacid + "&c=entry&a=wxapp&do=upload&m=zh_tcwq",
                    path: i
                });
            } else v = "请设置合理的截止日期！";
            1 == x && wx.showModal({
                title: "提示",
                content: v
            });
        } else wx.showModal({
            title: "提示",
            content: "请填写领券金额！"
        });
    },
    onLoad: function(t) {
        var e = t.store_id, i = util.formatTime(new Date()).substring(0, 10).replace(/\//g, "-");
        console.log(e, i.toString()), this.setData({
            start: i,
            timestart: i,
            timeend: i,
            is_couset: 1,
            szlx: 1,
            sjid: e
        }), app.util.request({
            url: "entry/wxapp/StoreInfo",
            cachetime: "0",
            data: {
                id: e
            },
            success: function(t) {
                console.log(t);
            }
        });
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {}
});