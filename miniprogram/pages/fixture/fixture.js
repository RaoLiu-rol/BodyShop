// pages/fixture/fixture.js
var util = require('../../utils/util.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    xray:2,
    yray:1.5,
    zray:1.2,
    content:''

  },
    onLoad: function (options) {
    if (app.globalData.openid) {
      this.setData({
        openid: app.globalData.openid
      })
    }
  },
  formSubmit: function (e) {
    var time = util.formatTime(new Date());
    this.setData({
      time: time
    })
    e.detail.value.date= time
    const db = wx.cloud.database()
    db.collection('fixture_01').add({
      data: e.detail.value,
      success: res => {
        wx.showToast({
          title: '新增记录成功',
        })
        console.log('[数据库] [新增记录] 成功，记录 _id: ', res._id)
      },
      fail: err => {
        wx.showToast({
          icon: 'none',
          title: '新增记录失败'
        })
        console.error('[数据库] [新增记录] 失败：', err)
      }
    })
  },
  nuSearch: function() {
    const db = wx.cloud.database()
    // 查询当前用户所有的 counters
    db.collection('fixture_01').where({
      _openid: this.data.openid
    }).get({
      success: res => {
        this.setData({
          xray : x,
          yray : y,
          zray : z
        })
        console.log('[数据库] [查询记录] 成功: ', res)
      },
      fail: err => {
        wx.showToast({
          icon: 'none',
          title: '查询记录失败'
        })
        console.error('[数据库] [查询记录] 失败：', err)
      }
    })
 },
 qrScan:function(){
  wx.scanCode({
    success (res) {
      wx.showToast({
        title: res.result
      })
      this.setData({
        content:res.result
      })
      console.log(res)
    }
  })
 }
})