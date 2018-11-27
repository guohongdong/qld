// pages/order/order.js
import {
  GoodsModel
} from "../../models/goods.js"
let goodsModel = new GoodsModel();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    type: '',
    page: 1,
    loadMore: true,
    orderList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      type: options.type
    })
    let token = wx.getStorageSync('token')
    this.setData({
      token: token
    })
    this._orderList()
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
  goToComment(e) {
    console.log(e.detail)
    wx.navigateTo({
      url: "/pages/comment/comment?id=" + e.detail.id + '&shop_address=' + e.detail.shop_address + '&shop_name=' + e.detail.shop_name
    })
  },
  goToConsume(e) {
    console.log(e.detail)
    wx.navigateTo({
      url: "/pages/goods-pay/goods-pay?id=" + e.detail.id
    })
  },
  _orderList() {
    if (!this.data.loadMore) {
      return;
    }
    let data = {}
    if (this.data.type == 0) {
      Object.assign(data, {
        type: 0,
        page: this.data.page
      })
    } else if (this.data.type == 1) {
      Object.assign(data, {
        type: 1,
        page: this.data.page
      })
    } else {
      Object.assign(data, {
        page: this.data.page
      })
    }
    goodsModel.orderList(this.data.token, data, res => {
      if (res.message == 'ok') {
        if (res.data.orders.data.length == 0) {
          this.setData({
            loadMore: false
          })
          return;
        }

        let list = this.data.orderList.concat(res.data.orders.data)
        let page = this.data.page + 1;
        this.setData({
          orderList: list,
          page: page
        })
      }
    })
  }
})