// pages/mine/mine.js
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

  },
  myTable:function(event){
    if (app.globalData.openid) {    //是否登录
      console.log(app.globalData.openid)
      wx.navigateTo({
        url: '../actvlog2/actvlog2',      //我创建的活动
      })
    } else {                      //没有登录，跳转登录
      app.login();
    }
  },
  record:function(event){             //我参加的
    if (app.globalData.openid) {    //是否登录
      console.log(app.globalData.openid)
      wx.navigateTo({
        url: '../actvlog/actvlog',        //我报名的活动
      })
    } else {                      //没有登录，跳转登录
      app.login();
    }
  },
  editUserInfo:function(){
    if (app.globalData.openid) {    //是否登录
      console.log(app.globalData.openid)
      wx.navigateTo({
        url: '../EditMes/EditMes',      //编辑个人信息
      })
    } else {                      //没有登录，跳转登录
      app.login();
    } 
  },
  user_option:function(){
    wx.navigateTo({
      url: '../user_option/user_option',
    })
  }
})