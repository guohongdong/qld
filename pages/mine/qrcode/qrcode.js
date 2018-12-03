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
    userInfo: {},
    qrcode: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let token = wx.getStorageSync('token')
    let userInfo = wx.getStorageSync('userInfo');
    if (token) {
      this.setData({
        token: token,
        userInfo: userInfo
      })
    }
    // this._getAccessToken(this.getWXACodeUnlimit);
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
    this._getQRCode()
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
  _getQRCode() {
    let that=this
    let data = {
      scene: this.data.userInfo.id,
      width: 280,
    }
    mineModel.getQRCode(data,res=>{
      that.setData({
        qrcode: wx.arrayBufferToBase64(res)
      })
    })
  },
  _getAccessToken(callback) {
    mineModel.getAccessToken(res => {
      let access_token = res.data.access_token;
      let scene = this.data.userInfo.id
      callback(access_token, scene)
    })
  },
  getWXACodeUnlimit(access_token, scene) {
    let that = this;
    wx.request({
      url: 'https://api.weixin.qq.com/wxa/getwxacodeunlimit?access_token=' + access_token,
      data: {
        scene: scene
      },
      method: 'POST',
     
      header: {
        'content-type': 'application/json;charset=utf-8'
      },
      success: function(res) {
       
        that.setData({
          qrcode: wx.arrayBufferToBase64(res.data)
        })
      },
      fail: function(res) {},
      complete: function(res) {},
    })
  }

})