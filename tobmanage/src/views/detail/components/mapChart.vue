<template>
    <div  id="mapChart" style="height: 370px;width: 100%"></div>
</template>

<script>
import echarts from 'echarts'
import "echarts/map/js/china.js"; // 引入中国地图数据
// var echarts = require("echarts/lib/echarts");
// require('echarts/lib/component/tooltip');
// require('echarts/lib/component/title');
// require("echarts/lib/chart/map"); //地图

require('echarts/theme/macarons') // echarts theme
import { debounce } from '@/utils'

const animationDuration = 6000

export default {
  data() {
    return {
      chart: null,
      
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
      this.chart = echarts.init(document.getElementById('mapChart'), 'macarons')
      const that = this;
      //#endregionvar nameColor = " rgb(55, 75, 113)"
        var name_fontFamily = '等线'
        var subname_fontSize = 15
        var name_fontSize = 18
        var data = [
            {name:"北京",value:177},
            {name:"天津",value:42},
            {name:"河北",value:102},
            {name:"山西",value:81},
            {name:"内蒙古",value:47},
            {name:"辽宁",value:67},
            {name:"吉林",value:82},
            {name:"黑龙江",value:66},
            {name:"上海",value:24},
            {name:"江苏",value:92},
            {name:"浙江",value:114},
            {name:"安徽",value:109},
            {name:"福建",value:116},
            {name:"江西",value:91},
            {name:"山东",value:119},
            {name:"河南",value:137},
            {name:"湖北",value:116},
            {name:"湖南",value:114},
            {name:"重庆",value:91},
            {name:"四川",value:125},
            {name:"贵州",value:62},
            {name:"云南",value:83},
            {name:"西藏",value:9},
            {name:"陕西",value:80},
            {name:"甘肃",value:56},
            {name:"青海",value:10},
            {name:"宁夏",value:18},
            {name:"新疆",value:67},
            {name:"广东",value:123},
            {name:"广西",value:59},
            {name:"海南",value:14},
            ];
            
        var geoCoordMap = {};

        //获取地图数据
        this.chart.showLoading();
        var mapFeatures = echarts.getMap('china').geoJson.features;
        console.log('mapFeatures',mapFeatures)
        this.chart.hideLoading();
        mapFeatures.forEach(function(v) {
            // 地区名称
            var name = v.properties.name;
            // 地区经纬度
            geoCoordMap[name] = v.properties.cp;

        });
        

        //console.log(data)
        var max = 480,
            min = 9; // todo 
        var maxSize4Pin = 100,
            minSize4Pin = 20;
        
        var convertData = function(data) {
            var res = [];
            for (var i = 0; i < data.length; i++) {
                var geoCoord = geoCoordMap[data[i].name];
                if (geoCoord) {
                    res.push({
                        name: data[i].name,
                        value: geoCoord.concat(data[i].value),
                    });
                }
            }
            return res;
        };

      this.chart.setOption({
          tooltip: {
                trigger: 'item',
          },
          visualMap: {
            show: true,
            min: 0,
            max: 1500,
            left: 'left',
            top: 'bottom',
            text: ['High','Low'],
            seriesIndex: [1],
            inRange: {
               // color: ['#3B5077', '#031525'] // 蓝黑
                // color: ['#ffc0cb', '#800080'] // 红紫
                // color: ['#3C3B3F', '#605C3C'] // 黑绿
                // color: ['#0f0c29', '#302b63', '#24243e'] // 黑紫黑
                // color: ['#23074d', '#cc5333'] // 紫红
                //color: ['#00467F', '#A5CC82'] // 蓝绿
                // color: ['#1488CC', '#2B32B2'] // 浅蓝
                color: ['#00467F', '#A5CC82'] // 蓝绿
            },
            calculable : true
        },
            
           
        geo: {
            show: true,
            map: 'china',
            label: {
                normal: {
                    show: false
                },
                emphasis: {
                    show: false,
                }
            },
            roam: true,
            itemStyle: {
                normal: {
                    show: true, // 是否显示对应地名
                    areaColor: '#031525',
                    borderColor: '#3B5077',
                },
                emphasis: {
                    areaColor: '#2B91B7',
                }
            }
        },
        series: [{
                name: '',
                type: 'scatter',
                coordinateSystem: 'geo',
                symbolSize: function(val) {
                    return val[2] / 10;
                },
                label: {
                    normal: {
                        formatter: '{b}',
                        position: 'right',
                        show: true
                    },
                    emphasis: {
                        show: true
                    }
                },
                itemStyle: {
                    normal: {
                        color: '#05C3F9'
                    }
                }
            },
            {
                type: 'map',
                map: 'china',
                geoIndex: 0,
                aspectScale: 0.75, //长宽比
                showLegendSymbol: false, // 存在legend时显示
                label: {
                    normal: {
                        show: true
                    },
                    emphasis: {
                        show: false,
                        textStyle: {
                            color: '#fff'
                        }
                    }
                },
                roam: true,
                itemStyle: {
                    normal: {
                        areaColor: '#031525',
                        borderColor: '#3B5077',
                    },
                    emphasis: {
                        areaColor: '#2B91B7'
                    }
                },
                animation: false,
                data: data
            },
            {
                name: '点',
                type: 'scatter',
                coordinateSystem: 'geo',
                symbol: 'pin', //气泡
                symbolSize: function(val) {
                    var a = (maxSize4Pin - minSize4Pin) / (max - min);
                    var b = minSize4Pin - a * min;
                    b = maxSize4Pin - a * max;
                    return a * val[2] + b;
                },
                label: {
                    normal: {
                        show: true,
                        textStyle: {
                            color: '#fff',
                            fontSize: 9,
                        }
                    }
                },
                itemStyle: {
                    normal: {
                        color: '#F62157', //标志颜色
                    }
                },
                zlevel: 6,
                data: convertData(data),
            },
            {
                name: 'Top 5',
                type: 'effectScatter',
                coordinateSystem: 'geo',
                data: convertData(data.sort(function(a, b) {
                    return b.value - a.value;
                }).slice(0, 5)),
                symbolSize: function(val) {
                    return val[2] / 10;
                },
                showEffectOn: 'render',
                rippleEffect: {
                    brushType: 'stroke'
                },
                hoverAnimation: true,
                label: {
                    normal: {
                        formatter: '{b}',
                        position: 'right',
                        show: true
                    }
                },
                itemStyle: {
                    normal: {
                        color: 'yellow',
                        shadowBlur: 10,
                        shadowColor: 'yellow'
                    }
                },
                zlevel: 1
            },

        ]

      })
    }
  }
}
</script>
<style scoped lang="scss">

</style>

