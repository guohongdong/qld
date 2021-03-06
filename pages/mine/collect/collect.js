// pages/mine/collect/collect.js
import {
  GoodsModel
} from "../../../models/goods.js"
import {
  MineModel
} from '../../../models/mine.js'

let goodsModel = new GoodsModel();
let mineModel = new MineModel();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    page: 1,
    token: '',
    userInfo: {
      id: '',
    },
    collectList: [],
    startX: 0, //开始坐标
    startY: 0,
    loadMore: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let token = wx.getStorageSync('token')
    let userInfo = wx.getStorageSync('userInfo')
    if (token) {
      this.setData({
        token: token,
        userInfo: userInfo
      })
      this._getCollections()
    }
  },
  //手指触摸动作开始 记录起点X坐标
  touchstart: function(e) {
    //开始触摸时 重置所有删除
    this.data.collectList.forEach(function(v, i) {
      if (v.isTouchMove) //只操作为true的
        v.isTouchMove = false;
    })
    this.setData({
      startX: e.changedTouches[0].clientX,
      startY: e.changedTouches[0].clientY,
      collectList: this.data.collectList
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
  openLocation(e) {
    wx.openLocation({
      latitude: parseFloat(e.currentTarget.dataset.latitude),
      longitude: parseFloat(e.currentTarget.dataset.longitude),
      scale: 18,
      name: e.currentTarget.dataset.shopname,
      address: e.currentTarget.dataset.address,
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
  },
  callPhone(e) {
    wx.makePhoneCall({
      phoneNumber: e.target.dataset.phone
    })
  },
  touchmove: function(e) {
    var that = this,
      index = e.currentTarget.dataset.index, //当前索引
      startX = that.data.startX, //开始X坐标
      startY = that.data.startY, //开始Y坐标
      touchMoveX = e.changedTouches[0].clientX, //滑动变化坐标
      touchMoveY = e.changedTouches[0].clientY, //滑动变化坐标
      //获取滑动角度
      angle = that.angle({
        X: startX,
        Y: startY
      }, {
        X: touchMoveX,
        Y: touchMoveY
      });
    that.data.collectList.forEach(function(v, i) {
      v.isTouchMove = false
      //滑动超过30度角 return
      if (Math.abs(angle) > 30) return;
      if (i == index) {
        if (touchMoveX > startX) //右滑
          v.isTouchMove = false
        else //左滑
          v.isTouchMove = true
      }
    })
    //更新数据
    that.setData({
      collectList: that.data.collectList
    })
  },
  /**
   * 计算滑动角度
   * @param {Object} start 起点坐标
   * @param {Object} end 终点坐标
   */
  angle: function(start, end) {
    var _X = end.X - start.X,
      _Y = end.Y - start.Y
    //返回角度 /Math.atan()返回数字的反正切值
    return 360 * Math.atan(_Y / _X) / (2 * Math.PI);
  },
  //删除事件
  _delCollections: function(e) {
    this.data.collectList.splice(e.currentTarget.dataset.index, 1)
    this.setData({
      collectList: this.data.collectList
    })
    goodsModel.delCollections(this.data.token, e.target.dataset.id, res => {
      if (res.message == 'ok') {
        wx.showToast({
          title: '取消收藏',
          icon: 'success',
          duration: 2000
        })
      }
    })
  },
  _getCollections() {

    if (!this.data.loadMore) {
      return;
    }
    let token = this.data.token;
    let userId = this.data.userInfo.id;

    mineModel.getCollections(token, userId, this.data.page, res => {
      let that = this;
      if (res.message == 'ok') {
        if (res.data.shop_collection.data.length == 0) {
          this.setData({
            loadMore: false
          })
          return;
        }
        let list = this.data.collectList.concat(res.data.shop_collection.data)
        list.forEach(function(item) {
          item.statistics.star_level = that.convertToStarsArray(item.statistics.star_level == 0 ? 5 : item.statistics.star_level)
        })
        let page = this.data.page + 1;
        this.setData({
          collectList: list,
          page: page
        })
      }
    })
  },
  convertToStarsArray(stars) {
    var num = stars.toString().substring(0, 1);
    var array = [];
    for (var i = 1; i <= 5; i++) {
      if (i <= num) {
        array.push(1);
      } else {
        array.push(0);
      }
    }
    return array;
  }
})