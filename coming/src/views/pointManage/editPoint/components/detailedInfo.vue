<template>
    <div class="detailedInfo">
        <el-form ref="detailedForm" :model="formData" :rules="rules" label-width="120px">
            <el-form-item label="打卡提示图片：" prop="tipPicture" class="coverPhoto">
                <!-- :file-list="pointList" :on-change="changePoint" -->
                <div style="display: flex;flex-wrap:wrap">
                    <ul class="imgList">
                        <li v-for="(item,index) in formData.tipPicture" :key="index">
                            <img :src="item">
                            <div class="wrap" @click="removePoint(index)"><i class="el-icon-delete"></i></div>
                        </li>
                    </ul>
                    <!-- <img v-for="(item,index) in tipPicture" :key="index" :src="item"> -->
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
                <el-input type="hidden" v-model="formData.tipPicture[0]" class="hidden"></el-input>
            </el-form-item>
            <el-form-item label="打卡地描述：" prop="description">
                <el-input type="textarea" rows="3" v-model="formData.description" placeholder=""></el-input>
            </el-form-item>
             <el-form-item label="入选理由：" prop="reason">
                <el-input type="textarea" rows="3" v-model="formData.reason" placeholder=""></el-input>
            </el-form-item>
            <el-form-item label="打卡地相册：" prop="photoAlbum" class="coverPhoto">
                <el-input type="hidden" v-model="formData.photoAlbum[0]" class="hidden"></el-input>
                <p style="color: #ccc;">（图片总数不超过10张，单张大小不超过10M，上传图片比例16:9。）</p>
                <div style="display: flex;flex-wrap:wrap">
                    <ul class="imgList">
                        <li v-for="(item,index) in formData.photoAlbum" :key="index">
                            <img :src="item">
                            <div class="wrap" @click="removeAlbum(index)"><i class="el-icon-delete"></i></div>
                        </li>
                    </ul>
                     <!-- :file-list="photoAlbum" -->
                    <el-upload
                        action=""
                        :auto-upload="false"
                        list-type="picture-card"
                        :show-file-list="false"
                        :on-change="changeAlbum"
                        :on-exceed="handleExceed"
                        accept="image/*"
                        :limit="10">
                        <i class="el-icon-plus"><span class="pictureTip">添加图片</span></i>
                    </el-upload>
                </div>
                
                <!-- vueCropper 剪裁图片实现-->
                <el-dialog title="裁剪图片（比例16:9）" :visible.sync="isShowCropper2" @close="cancelCrop2" width="791px">
                    <vue-cropper ref='cropper2' 
                    :img="option2.img"
                    :outputSize="option2.outputSize"
                    :outputType="option2.outputType"
                    :info="option2.info"
                    :autoCropWidth="option2.autoCropWidth"
                    :autoCropHeight="option2.autoCropHeight"
                    :canScale="option2.canScale"
                    :autoCrop="option2.autoCrop"
                    :fixed="option2.fixed"
                    :fixedNumber="option2.fixedNumber"
                    style="width:100%;height:422px;"></vue-cropper>
                    <span slot="footer" class="dialog-footer">
                        <el-button @click="cancelCrop2">取 消</el-button>
                        <el-button type="primary" @click="onCubeImg2">确 定</el-button>
                    </span>
                </el-dialog>
            </el-form-item>
            <el-form-item label="景点介绍：" prop="introduce">
                <div class="edit_container">
                    <quill-editor ref="myTextEditor" v-model="formData.introduce" 
                    @change="onEditorChange($event)"
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
                            ['bold', 'italic', 'underline', 'strike'],
                            ['blockquote', 'code-block'],
                            [{ 'header': 1 }, { 'header': 2 }],
                            [{ 'list': 'ordered' }, { 'list': 'bullet' }],
                            [{ 'script': 'sub' }, { 'script': 'super' }],
                            [{ 'indent': '-1' }, { 'indent': '+1' }],
                            [{ 'direction': 'rtl' }],
                            [{ 'size': ['small', false, 'large', 'huge'] }],
                            [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
                            [{ 'font': [] }],
                            [{ 'color': [] }, { 'background': [] }],
                            [{ 'align': [] }],
                            ['clean'],
                            ['link', 'image']
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
                tipPicture: {  required: true, message: '请上传打卡提示图片', trigger: 'change'  },
                photoAlbum: {  required: true, message: '请上传打卡地相册', trigger: 'change'  },
                description: {  required: true, message: '请填写打卡地描述', trigger: 'change'  },
                reason: {  required: true, message: '请填写入选理由', trigger: 'change'  },
                introduce: {  required: true, message: '请填写景点介绍', trigger: 'change'  },
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
                fixedNumber: [16, 9],            //截图框的宽高比例
            },
             option2: {
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
            isShowCropper2: false,            //是否显示截图框
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
                this.formData.tipPicture.splice(index,1)
            }).catch(() => {

            });
            
        },
        // 确定裁剪图片
        onCubeImg() {
            // 获取cropper的截图的base64 数据
            this.$refs.cropper.getCropData(data => {
                this.isShowCropper = false;
                this.formData.tipPicture.push(data)
                //this.$bus.$emit('corverImg', data)

                //先将显示图片地址清空，防止重复显示
                this.option.img = ''

                //将剪裁后base64的图片转化为file格式
                //let file = dataURLtoFile(data,"first")
            })
            
        },
        //取消裁剪
        cancelCrop(){
            this.isShowCropper = false;
            this.option.img = '';
        },


        //相册
        changeAlbum(file, fileList){
            //console.log("file",file,fileList)
            //上传后将图片地址赋值给裁剪框显示图片
            const isLt10M = file.size / 1024 / 1024 < 10;
            if (!isLt10M) {
                this.$message.error('上传图片大小不能超过10MB!');
            }else{
                this.option2.img = URL.createObjectURL(file.raw);
                this.isShowCropper2 = true;
            }
        },
        removeAlbum(index){
            var _this = this;
            this.$confirm('确认删除吗?', '提示', {
                //type: 'warning'
            }).then(() => {
                this.formData.photoAlbum.splice(index,1)
            }).catch(() => {

            });
            
        },
        // 确定裁剪图片
        onCubeImg2() {
            // 获取cropper的截图的base64 数据
            this.$refs.cropper2.getCropData(data => {
                this.isShowCropper2 = false;
                this.formData.photoAlbum.push(data)

                //先将显示图片地址清空，防止重复显示
                this.option2.img = ''

                //将剪裁后base64的图片转化为file格式
                //let file = dataURLtoFile(data,"first")
            })
        },
        //取消裁剪
        cancelCrop2(){
            this.isShowCropper2 = false;
            this.option2.img = '';
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

