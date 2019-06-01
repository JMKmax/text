const { article } = require('../../../data/db.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isPlaying:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log(options)
    var articleId = options.articleId
    var articles = article[articleId]
    this.setData({...articles})
    //处理收藏状态
    var articles_collection = wx.getStorageSync('articles_collection')
    var isCollect = false;
    if(!articles_collection){
      var data = {}
      data[articleId] = false;
      wx.setStorageSync('articles_collection', data)
    }else{
      isCollect = !!articles_collection[articleId]
    }
    this.setData({...articles,isCollect:isCollect})
    var backgroundAudioManager = wx.getBackgroundAudioManager();
    backgroundAudioManager.onPlay(function () {
      this.setData({
        isPlaying: true
      })
    }.bind(this))
    backgroundAudioManager.onPause(function(){
      this.setData({
        isPlaying:false
      })
    }.bind(this))
    
  },

  tapCollect:function(){
    var articles_collection = wx.getStorageSync('articles_collection')
    var isCollect = articles_collection[this.data.articleId]
    articles_collection[this.data.articleId] = !isCollect;
    wx.setStorageSync('articles_collection', articles_collection) 
    this.setData({
      isCollect:!isCollect
    },function(){
      wx.showToast({
        title: isCollect ? '取消成功' : '收藏成功',
      })
    })
  },
  tapShare:function(){
    var itemList = ['分享到朋友圈','分享到qq','分享到微博']
    wx.showActionSheet({
      itemList: itemList,
      success(res){
        wx.showToast({
          title: itemList[res.tapIndex]+'成功',
        })
      }
    })
  },
  tapMusic:function(){
    var isPlaying = this.data.isPlaying;
    if(isPlaying){
      const backgroundAudioManager = wx.getBackgroundAudioManager();
      backgroundAudioManager.stop()
      this.setData({
        isPlaying: false
      })
    }else{
      const backgroundAudioManager = wx.getBackgroundAudioManager()
      const music = article[this.data.articleId].music;
      backgroundAudioManager.title = music.title,
        backgroundAudioManager.coverImgUrl = music.imgUrl
      // 设置了 src 之后会自动播放
      backgroundAudioManager.src = music.url
      this.setData({
        isPlaying:true
      })
    }
    
  }
})