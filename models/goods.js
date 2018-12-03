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
  getProductSwiper(token, data, success) {

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
  bargain(token, id, success, error) {
    let params = {
      url: '/api/products/' + id + '/bargain',
      method: 'PUT',
      header: {
        token: token
      },
      success: success,
      error: error
    }
    this.request(params)
  }
  /* 
    检测砍价
   */
  hasBargain(token, id, success, error) {
    let params = {
      url: '/api/products/' + id + '/bargained',
      header: {
        token: token
      },
      success: success,
      error: error
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
  /* 
   我的传播
  */
  bargainRecords(id, success) {
    let params = {
      url: '/api/products/' + id + '/bargain/records',
      success: success,
    }
    this.request(params)
  }
  /* 
   下单
  */
  createOrder(token, id, success) {
    let params = {
      url: '/api/orders/products/' + id,
      method: 'POST',
      header: {
        token: token
      },
      success: success,

    }
    this.request(params)
  }
  /* 
   订单列表
  */
  orderList(token, data, success) {
    let params = {
      url: '/api/orders',
      header: {
        token: token
      },
      data: data,
      success: success,

    }
    this.request(params)
  }
  /* 
   订单领用
  */
  orderStatus(token, id, data, success) {
    let params = {
      url: '/api/orders/' + id + '/status',
      method: 'PUT',
      header: {
        token: token
      },
      data: data,
      success: success,

    }
    this.request(params)
  }
  /* 
   创建评论
  */
  createComment(token, id, data, success) {
    let params = {
      url: '/api/orders/' + id + '/comments',
      header: {
        token: token
      },
      method: 'POST',
      data: data,
      success: success,

    }
    this.request(params)
  }
  /* 
   评论列表
  */
  commentList(token, id, success) {
    let params = {
      url: '/api/shops/' + id + '/comments',
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