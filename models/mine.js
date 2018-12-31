import {
  Http
} from "../utils/http.js"
let app = getApp();
class MineModel extends Http {
  constructor() {
    super()
  }
  /* 
    举报
   */
  report(data, success) {
    let params = {
      url: '/api/report',
      method: 'POST',
      data: data,
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: success
    }
    this.request(params)
  }
  /* 
    商家入驻
   */
  register(data, success) {
    let params = {
      url: '/api/shop_register',
      method: 'POST',
      data: data,
      header: {
        'content-type': 'application/json;charset=utf-8'
      },
      success: success
    }
    this.request(params)
  }
  /* 
    获取 access_token
   */
  getAccessToken(success) {
    let params = {
      url: '/api/wechat/access_token',
      success: success
    }
    this.request(params)
  }
  /* 
    获取 小程序码
   */
  getQRCode(data, success) {
    let params = {
      url: '/api/user/invite_QRCode',
      method:'POST',
      data: data,
      header: {
        'content-type': 'application/json;charset=utf-8'
      },
      responseType: 'arraybuffer',      
      success: success
    }
    this.request(params)
  }
  /* 
    获取朋友列表
   */
  getFriends(token, page, success) {
    let params = {
      url: '/api/friends',
      header: {
        'token': token
      },
      data: {
        page: page
      },
      success: success
    }
    this.request(params)
  }
  /* 
    获取消息列表
   */
  getMessages(token, page, success) {
    let params = {
      url: '/api/inviting-messages',
      header: {
        'token': token
      },
      data: {
        page: page
      },
      success: success
    }
    this.request(params)
  }
  /* 
    扫码邀请
   */
  inviting(token, id, success, error) {
    let params = {
      url: '/api/inviting-messages/invite_member_id/' + id,
      method: 'POST',
      header: {
        'token': token
      },
      success: success,
      error: error
    }
    this.request(params)
  }
  /* 
    邀请消息处理
   */
  changeMessage(token, id, status, success) {
    let params = {
      url: '/api/inviting-messages/' + id + '/status/' + status,
      method: 'PUT',
      header: {
        'token': token
      },
      success: success
    }
    this.request(params)
  }

  /* 
   获取收藏列表
  */
  getCollections(token, id, page, success) {
    let params = {
      url: '/api/user/collections',
      header: {
        token: token
      },
      data: {
        page: page
      },
      success: success,

    }
    this.request(params)
  }
}
export {
  MineModel
}