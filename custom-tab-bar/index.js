// tabBarComponent/tabBar.js
const app = getApp();
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        tabbar: {
            type: Object,
            value: {
                "color": "#000000",
                "selectedColor": "#FFA500",
                "borderStyle": "black",
                "list": [
                            {
                                "pagePath": "pages/index/index",
                                "text": "提醒列表",
                                "iconPath": "/icons/tab-bar/list.png",
                                "selectedIconPath": "/icons/tab-bar/list-selected.png"
                            },
                            {
                                "pagePath": "pages/logs/logs",
                                "text": "",
                                "iconPath": "/icons/tab-bar/plus-circle.png",
                                "selectedIconPath": "/icons/tab-bar/plus-circle-selected.png"
                            },
                            {
                                "pagePath": "pages/logs2/logs2",
                                "text": "我的",
                                "iconPath": "/icons/tab-bar/user.png",
                                "selectedIconPath": "/icons/tab-bar/user-selected.png"
                            }
                        ]
            }
        }
    },

    /**
     * 组件的初始数据
     */
    data: {
        isIphoneX: app.globalData.isIphoneX? true : false
    },

    /**
     * 组件的方法列表
     */
    methods: {
        choseNav:function(e){
            console.log(e)
            let tabBarList = app.globalData.tabBar.list;
            let sindex = e.currentTarget.dataset.sindex
            let url = tabBarList[sindex].pagePath
            url = "/"+url;
            console.log('url is '+ url)
            //切换tab时，改变路由地址
            wx.switchTab({
                url: url
            })
            /*this.setData({
                //切换tab时，改变当前激活的序号，改变tab颜色图标等样式
                selected: sindex
            })*/
        }
    }
})
