// pages/login/login.js
import {
  LoginModel
} from "../../models/login.js"
import {
  MineModel
} from "../../models/mine.js"
let mineModel = new MineModel();
let loginModel = new LoginModel();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    token: ''
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
  login(e) {

    if (e.detail.errMsg != 'getUserInfo:ok') {
      return;
    }
    let that = this;
    let scene = wx.getStorageSync('scene');
    wx.getSetting({
      success: function(res) {
        // 获取 token
        loginModel.getToken((res) => {
          let locToken = res.data.token
          that.setData({
            token: locToken
          })

          wx.setStorage({
            key: 'token',
            data: res.data.token
          })

          // 登录
          loginModel.login(locToken, res => {

            if (res.message == "ok") {
              // 获取用户信息
              loginModel.getUsers(locToken, function(res) {

                if (res.message == 'ok') {
                  wx.setStorage({
                    key: 'userInfo',
                    data: res.data
                  })
                  if (scene && res.data.invite_id == 0) {
                    mineModel.inviting(this.data.token, scene, res => {
                      wx.showToast({
                        title: '邀请成功',
                        icon: 'success',
                        duration: 2000,
                      })
                      setTimeout(() => {
                        wx.navigateBack({
                          delta: 1,
                        })
                      }, 2000)
                    }, err => {
                      setTimeout(() => {
                        wx.navigateBack({
                          delta: 1,
                        })
                      }, 2000)
                    })
                  } else {
                    wx.showToast({
                      title: '登录成功',
                      icon: 'success',
                      duration: 2000,
                    })
                    setTimeout(() => {
                      wx.navigateBack({
                        delta: 1,
                      })
                    }, 2000)
                  }
                }
              })
            }
          })
        })
      }
    })
  }
})