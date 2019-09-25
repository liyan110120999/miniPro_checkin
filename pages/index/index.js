//index.js
//获取应用实例
const app = getApp()
var CodeContent = "";

Page({

  // 微信分享
  onShareAppMessage: function (res) {
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
    }
    return {
      title: '新学说活动部-签到系统',
      path: 'pages/index/index',
      success: function (res) {
        // 转发成功
      },
      fail: function (res) {
        // 转发失败
      }
    }
  },


  data: {
    motto: '新学说',
    CheckInButtonText:'签到',
    ScanButDisabled:false,
    CheckInButDisabled:true,
    CheckInButType:"primary",
    // userInfo: {},
    // hasUserInfo: false,
    // canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {

  },


// 扫一扫按钮
  ScanButton: function (e) {

    // var CodeContent = "";
    var that = this;
    that.setData({
      // 按钮属性
      CheckInButtonText: "签到",
    })

    // 微信扫码
    wx.scanCode({
      success: (res) => {
        console.log(res)
        CodeContent = res.result
        // 显示url
        this.setData({
          text: CodeContent
        })
        // 发送请求
        wx.request({
          url: 'https://data.xinxueshuo.cn/nsi-1.0/manager/checkIn/get_info.do',
          data: {
            token: CodeContent
          },
          header: {
            'content-type': 'application/json' // 默认值
          },
          // 成功返回值：
          success: function (res) {
            console.log(res.data)
            console.log(res.data.code)
            if (res.data.code=="1"){
              wx.showToast({
                title: '二维码错误',
                icon: 'loading',
                duration: 2500
              })           
            }

            var CI_company = res.data.data.company
            var CI_createTime = res.data.data.createTime
            var CI_email = res.data.data.email
            var CI_name = res.data.data.name
            var CI_phone = res.data.data.phone
            var CI_position = res.data.data.position
            var CI_type = res.data.data.type
            var CI_token = res.data.data.token

            that.setData({
              // 按钮属性
              ScanButDisabled: true,
              CheckInButDisabled: false,
              // text: CI_company,
              CI_company: CI_company,
              CI_createTime: CI_createTime,
              CI_email: CI_email,
              CI_name: CI_name,
              CI_phone: CI_phone,
              CI_position: CI_position,
              CI_type: CI_type,
              CI_token: CI_token

            })

            // 判断是否已签到过
            var checkinTime = res.data.data.checkinTime;
            if (checkinTime != "" && checkinTime != null && checkinTime != "null") {
              console.log("已签到")
              that.setData({
                // 按钮属性
                errorMsg:"此二维码已用过！！",
                ScanButDisabled: false,
                CheckInButDisabled:true,
              })
            }else{
                console.log("未签到")
                that.setData({
                  // 按钮属性
                  errorMsg: "欢迎-请点击签到"
                })
            }

            // 扫码成功-结束
          }
        })
      }

    })
  },
  // 查看log 按钮时间
  logButton: function (e){

    wx.navigateTo({
      url :'/pages/nsi-log/nsi-log'
    })
    
  },

  // 下拉刷新
  // onPullDownRefresh: function () {
  //   wx.stopPullDownRefresh()

  //   this.setData({
  //     ScanButDisabled: false,
  //     CheckInButDisabled:true,
  //   })
  // },


// 签到按钮
  CheckInButton: function (e) {
      console.log("签到按钮的点击")
      var that = this;
        // 发送请求
        wx.request({
          url: 'https://data.xinxueshuo.cn/nsi-1.0/manager/checkIn/check_in.do',
          data: {
            "token": CodeContent
          },
          header: {
            'content-type': 'application/json' // 默认值
          },
          // 成功返回值：
          success: function (res) {
            console.log("请求成功"+res.data)
            console.log(res)
            that.setData({
              // 按钮属性
              ScanButDisabled: false,
              CheckInButDisabled: true,

              CheckInButtonText: "签到成功"
            })
            wx.showToast({
              title: '签到成功',
              icon: 'success',
              duration: 1000
            })


          }
          
        })

  },


})
