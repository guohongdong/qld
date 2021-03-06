// pages/goods-pay/goods-pay.js
import {
  GoodsModel
} from "../../models/goods.js"
let goodsModel = new GoodsModel();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: '',
    code: '',
    token: '',
    tokenTemp: '',
    inputData: {
      input_value: "", //输入框的初始内容
      value_length: 0, //输入框密码位数
      isNext: false, //是否有下一步的按钮
      get_focus: true, //输入框的聚焦状态
      focus_class: true, //输入框聚焦样式
      value_num: [1, 2, 3, 4], //输入框格子数
      height: "80rpx", //输入框高度
      width: "400rpx", //输入框宽度
      see: false, //是否明文展示
      interval: false, //是否显示间隔格子
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    if (options.shopId) {
      this.setData({
        tokenTemp: options.shopId,
      })
    }
    let token = wx.getStorageSync('token');
    if (token) {
      this.setData({
        id: options.id,
        token: token
      })
    } else {
      wx.navigateTo({
        url: "/pages/login/login"
      })
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
    let that = this
    return {
      path: '/pages/goods-pay/goods-pay?id=' + that.data.id + '&shopId=' + that.data.token,
    }
  },
  valueSix(e) {
    this.setData({
      code: e.detail
    })
    this._orderStatus()
  },

  _orderStatus() {
    let data = {
      code: this.data.code
    }
    let token = this.data.tokenTemp ? this.data.tokenTemp : this.data.token;
    goodsModel.orderStatus(token, this.data.id, data, res => {
      if (res.message == 'ok') {
        wx.showToast({
          title: '验证成功',
          icon: 'success',
          duration: 2000,
        })
        setTimeout(function() {
          wx.redirectTo({
            url: '/pages/order/order?type=1'
          })
        }, 2000)
      } else {
        wx.showToast({
          title: res.message,
          icon: 'none',
          duration: 2000,
        })
      }

    })
  }
})