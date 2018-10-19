var qqmapsdk,
  app = getApp(),
  Data = require("../../utils/util.js"),
  QQMapWX = require("../../../utils/qqmap-wx-jssdk.js");

Page({
  data: {
    activeIndex: 0,
    index: 0,
    currentTab: 0,
    swiperCurrent: 0,
    indicatorDots: !1,
    autoplay: !0,
    interval: 5e3,
    duration: 1e3,
    circular: !0,
    averdr: !1,
    hotels: !1,
    refresh_top: !1,
    scroll_top: !0,
    index_class: !1,
    seller: [],
    page: 1,
    bkname: "最新公告",
    star: [{
      img: "../image/xing.png"
    }, {
      img: "../image/xing.png"
    }, {
      img: "../image/xing.png"
    }, {
      img: "../image/xing.png"
    }, {
      img: "../image/xing.png"
    }],
    star1: [{
      img: "../image/xing.png"
    }, {
      img: "../image/star_none.png"
    }, {
      img: "../image/star_none.png"
    }, {
      img: "../image/star_none.png"
    }, {
      img: "../image/star_none.png"
    }],
    star2: [{
      img: "../image/xing.png"
    }, {
      img: "../image/xing.png"
    }, {
      img: "../image/star_none.png"
    }, {
      img: "../image/star_none.png"
    }, {
      img: "../image/star_none.png"
    }],
    star3: [{
      img: "../image/xing.png"
    }, {
      img: "../image/xing.png"
    }, {
      img: "../image/xing.png"
    }, {
      img: "../image/star_none.png"
    }, {
      img: "../image/star_none.png"
    }],
    star4: [{
      img: "../image/xing.png"
    }, {
      img: "../image/xing.png"
    }, {
      img: "../image/xing.png"
    }, {
      img: "../image/xing.png"
    }, {
      img: "../image/star_none.png"
    }],
    seller_status:0,
    imgStatus:0 //查看大图 关闭状态
  },
  updateUserInfo: function(t) {
    console.log(t), "getUserInfo:ok" == t.detail.errMsg && (this.setData({
      hydl: !1
    }), this.reload());
  },
  swiperChange: function(t) {
    this.setData({
      swiperCurrent: t.detail.current
    });
  },
  swiperChange1: function(t) {
    this.setData({
      swiperCurrent1: t.detail.current
    });
  },
  jumps: function(t) {
    var e = this,
      a = (t.currentTarget.dataset.name, t.currentTarget.dataset.appid),
      n = t.currentTarget.dataset.src,
      i = t.currentTarget.dataset.id,
      s = t.currentTarget.dataset.sjtype;
    console.log(i, s);
    var o = t.currentTarget.dataset.type;
    if (1 == o) {
      if (console.log(n), "../distribution/jrhhr" == n) return e.redinfo(), !1;
      if ("../store/store" == n) return wx.switchTab({
        url: "../store/store"
      }), !1;
      if ("../fabu/fabu/fabu" == n) return wx.switchTab({
        url: "../fabu/fabu/fabu"
      }), !1;
      if ("../logs/logs" == n) return wx.switchTab({
        url: "../logs/logs"
      }), !1;
      if ("../type/type" == n) return wx.switchTab({
        url: "../type/type"
      }), !1;
      wx.navigateTo({
        url: n,
        success: function(t) {
          e.setData({
            averdr: !0
          });
        },
        fail: function(t) {},
        complete: function(t) {}
      });
    } else 2 == o ? wx.navigateTo({
      url: "../car/car?vr=" + i + "&sjtype=" + s,
      success: function(t) {},
      fail: function(t) {},
      complete: function(t) {}
    }) : 3 == o && wx.navigateToMiniProgram({
      appId: a,
      path: "",
      extraData: {
        foo: "bar"
      },
      success: function(t) {
        e.setData({
          averdr: !0
        });
      }
    });
  },
  city_select: function(t) {
    wx.navigateTo({
      url: "city",
      success: function(t) {},
      fail: function(t) {},
      complete: function(t) {}
    });
  },
  delete: function(t) {
    this.setData({
      averdr: !0
    });
  },
  changeIndicatorDots: function(t) {
    this.setData({
      indicatorDots: !this.data.indicatorDots
    });
  },
  changeAutoplay: function(t) {
    this.setData({
      autoplay: !this.data.autoplay
    });
  },
  intervalChange: function(t) {
    this.setData({
      interval: t.detail.value
    });
  },
  durationChange: function(t) {
    this.setData({
      duration: t.detail.value
    });
  },
  settled: function(t) {
    wx.navigateTo({
      url: "../settled/settled"
    });
  },
  onLoad: function(t) {
    // console.log("onLoad");
    // console.log('page index onload',t);
    var e = decodeURIComponent(t.scene);
    // if (console.log("scene", e), "undefined" != e) var a = e;
    if (null != t.userid) {
      console.log("转发获取到的userid:", t.userid);
      a = t.userid;
    }
    // 这个a是个undefined，于是报错
    // console.log("fxzuid", a), this.setData({
    //   fxzuid: a
    // });
    var n = this;
    app.util.request({
      url: "entry/wxapp/System",
      cachetime: "0",
      success: function(t) {
        // 系统信息，后台页面统一配置
        console.log(t);
        wx.setNavigationBarTitle({
          title: t.data.pt_name
        }),
        wx.setStorageSync("color", t.data.color), wx.setNavigationBarColor({
          frontColor: "#ffffff",
          backgroundColor: wx.getStorageSync("color")
        }),
        1e4 < Number(t.data.total_num) && (t.data.total_num = (Number(t.data.total_num) / 1e4).toFixed(2) + "万"),
        // n就是此页面，197行声明了
        n.setData({
          System: t.data
        });
      }
    }),
    // 获取系统信息
    wx.getSystemInfo({
      success: function(t) {
        n.setData({
          windowHeight: t.windowHeight
        });
        // console.log(t);
      }
    });
    //url
    app.util.request({
      url: "entry/wxapp/Url2",
      cachetime: "0",
      success: function(t) {
        // console.log(t);
        wx.setStorageSync("url2", t.data);
      }
    });
    //流量主
    app.util.request({
      url: "entry/wxapp/Llz",
      cachetime: "0",
      data: {
        cityname: wx.getStorageSync("city"),
        type: 2
      },
      success: function(t) {
        // 没有数据
        // console.log(t);
        n.setData({
          unitid: t.data
        });
      }
    });
    app.util.request({
      url: "entry/wxapp/Url",
      cachetime: "0",
      success: function(t) {
        // console.log(t);
        wx.setStorageSync("url", t.data);
        n.setData({
          url: t.data
        });
      }
    });
    this.reload();
    // this.refresh();
  },
  reload: function(t) {
    var c = this,
        i = this.data.fxzuid;
    console.log('fxzuid',i);
    // 登录的连续操作，上面的i不知是做什么的
    wx.login({
      success: function(t) {
        console.log('reload里的login', t);
        // 获取login回调里的code的值
        var e = t.code;
        wx.setStorageSync("code", e);
        wx.getSetting({
          success: function(t) {
            console.log('获取用户的当前设置', t);
            // 授权了userInfo就请求用户信息
            t.authSetting["scope.userInfo"] ? wx.getUserInfo({
              success: function(t) {
                console.log('userinfo',t), wx.setStorageSync("user_info", t.userInfo);
                var a = t.userInfo.nickName,
                    n = t.userInfo.avatarUrl;
                app.util.request({
                  url: "entry/wxapp/openid",
                  cachetime: "0",
                  data: {
                    code: e
                  },
                  success: function(t) {
                    console.log('openid',t), wx.setStorageSync("key", t.data.session_key), wx.setStorageSync("openid", t.data.openid);
                    var e = t.data.openid;
                    app.util.request({
                      url: "entry/wxapp/Login",
                      cachetime: "0",
                      data: {
                        openid: e,
                        img: n,
                        name: a
                      },
                      success: function(t) {
                        console.log('登录',t), c.setData({
                            userinfo: t.data
                          }), wx.setStorageSync("users", t.data), wx.setStorageSync("uniacid", t.data.uniacid),
                          // i对应上面的fxzuid
                          null != i && app.util.request({
                            url: "entry/wxapp/Binding",
                            cachetime: "0",
                            data: {
                              fx_user: t.data.id,
                              user_id: i
                            },
                            success: function(t) {
                              console.log('绑定了什么东西',t);
                            }
                          });
                      }
                    });
                  }
                });
              }
            }) : (console.log("未授权过"), c.setData({
              hydl: !0
            }));
          }
        });
      }
    });
    // 获取位置
    wx.getLocation({
      type: "wgs84",
      success: function(t) {
        console.log('获取位置信息',t);
        wx.setStorageSync("Location", t);
        var e = t.latitude + "," + t.longitude;
        app.util.request({
          url: "entry/wxapp/map",
          cachetime: "0",
          data: {
            op: e
          },
          success: function(i) {
            //请求了地图信息
            console.log('获取地图信息',i);
            app.util.request({
              url: "entry/wxapp/System",
              cachetime: "0",
              success: function(t) {
                console.log('系统信息System',t);
                "1" == t.data.dw_more && c.setData({
                  dwcity: i.data.result.address_component.district
                }),
                "2" == t.data.dw_more && c.setData({
                  dwcity: i.data.result.address_component.city
                });
                // gd_key高德的秘钥
                var e = t.data.gd_key;
                "" == e && wx.showModal({
                  title: "配置提示",
                  content: "请在后台配置高德地图的key",
                  showCancel: !0,
                  cancelText: "取消",
                  confirmText: "确定",
                  success: function(t) {},
                  fail: function(t) {},
                  complete: function(t) {}
                });
                // 获取天气信息
                new(require("../amap-wx.js").AMapWX)({
                  key: e
                }).getWeather({
                  success: function(t) {
                    console.log('天气',t);
                    var e, a, n = t.liveData.city,
                        i = t.liveData.weather,
                        s = t.liveData.reporttime.slice(0, 10),
                        o = (0 == (e = new Date(s)).getDay() && (a = "星期日"),
                        1 == e.getDay() && (a = "星期一"), 2 == e.getDay() && (a = "星期二"), 3 == e.getDay() && (a = "星期三"),
                        4 == e.getDay() && (a = "星期四"), 5 == e.getDay() && (a = "星期五"), 6 == e.getDay() && (a = "星期六"),a),
                        r = t.temperature.data;
                    c.setData({
                      area: n,
                      reporttime: s,
                      weather: i,
                      w1: o,
                      temperature: r
                    });
                  },
                  fail: function(t) {
                    console.log('天气',t);
                  },
                });

                var a = ["最新公告"];
                "1" == t.data.is_sjrz && a.push("热门商家");
                "1" == t.data.is_pageopen && "1" == t.data.is_hyqx && a.push("黄页114");
                "1" == t.data.is_pcfw && "1" == t.data.is_pcqx && a.push("顺风车");
                "1" == t.data.is_hd && "1" == t.data.is_hdqx && a.push("活动报名");
                  console.log(a);
                  wx.setStorageSync("System", t.data);
                  1 == t.data.many_city ? (
                    wx.setStorageSync("city", t.data.cityname),
                    c.setData({
                      city: t.data.cityname
                    })
                  ) : (
                    console.log(wx.getStorageSync("city_type")), 
                    1 != wx.getStorageSync("city_type") ? (
                      wx.setStorageSync("city", c.data.dwcity),
                      c.setData({
                        city: c.data.dwcity
                      })
                    ) : (
                      c.setData({
                        city: wx.getStorageSync("city")
                      }), 
                      console.log("choosecity")
                    )
                  );
                var n = wx.getStorageSync("city");
                console.log('城市信息',n);
                //保存定位城市
                app.util.request({
                  url: "entry/wxapp/SaveHotCity",
                  cachetime: "0",
                  data: {
                    cityname: n,
                    user_id: wx.getStorageSync("users").id
                  },
                  success: function(t) {
                    console.log(t);
                  }
                });
                n = wx.getStorageSync("city");
                c.setData({
                  bkarr: a
                });
                c.refresh();
                c.seller();
              }
            });
          }
        });
      },
      fail: function(t) {
        wx.getSetting({
          success: function(t) {
            0 == t.authSetting["scope.userLocation"] && wx.openSetting({
              success: function(t) {}
            });
          }
        });
      }
    });
    //总浏览量
    app.util.request({
      url: "entry/wxapp/Views",
      cachetime: "0",
      success: function(t) {
        console.log('总浏览量',t);
        var e = t.data;
        "" == e ? e = 0 : 1e4 < Number(e) && (e = (Number(e) / 1e4).toFixed(2) + "万"), c.setData({
          views: e
        });
      }
    });
    //帖子总量
    app.util.request({
      url: "entry/wxapp/Num",
      cachetime: "0",
      success: function(t) {
        console.log('帖子总量',t);
        c.setData({
          Num: t.data
        });
      }
    });
  },
  refresh: function(t) {
    var o = this,
        e = wx.getStorageSync("city");
    //热门商家
    app.util.request({
      url: "entry/wxapp/RmStore",
      cachetime: "0",
      data: {
        cityname: e
      },
      success: function(t) {
        console.log('热门商家',t);
        t.data.length <= 5 ? o.setData({
          store: t.data
        }) : o.setData({
          store: t.data.slice(0, 6)
        });
      }
    });
    // 轮播图
    app.util.request({
      url: "entry/wxapp/Ad",
      cachetime: "0",
      data: {
        cityname: e
      },
      success: function(t) {
        console.log('轮播图',t);
        var e = [],
          a = [],
          n = [],
          i = [];
        for (var s in t.data) 1 == t.data[s].type && e.push(t.data[s]), 5 == t.data[s].type && a.push(t.data[s]),
          7 == t.data[s].type && n.push(t.data[s]), 10 == t.data[s].type && i.push(t.data[s]);
        o.setData({
          slide: e,
          advert: a,
          ggslide: n,
          zjggbk: i
        });
      }
    });
    //公告列表
    app.util.request({
      url: "entry/wxapp/news",
      cachetime: "0",
      data: {
        cityname: e
      },
      success: function(t) {
        console.log(11111111);
        console.log(t);
        var e = [];
        for (var a in t.data) 1 == t.data[a].type && e.push(t.data[a]);
        o.setData({
          msgList: e
        });
      }
    });
    //导航信息
    app.util.request({
      url: "entry/wxapp/GetNav",
      cachetime: "0",
      success: function(t) {
        console.log(t);
        var e = t.data;
        e.length <= 5 ? o.setData({
          height: 150
        }) : 5 < e.length && o.setData({
          height: 300
        });
        for (var a = [], n = 0, i = e.length; n < i; n += 10) a.push(e.slice(n, n + 10));
        o.setData({
          nav: a,
          navs: e
        });
      }
    });
  },
  sjbk: function() {
    var h = this,
        t = wx.getStorageSync("city");
    console.log("城市为" + t), console.log("page数量为" + h.data.page);
    var w = h.data.page,
        y = h.data.store1;
    // 商家列表
    app.util.request({
      url: "entry/wxapp/StoreList",
      cachetime: "0",
      data: {
        page: w,
        cityname: t
      },
      success: function(t) {
        if (console.log(t), 0 == t.data.length ? h.setData({
            refresh_top: !0
          }) : (h.setData({
            refresh_top: !1,
            page: w + 1,
            issljz: !0
          }), y = y.concat(t.data)), 0 < t.data.length) {
          for (var e = {}, a = [], n = 0, i = y.length; n < i; n++) e[y[n]] || (a.push(y[n]),
            e[y[n]] = !0);
          for (var s in t.data) {
            t.data[s].star = h.data.star1;
            t.data[s].star;
            t.data[s].score = Number(t.data[s].score);
            t.data[s].score;
            var o = t.data[s].coordinates.split(",");
            t.data[s].lat2 = Number(wx.getStorageSync("Location").latitude), t.data[s].lng2 = Number(wx.getStorageSync("Location").longitude);
            var r = Number(wx.getStorageSync("Location").latitude),
              c = Number(wx.getStorageSync("Location").longitude),
              l = o[0],
              u = o[1],
              d = r * Math.PI / 180,
              g = l * Math.PI / 180,
              p = d - g,
              f = c * Math.PI / 180 - u * Math.PI / 180,
              m = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(p / 2), 2) + Math.cos(d) * Math.cos(g) * Math.pow(Math.sin(f / 2), 2)));
            m *= 6378.137;
            m = (m = Math.round(1e4 * m) / 1e4).toFixed(2);
            t.data[s].distance = m;
          }
          h.setData({
            store1: y.sort(function(t, e) {
              return (t = Number(t.distance)) < (e = Number(e.distance)) ? -1 : e < t ? 1 : 0;
            })
          });
        } else h.setData({
          store1: y
        });
      }
    });
  },
  getMoreSeller:function(){
    var o = this, e = (o.data.index_class, wx.getStorageSync("city")), r = (wx.getStorageSync("index"), o.data.page), c = o.data.seller;
    var page = o.data.page;
    page++;
    //所有帖子列表
    app.util.request({
      url: "entry/wxapp/ListAnnouncementAll",
      cachetime: "0",
      data: {
        page:page,
        cityname: e
      },
      success: function (t) {
        console.log('最新公告分页：');
        console.log(e);
        console.log(t);
        for (var i = 0; i < t.data.length; i++) {
          if (t.data[i].img) {
            var img = t.data[i].img.split(",");
            t.data[i].img = img;
          }
        };
        var dataList = o.data.seller;
        for (var q = 0; q < t.data.length;q++){
          dataList.push(t.data[q]);
        }
        o.setData({ seller: dataList, page: page, seller_status: 1 });
        console.log(dataList);
      }
    });
  },
  seller: function(t) {
    var o = this,e = (o.data.index_class, wx.getStorageSync("city")),r = (wx.getStorageSync("index"),o.data.page),c = o.data.seller;
    console.log(e, o.data.page);
    var page = o.data.page;
    //所有帖子列表
    app.util.request({
      url: "entry/wxapp/ListAnnouncementAll",
      data: {
        page:page,
        cityname: e
      },
      success: function(t) {
        console.log('最新公告：');
        console.log(t);
        for(var i = 0;i < t.data.length ; i++){
          if (t.data[i].img){
            var img = t.data[i].img.split(",");
            t.data[i].img = img;
          }
        };
        var dataList = t.data;
        o.setData({ seller: dataList, page: page,seller_status:1 });
        console.log(o.data.seller);
      }
    });
  },
  hybk: function() {
    var g = this,
        t = (g.data.index_class, wx.getStorageSync("city")),
        p = (wx.getStorageSync("index"),
        g.data.page),
        f = g.data.yellow_list;
    console.log(t);
    // 黄页信息
    app.util.request({
      url: "entry/wxapp/YellowPageList",
      cachetime: "0",
      data: {
        page: p,
        cityname: t
      },
      success: function(t) {
        if (console.log(t), 0 == t.data.length ? g.setData({
            refresh_top: !0
          }) : (g.setData({
            refresh_top: !1,
            page: p + 1,
            issljz: !0
          }), f = f.concat(t.data)), 0 < t.data.length) {
          for (var e in f) {
            var a = f[e].coordinates.split(",");
            f[e].lat2 = Number(wx.getStorageSync("Location").latitude), f[e].lng2 = Number(wx.getStorageSync("Location").longitude);
            var n = Number(wx.getStorageSync("Location").latitude),
              i = Number(wx.getStorageSync("Location").longitude),
              s = a[0],
              o = a[1],
              r = n * Math.PI / 180,
              c = s * Math.PI / 180,
              l = r - c,
              u = i * Math.PI / 180 - o * Math.PI / 180,
              d = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(l / 2), 2) + Math.cos(r) * Math.cos(c) * Math.pow(Math.sin(u / 2), 2)));
            d *= 6378.137;
            d = (d = Math.round(1e4 * d) / 1e4).toFixed(2);
            f[e].distance = d;
          }
          g.setData({
            yellow_list: f.sort(function(t, e) {
              return (t = Number(t.distance)) < (e = Number(e.distance)) ? -1 : e < t ? 1 : 0;
            })
          });
        } else g.setData({
          yellow_list: f
        });
      }
    });
  },
  sfcbk: function() {
    var a = this,
      t = (a.data.index_class, wx.getStorageSync("city")),
      n = (wx.getStorageSync("index"),
        a.data.page),
      i = a.data.pc;
    console.log(t);
    //拼车列表
    app.util.request({
      url: "entry/wxapp/CarList",
      cachetime: "0",
      data: {
        page: n,
        cityname: t
      },
      success: function(t) {
        if (console.log(t), 0 == t.data.length ? a.setData({
            refresh_top: !0
          }) : (a.setData({
            refresh_top: !1,
            page: n + 1,
            issljz: !0
          }), i = i.concat(t.data)), 0 < t.data.length) {
          for (var e in t.data) t.data[e].tz.time = app.ormatDate(t.data[e].tz.time).slice(5, 16),
            t.data[e].tz.start_time1 = t.data[e].tz.start_time.slice(5, 10), t.data[e].tz.start_time2 = t.data[e].tz.start_time.slice(10, 17),
            2 == t.data[e].tz.is_open ? (t.data[e].tz.class2 = "car3", t.data[e].tz.class3 = "car4",
              t.data[e].tz.class4 = "car5") : (t.data[e].tz.class2 = "", t.data[e].tz.class3 = "",
              t.data[e].tz.class4 = ""), "人找车" == t.data[e].tz.typename ? (t.data[e].tz.class = "color1",
              t.data[e].tz.class1 = "car1") : "车找人" == t.data[e].tz.typename ? (t.data[e].tz.class = "color2",
              t.data[e].tz.class1 = "car2") : "货找车" == t.data[e].tz.typename ? (t.data[e].tz.class = "color1",
              t.data[e].tz.class1 = "car1") : "车找货" == t.data[e].tz.typename && (t.data[e].tz.class = "color2",
              t.data[e].tz.class1 = "car2");
          a.setData({
            pc: i
          });
        } else a.setData({
          pc: i
        });
      }
    });
  },
  hdbmbk: function(t) {
    var a = this,
      e = Data.formatTime(new Date()),
      n = Data.formatTime(new Date()).replace(/\//g, "-").toString();
    console.log(e, n);
    var i = wx.getStorageSync("city"),
      s = a.data.page,
      o = a.data.hdlist;
    console.log(i);
    //活动列表
    app.util.request({
      url: "entry/wxapp/Activity",
      cachetime: "0",
      data: {
        type_id: "",
        page: s,
        pagesize: 10,
        cityname: i
      },
      success: function(t) {
        console.log(t.data), 0 == t.data.length ? a.setData({
          refresh_top: !0
        }) : a.setData({
          refresh_top: !1,
          page: s + 1,
          issljz: !0
        }), o = function(t) {
          for (var e = [], a = 0; a < t.length; a++) - 1 == e.indexOf(t[a]) && e.push(t[a]);
          return e;
        }(o = o.concat(t.data)), console.log(o);
        for (var e = 0; e < o.length; e++) o[e].end_time > n ? o[e].isgq = 2 : o[e].isgq = 1;
        a.setData({
          hdlist: o
        });
      }
    });
  },
  bkswiperChange: function(t) {
    var e = this;
    console.log("===== swiperChange " + t.detail.current), e.setData({
      refresh_top: !1,
      activeIndex: t.detail.current
    });
    var a = e.data.bkarr[t.detail.current];
    console.log(a), "最新公告" == a && e.seller(), "热门商家" == a && e.sjbk(), "黄页114" == a && e.hybk(),
      "顺风车" == a && e.sfcbk();
  },
  commend: function(t) {
    var e = this;
    t.currentTarget.dataset.index;
    var a = t.currentTarget.id,
      n = t.currentTarget.dataset.name;
    wx.setStorageSync("index", a), console.log(n), e.setData({
        index_class: !0,
        activeIndex: t.currentTarget.dataset.index,
        toView: "a" + (t.currentTarget.dataset.index - 1),
        bkname: n,
        refresh_top: !1,
        swipecurrent: t.currentTarget.id,
        seller: [],
        store1: [],
        yellow_list: [],
        pc: [],
        hdlist: [],
        page: 1,
        issljz: !1
    }), "最新公告" == n && e.seller(), "热门商家" == n && e.sjbk(), "黄页114" == n && e.hybk(),
      "顺风车" == n && e.sfcbk(), "活动报名" == n && e.hdbmbk();
  },
  whole: function(t) {
    wx.removeStorage({
      key: "index",
      success: function(t) {}
    }), this.setData({
      page: 1,
      seller: [],
      index_class: !1
    }), this.seller();
  },
  bindinput: function(t) {
    var e = t.detail.value;
    "" != e && app.util.request({
      url: "entry/wxapp/list2",
      cachetime: "0",
      data: {
        keywords: e
      },
      success: function(t) {
        0 == t.data.length ? wx.showModal({
          title: "提示",
          content: "没有这个帖子",
          showCancel: !0,
          cancelText: "取消",
          confirmText: "确定",
          success: function(t) {},
          fail: function(t) {},
          complete: function(t) {}
        }) : wx.navigateTo({
          url: "../infodetial/infodetial?id=" + t.data[0].tz.id,
          success: function(t) {},
          fail: function(t) {},
          complete: function(t) {}
        });
      }
    });
  },
  ormatDate: function(t) {
    var e = new Date(1e3 * t);
    return e.getFullYear() + "-" + a(e.getMonth() + 1, 2) + "-" + a(e.getDate(), 2) + " " + a(e.getHours(), 2) + ":" + a(e.getMinutes(), 2) + ":" + a(e.getSeconds(), 2);

    function a(t, e) {
      for (var a = "" + t, n = a.length, i = "", s = e; s-- > n;) i += "0";
      return i + a;
    }
  },
  thumbs_up: function(t) {
    var a = this,
      n = a.data.seller,
      i = t.currentTarget.dataset.id,
      s = wx.getStorageSync("users").id,
      e = (Number(t.currentTarget.dataset.num),
        function(e) {
          n[e].tz.id == i && (n[e].thumbs_up = !0, app.util.request({
            url: "entry/wxapp/Like",
            cachetime: "0",
            data: {
              information_id: i,
              user_id: s
            },
            success: function(t) {
              1 != t.data ? wx.showModal({
                title: "提示",
                content: "不能重复点赞",
                showCancel: !0,
                cancelText: "取消",
                confirmText: "确认",
                success: function(t) {},
                fail: function(t) {},
                complete: function(t) {}
              }) : (n[e].tz.givelike = Number(n[e].tz.givelike) + 1, a.setData({
                seller: n
              }));
            }
          }));
        });
    for (var o in n) e(o);
  },
  previewImage: function(t) {
    console.log(t);
    var e = t.currentTarget.dataset.id,
      a = this.data.url,
      n = [],
      i = t.currentTarget.dataset.inde,
      s = this.data.seller;
    for (var o in s)
      if (s[o].tz.id == e) {
        var r = s[o].tz.img;
        for (var c in r) n.push(a + r[c]);
        wx.previewImage({
          current: a + r[i],
          urls: n
        });
      }
  },
  red: function(t) {
    wx.navigateTo({
      url: "../redbag/redbag",
      success: function(t) {},
      fail: function(t) {},
      complete: function(t) {}
    });
  },
  redinfo: function(t) {
    var e = wx.getStorageSync("users").id;
    app.util.request({
      url: "entry/wxapp/MyDistribution",
      cachetime: "0",
      data: {
        user_id: e
      },
      success: function(t) {
        console.log(t.data), "2" == t.data.state ? (console.log("是分销商"), wx.navigateTo({
          url: "../distribution/yaoqing"
        })) : "1" == t.data.state ? wx.showModal({
          title: "提示",
          content: "您的申请正在审核中，请耐心等待"
        }) : wx.navigateTo({
          url: "../distribution/jrhhr"
        });
      }
    });
  },
  yellow_page: function(t) {
    wx.reLaunch({
      url: "../yellow_page/yellow"
    });
  },
  post1: function(t) {
    wx.switchTab({
      url: "../fabu/fabu/fabu"
    });
  },
  store_info: function(t) {
    var e = t.currentTarget.id;
    wx.navigateTo({
      url: "../sellerinfo/sellerinfo?id=" + e,
      success: function(t) {},
      fail: function(t) {},
      complete: function(t) {}
    });
  },
  notice: function(t) {
    var e = t.currentTarget.dataset.id;
    wx.navigateTo({
      url: "../notice/notice?id=" + e,
      success: function(t) {},
      fail: function(t) {},
      complete: function(t) {}
    });
  },
  post: function(t) {
    wx,
    wx.reLaunch({
      url: "../shun/shun",
      success: function(t) {},
      fail: function(t) {},
      complete: function(t) {}
    });
  },
  phone: function(t) {
    var e = t.currentTarget.dataset.id;
    wx.makePhoneCall({
      phoneNumber: e
    });
  },
  more: function(t) {
    console.log(t), wx.switchTab({
      url: "../store/store"
    });
  },
  jump: function(t) {
    var e = t.currentTarget.dataset.id,
      a = t.currentTarget.dataset.name;
    wx.navigateTo({
      url: "../marry/marry?id=" + e + "&name=" + a,
      success: function(t) {},
      fail: function(t) {},
      complete: function(t) {}
    });
  },
  carinfo: function(t) {
    console.log(t);
    var e = t.currentTarget.dataset.id;
    wx.navigateTo({
      url: "../shun/shuninfo2/shuninfo2?id=" + e,
      success: function(t) {},
      fail: function(t) {},
      complete: function(t) {}
    });
  },
  yellow_info: function(t) {
    var e = t.currentTarget.dataset.id,
      a = t.currentTarget.dataset.user_id;
    console.log(a), wx.navigateTo({
      url: "../yellow_page/yellowinfo?id=" + e,
      success: function(t) {},
      fail: function(t) {},
      complete: function(t) {}
    });
  },
  store: function(t) {
    var e = t.currentTarget.dataset.id;
    wx.navigateTo({
      url: "../sellerinfo/sellerinfo?id=" + e,
      success: function(t) {},
      fail: function(t) {},
      complete: function(t) {}
    });
  },
  see: function(t) {
    this.data.seller;
    var e = t.currentTarget.dataset.id;
    wx.navigateTo({
      url: "../infodetial/infodetial?id=" + e,
      success: function(t) {},
      fail: function(t) {},
      complete: function(t) {}
    });
  },
  formid_one: function(t) {
    console.log("搜集第一个formid"), console.log(t), app.util.request({
      url: "entry/wxapp/SaveFormid",
      cachetime: "0",
      data: {
        user_id: wx.getStorageSync("users").id,
        form_id: t.detail.formId,
        openid: wx.getStorageSync("openid")
      },
      success: function(t) {}
    });
  },
  hddb: function() {
    wx.pageScrollTo({
      scrollTop: 0,
      duration: 300
    });
  },
  onReady: function() {
    this.setData({
      first: 1
    }), wx.removeStorageSync("city_type");
  },
  onShow: function() {
    var that = this;
    if (that.data.imgStatus==0){
      console.log('显示')
      that.setData({ page: 1 });
      that.seller();
    }else{
      that.setData({ imgStatus: 0 });
    }
  },
  onHide: function() {},
  onUnload: function() {
    wx.removeStorageSync("city_type");
  },
  onPullDownRefresh: function() {
    this.setData({
      page: 1,
      seller: [],
      activeIndex: 0,
      swipecurrent: 0,
      refresh_top: !1
    }), this.reload(), wx.stopPullDownRefresh();
  },
  onReachBottom: function() {
    var t = this,
      e = this.data.bkname;
    0 == this.data.refresh_top && this.data.issljz ? (console.log("上拉触底", e), "最新公告" == e && t.seller(),
      "热门商家" == e && t.sjbk(), "黄页114" == e && t.hybk(), "顺风车" == e && t.sfcbk(), "活动报名" == e && t.hdbmbk()) : console.log("dobutno");
  },
  onShareAppMessage: function() {
    var t = this.data.System.zf_title;
    return "" == t && (t = this.data.System.pt_name), console.log(t), {
      title: t,
      path: "/zh_tcwq/pages/index/index",
      success: function(t) {},
      fail: function(t) {}
    };
  },
  // 公告列表 查看大图
  previewImageSeller: function (t) {
    var that = this;
    for (var i = 0; i < t.currentTarget.dataset.current.length; i++) {
      var q = that.data.url + t.currentTarget.dataset.current[i];
      t.currentTarget.dataset.current[i] = q;
    }
    var u = t.currentTarget.dataset.current;
    var c = t.currentTarget.dataset.urls;
    wx.previewImage({
      current: c,
      urls: u,
      success: function (e) { 
        that.setData({ imgStatus : 1});
      },
      fail: function (e) { },
      complete: function (e) { }
    });
  },
});