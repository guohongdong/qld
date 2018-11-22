import {
  config
}
from "../config"

class Http {
  constructor() {
    this.baseResUrl = config.apiUrl
  }
  request(params) {
    let that = this;
    let url = this.baseResUrl + params.url;

    if (!params.method) {
      params.method = "GET";
    }
    wx.request({
      url: url,
      data: params.data,
      header: {
        'content-type': params.header ? params.header['content-type'] ? params.header['content-type'] : 'application/json' : 'application/json',
        'token': params.header ? params.header['token'] ? params.header['token'] : '' : '',

      },
      method: params.method,
      success: function(res) {
        let code = res.statusCode.toString();
        let startChar = code.charAt(0);
        if (startChar == '2') {
          params.success && params.success(res.data)
        } else {
          params.error && params.error(res)
        }
      },
      fail: function(res) {
        params.fail && params.fail(res)
      }
    })
  }
}

export {
  Http
}