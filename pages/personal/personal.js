// components/personal/personal.js
import request from '../../utils/request'
let startClientY,endClentY,distance
Page({
    /**
     * 页面的初始数据
     */
    data: {
        distance: 'translateY(0)',
        transition: '',
        userInfo: {},
        recentSing:[]
    },
    //事件
    handleTouchStart(event) {
        startClientY = event.touches[0].clientY
    },
    handleTouchMove(event) {
        endClentY = event.touches[0].clientY
        distance = endClentY - startClientY
        if (distance < 0) {
            return
        } else if (distance > 80) {
            distance = 80
        }
        this.setData({
            distance: `translateY(${distance}rpx)`,
            transition: 'transform 0.15s linear'
        })
    },
    handleTouchEnd() {
        this.setData({
            distance: `translateY(0rpx)`,
        })
    },
    toLogin() {
        wx.navigateTo({
            url: '/packageB/pages/login/login'
        });  
    },
    //获取近期听歌历史
    async getRecentlySing(uid,type) {
        let sing = await request({
            url: '/user/record',
            data: {
                uid,
                type
            }
        })
        this.setData({
            recentSing:sing.allData.slice(0,10)
        })

    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        //获取用户信息
        let userInfo = wx.getStorageSync('userInfo');
        this.setData({
            userInfo:JSON.parse(userInfo)
        })
        //发请求获取听歌记录
        this.getRecentlySing(this.data.userInfo.userId, 0)
        
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