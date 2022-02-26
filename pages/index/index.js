// index.js
// 获取应用实例
const app = getApp()

var that;

Page({
  data: {
    active: 0,
    hasMoreData: true,
    isRefreshing: false,
    isLoadingMoreData: false
  },
  onLoad() {
    that = this;
  },
  onChange(event) {
    console.log(event.detail);
  },
  onPullDownRefresh: function (){
    if (this.data.isRefreshing || this.data.isLoadingMoreData) {
      return
    }
    that.setData({
      isRefreshing: true,
      hasMoreData: true
    });

    setTimeout(function () {
      wx.stopPullDownRefresh()
      that.setData({
        isRefreshing: false,
        hasMoreData: true
      });
    }, 1500);
  }
})
