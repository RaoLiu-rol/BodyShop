//var util = require('../../utils/utils.js');

Page({
  formSubmit: function (e) {
    e.detail.value.date=e.timeStamp
    const db = wx.cloud.database()
    db.collection('QRK').add({
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
  formReset: function () {
    console.log('form发生了reset事件')
  },
  data: {
    array: ['第八轮', '第七轮', '第六轮', '第五轮', '第一轮', '第二轮', '第三轮', '第四轮', '加测一', '加测二', '加测三'],
    index: 4
  },
  bindPickerChange: function (e) {
    this.setData({
      index: e.detail.value
    })
  },
})