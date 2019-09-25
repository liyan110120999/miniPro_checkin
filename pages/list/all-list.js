var app = getApp();


Page({
  data: {
    name: '新学说'
  },


  getCheckedProductItem: function (key) {
    // return this.data.productList.filter(function (v) {
    //   if (v.goodsSpecificationIds.toString() == key.toString()) {
    //     return true;
    //   } else {
    //     return false;
    //   }
    // });
  },

  getlist: function (typeNum) {
    let that=this;
    // 发送请求
    wx.request({
      // url: 'https://data.xinxueshuo.cn/nsi-0.9/Admin_api?whereFrom=GetLog',
      // url: 'http://192.168.0.119:8080/nsi-1.0/checkIn/list.do',
      url: 'https://data.xinxueshuo.cn/nsi-1.0/manager/checkIn/list.do',
      data: {
        type: typeNum,
        pageNum: 1,
        pageSize: 100
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        console.log(res)
        that.setData({
          // text: textcontent,
          list: res.data.data
        })
      }
    });
    return 0;
  },
  // 全部
  nav_button01: function (e) {
    this.getlist(0);
  },
  // 已签到
  nav_button02: function (e) {
    this.getlist(1);
  },
  // 未签到
  nav_button03: function (e) {
    this.getlist(2);
  },


  onLoad: function (options) {

    // getlist(0);
    console.log("页面加载 onload")
    this.getlist(0)

  },
  onReady: function () {
    // 页面渲染完成

  },
  onShow: function () {
    // 页面显示

  },
  onHide: function () {
    // 页面隐藏

  },
  onUnload: function () {
    // 页面关闭

  },
 
})