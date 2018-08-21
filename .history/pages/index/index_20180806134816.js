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
    statusText: { 'success': '挑战成功!', 'fail': '挑战失败!' },
    authorize: false,
    userInfo: {},
    topRecord: 0,
    animation:{},
    clickId: 0,
    timeShow: 0,
    startTime: 0,
    score: 0,
  },
  onReady: function () {
    // this.animation = wx.createAnimation({
    //   duration: 300,
    //   timingFunction: "ease",
    //   delay: 0
    // });
    // if(!app.globalData.authorize) {
    //   wx.redirectTo({
    //     url: '/pages/home/index'
    //   })
    // }
  },

  onLoad: function() {
    let { currentSize } = this.data;
    this.setData({authorize: app.globalData.authorize, userInfo: app.globalData.userInfo})
    let _this = this;
    this.awaitOpenId().then(openId => {
      getRecord(openId, currentSize).then(res => {
        this.setData({ topRecord: res });
      })
    });
  },
  onShow: function () {
    this.setData({time: 0, showNum: false, num: 0})
  },
  onHide: function () {
    clearInterval(this.interval);
  },

  onUnload: function () {
    clearInterval(this.interval);
  },

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
    // this.setData({clickId: Number(item)})
    if (item == num + 1) {
      console.log('NumberNumber')
      this.setData({
        num: Number(item)
      }, () => {
        console.log(item)
      })
      // this.animation.backgroundColor('#c5c5c5').step()
      // this.animation.rotateX(180).backgroundColor('#c5c5c5').step()
      // this.setData({ animation: this.animation.export() })
      // 完成
      if (item == currentSize * currentSize) {
        clearInterval(this.interval);
        let {startTime} = this.data;
        let time = new Date();
        let pass = ((time.getTime() - startTime)/1000).toFixed(2);
        this.setData({ ...setSize(currentSize), showNum: false, status: 'success',score: pass })
        // saveRecord({
        //   openId: this.data.openId,
        //   nickName: userInfo.nickName,
        //   avatarUrl: userInfo.avatarUrl,
        //   record: time,
        //   type: currentSize
        // }).then(data => {
        //   getRecord(openId, currentSize).then(res => {
        //     this.setData({ topRecord: res }, () => {
        //       console.log('222')
        //     });
        //   })
        // });
      }
    } else if(num < item){
      // this.animation.backgroundColor('#ffa20f').opacity(0.1).step()
      // .backgroundColor('#f7f5f5').opacity(1).step()
      // this.setData({ animation: this.animation.export() })
    }
  },

  timer: function() {
    let { time } = this.data;
    if (time < 900) {
      let test = parseFloat((time + 0.01).toFixed(2))
      // let test = parseFloat((time +÷ 1))
      this.setData({ time: test });
      // this.setData({timeShow: test.toFixed(2)})
    } else {
      clearInterval(this.interval);
      this.setData({ showNum: false, status: 'fail' })
    }
  },

  start: function(event) {
    let time = new Date();
    this.setData({ showNum: true, startTime: time.getTime(), time: 0, num: 0 }, () => {
      // this.interval = setInterval(this.timer, 1000);
      this.interval = setInterval(this.timer, 10);
    });
  },

  toList: function(event) {
    wx.navigateTo({
      url: '/pages/list/index'
    })
  }

})