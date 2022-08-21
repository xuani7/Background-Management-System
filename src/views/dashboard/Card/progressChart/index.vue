<template>
  <div ref="charts" class="charts"></div>
</template>

<script>
import * as echarts from 'echarts'
export default {
  name:"progressChart",
  mounted () {
    let progressCharts = echarts.init(this.$refs.charts) 
    progressCharts.setOption({
      xAxis: {
        show: false,
        min:0,
        max:100
      },
      yAxis: {
        type: 'category',
        show: false
      },
      series: [
        {
          type: 'bar',
          color: '#bfa',
          data: [78],
          showBackground:true,
          barWidth: 10,
          backgroundStyle:{
            color:'#eee'
          },
          label:{
            show: true,
            formatter: '|',
            position:'right'
          }
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