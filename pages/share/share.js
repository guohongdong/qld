// pages/share/share.js
let goodsData = require('../../data/data.js')
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
    isShowBargain: true,
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
      star_level: 5
    },
    recordsList: [],
    goodsList: goodsData.goodsList[0],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let id = options.id
    let shopId = options.shopId
    let token = wx.getStorageSync('token')
    this.setData({
      id: id,
      shopId: shopId,
      token: token
    })

    this._getProductDetail();
    this._getShop()
    this._bargainRecords()
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
  onShareAppMessage: function(res) {
    if (res.from === 'button') {
      // 来自页面内转发按钮
      return {
        title: this.data.product_info.name,
        path: '/pages/share/share?id=' + this.data.id,
        imageUrl: this.data.product_info.image[0]
      }
    }
  },
  _getProductDetail() {
    goodsModel.getProductDetail(this.data.id, res => {
      this.setData({
        product_info: res.data.product_info
      })
    })
  },
  callPhone(e) {
    wx.makePhoneCall({
      phoneNumber: e.target.dataset.phone
    })
  },
  // 获取店铺详情
  _getShop() {
    goodsModel.getShop(this.data.shopId, res => {
      this.setData({
        shop_info: res.data.shop_info,
        statistics: res.data.statistics
      })
    })
  },
  /* 传播列表 */
  _bargainRecords() {
    goodsModel.bargainRecords(this.data.id, res => {
      this.setData({
        recordsList: res.data.members
      })
    })
  },
  onBargain() {

    goodsModel.bargain(this.data.token, this.data.id, res => {
      if (res.message == 'ok') {
        console.log(res)
      } else {
        console.log(res)
        wx.showToast({
          title: res.message,
        })
      }
    }, error => {
      this.setData({
        isShowBargain: false
      })
      console.log(error)
    })
  }
})