// pages/index/business/business.js
import {
  GoodsModel
} from '../../../models/goods.js'
var QQMapWX = require('../../../utils/qqmap-wx-jssdk.min.js');

var qqmapsdk;
let goodsModel = new GoodsModel();
console.log(goodsModel)
let app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    cityList: [],
    currentLocation: '浙江省杭州市'

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
      if (res.code == 200) {
        console.log(res)
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
        console.log(app.globalData.currentLocation)
        const latitude = res.latitude
        const longitude = res.longitude
        app.globalData.currentLocation.latitude = latitude
        app.globalData.currentLocation.longitude = longitude
        qqmapsdk.reverseGeocoder({
          location: {
            latitude: latitude,
            longitude: longitude
          },
          success: function(res) {
            that.setData({
              currentLocation: res.result.address
            })
            console.log(res);
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
    console.log(e.target.dataset.name)
    console.log(e.target.dataset.latitude)
    console.log(e.target.dataset.longitude)
    this.setData({
      currentLocation: e.target.dataset.name
    })
    app.globalData.currentLocation.name = e.target.dataset.name
    app.globalData.currentLocation.latitude = e.target.dataset.latitude
    app.globalData.currentLocation.longitude = e.target.dataset.longitude
  }
})