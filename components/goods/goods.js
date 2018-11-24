// components/goods/goods.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    goods: Object,
    type: String,
    borderBottom: String
  },

  /**
   * 组件的初始数据
   */
  data: {
    status: Number
  },
  attached: function() {
    // 在组件实例进入页面节点树时执行
    let status = this.properties.goods.status
    this.setData({
      status: status
    })
  },
  onReady: function() {},
  /**
   * 组件的方法列表
   */
  methods: {
    bargain: function(event) {
      this.setData({
        status: 6
      })
      this.triggerEvent('onBargain', {
        id: this.properties.goods.id
      }, {})
    },
    onTapItem: function(event) {
      this.triggerEvent('onTapItem', {
        id: this.properties.goods.id,
        shopId: this.properties.goods.shop_id
      }, {})
    },
    share() {},
    nodata() {}
  }
})