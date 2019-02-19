<template>
    <div  id="proportionChart" style="height: 300px;width: 100%"></div>
</template>

<script>
//import echarts from 'echarts'
var echarts = require("echarts/lib/echarts");
require('echarts/lib/component/tooltip');
require('echarts/lib/component/title');
require("echarts/lib/chart/pie"); //饼状图
require('echarts/theme/macarons') // echarts theme
import { debounce } from '@/utils'

const animationDuration = 6000

export default {
  data() {
    return {
      chart: null,
      seriesData: [{value:200, name:'广州'
                },{value:220, name:'深圳'
                },{value:280, name:'北京'
                },{value:140, name:'上海'
                },{value:330, name:'杭州',selected:true
            }]
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
      this.chart = echarts.init(document.getElementById('proportionChart'), 'macarons')
      const that = this;
      this.chart.setOption({
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        calculable: true,
        color: ['#f3857b','#ffd86e','#98d87d','#8996e6','#49a9ee'],
        series: [
            {
                name:'',
                type:'pie',
                radius : '55%',
                center: ['50%', '50%'],
                selectedMode: 'single',
                label: {
                  formatter: '{b}\n{pre|{d}%}',
                      rich: {
                        pre:{
                          fontSize: 14,
                          lineHeight: 33
                        }
                      }
                },
                data: that.seriesData,
                animationEasing: 'cubicInOut',
                animationDuration: 2600
            }
        ],
        
      })


    }
  }
}
</script>
<style scoped lang="scss">

</style>

