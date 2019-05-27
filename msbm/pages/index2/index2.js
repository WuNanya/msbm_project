//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    current: 'homepage',
    isauthor: 'false',
  },
  onLoad:function(query){ 
    if (query.scene) {
      const scene = decodeURIComponent(query.scene)
      console.log("scene" + scene)
      app.globalData.activity_id = scene;
      wx.redirectTo({
        url: '../activity_details/activity_details',
      })
    }
  },
  onShareAppMessage: function () {

  },
  //发起相机扫描二维码(允许相册扫描)
  jump_scan: function () {
    if (app.globalData.openid) {    //是否登录
      wx.scanCode({
        success(res) {
          console.log(res)                   //此模块不完善
          wx.request({
            url: 'https://www.ifeels.cn/msbmpath/',     //查询该活动是否存在      接口3.1.1
            data:{ path:res.path },          //参数：活动id
            header:{
              'content-type': 'application/json' //默认值
            },
            success(res){
              if(res.statusCode == 200){     //若存在
                console.log(res)
                app.globalData.activity_id = res.data.scene;    //将二维码信息存入全剧变量报名表id
                wx.navigateTo({                          //跳转至活动详情页面
                  url: '../activity_details/activity_details'
                })
              }
              else{
                wx.showToast({
                  title: '该活动不存在',
                  icon:'none',
                  duration: 2000
                })                                                                 //不存在
                console.log("请求失败" + res)
              }
            },
            fail(res){                                                              //请求失败
              console.log("请求失败")
            }
          })
        },
        faile(res) {
          console.log(res)
        }

      })
    } else {                      //没有登录，跳转登录
      app.login();
    }
  },
  //跳转到发起报名页面
  sign: function () {
    if (app.globalData.openid) {    //是否登录
      console.log(app.globalData.openid)
      wx.navigateTo({
        url: '../../pages/sign3/sign3',
      })
    } else {                      //没有登录，跳转登录
      app.login();
    }
  }
});