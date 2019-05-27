// pages/二维码/二维码.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    img:'',//图片url
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log(app.globalData.img)
    this.setData({
      img:app.globalData.img,
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

  },
  /*saveImg:function(){
    var that = this;
    wx.getSetting({
      success(res) {
        console.log(res)
        if (!res.authSetting['scope.writePhotosAlbum']) {
          wx.openSetting({
            success(res) {
              //拒绝授权后重新提示授权，并授权成功
            }
          })
        } else {
          wx.saveImageToPhotosAlbum({
            filePath: that.data.img,
            success(result) {
              console.log("保存成功" + result.path)
              //已授权过可直接执行保存图片
            },
            fail(res){
              console.log("保存失败" + res)
            }
          })
        }
      }
    })
  }*/
  saveImg: function() {
    var that = this;
    wx.authorize({
      scope: 'scope.writePhotosAlbum',
      success() {
        console.log("正在保存"),
          wx.downloadFile({
            url: that.data.img,
            success: function(res) {
              let path = res.tempFilePath
              wx.saveImageToPhotosAlbum({
                filePath: path,
                success(res) {
                  console.log(res)
                },
                fail(res) {
                  console.log(res)
                },
              })
            },
            fail: function(res) {
              console.log(res)
            }
          })
      }
    })
  }
})