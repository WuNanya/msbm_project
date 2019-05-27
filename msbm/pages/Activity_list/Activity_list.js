// pages/Activity_list/Activity_list.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tempFilePath:'',
    act_mess: [
    ],
  },
  cancel:function(res){
    wx.showModal({
      title: '提示',
      content: '确认取消活动？',
      success(res) {
        if (res.confirm) {
          wx.request({
            url: 'https://www.ifeels.cn/msbmcancel1/',
            data:{
              activity_id:app.globalData.activity_id
            },
            header:{
              'content-type': 'application/json' // 默认值
            },
            success:function(res){
              if(res.statusCode == 200){
                wx.showToast({
                  title: '取消成功',
                  icon: 'success',
                  duration: 2000
                })
                wx.switchTab({
                  url: '../mine/mine'
                })
              }
            }
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },
  download:function(e){
    var that = this;
    /*wx.request({
      url: 'http://www.ifeels.cn:35558/down/',       //接口 下载Excel
      data:{
        activity_id:app.globalData.activity_id,
      },
      header:{
        'content-type': 'application/json' // 默认值
      },
      success:function(res){
        if(res.statusCode == 200){
          that.setData({
            tempFilePath: res.data.excel_file,      //文件临时路径保存
          })
          console.log(res.data)
        }
        else{
          console.log(res.statusCode)
        }
      },
      fail(res){
        console.log(res)
      }
    })*/
    console.log(app.globalData.activity_id)
    wx.downloadFile({
      url: 'https://www.ifeels.cn/msbmdown/?activity_id=' +app.globalData.activity_id, //
      success(res) {
        if (res.statusCode === 200) {
          console.log(res.tempFilePath)
          const path = res.tempFilePath;
          wx.saveFile({
            tempFilePath: path,
            success(res) {
              var savedFilePath = res.savedFilePath
              wx.openDocument({
                filePath: savedFilePath,
                fileType: "xlsx",
                success(res) {
                  console.log('打开文档成功')
                }
              })
              if(res.savedFilePath){
                wx.showToast({
                  title: '保存成功',
                  icon: 'success',
                  duration: 2000
                })

              }
              console.log("保存成功" + savedFilePath)
            }
          })
        }
      }
    })
    /*wx.saveFile({
      tempFilePath: tempFilePaths[0],
      success(res) {
        const savedFilePath = res.savedFilePath
        wx.showToast({
          title: '保存成功',
          icon: 'success',
          duration: 2000
        })
        console.log("保存成功" + savedFilePath)
      }
    })*/
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this;
    wx.request({
      url: 'https://www.ifeels.cn/msbmapplyuser/',       //接口5   5.获取单个活动的报名人列表
      data:{
        activity_id:app.globalData.activity_id,
      },
      header:{
        'content-type': 'application/json' // 默认值
      },
      success:function(res){
        if(res.statusCode == 200){
          console.log(res.data)
          that.setData({
            act_mess:res.data,                //后台返回值
          })
          console.log(that.data.act_mess)
        }
        else{
          console.log("错误码" + res.statusCode)
        }
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