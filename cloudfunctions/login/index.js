const cloud = require('wx-server-sdk')
cloud.init({
  env: 'workshop-env-s35x5'
})
const db = cloud.database()

exports.main = async (event, context) => {
  try {
    let empDb = await db.collection('empIdList').where({
      empId:event.empReg
    }).get()
    let empAuth = empDb.data[0].auth
    if(empAuth){
      event.userDetail.empId = event.empReg
      event.userDetail.empAuth = empAuth
      event.userDetail._openid = event.userInfo.openId
    await db.collection('userInfo').add({
      data: event.userDetail
    })
    await db.collection('empIdList').where({
      empId:event.empReg
    }).remove()
  }
    return {
     event
    }
  } catch (error) {
    console.error(error)
  }
}

