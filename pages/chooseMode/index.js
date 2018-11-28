const {
    mockData
  } = require('../../utils/utils');

const app = getApp();

Page({
    data:{
        gridData:[],
        showGird:false,
    },
    intoMode:function(event){
        const index = event.currentTarget.id;
        console.log(index);
        wx.navigateTo({
            url: '/pages/breakPage/index?index=' + index

        })
    },
    onLoad:function(){
        this.setData({
            gridData:app.globalData.mockdata,
        })
    },
    onShow: function () {
        console.log(this.data.gridData)
      },
})