<template>
    <div class="basicInfo">
        <el-form ref="basicForm" :model="formData" :rules="rules" label-width="100px">
            <el-form-item label="标签类别：" prop="Category">
                <el-select v-model="formData.Category" placeholder="请选择标签类别">
                    <template v-for="(item,index) in $bus.categoryList">
                        <el-option v-if="index !== 0" :key="item.value" :label="item.label" 
                        :value="item.value"></el-option>
                    </template>
                </el-select>
            </el-form-item>
            <el-form-item label="地点名称：" prop="ClockName">
                <el-input type="text" v-model="formData.ClockName" placeholder="请输入地点名称" 
                style="max-width: 703px;"  autocomplete="off" ></el-input>
            </el-form-item>
            <div style="display: flex;">
                <el-form-item label="地点定位：" prop="Province">
                    <el-select v-model="formData.Province" filterable  placeholder="省" @change="provinceChange">
                        <el-option
                        v-for="item in $bus.provinceArr"
                        :key="item.AreaCode"
                        :label="item.AreaName"
                        :value="item.AreaCode">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="" label-width="20px" prop="City">
                    <el-select v-model="formData.City" filterable  placeholder="市" @change="cityChange">
                        <el-option
                        v-for="item in cityArr"
                        :key="item.AreaCode"
                        :label="item.AreaName"
                        :value="item.AreaCode">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="" label-width="20px" prop="District">
                    <el-select v-model="formData.District" filterable  placeholder="区">
                        <el-option
                        v-for="item in districtArr"
                        :key="item.AreaCode"
                        :label="item.AreaName"
                        :value="item.AreaCode">
                        </el-option>
                    </el-select>
                </el-form-item>
            </div>
            
            <el-form-item label="" prop="AddressDetail">
                <el-input type="textarea" v-model="formData.AddressDetail"  rows="3"  placeholder="详细位置信息"></el-input>
            </el-form-item>
            <el-form-item label="" prop="Gps">
                <el-input type="textarea" style="margin-bottom: 0;" v-model="formData.Gps" 
                    rows="3" placeholder="GPS信息（启动Ruuvi tag后自动获取）"></el-input>
            </el-form-item>

            <el-form-item label="严选指数：" prop="Rate">
                <el-rate v-model="formData.Rate" :allow-half=true></el-rate>
            </el-form-item>
            <el-form-item label="添加标签：" class="Lables" prop="Lables">
                <div v-if="formData.Lables">
                    <span v-for="(item,index) in formData.Lables" :key="index">{{item}}</span>
                </div>
                <el-input type="hidden" v-model="formData.Lables[0]" class="hidden"></el-input>
                <el-tabs v-model="activeName" type="card" @tab-click="tabChange">
                    <el-tab-pane label="基础标签" name="first">
                        <span v-for="(item,index) in basedLabel" :key="index" @click="addTab(item)" 
                        :class="formData.Lables.includes(item) ? 'active' : ''" >{{item}}</span>
                    </el-tab-pane>
                    <el-tab-pane label="个性化标签" name="second">
                        <span v-for="(item,index) in personalizedLabel" :key="index" @click="addTab(item)"
                        :class="formData.Lables.includes(item) ? 'active' : ''" >{{item}}</span>
                    </el-tab-pane>
                </el-tabs>
                
            </el-form-item>
            <el-form-item label="封面图片：" prop="CoverPhoto">
                <div  class='toolTip'>（上传比例16:9）</div>
                <el-input type="hidden" v-model="formData.CoverPhoto" class="hidden"></el-input>
                <el-upload
                    class="picture-uploader"
                    action=""
                    :auto-upload="false"
                    :show-file-list="false"
                    accept="image/*"
                    :on-change="handleChange"
                    :before-upload="beforePictureUpload">
                    <img v-if="formData.CoverPhoto" :src="formData.CoverPhoto" class="picture">
                    <i v-else class="el-icon-plus picture-uploader-icon"><span class="pictureTip">添加封面图</span></i>
                </el-upload>
                <!-- vueCropper 剪裁图片实现-->
                <el-dialog title="裁剪图片（比例16:9）" :visible.sync="isShowCropper" @close="cancelCrop" width="791px">
                    <vue-cropper ref='cropper' 
                    :img="option.img"
                    :outputSize="option.outputSize"
                    :outputType="option.outputType"
                    :info="option.info"
                    :autoCropWidth="option.autoCropWidth"
                    :autoCropHeight="option.autoCropHeight"
                    :canScale="option.canScale"
                    :autoCrop="option.autoCrop"
                    :fixed="option.fixed"
                    :fixedNumber="option.fixedNumber"
                    style="width:100%;height:422px;"></vue-cropper>
                    <span slot="footer" class="dialog-footer">
                        <el-button @click="cancelCrop">取 消</el-button>
                        <el-button type="primary" @click="onCubeImg">确 定</el-button>
                    </span>
                </el-dialog>

            </el-form-item>
            <el-form-item label="景点印章：" prop="Postmark">
                <div  class='toolTip'>（png格式图片）</div>
                <el-input type="hidden" v-model="formData.Postmark" class="hidden"></el-input>
                <el-upload
                    class="picture-uploader"
                    action=""
                    :auto-upload="false"
                    :show-file-list="false"
                    accept="image/png"
                    :on-change="postMarkChange"
                    :before-upload="beforePictureUpload">
                   
                    <img v-if="formData.Postmark" :src="formData.Postmark" class="postmarkImg">
                    <i v-else class="el-icon-plus picture-uploader-icon postMarkIcon"><span class="pictureTip">添加景点印章</span></i>
                </el-upload>
            </el-form-item>
            
            
            <el-form-item class="buttonList">
                <el-button type="primary" @click="cancelBtn">取消</el-button>
                <el-button type="primary" @click="nextBtn">下一步</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
import  { VueCropper }  from 'vue-cropper';  
import { getCity, getDistrict } from '@/api/area';
import { queryBasedLabel, queryPersonalLabel } from '@/api/tag';
import { getObjectURL } from '@/utils/format'
export default {
    name: 'basicInfo',
    props:{
        formData: {
            type: Object,
            default: {}
        },
        id: null
    },
    components: {
        VueCropper,
    },
    
    data(){
        return {
            provinceArr: [],
            cityArr: [],
            districtArr: [],
            rules: {
					Category: {  required: true, message: '请选择标签类别', trigger: 'change'  },
			        ClockName: {  required: true, message: '请选择地点名称', trigger: 'change'  },
                    Province: {  required: true, message: '请选择省份', trigger: 'change'  },
                    City: {  required: true, message: '请选择城市', trigger: 'change'  },
                    District: {  required: true, message: '请选择区域', trigger: 'change'  },
                    AddressDetail: {  required: true, message: '请填写详细位置信息', trigger: 'change'  },
                    //Gps: {  required: true, message: '请填写GPS信息', trigger: 'change'  },
                    Rate: {  required: true, message: '请填写严选指数', trigger: 'change'  },
                    CoverPhoto: {  required: true, message: '请上传封面图片', trigger: 'change'  },
                    Lables: {  required: true, message: '请添加标签', trigger: 'change'  },
                    Postmark: { required: true, message: '请上传景点印章', trigger: 'change'  }
				},
            activeName: 'first',
            basedLabel: [],
            personalizedLabel: [],

            //裁剪组件的基础配置option
            option: {
                img: '',                        //裁剪图片的地址
                info: true,                     //裁剪框的大小信息
                outputSize: 1,                  // 裁剪生成图片的质量
                outputType: 'png',              //裁剪生成图片的格式
                canScale: true,                // 图片是否允许滚轮缩放
                autoCrop: true,                 // 是否默认生成截图框
                autoCropWidth: 750,             // 默认生成截图框宽度
                autoCropHeight: 420,              // 默认生成截图框高度
                fixed: true,                    //是否开启截图框宽高固定比例
                fixedNumber: [75, 42],            //截图框的宽高比例
            },
            isShowCropper: false,            //是否显示截图框
        }
    },
    watch: {

    },
    created() {
        this.getBasedLabel();
        this.getPersonalLabel();

    },
    methods: {
        //图片处理
        beforePictureUpload(){

        },
        handleChange(file, fileList){
            //console.log("file",file)
            //上传后将图片地址赋值给裁剪框显示图片
            //this.option.img = URL.createObjectURL(file.raw);
            this.option.img = getObjectURL(file.raw);
            this.isShowCropper = true;
            
        },

        //上传印章
        postMarkChange(file, fileList){
            const that = this;
            //console.log(file,fileList)

            let reader = new FileReader();
            let imgFile;
 
            //为文件读取成功设置事件
            reader.onload=function(e) {
                imgFile = e.target.result;
                console.log(imgFile)
                that.formData.Postmark = imgFile;
            };
        
            //正式读取文件
            reader.readAsDataURL(file.raw);
            

        },

        // 确定裁剪图片
        onCubeImg() {
            // 获取cropper的截图的base64 数据
            this.$refs.cropper.getCropData(data => {
                this.isShowCropper = false;

                //先将显示图片地址清空，防止重复显示
                this.option.img = ''

                //将剪裁后base64的图片转化为file格式
                this.formData.CoverPhoto = data;
            })
            

            
        },
        //取消裁剪
        cancelCrop(){
            this.isShowCropper = false;
            this.option.img = '';
        },

        //添加标签
        tabChange(){

        },
        //基础标签
        getBasedLabel(){
            queryBasedLabel().then(res => {
                this.basedLabel = res.data.BaseLable
            }).catch(err => {
                console.log(err)
            })
        },
        //个性化标签
        getPersonalLabel(){
            queryPersonalLabel().then(res => {
                this.personalizedLabel = res.data.PersonalizedLabel
            }).catch(err => {
                console.log(err)
            })
        },

        addTab(val){
           let arry = this.formData.Lables;
           let result =  arry.some(function(item,index){
               return item == val;
            });
            if(!result){
                this.formData.Lables.push(val)
            }else{
                this.formData.Lables.splice(arry.findIndex(item => item === val), 1)
            }
        },

        //下一步
        nextBtn(){
            this.$refs['basicForm'].validate((valid) => {
                if (valid) {
                    this.$emit('activeNameChange',"second")
                } else {
                    this.$message({
                        showClose: true,
                        type: 'info',
                        message: '基本信息未填写完整'
                    }); 
                   // console.log('error submit!!');
                    return false;
                }
            });
        },

        //取消
        cancelBtn(){
             this.$refs['basicForm'].resetFields();
        },

        //省市区三联动
        provinceChange(){
            this.formData.City="";
            this.formData.District="";
            getCity(this.formData.Province).then(res => {
                this.cityArr = res.data;
                this.$bus.$emit("cityArr",res.data);
            }).catch(err => {
                console.log(err)
            })
        },
        cityChange(){
            this.formData.District="";
            getDistrict(this.formData.City).then(res => {
                this.districtArr = res.data;
                this.$bus.$emit("districtArr",res.data);
            }).catch(err => {
                console.log(err)
            })
        },

    
    },
}
</script>

<style scoped lang="scss">
.basicInfo{
    .palceDetail {
        .el-input,.el-textarea,.el-select{
            margin-bottom: 15px;
        }
    }
    .el-select + .el-select {
                margin-left: 10px;
    }
    .Lables {
        .active{
            background: #2692EF;
            color: #fff;
        }
        span{
            display: inline-block;
            margin: 0 10px 10px 0;
            padding: 0px 16px;
            border: 1px solid #ccc;
            border-radius: 5px;
            font-size: 14px;
            color: #333;
            background: #fff;
        }
        .el-tabs span{
            cursor: pointer;
        }
        
    }
    .toolTip{
        color: #ccc;
    }
    .pictureTip{
        font-size: 16px;
        position: relative;
        top: -1px;
        padding-left: 5px;
    }
    .el-upload--picture-card i{
        font-size: 20px;
    }
    .buttonList{
        text-align: center;
    }


    .crop-demo{
        display: flex;
        align-items: flex-end;
    }
    .crop-demo-btn{
        position: relative;
        width: 100px;
        height: 40px;
        line-height: 40px;
        padding: 0 20px;
        margin-left: 30px;
        background-color: #409eff;
        color: #fff;
        font-size: 14px;
        border-radius: 4px;
        box-sizing: border-box;
    }
    .crop-input{
        position: absolute;
        width: 100px;
        height: 40px;
        left: 0;
        top: 0;
        opacity: 0;
        cursor: pointer;
    }
    .hidden{
		display: none;
	}
}

</style>

