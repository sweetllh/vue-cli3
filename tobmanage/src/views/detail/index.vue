<template>
    <div class="detailCont">
        <el-card shadow="never" :body-style="{padding: '30px',display: 'flex'}"  class="goodsDetail">
            <img src="../../assets/imgs/avatar.png" alt="">
            <div class="detailCont">
                <div class="name">{{goodsDetail.name}}</div>
                <div class="time">创建时间：{{goodsDetail.createTime}}</div>
                <div class="time">生效时间：{{goodsDetail.effectTime}}</div>
            </div>
        </el-card>
        <el-card shadow="never" :body-style="{padding: '0',}"  class="salesTrend">
            <div slot="header" class="clearfix">
                <span>销售额走势</span>
            </div>
            <el-row class="">
                <el-col :span="6">
                    <div v-for="(item,index) in items" :key="index" class="description">
                        <div>{{item.name}}</div>
                        <count-to :start-val="0" :end-val="item.sum" :duration="2600" class="card-panel-num"/>
                        <div> 
                            <span :style="{color: item.trend == 'up' ? '#00a950' : 'red'}">
                                <i :class="item.trend == 'up' ? 'el-icon-caret-top' : 'el-icon-caret-bottom'"></i>
                                {{item.ratio}}</span> 
                            <span style="padding-left: 15px">同比上周</span>
                        </div>
                    </div>
                </el-col>
                <el-col :span="18" class="trendChart">
                    <trend-line-chart></trend-line-chart>
                </el-col>
            </el-row> 
        </el-card>
        <el-row :gutter="20" class="partThree">
            <el-col :xs="24" :sm="24" :lg="14">
                <el-card class="box-card">
                    <div slot="header" class="clearfix">
                        <span>城市排行</span>
                        <el-input placeholder="请输入内容" prefix-icon="el-icon-search" class="city"
                             v-model.trim="cityValue"></el-input>
                        <!-- <el-button style="float: right; padding: 3px 0" type="text">更多</el-button> -->
                    </div>
                    <el-table :data="searchCitys" height="360"
                        :header-row-style="headStyle"
                        style="width: 100%;font-size:14px;">
                        <el-table-column label="排名"> 
                            <template slot-scope="scope">
                                <span>{{ scope.row.ranking }}</span>
                            </template>
                        </el-table-column>
                        <el-table-column label="城市">
                            <template slot-scope="scope">
                                <span>{{ scope.row.city }}</span>
                            </template>
                        </el-table-column>
                        <el-table-column label="销售额">
                            <template slot-scope="scope">
                                <span>{{ scope.row.volume }}</span>
                            </template>
                        </el-table-column>
                        <el-table-column label="周环比">
                            <template slot-scope="scope">
                                <span :style="{color: scope.row.trend == 'up' ? '#00a950' : 'red'}">{{ scope.row.cycleRatio }}</span>
                            </template>
                        </el-table-column>
                    </el-table>
                </el-card>
            </el-col>
            <el-col :xs="24" :sm="24" :lg="10">
                <el-card class="box-card">
                    <div slot="header" class="clearfix">
                        <span>地图分布</span>
                        <!-- <el-button style="float: right; padding: 3px 0" type="text">更多</el-button> -->
                    </div>
                    <div>
                        <map-chart></map-chart>    
                        <!-- <img src="../../assets/imgs/map.jpg" alt="" width="100%" height="365"> -->
                    </div>
                </el-card>
            </el-col>
        </el-row> 
    </div>
</template>
<script>
import CountTo from 'vue-count-to'
import TrendLineChart from './components/trendLineChart'
import MapChart from './components/mapChart'
export default {
    name: "detail",
    components: {
        CountTo,
        TrendLineChart,
        MapChart
    },
    data(){
        return{
            headStyle: {color: '#bbb8b8'},
            cityValue: "",
            cityList: [{
                ranking: 1,
                city: "苏州",
                volume: 120,
                cycleRatio: '10%',
                trend: 'up'
            },{
                ranking: 2,
                city: "南昌",
                volume: 113,
                cycleRatio: '10%',
                trend: 'up'
            },{
                ranking: 3,
                city: "北京",
                volume: 110,
                cycleRatio: '10%',
                trend: 'down'
            },{
                ranking: 4,
                city: "呼和浩特",
                volume: 73,
                cycleRatio: '10%',
                trend: 'up'
            },{
                ranking: 5,
                city: "长沙",
                volume: 68,
                cycleRatio: '10%',
                trend: 'up'
            },{
                ranking: 6,
                city: "拉萨",
                volume: 59,
                cycleRatio: '10%',
                trend: 'up'
            }],
            goodsDetail: {
                name: '洗发水',
                createTime: "2016-12-12",
                effectTime: "2016-12-12-2019-12-12"
            },
            items: [{
                    name: "累计销售额",
                    sum: 4320,
                    ratio: '10%',
                    trend: 'up',
                },{
                    name: "本周增长额",
                    sum: 342,
                    ratio: '10%',
                    trend: 'dowm',
                }],
        }
    },
    computed: {
        searchCitys: function(){
            let search = this.cityValue;
            if(search){
                return this.cityList.filter(function(pro){
                    return Object.keys(pro).some(function(key){
                        return String(pro[key]).toLowerCase().indexOf(search) > -1
                    })
                })
            }
            return this.cityList
        }
    },
    methods: {
       
    }
}
</script>
<style scoped lang="scss">
    .goodsDetail{
        img{
            width: 60px;
            height: 60px;
            border-radius: 50%;
        }
        .detailCont{
            margin-left: 20px;
            .name{
                margin-bottom: 15px;
            }
            .time{
                font-size: 12px;
                color: #ccc;
                line-height: 20px;
            }
        }
    }
    .salesTrend{
        margin: 20px 0;
        .description {
            margin: 20px;
            line-height: 28px;
            font-size: 12px;
            color: #ccc;
            .card-panel-num{
                font-size: 22px;
                color: #333;
            }
        }
    }
    .trendChart{
        padding: 20px;
        border-left: 1px solid #ebeef5;
    }
    .partThree{
        .el-col{
            margin-bottom: 20px;
        }
        .city{
            width: 35%;
            margin-left: 20px;
        }
    }
</style>


