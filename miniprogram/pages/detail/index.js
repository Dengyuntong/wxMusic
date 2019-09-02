// miniprogram/pages/detail/index.js
let backgroundAudioManager = wx.getBackgroundAudioManager() //当前播放音乐信息
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: '', // 详情id
    boxHeight: '', // 主盒子高度
    capsuleHeight: 0, //右侧胶囊高度
    capsuleTop: 0, // 右侧胶囊top值
    start: false, //播放暂停开关
    currentTime: 0, //记录当前播放时间
    duration: 'undefined', //记录音乐总时长
    Time1: '00:00', //当前时间
    Time2: '00:00', //总时间
    audioTime: 0, //进度条长度
    huadong: true, //滑动时为false则不在给当前时间赋值
    // durationIntval: null //计算播放进度的计时器
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      id: options.id,
      capsuleTop: options.capsuleTop * 1 + 6 + 'px',
      boxHeight: wx.getSystemInfoSync().windowHeight + 'px' //动态获取屏幕高度赋值给父盒子
    })
    this.playMusic()
  },

  playMusic: function () {
    //执行播放
    wx.playBackgroundAudio({
      dataUrl: 'https://m8.music.126.net/20190902223822/07ed61eee36aef184d2b2d0a9515af7c/yyaac/0508/0e5b/015b/2bd724b6ca912b7bbfc261127d74b60d.m4a'
    })
    //异步获取音乐时长
    let outTime = setInterval(() => {
      if(this.data.duration == 'undefined') {
        let num = Math.round(backgroundAudioManager.duration)
        if(num !== 'NaN') {
          var min = parseInt(num / 60);
          var sec = parseInt(num % 60);
          if (min.toString().length == 1) {
            min = `0${min}`;
          }
          if (sec.toString().length == 1) {
            sec = `0${sec}`;
          }
          this.setData({
            Time2: min + ':' + sec,
            start: true,
            duration: Math.round(num)
          })
        }
      } else {
        //确定duration已经赋值 清除定时器
        clearInterval(outTime)
        return
      }
    }, 100)
  },

  //点击播放暂停
  start: function() {
    this.setData({
      start: !this.data.start
    })
    if(this.data.start) {
      backgroundAudioManager.play()
    } else {
      wx.pauseBackgroundAudio()
    }
  },

  //进度条按下时不在给进度条赋值value
  sliderEnd: function () {
    console.log(1)
    this.setData({
      huadong: false
    })
  },

  //滑动时触发
  mobile: function(e) {
    let allTime = Math.round(backgroundAudioManager.duration)
    let val = e.detail.value
    if(val < 100) {
      val = '0.' + val
    } else {
      val = 1
    }
    let num = allTime * (val * 1)
    backgroundAudioManager.seek(num)
    this.setData({
      huadong: true
    })
    backgroundAudioManager.play()
  },

  //
  timeFn: function() {
    this.data.durationIntval = setInterval(() => {
      //在音乐播放时执行
      if(this.data.start) {
        //当前播放时间 输出 0.12323123123 四舍五入
        let currentTime = Math.round(backgroundAudioManager.currentTime)
        let duration = Math.round(backgroundAudioManager.duration)
        let audioTime = parseInt(100 * currentTime / duration)
        console.log(currentTime)

        var min = parseInt(currentTime / 60);
        var sec = parseInt(currentTime % 60);
        if (min.toString().length == 1) {
          min = `0${min}`;
        }
        if (sec.toString().length == 1) {
          sec = `0${sec}`;
        }
        let Time1 = min + ':' + sec
        if(currentTime !== duration) {
          if(this.data.huadong) {
            this.setData({
              Time1,
              currentTime,
              audioTime
            })
          } else {
            this.setData({
              Time1,
              currentTime
            })
          }
        } else { //当播放完成时
          // clearInterval(this.data.durationIntval)
          // this.setData({
          //   Time1: '00:00',
          //   currentTime: 0,
          //   audioTime: 0
          // })
          this.playMusic()
        }


      }
    }, 1000)
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.timeFn()
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    clearInterval(this.data.durationIntval)
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})