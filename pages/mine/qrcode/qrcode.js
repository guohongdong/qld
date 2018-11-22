// pages/qrcode/qrcode.js
import {
  MineModel
} from "../../../models/mine.js";
let app = getApp();
let mineModel = new MineModel();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    token: '',
    userInfo: {}
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
    let token = app.globalData.token;
    let userInfo = app.globalData.userInfo;
    if (token) {
      this.setData({
        token: token,
        userInfo: userInfo
      })
    }
    this._getAccessToken(this.getWXACodeUnlimit);
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
  _getAccessToken(callback) {
    mineModel.getAccessToken(res => {
      console.log(res)
      let access_token = res.data.access_token;
      let scene = this.data.userInfo.invite_id
      callback(access_token, scene)
    })
  },
  getWXACodeUnlimit(access_token, scene) {
    wx.request({
      url: 'https://api.weixin.qq.com/wxa/getwxacodeunlimit?access_token=ACCESS_TOKEN',
      data: {
        access_token: access_token,
        scene: scene
      },
      dataType: 'json',
      method: 'POST',
      header: {
        'content-type': 'application/json'
      },
      success: function(res) {
        console.log(res, 'getWXACodeUnlimit')
      },
      fail: function(res) {},
      complete: function(res) {},
    })
  }

})