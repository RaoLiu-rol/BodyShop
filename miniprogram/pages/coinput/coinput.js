// pages/coinput/coinput.js
Page({

  data: {
    status: "未加载",
    testName: "",
    userName: "",
    test: [],
    error: '',
    cellphone: '',
    count: 0,
    array: ['工装统计', '汽车售后问卷调查', '互联网兴趣调查']
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (options.id) {
      this.refreshData(options.id)
    }
  },
  refreshData: function (surveyID) {
    wx.showLoading({
      title: '加载中',
    })
    var me = this;
    wx.request({
      url: 'https://kaopu.tech/getSurvey?surveyID=' + surveyID, //仅为示例，并非真实的接口地址
      success(res) {
        if (res.data.errCode == 0) {
          var arr = res.data.data;
          for (var i = 0; i < arr.length; i++) {
            arr[i].options = arr[i].options.split(",")
          }
          me.setData({
            test: arr
          });
          me.setData({
            testName: res.data.testName,
            surveyID: surveyID
          })
        }
        wx.setNavigationBarTitle({
          title: me.data.testName,
        });
        me.setData({
          status: "填报中"
        })
      }
    })
    setTimeout(function () {
      wx.hideLoading()
    }, 2000)
  },
  getUserName: function (e) {
    this.setData({
      userName: e.detail.value
    })
  },
  getCellPhone: function (e) {
    this.setData({
      cellphone: e.detail.value
    })
  },
  getRadioChoice: function (e) {
    this.data.test[e.target.dataset.idx].choice = e.detail.value
    this.getUserChecked()
  },
  getCheckboxChoice: function (e) {
    this.data.test[e.target.dataset.idx].choice = e.detail.value.toString()
    this.getUserChecked()
  },
  getUserChecked: function () {
    var userChecked = 0
    for (var i = 0; i < this.data.test.length; i++) {
      if (this.data.test[i].choice) {
        userChecked += 1
      }
    }
    wx.setNavigationBarTitle({
      title: this.data.testName + "(" + userChecked + "/" + this.data.test.length + ")",
    })
    return userChecked
  },
  sendResult: function () {
    this.setData({
      error: ""
    })
    if (this.getUserChecked() < this.data.test.length) {
      this.setData({
        error: '您还未完成全部提问，暂时不能提交'
      })
      return;
    };
    if (!this.data.userName) {
      this.setData({
        error: '您还未填写姓名，暂时不能提交'
      })
      return;
    };
    if (!this.data.cellphone) {
      this.setData({
        error: '您还未填写手机号码，暂时不能提交'
      })
      return;
    };
    if (this.data.cellphone[0] != '1' || this.data.cellphone.length != 11) {
      this.setData({
        error: '手机号码格式不正确，请重新检查'
      })
      return;
    }
    wx.request({
      url: 'https://kaopu.tech/SubmitSurvey',
      data: {
        test: this.data.test,
        userName: this.data.userName,
        cellphone: this.data.cellphone
      },
      success: res => {
        this.setData({
          test: res.data.test,
          count: res.data.count,
          status: "填报完成"
        })
      }
    })
  },
  bindPickerChange: function (e) {
    this.refreshData(e.detail.value)
  },
  previewImage: function (e) {
    wx.previewImage({
      urls: [e.target.dataset.url],
      current: 'current',
    })
  },
  onShareAppMessage: function (res) {

    return {
      title: this.data.testName || "信息统计助手",
      path: "/pages/coinput/coinput?id=" + this.data.surveyID
    }
  }
})