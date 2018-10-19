var app = getApp();

Page({
    data: {
        iszd: !1,
        countryIndex: 0,
        countries: [ "本地", "全国" ]
    },
    cartaddformSubmit: function(e) {
        console.log("formid", e.detail.formId);
        var t = this, n = t.data.seller.user_id;
        app.util.request({
            url: "entry/wxapp/SaveFormid",
            cachetime: "0",
            data: {
                user_id: n,
                form_id: e.detail.formId
            },
            success: function(e) {
                console.log(e.data), t.reLoad();
            }
        });
    },
    reLoad: function() {
        var t = this, e = t.data.seller.user_id;
        app.util.request({
            url: "entry/wxapp/MyFormId",
            cachetime: "0",
            data: {
                user_id: e
            },
            success: function(e) {
                console.log(e.data), t.setData({
                    sycs: e.data
                });
            }
        });
    },
    bindCountryChange: function(e) {
        var t = this.data.stick;
        console.log("picker country 发生选择改变，携带值为", e.detail.value, t);
        this.setData({
            countryIndex: e.detail.value
        });
    },
    qxzd: function() {
        this.setData({
            iszd: !1
        });
    },
    dkxf: function(e) {
        this.setData({
            iszd: !0
        });
    },
    fbyhq: function() {
        wx.navigateTo({
            url: "../wdq/fbyhq?store_id=" + this.data.seller.id
        });
    },
    glyhq: function() {
        wx.navigateTo({
            url: "../wdq/glyhq/glyhq?store_id=" + this.data.seller.id
        });
    },
    hxdd: function() {
        wx.setStorageSync("hxsjid", this.data.seller.id), wx.scanCode({
            success: function(e) {
                console.log(e);
                var t = "../" + e.path.substring(14);
                wx.navigateTo({
                    url: t
                });
            },
            fail: function(e) {
                console.log("扫码fail"), wx.removeStorageSync("hxsjid");
            }
        });
    },
    hxyhq: function() {
        wx.setStorageSync("hxsjid", this.data.seller.id), wx.scanCode({
            success: function(e) {
                console.log(e);
                var t = "/" + e.path;
                wx.navigateTo({
                    url: t
                });
            },
            fail: function(e) {
                console.log("扫码fail"), wx.removeStorageSync("hxsjid");
            }
        });
    },
    fqgsp: function() {
        wx.navigateTo({
            url: "../xsqg/fqgsp?store_id=" + this.data.seller.id
        });
    },
    hxqgdd: function() {
        var n = this.data.seller.id;
        wx.scanCode({
            success: function(e) {
                console.log(e);
                var t = "/" + e.path;
                wx.navigateTo({
                    url: t + "&storeid=" + n
                });
            },
            fail: function(e) {
                console.log("扫码fail");
            }
        });
    },
    selected: function(e) {
        var t = this, n = this.data.countryIndex, o = e.currentTarget.id, a = wx.getStorageSync("openid"), i = wx.getStorageSync("users").id, s = t.data.stick, c = 0 == n ? s[o].money : s[o].money2, r = s[o].type, l = this.data.seller.id, u = 0 == t.data.countryIndex ? "本地" : "全国版", d = wx.getStorageSync("city");
        console.log("city", u, d), t.setData({
            iszd: !1
        }), console.log(c, r, l), Number(c) <= 0 ? app.util.request({
            url: "entry/wxapp/SjXf",
            cachetime: "0",
            data: {
                id: l,
                type: r,
                cityname: u,
                cityname2: d
            },
            success: function(e) {
                console.log(e), "1" == e.data && (wx.showToast({
                    title: "续费成功"
                }), setTimeout(function() {
                    t.refresh1();
                }, 1e3));
            }
        }) : app.util.request({
            url: "entry/wxapp/Pay",
            cachetime: "0",
            data: {
                openid: a,
                money: c
            },
            success: function(e) {
                wx.requestPayment({
                    timeStamp: e.data.timeStamp,
                    nonceStr: e.data.nonceStr,
                    package: e.data.package,
                    signType: e.data.signType,
                    paySign: e.data.paySign,
                    success: function(e) {
                        wx.showModal({
                            title: "提示",
                            content: "支付成功",
                            showCancel: !1
                        });
                    },
                    complete: function(e) {
                        console.log(e), "requestPayment:fail cancel" == e.errMsg && wx.showToast({
                            title: "取消支付",
                            icon: "loading",
                            duration: 1e3
                        }), "requestPayment:ok" == e.errMsg && (app.util.request({
                            url: "entry/wxapp/SjXf",
                            cachetime: "0",
                            data: {
                                id: l,
                                type: r,
                                cityname: u,
                                cityname2: d
                            },
                            success: function(e) {
                                console.log(e);
                            }
                        }), app.util.request({
                            url: "entry/wxapp/SaveStorePayLog",
                            cachetime: "0",
                            data: {
                                store_id: l,
                                money: c,
                                note: "入驻续费"
                            },
                            success: function(e) {
                                console.log("这是续费成功"), console.log(e);
                            }
                        }), app.util.request({
                            url: "entry/wxapp/fx",
                            cachetime: "0",
                            data: {
                                user_id: i,
                                money: c
                            },
                            success: function(e) {
                                console.log(e);
                            }
                        }), setTimeout(function() {
                            t.refresh1();
                        }, 1e3));
                    }
                });
            }
        });
    },
    onLoad: function(e) {
        var o = this, t = wx.getStorageSync("users").id;
        if (console.log(e, t), wx.hideShareMenu(), wx.setNavigationBarColor({
            frontColor: "#ffffff",
            backgroundColor: wx.getStorageSync("color"),
            animation: {
                duration: 0,
                timingFunc: "easeIn"
            }
        }), null == wx.getStorageSync("users").money) ;
        var n = wx.getStorageSync("url");
        o.setData({
            url: n
        });
        app.util.request({
            url: "entry/wxapp/StoreInfo",
            cachetime: "0",
            data: {
                id: e.id
            },
            success: function(e) {
                console.log(e), t == e.data.store[0].user_id && o.setData({
                    isgly: !0
                }), o.setData({
                    seller: e.data.store[0]
                }), o.refresh(), o.reLoad();
            }
        }), app.util.request({
            url: "entry/wxapp/System",
            cachetime: "0",
            success: function(e) {
                console.log(e), o.setData({
                    System: e.data
                });
            }
        }), app.util.request({
            url: "entry/wxapp/InMoney",
            cachetime: "0",
            success: function(e) {
                console.log(e);
                var t = e.data;
                for (var n in t) t[n].money1 = "（收费", 1 == t[n].type ? (t[n].array = "一周" + t[n].money1, 
                t[n].hidden1 = !1) : 2 == t[n].type ? (t[n].array = "半年" + t[n].money1, t[n].hidden1 = !0) : 3 == t[n].type && (t[n].array = "一年" + t[n].money1, 
                t[n].hidden1 = !0);
                console.log(t), o.setData({
                    stick: t
                });
            }
        });
    },
    onShow: function(e){
      var o = this;
      app.util.request({
        url: "entry/wxapp/StoreInfo",
        cachetime: "0",
        data: {
          id: app.globalData.store_id_href
        },
        success: function (e) {
          console.log(e);
          o.setData({
            seller: e.data.store[0]
          });
        }
      })
    },
    refresh1: function() {
        var t = this, e = t.data.seller.id;
        app.util.request({
            url: "entry/wxapp/StoreInfo",
            cachetime: "0",
            data: {
                id: e
            },
            success: function(e) {
                console.log(e), t.setData({
                    seller: e.data.store[0]
                }), t.refresh();
            }
        });
    },
    refresh: function(e) {
        var a = this;
        console.log(a.data.seller), this.setData({
            dqdate: app.ormatDate(a.data.seller.dq_time).substring(0, 10)
        });
        var t, n, o, i = (t = new Date(), n = t.getMonth() + 1, o = t.getDate(), 1 <= n && n <= 9 && (n = "0" + n), 
        0 <= o && o <= 9 && (o = "0" + o), t.getFullYear() + "/" + n + "/" + o + " " + t.getHours() + ":" + t.getMinutes() + ":" + t.getSeconds()).slice(0, 10);
        console.log(i);
        var s = a.data.seller.id;
        app.util.request({
            url: "entry/wxapp/Profit",
            cachetime: "0",
            data: {
                store_id: s
            },
            success: function(e) {
                console.log(e), a.setData({
                    myye: e.data
                });
            }
        }), app.util.request({
            url: "entry/wxapp/StoreOrder",
            cachetime: "0",
            data: {
                store_id: s
            },
            success: function(e) {
                console.log(e);
                var t = e.data, n = [];
                for (var o in t) t[o].time = app.ormatDate(t[o].time).slice(0, 10), t[o].time = t[o].time.replace(/-/g, "/"), 
                i == t[o].time && n.push(t[o]);
                a.setData({
                    order_num: n.length
                });
            }
        });
    },
    onReady: function() {},
    yemx: function(e) {
        wx.navigateTo({
          url: "wallet/wallet?store_id=" + this.data.seller.id + "&pay_type=" + this.data.seller.pay_type
        });
    },
    more: function(e) {
        console.log(e);
        var t = this.data.seller.id;
        wx.navigateTo({
            url: "../sellerinfo/sellerinfo?id=" + t,
            success: function(e) {},
            fail: function(e) {},
            complete: function(e) {}
        });
    },
    cash: function(e) {
      var profit = (this.data.seller.pay_type == 1) ? (this.data.seller.score) : (this.data.seller.wallet);
        wx.navigateTo({
            url: "../logs/cash?&state=2&store_id=" + this.data.seller.id + "&profit=" + profit + "&pay_type=" + this.data.seller.pay_type,
            success: function(e) {},
            fail: function(e) {},
            complete: function(e) {}
        });
    },
    activeIndex_one: function(e) {
        wx.navigateTo({
            url: "mine_order?activeIndex=1&store_id=" + this.data.seller.id,
            success: function(e) {},
            fail: function(e) {},
            complete: function(e) {}
        });
    },
    activeIndex_two: function(e) {
        wx.navigateTo({
            url: "mine_order?activeIndex=0&store_id=" + this.data.seller.id,
            success: function(e) {},
            fail: function(e) {},
            complete: function(e) {}
        });
    },
    activeIndex_three: function(e) {
        wx.navigateTo({
            url: "mine_order?activeIndex=3&store_id=" + this.data.seller.id,
            success: function(e) {},
            fail: function(e) {},
            complete: function(e) {}
        });
    },
    activeIndex_four: function(e) {
        wx.navigateTo({
            url: "mine_order?activeIndex=4&store_id=" + this.data.seller.id,
            success: function(e) {},
            fail: function(e) {},
            complete: function(e) {}
        });
    },
    activeIndex_five: function (e) {
        wx.navigateTo({
          url: "mine_orderList1?store_id=" + this.data.seller.id,
          success: function (e) {},
          fail: function (e) { },
          complete: function (e) { }
        });
    },
    activeIndex_six: function (e) {
        wx.navigateTo({
          url: "mine_orderList2?store_id=" + this.data.seller.id,
          success: function (e) { },
          fail: function (e) { },
          complete: function (e) { }
        });
    },
    fuck: function(e) {
        wx.navigateTo({
            url: "../logs/publish?store_id=" + this.data.seller.id,
            success: function(e) {},
            fail: function(e) {},
            complete: function(e) {}
        });
    },
    customer: function(e) {
        wx.navigateTo({
            url: "customer/customer?user_id=" + this.data.seller.id
        });
    },
    welfare: function(e) {
        wx.navigateTo({
            url: "welfare?user_id=" + this.data.seller.id,
            success: function(e) {},
            fail: function(e) {},
            complete: function(e) {}
        });
    },
    sent: function(e) {
        wx.navigateTo({
            url: "sent?user_id=" + this.data.seller.id,
            success: function(e) {},
            fail: function(e) {},
            complete: function(e) {}
        });
    },
    mechat: function(e) {
        wx.navigateTo({
            url: "../logs/index?user_id=" + this.data.seller.id,
            success: function(e) {},
            fail: function(e) {},
            complete: function(e) {}
        });
    },
    // 公告管理
    gggl: function (e) {
      wx.navigateTo({
        url: "../redbag/notice?user_id=" + this.data.seller.user_id + "&store_id=" + this.data.seller.id + "&cityname=" + this.data.seller.cityname,
        success: function (e) { },
        fail: function (e) { },
        complete: function (e) { }
      });
    },
    // 积分设置
    jfsz:function(){
      var pay_integral=0;
      if (this.data.seller.pay_integral){
        pay_integral = this.data.seller.pay_integral
      };
      wx.navigateTo({
        url: "../redbag/point?user_id=" + this.data.seller.user_id + "&store_id=" + this.data.seller.id + "&pay_integral=" + pay_integral,
        success: function (e) { },
        fail: function (e) { },
        complete: function (e) { }
      });
    },
    mine_shop: function(e) {
        wx.navigateTo({
            url: "commodity?store_id=" + this.data.seller.id,
            success: function(e) {},
            fail: function(e) {},
            complete: function(e) {}
        });
    },
    interests: function(e) {
        wx.showModal({
            title: "提示",
            content: "此功能暂未开放",
            showCancel: !0,
            cancelText: "取消",
            cancelColor: "",
            confirmText: "确定",
            confirmColor: "",
            success: function(e) {},
            fail: function(e) {},
            complete: function(e) {}
        });
    },
    vip: function(e) {
        wx.showModal({
            title: "提示",
            content: "此功能暂未开放",
            showCancel: !0,
            cancelText: "取消",
            cancelColor: "",
            confirmText: "确定",
            confirmColor: "",
            success: function(e) {},
            fail: function(e) {},
            complete: function(e) {}
        });
    },
    tuichu: function(e) {
        wx.removeStorage({
            key: "store_info",
            success: function(e) {
                wx.showToast({
                    title: "退出登陆"
                }), setTimeout(function() {
                    wx.navigateBack({
                        delta: 1
                    });
                }, 2e3);
            }
        });
    },
    change_isOff:function(e){
      var that = this;
      var anc = (e.currentTarget.dataset.type == 0) ? '上架' :'下架';
      var changeValue = (e.currentTarget.dataset.type == 0) ? 0 : 1;
      console.log(e.currentTarget.dataset.type);
      console.log(that.data.seller.id);
      wx.showModal({
        title: '提示',
        content: '确定要'+ anc +'您的店铺？',
        success: function (res) {
          if (res.cancel) {
            //点击取消,默认隐藏弹框
          } else {
            //点击确定
            app.util.request({
              url: "entry/wxapp/StoreOff",
              data: {
                is_off: e.currentTarget.dataset.type,
                store_id: that.data.seller.id
              },
              success: function (t) {
                console.log(t);
                if(t.data==1){
                  that.setData({ 'seller.is_off': changeValue });
                  console.log(that.data.seller.is_off);
                };
              }
            });
          }
        }
      })
    }
});