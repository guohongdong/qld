import {
  Http
} from "../utils/http.js"
let app = getApp();
class LoginModel extends Http {
  constructor() {
    super()
  }
  getToken(success) {
    let that = this;
    let params = {
      url: '/api/wechat/trd_token',
      success: success
    }

    wx.login({
      success: function(res) {
        if (res.code) {
          params.data = {
            code: res.code
          }
          that.request(params)
        }
      },
      fail: function(res) {
        console.log(res)
      }
    })
  };
  login(token, success) {
    let that = this;
    let params = {
      url: '/api/login',
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: success
    }
    wx.getSetting({
      success: function(res) {
        if (res.authSetting['scope.userInfo']) {
          wx.getUserInfo({
            withCredentials: true,
            success: function(res) {
              let userInfolocal = res.userInfo;
              console.log(userInfolocal)
              params.data = {
                "token": token,
                "userInfo[nickName]": userInfolocal['nickName'],
                "userInfo[gender]": userInfolocal['gender'],
                "userInfo[province]": userInfolocal['province'],
                "userInfo[city]": userInfolocal['city'],
                "userInfo[country]": userInfolocal['country'],
                "userInfo[avatarUrl]": userInfolocal['avatarUrl']
              }

              that.request(params)
            },
            fail: function(res) {
              console.log(res)
            }
          })
        }
      },
      fail: function(res) {}
    })
  };
  getUsers(token, success) {

    let params = {
      url: '/api/user/info',
      data: {
        token: token
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: success
    }
    this.request(params)
  }
}
export {
  LoginModel
}