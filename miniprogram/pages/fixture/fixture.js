// pages/fixture/fixture.js
var util = require('../../utils/util.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    section: '',
    position: '',
    pinData: [],
    error: "",
    color: ''
  },
  onLoad: function (options) {
    var me = this;
    wx.showModal({
      title: '提示',
      content: '扫描工位二维码',
      success(res) {
        if (res.confirm) {
          me.qrScan();
          wx.showLoading({
            title: '加载中',
          })
        } else if (res.cancel) {
          wx.navigateBack();
        }
      }
    })
  },
  nuSearch: function (pointer) {
    this.setData({
      pinData: []
    })
    const db = wx.cloud.database()
    // 查询当前工位定位销清单
    db.collection('basicData').where({
      position: pointer,
    }).get({
      success: res => {
        if (res.data.length != 0) {
          this.setData({
            pinData: res.data[0].data,
            section: res.data[0].section
          })
          wx.hideLoading()
        } else {
          wx.hideLoading()
          wx.showToast({
            icon: 'none',
            title: '未找到此工位记录，请检查'
          })
        }
      },
      fail: err => {
        wx.hideLoading()
        wx.showToast({
          icon: 'none',
          title: '查询记录失败'
        })
      }
    })
  },
  dmInput: function (e) {
    var temp = 'pinData['+e.target.dataset.idx+'].color'
    if (e.detail.value < this.data.pinData[e.target.dataset.idx].dmMin || e.detail.value > this.data.pinData[e.target.dataset.idx].dmMax) {
      this.setData({
        [temp]: "#ff0000"
      })
    } else {
      this.setData({
        [temp]: "#00ff00"
      })
    }
    this.data.pinData[e.target.dataset.idx].dm = e.detail.value
  },
  getUserName: function (e) {
    this.data.userName = e.detail.value
  },
  qrScan: function () {
    wx.scanCode({
      success: res => {
        var pointer = ''
        this.setData({
          position: res.result
        })
        pointer = res.result
        this.nuSearch(pointer)
      }
    })
  },
  getUserChecked: function () {
    var userChecked = 0
    for (var i = 0; i < this.data.pinData.length; i++) {
      if (this.data.pinData[i].dm) {
        userChecked += 1
      }
    }
    return userChecked
  },
  sendResult: function () {
    this.setData({
      error: ""
    })
    var timeNow = util.formatTime(new Date());
    this.setData({
      time: timeNow
    })
    if (this.getUserChecked() < this.data.pinData.length) {
      this.setData({
        error: '您还未完成全部检查，暂时不能提交'
      })
      return;
    };
    if (!this.data.userName) {
      this.setData({
        error: '您还未填写姓名，暂时不能提交'
      })
      return;
    }
    const db = wx.cloud.database()
    db.collection('fixture_01').add({
      data: this.data,
      success: res => {
        wx.showToast({
          title: '新增记录成功',
        })
      }
    })
  },
})