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
    list: [],
    category: '',
    page: 1,
    loadMore: true
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
  lower() {
    if (this.data.category == "friend") {
      this._getFriends()
    } else {
      this._getMessages()
    }
  },
  _getFriends() {
    if (!this.data.loadMore) {
      return;
    }
    mineModel.getFriends(this.data.token, this.data.page, res => {
      if (res.message == 'ok') {
        if (res.data.friends.data.length == 0) {
          this.setData({
            loadMore: false
          })
          return;
        }
        let list = this.data.list.concat(res.data.friends.data)
        let page = this.data.page + 1;
        this.setData({
          list: list,
          page: page
        })
      }
    })
  },
  _getMessages() {
    if (!this.data.loadMore) {
      return;
    }
    mineModel.getMessages(this.data.token, this.data.page, res => {
      if (res.message == 'ok') {
        if (res.data.messages.data.length == 0) {
          this.setData({
            loadMore: false
          })
          return;
        }
        let list = this.data.list.concat(res.data.messages.data)
        let page = this.data.page + 1;
        this.setData({
          list: list,
          page: page

        })
      }
    })
  },
  _changeMessage(e) {
    console.log(e.target.dataset.id, e.target.dataset.status)
    let id = e.target.dataset.id;
    let status = e.target.dataset.status;
    mineModel.changeMessage(this.data.token, id, status, res => {
      console.log(res)
      wx.showToast({
        title: '处理成功',
        icon: 'success',
        duration: 2000,
        mask: true,

      })
    })
  }
})