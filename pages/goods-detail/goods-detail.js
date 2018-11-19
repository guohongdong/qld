// pages/goods-detail/goods-detail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrls: [
      'https://image.kuaiqiangche.com/data/attachment/2017-12-28/1514436238英朗.jpg?imageView2/2/w/526/interlace/1',
      'https://image.kuaiqiangche.com/data/attachment/2018-07-25/5b57deefea32d.jpg?imageView2/2/w/526/interlace/1',
      'https://image.kuaiqiangche.com/data/attachment/2018-09-11/5b973230bead7.jpg?imageView2/2/w/526/interlace/1',
    ],
    start: [1, 1, 1, 1, 0],
    // 
    commentInfo: {
      name: '记录历史刘看山',
      time: '2018/09/16 21:09',
      content: 'sdlf吉林省吉林市十多个时光飞逝根深蒂固sdlf吉林省吉林市十多个时光飞逝根深蒂固',
      img: '//iconfont.alicdn.com/t/1493123647101.png@100h_100w.jpg',
      images: [
        "//iconfont.alicdn.com/t/1493123647101.png@100h_100w.jpg",
        "//iconfont.alicdn.com/t/1493123647101.png@100h_100w.jpg",
        "//iconfont.alicdn.com/t/1493123647101.png@100h_100w.jpg"
      ],
      start: [1, 1, 1, 0, 0]
    },
    collect: false,
    collected: '/assets/images/collection_fill.png',
    notCollect: '/assets/images/collection.png'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log(options.gid)
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },
  showModal() {
    wx.showModal({
      title: "确认下单吗？",
      success: function(res) {
        if (res.confirm) {
          wx.showToast({
            title: '抢购完成！',
            icon: 'success',
            duration: 2000
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },
  onCollect(){
    this.setData({
      collect:!this.data.collect
    })
  }
})