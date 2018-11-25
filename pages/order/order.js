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
  _orderList() {
    let data = {}
    if (this.data.type == 0) {
      Object.assign(data, {
        type: 0
      })
    } else if (this.data.type == 1) {
      Object.assign(data, {
        type: 1
      })
    }
    goodsModel.orderList(this.data.token, data, res => {
      this.setData({
        orderList: res.data.orders.data
      })
    })
  }
})