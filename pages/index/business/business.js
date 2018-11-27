// pages/index/business/business.js
import {
  GoodsModel
} from '../../../models/goods.js'
var QQMapWX = require('../../../utils/qqmap-wx-jssdk.min.js');

var qqmapsdk;
let goodsModel = new GoodsModel();
let app = getApp();
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
    goodsModel.getShopAreas(res => {
      if (res.message == 'ok') {
        this.setData({
          cityList: res.data.shop_area_list
        })
      }
    })
    qqmapsdk = new QQMapWX({
      key: 'NLRBZ-UTCWU-22RVQ-B6XQO-6IPO7-H7BSJ'
    });
    let that = this;
    wx.getLocation({
      type: 'wgs84',
      success(res) {
        const latitude = res.latitude
        const longitude = res.longitude
        qqmapsdk.reverseGeocoder({
          location: {
            latitude: latitude,
            longitude: longitude
          },
          success: function(res) {
            that.setData({
              currentLocation: res.result.address
            })
          },
          fail: function(res) {
            console.log(res);
          }
        });
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
      currentLocation: e.target.dataset.name
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