function getMovieListData(url,success){
  wx.request({
    url: url,
    method: 'GET',
    header: {
      "Content-Type": "application/xml"
    },
    success: function (res) {
      success(mapData(res.data.subjects))
    }
  });
}
function mapData(data){
  return data.map(function (item) {
    return {
      coverImg: item.images.large,
      title: item.title,
      stars: coverStarArray(item.rating.stars),
      score: item.rating.average
    }
  })
}
function coverStarArray(stars){
  var num = stars.toString().substring(0,1);
  var arr = [];
  for(var i = 1;i<=5;i++){
    if(i<=num){
      arr.push(1)
    }else{
      arr.push(0)
    }
  }
  return arr;
}
module.exports = {
  getMovieListData: getMovieListData
}
