Component({
    data: {
        selected: 0,
        color: "#7A7E83",
        selectedColor: "#3cc51f",
        list: [
            {
                "pagePath": "/pages/index/index",
                "text": "提醒列表2",
                "iconPath": "/icons/tab-bar/list.png",
                "selectedIconPath": "/icons/tab-bar/list-selected.png"
            },
            {
                "pagePath": "/pages/logs/logs",
                "text": "",
                "iconPath": "/icons/tab-bar/plus-circle.png",
                "selectedIconPath": "/icons/tab-bar/plus-circle-selected.png",
                "bulge":true
            },
            {
                "pagePath": "/pages/logs2/logs2",
                "text": "我的",
                "iconPath": "/icons/tab-bar/user.png",
                "selectedIconPath": "/icons/tab-bar/user-selected.png"
            }
        ]
    },
    attached() {
    },
    methods: {
        switchTab(e) {
            const data = e.currentTarget.dataset
            const url = data.path
            wx.switchTab({url})
            this.setData({
                selected: data.index
            })
        }
    }
})