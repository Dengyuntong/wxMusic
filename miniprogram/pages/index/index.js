//index.js
const app = getApp()
Page({
  // 页面进入时执行
  onLoad: function (options) {
    let _this = this
    //获取右上角胶囊信息
    let capsule = wx.getMenuButtonBoundingClientRect()
    this.setData({
      navMargin: capsule.top + capsule.height + 'px',
      capsuleTop: capsule.top,
      capsuleTop: capsule.height
    })
    //获取设备可视高度
    var windowHeight = wx.getSystemInfoSync().windowHeight
    this.setData({
      bannerHeight: windowHeight * 0.4 + 'px'
    })
    //动态获取导航高度给banner盒子  留出导航位置
    // const query = wx.createSelectorQuery()
    // query.select('.nav').boundingClientRect()
    // query.selectViewport().scrollOffset()
    // query.exec(function (res) {
    //   _this.setData({
        // bannerTop: res[0].height + 'px'
      // })
    // })
  },

  data: {
    imgUrls: ['https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1567951887&di=1b9d68a592cb0d6616ff5a05c1e8f560&imgtype=jpg&er=1&src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201312%2F19%2F20131219230840_PQS2H.jpeg',
      'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1567951931&di=f61f13c60d791ee54577c9681ebe3d8e&imgtype=jpg&er=1&src=http%3A%2F%2Fd.paper.i4.cn%2Fmax%2F2019%2F02%2F19%2F15%2F1550560506485_551861.jpg',
      'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=3753600256,3067042372&fm=26&gp=0.jpg',
      'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=1398154774,427495919&fm=26&gp=0.jpg',
      'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=2281127597,789413214&fm=26&gp=0.jpg'
    ], //banner图片路径
    currentSwiper: 0, //当前图片下标
    animation: '', //动画
    scrollX: ['https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=3911221742,335090404&fm=26&gp=0.jpg',
    'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1567349915208&di=1cd9b910dc97b7355fd16b33d2490a7d&imgtype=0&src=http%3A%2F%2Fku.90sjimg.com%2Fback_pic%2F00%2F15%2F26%2F7756da8bb81daca.jpg%2521%2Fwatermark%2Ftext%2FOTDorr7orqE%3D%2Ffont%2Fsimkai%2Falign%2Fsoutheast%2Fopacity%2F20%2Fsize%2F50',
    'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3170271037,532690002&fm=15&gp=0.jpg',
    'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=1068339778,4263914265&fm=15&gp=0.jpg',
    'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=2945190821,1473119142&fm=15&gp=0.jpg',
    'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1567944827&di=1b922f52dc16fca7e806a37c3f249c08&imgtype=jpg&er=1&src=http%3A%2F%2Fku.90sjimg.com%2Fback_pic%2F03%2F69%2F78%2F0057b54a1585cfc.jpg'], //横向滚动图片路径
    navshowhide: false, //导航显示隐藏
    navAnimation: '', //导航动画
    scrollTop: 0, //存储上一滑动位置
    bannerTop: 0, //banner margin-top的值等于导航栏的高度
    navMargin: 0, //导航margin-top  避开右上角胶囊位置
    listData: [[1, 2], [3, 4], [5, 6], [7, 8], [9, 10], [11, 12]], //列表数据
    bannerHeight: 0, //banner盒子根据屏幕设置高度
    capsuleTop: 0, //右上角胶囊top值
    capsuleHeight: 0, //右上角胶囊高度
  },

  // 页面滚动时执行
  onPageScroll: function (ev) {
    var _this = this;
    //当滚动的top值最大或者最小时，为什么要做这一步是由于在手机实测小程序的时候会发生滚动条回弹，所以为了解决回弹，设置默认最大最小值
    if (ev.scrollTop <= 0) {
      ev.scrollTop = 0;
    }
    //判断浏览器滚动条上下滚动
    if (ev.scrollTop > _this.data.scrollTop || ev.scrollTop == wx.getSystemInfoSync().windowHeight) {
      //向下滑动时隐藏顶部导航
      let animation = wx.createAnimation({
        duration: 500,  //动画持续时长
        timingFunction: 'ease-in-out',  //动画效果
        delay: 200,  //动画延迟时长
        transformOrigin: '50% 50% 0'  //动画原点中心
      })

      animation.top('-19%').opacity(0).step()
      _this.setData({
        navAnimation: animation.export()
      })
    } else {
      //向上滑动时显示顶部导航
      let animation = wx.createAnimation({
        duration: 300,  //动画持续时长
        timingFunction: 'ease-in-out',  //动画效果
        delay: 0,  //动画延迟时长
        transformOrigin: '50% 50% 0'  //动画原点中心
      })

      animation.top('0%').opacity(1).step()
      _this.setData({
        navAnimation: animation.export()
      })
    }
    //给scrollTop重新赋值
    _this.setData({
      scrollTop: ev.scrollTop
    })
  },

  // 获取sweiper当前图片index 给小点使用
  onSwiperChange: function (e) {
    this.setData({
      currentSwiper: e.detail
    })
    // console.log(e.detail)
  },

  //跳转详情页
  gotoItem: function (e) {
    let capsule = wx.getMenuButtonBoundingClientRect()
    let id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '../detail/index?id=' + id +'&capsuleTop='+capsule.top,  //详情id
    })
  }
})
