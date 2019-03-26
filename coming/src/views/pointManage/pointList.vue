<template>
    <div class="pointList">
        <div class="buttonList">
            <div class="handel">
                <el-button type="primary" @click="$router.push({path:'/editPoint'})">添加打卡点</el-button>
                <!-- <el-button type="info">删除打卡点</el-button> -->
            </div>
            <div class="seachList">
                <div>
                    <el-select v-model="formData.ProvinceCode" filterable  placeholder="省" @change="provinceChange">
                        <el-option
                        v-for="item in $bus.provinceArr"
                        :key="item.AreaCode"
                        :label="item.AreaName"
                        :value="item.AreaCode">
                        </el-option>
                    </el-select>
                    <el-select v-model="formData.CityCode" filterable  placeholder="市" @change="cityChange">
                        <el-option
                        v-for="item in cityArr"
                        :key="item.AreaCode"
                        :label="item.AreaName"
                        :value="item.AreaCode">
                        </el-option>
                    </el-select>
                    <el-select v-model="formData.DistrictCode" filterable  placeholder="区">
                        <el-option
                        v-for="item in districtArr"
                        :key="item.AreaCode"
                        :label="item.AreaName"
                        :value="item.AreaCode">
                        </el-option>
                    </el-select>
                </div>
                <div>
                    <el-select v-model="formData.Category" placeholder="全部类别">
                        <el-option
                        v-for="item in $bus.categoryList"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                        </el-option>
                    </el-select>
                    <span class="clockNum">
                        打卡量：
                        <el-input-number v-model="formData.ClockCountMin" autocomplete="off" :min="0" :controls="false"
                            style="max-width:127px" ></el-input-number>
                        至
                        <el-input-number v-model="formData.ClockCountMax" autocomplete="off" :min="0" :controls="false"
                            style="max-width:127px" ></el-input-number>
                    </span>
                    <el-button type="primary"  icon="el-icon-search" @click="queryPointList">搜索</el-button>
                </div>
                
                
            </div>
        </div>
        <div class="table">
		    <el-table :data="tableData.data" :height="$bus.clientHeight - 231" size="medium "
		    	style="width: 100%;" v-loading="isLoading" @selection-change="handleSelectionChange">
                <!-- <el-table-column type="selection" width="60"></el-table-column> -->
                <el-table-column type="index" label="序号"  align="center" header-align="center" width="60"></el-table-column>
                <el-table-column label="添加日期" min-width="120" prop="CreateTimeStr" align="center" header-align="center" class-name="tdImgWrap"></el-table-column>
                <el-table-column label="类别" min-width="120" prop="Category"  align="center" header-align="center">
                    <template slot-scope="scope">
                        <span>{{scope.row.Category | formatCategory}}</span>
                    </template>
                </el-table-column>
                <el-table-column label="打卡点名称" min-width="180"  prop="ClockName"  align="center" header-align="center"></el-table-column>
                <el-table-column label="蓝牙设备ID" min-width="120" prop="DeviceId" align="center" header-align="center">
                    <template slot-scope="scope">
                        <el-popover trigger="hover" placement="top">
                        <p style="max-width: 320px;">蓝牙设备ID：{{ scope.row.DeviceId }}</p>
                        <div slot="reference" class="name-wrapper">
                            <el-tag size="medium">{{ scope.row.DeviceId }}</el-tag>
                        </div>
                        </el-popover>
                    </template>
                </el-table-column>
                <el-table-column label="日打卡量" min-width="120" prop="DayClockCount" align="center" header-align="center"></el-table-column>
                <el-table-column label="操作" min-width="120" align="center" header-align="center" fixed="right">
                    <template slot-scope="scope">
                        <el-button @click.native.prevent="editRow(scope.row.Id)" type="text" >修改</el-button>
                        <span class="line"></span>
                        <el-button  @click.native.prevent="deleteRow(scope.row.Id)" type="text">删除</el-button>
                    </template>
                </el-table-column>
		    </el-table>
            <el-pagination class="pageWrap"
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="currentPage "
                :page-sizes="[10, 20, 30, 40, 50, 100, 200, 300]"
                :page-size="pageSize"
                layout="total, sizes, prev, pager, next, jumper"
                :total="tableData.total">
            </el-pagination>
		 </div>
		 
    </div>
</template>

<script>
import { pointList , deletePoint } from '@/api/point'
import { getCity, getDistrict } from '@/api/area'
export default {
    data(){
        return {
            formData: {
                 Category: '-1',
                 ProvinceCode: '',
                 CityCode: '',
                 DistrictCode: '',
                 ClockCountMin: 0,
                 ClockCountMax: 0
            },
            cityArr: [],
            districtArr: [],

            tableData: {},
            currentPage: 1,
		 	pageSize: 10,
            multipleSelection: [],
            isLoading: false,
        }
    },
    created() {
        this.queryPointList()
    },
    methods: {
        handleSizeChange(val) {
            this.pageSize = val;
            this.queryPointList()
            //console.log(`每页 ${val} 条`);
        },
        
        handleCurrentChange(val) {
            this.currentPage = val;
            this.queryPointList()
            // console.log(`当前页: ${val}`);
        },

        /*全选*/
        handleSelectionChange(val) {
            //console.log(val)
            this.multipleSelection = val;
        },

        //打卡点列表
        queryPointList(){
            this.isLoading = true;
            let params = {
                    ...this.formData,
                    "PageSize": this.pageSize,
                    "Pageindex": this.currentPage
                }
            const that = this;
            pointList(params).then(res => {
                //console.log("res",res)
                that.isLoading = false;
	       		that.tableData = res;
            }).catch(error => {
                that.isLoading = false;
                //console.log(error)
            })
        },

        //修改
        editRow(rowId) {
            this.$router.push({
                path:'/editPoint',
                query: {id:rowId}
            })
        },

        /*确定删除打卡点？*/
        deleteRow (id) {
            this.$confirm('此操作将删除此打卡点, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.sureDeletePoint(id);
            }).catch(() => {
                this.$message({
                    showClose: true,
                    type: 'info',
                    message: '已取消删除'
                });          
            });
        },
        
        /*删除打卡点*/
        sureDeletePoint(id){
            let that = this;
            deletePoint(id).then(res => {
                that.queryPointList(); //重新加载表格
                that.$message({
                    showClose: true,
                    message: "删除成功",
                    type: 'success'
                });
                
            }).catch(error => {
                //console.log(error)
            })
            
        },

        //省市区三联动
        provinceChange(){
            this.formData.CityCode="";
            this.formData.DistrictCode="";
            getCity(this.formData.ProvinceCode).then(res => {
                this.cityArr = res.data
            }).catch(err => {
                console.log(err)
            })
        },
        cityChange(){
            this.formData.DistrictCode="";
            getDistrict(this.formData.CityCode).then(res => {
                this.districtArr = res.data
            }).catch(err => {
                console.log(err)
            })
        },

    },
}
</script>

<style scoped lang="scss">
.pointList{
    .buttonList{
        font-size: 13px;
        display: flex;
        justify-content: space-between;
        margin: 15px 0 0;
        .handel{
            width: 250px;
            margin-top: 40px;
            .el-button{
                margin-bottom: 10px;
            }
            .el-button:first-of-type{
                margin-right: 10px;
            }
            .el-button + .el-button{
                margin-left: 0;
            }
        }
        .seachList{
            .el-button{
                margin-left: 10px;
                padding: 6px 13px;
            }
        }
        
        .el-select{
            margin-left: 10px;
            margin-bottom: 10px;
        }
        .clockNum{
            display: inline-block;
            margin-left: 10px;
            .el-input{
                margin-bottom: 10px;
            }
        }
    }
    .table{
        .line{
            display: inline-block;
            height: 15px;
            width: 1px;
            background: #2692EF;
            vertical-align: middle;
            
        }
    }
}
</style>

