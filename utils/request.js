import config from './config'
export default ({ url, data = {}, method = 'GET' }) => {
    return new Promise((resolve, reject) => {
        wx.request({
            url:config.host + url,
            data,
            method,
            dataType: 'json',
            responseType: 'text',
            header: {
                cookie: wx.getStorageSync('cookies')?wx.getStorageSync('cookies').find(item => item.indexOf('MUSIC_U') !== -1) : ''
            },
            success: (res) => {
                if (data.isLogin) {
                    console.log(res);
                    wx.setStorage({
                        key: 'cookies',
                        data:res.cookies
                    })
                }
                resolve(res.data)
            },
            fail: (err) => {
                reject(err)
            },
        });
    })
}