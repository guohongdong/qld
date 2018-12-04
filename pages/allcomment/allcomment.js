// pages/allcomment/allcomment.js
import {
  GoodsModel
} from "../../models/goods.js"
let goodsModel = new GoodsModel();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    page: 1,
    id: '',
    loadMore: true,
    commentList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      id: options.id
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
    let token = wx.getStorageSync('token')
    this.setData({
      token: token
    })
    this._commentList()
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
  _commentList() {
    if (!this.data.loadMore) {
      return;
    }

    goodsModel.commentList(this.data.token, this.data.id, res => {
      if (res.message == 'ok') {
        if (res.data.comments.data.length == 0) {
          this.setData({
            loadMore: false
          })
          return;
        }

        let list = this.data.commentList.concat(res.data.comments.data)
        let page = this.data.page + 1;
        this.setData({
          commentList: list,
          page: page
        })
      }
    })
  }
})