const {
  setSize
} = require('../../utils/utils');
const {
  saveRecord,
  getRecord,
  shareImg
} = require('../../request/request');
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
    statusText: {
      'success': '挑战成功!',
      'fail': '挑战失败!'
    },
    authorize: false,
    userInfo: {},
    topRecord: 0,
    clickId: 0,
    startTime: 0,
    score: 0,
    scoreArr:[],
    showModal: false,
    url: '',
    hasStarted: false,
    closeGrid: false,
    choosedSize: 3,

    //点击动画参数
    scaleData:null
  },

  onLoad: function () {
    let {
      currentSize
    } = this.data;
    this.setData({
      authorize: app.globalData.authorize,
      userInfo: app.globalData.userInfo
    })
    this.awaitOpenId().then(openId => {
      getRecord(openId, currentSize).then(res => {
        this.setData({
          topRecord: res
        });
      })
    });

  },

  onShow: function () {
    if (!app.globalData.authorize) {
      wx.navigateTo({
        url: '/pages/home/index'
      })
    }
  },

  onHide: function () {
    clearInterval(this.interval);
  },

  onUnload: function () {
    app.clockAudio.stop();
    clearInterval(this.interval);
  },
  // 等待获取Openid
  awaitOpenId: function () {
    return new Promise((resolve, reject) => {
      if (app.globalData.openId) {
        this.setData({
          openId: app.globalData.openId
        })
        resolve(app.globalData.openId);
      } else {
        app.openIdCallback = res => {
          this.setData({
            openId: res
          })
          resolve(res);
        }
      }
    })
  },
  // 选择模式
  choose: function (event) {
    let size = Number(event.target.id);
    let time = new Date();
    if (this.data.hasStarted && size != this.data.choosedSize) {
      console.log('clear');
      this.setData({
        time: 0,
        startTime: time.getTime(),
        hasStarted: false,
        clickId:0,
      })
      clearInterval(this.interval);
      app.clockAudio.stop();
    }
    if (!this.data.hasStarted && size != this.data.choosedSize) {
      app.buttonAudio.play()
      let {
        openId
      } = this.data;
      this.setData({ ...setSize(size),
        status: '',
        choosedSize: size,
        clickId:0,
      });
      getRecord(openId, size).then(res => {
        this.setData({
          topRecord: res
        });
      })
    }


  },

  // 点击框框
  clickMe: function (event) {
    if (!this.data.hasStarted) {
      this.start();
    }
    let {
      num,
      currentSize,
      userInfo,
      openId
    } = this.data;
    let item = event.currentTarget.id;
    app.clickAudio.play();
    this.setData({
      clickId: item
    });
    if (item == num + 1) {
      this.setData({
        num: Number(item)
      })
      this.scaleTap(event);

      // 完成
      if (item == currentSize * currentSize) {
        let {
          startTime
        } = this.data;
        let time = new Date();
        let pass = ((time.getTime() - startTime) / 1000).toFixed(2);
        let scoreArr = pass.toString().split('');
        scoreArr.push("s")
        clearInterval(this.interval);
        this.setData({ ...setSize(currentSize),
          closeGrid: true,
          showNum: false,
          status: 'success',
          score: pass,
          scoreArr:scoreArr,
          hasStarted: false,
        }, () => {
          app.clockAudio.stop();
          app.successAudio.play();
        })
        saveRecord({
          openId: this.data.openId,
          nickName: userInfo.nickName,
          avatarUrl: userInfo.avatarUrl,
          record: pass,
          type: currentSize
        }).then(data => {
          getRecord(openId, currentSize).then(res => {
            this.setData({
              topRecord: res
            });
          })
        });
      }
    }
  },
//动画函数：：

scaleTap: function(event) {
  var animation = wx.createAnimation({});
  animation.rotate(90).opacity(0.5).scale(0).step({duration:200})
  animation.rotate(0).opacity(1.0).scale(1).step({duration:50})
  this.setData({scaleData: animation.export()})

},

  timer: function () {
    let {
      time,
      startTime
    } = this.data;
    if (time < 900) {
      let date = new Date();
      let currentTime = ((date.getTime() - startTime) / 1000).toFixed(2);
      this.setData({
        time: currentTime
      });
    } else {
      app.clockAudio.stop();
      clearInterval(this.interval);
      this.setData({
        showNum: false,
        status: 'fail'
      })
    }
  },

  start: function (event) {
    app.buttonAudio.play()
    let time = new Date();
    this.setData({
      hasStarted: true,
      showNum: true,
      startTime: time.getTime(),
      time: 0,
      num: 0
    }, () => {
      app.clockAudio.play();
      this.interval = setInterval(this.timer, 100);
    });
  },

  showGrid: function (event) {
    let time = new Date();
    this.setData({
      closeGrid: false,
      startTime: time.getTime(),
      showNum: true,
      time: 0,
      num: 0
    });
  },

  toList: function (event) {
    app.buttonAudio.play()
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

  downloadImg: function (url) {
    return new Promise((resolve, reject) => {
      wx.downloadFile({
        url,
        success: function (res1) {
          resolve(res1.tempFilePath);
        },
        fail: function (err) {
          reject(err)
        }
      })
    })
  },

  draw: function (img1, img2,img3,img4) {
    let {
      userInfo,
      currentSize,
      topRecord
    } = this.data;
    const ctx = wx.createCanvasContext('myCanvas');
 
    ctx.setFillStyle('#ffffff')
    ctx.fillRect(10, 0, 280, 400);

    ctx.drawImage(img3, 0, 0, 300, 370);
    ctx.drawImage(img4, 70, 50, 165, 175);

    ctx.drawImage(img1,188,290,86,86);

    // ctx.save()
    // ctx.beginPath()
    // ctx.arc(50, 300, 30, 0, 2 * Math.PI)
    // ctx.clip()
    // ctx.drawImage(img2, 20, 270, 60, 60);
    // ctx.restore()
    var avatarurl_width = 36;    //绘制的头像宽度
    var avatarurl_heigth = 36;   //绘制的头像高度
    var avatarurl_x = 20;   //绘制的头像在画布上的位置
    var avatarurl_y = 270;
    ctx.save()
    ctx.beginPath()
    ctx.arc(avatarurl_width / 2 + avatarurl_x, avatarurl_heigth / 2 + avatarurl_y, avatarurl_width / 2, 0, Math.PI * 2, false);
    ctx.clip()
    ctx.drawImage(img2, avatarurl_x, avatarurl_y, avatarurl_width, avatarurl_heigth); 
    ctx.restore()



    ctx.setFontSize(14)
    ctx.setFillStyle('#6F6F6F')
    ctx.fillText(userInfo.nickName, 62, 290)

    ctx.setFontSize(12)
    ctx.setFillStyle('#111111')
    ctx.fillText(`${currentSize}✻${currentSize}我的最好成绩是${topRecord}秒噢`, 20, 322)

    ctx.setFontSize(12)
    ctx.setFillStyle('#111111')
    ctx.fillText('快来和我一起PK吧', 20, 340)
    ctx.draw()

    wx.hideLoading();

    this.setData({
      test:true
    })

  },


  share: function () {
    app.buttonAudio.play()
    let _this = this;
    let {
      userInfo
    } = this.data;
    let img1, img2 = '';
    var img3 = "https://sg.eldesign.cn/SchulteGrid/img/box-container.png";
    var img4 = "https://sg.eldesign.cn/SchulteGrid/img/box.png"
    wx.showLoading();
    // 1.首先拿到二维码图片地址
    shareImg().then(data => {
      console.log('分享数据',data);
      console.log(userInfo);
      // 2.将二维码图片和头像保存缓存
      Promise.all([this.downloadImg(data.data.data), this.downloadImg(userInfo.avatarUrl),this.downloadImg(img3),this.downloadImg(img4)]).then(data => {
        [img1, img2,img3,img4] = data;
        // 3. 绘制canvas
        this.draw(img1, img2,img3,img4);
        this.setData({
          showModal: true
        })
      }).catch(err => {
        console.log(err);
        wx.hideLoading();
      })
    })
  },

  hideModal: function () {
    this.setData({
      showModal: false
    });
  },

  saveImg: function () {
    let shareImgSrc = '';
    let _this = this;
    // 4. 点击保存按钮将图片保存相册
    wx.canvasToTempFilePath({
      x: 0,
      y: 0,
      width: 300,
      height: 400,
      destWidth: 600,
      destHeight: 700,
      canvasId: 'myCanvas',
      success: function (res) {
        shareImgSrc = res.tempFilePath
        wx.saveImageToPhotosAlbum({
          filePath: shareImgSrc,
          success(res) {
            wx.showModal({
              title: '存图成功',
              content: '图片成功保存到相册了，记得分享哦',
              showCancel: false,
              confirmText: '好哒',
              confirmColor: '#72B9C3',
              success: function (res) {
                if (res.confirm) {
                  console.log('用户点击确定');
                }
                _this.hideModal()
              }
            })
          }
        })
      },
      fail: function (res) {
        console.log(res)
      }
    })
  },
})