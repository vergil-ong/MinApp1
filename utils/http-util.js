const BACKEND_SERVER = "http://192.168.18.26:8001/api/v1";

const LOGIN_TOKEN = "login_token";

const getUrl = (apiUrl) => {
    return BACKEND_SERVER + apiUrl;
}

const getCommonHeader = () => {
    return {
        'content-type':'application/json',
        'authentication_token': wx.getStorageSync(LOGIN_TOKEN)
    }
}

module.exports = {
    getUrl,
    getCommonHeader,
    LOGIN_TOKEN
}