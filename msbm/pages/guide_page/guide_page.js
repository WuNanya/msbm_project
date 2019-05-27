// pages/guide_page/guide_page.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },


  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.getStorage({ //首次加载小程序，判断是否授权过或权限是否过期，从本地缓存获取已经加载的openid
      key: 'userId',
      success: function (res) {
        if (res.data == "") {
          app.login();
          setTimeout(function () {
            wx.redirectTo({
              url: '../index2/index2'
            })
          }, 1500)
        } else {
          var app = getApp();
          app.globalData.openid = res.data
          console.log("全局openid" + app.globalData.openid)
          wx.switchTab({
            url: '../index2/index2',
          })
        }
      },
      fail: function () {
        app.login();
        setTimeout(function () {
          wx.redirectTo({
            url: '../index2/index2'
          })
        }, 1500)
      }
    })
    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})