// pages/login/login.js
import {
  LoginModel
} from "../../models/login.js"

let app = getApp()
let loginModel = new LoginModel();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let redirect = options.redirect
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
  login() {
    wx.showLoading({
      title: '加载中',
    })
    // 获取 token
    loginModel.getToken((res) => {
      // 全局设置token
      console.log(res, 'getToken')
      let locToken = res.data.token
      wx.setStorage({
        key: 'token',
        data: res.data.token,
        success: function(res) {
          console.log(res)
        },

      })
      app.globalData.token = locToken
      // 登录
      loginModel.login(locToken, res => {
        console.log(res, 'login')
        if (res.message == "ok") {
          // 获取用户信息
          loginModel.getUsers(locToken, function(res) {
            console.log(res, 'getUsers')
            if (res.message == 'ok') {
              app.globalData.userInfo = res.data
              wx.setStorage({
                key: 'userInfo',
                data: res.data,
                success: function(res) {
                  console.log(res)
                },

              })
              wx.showToast({
                title: '成功',
                icon: 'success',
                duration: 2000,
                success(res) {
                  wx.navigateBack({
                    delta: 1
                  })
                }
              })
            }
          })
        }
      })
    })
  }
})