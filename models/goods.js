import {
  Http
} from "../utils/http.js"

class GoodsModel extends Http {
  constructor() {
    super()
  }
  /* 
   获取商家信息
  */
  getShop(id, success) {
    let params = {
      url: '/api/shops/' + id,
      success: success
    }
    this.request(params)
  };
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
  /* 
    获取轮播图
   */
  getProductSwiper(data, success) {

    let params = {
      url: '/api/products',
      data: data,
      success: success,
    }
    this.request(params)
  }
  /* 
    获取商品详情
   */
  getProductDetail(id, success) {

    let params = {
      url: '/api/products/' + id,
      success: success,

    }
    this.request(params)
  }
  /* 
    砍价
   */
  bargain(token, id, success) {
    console.log(token)
    let params = {
      url: '/api/products/' + id + '/bargain',
      method: 'PUT',
      header: {
        token: token
      },
      success: success,

    }
    this.request(params)
  }
  /* 
    更新浏览量
   */
  pageView(id, success) {
    let params = {
      url: '/api/products/' + id + '/page_view',
      method: 'PUT',
      success: success,

    }
    this.request(params)
  }
  /* 
  收藏商家
 */
  setCollections(token, id, success) {
    let params = {
      url: '/api/shops/' + id + '/collections',
      method: 'POST',
      header: {
        token: token
      },
      success: success,

    }
    this.request(params)
  }
  /* 
   取消收藏商家
  */
  delCollections(token, id, success) {
    let params = {
      url: '/api/shops/' + id + '/collections',
      method: 'DELETE',
      header: {
        token: token
      },
      success: success,

    }
    this.request(params)
  }
  /* 
   检测收藏
  */
  hasCollections(token, id, success) {
    let params = {
      url: '/api/shops/' + id + '/collected',
      header: {
        token: token
      },
      success: success,

    }
    this.request(params)
  }
}
export {
  GoodsModel
}