//app.js
App({
  globalData:{
  },
  updateFromGlobal: function () {
    
    var pages = getCurrentPages()
    if (pages) {
      pages.forEach(page => {        
        if (page.data.curUser) {
          page.setData({ curUser: this.globalData.curUser })
        }
      })
    }
  },
  onLaunch: function () {    
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力')
    } else {
      wx.cloud.init({ //微信云开发环境初始化
        traceUser: true,
      })
      //去云数据库中拿取当前用户信息
      wx.cloud.database().collection("userInfo").get().then(res=>{
        if(res.errMsg=='collection.get:ok' && res.data.length>0){
          this.globalData.curUser=res.data[0]
          //console.log( this.globalData.curUser)       
            this.updateFromGlobal()         
        }else{
          wx.switchTab({
            url: '../user/user',
          })
        }
      })
    }
  }
})
