// pages/share/share.js
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
      last_price: ''
    },
    shop_info: {
      id: '',
      shop_name: "",
      avatar: "",
      address: "",
      mobile: ""
    },
    comment_num: 0,
    star_level: [0, 0, 0, 0, 0],
    recordsList: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let id = options.id
    let shopId = options.shopId
    this.setData({
      id: id,
      shopId: shopId
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
    }
    this._getProductDetail();
    this._getShop()
    this._bargainRecords()
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
        path: '/pages/share/share?id=' + this.data.id + '&shopId=' + this.data.shopId,
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
      console.log(res.data.statistics.star_level)
      this.setData({
        shop_info: res.data.shop_info,
        star_level: this.convertToStarsArray(res.data.statistics.star_level),
        comment_num: res.data.statistics.comment_num
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
        this._getProductDetail();
        this._bargainRecords()
        this.setData({
          isShowBargain: false
        })
      } else {
        wx.showToast({
          title: res.message,
        })
      }
    }, error => {
      this.setData({
        isShowBargain: false
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