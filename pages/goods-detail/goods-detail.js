// pages/goods-detail/goods-detail.js
import {
  GoodsModel
} from "../../models/goods.js"
let goodsModel = new GoodsModel();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: '',
    shopId: '',
    token: 'lceJTfLtYqTrcAbMoQhMMHA2c6jlI5RLx9UXNyqmzsXITkWzgI682dLnrtzF3W6ZCXq8zMCpMqNSxD59q7oQHexK1NdPrLqY96HDcJa8CUiSoYqLM5vOyqNBvWKLPRUnCQoPnhZGUyV336SQUxk5O1OIDYFvwrQW7dHshEzS',
    product_info: {
      name: '',
      image: [],
      market_price: '',
      last_price: '',
      bargain_num: '',
      desc: "",
      is_appointing: '',
      is_unsubscribe: '',
      shop_id: ''
    },
    shop_info: {
      id: '',
      shop_name: "",
      avatar: "",
      address: "",
      mobile: "",
      exchange_time: "",
      exchange_span: 1
    },
    statistics: {
      comment_num: 0,
      star_level: 0
    },
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
    console.log(options.id)
    this.setData({
      id: options.id,
      shopId: options.shopId
    })
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
    this._getProductDetail();
    this._getShop()
    this._hasCollections()
    this._pageView()

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
  onCollect() {
    this.setData({
      collect: !this.data.collect
    })
  },
  // 获取商品详情
  _getProductDetail() {
    goodsModel.getProductDetail(this.data.id, res => {
      this.setData({
        product_info: res.data.product_info
      })
    })
  },
  // 获取店铺详情
  _getShop() {
    goodsModel.getShop(this.data.shopId, res => {
      console.log(res, '商家信息')
      this.setData({
        shop_info: res.data.shop_info,
        statistics: res.data.statistics
      })
    })
  },
  // 更新浏览量
  _pageView() {
    goodsModel.pageView(this.data.id, res => {
      console.log(res)
    })
  },
  // 检测收藏
  _hasCollections() {
    goodsModel.hasCollections(this.data.token, this.data.shopId, res => {
      console.log(res)
      this.setData({
        collect: res.data.if_collected
      })
    })
  },
  // 取消收藏
  _delCollections() {
    goodsModel.delCollections(this.data.token, this.data.shopId, res => {
      console.log(res)
      if (res.message == 'ok') {
        wx.showToast({
          title: '取消收藏',
          icon: 'success',
          duration: 2000
        })
        this.setData({
          collect: false
        })
      }
    })
  },
  // 收藏
  _setCollections() {
    goodsModel.setCollections(this.data.token, this.data.shopId, res => {
      console.log(res)
      if (res.message == 'ok') {
        wx.showToast({
          title: '收藏成功',
          icon: 'success',
          duration: 2000
        })
        this.setData({
          collect: true
        })
      }
    })
  }
})