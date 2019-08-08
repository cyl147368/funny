var util = require('../../utils/util.js')
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
    //转发
    wx.showShareMenu({
      withShareTicket: true
    })
    var that = this
    itemList = [];
    imgList = [];
    requestData(that, Math.floor(Math.random() * 200));
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
    var that = this
    itemList = [];
    imgList = [];
    mCurrentPage = Math.floor(Math.random() * 200);
    requestData(that, mCurrentPage);
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    var that = this
    requestData(that, mCurrentPage + 1);
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    
  },

  onItemClick: function (event) {
    wx.previewImage({
      current: event.currentTarget.dataset.url, // 当前显示图片的http链接
      urls: imgList // 需要预览的图片http链接列表
    })
  },
})

/**
 * 定义几个数组用来存取item中的数据
 */
var mCurrentPage = Math.floor(Math.random() * 200);
var imgList = [];
var itemList = [];

/**
 * 请求数据
 */
function requestData(that, targetPage) {
  console.log(targetPage);
  wx.showToast({
    title: '图片加载中',
    icon: 'loading'
  });
  wx.request({
    url: 'https://api.tianapi.com/meinv/',
    data: {
      key: util.TXAPI_KEY,        //天行数据的APIKEY
      num: 10,             //每次请求返回的数量
      page: targetPage    //翻页
    },
    header: {
      "Content-Type": "application/json"
    },
    success: function (res) {
      if (res == null ||
        res.data == null ||
        res.data.newslist == null ||
        res.data.newslist.length <= 0) {
        console.error(res.data.msg);
        wx.showToast({
          title: '网络异常',
          icon: 'loading',
          duration: 2000
        })
        return;
      }

      for (var i = 0; i < res.data.newslist.length; i++){
        var url = res.data.newslist[i].picUrl;
        var desc = res.data.newslist[i].description;
        var author = res.data.newslist[i].description;
        var times = res.data.newslist[i].ctime;
        var title = res.data.newslist[i].title;
        itemList.push({ url: url, title: "作者：" + author + " — " + title + " — " + times });
        imgList.push(url);
      }
      that.setData({
        items: itemList
      });
      mCurrentPage = targetPage;
      wx.hideToast();
    }
  });
}