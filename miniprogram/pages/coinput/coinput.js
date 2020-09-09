// pages/coinput/coinput.js
Page({

  data: {
    testName: "",
    userName: "",
    test: [],
    error: '',
    cellPhone: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({
      title: '加载中',
    })
    var me = this;
    wx.request({
      url: 'https://kaopu.tech/getSurvey?surveyID=1', //仅为示例，并非真实的接口地址
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
            testName: res.data.testName
          })
        }
        wx.setNavigationBarTitle({
          title: me.data.testName,
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
      cellPhone: e.detail.value
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
    this.setData({error:""})
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
    if (!this.data.cellPhone) {
      this.setData({
        error: '您还未填写手机号码，暂时不能提交'
      })
      return;
    };
    if (this.data.cellPhone[0]!='1' || this.data.cellPhone.length!=11) {
      this.setData({
        error: '手机号码格式不正确，请重新检查'
      })
      return;
    }
    const db = wx.cloud.database()
    db.collection('question').add({
      data: this.data,
      success: res => {
        wx.showToast({
          title: '新增记录成功',
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})