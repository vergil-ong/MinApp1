const httpUtil = require('../../../utils/http-util');
const util = require('../../../utils/util')
import Toast from "../../../miniprogram_npm/@vant/weapp/toast/toast";

var that;
Component({
    pageLifetimes: {
        show() {
            if (typeof this.getTabBar === 'function' &&
                this.getTabBar()) {
                this.getTabBar().setData({
                    selected: 1
                })
            }
        }
    },
    properties: {},
    data:{
        title:"",
        desc:"",
        noticeTimeTypeShow: false,
        noticeTimeTypeActions:[
            {
                name:'一次性提醒'
            },
            {
                name: '周期性提醒'
            }
        ],
        noticeTimeTypeVal:"",
        noticeTimeOnceShow: false,
        noticeTimeOnceCalender: false,
        noticeTimeOnceCalenderVal: '',
        noticeTimeOncePickerShow: false,
        noticeTimeOncePickerTime:'00:00',
        noticePeriodFirstTime:1,
        noticePeriodTimes:1,
        noticePeriodInterval:1,
        scrollHeight:0
    },
    methods:{
        onLoad() {
          that = this;
          this.setScrollHeight();
        },
        setScrollHeight:function (){
            wx.getSystemInfo({
                success: function (res){
                    that.setData({
                        scrollHeight:res.windowHeight - 50
                    })
                }
            });
        },
        onNoticeTimeTypeClose: function (){
            this.toggleNoticeTimeType(false);
        },
        onNoticeTimeTypeShow: function (){
            this.toggleNoticeTimeType(true);
        },
        toggleNoticeTimeType: function (show){
            if (show){
                this.setData({
                    noticeTimeTypeShow: true
                });
                this.getTabBar().setData({
                    tabBarShow: false
                })
            }  else {
                this.setData({
                    noticeTimeTypeShow: false,
                });
                this.getTabBar().setData({
                    tabBarShow: true
                })
            }
        },
        onNoticeTimeTypeSelect: function (event){
            let noticeTimeTypeSelName = event.detail.name;
            this.setData({
                noticeTimeTypeVal:noticeTimeTypeSelName
            })
            console.log(noticeTimeTypeSelName)
            console.log(this.data.noticeTimeTypeActions[0].name)
            if (noticeTimeTypeSelName == this.data.noticeTimeTypeActions[0].name){
                //一次性 日期类型
                this.setData({
                    noticeTimeOnceShow:true
                });
            } else {
                this.setData({
                    noticeTimeOnceShow:false
                });
            }
        },
        onNoticeTimeCalenderShow: function (){
            this.toggleNoticeTimeCalender(true);
        },
        onNoticeTimeCalenderClose: function (){
            this.toggleNoticeTimeCalender(false);
        },
        onNoticeTimeCalenderConfirm: function (event){
            console.log(util.formatDate(event.detail));
            this.setData({
                noticeTimeOnceCalenderVal:util.formatDate(event.detail)
            })
            this.toggleNoticeTimeCalender(false);
        },
        toggleNoticeTimeCalender: function (show){
            if (show){
                this.setData({
                    noticeTimeOnceCalender: true
                });
                this.getTabBar().setData({
                    tabBarShow: false
                })
            } else {
                this.setData({
                    noticeTimeOnceCalender: false
                });
                this.getTabBar().setData({
                    tabBarShow: true
                })
            }
        },
        noticeTimeOncePickerTime: function (event){
            console.log(event.detail.value)
            this.setData({
                noticeTimeOncePickerTime:event.detail.value
            })

        },
        stepperChange: function (e){
            let val = e.detail;
            switch (e.target.id){
                case 'noticePeriodFirstTimeId':
                    this.setData({
                        noticePeriodFirstTime : val
                    })
                    break;
                case 'noticePeriodTimesId':
                    this.setData({
                        noticePeriodTimes: val
                    })
                    break;
                case 'noticePeriodIntervalId':
                    this.setData({
                        noticePeriodInterval: val
                    })
                    break;
            }
        },
        validAddTask:function (){
            let taskData = {
                title:this.data.title,
                desc: this.data.desc,
                noticeType: this.data.noticeTimeTypeVal,
                noticeOnceCal: this.data.noticeTimeOnceCalenderVal,
                noticeOnceTime: this.data.noticeTimeOncePickerTime,
                noticePeriodFirstTime: this.data.noticePeriodFirstTime,
                noticePeriodTimes: this.data.noticePeriodTimes,
                noticePeriodInterval: this.data.noticePeriodInterval,
            }
            if (!taskData.title){
                Toast.fail('待办事项不能为空')
                return false;
            }
            if (!taskData.noticeType){
                Toast.fail('提醒方式不能为空')
                return false;
            }
            if (taskData.noticeType == this.data.noticeTimeTypeActions[0].name){
                if (!taskData.noticeOnceCal){
                    Toast.fail('提醒日期不能为空')
                    return false;
                }
            }
            console.log(taskData);
            return taskData;
        },
        addNoticeTask: function (){
            let taskData = this.validAddTask();
            if (!taskData){
                return;
            }
            wx.request({
                url: httpUtil.getUrl('/notice/task/add/'),
                data: taskData,
                header: httpUtil.getCommonHeader(),
                method: 'POST',
                dataType: 'json',
                responseType: 'text',
                success: (result) => {
                    console.log(result);
                    Toast({
                        type: 'success',
                        message: '添加成功',
                        duration:'1000',
                        onClose: () => {
                            wx.switchTab({
                                url:'/pages/index/index',
                                success() {
                                    let page = getCurrentPages().pop();
                                    if(page != undefined){
                                        page.loadNoteList();
                                    }
                                }
                            });
                            that.resetNoticeTask()
                        },
                    });
                },
                fail: (error) => {
                    console.log(error);
                },
                complete: () => {}
            });
        },
        resetNoticeTask:function (){
            this.setData({
                title:'',
                desc:'',
                noticeTimeTypeVal:'',
                noticeTimeOnceCalenderVal:'',
                noticeTimeOncePickerTime:'00:00',
                noticePeriodFirstTime:1,
                noticePeriodTimes:1,
                noticePeriodInterval:1,
            });
        },
    }
})
