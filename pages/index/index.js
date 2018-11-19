let goodsData = require('../../data/data.js')
var wxDraw = require("../../utils/wxdraw.min.js").wxDraw;
var Shape = require("../../utils/wxdraw.min.js").Shape;
import {
  GoodsModel
} from "../../models/goods.js"

let goodsModel = new GoodsModel()
var QQMapWX = require('../../utils/qqmap-wx-jssdk.min.js');
var qqmapsdk;
let app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    current: 0,
    goodsList: goodsData.goodsList[0],
    currentLocation: '浙江省杭州市',
    wxCanvas: null,
    shopTypeList: [],
    shop_type_id: 1,
    latitude: '',
    longitude: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    goodsModel.getShopType(res => {
      console.log(res)
      this.setData({
        shopTypeList: res.data.shop_type_list
      })
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
    if (!app.globalData.currentLocation.latitude) {
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
              app.globalData.currentLocation.neme = res.result.address
              // console.log(res);
            },
            fail: function(res) {
              console.log(res);
            }
          });
        }
      })
    } else {
      this.setData({
        currentLocation: app.globalData.currentLocation.name
      })
    }

    this._getProducts()

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
  onChange(event) {
    console.log(event)
    this.setData({
      goodsList: goodsData.goodsList[event.detail.index]
    })
  },
  currentChange(e) {
    this.setData({
      current: e.detail.current
    })
  },
  refreshLocation() {
    wx.showToast({
      title: '重新定位',
      icon: 'success',
      duration: 3000
    })
  },
  _getProducts() {
    let params = {
      lng: '120.1421',
      lat: '30.31974',
      shop_type_id: 0,
      // is_recommend 
      //    page
    }
    console.log(app.globalData.currentLocation.longitude)
    goodsModel.getProducts(this.token, params, res => {
      console.log(res)
      this.setData({
        goodsList: res.data.data
      })
    })
  }
})