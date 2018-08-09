const app = getApp();

Page({
  data: {
    authorize: false,
    src: '../../logo.png',
    modalSrc: '../../info.png',
    bgSrc: '../../bg.png',
    isShow: false,
    showModal: false,
    showImg: false
  },
  onShow: function () {
    this.setData({isShow: true}, () => {
        this.animation();
    })
  },
  animation: function () {
    this.setData({isShow: true})
  },
  onUnload: function () {
      this.setData({isShow: false, animationData1: {}, animationData2: {}, animationData3: {}})

  },
  onHide: function() {
  },


  onLoad: function() {
    let _this = this;
    // wx.showShareMenu({
    //     withShareTicket: true
    // })

    // if (app.globalData.authorize) {
    //   this.setData({ authorize: app.globalData.authorize })
    //   wx.getUserInfo({
    //     success: function(res) {
    //         app.globalData.userInfo = res.userInfo
    //     }
    //   })
    // } else {
    //   app.setAuthorize = authorize => {
    //     this.setData({ authorize });
    //     wx.getUserInfo({
    //       success: function(res) {
    //         app.globalData.userInfo = res.userInfo;
    //       }
    //     })
    //   }
    // }
  },

  getUserInfo: function(info, err) {
    //   判断是否授权成功
    app.setAuthorize().then(data => {
        this.setData({ authorize: true });
        this.setData({isShow: false, animationData1: {}, animationData2: {}, animationData3: {}})
        wx.navigateTo({
            url: '/pages/index/index'
        })
    }).catch(err => {
        console.log(err);
    });
  },


  goToList: function () {
    this.setData({isShow: false, animationData1: {}, animationData2: {}, animationData3: {}})
    wx.navigateTo({
        url: '/pages/list/index'
    })
  },
  goToInfo: function () {
    this.setData({showModal: true})
  },
  hideModal: function () {
      this.setData({showModal: false});
  },
  loadImg: function () {
      this.setData({showImg: true})
  },
  onShareAppMessage: function (res) {
    return {
      title: '舒尔特方格注意力训练',
      path: '/pages/home/index',
    }
  },
})