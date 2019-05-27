// pages/actvlog/actvlog.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    act_mess: [{
        activity_name: '',
        activity_start_time: '',
        activity_end_time: '',
        activity_unit: '',
        activity_id: '',
        activity_count: '',
        activity_max: ''
      },
    ],
  },
  toDetail: function(e) {
    var activity_id = e.currentTarget.dataset.value;
    console.log("查看详情" + e.currentTarget.dataset.value)
    app.globalData.activity_id = activity_id;
    console.log(app.globalData.activity_id)
    wx.navigateTo({
      url: '../Activity_list/Activity_list',        
    })
  },
  getqrCode: function (e) {                                //新增功能，查看已发布活动二维码
    var activity_id = e.currentTarget.dataset.value;
    console.log("获取二维码" + e.currentTarget.dataset.value)
    app.globalData.activity_id = activity_id;
    console.log(app.globalData.activity_id)
    app.globalData.img = "https://www.ifeels.cn/msbm/static/qrimg/" + activity_id + ".jpg"
    wx.navigateTo({
      url: '../QRCODE/QRCODE',
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */

  onLoad: function(options) {
    var that = this;
    wx.showLoading({
      title: '加载中',
    })
    console.log(app.globalData.openid)
    wx.request({
      url: 'https://www.ifeels.cn/msbmmycreate/', //接口2 获取我创建的活动
      data: {
        openid: app.globalData.openid
      },
      header: {
        'content-type': 'application/json' //默认值
      },
      success: function(res) {
        wx.hideLoading();
        console.log(res.data)
        if (res.statusCode == '200') {
          var temp = res.data;
          that.setData({
            act_mess:temp
          })
          if (res.data == "") {
            wx.showToast({
              title: '暂无活动',
              icon: 'none',
              duration: 2000
            })
          }
        } else {
          console.log(res.statusCode)
        }
      },
      fail(res) {
        console.log(res)
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})