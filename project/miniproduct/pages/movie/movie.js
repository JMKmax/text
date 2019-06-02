// pages/movie/movie.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.request({
      url: 'https://douban.uieee.com/v2/movie/in_theaters',
      method: 'GET',
      header: {
        "Content-Type": "application/xml"
      },
      data: {
        start: 0,
        count: 4,
        city: '杭州'
      },
      success:function(res){
        console.log(res)
      }
    })
  },

 
})