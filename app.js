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
    this.startAudio();
   // this.setAuthorize();
    
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

  stopAudio: function () {
    this.globalData.audio = false;
    this.buttonAudio.destroy();
    this.clickAudio.destroy();
    this.clockAudio.destroy();
    this.successAudio.destroy();
  },

  startAudio: function () {
    this.globalData.audio = true;

    this.buttonAudio = wx.createInnerAudioContext()
    this.clickAudio = wx.createInnerAudioContext()
    this.clockAudio = wx.createInnerAudioContext()
    this.successAudio = wx.createInnerAudioContext()
    
    this.buttonAudio.src = '/img/button.mp3'
    this.clickAudio.src='/img/click.mp3'
    this.clockAudio.src='/img/clock1.mp3'
    this.successAudio.src= '/img/success.mp3'
    this.clockAudio.loop = true;
  },

  setAuthorize: function () {
    const _this = this;
    return new Promise((resolve, reject) => {
      wx.getSetting({
        success: (res) => {
          let authorize = !!res.authSetting['scope.userInfo'];
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
 
  globalData: {
    authorize:false
  }
})