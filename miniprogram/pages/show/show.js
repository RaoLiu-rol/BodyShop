import * as echarts from '../../ec-canvas/echarts';
const db = wx.cloud.database()
function setOption(chart, xdata, ydata) {
  const option = {
    title: {
      text: '定位销直径点检记录',
      padding: [10, 0, 0, 20],
      textStyle: {
        fontSize: 14,
        color: '#696969'
      },
      top: '10rpx'
    },
    backgroundColor: "#fff",
    color: ["#006EFF", "#67E0E3", "#9FE6B8"],
    animation: false,
    grid: {
      show: false
    },
    xAxis: {
      type: 'category',
      data: xdata,      //x轴上的数据是动态的，所以我作为参数传进来
    },
    yAxis: {
      x: 'center',
      scale: true,
      type: 'value',
    },
    series: [{
      type: 'line',
      smooth: 0.2,
      data: ydata,    //y轴上的数据也是动态的，也作为参数传进来
    }]
  };
  chart.setOption(option)
}

Page({
  data: {
    ecOne: {
      lazyLoad: true
    },
    ecTwo: {
      lazyLoad: true
    },
  },
  onLoad: function (options) {
    this.oneComponent = this.selectComponent('#mychart-one');
    this.twoComponent = this.selectComponent('#mychart-two');
  },
  onReady: function () {               //这一步是一定要注意的
    this.getOneOption();
    this.getTwoOption();
  },
  init_one: function (xdata, ydata) {
    //初始化第一个图表
    this.oneComponent.init((canvas, width, height) => {
      const chart = echarts.init(canvas, null, {
        width: width,
        height: height
      });
      setOption(chart, xdata, ydata)
      this.chart = chart;
      return chart;
    });
  },
  init_two: function (xdata, ydata) {        //初始化第二个图表
    this.twoComponent.init((canvas, width, height) => {
      const chart = echarts.init(canvas, null, {
        width: width,
        height: height
      });
      setOption(chart, xdata, ydata)
      this.chart = chart;
      return chart;
    });
  },
  getOneOption: function () {
    let _this = this
    //这一步其实就要给图表加上数据
    var xdate = [];
    var result = [];
    db.collection('fixture_01')
      .where({
        position: 'CP00036901',
      })
      .field({
        pinData: true,
        time: true,
      })
      .limit(10)
      .get({
        success: res => {
          for (var i = 0; i < res.data.length; i++) {
            xdate.push(res.data[i].time.substr(5, 5))
            result.push(res.data[i].pinData[0].dm * 1)
          }
          _this.init_one(xdate, result)
        }
      });
  },
  //第二个图表也是一样的处理
  getTwoOption: function () {
    this.init_two(['1', '3', '5', '7', '9'], [2, 4, 6, 8, 10])
  }
})