
const {
    setSize
  } = require('../../utils/utils');
  const app = getApp();

Page({
    data:{
        ...setSize(3),
        num:0,
        clickId:0,
        timer:null,
        showNum: false,
        showGrid:true,
        time: 0,
        userInfo: {},
        hasStarted: false,
        limitTime:"00:00",
        finish:"00:00",
         //点击动画参数
        scaleData:null,
        currentIndex:0,
    },
    onLoad: function (options) {
        console.log('传递index',options) //index
        let index = options.index;
        let mockdata = app.globalData.mockdata;
            this.setData({
                currentIndex:index,
                ...setSize(mockdata[index].size),
                limitTime:mockdata[index].time + ":00",
            })
            console.log('this.data.currentIndex',this.data.currentIndex)

      },
    clickGrid:function(event){
            if (!this.data.hasStarted) {
                this.start();
                this.runTime();
              }
              let {
                num,
                currentSize,
                userInfo,
                openId,
                timer,
                limitTime,
                finish
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
            }
         
                // 完成
          if (item == currentSize * currentSize && limitTime != finish) {
            clearInterval(this.interval);
            clearInterval(timer);
            console.log('success!!!')
            this.setData({
              showNum: false,
              hasStarted: false,
              showGrid:false,
            }, () => {
              app.clockAudio.stop();
              app.successAudio.play();
            })
            let index = Number(this.data.currentIndex);
            if(app.globalData.mockdata[index+1]){
                app.globalData.mockdata[index+1].lock = false;
            }
            wx.showModal({
                title:'闯关成功！',
                content:'',
                confirmText:'选择关卡',
                cancelText:'返回首页',
                success:function(res){
                    if(res.confirm){
                        wx.navigateTo({
                            url:'/pages/chooseMode/index'
                        })
                    }else{
                        wx.navigateTo({
                            url:'/pages/home/index'
                        })
                    }
                }
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
          })
        }
      },
    scaleTap: function(event) {
        var animation = wx.createAnimation({});
        animation.rotate(90).opacity(0.5).scale(0).step({duration:200})
        animation.rotate(0).opacity(1.0).scale(1).step({duration:50})
        this.setData({scaleData: animation.export()})
      
      },
    runTime:function(){
        this.setData({
            timer:setInterval(this.onTimer, 100)
        })
    },
    onTimer:function(){
        let{limitTime,finish,timer} = this.data;
        if (limitTime == finish){
            clearInterval(this.interval)
            this.setData({
                showNum: false,
                hasStarted: false,
                showGrid:false
              }, () => {
                app.clockAudio.stop();
              })
              console.log('fail!!!!!')
            clearInterval(timer);
            limitTime="00:10";
            let index = this.data.currentIndex;
            wx.showModal({
                title:'闯关失败！',
                content:'',
                confirmText:'再试一次',
                cancelText:'返回首页',
                success:function(res){
                    if(res.confirm){
                        wx.navigateTo({
                            url:'/pages/breakPage/index?index=' + index
                        })
                    }else{
                        wx.navigateTo({
                            url:'/pages/home/index'
                        })
                    }
                }
            })
        }
        var hms = new String(limitTime).split(":");
        var ms = new Number(hms[1]);
        var s = new Number(hms[0]);
        ms -= 10;
        if (ms < 0){
                ms = 90;
                s -= 1;
        }
        var ms = ms < 10 ? ("0" + ms) : ms;
        var ss = s < 10 ? ("0" + s) : s;
        limitTime = ss + ":" + ms;
        this.setData({
            limitTime:limitTime
        })
    }
})