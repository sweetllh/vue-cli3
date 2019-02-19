<template>
    <div  id="salesVolumeChart" style="height: 300px;width: 100%"></div>
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
                },{value:330, name:'杭州'
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
      this.chart = echarts.init(document.getElementById('salesVolumeChart'), 'macarons')
      const that = this;
      this.chart.setOption({
        tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        legend: {
            orient: 'vertical',
            x: 'right',
            top: '30%',
            data: [{name: '广州', icon: 'circle'},{name: '深圳', icon: 'circle'},{name: '北京', icon: 'circle'},
                    {name: '上海', icon: 'circle'},{name: '杭州', icon: 'circle'}],
            // formatter: 'Legend {name}',
            formatter: function (name) {
                let total = 0;
                let percent = 0;
                that.seriesData.forEach((val,index,arr) => {
                  total += arr[index].value;
                });
                that.seriesData.forEach((val,index,arr) => {
                  if(name == arr[index].name){
                      percent = ((arr[index].value / total) * 100).toFixed(2);
                  }
                });
                return name + "   " + percent + '%';
            },
        },
        calculable: true,
        color: ['#f3857b','#ffd86e','#98d87d','#8996e6','#49a9ee'],
        series: [
            {
                name:'城市销售情况',
                type:'pie',
                radius: ['42%', '56%'],
                center: ['31%', '50%'],
                avoidLabelOverlap: false,
                label: {
                    show: false,
                    position: 'center'
                },
                emphasis: {
                    show: true,
                    textStyle: {
                        fontSize: '30',
                        fontWeight: 'bold'
                    }
                },
                labelLine: {
                    normal: {
                        show: false
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

