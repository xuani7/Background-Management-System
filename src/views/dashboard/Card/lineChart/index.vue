<template>
  <div ref="charts" class="charts"></div>
</template>

<script>
import * as echarts from 'echarts'
export default {
  name:"lineChart",
  mounted () {
    let lineCharts = echarts.init(this.$refs.charts) 
    lineCharts.setOption({
      xAxis: {
        type: 'category',
        show: false
      },
      yAxis: {
        type: 'value',
        show: false
      },
      series: [
        {
          data: [820, 1932, 901, 1934, 1290, 1330, 1320,423,876,1225,1533,945],
          type: 'line',
          itemStyle: {
            opacity: 0
          },
          areaStyle: {
            color: {
              type: 'linear',
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [{
                  offset: 0, color: '#f3baf0' // 0% 处的颜色
              }, {
                  offset: 1, color: '#fff' // 100% 处的颜色
              }],
              global: false
            }
          },
          lineStyle: {
            color: '#eb8ce7',
            cap: "round",
          }
        }
      ],
      grid: {
        left: 0,
        top: 0,
        right: 0,
        bottom: 0
      }
    })
  }
}
</script>

<style>
  .charts{
    width: 100%;
    height: 100%;
  }
</style>