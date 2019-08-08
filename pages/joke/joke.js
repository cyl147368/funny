var util = require('../../utils/util.js')
Component({
  options: {
    addGlobalClass: true,
  },
  data: {
    
  },
  attached() {
    var that = this;
    requestData(that);
  },
  methods: {
    again : function(){
      var that = this;
      requestData(that);
    }
  }
})

/**
 * 定义几个数组用来存取item中的数据
 */

var title = [];
var content = [];
var itemList = [];
var num = 0;

/**
 * 请求数据
 */
function requestData(that) {
  wx.showToast({
    title: '搞笑加载中',
    icon: 'loading'
  });
  wx.request({
    url: 'https://api.tianapi.com/txapi/joke/',
    data: {
      key: util.TXAPI_KEY,        //天行数据的APIKEY
      num: 10             //每次请求返回的数量
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
      wx.hideToast();
      itemList = [];
      for (var i = 0; i < res.data.newslist.length; i++){
        var data = res.data.newslist[i];
        itemList.push({ title: data.title, content: data.content});
      }
      that.setData({
        items: itemList
      });
      if (wx.pageScrollTo) {
        wx.pageScrollTo({
          scrollTop: 0
        })
      } else {
        wx.showModal({
          title: '提示',
          content: '当前微信版本过低，无法使用该功能，请升级到最新微信版本后重试。'
        })
      }
    }
  });
}