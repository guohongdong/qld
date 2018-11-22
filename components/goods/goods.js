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

  },
  onReady: function() {
    this.animation = wx.createAnimation()
  },
  /**
   * 组件的方法列表
   */
  methods: {
    bargain: function(event) {
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
    nodata(){}
  }
})