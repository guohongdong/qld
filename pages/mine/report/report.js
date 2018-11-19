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
    // wx.hideShareMenu({
    //   success:res=>{
    //     console.log(res)
    //   }
    // })
    wx.getShareInfo({

    })
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

  onShareAppMessage: function(res) {},
  setrePort() {
    // if (!this.data.shop_name) {

    //   return;
    // }
    let params = {
      shop_name: '11',
      shop_address: '22',
      phone: '33',
      name: '44'
    }
    mineModel.report(params, data => {
      console.log(data)
    })
  },
  bindKeyInput: function(e) {
    let key = e.target.dataset.key
    this.setData({
      [key]: e.detail.value
    })
  },
})