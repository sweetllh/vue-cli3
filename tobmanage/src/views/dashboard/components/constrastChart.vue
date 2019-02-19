<template>
    <div  id="contrastChart" style="height: 300px;width: 100%"></div>
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
      xAxisData: ['洗衣粉', '某商品', '某商品', '某商品', '某商品'],
      seriesData:[120, 200, 150, 80, 70]
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
    initChart() {
      this.chart = echarts.init(document.getElementById('contrastChart'), 'macarons')
      const that = this;
      this.chart.setOption({
        color: ['#49a9ee'],
        tooltip : {
            trigger: 'axis',
            axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
            }
        },
        grid: {
            left: '3%',
            right: '4%',
            top: '4%',
            bottom: '10%',
            containLabel: true
        },
        xAxis : [
            {
                type : 'category',
                data : that.xAxisData,
                axisTick: {
                    alignWithLabel: true
                }
            }
        ],
        yAxis : [
            {
                type : 'value'
            }
        ],
        series : [
            {
                type:'bar',
                barWidth: '50%',
                data:that.seriesData
            }
        ]
        
      })


    }
  }
}
</script>
<style scoped lang="scss">

</style>

