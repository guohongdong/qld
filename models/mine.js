import {
  Http
} from "../utils/http.js"
let app = getApp();
class MineModel extends Http {
  constructor() {
    super()
  }
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
}
export {
  MineModel
}