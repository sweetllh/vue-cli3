<template>
    <div class="addPoint">
        <div>
          <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="基本信息" name="first">
            	<keep-alive>
            		<basic-info ref="basicInfo" :formData="formData" :id="detailId"
                         @activeNameChange="activeNameChange"></basic-info>
            	</keep-alive>
            </el-tab-pane>
            <el-tab-pane label="详细信息" name="second">
            	<keep-alive>
            		<detailed-info ref="detail" :formData="formData" @activeNameChange="activeNameChange"></detailed-info>
            	</keep-alive>	
            </el-tab-pane>
            <el-tab-pane label="预览" name="third" >
            	<keep-alive>
            		<preview-info ref="preview" :formData="formData" :id="detailId"
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
import { savePoint , pointDetail } from '@/api/point'
import  { getImgToBase64,dataURLtoFile } from '@/utils/format'
import { getCity, getDistrict } from '@/api/area'
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
            formData: {
                Category: '',
                ClockName: '',
                Province: '',
                City: '',
                District: '',
                AddressDetail: '',
                Gps: '',
                Rate: 4.5, 
                CoverPhoto: '',              //封面图
                Lables: [],
                Describe: '',
                Reason: '',
                ScenicSpots: '',
                ClockPromptPhoto: [],        //打卡点图片
                //PhotoList: [],              //打卡地相册
                Postmark:  '',                  //景点印章
            },
            detailId: null,
        }
    },
    watch: {

    },
    created() {
        let id = this.$route.query.id;
        if(id){
            this.detailId = id;
            this.getDetail(id);  //获取详情
        }
        
    },
    mounted() {
    },
    methods: {
        //如果是修改，获取详情
        getDetail(id){
            const loading = this.$loading({
                    lock: true,
                    text: '拼命加载中',
                    spinner: 'el-icon-loading',
                    background: 'rgba(0, 0, 0, 0.7)'
                });
            pointDetail(id).then(res => {
                loading.close();
                this.formData = res.data;
                this.getSelect();

            }).catch(error => {
                loading.close();
                //console.log(error)
            })
        },
        getSelect(){
            //标签类别
            this.$bus.categoryList.forEach(element => {
                if(element.value == this.formData.Category){
                    this.formData.Category = element.value;
                }
            });
            //省
            this.$bus.provinceArr.forEach(element => {
                if(element.AreaCode == this.formData.Province){
                    this.formData.Province = element.AreaCode;
                }
            });

            //市
            getCity(this.formData.Province).then(res => {
                this.$refs.basicInfo.cityArr = res.data;
                this.$bus.$emit("cityArr",res.data);
                this.$refs.basicInfo.cityArr.forEach(element => {
                    if(element.AreaCode == this.formData.City){
                        this.formData.City = element.AreaCode;
                    }
                });
            }).catch(err => {
                console.log(err)
            });
    
            //区
            getDistrict(this.formData.City).then(res => {
                this.$refs.basicInfo.districtArr = res.data;
                this.$bus.$emit("districtArr",res.data);
                this.$refs.basicInfo.districtArr.forEach(element => {
                    if(element.AreaCode == this.formData.District){
                            this.formData.District = element.AreaCode;
                    }
                });
            }).catch(err => {
                console.log(err)
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
            const loading = this.$loading({
                    lock: true,
                    text: '拼命加载中',
                    spinner: 'el-icon-loading',
                    background: 'rgba(0, 0, 0, 0.7)'
                });
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
                        loading.close();
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
                       loading.close();
                    }
                })
            });
            

            var formInfo = new FormData();
            var formDatas = Object.assign({}, that.formData) ;

            var p3 = new Promise(function(resolve, reject){
                //封面
                if(formDatas.CoverPhoto.indexOf("http") != -1){  //网络地址图片转换成file文件
                    getImgToBase64(formDatas.CoverPhoto,function(data){
                        formDatas.CoverPhoto = dataURLtoFile(data,'CoverPhoto');
                        resolve(data);
                    });
                }else if(formDatas.CoverPhoto.indexOf("base64") != -1){              //base64文件转化为file文件
                    formDatas.CoverPhoto = dataURLtoFile(formDatas.CoverPhoto,"CoverPhoto");
                    resolve();
                }
            })
            
            //打卡提示;
            var p4 = formDatas.ClockPromptPhoto.map(function(item,index){
                if(item.toString().indexOf("http") != -1){  //网络地址图片转换成file文件
                        getImgToBase64(item,function(data){
                            console.log(0)
                           return formDatas.ClockPromptPhoto[index] = dataURLtoFile(data,"ClockPromptPhoto"+(index+1));
                        });
                }else if(item.toString().indexOf("base64") != -1){   //base64文件转化为file文件
                        return formDatas.ClockPromptPhoto[index] = dataURLtoFile(item,"ClockPromptPhoto"+(index+1));
                }
            })

            //印章
            var p5 = new Promise(function(resolve,reject){
                if(formDatas.Postmark.indexOf("http") != -1){  //网络地址图片转换成file文件
                    getImgToBase64(formDatas.Postmark,function(data){
                        formDatas.Postmark = dataURLtoFile(data,'Postmark');
                        resolve(data);
                    });
                }else if(formDatas.Postmark.indexOf("base64") != -1){              //base64文件转化为file文件
                    formDatas.Postmark = dataURLtoFile(formDatas.Postmark,"Postmark");
                    resolve();
                }
            })
            
            Promise.all([p3,p4,p5,p2,p1]).then(function(){
                //标签
                setTimeout(function(){
                    console.log(1)
                    formDatas.Lables = formDatas.Lables.join(",");
                
                    formInfo.append("CoverPhoto",formDatas.CoverPhoto,"CoverPhoto");

                    formInfo.append("Postmark",formDatas.Postmark,"Postmark");

                    for(let k=0; k< formDatas.ClockPromptPhoto.length;k++){
                        formInfo.append("ClockPromptPhoto"+(k+1),formDatas.ClockPromptPhoto[k],"ClockPromptPhoto"+(k+1));
                    }
                    for(let x in formDatas){
                        if(x != "CoverPhoto" && x != "ClockPromptPhoto" && x != "Postmark")
                        formInfo.append(x,formDatas[x]);
                    }
                    that.sureSave(formInfo,loading);
                },1000)
                
                
            })       
        
           
        },

        sureSave(formInfo,loading){
            const that = this;
            savePoint(formInfo).then(res => {
                    loading.close();
                    let showMassage = "";
                    if(that.detailId){
                        showMassage = "修改成功"
                    }else{
                        showMassage = "添加成功"
                    }
                    that.$message({
                        showClose: true,
                        message: showMassage,
                        type: 'success'
                    });
                    that.$router.push({ path:'/pointList'})
                }).catch(error => {
                    loading.close();
                    //console.log(error)
                })
        }

    },
}
</script>

<style scoped lang="scss">
    
</style>

