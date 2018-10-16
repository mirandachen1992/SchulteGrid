const { getList } = require('../../request/request');

Page({
  data: {
    sizes: [3, 4, 5],
   // chooseType: 3,
    list: [],
    item:3
  },
  onLoad: function () {
    this.getLists(this.data.item)
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
  },
  changeList:function(event){
    if(this.data.item ==3 || this.data.item ==4){
      this.setData({item:this.data.item + 1})
    }else{
      this.setData({item:3})
    }
    this.getLists(this.data.item)

    console.log('change!!!!',event)
  },
})