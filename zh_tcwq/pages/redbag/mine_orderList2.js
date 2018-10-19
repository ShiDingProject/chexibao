var app = getApp();

Page({
  data: {
    user_id: '',
    orderList: []
  },

  onLoad: function (e) {
    var that = this;
    app.util.request({// 获取 预约 列表
      url: "entry/wxapp/StoreSubscribeList",
      data: { store_id: e.store_id, state:2 },
      success: function (t) {
        console.log('预约', t);
        that.setData({ orderList: t.data });
      }
    });
  },
});