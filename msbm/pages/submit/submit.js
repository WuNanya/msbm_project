
const app = getApp();
Page({
  data: {
    act_mess: [    //报名表项目
    ],
    input: [],             //用户输入信息
    userinfo: [],
  },
  onLoad: function (options) {
    var that = this;
    wx.request({
      url: 'https://www.ifeels.cn/msbmgetactivity/',       //获取报名表需填内容信息    接口3
      data: {
        activity_id: app.globalData.activity_id,  //参数：报名表id
      },
      header: {
        'content-type': 'application/json'  //默认值
      },
      success: function (res) {
        console.log(res.data)
        if (res.statusCode == 200) {
          that.setData({
            act_mess: res.data,
          })
          console.log("成功获取")
        }
        else {
          console.log(res.statusCode)
        }
      },
      fail(res) {
        console.log(res)
      }
    })

  },

  ok: function (e) {
    var val = e.detail.value;
    console.log(val)
    var that = this;
    wx.request({
      url: 'https://www.ifeels.cn/msbmsubmit-form/',                //后台接口，填写报名表，存入数据库    报名 接口6
      data: {
        openid: app.globalData.openid,
        activity_id: app.globalData.activity_id,
        user_dict: JSON.stringify(val),            //参数
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'  //默认值
      },
      method: "post",
      success: function (res) {
        if (res.statusCode == 200) {
          wx.showToast({
            title: '报名成功',
            icon: 'success',
            duration: 2000
          })
          wx.switchTab({
            url: '../mine/mine',
          })
          console.log("报名成功")
        }
        console.log(res.statusCode)
      },
      fail(res) {
        console.log("报名失败")
      }
    })
  },
})


