App({
  login: function() {
    var that = this;
    wx.showModal({
      title: '码上报名',
      content: '请求获取你的用户信息',
      success(res) {
        if (res.confirm) {
          wx.login({
            success: function(res) {
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
                success: function(res) {
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
                    url: 'https://www.ifeels.cn/msbmhas-user/',           //获取个人信息
                    data: { openid: app.globalData.openid },
                    header:{
                      'content-type': 'application/json'  //默认值
                    },
                    success(res){
                      console.log(res.data)
                      if(res.data.has_user == 0){
                        wx.redirectTo({
                          url: '../EditMes/EditMes',
                        })
                      }
                    }
                  })
                  return true;
                },
                fail: function(res) {
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
          return false;
        }
      }
    })
  },

  /**
   * 当小程序初始化完成时，会触发 onLaunch（全局只触发一次）
   */
  onLaunch: function() {
    var that = this;
    wx.getStorage({ //首次加载小程序，判断是否授权过或权限是否过期，从本地缓存获取已经加载的openid
      key: 'userId',
      success: function(res) {
        if (res.data == "") {
          that.login();
        } else {
          var app = getApp();
          app.globalData.openid = res.data
          console.log("全局openid" + app.globalData.openid)
        }
      },
      fail: function() {
        that.login();
      }
    })
  },

  /**
   * 当小程序启动，或从后台进入前台显示，会触发 onShow
   */
  onShow: function(options) {

  },

  /**
   * 当小程序从前台进入后台，会触发 onHide
   */
  onHide: function() {

  },

  /**
   * 当小程序发生脚本错误，或者 api 调用失败时，会触发 onError 并带上错误信息
   */
  onError: function(msg) {

  },
  globalData: { //定义全局变量
    openid: '',
    tableId: '', //活动表id     废弃
    img: '', //保存二维码的url
    activity_id:'',   //活动表id
  }
})