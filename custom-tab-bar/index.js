Component({
    data: {
        tabBarShow:true,
        selected: 0,
        color: "#7A7E83",
        selectedColor: "#FFA500",
        list: [
            {
                "pagePath": "/pages/index/index",
                "text": "提醒列表",
                "iconPath": "/icons/tab-bar/list.png",
                "selectedIconPath": "/icons/tab-bar/list-selected.png"
            },
            {
                "pagePath": "/pages/memo/add/add",
                "text": "",
                "iconPath": "/icons/tab-bar/plus-circle.png",
                "selectedIconPath": "/icons/tab-bar/plus-circle-selected.png",
                "bulge":true
            },
            {
                "pagePath": "/pages/me/me",
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
            // wx.switchTab({url})
            wx.switchTab({
                url:url,
                success() {
                    let currentPages = getCurrentPages();
                    let currentPage = currentPages[0];
                    if (currentPage){
                        currentPage.onLoad();
                    }
                }
            })
            this.setData({
                selected: data.index
            })
        }
    }
})