//index.js
//获取应用实例
const app = getApp()

Page({
  tapMotto:function(){
    // console.log('tapMotto')
    // wx.redirectTo({
    //   url: '/pages/article/article'
    // })
    wx.switchTab({
      url: '/pages/article/article',
    })
  }
})
