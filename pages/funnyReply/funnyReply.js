var util = require('../../utils/util.js')
Component({
  options: {
    addGlobalClass: true,
  },
  data: {},
  attached () {
    var that = this
    requestData(that);
  },
  methods: {
    Tianapi : function() {
      var that = this
      requestData(that);
    }
  }
})

function requestData(that) {
  wx.showToast({
    title: '搞笑加载中',
    icon: 'loading'
  });
  wx.request({
    url: 'https://api.tianapi.com/txapi/godreply/', //天行数据历史一句话接口
    data: {
      key: util.TXAPI_KEY  //apikey请在https://www.tianapi.com中获得
    },
    success: function (res) {
      wx.hideToast();
      if (res.data.code == 200){
        that.setData({
          title: res.data.newslist[0].title,
          content: res.data.newslist[0].content
        })
      }else{
        wx.showToast({
          title: '网络异常',
          icon: 'loading',
          duration: 2000
        })
      }
    },
    fail: function (err) {
      console.log(err)
    }
  })
}