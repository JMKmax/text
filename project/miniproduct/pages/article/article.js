//获取应用实例
const app = getApp()
const { article } = require('../../data/db.js')
Page({
  /*
  data:{
    article: [
      {
        avator: '../../images/avator/1.jpg',
        date: '2019-05-06',
        title: '我是文章标题',
        img: '../../images/avator/2.jpg',
        desc: '我是描述',
        star: '20',
        view: '30'
      },
      {
        avator: '../../images/avator/2.jpg',
        date: '2019-05-06',
        title: '我是文章标题',
        img: '../../images/avator/1.jpg',
        desc: '我是描述',
        star: '20',
        view: '30'
      }
    ]
  }
  */
  onLoad(options) {
    /*
    var article = [
      {
        avator: '../../images/avator/1.jpg',
        date: '2019-05-06',
        title: '我是文章标题',
        img: '../../images/avator/2.jpg',
        desc: '我是描述',
        star: '20',
        view: '30'
      },
      {
        avator: '../../images/avator/2.jpg',
        date: '2019-05-06',
        title: '我是文章标题',
        img: '../../images/avator/1.jpg',
        desc: '我是描述',
        star: '20',
        view: '30'
      }
    ];
    */
    this.setData({
      article:article
    })
  },
  tapArtileDetail:function(ev){
    console.log(ev)
    var articleId = ev.currentTarget.dataset.articleId
    wx.navigateTo({
      url: './article-detail/article-detail?articleId='+articleId,
    })
  }
})