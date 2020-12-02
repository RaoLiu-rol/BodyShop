const db=wx.cloud.database();
const app=getApp()
Page({
  data: {
    cellphone: ""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      cellphone: options.cellphone
    })
  },
  onNameChange(e) { //接收用户输入的新手机号
    this.setData({
      cellphone: e.detail.value
    })
  },
  submit() {  //用户点击提交按钮，到数据库中更新新的手机号
    db.collection("userInfo").doc(app.globalData.curUser._id)    //根据当前用户的_id到数据库new_userInfor中更新用户手机号
      .update({
        data: {
          cellphone: this.data.cellphone
        }
      })
      .then(res => {
        app.globalData.curUser.cellphone = this.data.cellphone; //更新全局变量中的用户信息
        app.updateFromGlobal();                                 //从全局变量向所有页面发布新的用户信息
        wx.navigateBack({                                       //自动退回父页面
          delta: 0,
        })
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