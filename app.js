const { getOpenId, getRecord } = require('./request/request');

App({
  onLaunch: function() {
    const _this = this;
    wx.login({
      success: res => {
        if (res.code) {
          //发起网络请求
          getOpenId(res.code, (openId) => {
            if (this.openIdCallback) {
              this.openIdCallback(openId);
            }
          })
        } else {
          console.log('登录失败！' + res.errMsg)
        }
      },
      fail: err => {
        console.log(err)
      }
    });
    this.setAuthorize();
    // wx.getSetting({
    //   success: (res) => {
    //     let authorize = !!res.authSetting['scope.userInfo']
    //     // _this.setAuthorize ? _this.setAuthorize(authorize) : _this.globalData.authorize = authorize;
    //     _this.globalData.authorize = authorize;
    //     this.setAuthorize();
    //     // wx.getUserInfo({
    //     //   success: function(res) {
    //     //     debugger
    //     //     _this.globalData.userInfo = res.userInfo;
    //     //   }
    //     // })
    //   }
    // })
  },


  setAuthorize: function () {
    const _this = this;
    return new Promise((resolve, reject) => {
      wx.getSetting({
        success: (res) => {
          let authorize = !!res.authSetting['scope.userInfo']
          // _this.setAuthorize ? _this.setAuthorize(authorize) : _this.globalData.authorize = authorize;
          _this.globalData.authorize = authorize;
          wx.getUserInfo({
            success: function(res) {
              _this.globalData.userInfo = res.userInfo;
              resolve(authorize);
            },
            fail: (err) => {
              reject(err);
            }
          })
        },
        fail: (err) => {
          reject(err);
        }
      })
    })
  },

  onShow: function(options) {
    // Do something when show.
  },
  onHide: function() {
    // Do something when hide.
  },
  onError: function(msg) {
    console.log(msg)
  },
  globalData: {}
})