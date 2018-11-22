// components/start/start.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    start: Number
  },

  /**
   * 组件的初始数据
   */
  data: {
    startArr: Array
  },
  attached: function() {
    let arr = this.convertToStarsArray(this.properties.start)
    console.log(arr)
    this.setData({
      startArr: arr
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