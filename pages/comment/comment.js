// pages/comment/comment.js
import {
  GoodsModel
} from "../../models/goods.js"
let goodsModel = new GoodsModel();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    shopName: '',
    address: '',
    token: '',
    id: '',
    stars: [0, 1, 2, 3, 4],
    normalSrc: '/assets/images/collection.png',
    selectedSrc: '/assets/images/collection_fill.png',
    score: 0,
    content: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let token = wx.getStorageSync('token');
    if (token) {
      this.setData({
        token: token,
        id: options.id,
        shopName: options.shop_name,
        address: options.shop_address
      })
    }

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
  bindinput(e) {
    this.setData({
      content: e.detail.value
    })
  },
  submit_evaluate: function() {
    let data = {
      content: this.data.content,
      star_level: this.data.score
    }
    goodsModel.createComment(this.data.token, this.data.id, data, res => {
      if (res.message == 'ok') {
        wx.showToast({
          title: '评论成功',
          icon: 'success',
          duration: 2000,
        })
        setTimeout(() => {
          wx.redirectTo({
            url: '/pages/order/order?type=all',
          })
        }, 2000)
      }
    })
  },

  //点击左边,半颗星
  select: function(e) {
    var score = e.currentTarget.dataset.score
    this.setData({
      score: score
    })
  }
})