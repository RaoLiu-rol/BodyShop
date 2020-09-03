// pages/coinput/coinput.js
Page({

  data: {
    testName: "",
    userName: "",
    test: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var me = this;
    wx.request({
      url: 'https://kaopu.tech/getSurvey?surveyID=1', //仅为示例，并非真实的接口地址
      success(res) {
        console.log(res)
        if (res.data.errCode == 0) {
          var arr = res.data.data;
          for (var i = 0; i < arr.length; i++) {
            arr[i].options = arr[i].options.split(",")
          }
          me.setData({ test: arr })
          me.setData({ testName: res.data.testName })
        }
      }
    })

  },
  getUserName: function (e) {
    this.setData({ userName: e.detail.value })
  },
  getRadioChoice: function (e) {
    this.data.test[e.target.dataset.idx].choice = e.detail.value
  },
  getCheckboxChoice: function (e) {
    this.data.test[e.target.dataset.idx].choice = e.detail.value.toString()
  },
  sendResult: function () {
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