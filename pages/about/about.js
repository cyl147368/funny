Component({
  options: {
    addGlobalClass: true,
  },
  data: {

  },
  attached() {

  },
  methods: {
    CopyLink(e) {
      wx.setClipboardData({
        data: e.currentTarget.dataset.link,
        success: res => {
          wx.showToast({
            title: '已复制',
            duration: 1000,
          })
        }
      })
    },
    showModal(e) {
      this.setData({
        modalName: e.currentTarget.dataset.target
      })
    },
    hideModal(e) {
      this.setData({
        modalName: null
      })
    },
    showQrcode() {
      wx.previewImage({
        urls: ['cloud://funny.6675-funny-1300008806/zs.jpg']
      })
    },
    hideOption(){
      wx.navigateTo({
        url: '/pages/beautyPic/beautyPic',
      })
    }
  }
})