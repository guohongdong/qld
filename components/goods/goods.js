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
    status: Number,
    distance: String
  },
  attached: function() {
    // 在组件实例进入页面节点树时执行
    let status = this.properties.goods.status
    let distance = this.properties.goods.distance > 1000 ? (this.properties.goods.distance / 1000).toFixed(2) + 'km' : (this.properties.goods.distance * 1).toFixed(2) + 'm'



    this.setData({
      status: status,
      distance: distance
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