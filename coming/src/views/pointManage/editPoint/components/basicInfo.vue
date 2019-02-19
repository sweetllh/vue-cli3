<template>
    <div class="basicInfo">
        <el-form ref="basicForm" :model="formData" :rules="rules" label-width="100px">
            <el-form-item label="标签类别：" prop="type">
                <el-select v-model="formData.type" placeholder="请选择标签类别">
                    <template v-for="(item,index) in $bus.typeList">
                        <el-option v-if="index !== 0" :key="item.value" :label="item.label" 
                        :value="item.value"></el-option>
                    </template>
                </el-select>
            </el-form-item>
            <el-form-item label="地点名称：" prop="pointName">
                <el-input type="text" v-model="formData.pointName" placeholder="请输入地点名称" 
                style="max-width: 640px;"  autocomplete="off" ></el-input>
            </el-form-item>
            <div style="display: flex;">
                <el-form-item label="地点定位：" prop="province">
                    <el-select v-model="formData.province" placeholder="省">
                        <template v-for="(item,index) in $bus.classList">
                            <el-option v-if="index !== 0" :key="item.value" :label="item.label" 
                            :value="item.value"></el-option>
                        </template>
                    </el-select>
                </el-form-item>
                <el-form-item label="" label-width="20px" prop="city">
                    <el-select v-model="formData.city" placeholder="市">
                        <template v-for="(item,index) in $bus.classList">
                            <el-option v-if="index !== 0" :key="item.value" :label="item.label" 
                            :value="item.value"></el-option>
                        </template>
                    </el-select>
                </el-form-item>
                <el-form-item label="" label-width="20px" prop="area">
                    <el-select v-model="formData.area" placeholder="区">
                        <template v-for="(item,index) in $bus.classList">
                            <el-option v-if="index !== 0" :key="item.value" :label="item.label" 
                            :value="item.value"></el-option>
                        </template>
                    </el-select>
                </el-form-item>
            </div>
            
            <el-form-item label="" prop="detailedAddress">
                <el-input type="textarea" v-model="formData.detailedAddress"  rows="3"  placeholder="详细位置信息"></el-input>
            </el-form-item>
            <el-form-item label="" prop="GPSInfo">
                <el-input type="textarea" style="margin-bottom: 0;" v-model="formData.GPSInfo" 
                    rows="3" placeholder="GPS信息（启动Ruuvi tag后自动获取）"></el-input>
            </el-form-item>

            <el-form-item label="严选指数：" prop="rate">
                <el-rate v-model="formData.rate" :allow-half=true></el-rate>
            </el-form-item>
            <el-form-item label="添加标签：" class="labelList" prop="labelList">
                <div v-if="formData.labelList">
                    <span v-for="(item,index) in formData.labelList" :key="index">{{item}}</span>
                </div>
                <el-input type="hidden" v-model="formData.labelList[0]" class="hidden"></el-input>
                <el-tabs v-model="activeName" type="card" @tab-click="tabChange">
                    <el-tab-pane label="基础标签" name="first">
                        <span v-for="(item,index) in basedLabel" :key="index" @click="addTab(item)" 
                        :class="formData.labelList.includes(item) ? 'active' : ''" >{{item}}</span>
                    </el-tab-pane>
                    <el-tab-pane label="个性化标签" name="second">
                        <span v-for="(item,index) in personalizedLabel" :key="index" @click="addTab(item)"
                        :class="formData.labelList.includes(item) ? 'active' : ''" >{{item}}</span>
                    </el-tab-pane>
                </el-tabs>
                
            </el-form-item>
            <el-form-item label="封面图片：" prop="coverPhoto">
                <el-input type="hidden" v-model="formData.coverPhoto" class="hidden"></el-input>
                <el-upload
                    class="picture-uploader"
                    action=""
                    :auto-upload="false"
                    :show-file-list="false"
                    accept="image/*"
                    :on-change="handleChange"
                    :before-upload="beforePictureUpload">
                    <img v-if="formData.coverPhoto" :src="formData.coverPhoto" class="picture">
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
            
            <el-form-item class="buttonList">
                <el-button type="primary" @click="cancelBtn">取消</el-button>
                <el-button type="primary" @click="nextBtn">下一步</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
import  { VueCropper }  from 'vue-cropper';
import  { dataURLtoFile } from '@/utils/format'
export default {
    name: 'basicInfo',
    props:{
        formData: {
            type: Object,
            default: {}
        }
    },
    components: {
        VueCropper,
    },
    
    data(){
        return {
            //formData: {},
            rules: {
					type: {  required: true, message: '请选择标签类别', trigger: 'change'  },
			        pointName: {  required: true, message: '请选择地点名称', trigger: 'change'  },
                    province: {  required: true, message: '请选择省份', trigger: 'change'  },
                    city: {  required: true, message: '请选择城市', trigger: 'change'  },
                    area: {  required: true, message: '请选择区域', trigger: 'change'  },
                    detailedAddress: {  required: true, message: '请填写详细位置信息', trigger: 'change'  },
                    GPSInfo: {  required: true, message: '请填写GPS信息', trigger: 'change'  },
                    rate: {  required: true, message: '请填写严选指数', trigger: 'change'  },
                    coverPhoto: {  required: true, message: '请上传封面图片', trigger: 'change'  },
                    labelList: {  required: true, message: '请添加标签', trigger: 'change'  }
				},
            activeName: 'first',
            basedLabel: ['A级景区','AA级景区','AAA级景区','AAAA级景区'],
            personalizedLabel: ['住宿便利','网红打卡地','珍贵物种','特定人群优惠'],

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
                fixedNumber: [16, 9],            //截图框的宽高比例
            },
            isShowCropper: false,            //是否显示截图框
        }
    },
    watch: {
      // 因为不能直接修改 props 里的属性，所以不能直接把 formData 通过v-model进行绑定
      // 在这里我们需要监听 formData，当它发生变化时，立即将值赋给 data 里的 form
    //   form: {
    //     immediate: true,
    //     handler (val) {
    //       this.formData = val
    //     }
    //   }
    },
    created() {

    },
    mounted () {
      // props 是单向数据流，通过触发 update 事件绑定 formData，
      // 将 data 里的 form 指向父组件通过 formData 绑定的那个对象
      // 父组件在绑定 formData 的时候，需要加上 .sync
      //this.$emit('update:formData', this.formData)
    },
    methods: {
        //图片处理
        beforePictureUpload(){

        },
        handleChange(file, fileList){
            //console.log("file",file)
            //上传后将图片地址赋值给裁剪框显示图片
            this.option.img = URL.createObjectURL(file.raw);
            this.isShowCropper = true;
            
        },

        // 确定裁剪图片
        onCubeImg() {
            // 获取cropper的截图的base64 数据
            this.$refs.cropper.getCropData(data => {
                this.isShowCropper = false;

                //先将显示图片地址清空，防止重复显示
                this.option.img = ''

                //将剪裁后base64的图片转化为file格式
                //let file = dataURLtoFile(data,"first")
                this.formData.coverPhoto = data;
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
        addTab(val){
           let arry = this.formData.labelList;
           let result =  arry.some(function(item,index){
               return item == val;
            });
            if(!result){
                this.formData.labelList.push(val)
            }else{
                this.formData.labelList.splice(arry.findIndex(item => item === val), 1)
            }
        },

        //下一步
        nextBtn(){
            console.log(this.formData)
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
    .labelList {
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

