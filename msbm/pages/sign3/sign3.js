// pages/sign3/sign3.js
const app = getApp();
var util = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    now_time: '',
    activity_id: '', //存储该活动在后台的id
    dateValuestart: util.formatDate(new Date()), //开始时间
    dateValueend: util.formatDate(new Date()), //结束时间
    hidden: false,
    nocancel: false,
    array: ["姓名", "学号", "专业", "手机号", "性别", "年龄", "年级", "班级"], //自定义选项
    inputVal: ["姓名", "学号", "专业", "手机号", "性别", "年龄", "年级", "班级"],
    event_name: '', //活动名
    max_peo: '', //最大人数
    activity_introduce: '', //活动简介
    activity_address: '', //活动地址
    activity_owner: app.globalData.openid, //活动发起人
    activity_unit: '' //活动主办单位
  },
  event_name_change: function(e) {
    this.setData({
      event_name: e.detail.value
    })
    console.log("活动名称" + this.data.event_name)
  },
  max_peo_change: function(e) {
    this.setData({
      max_peo: e.detail.value
    })
    console.log("最大人数" + this.data.max_peo)
  },
  event_introdution_change: function(e) {
    this.setData({
      activity_introduce: e.detail.value
    })
    console.log("活动简介" + this.data.activity_introduce)
  },
  event_address_change: function(e) {
    this.setData({
      activity_address: e.detail.value
    })
    console.log("活动地址" + this.data.activity_address)
  },
  getInputVal: function(e) {
    var nowIdx = e.currentTarget.dataset.idx;
    var val = e.detail.value;
    var oldVal = this.data.inputVal;
    oldVal[nowIdx] = val;
    this.setData({
      inputVal: oldVal
    })
    console.log(e.detail.value)
    console.log(this.data.inputVal)
  },

  addInput: function() {
    var old = this.data.array;
    old.push(1);
    this.setData({
      array: old
    })
  },
  event_unit_change: function(e) {
    this.setData({
      activity_unit: e.detail.value
    })
    console.log(this.data.activity_unit)
  },
  delInput: function(e) {
    var nowidx = e.currentTarget.dataset.idx;
    var oldInputVal = this.data.inputVal;
    var oldarr = this.data.array;
    oldarr.splice(nowidx, 1);
    oldInputVal.splice(nowidx, 1);
    if (oldarr.length < 1) {
      oldarr = [0]
    }
    this.setData({
      array: oldarr,
      inputVal: oldInputVal
    })
  },


  cancel: function() {
    this.setData({
      hidden: true
    });
  },
  confirm: function() {
    this.setData({
      hidden: true
    });
  },

  Change_start: function(e) {
    this.setData({
      dateValuestart: e.detail.value
    })
    console.log(this.data.dateValuestart)
  },

  Change_end: function(e) {
    this.setData({
      dateValueend: e.detail.value
    })
    console.log(this.data.dateValueend)
  },
  send: function(e) {
    var that = this;
    if (that.data.activity_name == '' || that.data.max_peo == '' || that.data.inputVal.length < 1) { //信息不完整
      wx.showToast({
        title: '请完整填写信息',
        icon: 'none',
        duration: 2000
      })
      console.log("不可以")
    } else {
      if (that.data.dateValuestart > that.data.dateValueend || that.data.dateValuestart < that.data.now_time) {
        wx.showToast({
          title: '时间信息设置错误，请检查',
          icon: 'none',
          duration: 2000
        })
        console.log("开始时间大于结束时间")
      } else {
        wx.request({ //提交报名表
          url: 'https://www.ifeels.cn/msbmcreate-activity/', //预留接口  接口7
          data: {
            activity_name: that.data.event_name,
            activity_start_time: that.data.dateValuestart,
            activity_end_time: that.data.dateValueend,
            activity_introduce: that.data.activity_introduce,
            activity_address: that.data.activity_address,
            activity_owner: app.globalData.openid,
            activity_unit: that.data.activity_unit,
            activity_item: that.data.inputVal,
            activity_people_number: that.data.max_peo
          },
          method: "post",
          header: {
            'content-type': 'application/x-www-form-urlencoded' // 默认值
          },
          success(res) {
            if (res.statusCode == '200' && res.data.activity_id) {
              wx.showToast({
                title: '发布成功',
                icon: 'success',
                duration: 2000
              })
              that.setData({
                activity_id: res.data.activity_id   
              })
              app.globalData.activity_id = res.data.activity_id;
              console.log(app.globalData.activity_id)
              wx.request({ //请求二维码数据流
                url: 'https://www.ifeels.cn/msbmqr_code/', //后台接口获取二维码图片    接口7.1.1
                data: {
                  scene: that.data.activity_id, //scene参数传入活动id
                  //page: 'pages/activity_details/activity_details' //跳转页面
                },
                header: {
                  'content-type': 'application/json' // 默认值
                },
                method: "get",
                success(res) {
                  console.log(res)
                  if (res.statusCode == '200') {
                    app.globalData.img = "https://www.ifeels.cn/msbm/static/qrimg/" + that.data.activity_id + ".jpg" //保存图片到前端
                    wx.redirectTo({
                      url: '../QRCODE/QRCODE',
                      success: function (res) {
                        console.log("成功获取二维码并跳转")
                      },
                      fail: function (res) {
                        console.log("获取失败")
                      },
                    })
                  } else {
                    console.log(res.statusCode)
                  }
                }
              })
            } else { //发布失败
              wx.showToast({
                title: '发布失败，请检查网络连接',
                icon: 'none',
                duration: 2000
              })
              console.log("请求失败" + res.statusCode)
            }
          },
          fail(res) {
            wx.showToast({
              title: '发布失败，请检查网络连接',
              icon: 'none',
              duration: 2000
            })
            console.log("上传失败")
          }
        })

      }

    }

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var now = util.formatDate(new Date());
    this.setData({
      now_time: now
    })
    console.log(this.data.now_time)
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