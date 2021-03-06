var { getMovieListData } = require('../../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    requesUrl:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var _this = this
    var type = options.type;
    var requestUrl = '';
    var title = ''
    var inTheaterUrl = 'https://douban.uieee.com/v2/movie/in_theaters';
    var topUrl = 'https://douban.uieee.com/v2/movie/top250';
    var commingUrl = 'https://douban.uieee.com/v2/movie/coming_soon';
    switch (type){
      case 'inTheaters':
        requestUrl = inTheaterUrl;
        title = '正在热播'
        break;
      case 'top':
        requestUrl = topUrl;
        title = 'top500'
        break;
      case 'comming':
        requestUrl = commingUrl;
        title = '即将上映'
        break;
    }
    wx.setNavigationBarTitle({
      title: title,
    })
    this.data.requesUrl = requestUrl;
    getMovieListData(requestUrl,function(data){
      _this.setData({
        movies:data
      })
    })
  },
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    var _this = this;
    getMovieListData(this.data.requesUrl, function (data) {
      _this.setData({
        movies: data
      })
    })
  },
})