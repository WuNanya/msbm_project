// pages/actvlog/actvlog.js
const app = getApp();
Page({
 
  /**
   * 页面的初始数据
   */
  data: {
    act_mess:[
      
    ],
    activity_detail:[

    ],
  },
  toDetail:function(e){
    var activity_id = e.currentTarget.dataset.value;
    console.log("查看详情" + e.currentTarget.dataset.value)
    app.globalData.activity_id = activity_id;
    console.log(app.globalData.activity_id)
    wx.request({
      url: 'https://www.ifeels.cn/msbme-activity/',
      data:{
        activity_id:app.globalData.activity_id,
      },
      header:{
        'content-type': 'application/json' //默认值
      },
      success:function(res){
        console.log(res)
        if(res.data.effective == 1){
          wx.navigateTo({
            url: '../activity_details/activity_details',
          })
        }
        if(res.data.effective == 0){
          wx.showToast({
            title: '该活动已取消，请联系发起人',
            icon: 'none',
            duration: 2000
          })
        }
      }
    })
  },

  
  /**
   * 生命周期函数--监听页面加载
   */
  
  onLoad: function (options) {
    var that = this;
    wx.showLoading({
      title: '加载中',
    })
    console.log(app.globalData.openid)
    wx.request({
      url: 'https://www.ifeels.cn/msbmmyactivity/',           //接口4 获取我报名的活动
      data:{
        openid:app.globalData.openid
      },
      header:{
        'content-type': 'application/json' //默认值
      },
      success:function(res){
        wx.hideLoading()
        if(res.statusCode == '200')
        {
          console.log(res.data)
          that.setData({
            act_mess:res.data,               //返回值类型未确定
          })
          if(res.data == ""){
            wx.showToast({
              title: '暂无活动',
              icon: 'none',
              duration: 2000
            })
          }
        }
        else{
          console.log(res.statusCode)
        }
      },
      fail(res){
        console.log(res)
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