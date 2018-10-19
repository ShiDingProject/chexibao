var app = getApp();

Page({
    data: {
      url:'',
      user_id: wx.getStorageSync("users").id,
      orderList:[]
    },
    onLoad: function(t) {
      var that = this;
      var  a = wx.getStorageSync("url");
      that.setData({ url: a }),
      that.getOrderList();
    },
    getOrderList:function(){
      var that = this;
      app.util.request({// 获取 预约 列表
        url: "entry/wxapp/SubscribeList",
        data: { user_id: that.data.user_id},
        success: function (t) {
          console.log('预约',t);
          that.setData({ orderList: t.data});
        }
      });
    }
   
});