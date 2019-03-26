<template>
    <div class="detailedInfo">
        <el-form ref="detailedForm" :model="formData" :rules="rules" label-width="120px">
            <el-form-item label="打卡提示图片：" prop="ClockPromptPhoto" class="coverPhoto">
                <!-- :file-list="pointList" :on-change="changePoint" -->
                <div  class='toolTip'>（上传比例16:9）</div>
                <div style="display: flex;flex-wrap:wrap">
                    <ul class="imgList">
                        <li v-for="(item,index) in formData.ClockPromptPhoto" :key="index">
                            <img :src="item">
                            <div class="wrap" @click="removePoint(index)"><i class="el-icon-delete"></i></div>
                        </li>
                        
                    </ul>
                    <!-- <img v-for="(item,index) in ClockPromptPhoto" :key="index" :src="item"> -->
                    <el-upload
                        action=""
                        :auto-upload="false"
                        list-type="picture-card"
                        :on-change="changePoint" 
                        :show-file-list="false"
                        accept="image/*"
                        :limit="10">
                        <i class="el-icon-plus"><span class="pictureTip">添加图片</span></i>
                    </el-upload>
                </div>
                
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
                <el-input type="hidden" v-model="formData.ClockPromptPhoto[0]" class="hidden"></el-input>
            </el-form-item>
            <el-form-item label="打卡地描述：" prop="Describe">
                <el-input type="textarea" rows="3" v-model="formData.Describe" placeholder=""></el-input>
            </el-form-item>
             <el-form-item label="入选理由：" prop="Reason">
                <el-input type="textarea" rows="3" v-model="formData.Reason" placeholder=""></el-input>
            </el-form-item>
            
            <el-form-item label="景点介绍：" prop="ScenicSpots">
                <!-- @change="onEditorChange($event)" -->
                <div class="edit_container">
                    <quill-editor ref="myTextEditor" v-model="formData.ScenicSpots" 
                    :options="editorOption" class="editer"></quill-editor>
                </div>
            </el-form-item>
            <el-form-item class="buttonList">
                <el-button type="primary" @click="preBtn">上一步</el-button>
                <el-button type="primary" @click="previewBtn">预览</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
import 'quill/dist/quill.core.css';
import 'quill/dist/quill.snow.css';
import 'quill/dist/quill.bubble.css';
import { quillEditor} from 'vue-quill-editor';
import Quill from 'quill';
import { ImageDrop } from 'quill-image-drop-module'
import  ImageResize   from 'quill-image-resize-module'
Quill.register('modules/imageDrop', ImageDrop)
Quill.register('modules/imageResize', ImageResize)

import  { VueCropper }  from 'vue-cropper';
export default {
    name:'detaile',
    props:{
        formData: {
                    type: Object,
                    default: {}
                }
    },
    components: {
            quillEditor,
            VueCropper,
    },
    data(){
        return {
            //编辑器配置
            editorOption: {
                    placeholder: '景点介绍',
                    modules:{
                        toolbar: [
                            // ['bold', 'italic', 'underline', 'strike'],
                            // ['blockquote', 'code-block'],
                            // [{ 'header': 1 }, { 'header': 2 }],
                            // [{ 'list': 'ordered' }, { 'list': 'bullet' }],
                            //[{ 'script': 'sub' }, { 'script': 'super' }],
                            // [{ 'indent': '-1' }, { 'indent': '+1' }],
                            // [{ 'direction': 'rtl' }],
                            // [{ 'size': ['small', false, 'large', 'huge'] }],
                            // [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
                            // [{ 'font': [] }],
                            // [{ 'color': [] }, { 'background': [] }],
                            // [{ 'align': [] }],
                            //['clean'],
                            ['image']
                            // ['link', 'image', 'video']
                        ],
                        history: {
                            delay: 1000,
                            maxStack: 50,
                            userOnly: false
                        },
                        imageDrop: true,
                        imageResize: {
                            displayStyles: {
                                backgroundColor: 'black',
                                border: 'none',
                                color: 'white'
                            },
                            modules: [ 'Resize', 'DisplaySize', 'Toolbar' ]
                        }
                    }
                    
            },
            rules:{
                ClockPromptPhoto: {  required: true, message: '请上传打卡提示图片', trigger: 'change'  },
                // PhotoList: {  required: true, message: '请上传打卡地相册', trigger: 'change'  },
                Describe: {  required: true, message: '请填写打卡地描述', trigger: 'change'  },
                Reason: {  required: true, message: '请填写入选理由', trigger: 'change'  },
                ScenicSpots: {  required: true, message: '请填写景点介绍', trigger: 'change'  },
            },


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
    computed: {
     
    },
    mounted() {
        
    },
    methods: {
        onEditorChange({ quill, html, text }) {
            console.log('editor change!', html)
        },
        //打卡点
        //图片处理
        changePoint(file, fileList){
            //console.log("file",file,fileList)
            //上传后将图片地址赋值给裁剪框显示图片
            this.option.img = URL.createObjectURL(file.raw);
            this.isShowCropper = true;
            
        },
        removePoint(index){
            this.$confirm('确认删除吗?', '提示', {
                //type: 'warning'
            }).then(() => {
                this.formData.ClockPromptPhoto.splice(index,1)
            }).catch(() => {

            });
            
        },
        // 确定裁剪图片
        onCubeImg() {
            // 获取cropper的截图的base64 数据
            this.$refs.cropper.getCropData(data => {
                this.isShowCropper = false;
                this.formData.ClockPromptPhoto.push(data)
                //this.$bus.$emit('corverImg', data)

                //先将显示图片地址清空，防止重复显示
                this.option.img = ''

            })
            
        },
        //取消裁剪
        cancelCrop(){
            this.isShowCropper = false;
            this.option.img = '';
        },

        handleExceed(files, fileList) {
            this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
        },

        //上一步
        preBtn(){
            this.$emit('activeNameChange',"first");
        },

        //预览
        previewBtn(){
            this.$refs['detailedForm'].validate((valid) => {
                if (valid) {
                    this.$emit('activeNameChange',"third");
                } else {
                    this.$message({
                        showClose: true,
                        type: 'info',
                        message: '详细信息未填写完整'
                    }); 
                    return false;
                }
            });
           
        },

    },
}
</script>

<style scoped lang="scss">
.detailedInfo{
    .pictureTip{
        font-size: 14px;
        position: relative;
        top: -1px;
        padding-left: 5px;
    }
    .toolTip{
        color: #ccc;
    }
    .el-upload--picture-card i{
        font-size: 18px;
    }
    .buttonList{
        text-align: center;
    }
    .edit_container{
		margin-bottom: 80px;
	}
    .editer{
		height: 500px;
	}
    .hidden{
		display: none;
    }
    .coverPhoto{
        img{
            width: 256px;
            height: 144px;
            margin: 0 8px 8px 0;
            border-radius: 6px;
            border: 1px dashed #d9d9d9;
        }
    }
    
}
.imgList li{
    position: relative;
    display: inline-block;
}
.imgList li .wrap{
    width: 256px;
    height: 144px;
    border-radius: 6px;
    position: absolute;
    top: 0;
    left: 0;
    background:rgba(0,0,0,0.3);
    opacity: 0;
    color: #fff;
    font-size: 18px;
    line-height: 144px;
    text-align: center;
}
 .imgList li:hover .wrap{
        cursor: pointer;
        opacity: 1;
    }

</style>

