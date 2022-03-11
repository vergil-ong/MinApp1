const app = getApp();

Component({
    pageLifetimes: {
        show() {
            if (typeof this.getTabBar === 'function' &&
                this.getTabBar()) {
                this.getTabBar().setData({
                    selected: 2
                })
            }
        }
    },
    properties: {},
    data: {
        userInfo: {},
        hasUserInfo: false,
        canIUse: wx.canIUse('button.open-type.getUserInfo'),
        menuitems: [
            { text: '完善信息', url: '../userinfo/userinfo', icon: '/icons/me/settings.png', tips: '' },
            { text: '个性设置', url: '../userinfo/userinfo', icon: '/icons/me/settings.png', tips: '' }
        ]
    },
    methods: {
        onLoad: function (options) {
            var that = this;
            if (app.globalData.userInfo) {
                that.setUserInfo(app.globalData.userInfo);
            } else if (that.data.canIUse) {
                // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
                // 所以此处加入 callback 以防止这种情况
                app.userInfoReadyCallback = res => {
                    that.setUserInfo(res.userInfo);
                }
            } else {
                // 在没有 open-type=getUserInfo 版本的兼容处理
                wx.getUserInfo({
                    success: res => {
                        that.setUserInfo(res.userInfo);
                    }
                })
            }
        },
        getUserInfo: function (e) {
            this.setUserInfo(e.detail.userInfo);
        },
        setUserInfo: function (userInfo) {
            if (userInfo != null) {
                app.globalData.userInfo = userInfo
                this.setData({
                    userInfo: userInfo,
                    hasUserInfo: true
                })
            }
        }
    }
});
