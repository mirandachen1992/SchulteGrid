const app = getApp();

Page({
  data: {
    authorize: false,
    src: '../../img/title.png',
    modalSrc: '../../info.png',
    bgSrc: '../../bacground.png',
    isShow: false,
    showModal: '',
    audio: true,
    showtest: false
  },
  onShow: function () {
    this.setData({
      showtest: true,
      isShow: true
    })
  },
  onReady: function () {
    this.setData({
      showtest: true
    })

  },
  onUnload: function () {
    this.setData({
      isShow: false,
    })

  },
  onHide: function () {},


  onLoad: function () {
    wx.showShareMenu({
      withShareTicket: true
    })
  },

  getUserInfo: function (info, err) {
    debugger;
    app.globalData.userInfo = JSON.parse(info.detail.rawData);
    app.buttonAudio.play()
    //   判断是否授权成功
    this.setData({
      authorize: true,
      isShow: false,
    })
    app.globalData.authorize = true;
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