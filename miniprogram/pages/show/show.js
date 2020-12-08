import * as echarts from '../../ec-canvas/echarts';
//const app = getApp();
let chart = null;
function initChart (canvas, width, height, dpr) {
  chart = echarts.init(canvas, null, {
    width: width,
    height: height,
    devicePixelRatio: dpr // new
  });
  canvas.setChart(chart);
  var option = {
    title: {
      text: '定位销磨损情况',
      left: 'center'
    },
    color: ["#37A2DA", "#67E0E3", "#9FE6B8"],
    legend: {
      data: ['A', 'B', 'C'],
      top: 20,
      left: 'center',
      //backgroundColor: 'red',
      z: 100
    },
    grid: {
      show: 'true',
      height: 'auto',
      width: 'auto',
      containLabel: true
    },
    tooltip: {
      show: true,
      trigger: 'axis'
    },
    xAxis: {
      type: 'category',
      boundaryGap: true,
      data: ['周一', '周二', '周三', '周四', '周五'],
      // show: false
    },
    yAxis: {
      type: 'value',
      boundaryGap: ['20%', '20%'],
      splitLine: {
        lineStyle: {
          type: 'dashed'
        }
      }
      // show: false
    },
    series: [{
      name: 'A',
      type: 'bar',
      //smooth: true,
      data: [18, 36, 65, 30, 78]
    }]
  };

  chart.setOption(option);
  return chart;
}

Page({
  onShareAppMessage: function (res) {

  },
  data: {
    ec: {
      onInit:initChart
    }
  },
  
  

  onReady() {
    setTimeout(function () {
      // 获取 chart 实例的方式
      // console.log(chart)
    }, 2000);
  }
});
