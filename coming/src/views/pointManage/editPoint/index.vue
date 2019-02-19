<template>
    <div class="addPoint">
        <div>
          <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="基本信息" name="first">
            	<keep-alive>
            		<basic-info ref="basicInfo" :formData="formData" @activeNameChange="activeNameChange"></basic-info>
            	</keep-alive>
            </el-tab-pane>
            <el-tab-pane label="详细信息" name="second">
            	<keep-alive>
            		<detailed-info ref="detail" :formData="formData" @activeNameChange="activeNameChange"></detailed-info>
            	</keep-alive>	
            </el-tab-pane>
            <el-tab-pane label="预览" name="third" >
            	<keep-alive>
            		<preview-info ref="preview" :formData="formData" :loading="loading" :id="detailId"
                     @activeNameChange="activeNameChange" @saveBtn="saveBtn"></preview-info>
            	</keep-alive>
            </el-tab-pane>
				
          </el-tabs>
        </div>
    </div>
</template>

<script>
import BasicInfo from './components/basicInfo'  //基本信息
import DetailedInfo from './components/detailedInfo'  //详细信息
import PreviewInfo from './components/previewInfo'    //预览
import { createPoint , editPoint , pointDetail } from '@/api/point'
import  { getImgToBase64 } from '@/utils/format'
export default {
    name: 'parent',
    components: {
        BasicInfo,
        DetailedInfo,
        PreviewInfo
    },
    data(){
        return {
            activeName: 'first',
            loading: false,
            formData: {
                type: '',
                pointName: '',
                province: '',
                city: '',
                area: '',
                detailedAddress: '',
                GPSInfo: '',
                rate: 4.5,
                coverPhoto: '',          //封面图
                labelList: [],
                description: '',
                reason: '',
                introduce: '',
                tipPicture: [],        //打卡点图片
                photoAlbum: [],       //打卡地相册
                scenicPictures: [],   //景点图片
            },
            originData: null,
            detailId: null
        }
    },
    watch: {

    },
    created() {
        let id = this.$route.query.id;
        if(id){
            this.detailId = id;
            //getDetail();
            this.formData = this.$bus.formData;

            //网络地址转化为base64
            // const that = this;
            // getImgToBase64(that.formData.coverPhoto,function(data){
            //                 console.log(data,2)
			// 			    that.formData.coverPhoto = data;
            //             });
                        
           
            // this.formData.tipPicture.forEach(function(value,index,array){
            //     //array[index] == value;    //结果为true
            //     getImgToBase64(value,function(data){
            //         that.formData.tipPicture[index] = data;
            //     })
            // });
            // this.formData.photoAlbum.forEach(function(value,index,array){
            //     //array[index] == value;    //结果为true
            //     getImgToBase64(value,function(data){
            //         that.formData.photoAlbum[index] = data;
            //     })
            // });
            // this.originData = Object.assign({}, this.$bus.formData) ;
        }
        
    },
    methods: {
        //如果是修改，获取详情
        getDetail(){
            pointDetail().then(res => {
                this.formData = res.data;
                // this.originData = Object.assign({}, res.data) ;
                //图片重新赋值

            }).catch(error => {
                //console.log(error)
            })
        },

        //tab改变时
        handleClick(){
            
        },

        //改变tab
        activeNameChange(val){
            this.activeName = val;
        },

        //保存按钮
        saveBtn(){
            const that = this;
            //console.log("mm",this.originData)
            var p1=new Promise(function(resolve, reject) {
                that.$refs.basicInfo.$refs['basicForm'].validate((valid) => {
                    if(valid){
                        resolve();
                    }else{
                        that.$message({
                            showClose: true,
                            type: 'info',
                            message: '基本信息未填写完整'
                        }); 
                        
                    }
                })
            });
        
            var p2=new Promise(function(resolve, reject) {
                that.$refs.detail.$refs['detailedForm'].validate((valid) => {
                    if(valid){
                        resolve();
                    }else{
                        that.$message({
                            showClose: true,
                            type: 'info',
                            message: '基本信息未填写完整'
                        }); 
                       
                    }
                })
            });
        
            Promise.all([p2,p1]).then(function(){
                let formInfo = new FormData();
                for(let x in that.formData){
                    formInfo.append(x,that.formData[x]);
                }
                that.loading = true;


            });
        },

        //添加
        addPoint(formInfo){
            const that = this;
            createPoint(formInfo).then(res => {
                that.loading = false;
                that.$message({
                    showClose: true,
                    message: "添加成功",
                    type: 'success'
                });
                that.$router.push({ path:'/pointList'})
            }).catch(error => {
                that.loading = false;
                //console.log(error)
            })
        },

        //修改
        modifyPoint(){
            editPoint(formInfo).then(res => {
                that.loading = false;
                that.$message({
                    showClose: true,
                    message: "添加成功",
                    type: 'success'
                });
                that.$router.push({ path:'/pointList'})
            }).catch(error => {
                that.loading = false;
                //console.log(error)
            })
        },


    },
}
</script>

<style scoped lang="scss">

</style>

