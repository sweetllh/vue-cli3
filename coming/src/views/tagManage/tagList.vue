<template>
    <div class="tagList">
        <div class="buttonList">
            <div>
                <el-button type="primary" @click="modifyLable('1')">添加标签</el-button>
                <!-- <el-button type="info">删除标签</el-button> -->
            </div>
            <div class="seachList">
                <el-select v-model="category" placeholder="全部类别">
                    <el-option
                    v-for="item in $bus.categoryList"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                    </el-option>
                </el-select>
                <el-select v-model="type" placeholder="全部类型">
                    <el-option
                    v-for="item in $bus.typeList"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                    </el-option>
                </el-select>
                <el-button type="primary" @click="queryTagList()" icon="el-icon-search">搜索</el-button>
            </div>
        </div>
        <div class="table">
		    <el-table :data="tableData.data" :height="$bus.clientHeight - 191" size="medium "
		    	style="width: 100%;" v-loading="isLoading" @selection-change="handleSelectionChange">
                <!-- <el-table-column type="selection" width="60"></el-table-column> -->
                <el-table-column type="index" label="序号"  align="center" header-align="center" width="60"></el-table-column>
                <el-table-column label="添加日期" min-width="120" prop="Createtime" align="center" header-align="center" class-name="tdImgWrap">
                    <template slot-scope="scope">
                        <span>{{ scope.row.Createtime | formatDate}}</span>
                    </template>
                </el-table-column>
                <el-table-column label="标签ID" min-width="100"  prop="Id" align="center" header-align="center"></el-table-column>
                <el-table-column label="类别" min-width="120" prop="Category"  align="center" header-align="center">
                    <template slot-scope="scope">
                        <span>{{ scope.row.Category | formatCategory }}</span>
                    </template>
                </el-table-column>
                <el-table-column label="标签类型" min-width="120" prop="Type" align="center" header-align="center">
                    <template slot-scope="scope">
                        <span>{{ scope.row.Type | formatType }}</span>
                    </template>
                </el-table-column>
                <el-table-column label="标签内容" min-width="180" prop="Content" align="center" header-align="center"></el-table-column>
                <el-table-column label="标签备注" min-width="200" prop="Remark"  align="left" header-align="left"></el-table-column>
                <el-table-column label="操作" min-width="120" align="center" header-align="center" fixed="right">
                    <template slot-scope="scope">
                        <el-button @click.native.prevent="modifyLable('2',scope.row)" type="text" >修改</el-button>
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
		 
         <!-- 修改、增加弹窗 -->
         <el-dialog :title="isAddFlag ? '添加标签': '修改标签'" :visible.sync="dialogFormVisible"
            @close="$refs['form'].resetFields()"  width="500px">
            <el-form :model="formData" ref="form" label-width="100px" class="form">
                <el-form-item label="标签类别：" prop="Category" :rules="{required: true, message: '请选择标签类别', trigger: 'change' }">
                    <el-select v-model="formData.Category" placeholder="请选择标签类别">
                        <template v-for="(item,index) in $bus.categoryList">
                            <el-option v-if="index !== 0" :key="item.value" :label="item.label" 
                            :value="item.value"></el-option>
                        </template>
                    </el-select>
                </el-form-item>
                <el-form-item label="标签类型：" prop="Type" :rules="{required: true, message: '请选择标签类型', trigger: 'change' }">
                    <el-select v-model="formData.Type" placeholder="请选择标签类型">
                        <template v-for="(item,index) in $bus.typeList">
                            <el-option v-if="index !== 0" :key="item.value" :label="item.label" 
                            :value="item.value"></el-option>
                        </template>
                    </el-select>
                </el-form-item>
                <el-form-item label="标签内容：" prop="Content" :rules="{required: true, message: '请填写标签内容', trigger: 'change' }">
                    <el-input type="text" v-model="formData.Content" placeholder="请输入标签内容" 
                        autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="标签备注：" prop="Remark">
                    <el-input type="textarea" :row="3" v-model="formData.Remark" placeholder="请输入标签备注" 
                        autocomplete="off" ></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false;$refs['form'].resetFields()">取 消</el-button>
                <el-button  type="primary" :loading="dialogLoading" @click="submitForm">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import { tagList , deleteTag , createTag ,editTag } from '@/api/tag'
export default {
    data(){
        return {
            isAddFlag: true,
            dialogFormVisible: false,
            formData:{}, 
            dialogLoading: false,

            type: '-1',
            category: '-1',
            tableData: {},
            currentPage: 1,
		 	pageSize: 10,
            multipleSelection: [],
            isLoading: false,
        }
    },
    created() {
       this.queryTagList()
    },
    methods: {
        handleSizeChange(val) {
            this.pageSize = val;
            this.queryTagList()
            //console.log(`每页 ${val} 条`);
        },
        
        handleCurrentChange(val) {
            this.currentPage = val;
            this.queryTagList()
            // console.log(`当前页: ${val}`);
        },

        /*全选*/
        handleSelectionChange(val) {
            //console.log(val)
            this.multipleSelection = val;
        },

        //获取列表
        queryTagList(){
            this.isLoading = true;
            let params = {
                    "Pagesize": this.pageSize,
                    "Pageindex": this.currentPage,
                    "Type" : this.type,
                    "Category" : this.category
                }
            const that = this;
            tagList(params).then(res => {
                that.isLoading = false;
                //console.log("99",res.data)
                that.tableData = res;
            }).catch(error => {
                that.isLoading = false;
                //console.log(error)
            })
            
        },

        /*确定删除标签？*/
        deleteRow (id) {
            this.$confirm('此操作将删除此标签, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                
                this.sureDeleteTag(id);
                
            }).catch(() => {
                this.$message({
                    showClose: true,
                    type: 'info',
                    message: '已取消删除'
                });          
            });
        },
        
        /*删除标签*/
        sureDeleteTag(id){
            let that = this;
            deleteTag(id).then(res => {
                that.queryTagList(); //重新加载表格
                that.$message({
                    showClose: true,
                    message: "删除成功",
                    type: 'success'
                });
                
            }).catch(error => {
                //console.log(error)
            })
            
        },


        //添加或修改标签按钮
        modifyLable(type,data){
            if(type == '1'){ //添加
                this.isAddFlag = true;
                this.formData = {
                    Type: '',
                    Category: '',
                    Content: '',
                    Remark: ''
                }

            }else{   //修改
                this.isAddFlag = false;
                this.formData = Object.assign({}, data) ; 
                //标签类型
                this.$bus.typeList.forEach(element => {
                    if(element.value == this.formData.Type){
                        this.formData.Type = element.value;
                    }
                });
                //标签类别
                this.$bus.categoryList.forEach(element => {
                    if(element.value == this.formData.Category){
                        this.formData.Category = element.value;
                    }
                });
            }
            this.dialogFormVisible = true;
        },

        //提交添加
        addRow(){
            const that = this;
            createTag(that.formData).then(res => {
                that.dialogLoading = false;
                that.dialogFormVisible = false;
                that.$message({
                    showClose: true,
                    message: "添加成功",
                    type: 'success'
                });
                that.queryTagList();
            }).catch(error => {
                that.dialogLoading = false;
                //console.log(error)
            })
        },

        //提交修改
        editRow(){
            const that = this;
            editTag(that.formData).then(res => {
                that.dialogLoading = false;
                that.dialogFormVisible = false;
                that.$message({
                    showClose: true,
                    message: "修改成功",
                    type: 'success'
                });
                that.queryTagList();
            }).catch(error => {
                that.dialogLoading = false;
                //console.log(error)
            })
        },

        //提交按钮
        submitForm(){
            this.$refs['form'].validate((valid) => {
                if (valid) {
                    if(this.isAddFlag){  //添加
                        this.addRow();
                    }else{  //修改
                        this.editRow();
                    }
                } else {
                    //console.log('error submit!!');
                    return false;
                }
            });
        }

    },
}
</script>

<style scoped lang="scss">
.tagList{
    .buttonList{
        display: flex;
        justify-content: space-between;
        margin: 15px 0 0;
        .el-button{
            margin-bottom: 10px;
        }
        .el-button:first-of-type{
            margin-right: 10px;
        }
        .el-button + .el-button{
            margin-left: 0;
        }
        .el-select{
            margin-left: 10px;
            margin-bottom: 10px;
        }
        .seachList{
            .el-button{
                margin-left: 10px;
                padding: 6px 15px;
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

