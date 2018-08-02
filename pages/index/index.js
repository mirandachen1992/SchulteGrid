const { randomArray, setSize, timer } = require('../../utils/utils');
const { saveRecord, getRecord } = require('../../request/request');
var interval;
const app = getApp();

Page({
  data: {
    ...setSize(3), //默认是3x3
    num: 0,
    sizes: [3, 4, 5],
    showNum: false,
    time: 0,
    status: '',
    statusText: { 'success': '挑战成功!' },
    authorize: app.globalData.authorize,
    userInfo: {},
    topRecord: 0,
    animation:{},
    clickId: 0
  },
  onReady: function () {
    this.animation = wx.createAnimation({
      // transformOrigin: "10% 40% 50%",
      duration: 300,
      timingFunction: "ease",
      delay: 0
    });
  },

  onLoad: function() {
    console.log(app);
    let { currentSize } = this.data;
    this.setData({authorize: app.globalData.authorize})
    let _this = this;
    this.awaitOpenId().then(openId => {
      getRecord(openId, currentSize).then(res => {
        this.setData({ topRecord: res });
      })
    });
    // if (app.globalData.authorize) {
    //   this.setData({ authorize: app.globalData.authorize })
    //   wx.getUserInfo({
    //     success: function(res) {
    //       _this.setData({ userInfo: res.userInfo })
    //     }
    //   })
    // } else {
    //   app.setAuthorize = authorize => {
    //     this.setData({ authorize });
    //     wx.getUserInfo({
    //       success: function(res) {
    //         _this.setData({ userInfo: res.userInfo })
    //       }
    //     })
    //   }
    // }
  },

  // getUserInfo: function(info) {
  //   app.userInfo = info.detail.userInfo;
  //   this.setData({ userInfo: info.detail.userInfo, authorize: true });
  // },

  awaitOpenId: function() {
    return new Promise((resolve, reject) => {
      if (app.globalData.openId) {
        this.setData({ openId: app.globalData.openId })
        resolve(app.globalData.openId);
      } else {
        app.openIdCallback = res => {
          this.setData({ openId: res })
          resolve(res);
        }
      }
    })

  },

  choose: function(event) {
    let { openId } = this.data;
    let size = Number(event.target.id);
    this.setData({ ...setSize(size), status: '' });
    getRecord(openId, size).then(res => {
      this.setData({ topRecord: res });
    })
  },
  // Event handler.
  clickMe: function(event) {
    let { num, currentSize, time, userInfo, openId } = this.data;
    let item = event.currentTarget.id;
    this.setData({clickId: Number(item), animation: {}})
    if (item == num + 1) {
      this.setData({
        num: Number(item)
      })
      this.animation.backgroundColor('#c5c5c5').step()
      this.setData({ animation: this.animation.export() })
      // 完成
      if (item == currentSize * currentSize) {
        clearInterval(interval);
        this.setData({ ...setSize(currentSize), showNum: false, status: 'success' })
        saveRecord({
          openId: this.data.openId,
          nickName: userInfo.nickName,
          avatarUrl: userInfo.avatarUrl,
          record: time,
          type: currentSize
        }).then(data => {
          getRecord(openId, currentSize).then(res => {
            this.setData({ topRecord: res });
          })
        });
      }
    } else if(num < item){
      this.animation.backgroundColor('#ffa20f').opacity(0.1).step()
      .backgroundColor('#f7f5f5').opacity(1).step()
      this.setData({ animation: this.animation.export() })
    }
  },

  timer: function() {
    let { time } = this.data;
    if (time < 10) {
      this.setData({ time: Number((time + 0.01).toFixed(2)) });
    } else {
      clearInterval(interval);
    }
  },

  start: function(event) {
    this.setData({ showNum: true, time: 0 });
    interval = setInterval(this.timer, 10);
  },

  toList: function(event) {
    wx.navigateTo({
      url: '/pages/list/index'
    })
  }

})