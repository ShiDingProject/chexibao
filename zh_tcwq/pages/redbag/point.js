var app = getApp()
Page({
  /* 页面的初始数据 */
  data: {
    pay_integral:'', //支付积分
    store_id:'', //商家ID
    user_id:'', //用户ID
    oldPay_integral: '' //原始支付积分
  },
  /* 生命周期函数--监听页面加载 */
  onLoad: function (options) {
    var that = this;
    console.log(options);
    that.setData({
      pay_integral: options.pay_integral,
      oldPay_integral: options.pay_integral,
      store_id: options.store_id,
      user_id: options.user_id
    });
  },
  // 文本框 鼠标 抬起事件
  getPay_integral: function (e) {
    var that = this;
    that.setData({
      pay_integral: e.detail.value
    })
    console.log(e.detail.value);
  },
  changePoint:function(){
    var that = this;
    console.log(that.data);
    if (that.data.pay_integral == that.data.oldPay_integral){
      wx.navigateBack({
        delta: 1
      });
      // wx.redirectTo({
      //   url: "../redbag/merchant?id=" + that.data.store_id
      // });
    }else{
      if (that.data.pay_integral) {
        app.util.request({
          url: "entry/wxapp/PayIntegral",
          data: {
            pay_integral: that.data.pay_integral,
            store_id: that.data.store_id
          },
          success: function (e) {
            console.log(that.data.store_id);
            if (e.data == 1) {
              wx.navigateBack({
                delta: 1
              });
              // wx.redirectTo({
              //   url: "../redbag/merchant?id=" + that.data.store_id
              // });
            } else {
              wx.showToast({
                title: '保存失败',  //标题
                icon: 'none',
                duration: 2000, //提示的延迟时间，单位毫秒，默认：1500
              })
            }
          }
        })
      } else {
        wx.showToast({
          title: '积分数量不能为空',  //标题
          icon: 'none',
          duration: 2000, //提示的延迟时间，单位毫秒，默认：1500
        })
      }
    }
    
  }
})