<template>
  <el-card class="box-card" >
    <div slot="header" class="clearfix">
      <el-tabs v-model="activeName" class="tab">
        <el-tab-pane label="销售额" name="sale"></el-tab-pane>
        <el-tab-pane label="访问量" name="second"></el-tab-pane>
      </el-tabs>
      <div class="right">
        <span @click="setDay">今日</span>
        <span @click="setWeek">本周</span>
        <span @click="setMonth">本月</span>
        <span @click="setYear">本年</span>
        <el-date-picker
          class="date"
          size="mini"
          v-model="date"
          value-format="yyyy-MM-dd"
          type="daterange"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          :default-time="['12:00:00']">
        </el-date-picker>
      </div>
    </div>
    <div>
      <el-row :gutter="10">
        <el-col :span="18">
          <div class="charts" ref="charts">
          </div>
        </el-col>
        <el-col :span="6" class="content-right">
          <h4>门店{{title}}排名</h4>
          <ul>
            <li>
              <span class="rindex"><svg t="1661086458275" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4674" width="20" height="20"><path d="M512 0a512 512 0 1 0 512 512 512 512 0 0 0-512-512z m56.32 768h-64V339.84L422.4 427.52 384 387.84 512 256h56.32z" fill="#2c2c2c" p-id="4675"></path></svg></span>
              <span>肯德基</span>
              <span class="rvalue">323,234</span>
            </li>
            <li>
              <span class="rindex"><svg t="1661087491886" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5660" width="20" height="20"><path d="M512 0a512 512 0 1 0 512 512 512 512 0 0 0-512-512z m169.6 768H352.64v-50.56C524.8 576 618.88 491.52 618.88 404.48A91.52 91.52 0 0 0 518.4 311.68a156.8 156.8 0 0 0-128 64l-38.4-40.32A200.96 200.96 0 0 1 518.4 256a148.48 148.48 0 0 1 160.64 148.48c0 103.04-99.2 196.48-232.32 307.84h234.88z" fill="#2c2c2c" p-id="5661"></path></svg></span>
              <span>麦当劳</span>
              <span class="rvalue">299,132</span>
            </li>
            <li>
              <span class="rindex"><svg t="1661087554473" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5911" width="20" height="20"><path d="M512 0a512 512 0 1 0 512 512 512 512 0 0 0-512-512z m12.16 768a202.88 202.88 0 0 1-172.16-81.92l35.84-38.4a167.04 167.04 0 0 0 135.04 64c70.4 0 113.28-36.48 113.28-92.8s-49.28-86.4-120.32-86.4h-50.56v-55.68h49.92c64 0 112.64-24.32 112.64-81.92S576 311.04 520.32 311.04a163.2 163.2 0 0 0-128 60.16l-33.92-38.4A206.72 206.72 0 0 1 524.8 256c92.8 0 163.84 48 163.84 131.84a118.4 118.4 0 0 1-104.32 115.2 128 128 0 0 1 112 122.88C696.96 707.84 631.04 768 524.16 768z" fill="#2c2c2c" p-id="5912"></path></svg></span>
              <span>正哥</span>
              <span class="rvalue">294,167</span>
            </li>
            <li>
              <span class="rindex index"><svg t="1661087637944" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="17140" width="14" height="14"><path d="M682.666667 64V682.666667h128v85.333333h-128v170.666667h-85.333334v-170.666667H170.666667v-47.018667L597.333333 64h85.333334zM597.333333 682.666667V220.629333L297.301333 682.666667H597.333333z" p-id="17141" fill="#2c2c2c"></path></svg></span>
              <span>海底捞</span>
              <span class="rvalue">283,998</span>
            </li>
            <li>
              <span class="rindex index"><svg t="1661088915325" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="25781" width="14" height="14"><path d="M768 85.333333v85.333334H396.8l-28.885333 274.986666a277.333333 277.333333 0 1 1-125.013334 304.341334l82.773334-20.736A192.085333 192.085333 0 0 0 704 682.666667a192 192 0 0 0-192-192c-86.272 0-139.861333 27.264-168.96 65.28l-67.2-50.432L320 85.333333H768z" p-id="25782" fill="#2c2c2c"></path></svg></span>
              <span>西贝筱面村</span>
              <span class="rvalue">266,223</span>
            </li>
            <li>
              <span class="rindex index"><svg t="1661088941323" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="26103" width="14" height="14"><path d="M635.136 85.333333l-189.354667 327.936A277.333333 277.333333 0 1 1 273.066667 541.866667L536.576 85.333333h98.56zM512 490.666667a192 192 0 1 0 0 384 192 192 0 0 0 0-384z" p-id="26104" fill="#2c2c2c"></path></svg></span>
              <span>汉堡王</span>
              <span class="rvalue">223,445</span>
            </li>
            <li>
              <span class="rindex index"><svg t="1661088961394" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="26371" width="14" height="14"><path d="M810.666667 85.333333v64L459.221333 938.666667H365.824l341.888-768H256V85.333333z" p-id="26372" fill="#2c2c2c"></path></svg></span>
              <span>真功夫</span>
              <span class="rvalue">215,233</span>
            </li>
          </ul>
        </el-col>
      </el-row>
    </div>
  </el-card>
</template>

<script>
import * as echarts from 'echarts'
import * as dayjs from 'dayjs'
import {mapState} from 'vuex'
export default {
  name:"Sale",
  data() {
    return {
      activeName: 'sale',
      date: [],
      mycharts:null
    };
  },
  computed: {
    title(){
      return this.activeName=='sale'?'销售额':'访问量'
    },
    ...mapState({
      listState:state => state.home.list
    })
  },
  methods: {
    setDay(){
      console.log(111);
      const day = dayjs().format('YYYY-MM-DD')
      this.date = [day,day]
    },
    setWeek(){
      const start = dayjs().day(1).format('YYYY-MM-DD')
      const end = dayjs().day(7).format('YYYY-MM-DD')
      this.date = [start,end]
    },
    setMonth(){
      const start = dayjs().startOf('month').format('YYYY-MM-DD')
      const end = dayjs().endOf('month').format('YYYY-MM-DD')
      this.date = [start,end]
    },
    setYear(){
      const start = dayjs().startOf('year').format('YYYY-MM-DD')
      const end = dayjs().endOf('year').format('YYYY-MM-DD')
      this.date = [start,end]
    },
  },
  mounted () {
    this.mycharts = echarts.init(this.$refs.charts)
    this.mycharts.setOption({
      title:{
        text:"销售额趋势"
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow'
        }
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      xAxis: [
        {
          type: 'category',
          data: this.listState.orderFullYearAxis,
          axisTick: {
            alignWithLabel: true
          }
        }
      ],
      yAxis: [
        {
          type: 'value'
        }
      ],
      series: [
        {
          name: 'Direct',
          type: 'bar',
          barWidth: '40%',
          data: this.listState.orderFullYear
        }
      ]
    })
  },
  watch: {
    title(){
      this.mycharts.setOption({
        title:{
          text: this.title+"趋势"
        },
        xAxis:{
          data: this.title == '销售额' ? this.listState.orderFullYearAxis : this.listState.userFullYearAxis
        },
        series:[
        {
          name: 'Direct',
          type: 'bar',
          barWidth: '40%',
          data: this.title == '销售额' ? this.listState.orderFullYear : this.listState.userFullYear
        }
        ]
      })
    },
    listState(){
      this.mycharts.setOption({
        title:{
          text:"销售额趋势"
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: [
          {
            type: 'category',
            data: this.listState.orderFullYearAxis,
            axisTick: {
              alignWithLabel: true
            }
          }
        ],
        yAxis: [
          {
            type: 'value'
          }
        ],
        series: [
          {
            name: 'Direct',
            type: 'bar',
            barWidth: '40%',
            data: this.listState.orderFullYear
          }
        ]
      })
    }
  }
}
</script>

<style scoped>

  .box-card {
    margin: 10px 0;
  }

  .clearfix{
    display: flex;
    justify-content:space-between;
    position: relative;
  }

  .tab{
    width: 100%;
  }

  .tab .el-tab-pane{
    font-size: 18px;
  }

  .right{
    position: absolute;
    right: 0px;
  }

  .right > span{
    font-size: 14px;
    margin: 5px;
  }

  .date{
    width: 350px;
    margin: 0px 20px;
  }

  .charts{
    width: 100%;
    height: 300px;
  }

  .content-right{
    padding: 0;
  }

  .content-right ul{
    list-style: none;
    width: 100%;
    height: 300px;
    padding: 0;
  }

  .content-right ul li{
    height: 10%;
    margin: 10px 10px 10px 0;
  }

  .rindex{
    float: left;

  }

  .content-right ul li>span{
    margin: 0 10px;
  }

  .rvalue{
    float: right;
  }

  .index{
    padding-left: 3px;
    padding-right: 4px;
  }
</style>