// pages/songDetail/songDetail.js
import request from '../../../utils/request'
import moment from 'moment'
const appInstance = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isPlay: false,
    song: [],
    id: '',
    src: '',
    recommendList: [],
    currentTime: '00:00',
    duration: '00:00',
    progress: '0'
  },
  // 播放音乐按钮
  async playMusic() {
    if (!this.data.isPlay) {
      this.BackgroundAudioManager.src = this.data.src
      this.BackgroundAudioManager.title = this.data.song.name
    } else {
      this.BackgroundAudioManager.pause()
    }
  },
  // 通过携带id请求歌曲信息
  async getMusicDetail(ids) {
    let song = await request({
      url: '/song/detail',
      data: {
        ids
      }
    })
    this.setData({
      song: song.songs[0],
      duration: moment(song.songs[0].dt).format('mm:ss')
    })
    // 动态设置当前页面标题
    wx.setNavigationBarTitle({
      title: this.data.song.al.name
    })
    return
  },
  // 获取歌曲播放地址
  async getMusicAddress(id) {
    let src = await request({
      url: '/song/url',
      data: {
        id
      }
    })
    this.setData({
      src: src.data[0].url
    })
    return
  },
  //改变播放状态
  changePlayStatus(isPlay) {
    this.setData({
      isPlay
    })
    appInstance.globalData.isMusicPlay = isPlay
  },
  //上一首和下一首的回调
  async nextMusic(event,id) {
    let num = event.currentTarget.id || id
    let arr = this.data.recommendList
    let index = arr.findIndex(item => item.id == this.data.id)
    num = num * 1 + index
    if (num < 0) {
      num = arr.length - 1
    } else if (num >= arr.length) {
      num = 0
    }
    this.setData({
      id: arr[num].id,
      song: arr[num]
    })
    await this.getMusicDetail(this.data.id)
    await this.getMusicAddress(this.data.id)
    this.changePlayStatus(false)
    this.playMusic()
  },




  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //父子组件间通信
    const eventChannel = this.getOpenerEventChannel()
    eventChannel.on('getRecommendList', data => {
      this.setData({
        recommendList: data
      })
    })
    //获取路由传过来的参数，用这个获取歌曲基本信息
    let ids = options.song
    this.setData({
      id: ids
    })
    if (appInstance.globalData.isMusicPlay && appInstance.globalData.musicId === ids) {
      this.setData({
        isPlay: true
      })
    }
    //获取歌曲基本信息和播放地址
    this.getMusicDetail(ids)
    this.getMusicAddress(ids)
    //获取全局唯一的背景音频管理器
    this.BackgroundAudioManager = wx.getBackgroundAudioManager()
    //监听背景音乐播放事件
    this.BackgroundAudioManager.onPlay(() => {
      this.changePlayStatus(true)
      appInstance.globalData.musicId = ids
    })
    //音乐暂停
    this.BackgroundAudioManager.onPause(() => {
      this.changePlayStatus(false)
    })
    //音乐非正常停止，手机上右边有个弹框可以停止音乐播放
    this.BackgroundAudioManager.onStop(() => {
      this.changePlayStatus(false)
    })
    //监听音乐播放进度
    this.BackgroundAudioManager.onTimeUpdate(() => {
      /* console.log('当前时间',this.BackgroundAudioManager.currentTime);
      console.log('总时间',this.BackgroundAudioManager.duration); */
      let time = moment(this.BackgroundAudioManager.currentTime * 1000).format('mm:ss')
        this.setData({
          currentTime: time,
          progress: (this.BackgroundAudioManager.currentTime * 1000) / (this.data.song.dt) * 100
      })
    })
    //背景音乐自然播放结束
    this.BackgroundAudioManager.onEnded(() => {
      this.nextMusic(1)
      this.setData({
        progress: 0,
        currentTime:'00:00'
      })
    })
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