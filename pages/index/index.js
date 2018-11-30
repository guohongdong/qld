import {
  GoodsModel
} from "../../models/goods.js"
import {
  MineModel
} from "../../models/mine.js"
import NumberAnimate from '../../utils/NumberAnimate.js'
let goodsModel = new GoodsModel();
let mineModel = new MineModel();
let QQMapWX = require('../../utils/qqmap-wx-jssdk.min.js');
let qqmapsdk;
let app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    token: '',
    index: 0,
    value: '',
    current: 0,
    swiperList: [],
    goodsList: [],
    currentCity: '定位失败',
    shopTypeList: [],
    shop_type_id: '',
    latitude: '',
    longitude: '',
    page: 1,
    isloading: false,
    loadMore: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

    const scene = decodeURIComponent(options.scene);
    if (scene != 'undefined') {
      wx.showModal({
        title: '请先登录',
        confirmText: '去登录',
        success(res) {
          if (res.confirm) {
            wx.navigateTo({
              url: '/pages/login/login'
            })
          } else if (res.cancel) {}
        }
      })
      wx.setStorage({
        key: 'scene',
        data: scene,
      })

    }
    let that = this;
    wx.getLocation({
      type: 'wgs84',
      success: function(res) {
        const latitude = res.latitude;
        const longitude = res.longitude;
        qqmapsdk = new QQMapWX({
          key: 'NLRBZ-UTCWU-22RVQ-B6XQO-6IPO7-H7BSJ'
        });
        qqmapsdk.reverseGeocoder({
          location: {
            latitude: latitude,
            longitude: longitude
          },
          coord_type: 1,
          success: function(res) {
            let currentCity = res.result.address
            that.setData({
              currentCity: currentCity
            })
            wx.setStorageSync('currentCity', currentCity)
          },
          fail: function(res) {}
        });
        wx.setStorageSync('location', {
          latitude: latitude,
          longitude: longitude

        })
      },
    })

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
    let that = this
    let location = wx.getStorageSync('location')
    let token = wx.getStorageSync('token')
    let currentCity = wx.getStorageSync('currentCity')
    if (currentCity) {
      that.setData({
        currentCity: currentCity,
      })
    }
    wx.getLocation({
      type: 'wgs84',
      success: function(res) {
        if ((location.latitude != that.data.latitude) || (token != that.data.token)) {
          that.setData({
            token: token,
            latitude: location.latitude ? location.latitude : res.latitude,
            longitude: location.longitude ? location.longitude : res.longitude,
            page: 1,
            isloading: false,
            loadMore: true,
            goodsList: []
          })
          that._getProducts();
          that._getShopType();
          that._getProductSwiper();
        }
      }
    })
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
  onPullDownRefresh() {
    let currentCity = wx.getStorageSync('currentCity')
    if (currentCity) {
      this.setData({
        currentCity: currentCity,
      })
    }
    wx.showLoading({
      title: '加载中...',
      mask: true,
    })
    setTimeout(() => {
      this.setData({
        goodsList: [],
        page: 1,
        isloading: false,
        loadMore: true,
      })
      this._getProducts()
    }, 1000)
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function(e) {
    this._getProducts()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function(res) {
    if (res.from === 'button') {
      // 来自页面内转发按钮
      return {
        title: res.target.dataset.name,
        path: '/pages/share/share?id=' + res.target.dataset.id + '&shopId=' + res.target.dataset.shopid,
        imageUrl: res.target.dataset.imageurl
      }
    }
  },
  // 搜索 
  onChange(e) {
    let currVal = this.data.value
    this.setData({
      value: e.detail
    });
    if (e.detail == '' && currVal != '') {
      this.setData({
        goodsList: [],
        page: 1,
        isloading: false,
        loadMore: true,
      })
      this._getProducts()
    }
  },

  onSearch(event) {
    if (this.data.value) {
      this.setData({
        goodsList: [],
        page: 1,
        isloading: false,
        loadMore: true
      })
      this._getProducts();
    }
  },
  onCancel() {},
  onClear() {},
  // 切换
  onChangeTab(event) {
    let shop_type_id = this.data.shopTypeList[event.detail.index].id
    this.setData({
      index: event.detail.index,
      goodsList: [],
      shop_type_id: shop_type_id,
      page: 1,
      isloading: false,
      loadMore: true
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
  },
  // 获取商品列表
  _getProducts() {
    if (this.data.isloading || !this.data.loadMore) {
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
      page: this.data.page
    }
    goodsModel.getProducts(this.data.token, params, res => {
      wx.hideLoading();
      wx.stopPullDownRefresh();
      if (res.message == 'ok') {
        if (res.data.data.length == 0) {
          this.setData({
            loadMore: false,
            isloading: false
          })
          return;
        }
        let goodsList = this.data.goodsList.concat(res.data.data)
        goodsList.forEach(item => {
          item.distance = item.distance > 1000 ? (item.distance / 1000).toFixed(2) + 'km' : (item.distance*1).toFixed(2) + 'm'
        })
        let page = this.data.page + 1
        this.setData({
          goodsList: goodsList,
          page: page,
          isloading: false
        })
      }
    })
  },
  // 砍价按钮
  onBargain(event) {
    let token = this.data.token;
    let id = event.detail.id;
    let index = event.target.dataset.index
    let type = event.target.dataset.type

    goodsModel.bargain(token, id, res => {
      if (type == 'swiper') {
        this.setData({
          ['swiperList[' + index + '].loading']: true,
          ['swiperList[' + index + '].bargain_price']: res.data.bargain_price,
        });
      } else {
        this.setData({
          ['goodsList[' + index + '].loading']: true,
          ['goodsList[' + index + '].bargain_price']: res.data.bargain_price,
        });
      }
      setTimeout(() => {

        let n1 = new NumberAnimate({
          from: res.data.last_price + res.data.bargain_price, //开始时的数字
          to: res.data.last_price,
          speed: 1000, // 总时间
          refreshTime: 50, //  刷新一次的时间
          decimals: 2, //小数点后的位数
          onUpdate: () => { //更新回调函数
            if (type == 'swiper') {
              this.setData({
                ['swiperList[' + index + '].loading']: false,
                ['swiperList[' + index + '].last_price']: n1.tempValue,
              });
            } else {
              this.setData({
                ['goodsList[' + index + '].last_price']: n1.tempValue,
                ['goodsList[' + index + '].loading']: false
              });
            }
          },
          onComplete: () => { //完成回调函数
          }
        });
      }, 500)
    })
  },
  // 点击跳转详情
  onTapItem(event) {
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
      let swiperList = res.data.data
      swiperList.forEach(item => {
        item.distance = item.distance > 1000 ? (item.distance / 1000).toFixed(2) + 'km' : (item.distance*1).toFixed(2) + 'm'
      })
      this.setData({
        swiperList: swiperList
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
  _loctaion2name(latitude, longitude) {
    let that = this;

    qqmapsdk = new QQMapWX({
      key: 'NLRBZ-UTCWU-22RVQ-B6XQO-6IPO7-H7BSJ'
    });
    qqmapsdk.reverseGeocoder({
      location: {
        latitude: latitude,
        longitude: longitude
      },
      coord_type: 1,
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
      fail: function(res) {}
    });
  },
  // 重新获取位置
  _getLoctaion(callback) {
    let that = this;
    let location = wx.getStorageSync('location')
    wx.getLocation({
      type: 'wgs84',
      success(res) {
        const latitude = res.latitude
        const longitude = res.longitude
        that._loctaion2name(latitude, longitude)
        that.setData({
          latitude: latitude,
          longitude: longitude,
          goodsList: [],
          page: 1,
          isloading: false,
          loadMore: true
        })
        callback()
        wx.setStorage({
          key: 'location',
          data: {
            latitude: latitude,
            longitude: longitude
          },
        })
        wx.showToast({
          title: '重新定位',
          icon: 'success',
          duration: 3000
        })
      }
    })
  }
})