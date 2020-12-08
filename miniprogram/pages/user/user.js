// pages/index/index.js
const app = getApp()
const db = wx.cloud.database()
Page({
  data: {
    curUser:{},
    show: true,
    empId: '',
  },
  empIdInput: function (e) {
    this.setData({
      empId: e.detail.value
    })
  },
  onGetUserInfo(e) {
    wx.cloud.callFunction({
      name: 'login',
      data: {
        userDetail: e.detail.userInfo,
        empReg: this.data.empId
      }}).then(res=>{
        if (res.result == null) {
          wx.showToast({
            icon: 'none',
            title: '未查到此工号'
          })
        } else {
          this.setData({
            show:false,
            curUser:res.result.event.userDetail
          })
        }
      })
      getApp().globalData.curUser=this.curUser,
      getApp().updateFromGlobal()
  },
  onLoad: function (options) {
    //console.log(app.globalData.curUser)
    this.setData({
      curUser: app.globalData.curUser
    })
    if (this.data.curUser.empId) {
      this.setData({
        show: false
      })
    }else{
      this.setData({
        show: true
      })
    }
  },
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