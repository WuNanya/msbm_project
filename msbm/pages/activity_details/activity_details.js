2 //index.js
//获取应用实例
const app = getApp()
var util = require('../../utils/util.js');
Page({
  data: {
    activity_id: '',
    activity_numed: '',
    activity_num: '',
    activity_name: '',
    activity_tel: '',
    activity_sun: '',
    activity_unit: '',
    activity_start_time: '',
    activity_end_time: '',
    activity_address: '',
    activity_introduce: '',
    now_time:'',
  },
  //事件处理函数


  onLoad: function(query) {
    var that = this;
    var now = util.formatDate(new Date());
    this.setData({
      now_time: now
    })
    console.log(this.data.now_time)
    wx.getStorage({ //首次加载小程序，判断是否授权过或权限是否过期，从本地缓存获取已经加载的openid
      key: 'userId',
      success: function (res) {
        if (res.data == "") {
          wx.showModal({
            title: '码上报名',
            content: '请求获取你的用户信息',
            success(res) {
              if (res.confirm) {
                wx.login({
                  success: function (res) {
                    console.log('code' + res.code)
                    //发送请求
                    wx.request({
                      url: 'https://www.ifeels.cn/msbmlogin/', //接口地址
                      data: {
                        code: res.code
                      },
                      header: {
                        'content-type': 'application/json' //默认值
                      },
                      success: function (res) {
                        if (res.statusCode == 200) {
                          console.log("data值" + res.data)
                          wx.setStorageSync('userId', res.data.openid) //存到本地缓存
                          var app = getApp();
                          app.globalData.openid = res.data.openid //存到全局变量
                          console.log('全局变量openid值：' + app.globalData.openid)
                          wx.showToast({
                            title: '成功,请继续',
                            icon: 'success',
                            duration: 2000
                          })
                          wx.request({
                            url: 'https://www.ifeels.cn/msbmhas-user/', //获取个人信息
                            data: {
                              userid: res.data.openid
                            },
                            header: {
                              'content-type': 'application/json' //默认值
                            },
                            success(res) {
                              if (res.data.has_user == 0 && res.statusCode == 200) {
                                wx.redirectTo({
                                  url: '../EditMes/EditMes',
                                })
                              } else {
                                wx.showToast({
                                  title: '服务器出了点小问题，请稍后再试',
                                  icon: 'none',
                                  duration: 2000
                                })
                              }
                            }
                          })
                        } else {
                          wx.showToast({
                            title: '服务器出了点小问题，请稍后再试',
                            icon: 'none',
                            duration: 2000
                          })
                        }
                      },
                      fail: function (res) {
                        wx.showToast({
                          title: '授权失败，请检查网络连接',
                          icon: 'none',
                          duration: 2000
                        })
                        console.log("请求失败")
                      }
                    })
                  }
                })
              } else if (res.cancel) {
                wx.showToast({
                  title: '你已拒绝授权，请授权再使用',
                  icon: 'none'
                });
              }
            }
          })
        } else {
          var app = getApp();
          app.globalData.openid = res.data
          console.log("全局openid" + app.globalData.openid)
        }
      },
    })
    if (query.scene) {
      const scene = decodeURIComponent(query.scene)
      console.log("scene" + scene)
      this.setData({
        activity_id: scene,
      })
      app.globalData.activity_id = scene;
      console.log(this.data.activity_id)
    } else {
      this.data.activity_id = app.globalData.activity_id;
    }
    wx.request({
      url: 'https://www.ifeels.cn/msbmactivity/', //获取报名表简介信息    接口3.1.1
      data: {
        activity_id: app.globalData.activity_id, //活动表id
      },
      header: {
        'content-type': 'application/json' //默认值
      },
      success: function(res) {
        that.setData({
          activity_name: res.data.activity_name,
          activity_start_time: res.data.activity_start_time,
          activity_end_time: res.data.activity_end_time,
          activity_introduce: res.data.activity_introduce,
          activity_address: res.data.activity_address,
          activity_unit: res.data.activity_unit,
          activity_tel: res.data.activity_owner_tel,
          activity_num: res.data.activity_max,
          activity_numed: res.data.activity_apply_number, //已报名人数
        })
      },
      fail(res) {
        console.log("返回失败")
      }
    })
  },
  sign_up: function(res) {
    var that = this;
    if (this.data.activity_numed >= this.data.activity_num) {
      wx.showToast({
        title: '报名人数已满',
        icon: 'none',
        duration: 2000
      })
    } else if(app.globalData.openid == ""){
      wx.showToast({
        title: '您还没有登录',
        icon: 'none',
        duration: 2000
      })
    } else if (that.data.activity_end_time < that.data.now_time){
      wx.showToast({
        title: '报名已结束，看看其他活动吧',
        icon: 'none',
        duration: 2000
      })
    }
    else {
      wx.request({
        url: 'https://www.ifeels.cn/msbmis-apply/',
        data: {
          openid: app.globalData.openid,
          activity_id: this.data.activity_id,
        },
        header: {
          'content-type': 'application/json' //默认值
        },
        success: function(res) {
          console.log(res.data)
          if (res.statusCode == 200 && res.data.is_apply == 0) {
            wx.navigateTo({
              url: '../submit/submit', //跳转到报名页面
            })
          } else {
            if (res.statusCode == 200 && res.data.is_apply != 0) {
              wx.showToast({
                title: '你已参与过报名',
                icon: 'none',
                duration: 2000
              })
            } else {
              wx.showToast({
                title: '服务器出现问题',
                icon: 'none',
                duration: 2000
              })
            }
          }
        }
      })
    }
    /*wx.request({
      url: 'http://',
    })*/
  },
  cancel_act: function(res) {
    var that = this;
    wx.request({
      url: 'https://www.ifeels.cn/msbmis-apply/',
      data: {
        openid: app.globalData.openid,
        activity_id: that.data.activity_id
      },
      header: {
        'content-type': 'application/json' //默认值
      },
      success: function(res) {
        console.log(res.data)
        if (res.statusCode == 200 && res.data.is_apply == 0) { //0是未报名
          wx.showToast({
            title: '你未参与过报名',
            icon: 'none',
            duration: 2000
          })
        } else {
          if (res.statusCode == 200 && res.data.is_apply != 0) { //1为报过名可取消
            wx.showModal({
              title: '取消报名',
              content: '确认取消报名？',
              success(res) {
                if (res.confirm) {
                  //点击确认
                  wx.request({
                    url: 'https://www.ifeels.cn/msbmcancel2/', //取消报名接口    接口9
                    data: {
                      openid: app.globalData.openid,
                      activity_id: that.data.activity_id, //活动id
                    },
                    header: {
                      'content-type': 'application/json' //默认值
                    },
                    success: function(res) {
                      if (res.statusCode == 200) {
                        wx.showToast({
                          title: '取消成功',
                          icon: 'success',
                          duration: 2000
                        })
                      } else {
                        wx.showToast({
                          title: '检查网络连接',
                          icon: 'none',
                          duration: 2000
                        })
                      }
                    },
                    fail(res) {
                      wx.showToast({
                        title: '取消失败',
                        icon: 'success',
                        duration: 2000
                      })
                      console.log("取消失败")
                    },
                    complete(res) {
                      wx.switchTab({
                        url: '../mine/mine',
                      })
                    }
                  })
                }
              }
            })


          } else {
            wx.showToast({
              title: '服务器出现问题',
              icon: 'none',
              duration: 2000
            })
          }
        }
      },
    })

  }

})