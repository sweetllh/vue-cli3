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
        <div  id="chartBar" style="height: 300px;width: 100%"></div>
    </div>
    
</template>

<script>
//import echarts from 'echarts'
var echarts = require("echarts/lib/echarts");
require('echarts/lib/component/tooltip');
require('echarts/lib/component/title');
require("echarts/lib/chart/bar"); //柱状图

require('echarts/theme/macarons') // echarts theme
import { debounce } from '@/utils'

const animationDuration = 6000

export default {
  data() {
    return {
      chart: null,
      dateType: 'b',
      seleteDateTime:"",
      xAxisData: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      dataList: {
         '>150':  [60, 50, 70, 26, 128, 80, 80],
         '90-150': [30, 60, 90, 170, 30, 70, 75],
         '<90': [20, 20, 70, 80, 90, 90, 20, 23]
      },
      dataZoom: [
                {
                    show: true,
                    realtime: true,
                    start: 0,
                    end: 100,
                    bottom: 0,
                },
                {
                    type: 'inside',
                    realtime: true,
                    start: 0,
                    end: 100,
                    bottom: 0,
                }
            ],
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
        //console.log(param)
        if(param == 'a'){
            this.xAxisData = ['00:00','01:00', '02:0', '03:00', '04:00', '05:00', '06:00', '07:00', '08:00', '09:00', '10:0','11:00', '12:00',  
                                '13:00','14:00','15:00','16:00','17:00','18:00','19:00','20:00','21:00','22:00','22:00','24:00']
            this.dataList = {
                '>150':   [29, 25, 27, 31, 32, 31, 31, 27, 28, 23, 31,32, 34, 28, 25, 27, 30, 29, 26, 26, 26, 28, 19, 31],
                '90-150': [16, 11, 13, 11, 11, 12, 11, 11, 11, 14, 11, 13, 11, 11, 17, 11, 18, 14, 17, 19, 11, 15, 12, 16],
                '<90':   [1, 7, 1, 1, 1, 1, 1, 1, 4, 2, 7, 1, 2, 4, 9, 1, 8, 9, 7, 6, 9, 2, 1, 8],
            };
            this.dataZoom = [
                {
                    show: true,
                    realtime: true,
                    start: 60,
                    end: 80,
                    bottom: 0,
                },
                {
                    type: 'inside',
                    realtime: true,
                    start: 60,
                    end: 80,
                    bottom: 0,
                }
            ];
            
        }else if(param == 'b'){
            this.xAxisData = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
            this.dataList = {
                '>150':  [260, 250, 270, 226, 328, 280, 290],
                '90-150': [130, 120, 120, 110, 130, 120, 95],
                '<90': [20, 20, 70, 80, 90, 90, 20, 23]
            };
            this.dataZoom = [
                {
                    show: true,
                    realtime: true,
                    start: 0,
                    end: 100,
                    bottom: 0,
                },
                {
                    type: 'inside',
                    realtime: true,
                    start: 0,
                    end: 100,
                    bottom: 0,
                }
            ];
        }else if(param == 'c'){
            this.xAxisData = ['1', '2', '3', '4', '5', '6', '7','8','9','10','11','12','13','14','15','16','17',
            '18','19','20','21','22','23','24','25','26','27','28','29','30','31']
            this.dataList = {
                '>150':   [170, 152, 152, 158, 169, 152, 158, 159, 156, 160, 165, 166, 167, 169, 160, 170, 168, 170, 162, 162, 160, 161, 162, 188, 160, 220, 230, 256, 180, 220, 220],
                '90-150': [102, 103, 104, 121, 129, 125, 140, 135, 132, 130, 131, 137, 135, 132, 135, 128, 126, 121, 124, 127, 126, 121, 122, 123, 130, 120, 120, 110, 130, 120, 95],
                '<90':   [22, 32, 23, 12, 21, 12, 19, 21, 33, 10, 15, 22, 12, 16, 22, 12, 16, 18, 19, 15, 22, 20, 15, 19, 20, 20, 70, 80, 90, 90, 20, 23],
            };
            this.dataZoom = [
                {
                    show: true,
                    realtime: true,
                    start: 0,
                    end: 20,
                    bottom: 0,
                },
                {
                    type: 'inside',
                    realtime: true,
                    start: 0,
                    end: 20,
                    bottom: 0,
                }
            ];
        }
        this.initChart()
        this.__resizeHandler = debounce(() => {
        if (this.chart) {
            this.chart.resize()
        }
        }, 100)
        window.addEventListener('resize', this.__resizeHandler)
    },
    initChart() {
      this.chart = echarts.init(document.getElementById('chartBar'), 'macarons')
      const that = this;
      this.chart.setOption({
        color: ['#49a9ee', '#98d87d', '#ffd86e'],
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'shadow',
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
        calculable : true,
        legend: {
            data: [{
                    name: '>150',
                    icon: 'circle',
                },{
                    name: '90-150',
                    icon: 'circle',
                },{
                    name: '<90',
                    icon: 'circle',
                }],
            itemGap: 20
        },
        grid: {
            top: '10%',
            bottom: '12%',
            left: '1%',
            right: '1%',
            containLabel: true
        },
        dataZoom: that.dataZoom,
        xAxis: [
            {
                type: 'category',
                data: that.xAxisData,
                axisPointer: {
                    type: 'shadow'
                }
            }
        ],
        yAxis: [
            {
                type: 'value',
                name: '',
            }
        ],
        series: [
            {
                name:'>150',
                type:'bar',
                barWidth: '12%',
                data:that.dataList['>150']
            },
            {
                name:'90-150',
                type:'bar',
                barWidth: '12%',
                data:that.dataList['90-150']
            },
            {
                name:'<90',
                type:'bar',
                barWidth: '12%',
                data:that.dataList['<90']
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

