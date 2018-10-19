var app = getApp(), _imgArray = [];

Page({
  data: {
    stick_none: !1,
    checked: !1,
    num: 1,
    disabled: !1,
    money1: 0,
    countries: ["本地", "全国"],
    countryIndex: 0,

    url: '',//链接

    imgArray1:[],//上传图片
    cityname:'',//城市名称
    user_id: '',//用户id
    store_id: '',//商家id
    content:''//公告内容
  },
  onLoad: function (options) {
    var that = this;
    console.log(options);
    that.setData({
      user_id: options.user_id,
      store_id: options.store_id,
      cityname: options.cityname
    });
    this.setData({ url: wx.getStorageSync("url2"), url1: wx.getStorageSync("url")});
    console.log(wx.getStorageSync("uniacid"));
  },
  imgArray1: function (e) {
    var a = this, n = wx.getStorageSync("uniacid"), t = 4 - _imgArray.length;
    0 < t && t <= 4 ? wx.chooseImage({
      count: t,
      sizeType: ["compressed"],
      sourceType: ["album", "camera"],
      success: function (e) {
        wx.showToast({
          icon: "loading",
          title: "正在上传"
        });
        var t = e.tempFilePaths;
        a.uploadimg({
          url: a.data.url + "app/index.php?i=" + n + "&c=entry&a=wxapp&do=Upload&m=zh_tcwq",
          path: t
        });
        console.log(a.data.url + "app/index.php?i=" + n + "&c=entry&a=wxapp&do=Upload&m=zh_tcwq");
      }
    }) : wx.showModal({
      title: "上传提示",
      content: "最多上传 4 张图片",
      showCancel: !0,
      cancelText: "取消",
      confirmText: "确定",
      success: function (e) { },
      fail: function (e) { },
      complete: function (e) { }
    });
  },
  uploadimg: function (e) {
    var t = this, a = e.i ? e.i : 0, n = e.success ? e.success : 0, i = e.fail ? e.fail : 0;
    wx.uploadFile({
      url: e.url,
      filePath: e.path[a],
      name: "upfile",
      formData: null,
      success: function (e) {
        // console.log('期待着你的回来，我的小宝贝')
        console.log(e), "" != e.data ? (n++ , _imgArray.push(e.data), t.setData({
          imgArray1: _imgArray
        })) : wx.showToast({
          icon: "loading",
          title: "请重试"
        });
        console.log(t.data.imgArray1);
      },
      fail: function (e) {
        i++;
      },
      complete: function () {
        ++a == e.path.length ? (t.setData({
          images: e.path
        }), wx.hideToast()) : (e.i = a, e.success = n, e.fail = i, t.uploadimg(e));
      }
    });
  },
  delete: function (e) {
    Array.prototype.indexOf = function (e) {
      for (var t = 0; t < this.length; t++) if (this[t] == e) return t;
      return -1;
    }, Array.prototype.remove = function (e) {
      var t = this.indexOf(e);
      -1 < t && this.splice(t, 1);
    };
    var t = e.currentTarget.dataset.inde;
    _imgArray.remove(_imgArray[t]), this.setData({
      imgArray1: _imgArray
    });
  },
  formSubmit: function (e) {},
  // 文本框 鼠标 抬起事件
  getContent:function(e){
    var that = this;
    that.setData({
      content: e.detail.value
    })
    console.log(e.detail.value);
  },
  // 提交表单
  addForm:function(){
    var that = this;
    if (that.data.content==""){
      wx.showToast({
        title: '内容描述不能为空',  //标题
        icon:'none',
        duration: 2000, //提示的延迟时间，单位毫秒，默认：1500
      })
    }else{
      var img = '';
      if (that.data.imgArray1.length > 0) {
        for (var i = 0; i < that.data.imgArray1.length; i++) {
          if (i == that.data.imgArray1.length - 1) {
            img += that.data.imgArray1[i];
          } else {
            img += that.data.imgArray1[i] + ',';
          }
        }
      }
      var list = {
        store_id: that.data.store_id,
        user_id: that.data.user_id,
        content: that.data.content,
        img: img,
        city_name: that.data.cityname
      }
      console.log(list);
      // 发布
      app.util.request({
        url: "entry/wxapp/PostAnnouncement",
        data:list,
        success: function (e) {
          console.log(e);
          if(e.data){
            _imgArray = [];
            wx.redirectTo({
              url: "../redbag/notice?user_id=" + that.data.user_id + "&store_id=" + that.data.store_id + "&cityname=" + that.data.cityname,
            });
          }else{
            wx.showToast({
              title: '发布失败',  //标题
              icon: 'none',
              duration: 2000, //提示的延迟时间，单位毫秒，默认：1500
            });
          };
        }
      });
    }
  },
  onUnload: function () {
    console.log(this.data), _imgArray.splice(0, _imgArray.length);
  },
  // 公告列表 查看大图
  previewImageSeller: function (t) {
    var that = this;
    for (var i = 0; i < t.currentTarget.dataset.current.length; i++) {
      var q = that.data.url1 + t.currentTarget.dataset.current[i];
      t.currentTarget.dataset.current[i] = q;
    }
    var u = t.currentTarget.dataset.current;
    var c = t.currentTarget.dataset.urls;
    wx.previewImage({
      current: c,
      urls: u
    });
  },
});