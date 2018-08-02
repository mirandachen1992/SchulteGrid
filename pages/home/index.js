const app = getApp();

Page({
  data: {
    // sizes: [3, 4, 5],
    // chooseType: 3,
    // list: []
    authorize: false,
    src: '../../logo.png',
    animationData1: {},
    animationData2: {},
    animationData3: {},
    isShow: false
  },
  onShow: function () {
    // this.setData({isShow: true})
    var animation1 = wx.createAnimation({
      duration: 300,
      timingFunction: "ease-out",
    });
    var animation2 = wx.createAnimation({
        duration: 300,
        timingFunction: "ease-out",
    });
    var animation3 = wx.createAnimation({
        duration: 300,
        delay: 40,
        timingFunction: "ease-out",
    });

    animation1.width('0').height('0').step({ duration: 50 }).width('150rpx').height('150rpx').step();
    animation2.translateX('500px').step().translateX(0).step();
    animation3.translateX('500px').step().translateX(0).step();
    this.setData({ 
        animationData1: animation1.export(), 
        animationData2: animation2.export(), 
        animationData3: animation3.export() 
    })

  },
  onHide: function() {
    // this.setData({isShow: false, animationData1: {}, animationData2: {}, animationData3: {}})
  },


  onLoad: function() {
    let _this = this;

    if (app.globalData.authorize) {
      this.setData({ authorize: app.globalData.authorize })
      wx.getUserInfo({
        success: function(res) {
            app.userInfo = res.userInfo
        }
      })
    } else {
      app.setAuthorize = authorize => {
        this.setData({ authorize });
        wx.getUserInfo({
          success: function(res) {
            app.userInfo = res.userInfo;
          }
        })
      }
    }
  },

  getUserInfo: function(info, err) {
    if(info.detail.userInfo) {
        app.userInfo = info.detail.userInfo;
        this.setData({ authorize: true });
        wx.navigateTo({
            url: '/pages/index/index'
        })
    }
  },


  goToList: function () {
    wx.navigateTo({
        url: '/pages/list/index'
    })
  }
})