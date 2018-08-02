const { getOpenId, getRecord } = require('./request/request');

App({
  onLaunch: function() {
    const _this = this;
    wx.login({
      success: res => {
        if (res.code) {
          //发起网络请求
          getOpenId(res.code, (openId) => {
            // getRecord(openId, (res) => {
            if (this.openIdCallback) {
              this.openIdCallback(openId);
            }
            // })
          })
        } else {
          console.log('登录失败！' + res.errMsg)
        }
      },
      fail: err => {
        console.log(err)
      }
    });

    wx.getSetting({
      success: (res) => {
        let authorize = !!res.authSetting['scope.userInfo']
        _this.setAuthorize ? _this.setAuthorize(authorize) : _this.globalData.authorize = authorize;
      }
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