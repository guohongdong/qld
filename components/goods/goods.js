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
      // this.animation.rotate(360).step()
      // this.setData({
      //   animation: this.animation.export()
      // })
      wx.navigateTo({
        url: "/pages/share/share"
      })
    },
    onTap: function(event) {
      this.triggerEvent('goodstap', {
        gid: this.properties.goods.id
      }, {})
      wx.navigateTo({
        url: "/pages/goods-detail/goods-detail?gid=" + this.properties.goods.id
      })
    }
  }
})