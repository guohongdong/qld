// components/order-item/order-item.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    order: Object
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    gotocomment() {
      wx.navigateTo({
        url: "/pages/comment/comment"
      })
    },
    gotoconsume() {
      wx.navigateTo({
        url: "/pages/goods-pay/goods-pay"
      })
    }
  }
})