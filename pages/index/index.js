// index.js
// 获取应用实例
const app = getApp()
const httpUtil = require('../../utils/http-util')
const storageUtil = require('../../utils/storage-util')
import Dialog from "../../miniprogram_npm/@vant/weapp/dialog/dialog";

var that;

Component({
  pageLifetimes: {
    show() {
      if (typeof this.getTabBar === 'function' &&
          this.getTabBar()) {
        this.getTabBar().setData({
          selected: 0
        })
      }
    }
  },
  data: {
    hasMoreData: true,
    isRefreshing: false,
    isLoadingMoreData: false,
    page:1,
    pageSize:5,
    noteList:[],
    triggered: true,
    scrollHeight:0
  },
  methods:{
    onLoad() {
      that = this;
      app.doLogin().then(() => {
        that.loadNoteList();
      });
      this.setScrollHeight();
    },
    setScrollHeight: function (){
      wx.getSystemInfo({
        success: function (res){
          that.setData({
            scrollHeight:res.windowHeight -100
          })
        }
      });
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
    },
    loadNoteList(){
      console.log('loadNoteList');
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
              datum.showNoticeTimeFormat = datum.noticeTimeShow;
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
    },
    refresh(){
      this.loadNoteList();
      this.setData({
        triggered:false
      })
    },
    finishBtnTap(event){
      let memoId = event.currentTarget.dataset.id
      Dialog.confirm({
        title: '确认完成',
        message: '确认已完成当前提醒?',
      }).then(() => {
          console.log('confirm '+memoId);

        wx.request({
            url: httpUtil.getUrl('/notice/memo/done/'),
            data: {
              noticeMemoId: memoId
            },
            header: httpUtil.getCommonHeader(),
            method: 'POST',
            dataType: 'json',
            responseType: 'text',
            success: (result) => {
              console.log(result);
              that.loadNoteList();
            },
            fail: (error) => {
              console.log(error);
            },
            complete: () => {}
          });
        })
        .catch(() => {
          console.log('cancel '+memoId);
        });
    },
    detailBtnTap(event){
      let memoId = event.currentTarget.dataset.id
      wx.setStorageSync(storageUtil.MEMO_ID, memoId);
      wx.switchTab({
        url:'/pages/memo/add/add',
        success(e) {
          let currentPages = getCurrentPages();
          console.log(currentPages)
          currentPages[0].onLoad();
        }
      });
    },
  },
})
