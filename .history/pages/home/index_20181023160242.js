const app = getApp();

Page({
  data: {
    src: '../../img/title.png',
    modalSrc: '../../info.png',
    bgSrc: '../../bacground.png',
    showModal: '',
    audio: true,
    showtest: false
  },
  onShow: function () {
    this.setData({
      showtest: true,
    })
  },
  onReady: function () {
    this.setData({
      showtest: true
    })

  },
  onUnload: function () {
  },
  onHide: function () {},


  onLoad: function () {
    wx.showShareMenu({
      withShareTicket: true
    })
  },

  getUserInfo: function (info, err) {
    app.globalData.userInfo = JSON.parse(info.detail.rawData);
    app.globalData.authorize = true;
    app.buttonAudio.play()
    wx.navigateTo({
      url: '/pages/index/index'
    })
  },
  // 介绍和规则
  goToInfo: function () {
    this.setData({
      showModal: 'info'
    })
  },
  // 设置
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
  // 分享设置
  onShareAppMessage: function (res) {
    return {
      title: '舒尔特方格注意力训练',
      path: '/pages/home/index',
    }
  },

  switchChange: function (e) {
    const openAudio = e.detail.value;
    if (openAudio) {
      app.startAudio();
    } else {
      app.stopAudio();
    }
    this.setData({
      audio: openAudio
    })
  }
})