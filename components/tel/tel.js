// components/tel/tel.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    tel: String
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
    callPhone: function(event) {
      wx.makePhoneCall({
        phoneNumber: event.currentTarget.dataset.tel
      })
    }
  }
})