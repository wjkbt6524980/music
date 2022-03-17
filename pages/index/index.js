// pages/index/index.js
import request from '../../utils/request'
Page({

    /**
     * 页面的初始数据
     */
    data: {
        bannerList: [], /*轮播图*/
        recommendList: [],/*推荐歌单*/
        topList: [] /*排行榜*/
    },
    //跳转到每日推荐
    goRecommend() {
        wx.navigateTo({
            url:'/packageA/pages/recommendToday/recommendToday'
       }) 
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: async function (options) {
        // 获取轮播图
        let bannerList = await request({
            url: '/banner',
            data: { type: 2 }
        })
        this.setData({
            bannerList: bannerList.banners
        })



        // 获取推荐
        let recommendList = await request({
            url: '/personalized',
            data: { limit: 10 }
        })
        this.setData({
            recommendList: recommendList.result
        })


        // 获取排行榜
        let topList = []
        let index = 0
        while (index < 10) {
            let result = await request({
                url: '/top/list',
                data:{idx:index++}
            })
            let arr = {name:result.playlist.name,tracks:result.playlist.tracks.slice(0,3)}
            topList.push(arr)
            //请求一次渲染一次，用户体验更好
            this.setData({
                topList: topList
            })
        }
        

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