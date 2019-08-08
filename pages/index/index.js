Page({
  data: {
    PageCur: 'funnyReply'
  },
  NavChange(e) {
    this.setData({
      PageCur: e.currentTarget.dataset.cur
    })
  },
  onLoad: function () {
    
  },
  onShareAppMessage: function () {
    var cur = this.data.PageCur;
    var title;
    if (cur == 'funnyReply'){
        title = '脑洞大开，凡人怎能理解？隐藏功能等你发现！';
    } else if (cur == 'joke'){
      title = '减压有我，生活需要调味剂！隐藏功能等你发现！';
    } else if (cur == 'about') {
      title = '神回复，雷人笑话，尽情大笑！隐藏功能等你发现！';
    }
    return {
      title: title,
      path: '/pages/index/index'
    }
  }

})