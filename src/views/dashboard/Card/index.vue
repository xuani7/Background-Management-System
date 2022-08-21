<template>
  <div>
    <el-row :gutter="10">
      <el-col :span="6" :offset="0">
        <el-card>
          <Detail title="总销售额" count="￥126560">
            <template slot="charts">
              <div style="padding-top:20px">
                <span style="padding-right:10px">周同比</span><span>56.67%</span>&nbsp;<svg t="1661072423632" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="6163" width="12" height="12"><path d="M541.866667 285.866667l345.6 345.6c17.066667 17.066667 17.066667 42.666667 0 59.733333-8.533333 8.533333-19.2 12.8-29.866667 12.8H168.533333c-23.466667 0-42.666667-19.2-42.666666-42.666667 0-10.666667 4.266667-21.333333 12.8-29.866666l343.466666-345.6c17.066667-17.066667 42.666667-17.066667 59.733334 0z" p-id="6164" fill="#1afa29"></path></svg>
                <span style="padding:0 10px 0 20px">日同比</span><span>19.86%</span>&nbsp;<svg t="1661072596809" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="11337" width="12" height="12"><path d="M482.133333 738.133333L136.533333 392.533333c-17.066667-17.066667-17.066667-42.666667 0-59.733333 8.533333-8.533333 19.2-12.8 29.866667-12.8h689.066667c23.466667 0 42.666667 19.2 42.666666 42.666667 0 10.666667-4.266667 21.333333-12.8 29.866666L541.866667 738.133333c-17.066667 17.066667-42.666667 17.066667-59.733334 0z" p-id="11338" fill="#d81e06"></path></svg>
              </div>
            </template>
            <template slot="footer">
              <span>日销售额&nbsp;￥12435</span>
            </template>
          </Detail>
        </el-card>
      </el-col>
      <el-col :span="6" :offset="0">
        <el-card>
          <Detail title="访问量" count="14330">
            <template slot="charts">
              <lineChart></lineChart>
            </template>
            <template slot="footer">
              <span>日访问量&nbsp;1285</span>
            </template>
          </Detail>
        </el-card>
      </el-col>
      <el-col :span="6" :offset="0">
        <el-card>
          <Detail title="支付笔数" count="8794">
            <template slot="charts">
              <barChart></barChart>
            </template>
            <template slot="footer">
              <span>转换率&nbsp;64%</span>
            </template>
          </Detail>
        </el-card>
      </el-col>
      <el-col :span="6" :offset="0">
        <el-card>
          <Detail title="运营活动效果" count="78%">
            <template slot="charts">
              <progressChart></progressChart>
            </template>
            <template slot="footer">
              <span style="padding-right:10px">周同比</span><span>56.67%</span>&nbsp;<svg t="1661072423632" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="6163" width="16" height="16"><path d="M541.866667 285.866667l345.6 345.6c17.066667 17.066667 17.066667 42.666667 0 59.733333-8.533333 8.533333-19.2 12.8-29.866667 12.8H168.533333c-23.466667 0-42.666667-19.2-42.666666-42.666667 0-10.666667 4.266667-21.333333 12.8-29.866666l343.466666-345.6c17.066667-17.066667 42.666667-17.066667 59.733334 0z" p-id="6164" fill="#1afa29"></path></svg>
              <span style="padding:0 10px 0 20px">日同比</span><span>19.86%</span>&nbsp;<svg t="1661072596809" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="11337" width="16" height="16"><path d="M482.133333 738.133333L136.533333 392.533333c-17.066667-17.066667-17.066667-42.666667 0-59.733333 8.533333-8.533333 19.2-12.8 29.866667-12.8h689.066667c23.466667 0 42.666667 19.2 42.666666 42.666667 0 10.666667-4.266667 21.333333-12.8 29.866666L541.866667 738.133333c-17.066667 17.066667-42.666667 17.066667-59.733334 0z" p-id="11338" fill="#d81e06"></path></svg>
            </template>
          </Detail>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import Detail from "./Detail"
import lineChart from "./lineChart"
import barChart from "./barChart"
import progressChart from "./progressChart"
export default {
  name:'Card',
  components:{
    Detail,
    lineChart,
    barChart,
    progressChart
  }
}
</script>

<style>

</style>