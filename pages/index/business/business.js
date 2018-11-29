// pages/index/business/business.js
import {
  GoodsModel
} from '../../../models/goods.js'
var QQMapWX = require('../../../utils/qqmap-wx-jssdk.min.js');

let goodsModel = new GoodsModel();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    cityList: [],
    currentLocation: ''

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

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
    let currentCity = wx.getStorageSync('currentCity')
    this.setData({
      currentCity: currentCity
    })
    goodsModel.getShopAreas(res => {
      if (res.message == 'ok') {
        this.setData({
          cityList: res.data.shop_area_list
        })
      }
    })
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
  selectCity(e) {
    this.setData({
      currentCity: e.target.dataset.name
    })
    wx.setStorage({
      key: 'location',
      data: {
        latitude: e.target.dataset.latitude,
        longitude: e.target.dataset.longitude
      }
    })
    wx.setStorage({
      key: 'currentCity',
      data: e.target.dataset.name
    })
    setTimeout(() => {
      wx.navigateBack({
        delta: 1
      })
    }, 500)
  }
})