import {
  Http
} from "../utils/http.js"

class GoodsModel extends Http {
  constructor() {
    super()
  }
  /* 
   获取商家类型列表
  */
  getShopType(success) {
    let params = {
      url: '/api/platform/shop_types',
      success: success
    }
    this.request(params)
  };
  /* 
    获取商圈
   */
  getShopAreas(success) {
    let params = {
      url: '/api/platform/shop_areas',
      success: success
    }
    this.request(params)
  }
  /* 
    获取商品列表
   */
  getProducts(token, data, success) {

    let params = {
      url: '/api/products',
      header: {
        'token': token
      },
      data: data,
      success: success,

    }
    this.request(params)
  }
}
export {
  GoodsModel
}