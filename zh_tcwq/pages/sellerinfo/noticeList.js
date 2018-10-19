// zh_tcwq/pages/sellerinfo/noticeList.js
var app = getApp()

Page({

  /* 页面的初始数据 */
  data: {
    seller: [],
    url:'',
    store_id:''
  },
  /* 生命周期函数--监听页面加载 */
  onLoad: function (options) {
    console.log(options);
    var that = this;
    that.setData({ store_id: options.store_id });
    app.util.request({
      url: "entry/wxapp/Url",
      success: function (t) {
        console.log(t);
        wx.setStorageSync("url", t.data), that.setData({
          url: t.data
        });
        that.seller();
      }
    });
  },
  // 获取 公告 列表
  seller: function (t) {
    var that = this;
    console.log(that.data.store_id);
    app.util.request({
      url: "entry/wxapp/ListAnnouncement",
      data: {
        store_id: that.data.store_id
      },
      success: function (t) {
        console.log('最新公告：');
        console.log(t);
        for (var i = 0; i < t.data.length; i++) {
          if (t.data[i].img) {
            var img = t.data[i].img.split(",");
            t.data[i].img = img;
          }
        };
        var dataList = t.data;
        that.setData({ seller: dataList });
        console.log(that.data.seller);
      }
    });
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
      urls: u
    });
  }

})