var { getMovieListData } = require('../../utils/util.js')
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
    var _this = this;
    /*
    wx.request({
      url: 'https://douban.uieee.com/v2/movie/in_theaters',
      method: 'GET',
      header: {
        "Content-Type": "application/xml"
      },
      data: {
        start: 2,
        count: 3,
      },
      success:function(res){
        console.log(res)
        var data = res.data.subjects.map(function(item){
          return {
            coverImg:item.images.large,
            title:item.title,
            stars:item.rating.stars,
            score:item.rating.average
          }
        })
        console.log(data)
        _this.setData({
          inTheatersData: data
        })
      }
    });
    wx.request({
      url: 'https://douban.uieee.com/v2/movie/top250',
      method: 'GET',
      header: {
        "Content-Type": "application/xml"
      },
      data: {
        start: 0,
        count: 3,
      },
      success: function (res) {
        console.log(res)
        var data = res.data.subjects.map(function (item) {
          return {
            coverImg: item.images.large,
            title: item.title,
            stars: item.rating.stars,
            score: item.rating.average
          }
        })
        console.log(data)
        _this.setData({
          topData: data
        })
      }
    })
    */
    var inTheaterUrl = 'https://douban.uieee.com/v2/movie/in_theaters?start=2&count=3';
    var topUrl = 'https://douban.uieee.com/v2/movie/top250?start=0&count=3';
    var commingUrl = 'https://douban.uieee.com/v2/movie/coming_soon?start=0&count=3';
    getMovieListData(inTheaterUrl,function (data) {
      _this.setData({
        inTheatersData: data,
        inTheatersTag:'正在热播',
        inTheatersType:'inTheaters'
      })
    })
    getMovieListData(topUrl,function (data) {
      _this.setData({
        topData: data,
        topTag:'热搜榜单',
        topType:'top'
      })
    })
    getMovieListData(commingUrl,function (data) {
      _this.setData({
        commingData: data,
        commingTag:'即将上映',
        commintType:'comming'
      })
    })
  },
  tapMore:function(ev){
    var type = ev.currentTarget.dataset.type;
    wx.navigateTo({
      url: './movie-more/movie-more?type='+type,
    })
  }
 

})