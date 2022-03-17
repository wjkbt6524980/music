// pages/search/search.js
import request from '../../utils/request'
console.log(66);
console.log(33);
console.log(44);
console.log(100);
Page({
    data: {
        placeHolder: '',
        hotList: [],
        searchList: []
    },
    //获取搜索关键字
    async getPlaceHolder() {
        let placeHolder = await request({
            url: '/search/default'
        })
        this.setData({
            placeHolder: placeHolder.data.showKeyword
        })
    },
    //获取搜索热榜
    async getSearchHotList() {
        let hotList = await request({
            url: '/search/hot/detail'
        })
        this.setData({
            hotList: hotList.data
        })
    },
    //搜索歌曲
    search(event) {
        clearTimeout(this.timer)
        if (event.detail.value.trim()) {
            this.timer = setTimeout(async () => {
                let result = await request({
                    url: '/search',
                    data: {
                        keywords: event.detail.value
                    }
                })
                // console.log(result);
                console.log(1);
                this.setData({
                    searchList: result.result.songs.slice(0,5)
                })
            }, 1000);
            return
        }
        this.setData({
            searchList:[]
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.getPlaceHolder()
        this.getSearchHotList()
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
