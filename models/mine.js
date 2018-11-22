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
    获取朋友列表
   */
  getFriends(token, success) {
    let params = {
      url: '/api/friends',
      header: {
        'token': token
      },
      success: success
    }
    this.request(params)
  }
  /* 
    获取消息列表
   */
  getMessages(token, success) {
    let params = {
      url: '/api/inviting-messages',
      header: {
        'token': token
      },
      success: success
    }
    this.request(params)
  }
  /* 
    扫码邀请
   */
  inviting(token, id, success) {
    let params = {
      url: '/api/inviting-messages/invite_member_id/' + id,
      method: 'POST',
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
  getCollections(token, id, success) {
    let params = {
      url: '/api/user/collections',
      header: {
        token: token
      },
      success: success,

    }
    this.request(params)
  }
}
export {
  MineModel
}