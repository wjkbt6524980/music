// pages/recommendToday/recommendToday.js
import request from '../../../utils/request'
Page({

    /**
     * 页面的初始数据
     */
    data: {
        day: '',
        month: '',
        recommendList:[]
    },
    // 获取推荐歌曲列表
    async getrecommendList() {
        let songList = await request({
            url:'/recommend/songs'
        })
        this.setData({
            recommendList:songList.recommend
        })
    },
    // 去歌曲播放页
    goDetail(event) {
        if (event.target.dataset.type) {
            return 
        }
        let song = event.currentTarget.id
        wx.navigateTo({
            url: '/packageA/pages/songDetail/songDetail?song=' + song,
            success: (res) => {
                res.eventChannel.emit('getRecommendList', this.data.recommendList)
            }
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.setData({
            day: new Date().getDate(),
            month:new Date().getMonth()
        })
        let userInfo = wx.getStorageSync('userInfo');
        if (!userInfo) {
            wx.showToast({
                title: '请登录',
                icon: 'none',
                image: '',
                duration: 0,
                mask: false,
                success: ()=>{
                    wx.navigateTo({
                        url: "/packageB/pages/login/login"
                    });
                },
            });
        }
        this.getrecommendList()
        
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