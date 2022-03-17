// pages/search/search.js
import request from '../../../utils/request'
Page({
    data: {
        placeHolder: '',
        hotList: [],
        searchList: [],
        historyList: [],
        keywords:''
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
        let keyword = event.detail.value.trim()
        let { historyList } = this.data
        if (keyword !== '') {
            if (historyList.indexOf(keyword) !== -1) {
                historyList.splice(historyList.indexOf(keyword), 1)
            }
            this.setData({
                keywords:keyword
            })
            this.timer = setTimeout(async () => {
                let result = await request({
                    url: '/search',
                    data: {
                        keywords:keyword
                    }
                })
                historyList.unshift(keyword)
                this.setData({
                    searchList: result.result.songs.slice(0, 5),
                    historyList
                })
                wx.setStorageSync('historyList', historyList);
            }, 1000);
        } else {
            this.setData({
                searchList: []
            })
        }
    },
    //清除输入框
    clear() {
        this.setData({
            keywords: '',
            searchList: []
        })
    },
    //清除历史记录
    clearHistory() {
        wx.removeStorageSync('historyList')
        this.setData({
            historyList:[]
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.getPlaceHolder()
        this.getSearchHotList()
        this.setData({
            historyList: wx.getStorageSync('historyList') || []
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
