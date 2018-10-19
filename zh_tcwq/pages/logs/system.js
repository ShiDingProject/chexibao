var app = getApp();

Page({
    data: {},
    onLoad: function(o) {
        wx.setNavigationBarColor({
            frontColor: "#ffffff",
            backgroundColor: wx.getStorageSync("color")
        });
        var n = wx.getStorageSync("System");
        console.log(n), "1" == o.isbz ? (wx.setNavigationBarTitle({
            title: o.title
        }), this.setData({
            node: wx.getStorageSync("bzinfo")
        })) : this.setData({
            node: n.details
        });
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {
        wx.removeStorageSync("bzinfo");
    },
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {}
});