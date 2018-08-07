const { setSize } = require('../../utils/utils');
const { saveRecord, getRecord, shareImg } = require('../../request/request');
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
    clickId: 0,
    // timeShow: 0,
    startTime: 0,
    score: 0,
    showModal: false,
    url: ''
  },

  onLoad: function() {
    let { currentSize } = this.data;
    this.setData({authorize: app.globalData.authorize, userInfo: app.globalData.userInfo})
    this.awaitOpenId().then(openId => {
      getRecord(openId, currentSize).then(res => {
        this.setData({ topRecord: res });
      })
    });
    // wx.showShareMenu({
    //   withShareTicket: true
    // })
  },

  onShow: function () {
    if(!app.globalData.authorize) {
      wx.navigateTo({
        url: '/pages/home/index'
      })
    }
    // this.setData({time: 0, showNum: false, num: 0})
  },

  onHide: function () {
    // clearInterval(this.interval);
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
    this.setData({clickId: item});
    if (item == num + 1) {
      this.setData({
        num: Number(item)
      })
      // 完成
      if (item == currentSize * currentSize) {
        let {startTime} = this.data;
        let time = new Date();
        let pass = ((time.getTime() - startTime)/1000).toFixed(2);
        clearInterval(this.interval);
        this.setData({ ...setSize(currentSize), showNum: false, status: 'success',score: pass })
        saveRecord({
          openId: this.data.openId,
          nickName: userInfo.nickName,
          avatarUrl: userInfo.avatarUrl,
          // record: time,
          record: pass,
          type: currentSize
        }).then(data => {
          getRecord(openId, currentSize).then(res => {
            this.setData({ topRecord: res });
          })
        });
      }
    } 
  },

  timer: function() {
    let { time, startTime } = this.data;
    if (time < 90) {
      // let test = parseFloat((time + 0.05))
      let date = new Date();
      let currentTime = ((date.getTime() - startTime)/1000).toFixed(2);
      console.log((date.getTime() - startTime)/1000);
      // let test = parseFloat((time + 1))
      this.setData({ time: currentTime });
      // this.setData({timeShow: test.toFixed(2)})
    } else {
      clearInterval(this.interval);
      this.setData({ showNum: false, status: 'fail' })
    }
  },

  start: function(event) {
    let time = new Date();
    this.setData({ showNum: true, startTime: time.getTime(), time: 0, num: 0 }, () => {
      this.interval = setInterval(this.timer, 100);
      // this.interval = setInterval(this.timer, 50);
    });
  },

  toList: function(event) {
    wx.navigateTo({
      url: '/pages/list/index'
    })
  },
  onShareAppMessage: function (res) {
    return {
      title: '舒尔特方格注意力训练',
      path: '/pages/home/index',
    }
  },

  share: function () {
    let _this = this;
    let { userInfo, topRecord, currentSize } = this.data;
    shareImg().then(data => {
      this.setData({url: data})
    this.setData({showModal: true})
      
      //2. canvas绘制文字和图片
      const ctx = wx.createCanvasContext('myCanvas');
      var imgPath = data
        var bgImgPath = '../../bg.png';
        
        ctx.setFillStyle('#ffffff')
        ctx.fillRect(0, 0, 300, 350);
        
        // ctx.drawImage(imgPath,    30, 550, 60, 60);
        // ctx.drawImage(bgImgPath,  0, 0, '100%', '100%');
        ctx.drawImage(imgPath, 30, 10, 240, 240);

        ctx.save()
        ctx.beginPath()
        ctx.arc(40, 300, 30, 0, 2*Math.PI)
        ctx.clip()
        ctx.drawImage(userInfo.avatarUrl, 10, 270, 60, 60);
        // ctx.drawImage(res.tempFilePath, 25, 25)
        ctx.restore()
        
  
        ctx.setFontSize(14)
        ctx.setFillStyle('#6F6F6F')
        ctx.fillText(userInfo.nickName, 80, 280)
  
        ctx.setFontSize(14)
        ctx.setFillStyle('#111111')
        ctx.fillText(`${currentSize}✻${currentSize}我的最好成绩是${topRecord}秒哟`, 80, 300)
  
        ctx.setFontSize(12)
        ctx.setFillStyle('#111111')
        ctx.fillText('长按扫码快来和我PK', 80, 330)
        ctx.draw()

    })

  //   wx.canvasToTempFilePath({
  //     x: 0,
  //     y: 0,
  //     width: 600,
  //     height: 800,
  //     destWidth: 600,
  //     destHeight:800,
  //     canvasId: 'myCanvas',
  //     success: function(res) {
  //         console.log(res.tempFilePath);
  //         _this.setData({
  //             shareImgSrc : res.tempFilePath
  //         })

  //     },
  //     fail:function (res) {
  //         console.log(res)
  //     }
  // })
    //1. 请求后端API生成小程序码
  },
  hideModal: function () {
    this.setData({showModal: false});
  },

  saveImg: function ()  {
    let shareImgSrc = '';
    wx.canvasToTempFilePath({
      x: 0,
      y: 0,
      width: 300,
      height: 350,
      destWidth: 300,
      destHeight:350,
      canvasId: 'myCanvas',
      success: function(res) {
          console.log(res.tempFilePath);
          // that.setData({
              shareImgSrc = res.tempFilePath
          // })
          wx.saveImageToPhotosAlbum({
              filePath:shareImgSrc,
              success(res) {
                  wx.showModal({
                      title: '存图成功',
                      content: '图片成功保存到相册了，去发圈噻~',
                      showCancel:false,
                      confirmText:'好哒',
                      confirmColor:'#72B9C3',
                      success: function(res) {
                          if (res.confirm) {
                              console.log('用户点击确定');
                          }
                          // that.hideShareImg()
                      }
                  })
              }
          })
      },
      fail:function (res) {
          console.log(res)
      }
  })
  //4. 当用户点击分享到朋友圈时，将图片保存到相册
  }

})