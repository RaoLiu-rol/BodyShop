const db = wx.cloud.database()
const app=getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    curUser: {}, //用于存储当前用户信息
  },
  bindPickerChange: function (e) {  //更改用户所在的部门
    db.collection("userInfo")  //根据当前用户的ID，更新用户输入的部门
      .doc(getApp().globalData.curUser._id)
      .update({
        data: {
          dept: this.data.deptArray[e.detail.value]
        }
      })
      .then(res => {
        app.globalData.curUser.dept = this.data.deptArray[e.detail.value]   //更新全局变量里面的用户信息
        app.updateFromGlobal();                       //从全局变量向所有页面发布最新的用户信息
      })
  },

  onLoad: function (options) {
    this.setData({curUser:getApp().globalData.curUser})
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