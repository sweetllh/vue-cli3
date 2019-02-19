<template>
    <div class="volumeChart">
        <div class="average"><span>30件</span>平均件数</div>
        <div class="selectDateRange">
            <div class="block">
                <span :class="dateType == 'a' ? 'active' : ''" @click="changeData('a')">今日</span>
                <span :class="dateType == 'b' ? 'active' : ''" @click="changeData('b')">本周</span>
                <span :class="dateType == 'c' ? 'active' : ''" @click="changeData('c')">本月</span>
                <el-date-picker v-model="seleteDateTime" type="datetimerange"
                    range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
                </el-date-picker>
            </div>
        </div>
        <div  id="chartLine" style="height: 300px;width: 100%"></div>
    </div>
    
</template>

<script>
//import echarts from 'echarts'
var echarts = require("echarts/lib/echarts");
require('echarts/lib/component/tooltip');
require('echarts/lib/component/title');
require("echarts/lib/chart/line"); //折线

require('echarts/theme/macarons') // echarts theme
import { debounce } from '@/utils'

const animationDuration = 6000

export default {
  data() {
    return {
      chart: null,
      seleteDateTime:"",
      dateType: 'b',
      xAxisData: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      dataList: [130, 110, 150, 126, 128, 150, 190],
      dataZoom: [],
    }
  },
  mounted() {
    this.initChart()
    this.__resizeHandler = debounce(() => {
      if (this.chart) {
        this.chart.resize()
      }
    }, 100)
    window.addEventListener('resize', this.__resizeHandler)
  },
  beforeDestroy() {
    if (!this.chart) {
      return
    }
    window.removeEventListener('resize', this.__resizeHandler)
    this.chart.dispose()
    this.chart = null
  },
  methods: {
    changeData(param){
        this.dateType = param;
        if(param == 'a'){
            this.dataList = [9, 1, 1, 1, 2, 1, 1, 1, 1, 3, 1, 1, 4, 8, 2, 7, 3, 9, 2, 6, 4, 2, 1, 1]
        }else if(param == 'b') {
             this.dataList = [33, 10, 15, 22, 12, 16, 22]
        }else if(param == 'c') {
            this.dataList = [22, 32, 23, 12, 21, 12, 19, 21, 33, 10, 15, 22, 12, 16, 22, 12, 16, 18, 19, 15, 22, 20, 15, 19, 20, 10, 17, 19, 16, 17, 11]
        }
    },
    initChart() {
      this.chart = echarts.init(document.getElementById('chartLine'), 'macarons')
      const that = this;
      this.chart.setOption({
        color: ['#6bb9f1'],
        tooltip : {
            trigger: 'axis',
            axisPointer: {
                type: 'cross',
                label: {
                    backgroundColor: '#6a7985'
                }
            }
        },
        toolbox: {
            right: 15,
            feature: {
                dataView: {show: true, readOnly: false},
                magicType: {show: true, type: ['line', 'bar']},
                restore: {show: true},
                saveAsImage: {show: true}
            }
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        xAxis : [
            {
                type : 'category',
                boundaryGap : false,
                data : that.xAxisData
            }
        ],
        yAxis : [
            {
                type : 'value'
            }
        ],
        series : [
            {
                name:'',
                type:'line',
                stack: '总量',
                label: {
                    normal: {
                        show: true,
                        position: 'top'
                    }
                },
                areaStyle: {
                    color: ['#dbeefc']
                },
                data: that.dataList
            }
        ]

      })
    }
  }
}
</script>
<style scoped lang="scss">
.volumeChart{
    width: 100%;
    font-size: 12px;
}
.average{
    color: #ccc;
    span{
        font-size: 22px;
        color: #333;
        padding-right: 15px;
    }
}
.selectDateRange{
    margin: 15px 0;
    display: flex;
    justify-content: flex-end;
    .block span{
        padding: 0 5px;
        &:last-of-type{
            padding-right: 15px;
        }
    }
    
}
.block span{
    cursor: pointer;
}
.active{
    color: #f00;
}
</style>

