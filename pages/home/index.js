const app = getApp();

Page({
  data: {
    src: '../../img/title.png',
    modalSrc: '../../info.png',
    bgSrc: '../../bacground.png',
    showModal: '',
    audio: true,
  },
 
  onLoad: function () {
    wx.showShareMenu({
      withShareTicket: true
    })
  },
  // 获取用户信息
  getUserInfo: function (info, err) {
    app.globalData.userInfo = JSON.parse(info.detail.rawData);
    app.globalData.authorize = true;
    app.buttonAudio.play()
  },
  goToTrain:function(){
    wx.navigateTo({
      url: '/pages/index/index'
    })
  },
  goToBreak:function(){
    wx.navigateTo({
      url: '/pages/chooseMode/index'
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
  // 切换音效
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