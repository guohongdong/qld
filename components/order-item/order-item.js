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
    goToComment() {
      this.triggerEvent('goToComment', {
        id: this.properties.order.id,
        shop_name: this.properties.order.shop_name,
        shop_address: this.properties.order.shop_address,
      }, {})
    },
    goToConsume() {
      this.triggerEvent('goToConsume', {
        id: this.properties.order.id
      }, {})
    }
  }
})