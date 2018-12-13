// pages/mine.js
import {
  LoginModel
} from "../../models/login.js"
import {
  GoodsModel
} from "../../models/goods.js"
let app = getApp();
let goodsModel = new GoodsModel();
let loginModel = new LoginModel();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isLogin: false,
    token: "",
    userInfo: {},
    hasComment: false,
    hasUsed: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

    try {
      let token = wx.getStorageSync('token')
      let userInfo = wx.getStorageSync('userInfo')
      if (token && userInfo) {
        if (userInfo.invite_id == 0) {
          loginModel.getUsers(token, res => {
            this.setData({
              isLogin: true,
              token: token,
              userInfo: res.data
            })
            wx.setStorage({
              key: 'userInfo',
              data: res.data
            })
          })
        } else {
          this.setData({
            isLogin: true,
            token: token,
            userInfo: userInfo
          })
        }
        this._orderList();
        this._orderList1();
      }
    } catch (e) {
      console.log(e)
    }

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {},

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {},

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
    goodsModel.orderList(this.data.token, {
      type: 0
    }, res => {
      if (res.message == 'ok') {
        if (res.data.orders.data.length > 0) {
          this.setData({
            hasUsed: true
          })
        }
      }
    })
  },
  _orderList1() {
    goodsModel.orderList(this.data.token, {
      type: 1
    }, res => {
      if (res.message == 'ok') {
        if (res.data.orders.data.length > 0) {
          this.setData({
            hasComment: true
          })
        }
      }
    })
  }
})