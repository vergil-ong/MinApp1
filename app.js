
// app.js
const httpUtil = require('utils/http-util')

var that;

App({
  onLaunch() {
    // 展示本地存储能力
    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    that = this;

    /*const token = wx.getStorageInfoSync(httpUtil.LOGIN_TOKEN);

    if (token && token.length > 0){
      console.log('验证token有效性');
      this.checkLogin(token);
    } else {
      this.doLogin();
    }*/
  },
  doLogin(){
    // 登录
    return new Promise(function (resolve, reject){
      wx.login({
        success: res => {
          // 发送 res.code 到后台换取 openId, sessionKey, unionId
          let code = res.code;
          wx.request({
            url: httpUtil.getUrl('/login/code/'+code),
            data: {},
            header: httpUtil.getCommonHeader(),
            method: 'GET',
            dataType: 'json',
            responseType: 'text',
            success: (result) => {
              if (result.statusCode == 200){
                that.globalData.token = result.data.Data;
                // console.log(result);
                wx.setStorageSync(httpUtil.LOGIN_TOKEN, result.data.Data)
              } else{
                console.log("登陆失败");
                console.log(result);
              }
              resolve("login");
            },
            fail: (error) => {
              console.log(error);
            },
            complete: () => {}
          });

        }
      })
    });

  },
  checkLogin(token){
      wx.request({
        url: httpUtil.getUrl('/login/auth/'+token),
        data: {},
        header: httpUtil.getCommonHeader(),
        method: 'GET',
        dataType: 'json',
        responseType: 'text',
        success: (result) => {
            if (result.data.Data == true){
              this.globalData.token = token;
            } else{
              this.login();
            }
        },
        fail: () => {},
        complete: () => {}
      });
        
  },
  globalData: {
    userInfo: null,
    token:"",
  }

})
