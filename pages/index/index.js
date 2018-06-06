const { randomArray, setSize, timer } = require('../../utils/utils');
var interval;

Page({
  data: {
    ...setSize(3), //默认是3x3
    num: 0,
    sizes: [3, 4, 5],
    showNum: false,
    time: 0,
    status: '',
    statusText: {'success': '挑战成功!'}
  },

  choose: function(event) {
    let size = Number(event.target.id);
    this.setData({ ...setSize(size), status: ''});
  },
  // Event handler.
  clickMe: function(event) {
    let { num, currentSize } = this.data;
    let item = event.currentTarget.id;
    if (item == num + 1) {
      this.setData({
        num: Number(item)
      })
      if (item == currentSize * currentSize) {
        clearInterval(interval);
        this.setData({...setSize(currentSize), showNum: false, status: 'success'})
      }
    }
  },

  timer: function() {
    let { time } = this.data;
    if (time < 127) {
      this.setData({ time: Number((time + 0.01).toFixed(2)) });
    } else {
      clearInterval(interval);
    }
  },

  start: function(event) {
    this.setData({ showNum: true, time: 0});
    interval = setInterval(this.timer, 10);
  }

})