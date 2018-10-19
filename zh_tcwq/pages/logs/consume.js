var app = getApp();
Page({
  data: {
    url: '',
    user_id: wx.getStorageSync("users").id,
    consumeList: []
  },
  onLoad: function (t) {
    var that = this;
    var a = wx.getStorageSync("url");
    that.setData({ url: a }),
    that.getConsumeList();
  },
  getConsumeList: function () {
    var that = this;
    console.log(that.data.user_id);
    app.util.request({// 获取 消费 列表
      url: "entry/wxapp/UserPayLog",
      data: { user_id: that.data.user_id },
      success: function (t) {
        console.log('消费', t);
        that.setData({ consumeList: t.data });
      }
    });
  }
})