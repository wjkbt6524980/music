// components/video/video.js
import request from '../../utils/request'
Page({

    /**
     * 页面的初始数据
     */
    data: {
        videoList: [],
        selectId: '',
        videoItemList: [],
        playVideoId: '',
        playTimeArr: [],
        //设置下拉刷新状态参数
        update:false
    },




    //事件
    // 获取视频导航栏
    async getVideoList() {
        let result = await request({
            url: '/video/group/list'
        })
        this.setData({
            videoList: result.data.slice(0, 14),
            selectId: result.data[0].id
        })
        this.getVideoListItem(this.data.selectId)
    },

    //选中产生下边框
    select(event) {
        wx.showLoading({
            title: '正在加载'
        })
        this.setData({
            selectId: event.currentTarget.id * 1
        })
        this.getVideoListItem(this.data.selectId)
    },

    //获取视频列内容
    async getVideoListItem(id) {
        let result = await request({
            url: '/video/group',
            data: {
                id
            }
        })
        this.setData({
            videoItemList: result.datas
        })
        wx.hideLoading()
        this.setData({
            update:false
        })
    },

    //播放视频回调,这个回调播放和继续播放都会触发,因此自己继续播放会停播自己
    play(event) {
        let id = event.currentTarget.id,
            { playTimeArr } = this.data
        this.setData({
            playVideoId: id
        })
        //判断点击播放的和上一个是不是同一个视频，然后判断没有context,下面这段注释代码是阻止多个视频播放的，但是为了优化一次只显示一个视频所以不存在播放多个视频情况所以没用了注释掉
        /* this.vid !== id && this.videoContext && this.videoContext.stop()
        this.vid = id */
        this.videoContext = wx.createVideoContext(id)
        let playTime = playTimeArr.find(item => item.id === id)
        if (playTime) {
            this.videoContext.seek(playTime.time)
        }
        this.videoContext.play()
    },

    //记录视频播放进度函数
    updateTime(event) {
        let { playTimeArr } = this.data,
            id = event.currentTarget.id,
            time = event.detail.currentTime,
            playTimeObj = { id, time },
            playTime = playTimeArr.find(item => item.id === id)
        if (playTime) {
            playTime.time = time
        } else {
            playTimeArr.push(playTimeObj)
        }
        this.setData({
            playTimeArr
        })
    },
 
    //视频播放完毕回调
    videoEnd(event) {
        let { playTimeArr } = this.data,
        id = playTimeArr.findIndex(item=>item.id===event.currentTarget.id)
        playTimeArr.splice(id, 1)
        this.setData({
            playTimeArr
        })
    },

    //下拉刷新视频
    updateVideo() {
        this.getVideoListItem(this.data.selectId)
        this.setData({
            update:true
        })
    },
    //拉到最下面更新视频
    updateVideoBelow() {
        console.log('最下了');
    },






    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.getVideoList()
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
        console.log('页面下拉刷新');
    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {
        console.log('页面上拉触底');
    },

    /**
     * 用户点击分享
     */
    onShareAppMessage: function ({from}) {
        if (from === 'button') {
           return {title:'button'}
        } else {
            return {title:'menu'}
       }
    }
})