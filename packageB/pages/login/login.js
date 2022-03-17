// pages/login/login.js
/*登录流程
  1.收集表单数据
*/
import request from '../../../utils/request'
let phoneReg = /^(?:(?:\+|00)86)?1(?:(?:3[\d])|(?:4[5-79])|(?:5[0-35-9])|(?:6[5-7])|(?:7[0-8])|(?:8[\d])|(?:9[189]))\d{8}$/
Page({

    /**
     * 页面的初始数据
     */
    data: {
        phone: '',
        password: ''
    },

    //获取账号密码,实现双向绑定,
    handleInput(event) {
        // let type = event.currentTarget.id 这里用id实现，也可以用data，data的优点是不唯一，可以多个
        // console.log(event);
        let type = event.currentTarget.dataset.type
        this.setData({
            [type]: event.detail.value
        })
    },
    //登录
    async login() {
        let { phone, password } = this.data
        if (!phone.trim()) {
            wx.showToast({
                title: '输入号码不能为空',
                icon: 'none'
            })
            return
        }
        if (!phoneReg.test(phone)) {
            wx.showToast({
                title: '手机号格式错误',
                icon: 'none'
            })
            return
        }
        if (!password) {
            wx.showToast({
                title: '密码不能为空',
                icon: 'none'
            })
            return
        }
        /* wx.showToast({
            title:'验证通过'
        }) */
        let result = await request({
            url: '/login/cellphone',
            data: {
                phone,
                password,
                isLogin:true
            }
        })
        if (result.code === 200) {
            wx.showToast({
                title: '登陆成功',
                icon: 'none'
            })
            wx.setStorageSync('userInfo', JSON.stringify(result.profile));
            //这里用relaunch是为了关闭所有页面然后跳转后的那个页面挂载函数重新调用渲染页面
            wx.reLaunch({
                url:'/pages/personal/personal'
            })
            return 
        } else if (result.code === 400) {
            wx.showToast({
                title: '手机号错误',
                icon: 'none'
            })
            return 
        } else if (result.code === 502) {
            wx.showToast({
                title: '密码错误',
                icon: 'none'
            })
            return 
        } else {
            wx.showToast({
                title: '登陆失败，请重新登录',
                icon: 'none'
            })
            return 
        }

    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

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