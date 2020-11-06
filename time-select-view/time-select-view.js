const months = [
  "01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"
]
const days1 = [
  "01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20",
  "21", "22", "23", "24", "25", "26", "27", "28"
]
const days2 = [
  "01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20",
  "21", "22", "23", "24", "25", "26", "27", "28", "29"
]
const days3 = [
  "01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20",
  "21", "22", "23", "24", "25", "26", "27", "28", "29", "30"
]
const days4 = [
  "01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20",
  "21", "22", "23", "24", "25", "26", "27", "28", "29", "30", "31"
]
const minutes = [
  "00", "01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19",
  "20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "30", "31", "32", "33", "34", "35", "36", "37", "38", "39",
  "40", "41", "42", "43", "44", "45", "46", "47", "48", "49", "50", "51", "52", "53", "54", "55", "56", "57", "58", "59",
]
const hours = [
  "00", "01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23"
]


Component({

  properties: {
    currentTime: {
      type: String,
      value: ''
    }
  },

  lifetimes: {
    attached() {

    },
    detached: function () {

    },
  },

  data: {
    isShow: false,
    years: [],
    months: months,
    days: [],
    days1: days1,
    days2: days2,
    days3: days3,
    days4: days4,
    hours: hours,
    minutes: minutes,
    year: '', month: '', day: '', hour: '', minute: '',
    currentValue: null,
    tempValue: [],
  },

  methods: {

    /**
     * 显示
     */
    show() {
      this.initData()
      this.setData({
        isShow: true
      })
    },

    /**
     * 取消
     */
    hide() {
      this.setData({
        isShow: false
      })
      this.triggerEvent('onTimeSelectCancel', {})
    },

    /**
     * 选中
     */
    commit() {
      this.setData({
        isShow: false,
        currentValue: this.data.tempValue,
      })
      var time = {}
      var index = this.data.currentValue
      time.ymdhm = this.data.years[index[0]] + '-' + this.data.months[index[1]] + '-' + this.data.days[index[2]] + ' ' +
        this.data.hours[index[3]] + ':' + this.data.minutes[index[4]]

      this.properties.currentTime = time.ymdhm

      this.triggerEvent('onTimeSelected', time, {})
      
    },

    /**
     * 根据当前时间设置数据(天数据)
     */
    initData() {

      // wx.showModal({
      //   content: this.properties.currentTime,
      // })

      var d = null
      if (this.properties.currentTime == '' || this.properties.currentTime == null) {
        d = new Date()
      } else {
        // d = new Date(this.properties.currentTime)
        d = new Date(Date.parse(this.properties.currentTime.replace(/-/g, "/")))
      }
      this.setData({
        year: d.getFullYear() + '',
        month: (d.getMonth() + 1) < 10 ? '0' + (d.getMonth() + 1) : (d.getMonth() + 1) + '',
        day: d.getDate() < 10 ? '0' + d.getDate() : d.getDate() + '',
        hour: d.getHours() < 10 ? '0' + d.getHours() : d.getHours() + '',
        minute: d.getMinutes() < 10 ? '0' + d.getMinutes() : d.getMinutes() + '',
        currentValue: [5, d.getMonth(), d.getDate() - 1, d.getHours(), d.getMinutes()],
        tempValue: [5, d.getMonth(), d.getDate() - 1, d.getHours(), d.getMinutes()]
      })
      this.data.years = []
      for (var i = 0; i < 11; i++) {
        var y = i - 5
        this.data.years.push((parseInt(this.data.year) + y) + '')
      }
      if (this.data.month == '02') {
        var y = parseInt(this.data.year)
        if (y % 4 == 0 && y % 100 != 0 || y % 400 == 0) {
          this.data.days = this.data.days2
        } else {
          this.data.days = this.data.days1
        }
      } else if (this.data.month == '04' || this.data.month == '06' || this.data.month == '09' || this.data.month == '11') {
        this.data.days = this.data.days3
      } else {
        this.data.days = this.data.days4
      }
      this.setData({
        days: this.data.days,
        years: this.data.years,
      })
      // console.log(this)
    },

    /**
     * 监听选择器发生滑动变化
     */
    bindChange(e) {
      var m = e.detail.value[1]
      var y = parseInt(this.data.years[e.detail.value[0]])
      if (m == 1) {
        if (y % 4 == 0 && y % 100 != 0 || y % 400 == 0) {
          this.data.days = days2
        } else {
          this.data.days = days1
        }
      } else if (m == 3 || m == 5 || m == 8 || m == 10) {
        this.data.days = days3
      } else {
        this.data.days = days4
      }
      this.setData({
        days: this.data.days,
        tempValue: e.detail.value,
      })
      // console.log(this)
    },

  },

});