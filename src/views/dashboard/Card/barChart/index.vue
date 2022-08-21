<template>
  <div ref="charts" class="charts"></div>
</template>

<script>
import * as echarts from 'echarts'
export default {
  name:"barChart",
  mounted () {
    let barCharts = echarts.init(this.$refs.charts) 
    barCharts.setOption({
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
          type: 'bar',
          color: 'cyan'
        }
      ],
      grid: {
        left: 0,
        top: 0,
        right: 0,
        bottom: 0
      },
      tooltip:{

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