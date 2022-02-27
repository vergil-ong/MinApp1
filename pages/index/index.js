// index.js
// 获取应用实例
const app = getApp()
const httpUtil = require('../../utils/http-util')
const util = require('../../utils/util')

var that;

Page({
  data: {
    active: 0,
    hasMoreData: true,
    isRefreshing: false,
    isLoadingMoreData: false,
    page:1,
    pageSize:5,
    noteList:[],
    array: [{
      message: 'foo',
    }, {
      message: 'bar'
    }]
  },
  onLoad() {
    that = this;
    app.doLogin().then(() => {
      that.loadNoteList();
    });
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

    this.loadNoteList().then(() => {
      wx.stopPullDownRefresh()
      that.setData({
        isRefreshing: false,
        hasMoreData: true
      });
    })
    // setTimeout(function () {
    //   wx.stopPullDownRefresh()
    //   that.setData({
    //     isRefreshing: false,
    //     hasMoreData: true
    //   });
    // }, 1500);
  },
  loadNoteList(){
    return new Promise(function (resolve, reject){
      wx.request({
        url: httpUtil.getUrl('/notice/list/'),
        data: {},
        header: httpUtil.getCommonHeader(),
        method: 'GET',
        dataType: 'json',
        responseType: 'text',
        success: (result) => {
          console.log(result);
          for (const datum of result.data.Data) {
            datum.showNoticeTimeFormat = util.formatTimeFromTimeStamp(datum.noticeTime);
          }
          that.setData({
            noteList: result.data.Data
          });
          console.log(that.data.noteList);
          resolve("load")
        },
        fail: (error) => {
          console.log(error);
        },
        complete: () => {}
      });
    });

  }
})
