// pages/coinput/coinput.js
Page({

  data: {
    userName: "",
    test: [
      {
        "title": "一汽-大众的英文缩写是什么？",
        "img": "../../images/1.jpg",
        type: "单选题",
        options: ["FAW-VW", "TFTM", "SVW", "FAW-CAR"]
      },
      {
        "title": "一汽-大众2020年的利润目标是多少？",
        type: "单选题",
        options: ["100亿", "200亿", "300亿", "400亿"]
      },
      {
        "title": "一汽-大众旗下有哪些汽车品牌？",
        "img": "../../images/3.jpg",
        type: "多选题",
        options: ["大众品牌", "奥迪品牌", "捷达品牌", "西亚特品牌"]
      },
      {
        "title": "一汽-大众的车型平台包含哪些平台？",
        type: "多选题",
        options: ["MQB平台", "MLB平台", "MEB平台", "MSB平台"]
      },
    ],
    question: {
      "title": "一汽大众的英文缩写是什么？",
      "img": "../../images/1.jpg"
    },
    options: ["FAW-VW", "TFTM", "SVW", "FAW-CAR"],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // var question = this.data.question
    // var options = this.data.options
    wx.request({
      url: 'https://kaopu.tech/getSurvey?serveryID=1', //仅为示例，并非真实的接口地址
      success (res) {
        console.log(res.data)
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