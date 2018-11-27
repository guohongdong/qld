// pages/mine/report/report.js
import {
  MineModel
} from "../../../models/mine.js"
import Toast from '../../../miniprogram_npm/vant-weapp/toast/index'

let mineModel = new MineModel();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    shop_name: '',
    shop_address: '',
    phone: '',
    name: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {},

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
  onHide: function() {},

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

  onShareAppMessage: function(res) {},
  setrePort() {
    if (!this.data.shop_name) {
      wx.showToast({
        title: '请输入商家名',
        icon: 'none'
      })
      return;
    }
    if (!this.data.shop_address) {
      wx.showToast({
        title: '请输入商家地址',
        icon: 'none'
      })
      return;
    }
    if (!this.data.phone) {
      wx.showToast({
        title: '请输入手机号',
        icon: 'none'
      })
      return;
    }
    if (!this.data.name) {
      wx.showToast({
        title: '请输入姓名',
        icon: 'none'
      })
      return;
    }
    let params = {
      shop_name: this.data.shop_name,
      shop_address: this.data.shop_address,
      phone: this.data.phone,
      name: this.data.name
    }
    mineModel.report(params, res => {
      if (res.message == 'ok') {
        wx.showToast({
          title: '提交成功',
          icon: 'success',
          duration: 2000,
          mask: true,
        })
        setTimeout(() => {
          wx.navigateBack({
            delta: 1
          })
        }, 2000)

      }
    })
  },
  bindKeyInput: function(e) {
    let key = e.target.dataset.key
    this.setData({
      [key]: e.detail.value
    })
  },
})