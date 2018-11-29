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
    token: '',
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
    comment_num: 0,
    star_level: [0, 0, 0, 0, 0],
    commentList: [],
    start: [1, 1, 1, 1, 0],
    collect: false,
    collected: '/assets/images/collection_fill.png',
    notCollect: '/assets/images/collection.png'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
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
    let token = wx.getStorageSync('token')
    if (token) {
      this.setData({
        token: token
      })
      this._hasCollections();
    }
    this._getProductDetail();
    this._getShop();
    this._pageView();
    this._commentList();

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
    let that = this
    wx.showModal({
      title: "确认下单吗？",
      success: function(res) {
        if (res.confirm) {
          that._createOrder()
        } else if (res.cancel) {}
      }
    })
  },
  callPhone(e) {
    wx.makePhoneCall({
      phoneNumber: e.target.dataset.phone
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
      this.setData({
        shop_info: res.data.shop_info,
        star_level: this.convertToStarsArray(res.data.statistics.star_level),
        comment_num: res.data.statistics.comment_num
      })
    })
  },
  // 更新浏览量
  _pageView() {
    goodsModel.pageView(this.data.id, res => {})
  },
  // 检测收藏
  _hasCollections() {
    goodsModel.hasCollections(this.data.token, this.data.shopId, res => {
      this.setData({
        collect: res.data.if_collected
      })
    })
  },
  // 取消收藏
  _delCollections() {
    goodsModel.delCollections(this.data.token, this.data.shopId, res => {
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
  },
  _createOrder() {
    goodsModel.createOrder(this.data.token, this.data.id, res => {
      wx.showToast({
        title: '抢购完成！',
        icon: 'success',
        duration: 2000
      })
      wx.navigateTo({
        url: '/pages/order/order?type=0'
      })
    })
  },
  _commentList() {
    goodsModel.commentList(this.data.token, this.data.shopId, res => {
      this.setData({
        commentList: res.data.comments.data
      })
    })
  },
  convertToStarsArray(stars) {
    var num = stars.toString().substring(0, 1);
    var array = [];
    for (var i = 1; i <= 5; i++) {
      if (i <= num) {
        array.push(1);
      } else {
        array.push(0);
      }
    }
    return array;
  }
})