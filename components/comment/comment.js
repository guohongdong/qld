// components/comment/comment.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    info: Object
  },

  /**
   * 组件的初始数据
   */
  data: {
    start: [1, 1, 1, 1, 1]
  },
  attached: function() {
    // 在组件实例进入页面节点树时执行
    this.setData({
      start: this.convertToStarsArray(this.properties.info.star_level)
    })
  },
  /**
   * 组件的方法列表
   */
  methods: {
    convertToStarsArray(stars) {
      var num = stars.toString().substring(0, 1);
      var array = [];
      for (var i = 1; i <= 5; i++) {
        if (i <= num) {
          array.push(1);
        } else {
          array.push(0);
        }
      }
      return array;
    }
  }
})