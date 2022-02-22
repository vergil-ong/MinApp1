// index.js
// 获取应用实例
const app = getApp()

Page({
  data: {
    active: 0
  },
  onLoad() {

  },
  onChange(event) {
    console.log(event.detail);
  }
})
