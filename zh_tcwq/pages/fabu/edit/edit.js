var app = getApp(), _imgArray = [];

Page({
    data: {
        stick_none: !1,
        checked: !1,
        checked_welfare: !1,
        checked_average: !1,
        checked_password: !1,
        know: !1,
        num: 1,
        disabled: !1,
        money1: 0,
        countries: [ "本地", "全国" ],
        countryIndex: 0
    },
    bindCountryChange: function(e) {
        var t = this.data.zdindex, a = this.data.stick;
        console.log("picker country 发生选择改变，携带值为", e.detail.value, t, a);
        this.setData({
            countryIndex: e.detail.value,
            money: this.data.moneyarr[e.detail.value]
        }), null != t && this.setData({
            money1: 0 == e.detail.value ? a[t].money : a[t].money2
        });
    },
    bindMultiPickerChange: function(e) {
        this.setData({
            multiIndex: e.detail.value
        });
    },
    bindPickerChange: function(e) {
        var t = this.data.stock[e.detail.value];
        this.setData({
            index: e.detail.value,
            text: t
        });
    },
    onLoad: function(e) {
        console.log(e);
        var i = this, t = wx.getStorageSync("users").id;
        app.util.request({
            url: "entry/wxapp/GetUserInfo",
            cachetime: "0",
            data: {
                user_id: t
            },
            success: function(e) {
                2 == e.data.state && wx.showModal({
                    title: "提示",
                    content: "您的账号异常，请尽快联系管理员",
                    showCancel: !0,
                    cancelText: "取消",
                    confirmText: "确定",
                    success: function(e) {
                        wx.navigateBack({
                            delta: 1
                        });
                    },
                    fail: function(e) {},
                    complete: function(e) {}
                });
            }
        }), app.util.request({
            url: "entry/wxapp/GetSensitive",
            cachetime: "0",
            success: function(e) {
                console.log(e), e.data ? i.setData({
                    mgnr: e.data
                }) : i.setData({
                    mgnr: {
                        content: ""
                    }
                });
            }
        }), wx.setNavigationBarColor({
            frontColor: "#ffffff",
            backgroundColor: wx.getStorageSync("color")
        }), app.util.request({
            url: "entry/wxapp/System",
            cachetime: "0",
            success: function(e) {
                i.setData({
                    System: e.data
                });
            }
        });
        var a = e.info, n = e.money.split(","), o = e.type_id, s = e.type2_id, c = wx.getStorageSync("System");
        wx.setNavigationBarTitle({
            title: a
        });
        wx.getStorageSync("uniacid");
        console.log(wx.getStorageSync("users"), n), i.setData({
            type_id: o,
            type2_id: s,
            info: a,
            procedures: Number(c.hb_sxf),
            money: n[0],
            moneyarr: n,
            url: wx.getStorageSync("url2"),
            url1: wx.getStorageSync("url"),
            name: wx.getStorageSync("users").name
        }), wx.getLocation({
            type: "wgs84",
            success: function(e) {
                var t = e.latitude + "," + e.longitude;
                app.util.request({
                    url: "entry/wxapp/map",
                    cachetime: "0",
                    data: {
                        op: t
                    },
                    success: function(e) {
                        i.setData({
                            address: e.data.result.address
                        });
                    }
                });
            }
        }), app.util.request({
            url: "entry/wxapp/Top",
            cachetime: "0",
            success: function(e) {
                console.log("top", e.data);
                var t = e.data;
                for (var a in t) 1 == t[a].type ? t[a].array = "置顶一天（收费" : 2 == t[a].type ? t[a].array = "置顶一周（收费" : 3 == t[a].type && (t[a].array = "置顶一月（收费");
                var n = [];
                t.map(function(e) {
                    var t;
                    t = e.array, n.push(t);
                }), n.push("取消置顶"), i.setData({
                    stock: n,
                    stick: t
                });
            }
        }), app.util.request({
            url: "entry/wxapp/Label",
            cachetime: "0",
            data: {
                type2_id: s
            },
            success: function(e) {
                for (var t in e.data) e.data[t].click_class = "selected1";
                i.setData({
                    label: e.data
                });
            }
        });
    },
    selected: function(e) {
        var t = this.data.countryIndex, a = e.currentTarget.id, n = this.data.stick;
        this.setData({
            zdindex: a,
            stick_info: n[a].array,
            money1: 0 == t ? n[a].money : n[a].money2,
            type: n[a].type,
            checked: !1,
            stick_none: !0
        }), console.log(t, this.data.money1);
    },
    add: function(e) {
        var a = this;
        wx.chooseLocation({
            type: "wgs84",
            success: function(e) {
                e.latitude, e.longitude, e.speed, e.accuracy;
                var t = e.latitude + "," + e.longitude;
                a.setData({
                    address: e.address,
                    coordinates: t
                });
            }
        });
    },
    label: function(e) {
        var t = this.data.label, a = e.currentTarget.dataset.inde;
        "selected1" == t[a].click_class ? t[a].click_class = "selected2" : "selected2" == t[a].click_class && (t[a].click_class = "selected1"), 
        this.setData({
            label: t
        });
    },
    know: function(e) {
        var t = this.data.know;
        1 == t ? this.setData({
            know: !1
        }) : this.setData({
            know: !0
        });
    },
    imgArray1: function(e) {
        var a = this, n = wx.getStorageSync("uniacid"), t = 9 - _imgArray.length;
        0 < t && t <= 9 ? wx.chooseImage({
            count: t,
            sizeType: [ "compressed" ],
            sourceType: [ "album", "camera" ],
            success: function(e) {
                wx.showToast({
                    icon: "loading",
                    title: "正在上传"
                });
                var t = e.tempFilePaths;
                a.uploadimg({
                    url: a.data.url + "app/index.php?i=" + n + "&c=entry&a=wxapp&do=Upload&m=zh_tcwq",
                    path: t
                });
            }
        }) : wx.showModal({
            title: "上传提示",
            content: "最多上传9张图片",
            showCancel: !0,
            cancelText: "取消",
            confirmText: "确定",
            success: function(e) {},
            fail: function(e) {},
            complete: function(e) {}
        });
    },
    uploadimg: function(e) {
        var t = this, a = e.i ? e.i : 0, n = e.success ? e.success : 0, i = e.fail ? e.fail : 0;
        wx.uploadFile({
            url: e.url,
            filePath: e.path[a],
            name: "upfile",
            formData: null,
            success: function(e) {
                console.log(e), "" != e.data ? (n++, _imgArray.push(e.data), t.setData({
                    imgArray1: _imgArray
                })) : wx.showToast({
                    icon: "loading",
                    title: "请重试"
                });
            },
            fail: function(e) {
                i++;
            },
            complete: function() {
                ++a == e.path.length ? (t.setData({
                    images: e.path
                }), wx.hideToast()) : (e.i = a, e.success = n, e.fail = i, t.uploadimg(e));
            }
        });
    },
    delete: function(e) {
        Array.prototype.indexOf = function(e) {
            for (var t = 0; t < this.length; t++) if (this[t] == e) return t;
            return -1;
        }, Array.prototype.remove = function(e) {
            var t = this.indexOf(e);
            -1 < t && this.splice(t, 1);
        };
        var t = e.currentTarget.dataset.inde;
        _imgArray.remove(_imgArray[t]), this.setData({
            imgArray1: _imgArray
        });
    },
    switch1Change: function(e) {
        console.log(e.detail.value), e.detail.value || this.setData({
            stick_none: !1,
            money1: 0,
            type: 0
        }), this.setData({
            checked: e.detail.value
        });
    },
    switch2Change: function(e) {
        this.setData({
            checked_welfare: e.detail.value
        });
    },
    switch3Change: function(e) {
        this.setData({
            checked_average: e.detail.value
        });
    },
    switch4Change: function(e) {
        this.setData({
            checked_password: e.detail.value
        });
    },
    formSubmit: function(e) {
        console.log("这是保存formid2"), console.log(e), app.util.request({
            url: "entry/wxapp/SaveFormid",
            cachetime: "0",
            data: {
                user_id: wx.getStorageSync("users").id,
                form_id: e.detail.formId,
                openid: wx.getStorageSync("openid")
            },
            success: function(e) {}
        });
        var t = this, a = 0 == t.data.countryIndex ? wx.getStorageSync("city") : "";
        console.log("city", a);
        var n = t.data.num + 1;
        t.setData({
            num: n
        });
        var i = t.data.money1;
        if ("1" == t.data.System.is_tzdz) var o = e.detail.value.dzaddress; else o = "";
        console.log(o);
        var s = t.data.procedures;
        if (null == t.data.type) var c = 0; else c = t.data.type;
        if (null == i) i = 0; else i = t.data.money1;
        var r = t.data.label, l = [];
        for (var u in r) "selected2" == r[u].click_class && l.push(r[u]);
        var d = [];
        l.map(function(e) {
            var t = {};
            t.label_id = e.id, d.push(t);
        });
        var m = wx.getStorageSync("openid"), y = (e.detail.formId, e.detail.value.content.replace("\n", "↵")), p = this.data.mgnr.content.split(",");
        if (console.log(p, y), "" != this.data.mgnr.content) for (var f = 0; f < p.length; f++) if (-1 != y.indexOf(p[f])) return console.log(y.indexOf(p[f])), 
        void wx.showModal({
            title: "温馨提示",
            content: "您发布的内容在第" + (y.indexOf(p[f]) + 1) + "个字符出现违规敏感词汇,请修改后提交"
        });
        var h = e.detail.value.name, g = e.detail.value.tel;
        console.log(g);
        var w = t.data.lunbo;
        null != w && 0 != w.length || (w = "");
        t.data.url, wx.getStorageSync("uniacid");
        var _ = t.data.type2_id, x = t.data.type_id, v = Number(t.data.money) + Number(i), S = v, b = wx.getStorageSync("users").id;
        console.log(b);
        var k = "", D = t.data.checked_welfare, T = t.data.checked_password, A = t.data.checked_average, N = 0, q = "", C = "", z = 0, P = 0, I = new RegExp("^[一-龥]+$"), M = 0;
        if (1 == D) {
            if (0 == A) {
                P = 1, N = Number(e.detail.value.welfare_money), C = Number(e.detail.value.welfare_share);
                var F = N / C;
                M = N + s / 100 * N, v += Number(M.toFixed(2));
            } else {
                P = 2, N = Number(e.detail.value.welfare_money), C = Number(e.detail.value.welfare_share);
                F = 1;
                M = N * C + N * C * (s / 100), v += Number(M.toFixed(2));
            }
            1 == T ? (q = e.detail.value.welfare_pass, z = 2) : z = 1;
        } else v = v;
        if ("" == y ? k = "内容不能为空" : 540 <= y.length ? k = "内容超出了" : "" == h ? k = "姓名不能为空" : "" == g ? k = "电话不能为空" : 1 == D && ("" == N ? k = t.data.System.hb_name + "金额不能为空" : !t.data.checked_average && N < 1 ? k = t.data.System.hb_name + "金额不能小于1元" : "" == C ? k = t.data.System.hb_name + "个数不能为空" : F < .1 ? k = t.data.System.hb_name + "份数过大，请合理设置" : t.data.checked_average && N < .1 ? k = "单个" + t.data.System.hb_name + "最小金额不能小于0.1元" : 1 == T && ("" == q ? k = "口令不能为空" : I.test(q) || (k = "口令只能输入汉字"))), 
        "" != k) wx.showModal({
            title: "提示",
            content: k,
            success: function(e) {},
            fail: function(e) {},
            complete: function(e) {}
        }); else {
            v = v;
            s = wx.getStorageSync("System");
            if (0 == _imgArray.length) var L = ""; else L = _imgArray.join(",");
            v <= 0 ? (t.setData({
                disabled: !0
            }), app.util.request({
                url: "entry/wxapp/Posting",
                cachetime: "0",
                data: {
                    details: y,
                    img: L,
                    user_id: b,
                    user_name: h,
                    user_tel: g,
                    type2_id: _,
                    type_id: x,
                    money: v,
                    type: c,
                    sz: d,
                    address: o,
                    hb_money: N,
                    hb_keyword: q,
                    hb_num: C,
                    hb_type: z,
                    hb_random: P,
                    cityname: a
                },
                success: function(e) {
                    wx.showToast({
                        title: "发布成功",
                        icon: "",
                        image: "",
                        duration: 2e3,
                        mask: !0,
                        success: function(e) {},
                        fail: function(e) {},
                        complete: function(e) {}
                    }), setTimeout(function() {
                        wx.switchTab({
                            url: "../../index/index",
                            success: function(e) {},
                            fail: function(e) {},
                            complete: function(e) {}
                        });
                    }, 1e3);
                }
            })) : (t.setData({
                disabled: !0
            }), console.log(t.data.money, t.data.money1, N, v, S, Number(t.data.money) + Number(t.data.money1)), 
            app.util.request({
                url: "entry/wxapp/Pay",
                cachetime: "0",
                data: {
                    openid: m,
                    money: v
                },
                success: function(e) {
                    wx.requestPayment({
                        timeStamp: e.data.timeStamp,
                        nonceStr: e.data.nonceStr,
                        package: e.data.package,
                        signType: e.data.signType,
                        paySign: e.data.paySign,
                        success: function(e) {
                            0 < Number(t.data.money) + Number(t.data.money1) && app.util.request({
                                url: "entry/wxapp/fx",
                                cachetime: "0",
                                data: {
                                    user_id: b,
                                    money: Number(t.data.money) + Number(t.data.money1)
                                },
                                success: function(e) {
                                    console.log(e);
                                }
                            }), app.util.request({
                                url: "entry/wxapp/Posting",
                                cachetime: "0",
                                data: {
                                    details: y,
                                    img: L,
                                    user_id: b,
                                    user_name: h,
                                    user_tel: g,
                                    type2_id: _,
                                    type_id: x,
                                    money: v,
                                    type: c,
                                    sz: d,
                                    address: o,
                                    hb_money: N,
                                    hb_keyword: q,
                                    hb_num: C,
                                    hb_type: z,
                                    hb_random: P,
                                    cityname: a
                                },
                                success: function(e) {
                                    0 == S || null == S || "" == S || app.util.request({
                                        url: "entry/wxapp/SaveTzPayLog",
                                        cachetime: "0",
                                        data: {
                                            tz_id: e.data,
                                            money: v,
                                            money1: t.data.money,
                                            money2: t.data.money1,
                                            money3: N
                                        },
                                        success: function(e) {}
                                    }), wx.showToast({
                                        title: "发布成功",
                                        icon: "",
                                        image: "",
                                        duration: 2e3,
                                        mask: !0,
                                        success: function(e) {},
                                        fail: function(e) {},
                                        complete: function(e) {}
                                    }), setTimeout(function() {
                                        wx.switchTab({
                                            url: "../../index/index",
                                            success: function(e) {},
                                            fail: function(e) {},
                                            complete: function(e) {}
                                        });
                                    }, 1e3);
                                }
                            });
                        },
                        fail: function(e) {
                            wx.showToast({
                                title: "支付失败",
                                duration: 1e3
                            });
                        },
                        complete: function(e) {
                            console.log(e), "requestPayment:fail cancel" == e.errMsg && (wx.showToast({
                                title: "取消支付",
                                icon: "loading",
                                duration: 1e3
                            }), t.setData({
                                disabled: !1
                            }));
                        }
                    });
                }
            }));
        }
    },
    cancel: function(e) {
        this.setData({
            money1: 0,
            type: 0,
            checked: !1,
            stick_none: !1,
            iszdchecked: !1
        });
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {
        console.log(this.data), _imgArray.splice(0, _imgArray.length);
    },
    onPullDownRefresh: function() {},
    onReachBottom: function() {}
});