// pages/mine/concatc/contact.js
import {
  MineModel
} from '../../../models/mine.js';
let mineModel = new MineModel();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: Array,
    category: String
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log(options.category)
    let token = wx.getStorageSync('token');
    if (token) {
      this.setData({
        token: token,
      })
    }
    this.setData({
      category: options.category
    })
    if (options.category == "friend") {
      this._getFriends()
    } else {
      this._getMessages()
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
  _getFriends() {
    mineModel.getFriends(this.data.token, res => {
      console.log(res.data.friends.data)
      this.setData({
        list: res.data.friends.data
      })
    })
  },
  _getMessages() {
    mineModel.getMessages(this.data.token, res => {
      console.log(res)
      this.setData({
        list: res.data.messages.data
      })
    })
  }
})