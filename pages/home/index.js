const app = getApp();

Page({
  data: {
    authorize: false,
    src: '../../img/title.png',
    modalSrc: '../../info.png',
    bgSrc: '../../bacground.png',
    isShow: false,
    showModal: '',
    showImg: false,
    audio: true,
    showtest: false
  },
  onShow: function () {
    this.setData({
      showtest: true
    })
    this.setData({
      isShow: true
    }, () => {
      this.animation();
    })
  },
  onReady: function () {
    this.setData({
      showtest: true
    })

  },
  animation: function () {
    this.setData({
      isShow: true
    })
  },
  onUnload: function () {
    this.setData({
      isShow: false,
      animationData1: {},
      animationData2: {},
      animationData3: {}
    })

  },
  onHide: function () {},


  onLoad: function () {
    let _this = this;

    wx.showShareMenu({
      withShareTicket: true
    })

    if (app.globalData.authorize) {
      this.setData({
        authorize: app.globalData.authorize
      })
      wx.getUserInfo({
        success: function (res) {
          app.globalData.userInfo = res.userInfo
        }
      })
    } else {
      app.setAuthorize = authorize => {
        this.setData({
          authorize
        });
        wx.getUserInfo({
          success: function (res) {
            app.globalData.userInfo = res.userInfo;
          }
        })
      }
    }
  },

  getUserInfo: function (info, err) {
    app.buttonAudio.play()
    //   判断是否授权成功
    this.setData({
      authorize: true,
      isShow: false,
      animationData1: {},
      animationData2: {},
      animationData3: {}
    })
    app.globalData.authorize = true;
    
    wx.navigateTo({
      url: '/pages/index/index'
    })
  },


  goToList: function () {
    app.buttonAudio.play()
    this.setData({
      isShow: false,
      animationData1: {},
      animationData2: {},
      animationData3: {}
    })
    wx.navigateTo({
      url: '/pages/list/index'
    })
  },
  goToInfo: function () {
    this.setData({
      showModal: 'info'
    })
  },
  goToSetting: function () {
    this.setData({
      showModal: 'setting'
    })
  },
  hideModal: function () {
    this.setData({
      showModal: ''
    });
  },
  loadImg: function () {
    this.setData({
      showImg: true
    })
  },
  onShareAppMessage: function (res) {
    return {
      title: '舒尔特方格注意力训练',
      path: '/pages/home/index',
    }
  },

  switchChange: function (e) {
    if (e.detail.value && !app.globalData.audio) {
      this.setData({
        audio: true
      })
      app.startAudio();
    } else if (!e.detail.value && app.globalData.audio) {
      this.setData({
        audio: false
      })
      app.stopAudio();
    }
  }
})