const HOST = 'https://sg.eldesign.cn';
// const HOST = 'http://localhost:8080';
// const HOST =  'http://47.98.47.153:8080'

function saveRecord(post) {
  return new Promise((resolve, reject) => {
    wx.request({
      url: HOST + '/record/save', //仅为示例，并非真实的接口地址
      method: 'POST',
      data: post,
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function(res) {
        console.log(res.data);
        resolve(res.data)
      },
      error: function(err) {
        console.log(err);
        reject(err);
      },
    
    })
  })
}

function getOpenId(code, callback) {
  wx.request({
    url: HOST + '/onLogin',
    method: 'POST',
    data: {
      code
    },
    success: function(res) {
      let openId = res.data.data.openid
      callback(openId);
      getApp().globalData.openId = openId;
    }
  })
}

function getRecord(openId, type) {
  return new Promise((resolve, reject) => {
    wx.request({
      url: `${HOST}/user/${openId}/type/${type}/getRecord`,
      method: 'GET',
      success: function(res) {
        resolve(res.data.data);
      }
    })
  })
}

function getList (type) {
  return new Promise((resolve, reject) => {
    wx.request({
      url: `${HOST}/type/${type}/getList`,
      method: 'GET',
      success:function(res) {
        resolve(res.data.data)
      }
    })
  })
}

module.exports = { saveRecord, getOpenId, getRecord, getList };