const { getList } = require('../../request/request');

Page({
  data: {
    sizes: [3, 4, 5],
    chooseType: 3,
    list: []
  },
  onLoad: function () {
    this.getLists(this.data.chooseType)
  },
  getLists: function (type) {
    getList(type).then(data => {
      this.setData({list: data});
    })
  },
  radioChange: function (event) {
    let chooseType = event.detail.value;
    this.setData({chooseType})
    this.getLists(chooseType)
  }
})