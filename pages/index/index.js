import {
  GoodsModel
} from "../../models/goods.js"
import {
  MineModel
} from "../../models/mine.js"
import NumberAnimate from '../../utils/NumberAnimate.js'
let goodsModel = new GoodsModel();
let mineModel = new MineModel();
var QQMapWX = require('../../utils/qqmap-wx-jssdk.min.js');
var qqmapsdk;
let app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    token: '',
    shareId: '',
    index: 0,
    value: '',
    current: 0,
    swiperList: [],
    goodsList: [],
    currentCity: '',
    wxCanvas: null,
    shopTypeList: [],
    shop_type_id: 0,
    latitude: '',
    longitude: '',
    page: 1,
    isloading: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

    const scene = 'undefined'
    console.log(scene, 'scene', 'onLoad')
    if (scene != 'undefined') {
      wx.showModal({
        title: '请先登录',
        confirmText: '去登录',
        success(res) {
          if (res.confirm) {
            wx.navigateTo({
              url: '/pages/login/login'
            })
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
      wx.setStorage({
        key: 'scene',
        data: scene,
      })

    }
    let that = this;
    console.log('onLoad')
    wx.getLocation({
      type: 'wgs84',
      success: function(res) {
        const latitude = res.latitude
        const longitude = res.longitude
        that.setData({
          latitude: latitude,
          longitude: longitude
        })
        wx.setStorage({
          key: 'location',
          data: {
            latitude: latitude,
            longitude: longitude
          },
        })
        that._getProducts();
        that._getShopType();
        that._getProductSwiper();
        that._loctaion2name();
      },
    })

    // this._getLoctaion(this._getProducts)
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    console.log('onShow')
    let location = wx.getStorageSync('location')
    let token = wx.getStorageSync('token')
    let currentCity = wx.getStorageSync('currentCity')

    if ((location.latitude && location.latitude != this.data.latitude) || (token != this.data.token)) {
      this.setData({
        token: token,
        currentCity: currentCity,
        latitude: location.latitude,
        longitude: location.longitude,
        page: 1,
        isloading: false,
        goodsList: []
      })
      this._getProducts();
      this._getShopType();
      this._getProductSwiper();
    }
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function(res) {
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
      return {
        title: res.target.dataset.name,
        path: '/pages/share/share?id=' + res.target.dataset.id,
        imageUrl: res.target.dataset.imageurl
      }
    }

  },
  // 搜索 
  onChange(e) {
    this.setData({
      value: e.detail
    });
  },

  onSearch(event) {
    this.setData({
      goodsList: [],
      page: 1,
      isloading: false
    })
    if (this.data.value) {
      this._getProducts();
    }
  },

  onCancel() {
    this.setData({
      goodsList: [],
      page: 1,
      isloading: false,
      value: ''
    })
    this._getProducts()
  },
  onClear() {
    wx.showToast({
      title: '清空',
      icon: 'none'
    });
  },
  lower() {
    this._getProducts()
    console.log('加载更多')
  },
  // 切换
  onChangeTab(event) {
    console.log(event)
    this.setData({
      index: event.detail.index,
      goodsList: [],
      page: 1,
      isloading: false,

    })
    this._getProducts();
  },
  currentChange(e) {
    this.setData({
      current: e.detail.current
    })
  },
  // 重新获取定位
  refreshLocation() {
    this._getLoctaion(this._getProducts)
    wx.showToast({
      title: '重新定位',
      icon: 'success',
      duration: 3000
    })
  },
  // 获取商品列表
  _getProducts() {
    if (this.data.isloading) {
      return
    }

    this.setData({
      isloading: true
    })
    let params = {
      lng: this.data.longitude,
      lat: this.data.latitude,
      shop_type_id: this.data.shop_type_id,
      k: this.data.value,
      page: this.data.page,
      page_size: 3
    }
    goodsModel.getProducts(this.data.token, params, res => {
      let goodsList = [];
      if (!this.data.goodsList.length) {
        console.log(this.data.goodsList.length, 'goodsList.length')
        goodsList = res.data.data
      } else {
        goodsList = this.data.goodsList.concat(res.data.data)
      }
      let page = this.data.page + 1
      this.setData({
        goodsList: goodsList,
        page: page,
        isloading: false
      })
    })
  },
  // 砍价按钮
  onBargain(event) {
    console.log(event)
    let token = this.data.token;
    let id = event.detail.id;
    let index = event.target.dataset.index

    goodsModel.bargain(token, id, res => {
      this.setData({
        ['goodsList[' + index + '].loading']: true,
        ['goodsList[' + index + '].bargain_price']: res.data.bargain_price,
      });
      setTimeout(() => {
        let n1 = new NumberAnimate({
          from: res.data.last_price, //开始时的数字
          speed: 1000, // 总时间
          refreshTime: 50, //  刷新一次的时间
          decimals: 2, //小数点后的位数
          onUpdate: () => { //更新回调函数
            this.setData({
              ['goodsList[' + index + '].last_price']: n1.tempValue,
              ['goodsList[' + index + '].loading']: false
            });
          },
          onComplete: () => { //完成回调函数
          }
        });
      }, 500)
    })
  },
  // 点击跳转详情
  onTapItem(event) {
    console.log(event, 'onTapItem')
    wx.navigateTo({
      url: "/pages/goods-detail/goods-detail?id=" + event.detail.id + "&shopId=" + event.detail.shopId
    })
  },
  // 获取轮播图
  _getProductSwiper() {
    let params = {
      lng: this.data.longitude,
      lat: this.data.latitude
    }
    goodsModel.getProductSwiper(this.data.token, params, res => {
      console.log(res, '轮播')
      this.setData({
        swiperList: res.data.data
      })
    })
  },
  // 获取商品分类
  _getShopType() {
    goodsModel.getShopType(res => {
      if (res.message == 'ok') {
        res.data.shop_type_list.unshift({
          id: '',
          name: "全部"
        })
        this.setData({
          shopTypeList: res.data.shop_type_list
        })
      }
    })
  },
  // 重新获取位置名称
  _loctaion2name() {
    let that = this;
    let latitude = this.data.latitude;
    let longitude = this.data.longitude;
    qqmapsdk = new QQMapWX({
      key: 'NLRBZ-UTCWU-22RVQ-B6XQO-6IPO7-H7BSJ'
    });
    qqmapsdk.reverseGeocoder({
      location: {
        latitude: latitude,
        longitude: longitude
      },
      success: function(res) {
        let currentCity = res.result.address
        that.setData({
          currentCity: currentCity
        })
        wx.setStorage({
          key: 'currentCity',
          data: currentCity,
        })
      },
      fail: function(res) {
        console.log(res);
      }
    });
  },
  // 重新获取位置名称
  _getLoctaion(callback) {
    let that = this;
    wx.getLocation({
      type: 'wgs84',
      success(res) {
        const latitude = res.latitude
        const longitude = res.longitude
        that.setData({
          latitude: latitude,
          longitude: longitude
        })
        wx.setStorage({
          key: 'location',
          data: {
            latitude: latitude,
            longitude: longitude
          },
        })
        callback()
        that._loctaion2name()
      }
    })
  }
})