// zh_tcwq/pages/redbag/notice.js

var app = getApp()

Page({
  /* 页面的初始数据 */
  data: {
    seller: [],
    url: '',
    user_id:'',
    store_id:'',
    cityname:''
  },

  /* 生命周期函数--监听页面加载 */
  onLoad: function (options) {
    var that = this;
    that.setData({
      user_id: options.user_id,
      store_id: options.store_id,
      cityname: options.cityname
    });
    console.log(options);
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
  add: function (e) {
    wx.redirectTo({
      url: "../redbag/add?user_id=" + this.data.user_id + "&store_id=" + this.data.store_id + "&cityname=" + this.data.cityname,
      success: function (e) { },
      fail: function (e) { },
      complete: function (e) { }
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
  // 删除 公告
  delSeller:function(e){
    var that = this;
    console.log(e);
    var id = e.currentTarget.dataset.id;
    wx.showModal({
      title: '提示',
      content: '确定要删除该公告？',
      success: function (res) {
        if (res.cancel) {
          //点击取消,默认隐藏弹框
          
        } else {
          //点击确定
          console.log(1);
          app.util.request({
            url: "entry/wxapp/DelAnnouncement",
            data: {
              id: id
            },
            success: function (t) {
              console.log(t);
              that.seller();
            }
          });
        }
      }
    })
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
  },
})