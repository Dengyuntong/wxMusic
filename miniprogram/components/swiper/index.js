// components/swiper/index.js
Component({
  attached: function() {
    // 在组件实例进入页面节点树时执行
    // console.log(imgUrls)
  },
  /**
   * 组件的属性列表
   */
  
  properties: {
    indicatorDots: {
      type: Boolean //是否显示小点
    },
    imgUrls: {
      type: Array //接受父组件传的图片数组
    },
    autoplay: {
      type: Boolean //是否自动切换
    },
    interval: {
      type: Number //切换间隔时间
    },
    duration: {
      type: Number //滑动时长
    },
    circular: {
      type: Boolean //是否循环播放
    },
    color: {
      type: String //小点颜色
    },
    currentSwiper: {
      type: Number
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    // indicatorDots: true,
    // autoplay: true, //自动切换
    // interval: 2000, //切换间隔时间
    // duration: 500, //滑动时长
    // imgUrls: this.properties.imgUrls.value
  },

  /**
   * 组件的方法列表
   */
  methods: {
    swiperC: function(e) {
      this.triggerEvent('swiperChange', e.detail.current)
    }
  }
})
