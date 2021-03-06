var app = getApp();

Page({
    data: {
        luntext: [ "新入", "附近", "热门" ],
        activeIndex: 0,
        refresh_top: !1,
        storelist: [],
        page: 1,
        typeid: "",
        infortype: [ {
            id: 0,
            name: "全部"
        } ],
        scactiveIndex: 0,
        districtList: [],
        sortingList: [ "新入", "附近", "热门" ],
        typeList: [ {
            id: 0,
            name: "全部"
        } ],
        districtChioceIcon: "../image/icon-go-black.png",
        sortingChioceIcon: "../image/icon-go-black.png",
        chioceDistrict: !1,
        chioceSorting: !1,
        chioceFilter: !1,
        activeDistrictParentIndex: -1,
        activeDistrictChildrenIndex: -1,
        scrollTop: 0,
        scrollIntoView: 0,
        activeTypeIndex: 0,
        activeSortingIndex: 0,
        activeTypeIndexname: "选择分类",
        activeSortingIndexname: "选择排序",
        borbtm: 2
    },
    hideAllChioce: function() {
        this.setData({
            districtChioceIcon: "../image/icon-go-black.png",
            sortingChioceIcon: "../image/icon-go-black.png",
            chioceDistrict: !1,
            chioceSorting: !1,
            chioceFilter: !1
        });
    },
    choiceItem: function(t) {
        switch (this.setData({
            borbtm: t.currentTarget.dataset.item
        }), t.currentTarget.dataset.item) {
          case "1":
            this.data.chioceDistrict ? this.setData({
                districtChioceIcon: "../image/icon-go-black.png",
                sortingChioceIcon: "../image/icon-go-black.png",
                chioceDistrict: !1,
                chioceSorting: !1,
                chioceFilter: !1
            }) : this.setData({
                districtChioceIcon: "../image/icon-down-black.png",
                sortingChioceIcon: "../image/icon-go-black.png",
                chioceDistrict: !0,
                chioceSorting: !1,
                chioceFilter: !1
            });
            break;

          case "2":
            this.data.chioceSorting ? this.setData({
                districtChioceIcon: "../image/icon-go-black.png",
                sortingChioceIcon: "../image/icon-go-black.png",
                chioceDistrict: !1,
                chioceSorting: !1,
                chioceFilter: !1
            }) : this.setData({
                districtChioceIcon: "../image/icon-go-black.png",
                sortingChioceIcon: "../image/icon-down-black.png",
                chioceDistrict: !1,
                chioceSorting: !0,
                chioceFilter: !1
            });
            break;

          case "3":
            this.data.chioceFilter ? this.setData({
                districtChioceIcon: "../image/icon-go-black.png",
                sortingChioceIcon: "/images/icon-go-black.png",
                chioceDistrict: !1,
                chioceSorting: !1,
                chioceFilter: !1
            }) : this.setData({
                districtChioceIcon: "../image/icon-go-black.png",
                sortingChioceIcon: "../image/icon-go-black.png",
                chioceDistrict: !1,
                chioceSorting: !1,
                chioceFilter: !0
            });
        }
    },
    selectDistrictParent: function(t) {
        this.setData({
            activeDistrictParentIndex: t.currentTarget.dataset.index,
            activeDistrictName: this.data.districtList[t.currentTarget.dataset.index].district_name,
            activeDistrictChildrenIndex: 0,
            scrollTop: 0,
            scrollIntoView: 0
        });
    },
    selectDistrictChildren: function(t) {
        var e = t.currentTarget.dataset.index, i = -1 == this.data.activeDistrictParentIndex ? 0 : this.data.activeDistrictParentIndex;
        0 == e ? this.setData({
            activeDistrictName: this.data.districtList[i].district_name
        }) : this.setData({
            activeDistrictName: this.data.districtList[i].district_children_list[e].district_name
        }), this.setData({
            districtChioceIcon: "../image/icon-go-black.png",
            chioceDistrict: !1,
            activeDistrictChildrenIndex: e,
            productList: [],
            pageIndex: 1,
            loadOver: !1,
            isLoading: !0
        });
    },
    selectType: function(t) {
        var e = this, i = this, a = wx.getStorageSync("city");
        if (console.log(t.currentTarget.id, t.currentTarget.dataset.index), 0 == t.currentTarget.dataset.index) var c = "", o = i.data.id, n = 1; else c = t.currentTarget.id, 
        o = t.currentTarget.id, n = 2;
        var r = t.currentTarget.dataset.index;
        this.setData({
            page: 1,
            refresh_top: !1,
            storelist: [],
            fjstorelist: [],
            typeid: c,
            sortingChioceIcon: "../image/icon-go-black.png",
            chioceSorting: !1,
            activeTypeIndex: r,
            activeSortingIndex: 0,
            activeTypeIndexname: i.data.typeList[r].name
        }), console.log(o, a, n), app.util.request({
            url: "entry/wxapp/StoreTypeAd",
            cachetime: "0",
            data: {
                type_id: o,
                cityname: a,
                type: n
            },
            success: function(t) {
                console.log(t.data), i.setData({
                    slide: t.data
                });
            }
        }), setTimeout(function() {
            e.refresh();
        }, 100);
    },
    selectSorting: function(t) {
        console.log(t.currentTarget.dataset.index);
        var e = t.currentTarget.dataset.index;
        console.log(this.data, e);
        var i = this.data.fjstorelist;
        if (0 == e) ; else if (1 == e) {
            var a = i.sort(function(t, e) {
                return (t = Number(t.distance)) < (e = Number(e.distance)) ? -1 : e < t ? 1 : 0;
            });
            console.log(a), this.setData({
                store1: a
            });
        } else if (2 == e) {
            var c = i.sort(function(t, e) {
                t = Number(t.views);
                return (e = Number(e.views)) < t ? -1 : t < e ? 1 : 0;
            });
            console.log(c), this.setData({
                store2: c
            });
        }
        this.setData({
            sortingChioceIcon: "../image/icon-go-black.png",
            chioceDistrict: !1,
            activeSortingIndex: e,
            activeSortingIndexname: this.data.sortingList[e]
        });
    },
    tabClick: function(t) {
        var e = t.currentTarget.id;
        console.log(this.data, e);
        var i = this.data.fjstorelist;
        if (0 == e) ; else if (1 == e) {
            var a = i.sort(function(t, e) {
                return (t = Number(t.distance)) < (e = Number(e.distance)) ? -1 : e < t ? 1 : 0;
            });
            console.log(a), this.setData({
                store1: a
            });
        } else if (2 == e) {
            var c = i.sort(function(t, e) {
                t = Number(t.score);
                return (e = Number(e.score)) < t ? -1 : t < e ? 1 : 0;
            });
            console.log(c), this.setData({
                store2: c
            });
        }
        this.setData({
            activeIndex: t.currentTarget.id
        });
    },
    onLoad: function(t) {
        console.log(t), t.typename && wx.setNavigationBarTitle({
            title: t.typename
        });
        var i = this;
        wx.setNavigationBarColor({
            frontColor: "#ffffff",
            backgroundColor: wx.getStorageSync("color")
        });
        var e = wx.getStorageSync("url"), a = wx.getStorageSync("city");
        i.setData({
            url: e,
            id: t.id,
            System: wx.getStorageSync("System")
        }), app.util.request({
            url: "entry/wxapp/StoreTypeAd",
            cachetime: "0",
            data: {
                type_id: t.id,
                cityname: a,
                type: 1
            },
            success: function(t) {
                console.log(t.data), i.setData({
                    slide: t.data
                });
            }
        }), app.util.request({
            url: "entry/wxapp/StoreType2",
            cachetime: "0",
            data: {
                type_id: t.id
            },
            success: function(t) {
                console.log(t, i.data.infortype);
                var e = i.data.typeList.concat(t.data);
                console.log(e), i.setData({
                    typeList: e
                });
            }
        }), i.refresh();
    },
    jumps: function(t) {
        var e = this, i = (t.currentTarget.dataset.name, t.currentTarget.dataset.appid), a = t.currentTarget.dataset.src, c = t.currentTarget.dataset.id, o = t.currentTarget.dataset.sjtype;
        console.log(c);
        var n = t.currentTarget.dataset.type;
        if (1 == n) {
            if (console.log(a), "../distribution/jrhhr" == a) return !1;
            wx.navigateTo({
                url: a,
                success: function(t) {
                    e.setData({
                        averdr: !0
                    });
                },
                fail: function(t) {},
                complete: function(t) {}
            });
        } else 2 == n ? wx.navigateTo({
            url: "../car/car?vr=" + c + "&sjtype=" + o,
            success: function(t) {},
            fail: function(t) {},
            complete: function(t) {}
        }) : 3 == n && wx.navigateToMiniProgram({
            appId: i,
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
    refresh: function(t) {
        var h = this, e = h.data.id, i = h.data.typeid, u = h.data.page, p = h.data.storelist, a = wx.getStorageSync("city");
        console.log("城市为" + a), console.log(e, i, p, u), app.util.request({
            url: "entry/wxapp/StoreList",
            cachetime: "0",
            data: {
                storetype_id: e,
                storetype2_id: i,
                page: u,
                pagesize: 10,
                cityname: a
            },
            success: function(t) {
                for (var e in h.setData({
                    page: u + 1
                }), console.log(t), t.data.length < 10 ? h.setData({
                    refresh_top: !0
                }) : h.setData({
                    refresh_top: !1
                }), t.data) {
                    var i = t.data[e].coordinates.split(",");
                    t.data[e].lat2 = Number(wx.getStorageSync("Location").latitude), t.data[e].lng2 = Number(wx.getStorageSync("Location").longitude);
                    var a = Number(wx.getStorageSync("Location").latitude), c = Number(wx.getStorageSync("Location").longitude), o = i[0], n = i[1], r = a * Math.PI / 180, s = o * Math.PI / 180, g = r - s, d = c * Math.PI / 180 - n * Math.PI / 180, l = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(g / 2), 2) + Math.cos(r) * Math.cos(s) * Math.pow(Math.sin(d / 2), 2)));
                    l *= 6378.137;
                    l = (l = Math.round(1e4 * l) / 1e4).toFixed(2);
                    t.data[e].distance = l;
                }
                p = p.concat(t.data), h.setData({
                    store: p,
                    storelist: p,
                    fjstorelist: p
                });
            }
        });
    },
    store: function(t) {
        console.log(t);
        var e = t.currentTarget.dataset.id;
        wx.navigateTo({
            url: "../sellerinfo/sellerinfo?id=" + e,
            success: function(t) {},
            fail: function(t) {},
            complete: function(t) {}
        });
    },
    phone: function(t) {
        console.log(t);
        var e = t.currentTarget.dataset.tel;
        wx.makePhoneCall({
            phoneNumber: e
        });
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {
        this.setData({
            activeIndex: 0,
            refresh_top: !1,
            storelist: [],
            page: 1
        }), this.refresh(), wx.stopPullDownRefresh();
    },
    onReachBottom: function() {
        console.log("上拉加载", this.data.page), 0 == this.data.refresh_top && this.refresh();
    },
    onShareAppMessage: function() {}
});