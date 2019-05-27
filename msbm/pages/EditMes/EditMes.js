
const app = getApp();
Page({
  data: {
    name: '',
    sex: 0,
    age:'',
    college:'',
    major:'',
    id:'',
    tel:'',
    array: ['女', '男'],
    index: 0,
  },

  bindPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      sex: e.detail.value
    })
    console.log("sex:" + this.data.sex)
  },
  
  onLoad: function () {
    var that = this;                          //加载旧个人信息
    wx.request({
      url: 'https://www.ifeels.cn/msbmgetuser/',      //获取个人信息接口  接口10.1
      data:{user_id:app.globalData.openid},
      header: {
        'content-type': 'application/json'  //默认值
      },
      method:"get",                        //get请求
      success:function(res){
        if(res.statusCode == 200){
          console.log(res.data)
          if(res.data.sex == 0){
            that.setData({
              sex:'女'
            })
          }else{
            that.setData({
              sex:'男'
            })
          }
          that.setData({
            sex:res.data.sex,
            name:res.data.user_name,
            age:res.data.age,
            tel:res.data.telephone,         //手机号
          })
          console.log(that.data.name)
        }
        else{
          console.log(res.statusCode)
        }
      },
      fail(res){
        console.log(res);
      }
    })
  },

  inputNickname:function(e){
    this.setData({
      name:e.detail.value
    })
    console.log(this.data.name)
  },
  ageChange:function(e){
    this.setData({
      age : e.detail.value
    })
    console.log(this.data.age)
  },
  xueyuanChange:function(e){
    this.setData({
      college:e.detail.value
    })
    console.log(this.data.college)
  },
  majorChange:function(e){
    this.setData({
      major: e.detail.value
    })
    console.log(this.data.major)
  },
  idChange:function(e){
    this.setData({
      id: e.detail.value
    })
    console.log(this.data.id)
  },
  telChange:function(e){
    this.setData({
      tel : e.detail.value
    })
    console.log(this.data.tel)
  },
  // choosePhoto:function(e){        //选择头像
  //   var that = this;
  //   wx.chooseImage({
  //     count:1,
  //     sizeType: ['original', 'compressed'],  //可选择原图或压缩后的图片
  //     sourceType: ['album', 'camera'], //可选择性开放访问相册、相机
  //     success(res) {
  //       console.log("选择图片")
  //       // tempFilePath可以作为img标签的src属性显示图片
  //      that.setData({
  //        imgPath:res.tempFilePaths
  //      })
  //     },
  //     fail(res){
  //       console.log("用户取消操作")
  //     }
  //   })
  // },
  saveUserInfo:function(e){
    var that = this;
    console.log(this.data.tel)
    if (!(/^(13[0-9]|14[0-9]|15[0-9]|166|17[0-9]|18[0-9]|19[8|9])\d{8}$/.test(this.data.tel))) {
      wx.showToast({

        title: '手机号码有误',

        duration: 2000,

        icon: 'none'
      });
    }
    else{
      console.log(app.globalData.openid)
      if(that.data.name == '' || that.data.age == '' ||that.data.tel == ''){
        wx.showToast({
          title: '请填写信息',
          icon: 'none',
          duration: 2000
        })
      }else{
        wx.request({
          url: 'https://www.ifeels.cn/msbmsubmit-user/',         //后台接口，修改个人信息  接口10
          data:{ 
            user_id : app.globalData.openid, 
            user_name: that.data.name,
            sex: that.data.sex,
            age: that.data.age,
            telephone: that.data.tel,         //手机号
          },     
          header:{
            'content-type': 'application/x-www-form-urlencoded'  //默认值
          },
          method:"post",
          success(res){
            if(res.statusCode == 200){         //判断状态信息
              console.log("保存个人信息成功")
              wx.showToast({
                title: '保存成功',
                icon: 'success',
                duration: 2000
              })
              wx.switchTab({
                url: '../mine/mine',
              })
            }else{
              console.log('user_name' + that.data.name)
              wx.showToast({
                title: '请检查网络连接',
                icon: 'none',
                duration: 2000
              })
              console.log(res)
            }
          },
          fail(res){
            console.log("保存失败" + res)
          }
        })
      }
    }
  }
});



