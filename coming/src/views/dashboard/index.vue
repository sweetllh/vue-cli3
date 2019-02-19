<template>
	<div class="dashboard">
        <div class="headWrap">
            <div class="title">服务数据大盘<i class="el-icon-caret-bottom" style="padding-left: 10px;"></i></div>
            <div class="block">
                <span class="demonstration">选择日期：&nbsp;&nbsp;</span>
                <el-date-picker :editable="false"
                v-model="seleteDate"
                type="date"
                placeholder="选择日期">
                </el-date-picker>
            </div>
        </div>
		<el-row :gutter="20" class="card-panel-col">
			<el-col :xs="12" :sm="12" :lg="6" v-for="(item,index) in items" :key="index">
				<el-card shadow="hover" :body-style="{padding: '0px'}">
                    <div class="card-panel-content" :class="'grid'+index">
                        <div class="card-panel-icon-wrapper">
                            <i class="imgWrap"><img :src="require('../../assets/imgs/dashboard'+index+'.png')"/></i>
                        </div>
                        <div class="card-panel-description">
                        	<div>{{item.name}}</div>
                            <count-to :start-val="0" :end-val="item.sum" :duration="2600" class="card-panel-num"/>
                            <div> 
                                <span :style="{color: item.trend == 'up' ? '#00a950' : 'red'}">
                                    <i :class="item.trend == 'up' ? 'el-icon-caret-top' : 'el-icon-caret-bottom'"></i>
                                    {{item.ratio}}</span> 
                                <span style="padding-left: 15px">同比上周</span>
                            </div>
                        </div>
                    </div>
                </el-card>
			</el-col>
		</el-row>
		
        <el-row :gutter="20" class="trend-content">
            <el-col :xs="24" :sm="24" :lg="16">
                <el-card shadow="hover" class="box-card">
                    <div slot="header" class="clearfix">
                        <span>销售件数趋势</span>
                    </div>
                    <volume-bar-chart></volume-bar-chart> 
                </el-card>
            </el-col>
            <el-col :xs="24" :sm="24" :lg="8">
                <el-card shadow="hover" class="box-card" style="height: 478px">
                    <div slot="header" class="clearfix">
                        <span>业务排行榜</span>
                        <!-- <el-button style="float: right; padding: 3px 0" type="text">更多</el-button> -->
                    </div>
                    <el-table :data="channelList" 
                        :header-row-style="headStyle"
                        style="width: 100%;font-size:14px;">
                        <el-table-column label="排名" min-width="50"> 
                            <template slot-scope="scope">
                                <span>{{ scope.row.ranking }}</span>
                            </template>
                        </el-table-column>
                        <el-table-column label="渠道">
                            <template slot-scope="scope">
                                <span>{{ scope.row.channel }}</span>
                            </template>
                        </el-table-column>
                        <el-table-column label="占比" min-width="130">
                            <template slot-scope="scope">
                                <el-progress :percentage="scope.row.proportion"></el-progress>
                            </template>
                        </el-table-column>
                        <el-table-column label="周环比" min-width="65">
                            <template slot-scope="scope">
                                <span :style="{color: scope.row.trend == 'up' ? '#00a950' : 'red'}">{{ scope.row.cycleRatio }}</span>
                            </template>
                        </el-table-column>
                    </el-table>
                </el-card>
            </el-col>
        </el-row>
        <el-row :gutter="20" class="echats">
            <el-col :xs="24" :sm="24" :lg="8" class="customerChart">
                <el-card shadow="hover">
                    <div slot="header" class="clearfix">
                        <span>城市销售情况</span>
                    </div>
                    <city-volume-chart></city-volume-chart>
                </el-card>
            </el-col>
            <el-col :xs="24" :sm="24" :lg="8" class="orderChart">
                <el-card shadow="hover">
                    <div slot="header" class="clearfix">
                        <span>城市占比情况</span>
                    </div>
                    <proportion-chart ></proportion-chart>
                </el-card>
            </el-col>
            <el-col :xs="24" :sm="24" :lg="8" class="orderChart">
                <el-card shadow="hover">
                    <div slot="header" class="clearfix">
                        <span>商品对比图</span>
                    </div>
                    <constrast-chart></constrast-chart>
                </el-card>
            </el-col>
        </el-row>
	</div>
</template>

<script>
    import CountTo from 'vue-count-to'
    import VolumeBarChart from './components/volumeBarChart.vue'
    import CityVolumeChart from './components/cityVolumeChart.vue'
    import ProportionChart from './components/proportionChart.vue'
    import ConstrastChart from './components/constrastChart.vue'
    
	export default {
        name: 'dashboard',
        components: {
            CountTo,
            VolumeBarChart,
            CityVolumeChart,
            ProportionChart,
            ConstrastChart
        },
		data() {
			return {
                chartPie: null,
                seleteDate: "", //日期
                seleteDateTime: "",//日期时间
                headStyle: {color: '#bbb8b8'},
                items: [{
                    name: "今日营业额",
                    sum: 124345,
                    ratio: '10%',
                    trend: 'up',
                },{
                    name: "洗护类总额",
                    sum: 54323,
                    ratio: '10%',
                    trend: 'up',
                },{
                    name: "家纺类总额",
                    sum: 54323,
                    ratio: '10%',
                    trend: 'down',
                },{
                    name: "其他类",
                    sum: 68323,
                    ratio: '10%',
                    trend: 'up',
                }],
                channelList:[{
                    ranking: 1,
                    channel: "渠道A",
                    proportion: 10,
                    cycleRatio: "10%",
                    trend: 'up',
                },{
                    ranking: 2,
                    channel: "渠道B",
                    proportion: 35,
                    cycleRatio: "10%",
                    trend: 'up',
                },{
                    ranking: 3,
                    channel: "渠道C",
                    proportion: 15,
                    cycleRatio: "10%",
                    trend: 'up',
                },{
                    ranking: 4,
                    channel: "渠道D",
                    proportion: 35,
                    cycleRatio: "10%",
                    trend: 'down',
                },{
                    ranking: 5,
                    channel: "渠道E",
                    proportion: 25,
                    cycleRatio: "10%",
                    trend: 'up',
                }]
			}
		},
		
		methods: {
			
			
			
		},
		
		mounted() {
			
		},
		updated() {
            
        }
	}

</script>

<style scoped lang="scss">
	.dashboard{
		width: 100%;
		box-sizing: border-box;
		// padding: 0 20px 20px;
		// background: #e1dfdf;
		height: 100%;
    }
    .headWrap{
        display: flex;
        justify-content: space-between;
        color: #ccc;
        .title{
            font-size: 16px;
        }
        .block{
            font-size: 14px;
        }
    }
    .card-panel-col{
        padding-top: 20px;
        .el-col{
            height: 110px;
            margin-bottom: 20px;
        }
    }
	.card-panel-content{
        display: flex;
        align-items: center;
        height: 110px;
    }
    .card-panel-description {
        flex: 1;
        padding-left: 10px;
        line-height: 28px;
        font-size: 12px;
        color: #ccc;
        .card-panel-num{
            font-size: 22px;
            color: #333;
        }
    }

    .card-panel-icon-wrapper {
        font-size: 50px;
        width: 90px;
        height: 100px;
        text-align: center;
        line-height: 100px;
        color: #fff;
        display: flex;
        justify-content: center;
        align-items: center;
        .imgWrap{
            width: 60px;
            height: 60px;
            border-radius: 50%;
            display: flex;
            justify-content: center;
            align-items: center;
        }
    }
    .grid0 .imgWrap{
        background: #49a9ee;
    }
    .grid1 .imgWrap{
        background: #98d87d;
    }
    .grid2 .imgWrap{
        background: #ffd86e;
    }
    .grid3 .imgWrap{
        background: #f3857c;
    }
    .trend-content{
        .el-col{
            margin-bottom: 20px;
        }
    }
    .echats .el-col{
        margin-bottom: 20px;
    }
</style>