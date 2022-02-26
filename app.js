
// app.js

const LOGIN_TOKEN = "login_token";

App({
  onLaunch() {
    // 展示本地存储能力
    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    const token = wx.getStorageInfoSync(LOGIN_TOKEN);

    if (token && token.length > 0){
      console.log('验证token有效性');

    } else {
      this.doLogin();
    }
  },
  doLogin(){
    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        let code = res.code;
        wx.request({
          url: this.getUrl('/login/code/'+code),
          data: {},
          header: this.getCommonHeader(),
          method: 'GET',
          dataType: 'json',
          responseType: 'text',
          success: (result) => {
            if (result.statusCode == 200){
              this.globalData.token = result.data.Data;
              wx.setStorageSync(LOGIN_TOKEN, result.data.Data)
            } else{
              console.log("登陆失败");
              console.log(result);
            }
            
          },
          fail: (error) => {
            console.log(error);
          },
          complete: () => {}
        });
          
      }
    })
  },
  checkLogin(token){
      wx.request({
        url: this.getUrl('/login/auth/'+token),
        data: {},
        header: this.getCommonHeader(),
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
  getUrl(apiUrl){
    return this.globalData.BACKEND_SERVER + apiUrl;
  },
  globalData: {
    BACKEND_SERVER:"http://10.7.40.222:8001/api/v1",
    userInfo: null,
    token:""
  },
  getCommonHeader(){
    const header = {
      'content-type':'application/json',
      'authentication_token': wx.getStorageInfoSync(LOGIN_TOKEN)
    }
     
  }
})
